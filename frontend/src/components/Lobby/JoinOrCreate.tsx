import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "../Common/GlowButton.tsx";

interface JoinOrCreateProps {
  onCreate: () => void;
  onJoin: (code: string) => void;
  loading: boolean;
  error: string | null;
}

export function JoinOrCreate({ onCreate, onJoin, loading, error }: JoinOrCreateProps) {
  const [code, setCode] = useState("");

  return (
    <motion.div
      className="w-full max-w-md space-y-6 rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center">
        <h2 className="font-heading text-h4 uppercase text-white text-shadow-neon">Squad Assembly</h2>
        <p className="mt-1 text-gray-300">Crie uma sala ou entre com um código</p>
      </div>

      <GlowButton onClick={onCreate} disabled={loading} className="w-full">
        {loading ? "Criando..." : "Criar Sala"}
      </GlowButton>

      <div className="flex items-center gap-2 text-gray-400">
        <div className="h-px flex-1 bg-accent-purple/30" />
        ou
        <div className="h-px flex-1 bg-accent-purple/30" />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 uppercase"
          value={code}
          maxLength={6}
          placeholder="CÓDIGO"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />
        <GlowButton variant="secondary" onClick={() => onJoin(code)} disabled={loading || code.trim().length !== 6}>
          Entrar
        </GlowButton>
      </div>

      {error && <p className="text-center text-sm text-danger">{error}</p>}
    </motion.div>
  );
}
