import type { PredictionStatus } from "@/lib/types";

const statusStyles: Record<PredictionStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Won: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Lost: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  Void: "bg-slate-400/15 text-slate-200 ring-slate-400/30",
};

export function StatusBadge({ status }: { status: PredictionStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
