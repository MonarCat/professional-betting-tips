import { StatusBadge } from "@/components/StatusBadge";
import type { MatchHighlight } from "@/lib/types";

export function MatchHighlightCard({ highlight }: { highlight: MatchHighlight }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">{highlight.competition}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{highlight.title}</h3>
        </div>
        <StatusBadge status={highlight.status} />
      </div>
      <p className="mt-4 text-sm font-medium text-amber-300">{highlight.fixture}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.angle}</p>
      <p className="mt-4 text-sm leading-6 text-slate-400">{highlight.summary}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
        {new Date(highlight.kickoff).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </article>
  );
}
