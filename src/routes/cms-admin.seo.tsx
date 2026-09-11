import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search,
  Save,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe,
  ArrowRightLeft,
  FileCode,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  Check,
  Copy,
  AlertTriangle,
  FileText,
  Sliders,
  Share2,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { WEBSITE_URL } from "@/config/siteConfig";
import {
  getSeoFn,
  saveSeoFn,
  getSeoHealthReportFn,
  getRedirectsFn,
  saveRedirectFn,
  deleteRedirectFn,
  getSearchConsoleFn,
  saveSearchConsoleFn,
} from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsImagePicker } from "@/cms/components/CmsImagePicker";
import type { PageSeoSettings, RedirectRule, SearchConsoleSettings } from "@/cms/types";
import type { SeoHealthReport } from "@/cms/seo.server";

export const Route = createFileRoute("/cms-admin/seo")({
  component: CmsSeoPage,
});

type TabType = "health" | "pages" | "redirects" | "sitemap" | "search-console";

const PAGE_KEYS = [
  { key: "home", label: "Home Page (/)", path: "/" },
  { key: "payments", label: "Payments (/payments)", path: "/payments" },
  { key: "business", label: "Business Management (/business)", path: "/business" },
  { key: "store", label: "Online Store (/store)", path: "/store" },
  { key: "cards", label: "Cards & Expenses (/cards)", path: "/cards" },
  { key: "wallet", label: "Business Wallet (/wallet)", path: "/wallet" },
  { key: "transfers", label: "Transfers & Payouts (/transfers)", path: "/transfers" },
  { key: "payment-links", label: "Payment Links (/payment-links)", path: "/payment-links" },
  {
    key: "payment-requests",
    label: "Payment Requests (/payment-requests)",
    path: "/payment-requests",
  },
  { key: "pricing", label: "Pricing (/pricing)", path: "/pricing" },
  { key: "about", label: "About Us (/about)", path: "/about" },
  { key: "contact", label: "Contact Support (/contact)", path: "/contact" },
  { key: "resources", label: "Resources & Blog Index (/resources)", path: "/resources" },
];

