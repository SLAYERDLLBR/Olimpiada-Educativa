import type { Server, Socket } from "socket.io";
import { verifySessionToken } from "../services/PlayerService.js";
import { registerLobbyHandlers } from "./lobbyHandlers.js";

interface AuthenticatedSocket extends Socket {
  data: { playerId: string; roomCode?: string };
}

export function registerSocketHandlers(io: Server) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (typeof token !== "string") {
      next(new Error("Missing session token"));
      return;
    }

    try {
      const { playerId } = verifySessionToken(token);
      (socket as AuthenticatedSocket).data.playerId = playerId;
      next();
    } catch {
      next(new Error("Invalid or expired session token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`Player connected: ${socket.data.playerId}`);

    // Sprint 1 smoke test only.
    socket.on("ping", () => {
      socket.emit("pong", { at: Date.now() });
    });

    registerLobbyHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.data.playerId}`);
    });
  });
}
