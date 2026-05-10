import type { Metadata } from "next";
import { RESPONSIBLE_BETTING_NOTICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Responsible Betting",
  description: "Responsible betting guidance for football predictions, including 18+ only and no-guarantee notices.",
};

export default function ResponsibleBettingPage() {
  return (
    <div className="w-full space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/40 p-8 shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Responsible Betting</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Discipline matters more than any single prediction.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          This site provides football betting insights, not guarantees. Use controlled staking, never chase losses, and step away when betting stops being entertainment.
        </p>
      </section>
      <section className="grid gap-5 lg:grid-cols-3">
        {RESPONSIBLE_BETTING_NOTICES.map((notice) => (
          <article key={notice} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Notice</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{notice}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {notice === "18+ only"
                ? "This service is intended only for adults of legal betting age in their jurisdiction."
                : notice === "Predictions are not guarantees"
                  ? "Variance is unavoidable in sports betting. Even strong edges lose over short samples."
                  : "Bet within a budget, set limits, and seek support if betting no longer feels controlled."}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
