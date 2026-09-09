import { pool } from "./connection.js";
import type { Subject } from "../types.js";

interface SeedQuestion {
  subject: Subject;
  competency: string;
  prompt: string;
  options: { id: string; text: string }[];
  correct_option_id: string;
  points: number;
  difficulty: 1 | 2 | 3;
}

const opts = (a: string, b: string, c: string, d: string) => [
  { id: "a", text: a },
  { id: "b", text: b },
  { id: "c", text: c },
  { id: "d", text: d },
];

// Transcrito de docs/BANCO_QUESTOES_EXEMPLO.md — Formato 1 (Multiple Choice)
// de cada uma das 10 competências modeladas no documento.
const questions: SeedQuestion[] = [
  { subject: "matematica", competency: "Adição até 10", prompt: "Quanto é 4 + 3?", options: opts("5", "6", "7", "8"), correct_option_id: "c", points: 100, difficulty: 1 },
  { subject: "matematica", competency: "Subtração até 20", prompt: "Quanto é 15 - 8?", options: opts("7", "8", "9", "10"), correct_option_id: "a", points: 100, difficulty: 2 },
  { subject: "matematica", competency: "Multiplicação por 2, 5, 10", prompt: "Quanto é 5 × 4?", options: opts("15", "20", "25", "10"), correct_option_id: "b", points: 110, difficulty: 3 },
  { subject: "matematica", competency: "Divisão Simples", prompt: "Quanto é 20 ÷ 4?", options: opts("4", "5", "6", "7"), correct_option_id: "b", points: 120, difficulty: 3 },
  { subject: "matematica", competency: "Frações Básicas", prompt: "Se divido uma pizza em 4 pedaços e como 1, comi qual fração?", options: opts("1/2", "1/4", "1/3", "1/5"), correct_option_id: "b", points: 120, difficulty: 3 },
  { subject: "portugues", competency: "Vogais", prompt: "Qual dessas letras é uma VOGAL?", options: opts("B", "E", "M", "P"), correct_option_id: "b", points: 100, difficulty: 1 },
  { subject: "portugues", competency: "Sinônimos", prompt: "Sinônimo de 'FELIZ':", options: opts("Triste", "Alegre", "Assustado", "Cansado"), correct_option_id: "b", points: 100, difficulty: 2 },
  { subject: "portugues", competency: "Antônimos", prompt: "Antônimo de 'QUENTE':", options: opts("Tépido", "Frio", "Morno", "Gelado"), correct_option_id: "b", points: 110, difficulty: 2 },
  { subject: "portugues", competency: "Conjugação de Verbos", prompt: "Complete: 'Eu _____ um bolo ontem'", options: opts("Como", "Comerei", "Comi", "Comendo"), correct_option_id: "c", points: 120, difficulty: 3 },
  { subject: "portugues", competency: "Pontuação", prompt: "Qual frase está corretamente pontuada?", options: opts("João comeu e bebeu agua", "João, comeu e bebeu água", "João comeu e bebeu, água", "João, comeu, e bebeu água"), correct_option_id: "b", points: 120, difficulty: 3 },
];

async function seed() {
  console.log(`Seeding ${questions.length} game questions...`);

  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("delete from questions");

    for (const q of questions) {
      await client.query(
        `insert into questions (subject, competency, prompt, options, correct_option_id, points, difficulty)
         values ($1, $2, $3, $4, $5, $6, $7)`,
        [q.subject, q.competency, q.prompt, JSON.stringify(q.options), q.correct_option_id, q.points, q.difficulty]
      );
    }

    await client.query("commit");
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }

  console.log("Seed complete.");
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
