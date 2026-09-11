import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Package,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  Star,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getProductsFn, saveProductsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsIconPicker } from "@/cms/components/CmsIconPicker";
import type { ProductItem } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/products")({
  component: CmsProductsPage,
});

function CmsProductsPage() {
  const { token } = useCmsAuth();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getProductsFn({ data: { token } });
      setProducts(res.products);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Unable to load products data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [token]);

  const handleTogglePublish = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  };

  const handleToggleFeatured = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const handleFieldChange = (id: string, field: keyof ProductItem, value: any) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleAddProduct = () => {
    const newProduct: ProductItem = {
      id: `prod_${Date.now()}`,
      name: "New Product Service",
      shortDescription: "Description of the new Payroxa financial or merchant feature.",
      icon: "Package",
      displayOrder: products.length + 1,
      featured: false,
      published: true,
      updatedAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this product from CMS?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await saveProductsFn({
        data: {
          token,
          products,
        },
      });
      if (res.success) {
        setProducts(res.products);
        setSuccess("Products saved and published live to the homepage.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save products.";
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
        title="Products & Ecosystem Management"
        description="Manage the featured product cards presented on the Payroxa marketing homepage."
        actions={
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleAddProduct}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Plus className="size-3.5" />
              <span>Add Product</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
            >
              <Save className="size-3.5" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
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
        {products.map((item, index) => (
          <CmsCard key={item.id} className="border-slate-200">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.name || "Untitled Product"}
                  </h3>
                  <p className="text-xs text-slate-400">Order: {item.displayOrder}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(item.id)}
                  title={item.featured ? "Featured Product" : "Not Featured"}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border ${
                    item.featured
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}
                >
                  <Star
                    className={`size-3 ${item.featured ? "fill-amber-500 text-amber-500" : ""}`}
                  />
                  <span>{item.featured ? "Featured" : "Standard"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTogglePublish(item.id)}
                  title={item.published ? "Published on website" : "Hidden from website"}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border ${
                    item.published
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}
                >
                  {item.published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                  <span>{item.published ? "Published" : "Hidden"}</span>
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

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product / Service Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleFieldChange(item.id, "name", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <CmsIconPicker
                  label="Product Visual Icon"
                  value={item.icon || "Package"}
                  onChange={(iconName) => handleFieldChange(item.id, "icon", iconName)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={item.shortDescription}
                  onChange={(e) => handleFieldChange(item.id, "shortDescription", e.target.value)}
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
