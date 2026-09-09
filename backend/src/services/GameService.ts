import type { Server } from "socket.io";
import { query } from "../database/connection.js";
import type {
  FillBlankAnswerData,
  GameFinishedPayload,
  MatchingAnswerData,
  NumericAnswerData,
  QuestionRow,
  RoomPlayer,
  RoundEndPayload,
  RoundResultEntry,
  RoundStartPayload,
  SequenceAnswerData,
  SubmittedAnswer,
  Team,
  TeamAnsweredPayload,
} from "../types.js";

const ROUND_TIME_LIMIT_MS = 40_000;
const SPEEDRUN_CUTOFF_MS = 30_000;
const ROUND_END_PAUSE_MS = 3_000;
const TOTAL_ROUNDS = 12;

interface TeamGameState {
  color: string;
  players: RoomPlayer[];
  score: number;
  combo: number;
}

interface RoundAnswer {
  isCorrect: boolean;
  responseTimeMs: number;
  rawPoints: number;
}

interface GameState {
  roomCode: string;
  teams: TeamGameState[];
  questionQueue: QuestionRow[];
  currentRoundIndex: number;
  roundStartedAt: number;
  roundAnswers: Map<string, RoundAnswer>;
  roundTimeout: NodeJS.Timeout | null;
}

const games = new Map<string, GameState>();

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Picks up to `count` questions, never repeating the same format_type back to back. */
function pickRounds(all: QuestionRow[], count: number): QuestionRow[] {
  const remaining = shuffle(all);
  const picked: QuestionRow[] = [];

  while (picked.length < count && remaining.length > 0) {
    const lastFormat = picked[picked.length - 1]?.format_type;
    let index = remaining.findIndex((q) => q.format_type !== lastFormat);
    if (index === -1) index = 0; // no alternative left — allow a repeat rather than stall
    picked.push(...remaining.splice(index, 1));
  }

  return picked;
}

function speedMultiplier(responseTimeMs: number): number {
  if (responseTimeMs < 15_000) return 1.5;
  if (responseTimeMs < 25_000) return 1.2;
  return 1.0;
}

function comboMultiplier(combo: number): number {
  if (combo >= 4) return 1.3;
  if (combo === 3) return 1.2;
  if (combo === 2) return 1.1;
  return 1.0;
}

function findTeamForPlayer(game: GameState, playerId: string): TeamGameState | undefined {
  return game.teams.find((t) => t.players.some((p) => p.playerId === playerId));
}

const ACCENT_MAP: Record<string, string> = {
  á: "a", à: "a", â: "a", ã: "a", ä: "a",
  é: "e", è: "e", ê: "e", ë: "e",
  í: "i", ì: "i", î: "i", ï: "i",
  ó: "o", ò: "o", ô: "o", õ: "o", ö: "o",
  ú: "u", ù: "u", û: "u", ü: "u",
  ç: "c",
};

/** So a fill-blank answer like "numero" (no accent) still matches "número". */
function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split("")
    .map((ch) => ACCENT_MAP[ch] ?? ch)
    .join("");
}

function toPublicQuestion(row: QuestionRow) {
  const base = {
    id: row.id,
    formatType: row.format_type,
    prompt: row.prompt,
    points: row.points,
    difficulty: row.difficulty,
  };

  switch (row.format_type) {
    case "multiple-choice":
    case "true-false":
    case "visual-click":
      return { ...base, options: row.options ?? [] };
    case "matching": {
      const { pairs } = row.answer_data as MatchingAnswerData;
      return {
        ...base,
        matchingLeft: shuffle(pairs.map((p) => ({ id: p.id, text: p.left }))),
        matchingRight: shuffle(pairs.map((p) => ({ id: p.id, text: p.right }))),
      };
    }
    case "sequence": {
      const { items } = row.answer_data as SequenceAnswerData;
      return { ...base, sequenceItems: shuffle(items) };
    }
    default:
      // fill-blank, numeric-input: the prompt alone is enough for the client.
      return base;
  }
}

