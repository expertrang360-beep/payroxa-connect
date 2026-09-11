import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Megaphone, Save, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { APP_URL } from "@/config/siteConfig";
import { getAnnouncementsFn, saveAnnouncementsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { AnnouncementItem } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/announcements")({
  component: CmsAnnouncementsPage,
});

function CmsAnnouncementsPage() {
  const { token } = useCmsAuth();
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getAnnouncementsFn({ data: { token } });
      setItems(res.announcements);
    } catch (err) {
      console.error("Failed to load announcements:", err);
      setError("Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleToggle = (id: string) => {
    setItems(items.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  const handleChange = (id: string, field: keyof AnnouncementItem, value: any) => {
    setItems(items.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveAnnouncementsFn({
        data: {
          token,
          announcements: items,
        },
      });
      if (res.success) {
        setItems(res.announcements);
        setSuccess("Announcement banner configuration saved and published.");
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

  const activeAnnouncement = items[0] || {
    id: "ann-1",
    title: "New Update",
    message: "Payroxa virtual cards are now available.",
    ctaLabel: "Learn More",
    ctaUrl: "/cards",
    enabled: false,
    updatedAt: new Date().toISOString(),
    updatedBy: "System",
  };

  return (
    <div>
      <CmsHeader
        title="Top Marketing Announcement Banner"
        description="Display a notification bar across the top of the public website for major product launches or updates."
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
        <CmsCard title="Banner Configuration" subtitle="Toggle and text content">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Banner Visibility</h4>
                <p className="text-[11px] text-slate-500">
                  {activeAnnouncement.enabled
                    ? "Currently visible to website visitors"
                    : "Currently hidden"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(activeAnnouncement.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  activeAnnouncement.enabled ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    activeAnnouncement.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Banner Badge Title
              </label>
              <input
                type="text"
                value={activeAnnouncement.title}
                onChange={(e) => handleChange(activeAnnouncement.id, "title", e.target.value)}
                placeholder="e.g. Announcement"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={activeAnnouncement.message}
                onChange={(e) => handleChange(activeAnnouncement.id, "message", e.target.value)}
                placeholder="e.g. Virtual cards are now live for all verified businesses."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CTA Label (optional)
                </label>
                <input
                  type="text"
                  value={activeAnnouncement.ctaLabel || ""}
                  onChange={(e) => handleChange(activeAnnouncement.id, "ctaLabel", e.target.value)}
                  placeholder="e.g. Learn More"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  CTA Destination URL
                </label>
                <input
                  type="text"
                  value={activeAnnouncement.ctaUrl || ""}
                  onChange={(e) => handleChange(activeAnnouncement.id, "ctaUrl", e.target.value)}
                  placeholder={`e.g. /cards or ${APP_URL}`}
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
            <span>{saving ? "Saving..." : "Save Announcement"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
