import {
  PayroxaProduct,
  PayroxaVendor,
  PayroxaStore,
  PayroxaCategory,
  PayroxaImage,
  MarketplaceQueryParams,
  FeaturedPayload,
  ApiResponse,
  PaginationMeta,
} from "./payroxa-public-api/types";
import {
  getApiBaseUrl,
  getProducts,
  getProduct,
  getVendors,
  getVendor,
  getStore,
  getCategories,
  getFeatured,
  searchMarketplace,
  fetchFromPayroxaApi,
} from "./payroxa-public-api/client";

// Re-export all core types
export type {
  PayroxaProduct,
  PayroxaVendor,
  PayroxaStore,
  PayroxaCategory,
  PayroxaImage,
  MarketplaceQueryParams,
  FeaturedPayload,
  ApiResponse,
  PaginationMeta,
};

// Re-export API utilities and endpoints
export {
  getApiBaseUrl,
  getProducts,
  getProduct,
  getVendors,
  getVendor,
  getStore,
  getCategories,
  getFeatured,
  searchMarketplace,
  fetchFromPayroxaApi,
};

/**
 * PayroxaApiClient
 * A typed OOP wrapper for the Payroxa Marketplace API
 */
export class PayroxaApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public async getProducts(
    params?: MarketplaceQueryParams,
  ): Promise<ApiResponse<PayroxaProduct[]>> {
    return getProducts(params);
  }

  public async getProductBySlugOrId(idOrSlug: string): Promise<ApiResponse<PayroxaProduct>> {
    return getProduct(idOrSlug);
  }

  public async getVendors(): Promise<ApiResponse<PayroxaVendor[]>> {
    return getVendors();
  }

  public async getVendorByIdOrSlug(id: string): Promise<ApiResponse<PayroxaVendor>> {
    return getVendor(id);
  }

  public async getStoreBySlug(slug: string): Promise<ApiResponse<PayroxaStore>> {
    return getStore(slug);
  }

  public async getCategories(): Promise<ApiResponse<PayroxaCategory[]>> {
    return getCategories();
  }

  public async getFeatured(): Promise<ApiResponse<FeaturedPayload>> {
    return getFeatured();
  }

  public async search(query: string): Promise<ApiResponse<PayroxaProduct[]>> {
    return searchMarketplace(query);
  }
}

export const payroxaApi = new PayroxaApiClient();
export default payroxaApi;
