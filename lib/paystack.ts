import { DEFAULT_PACKAGES } from "@/lib/constants";
import { getPurchaseByReference, recordPurchase } from "@/lib/data";
import type { BettingPackage, Purchase } from "@/lib/types";

interface VerifyPaymentInput {
  reference: string;
  packageSlug?: string;
  email?: string;
  demo?: boolean;
}

function getPackageOrThrow(packageSlug: string) {
  const selectedPackage = DEFAULT_PACKAGES.find((item) => item.slug === packageSlug);
  if (!selectedPackage) {
    throw new Error("Unknown package selected.");
  }
  return selectedPackage;
}

export function findPackageBySlug(packageSlug: string): BettingPackage | undefined {
  return DEFAULT_PACKAGES.find((item) => item.slug === packageSlug);
}

export async function initializePaystackTransaction({
  email,
  selectedPackage,
  callbackUrl,
}: {
  email: string;
  selectedPackage: BettingPackage;
  callbackUrl: string;
}) {
  const paystackKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = `pbt_${selectedPackage.slug}_${Date.now()}`;

  if (!paystackKey) {
    const url = new URL(callbackUrl);
    url.searchParams.set("reference", reference);
    url.searchParams.set("package", selectedPackage.slug);
    url.searchParams.set("email", email);
    url.searchParams.set("demo", "1");
    return { authorization_url: url.toString(), reference, mode: "demo" as const };
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${paystackKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: selectedPackage.priceKes * 100,
      currency: "KES",
      callback_url: callbackUrl,
      reference,
      metadata: {
        packageSlug: selectedPackage.slug,
        priceKes: selectedPackage.priceKes,
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to initialize Paystack checkout.");
  }

  const payload = (await response.json()) as {
    data?: { authorization_url: string; reference: string };
  };

  if (!payload.data?.authorization_url) {
    throw new Error("Paystack did not return an authorization URL.");
  }

  return { ...payload.data, mode: "live" as const };
}

export async function verifyAndRecordPayment({ reference, packageSlug, email, demo }: VerifyPaymentInput): Promise<Purchase> {
  const existing = await getPurchaseByReference(reference);
  if (existing?.status === "paid") {
    return existing;
  }

  if (demo) {
    if (!packageSlug || !email) {
      throw new Error("Missing demo purchase context.");
    }

    const selectedPackage = getPackageOrThrow(packageSlug);
    return recordPurchase({
      email,
      packageSlug,
      amountKes: selectedPackage.priceKes,
      paystackReference: reference,
      status: "paid",
      providerResponse: "Demo Paystack verification",
      channel: "demo",
    });
  }

  const paystackKey = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackKey) {
    throw new Error("Paystack secret key is not configured.");
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${paystackKey}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to verify Paystack transaction.");
  }

  const payload = (await response.json()) as {
    data?: {
      status?: string;
      amount?: number;
      customer?: { email?: string };
      gateway_response?: string;
      metadata?: { packageSlug?: string };
      paid_at?: string;
      channel?: string;
    };
  };

  if (!payload.data || payload.data.status !== "success") {
    throw new Error("Payment was not successful.");
  }

  const resolvedPackageSlug = packageSlug ?? payload.data.metadata?.packageSlug;
  const resolvedEmail = email ?? payload.data.customer?.email;

  if (!resolvedPackageSlug || !resolvedEmail) {
    throw new Error("Verified payment is missing package or customer details.");
  }

  const selectedPackage = getPackageOrThrow(resolvedPackageSlug);
  if (payload.data.amount !== selectedPackage.priceKes * 100) {
    throw new Error("Verified amount does not match selected package.");
  }

  return recordPurchase({
    email: resolvedEmail,
    packageSlug: resolvedPackageSlug,
    amountKes: selectedPackage.priceKes,
    paystackReference: reference,
    status: "paid",
    providerResponse: payload.data.gateway_response,
    channel: payload.data.channel ?? "paystack",
    paidAt: payload.data.paid_at,
  });
}
