import { i as __toESM } from "../_runtime.mjs";
import { o as getActivityLogFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { A as RefreshCw, O as Search } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { t as CmsActivityFeed } from "./CmsActivityFeed-CxDQBhfe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.activity-DSO5j86z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.activity.tsx?tsr-split=component";
function CmsActivityAuditPage() {
	const { token } = useCmsAuth();
	const [activities, setActivities] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [filterAction, setFilterAction] = (0, import_react.useState)("all");
	const loadActivities = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getActivityLogFn({ data: { token } });
			setActivities(res.activities);
		} catch (err) {
			console.error("Failed to load audit logs:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadActivities();
	}, [token]);
	const filtered = activities.filter((act) => {
		const matchesSearch = search === "" || act.description.toLowerCase().includes(search.toLowerCase()) || act.userName.toLowerCase().includes(search.toLowerCase()) || act.userEmail.toLowerCase().includes(search.toLowerCase());
		const matchesAction = filterAction === "all" || act.action === filterAction;
		return matchesSearch && matchesAction;
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Activity Audit Log",
			description: "Comprehensive audit trail tracking all CMS modifications, logins, content revisions, and configuration updates.",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: loadActivities,
				disabled: loading,
				className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `size-3.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Refresh Log" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 180
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex flex-col sm:flex-row gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					type: "text",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search by action, administrator name, or keyword...",
					className: "w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
				value: filterAction,
				onChange: (e) => setFilterAction(e.target.value),
				className: "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-2xs focus:border-purple-500 focus:outline-none",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "all",
						children: "All Action Types"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "content_published",
						children: "Published Content"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "link_changed",
						children: "Link Changes"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "settings_updated",
						children: "Settings Updated"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 56,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "admin_added",
						children: "Admin Created"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
						value: "admin_logged_in",
						children: "Sign-ins"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 58,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
			title: `Audit Records (${filtered.length})`,
			subtitle: "Chronological list of all recorded changes",
			children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex justify-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 63,
				columnNumber: 20
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsActivityFeed, { activities: filtered }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 65,
				columnNumber: 20
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsActivityAuditPage as component };
