import { useEffect, useState } from "react";

/** Simple 40s countdown. Phase-based visuals (speedrun/early/normal/timeout) arrive with the game itself in Sprint 2. */
export function useTimer(totalSeconds: number, onTimeUp: () => void) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp();
      return;
    }

    const timeout = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timeout);
  }, [remaining, onTimeUp]);

  return remaining;
}
