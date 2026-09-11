import { i as __toESM } from "../_runtime.mjs";
import { H as updateApplicationLinksFn, f as getCmsSettingsFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { A as RefreshCw, Ct as CircleCheck, Tt as CircleAlert, f as TriangleAlert, ht as ExternalLink, k as Save } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.settings.links-Du4v_MUD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.settings.links.tsx?tsr-split=component";
function CmsApplicationLinksPage() {
	const { token, isSuperAdmin } = useCmsAuth();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [links, setLinks] = (0, import_react.useState)(null);
	const loadLinks = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getCmsSettingsFn({ data: { token } });
			setLinks(res.links);
		} catch (err) {
			console.error("Failed to load application links:", err);
			setError("Unable to load application links configuration.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadLinks();
	}, [token]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!token || !links) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await updateApplicationLinksFn({ data: {
				token,
				links
			} });
			if (res.success) {
				setLinks(res.links);
				setSuccess("Application destination links updated and published to marketing CTAs.");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to update links.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	if (loading || !links) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Application Links & CTA Destinations",
			description: "Centralized routing for all customer sign-up, sign-in, product portals, and financial application CTAs."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 67,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex items-start gap-3.5 rounded-2xl border border-amber-300 bg-amber-50/90 p-4.5 text-xs text-amber-900 shadow-2xs",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "size-5 shrink-0 text-amber-600 mt-0.5" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
				className: "font-bold uppercase tracking-wider text-amber-900",
				children: "Important Destination Warning"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 leading-relaxed text-amber-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold underline",
						children: "Changing this URL changes where website visitors are sent."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 13
					}, this),
					" ",
					"All buttons on the public website (e.g. \"Get Started\", \"Sign In\", \"Open Wallet\", \"Create Your Store\") retrieve these live configuration values dynamically. Always verify target links before saving."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 76,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 93,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 92,
			columnNumber: 17
		}, this),
		!isSuperAdmin && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800",
			children: [
				/* @__PURE__ */ (void 0)("span", {
					className: "font-semibold",
					children: "Role Constraint:"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 11
				}, this),
				" Only",
				" ",
				/* @__PURE__ */ (void 0)("span", {
					className: "font-semibold",
					children: "Super Admins"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 11
				}, this),
				" can modify application destination URLs."
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 97,
			columnNumber: 25
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: handleSubmit,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
					title: "Core Application Endpoints",
					subtitle: "Primary portal, registration, and user sign-in destinations",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "sm:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
											className: "block text-xs font-semibold text-slate-700",
											children: "Main Application Base URL"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 109,
											columnNumber: 17
										}, this), links.app && /* @__PURE__ */ (void 0)("a", {
											href: links.app,
											target: "_blank",
											rel: "noreferrer",
											className: "inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline",
											children: [/* @__PURE__ */ (void 0)("span", { children: "Test destination" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 113,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 114,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 112,
											columnNumber: 31
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 108,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "url",
										disabled: !isSuperAdmin,
										value: links.app,
										onChange: (e) => setLinks({
											...links,
											app: e.target.value
										}),
										required: true,
										className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 117,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-[11px] text-slate-400",
										children: "Fallback root when no specific product route is requested."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 121,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700",
									children: "Registration URL (\"Get Started\" / \"Create Account\")"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 17
								}, this), links.register && /* @__PURE__ */ (void 0)("a", {
									href: links.register,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline",
									children: [/* @__PURE__ */ (void 0)("span", { children: "Test" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 36
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.register,
								onChange: (e) => setLinks({
									...links,
									register: e.target.value
								}),
								required: true,
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 136,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-slate-700",
									children: "Login URL (\"Sign In\")"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 17
								}, this), links.login && /* @__PURE__ */ (void 0)("a", {
									href: links.login,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline",
									children: [/* @__PURE__ */ (void 0)("span", { children: "Test" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 149,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 147,
									columnNumber: 33
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.login,
								onChange: (e) => setLinks({
									...links,
									login: e.target.value
								}),
								required: true,
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
					title: "Product & Service Destinations",
					subtitle: "Configurable URLs targeted by specialized product sections",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Wallet URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.wallet,
								onChange: (e) => setLinks({
									...links,
									wallet: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Payments / Settlement URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.payments,
								onChange: (e) => setLinks({
									...links,
									payments: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Storefront / Merchant Store URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.store,
								onChange: (e) => setLinks({
									...links,
									store: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Cards URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.cards,
								onChange: (e) => setLinks({
									...links,
									cards: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Business Management URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.business,
								onChange: (e) => setLinks({
									...links,
									business: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Transfers URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.transfers,
								onChange: (e) => setLinks({
									...links,
									transfers: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Delivery / Logistics URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.delivery,
								onChange: (e) => setLinks({
									...links,
									delivery: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 225,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Ride / Mobility URL"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "url",
								disabled: !isSuperAdmin,
								value: links.ride,
								onChange: (e) => setLinks({
									...links,
									ride: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 162,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 161,
					columnNumber: 9
				}, this),
				isSuperAdmin && /* @__PURE__ */ (void 0)("div", {
					className: "flex justify-end gap-3 pt-2",
					children: /* @__PURE__ */ (void 0)("button", {
						type: "submit",
						disabled: saving,
						className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 disabled:pointer-events-none disabled:opacity-60",
						children: saving ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Saving & Publishing Links..." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 25
						}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Save, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Save Application Destinations" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 250,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 23
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 243,
					columnNumber: 26
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsApplicationLinksPage as component };
