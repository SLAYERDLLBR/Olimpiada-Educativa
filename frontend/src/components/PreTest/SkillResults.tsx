import { motion } from "framer-motion";
import type { PretestResult } from "../../types/index.ts";

function badge(correct: boolean) {
  return correct ? { label: "Bom!", emoji: "🟢" } : { label: "A melhorar", emoji: "🟡" };
}

function scoreBadge(score: number) {
  if (score >= 75) return "🟢 Ótimo!";
  if (score >= 50) return "🟡 Bom";
  return "🔴 Iniciante";
}

export function SkillResults({ result }: { result: PretestResult }) {
  const pt = badge(result.portugueseCorrect);
  const mat = badge(result.mathCorrect);

  return (
    <motion.div
      className="w-full max-w-lg rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 text-center shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-6 font-heading text-h4 uppercase text-white text-shadow-neon">Avaliação Completa</h2>

      <motion.p
        className="mb-4 font-mono text-5xl font-bold text-accent-orange"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
      >
        {result.skillScore}/100
      </motion.p>
      <p className="mb-6 text-lg">{scoreBadge(result.skillScore)}</p>

      <div className="flex justify-around text-gray-300">
        <div>
          <p className="text-sm uppercase">Português</p>
          <p className="text-lg font-bold">
            {pt.emoji} {pt.label}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase">Matemática</p>
          <p className="text-lg font-bold">
            {mat.emoji} {mat.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
