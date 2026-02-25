import Link from "next/link";
import { seededTeams } from "@/src/lib/tenants/config";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-8 top-24 mx-auto h-40 rounded-3xl border border-slate-700/60 bg-slate-900/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center gap-8">
        <span className="surface-pill px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Multi-tenant merch studio · Demo
        </span>
        <div className="space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Launch a{" "}
            <span className="bg-gradient-to-r from-orange-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              team-branded
            </span>{" "}
            merch store in minutes.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            This MVP simulates the full experience: onboarding a youth sports
            team, generating a fully branded storefront, and visualizing
            automated fulfillment & payouts – all with mocked data.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/onboarding">Create a team store</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href={`/t/${seededTeams[0]?.slug ?? "wildcats"}`}>
              Jump into a live demo
            </Link>
          </Button>
        </div>

        <div className="mt-8 w-full max-w-3xl surface-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Sample teams
            </h2>
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
              Multi-tenant preview
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {seededTeams.map((team) => (
              <Link
                key={team.id}
                href={`/t/${team.slug}`}
                className="group rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 flex flex-col gap-2 hover:border-[rgb(var(--accent))] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-slate-800/80 flex items-center justify-center text-xs font-bold uppercase">
                    {team.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{team.name}</span>
                    {team.sport && (
                      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">
                        {team.sport}
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-orange-400 via-sky-400 to-emerald-400 group-hover:translate-x-1/4 transition-transform" />
                </div>
                <span className="text-[0.7rem] text-slate-400">
                  View storefront & dashboard →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
