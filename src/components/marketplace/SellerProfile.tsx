import { useMemo, useState } from "react";
import { CheckCircle2, ExternalLink, MapPin, Search, Store, ShoppingBag } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import { APP_URL } from "@/config/siteConfig";
import type { PayroxaProduct, PayroxaStore, PayroxaVendor } from "@/services/payroxa-public-api/types";
import { useCart } from "@/hooks/useCart";
import { EditorialProductCard } from "./EditorialProductCard";
import { MarketplaceBreadcrumb, MarketplaceHeader } from "./MarketplaceHeader";

export function SellerProfile({ seller, products = [], kind }: { seller: PayroxaStore | PayroxaVendor; products?: PayroxaProduct[]; kind: "Store" | "Merchant" }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");
  const { addToCart } = useCart();
  const inventory = useMemo(() => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, search, sort]);
  return <div className="min-h-screen bg-market-paper pb-12">
    <MarketplaceHeader /><MarketplaceBreadcrumb current={seller.name} />
    <main className="mx-auto max-w-[1200px] px-3 sm:px-4">
      {seller.coverImage && <div className="h-32 overflow-hidden rounded-t-sm bg-muted sm:h-56"><img src={seller.coverImage} alt={`${seller.name} storefront`} className="h-full w-full object-cover" /></div>}
      <section className="flex flex-col gap-5 border-b border-market-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">{seller.logo ? <img src={seller.logo} alt="" className="size-16 shrink-0 rounded-sm border border-market-line object-cover sm:size-20" /> : <Store className="size-12 shrink-0 text-primary" />}<div className="min-w-0"><p className="mb-1 text-xs text-market-muted">Payroxa {kind}</p><h1 className="break-words font-market-display text-2xl font-semibold sm:text-3xl">{seller.name}</h1><div className="mt-2 flex flex-wrap items-center gap-3 text-xs">{seller.verified && <span className="flex items-center gap-1 text-primary"><CheckCircle2 className="size-3.5" /> Verified seller</span>}{seller.location && <span className="flex items-center gap-1 text-market-muted"><MapPin className="size-3.5 shrink-0" />{seller.location}</span>}</div></div></div>
        <PayroxaButton href={seller.appUrl || APP_URL} className="shrink-0 rounded-sm shadow-none">Open store <ExternalLink className="size-4" /></PayroxaButton>
      </section>
      <div className="mt-3 grid items-start gap-3 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="bg-card p-4"><h2 className="border-b border-market-line pb-3 text-sm font-bold uppercase">Seller information</h2><p className="mt-3 text-sm leading-relaxed text-market-muted">{seller.description || "Browse this seller's products on Payroxa."}</p><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between gap-2"><dt className="text-market-muted">Verification</dt><dd className="font-medium">{seller.verified ? "Verified" : "Not verified"}</dd></div><div className="flex justify-between gap-2"><dt className="text-market-muted">Products listed</dt><dd className="font-medium">{products.length}</dd></div></dl></aside>
        <section className="min-w-0 bg-card p-3 sm:p-4"><div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-market-line pb-4"><h2 className="font-market-display text-xl font-semibold">{kind} products <span className="text-sm font-normal text-market-muted">({inventory.length})</span></h2><select aria-label="Sort store products" value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-sm border border-market-line bg-card px-3 text-sm"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
          {products.length > 0 && <div className="relative mb-4"><Search className="absolute left-3 top-3.5 size-4 text-market-muted" /><input aria-label="Search this store" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this store" className="h-11 w-full rounded-sm border border-market-line bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" /></div>}
          {notice && <p role="status" className="mb-3 border-l-2 border-primary bg-muted p-3 text-sm">{notice}</p>}
          {inventory.length > 0 ? <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">{inventory.map((product, index) => <EditorialProductCard key={product.id} product={product} index={index} viewMode="grid" onAdd={(item) => { addToCart({ ...item, image: item.images[0]?.url || "" }); setNotice(`${item.name} added to your cart`); }} />)}</div> : <div className="py-16 text-center"><ShoppingBag className="mx-auto size-10 text-market-muted" /><h3 className="mt-4 text-lg font-semibold">{products.length > 0 ? "No matching products" : "Explore the seller's full collection"}</h3><p className="mx-auto mt-2 max-w-sm text-sm text-market-muted">{products.length > 0 ? "Try another search to find what you need." : "Visit their store for the latest products and availability."}</p>{products.length > 0 ? <PayroxaButton variant="outline" onClick={() => setSearch("")} className="mt-5 rounded-sm">Clear search</PayroxaButton> : <PayroxaButton href={seller.appUrl || APP_URL} className="mt-5 rounded-sm shadow-none">Shop this seller <ExternalLink className="size-4" /></PayroxaButton>}</div>}
        </section>
      </div>
    </main>
  </div>;
}