import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  status: text("status").notNull().default("active"), // active | suspended | pending
  stripeAccountId: text("stripe_account_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tenantDomains = pgTable("tenant_domains", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  domain: text("domain").notNull().unique(),
  type: text("type").notNull(), // 'subdomain' | 'custom'
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tenantThemes = pgTable("tenant_themes", {
  tenantId: uuid("tenant_id")
    .primaryKey()
    .references(() => tenants.id, { onDelete: "cascade" }),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").notNull().default("#0A3D91"),
  secondaryColor: text("secondary_color").notNull().default("#F5C542"),
  accentColor: text("accent_color").notNull().default("#D7263D"),
  backgroundColor: text("background_color").notNull().default("#FFFFFF"),
  textColor: text("text_color").notNull().default("#111827"),
  themeJson: text("theme_json"), // jsonb stored as text for drizzle; cast in app
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tenantSettings = pgTable("tenant_settings", {
  tenantId: uuid("tenant_id")
    .primaryKey()
    .references(() => tenants.id, { onDelete: "cascade" }),
  bannerText: text("banner_text"),
  shippingPolicyUrl: text("shipping_policy_url"),
  returnsPolicyUrl: text("returns_policy_url"),
  announcementBar: text("announcement_bar"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
