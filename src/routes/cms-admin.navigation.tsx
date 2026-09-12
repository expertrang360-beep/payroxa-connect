import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Compass, Plus, Save, Trash2, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getNavigationFn, saveNavigationFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { NavigationItem } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/navigation")({
  component: CmsNavigationPage,
});

function CmsNavigationPage() {
  const { token, isSuperAdmin } = useCmsAuth();
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getNavigationFn({ data: { token } });
      setItems(res.navigation);
    } catch (err) {
      console.error("Failed to load navigation:", err);
      setError("Unable to load navigation items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleAdd = () => {
    const newItem: NavigationItem = {
      id: `nav_${Date.now()}`,
      label: "New Link",
      url: "/new-link",
      type: "internal",
      displayOrder: items.length + 1,
      enabled: true,
      section: "header",
    };
    setItems([...items, newItem]);
  };

  const handleToggle = (id: string) => {
    setItems(items.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  };

  const handleChange = (id: string, field: keyof NavigationItem, value: any) => {
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
      const res = await saveNavigationFn({
        data: {
          token,
          navigation: items,
        },
      });
      if (res.success) {
        setItems(res.navigation);
        setSuccess("Website navigation menu updated successfully.");
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
        title="Website Navigation & Header Links"
        description="Manage top-level navigation links, internal route targets, and external header destinations."
        actions={
          isSuperAdmin ? (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
              >
                <Plus className="size-3.5" />
                <span>Add Link</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
              >
                <Save className="size-3.5" />
                <span>{saving ? "Saving..." : "Save Navigation"}</span>
              </button>
            </div>
          ) : undefined
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

      {!isSuperAdmin && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <span className="font-semibold">Role Constraint:</span> Only{" "}
          <span className="font-semibold">Super Admins</span> can modify header navigation
          structures.
        </div>
      )}

      <CmsCard
        title="Header Menu Links"
        subtitle="Ordered items appearing in the desktop and mobile navbar"
      >
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
            >
              <div className="flex flex-1 items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-bold text-slate-500 border border-slate-200">
                  {index + 1}
                </span>
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={item.label}
                  onChange={(e) => handleChange(item.id, "label", e.target.value)}
                  placeholder="Label"
                  className="w-40 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
                <input
                  type="text"
                  disabled={!isSuperAdmin}
                  value={item.url}
                  onChange={(e) => handleChange(item.id, "url", e.target.value)}
                  placeholder="URL Path (/business or https://...)"
                  className="w-full font-mono rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!isSuperAdmin}
                  onClick={() => handleToggle(item.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                    item.enabled
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.enabled ? "Visible" : "Hidden"}
                </button>
                {isSuperAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CmsCard>
    </div>
  );
}
