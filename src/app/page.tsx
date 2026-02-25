import Link from "next/link";
import { getTenantFromHeaders } from "@/lib/tenant/context";
import { db } from "@/lib/db";
import { tenantProducts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export default async function HomePage() {
  const tenant = await getTenantFromHeaders();

  if (tenant) {
    const products = db
      ? await db
          .select()
          .from(tenantProducts)
          .where(and(eq(tenantProducts.tenantId, tenant.id), eq(tenantProducts.isEnabled, true)))
          .orderBy(asc(tenantProducts.sortOrder))
          .limit(6)
      : [];
    return (
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Welcome to {tenant.slug}
          </h1>
          <p className="text-xl text-[var(--color-secondary)]">
            Team spirit gear — browse and order below.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-6">Shop</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/collection/all"
              className="block p-6 rounded-xl border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-accent)] transition"
            >
              <span className="font-medium text-[var(--color-primary)]">View all products</span>
            </Link>
            {products.length > 0 &&
              products.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block p-4 rounded-xl border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)] transition"
                >
                  <span className="font-medium text-[var(--color-primary)]">{p.name}</span>
                </Link>
              ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
        Youth Sports Merch
      </h1>
      <p className="text-lg text-[var(--color-secondary)] mb-8 max-w-md text-center">
        One platform. Thousands of team stores. Logo upload → branded store in minutes.
      </p>
      <div className="flex gap-4">
        <Link
          href="/onboarding"
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90"
        >
          Create team store
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary)] hover:text-white"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
