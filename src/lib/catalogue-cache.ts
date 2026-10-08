import type { PayroxaProduct } from "@/services/payroxa-public-api/types";

// A temporary browser snapshot, not a source of live price or stock information.
const MAX_CACHE_AGE = 24 * 60 * 60 * 1000;
const cacheKey = (source: string) => `payroxa:catalogue:v1:${source}`;

export function isProductList(value: unknown): value is PayroxaProduct[] {
  return Array.isArray(value) && value.every((product) =>
    product && typeof product.id === "string" && typeof product.slug === "string" &&
    typeof product.name === "string" && typeof product.price === "number" &&
    Number.isFinite(product.price) && typeof product.currency === "string" &&
    Array.isArray(product.images),
  );
}

export function readCatalogueCache(source: string): { products: PayroxaProduct[]; savedAt: number } | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(source));
    if (!raw) return null;
    const snapshot = JSON.parse(raw);
    const age = Date.now() - snapshot.savedAt;
    if (typeof snapshot.savedAt !== "number" || age < 0 || age > MAX_CACHE_AGE || !isProductList(snapshot.products)) {
      sessionStorage.removeItem(cacheKey(source));
      return null;
    }
    return snapshot;
  } catch {
    return null;
  }
}

export function saveCatalogueCache(source: string, products: PayroxaProduct[], savedAt: number) {
  try {
    sessionStorage.setItem(cacheKey(source), JSON.stringify({ products, savedAt }));
  } catch {
    // Browsing still works when storage is unavailable or full.
  }
}