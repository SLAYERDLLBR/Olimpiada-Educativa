import { motion } from "framer-motion";
import { AVATARS } from "../../constants/avatars.ts";
import type { RoomPlayer } from "../../types/index.ts";

function scoreBadge(score: number) {
  if (score >= 75) return "🔥";
  if (score >= 50) return "🟡";
  return "🔴";
}

export function PlayerCard({ player, isHost }: { player: RoomPlayer; isHost: boolean }) {
  return (
    <motion.div
      className="rounded-lg border-2 border-accent-purple/50 bg-primary-800/60 p-4 shadow-neon backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-neon text-2xl">
          {AVATARS[player.avatarIndex % AVATARS.length]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 font-heading text-sm uppercase text-white">
            {player.username}
            {isHost && <span className="text-xs text-accent-orange">HOST</span>}
          </div>
          <div className="flex gap-3 text-xs text-gray-300">
            <span>
              Score: <span className="font-mono font-bold text-accent-orange">{player.skillScore}</span> {scoreBadge(player.skillScore)}
            </span>
            <span>Série: {player.series}º</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
