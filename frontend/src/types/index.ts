export type Subject = "portugues" | "matematica";
export type SurveyChoice = "portugues" | "matematica" | "ambas" | "nenhuma";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface PublicQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
  difficulty: number;
  category: string;
}

export interface PretestResult {
  skillScore: number;
  portugueseCorrect: boolean;
  mathCorrect: boolean;
}

export type RoomStatus = "waiting" | "ready" | "playing";

export interface RoomPlayer {
  playerId: string;
  username: string;
  series: number;
  avatarIndex: number;
  skillScore: number;
}

export interface Team {
  color: string;
  players: RoomPlayer[];
  totalScore: number;
}

export interface RoomSnapshot {
  code: string;
  hostPlayerId: string;
  status: RoomStatus;
  players: RoomPlayer[];
  teams: Team[] | null;
  variance: { absolute: number; percent: number } | null;
}

export interface AckResponse {
  ok: boolean;
  snapshot?: RoomSnapshot;
  error?: string;
}

export interface GameQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
  points: number;
  difficulty: number;
}

export interface RoundStartPayload {
  roundNumber: number;
  totalRounds: number;
  question: GameQuestion;
  startedAt: number;
  timeLimitMs: number;
}

export interface TeamAnsweredPayload {
  teamColor: string;
  answeredCount: number;
  totalTeams: number;
}

export interface RoundResultEntry {
  teamColor: string;
  isCorrect: boolean;
  pointsEarned: number;
  responseTimeMs: number | null;
}

export interface RoundEndPayload {
  correctOptionId: string;
  results: RoundResultEntry[];
  scores: Record<string, number>;
  speedrun: boolean;
}

export interface GameFinishedPayload {
  finalScores: { teamColor: string; totalScore: number }[];
  winner: string;
}
