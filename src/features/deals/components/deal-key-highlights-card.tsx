// src\features\deals\components\deal-key-highlights-card.tsx
const points = [
  "Safe, phased mining operation",
  "Profit-sharing starts after gem auction",
  "Investment secured by Sri Lankan licensing",
  "Monthly reports to investors",
]; //this want to change to dynamic data

export function DealKeyHighlightsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Key Highlights</h3>

      <ul className="mt-5 space-y-4">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
            <span className="mt-1 text-green-600">●</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
