export type Sport =
  | "soccer"
  | "basketball"
  | "baseball"
  | "volleyball"
  | "hockey";

export type StylePreset = "bold" | "classic" | "energy";

export interface TeamTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundGradient: string;
  stylePreset: StylePreset;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  sport?: Sport;
  logoUrl?: string;
  theme: TeamTheme;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: "YS" | "YM" | "YL" | "S" | "M" | "L" | "XL";
  colorLabel?: string;
  colorHex?: string;
  priceCents: number;
}

export type ProductCategory = "jersey" | "hoodie" | "hat" | "accessory";

export interface Product {
  id: string;
  teamSlug: string;
  name: string;
  description: string;
  heroImageUrl: string;
  galleryImageUrls: string[];
  category: ProductCategory;
  variants: ProductVariant[];
  tags: string[];
  isFeatured?: boolean;
}

export type FulfillmentStatus =
  | "order_placed"
  | "routed_to_partner"
  | "in_production"
  | "shipped"
  | "payout_pending"
  | "payout_sent";

export interface FulfillmentEvent {
  id: string;
  status: FulfillmentStatus;
  label: string;
  description: string;
  timestamp: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPriceCents: number;
}

export interface Order {
  id: string;
  teamSlug: string;
  orderNumber: string;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  customerName: string;
  customerEmail: string;
  shippingAddressSummary: string;
  status: FulfillmentStatus;
  placedAt: string;
  timeline: FulfillmentEvent[];
}

export interface PayoutSummary {
  teamSlug: string;
  totalPayoutsCents: number;
  pendingPayoutsCents: number;
  lastPayoutAt?: string;
  nextPayoutEstimate?: string;
}
