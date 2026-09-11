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

export const Route = createFileRoute("/marketplace/store/$slug")({
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
      <div className="min-h-screen bg-background py-20 px-5 text-center">
        <div className="mx-auto size-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading storefront from Payroxa...
        </p>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-background py-24 px-5 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold font-display">Store Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "The requested store could not be found."}
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
            store.coverImage ||
            "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80"
          }
          alt={store.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="flex items-end gap-5">
            <img
              src={
                store.logo ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              }
              alt={store.name}
              className="size-28 rounded-3xl object-cover border-4 border-background shadow-medium bg-card"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                <StoreIcon className="size-4" /> Official Payroxa Storefront
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight font-display">{store.name}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                <MapPin className="size-3.5" /> {store.location || "Lagos, Nigeria"}
              </p>
            </div>
          </div>
          <a
            href={store.appUrl || "https://app.payroxa.com.ng"}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            Open Store in Payroxa <ExternalLink className="size-4" />
          </a>
        </div>

        {/* Store Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight font-display mb-6">Store Inventory</h2>
          {store.products && store.products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {store.products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] relative bg-muted">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold rounded-full">
                      {product.currency} {product.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <Link
                        to="/marketplace/product/$slug"
                        params={{ slug: product.slug }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View Details
                      </Link>
                      <a
                        href={product.appUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-primary flex items-center gap-1"
                      >
                        Buy <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-12 text-center">
              <ShoppingBag className="mx-auto size-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-base font-bold">No products currently displayed</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Visit the Payroxa app to view the complete catalog for this store.
              </p>
              <a
                href={store.appUrl || "https://app.payroxa.com.ng"}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground"
              >
                Open in Payroxa <ExternalLink className="size-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
