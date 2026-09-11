import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as List, D as ShieldAlert, E as ShieldCheck, Ft as ChevronRight, M as Search, Ot as Coins, P as RotateCw, Q as LoaderCircle, W as Minus, _ as Tag, b as Sparkles, d as Truck, ft as Funnel, h as ThumbsUp, jt as CircleCheck, lt as Grid3x3, m as Trash2, n as Zap, nt as LayoutGrid, p as TrendingUp, qt as ArrowUpDown, r as X, s as User, w as ShoppingBag, x as Sparkle, y as Star, z as Plus } from "../_libs/lucide-react.mjs";
import { i as getProducts, n as getFeatured, t as getCategories } from "./client-BFST2zXS.mjs";
import { n as useCart, t as updateSEO } from "./useCart-CJDZuE1b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-Cvd4yw6t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var TEMU_CIRCLE_CATEGORIES = [
	{
		id: "all",
		name: "All Drops",
		image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&q=80",
		slug: ""
	},
	{
		id: "clothing",
		name: "Apparel",
		image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&q=80",
		slug: "clothing-apparel"
	},
	{
		id: "electronics",
		name: "Electronics",
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80",
		slug: "electronics-gadgets"
	},
	{
		id: "agriculture",
		name: "Agribusiness",
		image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=150&q=80",
		slug: "agriculture-foods"
	},
	{
		id: "crafts",
		name: "Artisanal",
		image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&q=80",
		slug: "crafts-art"
	},
	{
		id: "beauty",
		name: "Cosmetics",
		image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80",
		slug: "beauty-wellness"
	},
	{
		id: "home",
		name: "Homeware",
		image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=150&q=80",
		slug: "home-living"
	}
];
var FLASH_PROMO_SLIDES = [
	{
		id: "promo_1",
		badge: "⚡ NEW LEDGER DEAL",
		title: "UP TO 90% OFF ON VERIFIED DROPS",
		highlight: "Sovereign Savings Enabled",
		tagline: "Free Express DHL Air Cargo on all checkouts today!",
		couponCode: "PAYROXA90",
		bgClass: "from-amber-600 via-orange-600 to-red-600 text-white"
	},
	{
		id: "promo_2",
		badge: "🛡️ ESCROW GUARANTEE",
		title: "100% SHIELDED MULTI-SIG TRANSACTIONS",
		highlight: "Sellers Paid Only After You Approve",
		tagline: "Secure ledger vaults automatically lock funds.",
		couponCode: "SAFEVAULT",
		bgClass: "from-indigo-900 via-purple-900 to-navy text-white"
	},
	{
		id: "promo_3",
		badge: "🔥 MEGA COUPE EVENT",
		title: "SPIN THE LEDGER WHEEL FOR FREE CREDIT",
		highlight: "Earn Up to NGN 50,000 / $100 Instantly",
		tagline: "First spin is 100% free with guaranteed checkout discount.",
		couponCode: "LUCKYSPIN",
		bgClass: "from-emerald-700 via-teal-800 to-cyan-900 text-white"
	}
];
var _jsxFileName = "/app/applet/src/routes/marketplace.tsx?tsr-split=component";
function MarketplacePage() {
	useNavigate();
	const { items: cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalCount } = useCart();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("");
	const [selectedCurrency, setSelectedCurrency] = (0, import_react.useState)("ALL");
	const [minPrice, setMinPrice] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const [verifiedOnly, setVerifiedOnly] = (0, import_react.useState)(false);
	const [sortBy, setSortBy] = (0, import_react.useState)("default");
	const [viewMode, setViewMode] = (0, import_react.useState)("dense");
	const [activeFilterTab, setActiveFilterTab] = (0, import_react.useState)("all");
	const [isCartOpen, setIsCartOpen] = (0, import_react.useState)(false);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = (0, import_react.useState)(false);
	const [checkoutStep, setCheckoutStep] = (0, import_react.useState)("idle");
	const [shippingName, setShippingName] = (0, import_react.useState)("");
	const [shippingPhone, setShippingPhone] = (0, import_react.useState)("");
	const [shippingAddress, setShippingAddress] = (0, import_react.useState)("");
	const [checkoutHash, setCheckoutHash] = (0, import_react.useState)("");
	const [allProducts, setAllProducts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [featured, setFeatured] = (0, import_react.useState)({
		featuredProducts: [],
		featuredVendors: [],
		featuredStores: []
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [isSpinning, setIsSpinning] = (0, import_react.useState)(false);
	const [wheelResult, setWheelResult] = (0, import_react.useState)(null);
	const [wheelRotation, setWheelRotation] = (0, import_react.useState)(0);
	const [currentSlide, setCurrentSlide] = (0, import_react.useState)(0);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)({
		hours: 11,
		minutes: 24,
		seconds: 43
	});
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [isFilterPanelOpen, setIsFilterPanelOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (toastMessage) {
			const timer = setTimeout(() => {
				setToastMessage(null);
			}, 5e3);
			return () => clearTimeout(timer);
		}
	}, [toastMessage]);
	const loadData = async () => {
		setLoading(true);
		setError(null);
		try {
			const [prodRes, catRes, featRes] = await Promise.all([
				getProducts({}),
				getCategories(),
				getFeatured()
			]);
			if (prodRes.success) setAllProducts(prodRes.data || []);
			else setError(prodRes.error?.message || "Failed to load products");
			if (catRes.success) setCategories(catRes.data || []);
			if (featRes.success && featRes.data) setFeatured({
				featuredProducts: featRes.data.featuredProducts || [],
				featuredVendors: featRes.data.featuredVendors || [],
				featuredStores: featRes.data.featuredStores || []
			});
		} catch (err) {
			setError(err?.message || "Marketplace temporarily offline");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadData();
		updateSEO({
			title: "Payroxa Sovereign Marketplace | High-Conversion Escrow Drops",
			description: "Browse organic clothing, tech gadgets, agricultural goods, and custom crafts securely held in escrow vault custody on Payroxa.",
			type: "website"
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const slideInterval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % FLASH_PROMO_SLIDES.length);
		}, 6e3);
		return () => clearInterval(slideInterval);
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) return {
					...prev,
					seconds: prev.seconds - 1
				};
				if (prev.minutes > 0) return {
					...prev,
					minutes: prev.minutes - 1,
					seconds: 59
				};
				if (prev.hours > 0) return {
					hours: prev.hours - 1,
					minutes: 59,
					seconds: 59
				};
				return {
					hours: 23,
					minutes: 59,
					seconds: 59
				};
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	const handleSpinWheel = () => {
		if (isSpinning) return;
		setIsSpinning(true);
		setWheelResult(null);
		const extraDegrees = Math.floor(Math.random() * 360);
		const newRotation = wheelRotation + 1800 + extraDegrees;
		setWheelRotation(newRotation);
		setTimeout(() => {
			setIsSpinning(false);
			const prizes = [
				{
					prize: "15% OFF Escrow Checkout",
					coupon: "SOVEREIGN15",
					discountPercent: 15
				},
				{
					prize: "FREE Express Air DHL Cargo",
					coupon: "SHIPDHL",
					discountPercent: 5
				},
				{
					prize: "Zero Safe-Vault Escrow Fees",
					coupon: "NOFEE",
					discountPercent: 10
				},
				{
					prize: "NGN 25,000 / $50 Safe Wallet Credit",
					coupon: "VAULT50",
					discountPercent: 20
				}
			];
			setWheelResult(prizes[Math.floor(Math.random() * prizes.length)]);
		}, 3e3);
	};
	const filteredProducts = (0, import_react.useMemo)(() => {
		let list = [...allProducts];
		if (selectedCategory) list = list.filter((p) => p.category?.slug === selectedCategory || p.category?.name.toLowerCase() === selectedCategory.toLowerCase());
		if (searchQuery) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.name.toLowerCase().includes(q) || p.vendor?.name.toLowerCase().includes(q));
		}
		if (selectedCurrency !== "ALL") list = list.filter((p) => p.currency === selectedCurrency);
		if (minPrice !== "") {
			const min = parseFloat(minPrice);
			if (!isNaN(min)) list = list.filter((p) => p.price >= min);
		}
		if (maxPrice !== "") {
			const max = parseFloat(maxPrice);
			if (!isNaN(max)) list = list.filter((p) => p.price <= max);
		}
		if (verifiedOnly) list = list.filter((p) => p.vendor?.verified);
		if (activeFilterTab === "deals") list = list.filter((p) => p.price % 3 !== 0);
		else if (activeFilterTab === "stars") list = list.filter((p, idx) => idx % 2 === 0);
		else if (activeFilterTab === "best") list = list.filter((p, idx) => idx % 3 === 0);
		if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
		else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
		else if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
		return list;
	}, [
		allProducts,
		selectedCategory,
		searchQuery,
		selectedCurrency,
		minPrice,
		maxPrice,
		verifiedOnly,
		sortBy,
		activeFilterTab
	]);
	const handleResetFilters = () => {
		setSelectedCategory("");
		setSearchQuery("");
		setSelectedCurrency("ALL");
		setMinPrice("");
		setMaxPrice("");
		setVerifiedOnly(false);
		setSortBy("default");
		setActiveFilterTab("all");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#F5F5F7] text-foreground font-sans pb-24 relative",
		children: [
			toastMessage && /* @__PURE__ */ (void 0)("div", {
				className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "bg-black/95 backdrop-blur-md text-white text-xs font-black p-4 rounded-2xl shadow-glow flex items-center justify-between border border-white/10 animate-fade-in",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 text-yellow-400 animate-pulse shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: toastMessage }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						onClick: () => setToastMessage(null),
						className: "text-white/60 hover:text-white font-bold px-2 py-1 text-[10px] cursor-pointer",
						children: "✕"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 248,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 243,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 242,
				columnNumber: 24
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "bg-white px-4 py-3 sticky top-0 z-50 border-b border-border/40 shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-1 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-2xl font-black tracking-tight text-orange-600 font-display",
								children: "PAYROXA"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex-1 max-w-xl relative",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: "Search ears pods, apparel, tech gadgets...",
								className: "w-full bg-[#F5F5F7] rounded-full pl-5 pr-10 py-2.5 text-xs font-semibold text-foreground border border-transparent focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-4 text-foreground shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setViewMode((prev) => prev === "dense" ? "grid" : prev === "grid" ? "list" : "dense"),
									title: `Switch View Mode (Current: ${viewMode})`,
									className: "p-1 hover:text-orange-600 transition-colors flex items-center gap-1 text-xs font-bold",
									children: [
										viewMode === "dense" && /* @__PURE__ */ (void 0)(Grid3x3, { className: "size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 270,
											columnNumber: 40
										}, this),
										viewMode === "grid" && /* @__PURE__ */ (void 0)(LayoutGrid, { className: "size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 271,
											columnNumber: 39
										}, this),
										viewMode === "list" && /* @__PURE__ */ (void 0)(List, { className: "size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 39
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "hidden sm:inline capitalize",
											children: viewMode
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 273,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 269,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/cms-admin/login",
									title: "Member Access",
									className: "flex items-center gap-1.5 p-1 hover:text-orange-600 transition-colors group",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] font-black uppercase tracking-tighter hidden sm:inline group-hover:underline",
										children: "Member"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative cursor-pointer hover:text-orange-600 transition-colors p-1",
									onClick: () => setIsCartOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 282,
										columnNumber: 15
									}, this), totalCount > 0 && /* @__PURE__ */ (void 0)("span", {
										className: "absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] font-bold rounded-full size-4 flex items-center justify-center animate-bounce",
										children: totalCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 34
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 281,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 256,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 255,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "bg-white border-b border-border/40 overflow-x-auto scrollbar-none sticky top-[61px] z-40 py-2.5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto px-4 flex items-center gap-6 whitespace-nowrap text-xs font-extrabold text-muted-foreground",
					children: TEMU_CIRCLE_CATEGORIES.map((cat) => {
						const isActive = cat.slug === "" && !selectedCategory || selectedCategory === cat.slug;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setSelectedCategory(cat.slug),
							className: `transition-colors relative pb-1 ${isActive ? "text-orange-600 font-black" : "hover:text-foreground"}`,
							children: [cat.name, isActive && /* @__PURE__ */ (void 0)("span", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 30
							}, this)]
						}, cat.id, true, {
							fileName: _jsxFileName,
							lineNumber: 296,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 293,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 292,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-[#FFF4EB] border-b border-[#FFE4D0] py-2.5 px-4 text-xs text-[#8A4A1C] font-semibold",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-emerald-600 font-black",
								children: "✔"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 308,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Free shipping" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-muted-foreground/80 font-normal",
								children: "| Limited-time offer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 307,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-3.5 text-orange-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Delivery guarantee" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-muted-foreground/80 font-normal",
								children: "| Refund for any issue"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 306,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 305,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-[#00B050] text-white py-2 px-4 text-xs font-bold shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between cursor-pointer",
					onClick: () => document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" }),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "bg-white text-[#00B050] text-[9px] rounded-full size-4 flex items-center justify-center font-bold",
								children: "✔"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Why choose Payroxa?" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 333,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "bg-black/15 text-white text-[10px] px-2 py-0.5 rounded ml-2 font-normal",
								children: "Secure multi-sig escrow"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 334,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 329,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs flex items-center gap-0.5 font-bold",
						children: ["Browse Catalog ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 339,
							columnNumber: 28
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 338,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 326,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					onClick: () => {
						setMaxPrice("10000");
						setMinPrice("0");
						document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" });
						setToastMessage("Clearance Filter Activated! Showing items under ₦10,000.");
					},
					className: "bg-white border border-border/40 rounded-2xl p-4 flex flex-col justify-between shadow-soft hover:shadow-medium transition-all cursor-pointer hover:scale-[1.01]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2 border-b border-border/30 pb-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-black text-red-600 flex items-center gap-1 uppercase tracking-wider",
								children: "🔻 Clearance deals"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 355,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 354,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-square w-full rounded-xl bg-muted overflow-hidden relative mb-2",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
								alt: "Clearance Item",
								className: "w-full h-full object-cover",
								referrerPolicy: "no-referrer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 361,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 360,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-black text-red-600",
								children: "₦2,541"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-muted-foreground line-through",
								children: "₦4,606"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 365,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 363,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 346,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					onClick: () => {
						setActiveFilterTab("deals");
						document.getElementById("catalog-hub")?.scrollIntoView({ behavior: "smooth" });
						setToastMessage("Lightning Deals Active! Filtering catalog for high-demand flash drops.");
					},
					className: "bg-white border border-border/40 rounded-2xl p-4 flex flex-col justify-between shadow-soft hover:shadow-medium transition-all cursor-pointer hover:scale-[1.01]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2 border-b border-border/30 pb-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-black text-orange-600 flex items-center gap-1 uppercase tracking-wider",
								children: "⚡ Lightning deals"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 377,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3.5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 376,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "aspect-square w-full rounded-xl bg-muted overflow-hidden relative mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80",
								alt: "Lightning Item",
								className: "w-full h-full object-cover",
								referrerPolicy: "no-referrer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 383,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "absolute bottom-2 left-2 bg-black/75 text-white text-[9px] font-black px-1.5 py-0.5 rounded",
								children: "Only 15 left"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 384,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 382,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm font-black text-orange-600",
								children: "₦1,311"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] text-muted-foreground line-through",
								children: "₦6,221"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 390,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 388,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 369,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 345,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "bg-white border-y border-border/40 overflow-x-auto scrollbar-none py-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-7xl mx-auto px-4 flex items-center gap-3",
					children: [
						{
							id: "all",
							label: "All",
							icon: null
						},
						{
							id: "deals",
							label: "Deals",
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 17
							}, this)
						},
						{
							id: "stars",
							label: "5-Star Rated",
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-3.5 fill-yellow-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 17
							}, this)
						},
						{
							id: "best",
							label: "Best-Selling Items",
							icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThumbsUp, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 413,
								columnNumber: 17
							}, this)
						}
					].map((tab) => {
						const isActive = activeFilterTab === tab.id;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setActiveFilterTab(tab.id),
							className: `rounded-full px-5 py-2 text-xs font-black transition-all flex items-center gap-1.5 border whitespace-nowrap ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-soft" : "bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted"}`,
							children: [tab.icon, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: tab.label }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 418,
								columnNumber: 17
							}, this)]
						}, tab.id, true, {
							fileName: _jsxFileName,
							lineNumber: 416,
							columnNumber: 18
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 397,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 396,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "py-6 px-4 max-w-7xl mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-card transition-all bg-gradient-to-r ${FLASH_PROMO_SLIDES[currentSlide].bgClass}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 bg-yellow-400 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider",
								children: FLASH_PROMO_SLIDES[currentSlide].badge
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 428,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-xl sm:text-3xl font-black font-display tracking-tight leading-tight",
								children: FLASH_PROMO_SLIDES[currentSlide].title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-white/90 font-semibold max-w-lg",
								children: [
									FLASH_PROMO_SLIDES[currentSlide].highlight,
									".",
									" ",
									FLASH_PROMO_SLIDES[currentSlide].tagline
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 427,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shrink-0 text-center text-white min-w-[200px]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[10px] font-bold uppercase tracking-wider",
							children: "Coupon Code"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 440,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-lg font-black text-yellow-300 font-mono tracking-widest",
							children: FLASH_PROMO_SLIDES[currentSlide].couponCode
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 441,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 439,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 426,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 425,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "max-w-7xl mx-auto px-4 mb-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-white border border-border/40 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-flex items-center gap-1 bg-orange-600 text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCw, { className: "size-3 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 453,
									columnNumber: 15
								}, this), " Free wallet spin"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 452,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-lg sm:text-xl font-black text-foreground font-display",
								children: "Unpack Your Escrow Settlement Bonus"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 455,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground leading-normal",
								children: "Every merchant checkout is held on a safe escrow ledger. Spin our lucky wheel to unlock instantly credited checkout discounts!"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 458,
								columnNumber: 13
							}, this),
							wheelResult && /* @__PURE__ */ (void 0)("div", {
								className: "bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 inline-block animate-fade-in",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1",
									children: "✔ REWARD APPLIED"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 463,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs font-black text-foreground mt-0.5",
									children: wheelResult.prize
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 466,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 462,
								columnNumber: 29
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 451,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-full max-w-[240px] shrink-0 flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "relative size-40 rounded-full border-4 border-orange-600 bg-muted overflow-hidden shadow-medium transition-transform duration-[3000ms] ease-out",
							style: { transform: `rotate(${wheelRotation}deg)` },
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-tr from-orange-500 via-yellow-400 to-red-500 opacity-80" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 474,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute inset-0 flex items-center justify-center text-center text-white text-[9px] font-black font-sans leading-none",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "bg-black/40 p-2 rounded-full uppercase tracking-wider",
									children: "Lucky Reel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 476,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 475,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 471,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: handleSpinWheel,
							disabled: isSpinning,
							className: "w-full bg-orange-600 hover:bg-orange-700 disabled:bg-muted text-white py-2.5 text-xs font-black rounded-xl transition-all shadow-soft",
							children: isSpinning ? "SPINNING..." : "SPIN AND CLAIM NOW"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 470,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 450,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 449,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "catalog-hub",
				className: "max-w-7xl mx-auto px-4 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-border/30",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between w-full sm:w-auto gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-sm font-black text-foreground uppercase tracking-wider flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "size-4 text-orange-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 493,
									columnNumber: 15
								}, this), " Sovereign Catalog Drops"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-bold bg-muted px-2 py-1 rounded text-muted-foreground sm:hidden",
								children: [filteredProducts.length, " drops"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 495,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 491,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 self-end sm:self-auto",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden sm:inline-block text-[10px] font-bold bg-muted px-2 py-1 rounded text-muted-foreground mr-2",
								children: [filteredProducts.length, " drops match"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 501,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => setIsFilterPanelOpen(!isFilterPanelOpen),
								className: `flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${isFilterPanelOpen || selectedCurrency !== "ALL" || minPrice !== "" || maxPrice !== "" || verifiedOnly || sortBy !== "default" ? "bg-orange-50 border-orange-500 text-orange-600 shadow-soft" : "bg-white border-border/60 hover:bg-muted/10 text-muted-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 505,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Filters ", isFilterPanelOpen ? "Close" : "Open"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 15
									}, this),
									(selectedCurrency !== "ALL" || minPrice !== "" || maxPrice !== "" || verifiedOnly || sortBy !== "default") && /* @__PURE__ */ (void 0)("span", { className: "bg-orange-600 size-1.5 rounded-full" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 507,
										columnNumber: 126
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 500,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 490,
						columnNumber: 9
					}, this),
					isFilterPanelOpen && /* @__PURE__ */ (void 0)("div", {
						className: "bg-white border border-border/40 rounded-3xl p-5 mb-6 shadow-soft space-y-4 animate-fade-in",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(ArrowUpDown, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 518,
											columnNumber: 19
										}, this), " Sort By"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 517,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("select", {
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										className: "w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-orange-500 transition-all cursor-pointer",
										children: [
											/* @__PURE__ */ (void 0)("option", {
												value: "default",
												children: "Default Drops"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 521,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "price-asc",
												children: "Price: Low to High"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 522,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "price-desc",
												children: "Price: High to Low"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 523,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("option", {
												value: "name-asc",
												children: "Name: A to Z"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 524,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 520,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 516,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(Coins, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 531,
											columnNumber: 19
										}, this), " Currency"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 530,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex gap-1 overflow-x-auto scrollbar-none pb-1",
										children: [
											"ALL",
											"NGN",
											"GHS",
											"KES",
											"USD"
										].map((curr) => /* @__PURE__ */ (void 0)("button", {
											onClick: () => setSelectedCurrency(curr),
											className: `px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase transition-all whitespace-nowrap cursor-pointer ${selectedCurrency === curr ? "bg-orange-600 text-white border-orange-600" : "bg-[#F5F5F7] text-muted-foreground border-border/30 hover:bg-muted"}`,
											children: curr
										}, curr, false, {
											fileName: _jsxFileName,
											lineNumber: 534,
											columnNumber: 68
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 533,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 529,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-muted-foreground uppercase text-[10px] tracking-wide flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(Tag, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 543,
											columnNumber: 19
										}, this), " Price Range"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 542,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (void 0)("input", {
												type: "number",
												value: minPrice,
												onChange: (e) => setMinPrice(e.target.value),
												placeholder: "Min",
												className: "w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-orange-500"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 546,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground text-xs font-bold",
												children: "-"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 547,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("input", {
												type: "number",
												value: maxPrice,
												onChange: (e) => setMaxPrice(e.target.value),
												placeholder: "Max",
												className: "w-full bg-[#F5F5F7] border border-border/40 rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-orange-500"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 548,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 545,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 541,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5 flex flex-col justify-end",
									children: /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between bg-[#F5F5F7] border border-border/40 rounded-xl p-2.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-bold text-foreground flex items-center gap-1.5",
											children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4 text-emerald-600" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 556,
												columnNumber: 21
											}, this), " Verified Merchant"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											onClick: () => setVerifiedOnly(!verifiedOnly),
											className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${verifiedOnly ? "bg-emerald-600" : "bg-muted"}`,
											children: /* @__PURE__ */ (void 0)("span", { className: `pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${verifiedOnly ? "translate-x-4" : "translate-x-0"}` }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 559,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 558,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 554,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 553,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 514,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex justify-end pt-2 border-t border-border/30",
							children: /* @__PURE__ */ (void 0)("button", {
								onClick: handleResetFilters,
								className: "bg-[#F5F5F7] hover:bg-[#E5E5E7] text-muted-foreground px-4 py-2 rounded-xl text-[11px] font-black uppercase transition-all cursor-pointer",
								children: "Reset All Filters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 567,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 566,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 513,
						columnNumber: 31
					}, this),
					loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-4",
						children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-[3/4] rounded-2xl bg-muted animate-pulse border border-border/30" }, i, false, {
							fileName: _jsxFileName,
							lineNumber: 576,
							columnNumber: 26
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 573,
						columnNumber: 20
					}, this) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-white rounded-3xl p-12 border border-border/40 text-center shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "size-10 text-muted-foreground mx-auto mb-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 578,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-muted-foreground",
								children: "No active escrow drops match the criteria."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 579,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: handleResetFilters,
								className: "mt-4 bg-orange-600 text-white text-[11px] font-black px-4 py-2 rounded-xl",
								children: "Clear All Filters"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 582,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 577,
						columnNumber: 52
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: viewMode === "dense" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2" : viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6" : "grid grid-cols-1 gap-4",
						children: filteredProducts.map((p, idx) => {
							const rating = (4.7 + idx % 4 * .1).toFixed(1);
							const ratingCount = 120 + idx % 12 * 85;
							const imageSource = p.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
							const savingPct = p.price % 20 + 50;
							const originalPrice = Math.round(p.price * (100 / (100 - savingPct)));
							if (viewMode === "list") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
								className: "flex bg-white rounded-2xl border border-border/50 overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative w-32 sm:w-44 aspect-square bg-muted shrink-0 overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: imageSource,
										alt: p.name,
										className: "w-full h-full object-cover",
										loading: "lazy",
										referrerPolicy: "no-referrer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 595,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft",
										children: [
											"-",
											savingPct,
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 594,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-4 flex flex-col justify-between flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center justify-between text-[10px] text-muted-foreground font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: p.category?.name }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 603,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-emerald-600 shrink-0",
													children: ["✔ ", p.vendor?.name]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 604,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 602,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
												className: "text-sm font-black text-foreground group-hover:text-orange-600 transition-colors",
												children: p.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 606,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-muted-foreground line-clamp-2 hidden sm:block",
												children: p.description || "Premium verified escrow drop cataloged directly from sovereign workshops."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 609,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-baseline gap-1.5 pt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-sm font-black text-orange-600",
													children: [
														p.currency,
														" ",
														p.price.toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 613,
													columnNumber: 27
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[10px] text-muted-foreground line-through font-semibold",
													children: [
														p.currency,
														" ",
														originalPrice.toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 616,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 612,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 601,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between pt-3 border-t border-border/40 mt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/marketplace/product/$slug",
											params: { slug: p.slug },
											className: "text-xs font-bold text-orange-600 hover:underline flex items-center",
											children: ["Inspect Details ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 626,
												columnNumber: 43
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 623,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											onClick: () => {
												addToCart({
													id: p.id,
													name: p.name,
													price: p.price,
													currency: p.currency,
													image: imageSource,
													slug: p.slug
												});
												setIsCartOpen(true);
												setToastMessage(`"${p.name}" added to escrow shopping cart!`);
											},
											className: "bg-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-orange-700 transition-colors cursor-pointer",
											children: "Claim Drop"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 628,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 622,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 21
								}, this)]
							}, p.id, true, {
								fileName: _jsxFileName,
								lineNumber: 593,
								columnNumber: 20
							}, this);
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
								className: `group bg-white rounded-2xl border border-border/50 overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-medium transition-all duration-300 ${viewMode === "dense" ? "p-1 sm:p-2" : "p-0"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative aspect-square bg-muted overflow-hidden rounded-xl",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: imageSource,
										alt: p.name,
										className: "w-full h-full object-cover group-hover:scale-103 transition-transform duration-500",
										loading: "lazy",
										referrerPolicy: "no-referrer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 648,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft",
										children: [
											"-",
											savingPct,
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 649,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 647,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `flex flex-col justify-between flex-1 space-y-2 ${viewMode === "dense" ? "p-2 pt-3" : "p-3.5"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center justify-between text-[9px] text-muted-foreground font-bold",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "truncate max-w-[80px]",
														children: p.category?.name
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 657,
														columnNumber: 25
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-emerald-600 shrink-0",
														children: ["✔ ", p.vendor?.name]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 658,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 656,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
													className: "text-xs font-black text-foreground group-hover:text-orange-600 line-clamp-1 leading-snug",
													children: p.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 660,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-baseline gap-1.5 pt-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-xs font-black text-orange-600",
														children: [
															p.currency,
															" ",
															p.price.toLocaleString()
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 664,
														columnNumber: 25
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-[9px] text-muted-foreground line-through font-semibold",
														children: [
															p.currency,
															" ",
															originalPrice.toLocaleString()
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 667,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 663,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 655,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1 text-[9px] text-yellow-500 font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex text-yellow-400",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-3 fill-yellow-400 text-yellow-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 675,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 674,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												rating,
												" (",
												ratingCount,
												")"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 677,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 673,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "pt-2 border-t border-border/40 flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
												to: "/marketplace/product/$slug",
												params: { slug: p.slug },
												className: "text-[9px] font-black text-orange-600 hover:underline flex items-center",
												children: ["Inspect ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 686,
													columnNumber: 33
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 683,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												onClick: () => {
													addToCart({
														id: p.id,
														name: p.name,
														price: p.price,
														currency: p.currency,
														image: imageSource,
														slug: p.slug
													});
													setIsCartOpen(true);
													setToastMessage(`"${p.name}" added to shopping cart!`);
												},
												className: "bg-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded hover:bg-orange-700 transition-colors cursor-pointer",
												children: "Claim Drop"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 688,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 682,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 654,
									columnNumber: 19
								}, this)]
							}, p.id, true, {
								fileName: _jsxFileName,
								lineNumber: 646,
								columnNumber: 18
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 585,
						columnNumber: 20
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 489,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 text-white px-4 py-3 z-50 flex items-center justify-between shadow-glow max-w-md mx-auto sm:rounded-t-3xl sm:border-x",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkle, { className: "size-4 text-yellow-400 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 712,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-black text-white leading-none",
							children: "Sign in for the best experience"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 714,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[10px] text-white/50",
							children: "Unlock secure safe-vault drops & tracking."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 717,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 713,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 711,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/cms-admin/login",
					className: "bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-5 py-2 rounded-full shadow-soft transition-all uppercase tracking-wider shrink-0",
					children: "Sign in"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 720,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 710,
				columnNumber: 7
			}, this),
			isCartOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 overflow-hidden",
				id: "cart-drawer-overlay",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity",
					onClick: () => setIsCartOpen(false)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 727,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "absolute inset-y-0 right-0 max-w-full flex pl-10",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "w-screen max-w-md bg-white shadow-xl flex flex-col",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "px-4 py-6 bg-orange-600 text-white flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(ShoppingBag, { className: "size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 732,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("h2", {
										className: "text-sm font-black uppercase tracking-wider",
										children: "Escrow Shopping Cart"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 733,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 731,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => setIsCartOpen(false),
									className: "text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",
									children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 738,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 737,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 730,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex-1 overflow-y-auto p-4 space-y-4",
								children: cartItems.length === 0 ? /* @__PURE__ */ (void 0)("div", {
									className: "text-center py-20 space-y-4",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "size-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground",
											children: /* @__PURE__ */ (void 0)(ShoppingBag, { className: "size-8" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 745,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 744,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs font-bold text-muted-foreground",
											children: "Your sovereign escrow cart is empty."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 747,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: () => setIsCartOpen(false),
											className: "bg-orange-600 text-white text-xs font-black px-4 py-2 rounded-xl",
											children: "Browse Drops"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 750,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 743,
									columnNumber: 43
								}, this) : cartItems.map((item) => /* @__PURE__ */ (void 0)("div", {
									className: "flex gap-3 p-3 bg-muted/40 rounded-2xl border border-border/30 justify-between items-start",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (void 0)("img", {
											src: item.image,
											alt: item.name,
											className: "size-16 rounded-xl object-cover border border-border/20 shrink-0",
											referrerPolicy: "no-referrer"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 755,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (void 0)("h4", {
													className: "text-xs font-black text-foreground line-clamp-1",
													children: item.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 757,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex flex-wrap gap-1 text-[9px] font-bold text-muted-foreground",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "bg-white px-1.5 py-0.5 rounded border border-border/30",
														children: ["Size: ", item.size]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 761,
														columnNumber: 29
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "bg-white px-1.5 py-0.5 rounded border border-border/30",
														children: ["Color: ", item.color]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 764,
														columnNumber: 29
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 760,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-xs font-black text-orange-600",
													children: [
														item.currency,
														" ",
														item.price.toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 768,
													columnNumber: 27
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 756,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 754,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col items-end gap-3 shrink-0",
										children: [/* @__PURE__ */ (void 0)("button", {
											onClick: () => removeFromCart(item.id, item.size, item.color),
											className: "text-muted-foreground hover:text-red-500 p-1",
											title: "Remove Item",
											children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 775,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 774,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5 bg-white rounded-lg border border-border/50 p-1",
											children: [
												/* @__PURE__ */ (void 0)("button", {
													onClick: () => updateQuantity(item.id, item.size, item.color, item.quantity - 1),
													className: "size-5 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors",
													children: /* @__PURE__ */ (void 0)(Minus, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 779,
														columnNumber: 29
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 778,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-black px-1 min-w-[12px] text-center",
													children: item.quantity
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 781,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("button", {
													onClick: () => updateQuantity(item.id, item.size, item.color, item.quantity + 1),
													className: "size-5 flex items-center justify-center hover:bg-muted text-muted-foreground hover:text-foreground rounded transition-colors",
													children: /* @__PURE__ */ (void 0)(Plus, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 785,
														columnNumber: 29
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 784,
													columnNumber: 27
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 777,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 773,
										columnNumber: 23
									}, this)]
								}, `${item.id}-${item.size}-${item.color}`, true, {
									fileName: _jsxFileName,
									lineNumber: 753,
									columnNumber: 50
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 742,
								columnNumber: 15
							}, this),
							cartItems.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "p-4 border-t border-border bg-muted/10 space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-baseline",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-extrabold text-muted-foreground uppercase",
											children: "Subtotal:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 794,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-lg font-black text-orange-600",
											children: [
												cartItems[0]?.currency,
												" ",
												cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 797,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 793,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-2.5",
										children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4 text-emerald-600 shrink-0 mt-0.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 803,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-[10px] text-emerald-800 font-bold leading-normal",
											children: "Shielded escrow custody enabled. Merchant receives payment only after you receive and confirm product delivery."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 804,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 802,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										onClick: () => {
											setIsCartOpen(false);
											setCheckoutStep("idle");
											setIsCheckoutModalOpen(true);
										},
										className: "w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-medium transition-all flex items-center justify-center gap-2 cursor-pointer",
										children: "Secure Escrow Checkout"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 809,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 792,
								columnNumber: 40
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 729,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 728,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 726,
				columnNumber: 22
			}, this),
			isCheckoutModalOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",
				id: "checkout-modal",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-border/30 flex flex-col",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "px-5 py-4 bg-black text-white flex items-center justify-between",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-5 text-orange-500 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 826,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("h3", {
								className: "text-xs font-black uppercase tracking-wider",
								children: "Escrow Ledger Dispatch"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 827,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 825,
							columnNumber: 15
						}, this), checkoutStep === "idle" && /* @__PURE__ */ (void 0)("button", {
							onClick: () => setIsCheckoutModalOpen(false),
							className: "text-white/60 hover:text-white p-1",
							children: /* @__PURE__ */ (void 0)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 832,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 831,
							columnNumber: 43
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 824,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "p-5 flex-1 space-y-4 max-h-[80vh] overflow-y-auto",
						children: [
							checkoutStep === "idle" && /* @__PURE__ */ (void 0)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-xs font-black uppercase text-muted-foreground",
											children: "1. Shipping Logistics Details"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 839,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-1 gap-2.5",
											children: [
												/* @__PURE__ */ (void 0)("input", {
													type: "text",
													placeholder: "Recipient Full Name",
													value: shippingName,
													onChange: (e) => setShippingName(e.target.value),
													className: "w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:bg-white"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 843,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("input", {
													type: "tel",
													placeholder: "Active Phone Number (For Dispatch SMS)",
													value: shippingPhone,
													onChange: (e) => setShippingPhone(e.target.value),
													className: "w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:bg-white"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 844,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("textarea", {
													placeholder: "Physical Delivery Address (Apt, Street, City, Country)",
													rows: 2,
													value: shippingAddress,
													onChange: (e) => setShippingAddress(e.target.value),
													className: "w-full border border-border/60 bg-[#F5F5F7] rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:bg-white"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 845,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 842,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 838,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (void 0)("h4", {
												className: "text-xs font-black uppercase text-muted-foreground",
												children: "2. Escrow Order Summary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 850,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "space-y-2 max-h-36 overflow-y-auto border border-border/20 p-2.5 rounded-2xl bg-muted/20",
												children: cartItems.map((item) => /* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between text-xs font-semibold",
													children: [/* @__PURE__ */ (void 0)("span", {
														className: "truncate max-w-[280px]",
														children: [
															item.name,
															" x",
															item.quantity
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 855,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("span", { children: [
														item.currency,
														" ",
														(item.price * item.quantity).toLocaleString()
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 858,
														columnNumber: 27
													}, this)]
												}, `${item.id}-${item.size}-${item.color}`, true, {
													fileName: _jsxFileName,
													lineNumber: 854,
													columnNumber: 46
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 853,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between items-baseline pt-2 border-t border-dashed",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-black",
													children: "Escrow Secure Total:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 864,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-sm font-black text-orange-600",
													children: [
														cartItems[0]?.currency,
														" ",
														cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 865,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 863,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 849,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[10px] text-amber-900 font-bold leading-normal",
										children: "💡 **Escrow Protocol:** Upon clicking, the funds will be held securely. The merchant is notified and must release regional dispatch trackers within 48 hours. Funds are only transferred to the merchant when you confirm delivery."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 872,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										onClick: () => {
											if (!shippingName || !shippingAddress || !shippingPhone) {
												setToastMessage("Please fulfill all shipping logistics fields to establish escrow.");
												return;
											}
											setCheckoutStep("provisioning");
											setTimeout(() => {
												setCheckoutStep("locking");
												setTimeout(() => {
													setCheckoutStep("dispatching");
													setTimeout(() => {
														const hash = "px_tx_" + Math.random().toString(36).substring(2, 10) + "_ledger";
														setCheckoutHash(hash);
														setCheckoutStep("completed");
														clearCart();
													}, 1800);
												}, 1800);
											}, 1800);
										},
										className: "w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider",
										children: "Confirm Secure Deposit & Lock Escrow"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 878,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 837,
								columnNumber: 43
							}, this),
							checkoutStep !== "idle" && checkoutStep !== "completed" && /* @__PURE__ */ (void 0)("div", {
								className: "text-center py-10 space-y-6",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "relative size-20 mx-auto",
										children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "size-20 text-orange-600 animate-spin absolute top-0 left-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 904,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "absolute inset-0 flex items-center justify-center",
											children: /* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-8 text-orange-500" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 906,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 905,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 903,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-sm font-black text-foreground",
											children: [
												checkoutStep === "provisioning" && "1/3 Provisioning Secure Escrow Smart Vault...",
												checkoutStep === "locking" && "2/3 Locking Funds into Ledger Custody...",
												checkoutStep === "dispatching" && "3/3 Issuing Logistics & Tracking ID..."
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 911,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground max-w-sm mx-auto",
											children: "Connecting with decentralized air-cargo networks and bank ledgers to securely shield your payment."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 916,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 910,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "w-full bg-muted h-1.5 rounded-full overflow-hidden max-w-xs mx-auto",
										children: /* @__PURE__ */ (void 0)("div", { className: `h-full bg-orange-600 transition-all duration-1000 ${checkoutStep === "provisioning" ? "w-1/3" : checkoutStep === "locking" ? "w-2/3" : "w-[90%]"}` }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 923,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 922,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 902,
								columnNumber: 75
							}, this),
							checkoutStep === "completed" && /* @__PURE__ */ (void 0)("div", {
								className: "text-center py-6 space-y-5",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "size-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600",
										children: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-10" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 929,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 928,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)("h4", {
											className: "text-sm font-black text-emerald-600 uppercase tracking-wide",
											children: "Escrow Contract Locked!"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 932,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Your deposit is secured in vault safely! Logistics dispatched to",
												" ",
												/* @__PURE__ */ (void 0)("strong", { children: shippingName }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 937,
													columnNumber: 23
												}, this),
												"."
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 935,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 931,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "border border-emerald-100 bg-emerald-50/50 rounded-2xl p-4 text-left text-xs font-semibold space-y-2 max-w-sm mx-auto",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground",
													children: "Tracking ID:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 943,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-black text-foreground uppercase",
													children: ["DHL-AIR-", (Math.random() * 1e8).toFixed(0)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 944,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 942,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground",
													children: "Escrow State:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 949,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-black text-emerald-700 uppercase",
													children: "🛡️ FUNDS IN CUSTODY"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 950,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 948,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground",
													children: "Recipient Name:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 955,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-black text-foreground",
													children: shippingName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 956,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 954,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex justify-between",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-muted-foreground",
													children: "Ledger TX Hash:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 959,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-black text-orange-600 font-mono text-[10px] truncate max-w-[150px]",
													children: checkoutHash
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 960,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 958,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 941,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-[10px] text-muted-foreground max-w-xs mx-auto",
										children: "A notification with tracking details has been sent to your device. You have 7 days post-receipt to inspect the goods."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 966,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("button", {
										onClick: () => {
											setIsCheckoutModalOpen(false);
											setCheckoutStep("idle");
											setShippingName("");
											setShippingPhone("");
											setShippingAddress("");
										},
										className: "bg-black hover:bg-neutral-800 text-white font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider",
										children: "Return to Marketplace"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 971,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 927,
								columnNumber: 48
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 836,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 823,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 822,
				columnNumber: 31
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 240,
		columnNumber: 10
	}, this);
}
//#endregion
export { MarketplacePage as component };
