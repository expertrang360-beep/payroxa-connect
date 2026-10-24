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
} from "lucide-react";
import { getVendor } from "@/services/payroxa-public-api/client";
import { PayroxaVendor } from "@/services/payroxa-public-api/types";
import { APP_URL } from "@/config/siteConfig";
import { pageHead } from "@/config/seo";

export const Route = createFileRoute("/marketplace_/vendor/$id")({
  head: ({ params }) =>
    pageHead(
      `Merchant ${params.id} | Payroxa Marketplace`,
      "Discover merchant information and products on Payroxa Marketplace.",
      `/marketplace/vendor/${encodeURIComponent(params.id)}`,
    ),
  component: VendorDetailPage,
});

function VendorDetailPage() {
  const { id } = Route.useParams();
  const [vendor, setVendor] = useState<PayroxaVendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await getVendor(id);
        if (res.success && res.data) {
          setVendor(res.data);
          document.title = `${res.data.name} | Verified Merchant on Payroxa`;
        } else {
          setError(res.error?.message || "Vendor not found");
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load vendor");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-market-paper text-center">
        <MarketplaceHeader />
        <div className="py-20 px-5">
          <div className="mx-auto size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
          <p className="text-sm font-medium text-muted-foreground">Loading seller…</p>
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-market-paper py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-sm border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold font-display">Vendor Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "The requested vendor could not be retrieved."}
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

  return <SellerProfile seller={vendor} kind="Merchant" />;
}
