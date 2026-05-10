import type { Metadata } from "next";
import { OddsCategoryView } from "@/components/OddsCategoryView";
import { getPurchaseAccessFromCookies, getUnlockedTierForCategory } from "@/lib/access";
import { getPackages, getPredictions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Daily Odds",
  description: "Daily football predictions with free previews and premium 4, 8, and 10 odds packages.",
};

export default async function DailyOddsPage() {
  const [predictions, packages, access] = await Promise.all([
    getPredictions("daily"),
    getPackages("daily"),
    getPurchaseAccessFromCookies(),
  ]);

  return (
    <OddsCategoryView
      category="daily"
      intro="Daily Odds balances a free preview with premium lines that unlock in 4, 8, and 10 selection tiers. Each package follows the fixed KES 99, KES 149, and KES 199 pricing ladder."
      freePredictions={predictions.filter((prediction) => prediction.isFree)}
      premiumPredictions={predictions.filter((prediction) => prediction.isPremium)}
      packages={packages}
      unlockedTier={getUnlockedTierForCategory(access.packageSlugs, "daily")}
    />
  );
}
