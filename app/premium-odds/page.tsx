import type { Metadata } from "next";
import Link from "next/link";
import { LockedPremiumCard } from "@/components/LockedPremiumCard";
import { OddsTable } from "@/components/OddsTable";
import { PackageCard } from "@/components/PackageCard";
import { getPurchaseAccessFromCookies, getUnlockedTierForCategory } from "@/lib/access";
import { CATEGORY_LABELS } from "@/lib/constants";
import { getPackages, getPredictions } from "@/lib/data";
import type { PredictionCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Premium Odds",
  description: "Premium football tips with Paystack checkout, Supabase purchase recording, and locked access by package tier.",
};

const categories: PredictionCategory[] = ["daily", "weekend", "monthly"];

export default async function PremiumOddsPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string; package?: string }>;
}) {
  const [allPackages, allPredictions, access, params] = await Promise.all([
    getPackages(),
    getPredictions(),
    getPurchaseAccessFromCookies(),
    searchParams,
  ]);

  return (
    <div className="w-full space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-amber-500/10 p-8 shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Premium Odds</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Purchase-specific access for every premium card.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Packages are grouped by daily, weekend, and monthly cycles. Checkout is initialized through Paystack and verified on the server before purchases are recorded.
        </p>
        {params.payment === "success" ? (
          <p className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Payment verified and package unlocked{params.package ? `: ${params.package}` : ""}.
          </p>
        ) : null}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {allPackages.map((selectedPackage) => (
          <PackageCard key={selectedPackage.slug} selectedPackage={selectedPackage} unlocked={access.packageSlugs.includes(selectedPackage.slug)} />
        ))}
      </section>

      <section className="space-y-6">
        {categories.map((category) => {
          const unlockedTier = getUnlockedTierForCategory(access.packageSlugs, category);
          const predictions = allPredictions.filter((prediction) => prediction.category === category && prediction.isPremium);
          const visiblePredictions = predictions.filter((prediction) => prediction.packageTier && prediction.packageTier <= unlockedTier);

          return (
            <div key={category} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">{CATEGORY_LABELS[category]}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Unlocked premium board</h2>
                </div>
                <Link href={`/${category}-odds`} className="text-sm font-semibold text-amber-300 transition hover:text-amber-200">Open page →</Link>
              </div>
              {visiblePredictions.length ? (
                <OddsTable predictions={visiblePredictions} />
              ) : (
                <LockedPremiumCard
                  title={`${CATEGORY_LABELS[category]} remain hidden`}
                  description="Purchase a package for this category to reveal the premium selections. Server verification updates purchase records before access is granted."
                />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
