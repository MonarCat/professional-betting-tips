"use client";

import { useMemo, useState } from "react";
import { CATEGORY_LABELS, STATUS_OPTIONS } from "@/lib/constants";
import type { Prediction, PredictionCategory, PredictionStatus } from "@/lib/types";

interface AdminPredictionFormProps {
  initialPredictions: Prediction[];
}

const emptyForm = {
  category: "daily" as PredictionCategory,
  packageTier: "4",
  homeTeam: "",
  awayTeam: "",
  competition: "",
  kickoff: "",
  market: "",
  odds: "",
  pick: "",
  confidence: "High",
  status: "Pending" as PredictionStatus,
  insight: "",
  isFree: false,
  isPremium: true,
};

export function AdminPredictionForm({ initialPredictions }: AdminPredictionFormProps) {
  const [predictions, setPredictions] = useState(initialPredictions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedPredictions = useMemo(
    () => [...predictions].sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime()),
    [predictions],
  );

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEditing(prediction: Prediction) {
    setEditingId(prediction.id);
    setForm({
      category: prediction.category,
      packageTier: prediction.packageTier ? String(prediction.packageTier) : "4",
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      competition: prediction.competition,
      kickoff: prediction.kickoff.slice(0, 16),
      market: prediction.market,
      odds: String(prediction.odds),
      pick: prediction.pick,
      confidence: prediction.confidence,
      status: prediction.status,
      insight: prediction.insight,
      isFree: prediction.isFree,
      isPremium: prediction.isPremium,
    });
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      category: form.category,
      packageTier: form.isPremium ? Number(form.packageTier) : null,
      homeTeam: form.homeTeam,
      awayTeam: form.awayTeam,
      competition: form.competition,
      kickoff: new Date(form.kickoff).toISOString(),
      market: form.market,
      odds: Number(form.odds),
      pick: form.pick,
      confidence: form.confidence,
      status: form.status,
      insight: form.insight,
      isFree: form.isFree,
      isPremium: form.isPremium,
    };

    try {
      const response = await fetch(editingId ? `/api/admin/predictions/${editingId}` : "/api/admin/predictions", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { prediction?: Prediction; error?: string };
      if (!response.ok || !result.prediction) {
        throw new Error(result.error ?? "Unable to save prediction.");
      }

      setPredictions((current) => {
        if (editingId) {
          return current.map((item) => (item.id === editingId ? result.prediction! : item));
        }
        return [result.prediction!, ...current];
      });
      resetForm();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save prediction.");
    } finally {
      setSaving(false);
    }
  }

  async function removePrediction(id: string) {
    setError(null);
    const response = await fetch(`/api/admin/predictions/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Unable to delete prediction.");
      return;
    }
    setPredictions((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Prediction Manager</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Create and edit premium or free picks</h2>
          </div>
          {editingId ? (
            <button type="button" onClick={resetForm} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:text-white">
              Cancel edit
            </button>
          ) : null}
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
          <label className="text-sm text-slate-300">
            Category
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as PredictionCategory }))}
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Package tier
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              value={form.packageTier}
              onChange={(event) => setForm((current) => ({ ...current, packageTier: event.target.value }))}
              disabled={!form.isPremium}
            >
              <option value="4">4 odds</option>
              <option value="8">8 odds</option>
              <option value="10">10 odds</option>
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Home team
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.homeTeam} onChange={(event) => setForm((current) => ({ ...current, homeTeam: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Away team
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.awayTeam} onChange={(event) => setForm((current) => ({ ...current, awayTeam: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Competition
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.competition} onChange={(event) => setForm((current) => ({ ...current, competition: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Kickoff
            <input type="datetime-local" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.kickoff} onChange={(event) => setForm((current) => ({ ...current, kickoff: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Market
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.market} onChange={(event) => setForm((current) => ({ ...current, market: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Odds
            <input type="number" step="0.01" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.odds} onChange={(event) => setForm((current) => ({ ...current, odds: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300 md:col-span-2">
            Pick
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.pick} onChange={(event) => setForm((current) => ({ ...current, pick: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Confidence
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.confidence} onChange={(event) => setForm((current) => ({ ...current, confidence: event.target.value }))} required />
          </label>
          <label className="text-sm text-slate-300">
            Status
            <select className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as PredictionStatus }))}>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300 md:col-span-2">
            Insight
            <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white" value={form.insight} onChange={(event) => setForm((current) => ({ ...current, insight: event.target.value }))} required />
          </label>
          <div className="flex flex-wrap gap-5 md:col-span-2">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={form.isFree} onChange={(event) => setForm((current) => ({ ...current, isFree: event.target.checked }))} />
              Free tip
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={form.isPremium} onChange={(event) => setForm((current) => ({ ...current, isPremium: event.target.checked }))} />
              Premium tip
            </label>
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={saving} className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-70">
              {saving ? "Saving..." : editingId ? "Update prediction" : "Create prediction"}
            </button>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </div>
        </form>
      </section>
      <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Existing Predictions</p>
        <div className="mt-5 space-y-4">
          {sortedPredictions.map((prediction) => (
            <article key={prediction.id} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-white">{prediction.homeTeam} vs {prediction.awayTeam}</h3>
                  <p className="text-sm text-slate-400">{CATEGORY_LABELS[prediction.category]} · {prediction.pick}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEditing(prediction)} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:text-white">Edit</button>
                  <button type="button" onClick={() => removePrediction(prediction.id)} className="rounded-full border border-rose-400/20 px-3 py-1.5 text-xs text-rose-300 transition hover:border-rose-300/40">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
