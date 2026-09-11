import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, CheckCircle2, AlertCircle, RefreshCw, Palette, ExternalLink } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getCmsSettingsFn, updateGeneralSettingsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { SiteSettings } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/settings/")({
  component: CmsGeneralSettingsPage,
});

function CmsGeneralSettingsPage() {
  const { token, isSuperAdmin } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SiteSettings | null>(null);

  const loadSettings = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getCmsSettingsFn({ data: { token } });
      setFormData(res.settings);
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError("Unable to load site settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !formData) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await updateGeneralSettingsFn({
        data: {
          token,
          settings: formData,
        },
      });
      if (res.success) {
        setFormData(res.settings);
        setSuccess("General website settings saved and published successfully.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save settings.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <CmsHeader
        title="General Website Settings"
        description="Configure brand name, contact channels, public domains, and default legal notices."
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
          <span className="font-semibold">Notice:</span> You are currently logged in as an{" "}
          <span className="font-semibold">Editor</span>. Super Admin privileges are required to
          modify system-level site settings.
        </div>
      )}

      {/* Quick Brand Identity Banner */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 via-purple-50/50 to-indigo-50/30 p-5 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-soft">
            <Palette className="size-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Brand Logos, Favicon & Icon Studio</h3>
            <p className="text-xs text-slate-500">
              Upload custom light/dark logos, configure brand marks, and customize UI icons.
            </p>
          </div>
        </div>

        <Link
          to="/cms-admin/media"
          className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700"
        >
          <span>Open Media & Brand Hub</span>
          <ExternalLink className="size-3.5" />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CmsCard title="Brand & Identity" subtitle="Core public identification details">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Brand / Website Name
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Legal Entity Name
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Default Website Description
              </label>
              <textarea
                rows={3}
                disabled={!isSuperAdmin}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </CmsCard>

        <CmsCard title="Public Domains" subtitle="Official root addresses">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Public Website URL
              </label>
              <input
                type="url"
                disabled={!isSuperAdmin}
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Default Language
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.defaultLanguage}
                onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </CmsCard>

        <CmsCard title="Contact & Support Information" subtitle="Public communication channels">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Support / Contact Email
              </label>
              <input
                type="email"
                disabled={!isSuperAdmin}
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Physical Business Address
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Footer Copyright Text
              </label>
              <input
                type="text"
                disabled={!isSuperAdmin}
                value={formData.copyrightText}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span>Save General Settings</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
