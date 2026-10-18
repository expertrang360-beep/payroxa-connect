import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, CheckCircle2, AlertCircle, RefreshCw, AlertTriangle, ExternalLink } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getCmsSettingsFn, updateApplicationLinksFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { ApplicationLinks } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/settings/links")({
  component: CmsApplicationLinksPage,
});

function CmsApplicationLinksPage() {
  const { token, isSuperAdmin } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<ApplicationLinks | null>(null);

  const loadLinks = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getCmsSettingsFn({ data: { token } });
      setLinks(res.links);
    } catch (err) {
      console.error("Failed to load application links:", err);
      setError("Unable to load application links configuration.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !links) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await updateApplicationLinksFn({
        data: {
          token,
          links,
        },
      });
      if (res.success) {
        setLinks(res.links);
        setSuccess("Application destination links updated and published to marketing CTAs.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update links.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !links) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <CmsHeader
        title="Application Links & CTA Destinations"
        description="Centralized routing for all customer sign-up, sign-in, product portals, and financial application CTAs."
      />

      {/* Critical Admin Security Warning Callout */}
      <div className="mb-6 flex items-start gap-3.5 rounded-2xl border border-amber-300 bg-amber-50/90 p-4.5 text-xs text-amber-900 shadow-2xs">
        <AlertTriangle className="size-5 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <h4 className="font-bold uppercase tracking-wider text-amber-900">
            Important Destination Warning
          </h4>
          <p className="mt-1 leading-relaxed text-amber-800">
            <span className="font-semibold underline">Changing this URL changes where website visitors are sent.</span>{" "}
            All buttons on the public website (e.g. "Get Started", "Sign In", "Open Wallet", "Create Your Store")
            retrieve these live configuration values dynamically. Always verify target links before saving.
          </p>
        </div>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {!isSuperAdmin && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <span className="font-semibold">Role Constraint:</span> Only <span className="font-semibold">Super Admins</span> can modify application destination URLs.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Auth & Portal Endpoints */}
        <CmsCard
          title="Core Application Endpoints"
          subtitle="Primary portal, registration, and user sign-in destinations"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Main Application Base URL
                </label>
                {links.app && (
                  <a
                    href={links.app}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline"
                  >
                    <span>Test destination</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.app}
                onChange={(e) => setLinks({ ...links, app: e.target.value })}
                required
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Fallback root when no specific product route is requested.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Registration URL ("Get Started" / "Create Account")
                </label>
                {links.register && (
                  <a
                    href={links.register}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline"
                  >
                    <span>Test</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.register}
                onChange={(e) => setLinks({ ...links, register: e.target.value })}
                required
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Login URL ("Sign In")
                </label>
                {links.login && (
                  <a
                    href={links.login}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline"
                  >
                    <span>Test</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.login}
                onChange={(e) => setLinks({ ...links, login: e.target.value })}
                required
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </CmsCard>

        {/* Product & Feature Destinations */}
        <CmsCard
          title="Product & Service Destinations"
          subtitle="Configurable URLs targeted by specialized product sections"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Wallet URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.wallet}
                onChange={(e) => setLinks({ ...links, wallet: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Payments / Settlement URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.payments}
                onChange={(e) => setLinks({ ...links, payments: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Storefront / Merchant Store URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.store}
                onChange={(e) => setLinks({ ...links, store: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Cards URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.cards}
                onChange={(e) => setLinks({ ...links, cards: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Business Management URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.business}
                onChange={(e) => setLinks({ ...links, business: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Transfers URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.transfers}
                onChange={(e) => setLinks({ ...links, transfers: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Delivery / Logistics URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.delivery}
                onChange={(e) => setLinks({ ...links, delivery: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Ride / Mobility URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={links.ride}
                onChange={(e) => setLinks({ ...links, ride: e.target.value })}
                className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </CmsCard>

        {isSuperAdmin && (
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 disabled:pointer-events-none disabled:opacity-60"
            >
              {saving ? (
                <>
                  <RefreshCw className="size-4 animate-spin" />
                  <span>Saving & Publishing Links...</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span>Save Application Destinations</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
