import type {
  FulfillmentProvider,
  FulfillmentOrderInput,
  FulfillmentOrderResult,
  FulfillmentStatus,
  ProductSyncInput,
  ProductSyncResult,
} from "./types";

/**
 * Printify adapter stub. Implement with Printify API when ready.
 * @see https://developers.printify.com/
 */
export const printifyAdapter: FulfillmentProvider = {
  async createProductSync(_input: ProductSyncInput): Promise<ProductSyncResult> {
    return { success: false, error: "Printify product sync not implemented" };
  },

  async createOrder(_input: FulfillmentOrderInput): Promise<FulfillmentOrderResult> {
    return { success: false, error: "Printify create order not implemented" };
  },

  async getOrderStatus(_providerOrderId: string): Promise<FulfillmentStatus> {
    return {
      providerOrderId: "",
      status: "unknown",
    };
  },

  async handleWebhook(_payload: unknown, _signature?: string): Promise<void> {
    // Verify signature, parse event, enqueue job to update fulfillment_orders
  },
};
