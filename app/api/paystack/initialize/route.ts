import { NextResponse } from "next/server";
import { findPackageBySlug, initializePaystackTransaction } from "@/lib/paystack";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; packageSlug?: string };

    if (!body.email || !body.packageSlug) {
      return NextResponse.json({ error: "Email and package are required." }, { status: 400 });
    }

    const selectedPackage = findPackageBySlug(body.packageSlug);
    if (!selectedPackage) {
      return NextResponse.json({ error: "Selected package was not found." }, { status: 404 });
    }

    const origin = new URL(request.url).origin;
    const callbackUrl = `${origin}/api/paystack/callback`;

    const initialized = await initializePaystackTransaction({
      email: body.email,
      selectedPackage,
      callbackUrl,
    });

    return NextResponse.json({ authorizationUrl: initialized.authorization_url, reference: initialized.reference });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to initialize checkout." },
      { status: 400 },
    );
  }
}
