import { DEFAULT_PACKAGES } from "@/lib/constants";
import { seedMatchHighlights, seedPackages, seedPredictions, seedPurchases } from "@/lib/mock-data";
import { createSupabaseAdminClient, hasSupabaseConfig } from "@/lib/supabase";
import type {
  BettingPackage,
  MatchHighlight,
  PackageTier,
  Prediction,
  PredictionCategory,
  Purchase,
  PurchaseStatus,
} from "@/lib/types";

let predictionsStore = [...seedPredictions];
let packagesStore = [...seedPackages];
let purchasesStore = [...seedPurchases];

function mapPredictionRow(row: Record<string, unknown>): Prediction {
  return {
    id: String(row.id),
    category: row.category as PredictionCategory,
    packageTier: (row.package_tier as PackageTier | null) ?? null,
    homeTeam: String(row.home_team),
    awayTeam: String(row.away_team),
    competition: String(row.competition),
    kickoff: String(row.kickoff),
    market: String(row.market),
    odds: Number(row.odds),
    pick: String(row.pick),
    confidence: String(row.confidence),
    status: row.status as Prediction["status"],
    insight: String(row.insight),
    isFree: Boolean(row.is_free),
    isPremium: Boolean(row.is_premium),
  };
}

function mapPackageRow(row: Record<string, unknown>): BettingPackage {
  return {
    slug: String(row.slug),
    category: row.category as PredictionCategory,
    tier: Number(row.tier) as PackageTier,
    name: String(row.name),
    priceKes: Number(row.price_kes),
    description: String(row.description),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
  };
}

function mapPurchaseRow(row: Record<string, unknown>): Purchase {
  return {
    id: String(row.id),
    email: String(row.email),
    packageSlug: String(row.package_slug),
    amountKes: Number(row.amount_kes),
    paystackReference: String(row.paystack_reference),
    status: row.status as PurchaseStatus,
    providerResponse: row.provider_response ? String(row.provider_response) : undefined,
    channel: String(row.channel ?? "paystack"),
    paidAt: String(row.paid_at),
  };
}

export async function getPackages(category?: PredictionCategory) {
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      let query = supabase.from("packages").select("*").order("tier");
      if (category) query = query.eq("category", category);
      const { data } = await query;
      if (data?.length) {
        return data.map((row) => mapPackageRow(row as Record<string, unknown>));
      }
    }
  }

  const source = packagesStore.length ? packagesStore : DEFAULT_PACKAGES;
  return category ? source.filter((item) => item.category === category) : source;
}

export async function getPredictions(category?: PredictionCategory) {
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      let query = supabase.from("predictions").select("*").order("kickoff");
      if (category) query = query.eq("category", category);
      const { data } = await query;
      if (data?.length) {
        return data.map((row) => mapPredictionRow(row as Record<string, unknown>));
      }
    }
  }

  return category ? predictionsStore.filter((item) => item.category === category) : predictionsStore;
}

export async function getMatchHighlights(): Promise<MatchHighlight[]> {
  return seedMatchHighlights;
}

export async function createPrediction(input: Omit<Prediction, "id">) {
  const record: Prediction = {
    ...input,
    id: crypto.randomUUID(),
  };

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("predictions")
        .insert({
          id: record.id,
          category: record.category,
          package_tier: record.packageTier,
          home_team: record.homeTeam,
          away_team: record.awayTeam,
          competition: record.competition,
          kickoff: record.kickoff,
          market: record.market,
          odds: record.odds,
          pick: record.pick,
          confidence: record.confidence,
          status: record.status,
          insight: record.insight,
          is_free: record.isFree,
          is_premium: record.isPremium,
        })
        .select()
        .single();
      if (error) throw error;
      return mapPredictionRow(data as Record<string, unknown>);
    }
  }

  predictionsStore = [record, ...predictionsStore];
  return record;
}

export async function updatePrediction(id: string, input: Omit<Prediction, "id">) {
  const record: Prediction = { id, ...input };

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("predictions")
        .update({
          category: record.category,
          package_tier: record.packageTier,
          home_team: record.homeTeam,
          away_team: record.awayTeam,
          competition: record.competition,
          kickoff: record.kickoff,
          market: record.market,
          odds: record.odds,
          pick: record.pick,
          confidence: record.confidence,
          status: record.status,
          insight: record.insight,
          is_free: record.isFree,
          is_premium: record.isPremium,
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return mapPredictionRow(data as Record<string, unknown>);
    }
  }

  predictionsStore = predictionsStore.map((item) => (item.id === id ? record : item));
  return record;
}

export async function deletePrediction(id: string) {
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { error } = await supabase.from("predictions").delete().eq("id", id);
      if (error) throw error;
    }
  }

  predictionsStore = predictionsStore.filter((item) => item.id !== id);
}

export async function recordPurchase(input: Omit<Purchase, "id" | "paidAt"> & { paidAt?: string }) {
  const record: Purchase = {
    ...input,
    id: crypto.randomUUID(),
    paidAt: input.paidAt ?? new Date().toISOString(),
  };

  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("purchases")
        .upsert(
          {
            email: record.email,
            package_slug: record.packageSlug,
            amount_kes: record.amountKes,
            paystack_reference: record.paystackReference,
            status: record.status,
            provider_response: record.providerResponse,
            channel: record.channel,
            paid_at: record.paidAt,
          },
          { onConflict: "paystack_reference" },
        )
        .select()
        .single();
      if (error) throw error;
      return mapPurchaseRow(data as Record<string, unknown>);
    }
  }

  const existing = purchasesStore.find((item) => item.paystackReference === record.paystackReference);
  if (existing) {
    return existing;
  }
  purchasesStore = [record, ...purchasesStore];
  return record;
}

export async function getPurchaseByReference(reference: string) {
  if (hasSupabaseConfig()) {
    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { data } = await supabase
        .from("purchases")
        .select("*")
        .eq("paystack_reference", reference)
        .maybeSingle();
      if (data) {
        return mapPurchaseRow(data as Record<string, unknown>);
      }
    }
  }

  return purchasesStore.find((item) => item.paystackReference === reference) ?? null;
}
