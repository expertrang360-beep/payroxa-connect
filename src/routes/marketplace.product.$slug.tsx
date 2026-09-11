import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  ShoppingBag,
  Truck,
  RotateCcw,
  Lock,
  Share2,
  Sparkles,
  MapPin,
  Flame,
  Clock,
  Star,
  ChevronRight,
  Package,
  HelpCircle,
  ThumbsUp,
  Coins,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Tag,
  Zap,
} from "lucide-react";
import { getProduct, getProducts } from "@/services/payroxa-public-api/client";
import { PayroxaProduct } from "@/services/payroxa-public-api/types";
import { PayroxaButton } from "@/components/PayroxaButton";
import { updateSEO } from "@/utils/seo";
import { useCart } from "@/hooks/useCart";

export const Route = createFileRoute("/marketplace/product/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Core Product Retrieval States
  const [product, setProduct] = useState<PayroxaProduct | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<PayroxaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Custom User Interaction States
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Classic Edition");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Collapsible Details Sections
  const [isSpecsOpen, setIsSpecsOpen] = useState(true);
  const [isEscrowDetailsOpen, setIsEscrowDetailsOpen] = useState(true);

  // Active review filter category
  const [reviewFilter, setReviewFilter] = useState<string>("all");
  const [helpfulRatings, setHelpfulRatings] = useState<Record<number, boolean>>({});

  // Lightning Deals Countdown (11h : 24m : 43s style)
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 48, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch product data and recommendations
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await getProduct(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          updateSEO({
            title: `${res.data.name} | Premium Escrow Drop on Payroxa`,
            description:
              res.data.description ||
              "Buy premium verified drops securely through Payroxa escrow vaults.",
            image: res.data.images?.[0]?.url,
            currency: res.data.currency,
            price: res.data.price,
            type: "product",
          });

          // Load recommendations from same category
          const recRes = await getProducts({ limit: 4 });
          if (recRes.success && recRes.data) {
            // Filter out current product
            setRecommendedProducts(recRes.data.filter((p) => p.slug !== slug));
          }
        } else {
          setError(res.error?.message || "Merchant drop not found");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load drop details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  // Helper calculation for original marked price and claimed quota
  const discountStats = useMemo(() => {
    if (!product) return { discountPercent: 0, originalPrice: 0, claimPercentage: 0 };
    // Determinisitc based on price
    const discountPercent = (product.price % 30) + 45; // 45% - 75%
    const originalPrice = Math.round(product.price * (100 / (100 - discountPercent)));
    const claimPercentage = (product.price % 40) + 55; // 55% - 95%
    return { discountPercent, originalPrice, claimPercentage };
  }, [product]);

  // Dynamic Shipping Estimator based on current time (Sept 11, 2026)
  const shippingDates = useMemo(() => {
    // Delivery window: 3 to 6 days
    const minDelivery = new Date("2026-09-14");
    const maxDelivery = new Date("2026-09-17");

    const formatDelivery = (d: Date) => {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
    };

    return {
      range: `${formatDelivery(minDelivery)} - ${formatDelivery(maxDelivery)}`,
      urgencyLabel: "Order in the next 2 hours for guaranteed dispatch!",
    };
  }, []);

  const handleToggleHelpful = (id: number) => {
    setHelpfulRatings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  const reviews = useMemo(
    () => [
      {
        id: 1,
        author: "Chinedu O.",
        rating: 5,
        date: "Sept 08, 2026",
        badge: "Verified Buyer",
        comment:
          "Outstanding fabric density! Exceeded expectations on DHL parcel speed, took only 3 days. Checked quality and approved ledger payment instantly.",
        helpfulCount: 42,
        reply:
          "Merchant replied: Thanks Chinedu! We process standard escrow clearing within 2 hours of transit authorization.",
      },
      {
        id: 2,
        author: "Ezenwa K.",
        rating: 5,
        date: "Sept 04, 2026",
        badge: "Verified Buyer",
        comment:
          "Excellent logistics and high-conversion sizing picker. Sizes are standard EU fits. Safely held in escrow until I inspected at Lagos sorting hub.",
        helpfulCount: 19,
      },
      {
        id: 3,
        author: "Sarah M.",
        rating: 4,
        date: "Aug 29, 2026",
        badge: "Verified Buyer",
        comment:
          "Very elegant build. Minor cosmetic scratch on external cardboard, but the inner product is 100% pristine. Definitely shopping again.",
        helpfulCount: 7,
      },
    ],
    [],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-24 px-5 text-center">
        <div className="mx-auto size-12 rounded-full border-2 border-orange-600 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">
          Establishing secure ledger sync for {slug}...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-white p-8 shadow-soft">
          <ShieldAlert className="mx-auto size-12 text-red-500 mb-3" />
          <h2 className="text-lg font-black text-foreground">Merchant Drop Offline</h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {error ||
              "The requested product drop could not be matched with our active escrow listings."}
          </p>
          <button
            onClick={() => navigate({ to: "/marketplace" })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3 text-xs font-black text-white shadow-soft transition-all"
          >
            <ArrowLeft className="size-4" /> Return to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-foreground font-sans">
      {/* 1. High-Density Urgency Subheader banner */}
      <div className="bg-orange-600 py-2.5 px-4 text-white text-xs font-bold border-b border-orange-700 tracking-wide select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-yellow-300 fill-yellow-300" />
            <span>
              LIGHTNING FLASH DEAL ACTIVE:{" "}
              <strong className="text-yellow-200">
                SAVE {discountStats.discountPercent}% INSTANTLY
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/95">Limited Quota Stock Claimed:</span>
            <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-yellow-400"
                style={{ width: `${discountStats.claimPercentage}%` }}
              />
            </div>
            <span className="text-[11px] text-yellow-200 font-black">
              {discountStats.claimPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Breadcrumbs & Verified Badge Navigation bar */}
      <div className="border-b border-border/40 bg-white py-3">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Marketplace Hub
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <CheckCircle2 className="size-3.5" /> ESCROW VAULT SECURED
          </div>
        </div>
      </div>

      {/* 3. Detailed Multi-Grid Store View */}
      <main className="max-w-6xl mx-auto px-5 py-8">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Image Gallery, Visual Zoom, Social proof, Trust */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Screen Cover Card with custom banners */}
            <div className="aspect-square w-full overflow-hidden rounded-3xl border border-border/50 bg-white shadow-soft relative group">
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.images[activeImageIndex]?.alt || product.name}
                className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-soft">
                {discountStats.discountPercent}% OFF DROP
              </div>

              {/* Scarcity social watermark */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white rounded-xl p-3 max-w-[280px] shadow-medium flex items-center gap-3">
                <Flame className="size-8 text-orange-500 fill-orange-500 shrink-0 animate-pulse" />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-orange-400">
                    ⚡ HIGH DEMAND SPEED
                  </p>
                  <p className="text-[11px] text-white/90 leading-tight mt-0.5">
                    158 people checked out this vendor drop in the last hour!
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Selection Slideshow */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`size-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all bg-white relative ${
                      activeImageIndex === idx
                        ? "border-orange-500 ring-4 ring-orange-500/10 scale-102 shadow-soft"
                        : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.alt || ""} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Simulated Live Customer Proof Activity Feed */}
            <div className="bg-white border border-border/50 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="size-7 rounded-full bg-orange-200 border-2 border-white text-[10px] font-bold flex items-center justify-center">
                    O
                  </div>
                  <div className="size-7 rounded-full bg-emerald-200 border-2 border-white text-[10px] font-bold flex items-center justify-center">
                    K
                  </div>
                  <div className="size-7 rounded-full bg-yellow-200 border-2 border-white text-[10px] font-bold flex items-center justify-center">
                    S
                  </div>
                </div>
                <span className="text-muted-foreground font-semibold">
                  <strong className="text-foreground font-black">Obinna, Kemi, and 9 others</strong>{" "}
                  recently activated checkout vaults.
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                Verified Drops
              </span>
            </div>

            {/* Reviews list - Temu style customer feedback stats */}
            <div className="bg-white border border-border/50 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/50">
                <div>
                  <h3 className="text-sm font-black text-foreground uppercase tracking-wider">
                    Customer Reviews & Escrow Ratings
                  </h3>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center text-yellow-400">
                      <Star className="size-4 fill-yellow-400" />
                      <Star className="size-4 fill-yellow-400" />
                      <Star className="size-4 fill-yellow-400" />
                      <Star className="size-4 fill-yellow-400" />
                      <Star className="size-4 fill-yellow-400" />
                    </div>
                    <span className="text-xs font-black text-foreground">4.9 / 5.0 Rating</span>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      (68 verified reviews)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2.5 py-1 rounded">
                  100% Satisfaction
                </span>
              </div>

              {/* Verified review cards loop */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl border border-border/40 bg-[#FDFDFE] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-foreground">{rev.author}</span>
                        <span className="text-[9px] bg-orange-50 text-orange-600 border border-orange-100 px-1.5 py-0.2 rounded font-black uppercase">
                          {rev.badge}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {rev.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>

                    {rev.reply && (
                      <div className="bg-muted/40 rounded-xl p-3 text-[11px] text-muted-foreground font-semibold border-l-2 border-orange-500">
                        {rev.reply}
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleToggleHelpful(rev.id)}
                        className={`text-[10px] font-bold flex items-center gap-1.5 transition-colors ${
                          helpfulRatings[rev.id]
                            ? "text-orange-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <ThumbsUp className="size-3.5" /> Helpful (
                        {rev.helpfulCount + (helpfulRatings[rev.id] ? 1 : 0)})
                      </button>
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="size-3.5" /> Cargo Inspected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-conversion Variant Selection and Purchase Callout */}
          <div className="lg:col-span-5 space-y-5">
            {/* Purchase Control Container */}
            <div className="rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-6 shadow-soft">
              {/* Price Urgency Banner block (Temu core design) */}
              <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-soft">
                <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                    ⚡ lightning deal drop
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-yellow-200">
                    <Clock className="size-3.5" />
                    <span>Ends:</span>
                    <span>
                      {String(timeLeft.hours).padStart(2, "0")}h:
                      {String(timeLeft.minutes).padStart(2, "0")}m:
                      {String(timeLeft.seconds).padStart(2, "0")}s
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black font-display tracking-tight text-white">
                    {product.currency} {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-white/70 line-through">
                    {product.currency} {discountStats.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs bg-yellow-400 text-black px-1.5 py-0.2 rounded font-black">
                    -{discountStats.discountPercent}%
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[11px] text-white/90 font-bold">
                  <span>🚀 free delivery on drops</span>
                  <span>🛡️ 100% escrow secured</span>
                </div>
              </div>

              {/* Vendor credentials */}
              <div className="flex items-center justify-between pb-4 border-b border-border/50">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    SOVEREIGN VENDOR
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-foreground">
                      {product.vendor.name}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs text-yellow-500">
                      <Star className="size-3.5 fill-yellow-500" /> 4.9
                    </span>
                  </div>
                </div>
                <Link
                  to="/marketplace"
                  className="rounded-xl border border-border hover:border-orange-500/30 text-[10px] font-black uppercase tracking-wider px-4 py-2 transition-colors text-muted-foreground hover:text-orange-600"
                >
                  Visit Showroom
                </Link>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground font-display leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {product.description || "Premium verified cargo direct from sovereign craftsmen."}
                </p>
              </div>

              {/* Sizing Picker (Interactive standard Temu selector) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>
                    Select Size:{" "}
                    <strong className="text-orange-600 uppercase ml-1">{selectedSize}</strong>
                  </span>
                  <span className="text-muted-foreground font-semibold underline cursor-pointer hover:text-orange-600 transition-colors">
                    Sizing Charts
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`rounded-xl border py-2.5 px-4 text-xs font-black transition-all ${
                        selectedSize === sz
                          ? "bg-orange-600 border-orange-600 text-white shadow-soft scale-102"
                          : "bg-muted/30 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Edition Picker */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-foreground">
                  <span>
                    Edition Color: <strong className="text-orange-600 ml-1">{selectedColor}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: "Classic Edition", color: "bg-navy" },
                    { name: "Sovereign Gold", color: "bg-yellow-500" },
                  ].map((col) => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedColor(col.name)}
                      className={`rounded-xl border p-3 text-xs font-black flex items-center gap-2 transition-all ${
                        selectedColor === col.name
                          ? "bg-orange-600/5 border-orange-600 text-orange-600 shadow-soft"
                          : "bg-muted/30 border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <div
                        className={`size-4.5 rounded-full ${col.color} border border-black/10 shrink-0`}
                      />
                      <span className="truncate">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Select tool */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-foreground">Specify Quantity:</span>
                <div className="flex items-center rounded-xl border border-border bg-muted/40 w-max p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    className="size-8 rounded-lg text-xs font-black text-muted-foreground hover:text-foreground hover:bg-white transition-all flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-black text-foreground">
                    {selectedQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedQuantity((q) => Math.min(10, q + 1))}
                    className="size-8 rounded-lg text-xs font-black text-muted-foreground hover:text-foreground hover:bg-white transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Estimated DHL Express Delivery Map Box */}
              <div className="rounded-2xl border border-border/60 bg-[#FDFDFE] p-4 space-y-3 shadow-soft">
                <div className="flex items-start gap-3">
                  <Truck className="size-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-foreground uppercase tracking-wide">
                      Estimated Delivery Delivery
                    </h4>
                    <p className="text-xs font-extrabold text-emerald-600">{shippingDates.range}</p>
                    <p className="text-[10px] text-muted-foreground leading-normal">
                      Free shipping mainland-wide on all escrow checkouts today.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-orange-600" /> Shipping to:{" "}
                    <strong className="text-foreground">Lagos, NG</strong>
                  </span>
                  <span className="text-orange-600 underline cursor-pointer hover:text-orange-700">
                    Change Location
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-2">
                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white py-4 text-center text-xs font-black transition-all flex items-center justify-center gap-2 shadow-medium uppercase tracking-wider"
                >
                  <ShoppingBag className="size-4" /> Instantly Secure escrows Checkout{" "}
                  <ExternalLink className="size-4" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (product) {
                        addToCart(
                          {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            currency: product.currency,
                            image: product.images?.[0]?.url || "",
                            slug: product.slug,
                          },
                          selectedQuantity,
                          selectedSize,
                          selectedColor,
                        );
                      }
                      setIsAddedToCart(true);
                      setTimeout(() => setIsAddedToCart(false), 3000);
                    }}
                    className={`rounded-2xl border py-3.5 text-xs font-black transition-all text-center ${
                      isAddedToCart
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-border bg-[#FDFDFE] text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {isAddedToCart ? "✔️ Saved to Cart" : "Add to Shopping Cart"}
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="rounded-2xl border border-border bg-[#FDFDFE] hover:bg-muted text-muted-foreground hover:text-foreground py-3.5 text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 relative"
                  >
                    <Share2 className="size-4" /> Share Drop
                    {showShareTooltip && (
                      <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black py-1 px-3 rounded shadow-glow tracking-wide uppercase whitespace-nowrap animate-fade-in">
                        Link copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Payment methods supported */}
              <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-[10px] font-bold">
                <span>Accepted payment:</span>
                <span className="text-foreground bg-muted px-2 py-0.5 rounded">💳 CARDS</span>
                <span className="text-foreground bg-muted px-2 py-0.5 rounded">📱 MoMo</span>
                <span className="text-foreground bg-muted px-2 py-0.5 rounded">
                  🏛️ BANK TRANFERS
                </span>
                <span className="text-foreground bg-muted px-2 py-0.5 rounded">
                  🔐 CRYPTO (USDC/USDT)
                </span>
              </div>
            </div>

            {/* Collapsible Product Specifications */}
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="w-full p-4 flex items-center justify-between text-xs font-black text-foreground uppercase tracking-wider bg-muted/20 hover:bg-muted/45 transition-colors border-b border-border/40"
              >
                <span>Product Specifications</span>
                {isSpecsOpen ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </button>
              {isSpecsOpen && (
                <div className="p-4 text-xs space-y-2 animate-fade-in">
                  <div className="grid grid-cols-3 py-1.5 border-b border-border/30">
                    <span className="text-muted-foreground font-semibold">Material Grade</span>
                    <span className="col-span-2 text-foreground font-bold">
                      Premium organic fiber composition
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1.5 border-b border-border/30">
                    <span className="text-muted-foreground font-semibold">Origin Location</span>
                    <span className="col-span-2 text-foreground font-bold">
                      Eco-sourced mainland craft mills
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1.5 border-b border-border/30">
                    <span className="text-muted-foreground font-semibold">Availability</span>
                    <span className="col-span-2 text-foreground font-bold text-emerald-600">
                      In Stock (Dispatches within 24 Hours)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-1.5">
                    <span className="text-muted-foreground font-semibold">Warranty Scope</span>
                    <span className="col-span-2 text-foreground font-bold">
                      90-Day Escrow replacement warrant
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible Escrow safe details */}
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setIsEscrowDetailsOpen(!isEscrowDetailsOpen)}
                className="w-full p-4 flex items-center justify-between text-xs font-black text-foreground uppercase tracking-wider bg-muted/20 hover:bg-muted/45 transition-colors border-b border-border/40"
              >
                <span>Payroxa Safe-Vault Escrow Guarantee</span>
                {isEscrowDetailsOpen ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </button>
              {isEscrowDetailsOpen && (
                <div className="p-4 text-xs space-y-3 text-muted-foreground leading-relaxed animate-fade-in">
                  <p>
                    Every drop listed is strictly protected by our{" "}
                    <strong className="text-foreground">Sovereign Multi-Sig Escrow protocol</strong>
                    .
                  </p>
                  <ul className="space-y-1.5 pl-4 list-disc font-semibold text-foreground">
                    <li>Payments are locked in independent safe-vaults.</li>
                    <li>Sellers must provide registered DHL courier tracking code.</li>
                    <li>You have a full 72-hour physical inspection period.</li>
                    <li>Cancel or invoke prompt refund returns any time before approval.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. "People Also Bought" Recommended Drops Carousel */}
        {recommendedProducts.length > 0 && (
          <section className="mt-12 pt-12 border-t border-border/40">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-orange-600 bg-orange-100 rounded-full px-2.5 py-0.5 uppercase">
                  <Package className="size-3" /> MORE ESCROW DEALS
                </span>
                <h3 className="text-lg font-black text-foreground mt-1">
                  Recommended Drops & Deals
                </h3>
              </div>
              <Link
                to="/marketplace"
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                View Complete Catalog <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {recommendedProducts.slice(0, 4).map((p, index) => {
                const savingPct = (p.price % 20) + 50;
                const originalPrice = Math.round(p.price * (100 / (100 - savingPct)));

                return (
                  <article
                    key={p.id}
                    className="group bg-white rounded-2xl border border-border/50 overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={
                          p.images?.[0]?.url ||
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
                        }
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft">
                        -{savingPct}%
                      </div>
                    </div>

                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[9px] text-muted-foreground font-bold">
                          <span>{p.category?.name}</span>
                        </div>
                        <h4 className="text-xs font-black text-foreground group-hover:text-orange-600 line-clamp-1 transition-colors leading-tight">
                          {p.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-xs font-black text-orange-600">
                            {p.currency} {p.price.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-muted-foreground line-through font-semibold">
                            {p.currency} {originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                        <Link
                          to="/marketplace/product/$slug"
                          params={{ slug: p.slug }}
                          className="text-[9px] font-black text-orange-600 hover:underline flex items-center"
                        >
                          Details <ChevronRight className="size-3" />
                        </Link>
                        <a
                          href={p.appUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded transition-colors"
                        >
                          Claim
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
