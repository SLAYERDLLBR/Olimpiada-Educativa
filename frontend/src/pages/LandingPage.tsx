import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GameBackground } from "../components/Common/GameBackground.tsx";
import { GlowButton } from "../components/Common/GlowButton.tsx";
import { usePlayerStore } from "../store/usePlayerStore.ts";
import { connectSocket } from "../services/socket.ts";
import { createPlayer } from "../services/api.ts";
import { AVATARS } from "../constants/avatars.ts";

export function LandingPage() {
  const navigate = useNavigate();
  const setIdentity = usePlayerStore((s) => s.setIdentity);

  const [username, setUsername] = useState("");
  const [series, setSeries] = useState(1);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = username.trim().length >= 3 && username.trim().length <= 20;

  const handleStart = async () => {
    setError(null);
    setLoading(true);
    try {
      const { playerId, sessionToken } = await createPlayer(username.trim(), series, avatarIndex);
      setIdentity({ playerId, sessionToken, username: username.trim(), series, avatarIndex });
      connectSocket(sessionToken);
      navigate("/pretest");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameBackground>
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-h1 uppercase text-white text-shadow-neon">Olimpíada Educativa</h1>
          <p className="mt-2 text-accent-cyan">Tactical Learning • Competitive Spirit</p>
        </motion.div>

        <motion.div
          className="w-full max-w-md space-y-4 rounded-lg border-2 border-accent-purple bg-primary-900/80 p-8 shadow-neon backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div>
            <label className="mb-1 block text-sm uppercase text-gray-300">Seu nome</label>
            <input
              className="w-full"
              value={username}
              maxLength={20}
              placeholder="Digite seu nome"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm uppercase text-gray-300">Série</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setSeries(s)}
                  className={`flex-1 rounded-lg border-2 py-2 font-bold ${
                    series === s ? "border-accent-orange bg-accent-orange/20" : "border-accent-purple/50"
                  }`}
                >
                  {s}º
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm uppercase text-gray-300">Avatar</label>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map((avatar, index) => (
                <button
                  key={avatar}
                  onClick={() => setAvatarIndex(index)}
                  className={`rounded-lg border-2 p-3 text-2xl ${
                    avatarIndex === index ? "border-accent-orange bg-accent-orange/20" : "border-accent-purple/50"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <GlowButton onClick={handleStart} disabled={!canSubmit || loading} className="w-full">
            {loading ? "Entrando..." : "Entrar na Arena"}
          </GlowButton>
        </motion.div>
      </div>
    </GameBackground>
  );
}
