import { i as __toESM } from "../_runtime.mjs";
import { O as saveAnnouncementsFn, c as getAnnouncementsFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { Ct as CircleCheck, Tt as CircleAlert, k as Save } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.announcements-BbziNZjT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.announcements.tsx?tsr-split=component";
function CmsAnnouncementsPage() {
	const { token } = useCmsAuth();
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const loadData = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getAnnouncementsFn({ data: { token } });
			setItems(res.announcements);
		} catch (err) {
			console.error("Failed to load announcements:", err);
			setError("Unable to load announcements.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, [token]);
	const handleToggle = (id) => {
		setItems(items.map((t) => t.id === id ? {
			...t,
			enabled: !t.enabled
		} : t));
	};
	const handleChange = (id, field, value) => {
		setItems(items.map((t) => t.id === id ? {
			...t,
			[field]: value
		} : t));
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!token) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await saveAnnouncementsFn({ data: {
				token,
				announcements: items
			} });
			if (res.success) {
				setItems(res.announcements);
				setSuccess("Announcement banner configuration saved and published.");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to save.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 74,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 73,
		columnNumber: 12
	}, this);
	const activeAnnouncement = items[0] || {
		id: "ann-1",
		title: "New Update",
		message: "Payroxa virtual cards are now available.",
		ctaLabel: "Learn More",
		ctaUrl: "/cards",
		enabled: false,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Top Marketing Announcement Banner",
			description: "Display a notification bar across the top of the public website for major product launches or updates."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 91,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 90,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSave,
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
				title: "Banner Configuration",
				subtitle: "Toggle and text content",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "text-xs font-bold text-slate-900",
								children: "Banner Visibility"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-slate-500",
								children: activeAnnouncement.enabled ? "Currently visible to website visitors" : "Currently hidden"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleToggle(activeAnnouncement.id),
								className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${activeAnnouncement.enabled ? "bg-purple-600" : "bg-slate-300"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${activeAnnouncement.enabled ? "translate-x-5" : "translate-x-0"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1",
							children: "Banner Badge Title"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: activeAnnouncement.title,
							onChange: (e) => handleChange(activeAnnouncement.id, "title", e.target.value),
							placeholder: "e.g. Announcement",
							className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1",
							children: "Announcement Message"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: activeAnnouncement.message,
							onChange: (e) => handleChange(activeAnnouncement.id, "message", e.target.value),
							placeholder: "e.g. Virtual cards are now live for all verified businesses.",
							className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "CTA Label (optional)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: activeAnnouncement.ctaLabel || "",
								onChange: (e) => handleChange(activeAnnouncement.id, "ctaLabel", e.target.value),
								placeholder: "e.g. Learn More",
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "CTA Destination URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: activeAnnouncement.ctaUrl || "",
								onChange: (e) => handleChange(activeAnnouncement.id, "ctaUrl", e.target.value),
								placeholder: "e.g. /cards or https://app.payroxa.com.ng",
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 101,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex justify-end pt-2",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "submit",
					disabled: saving,
					className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 149,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saving ? "Saving..." : "Save Announcement" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 148,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 147,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 100,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsAnnouncementsPage as component };
