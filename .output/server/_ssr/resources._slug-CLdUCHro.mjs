import { i as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Lt as ArrowRight, Nt as BookOpen, n as Zap, w as Share2, xt as Clock, zt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as PAYROXA_LINKS, o as siteConfig, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-BWKZzTI8.mjs";
import { n as usePublicCms } from "./PublicCmsContext-j4meyJwm.mjs";
import { t as Route } from "./resources._slug-BIZcVy2P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources._slug-CLdUCHro.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/resources.$slug.tsx?tsr-split=component";
function SingleResourceArticlePage() {
	const { slug } = Route.useParams();
	const { blogPosts, blogAuthors } = usePublicCms();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const posts = blogPosts || [];
	const post = posts.find((p) => p.slug === slug);
	if (!post) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-3xl px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BookOpen, { className: "mx-auto size-12 text-muted-foreground/60" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 24,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-4 text-2xl font-bold text-foreground",
				children: "Article Not Found"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 25,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"The requested guide (/resources/",
					slug,
					") may have been moved or updated."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 26,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/resources",
					className: "inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Back to All Resources" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 23,
		columnNumber: 12
	}, this);
	const author = (blogAuthors || []).find((a) => a.id === post.authorId);
	const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
	const handleShare = () => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		}
	};
	const schemaJson = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.metaDescription || post.excerpt,
		image: post.ogImageUrl || post.featuredImageUrl,
		author: {
			"@type": "Person",
			name: post.authorName,
			jobTitle: post.authorRole
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			url: siteConfig.websiteUrl,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.websiteUrl}/logo-payroxa.png`
			}
		},
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		mainEntityOfPage: `${siteConfig.websiteUrl}/resources/${post.slug}`
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: "bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(schemaJson) }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border/60 bg-muted/30 py-3.5",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-4xl px-5 text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						"aria-label": "Breadcrumb",
						className: "flex items-center gap-1.5 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								className: "hover:text-foreground",
								children: "Home"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/resources",
								className: "hover:text-foreground",
								children: "Resources"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-purple-600 font-medium",
								children: post.categoryName
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 88,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-foreground font-medium truncate max-w-[200px]",
								children: post.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 77,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-purple-500/5 to-transparent",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-4xl px-5 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-purple-800",
									children: post.categoryName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 103,
											columnNumber: 15
										}, this),
										post.readTimeMinutes,
										" min read"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 102,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Published",
										" ",
										new Date(post.publishedAt).toLocaleDateString("en-NG", {
											month: "long",
											day: "numeric",
											year: "numeric"
										})
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight",
							children: post.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-lg text-muted-foreground leading-relaxed",
							children: post.excerpt
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold",
									children: post.authorName.charAt(0)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-bold text-foreground",
									children: post.authorName
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: post.authorRole
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 130,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: handleShare,
								className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: copied ? "Link Copied!" : "Share Guide" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-4xl px-5 -mt-6 sm:-mt-8",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-hidden rounded-3xl border border-border/80 shadow-md bg-muted aspect-video max-h-[440px]",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: post.featuredImageUrl || "/hero-payroxa.jpg",
						alt: post.featuredImageAlt || post.title,
						className: "h-full w-full object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 145,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 144,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 143,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl px-5 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "prose prose-slate prose-purple max-w-none text-foreground",
						children: post.content.split("\n\n").map((block, idx) => {
							if (block.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-2xl font-bold text-foreground mt-8 mb-4 tracking-tight",
								children: block.replace("## ", "")
							}, idx, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 20
							}, this);
							if (block.startsWith("### ")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-xl font-bold text-foreground mt-6 mb-3 tracking-tight",
								children: block.replace("### ", "")
							}, idx, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 20
							}, this);
							if (block.startsWith("- ")) {
								const items = block.split("\n").map((line) => line.replace(/^- /, ""));
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
									className: "list-disc list-inside space-y-2 my-4 text-muted-foreground text-base leading-relaxed",
									children: items.map((item, itemIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-foreground",
										children: item
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 168,
										columnNumber: 23
									}, this) }, itemIdx, false, {
										fileName: _jsxFileName,
										lineNumber: 167,
										columnNumber: 49
									}, this))
								}, idx, false, {
									fileName: _jsxFileName,
									lineNumber: 166,
									columnNumber: 20
								}, this);
							}
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-base leading-relaxed text-muted-foreground my-4",
								children: block
							}, idx, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 18
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-14 overflow-hidden rounded-3xl border border-purple-200 bg-linear-to-br from-purple-50 via-white to-purple-50/40 p-8 text-foreground shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "size-6" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 182,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-bold text-purple-700 uppercase tracking-wider",
										children: "Related Solution for Nigerian Merchants"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-xl font-bold text-slate-900",
										children: "Ready to implement this for your business?"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-slate-600 leading-relaxed",
										children: "Accept customer payments through cards, bank transfers, and USSD, or launch a free mobile store in under 5 minutes with Payroxa."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 191,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-wrap gap-3 pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: PAYROXA_LINKS.register,
											size: "sm",
											children: "Get Started Free"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 196,
											columnNumber: 17
										}, this), post.relatedProduct === "store" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: "/store",
											variant: "outline",
											size: "sm",
											children: "Explore Store Builder"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 199,
											columnNumber: 52
										}, this) : post.relatedProduct === "cards" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: "/cards",
											variant: "outline",
											size: "sm",
											children: "Explore Cards & Expenses"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 201,
											columnNumber: 72
										}, this) : post.relatedProduct === "wallet" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: "/wallet",
											variant: "outline",
											size: "sm",
											children: "Explore Business Wallet"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 203,
											columnNumber: 73
										}, this) : post.relatedProduct === "transfers" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: "/transfers",
											variant: "outline",
											size: "sm",
											children: "Explore Transfers"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 205,
											columnNumber: 76
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
											href: "/payments",
											variant: "outline",
											size: "sm",
											children: "Explore Payment Solutions"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 38
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 195,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 9
					}, this),
					author && /* @__PURE__ */ (void 0)("div", {
						className: "mt-12 rounded-2xl border border-border/80 bg-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5",
						children: [/* @__PURE__ */ (void 0)("img", {
							src: author.avatarUrl || "/logo-payroxa.png",
							alt: author.name,
							className: "size-16 rounded-full border border-border object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1 text-center sm:text-left",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "text-xs font-semibold text-purple-600 uppercase tracking-wider",
									children: "Written by"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "text-base font-bold text-foreground",
									children: author.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground font-medium",
									children: author.role
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground leading-relaxed pt-1",
									children: author.bio
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 216,
						columnNumber: 20
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 150,
				columnNumber: 7
			}, this),
			relatedPosts.length > 0 && /* @__PURE__ */ (void 0)("section", {
				className: "border-t border-border/60 bg-muted/20 py-16",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "mx-auto max-w-6xl px-5",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center justify-between mb-8",
						children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
							className: "text-xl font-bold text-foreground",
							children: "Related Resources & Guides"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground",
							children: "Keep reading practical playbooks for African entrepreneurs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)(Link, {
							to: "/resources",
							className: "inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700",
							children: [/* @__PURE__ */ (void 0)("span", { children: "All Guides" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 232,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: relatedPosts.map((r) => /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all group",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "h-40 w-full overflow-hidden bg-muted",
								children: /* @__PURE__ */ (void 0)("img", {
									src: r.featuredImageUrl || "/hero-payroxa.jpg",
									alt: r.title,
									className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 248,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "p-5 flex-1 flex flex-col justify-between",
								children: [/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-bold text-purple-600 uppercase",
										children: r.categoryName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 252,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("h4", {
										className: "mt-1 text-sm font-bold text-foreground group-hover:text-purple-600 transition-colors line-clamp-2",
										children: /* @__PURE__ */ (void 0)(Link, {
											to: "/resources/$slug",
											params: { slug: r.slug },
											children: r.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 256,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "mt-2 text-xs text-muted-foreground line-clamp-2",
										children: r.excerpt
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 262,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-muted-foreground",
										children: [r.readTimeMinutes, " min read"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Link, {
										to: "/resources/$slug",
										params: { slug: r.slug },
										className: "font-semibold text-purple-600 inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)("span", { children: "Read" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 269,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 270,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 266,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 264,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 19
							}, this)]
						}, r.id, true, {
							fileName: _jsxFileName,
							lineNumber: 246,
							columnNumber: 38
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 231,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 230,
				columnNumber: 35
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 279,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 10
	}, this);
}
//#endregion
export { SingleResourceArticlePage as component };
