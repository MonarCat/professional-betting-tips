import type { Metadata } from "next";
import { AdminPredictionForm } from "@/components/AdminPredictionForm";
import { getPredictions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard for creating, editing, and deleting football predictions.",
};

export default async function AdminPage() {
  const predictions = await getPredictions();

  return (
    <div className="w-full space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-emerald-950/40 p-8 shadow-2xl shadow-black/30">
        <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">Admin Dashboard</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Manage predictions without touching code.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Create, edit, and delete free or premium picks. When Supabase is configured, the dashboard persists records to the predictions table.
        </p>
      </section>
      <AdminPredictionForm initialPredictions={predictions} />
    </div>
  );
}
