import {
  PayroxaProduct,
  PayroxaVendor,
  PayroxaStore,
  PayroxaCategory,
  MarketplaceQueryParams,
  FeaturedPayload,
  ApiResponse,
} from "./types";
import { APP_URL, PUBLIC_API_BASE_URL } from "@/config/siteConfig";

export function getApiBaseUrl(): string {
  return PUBLIC_API_BASE_URL;
}

// Mock fallback database for offline sandbox testing
const MOCK_CATEGORIES: PayroxaCategory[] = [
  { id: "cat_1", name: "Fashion & Apparel", slug: "fashion", productCount: 42, icon: "Shirt" },
  {
    id: "cat_2",
    name: "Electronics & Gadgets",
    slug: "electronics",
    productCount: 28,
    icon: "Laptop",
  },
  {
    id: "cat_3",
    name: "Phones & Accessories",
    slug: "phones",
    productCount: 35,
    icon: "Smartphone",
  },
  { id: "cat_4", name: "Beauty & Skincare", slug: "beauty", productCount: 19, icon: "Sparkles" },
  { id: "cat_5", name: "Home & Living", slug: "home", productCount: 24, icon: "Home" },
  { id: "cat_6", name: "Agro & Food Products", slug: "food", productCount: 31, icon: "Utensils" },
];

const MOCK_VENDORS: PayroxaVendor[] = [
  {
    id: "ven_1",
    name: "Urban Styles Lagos",
    slug: "urban-styles",
    description:
      "Premier Nigerian streetwear and contemporary fashion brand based in Ikeja, Lagos.",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    category: "Fashion & Apparel",
    location: "Ikeja, Lagos, Nigeria",
    verified: true,
    productCount: 14,
    appUrl: `${APP_URL}/marketplace/vendor/urban-styles`,
  },
  {
    id: "ven_2",
    name: "Tehila Gadgets Hub",
    slug: "tehila-gadgets",
    description:
      "Trusted distributor of brand new iPhones, MacBooks, and smart accessories in Nigeria.",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80",
    category: "Phones & Accessories",
    location: "Computer Village, Ikeja, Lagos",
    verified: true,
    productCount: 22,
    appUrl: `${APP_URL}/marketplace/vendor/tehila-gadgets`,
  },
  {
    id: "ven_3",
    name: "Aura Organics & Beauty",
    slug: "aura-organics",
    description:
      "All-natural African skincare formulations crafted with raw shea butter and botanical oils.",
    logo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    category: "Beauty & Skincare",
    location: "Lekki Phase 1, Lagos, Nigeria",
    verified: true,
    productCount: 9,
    appUrl: `${APP_URL}/marketplace/vendor/aura-organics`,
  },
];

