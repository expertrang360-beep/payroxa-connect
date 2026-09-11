import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getBusinessTypesFn, saveBusinessTypesFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { BusinessTypeItem } from "@/cms/types";

export const Route = createFileRoute("/cms/business")({
  component: CmsBusinessTypesPage,
});

function CmsBusinessTypesPage() {
  const { token } = useCmsAuth();
  const [types, setTypes] = useState<BusinessTypeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getBusinessTypesFn({ data: { token } });
      setTypes(res.businessTypes);
    } catch (err) {
      console.error("Failed to load business types:", err);
      setError("Unable to load business types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleAdd = () => {
    const newItem: BusinessTypeItem = {
      id: `bt_${Date.now()}`,
      name: "New Business Category",
      displayOrder: types.length + 1,
      active: true,
      updatedAt: new Date().toISOString(),
    };
    setTypes([...types, newItem]);
  };

  const handleToggle = (id: string) => {
    setTypes(types.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  };

  const handleChange = (id: string, name: string) => {
    setTypes(types.map((t) => (t.id === id ? { ...t, name } : t)));
  };

  const handleDelete = (id: string) => {
    setTypes(types.filter((t) => t.id !== id));
  };

  const handleSave = async () => {
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveBusinessTypesFn({
        data: {
          token,
          businessTypes: types,
        },
      });
      if (res.success) {
        setTypes(res.businessTypes);
        setSuccess("Business categories updated and saved.");
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
        title="Business Types & Target Categories"
        description="Configure target business segments displayed in the 'Built for every business' homepage section."
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Plus className="size-3.5" />
              <span>Add Category</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="size-3.5" />
              <span>{saving ? "Saving..." : "Save Categories"}</span>
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

      <CmsCard title="Categories List" subtitle="Manage merchant labels shown in pill format">
        <div className="space-y-3">
          {types.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
            >
              <div className="flex flex-1 items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-bold text-slate-500 border border-slate-200">
                  {index + 1}
                </span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium border ${
                    item.active
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.active ? "Active" : "Disabled"}
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
          ))}
        </div>
      </CmsCard>
    </div>
  );
}
