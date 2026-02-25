/**
 * Fulfillment provider adapter interface.
 * Implement for Printify, Printful, etc. so order flow is provider-agnostic.
 */

export interface ProductSyncInput {
  templateId: string;
  tenantId: string;
  name: string;
  variants: Array<{ optionName: string; optionValue: string; providerVariantId?: string }>;
}

export interface ProductSyncResult {
  success: boolean;
  providerProductId?: string;
  providerVariantIds?: Record<string, string>;
  error?: string;
}

export interface FulfillmentOrderInput {
  orderId: string;
  tenantId: string;
  items: Array<{
    tenantProductId: string;
    variantId?: string;
    quantity: number;
    productName: string;
    variantDescription?: string;
    priceCents: number;
  }>;
  shipping: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
  };
}

export interface FulfillmentOrderResult {
  success: boolean;
  providerOrderId?: string;
  status?: string;
  error?: string;
}

export interface FulfillmentStatus {
  providerOrderId: string;
  status: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export interface FulfillmentProvider {
  createProductSync(input: ProductSyncInput): Promise<ProductSyncResult>;
  createOrder(input: FulfillmentOrderInput): Promise<FulfillmentOrderResult>;
  getOrderStatus(providerOrderId: string): Promise<FulfillmentStatus>;
  handleWebhook(payload: unknown, signature?: string): Promise<void>;
}