function checkAnswer(question: QuestionRow, answer: SubmittedAnswer): boolean {
  switch (question.format_type) {
    case "multiple-choice":
    case "true-false":
    case "visual-click":
      return answer.type === "option" && question.correct_option_id === answer.optionId;

    case "fill-blank": {
      if (answer.type !== "text") return false;
      const { acceptedAnswers } = question.answer_data as FillBlankAnswerData;
      const normalized = normalizeText(answer.value);
      return acceptedAnswers.some((accepted) => normalizeText(accepted) === normalized);
    }

    case "numeric-input": {
      if (answer.type !== "number") return false;
      const { correctValue, tolerance } = question.answer_data as NumericAnswerData;
      return Math.abs(answer.value - correctValue) <= tolerance;
    }

    case "matching": {
      if (answer.type !== "matching") return false;
      const { pairs } = question.answer_data as MatchingAnswerData;
      return answer.matches.length === pairs.length && answer.matches.every((m) => m.leftId === m.rightId);
    }

    case "sequence": {
      if (answer.type !== "sequence") return false;
      const { correctOrder } = question.answer_data as SequenceAnswerData;
      return answer.order.length === correctOrder.length && answer.order.every((id, i) => id === correctOrder[i]);
    }

    default:
      return false;
  }
}

function describeCorrectAnswer(question: QuestionRow): string {
  switch (question.format_type) {
    case "multiple-choice":
    case "visual-click": {
      const options = question.options ?? [];
      return options.find((o) => o.id === question.correct_option_id)?.text ?? "";
    }
    case "true-false":
      return question.correct_option_id === "true" ? "Verdadeiro" : "Falso";
    case "fill-blank":
      return (question.answer_data as FillBlankAnswerData).acceptedAnswers[0] ?? "";
    case "numeric-input":
      return String((question.answer_data as NumericAnswerData).correctValue);
    case "matching":
      return (question.answer_data as MatchingAnswerData).pairs.map((p) => `${p.left} → ${p.right}`).join(", ");
    case "sequence": {
      const { items, correctOrder } = question.answer_data as SequenceAnswerData;
      const byId = new Map(items.map((i) => [i.id, i.text]));
      return correctOrder.map((id) => byId.get(id)).join(" → ");
    }
    default:
      return "";
  }
}

/** Raw shape as SQLite hands it back — JSON columns as text. */
interface QuestionRowRaw extends Omit<QuestionRow, "options" | "answer_data"> {
  options: string | null;
  answer_data: string | null;
}

function fromRaw(row: QuestionRowRaw): QuestionRow {
  return {
    ...row,
    options: row.options ? JSON.parse(row.options) : null,
    answer_data: row.answer_data ? JSON.parse(row.answer_data) : null,
  };
}

export async function startGame(roomCode: string, teams: Team[], io: Server): Promise<void> {
  const result = await query<QuestionRowRaw>("select * from questions");
  if (result.rows.length === 0) {
    throw new Error("Nenhuma questão cadastrada. Rode o seed do jogo.");
  }

  const game: GameState = {
    roomCode,
    teams: teams.map((t) => ({ color: t.color, players: t.players, score: 0, combo: 0 })),
    questionQueue: pickRounds(result.rows.map(fromRaw), TOTAL_ROUNDS),
    currentRoundIndex: -1,
    roundStartedAt: 0,
    roundAnswers: new Map(),
    roundTimeout: null,
  };
  games.set(roomCode, game);
  advanceRound(roomCode, io);
}

