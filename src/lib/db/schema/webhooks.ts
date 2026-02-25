import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  provider: text("provider").notNull(), // 'stripe' | 'printify' | 'printful'
  eventId: text("event_id").notNull().unique(), // idempotency key
  payload: text("payload"), // raw body for audit
  processed: boolean("processed").default(false).notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  tenantId: uuid("tenant_id"),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  resourceType: text("resource_type"),
  resourceId: text("resource_id"),
  metadata: text("metadata"), // json
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