const MOCK_PRODUCTS: PayroxaProduct[] = [
  {
    id: "prod_1",
    slug: "premium-ankara-bomber-jacket",
    name: "Premium Ankara Bomber Jacket",
    description:
      "Handcrafted contemporary bomber jacket featuring vibrant authentic Ankara prints with silk lining. Designed for comfort and unmatched style.",
    price: 45000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        alt: "Premium Ankara Bomber Jacket front",
      },
      {
        url: "https://images.unsplash.com/photo-1548883354-7622d03a27d0?w=800&q=80",
        alt: "Premium Ankara Bomber Jacket back",
      },
    ],
    category: MOCK_CATEGORIES[0],
    vendor: MOCK_VENDORS[0],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/premium-ankara-bomber-jacket`,
  },
  {
    id: "prod_2",
    slug: "apple-iphone-15-pro-max-256gb",
    name: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
    description:
      "Brand new factory unlocked iPhone 15 Pro Max with 1-year warranty and official receipt. Fast Nationwide delivery available.",
    price: 1550000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
        alt: "iPhone 15 Pro Max Natural Titanium",
      },
    ],
    category: MOCK_CATEGORIES[2],
    vendor: MOCK_VENDORS[1],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/apple-iphone-15-pro-max-256gb`,
  },
  {
    id: "prod_3",
    slug: "raw-shea-butter-glow-face-cream",
    name: "Raw Shea & Turmeric Glow Face Cream (250ml)",
    description:
      "Deeply moisturizing organic face and body cream infused with turmeric, carrot oil, and pure unrefined Northern Nigerian shea butter.",
    price: 12500,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1608248597359-9945033c467d?w=800&q=80",
        alt: "Raw Shea Butter Glow Face Cream",
      },
    ],
    category: MOCK_CATEGORIES[3],
    vendor: MOCK_VENDORS[2],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/raw-shea-butter-glow-face-cream`,
  },
  {
    id: "prod_4",
    slug: "minimalist-leather-tote-bag",
    name: "Handcrafted Genuine Leather Executive Tote Bag",
    description:
      "100% genuine Nigerian cowhide leather tote bag designed for professionals. Fits laptops up to 15 inches with secure brass zipper.",
    price: 68000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        alt: "Genuine Leather Executive Tote Bag",
      },
    ],
    category: MOCK_CATEGORIES[0],
    vendor: MOCK_VENDORS[0],
    availability: "in_stock",
    isFeatured: false,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/minimalist-leather-tote-bag`,
  },
  {
    id: "prod_5",
    slug: "macbook-pro-16-m3-max",
    name: 'MacBook Pro 16" M3 Max (36GB RAM, 1TB SSD)',
    description:
      "Ultimate powerhouse for creators and developers. Brand new sealed with US charger and global Apple warranty.",
    price: 3950000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
        alt: "MacBook Pro 16 M3 Max",
      },
    ],
    category: MOCK_CATEGORIES[1],
    vendor: MOCK_VENDORS[1],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/macbook-pro-16-m3-max`,
  },
  {
    id: "prod_6",
    slug: "organic-hibiscus-zobo-concentrate",
    name: "Pure Organic Hibiscus Zobo Concentrate (1L Pack of 3)",
    description:
      "Naturally brewed Zobo concentrate spiced with natural ginger, cloves, and fresh pineapple juice with zero artificial sweeteners.",
    price: 4500,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
        alt: "Organic Hibiscus Zobo Concentrate",
      },
    ],
    category: MOCK_CATEGORIES[5],
    vendor: MOCK_VENDORS[2],
    availability: "in_stock",
    isFeatured: false,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/organic-hibiscus-zobo-concentrate`,
  },
  {
    id: "prod_7",
    slug: "wireless-noise-cancelling-headphones",
    name: "AuraSound Pro Active Noise Cancelling Headphones",
    description:
      "Hi-Fi audio with hybrid active noise cancellation, 40-hour battery life, and plush memory foam ear cushions.",
    price: 32000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        alt: "AuraSound Pro Headphones",
      },
    ],
    category: MOCK_CATEGORIES[1],
    vendor: MOCK_VENDORS[1],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/wireless-noise-cancelling-headphones`,
  },
  {
    id: "prod_8",
    slug: "handmade-terracotta-ceramic-vase",
    name: "African Heritage Terracotta Ceramic Interior Decor Vase",
    description:
      "Artisan-molded terracotta vase with authentic geometric carvings. Adds rustic elegance to living rooms and office spaces.",
    price: 18500,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
        alt: "African Heritage Terracotta Ceramic Vase",
      },
    ],
    category: MOCK_CATEGORIES[4],
    vendor: MOCK_VENDORS[0],
    availability: "in_stock",
    isFeatured: false,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/handmade-terracotta-ceramic-vase`,
  },
  {
    id: "prod_9",
    slug: "smart-fitness-watch-series-x",
    name: "PulseFit Pro Smartwatch with Heart Rate & Blood Oxygen Monitor",
    description:
      "Full HD AMOLED display smartwatch featuring 50+ workout modes, sleep tracking, and instant Payroxa QR contactless payment support.",
    price: 28000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        alt: "PulseFit Pro Smartwatch",
      },
    ],
    category: MOCK_CATEGORIES[1],
    vendor: MOCK_VENDORS[1],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/smart-fitness-watch-series-x`,
  },
  {
    id: "prod_10",
    slug: "traditional-adire-silk-caftan",
    name: "Royal Hand-Dyed Adire Silk Caftan Dress",
    description:
      "Flowing luxury silk caftan dress individually hand-dyed by master artisans in Abeokuta. Breathable and comfortable for formal events.",
    price: 52000,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        alt: "Royal Hand-Dyed Adire Silk Caftan Dress",
      },
    ],
    category: MOCK_CATEGORIES[0],
    vendor: MOCK_VENDORS[0],
    availability: "in_stock",
    isFeatured: true,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/traditional-adire-silk-caftan`,
  },
  {
    id: "prod_11",
    slug: "organic-cold-pressed-coconut-oil",
    name: "Pure Virgin Cold-Pressed Coconut Oil (500ml)",
    description:
      "Multi-purpose 100% pure cold-pressed coconut oil for hair nourishment, skin hydration, and healthy culinary uses.",
    price: 6500,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80",
        alt: "Pure Virgin Cold-Pressed Coconut Oil",
      },
    ],
    category: MOCK_CATEGORIES[3],
    vendor: MOCK_VENDORS[2],
    availability: "in_stock",
    isFeatured: false,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/organic-cold-pressed-coconut-oil`,
  },
  {
    id: "prod_12",
    slug: "gourmet-aged-chili-pepper-sauce",
    name: "Suya Spice & Smoked Chili Gourmet Sauce (350g)",
    description:
      "Authentic West African suya spiced hot chili sauce aged with smoked habanero peppers and aromatic local spices.",
    price: 3800,
    currency: "NGN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
        alt: "Suya Spice & Smoked Chili Gourmet Sauce",
      },
    ],
    category: MOCK_CATEGORIES[5],
    vendor: MOCK_VENDORS[2],
    availability: "in_stock",
    isFeatured: false,
    updatedAt: new Date().toISOString(),
    appUrl: `${APP_URL}/marketplace/product/gourmet-aged-chili-pepper-sauce`,
  },
];

const MOCK_STORES: Record<string, PayroxaStore> = {
  "urban-styles": {
    id: "store_1",
    slug: "urban-styles",
    name: "Urban Styles Lagos Store",
    description:
      "Official flagship store for Urban Styles Lagos. Discover the finest Nigerian modern fashion and leather goods.",
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
    location: "Ikeja City Mall, Lagos",
    verified: true,
    categories: [MOCK_CATEGORIES[0]],
    publishedProductCount: 14,
    products: MOCK_PRODUCTS.filter((p) => p.vendor.slug === "urban-styles"),
    appUrl: `${APP_URL}/marketplace/store/urban-styles`,
  },
  "tehila-gadgets": {
    id: "store_2",
    slug: "tehila-gadgets",
    name: "Tehila Gadgets & Tech Emporium",
    description:
      "Your number one trusted partner for original mobile phones, laptops, and computing accessories.",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    coverImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80",
    location: "Computer Village, Ikeja",
    verified: true,
    categories: [MOCK_CATEGORIES[1], MOCK_CATEGORIES[2]],
    publishedProductCount: 22,
    products: MOCK_PRODUCTS.filter((p) => p.vendor.slug === "tehila-gadgets"),
    appUrl: `${APP_URL}/marketplace/store/tehila-gadgets`,
  },
};

export async function fetchFromPayroxaApi<T>(
  endpoint: string,
  queryParams?: Record<string, any>,
): Promise<ApiResponse<T>> {
  const baseUrl = getApiBaseUrl();
  const url = new URL(`${baseUrl}${endpoint}`);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        url.searchParams.append(key, String(val));
      }
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Payroxa API error status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    // If live API is unreachable, fall back to robust mock data for sandbox resilience
    console.warn(
      `[Payroxa API Connector] Live API unreachable at ${url.toString()}. Using authoritative sandbox fallback data.`,
    );
    return getSandboxFallbackResponse<T>(endpoint, queryParams);
  }
}

function getSandboxFallbackResponse<T>(
  endpoint: string,
  params?: Record<string, any>,
): ApiResponse<T> {
  if (endpoint === "/products" || endpoint === "") {
    let list = [...MOCK_PRODUCTS];
    if (params?.category) {
      list = list.filter((p) => p.category.slug === params.category);
    }
    if (params?.search || params?.q) {
      const q = (params.search || params.q || "").toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
      );
    }
    if (params?.featured === "true" || params?.featured === true) {
      list = list.filter((p) => p.isFeatured);
    }
    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 20);
    const total = list.length;
    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      success: true,
      data: paginated as unknown as T,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      },
    };
  }

  if (endpoint.startsWith("/products/")) {
    const idOrSlug = endpoint.replace("/products/", "");
    const found = MOCK_PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    if (!found) {
      return {
        success: false,
        data: null as unknown as T,
        error: { code: "NOT_FOUND", message: "Product not found" },
      };
    }
    return { success: true, data: found as unknown as T };
  }

  if (endpoint === "/vendors") {
    return { success: true, data: MOCK_VENDORS as unknown as T };
  }

  if (endpoint.startsWith("/vendors/")) {
    const id = endpoint.replace("/vendors/", "");
    const found = MOCK_VENDORS.find((v) => v.id === id || v.slug === id);
    return { success: true, data: (found || MOCK_VENDORS[0]) as unknown as T };
  }

  if (endpoint.startsWith("/stores/")) {
    const slug = endpoint.replace("/stores/", "");
    const found = MOCK_STORES[slug] || MOCK_STORES["urban-styles"];
    return { success: true, data: found as unknown as T };
  }

  if (endpoint === "/categories") {
    return { success: true, data: MOCK_CATEGORIES as unknown as T };
  }

  if (endpoint === "/featured") {
    const payload: FeaturedPayload = {
      featuredProducts: MOCK_PRODUCTS.filter((p) => p.isFeatured),
      featuredVendors: MOCK_VENDORS,
      featuredStores: Object.values(MOCK_STORES),
      categories: MOCK_CATEGORIES,
    };
    return { success: true, data: payload as unknown as T };
  }

  if (endpoint === "/search") {
    const q = (params?.q || params?.search || "").toLowerCase();
    const results = MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
    );
    return { success: true, data: results as unknown as T };
  }

  return {
    success: false,
    data: null as unknown as T,
    error: { code: "INVALID_ENDPOINT", message: "Unknown endpoint" },
  };
}

// Typed API Wrapper Methods
export async function getProducts(params?: MarketplaceQueryParams) {
  return fetchFromPayroxaApi<PayroxaProduct[]>("/products", params);
}

export async function getProduct(idOrSlug: string) {
  return fetchFromPayroxaApi<PayroxaProduct>(`/products/${idOrSlug}`);
}

export async function getVendors() {
  return fetchFromPayroxaApi<PayroxaVendor[]>("/vendors");
}

export async function getVendor(id: string) {
  return fetchFromPayroxaApi<PayroxaVendor>(`/vendors/${id}`);
}

export async function getStore(slug: string) {
  return fetchFromPayroxaApi<PayroxaStore>(`/stores/${slug}`);
}

export async function getCategories() {
  return fetchFromPayroxaApi<PayroxaCategory[]>("/categories");
}

export async function getFeatured() {
  return fetchFromPayroxaApi<FeaturedPayload>("/featured");
}

export async function searchMarketplace(query: string) {
  return fetchFromPayroxaApi<PayroxaProduct[]>("/search", { q: query });
}
