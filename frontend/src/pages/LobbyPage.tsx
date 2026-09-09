import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameBackground } from "../components/Common/GameBackground.tsx";
import { GlowButton } from "../components/Common/GlowButton.tsx";
import { JoinOrCreate } from "../components/Lobby/JoinOrCreate.tsx";
import { PlayerCard } from "../components/Lobby/PlayerCard.tsx";
import { TeamPanel } from "../components/Lobby/TeamPanel.tsx";
import { BalanceStatus } from "../components/Lobby/BalanceStatus.tsx";
import { usePlayerStore } from "../store/usePlayerStore.ts";
import { useRoomStore } from "../store/useRoomStore.ts";
import * as roomSocket from "../services/roomSocket.ts";

export function LobbyPage() {
  const playerId = usePlayerStore((s) => s.playerId);
  const { snapshot, setSnapshot } = useRoomStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => roomSocket.onRoomUpdated(setSnapshot), [setSnapshot]);
  useEffect(() => roomSocket.onGameStarting((snap) => { setSnapshot(snap); navigate("/game"); }), [setSnapshot, navigate]);

  if (!playerId) return <Navigate to="/" replace />;

  const isHost = snapshot?.hostPlayerId === playerId;

  const runAction = async (action: () => Promise<unknown>) => {
    setError(null);
    setLoading(true);
    try {
      const result = await action();
      if (result) setSnapshot(result as typeof snapshot);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = () => runAction(async () => { await roomSocket.leaveRoom(); setSnapshot(null); return null; });

  return (
    <GameBackground>
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
        {!snapshot ? (
          <JoinOrCreate
            loading={loading}
            error={error}
            onCreate={() => runAction(roomSocket.createRoom)}
            onJoin={(code) => runAction(() => roomSocket.joinRoom(code))}
          />
        ) : (
          <div className="w-full max-w-4xl space-y-6">
            <div className="text-center">
              <p className="text-sm uppercase text-gray-400">Código da Sala</p>
              <p className="font-mono text-h3 font-bold tracking-widest text-accent-orange text-shadow-neon">{snapshot.code}</p>
            </div>

            {error && <p className="text-center text-sm text-danger">{error}</p>}

            {snapshot.status === "playing" ? (
              <p className="text-center text-accent-cyan">Jogo em andamento... (em construção no próximo sprint)</p>
            ) : snapshot.teams ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {snapshot.teams.map((team) => (
                    <TeamPanel key={team.color} team={team} hostPlayerId={snapshot.hostPlayerId} />
                  ))}
                </div>
                {snapshot.variance && <BalanceStatus variance={snapshot.variance} />}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {snapshot.players.map((player) => (
                  <PlayerCard key={player.playerId} player={player} isHost={player.playerId === snapshot.hostPlayerId} />
                ))}
              </div>
            )}

            {snapshot.status !== "playing" && (
              <div className="flex flex-wrap justify-center gap-3">
                {isHost && (
                  <GlowButton onClick={() => runAction(roomSocket.balanceTeams)} disabled={loading}>
                    {snapshot.teams ? "Distribuir Novamente" : "Distribuir Times"}
                  </GlowButton>
                )}
                {isHost && snapshot.teams && (
                  <GlowButton onClick={() => runAction(roomSocket.startGame)} disabled={loading}>
                    Começar Jogo
                  </GlowButton>
                )}
                <GlowButton variant="secondary" onClick={handleLeave} disabled={loading}>
                  Sair
                </GlowButton>
              </div>
            )}
          </div>
        )}
      </div>
    </GameBackground>
  );
}
