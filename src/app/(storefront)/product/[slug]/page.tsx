import { getTenantFromHeaders } from "@/lib/tenant/context";
import { db } from "@/lib/db";
import { tenantProducts, tenantProductVariants } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatMoney } from "@/lib/money";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await getTenantFromHeaders();
  if (!tenant || !db) notFound();

  const [product] = await db
    .select()
    .from(tenantProducts)
    .where(and(eq(tenantProducts.tenantId, tenant.id), eq(tenantProducts.slug, slug), eq(tenantProducts.isEnabled, true)))
    .limit(1);
  if (!product) notFound();

  const variants = await db
    .select()
    .from(tenantProductVariants)
    .where(eq(tenantProductVariants.tenantProductId, product.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[var(--color-secondary)]/10 rounded-xl overflow-hidden">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-secondary)]">
              No image
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-[var(--color-primary)] font-semibold mb-4">
            {formatMoney(product.priceCents)}
          </p>
          {product.description && (
            <p className="text-[var(--color-secondary)] mb-6">{product.description}</p>
          )}
          {variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Options
              </label>
              <select className="w-full max-w-xs px-4 py-2 rounded-lg border border-[var(--color-primary)]/30 bg-transparent">
                {variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.optionValue} {v.priceCents != null ? `(${formatMoney(v.priceCents)})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="button"
            className="w-full py-3 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
