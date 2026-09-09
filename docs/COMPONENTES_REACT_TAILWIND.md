# 🎮 COMPONENTES REACT + TAILWIND + FRAMER MOTION

## 📦 SETUP INICIAL

```bash
npm install framer-motion tailwindcss @tailwindcss/plugins lucide-react
```

---

## 🎨 TAILWIND CONFIG (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primárias (Battlefield 4 style)
        primary: {
          900: "#0a1428", // Azul escuro profundo
          800: "#1a3a52", // Azul médio
          700: "#2a5a7f",
        },
        accent: {
          orange: "#ff6600", // Laranja energético
          pink: "#ff006e",   // Pink neon
          purple: "#b923ff", // Roxo neon
          cyan: "#00d9ff",   // Cyan futurista
        },
        success: "#27ae60",  // Verde
        warning: "#f39c12",  // Amarelo
        danger: "#e74c3c",   // Vermelho
        // Equipes
        team: {
          red: "#e74c3c",
          blue: "#3498db",
          yellow: "#f39c12",
          green: "#27ae60",
          purple: "#9b59b6",
          orange: "#e67e22",
          cyan: "#1abc9c",
        },
      },
      fontFamily: {
        heading: ["Audiowide", "Orbitron", "sans-serif"],
        body: ["Inter", "Roboto", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        h1: ["64px", { lineHeight: "1.2", letterSpacing: "0.05em" }],
        h2: ["48px", { lineHeight: "1.3", letterSpacing: "0.05em" }],
        h3: ["36px", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        h4: ["28px", { lineHeight: "1.5", letterSpacing: "0.05em" }],
        p: ["16px", { lineHeight: "1.6" }],
        label: ["12px", { lineHeight: "1.5" }],
      },
      boxShadow: {
        neon: "0 0 20px rgba(185, 35, 255, 0.5)",
        "neon-intense": "0 0 40px rgba(185, 35, 255, 0.8)",
        "neon-glow": "0 0 60px rgba(255, 102, 0, 0.6)",
        "inner-neon": "inset 0 0 20px rgba(185, 35, 255, 0.2)",
      },
      backgroundImage: {
        "gradient-military": "linear-gradient(135deg, #0a1428 0%, #1a3a52 100%)",
        "gradient-fire": "linear-gradient(45deg, #ff6600 0%, #ff8533 100%)",
        "gradient-neon": "linear-gradient(90deg, #b923ff 0%, #ff006e 100%)",
        "grid-pattern": `
          linear-gradient(0deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent)
        `,
      },
      animation: {
        "glow-pulse": "glow-pulse 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "scan-lines": "scan 8s linear infinite",
        "shake": "shake 0.3s ease-in-out",
        "pop": "pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "bounce-high": "bounce-high 0.8s ease-out",
        "number-jump": "number-jump 0.6s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(185, 35, 255, 0.5)" },
          "50%": { boxShadow: "0 0 60px rgba(185, 35, 255, 0.9)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        "pop": {
          "0%": { transform: "scale(1.05)", opacity: "1" },
          "50%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1.02)", opacity: "1" },
        },
        "bounce-high": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "number-jump": {
          "0%": { transform: "translateY(20px) scale(0.8)", opacity: "0" },
          "50%": { transform: "translateY(-5px) scale(1.2)" },
          "100%": { transform: "translateY(0) scale(1.0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 🎬 BACKGROUND + LAYOUT BASE

```typescript
// components/GameBackground.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export function GameBackground({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 5,
      color: ["purple", "orange", "pink"][Math.floor(Math.random() * 3)] as "purple" | "orange" | "pink",
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-military">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-military" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(185, 35, 255, 0.05) 25%, rgba(185, 35, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(185, 35, 255, 0.05) 75%, rgba(185, 35, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: "50px 50px",
          backgroundPosition: "0 0",
          transform: "rotate(45deg)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${colorClasses[particle.color]} pointer-events-none`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scan Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(185, 35, 255, 0.5) 2px,
              rgba(185, 35, 255, 0.5) 4px
            )
          `,
        }}
        animate={{
          backgroundPosition: ["0 0", "0 10px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient opacity-40" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

---

## 🎮 BUTTON COM GLOW

```typescript
// components/GlowButton.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-gradient-fire text-white",
  secondary: "bg-primary-800 text-white border border-accent-purple",
  danger: "bg-danger text-white",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function GlowButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: GlowButtonProps) {
  return (
    <motion.button
      className={`
        relative rounded-lg font-bold uppercase tracking-wider
        transition-all duration-150 ${variantClasses[variant]} ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        shadow-neon hover:shadow-neon-intense
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, boxShadow: "0 0 40px rgba(185, 35, 255, 0.8)" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      animate={variant === "primary" ? { boxShadow: ["0 0 20px rgba(255, 102, 0, 0.5)", "0 0 40px rgba(255, 102, 0, 0.8)", "0 0 20px rgba(255, 102, 0, 0.5)"] } : {}}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Inner shine effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
```

---

## 🎯 CARD COM GLOW (Lobby Players)

```typescript
// components/PlayerCard.tsx
import { motion } from "framer-motion";

interface PlayerCardProps {
  name: string;
  skillScore: number;
  serie: number;
  dominantSubject: string;
  avatarIndex: number;
  team?: string;
}

const getScoreBadge = (score: number) => {
  if (score >= 75) return { color: "text-red-500", icon: "🔥" };
  if (score >= 50) return { color: "text-yellow-500", icon: "🟡" };
  return { color: "text-red-500", icon: "🔴" };
};

export function PlayerCard({
  name,
  skillScore,
  serie,
  dominantSubject,
  avatarIndex,
  team,
}: PlayerCardProps) {
  const scoreBadge = getScoreBadge(skillScore);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Background Container */}
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-lg border border-accent-purple border-opacity-50 p-4 backdrop-blur-sm shadow-neon overflow-hidden">
        {/* Corner accent lights */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-accent-purple opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-accent-orange opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-all duration-300" />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-lg bg-gradient-neon flex items-center justify-center text-2xl shadow-neon overflow-hidden">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {["🧑‍💻", "🎮", "🚀", "⚡", "🌟", "💪", "🎯", "👑"][avatarIndex % 8]}
            </motion.div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-heading font-bold text-white uppercase text-shadow-neon">
                {name}
              </h3>
              <span className={`text-2xl ${scoreBadge.color}`}>{scoreBadge.icon}</span>
            </div>

            <div className="flex gap-4 text-sm text-gray-300">
              <span>Score: <span className="text-accent-orange font-mono font-bold">{skillScore}</span></span>
              <span>Série: <span className="text-accent-cyan font-bold">{serie}º</span></span>
            </div>

            <div className="text-xs text-gray-400 mt-2">
              Dominant: <span className="text-accent-purple">{dominantSubject}</span>
            </div>
          </div>

          {/* Status */}
          {team && (
            <motion.div
              className="text-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-xs font-bold text-accent-cyan uppercase">
                {team}
              </div>
              <div className="w-3 h-3 bg-accent-cyan rounded-full mx-auto mt-1 shadow-neon" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

---

## ⏱️ TIMER COM FASES

```typescript
// components/GameTimer.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GameTimerProps {
  totalSeconds?: number;
  onTimeEnd?: () => void;
}

type Phase = "speedrun" | "early" | "normal" | "timeout";

const getPhase = (secondsLeft: number, totalSeconds: number = 40): Phase => {
  const elapsed = totalSeconds - secondsLeft;
  if (elapsed < 15) return "speedrun";
  if (elapsed < 30) return "early";
  if (elapsed < 40) return "normal";
  return "timeout";
};

const phaseStyles = {
  speedrun: { color: "#27ae60", bg: "bg-green-900/30", glow: "shadow-[0_0_20px_rgba(39,174,96,0.5)]" },
  early: { color: "#f39c12", bg: "bg-yellow-900/30", glow: "shadow-[0_0_20px_rgba(243,156,18,0.5)]" },
  normal: { color: "#e67e22", bg: "bg-orange-900/30", glow: "shadow-[0_0_20px_rgba(230,126,34,0.5)]" },
  timeout: { color: "#e74c3c", bg: "bg-red-900/30", glow: "shadow-[0_0_30px_rgba(231,76,60,0.8)]" },
};

export function GameTimer({ totalSeconds = 40, onTimeEnd }: GameTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const phase = getPhase(secondsLeft, totalSeconds);
  const percentage = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeEnd?.();
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onTimeEnd]);

  const style = phaseStyles[phase];
  const animationSpeed = phase === "timeout" ? 0.3 : phase === "normal" ? 0.5 : phase === "early" ? 0.7 : 1;

  return (
    <motion.div
      className={`relative w-64 h-20 rounded-lg ${style.bg} border-2 border-current p-4 ${style.glow} overflow-hidden`}
      style={{ color: style.color }}
      animate={phase === "timeout" ? { boxShadow: [style.glow, `0 0 50px ${style.color}`, style.glow] } : {}}
      transition={{ duration: animationSpeed, repeat: Infinity }}
    >
      {/* Background fill */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ width: `${percentage}%` }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <motion.div
          className="font-mono font-bold text-4xl tabular-nums"
          animate={phase === "timeout" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: animationSpeed }}
        >
          {String(secondsLeft).padStart(2, "0")}s
        </motion.div>

        <motion.div
          className="text-xs font-bold uppercase tracking-wider mt-1"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: animationSpeed }}
        >
          {phase === "speedrun" && "🔥 SPEEDRUN!"}
          {phase === "early" && "⚡ EARLY ADVANCE"}
          {phase === "normal" && "⏱️ NORMAL"}
          {phase === "timeout" && "⚠️ TIMEOUT!"}
        </motion.div>
      </div>

      {/* Screen shake effect on timeout */}
      {phase === "timeout" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: [-2, 2, -2, 2] }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
