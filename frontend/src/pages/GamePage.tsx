import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameBackground } from "../components/Common/GameBackground.tsx";
import { GlowButton } from "../components/Common/GlowButton.tsx";
import { QuestionCard } from "../components/Game/QuestionCard.tsx";
import { FillBlankInput } from "../components/Game/FillBlankInput.tsx";
import { NumericInputAnswer } from "../components/Game/NumericInputAnswer.tsx";
import { MatchingBoard } from "../components/Game/MatchingBoard.tsx";
import { SequenceBoard } from "../components/Game/SequenceBoard.tsx";
import { AnswerFeedback } from "../components/Game/AnswerFeedback.tsx";
import { GameTimerBar } from "../components/Game/GameTimerBar.tsx";
import { LiveLeaderboard } from "../components/Game/LiveLeaderboard.tsx";
import { useGameTimer } from "../hooks/useGameTimer.ts";
import { usePlayerStore } from "../store/usePlayerStore.ts";
import { useRoomStore } from "../store/useRoomStore.ts";
import * as gameSocket from "../services/gameSocket.ts";
import * as roomSocket from "../services/roomSocket.ts";
import { getTeamColorClasses } from "../constants/teamColors.ts";
import type { GameFinishedPayload, RoundEndPayload, RoundStartPayload, SubmittedAnswer } from "../types/index.ts";

type Phase = "waiting-round" | "answering" | "team-answered" | "round-end" | "finished";

/** Picks the right input widget for the current question's format, and swaps
 * to the plain-text gabarito once the round ends (for the formats that don't
 * have a natural "highlight the right answer" visual like QuestionCard does). */
function renderAnswerArea(
  round: RoundStartPayload,
  phase: Phase,
  selectedOptionId: string | null,
  roundEnd: RoundEndPayload | null,
  onSubmitAnswer: (answer: SubmittedAnswer) => void
) {
  const disabled = phase !== "answering";
  const { question } = round;
  const showGabarito = phase === "round-end" && roundEnd;

  switch (question.formatType) {
    case "multiple-choice":
    case "true-false":
    case "visual-click":
      return (
        <QuestionCard
          question={question}
          disabled={disabled}
          selectedOptionId={selectedOptionId}
          correctOptionId={phase === "round-end" ? roundEnd?.correctOptionId : null}
          onSelect={(optionId) => onSubmitAnswer({ type: "option", optionId })}
        />
      );
    case "fill-blank":
      return showGabarito ? (
        <AnswerFeedback text={roundEnd.correctAnswerDisplay} />
      ) : (
        <FillBlankInput question={question} disabled={disabled} onSubmit={(value) => onSubmitAnswer({ type: "text", value })} />
      );
    case "numeric-input":
      return showGabarito ? (
        <AnswerFeedback text={roundEnd.correctAnswerDisplay} />
      ) : (
        <NumericInputAnswer question={question} disabled={disabled} onSubmit={(value) => onSubmitAnswer({ type: "number", value })} />
      );
    case "matching":
      return showGabarito ? (
        <AnswerFeedback text={roundEnd.correctAnswerDisplay} />
      ) : (
        <MatchingBoard question={question} disabled={disabled} onSubmit={(matches) => onSubmitAnswer({ type: "matching", matches })} />
      );
    case "sequence":
      return showGabarito ? (
        <AnswerFeedback text={roundEnd.correctAnswerDisplay} />
      ) : (
        <SequenceBoard question={question} disabled={disabled} onSubmit={(order) => onSubmitAnswer({ type: "sequence", order })} />
      );
    default:
      return null;
  }
}

