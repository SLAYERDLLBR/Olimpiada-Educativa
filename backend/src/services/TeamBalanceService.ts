import type { RoomPlayer, Team } from "../types.js";

export const MIN_PLAYERS_TO_BALANCE = 4;
const TARGET_TEAM_SIZE = 4;
const TEAM_COLORS = ["red", "blue", "yellow", "green", "purple", "orange", "cyan"];

/**
 * Snake draft by skill score: round 0 assigns teams 0..n-1, round 1 assigns
 * n-1..0, and so on. The team that picks last in a round picks first in the
 * next one, which is what keeps per-team totals close without a brute-force
 * search — the "min-max variance" docs/PRE_TESTE_BALANCEAMENTO_COD.md gestures
 * at but never actually implements correctly.
 */
export function balanceTeams(players: RoomPlayer[]): Team[] {
  const numTeams = Math.max(2, Math.round(players.length / TARGET_TEAM_SIZE));
  const sorted = [...players].sort((a, b) => b.skillScore - a.skillScore);
  const teamPlayers: RoomPlayer[][] = Array.from({ length: numTeams }, () => []);

  sorted.forEach((player, i) => {
    const round = Math.floor(i / numTeams);
    const indexInRound = i % numTeams;
    const teamIndex = round % 2 === 0 ? indexInRound : numTeams - 1 - indexInRound;
    teamPlayers[teamIndex].push(player);
  });

  return teamPlayers.map((players, i) => ({
    color: TEAM_COLORS[i % TEAM_COLORS.length],
    players,
    totalScore: players.reduce((sum, p) => sum + p.skillScore, 0),
  }));
}

export function calculateVariance(teams: Team[]): { absolute: number; percent: number } {
  const totals = teams.map((t) => t.totalScore);
  const max = Math.max(...totals);
  const min = Math.min(...totals);
  const average = totals.reduce((sum, t) => sum + t, 0) / totals.length;
  const absolute = max - min;
  return { absolute, percent: average > 0 ? Math.round((absolute / average) * 100) : 0 };
}