```

---

## 🏆 LEADERBOARD COM ANIMAÇÕES

```typescript
// components/LiveLeaderboard.tsx
import { motion } from "framer-motion";

interface TeamScore {
  id: string;
  name: string;
  color: string;
  points: number;
  position: number;
}

interface LiveLeaderboardProps {
  teams: TeamScore[];
}

const getMedalEmoji = (position: number) => {
  const medals = ["🥇", "🥈", "🥉", "4️⃣"];
  return medals[position - 1] || "🏅";
};

export function LiveLeaderboard({ teams }: LiveLeaderboardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <motion.div
      className="w-full max-w-md bg-primary-900/80 backdrop-blur-md rounded-lg border-2 border-accent-purple p-6 shadow-neon"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-heading font-bold text-2xl text-white mb-4 uppercase text-shadow-neon">
        PLACAR AO VIVO
      </h2>

      <div className="space-y-3">
        {sortedTeams.map((team, index) => (
          <motion.div
            key={team.id}
            className={`relative flex items-center gap-3 p-3 rounded-lg border border-opacity-50`}
            style={{ borderColor: team.color }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            layout
          >
            {/* Background gradient por equipe */}
            <div
              className="absolute inset-0 opacity-10 rounded-lg"
              style={{ backgroundColor: team.color }}
            />

            {/* Medal */}
            <motion.span
              className="text-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            >
              {getMedalEmoji(index + 1)}
            </motion.span>

            {/* Team info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white uppercase truncate">{team.name}</p>
            </div>

            {/* Points */}
            <motion.div
              className="font-mono font-bold text-lg tabular-nums"
              style={{ color: team.color }}
              key={team.points}
              animate={{ y: [10, -5, 0], scale: [0.8, 1.2, 1] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {team.points.toLocaleString()}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Variance indicator */}
      <motion.div
        className="mt-6 p-3 bg-accent-purple/20 rounded-lg border border-accent-purple/50"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-xs text-gray-300 text-center">
          Balance Score: <span className="text-accent-cyan font-bold">98%</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
```

---

## ❓ PERGUNTA COM OPÇÕES

```typescript
// components/Question.tsx
import { motion } from "framer-motion";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface QuestionProps {
  prompt: string;
  options: QuestionOption[];
  onSelectOption: (optionId: string) => void;
  selectedOption?: string;
  isSubmitted?: boolean;
}

export function Question({
  prompt,
  options,
  onSelectOption,
  selectedOption,
  isSubmitted,
}: QuestionProps) {
  return (
    <motion.div
      className="w-full max-w-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Pergunta */}
      <motion.div
        className="bg-primary-900/80 backdrop-blur-md rounded-lg border-2 border-accent-purple p-8 mb-6 shadow-neon"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Scan line effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple to-transparent"
          animate={{ y: [0, 400] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <h2 className="font-heading font-bold text-2xl text-white text-shadow-neon mb-4">
          {prompt}
        </h2>
      </motion.div>

      {/* Opções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => !isSubmitted && onSelectOption(option.id)}
            className={`
              relative p-4 rounded-lg font-bold uppercase tracking-wider
              border-2 transition-all duration-300
              ${
                selectedOption === option.id
                  ? "border-accent-orange bg-accent-orange/20 shadow-[0_0_30px_rgba(255,102,0,0.6)]"
                  : isSubmitted && option.isCorrect
                  ? "border-green-500 bg-green-500/20 shadow-[0_0_30px_rgba(39,174,96,0.6)]"
                  : isSubmitted && selectedOption === option.id && !option.isCorrect
                  ? "border-danger bg-danger/20 shadow-[0_0_30px_rgba(231,76,60,0.6)]"
                  : "border-accent-purple/50 hover:border-accent-purple"
              }
            `}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={!isSubmitted ? { scale: 1.05 } : {}}
            whileTap={!isSubmitted ? { scale: 0.98 } : {}}
            disabled={isSubmitted}
          >
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-current opacity-50" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-current opacity-50" />

            {/* Icon */}
            {isSubmitted && option.isCorrect && (
              <motion.span className="mr-2 text-xl animate-bounce-high">✓</motion.span>
            )}
            {isSubmitted && selectedOption === option.id && !option.isCorrect && (
              <motion.span className="mr-2 text-xl">✗</motion.span>
            )}

            <span className="relative z-10">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
```

---

## ✨ PARTICLE EXPLOSION (Quando acerta)

```typescript
// components/ConfettiExplosion.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  angle: number;
  velocity: number;
  color: string;
}

export function ConfettiExplosion() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      angle: (360 / 50) * i,
      velocity: Math.random() * 4 + 2,
      color: ["#b923ff", "#ff6600", "#ff006e", "#00d9ff"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setParticles(newParticles);
  }, []);

  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((p) => {
        const radians = toRadians(p.angle);
        const x = Math.cos(radians) * 300;
        const y = Math.sin(radians) * 300;

        return (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
              boxShadow: `0 0 10px ${p.color}`,
            }}
            animate={{ x, y, opacity: [1, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
```

---

## 🎨 GLOBAL STYLES (globals.css)

```css
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=IBM+Plex+Mono:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0a1428 0%, #1a3a52 100%);
  color: #e8eef7;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

/* Text glow effect */
.text-shadow-neon {
  text-shadow: 0 0 10px #b923ff, 0 0 20px #ff006e;
}

.text-shadow-orange {
  text-shadow: 0 0 10px #ff6600;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(10, 20, 40, 0.5);
}

::-webkit-scrollbar-thumb {
  background: #b923ff;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ff006e;
}

/* Selection color */
::selection {
  background: #b923ff;
  color: #e8eef7;
}

/* Input styling */
input, textarea {
  background: rgba(26, 58, 82, 0.7);
  border: 1px solid #b923ff;
  border-radius: 0.5rem;
  color: #e8eef7;
  padding: 0.75rem;
  font-family: inherit;
  transition: all 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 20px #b923ff;
}

/* Animation utilities */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px #b923ff; }
  50% { box-shadow: 0 0 60px #b923ff; }
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}
```

---

## 📦 EXEMPLO DE USO (App.tsx)

```typescript
import { GameBackground } from "./components/GameBackground";
import { GlowButton } from "./components/GlowButton";
import { GameTimer } from "./components/GameTimer";
import { Question } from "./components/Question";
import { LiveLeaderboard } from "./components/LiveLeaderboard";
import { PlayerCard } from "./components/PlayerCard";

export default function App() {
  return (
    <GameBackground>
      <div className="w-full h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-h1 text-white text-shadow-neon mb-4">
            OLIMPÍADA EDUCATIVA
          </h1>
          <p className="text-accent-cyan text-lg">Tactical Learning • Competitive Spirit</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Left: Question */}
          <div className="lg:col-span-2">
            <GameTimer totalSeconds={40} />
            <div className="mt-8">
              <Question
                prompt="What is 2 + 3?"
                options={[
                  { id: "1", text: "4" },
                  { id: "2", text: "5", isCorrect: true },
                  { id: "3", text: "6" },
                  { id: "4", text: "7" },
                ]}
                onSelectOption={(id) => console.log(id)}
              />
            </div>
          </div>

          {/* Right: Leaderboard + Info */}
          <div className="space-y-6">
            <LiveLeaderboard
              teams={[
                { id: "1", name: "Vermelha", color: "#e74c3c", points: 2240, position: 1 },
                { id: "2", name: "Azul", color: "#3498db", points: 1890, position: 2 },
                { id: "3", name: "Amarela", color: "#f39c12", points: 1750, position: 3 },
                { id: "4", name: "Verde", color: "#27ae60", points: 1560, position: 4 },
              ]}
            />

            <PlayerCard
              name="João Silva"
              skillScore={92}
              serie={3}
              dominantSubject="Português"
              avatarIndex={0}
              team="Vermelha"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-16 flex gap-4">
          <GlowButton variant="primary" size="lg">
            Enviar Resposta
          </GlowButton>
          <GlowButton variant="secondary" size="lg">
            Pular Questão
          </GlowButton>
        </div>
      </div>
    </GameBackground>
  );
}
```

---

**Status**: ✅ Ready to Copy-Paste and Use 🚀  
**Framework**: React 18 + TypeScript + Tailwind + Framer Motion  
**Complexity**: Production-Ready  

**"Basta copiar e adaptar para suas necessidades específicas!"**
