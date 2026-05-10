import type { Metadata } from "next";
import { OddsCategoryView } from "@/components/OddsCategoryView";
import { getPurchaseAccessFromCookies, getUnlockedTierForCategory } from "@/lib/access";
import { getPackages, getPredictions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Weekend Odds",
  description: "Weekend football predictions with premium tiers for 4, 8, and 10 odds packages.",
};

export default async function WeekendOddsPage() {
  const [predictions, packages, access] = await Promise.all([
    getPredictions("weekend"),
    getPackages("weekend"),
    getPurchaseAccessFromCookies(),
  ]);

  return (
    <OddsCategoryView
      category="weekend"
      intro="Weekend Odds focuses on the highest-liquidity fixture windows, combining a free preview board with premium packages for deeper card coverage."
      freePredictions={predictions.filter((prediction) => prediction.isFree)}
      premiumPredictions={predictions.filter((prediction) => prediction.isPremium)}
      packages={packages}
      unlockedTier={getUnlockedTierForCategory(access.packageSlugs, "weekend")}
    />
  );
}
