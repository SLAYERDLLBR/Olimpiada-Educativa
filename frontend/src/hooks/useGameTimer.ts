import { useEffect, useState } from "react";

export type TimerPhase = "speedrun" | "early" | "normal" | "timeout";

function computePhase(elapsedMs: number): TimerPhase {
  if (elapsedMs < 15_000) return "speedrun";
  if (elapsedMs < 30_000) return "early";
  if (elapsedMs < 40_000) return "normal";
  return "timeout";
}

/**
 * Derives the countdown from the server's `startedAt` timestamp instead of a
 * local setState-driven clock, so a re-render (or a slow tab) never drifts
 * from when the server will actually end the round.
 */
export function useGameTimer(startedAt: number, timeLimitMs: number) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, [startedAt]);

  const elapsedMs = now - startedAt;
  const remainingMs = Math.max(0, timeLimitMs - elapsedMs);

  return { remainingSeconds: Math.ceil(remainingMs / 1000), phase: computePhase(elapsedMs) };
}
