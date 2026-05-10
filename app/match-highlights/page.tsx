import type { Metadata } from "next";
import { MatchHighlightCard } from "@/components/MatchHighlightCard";
import { AdSlot } from "@/components/AdSlot";
import { getMatchHighlights } from "@/lib/data";

export const metadata: Metadata = {
  title: "Match Highlights",
  description: "Tactical match highlights behind the latest football predictions and betting tips.",
};

export default async function MatchHighlightsPage() {
  const highlights = await getMatchHighlights();

  return (
    <div className="w-full space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/40 p-8 shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Match Highlights</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Short-form tactical notes that explain where the edge comes from.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Use the highlights board to understand matchup context before moving into the premium odds cards.</p>
      </section>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5">
          {highlights.map((highlight) => (
            <MatchHighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
        <div className="grid gap-5 self-start">
          <AdSlot title="Match highlights Monetag placement" slotId="highlights-side" />
          <AdSlot title="Additional sponsor inventory" slotId="highlights-bottom" />
        </div>
      </div>
    </div>
  );
}
