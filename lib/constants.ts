import type { BettingPackage, PackageTier, PredictionCategory, PredictionStatus } from "@/lib/types";

export const BRAND_NAME = "Professional Betting Tips";
export const ACCESS_COOKIE_NAME = "pbt_access";
export const SUPPORT_EMAIL = "support@professionalbettingtips.com";
export const FACEBOOK_URL = "https://facebook.com/professionalbettingtips";
export const RESPONSIBLE_BETTING_NOTICES = [
  "18+ only",
  "Predictions are not guarantees",
  "Bet responsibly",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/daily-odds", label: "Daily Odds" },
  { href: "/weekend-odds", label: "Weekend Odds" },
  { href: "/monthly-odds", label: "Monthly Odds" },
  { href: "/match-highlights", label: "Highlights" },
  { href: "/premium-odds", label: "Premium" },
  { href: "/responsible-betting", label: "Responsible Betting" },
  { href: "/admin", label: "Admin" },
] as const;

export const CATEGORY_LABELS: Record<PredictionCategory, string> = {
  daily: "Daily Odds",
  weekend: "Weekend Odds",
  monthly: "Monthly Odds",
};

export const PACKAGE_TIERS: PackageTier[] = [4, 8, 10];
export const PACKAGE_PRICES: Record<PackageTier, number> = {
  4: 99,
  8: 149,
  10: 199,
};

export const STATUS_OPTIONS: PredictionStatus[] = ["Pending", "Won", "Lost", "Void"];

export const DEFAULT_PACKAGES: BettingPackage[] = (["daily", "weekend", "monthly"] as PredictionCategory[])
  .flatMap((category) =>
    PACKAGE_TIERS.map((tier) => ({
      slug: `${category}-${tier}-odds`,
      category,
      tier,
      name: `${CATEGORY_LABELS[category]} ${tier} Odds`,
      priceKes: PACKAGE_PRICES[tier],
      description:
        tier === 10
          ? "Full slate access with every premium selection for the cycle."
          : tier === 8
            ? "Expanded premium card with stronger line coverage."
            : "Fast access to the sharpest premium value picks.",
      features: [
        `${tier} premium football picks`,
        "Server-verified Paystack unlock",
        "Supabase purchase history support",
      ],
    })),
  );

export const SEO_KEYWORDS = [
  "football predictions",
  "betting tips",
  "daily odds",
  "weekend odds",
  "premium football tips",
  "Kenya betting tips",
  "Professional Betting Tips",
];
