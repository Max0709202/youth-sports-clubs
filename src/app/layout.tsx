import type { Metadata } from "next";
import "./globals.css";
import { getTenantFromHeaders } from "@/lib/tenant/context";
import { db } from "@/lib/db";
import { tenantThemes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { themeToCssVariables } from "@/lib/branding";
import { StorefrontNav } from "@/components/storefront/StorefrontNav";

export const metadata: Metadata = {
  title: "Youth Sports Merch",
  description: "Multi-tenant storefronts for youth sports clubs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getTenantFromHeaders();
  let themeWrap: React.ReactNode = children;

  if (tenant && db) {
    const themeRow = (await db.select().from(tenantThemes).where(eq(tenantThemes.tenantId, tenant.id)).limit(1))[0];
    const tokens = themeRow
      ? themeToCssVariables({
          primary: themeRow.primaryColor,
          secondary: themeRow.secondaryColor,
          accent: themeRow.accentColor,
          background: themeRow.backgroundColor,
          text: themeRow.textColor,
        })
      : themeToCssVariables({});
    themeWrap = (
      <div className="store-theme min-h-screen" style={tokens as React.CSSProperties}>
        <StorefrontNav logoUrl={themeRow?.logoUrl ?? null} storeName={tenant.slug} />
        <main>{children}</main>
      </div>
    );
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[var(--color-background,#fff)] text-[var(--color-text,#111827)]">
        {themeWrap}
      </body>
    </html>
  );
}
