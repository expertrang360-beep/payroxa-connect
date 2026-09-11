import { i as __toESM } from "../_runtime.mjs";
import { _ as getMediaFn, q as uploadMediaFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { $ as Image, Dt as Check, l as Upload, ot as FolderOpen, p as Trash2, q as Link, r as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CmsImagePicker-9Z_c_NmU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/cms/components/CmsImagePicker.tsx";
function CmsImagePicker({ value, onChange, altText, onAltTextChange, label, helperText, categoryFilter, recommendedDimensions, disabled = false }) {
	const { token } = useCmsAuth();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("library");
	const [mediaList, setMediaList] = (0, import_react.useState)([]);
	const [loadingMedia, setLoadingMedia] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [urlInput, setUrlInput] = (0, import_react.useState)(value || "");
	const [altInput, setAltInput] = (0, import_react.useState)(altText || "");
	const [selectedAsset, setSelectedAsset] = (0, import_react.useState)(null);
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
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			loadMedia();
			setUrlInput(value || "");
			setAltInput(altText || "");
		}
	}, [
		isOpen,
		token,
		value,
		altText
	]);
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
					category: categoryFilter || "general",
					altText: altInput || file.name.replace(/\.[^/.]+$/, "")
				} });
				if (res.success && res.asset) {
					onChange(res.asset.url, res.asset);
					if (onAltTextChange && res.asset.altText) onAltTextChange(res.asset.altText);
					setIsOpen(false);
				}
			};
			reader.readAsDataURL(file);
		} catch (err) {
			console.error("Upload error:", err);
		} finally {
			setUploading(false);
		}
	};
	const handleSelectAsset = (asset) => {
		setSelectedAsset(asset);
		setUrlInput(asset.url);
		if (!altInput && asset.altText) setAltInput(asset.altText);
	};
	const handleConfirmSelection = () => {
		if (urlInput) {
			onChange(urlInput, selectedAsset || void 0);
			if (onAltTextChange && altInput) onAltTextChange(altInput);
			setIsOpen(false);
		}
	};
	const filteredMedia = categoryFilter ? mediaList.filter((m) => m.category === categoryFilter || m.category === "general") : mediaList;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		label && /* @__PURE__ */ (void 0)("label", {
			className: "block text-xs font-semibold text-slate-700 mb-1.5",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-900/90 border border-slate-200",
				children: value ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: value,
					alt: altText || "Preview",
					className: "max-h-full max-w-full object-contain",
					onError: (e) => {
						e.target.style.display = "none";
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 153,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Image, { className: "size-8 text-slate-500" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 151,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0 flex-1 space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "truncate text-xs font-semibold text-slate-900",
							children: value ? value.substring(value.lastIndexOf("/") + 1) || "Custom Image" : "No image selected"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "truncate text-[11px] font-mono text-slate-400",
						children: value || "Default fallback will be used"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 177,
						columnNumber: 11
					}, this),
					recommendedDimensions && /* @__PURE__ */ (void 0)("p", {
						className: "text-[10px] text-purple-600 font-medium",
						children: ["Recommended: ", recommendedDimensions]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							disabled,
							onClick: () => setIsOpen(true),
							className: "inline-flex items-center gap-1.5 rounded-lg bg-purple-50 border border-purple-200 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: value ? "Change Image" : "Select / Upload Image" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 188,
							columnNumber: 13
						}, this), value && !disabled && /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => onChange(""),
							className: "inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50",
							title: "Remove image",
							children: [/* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Remove" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 149,
			columnNumber: 7
		}, this),
		helperText && /* @__PURE__ */ (void 0)("p", {
			className: "mt-1 text-[11px] text-slate-400",
			children: helperText
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 213,
			columnNumber: 22
		}, this),
		isOpen && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "flex h-[85vh] max-h-[640px] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between border-b border-slate-100 px-6 py-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-base font-bold text-slate-900",
							children: "Media Asset Manager"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-slate-500",
							children: "Select an asset from the media library, upload from your device, or paste a link."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setIsOpen(false),
							className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex border-b border-slate-100 bg-slate-50/70 px-6 pt-2",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setActiveTab("library"),
								className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${activeTab === "library" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
								children: [/* @__PURE__ */ (void 0)(Image, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: [
									"Media Library (",
									filteredMedia.length,
									")"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setActiveTab("upload"),
								className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${activeTab === "upload" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
								children: [/* @__PURE__ */ (void 0)(Upload, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Upload New" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 261,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 251,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setActiveTab("url"),
								className: `flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${activeTab === "url" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-500 hover:text-slate-800"}`,
								children: [/* @__PURE__ */ (void 0)(Link, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Direct Image URL" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 274,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex-1 overflow-y-auto p-6",
						children: [
							activeTab === "library" && /* @__PURE__ */ (void 0)("div", { children: loadingMedia ? /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-center py-20",
								children: /* @__PURE__ */ (void 0)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 21
							}, this) : filteredMedia.length === 0 ? /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col items-center justify-center py-16 text-center",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-3",
										children: /* @__PURE__ */ (void 0)(Image, { className: "size-6" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 289,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("h4", {
										className: "text-xs font-bold text-slate-800",
										children: "No media assets found"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 291,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 max-w-xs text-xs text-slate-400",
										children: "Upload an image or add an external URL to get started."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 292,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setActiveTab("upload"),
										className: "mt-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700",
										children: [/* @__PURE__ */ (void 0)(Upload, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 300,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Upload File" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 301,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 295,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 287,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5",
								children: filteredMedia.map((asset) => {
									const isChosen = urlInput === asset.url;
									return /* @__PURE__ */ (void 0)("div", {
										onClick: () => handleSelectAsset(asset),
										className: `group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all ${isChosen ? "border-purple-600 ring-2 ring-purple-600/20 shadow-xs" : "border-slate-200 hover:border-purple-300 hover:shadow-xs"}`,
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "relative flex h-28 items-center justify-center bg-slate-900/90 p-2",
											children: [/* @__PURE__ */ (void 0)("img", {
												src: asset.url,
												alt: asset.altText,
												className: "max-h-full max-w-full object-contain"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 319,
												columnNumber: 31
											}, this), isChosen && /* @__PURE__ */ (void 0)("div", {
												className: "absolute top-2 right-2 size-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs",
												children: /* @__PURE__ */ (void 0)(Check, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 326,
													columnNumber: 35
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 325,
												columnNumber: 33
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 318,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "p-2.5 bg-white",
											children: [/* @__PURE__ */ (void 0)("p", {
												className: "truncate text-[11px] font-bold text-slate-800",
												children: asset.filename
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 331,
												columnNumber: 31
											}, this), /* @__PURE__ */ (void 0)("p", {
												className: "text-[10px] text-slate-400 capitalize",
												children: [
													asset.category,
													" • ",
													Math.round(asset.sizeBytes / 1024),
													" KB"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 334,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 330,
											columnNumber: 29
										}, this)]
									}, asset.id, true, {
										fileName: _jsxFileName,
										lineNumber: 309,
										columnNumber: 27
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 305,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 17
							}, this),
							activeTab === "upload" && /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/20 p-10 text-center",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 mb-4",
										children: /* @__PURE__ */ (void 0)(Upload, { className: "size-7" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 349,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("h4", {
										className: "text-sm font-bold text-slate-900",
										children: "Upload Media File"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-1 max-w-sm text-xs text-slate-500",
										children: "Drag and drop your image file here, or click browse. Supports PNG, JPG, SVG, WebP, and ICO up to 5MB."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 352,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("label", {
										className: "mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700",
										children: [
											/* @__PURE__ */ (void 0)(Upload, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 358,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: uploading ? "Processing Upload..." : "Browse Local File" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 359,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "file",
												accept: "image/*,.ico",
												onChange: handleFileUpload,
												disabled: uploading,
												className: "hidden"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 360,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 357,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 17
							}, this),
							activeTab === "url" && /* @__PURE__ */ (void 0)("div", {
								className: "max-w-xl mx-auto space-y-4 py-4",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1.5",
										children: "Direct Image URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 374,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "url",
										placeholder: "https://example.com/image.png or /src/assets/hero-payroxa.jpg",
										value: urlInput,
										onChange: (e) => setUrlInput(e.target.value),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 377,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 373,
										columnNumber: 19
									}, this),
									onAltTextChange && /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "block text-xs font-semibold text-slate-700 mb-1.5",
										children: "Image Alt Text (Accessibility & SEO)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 388,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										placeholder: "Descriptive explanation of the image...",
										value: altInput,
										onChange: (e) => setAltInput(e.target.value),
										className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 391,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 387,
										columnNumber: 21
									}, this),
									urlInput && /* @__PURE__ */ (void 0)("div", {
										className: "mt-4 rounded-xl border border-slate-200 p-3 bg-slate-50",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] font-semibold text-slate-600 mb-2",
											children: "Live Preview:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 403,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex h-32 items-center justify-center bg-slate-900 rounded-lg p-2",
											children: /* @__PURE__ */ (void 0)("img", {
												src: urlInput,
												alt: "URL Preview",
												className: "max-h-full max-w-full object-contain"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 405,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 404,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 372,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "border-t border-slate-100 bg-slate-50 p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "text-[11px] text-slate-500",
							children: urlInput ? "Asset ready to apply" : "No asset selected"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setIsOpen(false),
								className: "rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 424,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: handleConfirmSelection,
								disabled: !urlInput,
								className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
								children: [/* @__PURE__ */ (void 0)(Check, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 438,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("span", { children: "Use This Image" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 432,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 423,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 418,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 218,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 217,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 143,
		columnNumber: 5
	}, this);
}
//#endregion
export { CmsImagePicker as t };
