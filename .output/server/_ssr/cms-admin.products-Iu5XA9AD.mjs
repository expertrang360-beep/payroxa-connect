import { i as __toESM } from "../_runtime.mjs";
import { L as saveProductsFn, y as getProductsFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { Ct as CircleCheck, Dt as Check, O as Search, P as Plus, Tt as CircleAlert, _ as Sparkles, g as Star, k as Save, mt as EyeOff, p as Trash2, pt as Eye, r as X } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { n as ICON_CATEGORIES, r as renderCmsIcon, t as CMS_ICON_CATALOG } from "./icons-CAvZPSCj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.products-Iu5XA9AD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/cms/components/CmsIconPicker.tsx";
function CmsIconPicker({ value, onChange, label, helperText, disabled = false }) {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [customInput, setCustomInput] = (0, import_react.useState)("");
	const filteredIcons = (0, import_react.useMemo)(() => {
		return CMS_ICON_CATALOG.filter((item) => {
			const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.label.toLowerCase().includes(query) || item.keywords.some((k) => k.toLowerCase().includes(query));
			return matchesCategory && matchesSearch;
		});
	}, [searchQuery, selectedCategory]);
	const handleSelect = (iconName) => {
		onChange(iconName);
		setIsOpen(false);
	};
	const handleApplyCustom = () => {
		if (customInput.trim()) {
			onChange(customInput.trim());
			setCustomInput("");
			setIsOpen(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		label && /* @__PURE__ */ (void 0)("label", {
			className: "block text-xs font-semibold text-slate-700 mb-1.5",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 55,
			columnNumber: 9
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				disabled,
				onClick: () => setIsOpen(true),
				className: "flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-2xs hover:border-purple-300 hover:bg-purple-50/20 focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100",
					children: renderCmsIcon(value, { className: "size-4.5" })
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 66,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "truncate text-xs font-semibold text-slate-900",
						children: value || "Select Icon"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 70,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-slate-400",
						children: "Click to change icon"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 73,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 69,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 60,
				columnNumber: 9
			}, this), value && !disabled && /* @__PURE__ */ (void 0)("button", {
				type: "button",
				onClick: () => onChange("Sparkles"),
				title: "Reset to default icon",
				className: "text-[11px] text-slate-400 hover:text-slate-600 px-1.5 py-1",
				children: "Reset"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 78,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 59,
			columnNumber: 7
		}, this),
		helperText && /* @__PURE__ */ (void 0)("p", {
			className: "mt-1 text-[11px] text-slate-400",
			children: helperText
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 89,
			columnNumber: 22
		}, this),
		isOpen && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "flex h-[85vh] max-h-[640px] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between border-b border-slate-100 px-6 py-4",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-base font-bold text-slate-900",
							children: "Select Visual Icon"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 98,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-slate-500",
							children: "Choose from curated brand and interface icons or specify a custom Lucide identifier."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 99,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 97,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setIsOpen(false),
							className: "rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 109,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 104,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 96,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "border-b border-slate-100 bg-slate-50/50 p-4 space-y-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 116,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("input", {
									type: "text",
									placeholder: "Search icons by name (e.g. wallet, shield, send, card)...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none",
									autoFocus: true
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 117,
									columnNumber: 17
								}, this),
								searchQuery && /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setSearchQuery(""),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs",
									children: "Clear"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 126,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 115,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar",
							children: ICON_CATEGORIES.map((cat) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setSelectedCategory(cat),
								className: `whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-purple-600 text-white shadow-2xs" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
								children: cat
							}, cat, false, {
								fileName: _jsxFileName$1,
								lineNumber: 139,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 137,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 114,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex-1 overflow-y-auto p-5",
						children: filteredIcons.length === 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col items-center justify-center py-12 text-center",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3",
									children: /* @__PURE__ */ (void 0)(Sparkles, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 160,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 159,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "text-xs font-bold text-slate-700",
									children: "No matching icons found"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 162,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-1 max-w-xs text-xs text-slate-400",
									children: "Try searching for different keywords or manually enter an icon name below."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 163,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 158,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5",
							children: filteredIcons.map((item) => {
								const isSelected = value === item.name;
								return /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleSelect(item.name),
									className: `group relative flex flex-col items-center justify-center rounded-xl p-3 text-center border transition-all ${isSelected ? "border-purple-600 bg-purple-50/70 text-purple-700 ring-2 ring-purple-600/20 shadow-xs" : "border-slate-150 bg-white hover:border-purple-300 hover:bg-purple-50/20 text-slate-700"}`,
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: `mb-2 flex size-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${isSelected ? "bg-purple-600 text-white shadow-xs" : "bg-slate-50 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-700"}`,
											children: renderCmsIcon(item.name, { className: "size-5" })
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 182,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "truncate w-full text-[11px] font-semibold",
											children: item.label
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 191,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "truncate w-full text-[9px] font-mono text-slate-400 mt-0.5",
											children: item.name
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 194,
											columnNumber: 25
										}, this),
										isSelected && /* @__PURE__ */ (void 0)("div", {
											className: "absolute top-1.5 right-1.5 size-4 rounded-full bg-purple-600 text-white flex items-center justify-center",
											children: /* @__PURE__ */ (void 0)(Check, { className: "size-2.5" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 199,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 198,
											columnNumber: 27
										}, this)
									]
								}, item.name, true, {
									fileName: _jsxFileName$1,
									lineNumber: 172,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 168,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 156,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "border-t border-slate-100 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 flex-1",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "text",
								placeholder: "Custom Lucide Icon Name (e.g. ShieldCheck)",
								value: customInput,
								onChange: (e) => setCustomInput(e.target.value),
								className: "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none max-w-xs"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 212,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: handleApplyCustom,
								disabled: !customInput.trim(),
								className: "rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-slate-900 disabled:opacity-40",
								children: "Apply Custom"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 219,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 211,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-end gap-2",
							children: /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => setIsOpen(false),
								className: "rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50",
								children: "Close"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 230,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 229,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 210,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 94,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 93,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 53,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/cms-admin.products.tsx?tsr-split=component";
function CmsProductsPage() {
	const { token } = useCmsAuth();
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const loadProducts = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getProductsFn({ data: { token } });
			setProducts(res.products);
		} catch (err) {
			console.error("Failed to load products:", err);
			setError("Unable to load products data.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadProducts();
	}, [token]);
	const handleTogglePublish = (id) => {
		setProducts(products.map((p) => p.id === id ? {
			...p,
			published: !p.published
		} : p));
	};
	const handleToggleFeatured = (id) => {
		setProducts(products.map((p) => p.id === id ? {
			...p,
			featured: !p.featured
		} : p));
	};
	const handleFieldChange = (id, field, value) => {
		setProducts(products.map((p) => p.id === id ? {
			...p,
			[field]: value
		} : p));
	};
	const handleAddProduct = () => {
		const newProduct = {
			id: `prod_${Date.now()}`,
			name: "New Product Service",
			shortDescription: "Description of the new Payroxa financial or merchant feature.",
			icon: "Package",
			displayOrder: products.length + 1,
			featured: false,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		setProducts([...products, newProduct]);
	};
	const handleDelete = (id) => {
		if (!window.confirm("Delete this product from CMS?")) return;
		setProducts(products.filter((p) => p.id !== id));
	};
	const handleSave = async () => {
		if (!token) return;
		setError(null);
		setSuccess(null);
		setSaving(true);
		try {
			const res = await saveProductsFn({ data: {
				token,
				products
			} });
			if (res.success) {
				setProducts(res.products);
				setSuccess("Products saved and published live to the homepage.");
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to save products.";
			setError(message);
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 97,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 96,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Products & Ecosystem Management",
			description: "Manage the featured product cards presented on the Payroxa marketing homepage.",
			actions: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: handleAddProduct,
					className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Add Product" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: handleSave,
					disabled: saving,
					className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: saving ? "Saving..." : "Save Changes" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 101,
				columnNumber: 160
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 101,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 112,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 118,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 117,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "space-y-4",
			children: products.map((item, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
				className: "border-slate-200",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col md:flex-row md:items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600",
							children: index + 1
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-bold text-slate-900",
							children: item.name || "Untitled Product"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-slate-400",
							children: ["Order: ", item.displayOrder]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 129,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleToggleFeatured(item.id),
								title: item.featured ? "Featured Product" : "Not Featured",
								className: `inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border ${item.featured ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-slate-50 text-slate-500 border-slate-200"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `size-3 ${item.featured ? "fill-amber-500 text-amber-500" : ""}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.featured ? "Featured" : "Standard" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleTogglePublish(item.id),
								title: item.published ? "Published on website" : "Hidden from website",
								className: `inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border ${item.published ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"}`,
								children: [item.published ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 37
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EyeOff, { className: "size-3" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 66
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.published ? "Published" : "Hidden" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 143,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => handleDelete(item.id),
								className: "rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 124,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "block text-xs font-semibold text-slate-700 mb-1",
							children: "Product / Service Name"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "text",
							value: item.name,
							onChange: (e) => handleFieldChange(item.id, "name", e.target.value),
							className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 159,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsIconPicker, {
							label: "Product Visual Icon",
							value: item.icon || "Package",
							onChange: (iconName) => handleFieldChange(item.id, "icon", iconName)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Short Description"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 2,
								value: item.shortDescription,
								onChange: (e) => handleFieldChange(item.id, "shortDescription", e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 154,
					columnNumber: 13
				}, this)]
			}, item.id, true, {
				fileName: _jsxFileName,
				lineNumber: 123,
				columnNumber: 40
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 122,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 100,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsProductsPage as component };
