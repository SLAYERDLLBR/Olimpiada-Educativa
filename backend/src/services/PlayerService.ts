import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { query } from "../database/connection.js";
import type { PlayerRow } from "../types.js";

export async function createPlayer(
  username: string,
  series: number,
  avatarIndex: number
): Promise<PlayerRow> {
  const result = await query<PlayerRow>(
    `insert into players (username, series, avatar_index) values ($1, $2, $3) returning *`,
    [username, series, avatarIndex]
  );
  return result.rows[0];
}

export async function getPlayerById(playerId: string): Promise<PlayerRow> {
  const result = await query<PlayerRow>(`select * from players where id = $1`, [playerId]);
  if (result.rows.length === 0) {
    throw new Error(`Player not found: ${playerId}`);
  }
  return result.rows[0];
}

export async function markPretestCompleted(
  playerId: string,
  skillScore: number,
  dominantSubjects: string[]
): Promise<void> {
  await query(
    `update players set skill_score = $1, pretest_completed = true, dominant_subjects = $2 where id = $3`,
    [skillScore, dominantSubjects, playerId]
  );
}

/** Short-lived token (2h) — authenticates the Socket.IO handshake for one session, not a persistent account. */
export function issueSessionToken(playerId: string): string {
  return jwt.sign({ playerId }, env.jwtSecret, { expiresIn: "2h" });
}

export function verifySessionToken(token: string): { playerId: string } {
  return jwt.verify(token, env.jwtSecret) as { playerId: string };
}
