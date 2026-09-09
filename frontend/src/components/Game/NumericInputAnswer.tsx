import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../Common/GlowButton.tsx";
import type { GameQuestion } from "../../types/index.ts";

interface NumericInputAnswerProps {
  question: GameQuestion;
  disabled: boolean;
  onSubmit: (value: number) => void;
}

export function NumericInputAnswer({ question, disabled, onSubmit }: NumericInputAnswerProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const parsed = Number(value);
    if (value.trim() && !Number.isNaN(parsed)) onSubmit(parsed);
  };

  return (
    <motion.div
      className="w-full max-w-2xl rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-2 text-xs uppercase text-gray-400">Pontos: {question.points}</div>
      <p className="mb-6 text-xl font-bold text-white">{question.prompt}</p>

      <div className="flex gap-3">
        <input
          type="number"
          className="flex-1 font-mono"
          value={value}
          disabled={disabled}
          placeholder="Digite o número"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <GlowButton onClick={handleSubmit} disabled={disabled || !value.trim()}>
          Confirmar
        </GlowButton>
      </div>
    </motion.div>
  );
}
