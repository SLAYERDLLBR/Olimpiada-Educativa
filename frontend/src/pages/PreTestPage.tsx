import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GameBackground } from "../components/Common/GameBackground.tsx";
import { SkillSurvey } from "../components/PreTest/SkillSurvey.tsx";
import { TestQuestion } from "../components/PreTest/TestQuestion.tsx";
import { SkillResults } from "../components/PreTest/SkillResults.tsx";
import { usePlayerStore } from "../store/usePlayerStore.ts";
import { getPretestQuestion, submitPretest } from "../services/api.ts";
import { getSocket } from "../services/socket.ts";
import type { PretestResult, PublicQuestion, SurveyChoice } from "../types/index.ts";

type Step = "survey" | "portuguese" | "matematica" | "results" | "loading";

export function PreTestPage() {
  const { playerId, series } = usePlayerStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("survey");
  const [surveyChoice, setSurveyChoice] = useState<SurveyChoice | null>(null);
  const [ptQuestion, setPtQuestion] = useState<PublicQuestion | null>(null);
  const [ptAnswerId, setPtAnswerId] = useState<string | null>(null);
  const [mathQuestion, setMathQuestion] = useState<PublicQuestion | null>(null);
  const [result, setResult] = useState<PretestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Socket.IO smoke test — no dedicated UI yet, just confirms the authenticated
  // handshake and a round-trip event work end to end (Sprint 2 builds on this).
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("connect", () => console.log("[socket] connected:", socket.id));
    socket.on("pong", (data) => console.log("[socket] pong received:", data));
    socket.emit("ping");

    return () => {
      socket.off("connect");
      socket.off("pong");
    };
  }, []);

  if (!playerId) return <Navigate to="/" replace />;

  const handleSurveySubmit = async (choice: SurveyChoice) => {
    setSurveyChoice(choice);
    setStep("loading");
    try {
      const { question } = await getPretestQuestion(series, "portugues");
      setPtQuestion(question);
      setStep("portuguese");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar questão.");
    }
  };

  const handlePtAnswer = async (optionId: string) => {
    setPtAnswerId(optionId);
    setStep("loading");
    try {
      const { question } = await getPretestQuestion(series, "matematica");
      setMathQuestion(question);
      setStep("matematica");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar questão.");
    }
  };

  const handleMathAnswer = async (optionId: string) => {
    if (!playerId || !surveyChoice || !ptQuestion || !ptAnswerId || !mathQuestion) return;
    setStep("loading");
    try {
      const submitted = await submitPretest({
        playerId,
        surveyChoice,
        ptQuestionId: ptQuestion.id,
        ptAnswerId,
        mathQuestionId: mathQuestion.id,
        mathAnswerId: optionId,
      });
      setResult(submitted);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar respostas.");
    }
  };

  return (
    <GameBackground>
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        {error && <p className="mb-4 text-danger">{error}</p>}

        {step === "survey" && <SkillSurvey onSubmit={handleSurveySubmit} />}
        {step === "portuguese" && ptQuestion && (
          <TestQuestion label="Teste de Português" question={ptQuestion} onAnswer={handlePtAnswer} />
        )}
        {step === "matematica" && mathQuestion && (
          <TestQuestion label="Teste de Matemática" question={mathQuestion} onAnswer={handleMathAnswer} />
        )}
        {step === "results" && result && <SkillResults result={result} onContinue={() => navigate("/lobby")} />}
        {step === "loading" && <p className="text-accent-cyan">Carregando...</p>}
      </div>
    </GameBackground>
  );
}
