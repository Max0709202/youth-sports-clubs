import { getTenantFromHeaders } from "@/lib/tenant/context";
import { db } from "@/lib/db";
import { tenantProducts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { formatMoney } from "@/lib/money";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getTenantFromHeaders();
  if (!tenant || !db) return null;

  const products = await db
    .select()
    .from(tenantProducts)
    .where(and(eq(tenantProducts.tenantId, tenant.id), eq(tenantProducts.isEnabled, true)))
    .orderBy(asc(tenantProducts.sortOrder));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {slug === "all" ? "All products" : slug}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 ? (
          <p className="text-[var(--color-secondary)]">No products yet.</p>
        ) : (
          products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="group block rounded-xl overflow-hidden border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)] transition"
            >
              {p.imageUrl && (
                <div className="aspect-square bg-[var(--color-secondary)]/10 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!p.imageUrl && (
                <div className="aspect-square bg-[var(--color-secondary)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-secondary)]">No image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                  {p.name}
                </h2>
                <p className="text-[var(--color-primary)] font-medium mt-1">
                  {formatMoney(p.priceCents)}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
