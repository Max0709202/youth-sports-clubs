import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { tenants } from "./tenants";
import { orders } from "./commerce";

export const paymentIntents = pgTable("payment_intents", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull().unique(),
  amountCents: integer("amount_cents").notNull(),
  platformFeeCents: integer("platform_fee_cents").notNull().default(0),
  transferCents: integer("transfer_cents").notNull(),
  status: text("status").notNull(), // requires_payment_method | requires_confirmation | succeeded | canceled
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const stripeConnectAccounts = pgTable("stripe_connect_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" })
    .unique(),
  stripeAccountId: text("stripe_account_id").notNull().unique(),
  onboardingComplete: text("onboarding_complete").notNull().default("false"), // stored as text for simplicity
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
