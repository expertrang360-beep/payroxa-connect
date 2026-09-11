import { i as __toESM } from "../_runtime.mjs";
import { K as updateSocialSettingsFn, f as getCmsSettingsFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { A as RefreshCw, Ct as CircleCheck, Tt as CircleAlert, k as Save } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.settings.social-C87i_JQi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.settings.social.tsx?tsr-split=component";
function CmsSocialSettingsPage() {
	const { token, isSuperAdmin } = useCmsAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [social, setSocial] = (0, import_react.useState)(null);
	const loadSocial = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getCmsSettingsFn({ data: { token } });
			setSocial(res.social);
		} catch (err) {
			console.error("Failed to load social settings:", err);
			setError("Unable to load social media settings.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadSocial();
	}, [token]);
	const handleToggle = (id) => {
		if (!social) return;
		const updatedLinks = social.links.map((link) => link.id === id ? {
			...link,
			enabled: !link.enabled
		} : link);
		setSocial({
			...social,
			links: updatedLinks
		});
	};
	const handleUrlChange = (id, href) => {
		if (!social) return;
		const updatedLinks = social.links.map((link) => link.id === id ? {
			...link,
			href
		} : link);
		setSocial({
			...social,
			links: updatedLinks
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token || !social) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await updateSocialSettingsFn({ data: {
				token,
				social
			} });
			if (res.success) {
				setSocial(res.social);
				setSuccess("Social media channels saved and published to website footer.");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update social channels.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	if (loading || !social) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 85,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 84,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Social Media Channels",
			description: "Enable or disable social handles and manage official community URLs displayed in the website footer."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 89,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 91,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 96,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit,
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
				title: "Configured Channels",
				subtitle: "Toggle visibility and set profile URLs",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: social.links.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-9 items-center justify-center rounded-lg bg-white border border-slate-200 font-semibold text-xs text-purple-700 uppercase",
								children: item.platform.slice(0, 2)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "text-sm font-bold text-slate-900",
								children: item.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-slate-400 capitalize",
								children: [item.platform, " platform"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 111,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 109,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-1 sm:max-w-md items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: item.href,
								onChange: (e) => handleUrlChange(item.id, e.target.value),
								placeholder: `https://${item.platform}.com/...`,
								className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								disabled: !isSuperAdmin,
								onClick: () => handleToggle(item.id),
								className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${item.enabled ? "bg-purple-600" : "bg-slate-300"}`,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${item.enabled ? "translate-x-5" : "translate-x-0"}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 17
						}, this)]
					}, item.id, true, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 39
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 103,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 102,
				columnNumber: 9
			}, this), isSuperAdmin && /* @__PURE__ */ (void 0)("div", {
				className: "flex justify-end gap-3 pt-2",
				children: /* @__PURE__ */ (void 0)("button", {
					type: "submit",
					disabled: saving,
					className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 disabled:pointer-events-none disabled:opacity-60",
					children: saving ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-4 animate-spin" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Saving..." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 25
					}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Save, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 19
					}, this), /* @__PURE__ */ (void 0)("span", { children: "Save Social Settings" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 19
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 23
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 125,
				columnNumber: 26
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 101,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 88,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsSocialSettingsPage as component };
