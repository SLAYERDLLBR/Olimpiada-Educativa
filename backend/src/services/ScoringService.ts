import type { SurveyChoice } from "../types.js";

/**
 * SkillScore = (PontosPT × 0.3) + (PontosMat × 0.3) + (SurveyBonus × 0.4)
 * Per docs/PRE_TESTE_BALANCEAMENTO_COD.md — survey bonus rewards self-awareness:
 * picking a subject you're actually strong in beats overclaiming and getting it wrong.
 */
function surveyBonus(choice: SurveyChoice, ptCorrect: boolean, mathCorrect: boolean): number {
  switch (choice) {
    case "ambas":
      return 60;
    case "nenhuma":
      return 40;
    case "portugues":
      return ptCorrect ? 50 : -10;
    case "matematica":
      return mathCorrect ? 50 : -10;
  }
}

export function calculateSkillScore(
  choice: SurveyChoice,
  ptCorrect: boolean,
  mathCorrect: boolean
): number {
  const ptPoints = ptCorrect ? 100 : 0;
  const mathPoints = mathCorrect ? 100 : 0;
  const bonus = surveyBonus(choice, ptCorrect, mathCorrect);

  const raw = ptPoints * 0.3 + mathPoints * 0.3 + bonus * 0.4;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function dominantSubjects(ptCorrect: boolean, mathCorrect: boolean): string[] {
  const subjects: string[] = [];
  if (ptCorrect) subjects.push("portugues");
  if (mathCorrect) subjects.push("matematica");
  return subjects;
}
