import { cookies } from "next/headers";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import type { PackageTier, PredictionCategory, PurchaseAccess } from "@/lib/types";

export async function getPurchaseAccessFromCookies(): Promise<PurchaseAccess> {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(ACCESS_COOKIE_NAME)?.value;

  if (!rawValue) {
    return { packageSlugs: [] };
  }

  try {
    const parsed = JSON.parse(rawValue) as PurchaseAccess;
    return {
      email: parsed.email,
      packageSlugs: Array.isArray(parsed.packageSlugs) ? parsed.packageSlugs : [],
    };
  } catch {
    return { packageSlugs: [] };
  }
}

export function serializePurchaseAccess(access: PurchaseAccess) {
  return JSON.stringify({
    email: access.email,
    packageSlugs: Array.from(new Set(access.packageSlugs)),
  });
}

export function getUnlockedTierForCategory(packageSlugs: string[], category: PredictionCategory): PackageTier | 0 {
  const categorySlugs = packageSlugs.filter((slug) => slug.startsWith(`${category}-`));

  if (categorySlugs.some((slug) => slug.includes("-10-"))) return 10;
  if (categorySlugs.some((slug) => slug.includes("-8-"))) return 8;
  if (categorySlugs.some((slug) => slug.includes("-4-"))) return 4;

  return 0;
}
