import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-gradient-fire text-white",
  secondary: "bg-primary-800 text-white border border-accent-purple",
};

export function GlowButton({ children, onClick, variant = "primary", disabled = false, className = "" }: GlowButtonProps) {
  return (
    <motion.button
      className={`relative rounded-lg px-6 py-3 font-bold uppercase tracking-wider transition-all duration-150 shadow-neon hover:shadow-neon-intense ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
}
