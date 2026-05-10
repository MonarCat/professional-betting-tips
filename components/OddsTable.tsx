import { StatusBadge } from "@/components/StatusBadge";
import type { Prediction } from "@/lib/types";

export function OddsTable({ predictions }: { predictions: Prediction[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.24em] text-slate-400">
            <tr>
              <th className="px-4 py-4">Fixture</th>
              <th className="px-4 py-4">Pick</th>
              <th className="px-4 py-4">Market</th>
              <th className="px-4 py-4">Odds</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {predictions.map((prediction) => (
              <tr key={prediction.id}>
                <td className="px-4 py-4">
                  <div className="font-medium text-white">
                    {prediction.homeTeam} vs {prediction.awayTeam}
                  </div>
                  <div className="text-xs text-slate-500">{prediction.competition}</div>
                </td>
                <td className="px-4 py-4">{prediction.pick}</td>
                <td className="px-4 py-4">{prediction.market}</td>
                <td className="px-4 py-4 text-amber-300">{prediction.odds.toFixed(2)}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={prediction.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
