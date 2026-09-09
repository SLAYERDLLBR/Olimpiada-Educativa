import { randomUUID } from "node:crypto";
import { db } from "./connection.js";
import type { Subject } from "../types.js";

const opts = (a: string, b: string, c: string, d: string) => [
  { id: "a", text: a },
  { id: "b", text: b },
  { id: "c", text: c },
  { id: "d", text: d },
];

interface BaseFields {
  subject: Subject;
  competency: string;
  prompt: string;
  points: number;
  difficulty: 1 | 2 | 3;
}

type SeedQuestion =
  | (BaseFields & { format_type: "multiple-choice" | "true-false" | "visual-click"; options: { id: string; text: string }[]; correct_option_id: string })
  | (BaseFields & { format_type: "fill-blank"; acceptedAnswers: string[] })
  | (BaseFields & { format_type: "numeric-input"; correctValue: number; tolerance: number })
  | (BaseFields & { format_type: "matching"; pairs: { id: string; left: string; right: string }[] })
  | (BaseFields & { format_type: "sequence"; items: { id: string; text: string }[]; correctOrder: string[] });

// Transcrito de docs/BANCO_QUESTOES_EXEMPLO.md — Formato 1 (Multiple Choice) de
// cada uma das 10 competências modeladas no documento.
const multipleChoice: SeedQuestion[] = [
  { format_type: "multiple-choice", subject: "matematica", competency: "Adição até 10", prompt: "Quanto é 4 + 3?", options: opts("5", "6", "7", "8"), correct_option_id: "c", points: 100, difficulty: 1 },
  { format_type: "multiple-choice", subject: "matematica", competency: "Subtração até 20", prompt: "Quanto é 15 - 8?", options: opts("7", "8", "9", "10"), correct_option_id: "a", points: 100, difficulty: 2 },
  { format_type: "multiple-choice", subject: "matematica", competency: "Multiplicação por 2, 5, 10", prompt: "Quanto é 5 × 4?", options: opts("15", "20", "25", "10"), correct_option_id: "b", points: 110, difficulty: 3 },
  { format_type: "multiple-choice", subject: "matematica", competency: "Divisão Simples", prompt: "Quanto é 20 ÷ 4?", options: opts("4", "5", "6", "7"), correct_option_id: "b", points: 120, difficulty: 3 },
  { format_type: "multiple-choice", subject: "matematica", competency: "Frações Básicas", prompt: "Se divido uma pizza em 4 pedaços e como 1, comi qual fração?", options: opts("1/2", "1/4", "1/3", "1/5"), correct_option_id: "b", points: 120, difficulty: 3 },
  { format_type: "multiple-choice", subject: "portugues", competency: "Vogais", prompt: "Qual dessas letras é uma VOGAL?", options: opts("B", "E", "M", "P"), correct_option_id: "b", points: 100, difficulty: 1 },
  { format_type: "multiple-choice", subject: "portugues", competency: "Sinônimos", prompt: "Sinônimo de 'FELIZ':", options: opts("Triste", "Alegre", "Assustado", "Cansado"), correct_option_id: "b", points: 100, difficulty: 2 },
  { format_type: "multiple-choice", subject: "portugues", competency: "Antônimos", prompt: "Antônimo de 'QUENTE':", options: opts("Tépido", "Frio", "Morno", "Gelado"), correct_option_id: "b", points: 110, difficulty: 2 },
  { format_type: "multiple-choice", subject: "portugues", competency: "Conjugação de Verbos", prompt: "Complete: 'Eu _____ um bolo ontem'", options: opts("Como", "Comerei", "Comi", "Comendo"), correct_option_id: "c", points: 120, difficulty: 3 },
  { format_type: "multiple-choice", subject: "portugues", competency: "Pontuação", prompt: "Qual frase está corretamente pontuada?", options: opts("João comeu e bebeu agua", "João, comeu e bebeu água", "João comeu e bebeu, água", "João, comeu, e bebeu água"), correct_option_id: "b", points: 120, difficulty: 3 },
];