function advanceRound(roomCode: string, io: Server): void {
  const game = games.get(roomCode);
  if (!game) return;

  game.currentRoundIndex += 1;
  const question = game.questionQueue[game.currentRoundIndex];

  if (!question) {
    const finalScores = game.teams.map((t) => ({ teamColor: t.color, totalScore: t.score }));
    const winner = finalScores.reduce((best, t) => (t.totalScore > best.totalScore ? t : best)).teamColor;
    const payload: GameFinishedPayload = { finalScores, winner };
    io.to(roomCode).emit("game:finished", payload);
    endGame(roomCode);
    return;
  }

  game.roundAnswers = new Map();
  game.roundStartedAt = Date.now();

  const payload: RoundStartPayload = {
    roundNumber: game.currentRoundIndex + 1,
    totalRounds: game.questionQueue.length,
    question: toPublicQuestion(question),
    startedAt: game.roundStartedAt,
    timeLimitMs: ROUND_TIME_LIMIT_MS,
  };
  io.to(roomCode).emit("game:round-start", payload);

  game.roundTimeout = setTimeout(() => endRound(roomCode, io, true), ROUND_TIME_LIMIT_MS);
}

export function submitAnswer(
  roomCode: string,
  playerId: string,
  answer: SubmittedAnswer,
  io: Server
): { ok: true } | { ok: false; error: string } {
  const game = games.get(roomCode);
  if (!game) return { ok: false, error: "Jogo não encontrado." };

  const team = findTeamForPlayer(game, playerId);
  if (!team) return { ok: false, error: "Você não está em nenhum time desta partida." };
  if (game.roundAnswers.has(team.color)) return { ok: false, error: "Sua equipe já respondeu esta rodada." };

  const question = game.questionQueue[game.currentRoundIndex];
  const isCorrect = checkAnswer(question, answer);
  const responseTimeMs = Date.now() - game.roundStartedAt;
  const newCombo = isCorrect ? team.combo + 1 : 0;
  const rawPoints = isCorrect ? Math.round(question.points * speedMultiplier(responseTimeMs) * comboMultiplier(newCombo)) : 0;

  game.roundAnswers.set(team.color, { isCorrect, responseTimeMs, rawPoints });
  team.combo = newCombo;

  const payload: TeamAnsweredPayload = {
    teamColor: team.color,
    answeredCount: game.roundAnswers.size,
    totalTeams: game.teams.length,
  };
  io.to(roomCode).emit("game:team-answered", payload);

  if (game.roundAnswers.size === game.teams.length) {
    if (game.roundTimeout) clearTimeout(game.roundTimeout);
    endRound(roomCode, io, false);
  }

  return { ok: true };
}

function endRound(roomCode: string, io: Server, timedOut: boolean): void {
  const game = games.get(roomCode);
  if (!game) return;

  game.roundTimeout = null;
  const elapsed = Date.now() - game.roundStartedAt;
  const everyoneAnswered = !timedOut && game.roundAnswers.size === game.teams.length;
  const speedrun = everyoneAnswered && elapsed < SPEEDRUN_CUTOFF_MS;
  const syncBonus = !everyoneAnswered ? 0 : speedrun ? 50 : 25;

  const question = game.questionQueue[game.currentRoundIndex];
  const results: RoundResultEntry[] = game.teams.map((team) => {
    const answer = game.roundAnswers.get(team.color);
    if (!answer) {
      team.combo = 0;
      return { teamColor: team.color, isCorrect: false, pointsEarned: 0, responseTimeMs: null };
    }
    const pointsEarned = answer.rawPoints + (answer.isCorrect ? syncBonus : 0);
    team.score += pointsEarned;
    return { teamColor: team.color, isCorrect: answer.isCorrect, pointsEarned, responseTimeMs: answer.responseTimeMs };
  });

  const payload: RoundEndPayload = {
    correctOptionId: question.correct_option_id ?? undefined,
    correctAnswerDisplay: describeCorrectAnswer(question),
    results,
    scores: Object.fromEntries(game.teams.map((t) => [t.color, t.score])),
    speedrun,
  };
  io.to(roomCode).emit("game:round-end", payload);

  setTimeout(() => advanceRound(roomCode, io), ROUND_END_PAUSE_MS);
}

export function endGame(roomCode: string): void {
  const game = games.get(roomCode);
  if (!game) return;
  if (game.roundTimeout) clearTimeout(game.roundTimeout);
  games.delete(roomCode);
}
