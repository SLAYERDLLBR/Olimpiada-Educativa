import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../Common/GlowButton.tsx";
import type { GameQuestion } from "../../types/index.ts";

interface MatchingBoardProps {
  question: GameQuestion;
  disabled: boolean;
  onSubmit: (matches: { leftId: string; rightId: string }[]) => void;
}

// Tailwind needs literal class strings in the source — built from an index,
// not interpolated, so the production build keeps these classes.
const PAIR_STYLES = [
  "border-accent-orange bg-accent-orange/20",
  "border-accent-cyan bg-accent-cyan/20",
  "border-success bg-success/20",
  "border-team-yellow bg-team-yellow/20",
  "border-accent-pink bg-accent-pink/20",
];

export function MatchingBoard({ question, disabled, onSubmit }: MatchingBoardProps) {
  const [matches, setMatches] = useState<{ leftId: string; rightId: string }[]>([]);
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);

  const left = question.matchingLeft ?? [];
  const right = question.matchingRight ?? [];

  const pairStyleFor = (itemId: string) => {
    const index = matches.findIndex((m) => m.leftId === itemId || m.rightId === itemId);
    return index === -1 ? null : PAIR_STYLES[index % PAIR_STYLES.length];
  };

  const handleLeftClick = (id: string) => {
    if (disabled) return;
    if (matches.some((m) => m.leftId === id)) {
      setMatches(matches.filter((m) => m.leftId !== id));
      return;
    }
    setSelectedLeftId(id === selectedLeftId ? null : id);
  };

  const handleRightClick = (id: string) => {
    if (disabled) return;
    if (matches.some((m) => m.rightId === id)) {
      setMatches(matches.filter((m) => m.rightId !== id));
      return;
    }
    if (!selectedLeftId) return;
    setMatches([...matches, { leftId: selectedLeftId, rightId: id }]);
    setSelectedLeftId(null);
  };

  const allMatched = matches.length === left.length && left.length > 0;

  return (
    <motion.div
      className="w-full max-w-2xl rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-2 text-xs uppercase text-gray-400">Pontos: {question.points}</div>
      <p className="mb-6 text-xl font-bold text-white">{question.prompt}</p>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {left.map((item) => {
            const paired = pairStyleFor(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleLeftClick(item.id)}
                disabled={disabled}
                className={`w-full rounded-lg border-2 p-3 font-bold transition-all ${
                  paired ?? (selectedLeftId === item.id ? "border-white bg-white/10" : "border-accent-purple/50 hover:border-accent-purple")
                } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {right.map((item) => {
            const paired = pairStyleFor(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                disabled={disabled}
                className={`w-full rounded-lg border-2 p-3 font-bold transition-all ${
                  paired ?? "border-accent-purple/50 hover:border-accent-purple"
                } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">Clique um item da esquerda, depois o par certo na direita.</p>

      <GlowButton onClick={() => onSubmit(matches)} disabled={disabled || !allMatched} className="mt-4 w-full">
        Confirmar
      </GlowButton>
    </motion.div>
  );
}
