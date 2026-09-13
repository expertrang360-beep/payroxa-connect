import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ShoppingBag,
  RefreshCw,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  payroxaApi,
  type PayroxaProduct,
  type MarketplaceQueryParams,
} from "@/services/payroxa-api";
import ProductCard from "../ProductCard";

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
  limit = 24,
  className = "",
  initialViewMode = "dense",
  showToolbar = true,
  onResetFilters,
}: MarketplaceGridProps) {
  const [products, setProducts] = useState<PayroxaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<GridViewMode>(initialViewMode);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filter States
  const [currencyFilter, setCurrencyFilter] = useState<string>("ALL");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: MarketplaceQueryParams = {
        page,
        limit,
      };

      if (category) params.category = category;
      if (searchQuery) params.search = searchQuery;
      if (featuredOnly) params.featured = true;

      // Pass currency and pricing if filtered
      if (currencyFilter !== "ALL") params.availability = currencyFilter; // or map accordingly if api supports currency
      if (minPriceInput) params.minPrice = parseFloat(minPriceInput);
      if (maxPriceInput) params.maxPrice = parseFloat(maxPriceInput);

      const response = await payroxaApi.getProducts(params);

      if (response.success && response.data) {
        setProducts(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages || 1);
          setTotalProducts(response.pagination.total || response.data.length);
        } else {
          setTotalPages(1);
          setTotalProducts(response.data.length);
        }
      } else {
        setError(response.error?.message || "Unable to load products from Payroxa Marketplace.");
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || "Failed to communicate with Payroxa API service.");
    } finally {
      setLoading(false);
    }
  }, [
    category,
    searchQuery,
    featuredOnly,
    limit,
    page,
    currencyFilter,
    minPriceInput,
    maxPriceInput,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Client-Side extra filtration and sorting
  const processedProducts = useMemo(() => {
    let list = [...products];

    // Currency filtration
    if (currencyFilter !== "ALL") {
      list = list.filter((p) => p.currency?.toUpperCase() === currencyFilter.toUpperCase());
    }

    // Verified Merchant filter
    if (onlyVerified) {
      list = list.filter((p) => p.vendor?.verified);
    }

    // Client-side Price range filters as safety fallback
    if (minPriceInput) {
      const min = parseFloat(minPriceInput);
      if (!isNaN(min)) {
        list = list.filter((p) => p.price >= min);
      }
    }
    if (maxPriceInput) {
      const max = parseFloat(maxPriceInput);
      if (!isNaN(max)) {
        list = list.filter((p) => p.price <= max);
      }
    }

    // Sort mapping
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
  }, [products, currencyFilter, onlyVerified, minPriceInput, maxPriceInput, sortBy]);

  const handleReset = () => {
    setCurrencyFilter("ALL");
    setMinPriceInput("");
    setMaxPriceInput("");
    setOnlyVerified(false);
    setSortBy("default");
    setPage(1);
    if (onResetFilters) onResetFilters();
  };

  const getContainerLayoutClass = () => {
    switch (viewMode) {
      case "dense":
        return "grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
      case "showcase":
        return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
      case "list":
        return "flex flex-col gap-3";
      case "grid":
      default:
        return "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Grid Control Toolbar */}
      {showToolbar && (
        <div className="flex flex-col gap-3 rounded-3xl border border-border/40 bg-white p-4 shadow-soft">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground px-1">
              <TrendingUp className="size-4 text-primary" />
              <span>
                Showing{" "}
                <strong className="text-foreground font-black">{processedProducts.length}</strong>{" "}
                {processedProducts.length === 1 ? "Drop" : "Drops"} match
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2.5 flex-wrap">
              {/* Filter Drawer Toggle */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
                  isFilterOpen ||
                  currencyFilter !== "ALL" ||
                  minPriceInput ||
                  maxPriceInput ||
                  onlyVerified ||
                  sortBy !== "default"
                    ? "bg-primary/10 border-primary text-primary shadow-soft"
                    : "bg-white border-border/60 hover:bg-muted/10 text-muted-foreground"
                }`}
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Filters</span>
                {(currencyFilter !== "ALL" ||
                  minPriceInput ||
                  maxPriceInput ||
                  onlyVerified ||
                  sortBy !== "default") && <span className="bg-primary size-1.5 rounded-full" />}
              </button>

              {/* Grid View Mode Switchers */}
              <div className="flex items-center rounded-xl border border-border/60 bg-muted/30 p-0.5 gap-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title="Comfort Grid"
                  className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-primary shadow-soft font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("dense")}
                  title="High-Density Grid"
                  className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                    viewMode === "dense"
                      ? "bg-white text-primary shadow-soft font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid3X3 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("showcase")}
                  title="Double Showcase"
                  className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                    viewMode === "showcase"
                      ? "bg-white text-primary shadow-soft font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid2X2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  title="List Rows"
                  className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-primary shadow-soft font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filter Box */}
          {isFilterOpen && (
            <div className="border-t border-border/30 pt-3 mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
              {/* Sort mapping */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide block">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="default">Default Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>

              {/* Currency */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide block">
                  Currency Mode
                </label>
                <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
                  {["ALL", "NGN", "GHS", "KES", "USD"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrencyFilter(curr)}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                        currencyFilter === curr
                          ? "bg-primary text-white border-primary"
                          : "bg-[#F5F5F7] text-muted-foreground border-border/30 hover:bg-muted"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Limits */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide block">
                  Price Boundaries
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    placeholder="Min"
                    className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    placeholder="Max"
                    className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-2.5 py-1.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Verified Merchant */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="flex items-center justify-between bg-[#F5F5F7] border border-border/40 rounded-xl p-2">
                  <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                    <ShieldCheck className="size-4 text-emerald-600" /> Verified Only
                  </span>
                  <button
                    onClick={() => setOnlyVerified(!onlyVerified)}
                    className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      onlyVerified ? "bg-emerald-600" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        onlyVerified ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Grid Content */}
      {loading ? (
        <div className={`${getContainerLayoutClass()} ${className}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] rounded-2xl bg-white animate-pulse border border-border/40 flex flex-col justify-between p-3"
            >
              <div className="w-full aspect-square bg-muted/60 rounded-xl" />
              <div className="space-y-1.5 mt-2">
                <div className="h-3.5 bg-muted/60 rounded w-2/3" />
                <div className="h-3 bg-muted/40 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center my-4">
          <p className="text-xs font-black text-destructive">{error}</p>
          <button
            onClick={fetchProducts}
            type="button"
            className="mt-3 inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-[10px] font-black text-white hover:bg-primary/90 transition-all cursor-pointer uppercase tracking-wider"
          >
            <RefreshCw className="size-3.5" /> Retry Sync
          </button>
        </div>
      ) : processedProducts.length === 0 ? (
        <div className="rounded-3xl border border-border/40 bg-white p-12 text-center my-4 shadow-soft">
          <ShoppingBag className="mx-auto size-10 text-muted-foreground/40 mb-3" />
          <h3 className="text-sm font-black text-foreground uppercase">No Products Found</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            No secure catalog drops match the active criteria.
          </p>
          <button
            onClick={handleReset}
            type="button"
            className="mt-4 rounded-xl bg-primary px-4 py-2 text-[10px] font-black text-white shadow-soft hover:bg-primary/90 transition-all cursor-pointer uppercase tracking-wider"
          >
            Clear All Criteria
          </button>
        </div>
      ) : (
        <div className={`${getContainerLayoutClass()} ${className}`}>
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Pagination Row */}
      {totalPages > 1 && !loading && !error && processedProducts.length > 0 && (
        <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-black text-foreground hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="size-3.5" /> Prev
          </button>
          <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-black text-foreground hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Next <ChevronRight className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default MarketplaceGrid;
