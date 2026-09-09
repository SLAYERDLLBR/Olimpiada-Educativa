import type { Server, Socket } from "socket.io";
import * as GameService from "../services/GameService.js";

interface GameSocket extends Socket {
  data: { playerId: string; roomCode?: string };
}

type Ack = (response: { ok: true } | { ok: false; error: string }) => void;

export function registerGameHandlers(io: Server, socket: GameSocket) {
  socket.on("game:submit-answer", (payload: { optionId: string }, ack: Ack) => {
    const { roomCode, playerId } = socket.data;
    if (!roomCode) {
      ack({ ok: false, error: "Você não está em uma sala." });
      return;
    }
    ack(GameService.submitAnswer(roomCode, playerId, payload.optionId, io));
  });
}
