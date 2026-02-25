import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-6">
        Team dashboard
      </h1>
      <p className="text-[var(--color-secondary)] mb-8">
        MVP: Branding, product toggle, orders, payout setup, domain settings.
      </p>
      <div className="grid gap-4 max-w-lg">
        <Link
          href="/dashboard/branding"
          className="block p-4 rounded-lg border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)]"
        >
          Branding (logo / colors)
        </Link>
        <Link
          href="/dashboard/products"
          className="block p-4 rounded-lg border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)]"
        >
          Products
        </Link>
        <Link
          href="/dashboard/orders"
          className="block p-4 rounded-lg border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)]"
        >
          Orders
        </Link>
        <Link
          href="/dashboard/payouts"
          className="block p-4 rounded-lg border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)]"
        >
          Payout setup (Stripe Connect)
        </Link>
      </div>
      <Link href="/" className="inline-block mt-8 text-[var(--color-secondary)] hover:underline">
        Back to home
      </Link>
    </div>
  );
}
