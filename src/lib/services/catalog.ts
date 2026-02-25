import type { Product } from "@/src/lib/types";
import { mockProducts } from "@/src/lib/mock-data/products";

export interface CatalogService {
  listProductsForTeam(teamSlug: string): Promise<Product[]>;
  listFeaturedProductsForTeam(teamSlug: string): Promise<Product[]>;
  getProductById(productId: string): Promise<Product | null>;
}

class MockCatalogService implements CatalogService {
  async listProductsForTeam(teamSlug: string): Promise<Product[]> {
    return mockProducts.filter((p) => p.teamSlug === teamSlug);
  }

  async listFeaturedProductsForTeam(teamSlug: string): Promise<Product[]> {
    return mockProducts.filter(
      (p) => p.teamSlug === teamSlug && p.isFeatured
    );
  }

  async getProductById(productId: string): Promise<Product | null> {
    return mockProducts.find((p) => p.id === productId) ?? null;
  }
}

export const catalogService: CatalogService = new MockCatalogService();

