import type { RoomPlayer, RoomSnapshot, RoomStatus, Team } from "../types.js";
import { calculateVariance } from "./TeamBalanceService.js";

interface Room {
  code: string;
  hostPlayerId: string;
  status: RoomStatus;
  /** Insertion order matters for host promotion — Map preserves it. */
  players: Map<string, RoomPlayer>;
  teams: Team[] | null;
}

const ROOM_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — avoids ambiguity when read aloud
const rooms = new Map<string, Room>();

function generateRoomCode(): string {
  let code: string;
  do {
    code = Array.from({ length: 6 }, () => ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)]).join("");
  } while (rooms.has(code));
  return code;
}

export function createRoom(host: RoomPlayer): Room {
  const code = generateRoomCode();
  const room: Room = {
    code,
    hostPlayerId: host.playerId,
    status: "waiting",
    players: new Map([[host.playerId, host]]),
    teams: null,
  };
  rooms.set(code, room);
  return room;
}

export function getRoom(code: string): Room | undefined {
  return rooms.get(code);
}

export function joinRoom(code: string, player: RoomPlayer): Room {
  const room = rooms.get(code);
  if (!room) throw new Error("Sala não encontrada.");
  if (room.status === "playing") throw new Error("Essa sala já começou o jogo.");

  room.players.set(player.playerId, player);
  if (room.status === "ready") {
    room.status = "waiting";
    room.teams = null;
  }
  return room;
}

/** Shared by explicit "leave" and socket disconnect. Returns the room if it still exists (deleted once empty). */
export function leaveRoom(code: string, playerId: string): Room | undefined {
  const room = rooms.get(code);
  if (!room) return undefined;

  room.players.delete(playerId);

  if (room.players.size === 0) {
    rooms.delete(code);
    return undefined;
  }

  if (room.hostPlayerId === playerId) {
    room.hostPlayerId = room.players.keys().next().value!;
  }

  if (room.status === "ready") {
    room.status = "waiting";
    room.teams = null;
  }

  return room;
}

export function setTeams(code: string, teams: Team[]): Room {
  const room = rooms.get(code);
  if (!room) throw new Error("Sala não encontrada.");
  if (room.status === "playing") throw new Error("O jogo já começou nesta sala.");
  room.teams = teams;
  room.status = "ready";
  return room;
}

export function startGame(code: string): Room {
  const room = rooms.get(code);
  if (!room) throw new Error("Sala não encontrada.");
  if (room.status === "playing") throw new Error("O jogo já começou nesta sala.");
  if (!room.teams) throw new Error("Distribua os times antes de começar.");
  room.status = "playing";
  return room;
}

export function toSnapshot(room: Room): RoomSnapshot {
  return {
    code: room.code,
    hostPlayerId: room.hostPlayerId,
    status: room.status,
    players: Array.from(room.players.values()),
    teams: room.teams,
    variance: room.teams ? calculateVariance(room.teams) : null,
  };
}
