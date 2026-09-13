import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
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
  Star,
  Clock,
  ChevronRight,
  HelpCircle,
  ArrowUpDown,
  ChevronDown,
  Award,
  ShieldAlert,
  Coins,
  Truck,
  LayoutGrid,
  Grid3X3,
  Grid2X2,
  List,
  Flame,
  Check,
  RotateCw,
  Zap,
  BadgePercent,
  TrendingUp,
  Sparkle,
  ThumbsUp,
  X,
  Minus,
  Plus,
  Trash2,
  Loader2,
  User,
} from "lucide-react";
import { getProducts, getCategories, getFeatured, getVendors } from "@/services/payroxa-public-api/client";
import {
  PayroxaProduct,
  PayroxaCategory,
  PayroxaVendor,
  PayroxaStore,
} from "@/services/payroxa-public-api/types";
import { PayroxaButton } from "@/components/PayroxaButton";
import { updateSEO } from "@/utils/seo";
import { TEMU_CIRCLE_CATEGORIES, FLASH_PROMO_SLIDES, GENERAL_FAQS } from "@/data/marketplace.data";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/marketplace")({
  component: MarketplacePage,
});

function MarketplacePage() {
  const navigate = useNavigate();
  const {
    items: cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
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
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [toastMessage]);

  // 4. Initial Load & SEO Registration
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes, featRes, vendorsRes] = await Promise.all([
        getProducts({}),
        getCategories(),
        getFeatured(),
        getVendors(),
      ]);
      
      try {
        // Just for reference if we need to load gamification early, but now it's in the modal
      } catch (err) {
        console.warn("Failed to load programmatic rewards", err);
      }

      if (prodRes.success) {
        setAllProducts(prodRes.data || []);
      } else {
        setError(prodRes.error?.message || "Failed to load products");
      }

      if (catRes.success) {
        setCategories(catRes.data || []);
      }

      if (vendorsRes.success) {
        setStores(vendorsRes.data || []);
      }

      if (featRes.success && featRes.data) {
        setFeatured({
          featuredProducts: featRes.data.featuredProducts || [],
          featuredVendors: featRes.data.featuredVendors || [],
          featuredStores: featRes.data.featuredStores || [],
        });
      }
    } catch (err: any) {
      setError(err?.message || "Marketplace temporarily offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    updateSEO({
      title: "Payroxa Sovereign Marketplace | High-Conversion Escrow Drops",
      description:
        "Browse organic clothing, tech gadgets, agricultural goods, and custom crafts securely held in escrow vault custody on Payroxa.",
      type: "website",
    });
  }, []);

  // Slide Auto-advance logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FLASH_PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Countdown Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  // 5. Client-Side Filtering Engine
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (selectedCategory) {
      list = list.filter(
        (p) =>
          p.category?.slug === selectedCategory ||
          p.category?.name.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q) ||
          p.vendor?.name.toLowerCase().includes(q),
      );
    }

    if (selectedCurrency !== "ALL") {
      list = list.filter((p) => p.currency === selectedCurrency);
    }

    if (minPrice !== "") {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    }
    if (maxPrice !== "") {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) list = list.filter((p) => p.price <= max);
    }

    if (verifiedOnly) {
      list = list.filter((p) => p.vendor?.verified);
    }

    // Apply active filter tab from UI
    if (activeFilterTab === "deals") {
      list = list.filter((p) => p.price % 3 !== 0);
    } else if (activeFilterTab === "stars") {
      list = list.filter((p, idx) => idx % 2 === 0);
    } else if (activeFilterTab === "best") {
      list = list.filter((p, idx) => idx % 3 === 0);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [
    allProducts,
    selectedCategory,
    searchQuery,
    selectedCurrency,
    minPrice,
    maxPrice,
    verifiedOnly,
    sortBy,
    activeFilterTab,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setSelectedCurrency("ALL");
    setMinPrice("");
    setMaxPrice("");
    setVerifiedOnly(false);
    setSortBy("default");
    setActiveFilterTab("all");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-foreground font-sans pb-24 relative">
      {/* Dynamic Iframe-Compliant Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-black/95 backdrop-blur-md text-white text-xs font-black p-4 rounded-2xl shadow-glow flex items-center justify-between border border-white/10 animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-yellow-400 animate-pulse shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white font-bold px-2 py-1 text-[10px] cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 0. Temu-Style Search Header (Strict layout matching screenshot) */}
      <header className="bg-white px-4 py-3 sticky top-0 z-50 border-b border-border/40 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-black tracking-tight text-primary font-display">
              PAYROXA
            </span>
          </div>

          <div className="flex-1 max-w-xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ears pods, apparel, tech gadgets..."
              className="w-full bg-[#F5F5F7] rounded-full pl-5 pr-10 py-2.5 text-xs font-semibold text-foreground border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4 text-foreground shrink-0">
            <button
              onClick={() =>
                setViewMode((prev) =>
                  prev === "dense" ? "grid" : prev === "grid" ? "list" : "dense",
                )
              }
              title={`Switch View Mode (Current: ${viewMode})`}
              className="p-1 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold"
            >
              {viewMode === "dense" && <Grid3X3 className="size-5" />}
              {viewMode === "grid" && <LayoutGrid className="size-5" />}
              {viewMode === "list" && <List className="size-5" />}
              <span className="hidden sm:inline capitalize">{viewMode}</span>
            </button>
            <Link
              to="/cms-admin/login"
              title="Member Access"
              className="flex items-center gap-1.5 p-1 hover:text-primary transition-colors group"
            >
              <User className="size-5" />
              <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:inline group-hover:underline">
                Member
              </span>
            </Link>
            <div
              className="relative cursor-pointer hover:text-primary transition-colors p-1"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="size-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold rounded-full size-4 flex items-center justify-center animate-bounce">
                  {totalCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 1. Category Sliding Navigation Tab bar */}
      <nav className="bg-white border-b border-border/40 overflow-x-auto scrollbar-none sticky top-[61px] z-40 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 whitespace-nowrap text-xs font-extrabold text-muted-foreground">
          <button
            onClick={() => setSelectedCategory("")}
            className={`transition-colors relative pb-1 ${!selectedCategory ? "text-primary font-black" : "hover:text-foreground"}`}
          >
            All
            {!selectedCategory && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`transition-colors relative pb-1 ${isActive ? "text-primary font-black" : "hover:text-foreground"}`}
              >
                {cat.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. Free Shipping & Guarantees cream banner (Matches screenshot precisely) */}
      <div className="bg-[#FFF4EB] border-b border-[#FFE4D0] py-2.5 px-4 text-xs text-[#8A4A1C] font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-600 font-black">✔</span>
            <span>Free shipping</span>
            <span className="text-[10px] text-muted-foreground/80 font-normal">
              | Limited-time offer
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" />
            <span>Delivery guarantee</span>
            <span className="text-[10px] text-muted-foreground/80 font-normal">
              | Refund for any issue
            </span>
          </div>
        </div>
      </div>

      {/* 3. Green Escrow Why-Choose interactive banner */}
      <div className="bg-[#00B050] text-white py-2 px-4 text-xs font-bold shadow-soft">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between cursor-pointer"
          onClick={() =>
            document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="flex items-center gap-1.5">
            <span className="bg-white text-[#00B050] text-[9px] rounded-full size-4 flex items-center justify-center font-bold">
              ✔
            </span>
            <span>Why choose Payroxa?</span>
            <span className="bg-black/15 text-white text-[10px] px-2 py-0.5 rounded ml-2 font-normal">
              Secure multi-sig escrow
            </span>
          </div>
          <span className="text-xs flex items-center gap-0.5 font-bold">
            Browse Catalog <ChevronRight className="size-3.5" />
          </span>
        </div>
      </div>

      {/* 4. Available Stores / Vendors */}
      {stores.length > 0 && (
        <section className="bg-white border-b border-border/40 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-muted-foreground">
                <Store className="size-3.5 text-primary" /> Available Stores
              </h2>
            </div>
            <div className="flex overflow-x-auto scrollbar-none gap-4 pb-2 snap-x">
              {stores.map((store) => (
                <a
                  key={store.id}
                  href={store.appUrl || import.meta.env.VITE_PAYROXA_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[72px] snap-start group"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/30 to-primary/5 p-[2px] group-hover:from-primary group-hover:to-primary/60 transition-all cursor-pointer">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden border-2 border-white relative flex items-center justify-center shadow-sm">
                      {store.logo ? (
                        <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-black text-primary/40 uppercase">
                          {store.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-center w-full px-0.5 flex flex-col items-center">
                    <h3 className="text-[10px] font-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    {store.verified && (
                      <span className="inline-flex items-center text-emerald-600 mt-0.5 bg-emerald-50 rounded-full px-1 py-0.5">
                        <ShieldCheck className="size-2.5" />
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Highly Interactive Filter Tag Menu Row (Matches screenshot tabs) */}
      <section className="bg-white border-y border-border/40 overflow-x-auto scrollbar-none py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          {[
            { id: "all", label: "All", icon: null },
            { id: "deals", label: "Deals", icon: <Zap className="size-3.5" /> },
            {
              id: "stars",
              label: "5-Star Rated",
              icon: <Star className="size-3.5 fill-yellow-400" />,
            },
            { id: "best", label: "Best-Selling Items", icon: <ThumbsUp className="size-3.5" /> },
          ].map((tab) => {
            const isActive = activeFilterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id as any)}
                className={`rounded-full px-5 py-2 text-xs font-black transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-soft"
                    : "bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Dynamic Promotional Banner Slide Carousel */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div
          className={`rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-card transition-all bg-gradient-to-r ${FLASH_PROMO_SLIDES[currentSlide].bgClass}`}
        >
          <div className="flex-1 space-y-3">
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              {FLASH_PROMO_SLIDES[currentSlide].badge}
            </span>
            <h1 className="text-xl sm:text-3xl font-black font-display tracking-tight leading-tight">
              {FLASH_PROMO_SLIDES[currentSlide].title}
            </h1>
            <p className="text-xs text-white/90 font-semibold max-w-lg">
              {FLASH_PROMO_SLIDES[currentSlide].highlight}.{" "}
              {FLASH_PROMO_SLIDES[currentSlide].tagline}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shrink-0 text-center text-white min-w-[200px]">
            <p className="text-[10px] font-bold uppercase tracking-wider">Coupon Code</p>
            <p className="text-lg font-black text-yellow-300 font-mono tracking-widest">
              {FLASH_PROMO_SLIDES[currentSlide].couponCode}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Main Dual-Column Feed Catalog Grid (Matching mobile screenshot density) */}
      <section id="catalog-hub" className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-border/30">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <h2 className="text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="size-4 text-primary" /> Sovereign Catalog Drops
            </h2>
            <span className="text-[10px] font-bold bg-muted px-2 py-1 rounded text-muted-foreground sm:hidden">
              {filteredProducts.length} drops
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="hidden sm:inline-block text-[10px] font-bold bg-muted px-2 py-1 rounded text-muted-foreground mr-2">
              {filteredProducts.length} drops match
            </span>
            <button
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                isFilterPanelOpen ||
                selectedCurrency !== "ALL" ||
                minPrice !== "" ||
                maxPrice !== "" ||
                verifiedOnly ||
                sortBy !== "default"
                  ? "bg-primary/10 border-primary text-primary shadow-soft"
                  : "bg-white border-border/60 hover:bg-muted/10 text-muted-foreground"
              }`}
            >
              <Filter className="size-3.5" />
              <span>Filters {isFilterPanelOpen ? "Close" : "Open"}</span>
              {(selectedCurrency !== "ALL" ||
                minPrice !== "" ||
                maxPrice !== "" ||
                verifiedOnly ||
                sortBy !== "default") && <span className="bg-primary size-1.5 rounded-full" />}
            </button>
          </div>
        </div>

        {/* Dynamic Expandable Filter Drawer Panel */}
        {isFilterPanelOpen && (
          <div className="bg-white border border-border/40 rounded-3xl p-5 mb-6 shadow-soft space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold">
              {/* Sort By Selection */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1">
                  <ArrowUpDown className="size-3" /> Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="default">Default Drops</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>

              {/* Currency Selector */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1">
                  <Coins className="size-3" /> Currency
                </label>
                <div className="flex gap-1 overflow-x-auto scrollbar-none pb-1">
                  {["ALL", "NGN", "GHS", "KES", "USD"].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setSelectedCurrency(curr)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                        selectedCurrency === curr
                          ? "bg-primary text-white border-primary"
                          : "bg-[#F5F5F7] text-muted-foreground border-border/30 hover:bg-muted"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range inputs */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1">
                  <Tag className="size-3" /> Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                  <span className="text-muted-foreground text-xs font-bold">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Verified Merchant Switch */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <div className="flex items-center justify-between bg-[#F5F5F7] border border-border/40 rounded-xl p-2.5">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-emerald-600" /> Verified Merchant
                  </span>
                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      verifiedOnly ? "bg-emerald-600" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        verifiedOnly ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Clear Filters Action Row */}
            <div className="flex justify-end pt-2 border-t border-border/30">
              <button
                onClick={handleResetFilters}
                className="bg-[#F5F5F7] hover:bg-[#E5E5E7] text-muted-foreground px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl bg-muted animate-pulse border border-border/30"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-border/40 text-center shadow-soft">
            <ShieldAlert className="size-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-xs font-bold text-muted-foreground">
              No active escrow drops match the criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-primary text-white text-[11px] font-black px-4 py-2 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "dense"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
                : viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                  : "grid grid-cols-1 gap-4"
            }
          >
            {filteredProducts.map((p, idx) => {
              const rating = (4.7 + (idx % 4) * 0.1).toFixed(1);
              const ratingCount = 120 + (idx % 12) * 85;
              const imageSource =
                p.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
              const savingPct = (p.price % 20) + 50;
              const originalPrice = Math.round(p.price * (100 / (100 - savingPct)));

              if (viewMode === "list") {
                return (
                  <article
                    key={p.id}
                    className="flex bg-white rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
                  >
                    <Link
                      to="/marketplace/product/$slug"
                      params={{ slug: p.slug }}
                      className="relative w-32 sm:w-44 aspect-square bg-muted shrink-0 overflow-hidden block"
                    >
                      <img
                        src={imageSource}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft">
                        -{savingPct}%
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold">
                          <span>{p.category?.name}</span>
                          <span className="text-emerald-600 shrink-0">✔ {p.vendor?.name}</span>
                        </div>
                        <Link to="/marketplace/product/$slug" params={{ slug: p.slug }} className="block hover:underline">
                          <h4 className="text-sm font-black text-foreground transition-colors">
                            {p.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                          {p.description ||
                            "Premium verified escrow drop cataloged directly from sovereign workshops."}
                        </p>
                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-sm font-black text-primary">
                            {p.currency} {p.price.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground line-through font-semibold">
                            {p.currency} {originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-2">
                        <Link
                          to="/marketplace/product/$slug"
                          params={{ slug: p.slug }}
                          className="text-xs font-bold text-primary hover:underline flex items-center"
                        >
                          Inspect Details <ChevronRight className="size-4" />
                        </Link>
                        <a
                          href={p.appUrl || import.meta.env.VITE_PAYROXA_STORE_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary text-white text-xs font-black px-4 py-2 rounded-xl hover:brightness-110 transition-colors cursor-pointer flex items-center justify-center"
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={p.id}
                  className={`group bg-white rounded-2xl border border-border/50 overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-medium transition-all duration-300 ${
                    viewMode === "dense" ? "p-1 sm:p-2" : "p-0"
                  }`}
                >
                  <Link
                    to="/marketplace/product/$slug"
                    params={{ slug: p.slug }}
                    className="relative aspect-square bg-muted overflow-hidden rounded-xl block"
                  >
                    <img
                      src={imageSource}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft">
                      -{savingPct}%
                    </div>
                  </Link>
                  <div
                    className={`flex flex-col justify-between flex-1 space-y-2 ${viewMode === "dense" ? "p-2 pt-3" : "p-3.5"}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] text-muted-foreground font-bold">
                        <span className="truncate max-w-[80px]">{p.category?.name}</span>
                        <span className="text-emerald-600 shrink-0">✔ {p.vendor?.name}</span>
                      </div>
                      <Link to="/marketplace/product/$slug" params={{ slug: p.slug }} className="block hover:underline">
                        <h4 className="text-xs font-black text-foreground group-hover:text-primary line-clamp-1 leading-snug">
                          {p.name}
                        </h4>
                      </Link>
                      <div className="flex items-baseline gap-1.5 pt-0.5">
                        <span className="text-xs font-black text-primary">
                          {p.currency} {p.price.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-muted-foreground line-through font-semibold">
                          {p.currency} {originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-yellow-500 font-bold">
                      <div className="flex text-yellow-400">
                        <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <span>
                        {rating} ({ratingCount})
                      </span>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                      <Link
                        to="/marketplace/product/$slug"
                        params={{ slug: p.slug }}
                        className="text-[9px] font-black text-primary hover:underline flex items-center"
                      >
                        Inspect <ChevronRight className="size-3" />
                      </Link>
                      <a
                        href={p.appUrl || import.meta.env.VITE_PAYROXA_STORE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded hover:brightness-110 transition-colors cursor-pointer flex items-center justify-center"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 10. Sticky Bottom Sign-In Banner (Matches screenshot sticky prompt) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 text-white px-4 py-3 z-50 flex items-center justify-between shadow-glow max-w-md mx-auto sm:rounded-t-3xl sm:border-x">
        <div className="flex items-center gap-3">
          <Sparkle className="size-4 text-yellow-400 animate-pulse" />
          <div className="space-y-0.5">
            <p className="text-xs font-black text-white leading-none">
              Sign in for the best experience
            </p>
            <p className="text-[10px] text-white/50">Unlock secure safe-vault drops & tracking.</p>
          </div>
        </div>
        <Link
          to="/cms-admin/login"
          className="bg-primary hover:bg-primary/90 text-white text-xs font-black px-5 py-2 rounded-full shadow-soft transition-all uppercase tracking-wider shrink-0"
        >
          Sign in
        </Link>
      </div>

      {/* 11. Shopping Cart Drawer Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
              <div className="px-4 py-6 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-5" />
                  <h2 className="text-sm font-black uppercase tracking-wider">
                    Escrow Shopping Cart
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="size-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                      <ShoppingBag className="size-8" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground">
                      Your sovereign escrow cart is empty.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-primary text-white text-xs font-black px-4 py-2 rounded-xl"
                    >
                      Browse Drops
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex gap-3 p-3 bg-muted/40 rounded-2xl border border-border/30 justify-between items-start"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-16 rounded-xl object-cover border border-border/20 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black text-foreground line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-1 text-[9px] font-bold text-muted-foreground">
                            <span className="bg-white px-1.5 py-0.5 rounded border border-border/30">
                              Size: {item.size}
                            </span>
                            <span className="bg-white px-1.5 py-0.5 rounded border border-border/30">
                              Color: {item.color}
                            </span>
                          </div>
                          <p className="text-xs font-black text-primary">
                            {item.currency} {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-red-500 p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-white rounded-lg border border-border/50 p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                            }
                            className="size-5 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-black px-1 min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                            }
                            className="size-5 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t border-border bg-muted/10 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-extrabold text-muted-foreground uppercase">
                      Subtotal:
                    </span>
                    <span className="text-lg font-black text-primary">
                      {cartItems[0]?.currency}{" "}
                      {cartItems
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-emerald-800 font-bold leading-normal">
                      Shielded escrow custody enabled. Merchant receives payment only after you
                      receive and confirm product delivery.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep("idle");
                      setIsCheckoutModalOpen(true);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Secure Escrow Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. Escrow Ledger Checkout Modal & Simulator */}
      {isCheckoutModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          id="checkout-modal"
        >
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-border/30 flex flex-col">
            <div className="px-5 py-4 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider">
                  Escrow Ledger Dispatch
                </h3>
              </div>
              {checkoutStep === "idle" && (
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="text-white/60 hover:text-white p-1"
                >
                  <X className="size-5" />
                </button>
              )}
            </div>

            <div className="p-5 flex-1 space-y-4 max-h-[80vh] overflow-y-auto">
              {checkoutStep === "idle" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-muted-foreground">
                      1. Shipping Logistics Details
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      <input
                        type="text"
                        placeholder="Recipient Full Name"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="Active Phone Number (For Dispatch SMS)"
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white"
                      />
                      <textarea
                        placeholder="Physical Delivery Address (Apt, Street, City, Country)"
                        rows={2}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-muted-foreground">
                      2. Escrow Order Summary
                    </h4>
                    <div className="space-y-2 max-h-36 overflow-y-auto border border-border/20 p-2.5 rounded-2xl bg-muted/20">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.size}-${item.color}`}
                          className="flex justify-between text-xs font-semibold"
                        >
                          <span className="truncate max-w-[280px]">
                            {item.name} x{item.quantity}
                          </span>
                          <span>
                            {item.currency} {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-dashed">
                      <span className="text-xs font-black">Escrow Secure Total:</span>
                      <span className="text-sm font-black text-primary">
                        {cartItems[0]?.currency}{" "}
                        {cartItems
                          .reduce((acc, item) => acc + item.price * item.quantity, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[10px] text-amber-900 font-bold leading-normal">
                    💡 **Escrow Protocol:** Upon clicking, the funds will be held securely. The
                    merchant is notified and must release regional dispatch trackers within 48
                    hours. Funds are only transferred to the merchant when you confirm delivery.
                  </div>

                  <button
                    onClick={async () => {
                      if (!shippingName || !shippingAddress || !shippingPhone) {
                        setToastMessage(
                          "Please fulfill all shipping logistics fields to establish escrow.",
                        );
                        return;
                      }
                      
                      setCheckoutStep("provisioning");
                      try {
                        const { createMarketplaceOrderFn, getWheelRewardsFn } = await import("../cms/marketplace-api");
                        const res = await createMarketplaceOrderFn({
                          data: {
                            customerName: shippingName,
                            customerEmail: "guest@example.com", 
                            customerPhone: shippingPhone,
                            deliveryAddress: shippingAddress,
                            deliveryMethod: "Standard",
                            cartItems: cartItems.map((item: any) => ({
                              productId: item.id,
                              quantity: item.quantity
                            }))
                          }
                        });

                        if (res.success && res.checkoutUrl) {
                          window.location.href = res.checkoutUrl;
                        } else {
                          setToastMessage(res.error || "Failed to initialize secure checkout.");
                          setCheckoutStep("idle");
                        }
                      } catch (err: any) {
                        setToastMessage(err.message || "An error occurred starting checkout.");
                        setCheckoutStep("idle");
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider"
                  >
                    Confirm Secure Deposit & Lock Escrow
                  </button>
                </div>
              )}

              {checkoutStep !== "idle" && checkoutStep !== "completed" && (
                <div className="text-center py-10 space-y-6">
                  <div className="relative size-20 mx-auto">
                    <Loader2 className="size-20 text-primary animate-spin absolute top-0 left-0" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldCheck className="size-8 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-foreground">
                      {checkoutStep === "provisioning" &&
                        "1/3 Provisioning Secure Escrow Smart Vault..."}
                      {checkoutStep === "locking" && "2/3 Locking Funds into Ledger Custody..."}
                      {checkoutStep === "dispatching" && "3/3 Issuing Logistics & Tracking ID..."}
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                      Connecting with decentralized air-cargo networks and bank ledgers to securely
                      shield your payment.
                    </p>
                  </div>

                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div
                      className={`h-full bg-primary transition-all duration-1000 ${
                        checkoutStep === "provisioning"
                          ? "w-1/3"
                          : checkoutStep === "locking"
                            ? "w-2/3"
                            : "w-[90%]"
                      }`}
                    />
                  </div>
                </div>
              )}

              {checkoutStep === "completed" && (
                <div className="text-center py-6 space-y-5">
                  <div className="size-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-emerald-600 uppercase tracking-wide">
                      Escrow Contract Locked!
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Your deposit is secured in vault safely! Logistics dispatched to{" "}
                      <strong>{shippingName}</strong>.
                    </p>
                  </div>

                  <div className="border border-emerald-100 bg-emerald-50/50 rounded-2xl p-4 text-left text-xs font-semibold space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tracking ID:</span>
                      <span className="font-black text-foreground uppercase">
                        DHL-AIR-{(Math.random() * 100000000).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Escrow State:</span>
                      <span className="font-black text-emerald-700 uppercase">
                        🛡️ FUNDS IN CUSTODY
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recipient Name:</span>
                      <span className="font-black text-foreground">{shippingName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ledger TX Hash:</span>
                      <span className="font-black text-primary font-mono text-[10px] truncate max-w-[150px]">
                        {checkoutHash}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground max-w-xs mx-auto">
                    A notification with tracking details has been sent to your device. You have 7
                    days post-receipt to inspect the goods.
                  </p>

                  <button
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setCheckoutStep("idle");
                      setShippingName("");
                      setShippingPhone("");
                      setShippingAddress("");
                    }}
                    className="bg-black hover:bg-neutral-800 text-white font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
                  >
                    Return to Marketplace
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
