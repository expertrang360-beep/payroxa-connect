import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Filter, Grid3X3, LayoutGrid, List, Loader2, Minus, Plus, RefreshCw, RotateCw, Search, ShieldCheck, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { EditorialProductCard } from "@/components/marketplace/EditorialProductCard";
import { PayroxaButton } from "@/components/PayroxaButton";
import { FLASH_PROMO_SLIDES, TEMU_CIRCLE_CATEGORIES } from "@/data/marketplace.data";
import { useCart } from "@/hooks/useCart";
import { getCategories, getFeatured, getProducts, getVendors } from "@/services/payroxa-public-api/client";
import type { PayroxaCategory, PayroxaProduct, PayroxaStore, PayroxaVendor } from "@/services/payroxa-public-api/types";

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Payroxa Marketplace | Shop Verified African Stores" },
      { name: "description", content: "Discover curated technology, fashion, beauty and home essentials from verified African stores with Payroxa-protected checkout." },
      { property: "og:title", content: "Payroxa Marketplace | Shop Verified African Stores" },
      { property: "og:description", content: "Curated products, verified stores and protected checkout in one modern African marketplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://payroxa.com.ng/marketplace" }],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  const {
    items: cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalCount,
  } = useCart();

  // 1. Core Filter & Catalog States
  const [searchQuery, setSearchQuery] = useState("");
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
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<
    "idle" | "provisioning" | "locking" | "dispatching" | "completed"
  >("idle");
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [checkoutHash, setCheckoutHash] = useState("");

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
    setLoading(true);
    setError(null);
    try {
      const [productsRes, categoriesRes, featuredRes, vendorsRes] = await Promise.all([
        getProducts({}),
        getCategories(),
        getFeatured(),
        getVendors(),
      ]);
      setAllProducts(toArray((productsRes as any)?.products ?? productsRes));
      setCategories(toArray((categoriesRes as any)?.categories ?? categoriesRes));
      setStores(toArray((vendorsRes as any)?.vendors ?? vendorsRes));
      setFeatured({
        featuredProducts: toArray((featuredRes as any)?.featuredProducts),
        featuredVendors: toArray((featuredRes as any)?.featuredVendors),
        featuredStores: toArray((featuredRes as any)?.featuredStores),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't load the marketplace right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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

      <header className="sticky top-0 z-50 border-b border-market-line bg-market-paper/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3 lg:px-8">
          <Link to="/marketplace" className="font-market-display text-xl font-bold uppercase">Payroxa<span className="text-primary">.</span></Link>
          <div className="relative mx-auto w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-market-muted" />
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products, stores and categories" aria-label="Search marketplace" className="h-11 w-full rounded-full border border-market-line bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary" />
          </div>
          <PayroxaButton variant="text" size="sm" ariaLabel="Open filters" onClick={() => setIsFilterPanelOpen((open) => !open)} className="h-10 w-10 px-0 text-market-ink"><Filter className="size-5" /></PayroxaButton>
          <PayroxaButton variant="text" size="sm" ariaLabel={`Open bag with ${totalCount} items`} onClick={() => setIsCartOpen(true)} className="relative h-10 w-10 px-0 text-market-ink">
            <ShoppingBag className="size-5" />
            {totalCount > 0 && <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">{totalCount}</span>}
          </PayroxaButton>
        </div>
        <nav className="overflow-x-auto border-t border-market-line" aria-label="Marketplace categories">
          <div className="mx-auto flex max-w-[1440px] gap-7 whitespace-nowrap px-4 lg:px-8">
            <PayroxaButton variant="text" size="sm" onClick={() => setSelectedCategory("")} className={`rounded-none border-b-2 px-0 ${selectedCategory ? "border-transparent text-market-muted" : "border-primary text-primary"}`}>All products</PayroxaButton>
            {categories.map((category) => <PayroxaButton key={category.id} variant="text" size="sm" onClick={() => setSelectedCategory(category.slug)} className={`rounded-none border-b-2 px-0 ${selectedCategory === category.slug ? "border-primary text-primary" : "border-transparent text-market-muted"}`}>{category.name}</PayroxaButton>)}
          </div>
        </nav>
      </header>

      <main>
        <section className="border-b border-market-line">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative flex min-h-[410px] flex-col justify-between overflow-hidden bg-market-lilac px-6 py-8 sm:px-10 lg:min-h-[520px] lg:px-14 lg:py-12">
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-primary">The Payroxa edit / 0{currentSlide + 1}</span>
                <div className="flex gap-1.5" aria-label="Promotion slides">{FLASH_PROMO_SLIDES.map((slide, index) => <PayroxaButton key={slide.id} variant="text" size="sm" ariaLabel={`Show promotion ${index + 1}`} onClick={() => setCurrentSlide(index)} className={`h-2 w-8 rounded-none border-b-2 px-0 ${index === currentSlide ? "border-primary" : "border-market-ink/20"}`}><span className="sr-only">{index + 1}</span></PayroxaButton>)}</div>
              </div>
              <div className="relative z-10 max-w-2xl">
                <p className="mb-4 text-xs font-bold uppercase text-market-muted">{activePromo?.badge}</p>
                <h1 className="max-w-xl font-market-display text-5xl font-medium leading-[0.94] sm:text-6xl lg:text-7xl">Shop smarter. Live better.</h1>
                <p className="mt-6 max-w-lg text-base leading-7 text-market-muted">Curated technology, style and everyday essentials from verified African stores, protected by Payroxa.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PayroxaButton variant="primary" onClick={() => document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" })} className="rounded-none">Shop the collection <ArrowRight className="size-4" /></PayroxaButton>
                  <PayroxaButton variant="outline" onClick={() => setIsFilterPanelOpen(true)} className="rounded-none">Explore categories</PayroxaButton>
                </div>
              </div>
              <div className="absolute -bottom-10 right-[-8%] hidden h-[86%] w-[52%] rotate-3 overflow-hidden sm:block">
                <img src={featured.featuredProducts[0]?.images?.[0]?.url || allProducts[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85"} alt="Featured marketplace product" className="h-full w-full object-cover" />
              </div>
            </div>
            <aside className="grid grid-cols-2 border-t border-market-line bg-background lg:grid-cols-1 lg:border-l lg:border-t-0">
              <div className="flex flex-col justify-between border-r border-market-line p-5 lg:border-b lg:border-r-0 lg:p-8">
                <ShieldCheck className="size-6 text-primary" />
                <div><p className="font-market-display text-2xl font-medium">Protected checkout</p><p className="mt-2 text-sm text-market-muted">Your payment stays protected until delivery is confirmed.</p></div>
              </div>
              <div className="flex flex-col justify-between p-5 lg:p-8">
                <Truck className="size-6 text-primary" />
                <div><p className="font-market-display text-2xl font-medium">Reliable delivery</p><p className="mt-2 text-sm text-market-muted">Track orders from verified stores across the continent.</p></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-b border-market-line bg-background py-8">
          <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
            <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-primary">Browse by interest</p><h2 className="mt-1 font-market-display text-3xl font-medium">Popular categories</h2></div><span className="hidden text-sm text-market-muted sm:block">Everything you need, in one place</span></div>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {TEMU_CIRCLE_CATEGORIES.map((category) => <PayroxaButton key={category.id} variant="text" onClick={() => setSelectedCategory(category.slug)} className="group h-auto min-w-[82px] flex-col px-0 text-market-ink">
                <span className={`block size-16 overflow-hidden rounded-full border-2 ${selectedCategory === category.slug ? "border-primary" : "border-transparent"}`}><img src={category.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /></span>
                <span className="text-xs">{category.name}</span>
              </PayroxaButton>)}
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

        <section id="catalog-hub" className="mx-auto max-w-[1440px] px-4 py-10 lg:px-8 lg:py-14">
          <div className="mb-7 flex flex-col gap-5 border-b border-market-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-bold uppercase text-primary">Curated marketplace</p><h2 className="mt-1 font-market-display text-4xl font-medium">Featured products</h2><p className="mt-2 text-sm text-market-muted">{filteredProducts.length} products selected for you</p></div>
            <div className="flex flex-wrap items-center gap-2">
              {([{id:"all",label:"All"},{id:"deals",label:"Deals"},{id:"stars",label:"Top rated"},{id:"best",label:"Best sellers"}] as const).map((tab) => <PayroxaButton key={tab.id} variant={activeFilterTab === tab.id ? "secondary" : "outline"} size="sm" onClick={() => setActiveFilterTab(tab.id)} className="rounded-none">{tab.label}</PayroxaButton>)}
              <PayroxaButton variant="outline" size="sm" onClick={() => setIsFilterPanelOpen((open) => !open)} className="rounded-none"><Filter className="size-4" /> Filter</PayroxaButton>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products" className="h-9 border border-market-line bg-background px-3 text-sm outline-none"><option value="default">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name-asc">Name: A–Z</option></select>
              <div className="hidden border border-market-line sm:flex"><PayroxaButton variant="text" size="sm" ariaLabel="Grid view" onClick={() => setViewMode("grid")} className={`h-9 w-9 rounded-none px-0 ${viewMode === "grid" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><LayoutGrid className="size-4" /></PayroxaButton><PayroxaButton variant="text" size="sm" ariaLabel="Dense view" onClick={() => setViewMode("dense")} className={`h-9 w-9 rounded-none px-0 ${viewMode === "dense" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><Grid3X3 className="size-4" /></PayroxaButton><PayroxaButton variant="text" size="sm" ariaLabel="List view" onClick={() => setViewMode("list")} className={`h-9 w-9 rounded-none px-0 ${viewMode === "list" ? "bg-market-lilac text-primary" : "text-market-muted"}`}><List className="size-4" /></PayroxaButton></div>
            </div>
          </div>

          {isFilterPanelOpen && <div className="mb-8 grid gap-5 border-y border-market-line bg-background py-6 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-bold uppercase text-market-muted">Currency<select value={selectedCurrency} onChange={(event) => setSelectedCurrency(event.target.value)} className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink"><option>ALL</option><option>NGN</option><option>GHS</option><option>KES</option><option>USD</option></select></label>
            <label className="text-xs font-bold uppercase text-market-muted">Minimum price<input type="number" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="0" className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink" /></label>
            <label className="text-xs font-bold uppercase text-market-muted">Maximum price<input type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Any" className="mt-2 h-11 w-full border border-market-line bg-market-paper px-3 text-sm font-normal text-market-ink" /></label>
            <div className="flex items-end gap-2"><PayroxaButton variant={verifiedOnly ? "secondary" : "outline"} onClick={() => setVerifiedOnly((value) => !value)} className="w-full rounded-none"><ShieldCheck className="size-4" /> Verified only</PayroxaButton><PayroxaButton variant="text" ariaLabel="Reset filters" onClick={handleResetFilters} className="h-11 w-11 shrink-0 px-0 text-market-muted"><RotateCw className="size-4" /></PayroxaButton></div>
          </div>}

          {loading ? <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">{Array.from({length:8}).map((_, index) => <div key={index} className="aspect-[3/4] animate-pulse bg-market-lilac" />)}</div> : error ? <div className="border border-market-line py-16 text-center"><p className="text-market-muted">{error}</p><PayroxaButton className="mt-5 rounded-none" onClick={loadData}><RefreshCw className="size-4" /> Try again</PayroxaButton></div> : filteredProducts.length === 0 ? <div className="border border-market-line py-16 text-center"><ShoppingBag className="mx-auto size-8 text-market-muted" /><h3 className="mt-4 font-market-display text-2xl">Nothing matches yet</h3><p className="mt-2 text-sm text-market-muted">Try clearing a filter or browsing another category.</p><PayroxaButton className="mt-5 rounded-none" onClick={handleResetFilters}>Clear filters</PayroxaButton></div> : <div className={viewMode === "list" ? "grid grid-cols-1" : viewMode === "dense" ? "grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-5" : "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4"}>{filteredProducts.map((product, index) => <EditorialProductCard key={product.id} product={product} index={index} viewMode={viewMode} onAdd={addProduct} />)}</div>}
        </section>
      </main>

      <div className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between border border-market-line bg-market-ink px-4 py-3 text-market-paper shadow-card sm:bottom-6">
        <div><p className="text-sm font-semibold">Save your bag and track orders</p><p className="text-xs text-market-paper/60">Sign in for the complete experience</p></div>
        <PayroxaButton to="/cms-admin/login" variant="primary" size="sm" className="rounded-none">Sign in</PayroxaButton>
      </div>

      {isCartOpen && <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="absolute inset-0 bg-market-ink/55" onClick={() => setIsCartOpen(false)} />
        <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-market-paper shadow-card">
          <div className="flex items-center justify-between border-b border-market-line px-5 py-5"><div><p className="text-xs font-bold uppercase text-primary">Your selection</p><h2 className="font-market-display text-2xl font-medium">Shopping bag ({totalCount})</h2></div><PayroxaButton variant="text" ariaLabel="Close bag" onClick={() => setIsCartOpen(false)} className="h-10 w-10 px-0 text-market-ink"><X className="size-5" /></PayroxaButton></div>
          <div className="flex-1 overflow-y-auto p-5">{cartItems.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag className="size-10 text-market-muted" /><h3 className="mt-4 font-market-display text-2xl">Your bag is empty</h3><p className="mt-2 text-sm text-market-muted">Discover something worth keeping.</p><PayroxaButton variant="outline" onClick={() => setIsCartOpen(false)} className="mt-5 rounded-none">Start shopping</PayroxaButton></div> : <div className="space-y-5">{cartItems.map((item) => <article key={`${item.id}-${item.size}-${item.color}`} className="grid grid-cols-[72px_1fr_auto] gap-3 border-b border-market-line pb-5"><img src={item.image} alt={item.name} className="size-[72px] object-cover" /><div><h3 className="font-market-display text-base font-medium">{item.name}</h3><p className="mt-1 text-sm font-semibold">{item.currency} {item.price.toLocaleString()}</p><div className="mt-3 flex items-center border border-market-line w-fit"><PayroxaButton variant="text" size="sm" ariaLabel="Decrease quantity" onClick={() => updateQuantity(item.id,item.size,item.color,item.quantity-1)} className="h-7 w-7 rounded-none px-0 text-market-ink"><Minus className="size-3" /></PayroxaButton><span className="w-7 text-center text-xs">{item.quantity}</span><PayroxaButton variant="text" size="sm" ariaLabel="Increase quantity" onClick={() => updateQuantity(item.id,item.size,item.color,item.quantity+1)} className="h-7 w-7 rounded-none px-0 text-market-ink"><Plus className="size-3" /></PayroxaButton></div></div><PayroxaButton variant="text" size="sm" ariaLabel={`Remove ${item.name}`} onClick={() => removeFromCart(item.id,item.size,item.color)} className="h-8 w-8 px-0 text-market-muted"><Trash2 className="size-4" /></PayroxaButton></article>)}</div>}</div>
          {cartItems.length > 0 && <div className="border-t border-market-line bg-background p-5"><div className="flex justify-between"><span className="text-sm text-market-muted">Subtotal</span><strong className="font-market-display text-xl">{cartItems[0]?.currency} {subtotal.toLocaleString()}</strong></div><p className="mt-3 flex gap-2 text-xs text-market-muted"><ShieldCheck className="size-4 shrink-0 text-primary" />Payment is protected until you confirm delivery.</p><PayroxaButton onClick={() => {setIsCartOpen(false);setCheckoutStep("idle");setIsCheckoutModalOpen(true)}} className="mt-5 w-full rounded-none">Proceed to checkout <ArrowRight className="size-4" /></PayroxaButton></div>}
        </aside>
      </div>}

      {isCheckoutModalOpen && <div className="fixed inset-0 z-[90] flex items-center justify-center bg-market-ink/60 p-4" role="dialog" aria-modal="true" aria-label="Checkout">
        <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto bg-market-paper shadow-card">
          <div className="flex items-center justify-between border-b border-market-line px-5 py-5"><div><p className="text-xs font-bold uppercase text-primary">Protected by Payroxa</p><h2 className="font-market-display text-2xl font-medium">Checkout</h2></div>{checkoutStep === "idle" && <PayroxaButton variant="text" ariaLabel="Close checkout" onClick={() => setIsCheckoutModalOpen(false)} className="h-10 w-10 px-0 text-market-ink"><X className="size-5" /></PayroxaButton>}</div>
          {checkoutStep === "idle" ? <div className="space-y-6 p-5"><div className="grid grid-cols-3 gap-2 text-center text-xs"><span className="border-b-2 border-primary pb-2 font-bold text-primary">Delivery</span><span className="border-b border-market-line pb-2 text-market-muted">Payment</span><span className="border-b border-market-line pb-2 text-market-muted">Review</span></div><div className="space-y-3"><label className="block text-xs font-bold uppercase text-market-muted">Full name<input value={shippingName} onChange={(event) => setShippingName(event.target.value)} className="mt-2 h-11 w-full border border-market-line bg-background px-3 text-sm font-normal text-market-ink" /></label><label className="block text-xs font-bold uppercase text-market-muted">Phone number<input type="tel" value={shippingPhone} onChange={(event) => setShippingPhone(event.target.value)} className="mt-2 h-11 w-full border border-market-line bg-background px-3 text-sm font-normal text-market-ink" /></label><label className="block text-xs font-bold uppercase text-market-muted">Delivery address<textarea rows={3} value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} className="mt-2 w-full border border-market-line bg-background px-3 py-3 text-sm font-normal text-market-ink" /></label></div><div className="border-y border-market-line py-4"><div className="flex justify-between text-sm"><span className="text-market-muted">Order total</span><strong>{cartItems[0]?.currency} {subtotal.toLocaleString()}</strong></div></div><PayroxaButton onClick={async () => {if(!shippingName||!shippingPhone||!shippingAddress){setToastMessage("Please complete your delivery details");return}setCheckoutStep("provisioning");try{const {createMarketplaceOrderFn}=await import("../cms/marketplace-api");const res=await createMarketplaceOrderFn({data:{customerName:shippingName,customerEmail:"guest@example.com",customerPhone:shippingPhone,deliveryAddress:shippingAddress,deliveryMethod:"Standard",cartItems:cartItems.map((item)=>({productId:item.id,quantity:item.quantity}))}});if(res.success&&res.checkoutUrl){window.location.href=res.checkoutUrl}else{setToastMessage(res.error||"Checkout could not be started");setCheckoutStep("idle")}}catch(err){setToastMessage(err instanceof Error?err.message:"Checkout could not be started");setCheckoutStep("idle")}}} className="w-full rounded-none">Continue to payment <ArrowRight className="size-4" /></PayroxaButton></div> : <div className="p-12 text-center"><Loader2 className="mx-auto size-10 animate-spin text-primary" /><h3 className="mt-5 font-market-display text-2xl">Preparing secure payment</h3><p className="mt-2 text-sm text-market-muted">Your order is being prepared and protected.</p></div>}
        </div>
      </div>}
    </div>
  );
}
