import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as ShieldCheck, Ct as CircleCheck, _ as Sparkles, k as Save } from "../_libs/lucide-react.mjs";
import { t as CmsLayout } from "./CmsLayout-DaxGaaxH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.marketplace-BSmgdvG-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.marketplace.tsx?tsr-split=component";
function CmsAdminMarketplacePage() {
	const [apiBaseUrl, setApiBaseUrl] = (0, import_react.useState)("https://app.payroxa.com.ng/api/v1/public/marketplace");
	const [featuredBanner, setFeaturedBanner] = (0, import_react.useState)("Discover Verified African Merchants & Products");
	const [enableCache, setEnableCache] = (0, import_react.useState)(true);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const handleSave = (e) => {
		e.preventDefault();
		setSaved(true);
		setTimeout(() => setSaved(false), 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs font-semibold text-primary mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 13
					}, this), " Authoritative Source Synchronization"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 17,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-extrabold tracking-tight font-display",
					children: "Marketplace Presentation & API Connector"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Configure how the CMS consumes authoritative marketplace data from the Payroxa app without duplicating underlying product databases."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 16,
				columnNumber: 9
			}, this),
			saved && /* @__PURE__ */ (void 0)("div", {
				className: "rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 text-sm font-semibold flex items-center gap-2",
				children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 13
				}, this), " Marketplace presentation settings saved successfully!"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 19
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-3xl border border-border bg-card p-8 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-lg font-bold font-display mb-4",
							children: "Payroxa API Connection Status"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-muted-foreground mb-1",
									children: "Authoritative Public API Base URL"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 40,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: apiBaseUrl,
									onChange: (e) => setApiBaseUrl(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 43,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: "All products, vendors, and stores are fetched dynamically from this production endpoint."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 44,
									columnNumber: 19
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 39,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: handleSave,
								className: "space-y-4 pt-4 border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-muted-foreground mb-1",
										children: "Public Marketplace Hero Banner Title"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 52,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: featuredBanner,
										onChange: (e) => setFeaturedBanner(e.target.value),
										className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 55,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 51,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between py-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
											className: "text-sm font-bold",
											children: "Enable Public API Response Caching"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 60,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-muted-foreground",
											children: "Cache category listings and static vendor profiles for optimized performance."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 61,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 59,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "checkbox",
											checked: enableCache,
											onChange: (e) => setEnableCache(e.target.checked),
											className: "size-5 rounded border-border text-primary focus:ring-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 66,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 58,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "submit",
										className: "rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 70,
											columnNumber: 21
										}, this), " Save Presentation Preferences"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 69,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 50,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 38,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 35,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-bold font-display flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-emerald-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 80,
									columnNumber: 17
								}, this), " Single Source of Truth Rule"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "The Payroxa application database remains the authoritative owner of all products, prices, and vendor verification records. The CMS only controls presentation layers."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-muted/50 p-4 space-y-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Data Ownership"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 88,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold text-foreground",
										children: "Payroxa App"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 89,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 87,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "Sync Interval"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 92,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold text-emerald-600",
										children: "Real-Time (API)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 93,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 91,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 34,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 14,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsAdminMarketplacePage as component };
