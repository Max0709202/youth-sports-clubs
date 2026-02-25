import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { webhookEvents } from "@/lib/db/schema";

/**
 * Returns true if event was already processed (skip duplicate work).
 * Call this at the start of every webhook handler.
 */
export async function isProcessed(_provider: string, eventId: string): Promise<boolean> {
  if (!db) return false;
  const row = await db
    .select({ processed: webhookEvents.processed })
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, eventId))
    .limit(1);
  return row[0]?.processed ?? false;
}

/**
 * Store raw webhook for audit and mark as processed (or failed).
 * Call after successful processing, or on error with errorMessage.
 */
export async function markProcessed(
  provider: string,
  eventId: string,
  payload: string,
  errorMessage?: string
): Promise<void> {
  if (!db) return;
  await db.insert(webhookEvents).values({
    provider,
    eventId,
    payload,
    processed: !errorMessage,
    processedAt: !errorMessage ? new Date() : null,
    errorMessage: errorMessage ?? null,
  }).onConflictDoUpdate({
    target: [webhookEvents.eventId],
    set: {
      processed: !errorMessage,
      processedAt: !errorMessage ? new Date() : undefined,
      errorMessage: errorMessage ?? null,
    },
  });
}

/**
 * Insert event first (for idempotency); then process in background.
 * Pattern: 1) Verify signature 2) Insert/select webhook_events 3) If new, enqueue job 4) Return 200.
 */
export async function ensureEventStored(provider: string, eventId: string, payload: string): Promise<"new" | "duplicate"> {
  if (!db) return "duplicate";
  const existing = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, eventId))
    .limit(1);
  if (existing.length > 0) return "duplicate";
  await db.insert(webhookEvents).values({
    provider,
    eventId,
    payload,
    processed: false,
  });
  return "new";
}
