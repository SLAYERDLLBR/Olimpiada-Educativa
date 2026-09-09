import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { query } from "../database/connection.js";
import type { PlayerRow } from "../types.js";

/** Raw shape as SQLite hands it back — booleans as 0/1, JSON columns as text. */
interface PlayerRowRaw extends Omit<PlayerRow, "pretest_completed" | "dominant_subjects"> {
  pretest_completed: number;
  dominant_subjects: string;
}

function fromRaw(row: PlayerRowRaw): PlayerRow {
  return {
    ...row,
    pretest_completed: !!row.pretest_completed,
    dominant_subjects: JSON.parse(row.dominant_subjects),
  };
}

export async function createPlayer(
  username: string,
  series: number,
  avatarIndex: number
): Promise<PlayerRow> {
  const id = randomUUID();
  await query(
    `insert into players (id, username, series, avatar_index) values ($1, $2, $3, $4)`,
    [id, username, series, avatarIndex]
  );

  // No RETURNING in SQLite — the row we just inserted is exactly this, no round-trip needed.
  return {
    id,
    username,
    series,
    avatar_index: avatarIndex,
    skill_score: null,
    pretest_completed: false,
    dominant_subjects: [],
    created_at: new Date().toISOString(),
  };
}

export async function getPlayerById(playerId: string): Promise<PlayerRow> {
  const result = await query<PlayerRowRaw>(`select * from players where id = $1`, [playerId]);
  if (result.rows.length === 0) {
    throw new Error(`Player not found: ${playerId}`);
  }
  return fromRaw(result.rows[0]);
}

export async function markPretestCompleted(
  playerId: string,
  skillScore: number,
  dominantSubjects: string[]
): Promise<void> {
  await query(
    `update players set skill_score = $1, pretest_completed = 1, dominant_subjects = $2 where id = $3`,
    [skillScore, JSON.stringify(dominantSubjects), playerId]
  );
}

/** Short-lived token (2h) — authenticates the Socket.IO handshake for one session, not a persistent account. */
export function issueSessionToken(playerId: string): string {
  return jwt.sign({ playerId }, env.jwtSecret, { expiresIn: "2h" });
}

export function verifySessionToken(token: string): { playerId: string } {
  return jwt.verify(token, env.jwtSecret) as { playerId: string };
}
