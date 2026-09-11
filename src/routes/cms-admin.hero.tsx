import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Send,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getHeroContentFn, saveHeroDraftFn, publishHeroContentFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsImagePicker } from "@/cms/components/CmsImagePicker";
import type { HeroContent } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/hero")({
  component: CmsHeroPage,
});

function CmsHeroPage() {
  const { token } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<"draft" | "published">("draft");
  const [draft, setDraft] = useState<HeroContent | null>(null);
  const [published, setPublished] = useState<HeroContent | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadHero = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getHeroContentFn({ data: { token } });
      setDraft(res.hero.draft);
      setPublished(res.hero.published);
    } catch (err) {
      console.error("Failed to load hero content:", err);
      setError("Unable to load hero section data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHero();
  }, [token]);

  const handleSaveDraft = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!token || !draft) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveHeroDraftFn({
        data: {
          token,
          draft,
        },
      });
      if (res.success) {
        setDraft(res.hero.draft);
        setSuccess("Draft changes saved successfully.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save draft.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!token) return;
    if (!window.confirm("Publish hero section changes to the live website?")) return;

    setError(null);
    setSuccess(null);
    setPublishing(true);

    try {
      const res = await publishHeroContentFn({
        data: { token },
      });
      if (res.success) {
        setDraft(res.hero.draft);
        setPublished(res.hero.published);
        setSuccess("Hero section published live to website visitors!");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to publish hero.";
      setError(message);
    } finally {
      setPublishing(false);
    }
  };

  if (loading || !draft) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  const isDraftDifferent = JSON.stringify(draft) !== JSON.stringify(published);

  return (
    <div>
      <CmsHeader
        title="Hero Section Studio"
        description="Manage the main headline, highlighted value propositions, call-to-action buttons, and hero visual."
        badge={isDraftDifferent ? "Unpublished Changes" : "Up to Date"}
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleSaveDraft()}
              disabled={saving || publishing}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50"
            >
              <Save className="size-3.5" />
              <span>{saving ? "Saving..." : "Save Draft"}</span>
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing || saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
            >
              <Send className="size-3.5" />
              <span>{publishing ? "Publishing..." : "Publish to Live"}</span>
            </button>
          </div>
        }
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

      {/* Mode Switcher */}
      <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("draft")}
          className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === "draft"
              ? "bg-purple-100 text-purple-800"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Editing Draft {isDraftDifferent && "•"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("published")}
          className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === "published"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          View Live Published
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor Form */}
        <div className="lg:col-span-2 space-y-6">
          <CmsCard title="Headlines & Text Content" subtitle="Visible copy on initial page load">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Eyebrow Pill / Badge Text
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.eyebrow : published?.eyebrow}
                  onChange={(e) => setDraft({ ...draft, eyebrow: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Main Headline (Prefix)
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.headline : published?.headline}
                  onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Highlighted Headline (Gradient Accent Text)
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.highlightedText : published?.highlightedText}
                  onChange={(e) => setDraft({ ...draft, highlightedText: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Hero Body Description
                </label>
                <textarea
                  rows={3}
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.description : published?.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Footnote / Slogan Below CTAs
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.footnote : published?.footnote}
                  onChange={(e) => setDraft({ ...draft, footnote: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>
            </div>
          </CmsCard>

          <CmsCard
            title="Action Buttons (CTAs)"
            subtitle="Primary and secondary conversion triggers"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.primaryCtaLabel : published?.primaryCtaLabel}
                  onChange={(e) => setDraft({ ...draft, primaryCtaLabel: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary CTA Destination
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.primaryCtaUrl : published?.primaryCtaUrl}
                  onChange={(e) => setDraft({ ...draft, primaryCtaUrl: e.target.value })}
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={
                    activeTab === "draft" ? draft.secondaryCtaLabel : published?.secondaryCtaLabel
                  }
                  onChange={(e) => setDraft({ ...draft, secondaryCtaLabel: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Secondary CTA Destination
                </label>
                <input
                  type="text"
                  disabled={activeTab === "published"}
                  value={activeTab === "draft" ? draft.secondaryCtaUrl : published?.secondaryCtaUrl}
                  onChange={(e) => setDraft({ ...draft, secondaryCtaUrl: e.target.value })}
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>
            </div>
          </CmsCard>

          <CmsCard title="Hero Visual Asset" subtitle="Main product mockup artwork">
            <div className="space-y-4">
              <CmsImagePicker
                label="Hero Illustration / Mockup"
                value={activeTab === "draft" ? draft.heroImageUrl : published?.heroImageUrl || ""}
                onChange={(url, asset) => {
                  setDraft({
                    ...draft,
                    heroImageUrl: url,
                    heroImageAlt: asset?.altText || draft.heroImageAlt || "Payroxa Platform Mockup",
                  });
                }}
                altText={activeTab === "draft" ? draft.heroImageAlt : published?.heroImageAlt}
                onAltTextChange={(alt) => setDraft({ ...draft, heroImageAlt: alt })}
                categoryFilter="heroes"
                recommendedDimensions="1200 × 750 px (Mockup / Screenshot)"
                disabled={activeTab === "published"}
              />
            </div>
          </CmsCard>
        </div>

        {/* Live Preview Card */}
        <div className="space-y-6">
          <CmsCard title="Section Preview" subtitle="Simulated landing page hero snippet">
            <div className="rounded-2xl border border-slate-100 bg-slate-950 p-6 text-center text-white">
              {draft.eyebrow && (
                <div className="inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-[11px] font-semibold text-purple-300">
                  {activeTab === "draft" ? draft.eyebrow : published?.eyebrow}
                </div>
              )}

              <h2 className="mt-4 text-xl font-bold tracking-tight">
                {activeTab === "draft" ? draft.headline : published?.headline}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {activeTab === "draft" ? draft.highlightedText : published?.highlightedText}
                </span>
              </h2>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {activeTab === "draft" ? draft.description : published?.description}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white">
                  {activeTab === "draft" ? draft.primaryCtaLabel : published?.primaryCtaLabel}
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200">
                  {activeTab === "draft" ? draft.secondaryCtaLabel : published?.secondaryCtaLabel}
                </span>
              </div>

              {draft.footnote && (
                <p className="mt-4 text-[10px] text-slate-500">
                  {activeTab === "draft" ? draft.footnote : published?.footnote}
                </p>
              )}
            </div>
          </CmsCard>
        </div>
      </div>
    </div>
  );
}