// Autoria própria (verificada) — não transcrição literal dos exemplos de
// Drag & Drop de BANCO_QUESTOES_EXEMPLO.md, cujo gabarito declarado não bate
// com a conta em vários casos. 2 questões por formato novo, ver plano do
// Sprint 4 para o raciocínio de escopo.
const otherFormats: SeedQuestion[] = [
  // True/False
  { format_type: "true-false", subject: "matematica", competency: "Adição até 10", prompt: "4 + 3 = 7", options: [{ id: "true", text: "Verdadeiro" }, { id: "false", text: "Falso" }], correct_option_id: "true", points: 80, difficulty: 1 },
  { format_type: "true-false", subject: "portugues", competency: "Vogais", prompt: "A letra 'Y' é uma vogal do alfabeto português", options: [{ id: "true", text: "Verdadeiro" }, { id: "false", text: "Falso" }], correct_option_id: "false", points: 80, difficulty: 2 },

  // Visual Click (mesma forma de Multiple Choice — só muda o estilo de apresentação)
  { format_type: "visual-click", subject: "matematica", competency: "Contagem", prompt: "🍎🍎 + 🍎🍎🍎 = quantas maçãs no total?", options: opts("5", "7", "6", "8"), correct_option_id: "b", points: 100, difficulty: 1 },
  { format_type: "visual-click", subject: "portugues", competency: "Vogais", prompt: "Clique na VOGAL:", options: opts("B", "E", "M", "P"), correct_option_id: "b", points: 100, difficulty: 1 },

  // Fill Blank
  { format_type: "fill-blank", subject: "matematica", competency: "Adição até 10", prompt: "Tenho 3 bolas. Ganho 4 bolas a mais. Agora tenho _____ bolas.", acceptedAnswers: ["7"], points: 140, difficulty: 2 },
  { format_type: "fill-blank", subject: "portugues", competency: "Vogais", prompt: "Complete com a vogal que falta: G_TO (animal doméstico que mia)", acceptedAnswers: ["a"], points: 140, difficulty: 2 },

  // Numeric Input
  { format_type: "numeric-input", subject: "matematica", competency: "Subtração até 20", prompt: "Se tenho 12 laranjas e como 5, quantas sobram?", correctValue: 7, tolerance: 0, points: 140, difficulty: 2 },
  { format_type: "numeric-input", subject: "matematica", competency: "Divisão Simples", prompt: "Se tenho 24 canetas para dividir entre 6 amigos, cada um recebe quantas canetas?", correctValue: 4, tolerance: 0, points: 150, difficulty: 3 },

  // Matching
  {
    format_type: "matching",
    subject: "matematica",
    competency: "Adição até 10",
    prompt: "Conecte cada operação ao seu resultado",
    pairs: [
      { id: "p1", left: "2 + 3", right: "5" },
      { id: "p2", left: "4 + 3", right: "7" },
      { id: "p3", left: "6 + 3", right: "9" },
    ],
    points: 120,
    difficulty: 2,
  },
  {
    format_type: "matching",
    subject: "portugues",
    competency: "Sinônimos",
    prompt: "Conecte cada palavra ao seu sinônimo",
    pairs: [
      { id: "p1", left: "Alegre", right: "Contente" },
      { id: "p2", left: "Grande", right: "Enorme" },
      { id: "p3", left: "Rápido", right: "Veloz" },
    ],
    points: 120,
    difficulty: 2,
  },

  // Sequence
  {
    format_type: "sequence",
    subject: "matematica",
    competency: "Ordenação Numérica",
    prompt: "Ordene do menor para o maior",
    items: [
      { id: "s1", text: "7" },
      { id: "s2", text: "3" },
      { id: "s3", text: "5" },
      { id: "s4", text: "2" },
      { id: "s5", text: "8" },
    ],
    correctOrder: ["s4", "s2", "s3", "s1", "s5"],
    points: 120,
    difficulty: 2,
  },
  {
    format_type: "sequence",
    subject: "portugues",
    competency: "Ordem Alfabética",
    prompt: "Ordene em ordem alfabética",
    items: [
      { id: "s1", text: "Zebra" },
      { id: "s2", text: "Abelha" },
      { id: "s3", text: "Elefante" },
    ],
    correctOrder: ["s2", "s3", "s1"],
    points: 130,
    difficulty: 2,
  },
];

const questions = [...multipleChoice, ...otherFormats];

function seed() {
  console.log(`Seeding ${questions.length} game questions...`);

  const insert = db.prepare(
    `insert into questions (id, subject, competency, format_type, prompt, options, correct_option_id, answer_data, points, difficulty)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  db.exec("BEGIN");
  try {
    db.prepare("delete from questions").run();
    for (const q of questions) {
      const options = "options" in q ? JSON.stringify(q.options) : null;
      const correctOptionId = "correct_option_id" in q ? q.correct_option_id : null;

      let answerData: unknown = null;
      if (q.format_type === "fill-blank") answerData = { acceptedAnswers: q.acceptedAnswers };
      else if (q.format_type === "numeric-input") answerData = { correctValue: q.correctValue, tolerance: q.tolerance };
      else if (q.format_type === "matching") answerData = { pairs: q.pairs };
      else if (q.format_type === "sequence") answerData = { items: q.items, correctOrder: q.correctOrder };

      insert.run(
        randomUUID(),
        q.subject,
        q.competency,
        q.format_type,
        q.prompt,
        options,
        correctOptionId,
        answerData ? JSON.stringify(answerData) : null,
        q.points,
        q.difficulty
      );
    }
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }

  console.log("Seed complete.");
}

try {
  seed();
} catch (err) {
  console.error("Seed failed:", err);
  process.exitCode = 1;
} finally {
  db.close();
}
