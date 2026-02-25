export * from "./types";
export { printifyAdapter } from "./printify-adapter";

import type { FulfillmentProvider } from "./types";
import { printifyAdapter } from "./printify-adapter";

const providers: Record<string, FulfillmentProvider> = {
  printify: printifyAdapter,
};

export function getFulfillmentProvider(slug: string): FulfillmentProvider | null {
  return providers[slug] ?? null;
}
