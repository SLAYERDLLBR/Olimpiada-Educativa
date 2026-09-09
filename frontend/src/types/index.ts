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
