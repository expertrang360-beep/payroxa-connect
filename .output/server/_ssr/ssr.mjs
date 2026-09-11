import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var DEFAULT_SITE_SETTINGS = {
	name: "Payroxa",
	legalName: "Payroxa Technologies Limited",
	tagline: "More than payments.",
	description: "Payroxa is the operating system for African businesses — move money, get paid, sell online and run your business from one secure platform.",
	websiteUrl: "https://payroxa.com.ng",
	appUrl: "https://app.payroxa.com.ng",
	defaultLanguage: "English (en)",
	contactEmail: "support@payroxa.com.ng",
	contactPhone: "+234 800 PAYROXA",
	businessAddress: "Lagos, Nigeria",
	supportEmail: "support@payroxa.com.ng",
	copyrightText: "© 2026 Payroxa. Safe. Fast. Reliable.",
	logoType: "symbol_text",
	brandSymbol: "P",
	brandSymbolBg: "gradient-purple",
	logoUrl: "",
	logoDarkUrl: "",
	logoHeightPx: 36,
	faviconUrl: "/favicon.ico",
	appIconUrl: "/favicon.ico",
	defaultOgImageUrl: "/src/assets/hero-payroxa.jpg",
	updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
	updatedBy: "System"
};
var DEFAULT_APPLICATION_LINKS = {
	app: "https://app.payroxa.com.ng",
	login: "https://app.payroxa.com.ng/login",
	register: "https://app.payroxa.com.ng/register",
	wallet: "https://app.payroxa.com.ng/wallet",
	payments: "https://app.payroxa.com.ng/payments",
	cards: "https://app.payroxa.com.ng/cards",
	store: "https://app.payroxa.com.ng/store",
	business: "https://app.payroxa.com.ng/business",
	transfers: "https://app.payroxa.com.ng/transfers",
	delivery: "https://app.payroxa.com.ng/delivery",
	ride: "https://app.payroxa.com.ng/ride",
	updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
	updatedBy: "System"
};
var DEFAULT_SOCIAL_SETTINGS = {
	links: [
		{
			id: "s-1",
			platform: "instagram",
			label: "Instagram",
			href: "https://instagram.com/payroxaapp",
			enabled: true
		},
		{
			id: "s-2",
			platform: "x",
			label: "X (Twitter)",
			href: "https://x.com/payroxaapp",
			enabled: true
		},
		{
			id: "s-3",
			platform: "linkedin",
			label: "LinkedIn",
			href: "https://linkedin.com/company/payroxa",
			enabled: true
		},
		{
			id: "s-4",
			platform: "facebook",
			label: "Facebook",
			href: "https://facebook.com/payroxaapp",
			enabled: true
		},
		{
			id: "s-5",
			platform: "youtube",
			label: "YouTube",
			href: "https://youtube.com/@payroxa",
			enabled: false
		},
		{
			id: "s-6",
			platform: "tiktok",
			label: "TikTok",
			href: "https://tiktok.com/@payroxa",
			enabled: false
		}
	],
	updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
	updatedBy: "System"
};
var DEFAULT_HERO_CONTENT = {
	eyebrow: "More than payments.",
	headline: "Everything your business needs to",
	highlightedText: "move, sell and grow.",
	description: "Send, receive, save and manage your money with confidence — then sell to customers, issue cards and run the whole business from one Payroxa account.",
	footnote: "Your Money. Your Control. Your Payroxa.",
	primaryCtaLabel: "Get Started",
	primaryCtaUrl: "https://app.payroxa.com.ng/register",
	secondaryCtaLabel: "Sign In",
	secondaryCtaUrl: "https://app.payroxa.com.ng/login",
	heroImageUrl: "/src/assets/hero-payroxa.jpg",
	heroImageAlt: "Payroxa mobile wallet app shown with a Payroxa payment card and coins",
	visibility: true,
	status: "published",
	updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
	updatedBy: "System"
};
var INITIAL_CMS_DATABASE = {
	version: 1,
	users: [{
		id: "usr_admin_default",
		name: "Payroxa Super Admin",
		email: "admin@payroxa.com.ng",
		role: "Super Admin",
		passwordHash: "$2a$10$E3KkYwWvM7mK7ZkQf2x.8.YtWpPn8V1Vq5Y.fJ0fU.M4w3A0vUe3W",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		lastLoginAt: void 0
	}, {
		id: "usr_editor_default",
		name: "Payroxa Content Editor",
		email: "editor@payroxa.com.ng",
		role: "Editor",
		passwordHash: "$2a$10$K9Wn0E9YwD5jA6G7H8J9KuFw1C2D3E4F5G6H7J8K9L0M1N2P3Q4R5",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		lastLoginAt: void 0
	}],
	settings: DEFAULT_SITE_SETTINGS,
	links: DEFAULT_APPLICATION_LINKS,
	social: DEFAULT_SOCIAL_SETTINGS,
	navigation: [
		{
			id: "nav-1",
			label: "Home",
			url: "/",
			type: "internal",
			displayOrder: 1,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-mkt",
			label: "Marketplace",
			url: "/marketplace",
			type: "internal",
			displayOrder: 2,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-2",
			label: "Business",
			url: "/business",
			type: "internal",
			displayOrder: 3,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-3",
			label: "Payments",
			url: "/payments",
			type: "internal",
			displayOrder: 4,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-4",
			label: "Store",
			url: "/store",
			type: "internal",
			displayOrder: 5,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-5",
			label: "Cards",
			url: "/cards",
			type: "internal",
			displayOrder: 6,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-6",
			label: "Pricing",
			url: "/pricing",
			type: "internal",
			displayOrder: 7,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-7",
			label: "About",
			url: "/about",
			type: "internal",
			displayOrder: 7,
			enabled: true,
			section: "header"
		},
		{
			id: "nav-8",
			label: "Contact",
			url: "/contact",
			type: "internal",
			displayOrder: 8,
			enabled: true,
			section: "header"
		}
	],
	hero: {
		published: DEFAULT_HERO_CONTENT,
		draft: DEFAULT_HERO_CONTENT
	},
	trustStrip: {
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System",
		items: [
			{
				id: "t-1",
				icon: "ShieldCheck",
				title: "Secure",
				copy: "Your funds and data are protected end to end.",
				displayOrder: 1,
				enabled: true
			},
			{
				id: "t-2",
				icon: "Zap",
				title: "Fast",
				copy: "Instant payments and real-time settlement.",
				displayOrder: 2,
				enabled: true
			},
			{
				id: "t-3",
				icon: "Headphones",
				title: "Reliable",
				copy: "Support whenever you need us.",
				displayOrder: 3,
				enabled: true
			},
			{
				id: "t-4",
				icon: "Landmark",
				title: "Built for Africa",
				copy: "Made for African businesses and customers.",
				displayOrder: 4,
				enabled: true
			}
		]
	},
	products: [
		{
			id: "prod-1",
			name: "Move Money",
			shortDescription: "Send and receive money in seconds, to any bank or Payroxa account.",
			icon: "Send",
			displayOrder: 1,
			featured: true,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "prod-2",
			name: "Get Paid",
			shortDescription: "Collect payments with links, transfers, cards and QR — settled to your wallet.",
			icon: "Wallet",
			displayOrder: 2,
			featured: true,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "prod-3",
			name: "Sell",
			shortDescription: "Launch a storefront, list products and reach customers already on Payroxa.",
			icon: "ShoppingBag",
			displayOrder: 3,
			featured: true,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "prod-4",
			name: "Run Your Business",
			shortDescription: "Invoices, records and insights that keep the numbers where you can see them.",
			icon: "Briefcase",
			displayOrder: 4,
			featured: false,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "prod-5",
			name: "Move Your Business",
			shortDescription: "Fulfil orders with delivery and logistics built around your storefront.",
			icon: "Truck",
			displayOrder: 5,
			featured: false,
			published: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	],
	businessTypes: [
		{
			id: "bt-1",
			name: "Retail shops",
			displayOrder: 1,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-2",
			name: "Restaurants & food vendors",
			displayOrder: 2,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-3",
			name: "Fashion & beauty brands",
			displayOrder: 3,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-4",
			name: "Online sellers",
			displayOrder: 4,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-5",
			name: "Service professionals",
			displayOrder: 5,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-6",
			name: "Logistics & delivery",
			displayOrder: 6,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-7",
			name: "Agents & merchants",
			displayOrder: 7,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "bt-8",
			name: "Growing SMEs",
			displayOrder: 8,
			active: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	],
	storeSection: {
		eyebrow: "Payroxa Store",
		title: "Shop smarter — and sell smarter",
		description: "Open a storefront, list your products and let customers discover and pay you inside Payroxa. No website required.",
		features: [
			"Product listings, categories and store profile",
			"Payments settled straight into your wallet",
			"Orders, delivery and customer records in one view"
		],
		ctaLabel: "Create Your Store",
		ctaUrl: "https://app.payroxa.com.ng/store",
		secondaryCtaLabel: "Learn more",
		secondaryCtaUrl: "/store",
		cardHeadline: "Discover great products from trusted businesses.",
		cardDescription: "Payroxa Store puts your business in front of customers already moving money on Payroxa every day.",
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	},
	walletSection: {
		eyebrow: "Wallet",
		title: "A secure wallet for your funds",
		description: "Hold, move and track your money with balances you can see at a glance and controls you actually understand.",
		nairaTitle: "Instant transfers",
		nairaSubtitle: "Naira wallet",
		dollarTitle: "Cross-border ready",
		dollarSubtitle: "Dollar wallet",
		features: [
			"Add money, send, withdraw, exchange",
			"Statements and transaction history",
			"Saved bank accounts and beneficiaries",
			"Clear limits and spending controls"
		],
		ctaLabel: "Open your wallet",
		ctaUrl: "https://app.payroxa.com.ng/wallet",
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	},
	dashboardSection: {
		eyebrow: "Business dashboard",
		title: "Know your numbers without the guesswork",
		description: "Track inflows, outflows, orders and customers with reporting built for the way African businesses actually operate.",
		metrics: [
			{
				id: "m-1",
				label: "Inflow & outflow",
				copy: "See money in and money out per day, week or month."
			},
			{
				id: "m-2",
				label: "Order insights",
				copy: "Best sellers, repeat buyers and fulfilment status."
			},
			{
				id: "m-3",
				label: "Team access",
				copy: "Give staff the access they need, nothing more."
			},
			{
				id: "m-4",
				label: "Exportable records",
				copy: "Download statements for accounting and audits."
			}
		],
		ctaLabel: "Start with Payroxa Business",
		ctaUrl: "https://app.payroxa.com.ng/business",
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	},
	securitySection: {
		eyebrow: "Security",
		title: "Safe. Fast. Reliable. That's the Payroxa way.",
		description: "Security is not a feature we added later — it shapes how every part of Payroxa is built.",
		points: [
			{
				id: "sec-1",
				icon: "Lock",
				title: "Encryption everywhere",
				copy: "Data is encrypted in transit and at rest."
			},
			{
				id: "sec-2",
				icon: "Fingerprint",
				title: "Verified identities",
				copy: "Tiered verification keeps accounts real."
			},
			{
				id: "sec-3",
				icon: "ShieldCheck",
				title: "Fraud monitoring",
				copy: "Suspicious activity is flagged early."
			},
			{
				id: "sec-4",
				icon: "BarChart3",
				title: "Full audit trail",
				copy: "Every transaction is recorded and traceable."
			}
		],
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	},
	howItWorks: [
		{
			id: "hw-1",
			step: "01",
			title: "Create your account",
			copy: "Sign up with your phone number or email.",
			displayOrder: 1,
			enabled: true
		},
		{
			id: "hw-2",
			step: "02",
			title: "Verify your business",
			copy: "Complete verification to unlock full limits.",
			displayOrder: 2,
			enabled: true
		},
		{
			id: "hw-3",
			step: "03",
			title: "Fund your wallet",
			copy: "Add money by transfer, card or agent.",
			displayOrder: 3,
			enabled: true
		},
		{
			id: "hw-4",
			step: "04",
			title: "Start transacting",
			copy: "Pay, get paid, sell and grow from one place.",
			displayOrder: 4,
			enabled: true
		}
	],
	cardsSection: {
		eyebrow: "Cards",
		title: "Virtual and physical cards for real spending",
		description: "Spend online and in store, set limits, freeze a card instantly and keep every transaction visible.",
		ctaLabel: "Get a card",
		ctaUrl: "https://app.payroxa.com.ng/cards",
		secondaryCtaLabel: "See how cards work",
		secondaryCtaUrl: "/cards",
		cardPlaceholderNumber: "•••• •••• •••• 7528",
		cardLabel: "Payroxa Card",
		cardExpiry: "••/••",
		visibility: true,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	},
	faqs: [
		{
			id: "faq-1",
			question: "What is Payroxa?",
			answer: "Payroxa is a business platform that brings payments, a secure wallet, cards, a storefront and business tools together in one app.",
			category: "General",
			displayOrder: 1,
			status: "published",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "faq-2",
			question: "Who can use Payroxa?",
			answer: "Individuals, merchants and registered businesses across Africa who want a simpler way to move money and get paid.",
			category: "Eligibility",
			displayOrder: 2,
			status: "published",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "faq-3",
			question: "How long does verification take?",
			answer: "Most accounts are verified shortly after the required details are submitted. Higher limits may need additional business documents.",
			category: "Verification",
			displayOrder: 3,
			status: "published",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "faq-4",
			question: "Can I sell on Payroxa without a website?",
			answer: "Yes. Payroxa Store gives you a storefront and a shareable link, so you can start selling without building a website.",
			category: "Store",
			displayOrder: 4,
			status: "published",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "faq-5",
			question: "Is my money safe?",
			answer: "Payroxa uses encryption, identity verification and continuous monitoring, and works with licensed financial partners.",
			category: "Security",
			displayOrder: 5,
			status: "published",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	],
	testimonials: [],
	media: [
		{
			id: "med-1",
			filename: "hero-payroxa.jpg",
			originalName: "hero-payroxa.jpg",
			mimeType: "image/jpeg",
			sizeBytes: 250880,
			url: "/src/assets/hero-payroxa.jpg",
			category: "heroes",
			altText: "Payroxa Mobile Wallet and Payment Card Mockup",
			dimensions: {
				width: 1200,
				height: 800
			},
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			uploadedBy: "System"
		},
		{
			id: "med-2",
			filename: "favicon.ico",
			originalName: "favicon.ico",
			mimeType: "image/x-icon",
			sizeBytes: 16384,
			url: "/favicon.ico",
			category: "branding",
			altText: "Payroxa Brand Favicon Icon",
			dimensions: {
				width: 64,
				height: 64
			},
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			uploadedBy: "System"
		},
		{
			id: "med-3",
			filename: "payroxa-mark.svg",
			originalName: "payroxa-mark.svg",
			mimeType: "image/svg+xml",
			sizeBytes: 4096,
			url: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%237928CA'/%3E%3Cstop offset='100%25' stop-color='%239B51E0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='url(%23g)'/%3E%3Ctext x='50' y='68' font-size='54' font-weight='bold' font-family='system-ui, sans-serif' fill='%23ffffff' text-anchor='middle'%3EP%3C/text%3E%3C/svg%3E",
			category: "branding",
			altText: "Payroxa Primary Brand Icon Mark",
			dimensions: {
				width: 100,
				height: 100
			},
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			uploadedBy: "System"
		}
	],
	announcements: [{
		id: "ann-1",
		title: "Payroxa Cards",
		message: "Virtual & Physical cards are officially rolling out for Nigerian businesses.",
		ctaLabel: "Learn More",
		ctaUrl: "https://app.payroxa.com.ng/cards",
		enabled: false,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: "System"
	}],
	seo: {
		home: {
			pageSlug: "/",
			pageTitle: "Home",
			metaTitle: "Payroxa — Payments, Wallet, Cards & Store for African Businesses",
			metaDescription: "Everything your business needs to move money, get paid, sell online and grow. Payroxa is the operating system for African businesses.",
			keywords: "payments, wallet, cards, store, Nigeria, Africa, fintech, POS",
			canonicalUrl: "https://payroxa.com.ng/",
			ogTitle: "Payroxa — Payments, Wallet, Cards & Store for African Businesses",
			ogDescription: "Everything your business needs to move money, get paid, sell online and grow. Payroxa is the operating system for African businesses.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "Organization",
			priority: 1,
			changefreq: "daily",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		payments: {
			pageSlug: "/payments",
			pageTitle: "Payments",
			metaTitle: "Payment Solutions for African Businesses | Payroxa",
			metaDescription: "Accept payments, send payment requests and manage your business transactions with Payroxa.",
			keywords: "payment solutions Nigeria, online payments, payment links, merchant checkout",
			canonicalUrl: "https://payroxa.com.ng/payments",
			ogTitle: "Payment Solutions for African Businesses | Payroxa",
			ogDescription: "Accept payments, send payment requests and manage your business transactions with Payroxa.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "SoftwareApplication",
			priority: .9,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		business: {
			pageSlug: "/business",
			pageTitle: "Business Platform",
			metaTitle: "Business Management Platform for African Businesses | Payroxa",
			metaDescription: "Manage cash flow, monitor POS collections, issue virtual cards, and run your business from one unified platform.",
			keywords: "business management platform Nigeria, retail pos, financial tools",
			canonicalUrl: "https://payroxa.com.ng/business",
			ogTitle: "Business Management Platform for African Businesses | Payroxa",
			ogDescription: "Manage cash flow, monitor POS collections, issue virtual cards, and run your business from one unified platform.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "SoftwareApplication",
			priority: .9,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		store: {
			pageSlug: "/store",
			pageTitle: "Online Store",
			metaTitle: "Create an Online Store for Your Business | Payroxa",
			metaDescription: "Launch an online store in minutes, list products, accept instant payments, and manage orders with Payroxa Store.",
			keywords: "create online store Nigeria, ecommerce store, sell products online",
			canonicalUrl: "https://payroxa.com.ng/store",
			ogTitle: "Create an Online Store for Your Business | Payroxa",
			ogDescription: "Launch an online store in minutes, list products, accept instant payments, and manage orders with Payroxa Store.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "SoftwareApplication",
			priority: .9,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		cards: {
			pageSlug: "/cards",
			pageTitle: "Cards",
			metaTitle: "Payroxa Business & Virtual Cards",
			metaDescription: "Issue instant virtual dollar and local corporate debit cards for business expenses, software subscriptions, and ad spend.",
			keywords: "virtual dollar card Nigeria, business debit cards, corporate card",
			canonicalUrl: "https://payroxa.com.ng/cards",
			ogTitle: "Payroxa Business & Virtual Cards",
			ogDescription: "Issue instant virtual dollar and local corporate debit cards for business expenses, software subscriptions, and ad spend.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "FinancialService",
			priority: .9,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		wallet: {
			pageSlug: "/wallet",
			pageTitle: "Business Wallet",
			metaTitle: "Multi-Currency Business Wallet & Virtual Accounts | Payroxa",
			metaDescription: "Hold, convert and manage Naira and USD business balances with dedicated virtual account numbers.",
			keywords: "business wallet, virtual accounts Nigeria, FX business wallet",
			canonicalUrl: "https://payroxa.com.ng/wallet",
			ogTitle: "Multi-Currency Business Wallet & Virtual Accounts | Payroxa",
			ogDescription: "Hold, convert and manage Naira and USD business balances with dedicated virtual account numbers.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "FinancialService",
			priority: .8,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		transfers: {
			pageSlug: "/transfers",
			pageTitle: "Transfers & Payouts",
			metaTitle: "Instant Business Transfers & Bulk Payouts | Payroxa",
			metaDescription: "Send money to all Nigerian commercial banks instantly with guaranteed real-time settlement and automated payroll payouts.",
			keywords: "business bank transfers Nigeria, instant settlement, bulk payroll",
			canonicalUrl: "https://payroxa.com.ng/transfers",
			ogTitle: "Instant Business Transfers & Bulk Payouts | Payroxa",
			ogDescription: "Send money to all Nigerian commercial banks instantly with guaranteed real-time settlement and automated payroll payouts.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "FinancialService",
			priority: .8,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		"payment-links": {
			pageSlug: "/payment-links",
			pageTitle: "Payment Links",
			metaTitle: "Payment Links for Businesses | Payroxa",
			metaDescription: "Create payment links and make it easier for customers to pay your business with Payroxa.",
			keywords: "payment links Nigeria, WhatsApp checkout, get paid online without website",
			canonicalUrl: "https://payroxa.com.ng/payment-links",
			ogTitle: "Payment Links for Businesses | Payroxa",
			ogDescription: "Create payment links and make it easier for customers to pay your business with Payroxa.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "SoftwareApplication",
			priority: .8,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		"payment-requests": {
			pageSlug: "/payment-requests",
			pageTitle: "Payment Requests",
			metaTitle: "Digital Invoicing & Payment Requests | Payroxa",
			metaDescription: "Send professional payment requests and digital invoices to clients with automated customer payment reminders.",
			keywords: "payment request link Nigeria, invoice clients, digital bills",
			canonicalUrl: "https://payroxa.com.ng/payment-requests",
			ogTitle: "Digital Invoicing & Payment Requests | Payroxa",
			ogDescription: "Send professional payment requests and digital invoices to clients with automated customer payment reminders.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "SoftwareApplication",
			priority: .8,
			changefreq: "weekly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		pricing: {
			pageSlug: "/pricing",
			pageTitle: "Pricing",
			metaTitle: "Transparent Pricing & Transaction Fees | Payroxa",
			metaDescription: "Fair, transparent pricing with no hidden charges, zero maintenance fees, and competitive merchant rates across Africa.",
			keywords: "payroxa pricing, fintech fees Nigeria, merchant rates",
			canonicalUrl: "https://payroxa.com.ng/pricing",
			ogTitle: "Transparent Pricing & Transaction Fees | Payroxa",
			ogDescription: "Fair, transparent pricing with no hidden charges, zero maintenance fees, and competitive merchant rates across Africa.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "WebSite",
			priority: .7,
			changefreq: "monthly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		about: {
			pageSlug: "/about",
			pageTitle: "About Us",
			metaTitle: "About Payroxa — Building Financial Infrastructure for Africa",
			metaDescription: "Discover our mission to empower African entrepreneurs and growing enterprises with seamless financial technology.",
			keywords: "about payroxa, fintech startup Nigeria, African commerce",
			canonicalUrl: "https://payroxa.com.ng/about",
			ogTitle: "About Payroxa — Building Financial Infrastructure for Africa",
			ogDescription: "Discover our mission to empower African entrepreneurs and growing enterprises with seamless financial technology.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "Organization",
			priority: .7,
			changefreq: "monthly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		contact: {
			pageSlug: "/contact",
			pageTitle: "Contact Support",
			metaTitle: "Contact Payroxa — 24/7 Merchant Support & Inquiries",
			metaDescription: "Reach out to our customer operations team for merchant onboarding, technical support, and partnership inquiries.",
			keywords: "payroxa contact, customer support, merchant help Nigeria",
			canonicalUrl: "https://payroxa.com.ng/contact",
			ogTitle: "Contact Payroxa — 24/7 Merchant Support & Inquiries",
			ogDescription: "Reach out to our customer operations team for merchant onboarding, technical support, and partnership inquiries.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "Organization",
			priority: .7,
			changefreq: "monthly",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		},
		resources: {
			pageSlug: "/resources",
			pageTitle: "Resources & Guides",
			metaTitle: "Payroxa Business & Financial Growth Resources | Payroxa",
			metaDescription: "Actionable guides, business insights, fintech tutorials, and payment best practices for African entrepreneurs.",
			keywords: "fintech guides Nigeria, business tips Africa, accept online payments",
			canonicalUrl: "https://payroxa.com.ng/resources",
			ogTitle: "Payroxa Business & Financial Growth Resources | Payroxa",
			ogDescription: "Actionable guides, business insights, fintech tutorials, and payment best practices for African entrepreneurs.",
			ogImageUrl: "/hero-payroxa.jpg",
			twitterCard: "summary_large_image",
			robotsDirective: "index, follow",
			schemaType: "WebSite",
			priority: .8,
			changefreq: "daily",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedBy: "System"
		}
	},
	blogCategories: [
		{
			id: "cat-1",
			name: "Payments & Invoicing",
			slug: "payments",
			description: "Guides on collecting customer money, payment gateways, and checkout best practices.",
			color: "purple"
		},
		{
			id: "cat-2",
			name: "E-commerce & Store",
			slug: "commerce",
			description: "Practical strategies for launching storefronts and scaling digital sales.",
			color: "emerald"
		},
		{
			id: "cat-3",
			name: "Financial Tools & Cards",
			slug: "financial-tools",
			description: "Managing corporate cards, foreign exchange, virtual accounts, and cash flow.",
			color: "blue"
		},
		{
			id: "cat-4",
			name: "Business Growth",
			slug: "business-growth",
			description: "Actionable tips for small businesses and merchants scaling in Nigeria and Africa.",
			color: "amber"
		}
	],
	blogAuthors: [{
		id: "auth-1",
		name: "Payroxa Editorial Team",
		role: "Fintech & Commerce Specialists",
		bio: "The official research and content team at Payroxa, creating practical business guides.",
		avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
	}, {
		id: "auth-2",
		name: "Adaeze Okafor",
		role: "Head of Merchant Growth",
		bio: "Advising retail businesses and tech startups across Lagos and Abuja on digital commerce.",
		avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
	}],
	blogPosts: [
		{
			id: "post-1",
			title: "How to Accept Payments From Customers in Nigeria (Complete 2026 Guide)",
			slug: "how-to-accept-online-payments-in-nigeria",
			excerpt: "Discover the most reliable, secure payment methods for Nigerian businesses — from payment links to instant bank transfers and QR codes.",
			content: `### The Modern Payment Landscape in Nigeria

Running a business in Nigeria requires offering payment options that fit customer habits. With cash-on-delivery declining and mobile transfers dominating, your business must be equipped to collect payments friction-free.

#### 1. Bank Transfers & Dedicated Virtual Accounts
Bank transfers represent over 70% of digital transactions in Nigeria. By issuing dedicated virtual accounts to your customers or for specific orders, confirmation is instantaneous. No manual screenshot verification required.

#### 2. One-Click Payment Links
If you sell on WhatsApp, Instagram, or Twitter, sending a payment link is the fastest way to close a sale. The customer clicks, chooses their preferred channel (Card, USSD, Bank Transfer, or Apple Pay), and your balance updates in real-time.

#### 3. In-Store POS & QR Codes
Physical merchants need reliable terminal hardware that doesn't suffer frequent network downtime. Dual-connectivity SIM cards and dynamic QR codes keep checkouts moving during peak business hours.

#### Key Takeaway
Equipping your business with unified tools lowers abandoned checkouts and accelerates cash settlement. With Payroxa, you get instant settlement, clear audit trails, and zero maintenance fees.`,
			featuredImageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
			featuredImageAlt: "Nigerian business owner accepting digital payments on tablet",
			authorId: "auth-1",
			authorName: "Payroxa Editorial Team",
			authorRole: "Fintech & Commerce Specialists",
			categoryId: "cat-1",
			categoryName: "Payments & Invoicing",
			tags: [
				"online payments",
				"Nigeria",
				"payment links",
				"fintech"
			],
			readTimeMinutes: 5,
			seoTitle: "How to Accept Payments From Customers in Nigeria | Payroxa",
			metaDescription: "Learn how Nigerian businesses collect payments easily with payment links, virtual accounts, and POS tools without reconciliation headaches.",
			canonicalUrl: "https://payroxa.com.ng/resources/how-to-accept-online-payments-in-nigeria",
			ogImageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
			status: "published",
			publishedAt: (/* @__PURE__ */ new Date(Date.now() - 432e6)).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: true,
			relatedProduct: "payments"
		},
		{
			id: "post-2",
			title: "What Is a Payment Link and How Does It Work for Social Commerce?",
			slug: "what-is-a-payment-link-how-it-works",
			excerpt: "Learn how payment links allow Instagram, WhatsApp, and service businesses to collect customer payments instantly without an expensive website.",
			content: `### Selling on Social Media Without a Full Website

A payment link is a secure, unique URL generated by your payment provider that directs a customer to a hosted checkout page. Instead of asking customers to manually type your bank account number and send back a blurry receipt, a payment link handles everything automatically.

#### How It Works in 3 Simple Steps:
1. **Create the Link:** Specify the amount, item name, and optional description in your Payroxa dashboard.
2. **Share with Customer:** Send the link via WhatsApp DM, Instagram Direct, SMS, or paste it in your social bio.
3. **Instant Confirmation:** The customer pays via their bank app or card; both you and the buyer receive instant SMS and email receipts.

#### Benefits for Small Merchants:
- **Zero Coding Required:** You don't need to hire a web developer or maintain a server.
- **Prevents Fake Transfer Fraud:** Funds are deposited directly to your verified Payroxa account before goods are dispatched.
- **Faster Checkout:** Customers complete payment in under 30 seconds.`,
			featuredImageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&auto=format&fit=crop&q=80",
			featuredImageAlt: "Customer completing payment on smartphone via payment link",
			authorId: "auth-2",
			authorName: "Adaeze Okafor",
			authorRole: "Head of Merchant Growth",
			categoryId: "cat-1",
			categoryName: "Payments & Invoicing",
			tags: [
				"payment links",
				"social commerce",
				"WhatsApp sales"
			],
			readTimeMinutes: 4,
			seoTitle: "What Is a Payment Link and How Does It Work? | Payroxa",
			metaDescription: "Everything you need to know about payment links: how they work, why they protect against transfer fraud, and how to create one in seconds.",
			canonicalUrl: "https://payroxa.com.ng/resources/what-is-a-payment-link-how-it-works",
			ogImageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&auto=format&fit=crop&q=80",
			status: "published",
			publishedAt: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: false,
			relatedProduct: "payment-links"
		},
		{
			id: "post-3",
			title: "How to Create an Online Store for Your Business in Under 10 Minutes",
			slug: "how-to-create-an-online-store-for-your-business",
			excerpt: "Step-by-step guide to setting up an e-commerce storefront, adding product catalogs, enabling instant checkout, and managing orders seamlessly.",
			content: `### Why Every African Business Needs a Digital Storefront

Traditional e-commerce platforms like Shopify or WooCommerce often require USD subscriptions, complicated hosting setups, and external payment gateway plugins that fail frequently.

Payroxa Store was built specifically for African merchants who want a beautiful, mobile-optimized catalog that works out of the box.

#### Setting Up in Minutes:
1. **Name Your Store:** Choose your unique web address (e.g., payroxa.com.ng/store/yourbusiness).
2. **Add Products & Photos:** Upload high-resolution product photos, variants (sizes/colors), and stock quantities.
3. **Connect Delivery & Payment:** Payments are automatically processed through your Payroxa balance, and customer delivery addresses are captured during checkout.

#### Managing Orders on Mobile:
Every time an order is placed, you receive an instant push notification with customer details, order summary, and shipping preference.`,
			featuredImageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80",
			featuredImageAlt: "Modern boutique store with online inventory and digital checkout",
			authorId: "auth-2",
			authorName: "Adaeze Okafor",
			authorRole: "Head of Merchant Growth",
			categoryId: "cat-2",
			categoryName: "E-commerce & Store",
			tags: [
				"online store",
				"ecommerce",
				"retail",
				"sell online"
			],
			readTimeMinutes: 6,
			seoTitle: "How to Create an Online Store for Your Business | Payroxa",
			metaDescription: "Step-by-step guide on launching your online store with Payroxa Store. Sell physical products, collect payments, and manage shipping easily.",
			canonicalUrl: "https://payroxa.com.ng/resources/how-to-create-an-online-store-for-your-business",
			ogImageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80",
			status: "published",
			publishedAt: (/* @__PURE__ */ new Date(Date.now() - 1728e5)).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: true,
			relatedProduct: "store"
		},
		{
			id: "post-4",
			title: "Virtual Dollar Cards for Nigerian Businesses: Solving International Spending",
			slug: "virtual-cards-for-nigerian-businesses-international-spending",
			excerpt: "How modern virtual business cards solve global software payment failures (AWS, Google Workspace, Meta Ads) for African tech and retail teams.",
			content: `### The Challenge with International Subscriptions

Running a business in 2026 relies on global software: Google Workspace for email, Zoom for client meetings, Meta Ads for customer acquisition, and cloud servers like AWS. However, local Naira debit cards frequently have strict international spending limits or are blocked entirely.

#### The Virtual Card Solution
A virtual card exists digitally with its own 16-digit PAN, CVV, expiry date, and billing address. You can generate multiple virtual cards for different team members or expenses:
- **Marketing Card:** Dedicated to Meta and Google Ads with a fixed monthly limit.
- **Software Card:** Dedicated to recurring SaaS subscriptions.
- **Vendor Card:** One-time use card for single supplier payments.

#### Instant Freezing and Security
If an unfamiliar transaction occurs, freeze the card with one tap in your Payroxa app. Your core bank balance remains completely insulated.`,
			featuredImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
			featuredImageAlt: "Virtual debit card illustration on smartphone screen",
			authorId: "auth-1",
			authorName: "Payroxa Editorial Team",
			authorRole: "Fintech & Commerce Specialists",
			categoryId: "cat-3",
			categoryName: "Financial Tools & Cards",
			tags: [
				"virtual cards",
				"dollar card",
				"corporate expenses"
			],
			readTimeMinutes: 5,
			seoTitle: "Virtual Cards for Nigerian Businesses & International Spend | Payroxa",
			metaDescription: "Solve international subscription and advertisement payment declines with Payroxa instant virtual cards with custom spending limits.",
			canonicalUrl: "https://payroxa.com.ng/resources/virtual-cards-for-nigerian-businesses-international-spending",
			ogImageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
			status: "published",
			publishedAt: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: false,
			relatedProduct: "cards"
		}
	],
	redirects: [
		{
			id: "red-1",
			sourcePath: "/online-payments",
			targetPath: "/payments",
			statusCode: 301,
			enabled: true,
			hitCount: 14,
			lastHitAt: (/* @__PURE__ */ new Date(Date.now() - 144e5)).toISOString(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "red-2",
			sourcePath: "/pos",
			targetPath: "/business",
			statusCode: 301,
			enabled: true,
			hitCount: 28,
			lastHitAt: (/* @__PURE__ */ new Date(Date.now() - 72e5)).toISOString(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		{
			id: "red-3",
			sourcePath: "/virtual-cards",
			targetPath: "/cards",
			statusCode: 301,
			enabled: true,
			hitCount: 9,
			lastHitAt: (/* @__PURE__ */ new Date(Date.now() - 288e5)).toISOString(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}
	],
	searchConsole: {
		googleVerificationTag: "google-site-verification=payroxa_prod_search_console_token_demo",
		sitemapSubmittedUrl: "https://payroxa.com.ng/sitemap.xml",
		lastVerifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
		notes: "Google Search Console verified. Auto-sitemap ping configured for published content."
	},
	activities: [{
		id: "act-init",
		action: "settings_updated",
		description: "Payroxa Website CMS initialized with production configurations.",
		userName: "System",
		userEmail: "system@payroxa.com.ng",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		resourceType: "system"
	}],
	revisions: []
};
var DB_DIR = path.resolve(process.cwd(), ".data");
var DB_FILE = path.join(DB_DIR, "cms-db.json");
var memoryDb = null;
function ensureDbDirectory() {
	try {
		if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
	} catch (err) {
		console.warn("Could not create .data directory:", err);
	}
}
function getCmsDb() {
	if (memoryDb) return memoryDb;
	ensureDbDirectory();
	try {
		if (fs.existsSync(DB_FILE)) {
			const data = fs.readFileSync(DB_FILE, "utf-8");
			const parsed = JSON.parse(data);
			memoryDb = {
				...INITIAL_CMS_DATABASE,
				...parsed,
				settings: {
					...INITIAL_CMS_DATABASE.settings,
					...parsed.settings || {}
				},
				links: {
					...INITIAL_CMS_DATABASE.links,
					...parsed.links || {}
				},
				social: {
					...INITIAL_CMS_DATABASE.social,
					...parsed.social || {}
				},
				seo: {
					...INITIAL_CMS_DATABASE.seo,
					...parsed.seo || {}
				},
				blogPosts: parsed.blogPosts && parsed.blogPosts.length > 0 ? parsed.blogPosts : INITIAL_CMS_DATABASE.blogPosts,
				blogCategories: parsed.blogCategories && parsed.blogCategories.length > 0 ? parsed.blogCategories : INITIAL_CMS_DATABASE.blogCategories,
				blogAuthors: parsed.blogAuthors && parsed.blogAuthors.length > 0 ? parsed.blogAuthors : INITIAL_CMS_DATABASE.blogAuthors,
				redirects: parsed.redirects && parsed.redirects.length > 0 ? parsed.redirects : INITIAL_CMS_DATABASE.redirects,
				searchConsole: {
					...INITIAL_CMS_DATABASE.searchConsole,
					...parsed.searchConsole || {}
				}
			};
			return memoryDb;
		}
	} catch (err) {
		console.error("Error reading CMS DB file, falling back to default:", err);
	}
	memoryDb = JSON.parse(JSON.stringify(INITIAL_CMS_DATABASE));
	saveCmsDb(memoryDb);
	return memoryDb;
}
function saveCmsDb(db) {
	memoryDb = db;
	ensureDbDirectory();
	try {
		const tmpFile = `${DB_FILE}.${Date.now()}.tmp`;
		fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), "utf-8");
		fs.renameSync(tmpFile, DB_FILE);
	} catch (err) {
		console.error("Error persisting CMS DB to file:", err);
	}
}
function logActivity(action, description, user, resourceType, resourceId) {
	const db = getCmsDb();
	db.activities = [{
		id: `act_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
		action,
		description,
		userName: user.name || "Administrator",
		userEmail: user.email || "admin@payroxa.com.ng",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		resourceType,
		resourceId
	}, ...db.activities || []].slice(0, 100);
	saveCmsDb(db);
}
function sanitizeUser(u) {
	return {
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role,
		avatarUrl: u.avatarUrl,
		createdAt: u.createdAt,
		lastLoginAt: u.lastLoginAt
	};
}
function getCmsUsers() {
	return getCmsDb().users.map(sanitizeUser);
}
function findUserByEmail(email) {
	const db = getCmsDb();
	const cleanEmail = email.trim().toLowerCase();
	return db.users.find((u) => u.email.toLowerCase() === cleanEmail);
}
function findUserById(id) {
	return getCmsDb().users.find((u) => u.id === id);
}
function updateSiteSettings(settings, user) {
	const db = getCmsDb();
	db.settings = {
		...db.settings,
		...settings,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: user.name || user.email
	};
	logActivity("settings_updated", `Updated general website settings (${Object.keys(settings).join(", ")})`, user, "settings");
	saveCmsDb(db);
	return db.settings;
}
function updateApplicationLinks(links, user) {
	const db = getCmsDb();
	db.links = {
		...db.links,
		...links,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: user.name || user.email
	};
	logActivity("link_changed", `Updated application destination links (${Object.keys(links).join(", ")})`, user, "links");
	saveCmsDb(db);
	return db.links;
}
function updateSocialSettings(social, user) {
	const db = getCmsDb();
	db.social = {
		...social,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedBy: user.name || user.email
	};
	logActivity("settings_updated", "Updated social media channel configurations", user, "social");
	saveCmsDb(db);
	return db.social;
}
function generateSitemapXml(db, baseUrl = "https://payroxa.com.ng") {
	const cleanBase = baseUrl.replace(/\/$/, "");
	const urls = [];
	const seoEntries = Object.values(db.seo || {});
	for (const page of seoEntries) {
		if (page.robotsDirective && page.robotsDirective.includes("noindex")) continue;
		const cleanSlug = page.pageSlug === "/" ? "" : page.pageSlug.startsWith("/") ? page.pageSlug : `/${page.pageSlug}`;
		urls.push({
			loc: `${cleanBase}${cleanSlug}`,
			lastmod: page.updatedAt ? new Date(page.updatedAt).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			changefreq: page.changefreq || (cleanSlug === "" ? "daily" : "weekly"),
			priority: page.priority !== void 0 ? page.priority : cleanSlug === "" ? 1 : .8
		});
	}
	const blogPosts = (db.blogPosts || []).filter((p) => p.status === "published");
	for (const post of blogPosts) urls.push({
		loc: `${cleanBase}/resources/${post.slug}`,
		lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		changefreq: "weekly",
		priority: .7
	});
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map((u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;
}
function generateRobotsTxt(baseUrl = "https://payroxa.com.ng") {
	const cleanBase = baseUrl.replace(/\/$/, "");
	return `# robots.txt for Payroxa (Production Engine)
User-agent: *
Allow: /
Disallow: /cms-admin
Disallow: /cms-admin/
Disallow: /api/
Disallow: /_build/

# Host configuration
Host: ${cleanBase}

# Canonical XML Sitemap
Sitemap: ${cleanBase}/sitemap.xml
`;
}
function handleServerRedirect(pathname, redirects) {
	const cleanPath = pathname.toLowerCase().replace(/\/$/, "");
	for (const rule of redirects) {
		if (!rule.enabled) continue;
		if (cleanPath === rule.sourcePath.toLowerCase().replace(/\/$/, "")) return {
			shouldRedirect: true,
			target: rule.targetPath,
			status: rule.statusCode || 301,
			ruleId: rule.id
		};
	}
	return null;
}
function auditSeoHealth(db) {
	const issues = [];
	const pages = Object.values(db.seo || {});
	const posts = (db.blogPosts || []).filter((p) => p.status === "published");
	let deductions = 0;
	for (const page of pages) {
		if (!page.metaTitle || page.metaTitle.trim().length === 0) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "critical",
				message: "Missing Meta Title tag",
				recommendation: "Search engines require a distinctive <title> tag between 50 and 60 characters."
			});
			deductions += 12;
		} else if (page.metaTitle.length < 35) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: `Short Meta Title (${page.metaTitle.length} characters)`,
				recommendation: "Expand the title with target search keywords (aim for 50-60 chars)."
			});
			deductions += 3;
		} else if (page.metaTitle.length > 65) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: `Long Meta Title (${page.metaTitle.length} characters)`,
				recommendation: "Google truncates titles over ~60 characters on desktop and mobile SERPs."
			});
			deductions += 3;
		}
		if (!page.metaDescription || page.metaDescription.trim().length === 0) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "critical",
				message: "Missing Meta Description",
				recommendation: "Add a compelling call-to-action summary between 140 and 160 characters."
			});
			deductions += 10;
		} else if (page.metaDescription.length < 90) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: `Short Meta Description (${page.metaDescription.length} characters)`,
				recommendation: "Expand the description to ~140-160 characters to maximize click-through rate."
			});
			deductions += 2;
		} else if (page.metaDescription.length > 165) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: `Long Meta Description (${page.metaDescription.length} characters)`,
				recommendation: "Shorten under 160 characters so Google does not trim the snippet."
			});
			deductions += 2;
		}
		if (!page.canonicalUrl || !page.canonicalUrl.startsWith("http")) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: "Missing or relative Canonical URL",
				recommendation: "Specify an absolute canonical URL to consolidate ranking signals."
			});
			deductions += 4;
		}
		if (!page.ogImageUrl) {
			issues.push({
				pageSlug: page.pageSlug,
				pageTitle: page.pageTitle,
				type: "warning",
				message: "Missing OpenGraph Social Sharing Image",
				recommendation: "Add a 1200x630 preview image for WhatsApp, X (Twitter), and LinkedIn shares."
			});
			deductions += 3;
		}
	}
	for (const post of posts) {
		if (!post.metaDescription || post.metaDescription.length < 50) {
			issues.push({
				pageSlug: `/resources/${post.slug}`,
				pageTitle: post.title,
				type: "warning",
				message: "Blog post has thin or missing Meta Description",
				recommendation: "Craft an enticing 140-character summary of this resource."
			});
			deductions += 3;
		}
		if (!post.featuredImageUrl) {
			issues.push({
				pageSlug: `/resources/${post.slug}`,
				pageTitle: post.title,
				type: "warning",
				message: "Missing Featured Image for Article",
				recommendation: "Articles with high-quality featured images earn higher CTR in Google Discover."
			});
			deductions += 3;
		}
	}
	return {
		score: Math.max(15, Math.min(100, 100 - deductions)),
		totalPages: pages.length,
		totalBlogPosts: posts.length,
		indexedPages: pages.filter((p) => !p.robotsDirective || !p.robotsDirective.includes("noindex")).length,
		redirectsCount: (db.redirects || []).filter((r) => r.enabled).length,
		issues
	};
}
function escapeXml(unsafe) {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case "<": return "&lt;";
			case ">": return "&gt;";
			case "&": return "&amp;";
			case "'": return "&apos;";
			case "\"": return "&quot;";
			default: return c;
		}
	});
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-Dv2aPpv3.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const url = new URL(request.url);
		const pathname = url.pathname;
		if (pathname === "/robots.txt") {
			const robotsTxt = generateRobotsTxt(`${url.protocol}//${url.host}`);
			return new Response(robotsTxt, {
				status: 200,
				headers: {
					"content-type": "text/plain; charset=utf-8",
					"cache-control": "public, max-age=3600, s-maxage=86400"
				}
			});
		}
		if (pathname === "/sitemap.xml") {
			const sitemapXml = generateSitemapXml(getCmsDb(), `${url.protocol}//${url.host}`);
			return new Response(sitemapXml, {
				status: 200,
				headers: {
					"content-type": "application/xml; charset=utf-8",
					"cache-control": "public, max-age=3600, s-maxage=86400"
				}
			});
		}
		try {
			const db = getCmsDb();
			if (db.redirects && db.redirects.length > 0) {
				const match = handleServerRedirect(pathname, db.redirects);
				if (match && match.shouldRedirect) {
					const rule = db.redirects.find((r) => r.id === match.ruleId);
					if (rule) {
						rule.hitCount = (rule.hitCount || 0) + 1;
						rule.lastHitAt = (/* @__PURE__ */ new Date()).toISOString();
						saveCmsDb(db);
					}
					const destination = match.target.startsWith("http") ? match.target : `${url.protocol}//${url.host}${match.target.startsWith("/") ? "" : "/"}${match.target}`;
					return Response.redirect(destination, match.status);
				}
			}
		} catch (redirectErr) {
			console.warn("Redirect processing error:", redirectErr);
		}
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { getCmsUsers as a, saveCmsDb as c, updateSocialSettings as d, server_default as default, DEFAULT_APPLICATION_LINKS as f, renderErrorPage as g, INITIAL_CMS_DATABASE as h, getCmsDb as i, updateApplicationLinks as l, DEFAULT_SITE_SETTINGS as m, findUserByEmail as n, logActivity as o, DEFAULT_HERO_CONTENT as p, findUserById as r, sanitizeUser as s, auditSeoHealth as t, updateSiteSettings as u };
