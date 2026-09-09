import { getSocket } from "./socket.ts";
import type { AckResponse, RoomSnapshot } from "../types/index.ts";

function emitWithAck(event: string, payload: unknown = {}): Promise<RoomSnapshot | undefined> {
  const socket = getSocket();
  if (!socket) return Promise.reject(new Error("Não conectado ao servidor."));

  return new Promise((resolve, reject) => {
    socket.emit(event, payload, (response: AckResponse) => {
      if (response.ok) resolve(response.snapshot);
      else reject(new Error(response.error ?? "Erro desconhecido."));
    });
  });
}

export const createRoom = () => emitWithAck("room:create");
export const joinRoom = (code: string) => emitWithAck("room:join", { code });
export const leaveRoom = () => emitWithAck("room:leave");
export const balanceTeams = () => emitWithAck("room:balance");
export const startGame = () => emitWithAck("room:start");

function on(event: string, callback: (snapshot: RoomSnapshot) => void): () => void {
  const socket = getSocket();
  if (!socket) return () => {};

  socket.on(event, callback);
  return () => socket.off(event, callback);
}

export const onRoomUpdated = (callback: (snapshot: RoomSnapshot) => void) => on("room:updated", callback);
export const onGameStarting = (callback: (snapshot: RoomSnapshot) => void) => on("room:game-starting", callback);
