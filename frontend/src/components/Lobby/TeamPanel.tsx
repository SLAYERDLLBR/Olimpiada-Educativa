import { motion } from "framer-motion";
import { PlayerCard } from "./PlayerCard.tsx";
import { getTeamColorClasses } from "../../constants/teamColors.ts";
import type { Team } from "../../types/index.ts";

export function TeamPanel({ team, hostPlayerId }: { team: Team; hostPlayerId: string }) {
  const colors = getTeamColorClasses(team.color);

  return (
    <motion.div
      className={`rounded-lg border-2 bg-primary-900/60 p-4 ${colors.border}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-heading text-sm uppercase ${colors.text}`}>Equipe {team.color}</h3>
        <span className="font-mono font-bold text-white">{team.totalScore} pts</span>
      </div>

      <div className="space-y-2">
        {team.players.map((player) => (
          <PlayerCard key={player.playerId} player={player} isHost={player.playerId === hostPlayerId} />
        ))}
      </div>
    </motion.div>
  );
}
