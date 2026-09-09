import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: "purple" | "orange" | "pink";
}

const colorClasses = {
  purple: "bg-accent-purple",
  orange: "bg-accent-orange",
  pink: "bg-accent-pink",
};

export function GameBackground({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 5,
        color: (["purple", "orange", "pink"] as const)[Math.floor(Math.random() * 3)],
      }))
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-military">
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(185,35,255,.2) 25%, rgba(185,35,255,.2) 26%, transparent 27%, transparent 74%, rgba(185,35,255,.2) 75%, rgba(185,35,255,.2) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(185,35,255,.2) 25%, rgba(185,35,255,.2) 26%, transparent 27%, transparent 74%, rgba(185,35,255,.2) 75%, rgba(185,35,255,.2) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
          transform: "rotate(45deg) scale(1.5)",
        }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`pointer-events-none absolute rounded-full ${colorClasses[p.color]}`}
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, opacity: 0.4 }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
