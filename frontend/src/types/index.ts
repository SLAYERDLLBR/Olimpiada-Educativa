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
