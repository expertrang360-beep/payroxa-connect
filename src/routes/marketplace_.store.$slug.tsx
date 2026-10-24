import { SellerProfile } from "@/components/marketplace/SellerProfile";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ShoppingBag,
  Store as StoreIcon,
} from "lucide-react";
import { getStore } from "@/services/payroxa-public-api/client";
import { PayroxaStore } from "@/services/payroxa-public-api/types";
import { APP_URL } from "@/config/siteConfig";
import { pageHead } from "@/config/seo";

export const Route = createFileRoute("/marketplace_/store/$slug")({
  head: ({ params }) =>
    pageHead(
      `${params.slug.replace(/-/g, " ")} | Payroxa Storefront`,
      "Browse this merchant's storefront and products on Payroxa Marketplace.",
      `/marketplace/store/${encodeURIComponent(params.slug)}`,
    ),
  component: StoreDetailPage,
});

function StoreDetailPage() {
  const { slug } = Route.useParams();
  const [store, setStore] = useState<PayroxaStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getStore(slug);
        if (res.success && res.data) {
          setStore(res.data);
          document.title = `${res.data.name} | Payroxa Storefront`;
        } else {
          setError(res.error?.message || "Store not found");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load store");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-market-paper text-center">
        <MarketplaceHeader />
        <div className="py-20 px-5">
          <div className="mx-auto size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-medium text-muted-foreground">Loading storefront…</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-market-paper py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-sm border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold font-display">Store Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "The requested store could not be found."}
          </p>
          <Link
            to="/marketplace"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SellerProfile
      seller={store}
      products={Array.isArray(store.products) ? store.products : []}
      kind="Store"
    />
  );
}
