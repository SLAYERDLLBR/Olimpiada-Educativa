import { motion } from "framer-motion";
import type { SurveyChoice } from "../../types/index.ts";

interface SkillSurveyProps {
  onSubmit: (choice: SurveyChoice) => void;
}

const OPTIONS: { value: SurveyChoice; label: string }[] = [
  { value: "portugues", label: "Português (Leitura, Escrita)" },
  { value: "matematica", label: "Matemática (Contas, Problemas)" },
  { value: "ambas", label: "Ambas" },
  { value: "nenhuma", label: "Nenhuma (tudo OK!)" },
];

export function SkillSurvey({ onSubmit }: SkillSurveyProps) {
  return (
    <motion.div
      className="w-full max-w-lg rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="mb-2 font-heading text-h4 uppercase text-white text-shadow-neon">Avaliação Tática</h2>
      <p className="mb-6 text-gray-300">Escolha as matérias que você se sente FORTE:</p>

      <div className="space-y-3">
        {OPTIONS.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => onSubmit(option.value)}
            className="w-full rounded-lg border-2 border-accent-purple/50 p-4 text-left font-bold text-white transition-all hover:border-accent-purple hover:bg-accent-purple/10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
