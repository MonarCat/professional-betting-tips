export type PredictionCategory = "daily" | "weekend" | "monthly";
export type PredictionStatus = "Pending" | "Won" | "Lost" | "Void";
export type PurchaseStatus = "pending" | "paid" | "failed";
export type PackageTier = 4 | 8 | 10;

export interface Prediction {
  id: string;
  category: PredictionCategory;
  packageTier: PackageTier | null;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoff: string;
  market: string;
  odds: number;
  pick: string;
  confidence: string;
  status: PredictionStatus;
  insight: string;
  isFree: boolean;
  isPremium: boolean;
}

export interface BettingPackage {
  slug: string;
  category: PredictionCategory;
  tier: PackageTier;
  name: string;
  priceKes: number;
  description: string;
  features: string[];
}

export interface Purchase {
  id: string;
  email: string;
  packageSlug: string;
  amountKes: number;
  paystackReference: string;
  status: PurchaseStatus;
  providerResponse?: string;
  channel: string;
  paidAt: string;
}

export interface MatchHighlight {
  id: string;
  title: string;
  fixture: string;
  competition: string;
  kickoff: string;
  angle: string;
  summary: string;
  status: PredictionStatus;
}

export interface PurchaseAccess {
  email?: string;
  packageSlugs: string[];
}
