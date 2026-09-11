import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { A as RefreshCw, C as ShieldCheck, Ct as CircleCheck, H as MapPin, K as List, Lt as ArrowRight, O as Search, Y as LayoutGrid, _ as Sparkles, b as SlidersHorizontal, ht as ExternalLink, nt as Grid3x3, rt as Grid2x2, x as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CIO-WwIt.mjs";
import { a as getProducts, c as getVendors, i as getProduct, l as searchMarketplace, n as getCategories, o as getStore, r as getFeatured, s as getVendor, t as getApiBaseUrl } from "./client-B-hbHFPn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-BqJHXQF5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* PayroxaApiClient
* A typed OOP wrapper for the Payroxa Marketplace API
*/
var PayroxaApiClient = class {
	baseUrl;
	constructor(baseUrl) {
		this.baseUrl = baseUrl || getApiBaseUrl();
	}
	getBaseUrl() {
		return this.baseUrl;
	}
	async getProducts(params) {
		return getProducts(params);
	}
	async getProductBySlugOrId(idOrSlug) {
		return getProduct(idOrSlug);
	}
	async getVendors() {
		return getVendors();
	}
	async getVendorByIdOrSlug(id) {
		return getVendor(id);
	}
	async getStoreBySlug(slug) {
		return getStore(slug);
	}
	async getCategories() {
		return getCategories();
	}
	async getFeatured() {
		return getFeatured();
	}
	async search(query) {
		return searchMarketplace(query);
	}
};
var payroxaApi = new PayroxaApiClient();
var _jsxFileName$1 = "/app/applet/src/components/MarketplaceGrid.tsx";
function MarketplaceGrid({ category, searchQuery, featuredOnly, limit, className = "", initialViewMode = "grid", showToolbar = true, onResetFilters }) {
	const [products, setProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [viewMode, setViewMode] = (0, import_react.useState)(initialViewMode);
	const [sortBy, setSortBy] = (0, import_react.useState)("default");
	const fetchProducts = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const params = {};
			if (category) params.category = category;
			if (searchQuery) params.search = searchQuery;
			if (featuredOnly) params.featured = true;
			if (limit) params.limit = limit;
			const response = await payroxaApi.getProducts(params);
			if (response.success && response.data) setProducts(response.data);
			else setError(response.error?.message || "Unable to load products from Payroxa Marketplace.");
		} catch (err) {
			setError(err?.message || "Failed to communicate with Payroxa API service.");
		} finally {
			setLoading(false);
		}
	}, [
		category,
		searchQuery,
		featuredOnly,
		limit
	]);
	(0, import_react.useEffect)(() => {
		fetchProducts();
	}, [fetchProducts]);
	const sortedProducts = (0, import_react.useMemo)(() => {
		const list = [...products];
		if (sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
		if (sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
		if (sortBy === "name-asc") return list.sort((a, b) => a.name.localeCompare(b.name));
		return list;
	}, [products, sortBy]);
	const getContainerLayoutClass = () => {
		switch (viewMode) {
			case "dense": return "grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";
			case "showcase": return "grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3";
			case "list": return "flex flex-col gap-4";
			default: return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "w-full space-y-6",
		children: [showToolbar && !loading && !error && products.length > 0 && /* @__PURE__ */ (void 0)("div", {
			className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card/60 p-3 shadow-soft backdrop-blur-md",
			children: [/* @__PURE__ */ (void 0)("div", {
				className: "flex items-center gap-2 text-xs font-semibold text-muted-foreground px-2",
				children: [/* @__PURE__ */ (void 0)("span", { children: [
					"Showing ",
					/* @__PURE__ */ (void 0)("strong", {
						className: "text-foreground font-bold",
						children: sortedProducts.length
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 111,
						columnNumber: 23
					}, this),
					" ",
					sortedProducts.length === 1 ? "Product" : "Products"
				] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 110,
					columnNumber: 13
				}, this), category && /* @__PURE__ */ (void 0)("span", {
					className: "rounded-full bg-primary/10 px-2.5 py-0.5 text-primary text-[11px] font-bold",
					children: category
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 115,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 109,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between sm:justify-end gap-3 flex-wrap",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(SlidersHorizontal, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 124,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("select", {
						value: sortBy,
						onChange: (e) => setSortBy(e.target.value),
						className: "rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-soft cursor-pointer",
						children: [
							/* @__PURE__ */ (void 0)("option", {
								value: "default",
								children: "Default Sort"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 130,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("option", {
								value: "price-asc",
								children: "Price: Low to High"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 131,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("option", {
								value: "price-desc",
								children: "Price: High to Low"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 132,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("option", {
								value: "name-asc",
								children: "Name: A to Z"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 133,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 125,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 123,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center rounded-xl border border-border bg-muted/50 p-1 gap-0.5",
					children: [
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setViewMode("grid"),
							title: "Comfort Grid View (4 Columns)",
							className: `rounded-lg p-1.5 transition-all ${viewMode === "grid" ? "bg-background text-foreground shadow-soft font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: /* @__PURE__ */ (void 0)(LayoutGrid, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 149,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 139,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setViewMode("dense"),
							title: "Dense Catalog Grid (6 Columns)",
							className: `rounded-lg p-1.5 transition-all ${viewMode === "dense" ? "bg-background text-foreground shadow-soft font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: /* @__PURE__ */ (void 0)(Grid3x3, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 161,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 151,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setViewMode("showcase"),
							title: "Showcase Cards View (2-3 Columns)",
							className: `rounded-lg p-1.5 transition-all ${viewMode === "showcase" ? "bg-background text-foreground shadow-soft font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: /* @__PURE__ */ (void 0)(Grid2x2, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 173,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 163,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							type: "button",
							onClick: () => setViewMode("list"),
							title: "List Rows View",
							className: `rounded-lg p-1.5 transition-all ${viewMode === "list" ? "bg-background text-foreground shadow-soft font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: /* @__PURE__ */ (void 0)(List, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 185,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 175,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 138,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 121,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 108,
			columnNumber: 9
		}, this), loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`,
			children: Array.from({ length: limit || 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-[4/5] rounded-2xl bg-muted/60 animate-pulse border border-border/40" }, i, false, {
				fileName: _jsxFileName$1,
				lineNumber: 196,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 194,
			columnNumber: 9
		}, this) : error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center my-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-semibold text-destructive",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 204,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Please check your connection or retry fetching products."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 205,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: fetchProducts,
					type: "button",
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-3.5" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 213,
						columnNumber: 13
					}, this), " Retry Fetching"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 208,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 203,
			columnNumber: 9
		}, this) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-3xl border border-border bg-card p-12 text-center my-6 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "mx-auto size-12 text-muted-foreground/50 mb-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 218,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-bold text-foreground",
					children: "No marketplace products found"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 219,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "There are no products matching your current criteria."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 220,
					columnNumber: 11
				}, this),
				onResetFilters && /* @__PURE__ */ (void 0)("button", {
					onClick: onResetFilters,
					type: "button",
					className: "mt-6 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all cursor-pointer",
					children: "Reset Filters"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 224,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 217,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: `${getContainerLayoutClass()} ${className}`,
			children: sortedProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
				product,
				viewMode
			}, product.id, false, {
				fileName: _jsxFileName$1,
				lineNumber: 236,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 234,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 105,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/marketplace.tsx?tsr-split=component";
function MarketplacePage() {
	useNavigate();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("");
	const [products, setProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [featured, setFeatured] = (0, import_react.useState)({
		featuredProducts: [],
		featuredVendors: [],
		featuredStores: []
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadData = async (cat, q) => {
		setLoading(true);
		setError(null);
		try {
			const [prodRes, catRes, featRes] = await Promise.all([
				getProducts({
					category: cat,
					search: q
				}),
				getCategories(),
				getFeatured()
			]);
			if (prodRes.success) setProducts(prodRes.data || []);
			else setError(prodRes.error?.message || "Failed to load products");
			if (catRes.success) setCategories(catRes.data || []);
			if (featRes.success && featRes.data) setFeatured({
				featuredProducts: featRes.data.featuredProducts || [],
				featuredVendors: featRes.data.featuredVendors || [],
				featuredStores: featRes.data.featuredStores || []
			});
		} catch (err) {
			setError(err?.message || "Marketplace temporarily unavailable");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData(selectedCategory, searchQuery);
	}, [selectedCategory]);
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		loadData(selectedCategory, searchQuery);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-muted/50 to-background py-16 lg:py-24",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-7xl px-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 13
						}, this), " Powered by Payroxa Authoritative Source of Truth"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl mx-auto font-display",
						children: "Discover African Commerce & Verified Vendors"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 68,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto",
						children: "Browse authentic products, verified storefronts, and elite merchants. Buy securely or open your digital business in Payroxa."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSearchSubmit,
						className: "mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "Search products, brands, stores...",
								className: "w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm font-medium text-foreground shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "submit",
							className: "rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2",
							children: "Search"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setSelectedCategory(""),
							className: `rounded-full px-5 py-2 text-xs font-semibold transition-all ${!selectedCategory ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"}`,
							children: "All Products"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 13
						}, this), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setSelectedCategory(cat.slug),
							className: `rounded-full px-5 py-2 text-xs font-semibold transition-all ${selectedCategory === cat.slug ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"}`,
							children: cat.name
						}, cat.id, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 36
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 64,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 63,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-7xl px-5 py-12",
			children: [
				error && /* @__PURE__ */ (void 0)("div", {
					className: "mb-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm font-semibold text-destructive",
							children: error
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Please check your network or try again shortly."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("button", {
							onClick: () => loadData(selectedCategory, searchQuery),
							className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground",
							children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 15
							}, this), " Retry Connection"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 19
				}, this),
				!selectedCategory && !searchQuery && featured.featuredProducts.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "mb-16",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-bold tracking-tight font-display",
							children: "Featured Marketplace Items"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground",
							children: "Curated picks from verified merchants on Payroxa"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 17
							}, this), " Verified Authentic"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.featuredProducts.slice(0, 3).map((product) => /* @__PURE__ */ (void 0)("div", {
							className: "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "aspect-[4/3] w-full overflow-hidden bg-muted relative",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: product.images[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
									alt: product.images[0]?.alt || product.name,
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
									loading: "lazy"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft",
									children: [
										product.currency,
										" ",
										product.price.toLocaleString()
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-1 flex-col justify-between p-5",
								children: [/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between text-xs text-muted-foreground mb-2",
										children: [/* @__PURE__ */ (void 0)("span", { children: product.category.name }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 138,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "flex items-center gap-1 text-emerald-600 font-medium",
											children: [
												/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 140,
													columnNumber: 27
												}, this),
												" ",
												product.vendor.name
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 139,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("h3", {
										className: "text-base font-bold text-foreground group-hover:text-primary transition-colors",
										children: product.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-2 text-xs text-muted-foreground line-clamp-2",
										children: product.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 146,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-6 flex items-center justify-between pt-4 border-t border-border/60",
									children: [/* @__PURE__ */ (void 0)(Link, {
										to: "/marketplace/product/$slug",
										params: { slug: product.slug },
										className: "text-xs font-bold text-primary flex items-center gap-1 hover:underline",
										children: ["View Details ", /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 38
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 151,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("a", {
										href: product.appUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-1",
										children: ["Buy on Payroxa ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 157,
											columnNumber: 40
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 156,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 150,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 19
							}, this)]
						}, product.id, true, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 69
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 87
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold tracking-tight font-display",
						children: selectedCategory ? `Category: ${selectedCategory}` : "All Marketplace Products"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: "Showing real-time records directly from Payroxa database"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs font-medium text-muted-foreground",
						children: loading ? "Fetching records..." : `${products.length} products found`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 166,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MarketplaceGrid, {
					category: selectedCategory,
					searchQuery,
					onResetFilters: () => {
						setSelectedCategory("");
						setSearchQuery("");
					}
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 9
				}, this),
				!selectedCategory && !searchQuery && featured.featuredVendors.length > 0 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-24 border-t border-border pt-16",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "text-center max-w-2xl mx-auto mb-12",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-bold tracking-tight font-display",
							children: "Featured Merchants & Stores"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Verified businesses running their operations securely on Payroxa"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.featuredVendors.map((vendor) => /* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-4 mb-4",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: vendor.logo,
									alt: vendor.name,
									className: "size-14 rounded-2xl object-cover border border-border"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 201,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-base font-bold text-foreground flex items-center gap-1.5",
									children: [
										vendor.name,
										" ",
										/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 204,
											columnNumber: 41
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5",
									children: [
										/* @__PURE__ */ (void 0)(MapPin, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 27
										}, this),
										" ",
										vendor.location || "Lagos, Nigeria"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 206,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 202,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground line-clamp-2 mb-6",
								children: vendor.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between pt-4 border-t border-border/60",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: [vendor.productCount || 10, "+ Active Products"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("a", {
									href: vendor.appUrl || "https://app.payroxa.com.ng",
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-xl border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted flex items-center gap-1.5",
									children: ["Shop on Payroxa ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 39
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 19
							}, this)]
						}, vendor.id, true, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 55
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 86
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 100,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 61,
		columnNumber: 10
	}, this);
}
//#endregion
export { MarketplacePage as component };
