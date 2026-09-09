import { motion } from "framer-motion";
import type { TimerPhase } from "../../hooks/useGameTimer.ts";

const PHASE_STYLES: Record<TimerPhase, { color: string; label: string }> = {
  speedrun: { color: "#27ae60", label: "🔥 SPEEDRUN" },
  early: { color: "#f39c12", label: "⚡ EARLY ADVANCE" },
  normal: { color: "#e67e22", label: "⏱️ NORMAL" },
  timeout: { color: "#e74c3c", label: "⚠️ TIMEOUT" },
};

export function GameTimerBar({ remainingSeconds, phase }: { remainingSeconds: number; phase: TimerPhase }) {
  const style = PHASE_STYLES[phase];

  return (
    <motion.div
      className="flex w-64 flex-col items-center rounded-lg border-2 p-4"
      style={{ borderColor: style.color, color: style.color }}
      animate={phase === "timeout" ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.3, repeat: phase === "timeout" ? Infinity : 0 }}
    >
      <span className="font-mono text-4xl font-bold tabular-nums">{String(remainingSeconds).padStart(2, "0")}s</span>
      <span className="mt-1 text-xs font-bold uppercase tracking-wider">{style.label}</span>
    </motion.div>
  );
}
