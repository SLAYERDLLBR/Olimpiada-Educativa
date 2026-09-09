// Tailwind's content scanner needs literal class strings — a template literal
// like `border-team-${color}` would get purged from the production build.
export const TEAM_COLOR_CLASSES: Record<string, { border: string; text: string; bg: string }> = {
  red: { border: "border-team-red", text: "text-team-red", bg: "bg-team-red" },
  blue: { border: "border-team-blue", text: "text-team-blue", bg: "bg-team-blue" },
  yellow: { border: "border-team-yellow", text: "text-team-yellow", bg: "bg-team-yellow" },
  green: { border: "border-team-green", text: "text-team-green", bg: "bg-team-green" },
  purple: { border: "border-team-purple", text: "text-team-purple", bg: "bg-team-purple" },
  orange: { border: "border-team-orange", text: "text-team-orange", bg: "bg-team-orange" },
  cyan: { border: "border-team-cyan", text: "text-team-cyan", bg: "bg-team-cyan" },
};

export function getTeamColorClasses(color: string) {
  return TEAM_COLOR_CLASSES[color] ?? TEAM_COLOR_CLASSES.purple;
}
