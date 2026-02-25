import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getTeamBySlug } from "@/src/lib/tenants/config";

export default function TeamStorefrontPage({
  params
}: {
  params: { teamSlug: string };
}) {
  const team = getTeamBySlug(params.teamSlug);

  if (!team) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-semibold">Team not found</h1>
        <p className="text-sm text-slate-400">
          This team slug doesn&apos;t match any demo team yet. Try one of the
          sample teams from the homepage.
        </p>
        <Button asChild variant="ghost">
          <Link href="/">Back to all teams</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
      <section className="space-y-6">
        <div className="surface-card p-6 sm:p-8 border-[color:rgb(var(--card-border))]/70">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Official team store
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                {team.name}
              </h1>
              {team.sport && (
                <span className="text-[0.75rem] uppercase tracking-[0.2em] text-slate-400">
                  {team.sport} · Youth
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2 text-right">
              <div className="surface-pill px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Matchday Collection
              </div>
              <div className="h-10 w-24 rounded-2xl border border-slate-700/70 bg-slate-900/80 overflow-hidden flex items-center justify-center text-[0.7rem] text-slate-400">
                <span className="inline-flex h-full w-full bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-soft))] to-slate-700/80 opacity-80" />
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-300 max-w-xl">
            Rep your club with game-ready jerseys, hoodies, and accessories
            printed on demand. This is a fully mocked demo store to showcase
            the experience your families will see.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg">Shop featured gear</Button>
            <Button asChild variant="ghost">
              <Link href="#all-products">Browse full catalog</Link>
            </Button>
          </div>
        </div>

        <section
          id="all-products"
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Team catalog
            </h2>
            <span className="text-[0.7rem] text-slate-500">
              Product grid coming next · mocked data
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 opacity-70">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl border border-slate-800/70 bg-slate-900/60 flex flex-col justify-between p-3"
              >
                <div className="h-20 rounded-xl bg-slate-800/80 mb-3" />
                <div className="space-y-1">
                  <div className="h-3 w-3/4 rounded-full bg-slate-700/80" />
                  <div className="h-3 w-1/2 rounded-full bg-slate-800/80" />
                </div>
                <div className="mt-2 h-3 w-1/3 rounded-full bg-slate-700/80" />
              </div>
            ))}
          </div>
        </section>
      </section>

      <aside className="space-y-4">
        <div className="surface-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Store snapshot
            </h3>
            <span className="text-[0.7rem] text-slate-500">
              Demo metrics · mocked
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                Orders
              </dt>
              <dd className="text-lg font-semibold">128</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                Est. revenue
              </dt>
              <dd className="text-lg font-semibold">$4.6k</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                Avg. items / order
              </dt>
              <dd className="text-lg font-semibold">3.2</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
                Fulfillment SLA
              </dt>
              <dd className="text-lg font-semibold">3–5 days</dd>
            </div>
          </dl>
        </div>

        <div className="surface-card p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Automation preview
          </h3>
          <ol className="space-y-2 text-xs text-slate-300">
            <li>1. Order placed in team store</li>
            <li>2. Routed to print partner (mocked)</li>
            <li>3. In production · batching like-orders</li>
            <li>4. Shipped with live tracking link</li>
            <li>5. Payout queued for weekly batch</li>
            <li>6. Funds sent to club account</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
