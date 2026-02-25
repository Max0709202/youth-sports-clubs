import { headers } from "next/headers";

export type TenantContext = {
  id: string;
  slug: string;
} | null;

/**
 * Read tenant from middleware-injected headers. Use in Server Components / Route Handlers.
 */
export async function getTenantFromHeaders(): Promise<TenantContext> {
  const h = await headers();
  const id = h.get("x-tenant-id");
  const slug = h.get("x-tenant-slug");
  if (!id || !slug) return null;
  return { id, slug };
}

export function getTenantFromHeadersSync(): TenantContext {
  // Only for use in contexts where headers() is already available synchronously
  return null;
}
