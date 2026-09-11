import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Package,
  HelpCircle,
  MessageSquareQuote,
  Image as ImageIcon,
  Layers,
  ArrowRight,
  ExternalLink,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  Radio,
  RefreshCw,
  Link2,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getDashboardOverviewFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsStatCard, CmsCard } from "@/cms/components/CmsCard";
import { CmsActivityFeed } from "@/cms/components/CmsActivityFeed";
import type { CmsActivityLog, SiteSettings, ApplicationLinks } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/")({
  component: CmsDashboardPage,
});

function CmsDashboardPage() {
  const { token, user, role } = useCmsAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    publishedPages: number;
    activeProducts: number;
    totalProducts: number;
    faqs: number;
    testimonials: number;
    mediaAssets: number;
    activeAnnouncements: number;
    hasDraftContent: boolean;
    lastUpdated: string;
    lastUpdatedBy: string;
    websiteStatus: string;
  } | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [links, setLinks] = useState<ApplicationLinks | null>(null);
  const [activities, setActivities] = useState<CmsActivityLog[]>([]);

  const loadDashboard = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getDashboardOverviewFn({ data: { token } });
      setStats(res.stats);
      setSettings(res.settings);
      setLinks(res.links);
      setActivities(res.recentActivities);
    } catch (err) {
      console.error("Failed to load dashboard overview:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [token]);

  const formatDate = (isoString?: string) => {
    if (!isoString) return "N/A";
    try {
      return new Date(isoString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div>
      <CmsHeader
        title="Website Overview"
        description="Real-time status, published assets, and recent modifications across the Payroxa marketing platform."
        badge="Phase 1 Active"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        }
      />

      {/* Primary Metrics Grid (Calculated from CMS Database) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CmsStatCard
          label="Published Pages"
          value={stats?.publishedPages ?? 8}
          subtext="Core marketing routes"
          icon={Layers}
          color="purple"
        />
        <CmsStatCard
          label="Active Products"
          value={`${stats?.activeProducts ?? 5} / ${stats?.totalProducts ?? 5}`}
          subtext="Ecosystem items"
          icon={Package}
          color="emerald"
        />
        <CmsStatCard
          label="Published FAQs"
          value={stats?.faqs ?? 5}
          subtext="Customer Q&A entries"
          icon={HelpCircle}
          color="blue"
        />
        <CmsStatCard
          label="Testimonials"
          value={stats?.testimonials ?? 0}
          subtext="Verified client stories"
          icon={MessageSquareQuote}
          color="amber"
        />
      </div>

      {/* Website Status & Quick Actions Banner */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* System & Publish Status */}
        <CmsCard
          title="Live Platform Status"
          subtitle="Real-time website deployment and sync state"
          className="lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Website Health</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="size-3" />
                  {stats?.websiteStatus || "Operational"}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Connected to:{" "}
                <span className="font-semibold">
                  {settings?.websiteUrl || "https://payroxa.com.ng"}
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Content State</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    stats?.hasDraftContent
                      ? "bg-amber-100 text-amber-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {stats?.hasDraftContent ? "Draft Pending" : "100% Published"}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Last updated:{" "}
                <span className="font-semibold">{formatDate(stats?.lastUpdated)}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50/50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Connected Application Target
              </h4>
              <p className="text-xs text-purple-700">
                All marketing CTAs currently direct to:{" "}
                <span className="font-semibold underline">
                  {links?.app || "https://app.payroxa.com.ng"}
                </span>
              </p>
            </div>
            <Link
              to="/cms-admin/settings/links"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white border border-purple-200 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-2xs hover:bg-purple-50"
            >
              <Link2 className="size-3.5" />
              <span>Configure Links</span>
            </Link>
          </div>
        </CmsCard>

        {/* Quick Shortcuts */}
        <CmsCard title="Quick Management" subtitle="Frequently used administrative actions">
          <div className="space-y-2">
            <Link
              to="/cms-admin/settings/links"
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50/40 hover:text-purple-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Link2 className="size-4 text-purple-600" />
                <span>Update Application URLs</span>
              </div>
              <ArrowRight className="size-3.5 text-slate-400" />
            </Link>

            <Link
              to="/cms-admin/hero"
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50/40 hover:text-purple-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-4 text-purple-600" />
                <span>Edit Hero Headline & Copy</span>
              </div>
              <ArrowRight className="size-3.5 text-slate-400" />
            </Link>

            <Link
              to="/cms-admin/products"
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50/40 hover:text-purple-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Package className="size-4 text-emerald-600" />
                <span>Manage Public Products</span>
              </div>
              <ArrowRight className="size-3.5 text-slate-400" />
            </Link>

            <Link
              to="/cms-admin/faq"
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50/40 hover:text-purple-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="size-4 text-blue-600" />
                <span>Add / Edit Website FAQs</span>
              </div>
              <ArrowRight className="size-3.5 text-slate-400" />
            </Link>

            <Link
              to="/cms-admin/settings/admins"
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs font-medium text-slate-700 hover:border-purple-200 hover:bg-purple-50/40 hover:text-purple-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-purple-600" />
                <span>Manage Admin Roles & Access</span>
              </div>
              <ArrowRight className="size-3.5 text-slate-400" />
            </Link>
          </div>
        </CmsCard>
      </div>

      {/* Recent Activity Stream */}
      <div className="mt-8">
        <CmsCard
          title="Recent Activity"
          subtitle="Audit log of content edits, CTA modifications, and administrator access"
          action={
            <Link
              to="/cms-admin/activity"
              className="text-xs font-semibold text-purple-600 hover:text-purple-700"
            >
              View Full Audit Log →
            </Link>
          }
        >
          <CmsActivityFeed activities={activities} />
        </CmsCard>
      </div>
    </div>
  );
}
