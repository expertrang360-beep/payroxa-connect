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

export const Route = createFileRoute("/marketplace/vendor/$id")({
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
      <div className="min-h-screen bg-background py-20 px-5 text-center">
        <div className="mx-auto size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading vendor details from Payroxa...
        </p>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen bg-background py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold font-display">Vendor Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "The requested vendor could not be retrieved."}
          </p>
          <Link
            to="/marketplace"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground"
          >
            <ArrowLeft className="size-4" /> Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Cover Banner */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        <img
          src={
            vendor.coverImage ||
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
          }
          alt={vendor.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="flex items-end gap-5">
            <img
              src={
                vendor.logo ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
              }
              alt={vendor.name}
              className="size-28 rounded-3xl object-cover border-4 border-background shadow-medium bg-card"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                <ShieldCheck className="size-4" /> Verified Payroxa Merchant
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight font-display">{vendor.name}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                <MapPin className="size-3.5" /> {vendor.location || "Lagos, Nigeria"} •{" "}
                {vendor.category || "General Commerce"}
              </p>
            </div>
          </div>
          <a
            href={vendor.appUrl || APP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            Shop on Payroxa <ExternalLink className="size-4" />
          </a>
        </div>

        {/* Vendor Details & Catalog */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-bold font-display">About Merchant</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {vendor.description ||
                "Verified merchant operating on Payroxa with secure payment processing and fast fulfillment."}
            </p>
            <div className="mt-6 border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Products</span>
                <span className="font-bold text-foreground">
                  {vendor.productCount || 12}+ items
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> Active & Verified
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold font-display mb-6">Merchant Products</h3>
            <div className="rounded-3xl border border-border bg-card p-12 text-center">
              <ShoppingBag className="mx-auto size-12 text-muted-foreground/50 mb-4" />
              <h4 className="text-base font-bold">Browse full catalog in Payroxa</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                This merchant's live inventory syncs in real-time from the Payroxa database.
              </p>
              <a
                href={vendor.appUrl || APP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft"
              >
                Open Merchant Store in Payroxa <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
