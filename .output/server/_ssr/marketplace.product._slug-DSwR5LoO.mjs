import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as ExternalLink, D as ShieldAlert, E as ShieldCheck, Ft as ChevronRight, It as ChevronDown, J as MapPin, O as Share2, Pt as ChevronUp, U as Package, Xt as ArrowLeft, d as Truck, h as ThumbsUp, jt as CircleCheck, kt as Clock, mt as Flame, n as Zap, w as ShoppingBag, y as Star } from "../_libs/lucide-react.mjs";
import { i as getProducts, r as getProduct } from "./client-BFST2zXS.mjs";
import { n as useCart, t as updateSEO } from "./useCart-CJDZuE1b.mjs";
import { t as Route } from "./marketplace.product._slug-BioiHGGi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace.product._slug-DSwR5LoO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/marketplace.product.$slug.tsx?tsr-split=component";
function ProductDetailPage() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const [product, setProduct] = (0, import_react.useState)(null);
	const [recommendedProducts, setRecommendedProducts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [activeImageIndex, setActiveImageIndex] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedSize, setSelectedSize] = (0, import_react.useState)("M");
	const [selectedColor, setSelectedColor] = (0, import_react.useState)("Classic Edition");
	const [selectedQuantity, setSelectedQuantity] = (0, import_react.useState)(1);
	const [isAddedToCart, setIsAddedToCart] = (0, import_react.useState)(false);
	const [showShareTooltip, setShowShareTooltip] = (0, import_react.useState)(false);
	const [isSpecsOpen, setIsSpecsOpen] = (0, import_react.useState)(true);
	const [isEscrowDetailsOpen, setIsEscrowDetailsOpen] = (0, import_react.useState)(true);
	const [reviewFilter, setReviewFilter] = (0, import_react.useState)("all");
	const [helpfulRatings, setHelpfulRatings] = (0, import_react.useState)({});
	const [timeLeft, setTimeLeft] = (0, import_react.useState)({
		hours: 7,
		minutes: 48,
		seconds: 12
	});
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) return {
					...prev,
					seconds: prev.seconds - 1
				};
				else if (prev.minutes > 0) return {
					...prev,
					minutes: prev.minutes - 1,
					seconds: 59
				};
				else if (prev.hours > 0) return {
					hours: prev.hours - 1,
					minutes: 59,
					seconds: 59
				};
				else return {
					hours: 23,
					minutes: 59,
					seconds: 59
				};
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		async function load() {
			setLoading(true);
			setError(null);
			try {
				const res = await getProduct(slug);
				if (res.success && res.data) {
					setProduct(res.data);
					updateSEO({
						title: `${res.data.name} | Premium Escrow Drop on Payroxa`,
						description: res.data.description || "Buy premium verified drops securely through Payroxa escrow vaults.",
						image: res.data.images?.[0]?.url,
						currency: res.data.currency,
						price: res.data.price,
						type: "product"
					});
					const recRes = await getProducts({ limit: 4 });
					if (recRes.success && recRes.data) setRecommendedProducts(recRes.data.filter((p) => p.slug !== slug));
				} else setError(res.error?.message || "Merchant drop not found");
			} catch (err) {
				setError(err?.message || "Failed to load drop details");
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [slug]);
	const discountStats = (0, import_react.useMemo)(() => {
		if (!product) return {
			discountPercent: 0,
			originalPrice: 0,
			claimPercentage: 0
		};
		const discountPercent = product.price % 30 + 45;
		return {
			discountPercent,
			originalPrice: Math.round(product.price * (100 / (100 - discountPercent))),
			claimPercentage: product.price % 40 + 55
		};
	}, [product]);
	const shippingDates = (0, import_react.useMemo)(() => {
		const minDelivery = /* @__PURE__ */ new Date("2026-09-14");
		const maxDelivery = /* @__PURE__ */ new Date("2026-09-17");
		const formatDelivery = (d) => {
			return d.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				weekday: "short"
			});
		};
		return {
			range: `${formatDelivery(minDelivery)} - ${formatDelivery(maxDelivery)}`,
			urgencyLabel: "Order in the next 2 hours for guaranteed dispatch!"
		};
	}, []);
	const handleToggleHelpful = (id) => {
		setHelpfulRatings((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
	};
	const handleShare = () => {
		navigator.clipboard.writeText(window.location.href);
		setShowShareTooltip(true);
		setTimeout(() => setShowShareTooltip(false), 2e3);
	};
	const reviews = (0, import_react.useMemo)(() => [
		{
			id: 1,
			author: "Chinedu O.",
			rating: 5,
			date: "Sept 08, 2026",
			badge: "Verified Buyer",
			comment: "Outstanding fabric density! Exceeded expectations on DHL parcel speed, took only 3 days. Checked quality and approved ledger payment instantly.",
			helpfulCount: 42,
			reply: "Merchant replied: Thanks Chinedu! We process standard escrow clearing within 2 hours of transit authorization."
		},
		{
			id: 2,
			author: "Ezenwa K.",
			rating: 5,
			date: "Sept 04, 2026",
			badge: "Verified Buyer",
			comment: "Excellent logistics and high-conversion sizing picker. Sizes are standard EU fits. Safely held in escrow until I inspected at Lagos sorting hub.",
			helpfulCount: 19
		},
		{
			id: 3,
			author: "Sarah M.",
			rating: 4,
			date: "Aug 29, 2026",
			badge: "Verified Buyer",
			comment: "Very elegant build. Minor cosmetic scratch on external cardboard, but the inner product is 100% pristine. Definitely shopping again.",
			helpfulCount: 7
		}
	], []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#F5F5F7] py-24 px-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto size-12 rounded-full border-2 border-orange-600 border-t-transparent animate-spin mb-4" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-sm font-semibold text-muted-foreground",
			children: [
				"Establishing secure ledger sync for ",
				slug,
				"..."
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 192,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 12
	}, this);
	if (error || !product) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#F5F5F7] py-24 px-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-md rounded-3xl border border-border bg-white p-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "mx-auto size-12 text-red-500 mb-3" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-lg font-black text-foreground",
					children: "Merchant Drop Offline"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs text-muted-foreground leading-relaxed",
					children: error || "The requested product drop could not be matched with our active escrow listings."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/marketplace" }),
					className: "mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-3 text-xs font-black text-white shadow-soft transition-all",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 13
					}, this), " Return to Catalog"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 199,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 198,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-[#F5F5F7] text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-orange-600 py-2.5 px-4 text-white text-xs font-bold border-b border-orange-700 tracking-wide select-none",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-4 text-yellow-300 fill-yellow-300" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
							"LIGHTNING FLASH DEAL ACTIVE:",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "text-yellow-200",
								children: [
									"SAVE ",
									discountStats.discountPercent,
									"% INSTANTLY"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 221,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-white/95",
								children: "Limited Quota Stock Claimed:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-24 h-2 bg-white/20 rounded-full overflow-hidden shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "h-full bg-yellow-400",
									style: { width: `${discountStats.claimPercentage}%` }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] text-yellow-200 font-black",
								children: [discountStats.claimPercentage, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border/40 bg-white py-3",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "max-w-6xl mx-auto px-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/marketplace",
						className: "inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-orange-600 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this), " Back to Marketplace Hub"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 13
						}, this), " ESCROW VAULT SECURED"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 241,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "max-w-6xl mx-auto px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-10 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-7 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "aspect-square w-full overflow-hidden rounded-3xl border border-border/50 bg-white shadow-soft relative group",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: product.images[activeImageIndex]?.url || product.images[0]?.url,
										alt: product.images[activeImageIndex]?.alt || product.name,
										className: "h-full w-full object-cover group-hover:scale-102 transition-transform duration-500",
										referrerPolicy: "no-referrer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 259,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-soft",
										children: [discountStats.discountPercent, "% OFF DROP"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white rounded-xl p-3 max-w-[280px] shadow-medium flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Flame, { className: "size-8 text-orange-500 fill-orange-500 shrink-0 animate-pulse" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[10px] font-extrabold uppercase tracking-wide text-orange-400",
											children: "⚡ HIGH DEMAND SPEED"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 268,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] text-white/90 leading-tight mt-0.5",
											children: "158 people checked out this vendor drop in the last hour!"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 271,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 13
							}, this),
							product.images.length > 1 && /* @__PURE__ */ (void 0)("div", {
								className: "flex gap-3 overflow-x-auto pb-2",
								children: product.images.map((img, idx) => /* @__PURE__ */ (void 0)("button", {
									onClick: () => setActiveImageIndex(idx),
									className: `size-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all bg-white relative ${activeImageIndex === idx ? "border-orange-500 ring-4 ring-orange-500/10 scale-102 shadow-soft" : "border-border opacity-70 hover:opacity-100"}`,
									children: /* @__PURE__ */ (void 0)("img", {
										src: img.url,
										alt: img.alt || "",
										className: "h-full w-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 281,
										columnNumber: 21
									}, this)
								}, idx, false, {
									fileName: _jsxFileName,
									lineNumber: 280,
									columnNumber: 51
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 43
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-white border border-border/50 rounded-2xl p-4 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex -space-x-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "size-7 rounded-full bg-orange-200 border-2 border-white text-[10px] font-bold flex items-center justify-center",
												children: "O"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 289,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "size-7 rounded-full bg-emerald-200 border-2 border-white text-[10px] font-bold flex items-center justify-center",
												children: "K"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 292,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "size-7 rounded-full bg-yellow-200 border-2 border-white text-[10px] font-bold flex items-center justify-center",
												children: "S"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 295,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground font-semibold",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "text-foreground font-black",
												children: "Obinna, Kemi, and 9 others"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 300,
												columnNumber: 19
											}, this),
											" ",
											"recently activated checkout vaults."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 299,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md",
									children: "Verified Drops"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 304,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-white border border-border/50 rounded-3xl p-6 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-4 pb-4 border-b border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-sm font-black text-foreground uppercase tracking-wider",
										children: "Customer Reviews & Escrow Ratings"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center text-yellow-400",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-4 fill-yellow-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 318,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-4 fill-yellow-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 319,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-4 fill-yellow-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 320,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-4 fill-yellow-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 321,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-4 fill-yellow-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 322,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 317,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-black text-foreground",
												children: "4.9 / 5.0 Rating"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 324,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-muted-foreground font-semibold",
												children: "(68 verified reviews)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 325,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 312,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2.5 py-1 rounded",
										children: "100% Satisfaction"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-4",
									children: reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "p-4 rounded-2xl border border-border/40 bg-[#FDFDFE] space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-xs font-black text-foreground",
														children: rev.author
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 340,
														columnNumber: 25
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-[9px] bg-orange-50 text-orange-600 border border-orange-100 px-1.5 py-0.2 rounded font-black uppercase",
														children: rev.badge
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 341,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 339,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[10px] text-muted-foreground font-semibold",
													children: rev.date
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 345,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 338,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-0.5 text-yellow-400",
												children: Array.from({ length: rev.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-3.5 fill-yellow-400 text-yellow-400" }, i, false, {
													fileName: _jsxFileName,
													lineNumber: 353,
													columnNumber: 36
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 350,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-muted-foreground leading-relaxed",
												children: rev.comment
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 356,
												columnNumber: 21
											}, this),
											rev.reply && /* @__PURE__ */ (void 0)("div", {
												className: "bg-muted/40 rounded-xl p-3 text-[11px] text-muted-foreground font-semibold border-l-2 border-orange-500",
												children: rev.reply
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 358,
												columnNumber: 35
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "pt-2 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => handleToggleHelpful(rev.id),
													className: `text-[10px] font-bold flex items-center gap-1.5 transition-colors ${helpfulRatings[rev.id] ? "text-orange-600" : "text-muted-foreground hover:text-foreground"}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThumbsUp, { className: "size-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 364,
															columnNumber: 25
														}, this),
														" Helpful (",
														rev.helpfulCount + (helpfulRatings[rev.id] ? 1 : 0),
														")"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 363,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[10px] font-semibold text-emerald-600 flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 368,
														columnNumber: 25
													}, this), " Cargo Inspected"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 367,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 362,
												columnNumber: 21
											}, this)
										]
									}, rev.id, true, {
										fileName: _jsxFileName,
										lineNumber: 337,
										columnNumber: 37
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 336,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-5 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-3xl border border-border bg-white p-6 sm:p-8 space-y-6 shadow-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-soft",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 right-0 -translate-y-4 translate-x-4 w-20 h-20 bg-white/10 rounded-full blur-xl" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 382,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex justify-between items-start mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-md font-black uppercase tracking-wider",
													children: "⚡ lightning deal drop"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 384,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-1 font-mono text-[10px] font-bold text-yellow-200",
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 388,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ends:" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 389,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
															String(timeLeft.hours).padStart(2, "0"),
															"h:",
															String(timeLeft.minutes).padStart(2, "0"),
															"m:",
															String(timeLeft.seconds).padStart(2, "0"),
															"s"
														] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 390,
															columnNumber: 21
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 387,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 383,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-baseline gap-2.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-3xl font-black font-display tracking-tight text-white",
														children: [
															product.currency,
															" ",
															product.price.toLocaleString()
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 399,
														columnNumber: 19
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-xs font-semibold text-white/70 line-through",
														children: [
															product.currency,
															" ",
															discountStats.originalPrice.toLocaleString()
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 402,
														columnNumber: 19
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-xs bg-yellow-400 text-black px-1.5 py-0.2 rounded font-black",
														children: [
															"-",
															discountStats.discountPercent,
															"%"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 405,
														columnNumber: 19
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 398,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "mt-3 pt-3 border-t border-white/10 flex justify-between text-[11px] text-white/90 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "🚀 free delivery on drops" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 411,
													columnNumber: 19
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "🛡️ 100% escrow secured" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 412,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 410,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 381,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between pb-4 border-b border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider",
												children: "SOVEREIGN VENDOR"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 419,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-sm font-black text-foreground",
													children: product.vendor.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 423,
													columnNumber: 21
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "inline-flex items-center gap-0.5 text-xs text-yellow-500",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "size-3.5 fill-yellow-500" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 427,
														columnNumber: 23
													}, this), " 4.9"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 426,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 422,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 418,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/marketplace",
											className: "rounded-xl border border-border hover:border-orange-500/30 text-[10px] font-black uppercase tracking-wider px-4 py-2 transition-colors text-muted-foreground hover:text-orange-600",
											children: "Visit Showroom"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 431,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 417,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
											className: "text-xl sm:text-2xl font-black text-foreground font-display leading-tight tracking-tight",
											children: product.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 438,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs leading-relaxed text-muted-foreground",
											children: product.description || "Premium verified cargo direct from sovereign craftsmen."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 441,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2.5 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between text-xs font-bold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												"Select Size:",
												" ",
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
													className: "text-orange-600 uppercase ml-1",
													children: selectedSize
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 451,
													columnNumber: 21
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 449,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground font-semibold underline cursor-pointer hover:text-orange-600 transition-colors",
												children: "Sizing Charts"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 453,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 448,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												"XS",
												"S",
												"M",
												"L",
												"XL",
												"XXL"
											].map((sz) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => setSelectedSize(sz),
												className: `rounded-xl border py-2.5 px-4 text-xs font-black transition-all ${selectedSize === sz ? "bg-orange-600 border-orange-600 text-white shadow-soft scale-102" : "bg-muted/30 border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`,
												children: sz
											}, sz, false, {
												fileName: _jsxFileName,
												lineNumber: 458,
												columnNumber: 65
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 457,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 447,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2.5 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between text-xs font-bold text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Edition Color: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "text-orange-600 ml-1",
												children: selectedColor
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 468,
												columnNumber: 36
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 467,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 466,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid grid-cols-2 gap-2",
											children: [{
												name: "Classic Edition",
												color: "bg-navy"
											}, {
												name: "Sovereign Gold",
												color: "bg-yellow-500"
											}].map((col) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => setSelectedColor(col.name),
												className: `rounded-xl border p-3 text-xs font-black flex items-center gap-2 transition-all ${selectedColor === col.name ? "bg-orange-600/5 border-orange-600 text-orange-600 shadow-soft" : "bg-muted/30 border-border text-muted-foreground hover:bg-muted"}`,
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `size-4.5 rounded-full ${col.color} border border-black/10 shrink-0` }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 479,
													columnNumber: 23
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "truncate",
													children: col.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 480,
													columnNumber: 23
												}, this)]
											}, col.name, true, {
												fileName: _jsxFileName,
												lineNumber: 478,
												columnNumber: 31
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 471,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 465,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2.5 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-bold text-foreground",
											children: "Specify Quantity:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 487,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center rounded-xl border border-border bg-muted/40 w-max p-1 gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => setSelectedQuantity((q) => Math.max(1, q - 1)),
													className: "size-8 rounded-lg text-xs font-black text-muted-foreground hover:text-foreground hover:bg-white transition-all flex items-center justify-center",
													children: "-"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 489,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "w-10 text-center text-xs font-black text-foreground",
													children: selectedQuantity
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 492,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
													type: "button",
													onClick: () => setSelectedQuantity((q) => Math.min(10, q + 1)),
													className: "size-8 rounded-lg text-xs font-black text-muted-foreground hover:text-foreground hover:bg-white transition-all flex items-center justify-center",
													children: "+"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 495,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 488,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 486,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "rounded-2xl border border-border/60 bg-[#FDFDFE] p-4 space-y-3 shadow-soft",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Truck, { className: "size-5 text-orange-600 shrink-0 mt-0.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 504,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "space-y-0.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
														className: "text-xs font-black text-foreground uppercase tracking-wide",
														children: "Estimated Delivery Delivery"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 506,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "text-xs font-extrabold text-emerald-600",
														children: shippingDates.range
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 509,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "text-[10px] text-muted-foreground leading-normal",
														children: "Free shipping mainland-wide on all escrow checkouts today."
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 510,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 505,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 503,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "pt-2 border-t border-border/40 flex items-center justify-between text-[11px] font-bold text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-3.5 text-orange-600" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 518,
														columnNumber: 21
													}, this),
													" Shipping to:",
													" ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
														className: "text-foreground",
														children: "Lagos, NG"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 519,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 517,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-orange-600 underline cursor-pointer hover:text-orange-700",
												children: "Change Location"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 521,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 502,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: product.appUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "w-full rounded-2xl bg-orange-600 hover:bg-orange-700 text-white py-4 text-center text-xs font-black transition-all flex items-center justify-center gap-2 shadow-medium uppercase tracking-wider",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShoppingBag, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 530,
													columnNumber: 19
												}, this),
												" Instantly Secure escrows Checkout",
												" ",
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 531,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 17
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => {
													if (product) addToCart({
														id: product.id,
														name: product.name,
														price: product.price,
														currency: product.currency,
														image: product.images?.[0]?.url || "",
														slug: product.slug
													}, selectedQuantity, selectedSize, selectedColor);
													setIsAddedToCart(true);
													setTimeout(() => setIsAddedToCart(false), 3e3);
												},
												className: `rounded-2xl border py-3.5 text-xs font-black transition-all text-center ${isAddedToCart ? "bg-emerald-500 border-emerald-500 text-white" : "border-border bg-[#FDFDFE] text-muted-foreground hover:bg-muted hover:text-foreground"}`,
												children: isAddedToCart ? "✔️ Saved to Cart" : "Add to Shopping Cart"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 19
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: handleShare,
												className: "rounded-2xl border border-border bg-[#FDFDFE] hover:bg-muted text-muted-foreground hover:text-foreground py-3.5 text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 relative",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { className: "size-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 553,
														columnNumber: 21
													}, this),
													" Share Drop",
													showShareTooltip && /* @__PURE__ */ (void 0)("span", {
														className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black py-1 px-3 rounded shadow-glow tracking-wide uppercase whitespace-nowrap animate-fade-in",
														children: "Link copied!"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 554,
														columnNumber: 42
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 552,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 534,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 528,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "pt-2 border-t border-border/50 flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-[10px] font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Accepted payment:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 563,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground bg-muted px-2 py-0.5 rounded",
												children: "💳 CARDS"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 564,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground bg-muted px-2 py-0.5 rounded",
												children: "📱 MoMo"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 565,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground bg-muted px-2 py-0.5 rounded",
												children: "🏛️ BANK TRANFERS"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 566,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground bg-muted px-2 py-0.5 rounded",
												children: "🔐 CRYPTO (USDC/USDT)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 569,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 562,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 379,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-white overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setIsSpecsOpen(!isSpecsOpen),
									className: "w-full p-4 flex items-center justify-between text-xs font-black text-foreground uppercase tracking-wider bg-muted/20 hover:bg-muted/45 transition-colors border-b border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Product Specifications" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 578,
										columnNumber: 17
									}, this), isSpecsOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 579,
										columnNumber: 32
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 579,
										columnNumber: 67
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 577,
									columnNumber: 15
								}, this), isSpecsOpen && /* @__PURE__ */ (void 0)("div", {
									className: "p-4 text-xs space-y-2 animate-fade-in",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-3 py-1.5 border-b border-border/30",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-semibold",
												children: "Material Grade"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 583,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "col-span-2 text-foreground font-bold",
												children: "Premium organic fiber composition"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 584,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 582,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-3 py-1.5 border-b border-border/30",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-semibold",
												children: "Origin Location"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 589,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "col-span-2 text-foreground font-bold",
												children: "Eco-sourced mainland craft mills"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 590,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 588,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-3 py-1.5 border-b border-border/30",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-semibold",
												children: "Availability"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 595,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "col-span-2 text-foreground font-bold text-emerald-600",
												children: "In Stock (Dispatches within 24 Hours)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 596,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 594,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-3 py-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground font-semibold",
												children: "Warranty Scope"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 601,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "col-span-2 text-foreground font-bold",
												children: "90-Day Escrow replacement warrant"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 602,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 600,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 31
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 576,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-white overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => setIsEscrowDetailsOpen(!isEscrowDetailsOpen),
									className: "w-full p-4 flex items-center justify-between text-xs font-black text-foreground uppercase tracking-wider bg-muted/20 hover:bg-muted/45 transition-colors border-b border-border/40",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Payroxa Safe-Vault Escrow Guarantee" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 612,
										columnNumber: 17
									}, this), isEscrowDetailsOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 613,
										columnNumber: 40
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 613,
										columnNumber: 75
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 611,
									columnNumber: 15
								}, this), isEscrowDetailsOpen && /* @__PURE__ */ (void 0)("div", {
									className: "p-4 text-xs space-y-3 text-muted-foreground leading-relaxed animate-fade-in",
									children: [/* @__PURE__ */ (void 0)("p", { children: [
										"Every drop listed is strictly protected by our",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-foreground",
											children: "Sovereign Multi-Sig Escrow protocol"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 618,
											columnNumber: 21
										}, this),
										"."
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 616,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("ul", {
										className: "space-y-1.5 pl-4 list-disc font-semibold text-foreground",
										children: [
											/* @__PURE__ */ (void 0)("li", { children: "Payments are locked in independent safe-vaults." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 622,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Sellers must provide registered DHL courier tracking code." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 623,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "You have a full 72-hour physical inspection period." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 624,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Cancel or invoke prompt refund returns any time before approval." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 625,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 621,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 615,
									columnNumber: 39
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 610,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 377,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 254,
					columnNumber: 9
				}, this), recommendedProducts.length > 0 && /* @__PURE__ */ (void 0)("section", {
					className: "mt-12 pt-12 border-t border-border/40",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between gap-4 mb-6",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
							className: "inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-orange-600 bg-orange-100 rounded-full px-2.5 py-0.5 uppercase",
							children: [/* @__PURE__ */ (void 0)(Package, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 637,
								columnNumber: 19
							}, this), " MORE ESCROW DEALS"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 636,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("h3", {
							className: "text-lg font-black text-foreground mt-1",
							children: "Recommended Drops & Deals"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 639,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 635,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Link, {
							to: "/marketplace",
							className: "text-xs font-bold text-orange-600 hover:underline flex items-center gap-1",
							children: ["View Complete Catalog ", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 644,
								columnNumber: 39
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 643,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 634,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-4 grid-cols-2 md:grid-cols-4",
						children: recommendedProducts.slice(0, 4).map((p, index) => {
							const savingPct = p.price % 20 + 50;
							const originalPrice = Math.round(p.price * (100 / (100 - savingPct)));
							return /* @__PURE__ */ (void 0)("article", {
								className: "group bg-white rounded-2xl border border-border/50 overflow-hidden flex flex-col justify-between shadow-soft hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "relative aspect-square bg-muted overflow-hidden",
									children: [/* @__PURE__ */ (void 0)("img", {
										src: p.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
										alt: p.name,
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
										loading: "lazy",
										referrerPolicy: "no-referrer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 654,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "absolute top-2 left-2 bg-orange-600 text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded shadow-soft",
										children: [
											"-",
											savingPct,
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 655,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 653,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "p-3.5 flex flex-col justify-between flex-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between text-[9px] text-muted-foreground font-bold",
												children: /* @__PURE__ */ (void 0)("span", { children: p.category?.name }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 663,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 662,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("h4", {
												className: "text-xs font-black text-foreground group-hover:text-orange-600 line-clamp-1 transition-colors leading-tight",
												children: p.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 665,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-baseline gap-1.5 pt-0.5",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-black text-orange-600",
													children: [
														p.currency,
														" ",
														p.price.toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 669,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-[9px] text-muted-foreground line-through font-semibold",
													children: [
														p.currency,
														" ",
														originalPrice.toLocaleString()
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 672,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 668,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 661,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-3 pt-3 border-t border-border/40 flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)(Link, {
											to: "/marketplace/product/$slug",
											params: { slug: p.slug },
											className: "text-[9px] font-black text-orange-600 hover:underline flex items-center",
											children: ["Details ", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 682,
												columnNumber: 35
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 679,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("a", {
											href: p.appUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "bg-orange-600 text-white text-[9px] font-black px-2.5 py-1 rounded transition-colors",
											children: "Claim"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 684,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 678,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 660,
									columnNumber: 21
								}, this)]
							}, p.id, true, {
								fileName: _jsxFileName,
								lineNumber: 652,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 648,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 633,
					columnNumber: 44
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 253,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 213,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProductDetailPage as component };
