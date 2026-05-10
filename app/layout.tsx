import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BRAND_NAME, SEO_KEYWORDS } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://professional-betting-tips.vercel.app"),
  title: {
    default: `${BRAND_NAME} | Football Predictions & Premium Odds`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Professional Betting Tips delivers daily odds, weekend odds, premium football tips, match highlights, and responsible betting guidance.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: `${BRAND_NAME} | Football Predictions & Premium Odds`,
    description:
      "Premium football betting predictions with Daily Odds, Weekend Odds, Monthly Odds, match highlights, and responsible betting notices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Football Predictions & Premium Odds`,
    description:
      "Daily football predictions, premium odds packages, and responsible betting notices for bettors who value discipline.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-white">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-7xl flex-1 px-6 py-8 lg:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
