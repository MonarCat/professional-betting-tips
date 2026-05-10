import type { Metadata } from "next";
import { OddsCategoryView } from "@/components/OddsCategoryView";
import { getPurchaseAccessFromCookies, getUnlockedTierForCategory } from "@/lib/access";
import { getPackages, getPredictions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Monthly Odds",
  description: "Monthly football premium tips with fixed pricing for 4, 8, and 10 odds packages.",
};

export default async function MonthlyOddsPage() {
  const [predictions, packages, access] = await Promise.all([
    getPredictions("monthly"),
    getPackages("monthly"),
    getPurchaseAccessFromCookies(),
  ]);

  return (
    <OddsCategoryView
      category="monthly"
      intro="Monthly Odds gives long-range bettors a structured premium slate across 4, 8, and 10 odds bundles while still exposing a useful free preview."
      freePredictions={predictions.filter((prediction) => prediction.isFree)}
      premiumPredictions={predictions.filter((prediction) => prediction.isPremium)}
      packages={packages}
      unlockedTier={getUnlockedTierForCategory(access.packageSlugs, "monthly")}
    />
  );
}
