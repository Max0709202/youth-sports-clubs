import type { Product } from "@/src/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const cheapestVariant = [...product.variants].sort(
    (a, b) => a.priceCents - b.priceCents
  )[0];

  const price =
    cheapestVariant != null
      ? (cheapestVariant.priceCents / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })
      : "";

  return (
    <article className="group rounded-2xl border border-slate-800/80 bg-slate-950/60 hover:bg-slate-900/80 hover:border-[rgb(var(--accent))] transition-all overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-slate-900/80">
        <div className="absolute inset-3 rounded-2xl bg-slate-800/80 flex items-center justify-center text-[0.7rem] text-slate-500">
          Mock image
        </div>
      </div>
      <div className="flex-1 px-3.5 py-3 space-y-1.5">
        <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-[0.7rem] text-slate-400 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-slate-50">{price}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-slate-400">
            {product.category}
          </span>
        </div>
      </div>
    </article>
  );
}

