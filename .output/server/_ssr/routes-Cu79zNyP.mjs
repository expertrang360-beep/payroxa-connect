import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { C as ShieldCheck, D as Send, G as Lock, Lt as ArrowRight, Mt as Briefcase, Ot as ChartColumn, Pt as Bike, Q as Landmark, R as Package, _t as CreditCard, a as Wallet, at as Gauge, d as Truck, h as Store, n as Zap, st as FingerprintPattern, tt as Headphones, v as Smartphone, x as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CIO-WwIt.mjs";
import { a as SectionHeading, i as Section, n as PAYROXA_LINKS, o as siteConfig, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-BWKZzTI8.mjs";
import { n as usePublicCms } from "./PublicCmsContext-j4meyJwm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cu79zNyP.js
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
						lineNumber: 151,
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
								lineNumber: 156,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 max-w-xl text-base text-muted-foreground sm:text-lg",
						children: hero.description || "Send, receive, save and manage your money with confidence — then sell to customers, issue cards and run the whole business from one Payroxa account."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 160,
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
									lineNumber: 166,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: hero.secondaryCtaUrl || PAYROXA_LINKS.login,
							variant: "outline",
							size: "lg",
							children: hero.secondaryCtaLabel || "Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 168,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 text-sm text-muted-foreground",
						children: hero.footnote || "Your Money. Your Control. Your Payroxa."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "absolute inset-8 rounded-full bg-lavender-strong/50 blur-3xl",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: hero.heroImageUrl || "/assets/hero-payroxa-zSxlJuMl.jpg",
						alt: hero.heroImageAlt || "Payroxa mobile wallet app shown with a Payroxa payment card and coins",
						width: 1280,
						height: 1280,
						className: "relative mx-auto w-full max-w-lg rounded-4xl"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
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
							lineNumber: 189,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-semibold",
						children: item.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: item.copy
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 15
					}, this)]
				}, item.title, true, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 30
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 186,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 185,
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
				lineNumber: 201,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: pillars.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: p.icon,
					title: p.title,
					description: p.description
				}, p.title, false, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 29
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 202,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 200,
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
					lineNumber: 211,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "mt-6 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Product listings, categories and store profile" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 213,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Payments settled straight into your wallet" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Orders, delivery and customer records in one view" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 212,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.store,
						children: "Create Your Store"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						to: "/store",
						variant: "outline",
						children: "Learn more"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 210,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "gradient-navy rounded-4xl p-8 text-navy-foreground shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Store, {
						className: "size-8",
						"aria-hidden": "true"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 text-2xl font-semibold",
						children: "Discover great products from trusted businesses."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 226,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 text-sm text-navy-foreground/75",
						children: "Payroxa Store puts your business in front of customers already moving money on Payroxa every day."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 209,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 208,
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
					lineNumber: 239,
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
							lineNumber: 243,
							columnNumber: 18
						}, this);
					}) : ecosystem.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
						icon: item.icon,
						title: item.title,
						description: item.description
					}, item.title, false, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 36
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 240,
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
						lineNumber: 247,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 246,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 238,
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
						lineNumber: 257,
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
								lineNumber: 260,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xl font-bold",
								children: "Instant transfers"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 259,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "gradient-navy rounded-2xl p-5 text-navy-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs opacity-80",
								children: "Dollar wallet"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xl font-bold",
								children: "Cross-border ready"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Add money, send, withdraw, exchange" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Statements and transaction history" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Saved bank accounts and beneficiaries" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "• Clear limits and spending controls" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 256,
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
					lineNumber: 276,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.wallet,
						children: "Open your wallet"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 277,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 275,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 255,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 254,
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
					lineNumber: 286,
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
							lineNumber: 301,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-navy-foreground/70",
							children: item.copy
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 15
						}, this)]
					}, item.label, true, {
						fileName: _jsxFileName,
						lineNumber: 300,
						columnNumber: 24
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 287,
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
						lineNumber: 306,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 305,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 285,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Who it's for",
			title: "Built for the businesses that keep Africa moving"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 314,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
			className: "mt-10 flex flex-wrap justify-center gap-3",
			children: activeBusinessTypes.map((type) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "rounded-full border border-border bg-muted/60 px-5 py-2.5 text-sm font-medium",
				children: type
			}, type, false, {
				fileName: _jsxFileName,
				lineNumber: 316,
				columnNumber: 44
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 315,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 313,
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
				lineNumber: 324,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: security.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: item.icon,
					title: item.title,
					description: item.copy
				}, item.title, false, {
					fileName: _jsxFileName,
					lineNumber: 326,
					columnNumber: 33
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 323,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "How it works",
			title: "Live on Payroxa in four steps"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 332,
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
						lineNumber: 335,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-3 text-lg font-semibold",
						children: s.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: s.copy
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 15
					}, this)
				]
			}, s.step, true, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 27
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 333,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 331,
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
					lineNumber: 346,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: PAYROXA_LINKS.cards,
						children: "Get a card"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 348,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						to: "/cards",
						variant: "text",
						children: "See how cards work"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 349,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 347,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 345,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "gradient-brand relative rounded-4xl p-8 text-primary-foreground shadow-glow",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, {
							className: "size-8",
							"aria-hidden": "true"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-8 text-lg font-semibold tracking-[0.3em]",
							children: "•••• •••• •••• 7528"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 356,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex items-center justify-between text-sm opacity-85",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Payroxa Card" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "••/••" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 359,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 357,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 354,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 344,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 343,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "FAQ",
			title: "Questions, answered"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 367,
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
					lineNumber: 370,
					columnNumber: 19
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: f.answer
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 373,
					columnNumber: 19
				}, this)]
			}, f.id, true, {
				fileName: _jsxFileName,
				lineNumber: 369,
				columnNumber: 56
			}, this)) : faqs.map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", {
				className: "surface-card group p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", {
					className: "cursor-pointer list-none text-base font-semibold",
					children: f.q
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 375,
					columnNumber: 19
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: f.a
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 378,
					columnNumber: 19
				}, this)]
			}, f.q, true, {
				fileName: _jsxFileName,
				lineNumber: 374,
				columnNumber: 45
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 368,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 366,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 384,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 146,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };
