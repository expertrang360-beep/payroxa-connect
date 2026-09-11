import "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/cms/components/CmsHeader.tsx";
function CmsHeader({ title, description, badge, actions }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-2xl font-bold tracking-tight text-slate-900",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 15,
				columnNumber: 11
			}, this), badge && /* @__PURE__ */ (void 0)("span", {
				className: "rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700",
				children: badge
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 17,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 14,
			columnNumber: 9
		}, this), description && /* @__PURE__ */ (void 0)("p", {
			className: "mt-1 text-sm text-slate-500",
			children: description
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 22,
			columnNumber: 25
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 13,
			columnNumber: 7
		}, this), actions && /* @__PURE__ */ (void 0)("div", {
			className: "flex flex-wrap items-center gap-2.5",
			children: actions
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 24,
			columnNumber: 19
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/cms/components/CmsCard.tsx";
function CmsStatCard({ label, value, subtext, icon: Icon, trend, color = "purple" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:shadow-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
					children: label
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex size-9 items-center justify-center rounded-xl border ${{
						purple: "bg-purple-50 text-purple-600 border-purple-100",
						emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
						blue: "bg-blue-50 text-blue-600 border-blue-100",
						amber: "bg-amber-50 text-amber-600 border-amber-100"
					}[color]}`,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-4.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 34,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-3 flex items-baseline gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-2xl font-bold tracking-tight text-slate-900",
					children: value
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 41,
					columnNumber: 9
				}, this), trend && /* @__PURE__ */ (void 0)("span", {
					className: "text-xs font-medium text-emerald-600",
					children: trend
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 19
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 7
			}, this),
			subtext && /* @__PURE__ */ (void 0)("p", {
				className: "mt-1 text-xs text-slate-400",
				children: subtext
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 19
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 5
	}, this);
}
function CmsCard({ title, subtitle, action, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs ${className}`,
		children: [(title || subtitle || action) && /* @__PURE__ */ (void 0)("div", {
			className: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4",
			children: [/* @__PURE__ */ (void 0)("div", { children: [title && /* @__PURE__ */ (void 0)("h2", {
				className: "text-base font-bold text-slate-900",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 63,
				columnNumber: 23
			}, this), subtitle && /* @__PURE__ */ (void 0)("p", {
				className: "text-xs text-slate-500",
				children: subtitle
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 26
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 62,
				columnNumber: 11
			}, this), action && /* @__PURE__ */ (void 0)("div", { children: action }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 22
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 9
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 59,
		columnNumber: 5
	}, this);
}
//#endregion
export { CmsHeader as n, CmsStatCard as r, CmsCard as t };
