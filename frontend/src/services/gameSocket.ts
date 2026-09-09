import { getSocket } from "./socket.ts";
import type { GameFinishedPayload, RoundEndPayload, RoundStartPayload, TeamAnsweredPayload } from "../types/index.ts";

export function submitAnswer(optionId: string): Promise<void> {
  const socket = getSocket();
  if (!socket) return Promise.reject(new Error("Não conectado ao servidor."));

  return new Promise((resolve, reject) => {
    socket.emit("game:submit-answer", { optionId }, (response: { ok: boolean; error?: string }) => {
      if (response.ok) resolve();
      else reject(new Error(response.error ?? "Erro ao responder."));
    });
  });
}

function on<T>(event: string, callback: (payload: T) => void): () => void {
  const socket = getSocket();
  if (!socket) return () => {};
  socket.on(event, callback);
  return () => socket.off(event, callback);
}

export const onRoundStart = (cb: (payload: RoundStartPayload) => void) => on("game:round-start", cb);
export const onTeamAnswered = (cb: (payload: TeamAnsweredPayload) => void) => on("game:team-answered", cb);
export const onRoundEnd = (cb: (payload: RoundEndPayload) => void) => on("game:round-end", cb);
export const onGameFinished = (cb: (payload: GameFinishedPayload) => void) => on("game:finished", cb);
