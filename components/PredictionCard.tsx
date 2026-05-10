import { StatusBadge } from "@/components/StatusBadge";
import type { Prediction } from "@/lib/types";

export function PredictionCard({ prediction }: { prediction: Prediction }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">{prediction.competition}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {prediction.homeTeam} <span className="text-slate-500">vs</span> {prediction.awayTeam}
          </h3>
        </div>
        <StatusBadge status={prediction.status} />
      </div>
      <dl className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">Pick</dt>
          <dd className="font-medium text-white">{prediction.pick}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Odds</dt>
          <dd className="font-medium text-amber-300">{prediction.odds.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Market</dt>
          <dd>{prediction.market}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Kickoff</dt>
          <dd>{new Date(prediction.kickoff).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-300">{prediction.insight}</p>
    </article>
  );
}
