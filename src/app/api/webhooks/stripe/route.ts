import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ensureEventStored, markProcessed } from "@/lib/webhooks/idempotency";
import { env } from "@/lib/env";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" }) : null;

export async function POST(req: NextRequest) {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const status = await ensureEventStored("stripe", event.id, body);
  if (status === "duplicate") {
    return NextResponse.json({ received: true });
  }

  // Enqueue async job here (e.g. Trigger.dev). For MVP we process inline for payment_intent.succeeded.
  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      // TODO: load order by stripe_payment_intent_id, set status to paid, create fulfillment order
      void pi;
    }
    await markProcessed("stripe", event.id, body);
  } catch (e) {
    await markProcessed("stripe", event.id, body, e instanceof Error ? e.message : "Unknown error");
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