function CmsSeoPage() {
  const { token } = useCmsAuth();
  const [activeTab, setActiveTab] = useState<TabType>("health");
  const [seo, setSeo] = useState<Record<string, PageSeoSettings>>({});
  const [report, setReport] = useState<SeoHealthReport | null>(null);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [searchConsole, setSearchConsole] = useState<SearchConsoleSettings>({});
  const [currentSlug, setCurrentSlug] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Redirect modal / form state
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [editingRedirect, setEditingRedirect] = useState<{
    id?: string;
    sourcePath: string;
    targetPath: string;
    statusCode: 301 | 302;
    enabled: boolean;
  }>({
    sourcePath: "",
    targetPath: "",
    statusCode: 301,
    enabled: true,
  });

  const loadAllData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [seoRes, reportRes, redRes, scRes] = await Promise.all([
        getSeoFn({ data: { token } }),
        getSeoHealthReportFn({ data: { token } }),
        getRedirectsFn({ data: { token } }),
        getSearchConsoleFn({ data: { token } }),
      ]);
      setSeo(seoRes.seo);
      setReport(reportRes.report);
      setRedirects(redRes.redirects);
      setSearchConsole(scRes.searchConsole);
    } catch (err) {
      console.error("Failed to load SEO data:", err);
      setError("Unable to load SEO data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [token]);

  const currentData: PageSeoSettings = seo[currentSlug] || {
    pageSlug: PAGE_KEYS.find((p) => p.key === currentSlug)?.path || "/",
    pageTitle: PAGE_KEYS.find((p) => p.key === currentSlug)?.label || currentSlug,
    metaTitle: "Payroxa — Financial Platform for African Businesses",
    metaDescription: "Accept payments, issue cards, and run your business with Payroxa.",
    keywords: "fintech, payments, Nigeria, Africa",
    canonicalUrl: `${WEBSITE_URL}${PAGE_KEYS.find((p) => p.key === currentSlug)?.path || ""}`,
    ogTitle: "Payroxa — Financial Platform for African Businesses",
    ogDescription: "Accept payments, issue cards, and run your business with Payroxa.",
    ogImageUrl: "/hero-payroxa.jpg",
    twitterCard: "summary_large_image",
    robotsDirective: "index, follow",
    schemaType: "SoftwareApplication",
    priority: 0.8,
    changefreq: "weekly",
    updatedAt: new Date().toISOString(),
    updatedBy: "System",
  };

  const handlePageFieldChange = <K extends keyof PageSeoSettings>(
    field: K,
    value: PageSeoSettings[K],
  ) => {
    setSeo({
      ...seo,
      [currentSlug]: {
        ...currentData,
        [field]: value,
      },
    });
  };

  const handleSavePageSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const res = await saveSeoFn({
        data: {
          token,
          pageSlug: currentSlug,
          seo: currentData,
        },
      });
      if (res.success) {
        setSeo(res.seo);
        setSuccess(`SEO configuration for "${currentSlug}" successfully saved and published.`);
        // Refresh health report
        const rep = await getSeoHealthReportFn({ data: { token } });
        setReport(rep.report);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save SEO metadata.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!editingRedirect.sourcePath || !editingRedirect.targetPath) {
      setError("Please specify both source and target paths.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await saveRedirectFn({
        data: {
          token,
          redirect: editingRedirect,
        },
      });
      if (res.success) {
        setRedirects(res.redirects);
        setShowRedirectModal(false);
        setSuccess(
          `Redirect rule "${editingRedirect.sourcePath} → ${editingRedirect.targetPath}" saved.`,
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save redirect.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this redirect rule?")) return;
    try {
      const res = await deleteRedirectFn({ data: { token, id } });
      if (res.success) {
        setRedirects(res.redirects);
        setSuccess("Redirect rule deleted.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete redirect rule.");
    }
  };

  const handleSaveSearchConsole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const res = await saveSearchConsoleFn({
        data: { token, searchConsole },
      });
      if (res.success) {
        setSearchConsole(res.searchConsole);
        setSuccess("Search Console verification tags and settings saved.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save Search Console settings.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CmsHeader
        title="SEO & Growth Engine"
        description="Comprehensive technical SEO, crawlability auditor, per-page meta tags, 301 redirects, and XML sitemap generator for Payroxa."
        action={
          <div className="flex items-center gap-2">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <Globe className="size-3.5 text-purple-600" />
              <span>View sitemap.xml</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <FileCode className="size-3.5 text-slate-600" />
              <span>View robots.txt</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
          </div>
        }
      />

      {success && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-700 hover:text-rose-900">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("health")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "health"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="size-4" />
          <span>SEO Health & Auditor</span>
          {report && (
            <span
              className={`ml-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                report.score >= 90
                  ? "bg-emerald-100 text-emerald-800"
                  : report.score >= 75
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
              }`}
            >
              {report.score}/100
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pages")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "pages"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sliders className="size-4" />
          <span>Page Metadata Studio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("redirects")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "redirects"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <ArrowRightLeft className="size-4" />
          <span>301 Redirect Manager</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
            {redirects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("sitemap")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "sitemap"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileCode className="size-4" />
          <span>Sitemap & Robots</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("search-console")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "search-console"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Globe className="size-4" />
          <span>Search Console</span>
        </button>
      </div>

      {/* TAB 1: SEO HEALTH & AUDITOR */}
      {activeTab === "health" && report && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Overall SEO Health
                </span>
                <ShieldCheck className="size-5 text-purple-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className={`text-3xl font-extrabold ${
                    report.score >= 90
                      ? "text-emerald-600"
                      : report.score >= 75
                        ? "text-amber-600"
                        : "text-rose-600"
                  }`}
                >
                  {report.score}
                </span>
                <span className="text-xs font-medium text-slate-400">/ 100</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {report.score >= 90 ? "Excellent technical compliance" : "Optimization recommended"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Crawlable Pages
                </span>
                <Globe className="size-5 text-blue-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {report.indexedPages}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  of {report.totalPages} pages
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Included in XML Sitemap</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Published Articles
                </span>
                <FileText className="size-5 text-emerald-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {report.totalBlogPosts}
                </span>
                <span className="text-xs font-medium text-slate-400">SEO guides</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Targeting Nigerian search queries</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Active Redirects
                </span>
                <ArrowRightLeft className="size-5 text-purple-600" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  {report.redirectsCount}
                </span>
                <span className="text-xs font-medium text-slate-400">rules</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">Preserves link equity and traffic</p>
            </div>
          </div>

          <CmsCard
            title="SEO Health Audit & Warnings"
            subtitle="Automated checks for character counts, meta tags, schema markup, and crawlability"
            action={
              <button
                type="button"
                onClick={loadAllData}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800"
              >
                <RefreshCw className="size-3.5" />
                <span>Rerun Audit</span>
              </button>
            }
          >
            {report.issues.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  Zero Critical Issues Detected
                </h4>
                <p className="mt-1 max-w-md text-xs text-slate-500">
                  All pages have descriptive titles, complete meta descriptions, valid canonical
                  URLs, and social sharing OpenGraph assets.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {report.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5"
                  >
                    <div className="flex items-start gap-3">
                      {issue.type === "critical" ? (
                        <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
                      ) : (
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-slate-900">
                            {issue.pageTitle}
                          </span>
                          <span className="font-mono text-[11px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                            {issue.pageSlug}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-700 font-medium">{issue.message}</p>
                        <p className="text-[11px] text-slate-400">{issue.recommendation}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const targetKey =
                          PAGE_KEYS.find((p) => p.path === issue.pageSlug)?.key || "home";
                        setCurrentSlug(targetKey);
                        setActiveTab("pages");
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 self-start sm:self-center shrink-0"
                    >
                      <span>Fix in Editor</span>
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CmsCard>

          <CmsCard
            title="Core Web Vitals & Performance Strategy"
            subtitle="Architectural principles ensuring Payroxa outranks heavy platforms like WordPress"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">Crawlable HTML SSR</div>
                <p className="text-xs text-slate-500">
                  Search engine bots receive complete semantic HTML containing all headings,
                  paragraphs, and schema without waiting for client JavaScript execution.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">Zero Plugin Bloat</div>
                <p className="text-xs text-slate-500">
                  Unlike WordPress sites bogged down by 30+ plugins, database query bloat, and PHP
                  overhead, Payroxa runs on lightweight, high-performance edge infrastructure.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div className="text-xs font-bold text-slate-900 mb-1">
                  Internal Conversion Funnel
                </div>
                <p className="text-xs text-slate-500">
                  Every public resource page automatically cross-links to Payroxa core solutions
                  (/payments, /store, /cards) with tracked conversion calls to action.
                </p>
              </div>
            </div>
          </CmsCard>
        </div>
      )}

      {/* TAB 2: PAGE METADATA STUDIO */}
      {activeTab === "pages" && (
        <form onSubmit={handleSavePageSeo} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
            <div className="flex items-center gap-3">
              <Sliders className="size-5 text-purple-700" />
              <div>
                <label className="block text-xs font-bold text-purple-950">
                  Select Public Page to Configure
                </label>
                <p className="text-[11px] text-purple-700">
                  Choose any public landing page or feature route
                </p>
              </div>
            </div>
            <select
              value={currentSlug}
              onChange={(e) => setCurrentSlug(e.target.value)}
              className="rounded-xl border border-purple-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none shadow-2xs"
            >
              {PAGE_KEYS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Google SERP Snippet Preview */}
          <CmsCard
            title="Google Search Snippet Preview"
            subtitle="Realistic preview of how this page appears on Google Desktop and Mobile search"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-4 font-sans max-w-2xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-purple-700">
                  P
                </div>
                <div className="text-xs text-slate-700 leading-none">
                  <span className="font-semibold text-slate-900">Payroxa</span>
                  <span className="text-slate-400 mx-1">›</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {currentData.canonicalUrl || WEBSITE_URL}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
                {currentData.metaTitle || "Payroxa — Payments, Wallet, Cards & Store"}
              </h3>
              <p className="text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-2">
                {currentData.metaDescription ||
                  "Everything your business needs to move money, get paid, sell online and grow."}
              </p>
            </div>
          </CmsCard>

          {/* Core Metadata Card */}
          <CmsCard
            title="Search Engine Metadata"
            subtitle="Title, description, canonical link, and robots indexation directives"
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Meta Title Tag (&lt;title&gt;)
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      (currentData.metaTitle?.length || 0) >= 50 &&
                      (currentData.metaTitle?.length || 0) <= 60
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {currentData.metaTitle?.length || 0} / 60 chars (Optimal: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  value={currentData.metaTitle}
                  onChange={(e) => handlePageFieldChange("metaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="e.g. Payment Solutions for African Businesses | Payroxa"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                  <span
                    className={`text-[11px] font-bold ${
                      (currentData.metaDescription?.length || 0) >= 140 &&
                      (currentData.metaDescription?.length || 0) <= 160
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {currentData.metaDescription?.length || 0} / 160 chars (Optimal: 140-160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={currentData.metaDescription}
                  onChange={(e) => handlePageFieldChange("metaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="e.g. Accept payments, send payment requests and manage your business transactions with Payroxa."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={currentData.canonicalUrl}
                    onChange={(e) => handlePageFieldChange("canonicalUrl", e.target.value)}
                    className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                    placeholder={`${WEBSITE_URL}/...`}
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Consolidates duplicate ranking signals for Google
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Robots Crawl Directives
                  </label>
                  <select
                    value={currentData.robotsDirective || "index, follow"}
                    onChange={(e) => handlePageFieldChange("robotsDirective", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="index, follow">
                      index, follow (Standard indexation & link following)
                    </option>
                    <option value="noindex, follow">
                      noindex, follow (Exclude from search, follow links)
                    </option>
                    <option value="noindex, nofollow">
                      noindex, nofollow (Complete exclusion)
                    </option>
                    <option value="index, nofollow">
                      index, nofollow (Index page, ignore outbound links)
                    </option>
                  </select>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Controls search crawler behavior
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Target Keywords
                  </label>
                  <input
                    type="text"
                    value={currentData.keywords || ""}
                    onChange={(e) => handlePageFieldChange("keywords", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                    placeholder="payments, POS, Nigeria"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sitemap Priority (0.1 - 1.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="1.0"
                    value={currentData.priority ?? 0.8}
                    onChange={(e) =>
                      handlePageFieldChange("priority", parseFloat(e.target.value) || 0.8)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Change Frequency
                  </label>
                  <select
                    value={currentData.changefreq || "weekly"}
                    onChange={(e) => handlePageFieldChange("changefreq", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </CmsCard>

          {/* Social Media Card */}
          <CmsCard
            title="Open Graph & Social Share Preview"
            subtitle="Rich social card shown when shared on WhatsApp, X (Twitter), LinkedIn, and Facebook"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Open Graph Title (og:title)
                  </label>
                  <input
                    type="text"
                    value={currentData.ogTitle || ""}
                    onChange={(e) => handlePageFieldChange("ogTitle", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Twitter Card Style
                  </label>
                  <select
                    value={currentData.twitterCard || "summary_large_image"}
                    onChange={(e) => handlePageFieldChange("twitterCard", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="summary_large_image">Large Image Card (Recommended)</option>
                    <option value="summary">Small Thumbnail Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Open Graph Description (og:description)
                </label>
                <textarea
                  rows={2}
                  value={currentData.ogDescription || ""}
                  onChange={(e) => handlePageFieldChange("ogDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <CmsImagePicker
                label="Social Share Image (og:image) - Recommended 1200x630px"
                value={currentData.ogImageUrl || "/hero-payroxa.jpg"}
                onChange={(val) => handlePageFieldChange("ogImageUrl", val)}
                category="heroes"
              />

              {/* Social Card Preview */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 max-w-lg">
                <img
                  src={currentData.ogImageUrl || "/hero-payroxa.jpg"}
                  alt="OG Preview"
                  className="h-44 w-full object-cover bg-slate-100"
                />
                <div className="p-3.5 bg-white border-t border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    payroxa.com.ng
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                    {currentData.ogTitle || currentData.metaTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {currentData.ogDescription || currentData.metaDescription}
                  </div>
                </div>
              </div>
            </div>
          </CmsCard>

          {/* Structured Data / Schema */}
          <CmsCard
            title="Schema.org Structured Data (JSON-LD)"
            subtitle="Helps Google display rich snippets, knowledge graph cards, and organization details"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Schema Type
                  </label>
                  <select
                    value={currentData.schemaType || "SoftwareApplication"}
                    onChange={(e) => handlePageFieldChange("schemaType", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Organization">Organization (Brand, Contact, Socials)</option>
                    <option value="SoftwareApplication">
                      SoftwareApplication (Fintech, POS, App)
                    </option>
                    <option value="FinancialService">
                      FinancialService (Wallet, Cards, Transfers)
                    </option>
                    <option value="WebSite">WebSite (Search box & general)</option>
                    <option value="FAQPage">FAQPage (Question & Answer accordion)</option>
                    <option value="Article">Article (Editorial guide or post)</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
                <pre>
                  {`{
  "@context": "https://schema.org",
  "@type": "${currentData.schemaType || "SoftwareApplication"}",
  "name": "${currentData.pageTitle}",
  "url": "${currentData.canonicalUrl}",
  "description": "${currentData.metaDescription?.substring(0, 100)}...",
  "provider": {
    "@type": "Organization",
    "name": "Payroxa",
    "url": "${WEBSITE_URL}"
  }
}`}
                </pre>
              </div>
            </div>
          </CmsCard>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              <Save className="size-4" />
              <span>{saving ? "Publishing SEO..." : "Publish Page SEO"}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: 301 REDIRECT MANAGER */}
      {activeTab === "redirects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">URL Redirect Rules</h3>
              <p className="text-xs text-slate-500">
                Ensure legacy URLs and misspelled links route cleanly to current pages without
                losing SEO rank.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingRedirect({
                  sourcePath: "",
                  targetPath: "",
                  statusCode: 301,
                  enabled: true,
                });
                setShowRedirectModal(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors"
            >
              <Plus className="size-4" />
              <span>New Redirect Rule</span>
            </button>
          </div>

          <CmsCard>
            {redirects.length === 0 ? (
              <div className="py-12 text-center">
                <ArrowRightLeft className="mx-auto size-8 text-slate-400" />
                <p className="mt-2 text-xs font-medium text-slate-500">
                  No redirect rules configured.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">Source URL Path</th>
                      <th className="pb-3">Destination URL</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Hits Executed</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {redirects.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 font-mono text-purple-700 font-semibold">
                          {r.sourcePath}
                        </td>
                        <td className="py-3.5 font-mono text-slate-700">{r.targetPath}</td>
                        <td className="py-3.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              r.statusCode === 301
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {r.statusCode} Permanent
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="font-semibold text-slate-900">{r.hitCount || 0}</span>
                          <span className="text-slate-400 text-[11px] ml-1">redirects</span>
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                              r.enabled ? "text-emerald-700" : "text-slate-400"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${r.enabled ? "bg-emerald-500" : "bg-slate-400"}`}
                            />
                            {r.enabled ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td className="py-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingRedirect(r);
                              setShowRedirectModal(true);
                            }}
                            className="text-xs font-semibold text-purple-600 hover:text-purple-900"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRedirect(r.id)}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CmsCard>
        </div>
      )}

      {/* TAB 4: SITEMAP & ROBOTS */}
      {activeTab === "sitemap" && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <CmsCard
              title="Automated XML Sitemap (sitemap.xml)"
              subtitle="Dynamically rendered for Googlebot, Bingbot, and other crawlers"
              action={
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${WEBSITE_URL}/sitemap.xml`, "sitemap")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800"
                >
                  {copiedUrl === "sitemap" ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copiedUrl === "sitemap" ? "Copied!" : "Copy URL"}</span>
                </button>
              }
            >
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Live URL
                  </div>
                  <div className="mt-0.5 font-mono text-purple-700 font-semibold">
                    ${WEBSITE_URL}/sitemap.xml
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-80">
                  <pre>
                    {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${WEBSITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${WEBSITE_URL}/payments</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${WEBSITE_URL}/store</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${WEBSITE_URL}/cards</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${WEBSITE_URL}/resources</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Auto-synced blog articles included -->
</urlset>`}
                  </pre>
                </div>
              </div>
            </CmsCard>

            <CmsCard
              title="Robots Configuration (robots.txt)"
              subtitle="Directs search engine crawlers and protects /cms-admin from search indexing"
              action={
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${WEBSITE_URL}/robots.txt`, "robots")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800"
                >
                  {copiedUrl === "robots" ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>{copiedUrl === "robots" ? "Copied!" : "Copy URL"}</span>
                </button>
              }
            >
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Live URL
                  </div>
                  <div className="mt-0.5 font-mono text-purple-700 font-semibold">
                    ${WEBSITE_URL}/robots.txt
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-80">
                  <pre>
                    {`User-agent: *
Allow: /
Disallow: /cms-admin
Disallow: /cms-admin/
Disallow: /api/

# Host configuration
Host: ${WEBSITE_URL}

# Canonical XML Sitemap
Sitemap: ${WEBSITE_URL}/sitemap.xml`}
                  </pre>
                </div>
              </div>
            </CmsCard>
          </div>
        </div>
      )}

      {/* TAB 5: SEARCH CONSOLE & VERIFICATION */}
      {activeTab === "search-console" && (
        <form onSubmit={handleSaveSearchConsole} className="space-y-6">
          <CmsCard
            title="Search Console & Webmaster Verification"
            subtitle="Add meta verification tokens for Google Search Console and Bing Webmaster Tools"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Search Console Verification Tag
                </label>
                <input
                  type="text"
                  value={searchConsole.googleVerificationTag || ""}
                  onChange={(e) =>
                    setSearchConsole({ ...searchConsole, googleVerificationTag: e.target.value })
                  }
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="google-site-verification=abcdef123456"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Enter the verification string or HTML tag provided in your Google Search Console
                  ownership verification step.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bing Webmaster Verification Tag
                </label>
                <input
                  type="text"
                  value={searchConsole.bingVerificationTag || ""}
                  onChange={(e) =>
                    setSearchConsole({ ...searchConsole, bingVerificationTag: e.target.value })
                  }
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="msvalidate.01=abcdef123456"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Search Engine Indexing Notes & Records
                </label>
                <textarea
                  rows={3}
                  value={searchConsole.notes || ""}
                  onChange={(e) => setSearchConsole({ ...searchConsole, notes: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="Record indexing notes, key audit dates, or search console remarks here..."
                />
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-900">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Globe className="size-4 text-blue-600" />
                  <span>Next Steps for Google Search Console Setup</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-800">
                  <li>
                    Visit{" "}
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-semibold"
                    >
                      search.google.com/search-console
                    </a>{" "}
                    and add property {WEBSITE_URL}.
                  </li>
                  <li>
                    Copy the HTML tag token into the input above and click "Save Verification Tags".
                  </li>
                  <li>
                    In Google Search Console, submit {`${WEBSITE_URL}/sitemap.xml`} under
                    Sitemaps for automatic crawl discovery.
                  </li>
                </ol>
              </div>
            </div>
          </CmsCard>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              <Save className="size-4" />
              <span>{saving ? "Saving..." : "Save Verification Tags"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Redirect Modal */}
      {showRedirectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              {editingRedirect.id ? "Edit Redirect Rule" : "Create 301 Redirect Rule"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Forward traffic from an old or alternative link to the target destination.
            </p>

            <form onSubmit={handleSaveRedirect} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Source Path (e.g. /old-page)
                </label>
                <input
                  type="text"
                  value={editingRedirect.sourcePath}
                  onChange={(e) =>
                    setEditingRedirect({ ...editingRedirect, sourcePath: e.target.value })
                  }
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="/online-payments"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Destination
                </label>
                <input
                  type="text"
                  value={editingRedirect.targetPath}
                  onChange={(e) =>
                    setEditingRedirect({ ...editingRedirect, targetPath: e.target.value })
                  }
                  className="w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  placeholder="/payments"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    HTTP Status
                  </label>
                  <select
                    value={editingRedirect.statusCode}
                    onChange={(e) =>
                      setEditingRedirect({
                        ...editingRedirect,
                        statusCode: parseInt(e.target.value) as 301 | 302,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rule Status
                  </label>
                  <select
                    value={editingRedirect.enabled ? "true" : "false"}
                    onChange={(e) =>
                      setEditingRedirect({ ...editingRedirect, enabled: e.target.value === "true" })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="true">Active & Routing</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRedirectModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Rule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
