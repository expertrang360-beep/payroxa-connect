import { i as __toESM } from "../_runtime.mjs";
import { G as updateMediaAssetFn, U as updateBrandVisualsFn, _ as getMediaFn, f as getCmsSettingsFn, i as deleteMediaAssetFn, q as uploadMediaFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { $ as Image, A as RefreshCw, Ct as CircleCheck, Dt as Check, I as Pen, L as Palette, O as Search, Tt as CircleAlert, _ as Sparkles, ht as ExternalLink, l as Upload, p as Trash2, vt as Copy } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { t as CmsImagePicker } from "./CmsImagePicker-9Z_c_NmU.mjs";
import { n as ICON_CATEGORIES, r as renderCmsIcon, t as CMS_ICON_CATALOG } from "./icons-CAvZPSCj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.media-DYVgKwpN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.media.tsx?tsr-split=component";
function CmsMediaManagementPage() {
	const { token, isSuperAdmin } = useCmsAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("media");
	const [mediaList, setMediaList] = (0, import_react.useState)([]);
	const [loadingMedia, setLoadingMedia] = (0, import_react.useState)(true);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [copiedUrl, setCopiedUrl] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [viewMode, setViewMode] = (0, import_react.useState)("grid");
	const [editingAsset, setEditingAsset] = (0, import_react.useState)(null);
	const [editFilename, setEditFilename] = (0, import_react.useState)("");
	const [editAltText, setEditAltText] = (0, import_react.useState)("");
	const [editCategory, setEditCategory] = (0, import_react.useState)("general");
	const [savingEdit, setSavingEdit] = (0, import_react.useState)(false);
	const [iconSearch, setIconSearch] = (0, import_react.useState)("");
	const [iconCategory, setIconCategory] = (0, import_react.useState)("All");
	const [iconSize, setIconSize] = (0, import_react.useState)(24);
	const [iconTone, setIconTone] = (0, import_react.useState)("purple");
	const [iconShape, setIconShape] = (0, import_react.useState)("squircle");
	const [copiedIcon, setCopiedIcon] = (0, import_react.useState)(null);
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [savingBrand, setSavingBrand] = (0, import_react.useState)(false);
	const [brandSuccess, setBrandSuccess] = (0, import_react.useState)(null);
	const [brandError, setBrandError] = (0, import_react.useState)(null);
	const [brandForm, setBrandForm] = (0, import_react.useState)({
		logoType: "symbol_text",
		logoUrl: "",
		logoDarkUrl: "",
		logoHeightPx: 36,
		brandSymbol: "P",
		brandSymbolBg: "gradient-purple",
		faviconUrl: "/favicon.ico",
		appIconUrl: "/favicon.ico",
		defaultOgImageUrl: "/src/assets/hero-payroxa.jpg"
	});
	const loadMedia = async () => {
		if (!token) return;
		setLoadingMedia(true);
		try {
			const res = await getMediaFn({ data: { token } });
			if (res && res.media) setMediaList(res.media);
		} catch (err) {
			console.error("Failed to load media assets:", err);
		} finally {
			setLoadingMedia(false);
		}
	};
	const loadSettings = async () => {
		if (!token) return;
		try {
			const res = await getCmsSettingsFn({ data: { token } });
			if (res && res.settings) {
				setSettings(res.settings);
				setBrandForm({
					logoType: res.settings.logoType || "symbol_text",
					logoUrl: res.settings.logoUrl || "",
					logoDarkUrl: res.settings.logoDarkUrl || "",
					logoHeightPx: res.settings.logoHeightPx || 36,
					brandSymbol: res.settings.brandSymbol || "P",
					brandSymbolBg: res.settings.brandSymbolBg || "gradient-purple",
					faviconUrl: res.settings.faviconUrl || "/favicon.ico",
					appIconUrl: res.settings.appIconUrl || "/favicon.ico",
					defaultOgImageUrl: res.settings.defaultOgImageUrl || "/src/assets/hero-payroxa.jpg"
				});
			}
		} catch (err) {
			console.error("Failed to load settings for branding:", err);
		}
	};
	(0, import_react.useEffect)(() => {
		loadMedia();
		loadSettings();
	}, [token]);
	const handleFileUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file || !token) return;
		setUploading(true);
		try {
			const reader = new FileReader();
			reader.onload = async () => {
				const base64Data = reader.result;
				const res = await uploadMediaFn({ data: {
					token,
					filename: file.name,
					mimeType: file.type || "image/png",
					sizeBytes: file.size,
					dataUrl: base64Data,
					category: selectedCategory !== "All" ? selectedCategory : "general",
					altText: file.name.replace(/\.[^/.]+$/, "")
				} });
				if (res.success && res.asset) setMediaList((prev) => [res.asset, ...prev]);
			};
			reader.readAsDataURL(file);
		} catch (err) {
			console.error("Upload error:", err);
		} finally {
			setUploading(false);
		}
	};
	const handleDeleteAsset = async (id, name) => {
		if (!token) return;
		if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
		try {
			if ((await deleteMediaAssetFn({ data: {
				token,
				id
			} })).success) setMediaList((prev) => prev.filter((m) => m.id !== id));
		} catch (err) {
			console.error("Failed to delete asset:", err);
		}
	};
	const openEditModal = (asset) => {
		setEditingAsset(asset);
		setEditFilename(asset.filename);
		setEditAltText(asset.altText || "");
		setEditCategory(asset.category || "general");
	};
	const handleSaveEdit = async () => {
		if (!token || !editingAsset) return;
		setSavingEdit(true);
		try {
			const res = await updateMediaAssetFn({ data: {
				token,
				id: editingAsset.id,
				filename: editFilename,
				altText: editAltText,
				category: editCategory
			} });
			if (res.success && res.asset) {
				setMediaList((prev) => prev.map((m) => m.id === editingAsset.id ? res.asset : m));
				setEditingAsset(null);
			}
		} catch (err) {
			console.error("Failed to update asset:", err);
		} finally {
			setSavingEdit(false);
		}
	};
	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
		setCopiedUrl(text);
		setTimeout(() => setCopiedUrl(null), 2e3);
	};
	const handleCopyIcon = (name) => {
		navigator.clipboard.writeText(name);
		setCopiedIcon(name);
		setTimeout(() => setCopiedIcon(null), 2e3);
	};
	const handleSaveBrandVisuals = async (e) => {
		e.preventDefault();
		if (!token) return;
		setSavingBrand(true);
		setBrandSuccess(null);
		setBrandError(null);
		try {
			const res = await updateBrandVisualsFn({ data: {
				token,
				...brandForm
			} });
			if (res.success) {
				setSettings(res.settings);
				setBrandSuccess("Brand logos and visual identity saved and published successfully.");
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to update brand visuals.";
			setBrandError(msg);
		} finally {
			setSavingBrand(false);
		}
	};
	const filteredMedia = (0, import_react.useMemo)(() => {
		return mediaList.filter((m) => {
			const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch = !query || m.filename.toLowerCase().includes(query) || m.altText && m.altText.toLowerCase().includes(query);
			return matchesCategory && matchesSearch;
		});
	}, [
		mediaList,
		selectedCategory,
		searchQuery
	]);
	const filteredIcons = (0, import_react.useMemo)(() => {
		return CMS_ICON_CATALOG.filter((item) => {
			const matchesCategory = iconCategory === "All" || item.category === iconCategory;
			const query = iconSearch.trim().toLowerCase();
			const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.label.toLowerCase().includes(query) || item.keywords.some((k) => k.toLowerCase().includes(query));
			return matchesCategory && matchesSearch;
		});
	}, [iconSearch, iconCategory]);
	const totalStorageKb = (0, import_react.useMemo)(() => {
		return Math.round(mediaList.reduce((acc, curr) => acc + (curr.sizeBytes || 0), 0) / 1024);
	}, [mediaList]);
	const getIconColorClass = () => {
		switch (iconTone) {
			case "emerald": return "text-emerald-600";
			case "blue": return "text-blue-600";
			case "navy": return "text-slate-900";
			case "slate": return "text-slate-600";
			default: return "text-purple-600";
		}
	};
	const getIconContainerClass = () => {
		switch (iconShape) {
			case "squircle": return "rounded-2xl bg-purple-50 p-4 border border-purple-100 shadow-2xs";
			case "circle": return "rounded-full bg-slate-100 p-4 shadow-2xs";
			case "soft": return "rounded-xl bg-purple-100/60 p-3";
			default: return "p-2";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Media, Icons & Brand Identity Hub",
			description: "Manage brand logos, uploaded imagery, visual graphics, and interface icon library across the entire Payroxa platform."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 294,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-slate-200 bg-white p-4 shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
						children: "Total Assets"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-2xl font-bold text-slate-900",
						children: mediaList.length
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 298,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-slate-200 bg-white p-4 shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
						children: "Storage Used"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 305,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-2xl font-bold text-slate-900",
						children: [totalStorageKb, " KB"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 308,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 304,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-slate-200 bg-white p-4 shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
						children: "Icon Catalog"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-2xl font-bold text-purple-600",
						children: [CMS_ICON_CATALOG.length, " Icons"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 310,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-xl border border-slate-200 bg-white p-4 shadow-2xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] font-semibold text-slate-500 uppercase tracking-wider",
						children: "Active Brand Mode"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 317,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm font-bold text-slate-900 capitalize",
						children: brandForm.logoType.replace("_", " + ")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 316,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 297,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-6 flex border-b border-slate-200 bg-white rounded-xl shadow-2xs px-4 pt-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setActiveTab("media"),
					className: `flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${activeTab === "media" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 329,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Image & Media Library" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 330,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 328,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setActiveTab("icons"),
					className: `flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${activeTab === "icons" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Icon Directory & Studio" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 335,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 333,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setActiveTab("branding"),
					className: `flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${activeTab === "branding" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Palette, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Logo & Brand Kit" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 340,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 338,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 327,
			columnNumber: 7
		}, this),
		activeTab === "media" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (void 0)(CmsCard, {
					title: "Upload New Asset",
					subtitle: "Add high-res photos, banners, logos, or vectors",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col md:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-slate-600",
								children: "Upload visual assets to reference across the website. Supported formats: PNG, JPG, SVG, WebP, and ICO."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("label", {
							className: "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors",
							children: [
								/* @__PURE__ */ (void 0)(Upload, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 357,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("span", { children: uploading ? "Uploading..." : "Upload Media File" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("input", {
									type: "file",
									accept: "image/*,.ico",
									onChange: handleFileUpload,
									disabled: uploading,
									className: "hidden"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 359,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 356,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 348,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "relative flex-1 max-w-sm",
						children: [/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 368,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							placeholder: "Search media by filename or alt text...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 369,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 367,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs",
						children: [
							"All",
							"branding",
							"heroes",
							"products",
							"icons",
							"testimonials",
							"general"
						].map((cat) => /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setSelectedCategory(cat),
							className: `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors capitalize ${selectedCategory === cat ? "bg-purple-600 text-white shadow-2xs" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`,
							children: cat
						}, cat, false, {
							fileName: _jsxFileName,
							lineNumber: 374,
							columnNumber: 105
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 373,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 365,
					columnNumber: 11
				}, this),
				loadingMedia ? /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-center py-20",
					children: /* @__PURE__ */ (void 0)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 382,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 381,
					columnNumber: 27
				}, this) : filteredMedia.length === 0 ? /* @__PURE__ */ (void 0)(CmsCard, { children: /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col items-center justify-center py-16 text-center",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-3",
							children: /* @__PURE__ */ (void 0)(Image, { className: "size-7" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 386,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 385,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("h4", {
							className: "text-sm font-bold text-slate-800",
							children: "No media assets found"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 388,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 max-w-xs text-xs text-slate-400",
							children: "Upload an image above or clear your search filter to see assets."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 389,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 384,
					columnNumber: 15
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 383,
					columnNumber: 51
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: filteredMedia.map((m) => /* @__PURE__ */ (void 0)(CmsCard, {
						className: "overflow-hidden p-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "relative flex h-48 items-center justify-center bg-slate-900/90 p-4 group",
							children: [
								/* @__PURE__ */ (void 0)("img", {
									src: m.url,
									alt: m.altText || m.filename,
									className: "max-h-full max-w-full rounded-lg object-contain shadow-sm"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "absolute top-3 left-3",
									children: /* @__PURE__ */ (void 0)("span", {
										className: "rounded-full bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white capitalize border border-white/10",
										children: m.category || "general"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 397,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => openEditModal(m),
										title: "Edit metadata",
										className: "rounded-lg bg-white/90 p-1.5 text-slate-700 shadow-xs hover:bg-white",
										children: /* @__PURE__ */ (void 0)(Pen, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 405,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 404,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleDeleteAsset(m.id, m.filename),
										title: "Delete asset",
										className: "rounded-lg bg-rose-600/90 p-1.5 text-white shadow-xs hover:bg-rose-600",
										children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 403,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 395,
							columnNumber: 19
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (void 0)("h4", {
									className: "truncate text-xs font-bold text-slate-900",
									title: m.filename,
									children: m.filename
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 414,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-0.5 truncate text-[11px] text-slate-500",
									title: m.altText,
									children: ["Alt: ", m.altText || "None specified"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-[10px] text-slate-400 font-mono",
									children: [
										Math.round(m.sizeBytes / 1024),
										" KB • ",
										m.mimeType
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 420,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-3 flex items-center justify-between border-t border-slate-100 pt-3",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleCopy(m.url),
										className: "inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700",
										children: copiedUrl === m.url ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3 text-emerald-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 427,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-emerald-600",
											children: "Copied URL"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 428,
											columnNumber: 29
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 426,
											columnNumber: 48
										}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 430,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Copy Path" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 431,
											columnNumber: 29
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 429,
											columnNumber: 33
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 425,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("a", {
										href: m.url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800",
										children: [/* @__PURE__ */ (void 0)("span", { children: "View" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 436,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 437,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 435,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 424,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 413,
							columnNumber: 19
						}, this)]
					}, m.id, true, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 39
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 393,
					columnNumber: 26
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 345,
			columnNumber: 33
		}, this),
		activeTab === "icons" && /* @__PURE__ */ (void 0)("div", {
			className: "space-y-6",
			children: /* @__PURE__ */ (void 0)(CmsCard, {
				title: "Icon Directory & Visual Studio",
				subtitle: "Search and customize the Lucide icon library used across products, trust badges, and security cards",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "mb-6 rounded-xl border border-purple-100 bg-purple-50/40 p-4",
						children: [/* @__PURE__ */ (void 0)("p", {
							className: "text-xs font-bold text-purple-900 mb-3",
							children: "Live Icon Preview & Styler"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 450,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-[11px] font-semibold text-slate-600 mb-1",
									children: [
										"Display Size: ",
										iconSize,
										"px"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 454,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "range",
									min: "16",
									max: "48",
									step: "4",
									value: iconSize,
									onChange: (e) => setIconSize(Number(e.target.value)),
									className: "w-full accent-purple-600"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 457,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-[11px] font-semibold text-slate-600 mb-1",
									children: "Color Accent"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 462,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("select", {
									value: iconTone,
									onChange: (e) => setIconTone(e.target.value),
									className: "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:border-purple-500 focus:outline-none",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "purple",
											children: "Brand Purple"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 466,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "emerald",
											children: "Emerald Success"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 467,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "blue",
											children: "Electric Blue"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 468,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "navy",
											children: "Deep Navy"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 469,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "slate",
											children: "Neutral Slate"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 470,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 461,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
									className: "block text-[11px] font-semibold text-slate-600 mb-1",
									children: "Container Badge"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("select", {
									value: iconShape,
									onChange: (e) => setIconShape(e.target.value),
									className: "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:border-purple-500 focus:outline-none",
									children: [
										/* @__PURE__ */ (void 0)("option", {
											value: "squircle",
											children: "Squircle Badge"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 480,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "circle",
											children: "Circular Soft"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 481,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "soft",
											children: "Minimal Pill"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 482,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("option", {
											value: "none",
											children: "Icon Only (Clean)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 483,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 479,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 475,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 451,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 449,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "relative flex-1 max-w-sm",
							children: [/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								placeholder: "Search icons (e.g. wallet, shield, card, zap)...",
								value: iconSearch,
								onChange: (e) => setIconSearch(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 493,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 491,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 overflow-x-auto pb-1 text-xs",
							children: ICON_CATEGORIES.map((cat) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setIconCategory(cat),
								className: `whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${iconCategory === cat ? "bg-purple-600 text-white shadow-2xs" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`,
								children: cat
							}, cat, false, {
								fileName: _jsxFileName,
								lineNumber: 497,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 496,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 490,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3",
						children: filteredIcons.map((item) => /* @__PURE__ */ (void 0)("div", {
							className: "group relative flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center hover:border-purple-400 hover:shadow-xs transition-all",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: `mb-3 flex items-center justify-center ${getIconContainerClass()}`,
									children: /* @__PURE__ */ (void 0)("div", {
										className: getIconColorClass(),
										children: renderCmsIcon(item.name, { size: iconSize })
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 507,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 506,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "truncate w-full text-xs font-bold text-slate-800",
									children: item.label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 514,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "truncate w-full text-[10px] font-mono text-slate-400 mt-0.5",
									children: item.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 515,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleCopyIcon(item.name),
									className: "mt-3 inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors w-full justify-center",
									children: copiedIcon === item.name ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3 text-emerald-600" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 521,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-emerald-600",
										children: "Copied"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 522,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 520,
										columnNumber: 49
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Copy, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 524,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Copy Name" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 525,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 523,
										columnNumber: 29
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 519,
									columnNumber: 19
								}, this)
							]
						}, item.name, true, {
							fileName: _jsxFileName,
							lineNumber: 505,
							columnNumber: 42
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 504,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 447,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 446,
			columnNumber: 33
		}, this),
		activeTab === "branding" && /* @__PURE__ */ (void 0)("form", {
			onSubmit: handleSaveBrandVisuals,
			className: "space-y-6",
			children: [
				brandSuccess && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
					children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 536,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: brandSuccess }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 537,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 535,
					columnNumber: 28
				}, this),
				brandError && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
					children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 541,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", { children: brandError }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 542,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 540,
					columnNumber: 26
				}, this),
				/* @__PURE__ */ (void 0)(CmsCard, {
					title: "Live Brand Logo Preview",
					subtitle: "Real-time rendering of your brand mark across Light and Dark surfaces",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 sm:grid-cols-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-slate-200 bg-white p-6 shadow-2xs",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-semibold text-slate-500 mb-4",
								children: "Light Surface (Navbar / Main Pages)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 550,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex h-24 items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-4",
								children: brandForm.logoType === "image" && brandForm.logoUrl ? /* @__PURE__ */ (void 0)("img", {
									src: brandForm.logoUrl,
									alt: "Brand Logo",
									style: { height: `${brandForm.logoHeightPx}px` },
									className: "w-auto object-contain"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 554,
									columnNumber: 74
								}, this) : brandForm.logoType === "symbol_only" ? /* @__PURE__ */ (void 0)("span", {
									className: `flex size-10 items-center justify-center rounded-xl text-xl font-bold ${brandForm.brandSymbolBg === "solid-purple" ? "bg-purple-600 text-white" : brandForm.brandSymbolBg === "dark-slate" ? "bg-slate-900 text-white" : brandForm.brandSymbolBg === "emerald" ? "bg-emerald-600 text-white" : "gradient-brand text-white shadow-soft"}`,
									children: brandForm.brandSymbol || "P"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 556,
									columnNumber: 96
								}, this) : /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: `flex size-10 items-center justify-center rounded-xl text-xl font-bold ${brandForm.brandSymbolBg === "solid-purple" ? "bg-purple-600 text-white" : brandForm.brandSymbolBg === "dark-slate" ? "bg-slate-900 text-white" : brandForm.brandSymbolBg === "emerald" ? "bg-emerald-600 text-white" : "gradient-brand text-white shadow-soft"}`,
										children: brandForm.brandSymbol || "P"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 559,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-display text-xl font-bold tracking-tight text-slate-900",
										children: settings?.name || "Payroxa"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 562,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 558,
									columnNumber: 31
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 553,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 549,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xs",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs font-semibold text-slate-400 mb-4",
								children: "Dark Surface (Footer / Dark Banners)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 571,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex h-24 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 p-4",
								children: brandForm.logoType === "image" && (brandForm.logoDarkUrl || brandForm.logoUrl) ? /* @__PURE__ */ (void 0)("img", {
									src: brandForm.logoDarkUrl || brandForm.logoUrl,
									alt: "Brand Logo Dark",
									style: { height: `${brandForm.logoHeightPx}px` },
									className: "w-auto object-contain"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 575,
									columnNumber: 101
								}, this) : brandForm.logoType === "symbol_only" ? /* @__PURE__ */ (void 0)("span", {
									className: `flex size-10 items-center justify-center rounded-xl text-xl font-bold ${brandForm.brandSymbolBg === "solid-purple" ? "bg-purple-600 text-white" : brandForm.brandSymbolBg === "dark-slate" ? "bg-slate-900 text-white" : brandForm.brandSymbolBg === "emerald" ? "bg-emerald-600 text-white" : "gradient-brand text-white shadow-soft"}`,
									children: brandForm.brandSymbol || "P"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 577,
									columnNumber: 96
								}, this) : /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: `flex size-10 items-center justify-center rounded-xl text-xl font-bold ${brandForm.brandSymbolBg === "solid-purple" ? "bg-purple-600 text-white" : brandForm.brandSymbolBg === "dark-slate" ? "bg-slate-900 text-white" : brandForm.brandSymbolBg === "emerald" ? "bg-emerald-600 text-white" : "gradient-brand text-white shadow-soft"}`,
										children: brandForm.brandSymbol || "P"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 580,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "font-display text-xl font-bold tracking-tight text-white",
										children: settings?.name || "Payroxa"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 583,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 579,
									columnNumber: 31
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 574,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 570,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 547,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 546,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(CmsCard, {
					title: "Logo Configuration",
					subtitle: "Select logo display structure and icon styling",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Logo Display Style"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 596,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("select", {
								disabled: !isSuperAdmin,
								value: brandForm.logoType,
								onChange: (e) => setBrandForm({
									...brandForm,
									logoType: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none",
								children: [
									/* @__PURE__ */ (void 0)("option", {
										value: "symbol_text",
										children: "Symbol Badge + Brand Text (Default)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 603,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "image",
										children: "Full Custom Image Logo"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "symbol_only",
										children: "Symbol Mark Only"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 605,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 599,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 595,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Logo Display Height (Pixels)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 610,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "number",
								min: "20",
								max: "80",
								disabled: !isSuperAdmin,
								value: brandForm.logoHeightPx,
								onChange: (e) => setBrandForm({
									...brandForm,
									logoHeightPx: Number(e.target.value)
								}),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 613,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 609,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Brand Symbol Letter / Character"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 620,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								maxLength: 3,
								disabled: !isSuperAdmin,
								value: brandForm.brandSymbol,
								onChange: (e) => setBrandForm({
									...brandForm,
									brandSymbol: e.target.value
								}),
								placeholder: "P",
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 623,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 619,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1.5",
								children: "Brand Symbol Background Style"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 630,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("select", {
								disabled: !isSuperAdmin,
								value: brandForm.brandSymbolBg,
								onChange: (e) => setBrandForm({
									...brandForm,
									brandSymbolBg: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none",
								children: [
									/* @__PURE__ */ (void 0)("option", {
										value: "gradient-purple",
										children: "Purple Gradient (Vibrant)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 637,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "solid-purple",
										children: "Solid Purple"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "dark-slate",
										children: "Dark Slate / Black"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 639,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "emerald",
										children: "Emerald Green"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 640,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 633,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 629,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 594,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 593,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (void 0)(CmsCard, {
					title: "Image Files & Favicon",
					subtitle: "Upload custom logos, dark mode versions, and browser favicons",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (void 0)(CmsImagePicker, {
								label: "Primary Light Logo (Navbar & Light Surfaces)",
								value: brandForm.logoUrl,
								onChange: (url) => setBrandForm({
									...brandForm,
									logoUrl: url
								}),
								categoryFilter: "branding",
								recommendedDimensions: "240 × 60 px (Transparent PNG / SVG)",
								disabled: !isSuperAdmin
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 649,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)(CmsImagePicker, {
								label: "Dark Surface Logo (Footer & Dark Themes)",
								value: brandForm.logoDarkUrl,
								onChange: (url) => setBrandForm({
									...brandForm,
									logoDarkUrl: url
								}),
								categoryFilter: "branding",
								recommendedDimensions: "240 × 60 px (White / Light Colored Logo)",
								disabled: !isSuperAdmin
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 654,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid gap-6 sm:grid-cols-2",
								children: [/* @__PURE__ */ (void 0)(CmsImagePicker, {
									label: "Browser Favicon (.ico / .png)",
									value: brandForm.faviconUrl,
									onChange: (url) => setBrandForm({
										...brandForm,
										faviconUrl: url
									}),
									categoryFilter: "branding",
									recommendedDimensions: "32 × 32 px or 64 × 64 px",
									disabled: !isSuperAdmin
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 660,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)(CmsImagePicker, {
									label: "Web App Touch Icon",
									value: brandForm.appIconUrl,
									onChange: (url) => setBrandForm({
										...brandForm,
										appIconUrl: url
									}),
									categoryFilter: "branding",
									recommendedDimensions: "192 × 192 px",
									disabled: !isSuperAdmin
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 665,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 659,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 648,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 647,
					columnNumber: 11
				}, this),
				isSuperAdmin && /* @__PURE__ */ (void 0)("div", {
					className: "flex justify-end gap-3 pt-2",
					children: /* @__PURE__ */ (void 0)("button", {
						type: "submit",
						disabled: savingBrand,
						className: "inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
						children: savingBrand ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-4 animate-spin" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 676,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Publishing Brand Kit..." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 677,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 675,
							columnNumber: 32
						}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Palette, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 679,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Save & Publish Brand Identity" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 680,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 678,
							columnNumber: 25
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 674,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 673,
					columnNumber: 28
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 534,
			columnNumber: 36
		}, this),
		editingAsset && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100",
				children: [
					/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "Edit Asset Metadata"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 689,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-slate-500 mt-0.5",
						children: "Update filename, alt text, and categorization for this asset."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 690,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Filename"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 696,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editFilename,
								onChange: (e) => setEditFilename(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 697,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 695,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Alt Text (SEO & Accessibility)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 701,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editAltText,
								onChange: (e) => setEditAltText(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 704,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 700,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Category"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 708,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("select", {
								value: editCategory,
								onChange: (e) => setEditCategory(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none capitalize",
								children: [
									/* @__PURE__ */ (void 0)("option", {
										value: "branding",
										children: "Branding & Logos"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 710,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "heroes",
										children: "Heroes & Banners"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 711,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "products",
										children: "Products"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 712,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "icons",
										children: "Icons & Badges"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 713,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "testimonials",
										children: "Testimonials & Avatars"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 714,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("option", {
										value: "general",
										children: "General"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 715,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 709,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 707,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 694,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setEditingAsset(null),
							className: "rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
							children: "Cancel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 721,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: handleSaveEdit,
							disabled: savingEdit,
							className: "rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50",
							children: savingEdit ? "Saving..." : "Save Changes"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 724,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 720,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 688,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 687,
			columnNumber: 24
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 293,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsMediaManagementPage as component };
