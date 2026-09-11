import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Save, CheckCircle2, AlertCircle, RefreshCw, Share2 } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getCmsSettingsFn, updateSocialSettingsFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { SocialSettings, SocialLink } from "@/cms/types";

export const Route = createFileRoute("/cms/settings/social")({
  component: CmsSocialSettingsPage,
});

function CmsSocialSettingsPage() {
  const { token, isSuperAdmin } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [social, setSocial] = useState<SocialSettings | null>(null);

  const loadSocial = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getCmsSettingsFn({ data: { token } });
      setSocial(res.social);
    } catch (err) {
      console.error("Failed to load social settings:", err);
      setError("Unable to load social media settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSocial();
  }, [token]);

  const handleToggle = (id: string) => {
    if (!social) return;
    const updatedLinks = social.links.map((link) =>
      link.id === id ? { ...link, enabled: !link.enabled } : link
    );
    setSocial({ ...social, links: updatedLinks });
  };

  const handleUrlChange = (id: string, href: string) => {
    if (!social) return;
    const updatedLinks = social.links.map((link) =>
      link.id === id ? { ...link, href } : link
    );
    setSocial({ ...social, links: updatedLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !social) return;

    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await updateSocialSettingsFn({
        data: {
          token,
          social,
        },
      });
      if (res.success) {
        setSocial(res.social);
        setSuccess("Social media channels saved and published to website footer.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update social channels.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !social) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <CmsHeader
        title="Social Media Channels"
        description="Enable or disable social handles and manage official community URLs displayed in the website footer."
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <CmsCard title="Configured Channels" subtitle="Toggle visibility and set profile URLs">
          <div className="space-y-4">
            {social.links.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-white border border-slate-200 font-semibold text-xs text-purple-700 uppercase">
                    {item.platform.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                    <p className="text-xs text-slate-400 capitalize">{item.platform} platform</p>
                  </div>
                </div>

                <div className="flex flex-1 sm:max-w-md items-center gap-3">
                  <input
                    type="url"
                    disabled={!isSuperAdmin}
                    value={item.href}
                    onChange={(e) => handleUrlChange(item.id, e.target.value)}
                    placeholder={`https://${item.platform}.com/...`}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <button
                    type="button"
                    disabled={!isSuperAdmin}
                    onClick={() => handleToggle(item.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                      item.enabled ? "bg-purple-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        item.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
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
                  <span>Save Social Settings</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
