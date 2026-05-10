import Link from "next/link";
import { BRAND_NAME, NAV_LINKS } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
          {BRAND_NAME}
        </Link>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
