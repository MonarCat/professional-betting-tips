import { LockedPremiumCard } from "@/components/LockedPremiumCard";
import { OddsTable } from "@/components/OddsTable";
import { PackageCard } from "@/components/PackageCard";
import { PredictionCard } from "@/components/PredictionCard";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { BettingPackage, PackageTier, Prediction, PredictionCategory } from "@/lib/types";

interface OddsCategoryViewProps {
  category: PredictionCategory;
  intro: string;
  freePredictions: Prediction[];
  premiumPredictions: Prediction[];
  packages: BettingPackage[];
  unlockedTier: PackageTier | 0;
}

export function OddsCategoryView({
  category,
  intro,
  freePredictions,
  premiumPredictions,
  packages,
  unlockedTier,
}: OddsCategoryViewProps) {
  const unlockedPredictions = premiumPredictions.filter((prediction) => prediction.packageTier && prediction.packageTier <= unlockedTier);

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/40 p-8 shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">{CATEGORY_LABELS[category]}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Sharp football picks with disciplined bankroll messaging.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Free Preview</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Free predictions before the paywall</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {freePredictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Premium Odds</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Unlock {CATEGORY_LABELS[category].toLowerCase()} tiers</h2>
        </div>
        {unlockedPredictions.length ? (
          <OddsTable predictions={unlockedPredictions} />
        ) : (
          <LockedPremiumCard
            title={`Premium ${CATEGORY_LABELS[category]} are locked`}
            description="Purchase the relevant package to reveal the premium odds list. Higher tiers unlock more selections for the same category."
          />
        )}
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Packages</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Choose the tier that matches your stake plan</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((selectedPackage) => (
            <PackageCard key={selectedPackage.slug} selectedPackage={selectedPackage} unlocked={selectedPackage.tier <= unlockedTier} />
          ))}
        </div>
      </section>
    </div>
  );
}
