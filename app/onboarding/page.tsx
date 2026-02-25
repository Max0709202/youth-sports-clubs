import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="space-y-3">
        <span className="surface-pill px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Store generator · Demo
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Create a team-branded merch store.
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          This is a mocked onboarding flow for the MVP. In a real deployment,
          each step would connect to live catalog, fulfillment, and payout
          services.
        </p>
      </div>

      <form className="surface-card p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Team name
            </label>
            <input
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-sm outline-none focus:border-[rgb(var(--accent))]"
              placeholder="Westside Wildcats"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Sport
            </label>
            <select className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-sm outline-none focus:border-[rgb(var(--accent))]">
              <option>Soccer</option>
              <option>Basketball</option>
              <option>Baseball</option>
              <option>Volleyball</option>
              <option>Hockey</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Primary color
            </label>
            <input
              type="color"
              defaultValue="#f97316"
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 p-1"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Secondary color
            </label>
            <input
              type="color"
              defaultValue="#020617"
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 p-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Style preset
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {["bold", "classic", "energy"].map((preset) => (
              <button
                key={preset}
                type="button"
                className="group rounded-2xl border border-slate-700/80 bg-slate-900/70 px-4 py-3 text-left hover:border-[rgb(var(--accent))] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-semibold capitalize">
                    {preset}
                  </span>
                  <span className="h-6 w-10 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-soft))] opacity-80 group-hover:opacity-100" />
                </div>
                <p className="text-[0.7rem] text-slate-400">
                  Mock preset – wired to theme tokens in the demo.
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[0.7rem] text-slate-500 max-w-xs">
            In the full demo flow, your inputs here will generate a fully
            branded storefront preview and a team dashboard.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="ghost">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="button">
              Generate store preview
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
