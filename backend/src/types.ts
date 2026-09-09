export type Subject = "portugues" | "matematica";
export type SurveyChoice = "portugues" | "matematica" | "ambas" | "nenhuma";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface PretestQuestionRow {
  id: string;
  series: number;
  subject: Subject;
  category: string;
  prompt: string;
  options: QuestionOption[];
  correct_option_id: string;
  difficulty: number;
}

/** Question shape sent to the client — never includes the correct answer. */
export interface PublicQuestion {
  id: string;
  prompt: string;
  options: QuestionOption[];
  difficulty: number;
  category: string;
}

export interface PlayerRow {
  id: string;
  username: string;
  series: number;
  avatar_index: number;
  skill_score: number | null;
  pretest_completed: boolean;
  dominant_subjects: string[];
  created_at: string;
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

export type FormatType =
  | "multiple-choice"
  | "true-false"
  | "matching"
  | "fill-blank"
  | "visual-click"
  | "numeric-input"
  | "sequence";

export interface FillBlankAnswerData {
  acceptedAnswers: string[];
}

export interface NumericAnswerData {
  correctValue: number;
  tolerance: number;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingAnswerData {
  pairs: MatchingPair[];
}

export interface SequenceItem {
  id: string;
  text: string;
}

export interface SequenceAnswerData {
  items: SequenceItem[];
  correctOrder: string[];
}

export type AnswerData = FillBlankAnswerData | NumericAnswerData | MatchingAnswerData | SequenceAnswerData;

export interface QuestionRow {
  id: string;
  subject: Subject;
  competency: string;
  format_type: FormatType;
  prompt: string;
  options: QuestionOption[] | null;
  correct_option_id: string | null;
  answer_data: AnswerData | null;
  points: number;
  difficulty: number;
}

/** Question shape sent to the client — never includes the correct answer. */
export interface PublicGameQuestion {
  id: string;
  formatType: FormatType;
  prompt: string;
  points: number;
  difficulty: number;
  options?: QuestionOption[];
  matchingLeft?: { id: string; text: string }[];
  matchingRight?: { id: string; text: string }[];
  sequenceItems?: { id: string; text: string }[];
}

export type SubmittedAnswer =
  | { type: "option"; optionId: string }
  | { type: "text"; value: string }
  | { type: "number"; value: number }
  | { type: "matching"; matches: { leftId: string; rightId: string }[] }
  | { type: "sequence"; order: string[] };

export interface RoundStartPayload {
  roundNumber: number;
  totalRounds: number;
  question: PublicGameQuestion;
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
  correctOptionId?: string;
  correctAnswerDisplay: string;
  results: RoundResultEntry[];
  scores: Record<string, number>;
  speedrun: boolean;
}

export interface GameFinishedPayload {
  finalScores: { teamColor: string; totalScore: number }[];
  winner: string;
}
