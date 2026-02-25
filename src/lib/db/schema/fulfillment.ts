import { pgTable, uuid, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { orders } from "./commerce";

export const fulfillmentProviders = pgTable("fulfillment_providers", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(), // 'printify' | 'printful'
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  configJson: text("config_json"), // encrypted or env-ref'd credentials
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const fulfillmentOrders = pgTable("fulfillment_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  providerId: uuid("provider_id")
    .notNull()
    .references(() => fulfillmentProviders.id, { onDelete: "cascade" }),
  providerOrderId: text("provider_order_id").unique(),
  status: text("status").notNull(), // pending | submitted | in_production | shipped | failed
  payloadSent: jsonb("payload_sent"),
  responsePayload: jsonb("response_payload"),
  trackingNumber: text("tracking_number"),
  trackingUrl: text("tracking_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const fulfillmentOrderEvents = pgTable("fulfillment_order_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  fulfillmentOrderId: uuid("fulfillment_order_id")
    .notNull()
    .references(() => fulfillmentOrders.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(),
  payload: jsonb("payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