export function GamePage() {
  const playerId = usePlayerStore((s) => s.playerId);
  const { snapshot, setSnapshot } = useRoomStore();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("waiting-round");
  const [round, setRound] = useState<RoundStartPayload | null>(null);
  const [progress, setProgress] = useState({ answeredCount: 0, totalTeams: 0 });
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [roundEnd, setRoundEnd] = useState<RoundEndPayload | null>(null);
  const [liveScores, setLiveScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState<GameFinishedPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const myTeam = snapshot?.teams?.find((t) => t.players.some((p) => p.playerId === playerId));

  useEffect(() => {
    const unsubscribers = [
      gameSocket.onRoundStart((payload) => {
        setRound(payload);
        setPhase("answering");
        setSelectedOptionId(null);
        setRoundEnd(null);
        setError(null);
        setProgress({ answeredCount: 0, totalTeams: snapshot?.teams?.length ?? 0 });
      }),
      gameSocket.onTeamAnswered((payload) => {
        setProgress({ answeredCount: payload.answeredCount, totalTeams: payload.totalTeams });
        if (myTeam && payload.teamColor === myTeam.color) setPhase("team-answered");
      }),
      gameSocket.onRoundEnd((payload) => {
        setRoundEnd(payload);
        setLiveScores(payload.scores);
        setPhase("round-end");
      }),
      gameSocket.onGameFinished((payload) => {
        setFinished(payload);
        setPhase("finished");
      }),
    ];

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [myTeam?.color, snapshot?.teams?.length]);

  const timer = useGameTimer(round?.startedAt ?? 0, round?.timeLimitMs ?? 40_000);

  if (!playerId) return <Navigate to="/" replace />;
  if (!snapshot?.teams) return <Navigate to="/lobby" replace />;

  const handleSubmitAnswer = async (answer: SubmittedAnswer) => {
    if (answer.type === "option") setSelectedOptionId(answer.optionId);
    try {
      await gameSocket.submitAnswer(answer);
    } catch (err) {
      if (answer.type === "option") setSelectedOptionId(null);
      setError(err instanceof Error ? err.message : "Erro ao responder.");
    }
  };

  const handleBackToLobby = async () => {
    await roomSocket.leaveRoom();
    setSnapshot(null);
    navigate("/lobby");
  };

  if (phase === "finished" && finished) {
    const winnerColors = getTeamColorClasses(finished.winner);
    return (
      <GameBackground>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
          <h1 className="font-heading text-h2 uppercase text-white text-shadow-neon">Fim de Jogo!</h1>
          <p className={`font-heading text-h4 uppercase ${winnerColors.text}`}>🏆 Equipe {finished.winner} venceu!</p>

          <div className="w-full max-w-sm space-y-2">
            {[...finished.finalScores]
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((team, index) => (
                <div key={team.teamColor} className={`flex justify-between rounded-lg border p-3 ${getTeamColorClasses(team.teamColor).border}`}>
                  <span className={`font-bold uppercase ${getTeamColorClasses(team.teamColor).text}`}>
                    {index + 1}º Equipe {team.teamColor}
                  </span>
                  <span className="font-mono font-bold text-white">{team.totalScore} pts</span>
                </div>
              ))}
          </div>

          <GlowButton onClick={handleBackToLobby}>Voltar ao Lobby</GlowButton>
        </div>
      </GameBackground>
    );
  }

  return (
    <GameBackground>
      <div className="flex min-h-screen flex-col items-center gap-6 p-8">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <p className="text-sm uppercase text-gray-400">
            Sala {snapshot.code} · Rodada {round?.roundNumber ?? "-"}/{round?.totalRounds ?? "-"}
          </p>
          {round && (phase === "answering" || phase === "team-answered") && (
            <GameTimerBar remainingSeconds={timer.remainingSeconds} phase={timer.phase} />
          )}
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex w-full max-w-4xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
          <div className="flex flex-1 flex-col items-center gap-4">
            {round && renderAnswerArea(round, phase, selectedOptionId, roundEnd, handleSubmitAnswer)}

            {phase === "team-answered" && (
              <p className="text-accent-cyan">
                Aguardando outras equipes... ({progress.answeredCount}/{progress.totalTeams})
              </p>
            )}

            {phase === "round-end" && roundEnd && (
              <div className="w-full max-w-2xl space-y-2">
                {roundEnd.speedrun && <p className="text-center font-bold text-success">🔥 SPEEDRUN! Todas as equipes foram rápidas!</p>}
                {roundEnd.results.map((result) => (
                  <div key={result.teamColor} className={`flex justify-between rounded-lg border p-2 ${getTeamColorClasses(result.teamColor).border}`}>
                    <span className={getTeamColorClasses(result.teamColor).text}>
                      Equipe {result.teamColor} {result.isCorrect ? "✓" : "✗"}
                    </span>
                    <span className="font-mono text-white">+{result.pointsEarned}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <LiveLeaderboard teams={snapshot.teams} scores={liveScores} />
        </div>
      </div>
    </GameBackground>
  );
}
