export function AnswerFeedback({ text }: { text: string }) {
  return (
    <div className="w-full max-w-2xl rounded-lg border-2 border-success bg-success/10 p-4 text-center">
      <p className="text-xs uppercase text-gray-400">Resposta correta</p>
      <p className="text-lg font-bold text-success">{text}</p>
    </div>
  );
}
