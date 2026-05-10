import { PaymentButton } from "@/components/PaymentButton";
import type { BettingPackage } from "@/lib/types";

export function PackageCard({ selectedPackage, unlocked }: { selectedPackage: BettingPackage; unlocked: boolean }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">{selectedPackage.category}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{selectedPackage.name}</h3>
        </div>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-300">
          KES {selectedPackage.priceKes}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{selectedPackage.description}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {selectedPackage.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-emerald-300">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
        {unlocked ? (
          <p className="text-sm font-medium text-emerald-300">This package is already unlocked in the current browser session.</p>
        ) : (
          <PaymentButton selectedPackage={selectedPackage} />
        )}
      </div>
    </article>
  );
}
