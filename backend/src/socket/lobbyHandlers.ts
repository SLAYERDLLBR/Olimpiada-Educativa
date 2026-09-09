import type { Server, Socket } from "socket.io";
import { getPlayerById } from "../services/PlayerService.js";
import * as RoomService from "../services/RoomService.js";
import { balanceTeams, MIN_PLAYERS_TO_BALANCE } from "../services/TeamBalanceService.js";
import type { RoomPlayer, RoomSnapshot } from "../types.js";

interface RoomSocket extends Socket {
  data: { playerId: string; roomCode?: string };
}

type Ack = (response: { ok: true; snapshot?: RoomSnapshot } | { ok: false; error: string }) => void;

async function toRoomPlayer(playerId: string): Promise<RoomPlayer> {
  const player = await getPlayerById(playerId);
  if (!player.pretest_completed || player.skill_score === null) {
    throw new Error("Complete o pré-teste antes de entrar em uma sala.");
  }
  return {
    playerId: player.id,
    username: player.username,
    series: player.series,
    avatarIndex: player.avatar_index,
    skillScore: player.skill_score,
  };
}

function broadcastRoom(io: Server, code: string) {
  const room = RoomService.getRoom(code);
  if (room) io.to(code).emit("room:updated", RoomService.toSnapshot(room));
}

/** Shared by the explicit "room:leave" event and socket disconnect. */
function leaveCurrentRoom(io: Server, socket: RoomSocket) {
  const { roomCode } = socket.data;
  if (!roomCode) return;

  socket.leave(roomCode);
  socket.data.roomCode = undefined;
  const room = RoomService.leaveRoom(roomCode, socket.data.playerId);
  if (room) io.to(roomCode).emit("room:updated", RoomService.toSnapshot(room));
}

export function registerLobbyHandlers(io: Server, socket: RoomSocket) {
  socket.on("room:create", async (_payload, ack: Ack) => {
    try {
      leaveCurrentRoom(io, socket);
      const host = await toRoomPlayer(socket.data.playerId);
      const room = RoomService.createRoom(host);
      socket.join(room.code);
      socket.data.roomCode = room.code;
      ack({ ok: true, snapshot: RoomService.toSnapshot(room) });
    } catch (err) {
      ack({ ok: false, error: err instanceof Error ? err.message : "Erro ao criar sala." });
    }
  });

  socket.on("room:join", async (payload: { code: string }, ack: Ack) => {
    try {
      const code = payload.code.trim().toUpperCase();
      leaveCurrentRoom(io, socket);
      const player = await toRoomPlayer(socket.data.playerId);
      const room = RoomService.joinRoom(code, player);
      socket.join(room.code);
      socket.data.roomCode = room.code;
      const snapshot = RoomService.toSnapshot(room);
      ack({ ok: true, snapshot });
      socket.to(room.code).emit("room:updated", snapshot);
    } catch (err) {
      ack({ ok: false, error: err instanceof Error ? err.message : "Erro ao entrar na sala." });
    }
  });

  socket.on("room:leave", (_payload, ack: Ack) => {
    leaveCurrentRoom(io, socket);
    ack({ ok: true });
  });

  socket.on("room:balance", (_payload, ack: Ack) => {
    try {
      const { roomCode, playerId } = socket.data;
      if (!roomCode) throw new Error("Você não está em uma sala.");
      const room = RoomService.getRoom(roomCode);
      if (!room) throw new Error("Sala não encontrada.");
      if (room.hostPlayerId !== playerId) throw new Error("Só o host pode distribuir os times.");
      if (room.players.size < MIN_PLAYERS_TO_BALANCE) {
        throw new Error(`Mínimo de ${MIN_PLAYERS_TO_BALANCE} jogadores para distribuir times.`);
      }

      const teams = balanceTeams(Array.from(room.players.values()));
      const updated = RoomService.setTeams(roomCode, teams);
      const snapshot = RoomService.toSnapshot(updated);
      ack({ ok: true, snapshot });
      broadcastRoom(io, roomCode);
    } catch (err) {
      ack({ ok: false, error: err instanceof Error ? err.message : "Erro ao distribuir times." });
    }
  });

  socket.on("room:start", (_payload, ack: Ack) => {
    try {
      const { roomCode, playerId } = socket.data;
      if (!roomCode) throw new Error("Você não está em uma sala.");
      const room = RoomService.getRoom(roomCode);
      if (!room) throw new Error("Sala não encontrada.");
      if (room.hostPlayerId !== playerId) throw new Error("Só o host pode começar o jogo.");

      const updated = RoomService.startGame(roomCode);
      const snapshot = RoomService.toSnapshot(updated);
      ack({ ok: true, snapshot });
      io.to(roomCode).emit("room:game-starting", snapshot);
    } catch (err) {
      ack({ ok: false, error: err instanceof Error ? err.message : "Erro ao começar o jogo." });
    }
  });

  socket.on("disconnect", () => leaveCurrentRoom(io, socket));
}
