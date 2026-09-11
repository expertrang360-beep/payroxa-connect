import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Save, ShieldCheck, CheckCircle2, Globe, Database } from "lucide-react";
import { CmsLayout } from "@/cms/components/CmsLayout";
import { PUBLIC_API_BASE_URL } from "@/config/siteConfig";

export const Route = createFileRoute("/cms-admin/marketplace")({
  component: CmsAdminMarketplacePage,
});

function CmsAdminMarketplacePage() {
  const [apiBaseUrl, setApiBaseUrl] = useState(PUBLIC_API_BASE_URL);
  const [featuredBanner, setFeaturedBanner] = useState(
    "Discover Verified African Merchants & Products",
  );
  const [enableCache, setEnableCache] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <CmsLayout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <Sparkles className="size-4" /> Authoritative Source Synchronization
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display">
            Marketplace Presentation & API Connector
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure how the CMS consumes authoritative marketplace data from the Payroxa app
            without duplicating underlying product databases.
          </p>
        </div>

        {saved && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="size-5" /> Marketplace presentation settings saved
            successfully!
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h2 className="text-lg font-bold font-display mb-4">Payroxa API Connection Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Authoritative Public API Base URL
                  </label>
                  <input
                    type="text"
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    All products, vendors, and stores are fetched dynamically from this production
                    endpoint.
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Public Marketplace Hero Banner Title
                    </label>
                    <input
                      type="text"
                      value={featuredBanner}
                      onChange={(e) => setFeaturedBanner(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-sm font-bold">Enable Public API Response Caching</h4>
                      <p className="text-xs text-muted-foreground">
                        Cache category listings and static vendor profiles for optimized
                        performance.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableCache}
                      onChange={(e) => setEnableCache(e.target.checked)}
                      className="size-5 rounded border-border text-primary focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Save className="size-4" /> Save Presentation Preferences
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
              <h3 className="text-sm font-bold font-display flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600" /> Single Source of Truth Rule
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Payroxa application database remains the authoritative owner of all products,
                prices, and vendor verification records. The CMS only controls presentation layers.
              </p>
              <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Ownership</span>
                  <span className="font-bold text-foreground">Payroxa App</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sync Interval</span>
                  <span className="font-bold text-emerald-600">Real-Time (API)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
