import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ShoppingBag,
  RefreshCw,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import {
  payroxaApi,
  type PayroxaProduct,
  type MarketplaceQueryParams,
} from "@/services/payroxa-api";
import ProductCard from "./ProductCard";

export type GridViewMode = "grid" | "dense" | "showcase" | "list";
export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

export interface MarketplaceGridProps {
  category?: string;
  searchQuery?: string;
  featuredOnly?: boolean;
  limit?: number;
  className?: string;
  initialViewMode?: GridViewMode;
  showToolbar?: boolean;
  onResetFilters?: () => void;
}

export function MarketplaceGrid({
  category,
  searchQuery,
  featuredOnly,
  limit,
  className = "",
  initialViewMode = "grid",
  showToolbar = true,
  onResetFilters,
}: MarketplaceGridProps) {
  const [products, setProducts] = useState<PayroxaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<GridViewMode>(initialViewMode);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: MarketplaceQueryParams = {};
      if (category) params.category = category;
      if (searchQuery) params.search = searchQuery;
      if (featuredOnly) params.featured = true;
      if (limit) params.limit = limit;

      const response = await payroxaApi.getProducts(params);

      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(response.error?.message || "Unable to load products from Payroxa Marketplace.");
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || "Failed to communicate with Payroxa API service.");
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, featuredOnly, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [products, sortBy]);

  const getContainerLayoutClass = () => {
    switch (viewMode) {
      case "dense":
        return "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
      case "showcase":
        return "grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
      case "list":
        return "flex flex-col gap-4";
      case "grid":
      default:
        return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Grid Control Toolbar */}
      {showToolbar && !loading && !error && products.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-3 shadow-soft backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground px-2">
            <span>
              Showing <strong className="text-foreground font-bold">{sortedProducts.length}</strong>{" "}
              {sortedProducts.length === 1 ? "Product" : "Products"}
            </span>
            {category && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary text-[11px] font-bold">
                {category}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-3.5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft cursor-pointer"
              >
                <option value="default">Default Sort</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            {/* Grid View Mode Switchers */}
            <div className="flex items-center rounded-xl border border-border bg-muted/50 p-1 gap-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                title="Comfort Grid View (4 Columns)"
                className={`rounded-lg p-1.5 transition-all ${
                  viewMode === "grid"
                    ? "bg-background text-foreground shadow-soft font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("dense")}
                title="Dense Catalog Grid (6 Columns)"
                className={`rounded-lg p-1.5 transition-all ${
                  viewMode === "dense"
                    ? "bg-background text-foreground shadow-soft font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                title="Showcase Cards View (2-3 Columns)"
                className={`rounded-lg p-1.5 transition-all ${
                  viewMode === "showcase"
                    ? "bg-background text-foreground shadow-soft font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid2X2 className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                title="List Rows View"
                className={`rounded-lg p-1.5 transition-all ${
                  viewMode === "list"
                    ? "bg-background text-foreground shadow-soft font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid Content */}
      {loading ? (
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}>
          {Array.from({ length: limit || 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] rounded-2xl bg-muted/60 animate-pulse border border-border/40"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center my-6">
          <p className="text-sm font-semibold text-destructive">{error}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please check your connection or retry fetching products.
          </p>
          <button
            onClick={fetchProducts}
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all cursor-pointer"
          >
            <RefreshCw className="size-3.5" /> Retry Fetching
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border border-border bg-card p-12 text-center my-6 shadow-soft">
          <ShoppingBag className="mx-auto size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-bold text-foreground">No marketplace products found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            There are no products matching your current criteria.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              type="button"
              className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className={`${getContainerLayoutClass()} ${className}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketplaceGrid;
