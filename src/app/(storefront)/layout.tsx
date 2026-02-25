import { getTenantFromHeaders } from "@/lib/tenant/context";
import { redirect } from "next/navigation";

/** Guard: storefront routes (collection, product, cart) require a resolved tenant. */
export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenant = await getTenantFromHeaders();
  if (!tenant) redirect("/");
  return <>{children}</>;
}
