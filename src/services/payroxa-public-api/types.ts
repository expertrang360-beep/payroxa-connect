export interface PayroxaImage {
  url: string;
  alt?: string;
}

export interface PayroxaCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  productCount?: number;
}

export interface PayroxaVendor {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  category?: string;
  location?: string;
  verified: boolean;
  productCount?: number;
  appUrl?: string;
}

export interface PayroxaStore {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  location?: string;
  verified: boolean;
  categories?: PayroxaCategory[];
  publishedProductCount?: number;
  products?: PayroxaProduct[];
  appUrl?: string;
}

export interface PayroxaProduct {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  images: PayroxaImage[];
  category: PayroxaCategory;
  vendor: PayroxaVendor;
  availability: "in_stock" | "out_of_stock" | "pre_order";
  isFeatured: boolean;
  updatedAt: string;
  appUrl: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMeta;
  error?: {
    code: string;
    message: string;
  };
}

export interface MarketplaceQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  vendor?: string;
  store?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: string;
  featured?: boolean;
  sort?: string;
  search?: string;
  q?: string;
}

export interface FeaturedPayload {
  featuredProducts: PayroxaProduct[];
  featuredVendors: PayroxaVendor[];
  featuredStores: PayroxaStore[];
  categories: PayroxaCategory[];
}
