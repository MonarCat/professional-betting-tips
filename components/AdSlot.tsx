interface AdSlotProps {
  title: string;
  slotId: string;
}

export function AdSlot({ title, slotId }: AdSlotProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-black/20">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Monetag Ad Slot</p>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{slotId}</span>
      </div>
      <div className="rounded-2xl border border-dashed border-emerald-400/30 bg-slate-900/80 px-4 py-8 text-center text-sm text-slate-300">
        {title}
      </div>
    </div>
  );
}
