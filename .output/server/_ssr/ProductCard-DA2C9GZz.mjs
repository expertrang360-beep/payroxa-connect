import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as ExternalLink, Jt as ArrowRight, jt as CircleCheck } from "../_libs/lucide-react.mjs";
import { o as cn } from "./FinalCTA-c-S2hXna.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-DA2C9GZz.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ProductCard.tsx";
function ProductCard(props) {
	if (props.product) {
		const { product, viewMode = "grid", className } = props;
		const imageUrl = product.images && product.images[0]?.url ? product.images[0].url : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";
		if (viewMode === "list") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
			className: cn("group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 w-full", className),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sm:w-56 aspect-[4/3] sm:aspect-auto shrink-0 overflow-hidden bg-muted relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: imageUrl,
					alt: product.images?.[0]?.alt || product.name,
					className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
					loading: "lazy"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 42,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft sm:hidden",
					children: [
						product.currency,
						" ",
						product.price.toLocaleString()
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-medium text-primary",
							children: product.category?.name || "Marketplace"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 17
						}, this), product.vendor && /* @__PURE__ */ (void 0)("span", {
							className: "flex items-center gap-1 text-emerald-600 font-medium",
							children: [
								/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 60,
									columnNumber: 21
								}, this),
								" ",
								product.vendor.name
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold text-foreground group-hover:text-primary transition-colors",
						children: product.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1.5 text-xs text-muted-foreground line-clamp-2",
						children: product.description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 flex items-center justify-between pt-3 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-base font-extrabold text-foreground",
						children: [
							product.currency,
							" ",
							product.price.toLocaleString()
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/marketplace/product/$slug",
							params: { slug: product.slug },
							className: "rounded-xl border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-1",
							children: ["Details ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 81,
								columnNumber: 27
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: product.appUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all flex items-center gap-1",
							children: ["Buy ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 83,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 9
		}, this);
		if (viewMode === "showcase") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
			className: cn("group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full", className),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "aspect-[16/10] w-full overflow-hidden bg-muted relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: imageUrl,
						alt: product.images?.[0]?.alt || product.name,
						className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
						loading: "lazy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1.5 text-sm font-extrabold text-foreground shadow-medium",
						children: [
							product.currency,
							" ",
							product.price.toLocaleString()
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 13
					}, this),
					product.isFeatured && /* @__PURE__ */ (void 0)("div", {
						className: "absolute top-4 right-4 rounded-full bg-amber-500/90 text-white backdrop-blur-md px-3 py-1 text-xs font-bold shadow-soft",
						children: "Featured Item"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 106,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col justify-between p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-primary",
							children: product.category?.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 17
						}, this), product.vendor && /* @__PURE__ */ (void 0)("span", {
							className: "flex items-center gap-1 text-emerald-600 font-semibold",
							children: [
								/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 21
								}, this),
								" ",
								product.vendor.name
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-lg font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-2",
						children: product.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3",
						children: product.description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex items-center justify-between pt-4 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/marketplace/product/$slug",
						params: { slug: product.slug },
						className: "text-xs font-bold text-primary flex items-center gap-1.5 hover:underline",
						children: ["View Full Details ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 35
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: product.appUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all flex items-center gap-1.5",
						children: ["Buy Now ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 25
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 100,
			columnNumber: 9
		}, this);
		if (viewMode === "dense") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
			className: cn("group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 h-full", className),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "aspect-square w-full overflow-hidden bg-muted relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: imageUrl,
					alt: product.images?.[0]?.alt || product.name,
					className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
					loading: "lazy"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 170,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute bottom-2 left-2 rounded-md bg-background/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-foreground shadow-soft",
					children: [
						product.currency,
						" ",
						product.price.toLocaleString()
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 176,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 169,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col justify-between p-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[10px] text-muted-foreground truncate",
					children: product.category?.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 182,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mt-0.5",
					children: product.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-2.5 flex items-center justify-between pt-2 border-t border-border/50",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/marketplace/product/$slug",
						params: { slug: product.slug },
						className: "text-[11px] font-semibold text-primary hover:underline",
						children: "Details"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: product.appUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground hover:bg-primary/90",
						children: "Buy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 163,
			columnNumber: 9
		}, this);
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
			className: cn("group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full", className),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "aspect-[4/3] w-full overflow-hidden bg-muted relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: imageUrl,
					alt: product.images?.[0]?.alt || product.name,
					className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
					loading: "lazy"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft",
					children: [
						product.currency,
						" ",
						product.price.toLocaleString()
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 216,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: product.category?.name || "Marketplace" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 15
						}, this), product.vendor && /* @__PURE__ */ (void 0)("span", {
							className: "flex items-center gap-1 text-emerald-600 font-medium",
							children: [
								/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 19
								}, this),
								" ",
								product.vendor.name
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1",
						children: product.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground line-clamp-2",
						children: product.description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex items-center justify-between pt-4 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/marketplace/product/$slug",
						params: { slug: product.slug },
						className: "text-xs font-bold text-primary flex items-center gap-1 hover:underline",
						children: ["View Details ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 28
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: product.appUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-1",
						children: ["Buy ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 256,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 242,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 227,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 210,
			columnNumber: 7
		}, this);
	}
	const { icon: Icon, title, description, className } = props;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: cn("surface-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card", className),
		children: [
			Icon && /* @__PURE__ */ (void 0)("span", {
				className: "flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground",
				children: /* @__PURE__ */ (void 0)(Icon, {
					className: "size-5",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 274,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 273,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "mt-5 text-lg font-semibold",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 277,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 278,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 266,
		columnNumber: 5
	}, this);
}
//#endregion
export { ProductCard as t };
