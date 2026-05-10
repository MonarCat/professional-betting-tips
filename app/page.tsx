import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { MatchHighlightCard } from "@/components/MatchHighlightCard";
import { PackageCard } from "@/components/PackageCard";
import { PredictionCard } from "@/components/PredictionCard";
import { getPurchaseAccessFromCookies } from "@/lib/access";
import { BRAND_NAME, FACEBOOK_URL, RESPONSIBLE_BETTING_NOTICES } from "@/lib/constants";
import { getMatchHighlights, getPackages, getPredictions } from "@/lib/data";

export default async function Home() {
  const [predictions, packages, highlights, purchaseAccess] = await Promise.all([
    getPredictions(),
    getPackages(),
    getMatchHighlights(),
    getPurchaseAccessFromCookies(),
  ]);

  const freePreview = predictions.filter((prediction) => prediction.isFree).slice(0, 3);
  const premiumPackages = packages.slice(0, 3);

  return (
    <div className="w-full space-y-10">
      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/50 p-8 shadow-2xl shadow-black/30 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-300">Premium football predictions</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            {BRAND_NAME} brings disciplined football picks, premium odds tiers, and responsible betting guidance.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Built for fast Vercel deployment with Next.js, Tailwind CSS, Supabase-backed content, and Paystack-powered checkout flows for daily, weekend, and monthly packages.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/premium-odds" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
              View premium packages
            </Link>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300/40">
              Join Facebook community
            </a>
          </div>
        </div>
        <div className="grid gap-5">
          <AdSlot title="Top hero Monetag placement" slotId="hero-top" />
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Responsible betting</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {RESPONSIBLE_BETTING_NOTICES.map((notice) => (
                <li key={notice} className="flex gap-3"><span className="text-emerald-300">•</span>{notice}</li>
              ))}
            </ul>
            {purchaseAccess.packageSlugs.length ? (
              <p className="mt-4 text-sm text-emerald-300">Unlocked in this browser: {purchaseAccess.packageSlugs.join(", ")}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Free tips preview</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Open picks for today and beyond</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {freePreview.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Premium packages</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Daily, weekend, and monthly odds packages</h2>
          </div>
          <Link href="/premium-odds" className="text-sm font-semibold text-amber-300 transition hover:text-amber-200">Explore all packages →</Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {premiumPackages.map((selectedPackage) => (
            <PackageCard key={selectedPackage.slug} selectedPackage={selectedPackage} unlocked={purchaseAccess.packageSlugs.includes(selectedPackage.slug)} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Match highlights</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Latest tactical notes behind the picks</h2>
          </div>
          <div className="grid gap-5">
            {highlights.map((highlight) => (
              <MatchHighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </div>
        </div>
        <div className="grid gap-5 self-start">
          <AdSlot title="Sidebar Monetag placement" slotId="sidebar-mid" />
          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Why bettors keep this open</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>• Structured free preview plus premium tiers.</li>
              <li>• Server-verified Paystack flow writes purchases into Supabase.</li>
              <li>• Admin panel can manage picks without changing code.</li>
              <li>• Premium access stays locked until the relevant package is purchased.</li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  );
}
