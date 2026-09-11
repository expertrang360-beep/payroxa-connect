import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageSquareQuote,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Star,
  Eye,
  EyeOff,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getTestimonialsFn, saveTestimonialsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsImagePicker } from "@/cms/components/CmsImagePicker";
import type { TestimonialItem } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/testimonials")({
  component: CmsTestimonialsPage,
});

function CmsTestimonialsPage() {
  const { token } = useCmsAuth();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getTestimonialsFn({ data: { token } });
      setItems(res.testimonials);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
      setError("Unable to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleAdd = () => {
    const newItem: TestimonialItem = {
      id: `test_${Date.now()}`,
      clientName: "Client or Business Owner",
      roleOrBusiness: "CEO, Merchant Store",
      quote: "Payroxa transformed the way we collect payments from our customers across Nigeria.",
      rating: 5,
      status: "published",
      displayOrder: items.length + 1,
      updatedAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const handleToggle = (id: string) => {
    setItems(
      items.map((t) =>
        t.id === id ? { ...t, status: t.status === "published" ? "draft" : "published" } : t,
      ),
    );
  };

  const handleChange = (id: string, field: keyof TestimonialItem, value: any) => {
    setItems(items.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((t) => t.id !== id));
  };

  const handleSave = async () => {
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveTestimonialsFn({
        data: {
          token,
          testimonials: items,
        },
      });
      if (res.success) {
        setItems(res.testimonials);
        setSuccess("Testimonials saved and updated.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save.";
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
        title="Testimonials & Customer Stories"
        description="Showcase genuine feedback and reviews from businesses and individuals using Payroxa."
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Plus className="size-3.5" />
              <span>Add Testimonial</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="size-3.5" />
              <span>{saving ? "Saving..." : "Save Testimonials"}</span>
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

      {items.length === 0 ? (
        <CmsCard>
          <div className="py-12 text-center">
            <MessageSquareQuote className="mx-auto size-10 text-slate-300" />
            <h3 className="mt-3 text-sm font-semibold text-slate-700">No testimonials added yet</h3>
            <p className="mt-1 text-xs text-slate-400">
              Click "Add Testimonial" above to add your first customer review.
            </p>
          </div>
        </CmsCard>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <CmsCard key={item.id}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">#{index + 1} Review</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                      item.status === "published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {item.status === "published" ? "Published" : "Draft"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client / Person Name
                  </label>
                  <input
                    type="text"
                    value={item.clientName}
                    onChange={(e) => handleChange(item.id, "clientName", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role / Business Title
                  </label>
                  <input
                    type="text"
                    value={item.roleOrBusiness}
                    onChange={(e) => handleChange(item.id, "roleOrBusiness", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Review / Quote Content
                  </label>
                  <textarea
                    rows={2}
                    value={item.quote}
                    onChange={(e) => handleChange(item.id, "quote", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <CmsImagePicker
                    label="Customer Photo / Avatar (Optional)"
                    value={item.avatarUrl || ""}
                    onChange={(url) => handleChange(item.id, "avatarUrl", url)}
                    categoryFilter="testimonials"
                    recommendedDimensions="120 × 120 px (Square portrait)"
                  />
                </div>
              </div>
            </CmsCard>
          ))}
        </div>
      )}
    </div>
  );
}
