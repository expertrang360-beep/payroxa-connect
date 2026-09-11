import { i as __toESM } from "../_runtime.mjs";
import { B as saveSeoFn, C as getSeoFn, R as saveRedirectFn, S as getSearchConsoleFn, a as deleteRedirectFn, w as getSeoHealthReportFn, x as getRedirectsFn, z as saveSearchConsoleFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { A as RefreshCw, C as ShieldCheck, Ct as CircleCheck, Dt as Check, P as Plus, Rt as ArrowRightLeft, Tt as CircleAlert, ct as FileText, dt as FileCode, f as TriangleAlert, ht as ExternalLink, it as Globe, k as Save, vt as Copy, y as SlidersVertical } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { t as CmsImagePicker } from "./CmsImagePicker-9Z_c_NmU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.seo-DS_gdA0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.seo.tsx?tsr-split=component";
var PAGE_KEYS = [
	{
		key: "home",
		label: "Home Page (/)",
		path: "/"
	},
	{
		key: "payments",
		label: "Payments (/payments)",
		path: "/payments"
	},
	{
		key: "business",
		label: "Business Management (/business)",
		path: "/business"
	},
	{
		key: "store",
		label: "Online Store (/store)",
		path: "/store"
	},
	{
		key: "cards",
		label: "Cards & Expenses (/cards)",
		path: "/cards"
	},
	{
		key: "wallet",
		label: "Business Wallet (/wallet)",
		path: "/wallet"
	},
	{
		key: "transfers",
		label: "Transfers & Payouts (/transfers)",
		path: "/transfers"
	},
	{
		key: "payment-links",
		label: "Payment Links (/payment-links)",
		path: "/payment-links"
	},
	{
		key: "payment-requests",
		label: "Payment Requests (/payment-requests)",
		path: "/payment-requests"
	},
	{
		key: "pricing",
		label: "Pricing (/pricing)",
		path: "/pricing"
	},
	{
		key: "about",
		label: "About Us (/about)",
		path: "/about"
	},
	{
		key: "contact",
		label: "Contact Support (/contact)",
		path: "/contact"
	},
	{
		key: "resources",
		label: "Resources & Blog Index (/resources)",
		path: "/resources"
	}
];
function CmsSeoPage() {
	const { token } = useCmsAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("health");
	const [seo, setSeo] = (0, import_react.useState)({});
	const [report, setReport] = (0, import_react.useState)(null);
	const [redirects, setRedirects] = (0, import_react.useState)([]);
	const [searchConsole, setSearchConsole] = (0, import_react.useState)({});
	const [currentSlug, setCurrentSlug] = (0, import_react.useState)("home");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [copiedUrl, setCopiedUrl] = (0, import_react.useState)(null);
	const [showRedirectModal, setShowRedirectModal] = (0, import_react.useState)(false);
	const [editingRedirect, setEditingRedirect] = (0, import_react.useState)({
		sourcePath: "",
		targetPath: "",
		statusCode: 301,
		enabled: true
	});
	const loadAllData = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const [seoRes, reportRes, redRes, scRes] = await Promise.all([
				getSeoFn({ data: { token } }),
				getSeoHealthReportFn({ data: { token } }),
				getRedirectsFn({ data: { token } }),
				getSearchConsoleFn({ data: { token } })
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
	(0, import_react.useEffect)(() => {
		loadAllData();
	}, [token]);
	const currentData = seo[currentSlug] || {
		pageSlug: PAGE_KEYS.find((p) => p.key === currentSlug)?.path || "/",
		pageTitle: PAGE_KEYS.find((p) => p.key === currentSlug)?.label || currentSlug,
		metaTitle: "Payroxa — Financial Platform for African Businesses",
		metaDescription: "Accept payments, issue cards, and run your business with Payroxa.",
		keywords: "fintech, payments, Nigeria, Africa",
		canonicalUrl: `https://payroxa.com.ng${PAGE_KEYS.find((p) => p.key === currentSlug)?.path || ""}`,
		ogTitle: "Payroxa — Financial Platform for African Businesses",
		ogDescription: "Accept payments, issue cards, and run your business with Payroxa.",
		ogImageUrl: "/hero-payroxa.jpg",
		twitterCard: "summary_large_image",
		robotsDirective: "index, follow",
		schemaType: "SoftwareApplication",
		priority: .8,
		changefreq: "weekly",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	};
	const handlePageFieldChange = (field, value) => {
		setSeo({
			...seo,
			[currentSlug]: {
				...currentData,
				[field]: value
			}
		});
	};
	const handleSavePageSeo = async (e) => {
		e.preventDefault();
		if (!token) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await saveSeoFn({ data: {
				token,
				pageSlug: currentSlug,
				seo: currentData
			} });
			if (res.success) {
				setSeo(res.seo);
				setSuccess(`SEO configuration for "${currentSlug}" successfully saved and published.`);
				const rep = await getSeoHealthReportFn({ data: { token } });
				setReport(rep.report);
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to save SEO metadata.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	const handleSaveRedirect = async (e) => {
		e.preventDefault();
		if (!token) return;
		if (!editingRedirect.sourcePath || !editingRedirect.targetPath) {
			setError("Please specify both source and target paths.");
			return;
		}
		setSaving(true);
		setError(null);
		try {
			const res = await saveRedirectFn({ data: {
				token,
				redirect: editingRedirect
			} });
			if (res.success) {
				setRedirects(res.redirects);
				setShowRedirectModal(false);
				setSuccess(`Redirect rule "${editingRedirect.sourcePath} → ${editingRedirect.targetPath}" saved.`);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to save redirect.";
			setError(msg);
		} finally {
			setSaving(false);
		}
	};
	const handleDeleteRedirect = async (id) => {
		if (!token || !confirm("Are you sure you want to delete this redirect rule?")) return;
		try {
			const res = await deleteRedirectFn({ data: {
				token,
				id
			} });
			if (res.success) {
				setRedirects(res.redirects);
				setSuccess("Redirect rule deleted.");
			}
		} catch (err) {
			console.error(err);
			setError("Failed to delete redirect rule.");
		}
	};
	const handleSaveSearchConsole = async (e) => {
		e.preventDefault();
		if (!token) return;
		setSaving(true);
		setError(null);
		try {
			const res = await saveSearchConsoleFn({ data: {
				token,
				searchConsole
			} });
			if (res.success) {
				setSearchConsole(res.searchConsole);
				setSuccess("Search Console verification tags and settings saved.");
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to save Search Console settings.";
			setError(msg);
		} finally {
			setSaving(false);
		}
	};
	const copyToClipboard = (text, id) => {
		navigator.clipboard.writeText(text);
		setCopiedUrl(id);
		setTimeout(() => setCopiedUrl(null), 2e3);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 262,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 261,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
				title: "SEO & Growth Engine",
				description: "Comprehensive technical SEO, crawlability auditor, per-page meta tags, 301 redirects, and XML sitemap generator for Payroxa.",
				action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/sitemap.xml",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-3.5 text-purple-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 268,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View sitemap.xml" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/robots.txt",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-3.5 text-slate-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View robots.txt" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 274,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 272,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 266,
					columnNumber: 193
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 266,
				columnNumber: 7
			}, this),
			success && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 280,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => setSuccess(null),
					className: "text-emerald-700 hover:text-emerald-900",
					children: "Dismiss"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 284,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 279,
				columnNumber: 19
			}, this),
			error && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 291,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 290,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => setError(null),
					className: "text-rose-700 hover:text-rose-900",
					children: "Dismiss"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 294,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 289,
				columnNumber: 17
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2 border-b border-slate-200 pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("health"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "health" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 302,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "SEO Health & Auditor" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 11
							}, this),
							report && /* @__PURE__ */ (void 0)("span", {
								className: `ml-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${report.score >= 90 ? "bg-emerald-100 text-emerald-800" : report.score >= 75 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"}`,
								children: [report.score, "/100"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 304,
								columnNumber: 22
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 301,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("pages"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "pages" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 310,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Page Metadata Studio" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("redirects"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "redirects" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRightLeft, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "301 Redirect Manager" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700",
								children: redirects.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("sitemap"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "sitemap" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 323,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sitemap & Robots" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 322,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("search-console"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "search-console" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Search Console" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 327,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 300,
				columnNumber: 7
			}, this),
			activeTab === "health" && report && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
											children: "Overall SEO Health"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 338,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-5 text-purple-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 341,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-baseline gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: `text-3xl font-extrabold ${report.score >= 90 ? "text-emerald-600" : report.score >= 75 ? "text-amber-600" : "text-rose-600"}`,
											children: report.score
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 344,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-medium text-slate-400",
											children: "/ 100"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 347,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 343,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-slate-500",
										children: report.score >= 90 ? "Excellent technical compliance" : "Optimization recommended"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 349,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
											children: "Crawlable Pages"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 356,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)(Globe, { className: "size-5 text-blue-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 359,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 355,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-baseline gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-3xl font-extrabold text-slate-900",
											children: report.indexedPages
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 362,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-medium text-slate-400",
											children: [
												"of ",
												report.totalPages,
												" pages"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 365,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-slate-500",
										children: "Included in XML Sitemap"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 369,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 354,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
											children: "Published Articles"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 374,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)(FileText, { className: "size-5 text-emerald-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 377,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 373,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-baseline gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-3xl font-extrabold text-slate-900",
											children: report.totalBlogPosts
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 380,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-medium text-slate-400",
											children: "SEO guides"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 383,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 379,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-slate-500",
										children: "Targeting Nigerian search queries"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 385,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 372,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
											children: "Active Redirects"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 390,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)(ArrowRightLeft, { className: "size-5 text-purple-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 393,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-3 flex items-baseline gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-3xl font-extrabold text-slate-900",
											children: report.redirectsCount
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 396,
											columnNumber: 17
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-medium text-slate-400",
											children: "rules"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 399,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 395,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-xs text-slate-500",
										children: "Preserves link equity and traffic"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 401,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 388,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "SEO Health Audit & Warnings",
						subtitle: "Automated checks for character counts, meta tags, schema markup, and crawlability",
						action: /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: loadAllData,
							className: "inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800",
							children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 406,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Rerun Audit" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 407,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 405,
							columnNumber: 157
						}, this),
						children: report.issues.length === 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col items-center justify-center py-10 text-center",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600",
									children: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 410,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "mt-3 text-sm font-bold text-slate-900",
									children: "Zero Critical Issues Detected"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 413,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 max-w-md text-xs text-slate-500",
									children: "All pages have descriptive titles, complete meta descriptions, valid canonical URLs, and social sharing OpenGraph assets."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 409,
							columnNumber: 43
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "divide-y divide-slate-100",
							children: report.issues.map((issue, idx) => /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-start gap-3",
									children: [issue.type === "critical" ? /* @__PURE__ */ (void 0)(CircleAlert, { className: "mt-0.5 size-4 shrink-0 text-rose-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 423,
										columnNumber: 52
									}, this) : /* @__PURE__ */ (void 0)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-amber-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 423,
										columnNumber: 119
									}, this), /* @__PURE__ */ (void 0)("div", { children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "font-semibold text-xs text-slate-900",
												children: issue.pageTitle
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 426,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "font-mono text-[11px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded",
												children: issue.pageSlug
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 429,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 425,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-0.5 text-xs text-slate-700 font-medium",
											children: issue.message
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 433,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-slate-400",
											children: issue.recommendation
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 434,
											columnNumber: 25
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 424,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 422,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										const targetKey = PAGE_KEYS.find((p) => p.path === issue.pageSlug)?.key || "home";
										setCurrentSlug(targetKey);
										setActiveTab("pages");
									},
									className: "inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-800 self-start sm:self-center shrink-0",
									children: [/* @__PURE__ */ (void 0)("span", { children: "Fix in Editor" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 442,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 443,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 437,
									columnNumber: 21
								}, this)]
							}, idx, true, {
								fileName: _jsxFileName,
								lineNumber: 421,
								columnNumber: 52
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 24
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 405,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Core Web Vitals & Performance Strategy",
						subtitle: "Architectural principles ensuring Payroxa outranks heavy platforms like WordPress",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-slate-100 bg-slate-50/60 p-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs font-bold text-slate-900 mb-1",
										children: "Crawlable HTML SSR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 452,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-slate-500",
										children: "Search engine bots receive complete semantic HTML containing all headings, paragraphs, and schema without waiting for client JavaScript execution."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 453,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 451,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-slate-100 bg-slate-50/60 p-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs font-bold text-slate-900 mb-1",
										children: "Zero Plugin Bloat"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 459,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-slate-500",
										children: "Unlike WordPress sites bogged down by 30+ plugins, database query bloat, and PHP overhead, Payroxa runs on lightweight, high-performance edge infrastructure."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 460,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 458,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-xl border border-slate-100 bg-slate-50/60 p-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-xs font-bold text-slate-900 mb-1",
										children: "Internal Conversion Funnel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-slate-500",
										children: "Every public resource page automatically cross-links to Payroxa core solutions (/payments, /store, /cards) with tracked conversion calls to action."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 450,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 449,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 44
			}, this),
			activeTab === "pages" && /* @__PURE__ */ (void 0)("form", {
				onSubmit: handleSavePageSeo,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-purple-100 bg-purple-50/60 p-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (void 0)(SlidersVertical, { className: "size-5 text-purple-700" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 482,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-bold text-purple-950",
								children: "Select Public Page to Configure"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 484,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] text-purple-700",
								children: "Choose any public landing page or feature route"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 487,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 483,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: currentSlug,
							onChange: (e) => setCurrentSlug(e.target.value),
							className: "rounded-xl border border-purple-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none shadow-2xs",
							children: PAGE_KEYS.map((p) => /* @__PURE__ */ (void 0)("option", {
								value: p.key,
								children: p.label
							}, p.key, false, {
								fileName: _jsxFileName,
								lineNumber: 493,
								columnNumber: 35
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 492,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 480,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Google Search Snippet Preview",
						subtitle: "Realistic preview of how this page appears on Google Desktop and Mobile search",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-slate-200 bg-white p-4 font-sans max-w-2xl",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex size-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-purple-700",
										children: "P"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 503,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-xs text-slate-700 leading-none",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "font-semibold text-slate-900",
												children: "Payroxa"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 507,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-slate-400 mx-1",
												children: "›"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 508,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-slate-500 font-mono text-[11px]",
												children: currentData.canonicalUrl || "https://payroxa.com.ng"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 509,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 502,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1",
									children: currentData.metaTitle || "Payroxa — Payments, Wallet, Cards & Store"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 514,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-[#4d5156] mt-1 leading-relaxed line-clamp-2",
									children: currentData.metaDescription || "Everything your business needs to move money, get paid, sell online and grow."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 517,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 501,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 500,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Search Engine Metadata",
						subtitle: "Title, description, canonical link, and robots indexation directives",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-xs font-semibold text-slate-700",
										children: "Meta Title Tag (<title>)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 528,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: `text-[11px] font-bold ${(currentData.metaTitle?.length || 0) >= 50 && (currentData.metaTitle?.length || 0) <= 60 ? "text-emerald-600" : "text-slate-400"}`,
										children: [currentData.metaTitle?.length || 0, " / 60 chars (Optimal: 50-60)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 531,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 527,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: currentData.metaTitle,
									onChange: (e) => handlePageFieldChange("metaTitle", e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-purple-600 focus:outline-none",
									placeholder: "e.g. Payment Solutions for African Businesses | Payroxa"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 535,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 526,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-xs font-semibold text-slate-700",
										children: "Meta Description"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 540,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: `text-[11px] font-bold ${(currentData.metaDescription?.length || 0) >= 140 && (currentData.metaDescription?.length || 0) <= 160 ? "text-emerald-600" : "text-slate-400"}`,
										children: [currentData.metaDescription?.length || 0, " / 160 chars (Optimal: 140-160)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 541,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 539,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									rows: 3,
									value: currentData.metaDescription,
									onChange: (e) => handlePageFieldChange("metaDescription", e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none",
									placeholder: "e.g. Accept payments, send payment requests and manage your business transactions with Payroxa."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 545,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 538,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [
										/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Canonical URL"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 550,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("input", {
											type: "url",
											value: currentData.canonicalUrl,
											onChange: (e) => handlePageFieldChange("canonicalUrl", e.target.value),
											className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
											placeholder: "https://payroxa.com.ng/..."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 553,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-[11px] text-slate-400",
											children: "Consolidates duplicate ranking signals for Google"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 554,
											columnNumber: 19
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 549,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [
										/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Robots Crawl Directives"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 560,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("select", {
											value: currentData.robotsDirective || "index, follow",
											onChange: (e) => handlePageFieldChange("robotsDirective", e.target.value),
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											children: [
												/* @__PURE__ */ (void 0)("option", {
													value: "index, follow",
													children: "index, follow (Standard indexation & link following)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 564,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "noindex, follow",
													children: "noindex, follow (Exclude from search, follow links)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 567,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "noindex, nofollow",
													children: "noindex, nofollow (Complete exclusion)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 570,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "index, nofollow",
													children: "index, nofollow (Index page, ignore outbound links)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 573,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 563,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "mt-1 text-[11px] text-slate-400",
											children: "Controls search crawler behavior"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 577,
											columnNumber: 19
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 559,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 548,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Primary Target Keywords"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 585,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: currentData.keywords || "",
											onChange: (e) => handlePageFieldChange("keywords", e.target.value),
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
											placeholder: "payments, POS, Nigeria"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 588,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 584,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Sitemap Priority (0.1 - 1.0)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 592,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "number",
											step: "0.1",
											min: "0.1",
											max: "1.0",
											value: currentData.priority ?? .8,
											onChange: (e) => handlePageFieldChange("priority", parseFloat(e.target.value) || .8),
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 595,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 591,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Change Frequency"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 599,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: currentData.changefreq || "weekly",
											onChange: (e) => handlePageFieldChange("changefreq", e.target.value),
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											children: [
												/* @__PURE__ */ (void 0)("option", {
													value: "daily",
													children: "Daily"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 603,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "weekly",
													children: "Weekly"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 604,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "monthly",
													children: "Monthly"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 605,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 602,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 598,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 583,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 525,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 524,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Open Graph & Social Share Preview",
						subtitle: "Rich social card shown when shared on WhatsApp, X (Twitter), LinkedIn, and Facebook",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1",
										children: "Open Graph Title (og:title)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 617,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: currentData.ogTitle || "",
										onChange: (e) => handlePageFieldChange("ogTitle", e.target.value),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 620,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 616,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1",
										children: "Twitter Card Style"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: currentData.twitterCard || "summary_large_image",
										onChange: (e) => handlePageFieldChange("twitterCard", e.target.value),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
										children: [/* @__PURE__ */ (void 0)("option", {
											value: "summary_large_image",
											children: "Large Image Card (Recommended)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 628,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("option", {
											value: "summary",
											children: "Small Thumbnail Card"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 629,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 623,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 615,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Open Graph Description (og:description)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 635,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("textarea", {
									rows: 2,
									value: currentData.ogDescription || "",
									onChange: (e) => handlePageFieldChange("ogDescription", e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-600 focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 638,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 634,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(CmsImagePicker, {
									label: "Social Share Image (og:image) - Recommended 1200x630px",
									value: currentData.ogImageUrl || "/hero-payroxa.jpg",
									onChange: (val) => handlePageFieldChange("ogImageUrl", val),
									category: "heroes"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 641,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 max-w-lg",
									children: [/* @__PURE__ */ (void 0)("img", {
										src: currentData.ogImageUrl || "/hero-payroxa.jpg",
										alt: "OG Preview",
										className: "h-44 w-full object-cover bg-slate-100"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 645,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "p-3.5 bg-white border-t border-slate-100",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "text-[10px] uppercase font-bold text-slate-400 tracking-wider",
												children: "payroxa.com.ng"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 647,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-xs font-bold text-slate-900 line-clamp-1 mt-0.5",
												children: currentData.ogTitle || currentData.metaTitle
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 650,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "text-[11px] text-slate-500 line-clamp-2 mt-0.5",
												children: currentData.ogDescription || currentData.metaDescription
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 653,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 644,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 614,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 613,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Schema.org Structured Data (JSON-LD)",
						subtitle: "Helps Google display rich snippets, knowledge graph cards, and organization details",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Schema Type"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 666,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("select", {
									value: currentData.schemaType || "SoftwareApplication",
									onChange: (e) => handlePageFieldChange("schemaType", e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "Organization",
											children: "Organization (Brand, Contact, Socials)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 670,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "SoftwareApplication",
											children: "SoftwareApplication (Fintech, POS, App)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 671,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "FinancialService",
											children: "FinancialService (Wallet, Cards, Transfers)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 674,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "WebSite",
											children: "WebSite (Search box & general)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 677,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "FAQPage",
											children: "FAQPage (Question & Answer accordion)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 678,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "Article",
											children: "Article (Editorial guide or post)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 679,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 669,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 665,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 664,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto",
								children: /* @__PURE__ */ (void 0)("pre", { children: `{
  "@context": "https://schema.org",
  "@type": "${currentData.schemaType || "SoftwareApplication"}",
  "name": "${currentData.pageTitle}",
  "url": "${currentData.canonicalUrl}",
  "description": "${currentData.metaDescription?.substring(0, 100)}...",
  "provider": {
    "@type": "Organization",
    "name": "Payroxa",
    "url": "https://payroxa.com.ng"
  }
}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 685,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 684,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 663,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 662,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end pt-2",
						children: /* @__PURE__ */ (void 0)("button", {
							type: "submit",
							disabled: saving,
							className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50 transition-colors",
							children: [/* @__PURE__ */ (void 0)(Save, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 705,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("span", { children: saving ? "Publishing SEO..." : "Publish Page SEO" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 706,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 704,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 703,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 479,
				columnNumber: 33
			}, this),
			activeTab === "redirects" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "URL Redirect Rules"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 715,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-slate-500",
						children: "Ensure legacy URLs and misspelled links route cleanly to current pages without losing SEO rank."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 716,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 714,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => {
							setEditingRedirect({
								sourcePath: "",
								targetPath: "",
								statusCode: 301,
								enabled: true
							});
							setShowRedirectModal(true);
						},
						className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 730,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: "New Redirect Rule" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 731,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 721,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 713,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(CmsCard, { children: redirects.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center",
					children: [/* @__PURE__ */ (void 0)(ArrowRightLeft, { className: "mx-auto size-8 text-slate-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 737,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-2 text-xs font-medium text-slate-500",
						children: "No redirect rules configured."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 738,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 736,
					columnNumber: 39
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (void 0)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (void 0)("thead", { children: /* @__PURE__ */ (void 0)("tr", {
							className: "border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider",
							children: [
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3",
									children: "Source URL Path"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 745,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3",
									children: "Destination URL"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 746,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3",
									children: "Type"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 747,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3",
									children: "Hits Executed"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 748,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 749,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("th", {
									className: "pb-3 text-right",
									children: "Actions"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 750,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 744,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 743,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("tbody", {
							className: "divide-y divide-slate-100",
							children: redirects.map((r) => /* @__PURE__ */ (void 0)("tr", {
								className: "hover:bg-slate-50/70 transition-colors",
								children: [
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5 font-mono text-purple-700 font-semibold",
										children: r.sourcePath
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 755,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5 font-mono text-slate-700",
										children: r.targetPath
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 758,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5",
										children: /* @__PURE__ */ (void 0)("span", {
											className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${r.statusCode === 301 ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`,
											children: [r.statusCode, " Permanent"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 760,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 759,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-slate-900",
											children: r.hitCount || 0
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 765,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400 text-[11px] ml-1",
											children: "redirects"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 766,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 764,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5",
										children: /* @__PURE__ */ (void 0)("span", {
											className: `inline-flex items-center gap-1 text-[11px] font-bold ${r.enabled ? "text-emerald-700" : "text-slate-400"}`,
											children: [/* @__PURE__ */ (void 0)("span", { className: `size-1.5 rounded-full ${r.enabled ? "bg-emerald-500" : "bg-slate-400"}` }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 770,
												columnNumber: 29
											}, this), r.enabled ? "Active" : "Disabled"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 769,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 768,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)("td", {
										className: "py-3.5 text-right space-x-2",
										children: [/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => {
												setEditingRedirect(r);
												setShowRedirectModal(true);
											},
											className: "text-xs font-semibold text-purple-600 hover:text-purple-900",
											children: "Edit"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 775,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => handleDeleteRedirect(r.id),
											className: "text-xs font-semibold text-rose-600 hover:text-rose-900",
											children: "Delete"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 781,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 774,
										columnNumber: 25
									}, this)
								]
							}, r.id, true, {
								fileName: _jsxFileName,
								lineNumber: 754,
								columnNumber: 41
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 753,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 742,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 741,
					columnNumber: 24
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 735,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 712,
				columnNumber: 37
			}, this),
			activeTab === "sitemap" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (void 0)(CmsCard, {
						title: "Automated XML Sitemap (sitemap.xml)",
						subtitle: "Dynamically rendered for Googlebot, Bingbot, and other crawlers",
						action: /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => copyToClipboard("https://payroxa.com.ng/sitemap.xml", "sitemap"),
							className: "inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800",
							children: [copiedUrl === "sitemap" ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 796,
								columnNumber: 46
							}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 796,
								columnNumber: 96
							}, this), /* @__PURE__ */ (void 0)("span", { children: copiedUrl === "sitemap" ? "Copied!" : "Copy URL" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 797,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 795,
							columnNumber: 149
						}, this),
						children: /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider",
									children: "Live URL"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 801,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-0.5 font-mono text-purple-700 font-semibold",
									children: "https://payroxa.com.ng/sitemap.xml"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 804,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 800,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-80",
								children: /* @__PURE__ */ (void 0)("pre", { children: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://payroxa.com.ng</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://payroxa.com.ng/payments</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://payroxa.com.ng/store</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://payroxa.com.ng/cards</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://payroxa.com.ng/resources</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Auto-synced blog articles included -->
</urlset>` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 810,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 809,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 799,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 795,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)(CmsCard, {
						title: "Robots Configuration (robots.txt)",
						subtitle: "Directs search engine crawlers and protects /cms-admin from search indexing",
						action: /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => copyToClipboard("https://payroxa.com.ng/robots.txt", "robots"),
							className: "inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800",
							children: [copiedUrl === "robots" ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 846,
								columnNumber: 45
							}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 846,
								columnNumber: 95
							}, this), /* @__PURE__ */ (void 0)("span", { children: copiedUrl === "robots" ? "Copied!" : "Copy URL" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 847,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 845,
							columnNumber: 159
						}, this),
						children: /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "text-[11px] font-bold text-slate-500 uppercase tracking-wider",
									children: "Live URL"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 851,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-0.5 font-mono text-purple-700 font-semibold",
									children: "https://payroxa.com.ng/robots.txt"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 854,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 850,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-80",
								children: /* @__PURE__ */ (void 0)("pre", { children: `User-agent: *
Allow: /
Disallow: /cms-admin
Disallow: /cms-admin/
Disallow: /api/

# Host configuration
Host: https://payroxa.com.ng

# Canonical XML Sitemap
Sitemap: https://payroxa.com.ng/sitemap.xml` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 860,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 859,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 849,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 845,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 794,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 793,
				columnNumber: 35
			}, this),
			activeTab === "search-console" && /* @__PURE__ */ (void 0)("form", {
				onSubmit: handleSaveSearchConsole,
				className: "space-y-6",
				children: [/* @__PURE__ */ (void 0)(CmsCard, {
					title: "Search Console & Webmaster Verification",
					subtitle: "Add meta verification tokens for Google Search Console and Bing Webmaster Tools",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Google Search Console Verification Tag"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 884,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: searchConsole.googleVerificationTag || "",
									onChange: (e) => setSearchConsole({
										...searchConsole,
										googleVerificationTag: e.target.value
									}),
									className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
									placeholder: "google-site-verification=abcdef123456"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 887,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-[11px] text-slate-400",
									children: "Enter the verification string or HTML tag provided in your Google Search Console ownership verification step."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 891,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 883,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Bing Webmaster Verification Tag"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 898,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: searchConsole.bingVerificationTag || "",
								onChange: (e) => setSearchConsole({
									...searchConsole,
									bingVerificationTag: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								placeholder: "msvalidate.01=abcdef123456"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 901,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 897,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Search Engine Indexing Notes & Records"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 908,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 3,
								value: searchConsole.notes || "",
								onChange: (e) => setSearchConsole({
									...searchConsole,
									notes: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								placeholder: "Record indexing notes, key audit dates, or search console remarks here..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 911,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 907,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-900",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "font-bold mb-1 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (void 0)(Globe, { className: "size-4 text-blue-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 919,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Next Steps for Google Search Console Setup" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 920,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 918,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("ol", {
									className: "list-decimal list-inside space-y-1 text-[11px] text-blue-800",
									children: [
										/* @__PURE__ */ (void 0)("li", { children: [
											"Visit",
											" ",
											/* @__PURE__ */ (void 0)("a", {
												href: "https://search.google.com/search-console",
												target: "_blank",
												rel: "noreferrer",
												className: "underline font-semibold",
												children: "search.google.com/search-console"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 925,
												columnNumber: 21
											}, this),
											" ",
											"and add property `https://payroxa.com.ng`."
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 923,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "Copy the HTML tag token into the input above and click \"Save Verification Tags\"." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 930,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("li", { children: "In Google Search Console, submit `https://payroxa.com.ng/sitemap.xml` under Sitemaps for automatic crawl discovery." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 933,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 922,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 917,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 882,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 881,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex justify-end pt-2",
					children: /* @__PURE__ */ (void 0)("button", {
						type: "submit",
						disabled: saving,
						className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50 transition-colors",
						children: [/* @__PURE__ */ (void 0)(Save, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 944,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: saving ? "Saving..." : "Save Verification Tags" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 945,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 943,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 942,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 880,
				columnNumber: 42
			}, this),
			showRedirectModal && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
					children: [
						/* @__PURE__ */ (void 0)("h3", {
							className: "text-base font-bold text-slate-900",
							children: editingRedirect.id ? "Edit Redirect Rule" : "Create 301 Redirect Rule"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 953,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-xs text-slate-500",
							children: "Forward traffic from an old or alternative link to the target destination."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 956,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("form", {
							onSubmit: handleSaveRedirect,
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Source Path (e.g. /old-page)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 962,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: editingRedirect.sourcePath,
									onChange: (e) => setEditingRedirect({
										...editingRedirect,
										sourcePath: e.target.value
									}),
									className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
									placeholder: "/online-payments",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 965,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 961,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1",
									children: "Target Destination"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 972,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									value: editingRedirect.targetPath,
									onChange: (e) => setEditingRedirect({
										...editingRedirect,
										targetPath: e.target.value
									}),
									className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
									placeholder: "/payments",
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 975,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 971,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1",
										children: "HTTP Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 983,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: editingRedirect.statusCode,
										onChange: (e) => setEditingRedirect({
											...editingRedirect,
											statusCode: parseInt(e.target.value)
										}),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
										children: [/* @__PURE__ */ (void 0)("option", {
											value: 301,
											children: "301 Permanent"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 990,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("option", {
											value: 302,
											children: "302 Temporary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 991,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 986,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 982,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1",
										children: "Rule Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 996,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: editingRedirect.enabled ? "true" : "false",
										onChange: (e) => setEditingRedirect({
											...editingRedirect,
											enabled: e.target.value === "true"
										}),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
										children: [/* @__PURE__ */ (void 0)("option", {
											value: "true",
											children: "Active & Routing"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1003,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("option", {
											value: "false",
											children: "Disabled"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1004,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 999,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 995,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 981,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-6 flex justify-end gap-2 pt-2 border-t border-slate-100",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setShowRedirectModal(false),
										className: "rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
										children: "Cancel"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1010,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "submit",
										disabled: saving,
										className: "rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50",
										children: saving ? "Saving..." : "Save Rule"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1013,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1009,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 960,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 952,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 951,
				columnNumber: 29
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 265,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsSeoPage as component };
