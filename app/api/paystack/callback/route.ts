import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/lib/constants";
import { getPurchaseAccessFromCookies, serializePurchaseAccess } from "@/lib/access";
import { verifyAndRecordPayment } from "@/lib/paystack";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = url.searchParams.get("reference") ?? url.searchParams.get("trxref");
  const packageSlug = url.searchParams.get("package") ?? undefined;
  const email = url.searchParams.get("email") ?? undefined;
  const demo = url.searchParams.get("demo") === "1";

  if (!reference) {
    return NextResponse.redirect(new URL("/premium-odds?payment=missing-reference", url.origin));
  }

  try {
    const purchase = await verifyAndRecordPayment({ reference, packageSlug, email, demo });
    const access = await getPurchaseAccessFromCookies();
    const response = NextResponse.redirect(
      new URL(`/premium-odds?payment=success&package=${encodeURIComponent(purchase.packageSlug)}`, url.origin),
    );

    response.cookies.set(ACCESS_COOKIE_NAME, serializePurchaseAccess({
      email: purchase.email,
      packageSlugs: [...access.packageSlugs, purchase.packageSlug],
    }), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/premium-odds?payment=failed", url.origin));
  }
}
