import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getSeoFn, saveSeoFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { PageSeoSettings } from "@/cms/types";

export const Route = createFileRoute("/cms/seo")({
  component: CmsSeoPage,
});

function CmsSeoPage() {
  const { token } = useCmsAuth();
  const [seo, setSeo] = useState<Record<string, PageSeoSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSlug, setCurrentSlug] = useState("home");

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getSeoFn({ data: { token } });
      setSeo(res.seo);
    } catch (err) {
      console.error("Failed to load SEO:", err);
      setError("Unable to load SEO settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const currentData = seo[currentSlug] || {
    pageSlug: "/",
    pageTitle: "Home",
    metaTitle: "Payroxa — Payments, Wallet, Cards & Store for African Businesses",
    metaDescription:
      "Everything your business needs to move money, get paid, sell online and grow.",
    keywords: "payments, wallet, cards, store, Nigeria, Africa",
    canonicalUrl: "https://payroxa.com.ng/",
    ogTitle: "Payroxa — Payments, Wallet, Cards & Store for African Businesses",
    ogDescription: "Everything your business needs to move money, get paid, sell online and grow.",
    ogImageUrl: "/hero-payroxa.jpg",
    twitterCard: "summary_large_image",
    updatedAt: new Date().toISOString(),
    updatedBy: "System",
  };

  const handleChange = (field: keyof PageSeoSettings, value: any) => {
    setSeo({
      ...seo,
      [currentSlug]: {
        ...currentData,
        [field]: value,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveSeoFn({
        data: {
          token,
          pageSlug: currentSlug,
          seo: currentData,
        },
      });
      if (res.success) {
        setSeo(res.seo);
        setSuccess("Search engine metadata and OpenGraph tags saved.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save SEO.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <CmsHeader
        title="SEO & Metadata Configuration"
        description="Configure search engine titles, social media OpenGraph cards, meta descriptions, and keywords."
      />

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

      <form onSubmit={handleSave} className="space-y-6">
        <CmsCard
          title="Search Engine Metadata"
          subtitle="Google search results snippet configuration"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Title Tag (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={currentData.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Optimal length: 50-60 characters ({currentData.metaTitle?.length || 0} chars)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={currentData.metaDescription}
                onChange={(e) => handleChange("metaDescription", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Optimal length: 140-160 characters ({currentData.metaDescription?.length || 0}{" "}
                chars)
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={currentData.keywords}
                  onChange={(e) => handleChange("keywords", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={currentData.canonicalUrl}
                  onChange={(e) => handleChange("canonicalUrl", e.target.value)}
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </CmsCard>

        <CmsCard
          title="Social Media Card (Open Graph & Twitter)"
          subtitle="Previews shown when sharing on WhatsApp, X, LinkedIn, Facebook"
        >
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  OpenGraph Title (og:title)
                </label>
                <input
                  type="text"
                  value={currentData.ogTitle}
                  onChange={(e) => handleChange("ogTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Social Image Preview URL (og:image)
                </label>
                <input
                  type="text"
                  value={currentData.ogImageUrl}
                  onChange={(e) => handleChange("ogImageUrl", e.target.value)}
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </CmsCard>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
          >
            <Save className="size-4" />
            <span>{saving ? "Saving..." : "Save SEO Metadata"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
