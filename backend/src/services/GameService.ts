import type { Server } from "socket.io";
import { query } from "../database/connection.js";
import type {
  GameFinishedPayload,
  QuestionRow,
  RoomPlayer,
  RoundEndPayload,
  RoundResultEntry,
  RoundStartPayload,
  Team,
  TeamAnsweredPayload,
} from "../types.js";

const ROUND_TIME_LIMIT_MS = 40_000;
const SPEEDRUN_CUTOFF_MS = 30_000;
const ROUND_END_PAUSE_MS = 3_000;

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

function toPublicQuestion(row: QuestionRow) {
  return { id: row.id, prompt: row.prompt, options: row.options, points: row.points, difficulty: row.difficulty };
}

export async function startGame(roomCode: string, teams: Team[], io: Server): Promise<void> {
  const result = await query<QuestionRow>("select * from questions");
  if (result.rows.length === 0) {
    throw new Error("Nenhuma questão cadastrada. Rode o seed do jogo.");
  }

  const game: GameState = {
    roomCode,
    teams: teams.map((t) => ({ color: t.color, players: t.players, score: 0, combo: 0 })),
    questionQueue: shuffle(result.rows),
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
  optionId: string,
  io: Server
): { ok: true } | { ok: false; error: string } {
  const game = games.get(roomCode);
  if (!game) return { ok: false, error: "Jogo não encontrado." };

  const team = findTeamForPlayer(game, playerId);
  if (!team) return { ok: false, error: "Você não está em nenhum time desta partida." };
  if (game.roundAnswers.has(team.color)) return { ok: false, error: "Sua equipe já respondeu esta rodada." };

  const question = game.questionQueue[game.currentRoundIndex];
  const isCorrect = question.correct_option_id === optionId;
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
    correctOptionId: question.correct_option_id,
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
