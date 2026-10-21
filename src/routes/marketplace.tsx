import { createFileRoute, Link } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Filter, Grid3X3, LayoutGrid, List, Loader2, Minus, Plus, RefreshCw, RotateCw, Search, ShieldCheck, ShoppingBag, Sparkles, Trash2, Truck, X } from "lucide-react";
import { EditorialProductCard } from "@/components/marketplace/EditorialProductCard";
import { PayroxaButton } from "@/components/PayroxaButton";
import { FLASH_PROMO_SLIDES, TEMU_CIRCLE_CATEGORIES } from "@/data/marketplace.data";
import { useCart } from "@/hooks/useCart";
import { getApiBaseUrl, getCategories, getFeatured, getProducts, getVendors } from "@/services/payroxa-public-api/client";
import { isProductList, readCatalogueCache, saveCatalogueCache } from "@/lib/catalogue-cache";
import { MarketplaceCart } from "@/components/marketplace/MarketplaceCart";
import { WEBSITE_URL, PAYROXA_LINKS } from "@/config/siteConfig";
import type { PayroxaCategory, PayroxaProduct, PayroxaStore, PayroxaVendor } from "@/services/payroxa-public-api/types";

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export const Route = createFileRoute("/marketplace")({
  validateSearch: zodValidator(z.object({
    q: fallback(z.string(), "").default(""),
  })),
  head: () => ({
    meta: [
      { title: "Payroxa Marketplace | Shop Verified African Stores" },
      { name: "description", content: "Discover curated technology, fashion, beauty and home essentials from verified African stores with Payroxa-protected checkout." },
      { property: "og:title", content: "Payroxa Marketplace | Shop Verified African Stores" },
      { property: "og:description", content: "Curated products, verified stores and protected checkout in one modern African marketplace." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${WEBSITE_URL}/marketplace` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${WEBSITE_URL}/marketplace` }],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const {
    items: cartItems,
    addToCart,
    totalCount,
  } = useCart();

  const { q } = Route.useSearch();

  // 1. Core Filter & Catalog States
  const [searchQuery, setSearchQuery] = useState(q);
  useEffect(() => { setSearchQuery(q); }, [q]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "dense" | "list">("dense");
  const [activeFilterTab, setActiveFilterTab] = useState<"all" | "deals" | "stars" | "best">("all");

  // Cart Drawer and Checkout Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Shop assistant states
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState<string | null>(null);
  const [assistantSummary, setAssistantSummary] = useState("");
  const [assistantPicks, setAssistantPicks] = useState<{ product: PayroxaProduct; reason: string }[]>([]);

  // 2. API Retrieval States
  const [allProducts, setAllProducts] = useState<PayroxaProduct[]>([]);
  const [categories, setCategories] = useState<PayroxaCategory[]>([]);
  const [stores, setStores] = useState<PayroxaVendor[]>([]);
  const [featured, setFeatured] = useState<{
    featuredProducts: PayroxaProduct[];
    featuredVendors: PayroxaVendor[];
    featuredStores: PayroxaStore[];
  }>({ featuredProducts: [], featuredVendors: [], featuredStores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [catalogueSavedAt, setCatalogueSavedAt] = useState<number | null>(null);
  const catalogueRequestPending = useRef(false);

  // 3. Gamification States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 24, seconds: 43 });

  // Custom interactive & iframe compliant states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const loadData = async () => {
    if (catalogueRequestPending.current) return;
    catalogueRequestPending.current = true;
    setLoading(true);
    try {
      const [productsResult, categoriesResult, featuredResult, vendorsResult] = await Promise.allSettled([
        getProducts({}),
        getCategories(),
        getFeatured(),
        getVendors(),
      ]);
      if (categoriesResult.status === "fulfilled" && categoriesResult.value.success) {
        setCategories(toArray(categoriesResult.value.data));
      }
      if (vendorsResult.status === "fulfilled" && vendorsResult.value.success) {
        setStores(toArray(vendorsResult.value.data));
      }
      if (featuredResult.status === "fulfilled" && featuredResult.value.success) {
        const data = featuredResult.value.data;
        setFeatured({
          featuredProducts: toArray(data?.featuredProducts),
          featuredVendors: toArray(data?.featuredVendors),
          featuredStores: toArray(data?.featuredStores),
        });
      }
      if (productsResult.status !== "fulfilled" || !productsResult.value.success || !isProductList(productsResult.value.data)) {
        throw new Error("The product service is temporarily unavailable.");
      }
      const products = productsResult.value.data;
      const savedAt = Date.now();
      setAllProducts(products);
      setCatalogueSavedAt(savedAt);
      saveCatalogueCache(getApiBaseUrl(), products, savedAt);
      setError(null);
    } catch (err) {
      setError("We can't refresh the catalogue right now. Please try again shortly.");
    } finally {
      setLoading(false);
      catalogueRequestPending.current = false;
    }
  };

  useEffect(() => {
    const cached = readCatalogueCache(getApiBaseUrl());
    if (cached) {
      setAllProducts(cached.products);
      setCatalogueSavedAt(cached.savedAt);
    }
    loadData();
  }, []);

  // Promo slide auto-advance
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((index) => (index + 1) % Math.max(FLASH_PROMO_SLIDES.length, 1)),
      6000,
    );
    return () => clearInterval(interval);
  }, []);

  // Countdown ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = useMemo(() => {
    let list = toArray<PayroxaProduct>(allProducts);

    if (selectedCategory) {
      list = list.filter(
        (product) =>
          (product as any).categorySlug === selectedCategory ||
          (product as any).category === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      list = list.filter((product) =>
        [
          product.name,
          (product as any).description,
          (product as any).category,
          (product as any).vendorName,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      );
    }

    if (selectedCurrency !== "ALL") {
      list = list.filter((product) => product.currency === selectedCurrency);
    }

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    if (min !== null && !Number.isNaN(min)) list = list.filter((product) => product.price >= min);
    if (max !== null && !Number.isNaN(max)) list = list.filter((product) => product.price <= max);

    if (verifiedOnly) list = list.filter((product) => Boolean((product as any).verified));

    if (activeFilterTab === "deals") {
      list = list.filter((product) => Boolean((product as any).discountPercent || (product as any).compareAtPrice));
    } else if (activeFilterTab === "stars") {
      list = list.filter((product) => Number((product as any).rating ?? 0) >= 4);
    } else if (activeFilterTab === "best") {
      list = list.filter((product) => Number((product as any).soldCount ?? 0) > 0);
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [
    allProducts,
    selectedCategory,
    searchQuery,
    selectedCurrency,
    minPrice,
    maxPrice,
    verifiedOnly,
    activeFilterTab,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCurrency("ALL");
    setMinPrice("");
    setMaxPrice("");
    setVerifiedOnly(false);
    setActiveFilterTab("all");
    setSortBy("default");
  };

  const runAssistant = async (event: React.FormEvent) => {
    event.preventDefault();
    const question = assistantQuery.trim();
    if (!question || assistantLoading) return;
    setAssistantLoading(true);
    setAssistantError(null);
    setAssistantSummary("");
    setAssistantPicks([]);
    try {
      const { recommendProductsFn } = await import("../cms/shopping-assistant.functions");
      const res = await recommendProductsFn({
        data: {
          query: question,
          products: toArray<PayroxaProduct>(allProducts)
            .slice(0, 80)
            .map((product) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              currency: product.currency,
              category: product.category?.name,
              vendor: product.vendor?.name,
            })),
        },
      });
      if (!res.success) {
        setAssistantError(res.error ?? "The assistant could not answer right now.");
        return;
      }
      const byId = new Map(toArray<PayroxaProduct>(allProducts).map((product) => [product.id, product]));
      const picks = toArray<{ id: string; reason: string }>(res.picks)
        .map((pick) => ({ product: byId.get(pick.id), reason: pick.reason }))
        .filter((pick): pick is { product: PayroxaProduct; reason: string } => Boolean(pick.product));
      setAssistantSummary(res.summary ?? "");
      setAssistantPicks(picks);
      if (picks.length === 0) {
        setAssistantError("We couldn't find a good match. Try describing it differently.");
      }
    } catch (err) {
      console.error(err);
      setAssistantError("The assistant could not answer right now.");
    } finally {
      setAssistantLoading(false);
    }
  };

  const addProduct = (product: PayroxaProduct) => {
    const image = product.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85";
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image,
      slug: product.slug,
    });
    setToastMessage(`${product.name} added to your bag`);
  };

  const activePromo = FLASH_PROMO_SLIDES[currentSlide];

  return (
    <div className="theme-marketplace min-h-screen bg-market-paper pb-24 font-market text-market-ink">
      {toastMessage && (
        <div className="fixed left-1/2 top-4 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 border border-market-line bg-market-ink px-4 py-3 text-sm text-market-paper shadow-card">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-market-lilac" />{toastMessage}</span>
            <PayroxaButton variant="text" size="sm" ariaLabel="Dismiss notification" onClick={() => setToastMessage(null)} className="h-7 text-market-paper hover:text-market-paper"><X className="size-4" /></PayroxaButton>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-card shadow-soft">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4">
          <Link to="/marketplace" className="mr-auto shrink-0 font-market-display text-2xl font-bold">Payroxa<span className="text-primary">.</span></Link>
          <div className="relative order-3 w-full min-w-0 sm:order-none sm:mx-auto sm:w-auto sm:flex-1 sm:max-w-2xl">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-market-muted" />
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products, stores and categories" aria-label="Search marketplace" className="h-11 w-full rounded-sm border border-market-line bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary" />
          </div>
          <PayroxaButton variant="text" size="sm" ariaLabel="Open filters" onClick={() => setIsFilterPanelOpen((open) => !open)} className="h-11 w-11 shrink-0 px-0 text-market-ink"><Filter className="size-5" /></PayroxaButton>
          <PayroxaButton variant="text" size="sm" ariaLabel={`Open bag with ${totalCount} items`} onClick={() => setIsCartOpen(true)} className="relative h-11 w-11 shrink-0 px-0 text-market-ink">
            <ShoppingBag className="size-5" />
            {totalCount > 0 && <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">{totalCount}</span>}
          </PayroxaButton>
        </div>
        <nav className="overflow-x-auto border-t border-market-line" aria-label="Marketplace categories">
          <div className="mx-auto flex max-w-[1440px] gap-7 whitespace-nowrap px-4 lg:px-8">
            <PayroxaButton variant="text" size="sm" onClick={() => setSelectedCategory("")} className={`rounded-sm border-b-2 px-0 ${selectedCategory ? "border-transparent text-market-muted" : "border-primary text-primary"}`}>All products</PayroxaButton>
            {categories.map((category) => <PayroxaButton key={category.id} variant="text" size="sm" onClick={() => setSelectedCategory(category.slug)} className={`rounded-sm border-b-2 px-0 ${selectedCategory === category.slug ? "border-primary text-primary" : "border-transparent text-market-muted"}`}>{category.name}</PayroxaButton>)}
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-[1200px] px-2 pt-3 sm:px-4">
          <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
            <nav aria-label="Shop by category" className="hidden rounded-sm bg-card py-2 shadow-soft lg:block">
              <PayroxaButton variant="text" size="sm" onClick={() => setSelectedCategory("")} className={`h-9 w-full justify-start rounded-sm px-4 text-xs font-medium ${selectedCategory ? "text-market-ink" : "text-primary"}`}>All categories</PayroxaButton>
              {(categories.length ? categories : TEMU_CIRCLE_CATEGORIES).slice(0, 11).map((category) => <PayroxaButton key={category.id} variant="text" size="sm" onClick={() => setSelectedCategory(category.slug)} className={`h-9 w-full justify-start rounded-sm px-4 text-xs font-medium hover:text-primary ${selectedCategory === category.slug ? "text-primary" : "text-market-ink"}`}>{category.name}</PayroxaButton>)}
            </nav>
            <div className="relative flex min-h-[200px] overflow-hidden rounded-sm gradient-brand text-primary-foreground sm:min-h-[340px]">
              <div className="relative z-10 flex max-w-[60%] flex-col justify-center gap-3 p-5 sm:p-10">
                <span className="w-fit rounded-sm bg-primary-foreground/15 px-2 py-1 text-[11px] font-bold uppercase">{activePromo?.badge || "Payroxa deals"}</span>
                <h1 className="font-market-display text-2xl font-bold leading-tight sm:text-5xl">Shop smarter. Live better.</h1>
                <p className="hidden text-sm opacity-85 sm:block">Verified African stores. Payment protected until delivery.</p>
                <PayroxaButton variant="secondary" size="sm" onClick={() => document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" })} className="mt-1 w-fit rounded-sm">Shop now <ArrowRight className="size-4" /></PayroxaButton>
              </div>
              <img src={featured.featuredProducts[0]?.images?.[0]?.url || allProducts[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85"} alt="" className="absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-90 [mask-image:linear-gradient(to_right,transparent,black_35%)]" />
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5" aria-label="Promotion slides">{FLASH_PROMO_SLIDES.map((slide, index) => <button key={slide.id} type="button" aria-label={`Show promotion ${index + 1}`} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full bg-primary-foreground transition-all ${index === currentSlide ? "w-6" : "w-2 opacity-50"}`} />)}</div>
            </div>
            <aside className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              <div className="flex items-start gap-3 rounded-sm bg-card p-4 shadow-soft"><ShieldCheck className="size-6 shrink-0 text-primary" /><div><p className="text-sm font-bold">Protected checkout</p><p className="mt-1 text-xs text-market-muted">Paid out only after delivery.</p></div></div>
              <div className="flex items-start gap-3 rounded-sm bg-card p-4 shadow-soft"><Truck className="size-6 shrink-0 text-primary" /><div><p className="text-sm font-bold">Reliable delivery</p><p className="mt-1 text-xs text-market-muted">Track every order.</p></div></div>
              <div className="col-span-2 hidden rounded-sm bg-navy p-4 text-navy-foreground lg:col-span-1 lg:block"><p className="text-sm font-bold">Sell on Payroxa</p><p className="mt-1 text-xs opacity-75">Open a store and reach more buyers.</p></div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-2 pt-3 sm:px-4">
          <div className="rounded-sm bg-card shadow-soft">
            <div className="flex items-center justify-between rounded-t-sm bg-primary px-4 py-2.5 text-primary-foreground"><h2 className="font-market-display text-base font-bold sm:text-lg">Flash Sales</h2><span className="text-xs font-semibold sm:text-sm">Time left: {String(timeLeft?.hours ?? 0).padStart(2,"0")}h : {String(timeLeft?.minutes ?? 0).padStart(2,"0")}m : {String(timeLeft?.seconds ?? 0).padStart(2,"0")}s</span></div>
            <div className="flex gap-2 overflow-x-auto p-2 [scrollbar-width:none]">
              {(featured.featuredProducts.length ? featured.featuredProducts : allProducts).slice(0, 10).map((product, index) => <div key={product.id} className="w-[44%] shrink-0 sm:w-[180px]"><EditorialProductCard product={product} index={index} viewMode="dense" onAdd={addProduct} /></div>)}
              {allProducts.length === 0 && <p className="p-6 text-sm text-market-muted">Deals will appear here soon.</p>}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-2 pt-3 sm:px-4">
          <div className="rounded-sm bg-card p-3 shadow-soft">
            <h2 className="mb-3 font-market-display text-base font-bold">Shop by category</h2>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
              {TEMU_CIRCLE_CATEGORIES.slice(0, 16).map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.slug)} className="group flex min-w-0 flex-col items-center gap-1.5 rounded-sm p-1 text-center hover:bg-muted">
                <span className={`block aspect-square w-full overflow-hidden rounded-sm bg-muted ring-2 ${selectedCategory === category.slug ? "ring-primary" : "ring-transparent"}`}><img src={category.image} alt="" className="h-full w-full object-cover" /></span>
                <span className="line-clamp-2 text-[11px] leading-tight sm:text-xs">{category.name}</span>
              </button>)}
            </div>
          </div>
        </section>

        {stores.length > 0 && <section className="border-b border-market-line py-8">
          <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Trusted sellers</p><h2 className="mt-1 font-market-display text-3xl font-medium">Stores to know</h2></div></div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-market-line bg-market-line sm:grid-cols-3 lg:grid-cols-6">
              {stores.slice(0, 6).map((store) => <a key={store.id} href={store.appUrl || import.meta.env.VITE_PAYROXA_STORE_URL} target="_blank" rel="noreferrer" className="group flex min-h-36 flex-col justify-between bg-market-paper p-4 transition hover:bg-market-lilac">
                <div className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-market-line bg-background">{store.logo ? <img src={store.logo} alt="" className="h-full w-full object-cover" /> : <span className="font-market-display text-lg">{store.name.charAt(0)}</span>}</div>
                <div><h3 className="font-market-display text-base font-medium">{store.name}</h3><p className="mt-1 flex items-center gap-1 text-xs text-market-muted">{store.verified && <CheckCircle2 className="size-3 text-primary" />} {store.productCount || 0} products</p></div>
              </a>)}
            </div>
          </div>
        </section>}

        <section className="border-b border-market-line bg-market-lilac/60 py-10">
          <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase text-primary"><Sparkles className="size-4" /> Shopping assistant</p>
                <h2 className="mt-1 font-market-display text-3xl font-medium">Describe it, we'll find it</h2>
                <p className="mt-2 text-sm text-market-muted">Tell us what you need in your own words and we'll pick matching products from verified stores.</p>
                <form onSubmit={runAssistant} className="mt-5 space-y-3">
                  <textarea
                    value={assistantQuery}
                    onChange={(event) => setAssistantQuery(event.target.value)}
                    rows={3}
                    placeholder="A gift for my sister who loves skincare, under NGN 30,000"
                    aria-label="Describe what you are shopping for"
                    className="w-full border border-market-line bg-background p-4 text-sm text-market-ink outline-none focus:border-primary"
                  />
                  <PayroxaButton type="submit" disabled={assistantLoading || !assistantQuery.trim()} className="rounded-sm">
                    {assistantLoading ? <><Loader2 className="size-4 animate-spin" /> Finding matches…</> : <><Sparkles className="size-4" /> Find products</>}
                  </PayroxaButton>
                </form>
                {assistantError && <p className="mt-3 text-sm text-market-muted">{assistantError}</p>}
              </div>

              <div>
                {assistantLoading && <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="aspect-[3/4] animate-pulse bg-background" />)}</div>}
                {!assistantLoading && assistantPicks.length > 0 && <div className="space-y-5">
                  {assistantSummary && <p className="border-l-2 border-primary bg-background p-4 text-sm text-market-ink">{assistantSummary}</p>}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3">
                    {assistantPicks.map((pick, index) => <div key={pick.product.id} className="space-y-2">
                      <EditorialProductCard product={pick.product} index={index} viewMode="dense" onAdd={addProduct} />
                      <p className="text-xs text-market-muted">{pick.reason}</p>
                    </div>)}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </section>

        <section id="catalog-hub" className="mx-auto mt-3 max-w-[1200px] rounded-sm bg-card px-3 pb-28 pt-6 shadow-soft sm:px-4 sm:pb-10">
          <div className="mb-7 flex flex-col gap-5 border-b border-market-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-bold uppercase text-primary">Curated marketplace</p><h2 className="mt-1 font-market-display text-3xl font-medium sm:text-4xl">Featured products</h2><p className="mt-2 text-sm text-market-muted">{filteredProducts.length} products selected for you</p></div>
            <div className="-mx-3 flex items-center gap-2 overflow-x-auto px-3 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {([{id:"all",label:"All"},{id:"deals",label:"Deals"},{id:"stars",label:"Top rated"},{id:"best",label:"Best sellers"}] as const).map((tab) => <PayroxaButton key={tab.id} variant={activeFilterTab === tab.id ? "secondary" : "outline"} size="sm" onClick={() => setActiveFilterTab(tab.id)} className="h-10 shrink-0 rounded-sm">{tab.label}</PayroxaButton>)}
              <PayroxaButton variant="outline" size="sm" onClick={() => setIsFilterPanelOpen((open) => !open)} aria-expanded={isFilterPanelOpen} className="h-10 shrink-0 rounded-sm"><Filter className="size-4" /> Filter</PayroxaButton>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products" className="h-10 shrink-0 border border-market-line bg-background px-3 text-sm outline-none"><option value="default">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name-asc">Name: A–Z</option></select>
              <div className="hidden border border-market-line sm:flex"><PayroxaButton variant="text" size="sm" ariaLabel="Grid view" onClick={() => setViewMode("grid")} className={`h-9 w-9 rounded-sm px-0 ${viewMode === "grid" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><LayoutGrid className="size-4" /></PayroxaButton><PayroxaButton variant="text" size="sm" ariaLabel="Dense view" onClick={() => setViewMode("dense")} className={`h-9 w-9 rounded-sm px-0 ${viewMode === "dense" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><Grid3X3 className="size-4" /></PayroxaButton><PayroxaButton variant="text" size="sm" ariaLabel="List view" onClick={() => setViewMode("list")} className={`h-9 w-9 rounded-sm px-0 ${viewMode === "list" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><List className="size-4" /></PayroxaButton></div>
            </div>
          </div>

          {isFilterPanelOpen && <div className="mb-8 grid grid-cols-2 gap-4 border-y border-market-line bg-background py-5 sm:gap-5 sm:py-6 lg:grid-cols-4">
            <label className="col-span-2 text-xs font-bold uppercase text-market-muted sm:col-span-1">Currency<select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)} className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink"><option>ALL</option><option>NGN</option><option>GHS</option><option>KES</option><option>USD</option></select></label>
            <label className="text-xs font-bold uppercase text-market-muted">Minimum price<input type="number" inputMode="numeric" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="0" className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink" /></label>
            <label className="text-xs font-bold uppercase text-market-muted">Maximum price<input type="number" inputMode="numeric" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Any" className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink" /></label>
            <div className="col-span-2 flex items-end gap-2 sm:col-span-1"><PayroxaButton variant={verifiedOnly ? "secondary" : "outline"} onClick={() => setVerifiedOnly((value) => !value)} className="w-full rounded-sm"><ShieldCheck className="size-4" /> Verified only</PayroxaButton><PayroxaButton variant="text" ariaLabel="Reset filters" onClick={handleResetFilters} className="h-11 w-11 shrink-0 px-0 text-market-muted"><RotateCw className="size-4" /></PayroxaButton></div>
          </div>}

          {(error || (loading && allProducts.length > 0)) && (
            <div role="status" aria-live="polite" className="mb-6 flex flex-col gap-4 border-y border-market-line bg-market-lilac/50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-semibold">{loading ? "Refreshing the catalogue…" : allProducts.length > 0 ? "Showing saved products" : "Catalogue temporarily unavailable"}</p>
                <p className="mt-1 text-sm text-market-muted">{error || "You can keep browsing while we check for updates."}</p>
                {allProducts.length > 0 && <p className="mt-1 text-xs text-market-muted">{catalogueSavedAt ? `Last updated ${new Date(catalogueSavedAt).toLocaleString()}. ` : ""}Prices and availability may have changed.</p>}
              </div>
              <PayroxaButton onClick={loadData} disabled={loading} className="shrink-0 self-start rounded-sm sm:self-center">
                <RefreshCw className={`size-4 ${loading ? "animate-spin motion-reduce:animate-none" : ""}`} /> {loading ? "Retrying…" : "Retry catalogue"}
              </PayroxaButton>
            </div>
          )}
          <div aria-busy={loading}>
            {loading && allProducts.length === 0 ? (
              <div role="status" aria-label="Loading products" className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">{Array.from({length:8}).map((_, index) => <div key={index} className="aspect-[3/4] animate-pulse bg-market-lilac" />)}</div>
            ) : filteredProducts.length === 0 ? (
              <div className="border-y border-market-line px-4 py-16 text-center">
                <ShoppingBag className="mx-auto size-8 text-market-muted" />
                <h3 className="mt-4 font-market-display text-2xl">{error && allProducts.length === 0 ? "Products are taking a break" : allProducts.length === 0 ? "New finds are on the way" : "Nothing matches yet"}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-market-muted">{error && allProducts.length === 0 ? "We couldn't reach the product service, and there are no saved products on this device yet. Your bag is safe. Try again in a moment." : allProducts.length === 0 ? "There are no products in the catalogue right now. Check again soon for new arrivals." : "Try clearing a filter or browsing another category."}</p>
                {!error && allProducts.length === 0 && <PayroxaButton disabled={loading} className="mt-5 rounded-sm" onClick={loadData}><RefreshCw className="size-4" /> Refresh catalogue</PayroxaButton>}
                {allProducts.length > 0 && <PayroxaButton className="mt-5 rounded-sm" onClick={handleResetFilters}>Clear filters</PayroxaButton>}
              </div>
            ) : (
              <div className={viewMode === "list" ? "grid grid-cols-1 gap-2" : viewMode === "dense" ? "grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-6" : "grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-4 lg:grid-cols-5"}>{filteredProducts.map((product, index) => <EditorialProductCard key={product.id} product={product} index={index} viewMode={viewMode} onAdd={addProduct} />)}</div>
            )}
          </div>
        </section>
      </main>

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between gap-3 border border-market-line bg-market-ink px-4 py-3 text-market-paper shadow-card sm:bottom-6">
        <div className="min-w-0"><p className="truncate text-sm font-semibold">Save your bag and track orders</p><p className="truncate text-xs text-market-paper/60">Sign in for the complete experience</p></div>
        <PayroxaButton href={PAYROXA_LINKS.login} variant="primary" size="sm" className="rounded-sm">Sign in</PayroxaButton>
      </div>

      <MarketplaceCart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
