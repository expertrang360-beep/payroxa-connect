import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { getProduct } from "@/services/payroxa-public-api/client";
import { PayroxaProduct } from "@/services/payroxa-public-api/types";

export const Route = createFileRoute("/marketplace/product/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<PayroxaProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getProduct(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          // Update document title for SEO
          document.title = `${res.data.name} | Buy on Payroxa`;
        } else {
          setError(res.error?.message || "Product not found");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-20 px-5 text-center">
        <div className="mx-auto size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading product details from Payroxa...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold font-display">Product Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "The requested product could not be retrieved from the Payroxa database."}
          </p>
          <button
            onClick={() => navigate({ to: "/marketplace" })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Breadcrumb / Top Bar */}
      <div className="border-b border-border/70 bg-muted/30 py-4">
        <div className="mx-auto max-w-6xl px-5 flex items-center justify-between">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Marketplace
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
            <CheckCircle2 className="size-3.5" /> Verified Payroxa Product
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft relative">
              <img
                src={product.images[activeImageIndex]?.url || product.images[0]?.url}
                alt={product.images[activeImageIndex]?.alt || product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-foreground shadow-soft">
                {product.category.name}
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`size-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.alt || ""} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Conversion CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                <span>
                  Vendor: <strong className="text-foreground">{product.vendor.name}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="size-4" /> Verified Merchant
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-display">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-3xl font-extrabold text-primary">
                  {product.currency} {product.price.toLocaleString()}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                  {product.availability === "in_stock" ? "In Stock & Ready" : "Pre-order Available"}
                </span>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground">Product Description</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <Truck className="size-5 text-primary" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Fast Delivery</h4>
                    <p className="text-[11px] text-muted-foreground">
                      Nationwide delivery in Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <Lock className="size-5 text-primary" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Secure Checkout</h4>
                    <p className="text-[11px] text-muted-foreground">Protected by Payroxa escrow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion CTA to Payroxa App */}
            <div className="mt-10 border-t border-border pt-6">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Ready to purchase?</h4>
                    <p className="text-xs text-muted-foreground">
                      Complete your order securely inside the Payroxa App.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    No Signup Required to Browse
                  </span>
                </div>
                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-2xl bg-primary py-4 text-center text-sm font-bold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Buy Now on Payroxa <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
