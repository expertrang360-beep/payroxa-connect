import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  HelpCircle,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Folder,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getFaqsFn, saveFaqsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { FaqItem } from "@/cms/types";

export const Route = createFileRoute("/cms/faq")({
  component: CmsFaqPage,
});

function CmsFaqPage() {
  const { token } = useCmsAuth();
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadFaqs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getFaqsFn({ data: { token } });
      setFaqs(res.faqs);
    } catch (err) {
      console.error("Failed to load faqs:", err);
      setError("Unable to load FAQ list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, [token]);

  const handleAddFaq = () => {
    const newFaq: FaqItem = {
      id: `faq_${Date.now()}`,
      question: "New Frequently Asked Question",
      answer: "Provide a clear, helpful explanation for customers.",
      category: "General",
      displayOrder: faqs.length + 1,
      status: "published",
      updatedAt: new Date().toISOString(),
    };
    setFaqs([...faqs, newFaq]);
  };

  const handleToggleStatus = (id: string) => {
    setFaqs(
      faqs.map((f) =>
        f.id === id ? { ...f, status: f.status === "published" ? "draft" : "published" } : f,
      ),
    );
  };

  const handleFieldChange = (id: string, field: keyof FaqItem, value: any) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this FAQ?")) return;
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const handleSave = async () => {
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveFaqsFn({
        data: {
          token,
          faqs,
        },
      });
      if (res.success) {
        setFaqs(res.faqs);
        setSuccess("FAQs saved and updated on the live website.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save FAQs.";
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
        title="Frequently Asked Questions (FAQ)"
        description="Organize questions, categories, and customer support explanations shown on the public landing page."
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Plus className="size-3.5" />
              <span>Add FAQ</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="size-3.5" />
              <span>{saving ? "Saving..." : "Save FAQs"}</span>
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

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <CmsCard key={item.id} className="border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                  {index + 1}
                </span>
                <div>
                  <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700 uppercase">
                    {item.category || "General"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(item.id)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border ${
                    item.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.status === "published" ? (
                    <Eye className="size-3" />
                  ) : (
                    <EyeOff className="size-3" />
                  )}
                  <span>{item.status === "published" ? "Published" : "Draft"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleFieldChange(item.id, "question", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={item.category || "General"}
                    onChange={(e) => handleFieldChange(item.id, "category", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Answer</label>
                <textarea
                  rows={2}
                  value={item.answer}
                  onChange={(e) => handleFieldChange(item.id, "answer", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </CmsCard>
        ))}
      </div>
    </div>
  );
}
