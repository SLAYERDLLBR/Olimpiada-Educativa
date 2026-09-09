import { motion } from "framer-motion";
import { getTeamColorClasses } from "../../constants/teamColors.ts";
import type { Team } from "../../types/index.ts";

const MEDALS = ["🥇", "🥈", "🥉"];

interface LiveLeaderboardProps {
  teams: Team[];
  scores: Record<string, number>;
}

export function LiveLeaderboard({ teams, scores }: LiveLeaderboardProps) {
  // `team.totalScore` is the lobby's balancing metric (sum of skill scores) —
  // meaningless once the game starts, so scores default to 0 until the first
  // round-end payload arrives, not to that leftover lobby number.
  const ranked = [...teams].sort((a, b) => (scores[b.color] ?? 0) - (scores[a.color] ?? 0));

  return (
    <div className="w-full max-w-sm rounded-lg border-2 border-accent-purple bg-primary-900/80 p-4 shadow-neon backdrop-blur-md">
      <h3 className="mb-3 font-heading text-sm uppercase text-white text-shadow-neon">Placar ao Vivo</h3>
      <div className="space-y-2">
        {ranked.map((team, index) => {
          const colors = getTeamColorClasses(team.color);
          const score = scores[team.color] ?? 0;
          return (
            <motion.div
              key={team.color}
              layout
              className={`flex items-center justify-between rounded-lg border p-2 ${colors.border}`}
            >
              <span className="flex items-center gap-2 font-bold uppercase text-white">
                <span>{MEDALS[index] ?? `${index + 1}º`}</span>
                <span className={colors.text}>Equipe {team.color}</span>
              </span>
              <motion.span key={score} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="font-mono font-bold text-white">
                {score}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
