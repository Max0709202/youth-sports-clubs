import { createClient } from "@supabase/supabase-js";

export type TenantInfo = {
  id: string;
  slug: string;
  name: string;
  status: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Resolves tenant from request host. Safe to use in Edge (middleware).
 * Uses Supabase so we don't pull Postgres driver into Edge.
 * Fallback: subdomain -> slug (e.g. lions.yoursite.com -> slug "lions").
 */
export async function getTenantByHost(host: string): Promise<TenantInfo | null> {
  if (!host) return null;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  // 1) Try custom/verified domain lookup
  const { data: domainRow } = await client
    .from("tenant_domains")
    .select("tenant_id")
    .eq("domain", host)
    .maybeSingle();

  if (domainRow?.tenant_id) {
    const { data: tenant } = await client
      .from("tenants")
      .select("id, slug, name, status")
      .eq("id", domainRow.tenant_id)
      .eq("status", "active")
      .maybeSingle();
    return tenant ? mapTenant(tenant) : null;
  }

  // 2) Subdomain: platform base (e.g. yoursite.com) -> no tenant
  const baseHost = process.env.NEXT_PUBLIC_APP_DOMAIN || "localhost:3000";
  if (host === baseHost || host.startsWith("www.")) return null;

  // 3) Subdomain as slug (e.g. lions.yoursite.com -> slug "lions")
  const subdomain = host.split(".")[0];
  if (!subdomain || subdomain === "www") return null;

  const { data: tenant } = await client
    .from("tenants")
    .select("id, slug, name, status")
    .eq("slug", subdomain)
    .eq("status", "active")
    .maybeSingle();

  return tenant ? mapTenant(tenant) : null;
}

function mapTenant(row: { id: string; slug: string; name: string; status: string }): TenantInfo {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    status: row.status,
  };
}
