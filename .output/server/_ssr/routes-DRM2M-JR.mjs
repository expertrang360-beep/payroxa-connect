import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as ShieldCheck, Ht as Briefcase, Jt as ArrowRight, Rt as ChartColumn, S as Smartphone, Tt as CreditCard, U as Package, Wt as Bike, Z as Lock, a as Wallet, at as Landmark, ct as Headphones, d as Truck, dt as Gauge, ht as FingerprintPattern, j as Send, n as Zap, v as Store, w as ShoppingBag } from "../_libs/lucide-react.mjs";
import { a as SectionHeading, i as Section, n as PAYROXA_LINKS, r as PayroxaButton, s as siteConfig, t as FinalCTA } from "./FinalCTA-c-S2hXna.mjs";
import { t as ProductCard } from "./ProductCard-DA2C9GZz.mjs";
import { n as usePublicCms } from "./PublicCmsContext-j4meyJwm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRM2M-JR.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var iconMap = {
	Send,
	Wallet,
	ShoppingBag,
	Briefcase,
	Truck,
	Smartphone,
	Gauge,
	CreditCard,
	Bike,
	Package,
	ShieldCheck,
	Zap,
	Headphones,
	Landmark
};
var trust = [
	{
		icon: ShieldCheck,
		title: "Secure",
		copy: "Your funds and data are protected end to end."
	},
	{
		icon: Zap,
		title: "Fast",
		copy: "Instant payments and real-time settlement."
	},
	{
		icon: Headphones,
		title: "Reliable",
		copy: "Support whenever you need us."
	},
	{
		icon: Landmark,
		title: "Built for Africa",
		copy: "Made for African businesses and customers."
	}
];
var coreFeatures = [
	{
		icon: CreditCard,
		title: "Payments",
		badge: "Instant settlements",
		description: "Accept card payments, bank transfers, USSD, and QR codes from local and global customers. Generate secure, shareable payment links without writing code.",
		points: [
			"Accept global debit & credit cards",
			"Generate custom shareable payment links",
			"Integrate USSD, bank transfers, and QR codes"
		]
	},
	{
		icon: Wallet,
		title: "Wallet",
		badge: "Multi-currency accounts",
		description: "Manage funds across dual-currency NGN and USD wallets. Transfer to any bank, pay bills, buy airtime, and execute instant currency conversions.",
		points: [
			"Dual-currency balances (Naira & Dollars)",
			"Instant, secure withdrawals to any bank",
			"Full transparency & detailed history trails"
		]
	},
	{
		icon: ChartColumn,
		title: "Business Dashboard",
		badge: "Smart analytics",
		description: "Understand your cashflow with comprehensive visual reports on inflows, outflows, best-selling products, and repeat customer retention rates.",
		points: [
			"Real-time visual performance charts",
			"Granular team access & role management",
			"One-click statement export for accounting"
		]
	}
];
var pillars = [
	{
		icon: Send,
		title: "Move Money",
		description: "Send and receive money in seconds, to any bank or Payroxa account."
	},
	{
		icon: Wallet,
		title: "Get Paid",
		description: "Collect payments with links, transfers, cards and QR — settled to your wallet."
	},
	{
		icon: ShoppingBag,
		title: "Sell",
		description: "Launch a storefront, list products and reach customers already on Payroxa."
	},
	{
		icon: Briefcase,
		title: "Run Your Business",
		description: "Invoices, records and insights that keep the numbers where you can see them."
	},
	{
		icon: Truck,
		title: "Move Your Business",
		description: "Fulfil orders with delivery and logistics built around your storefront."
	}
];
var ecosystem = [
	{
		icon: Smartphone,
		title: "Airtime & data",
		description: "Top up any network in a tap."
	},
	{
		icon: Gauge,
		title: "Bills & utilities",
		description: "Electricity, cable TV and internet."
	},
	{
		icon: CreditCard,
		title: "Card payments",
		description: "Accept cards from local customers."
	},
	{
		icon: Send,
		title: "Bank transfers",
		description: "Payouts to every Nigerian bank."
	},
	{
		icon: ShoppingBag,
		title: "Gift cards",
		description: "Buy and send digital value instantly."
	},
	{
		icon: Bike,
		title: "Rides & delivery",
		description: "Movement services inside one app."
	}
];
var businessTypes = [
	"Retail shops",
	"Restaurants & food vendors",
	"Fashion & beauty brands",
	"Online sellers",
	"Service professionals",
	"Logistics & delivery",
	"Agents & merchants",
	"Growing SMEs"
];
var security = [
	{
		icon: Lock,
		title: "Encryption everywhere",
		copy: "Data is encrypted in transit and at rest."
	},
	{
		icon: FingerprintPattern,
		title: "Verified identities",
		copy: "Tiered verification keeps accounts real."
	},
	{
		icon: ShieldCheck,
		title: "Fraud monitoring",
		copy: "Suspicious activity is flagged early."
	},
	{
		icon: ChartColumn,
		title: "Full audit trail",
		copy: "Every transaction is recorded and traceable."
	}
];
var steps = [
	{
		step: "01",
		title: "Create your account",
		copy: "Sign up with your phone number or email."
	},
	{
		step: "02",
		title: "Verify your business",
		copy: "Complete verification to unlock full limits."
	},
	{
		step: "03",
		title: "Fund your wallet",
		copy: "Add money by transfer, card or agent."
	},
	{
		step: "04",
		title: "Start transacting",
		copy: "Pay, get paid, sell and grow from one place."
	}
];
var faqs = [
	{
		q: "What is Payroxa?",
		a: "Payroxa is a business platform that brings payments, a secure wallet, cards, a storefront and business tools together in one app."
	},
	{
		q: "Who can use Payroxa?",
		a: "Individuals, merchants and registered businesses across Africa who want a simpler way to move money and get paid."
	},
	{
		q: "How long does verification take?",
		a: "Most accounts are verified shortly after the required details are submitted. Higher limits may need additional business documents."
	},
	{
		q: "Can I sell on Payroxa without a website?",
		a: "Yes. Payroxa Store gives you a storefront and a shareable link, so you can start selling without building a website."
	},
	{
		q: "Is my money safe?",
		a: "Payroxa uses encryption, identity verification and continuous monitoring, and works with licensed financial partners."
	}
];
function HomePage() {
	const cms = usePublicCms();
	const hero = cms.hero || {};
	const activeProducts = cms.products?.filter((p) => p.published) || [];
	const activeBusinessTypes = cms.businessTypes?.filter((b) => b.active).map((b) => b.name) || businessTypes;
	const activeFaqs = cms.faqs?.filter((f) => f.status === "published") || [];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "gradient-soft relative overflow-hidden px-5 pt-14 pb-16 sm:pt-20",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: hero.eyebrow || siteConfig.tagline
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl",
						children: [
							hero.headline || "Everything your business needs to",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: hero.highlightedText || "move, sell and grow."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 max-w-xl text-base text-muted-foreground sm:text-lg",
						children: hero.description || "Send, receive, save and manage your money with confidence — then sell to customers, issue cards and run the whole business from one Payroxa account."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: hero.primaryCtaUrl || PAYROXA_LINKS.register,
							size: "lg",
							children: [
								hero.primaryCtaLabel || "Get Started",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
									className: "size-4",
									"aria-hidden": "true"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: hero.secondaryCtaUrl || PAYROXA_LINKS.login,
							variant: "outline",
							size: "lg",
							children: hero.secondaryCtaLabel || "Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 187,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-sm text-muted-foreground",
						children: hero.footnote || "Your Money. Your Control. Your Payroxa."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute inset-8 rounded-full bg-lavender-strong/50 blur-3xl",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: hero.heroImageUrl || "/assets/hero-payroxa-zSxlJuMl.jpg",
						alt: hero.heroImageAlt || "Payroxa mobile wallet app shown with a Payroxa payment card and coins",
						width: 1280,
						height: 1280,
						className: "relative mx-auto w-full max-w-lg rounded-4xl"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 167,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			className: "py-10",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: trust.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "surface-card flex items-start gap-3 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, {
							className: "size-5",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-semibold",
						children: item.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: item.copy
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 212,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 15
					}, this)]
				}, item.title, true, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 30
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 205,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 204,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			className: "py-16 sm:py-24",
			id: "features",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Core Offerings",
				title: "Designed for modern African businesses",
				description: "Everything you need to accept payments, manage your balances, and monitor your cashflow from a single integrated platform."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 220,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-14 grid gap-8 sm:grid-cols-1 md:grid-cols-3",
				children: coreFeatures.map((feat) => {
					const Icon = feat.icon;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "surface-card group flex flex-col justify-between p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card border border-border/80",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
										className: "size-6",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 228,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-full bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary",
									children: feat.badge
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mt-6 text-xl font-bold text-foreground leading-tight",
								children: feat.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-sm text-muted-foreground leading-relaxed",
								children: feat.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 19
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-8 space-y-3 border-t border-border/60 pt-6",
							children: feat.points.map((point) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex items-start gap-2.5 text-xs text-muted-foreground leading-normal",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "block size-1.5 rounded-full bg-emerald-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: point }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 23
								}, this)]
							}, point, true, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 45
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 17
						}, this)]
					}, feat.title, true, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 221,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 219,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "More than payments",
				title: "Five things Payroxa does for your business",
				description: "One account replaces the tangle of apps, spreadsheets and bank visits."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 256,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: pillars.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: p.icon,
					title: p.title,
					description: p.description
				}, p.title, false, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 29
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 257,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 255,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid items-center gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					align: "left",
					eyebrow: cms.storeSection?.eyebrow || "Payroxa Store",
					title: cms.storeSection?.title || "Shop smarter — and sell smarter",
					description: cms.storeSection?.description || "Open a storefront, list your products and let customers discover and pay you inside Payroxa. No website required."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 266,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "mt-6 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Product listings, categories and store profile" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 268,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Payments settled straight into your wallet" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Orders, delivery and customer records in one view" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 267,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.store,
						children: "Create Your Store"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 273,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						to: "/store",
						variant: "outline",
						children: "Learn more"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 272,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 265,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "gradient-navy rounded-4xl p-8 text-navy-foreground shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Store, {
						className: "size-8",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 text-2xl font-semibold",
						children: "Discover great products from trusted businesses."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 281,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-sm text-navy-foreground/75",
						children: "Payroxa Store puts your business in front of customers already moving money on Payroxa every day."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 284,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 279,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 264,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 263,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					eyebrow: "Payment ecosystem",
					title: "Every everyday payment, in one place",
					description: "From airtime to bank transfers, Payroxa covers the payments your business and customers make daily."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 294,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: activeProducts.length > 0 ? activeProducts.map((item) => {
						const IconComp = item.icon && iconMap[item.icon] ? iconMap[item.icon] : Package;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
							icon: IconComp,
							title: item.name,
							description: item.shortDescription
						}, item.id, false, {
							fileName: _jsxFileName,
							lineNumber: 298,
							columnNumber: 18
						}, this);
					}) : ecosystem.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
						icon: item.icon,
						title: item.title,
						description: item.description
					}, item.title, false, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 36
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 295,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						to: "/payments",
						variant: "outline",
						children: "Explore payments"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 301,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 293,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid items-center gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-card order-2 p-8 lg:order-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: "Multi-currency balances"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "gradient-brand rounded-2xl p-5 text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs opacity-80",
								children: "Naira wallet"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xl font-bold",
								children: "Instant transfers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "gradient-navy rounded-2xl p-5 text-navy-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs opacity-80",
								children: "Dollar wallet"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xl font-bold",
								children: "Cross-border ready"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Add money, send, withdraw, exchange" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 324,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Statements and transaction history" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 325,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Saved bank accounts and beneficiaries" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Clear limits and spending controls" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 323,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 311,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "order-1 lg:order-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					align: "left",
					eyebrow: "Wallet",
					title: cms.walletSection?.title || "A secure wallet for your funds",
					description: cms.walletSection?.description || "Hold, move and track your money with balances you can see at a glance and controls you actually understand."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 331,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.wallet,
						children: "Open your wallet"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 333,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 332,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 330,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 310,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 309,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "navy",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					tone: "navy",
					eyebrow: "Business dashboard",
					title: "Know your numbers without the guesswork",
					description: "Track inflows, outflows, orders and customers with reporting built for the way African businesses actually operate."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 341,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							label: "Inflow & outflow",
							copy: "See money in and money out per day, week or month."
						},
						{
							label: "Order insights",
							copy: "Best sellers, repeat buyers and fulfilment status."
						},
						{
							label: "Team access",
							copy: "Give staff the access they need, nothing more."
						},
						{
							label: "Exportable records",
							copy: "Download statements for accounting and audits."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-semibold",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 356,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-navy-foreground/70",
							children: item.copy
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 357,
							columnNumber: 15
						}, this)]
					}, item.label, true, {
						fileName: _jsxFileName,
						lineNumber: 355,
						columnNumber: 24
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 342,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.business,
						variant: "outline",
						children: "Start with Payroxa Business"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 361,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 360,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 340,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Who it's for",
			title: "Built for the businesses that keep Africa moving"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 369,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "mt-10 flex flex-wrap justify-center gap-3",
			children: activeBusinessTypes.map((type) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "rounded-full border border-border bg-muted/60 px-5 py-2.5 text-sm font-medium",
				children: type
			}, type, false, {
				fileName: _jsxFileName,
				lineNumber: 371,
				columnNumber: 44
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 370,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 368,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Security",
				title: "Safe. Fast. Reliable. That's the Payroxa way.",
				description: "Security is not a feature we added later — it shapes how every part of Payroxa is built."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 379,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: security.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: item.icon,
					title: item.title,
					description: item.copy
				}, item.title, false, {
					fileName: _jsxFileName,
					lineNumber: 381,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 380,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 378,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "How it works",
			title: "Live on Payroxa in four steps"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 387,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
			children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm font-bold text-primary",
						children: s.step
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 390,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-3 text-lg font-semibold",
						children: s.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 391,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: s.copy
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 15
					}, this)
				]
			}, s.step, true, {
				fileName: _jsxFileName,
				lineNumber: 389,
				columnNumber: 27
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 388,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 386,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					align: "left",
					eyebrow: "Cards",
					title: cms.cardsSection?.title || "Virtual and physical cards for real spending",
					description: cms.cardsSection?.description || "Spend online and in store, set limits, freeze a card instantly and keep every transaction visible."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 401,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.cards,
						children: "Get a card"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 403,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						to: "/cards",
						variant: "text",
						children: "See how cards work"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 404,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 402,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 400,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "gradient-brand relative rounded-4xl p-8 text-primary-foreground shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, {
							className: "size-8",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 410,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-8 text-lg font-semibold tracking-[0.3em]",
							children: "•••• •••• •••• 7528"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 411,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex items-center justify-between text-sm opacity-85",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Payroxa Card" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 413,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "••/••" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 414,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 412,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 409,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 399,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 398,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "FAQ",
			title: "Questions, answered"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 422,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto mt-10 max-w-3xl space-y-4",
			children: activeFaqs.length > 0 ? activeFaqs.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
				className: "surface-card group p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
					className: "cursor-pointer list-none text-base font-semibold",
					children: f.question
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 425,
					columnNumber: 19
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: f.answer
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 428,
					columnNumber: 19
				}, this)]
			}, f.id, true, {
				fileName: _jsxFileName,
				lineNumber: 424,
				columnNumber: 56
			}, this)) : faqs.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
				className: "surface-card group p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
					className: "cursor-pointer list-none text-base font-semibold",
					children: f.q
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 430,
					columnNumber: 19
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: f.a
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 433,
					columnNumber: 19
				}, this)]
			}, f.q, true, {
				fileName: _jsxFileName,
				lineNumber: 429,
				columnNumber: 45
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 423,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 421,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 439,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 165,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };
