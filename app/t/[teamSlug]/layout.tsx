import type { ReactNode } from "react";
import { TenantProvider } from "@/src/lib/tenants/context";
import { TenantShell } from "@/components/layout/tenant-shell";

export default function TeamLayout({
  params,
  children
}: {
  params: { teamSlug: string };
  children: ReactNode;
}) {
  const { teamSlug } = params;

  return (
    <TenantProvider teamSlug={teamSlug}>
      <TenantShell>{children}</TenantShell>
    </TenantProvider>
  );
}
