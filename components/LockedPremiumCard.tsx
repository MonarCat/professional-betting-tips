import Link from "next/link";

interface LockedPremiumCardProps {
  title: string;
  description: string;
}

export function LockedPremiumCard({ title, description }: LockedPremiumCardProps) {
  return (
    <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/10 via-slate-950/90 to-slate-950/90 p-8 shadow-xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Premium Locked</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/premium-odds"
          className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Unlock premium odds
        </Link>
        <Link
          href="/responsible-betting"
          className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-300/40"
        >
          Read responsible betting notice
        </Link>
      </div>
    </div>
  );
}
