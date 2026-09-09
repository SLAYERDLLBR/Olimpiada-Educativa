import { motion } from "framer-motion";
import { useState } from "react";
import { useTimer } from "../../hooks/useTimer.ts";
import type { PublicQuestion } from "../../types/index.ts";

interface TestQuestionProps {
  label: string;
  question: PublicQuestion;
  onAnswer: (optionId: string) => void;
}

export function TestQuestion({ label, question, onAnswer }: TestQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const remaining = useTimer(40, () => onAnswer(selected ?? ""));

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
    onAnswer(optionId);
  };

  return (
    <motion.div
      className="w-full max-w-lg rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-sm uppercase tracking-wider text-accent-cyan">{label}</h2>
        <span className="font-mono font-bold text-accent-orange">{remaining}s</span>
      </div>

      <p className="mb-6 text-xl font-bold text-white">{question.prompt}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`rounded-lg border-2 p-4 font-bold uppercase tracking-wide transition-all ${
              selected === option.id
                ? "border-accent-orange bg-accent-orange/20"
                : "border-accent-purple/50 hover:border-accent-purple"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
