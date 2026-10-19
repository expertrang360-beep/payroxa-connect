import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Minus, Plus, Share2, ShoppingCart, Store, Truck, Package, AlertCircle } from "lucide-react";
import { getProduct, getProducts } from "@/services/payroxa-public-api/client";
import type { PayroxaProduct } from "@/services/payroxa-public-api/types";
import { PayroxaButton } from "@/components/PayroxaButton";
import { EditorialProductCard } from "@/components/marketplace/EditorialProductCard";
import { MarketplaceBreadcrumb, MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { updateSEO } from "@/utils/seo";
import { useCart } from "@/hooks/useCart";
import { pageHead } from "@/config/seo";

export const Route = createFileRoute("/marketplace_/product/$slug")({
  head: ({ params }) => pageHead(`${params.slug.replace(/-/g, " ")} | Payroxa Marketplace`, "Explore product details, merchant information and availability on Payroxa Marketplace.", `/marketplace/product/${encodeURIComponent(params.slug)}`, "product"),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<PayroxaProduct | null>(null);
  const [recommendations, setRecommendations] = useState<PayroxaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(""); setActiveImage(0); setQuantity(1); setNotice("");
    async function load() {
      try {
        const result = await getProduct(slug);
        if (cancelled) return;
        if (!result.success || !result.data) { setError(result.error?.message || "This product could not be found."); return; }
        setProduct(result.data);
        updateSEO({ title: `${result.data.name} | Payroxa Marketplace`, description: result.data.description || "Browse this product on Payroxa Marketplace.", image: result.data.images?.[0]?.url, currency: result.data.currency, price: result.data.price, type: "product" });
        const related = await getProducts({ limit: 6 });
        if (!cancelled && related.success && Array.isArray(related.data)) setRecommendations(related.data.filter((item) => item.slug !== slug));
      } catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : "Product details are unavailable."); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, [slug]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(""), 4000); return () => clearTimeout(timer); }, [notice]);
  const add = (item: PayroxaProduct, count = 1) => {
    addToCart({ id: item.id, name: item.name, price: item.price, currency: item.currency, image: item.images?.[0]?.url || "", slug: item.slug }, count, "Default", "Default");
    setNotice(`${item.name} added to your cart`);
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setNotice("Product link copied"); }
    catch { setNotice("Unable to copy the link. Please copy the page address."); }
  };
  if (loading || error || !product) return <div className="min-h-screen bg-market-paper"><MarketplaceHeader /><MarketplaceBreadcrumb current={loading ? "Loading product" : "Product unavailable"} /><main className="mx-auto max-w-[1200px] px-3 py-8">{loading ? <div className="grid animate-pulse gap-4 bg-card p-4 md:grid-cols-2"><div className="aspect-square bg-muted" /><div className="space-y-5"><div className="h-8 bg-muted" /><div className="h-20 bg-muted" /><div className="h-12 bg-muted" /><p role="status" className="text-sm text-market-muted">Loading product…</p></div></div> : <div className="bg-card py-20 text-center"><AlertCircle className="mx-auto size-10 text-market-muted" /><h1 className="mt-4 text-2xl font-semibold">Product unavailable</h1><p className="mx-auto mt-2 max-w-md px-4 text-sm text-market-muted">{error || "This product is no longer listed."}</p><PayroxaButton to="/marketplace" className="mt-5 rounded-sm shadow-none">Continue shopping</PayroxaButton></div>}</main></div>;
  const extra = product as PayroxaProduct & { compareAtPrice?: number };
  const oldPrice = typeof extra.compareAtPrice === "number" && extra.compareAtPrice > product.price ? extra.compareAtPrice : null;
  const available = product.availability !== "out_of_stock";
  return <div className="min-h-screen bg-market-paper pb-28 sm:pb-12">
    <MarketplaceHeader /><MarketplaceBreadcrumb current={product.name} />
    {notice && <div role="status" className="fixed left-1/2 top-36 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-sm border border-market-line bg-card p-4 text-sm shadow-card"><CheckCircle2 className="mr-2 inline size-4 text-primary" />{notice}</div>}
    <main className="mx-auto max-w-[1200px] space-y-3 px-3 sm:px-4">
      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
        <section className="grid min-w-0 gap-6 rounded-sm bg-card p-4 shadow-soft md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] sm:p-5">
          <div className="min-w-0"><div className="aspect-square overflow-hidden rounded-sm bg-background"><img src={product.images?.[activeImage]?.url || product.images?.[0]?.url} alt={product.images?.[activeImage]?.alt || product.name} className="h-full w-full object-contain" /></div>
            {product.images.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto p-1">{product.images.map((image, index) => <PayroxaButton key={index} variant="outline" ariaLabel={`View product image ${index + 1}`} onClick={() => setActiveImage(index)} className={`size-16 shrink-0 rounded-sm p-1 ${activeImage === index ? "border-primary ring-1 ring-primary" : "border-market-line"}`}><img src={image.url} alt="" className="h-full w-full object-contain" /></PayroxaButton>)}</div>}
            <PayroxaButton variant="text" onClick={share} className="mt-4 h-11 gap-2 text-market-muted"><Share2 className="size-4" /> Share this product</PayroxaButton>
          </div>
          <div className="min-w-0"><div className="flex flex-wrap gap-2 text-xs">{product.isFeatured && <span className="rounded-sm bg-primary px-2 py-1 text-primary-foreground">Featured</span>}{product.category?.name && <span className="rounded-sm bg-muted px-2 py-1 text-market-muted">{product.category.name}</span>}</div>
            <h1 className="mt-3 break-words font-market-display text-2xl font-medium leading-snug">{product.name}</h1>
            <p className="mt-2 text-sm text-market-muted">Seller: <Link to="/marketplace/vendor/$id" params={{ id: product.vendor.id }} className="text-primary hover:underline">{product.vendor.name}</Link></p>
            <div className="mt-5 border-y border-market-line py-4"><p className="break-words font-market-display text-3xl font-bold">{product.currency} {product.price.toLocaleString()}</p>{oldPrice && <p className="mt-1 flex flex-wrap items-center gap-2 text-sm"><span className="text-market-muted line-through">{product.currency} {oldPrice.toLocaleString()}</span><span className="rounded-sm bg-accent px-2 py-1 text-primary">-{Math.round((oldPrice - product.price) / oldPrice * 100)}%</span></p>}<p className={`mt-3 text-xs ${available ? "text-primary" : "text-destructive"}`}>{product.availability === "in_stock" ? "In stock" : product.availability === "pre_order" ? "Available for pre-order" : "Out of stock"}</p></div>
            <div className="mt-5 flex items-center justify-between gap-3"><span className="text-sm font-medium">Quantity</span><div className="flex items-center gap-1"><PayroxaButton variant="outline" ariaLabel="Decrease product quantity" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="size-11 rounded-sm px-0"><Minus className="size-4" /></PayroxaButton><span className="w-9 text-center text-sm font-semibold">{quantity}</span><PayroxaButton variant="outline" ariaLabel="Increase product quantity" disabled={quantity === 10} onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="size-11 rounded-sm px-0"><Plus className="size-4" /></PayroxaButton></div></div>
            <PayroxaButton disabled={!available} onClick={() => add(product, quantity)} className="mt-5 h-12 w-full rounded-sm shadow-none"><ShoppingCart className="size-5" /> {available ? "Add to cart" : "Out of stock"}</PayroxaButton>
            <PayroxaButton href={product.appUrl} variant="outline" className="mt-3 h-11 w-full rounded-sm">Buy on Payroxa <ExternalLink className="size-4" /></PayroxaButton>
          </div>
        </section>
        <aside className="space-y-3"><section className="rounded-sm bg-card p-4 shadow-soft"><h2 className="border-b border-market-line pb-3 text-sm font-bold uppercase">Delivery & returns</h2><div className="mt-4 flex gap-3"><Truck className="size-5 shrink-0 text-primary" /><div><h3 className="text-sm font-semibold">Delivery information</h3><p className="mt-1 text-xs leading-relaxed text-market-muted">Enter your delivery address at checkout to confirm delivery options and charges.</p></div></div><div className="mt-5 flex gap-3"><Package className="size-5 shrink-0 text-primary" /><div><h3 className="text-sm font-semibold">Returns & support</h3><p className="mt-1 text-xs leading-relaxed text-market-muted">Check the seller's return terms before placing your order.</p></div></div></section>
          <section className="rounded-sm bg-card p-4 shadow-soft"><h2 className="border-b border-market-line pb-3 text-sm font-bold uppercase">Seller information</h2><p className="mt-3 flex items-center gap-2 text-sm font-semibold"><Store className="size-4 shrink-0 text-primary" />{product.vendor.name}</p>{product.vendor.verified && <p className="mt-2 flex items-center gap-1 text-xs text-primary"><CheckCircle2 className="size-3.5" /> Verified seller</p>}<PayroxaButton to={`/marketplace/vendor/${product.vendor.id}`} variant="text" className="mt-4 h-11 w-full border-t border-market-line text-sm">Visit seller store</PayroxaButton></section>
        </aside>
      </div>
      <section className="bg-card"><PayroxaButton variant="text" onClick={() => setDetailsOpen((value) => !value)} className="h-auto min-h-14 w-full justify-between border-b border-market-line px-5 py-4 text-market-ink"><h2 className="text-lg font-semibold">Product details</h2>{detailsOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}</PayroxaButton>{detailsOpen && <div className="p-5"><p className="whitespace-pre-line text-sm leading-relaxed text-market-muted">{product.description || "Contact the seller for more information about this product."}</p><dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2"><div className="flex gap-2"><dt className="text-market-muted">Category:</dt><dd>{product.category?.name || "Uncategorised"}</dd></div><div className="flex gap-2"><dt className="text-market-muted">Seller:</dt><dd>{product.vendor.name}</dd></div></dl></div>}</section>
      <section className="bg-card p-5"><h2 className="border-b border-market-line pb-4 text-lg font-semibold">Customer feedback</h2><p className="py-5 text-sm text-market-muted">Customer reviews are not available for this listing yet.</p></section>
      {recommendations.length > 0 && <section className="bg-card p-3 sm:p-4"><div className="mb-4 flex items-center justify-between gap-3 border-b border-market-line pb-3"><h2 className="font-market-display text-xl font-semibold">You may also like</h2><Link to="/marketplace" className="shrink-0 text-xs font-semibold text-primary">See all</Link></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{recommendations.slice(0, 5).map((item, index) => <EditorialProductCard key={item.id} product={item} index={index} viewMode="grid" onAdd={(item) => add(item)} />)}</div></section>}
    </main>
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-market-line bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"><span className="min-w-0 flex-1 break-words text-sm font-bold">{product.currency} {product.price.toLocaleString()}</span><PayroxaButton disabled={!available} onClick={() => add(product, quantity)} className="h-12 shrink-0 rounded-sm px-5 shadow-none"><ShoppingCart className="size-4" />{available ? "Add to cart" : "Out of stock"}</PayroxaButton></div>
  </div>;
}
