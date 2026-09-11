import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ShoppingBag,
  Store,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Tag,
  Sparkles,
  MapPin,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { getProducts, getCategories, getFeatured } from "@/services/payroxa-public-api/client";
import {
  PayroxaProduct,
  PayroxaCategory,
  PayroxaVendor,
  PayroxaStore,
} from "@/services/payroxa-public-api/types";
import { PayroxaButton } from "@/components/PayroxaButton";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";

export const Route = createFileRoute("/marketplace")({
  component: MarketplacePage,
});

function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<PayroxaProduct[]>([]);
  const [categories, setCategories] = useState<PayroxaCategory[]>([]);
  const [featured, setFeatured] = useState<{
    featuredProducts: PayroxaProduct[];
    featuredVendors: PayroxaVendor[];
    featuredStores: PayroxaStore[];
  }>({ featuredProducts: [], featuredVendors: [], featuredStores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (cat?: string, q?: string) => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes, featRes] = await Promise.all([
        getProducts({ category: cat, search: q }),
        getCategories(),
        getFeatured(),
      ]);

      if (prodRes.success) {
        setProducts(prodRes.data || []);
      } else {
        setError(prodRes.error?.message || "Failed to load products");
      }

      if (catRes.success) {
        setCategories(catRes.data || []);
      }

      if (featRes.success && featRes.data) {
        setFeatured({
          featuredProducts: featRes.data.featuredProducts || [],
          featuredVendors: featRes.data.featuredVendors || [],
          featuredStores: featRes.data.featuredStores || [],
        });
      }
    } catch (err: any) {
      setError(err?.message || "Marketplace temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedCategory, searchQuery);
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData(selectedCategory, searchQuery);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <Sparkles className="size-3.5" /> Powered by Payroxa Authoritative Source of Truth
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mx-auto font-display">
            Discover African Commerce & Verified Vendors
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse authentic products, verified storefronts, and elite merchants. Buy securely or
            open your digital business in Payroxa.
          </p>

          {/* Search & Filter Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, stores..."
                className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm font-medium text-foreground shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              Search
            </button>
          </form>

          {/* Quick Categories */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="mx-auto max-w-7xl px-5 py-12">
        {error && (
          <div className="mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-sm font-semibold text-destructive">{error}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Please check your network or try again shortly.
            </p>
            <button
              onClick={() => loadData(selectedCategory, searchQuery)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              <RefreshCw className="size-3.5" /> Retry Connection
            </button>
          </div>
        )}

        {/* Featured Section */}
        {!selectedCategory && !searchQuery && featured.featuredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight font-display">
                  Featured Marketplace Items
                </h2>
                <p className="text-sm text-muted-foreground">
                  Curated picks from verified merchants on Payroxa
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <ShieldCheck className="size-4" /> Verified Authentic
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.featuredProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                    <img
                      src={
                        product.images[0]?.url ||
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                      }
                      alt={product.images[0]?.alt || product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft">
                      {product.currency} {product.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{product.category.name}</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-medium">
                          <CheckCircle2 className="size-3.5" /> {product.vendor.name}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60">
                      <Link
                        to="/marketplace/product/$slug"
                        params={{ slug: product.slug }}
                        className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                      >
                        View Details <ArrowRight className="size-3.5" />
                      </Link>
                      <a
                        href={product.appUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-1"
                      >
                        Buy on Payroxa <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Catalog Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight font-display">
              {selectedCategory ? `Category: ${selectedCategory}` : "All Marketplace Products"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Showing real-time records directly from Payroxa database
            </p>
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            {loading ? "Fetching records..." : `${products.length} products found`}
          </div>
        </div>

        {/* Products Grid */}
        <MarketplaceGrid
          category={selectedCategory}
          searchQuery={searchQuery}
          onResetFilters={() => {
            setSelectedCategory("");
            setSearchQuery("");
          }}
        />

        {/* Verified Merchants & Stores Showcase */}
        {!selectedCategory && !searchQuery && featured.featuredVendors.length > 0 && (
          <div className="mt-24 border-t border-border pt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-bold tracking-tight font-display">
                Featured Merchants & Stores
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Verified businesses running their operations securely on Payroxa
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.featuredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="size-14 rounded-2xl object-cover border border-border"
                      />
                      <div>
                        <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
                          {vendor.name} <ShieldCheck className="size-4 text-primary" />
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="size-3" /> {vendor.location || "Lagos, Nigeria"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-6">
                      {vendor.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {vendor.productCount || 10}+ Active Products
                    </span>
                    <a
                      href={vendor.appUrl || "https://app.payroxa.com.ng"}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted flex items-center gap-1.5"
                    >
                      Shop on Payroxa <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
