import { pgTable, uuid, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

// Platform-owned master product templates
export const catalogTemplates = pgTable("catalog_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  provider: text("provider").notNull(), // 'printify' | 'printful'
  providerTemplateId: text("provider_template_id"),
  category: text("category"), // hoodie, tee, hat, bag
  imageUrl: text("image_url"),
  variantSchema: jsonb("variant_schema"), // sizes, colors, print area mapping
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Tenant-specific product (team-branded listing from a template)
export const tenantProducts = pgTable("tenant_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  templateId: uuid("template_id").references(() => catalogTemplates.id, { onDelete: "set null" }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Variants (sizes/colors) for tenant products; maps to provider variant IDs
export const tenantProductVariants = pgTable("tenant_product_variants", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantProductId: uuid("tenant_product_id")
    .notNull()
    .references(() => tenantProducts.id, { onDelete: "cascade" }),
  sku: text("sku"),
  providerVariantId: text("provider_variant_id"),
  optionName: text("option_name"), // e.g. "Size"
  optionValue: text("option_value"), // e.g. "M"
  priceCents: integer("price_cents"),
  stock: integer("stock"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
