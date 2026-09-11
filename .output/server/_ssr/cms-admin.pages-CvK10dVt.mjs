import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as CircleCheck, Lt as ArrowRight, Z as Layers, ht as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.pages-CvK10dVt.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.pages.tsx?tsr-split=component";
function CmsPagesListPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
		title: "Website Pages Management",
		description: "View and jump directly into content modules powering each public marketing route."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 48,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-3",
		children: [
			{
				title: "Home Page",
				slug: "/",
				description: "Main Payroxa landing page with Hero, Store, Wallet, Products, and FAQ",
				editUrl: "/cms-admin/hero"
			},
			{
				title: "Business Solutions",
				slug: "/business",
				description: "Dedicated features and financial tools for merchants & SMEs",
				editUrl: "/cms-admin/business"
			},
			{
				title: "Payments & Collections",
				slug: "/payments",
				description: "Instant settlement, payment links, transfers, and QR codes",
				editUrl: "/cms-admin/products"
			},
			{
				title: "Storefront (Payroxa Store)",
				slug: "/store",
				description: "Online store creator without needing a standalone website",
				editUrl: "/cms-admin/content"
			},
			{
				title: "Cards (Virtual & Physical)",
				slug: "/cards",
				description: "Virtual cards and debit card issuance for teams & businesses",
				editUrl: "/cms-admin/content"
			},
			{
				title: "Pricing & Limits",
				slug: "/pricing",
				description: "Transparent fees and verification tier limits",
				editUrl: "/cms-admin/faq"
			},
			{
				title: "About Payroxa",
				slug: "/about",
				description: "Company background, African fintech mission, and leadership",
				editUrl: "/cms-admin/settings"
			},
			{
				title: "Contact & Support",
				slug: "/contact",
				description: "Customer helpdesk, business inquiries, and office locations",
				editUrl: "/cms-admin/settings"
			}
		].map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-0.5 flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 19
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-slate-900",
							children: p.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600",
							children: p.slug
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 60,
							columnNumber: 21
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 23
							}, this), "Live"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 21
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 19
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-0.5 text-xs text-slate-500",
					children: p.description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 19
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
					href: p.slug,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Preview" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 17
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: p.editUrl,
					className: "inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Edit Content" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 19
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 17
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 15
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 13
		}, this) }, p.slug, false, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 25
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsPagesListPage as component };
