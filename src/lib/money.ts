/**
 * All monetary amounts in the app are stored in cents (integer).
 * Helpers for display and Stripe (Stripe uses cents).
 */

export function centsToDollars(cents: number): number {
  return Math.round(cents) / 100;
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function formatMoney(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(centsToDollars(cents));
}

/**
 * Platform fee: e.g. 15% or fixed amount. Example: 15% of order total.
 */
export function computePlatformFeeCents(totalCents: number, feePercent: number): number {
  return Math.round((totalCents * feePercent) / 100);
}

export function computeTransferCents(totalCents: number, platformFeeCents: number): number {
  return totalCents - platformFeeCents;
}
