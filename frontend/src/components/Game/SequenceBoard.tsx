import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../Common/GlowButton.tsx";
import type { GameQuestion } from "../../types/index.ts";

interface SequenceBoardProps {
  question: GameQuestion;
  disabled: boolean;
  onSubmit: (order: string[]) => void;
}

export function SequenceBoard({ question, disabled, onSubmit }: SequenceBoardProps) {
  const [order, setOrder] = useState<string[]>([]);

  const items = question.sequenceItems ?? [];
  const byId = new Map(items.map((item) => [item.id, item.text]));
  const available = items.filter((item) => !order.includes(item.id));

  const addToOrder = (id: string) => {
    if (disabled) return;
    setOrder([...order, id]);
  };

  const removeFromOrder = (index: number) => {
    if (disabled) return;
    setOrder(order.filter((_, i) => i !== index));
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

      <p className="mb-2 text-xs uppercase text-gray-400">Sua sequência (clique para desfazer):</p>
      <div className="mb-4 flex min-h-[3rem] flex-wrap gap-2 rounded-lg border-2 border-dashed border-accent-purple/50 p-3">
        {order.length === 0 && <span className="text-sm text-gray-500">Clique nos itens abaixo, em ordem</span>}
        {order.map((id, index) => (
          <button
            key={`${id}-${index}`}
            onClick={() => removeFromOrder(index)}
            disabled={disabled}
            className="rounded-lg border-2 border-accent-orange bg-accent-orange/20 px-3 py-2 font-bold text-white"
          >
            {index + 1}. {byId.get(id)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((item) => (
          <button
            key={item.id}
            onClick={() => addToOrder(item.id)}
            disabled={disabled}
            className={`rounded-lg border-2 border-accent-purple/50 px-3 py-2 font-bold text-white transition-all hover:border-accent-purple ${
              disabled ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>

      <GlowButton onClick={() => onSubmit(order)} disabled={disabled || order.length !== items.length} className="mt-4 w-full">
        Confirmar
      </GlowButton>
    </motion.div>
  );
}
