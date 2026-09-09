export function BalanceStatus({ variance }: { variance: { absolute: number; percent: number } }) {
  const isGood = variance.percent <= 15;

  return (
    <div className={`rounded-lg border p-3 text-center text-sm ${isGood ? "border-success text-success" : "border-warning text-warning"}`}>
      Variância: {variance.absolute} pts ({variance.percent}%) — {isGood ? "Bem balanceado!" : "Balanceamento razoável"}
    </div>
  );
}
