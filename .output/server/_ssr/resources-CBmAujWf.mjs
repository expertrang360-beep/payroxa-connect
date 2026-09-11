import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Lt as ArrowRight, Nt as BookOpen, O as Search, _ as Sparkles, n as Zap, xt as Clock } from "../_libs/lucide-react.mjs";
import { n as PAYROXA_LINKS, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-BWKZzTI8.mjs";
import { n as usePublicCms } from "./PublicCmsContext-j4meyJwm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-CBmAujWf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/resources.tsx?tsr-split=component";
function ResourcesIndexPage() {
	const { blogPosts, blogCategories } = usePublicCms();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const posts = blogPosts || [];
	const categories = blogCategories || [];
	const filteredPosts = posts.filter((post) => {
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === "all" || post.categoryId === selectedCategory;
		return matchesSearch && matchesCategory;
	});
	const featuredPost = posts.find((p) => p.featured) || posts[0];
	const regularPosts = filteredPosts.filter((p) => p.id !== (featuredPost && selectedCategory === "all" && !searchQuery ? featuredPost.id : ""));
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "relative overflow-hidden border-b border-border/60 bg-linear-to-b from-purple-500/10 via-background to-background py-16 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-6xl px-5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-3.5 py-1 text-xs font-semibold text-purple-800",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "size-3.5 text-purple-600" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 31,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Knowledge Base & Merchant Playbooks" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 32,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 30,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl",
								children: "Practical guides to accept payments, sell online & scale in Nigeria."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 34,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-base text-muted-foreground sm:text-lg",
								children: "Explore step-by-step fintech strategies, payment compliance breakdowns, e-commerce tactics, and financial playbooks tailored for modern African businesses."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 37,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-8 relative max-w-xl",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 44,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									placeholder: "Search guides (e.g. online payments, store setup, POS terminal)...",
									className: "w-full rounded-full border border-border bg-card/90 pl-11 pr-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-md focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 45,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 43,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "border-b border-border/60 bg-card/40 py-4 sticky top-16 z-30 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-6xl px-5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 overflow-x-auto no-scrollbar py-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setSelectedCategory("all"),
							className: `rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${selectedCategory === "all" ? "bg-purple-600 text-white shadow-xs" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`,
							children: [
								"All Topics (",
								posts.length,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 55,
							columnNumber: 13
						}, this), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setSelectedCategory(cat.id),
							className: `rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat.id ? "bg-purple-600 text-white shadow-xs" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`,
							children: cat.name
						}, cat.id, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 36
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "py-14 sm:py-20",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-6xl px-5 space-y-12",
					children: [selectedCategory === "all" && !searchQuery && featuredPost && /* @__PURE__ */ (void 0)("div", {
						className: "overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm hover:border-purple-500/40 transition-all",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "grid lg:grid-cols-12 gap-6 items-center",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "lg:col-span-7 p-6 sm:p-10 space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-purple-800",
											children: "Featured Guide"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 73,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-xs text-muted-foreground",
											children: featuredPost.categoryName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 76,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 72,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold tracking-tight text-foreground sm:text-3xl hover:text-purple-600 transition-colors",
										children: /* @__PURE__ */ (void 0)(Link, {
											to: "/resources/$slug",
											params: { slug: featuredPost.slug },
											children: featuredPost.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 81,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 80,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-sm leading-relaxed text-muted-foreground line-clamp-3",
										children: featuredPost.excerpt
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 87,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-center justify-between gap-4 pt-2",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2.5 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex size-7 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs",
													children: featuredPost.authorName.charAt(0)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 92,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "font-medium text-foreground",
													children: featuredPost.authorName
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 95,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("span", { children: "•" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 96,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ (void 0)(Clock, { className: "size-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 98,
															columnNumber: 25
														}, this),
														featuredPost.readTimeMinutes,
														" min read"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 97,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 91,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(Link, {
											to: "/resources/$slug",
											params: { slug: featuredPost.slug },
											className: "inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-700 group",
											children: [/* @__PURE__ */ (void 0)("span", { children: "Read Complete Guide" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 105,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 106,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 102,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 90,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "lg:col-span-5 h-64 lg:h-full min-h-[260px] relative overflow-hidden bg-muted",
								children: /* @__PURE__ */ (void 0)("img", {
									src: featuredPost.featuredImageUrl || "/hero-payroxa.jpg",
									alt: featuredPost.featuredImageAlt || featuredPost.title,
									className: "h-full w-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 111,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 110,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 74
					}, this), regularPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "mx-auto size-10 text-muted-foreground/60" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mt-3 text-base font-bold text-foreground",
								children: "No resources found"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 119,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Try adjusting your search query or selecting a different topic."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 40
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-lg font-bold text-foreground",
							children: searchQuery ? `Search results for "${searchQuery}"` : "Latest Playbooks & Articles"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground",
							children: [regularPosts.length, " articles"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 124,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: regularPosts.map((post) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all group",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "h-48 w-full overflow-hidden bg-muted relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: post.featuredImageUrl || "/hero-payroxa.jpg",
									alt: post.featuredImageAlt || post.title,
									className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "absolute top-3 left-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold text-purple-700 backdrop-blur-md shadow-xs",
										children: post.categoryName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 138,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 137,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-1 flex-col p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2 text-[11px] text-muted-foreground mb-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(post.publishedAt).toLocaleDateString("en-NG", {
												month: "short",
												day: "numeric",
												year: "numeric"
											}) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 146,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 153,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 155,
														columnNumber: 27
													}, this),
													post.readTimeMinutes,
													" min read"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 154,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 145,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-base font-bold text-foreground group-hover:text-purple-600 transition-colors line-clamp-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/resources/$slug",
											params: { slug: post.slug },
											children: post.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 161,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3 flex-1",
										children: post.excerpt
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground font-medium",
											children: post.authorName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 173,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/resources/$slug",
											params: { slug: post.slug },
											className: "inline-flex items-center gap-1 font-semibold text-purple-600 hover:text-purple-700",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Read" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 177,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 178,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 172,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 21
							}, this)]
						}, post.id, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 43
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 22
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 66,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "border-t border-border/60 bg-linear-to-b from-card to-background py-16",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-4xl px-5 text-center space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold text-purple-800",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-3.5 text-purple-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Built for African Merchants" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl",
							children: "Start accepting payments in minutes with Payroxa."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mx-auto max-w-xl text-sm text-muted-foreground",
							children: "No complex setup. Create payment links, accept cards and bank transfers, sell through an online store, and issue corporate cards with zero setup fees."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap justify-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
								href: PAYROXA_LINKS.register,
								size: "lg",
								children: "Create Free Merchant Account"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
								href: "/payments",
								variant: "outline",
								size: "lg",
								children: "Explore Payment Solutions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 189,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 213,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 10
	}, this);
}
//#endregion
export { ResourcesIndexPage as component };
