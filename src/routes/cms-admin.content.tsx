import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Wallet,
  BarChart3,
  Shield,
  CreditCard,
  Check,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getContentSectionsFn, saveContentSectionsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";

export const Route = createFileRoute("/cms/content")({
  component: CmsContentSectionsPage,
});

function CmsContentSectionsPage() {
  const { token } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<any>(null);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getContentSectionsFn({ data: { token } });
      setSections(res);
    } catch (err) {
      console.error("Failed to load sections:", err);
      setError("Unable to load content sections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleSaveSection = async (sectionKey: any, content: any) => {
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveContentSectionsFn({
        data: {
          token,
          sectionKey,
          content,
        },
      });
      if (res.success) {
        setSuccess(`Saved ${sectionKey} successfully.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save section.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !sections) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <CmsHeader
        title="Homepage Content Sections"
        description="Configure titles, copy, and features across Storefront, Wallet, Business Dashboard, and Cards sections."
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

      <div className="space-y-6">
        {/* Storefront Section */}
        <CmsCard
          title="1. Storefront Section"
          subtitle="Shop & Sell feature spotlight"
          action={
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveSection("storeSection", sections.storeSection)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700"
            >
              <Save className="size-3" />
              <span>Save Storefront</span>
            </button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Eyebrow</label>
              <input
                type="text"
                value={sections.storeSection.eyebrow}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    storeSection: { ...sections.storeSection, eyebrow: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sections.storeSection.title}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    storeSection: { ...sections.storeSection, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={sections.storeSection.description}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    storeSection: { ...sections.storeSection, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </CmsCard>

        {/* Wallet Section */}
        <CmsCard
          title="2. Wallet Section"
          subtitle="Multi-currency balances and fast transfers"
          action={
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveSection("walletSection", sections.walletSection)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700"
            >
              <Save className="size-3" />
              <span>Save Wallet</span>
            </button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sections.walletSection.title}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    walletSection: { ...sections.walletSection, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <input
                type="text"
                value={sections.walletSection.description}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    walletSection: { ...sections.walletSection, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </CmsCard>

        {/* Cards Section */}
        <CmsCard
          title="3. Cards Section"
          subtitle="Virtual and physical cards"
          action={
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveSection("cardsSection", sections.cardsSection)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700"
            >
              <Save className="size-3" />
              <span>Save Cards Section</span>
            </button>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sections.cardsSection.title}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    cardsSection: { ...sections.cardsSection, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <input
                type="text"
                value={sections.cardsSection.description}
                onChange={(e) =>
                  setSections({
                    ...sections,
                    cardsSection: { ...sections.cardsSection, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </CmsCard>
      </div>
    </div>
  );
}
