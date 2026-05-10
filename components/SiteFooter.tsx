import Link from "next/link";
import { FACEBOOK_URL, RESPONSIBLE_BETTING_NOTICES, SUPPORT_EMAIL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {RESPONSIBLE_BETTING_NOTICES.map((notice) => (
            <span key={notice} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              {notice}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Premium football tips for informed bettors. Reach support via <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-300">{SUPPORT_EMAIL}</a>.
          </p>
          <div className="flex gap-4">
            <Link href="/responsible-betting" className="transition hover:text-white">
              Responsible betting
            </Link>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">
              Facebook community
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
