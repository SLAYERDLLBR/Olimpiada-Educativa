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
