import { motion } from "framer-motion";
import { PlayerCard } from "./PlayerCard.tsx";
import type { Team } from "../../types/index.ts";

// Tailwind's content scanner needs literal class strings — a template literal
// like `border-team-${color}` would get purged from the production build.
const COLOR_CLASSES: Record<string, { border: string; text: string }> = {
  red: { border: "border-team-red", text: "text-team-red" },
  blue: { border: "border-team-blue", text: "text-team-blue" },
  yellow: { border: "border-team-yellow", text: "text-team-yellow" },
  green: { border: "border-team-green", text: "text-team-green" },
  purple: { border: "border-team-purple", text: "text-team-purple" },
  orange: { border: "border-team-orange", text: "text-team-orange" },
  cyan: { border: "border-team-cyan", text: "text-team-cyan" },
};

export function TeamPanel({ team, hostPlayerId }: { team: Team; hostPlayerId: string }) {
  const colors = COLOR_CLASSES[team.color] ?? COLOR_CLASSES.purple;

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
