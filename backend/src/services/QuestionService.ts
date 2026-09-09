import { query } from "../database/connection.js";
import type { PretestQuestionRow, PublicQuestion, Subject } from "../types.js";

function toPublicQuestion(row: PretestQuestionRow): PublicQuestion {
  return {
    id: row.id,
    prompt: row.prompt,
    options: row.options,
    difficulty: row.difficulty,
    category: row.category,
  };
}

export async function getRandomPretestQuestion(
  series: number,
  subject: Subject
): Promise<PublicQuestion> {
  const result = await query<PretestQuestionRow>(
    `select * from pretest_questions where series = $1 and subject = $2 order by random() limit 1`,
    [series, subject]
  );

  if (result.rows.length === 0) {
    throw new Error(`No pretest questions found for series=${series} subject=${subject}`);
  }

  return toPublicQuestion(result.rows[0]);
}

/** Fetches the full row (including the correct answer) for server-side validation. */
export async function getPretestQuestionById(id: string): Promise<PretestQuestionRow> {
  const result = await query<PretestQuestionRow>(`select * from pretest_questions where id = $1`, [id]);

  if (result.rows.length === 0) {
    throw new Error(`Pretest question not found: ${id}`);
  }

  return result.rows[0];
}
