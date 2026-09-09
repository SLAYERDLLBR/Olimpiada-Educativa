import { motion } from "framer-motion";
import type { GameQuestion } from "../../types/index.ts";

interface QuestionCardProps {
  question: GameQuestion;
  disabled: boolean;
  selectedOptionId: string | null;
  correctOptionId?: string | null;
  onSelect: (optionId: string) => void;
}

export function QuestionCard({ question, disabled, selectedOptionId, correctOptionId, onSelect }: QuestionCardProps) {
  return (
    <motion.div
      className="w-full max-w-2xl rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-2 flex justify-between text-xs uppercase text-gray-400">
        <span>Pontos: {question.points}</span>
      </div>

      <p className="mb-6 text-xl font-bold text-white">{question.prompt}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(question.options ?? []).map((option, index) => {
          const isCorrect = correctOptionId === option.id;
          const isWrongSelected = correctOptionId != null && selectedOptionId === option.id && !isCorrect;

          return (
            <motion.button
              key={option.id}
              onClick={() => !disabled && onSelect(option.id)}
              disabled={disabled}
              className={`rounded-lg border-2 p-4 font-bold uppercase tracking-wide transition-all ${
                isCorrect
                  ? "border-success bg-success/20"
                  : isWrongSelected
                    ? "border-danger bg-danger/20"
                    : selectedOptionId === option.id
                      ? "border-accent-orange bg-accent-orange/20"
                      : "border-accent-purple/50 hover:border-accent-purple"
              } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={!disabled ? { scale: 1.03 } : {}}
            >
              {option.text}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
