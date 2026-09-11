import { i as __toESM } from "../_runtime.mjs";
import { D as publishHeroContentFn, F as saveHeroDraftFn, g as getHeroContentFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { N as Save, Nt as CircleAlert, j as Send, jt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { t as CmsImagePicker } from "./CmsImagePicker-9Z_c_NmU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.hero-BREsBYRt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.hero.tsx?tsr-split=component";
function CmsHeroPage() {
	const { token } = useCmsAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [publishing, setPublishing] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("draft");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [published, setPublished] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const loadHero = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getHeroContentFn({ data: { token } });
			setDraft(res.hero.draft);
			setPublished(res.hero.published);
		} catch (err) {
			console.error("Failed to load hero content:", err);
			setError("Unable to load hero section data.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadHero();
	}, [token]);
	const handleSaveDraft = async (e) => {
		if (e) e.preventDefault();
		if (!token || !draft) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await saveHeroDraftFn({ data: {
				token,
				draft
			} });
			if (res.success) {
				setDraft(res.hero.draft);
				setSuccess("Draft changes saved successfully.");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to save draft.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	const handlePublish = async () => {
		if (!token) return;
		if (!window.confirm("Publish hero section changes to the live website?")) return;
		setError(null);
		setSuccess(null);
		setPublishing(true);
		try {
			const res = await publishHeroContentFn({ data: { token } });
			if (res.success) {
				setDraft(res.hero.draft);
				setPublished(res.hero.published);
				setSuccess("Hero section published live to website visitors!");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to publish hero.";
			setError(message);
		} finally {
			setPublishing(false);
		}
	};
	if (loading || !draft) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 12
	}, this);
	const isDraftDifferent = JSON.stringify(draft) !== JSON.stringify(published);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Hero Section Studio",
			description: "Manage the main headline, highlighted value propositions, call-to-action buttons, and hero visual.",
			badge: isDraftDifferent ? "Unpublished Changes" : "Up to Date",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => handleSaveDraft(),
					disabled: saving || publishing,
					className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saving ? "Saving..." : "Save Draft" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: handlePublish,
					disabled: publishing || saving,
					className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: publishing ? "Publishing..." : "Publish to Live" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 232
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 107,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 112,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex items-center gap-2 border-b border-slate-200 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setActiveTab("draft"),
				className: `rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${activeTab === "draft" ? "bg-purple-100 text-purple-800" : "text-slate-600 hover:bg-slate-100"}`,
				children: ["Editing Draft ", isDraftDifferent && "•"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setActiveTab("published"),
				className: `rounded-xl px-4 py-1.5 text-xs font-semibold transition-colors ${activeTab === "published" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`,
				children: "View Live Published"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
						title: "Headlines & Text Content",
						subtitle: "Visible copy on initial page load",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Eyebrow Pill / Badge Text"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.eyebrow : published?.eyebrow,
									onChange: (e) => setDraft({
										...draft,
										eyebrow: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Main Headline (Prefix)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.headline : published?.headline,
									onChange: (e) => setDraft({
										...draft,
										headline: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 146,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Highlighted Headline (Gradient Accent Text)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.highlightedText : published?.highlightedText,
									onChange: (e) => setDraft({
										...draft,
										highlightedText: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Hero Body Description"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 163,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									rows: 3,
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.description : published?.description,
									onChange: (e) => setDraft({
										...draft,
										description: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Footnote / Slogan Below CTAs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.footnote : published?.footnote,
									onChange: (e) => setDraft({
										...draft,
										footnote: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
						title: "Action Buttons (CTAs)",
						subtitle: "Primary and secondary conversion triggers",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Primary CTA Label"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.primaryCtaLabel : published?.primaryCtaLabel,
									onChange: (e) => setDraft({
										...draft,
										primaryCtaLabel: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 190,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Primary CTA Destination"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.primaryCtaUrl : published?.primaryCtaUrl,
									onChange: (e) => setDraft({
										...draft,
										primaryCtaUrl: e.target.value
									}),
									className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 196,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Secondary CTA Label"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 207,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.secondaryCtaLabel : published?.secondaryCtaLabel,
									onChange: (e) => setDraft({
										...draft,
										secondaryCtaLabel: e.target.value
									}),
									className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700 mb-1.5",
									children: "Secondary CTA Destination"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 217,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									disabled: activeTab === "published",
									value: activeTab === "draft" ? draft.secondaryCtaUrl : published?.secondaryCtaUrl,
									onChange: (e) => setDraft({
										...draft,
										secondaryCtaUrl: e.target.value
									}),
									className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 220,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
						title: "Hero Visual Asset",
						subtitle: "Main product mockup artwork",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsImagePicker, {
								label: "Hero Illustration / Mockup",
								value: activeTab === "draft" ? draft.heroImageUrl : published?.heroImageUrl || "",
								onChange: (url, asset) => {
									setDraft({
										...draft,
										heroImageUrl: url,
										heroImageAlt: asset?.altText || draft.heroImageAlt || "Payroxa Platform Mockup"
									});
								},
								altText: activeTab === "draft" ? draft.heroImageAlt : published?.heroImageAlt,
								onAltTextChange: (alt) => setDraft({
									...draft,
									heroImageAlt: alt
								}),
								categoryFilter: "heroes",
								recommendedDimensions: "1200 × 750 px (Mockup / Screenshot)",
								disabled: activeTab === "published"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
					title: "Section Preview",
					subtitle: "Simulated landing page hero snippet",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-slate-100 bg-slate-950 p-6 text-center text-white",
						children: [
							draft.eyebrow && /* @__PURE__ */ (void 0)("div", {
								className: "inline-block rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-[11px] font-semibold text-purple-300",
								children: activeTab === "draft" ? draft.eyebrow : published?.eyebrow
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 33
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-4 text-xl font-bold tracking-tight",
								children: [
									activeTab === "draft" ? draft.headline : published?.headline,
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent",
										children: activeTab === "draft" ? draft.highlightedText : published?.highlightedText
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs text-slate-300 leading-relaxed",
								children: activeTab === "draft" ? draft.description : published?.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 259,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-5 flex flex-wrap justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white",
									children: activeTab === "draft" ? draft.primaryCtaLabel : published?.primaryCtaLabel
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-200",
									children: activeTab === "draft" ? draft.secondaryCtaLabel : published?.secondaryCtaLabel
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 15
							}, this),
							draft.footnote && /* @__PURE__ */ (void 0)("p", {
								className: "mt-4 text-[10px] text-slate-500",
								children: activeTab === "draft" ? draft.footnote : published?.footnote
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 34
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 246,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 245,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 127,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 95,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsHeroPage as component };
