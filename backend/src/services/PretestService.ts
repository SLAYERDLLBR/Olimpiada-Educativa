import { randomUUID } from "node:crypto";
import { query } from "../database/connection.js";
import { getPretestQuestionById } from "./QuestionService.js";
import { calculateSkillScore, dominantSubjects } from "./ScoringService.js";
import { markPretestCompleted } from "./PlayerService.js";
import type { SurveyChoice } from "../types.js";

export interface SubmitPretestInput {
  playerId: string;
  surveyChoice: SurveyChoice;
  ptQuestionId: string;
  ptAnswerId: string;
  mathQuestionId: string;
  mathAnswerId: string;
}

export interface SubmitPretestResult {
  skillScore: number;
  portugueseCorrect: boolean;
  mathCorrect: boolean;
}

/**
 * Never trusts "correct/incorrect" from the client — re-validates both answers
 * against the stored correct_option_id before scoring.
 */
export async function submitPretest(input: SubmitPretestInput): Promise<SubmitPretestResult> {
  const [ptQuestion, mathQuestion] = await Promise.all([
    getPretestQuestionById(input.ptQuestionId),
    getPretestQuestionById(input.mathQuestionId),
  ]);

  const portugueseCorrect = ptQuestion.correct_option_id === input.ptAnswerId;
  const mathCorrect = mathQuestion.correct_option_id === input.mathAnswerId;

  const skillScore = calculateSkillScore(input.surveyChoice, portugueseCorrect, mathCorrect);
  const subjects = dominantSubjects(portugueseCorrect, mathCorrect);

  await query(
    `insert into pretests (id, player_id, portuguese_correct, math_correct, skill_score, survey_choice)
     values ($1, $2, $3, $4, $5, $6)`,
    [randomUUID(), input.playerId, portugueseCorrect ? 1 : 0, mathCorrect ? 1 : 0, skillScore, input.surveyChoice]
  );

  await markPretestCompleted(input.playerId, skillScore, subjects);

  return { skillScore, portugueseCorrect, mathCorrect };
}
