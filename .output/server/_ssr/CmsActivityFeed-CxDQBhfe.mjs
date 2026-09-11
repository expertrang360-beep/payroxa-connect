import "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleQuestionMark, E as ShieldCheck, L as Radio, Mt as CircleCheckBig, c as UserPlus, kt as Clock, tt as Link2, vt as FilePen } from "../_libs/lucide-react.mjs";
require_react();
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/cms/components/CmsActivityFeed.tsx";
function CmsActivityFeed({ activities }) {
	if (!activities || activities.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "py-8 text-center text-sm text-slate-400",
		children: "No recent activity recorded yet."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 7
	}, this);
	const getActionIcon = (action) => {
		switch (action) {
			case "content_published": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheckBig, { className: "size-4 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 16
			}, this);
			case "link_changed": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { className: "size-4 text-blue-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 16
			}, this);
			case "admin_added": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-4 text-purple-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 16
			}, this);
			case "admin_logged_in": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-slate-500" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 33,
				columnNumber: 16
			}, this);
			case "faq_added":
			case "faq_updated": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "size-4 text-amber-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 16
			}, this);
			case "announcement_updated": return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { className: "size-4 text-rose-500" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 16
			}, this);
			default: return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FilePen, { className: "size-4 text-purple-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 16
			}, this);
		}
	};
	const formatTimeAgo = (isoString) => {
		try {
			const date = new Date(isoString);
			const diffMs = Date.now() - date.getTime();
			const diffMins = Math.floor(diffMs / 6e4);
			const diffHours = Math.floor(diffMins / 60);
			const diffDays = Math.floor(diffHours / 24);
			if (diffMins < 1) return "Just now";
			if (diffMins < 60) return `${diffMins}m ago`;
			if (diffHours < 24) return `${diffHours}h ago`;
			if (diffDays < 7) return `${diffDays}d ago`;
			return date.toLocaleDateString();
		} catch {
			return isoString;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "divide-y divide-slate-100",
		children: activities.map((act) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-start gap-3 py-3.5 first:pt-1 last:pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200",
				children: getActionIcon(act.action)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-medium text-slate-900",
					children: act.description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-1 flex items-center gap-2 text-[11px] text-slate-400",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-slate-600",
							children: act.userName
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 75,
								columnNumber: 17
							}, this), formatTimeAgo(act.timestamp)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 74,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 69,
				columnNumber: 11
			}, this)]
		}, act.id, true, {
			fileName: _jsxFileName,
			lineNumber: 65,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 63,
		columnNumber: 5
	}, this);
}
//#endregion
export { CmsActivityFeed as t };
