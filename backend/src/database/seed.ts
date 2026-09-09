import { pool } from "./connection.js";
import type { Subject } from "../types.js";

interface SeedQuestion {
  series: number;
  subject: Subject;
  category: string;
  prompt: string;
  options: { id: string; text: string }[];
  correct_option_id: string;
  difficulty: 1 | 2 | 3;
}

const opts = (a: string, b: string, c: string, d: string) => [
  { id: "a", text: a },
  { id: "b", text: b },
  { id: "c", text: c },
  { id: "d", text: d },
];

// Transcrito de docs/BANCO_QUESTOES_PRE_TESTE_25.md — as únicas 50 questões com
// texto completo disponível nos documentos (séries 1º-2º). Séries 3º-5º ficam
// para quando o conteúdo pedagógico completo for produzido.
const questions: SeedQuestion[] = [
  // Português — Vogais & Consoantes
  { series: 1, subject: "portugues", category: "vogais-consoantes", prompt: "Qual letra é uma VOGAL?", options: opts("B", "P", "E", "M"), correct_option_id: "c", difficulty: 1 },
  { series: 1, subject: "portugues", category: "vogais-consoantes", prompt: "Qual palavra começa com CONSOANTE?", options: opts("Abelha", "Elefante", "Ônibus", "Bola"), correct_option_id: "d", difficulty: 1 },
  { series: 1, subject: "portugues", category: "vogais-consoantes", prompt: "Quantas VOGAIS tem a palavra GATO?", options: opts("1", "2", "3", "4"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "portugues", category: "vogais-consoantes", prompt: "Qual palavra tem mais VOGAIS?", options: opts("Pato", "Autoridade", "Gato", "Mato"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "portugues", category: "vogais-consoantes", prompt: "Qual é uma CONSOANTE que aparece em LIVRO?", options: opts("V", "I", "O", "Nenhuma acima"), correct_option_id: "a", difficulty: 2 },

  // Português — Sílabas
  { series: 1, subject: "portugues", category: "silabas", prompt: "Quantas sílabas tem a palavra BOLA?", options: opts("1", "2", "3", "4"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "portugues", category: "silabas", prompt: "Separe em sílabas: GATO", options: opts("GA-TO", "G-ATO", "GAT-O", "GA-TA"), correct_option_id: "a", difficulty: 1 },
  { series: 1, subject: "portugues", category: "silabas", prompt: "Qual palavra tem 3 sílabas?", options: opts("Pão", "Abelha", "Gato", "Sol"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "portugues", category: "silabas", prompt: "A palavra ELEFANTE tem quantas sílabas?", options: opts("2", "3", "4", "5"), correct_option_id: "c", difficulty: 2 },
  { series: 1, subject: "portugues", category: "silabas", prompt: "Qual é a SEGUNDA sílaba da palavra ESCOLA?", options: opts("ES", "CO", "LA", "OLA"), correct_option_id: "b", difficulty: 2 },

  // Português — Ordem Alfabética
  { series: 1, subject: "portugues", category: "ordem-alfabetica", prompt: "Qual ordem está CERTA?", options: opts("B, C, A", "A, B, C", "C, B, A", "A, C, B"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "portugues", category: "ordem-alfabetica", prompt: "Ordene: GATO, ABELHA, BORBOLETA", options: opts("GATO, ABELHA, BORBOLETA", "ABELHA, BORBOLETA, GATO", "BORBOLETA, GATO, ABELHA", "GATO, BORBOLETA, ABELHA"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "portugues", category: "ordem-alfabetica", prompt: "Qual palavra vem PRIMEIRO no dicionário?", options: opts("Mangueira", "Maçã", "Melancia", "Morango"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "portugues", category: "ordem-alfabetica", prompt: "Ordene: ZEBRA, ABELHA, ELEFANTE", options: opts("ABELHA, ELEFANTE, ZEBRA", "ZEBRA, ABELHA, ELEFANTE", "ELEFANTE, ZEBRA, ABELHA", "ABELHA, ZEBRA, ELEFANTE"), correct_option_id: "a", difficulty: 2 },
  { series: 1, subject: "portugues", category: "ordem-alfabetica", prompt: "Qual está em ORDEM ALFABÉTICA?", options: opts("Pão, Pato, Bola", "Bola, Pão, Pato", "Pato, Bola, Pão", "Pato, Pão, Bola"), correct_option_id: "b", difficulty: 3 },

  // Português — Leitura de Palavras
  { series: 1, subject: "portugues", category: "leitura-palavras", prompt: "Qual palavra é GATO?", options: opts("TAGO", "GATO", "TAGO", "AGOT"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "portugues", category: "leitura-palavras", prompt: "Leia: MAÇÃ. O que é?", options: opts("Uma fruta", "Uma cor", "Um animal", "Um número"), correct_option_id: "a", difficulty: 1 },
  { series: 1, subject: "portugues", category: "leitura-palavras", prompt: "Qual palavra significa ANIMAL COM PENAS?", options: opts("Passarinho", "Gato", "Cachorro", "Peixe"), correct_option_id: "a", difficulty: 2 },
  { series: 1, subject: "portugues", category: "leitura-palavras", prompt: "Qual palavra rima com GATO?", options: opts("Cachorro", "Rato", "Árvore", "Casa"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "portugues", category: "leitura-palavras", prompt: "Qual dessas palavras é um VERBO?", options: opts("Menina", "Correr", "Vermelho", "Árvore"), correct_option_id: "b", difficulty: 3 },

  // Português — Frases Simples
  { series: 1, subject: "portugues", category: "frases-simples", prompt: "Complete a frase: 'O _____ é amarelo'", options: opts("banana", "céu", "mar", "gato"), correct_option_id: "a", difficulty: 1 },
  { series: 1, subject: "portugues", category: "frases-simples", prompt: "Qual frase está CORRETA?", options: opts("O gato é um animal.", "um animal é gato o.", "É um animal gato o.", "Gato é um o animal."), correct_option_id: "a", difficulty: 1 },
  { series: 1, subject: "portugues", category: "frases-simples", prompt: "O que a frase diz? 'João gosta de brincar'", options: opts("João não gosta de brincar", "João gosta de brincar", "João quer brincar mas não pode", "Brincar é fácil"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "portugues", category: "frases-simples", prompt: "Complete: 'A menina _____ no parque'", options: opts("brinca", "brincando", "brincou", "brincará"), correct_option_id: "a", difficulty: 2 },
  { series: 1, subject: "portugues", category: "frases-simples", prompt: "Qual frase faz MAIS SENTIDO?", options: opts("O livro leu a menina", "A menina leu o livro", "O livro é menina", "Menina lê livro a"), correct_option_id: "b", difficulty: 3 },

  // Matemática — Contagem
  { series: 1, subject: "matematica", category: "contagem", prompt: "Quantas bolinhas? 🟢🟢🟢🟢🟢", options: opts("3", "4", "5", "6"), correct_option_id: "c", difficulty: 1 },
  { series: 1, subject: "matematica", category: "contagem", prompt: "Conte os dedos de uma mão:", options: opts("3", "5", "7", "10"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "contagem", prompt: "Quantos patos no total? 🦆🦆 + 🦆🦆🦆 = ?", options: opts("4", "5", "6", "7"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "contagem", prompt: "Qual número vem DEPOIS de 7?", options: opts("5", "6", "8", "9"), correct_option_id: "c", difficulty: 2 },
  { series: 1, subject: "matematica", category: "contagem", prompt: "Ordene do MENOR para o MAIOR: 9, 3, 7, 1", options: opts("1, 3, 7, 9", "3, 1, 7, 9", "9, 7, 3, 1", "1, 7, 3, 9"), correct_option_id: "a", difficulty: 3 },

  // Matemática — Adição até 10
  { series: 1, subject: "matematica", category: "adicao-ate-10", prompt: "Quanto é 2 + 3?", options: opts("4", "5", "6", "7"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "adicao-ate-10", prompt: "Quanto é 5 + 1?", options: opts("5", "6", "7", "8"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "adicao-ate-10", prompt: "4 + 4 = ?", options: opts("7", "8", "9", "10"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "adicao-ate-10", prompt: "Se tenho 6 maçãs e ganho 3 mais, quantas fico?", options: opts("8", "9", "10", "11"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "adicao-ate-10", prompt: "Complete: 3 + ___ = 10", options: opts("5", "6", "7", "8"), correct_option_id: "c", difficulty: 3 },

  // Matemática — Subtração até 10
  { series: 1, subject: "matematica", category: "subtracao-ate-10", prompt: "Quanto é 5 - 2?", options: opts("2", "3", "4", "5"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "subtracao-ate-10", prompt: "Quanto é 8 - 3?", options: opts("4", "5", "6", "7"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "subtracao-ate-10", prompt: "Se tenho 10 balas e como 4, quantas sobram?", options: opts("5", "6", "7", "8"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "subtracao-ate-10", prompt: "7 - 5 = ?", options: opts("1", "2", "3", "4"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "subtracao-ate-10", prompt: "Complete: 9 - ___ = 3", options: opts("4", "5", "6", "7"), correct_option_id: "c", difficulty: 3 },

  // Matemática — Comparação (<, >, =)
  { series: 1, subject: "matematica", category: "comparacao", prompt: "Qual está CORRETO?", options: opts("5 > 10", "5 < 10", "5 = 10", "10 < 5"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "comparacao", prompt: "3 ___ 3", options: opts(">", "<", "=", "≠"), correct_option_id: "c", difficulty: 1 },
  { series: 1, subject: "matematica", category: "comparacao", prompt: "Qual número é MAIOR que 7?", options: opts("5", "7", "8", "6"), correct_option_id: "c", difficulty: 2 },
  { series: 1, subject: "matematica", category: "comparacao", prompt: "Ordene: 9, 5, 10 (do MENOR ao MAIOR)", options: opts("10, 9, 5", "5, 9, 10", "9, 5, 10", "5, 10, 9"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "comparacao", prompt: "Qual dessas afirmações é VERDADEIRA?", options: opts("8 > 10", "6 = 6", "4 < 3", "10 < 5"), correct_option_id: "b", difficulty: 3 },

  // Matemática — Números Sequenciais
  { series: 1, subject: "matematica", category: "numeros-sequenciais", prompt: "Qual número vem DEPOIS de 5?", options: opts("4", "6", "7", "8"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "numeros-sequenciais", prompt: "Qual número vem ANTES de 8?", options: opts("6", "7", "8", "9"), correct_option_id: "b", difficulty: 1 },
  { series: 1, subject: "matematica", category: "numeros-sequenciais", prompt: "Complete a sequência: 2, 4, 6, ___", options: opts("7", "8", "9", "10"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "numeros-sequenciais", prompt: "Qual número está FALTANDO? 1, 2, ___, 4, 5", options: opts("2", "3", "4", "5"), correct_option_id: "b", difficulty: 2 },
  { series: 1, subject: "matematica", category: "numeros-sequenciais", prompt: "Qual é o próximo número? 5, 10, 15, ___", options: opts("16", "18", "20", "22"), correct_option_id: "c", difficulty: 3 },
];

// series=1 aqui cobre o par 1º-2º ano (como no doc de origem); duplicamos para
// series=2 para que o endpoint /pretest/questions?series=2 também funcione.
const allQuestions = [...questions, ...questions.map((q) => ({ ...q, series: 2 }))];

async function seed() {
  console.log(`Seeding ${allQuestions.length} pretest questions...`);

  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("delete from pretest_questions");

    for (const q of allQuestions) {
      await client.query(
        `insert into pretest_questions (series, subject, category, prompt, options, correct_option_id, difficulty)
         values ($1, $2, $3, $4, $5, $6, $7)`,
        [q.series, q.subject, q.category, q.prompt, JSON.stringify(q.options), q.correct_option_id, q.difficulty]
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
