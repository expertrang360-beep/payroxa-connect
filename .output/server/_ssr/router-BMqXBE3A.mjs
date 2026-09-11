import { i as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as Building, B as Menu, C as ShieldCheck, Ct as CircleCheck, D as Send, E as Server, F as Phone, G as Lock, H as MapPin, It as Award, Lt as ArrowRight, N as QrCode, Ot as ChartColumn, U as Mail, V as Megaphone, _t as CreditCard, d as Truck, et as Heart, ft as FileCheckCorner, gt as Earth, h as Store, i as Wifi, it as Globe, j as Receipt, jt as Building2, kt as Calculator, m as Target, n as Zap, o as Users, r as X, st as FingerprintPattern, tt as Headphones, u as Tv, v as Smartphone, w as Share2, x as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CIO-WwIt.mjs";
import { t as Route$39 } from "./marketplace.product._slug-Bh0puyZE.mjs";
import { t as Route$40 } from "./marketplace.store._slug-BhCjyRZS.mjs";
import { t as Route$41 } from "./marketplace.vendor._id-Zd6eKWRO.mjs";
import { a as SectionHeading, i as Section, n as PAYROXA_LINKS, o as siteConfig, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-BWKZzTI8.mjs";
import { n as usePublicCms, t as PublicCmsProvider } from "./PublicCmsContext-j4meyJwm.mjs";
import { t as Route$42 } from "./resources._slug-BIZcVy2P.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BMqXBE3A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-DkZwgt0W.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var _jsxFileName$14 = "/app/applet/src/components/BrandLogo.tsx";
function BrandLogo({ tone = "light", className = "" }) {
	const { settings } = usePublicCms();
	const brandName = settings?.name || "Payroxa";
	const logoType = settings?.logoType || "symbol_text";
	const brandSymbol = settings?.brandSymbol || "P";
	const brandSymbolBg = settings?.brandSymbolBg || "gradient-purple";
	const customLogoImg = tone === "dark" && settings?.logoDarkUrl ? settings.logoDarkUrl : settings?.logoUrl || "";
	if (logoType === "image" && customLogoImg) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: `inline-flex items-center ${className}`,
		"aria-label": `${brandName} home`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
			src: customLogoImg,
			alt: brandName,
			style: { height: settings?.logoHeightPx ? `${settings.logoHeightPx}px` : "36px" },
			className: "w-auto object-contain"
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 29,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 24,
		columnNumber: 7
	}, this);
	const getSymbolBgClass = () => {
		switch (brandSymbolBg) {
			case "solid-purple": return "bg-purple-600 text-white";
			case "dark-slate": return "bg-slate-900 text-white";
			case "emerald": return "bg-emerald-600 text-white";
			default: return "gradient-brand text-primary-foreground";
		}
	};
	if (logoType === "symbol_only") return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: `inline-flex items-center gap-2.5 ${className}`,
		"aria-label": `${brandName} home`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: `flex size-9 items-center justify-center rounded-xl text-lg font-bold shadow-soft ${getSymbolBgClass()}`,
			children: brandSymbol
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 62,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$14,
		lineNumber: 57,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: `flex items-center gap-2.5 ${className}`,
		"aria-label": `${brandName} home`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: `flex size-9 items-center justify-center rounded-xl text-lg font-bold shadow-soft ${getSymbolBgClass()}`,
			children: brandSymbol
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 78,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: `font-display text-lg font-bold tracking-tight ${tone === "dark" ? "text-navy-foreground" : "text-foreground"}`,
			children: brandName
		}, void 0, false, {
			fileName: _jsxFileName$14,
			lineNumber: 83,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$14,
		lineNumber: 73,
		columnNumber: 5
	}, this);
}
var _jsxFileName$13 = "/app/applet/src/components/Navbar.tsx";
var fallbackNavItems = [
	{
		to: "/marketplace",
		label: "Marketplace"
	},
	{
		to: "/payments",
		label: "Payments"
	},
	{
		to: "/store",
		label: "Store"
	},
	{
		to: "/cards",
		label: "Cards"
	},
	{
		to: "/business",
		label: "Business"
	},
	{
		to: "/resources",
		label: "Resources"
	},
	{
		to: "/pricing",
		label: "Pricing"
	}
];
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { navigation, links } = usePublicCms();
	const rawNav = navigation && navigation.length > 0 ? navigation.filter((n) => n.enabled) : fallbackNavItems.map((item, idx) => ({
		id: `fb_${idx}`,
		label: item.label,
		url: item.to,
		type: "internal",
		displayOrder: idx + 1,
		enabled: true,
		section: "header"
	}));
	const activeNav = rawNav.some((item) => item.url === "/marketplace") ? rawNav : [{
		id: "nav-mkt",
		label: "Marketplace",
		url: "/marketplace",
		type: "internal",
		displayOrder: 2,
		enabled: true,
		section: "header"
	}, ...rawNav];
	const loginUrl = links?.login || PAYROXA_LINKS.login;
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrandLogo, {}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 58,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					"aria-label": "Main",
					className: "hidden items-center gap-1 lg:flex",
					children: activeNav.map((item) => item.url.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: item.url,
						target: "_blank",
						rel: "noreferrer",
						className: "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						children: item.label
					}, item.id, false, {
						fileName: _jsxFileName$13,
						lineNumber: 63,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: item.url,
						className: "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
						activeProps: { className: "bg-accent text-accent-foreground" },
						children: item.label
					}, item.id, false, {
						fileName: _jsxFileName$13,
						lineNumber: 73,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "hidden items-center gap-3 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: loginUrl,
						variant: "outline",
						size: "sm",
						children: "Sign In"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 86,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
						href: registerUrl,
						size: "sm",
						children: "Get Started"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 89,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 85,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					onClick: () => setOpen((v) => !v),
					"aria-expanded": open,
					"aria-label": open ? "Close menu" : "Open menu",
					className: "flex size-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden",
					children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 101,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 101,
						columnNumber: 46
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 94,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$13,
			lineNumber: 57,
			columnNumber: 7
		}, this), open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-t border-border bg-background px-5 py-4 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				"aria-label": "Mobile",
				className: "flex flex-col gap-1",
				children: [
					activeNav.map((item) => item.url.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: item.url,
						target: "_blank",
						rel: "noreferrer",
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
						children: item.label
					}, item.id, false, {
						fileName: _jsxFileName$13,
						lineNumber: 110,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: item.url,
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
						children: item.label
					}, item.id, false, {
						fileName: _jsxFileName$13,
						lineNumber: 121,
						columnNumber: 17
					}, this)),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/about",
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
						children: "About"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 131,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
						children: "Contact"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 138,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 107,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
					href: loginUrl,
					variant: "outline",
					children: "Sign In"
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 147,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
					href: registerUrl,
					children: "Get Started"
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 150,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 146,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$13,
			lineNumber: 106,
			columnNumber: 9
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 56,
		columnNumber: 5
	}, this);
}
var _jsxFileName$12 = "/app/applet/src/components/Footer.tsx";
var productLinks = [
	{
		label: "Marketplace",
		to: "/marketplace"
	},
	{
		label: "Payments",
		to: "/payments"
	},
	{
		label: "Business Wallet",
		to: "/wallet"
	},
	{
		label: "Corporate Cards",
		to: "/cards"
	},
	{
		label: "Online Store",
		to: "/store"
	},
	{
		label: "Transfers & Payouts",
		to: "/transfers"
	},
	{
		label: "Payment Links",
		to: "/payment-links"
	},
	{
		label: "Payment Requests",
		to: "/payment-requests"
	},
	{
		label: "Business Management",
		to: "/business"
	}
];
var companyLinks = [
	{
		label: "About Us",
		to: "/about"
	},
	{
		label: "Resources & Playbooks",
		to: "/resources"
	},
	{
		label: "Pricing",
		to: "/pricing"
	},
	{
		label: "Contact Support",
		to: "/contact"
	},
	{
		label: "Security & Compliance",
		to: "/security"
	}
];
function Footer() {
	const { settings, social, links } = usePublicCms();
	const socialLinks = [
		{
			label: "Instagram",
			href: social?.instagram || "https://instagram.com/payroxaapp"
		},
		{
			label: "X",
			href: social?.twitter || "https://x.com/payroxaapp"
		},
		{
			label: "LinkedIn",
			href: social?.linkedin || "https://linkedin.com/company/payroxa"
		},
		{
			label: "Facebook",
			href: social?.facebook || "https://facebook.com/payroxaapp"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "gradient-navy text-navy-foreground",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-6xl px-5 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-10 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BrandLogo, { tone: "dark" }, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 49,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 max-w-xs text-sm text-navy-foreground/70",
							children: settings?.siteDescription || siteConfig.description
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 50,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-sm text-navy-foreground/70",
							children: siteConfig.contact.handle
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 53,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 48,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold",
						children: "Products"
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 57,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-navy-foreground/70",
						children: productLinks.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: item.to ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: item.to,
							className: "hover:text-navy-foreground",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 62,
							columnNumber: 21
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: item.href,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hover:text-navy-foreground",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 66,
							columnNumber: 21
						}, this) }, item.label, false, {
							fileName: _jsxFileName$12,
							lineNumber: 60,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 58,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 56,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold",
						children: "Company"
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 81,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-navy-foreground/70",
						children: companyLinks.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: item.to,
							className: "hover:text-navy-foreground",
							children: item.label
						}, void 0, false, {
							fileName: _jsxFileName$12,
							lineNumber: 85,
							columnNumber: 19
						}, this) }, item.label, false, {
							fileName: _jsxFileName$12,
							lineNumber: 84,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 82,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 80,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-semibold",
						children: "Get started"
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 94,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-navy-foreground/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: links?.register || PAYROXA_LINKS.register,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-navy-foreground",
								children: "Create an account"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 97,
								columnNumber: 17
							}, this) }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 96,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: links?.login || PAYROXA_LINKS.login,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-navy-foreground",
								children: "Sign in"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 107,
								columnNumber: 17
							}, this) }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 106,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: links?.app || PAYROXA_LINKS.app,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-navy-foreground",
								children: "Open Payroxa"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 117,
								columnNumber: 17
							}, this) }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 116,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/contact",
								className: "hover:text-navy-foreground",
								children: "Support"
							}, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 127,
								columnNumber: 17
							}, this) }, void 0, false, {
								fileName: _jsxFileName$12,
								lineNumber: 126,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 95,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$12,
						lineNumber: 93,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 47,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 flex flex-col gap-4 border-t border-navy-foreground/15 pt-6 text-sm text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					settings?.siteName || siteConfig.legalName,
					". Safe. Fast. Reliable."
				] }, void 0, true, {
					fileName: _jsxFileName$12,
					lineNumber: 136,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "flex flex-wrap gap-4",
					children: socialLinks.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: s.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "hover:text-navy-foreground",
						children: s.label
					}, void 0, false, {
						fileName: _jsxFileName$12,
						lineNumber: 143,
						columnNumber: 17
					}, this) }, s.label, false, {
						fileName: _jsxFileName$12,
						lineNumber: 142,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$12,
					lineNumber: 140,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$12,
				lineNumber: 135,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$12,
			lineNumber: 46,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 45,
		columnNumber: 5
	}, this);
}
var _jsxFileName$11 = "/app/applet/src/components/AnnouncementBar.tsx";
function AnnouncementBar() {
	const { activeAnnouncement } = usePublicCms();
	if (!activeAnnouncement || !activeAnnouncement.enabled) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 px-4 py-2 text-white",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between gap-3 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Megaphone, { className: "size-3" }, void 0, false, {
							fileName: _jsxFileName$11,
							lineNumber: 17,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 16,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded bg-white/20 px-1.5 py-0.5 font-bold tracking-wider uppercase text-[10px]",
						children: activeAnnouncement.title
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 19,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "truncate font-medium",
						children: activeAnnouncement.message
					}, void 0, false, {
						fileName: _jsxFileName$11,
						lineNumber: 22,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 15,
				columnNumber: 9
			}, this), activeAnnouncement.ctaUrl && activeAnnouncement.ctaLabel && /* @__PURE__ */ (void 0)("a", {
				href: activeAnnouncement.ctaUrl,
				className: "inline-flex shrink-0 items-center gap-1 font-semibold underline hover:text-purple-200 transition-colors",
				children: [/* @__PURE__ */ (void 0)("span", { children: activeAnnouncement.ctaLabel }, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 29,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
					fileName: _jsxFileName$11,
					lineNumber: 30,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$11,
				lineNumber: 25,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$11,
			lineNumber: 14,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$11,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
var _jsxFileName$10 = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 25,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 31,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 30,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 24,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 23,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 56,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 60,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 69,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$10,
					lineNumber: 59,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 52,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
var Route$38 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: siteConfig.name
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: siteConfig.name
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#4b1fd6"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: siteConfig.name,
				url: siteConfig.websiteUrl,
				description: siteConfig.description,
				sameAs: siteConfig.social.map((s) => s.href)
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 126,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 125,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 130,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 128,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$10,
		lineNumber: 124,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$38.useRouteContext();
	const isCmsRoute = useRouterState({ select: (s) => s.location.pathname }).startsWith("/cms");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PublicCmsProvider, { children: isCmsRoute ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 145,
			columnNumber: 11
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnnouncementBar, {}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 148,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navbar, {}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 149,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
						fileName: _jsxFileName$10,
						lineNumber: 152,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 150,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName$10,
					lineNumber: 154,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$10,
			lineNumber: 147,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 143,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 142,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$27 = () => import("./routes-Cu79zNyP.mjs");
var title$15 = "Payroxa — Payments, Wallet, Cards & Store for African Businesses";
var description$15 = "Everything your business needs to move money, get paid, sell online and grow. Payroxa is the operating system for African businesses.";
var Route$37 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: title$15 },
			{
				name: "description",
				content: description$15
			},
			{
				property: "og:title",
				content: title$15
			},
			{
				property: "og:description",
				content: description$15
			},
			{
				property: "og:url",
				content: siteConfig.websiteUrl
			},
			{
				name: "twitter:title",
				content: title$15
			},
			{
				name: "twitter:description",
				content: description$15
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: siteConfig.name,
				url: siteConfig.websiteUrl,
				description: description$15
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var _jsxFileName$9 = "/app/applet/src/routes/about.tsx";
var title$14 = "About Payroxa — Building the Financial Operating System for Africa";
var description$14 = "Payroxa is on a mission to simplify payments, power digital commerce, and unlock economic freedom for African individuals and enterprises.";
var Route$36 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: title$14 },
			{
				name: "description",
				content: description$14
			},
			{
				property: "og:title",
				content: title$14
			},
			{
				property: "og:description",
				content: description$14
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/about`
			},
			{
				name: "twitter:title",
				content: title$14
			},
			{
				name: "twitter:description",
				content: description$14
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/about`
		}]
	}),
	component: AboutPage
});
var values = [
	{
		icon: Zap,
		title: "Relentless Speed",
		description: "Financial transactions should move as fast as modern conversation. We eliminate delays across every payment channel."
	},
	{
		icon: ShieldCheck,
		title: "Uncompromising Security",
		description: "Your funds and data are guarded with military-grade encryption, biometric protocols, and proactive fraud engines."
	},
	{
		icon: Heart,
		title: "Customer Obsession",
		description: "We build tools around the real daily hurdles of African merchants, shoppers, and families with 24/7 human support."
	},
	{
		icon: Earth,
		title: "Pan-African Vision",
		description: "Starting in Nigeria, we are constructing the digital financial rails to connect businesses and consumers across the continent."
	}
];
var milestones = [
	{
		year: "2024",
		title: "Foundation & Wallet Architecture",
		desc: "Formed to resolve chronic payment drops and slow settlement across African digital commerce."
	},
	{
		year: "2025",
		title: "Digital Storefronts & Invoicing",
		desc: "Empowered thousands of social media vendors and retail merchants to collect payments automatically."
	},
	{
		year: "2026",
		title: "Borderless Cards & Enterprise API",
		desc: "Launched virtual USD issuance and robust business tools for pan-African growth."
	}
];
function AboutPage() {
	const { links, settings } = usePublicCms();
	links?.register || PAYROXA_LINKS.register;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Our Mission & Story"
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 96,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"Empowering the next generation of",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "African commerce."
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 101,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 99,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Payroxa was born out of a simple conviction: managing money, accepting customer payments, and running an online business should be effortless, fast, and transparent."
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 103,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 95,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 94,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "surface-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Target, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 115,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 114,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-6 text-2xl font-bold text-foreground",
							children: "Our Mission"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 117,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-base text-muted-foreground leading-relaxed",
							children: "To build modern, accessible, and ultra-reliable financial infrastructure that eliminates friction for millions of African entrepreneurs, creators, and everyday consumers."
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 118,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 113,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "surface-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Award, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 127,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 126,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-6 text-2xl font-bold text-foreground",
							children: "Our Vision"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 129,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-4 text-base text-muted-foreground leading-relaxed",
							children: "To become the unified digital operating system powering African trade—where anyone can accept payments, send money, and launch a global business from the palm of their hand."
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 130,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 125,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 112,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 111,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Values",
			title: "The principles that guide how we build",
			description: "Every product feature, server optimization, and customer conversation is rooted in our core tenets."
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 140,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
			children: values.map((v) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(v.icon, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 149,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 148,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-4 text-lg font-bold text-foreground",
						children: v.title
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 151,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground leading-relaxed",
						children: v.description
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 152,
						columnNumber: 15
					}, this)
				]
			}, v.title, true, {
				fileName: _jsxFileName$9,
				lineNumber: 147,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 145,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 139,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Our Journey",
				title: "Building with purpose and velocity",
				description: "A look at our continuous growth and milestones as we expand our ecosystem."
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 160,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 mx-auto max-w-3xl space-y-6",
				children: milestones.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-mono text-xl font-extrabold text-primary",
						children: m.year
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 171,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
						className: "text-base font-bold text-foreground",
						children: m.title
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 173,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: m.desc
					}, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 174,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 172,
						columnNumber: 15
					}, this)]
				}, m.year, true, {
					fileName: _jsxFileName$9,
					lineNumber: 167,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 165,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$9,
			lineNumber: 159,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Be part of the Payroxa journey",
			description: "Experience modern financial solutions built for you. Create your free account today."
		}, void 0, false, {
			fileName: _jsxFileName$9,
			lineNumber: 182,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 92,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/routes/business.tsx";
var title$13 = "Payroxa Business — All-in-One Operating System for African Enterprises";
var description$13 = "Invoicing, storefronts, multi-user permissions, vendor payouts, and fast customer payments designed for modern African businesses.";
var Route$35 = createFileRoute("/business")({
	head: () => ({
		meta: [
			{ title: title$13 },
			{
				name: "description",
				content: description$13
			},
			{
				property: "og:title",
				content: title$13
			},
			{
				property: "og:description",
				content: description$13
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/business`
			},
			{
				name: "twitter:title",
				content: title$13
			},
			{
				name: "twitter:description",
				content: description$13
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/business`
		}]
	}),
	component: BusinessPage
});
var businessSolutions = [
	{
		icon: Receipt,
		title: "Instant Invoicing & Payment Links",
		description: "Generate branded professional invoices with embedded payment links. Accept bank transfers, cards, and USSD with real-time settlement."
	},
	{
		icon: Store,
		title: "Zero-Code Online Storefront",
		description: "Create a digital catalog in under 2 minutes. Receive customer orders and payments directly into your Payroxa business wallet."
	},
	{
		icon: Send,
		title: "Bulk Payouts & Payroll",
		description: "Disburse salaries, supplier payments, and operational expenses in seconds across all Nigerian commercial banks and fintech wallets."
	},
	{
		icon: Users,
		title: "Team & Role-Based Access",
		description: "Empower accountants, sales managers, and cashiers with segregated permissions without exposing your master wallet credentials."
	},
	{
		icon: ChartColumn,
		title: "Real-Time Cash Flow Analytics",
		description: "Monitor sales velocity, top-performing product categories, and recurring customer trends with automated transaction reporting."
	},
	{
		icon: ShieldCheck,
		title: "Enterprise Grade Security",
		description: "Multi-factor authentication, biometric transaction approvals, and NDPR-compliant data protection for your enterprise funds."
	}
];
var tiers = [
	{
		name: "Starter & Sole Trader",
		focus: "Individual merchants, freelancers & instagram vendors",
		features: [
			"Payroxa digital store link",
			"Instant bank transfer collection",
			"Unlimited invoices & receipts",
			"Standard support via WhatsApp & in-app"
		]
	},
	{
		name: "Growing Business",
		focus: "Retail outlets, restaurants, logistics & agencies",
		highlight: true,
		features: [
			"Everything in Starter, plus:",
			"Up to 5 team member accounts",
			"Bulk transfers & payroll batch uploads",
			"Virtual and physical corporate expense cards",
			"Priority customer success manager"
		]
	},
	{
		name: "Enterprise & Franchise",
		focus: "Multi-branch stores, distributors & corporate entities",
		features: [
			"Custom multi-outlet balance management",
			"Dedicated account manager & SLA",
			"Custom API & POS terminal integration",
			"Automated tax & custom compliance reporting"
		]
	}
];
var industries = [
	{
		name: "Retail & Supermarkets",
		desc: "Fast checkout and real-time inventory payment reconciliation."
	},
	{
		name: "Restaurants & Bars",
		desc: "Split bills, table QR codes, and automated supplier disbursements."
	},
	{
		name: "Logistics & Fleet",
		desc: "Driver expense cards, fuel stipends, and automated customer COD payouts."
	},
	{
		name: "Digital Agencies & Freelancers",
		desc: "International invoice links and automated payment confirmations."
	},
	{
		name: "Health & Pharmacy",
		desc: "Multi-teller settlement and accurate daily reconciliation ledgers."
	},
	{
		name: "Fashion & Lifestyle",
		desc: "Mobile-first social storefronts with automated shipping link generation."
	}
];
function BusinessPage() {
	const { links } = usePublicCms();
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	const loginUrl = links?.login || PAYROXA_LINKS.login;
	const [activeTab, setActiveTab] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Payroxa for Business"
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 160,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"The modern financial engine for",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "African commerce."
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 165,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 163,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Accept customer payments seamlessly, launch instant digital storefronts, pay vendors in bulk, and manage team expenses — all under one unified Payroxa business account."
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 167,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							size: "lg",
							children: ["Open a Business Account ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 173,
								columnNumber: 39
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 172,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: loginUrl,
							variant: "outline",
							size: "lg",
							children: "Sign In to Business Portal"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 175,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 171,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-14 grid grid-cols-2 gap-4 border-y border-border/80 py-8 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold text-foreground",
								children: "99.9%"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 183,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Transaction Uptime"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 184,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 182,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold text-foreground",
								children: "< 3s"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 187,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Settlement Speed"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 188,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 186,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold text-foreground",
								children: "0%"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 191,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Hidden Monthly Fees"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 192,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 190,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-extrabold text-foreground",
								children: "24/7"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 195,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Dedicated Support"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 196,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 194,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 181,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$8,
				lineNumber: 159,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 158,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Solutions",
				title: "Everything you need to run cash, card and online sales",
				description: "Built specifically for the everyday reality of African retail and commerce."
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 204,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: businessSolutions.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: item.icon,
					title: item.title,
					description: item.description
				}, item.title, false, {
					fileName: _jsxFileName$8,
					lineNumber: 211,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 209,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 203,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Industries",
			title: "Tailored for your business sector",
			description: "Whether you run a fast-paced supermarket or a distributed logistics fleet, Payroxa streamlines your operations."
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 223,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: industries.map((ind, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-card p-6 transition-all hover:border-primary/40 hover:shadow-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 235,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 234,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-4 text-lg font-bold text-foreground",
						children: ind.name
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 237,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ind.desc
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 238,
						columnNumber: 15
					}, this)
				]
			}, ind.name, true, {
				fileName: _jsxFileName$8,
				lineNumber: 230,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 228,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 222,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Scalable Plans",
				title: "Ready to grow with your business at every stage",
				description: "Start for free with zero setup fees. Scale as your transaction volumes grow."
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 246,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 lg:grid-cols-3",
				children: tiers.map((tier) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex flex-col justify-between rounded-3xl border p-8 transition-all ${tier.highlight ? "border-primary bg-background shadow-xl ring-2 ring-primary/20" : "border-border bg-background"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						tier.highlight ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary",
							children: "Most Popular"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 263,
							columnNumber: 19
						}, this) : null,
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-3 text-2xl font-bold",
							children: tier.name
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 267,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: tier.focus
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 268,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 space-y-3 border-t border-border pt-6",
							children: tier.features.map((feat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 shrink-0 text-primary mt-0.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 272,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-foreground/90",
									children: feat
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 273,
									columnNumber: 23
								}, this)]
							}, feat, true, {
								fileName: _jsxFileName$8,
								lineNumber: 271,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 269,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 261,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 pt-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							variant: tier.highlight ? "default" : "outline",
							className: "w-full",
							children: "Get Started"
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 279,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 278,
						columnNumber: 15
					}, this)]
				}, tier.name, true, {
					fileName: _jsxFileName$8,
					lineNumber: 253,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$8,
				lineNumber: 251,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 245,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Transform your business finances today",
			description: "Join thousands of African business owners who trust Payroxa for reliable payments and effortless operations."
		}, void 0, false, {
			fileName: _jsxFileName$8,
			lineNumber: 293,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$8,
		lineNumber: 156,
		columnNumber: 5
	}, this);
}
var _jsxFileName$7 = "/app/applet/src/routes/cards.tsx";
var title$12 = "Payroxa Cards — Virtual USD & Naira Cards for Borderless Spending";
var description$12 = "Pay for international subscriptions, cloud hosting, Facebook & Google ads, and local POS/ATMs with secure Payroxa cards.";
var Route$34 = createFileRoute("/cards")({
	head: () => ({
		meta: [
			{ title: title$12 },
			{
				name: "description",
				content: description$12
			},
			{
				property: "og:title",
				content: title$12
			},
			{
				property: "og:description",
				content: description$12
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/cards`
			},
			{
				name: "twitter:title",
				content: title$12
			},
			{
				name: "twitter:description",
				content: description$12
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/cards`
		}]
	}),
	component: CardsPage
});
var cardTypes = [{
	title: "Virtual Dollar (USD) Card",
	badge: "International",
	desc: "Pay globally without card decline headaches. Works seamlessly for subscriptions and global ads.",
	supported: [
		"Apple Music & iCloud",
		"Netflix & Spotify",
		"Google & Facebook Ads",
		"AWS, DigitalOcean & ChatGPT",
		"Canva & Shopify"
	]
}, {
	title: "Naira (NGN) Debit Card",
	badge: "Local Spending",
	desc: "Direct access to your wallet balance for local POS terminals, online shopping, and all Nigerian ATMs.",
	supported: [
		"Supermarkets & POS terminals",
		"Local online checkouts",
		"All Nigerian ATMs",
		"Instant in-app PIN resets",
		"Zero maintenance fees"
	]
}];
var securityPerks = [
	{
		icon: Lock,
		title: "One-Tap Instant Freeze",
		description: "Temporarily freeze or unfreeze your cards in the app anytime you suspect unauthorized activity."
	},
	{
		icon: Globe,
		title: "Worldwide Acceptance",
		description: "Accepted on millions of international merchant sites supporting Mastercard and Visa networks."
	},
	{
		icon: ShieldCheck,
		title: "3D Secure OTP Protection",
		description: "Receive instant one-time passwords directly in your Payroxa app for safe online checkouts."
	},
	{
		icon: Zap,
		title: "Real-Time Funding",
		description: "Fund your virtual dollar card straight from your Payroxa Naira balance at transparent, competitive rates."
	}
];
function CardsPage() {
	const { links } = usePublicCms();
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	const loginUrl = links?.login || PAYROXA_LINKS.login;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Payroxa Borderless Cards"
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 107,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"Spend globally without limits,",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "powered by Payroxa."
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 112,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Say goodbye to failed international card payments. Issue instant virtual USD cards and physical Naira cards in seconds straight from your phone."
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							size: "lg",
							children: ["Get Your Card ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 120,
								columnNumber: 29
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 119,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: loginUrl,
							variant: "outline",
							size: "lg",
							children: "Sign In to Manage Cards"
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 122,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 118,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$7,
				lineNumber: 106,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 105,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Card Options",
				title: "Designed for both local life and global business",
				description: "Choose between virtual and physical cards to match your lifestyle and spending requirements."
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 131,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-8 lg:grid-cols-2",
				children: cardTypes.map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col justify-between rounded-3xl border border-border bg-background p-8 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary",
								children: card.badge
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 144,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "size-6 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 147,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 143,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-4 text-2xl font-bold text-foreground",
							children: card.title
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 149,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: card.desc
						}, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 150,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 border-t border-border pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Popular use cases:"
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 153,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
								className: "mt-3 space-y-2.5",
								children: card.supported.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
									className: "flex items-center gap-2 text-sm text-foreground/90",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 text-primary shrink-0" }, void 0, false, {
										fileName: _jsxFileName$7,
										lineNumber: 159,
										columnNumber: 25
									}, this), item]
								}, item, true, {
									fileName: _jsxFileName$7,
									lineNumber: 158,
									columnNumber: 23
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$7,
								lineNumber: 156,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 152,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$7,
						lineNumber: 142,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 pt-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							className: "w-full",
							children: ["Create ", card.title]
						}, void 0, true, {
							fileName: _jsxFileName$7,
							lineNumber: 168,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 167,
						columnNumber: 15
					}, this)]
				}, card.title, true, {
					fileName: _jsxFileName$7,
					lineNumber: 138,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$7,
				lineNumber: 136,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 130,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Security & Control",
			title: "Complete control over your card spending",
			description: "Manage limits, track transactions in real time, and lock your card with one tap."
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 179,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
			children: securityPerks.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(item.icon, { className: "size-5" }, void 0, false, {
							fileName: _jsxFileName$7,
							lineNumber: 188,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 187,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-4 text-base font-bold text-foreground",
						children: item.title
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 190,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs text-muted-foreground leading-relaxed",
						children: item.description
					}, void 0, false, {
						fileName: _jsxFileName$7,
						lineNumber: 191,
						columnNumber: 15
					}, this)
				]
			}, item.title, true, {
				fileName: _jsxFileName$7,
				lineNumber: 186,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 184,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$7,
			lineNumber: 178,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Get your Payroxa card today",
			description: "Experience the freedom of borderless payments with transparent exchange rates and top-tier security."
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 200,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 103,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$26 = () => import("./cms-admin-D1MLXCFg.mjs");
var Route$33 = createFileRoute("/cms-admin")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var _jsxFileName$6 = "/app/applet/src/routes/contact.tsx";
var title$11 = "Contact Payroxa — We're Here to Help 24/7";
var description$11 = "Have a question about your Payroxa wallet, business tools, or API? Reach our dedicated support team via email, phone, or live chat.";
var Route$32 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: title$11 },
			{
				name: "description",
				content: description$11
			},
			{
				property: "og:title",
				content: title$11
			},
			{
				property: "og:description",
				content: description$11
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/contact`
			},
			{
				name: "twitter:title",
				content: title$11
			},
			{
				name: "twitter:description",
				content: description$11
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/contact`
		}]
	}),
	component: ContactPage
});
function ContactPage() {
	const { settings, social } = usePublicCms();
	const supportEmail = settings?.supportEmail || siteConfig.contact.email;
	const supportPhone = settings?.supportPhone || "+234 800 PAYROXA";
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		category: "General Inquiry",
		message: ""
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitted(true);
		}, 800);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-16 sm:pt-20 lg:pb-24",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "We're Always Here"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 71,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: ["Let's connect and ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient-brand",
							children: "solve it together."
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 75,
							columnNumber: 31
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 74,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Whether you need help with a transaction, want to explore an enterprise partnership, or have feedback, our team responds swiftly."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 77,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 70,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 69,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-10 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6 lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "surface-card p-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 92,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 91,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-sm font-bold text-foreground",
										children: "Email Support"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 95,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: `mailto:${supportEmail}`,
										className: "text-sm text-primary font-medium hover:underline",
										children: supportEmail
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 96,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "Average response: < 15 mins"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 102,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 94,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 90,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 89,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "surface-card p-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 112,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 111,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-sm font-bold text-foreground",
										children: "Phone & WhatsApp"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 115,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm font-medium text-foreground",
										children: supportPhone
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 116,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "Available Mon - Sat, 8am - 8pm WAT"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 117,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 114,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 110,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 109,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "surface-card p-6",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 127,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 126,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
										className: "text-sm font-bold text-foreground",
										children: "Headquarters"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 130,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-foreground/90 leading-relaxed",
										children: "Victoria Island, Lagos State, Nigeria"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 131,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground mt-0.5",
										children: "Operating across all 36 Nigerian states"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 134,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 129,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 125,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 124,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-primary/20 bg-primary/5 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Headphones, { className: "size-5 text-primary" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 143,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-bold text-foreground",
									children: "Live In-App Chat"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 144,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 142,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "For the fastest assistance with an ongoing transaction, log into the Payroxa app and tap \"Help & Support\" to chat live with our support specialists."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 146,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 141,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 88,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "surface-card p-8 lg:col-span-7",
					children: submitted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center justify-center py-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-8" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 158,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 157,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "mt-4 text-2xl font-bold text-foreground",
								children: "Message Sent Successfully"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 160,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 max-w-md text-sm text-muted-foreground",
								children: [
									"Thank you, ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: form.name
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 164,
										columnNumber: 30
									}, this),
									". Our support team has received your message and will respond to",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: form.email
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 166,
										columnNumber: 19
									}, this),
									" shortly."
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 163,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: () => {
									setSubmitted(false);
									setForm({
										name: "",
										email: "",
										category: "General Inquiry",
										message: ""
									});
								},
								className: "mt-6 rounded-full bg-muted px-6 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted/80",
								children: "Send Another Inquiry"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 168,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 156,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-xl font-bold text-foreground",
								children: "Send Us a Direct Message"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 180,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Fill out the form below and an agent will be assigned to your ticket."
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 181,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Your Full Name"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 187,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Chioma Adeyemi",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 190,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 186,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Email Address"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 201,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "email",
									required: true,
									placeholder: "e.g. chioma@example.com",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									}),
									className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 204,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 200,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 185,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Inquiry Category"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 216,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								value: form.category,
								onChange: (e) => setForm({
									...form,
									category: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "General Inquiry",
										children: "General Inquiry"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 224,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "Transaction Support",
										children: "Transaction / Transfer Support"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 225,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "Business Account Setup",
										children: "Payroxa Business & Invoicing"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 226,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "Storefront Assistance",
										children: "Payroxa Online Store"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 227,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "Virtual Card Support",
										children: "Payroxa Cards"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 228,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "Partnership & Enterprise",
										children: "Partnership & API Integration"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 229,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 219,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 215,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Your Message"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 236,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
								rows: 4,
								required: true,
								placeholder: "Tell us how we can assist you...",
								value: form.message,
								onChange: (e) => setForm({
									...form,
									message: e.target.value
								}),
								className: "mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 239,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 235,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50",
								children: isSubmitting ? "Sending Message..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Send Message ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 258,
									columnNumber: 36
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 257,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 249,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 179,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 154,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 86,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 85,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Ready to get started with Payroxa?",
			description: "Experience modern, dependable African payments today."
		}, void 0, false, {
			fileName: _jsxFileName$6,
			lineNumber: 269,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 67,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$25 = () => import("./marketplace-BqJHXQF5.mjs");
var Route$31 = createFileRoute("/marketplace")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./payment-links-D_nsDLLJ.mjs");
var title$10 = "Payroxa Payment Links — Share & Collect Payments via WhatsApp, Instagram & SMS";
var description$10 = "Generate instant branded payment links and scannable QR codes without writing a line of code. Accept cards, USSD, and bank transfers on any social platform.";
var Route$30 = createFileRoute("/payment-links")({
	head: () => ({
		meta: [
			{ title: title$10 },
			{
				name: "description",
				content: description$10
			},
			{
				property: "og:title",
				content: title$10
			},
			{
				property: "og:description",
				content: description$10
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/payment-links`
			},
			{
				name: "twitter:title",
				content: title$10
			},
			{
				name: "twitter:description",
				content: description$10
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/payment-links`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./payment-requests-4RIPU56Z.mjs");
var title$9 = "Payroxa Payment Requests — Professional Invoices & Digital Billing for Nigeria";
var description$9 = "Send professional payment requests with automated payment reminders, custom line items, VAT calculation, and instant settlement.";
var Route$29 = createFileRoute("/payment-requests")({
	head: () => ({
		meta: [
			{ title: title$9 },
			{
				name: "description",
				content: description$9
			},
			{
				property: "og:title",
				content: title$9
			},
			{
				property: "og:description",
				content: description$9
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/payment-requests`
			},
			{
				name: "twitter:title",
				content: title$9
			},
			{
				name: "twitter:description",
				content: description$9
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/payment-requests`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var _jsxFileName$5 = "/app/applet/src/routes/payments.tsx";
var title$8 = "Payroxa Payments — Fast Airtime, Utilities, Bills & Bank Transfers";
var description$8 = "Pay utility bills, buy instant airtime & data bundles, send money to all Nigerian banks, and collect payments with zero friction.";
var Route$28 = createFileRoute("/payments")({
	head: () => ({
		meta: [
			{ title: title$8 },
			{
				name: "description",
				content: description$8
			},
			{
				property: "og:title",
				content: title$8
			},
			{
				property: "og:description",
				content: description$8
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/payments`
			},
			{
				name: "twitter:title",
				content: title$8
			},
			{
				name: "twitter:description",
				content: description$8
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/payments`
		}]
	}),
	component: PaymentsPage
});
var billServices = [
	{
		icon: Smartphone,
		title: "Airtime & Mobile Data",
		description: "Instant recharge on MTN, Airtel, Glo, and 9mobile with up to 3% cashback on every top-up.",
		badge: "Instant Top-Up"
	},
	{
		icon: Zap,
		title: "Electricity Tokens",
		description: "Purchase prepaid and postpaid meter tokens for IKEDC, EKEDC, AEDC, IBEDC, EEDC, and more.",
		badge: "Instant Token Generation"
	},
	{
		icon: Tv,
		title: "Cable TV Subscriptions",
		description: "Renew DStv, GOtv, and StarTimes packages with instant automated signal activation.",
		badge: "Auto-Reconnection"
	},
	{
		icon: Wifi,
		title: "Internet & Broadband",
		description: "Subscribe to Spectranet, Smile, Swift, and Starlink local service payments seamlessly.",
		badge: "High-Speed Top Up"
	},
	{
		icon: Send,
		title: "Direct Bank Transfers",
		description: "Send funds to any commercial bank, microfinance bank, or mobile money operator with sub-second delivery.",
		badge: "99.98% Success Rate"
	},
	{
		icon: QrCode,
		title: "QR & Payment Links",
		description: "Generate shareable links or dynamic QR codes for customers to pay via card, transfer, or USSD.",
		badge: "Instant Confirmation"
	}
];
var paymentFeatures = [
	{
		title: "Lightning Settlement",
		desc: "No waiting for batch processing. Transactions confirm and credit recipient accounts in under 3 seconds."
	},
	{
		title: "Automated Receipts & Reconciliation",
		desc: "Download detailed PDF receipts and export transaction logs directly for your personal records or accounting."
	},
	{
		title: "Scheduled & Recurring Bills",
		desc: "Set automatic monthly payments for utility and internet bills so your family or office never faces downtime."
	},
	{
		title: "Smart Beneficiary Directory",
		desc: "Save frequently used bank accounts and meter numbers to complete transactions in two taps."
	}
];
function PaymentsPage() {
	const { links } = usePublicCms();
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	const loginUrl = links?.login || PAYROXA_LINKS.login;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Payroxa Fast Payments"
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 122,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"Smarter, faster bills &",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "transfers in one tap."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 127,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 125,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Pay electricity, recharge data, renew cable subscriptions, and send money to any Nigerian bank account with industry-leading speed and zero hidden charges."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 129,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							size: "lg",
							children: ["Make a Payment Now ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 135,
								columnNumber: 34
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 134,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: loginUrl,
							variant: "outline",
							size: "lg",
							children: "Sign In to Wallet"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 137,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 133,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 121,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 120,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Everyday Utilities",
				title: "All your essential payments under one roof",
				description: "Enjoy guaranteed network delivery and direct integrations with Nigerian utility providers."
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 146,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: billServices.map((service) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "surface-card flex flex-col justify-between p-6 transition-all hover:border-primary/40 hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(service.icon, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 160,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 159,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground",
								children: service.badge
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 162,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 158,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-5 text-xl font-bold text-foreground",
							children: service.title
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 166,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: service.description
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 167,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 157,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 border-t border-border pt-4",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: loginUrl,
							className: "inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
							children: ["Pay now ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 174,
								columnNumber: 27
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 170,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 169,
						columnNumber: 15
					}, this)]
				}, service.title, true, {
					fileName: _jsxFileName$5,
					lineNumber: 153,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 151,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 145,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid items-center gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs font-semibold uppercase tracking-wider text-primary",
					children: "Engineered for Reliability"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 186,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-3 text-3xl font-bold sm:text-4xl",
					children: "Never get stuck on pending transfers again"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 189,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-base text-muted-foreground",
					children: "We leverage direct clearing routes and automated fallback rails across top settlement networks. If a bank route experiences congestion, Payroxa switches routes in milliseconds."
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 192,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 space-y-4",
					children: paymentFeatures.map((feat) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 202,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 201,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
							className: "text-sm font-bold text-foreground",
							children: feat.title
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 205,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: feat.desc
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 206,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 204,
							columnNumber: 19
						}, this)]
					}, feat.title, true, {
						fileName: _jsxFileName$5,
						lineNumber: 200,
						columnNumber: 17
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 198,
					columnNumber: 13
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 185,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-border bg-muted/40 p-8 shadow-inner",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-background p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 218,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 217,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "Electricity Token Generated"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 221,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "IKEDC Prepaid • 0419-8821-9920"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 222,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 220,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 216,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-extrabold text-foreground",
							children: "₦15,000.00"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 227,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 215,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 rounded-xl bg-muted/70 p-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Token Code"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 230,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 font-mono text-lg font-extrabold tracking-wider text-primary",
								children: "4821 - 9912 - 0451 - 8823 - 1042"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 231,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Units: 68.4 kWh • Token status: Active"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 234,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 229,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 214,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 rounded-2xl border border-border bg-background p-6 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 244,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 243,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold text-foreground",
								children: "Bank Transfer Completed"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 247,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Access Bank • Adebayo Enterp..."
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 248,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 246,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 242,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-extrabold text-foreground",
								children: "₦250,000.00"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 254,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-emerald-600 font-semibold",
								children: "Delivered in 1.2s"
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 255,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 253,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 241,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 240,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 213,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 184,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 183,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Experience seamless payments today",
			description: "Create your free Payroxa wallet in under 2 minutes and take control of all your transfers and bills."
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 264,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 118,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/routes/pricing.tsx";
var title$7 = "Payroxa Pricing — Transparent, Predictable & Fair Rates";
var description$7 = "No hidden fees, no monthly maintenance charges. See our full breakdown for transfers, bills, cards, and storefront processing.";
var Route$27 = createFileRoute("/pricing")({
	head: () => ({
		meta: [
			{ title: title$7 },
			{
				name: "description",
				content: description$7
			},
			{
				property: "og:title",
				content: title$7
			},
			{
				property: "og:description",
				content: description$7
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/pricing`
			},
			{
				name: "twitter:title",
				content: title$7
			},
			{
				name: "twitter:description",
				content: description$7
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/pricing`
		}]
	}),
	component: PricingPage
});
var feeTables = [
	{
		category: "Wallet & Account Services",
		items: [
			{
				service: "Personal Wallet Registration",
				fee: "Free (₦0)",
				note: "Instant account setup"
			},
			{
				service: "Business Account Onboarding",
				fee: "Free (₦0)",
				note: "Includes invoice & payout tools"
			},
			{
				service: "Monthly Maintenance / Inactivity",
				fee: "Free (₦0)",
				note: "No maintenance charges ever"
			},
			{
				service: "Payroxa to Payroxa Transfers",
				fee: "Free (₦0)",
				note: "Unlimited peer-to-peer"
			}
		]
	},
	{
		category: "Transfers & Payouts",
		items: [
			{
				service: "Transfer below ₦5,000",
				fee: "₦10",
				note: "Direct bank network fee"
			},
			{
				service: "Transfer ₦5,001 - ₦50,000",
				fee: "₦25",
				note: "Direct bank network fee"
			},
			{
				service: "Transfer above ₦50,000",
				fee: "₦50",
				note: "Direct bank network fee"
			},
			{
				service: "Bulk Payroll Batch Transfers",
				fee: "Custom bulk tier",
				note: "Discounted for high-volume enterprises"
			}
		]
	},
	{
		category: "Utility & Bill Payments",
		items: [
			{
				service: "Airtime Top-ups (MTN, Glo, Airtel, 9mobile)",
				fee: "Free (0% fee)",
				note: "Earn up to 3% cashback"
			},
			{
				service: "Data Bundles Top-ups",
				fee: "Free (0% fee)",
				note: "Instant network direct delivery"
			},
			{
				service: "Electricity Meter Tokens",
				fee: "₦0 - ₦100",
				note: "Depends on distribution DISCO provider"
			},
			{
				service: "Cable TV Subscription (DStv, GOtv)",
				fee: "Free (0% fee)",
				note: "Instant automated reconnection"
			}
		]
	},
	{
		category: "Payroxa Store & Merchant Processing",
		items: [
			{
				service: "Storefront Creation & Hosting",
				fee: "Free (₦0)",
				note: "Unlimited product listings"
			},
			{
				service: "Local Cards & Transfer Checkout",
				fee: "1.4% (capped at ₦2,000)",
				note: "Zero fee on failed attempts"
			},
			{
				service: "International Card Checkout",
				fee: "3.8% + ₦100",
				note: "Settled directly in local or USD"
			}
		]
	}
];
function PricingPage() {
	const { links } = usePublicCms();
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	const [calcAmount, setCalcAmount] = (0, import_react.useState)(25e3);
	const transferFee = calcAmount <= 5e3 ? 10 : calcAmount <= 5e4 ? 25 : 50;
	const storeProcessingFee = Math.min(calcAmount * .014, 2e3);
	const merchantPayout = calcAmount - storeProcessingFee;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Simple & Transparent"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 132,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: ["Honest pricing with ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-gradient-brand",
							children: "zero surprises."
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 136,
							columnNumber: 33
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 135,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "We believe in complete transparency. No hidden account maintenance fees, no surprise deductions, and no arbitrary ledger penalties."
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 138,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							size: "lg",
							children: ["Open a Free Account ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 144,
								columnNumber: 35
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 143,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 142,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 131,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 130,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl rounded-3xl border border-border bg-background p-8 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calculator, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 155,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 154,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xl font-bold text-foreground",
							children: "Interactive Fee Calculator"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 158,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: "Estimate your transaction costs instantly"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 159,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 157,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 153,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Transaction Amount (₦)"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 166,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "range",
								min: "1000",
								max: "500000",
								step: "1000",
								value: calcAmount,
								onChange: (e) => setCalcAmount(Number(e.target.value)),
								className: "w-full accent-primary cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 170,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "min-w-[120px] rounded-lg border border-border bg-muted/50 px-3 py-2 text-right font-mono text-base font-bold text-foreground",
								children: ["₦", calcAmount.toLocaleString()]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 179,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 169,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 165,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/80 bg-muted/40 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Bank Transfer Fee"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 187,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xl font-extrabold text-primary",
										children: ["₦", transferFee]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 188,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-0.5 text-[10px] text-muted-foreground",
										children: ["Recipient gets full ₦", calcAmount.toLocaleString()]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 189,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 186,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border/80 bg-muted/40 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Store Processing Fee"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 194,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xl font-extrabold text-foreground",
										children: ["₦", Math.round(storeProcessingFee).toLocaleString()]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 195,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-0.5 text-[10px] text-muted-foreground",
										children: "1.4% (Max ₦2,000 cap)"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 198,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 193,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "col-span-2 rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:col-span-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-primary font-semibold",
										children: "Net Payout to You"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 201,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-xl font-extrabold text-foreground",
										children: ["₦", Math.round(merchantPayout).toLocaleString()]
									}, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 202,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-0.5 text-[10px] text-emerald-600 font-semibold",
										children: "Settles in real-time"
									}, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 205,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 200,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 185,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 152,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 151,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "Detailed Breakdown",
			title: "Clear rates for every transaction category",
			description: "Everything published upfront so you can run your personal finances and business with complete peace of mind."
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 215,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 space-y-10",
			children: feeTables.map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "overflow-hidden rounded-3xl border border-border bg-background",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-muted/50 px-6 py-4 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-base font-bold text-foreground",
						children: group.category
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 228,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 227,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "divide-y divide-border",
					children: group.items.map((row) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col justify-between px-6 py-4 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm font-semibold text-foreground",
							children: row.service
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 237,
							columnNumber: 23
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: row.note
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 238,
							columnNumber: 23
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 236,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-2 sm:mt-0 text-left sm:text-right",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "inline-block rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-foreground",
								children: row.fee
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 241,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 240,
							columnNumber: 21
						}, this)]
					}, row.service, true, {
						fileName: _jsxFileName$4,
						lineNumber: 232,
						columnNumber: 19
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 230,
					columnNumber: 15
				}, this)]
			}, group.category, true, {
				fileName: _jsxFileName$4,
				lineNumber: 223,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 221,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 214,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Ready for fair and transparent financial services?",
			description: "Join Payroxa today with no initial deposit or monthly subscription fees required."
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 254,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 128,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/routes/privacy.tsx";
var title$6 = "Privacy Policy — Payroxa";
var description$6 = "Read the official Payroxa Privacy Policy. Understand how we collect, process, store, and safeguard your personal and financial data.";
var Route$26 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: title$6 },
			{
				name: "description",
				content: description$6
			},
			{
				property: "og:title",
				content: title$6
			},
			{
				property: "og:description",
				content: description$6
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/privacy`
			},
			{
				name: "twitter:title",
				content: title$6
			},
			{
				name: "twitter:description",
				content: description$6
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/privacy`
		}]
	}),
	component: PrivacyPage
});
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "py-12 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-4xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary",
						children: "Legal & Privacy"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 31,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-4 text-3xl font-extrabold sm:text-4xl text-foreground",
						children: "Privacy Policy"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 34,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Last Updated: January 2026 • In compliance with Nigeria Data Protection Regulation (NDPR) & global data protection laws."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 37,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 30,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "prose prose-slate mt-10 max-w-none space-y-8 text-foreground/90 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "1. Introduction & Scope"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 45,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Payroxa (\"we\", \"our\", or \"us\") is dedicated to safeguarding your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you access our website (payroxa.com.ng), web portal, mobile apps, and associated APIs."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 46,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 44,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold text-foreground",
							children: "2. Information We Collect"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 55,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "To provide compliant, secure, and rapid financial services, we collect the following categories of information:"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 56,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: "Identity Information:"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 62,
									columnNumber: 17
								}, this), " Full legal name, date of birth, government identification numbers (NIN, BVN for regulatory KYC verification)."] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 61,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: "Contact Information:"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 67,
									columnNumber: 17
								}, this), " Email address, phone number, residential or registered business address."] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 66,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "text-foreground",
										children: "Financial & Transactional Data:"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 71,
										columnNumber: 17
									}, this),
									" ",
									"Bank account numbers, transaction histories, wallet balances, and merchant payment receipts."
								] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 70,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: "Technical Device Data:"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 76,
									columnNumber: 17
								}, this), " IP addresses, browser types, operating system identifiers, and biometric token authorizations."] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 75,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 60,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 54,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "3. How We Use Your Information"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 83,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We process your data strictly to deliver contracted financial services, fulfill statutory obligations under Nigerian anti-money laundering (AML) directives, prevent fraudulent transactions, and provide 24/7 customer assistance."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 84,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 82,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "4. Information Sharing & Third Parties"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 92,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Payroxa never sells your personal information to advertisers. We share information only with licensed payment switch operators, regulatory bodies when required by law, and verified identity verification infrastructure partners."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 95,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 91,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "5. Data Retention & Security"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 103,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We retain transaction records according to Central Bank of Nigeria (CBN) and NDPR record-keeping requirements. All sensitive records are protected with AES-256 encryption at rest and TLS 1.3 in transit."
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 104,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 102,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "6. Your Rights"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 112,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"You maintain the right to access, rectify, or request the deletion of your personal data subject to statutory regulatory compliance. For privacy inquiries, contact our Data Protection Officer at",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: `mailto:${siteConfig.contact.email}`,
								className: "text-primary underline",
								children: siteConfig.contact.email
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 117,
								columnNumber: 15
							}, this),
							"."
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 113,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 111,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 43,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$22 = () => import("./resources-CBmAujWf.mjs");
var title$5 = "Payroxa Resources — Payment Guides, E-commerce & Business Insights for Nigeria";
var description$5 = "Comprehensive guides, payment tutorials, POS advice, and financial strategies to grow your business in Nigeria and across Africa.";
var Route$25 = createFileRoute("/resources")({
	head: () => ({
		meta: [
			{ title: title$5 },
			{
				name: "description",
				content: description$5
			},
			{
				property: "og:title",
				content: title$5
			},
			{
				property: "og:description",
				content: description$5
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/resources`
			},
			{
				property: "og:image",
				content: `${siteConfig.websiteUrl}/hero-payroxa.jpg`
			},
			{
				name: "twitter:title",
				content: title$5
			},
			{
				name: "twitter:description",
				content: description$5
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/resources`
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "CollectionPage",
				name: title$5,
				description: description$5,
				url: `${siteConfig.websiteUrl}/resources`,
				publisher: {
					"@type": "Organization",
					name: siteConfig.name,
					url: siteConfig.websiteUrl
				}
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var _jsxFileName$2 = "/app/applet/src/routes/security.tsx";
var title$4 = "Payroxa Security — Bank-Grade Protection & NDPR Compliance";
var description$4 = "Learn how Payroxa safeguards your funds, transaction data, and personal privacy with end-to-end encryption and automated fraud detection.";
var Route$24 = createFileRoute("/security")({
	head: () => ({
		meta: [
			{ title: title$4 },
			{
				name: "description",
				content: description$4
			},
			{
				property: "og:title",
				content: title$4
			},
			{
				property: "og:description",
				content: description$4
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/security`
			},
			{
				name: "twitter:title",
				content: title$4
			},
			{
				name: "twitter:description",
				content: description$4
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/security`
		}]
	}),
	component: SecurityPage
});
var securityPillars = [
	{
		icon: Lock,
		title: "End-to-End 256-Bit Encryption",
		description: "All financial data, identity credentials, and transaction requests are encrypted in transit via TLS 1.3 and at rest with AES-256 standards."
	},
	{
		icon: FingerprintPattern,
		title: "Biometrics & Multi-Factor Auth",
		description: "Sensitive operations such as fund transfers, card detail reveals, and password changes require biometric approval or real-time SMS/Email OTPs."
	},
	{
		icon: ShieldCheck,
		title: "Automated AI Fraud Defense",
		description: "Our real-time anomaly detection engine flags suspicious IP jumps, unusual transaction volumes, and compromised device signatures immediately."
	},
	{
		icon: FileCheckCorner,
		title: "NDPR & Regulatory Compliance",
		description: "We strictly adhere to the Nigeria Data Protection Regulation (NDPR) and international best practices for data sovereignty and consumer privacy."
	},
	{
		icon: Building,
		title: "Licensed Banking Partners",
		description: "User wallet deposits are held in custodial trust accounts with CBN-licensed commercial banks and regulated financial institutions."
	},
	{
		icon: Server,
		title: "99.9% Redundant Infrastructure",
		description: "Distributed cloud infrastructure across multiple global availability zones guarantees continuous uptime and instantaneous disaster recovery."
	}
];
var bestPractices = [
	"Never share your Payroxa PIN, password, or OTP with anyone, including individuals claiming to be Payroxa staff.",
	"Enable Face ID / Fingerprint authentication in your app settings for effortless one-touch login protection.",
	"Check your transaction history regularly and freeze cards instantly if you spot unfamiliar merchant charges.",
	"Always ensure you are visiting official domains (payroxa.com.ng and app.payroxa.com.ng)."
];
function SecurityPage() {
	const { links } = usePublicCms();
	links?.register || PAYROXA_LINKS.register;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Safe, Solid, Secure"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 96,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"Bank-grade security guarding",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "every transaction."
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 101,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 99,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Your trust is our most valuable asset. We employ modern cryptographic standards and continuous compliance monitoring to keep your money and identity safe."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 103,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 95,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 94,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Architecture",
				title: "Defense-in-depth security infrastructure",
				description: "How we protect millions of Naira in customer and business transactions daily."
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 112,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: securityPillars.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(p.icon, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 121,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 120,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "mt-4 text-lg font-bold text-foreground",
							children: p.title
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 123,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-xs text-muted-foreground leading-relaxed",
							children: p.description
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 124,
							columnNumber: 15
						}, this)
					]
				}, p.title, true, {
					fileName: _jsxFileName$2,
					lineNumber: 119,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 117,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 111,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-12",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 135,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xl font-bold text-foreground",
							children: "Tips to Protect Your Account"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 136,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 134,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Security is a shared commitment. Follow these simple guidelines to maximize your digital safety:"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 138,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-6 space-y-3",
						children: bestPractices.map((tip, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
							className: "flex items-start gap-3 text-sm text-foreground/90",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-4 shrink-0 text-primary mt-0.5" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 145,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: tip }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 146,
								columnNumber: 19
							}, this)]
						}, idx, true, {
							fileName: _jsxFileName$2,
							lineNumber: 144,
							columnNumber: 17
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 142,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 133,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 132,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 131,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Experience secure financial tools",
			description: "Open your secure Payroxa wallet today and join thousands who trade with confidence."
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 155,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 92,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/routes/store.tsx";
var title$3 = "Payroxa Store — Launch Your Online Storefront in 2 Minutes";
var description$3 = "Create a stunning digital store, showcase products on WhatsApp and social media, collect instant payments, and manage orders with zero coding.";
var Route$23 = createFileRoute("/store")({
	head: () => ({
		meta: [
			{ title: title$3 },
			{
				name: "description",
				content: description$3
			},
			{
				property: "og:title",
				content: title$3
			},
			{
				property: "og:description",
				content: description$3
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/store`
			},
			{
				name: "twitter:title",
				content: title$3
			},
			{
				name: "twitter:description",
				content: description$3
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/store`
		}]
	}),
	component: StorePage
});
var storeFeatures = [
	{
		icon: Store,
		title: "Zero Setup, Instant Live Store",
		description: "No hosting, no technical skills, and no domain setup needed. Get a clean, branded link (payroxa.com.ng/store/yourname) ready in seconds."
	},
	{
		icon: ShoppingBag,
		title: "Product Catalogs & Variants",
		description: "Add multiple photos, size variants, stock counts, and promotional discounts easily from your mobile phone or laptop."
	},
	{
		icon: CreditCard,
		title: "Frictionless Checkout",
		description: "Customers pay with Cards, Bank Transfers, USSD, or Payroxa Wallet. No sign-up required for buyers."
	},
	{
		icon: Share2,
		title: "WhatsApp & Instagram Integration",
		description: "Share direct product links to your Instagram bio, TikTok, or WhatsApp status for one-click checkout."
	},
	{
		icon: Truck,
		title: "Integrated Delivery Options",
		description: "Define delivery fee zones across states or integrate with local courier partners for streamlined fulfillment."
	},
	{
		icon: Zap,
		title: "Instant Wallet Settlement",
		description: "Every order payment settles directly into your Payroxa balance in real-time, ready for immediate payout or spending."
	}
];
var steps = [
	{
		num: "1",
		title: "Create your free store",
		desc: "Sign up on Payroxa, pick your unique store link and upload your store logo."
	},
	{
		num: "2",
		title: "Add your products",
		desc: "Upload photos, set prices, write descriptions and specify available inventory."
	},
	{
		num: "3",
		title: "Share & start selling",
		desc: "Paste your link across social media and receive real-time order alerts on your phone."
	}
];
function StorePage() {
	const { links } = usePublicCms();
	const registerUrl = links?.register || PAYROXA_LINKS.register;
	const loginUrl = links?.login || PAYROXA_LINKS.login;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto w-full max-w-6xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary",
						children: "Payroxa Digital Storefronts"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 111,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl",
						children: [
							"Turn your social followers into",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-gradient-brand",
								children: "paying customers."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 116,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
						children: "Stop replying to endless \"how much\" DMs. Launch a free online store on Payroxa, showcase your products, and collect payments automatically."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 118,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: registerUrl,
							size: "lg",
							children: ["Create Your Free Store ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {
								className: "size-4",
								"aria-hidden": "true"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 124,
								columnNumber: 38
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 123,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: loginUrl,
							variant: "outline",
							size: "lg",
							children: "Manage Existing Store"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 126,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 122,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 110,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 109,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			tone: "soft",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Capabilities",
				title: "Everything you need to sell online effortlessly",
				description: "Designed to eliminate friction between your social content and your bank account."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 135,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: storeFeatures.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
					icon: item.icon,
					title: item.title,
					description: item.description
				}, item.title, false, {
					fileName: _jsxFileName$1,
					lineNumber: 142,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 140,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 134,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			eyebrow: "How It Works",
			title: "From zero to selling in 3 simple steps",
			description: "You don't need a developer or complex web servers. If you know how to use WhatsApp, you can run a Payroxa store."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 154,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-8 sm:grid-cols-3",
			children: steps.map((step) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "surface-card flex flex-col items-center p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-extrabold text-primary-foreground shadow-md",
						children: step.num
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 162,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-6 text-xl font-bold text-foreground",
						children: step.title
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 165,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: step.desc
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 166,
						columnNumber: 15
					}, this)
				]
			}, step.num, true, {
				fileName: _jsxFileName$1,
				lineNumber: 161,
				columnNumber: 13
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 159,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 153,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {
			title: "Start selling online with Payroxa Store",
			description: "Join thousands of fashion vendors, bakers, electronics sellers and beauty brands selling online today."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 173,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 107,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/terms.tsx";
var title$2 = "Terms of Service — Payroxa";
var description$2 = "Review the official Payroxa Terms of Service. Understand your rights and responsibilities when using our wallet, storefronts, and payment services.";
var Route$22 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: title$2 },
			{
				name: "description",
				content: description$2
			},
			{
				property: "og:title",
				content: title$2
			},
			{
				property: "og:description",
				content: description$2
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/terms`
			},
			{
				name: "twitter:title",
				content: title$2
			},
			{
				name: "twitter:description",
				content: description$2
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/terms`
		}]
	}),
	component: TermsPage
});
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "py-12 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-4xl px-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-b border-border pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary",
						children: "Legal Terms & Conditions"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-4 text-3xl font-extrabold sm:text-4xl text-foreground",
						children: "Terms of Service"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Effective Date: January 1, 2026 • Please read these terms carefully before creating an account or using Payroxa."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "prose prose-slate mt-10 max-w-none space-y-8 text-foreground/90 leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "1. Agreement to Terms"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "By accessing or using Payroxa's website, mobile application, APIs, or merchant tools (collectively, the \"Services\"), you agree to be bound by these Terms of Service. If you do not agree, you must not access or use our platform."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "2. Eligibility & Account Verification"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "To use Payroxa, you must be at least 18 years old and capable of forming a binding contract under applicable Nigerian law. You agree to provide accurate, current, and complete information during registration and keep your KYC documentation up to date."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "3. Acceptable Use Policy"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 65,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "You agree not to use Payroxa for any unlawful or prohibited activity, including but not limited to money laundering, terrorist financing, sale of counterfeit goods, fraudulent pyramid schemes, or unauthorized gambling."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 64,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "4. Merchant Storefronts & Settlements"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Merchants utilizing Payroxa Storefronts are solely responsible for accurately describing products, fulfilling customer orders, and addressing shipping disputes. Payroxa acts solely as the payment collection and settlement processor."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 73,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "5. Fees & Transaction Limits"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 85,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "All applicable transaction fees and exchange rates are displayed before confirming a transaction. Transaction limits are established based on your KYC verification tier and regulatory guidelines."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "6. Termination & Suspension"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We reserve the right to suspend or terminate accounts that violate these Terms or present an unacceptable financial or security risk."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 95,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 93,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-xl font-bold text-foreground",
						children: "7. Governing Law"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 102,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. For disputes or questions, contact",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: `mailto:${siteConfig.contact.email}`,
								className: "text-primary underline",
								children: siteConfig.contact.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 15
							}, this),
							"."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 43,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 28,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$21 = () => import("./transfers-BvjK3qlK.mjs");
var title$1 = "Payroxa Transfers — Instant Payouts, Bulk Transfers & Payroll for African Teams";
var description$1 = "Send money instantly to all commercial banks and mobile money wallets across Nigeria. Run bulk payroll with one click and automated reconciliation.";
var Route$21 = createFileRoute("/transfers")({
	head: () => ({
		meta: [
			{ title: title$1 },
			{
				name: "description",
				content: description$1
			},
			{
				property: "og:title",
				content: title$1
			},
			{
				property: "og:description",
				content: description$1
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/transfers`
			},
			{
				name: "twitter:title",
				content: title$1
			},
			{
				name: "twitter:description",
				content: description$1
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/transfers`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./wallet-BXJirRAW.mjs");
var title = "Payroxa Business Wallet — Multi-Currency Digital Accounts for African Businesses";
var description = "Hold Naira and foreign currencies in dedicated business accounts. Convert at real-time market rates, manage sub-accounts, and safeguard funds with enterprise encryption.";
var Route$20 = createFileRoute("/wallet")({
	head: () => ({
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: `${siteConfig.websiteUrl}/wallet`
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			}
		],
		links: [{
			rel: "canonical",
			href: `${siteConfig.websiteUrl}/wallet`
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./cms-admin.index-BdyWNEfA.mjs");
var Route$19 = createFileRoute("/cms-admin/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./cms-admin.activity-DSO5j86z.mjs");
var Route$18 = createFileRoute("/cms-admin/activity")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./cms-admin.announcements-BbziNZjT.mjs");
var Route$17 = createFileRoute("/cms-admin/announcements")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./cms-admin.blog-DVan9sne.mjs");
var Route$16 = createFileRoute("/cms-admin/blog")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./cms-admin.business-pNawBW14.mjs");
var Route$15 = createFileRoute("/cms-admin/business")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./cms-admin.content-DXybgwh9.mjs");
var Route$14 = createFileRoute("/cms-admin/content")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./cms-admin.faq-v5jhSNhY.mjs");
var Route$13 = createFileRoute("/cms-admin/faq")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./cms-admin.hero-BREsBYRt.mjs");
var Route$12 = createFileRoute("/cms-admin/hero")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./cms-admin.login-Dwgdc0-P.mjs");
var Route$11 = createFileRoute("/cms-admin/login")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./cms-admin.marketplace-BSmgdvG-.mjs");
var Route$10 = createFileRoute("/cms-admin/marketplace")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./cms-admin.media-DYVgKwpN.mjs");
var Route$9 = createFileRoute("/cms-admin/media")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./cms-admin.navigation-BGbmMo_J.mjs");
var Route$8 = createFileRoute("/cms-admin/navigation")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./cms-admin.pages-CvK10dVt.mjs");
var Route$7 = createFileRoute("/cms-admin/pages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./cms-admin.products-Iu5XA9AD.mjs");
var Route$6 = createFileRoute("/cms-admin/products")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./cms-admin.seo-DS_gdA0l.mjs");
var Route$5 = createFileRoute("/cms-admin/seo")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./cms-admin.testimonials-yQoU8qzq.mjs");
var Route$4 = createFileRoute("/cms-admin/testimonials")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./cms-admin.settings.index-5_9LHc7Y.mjs");
var Route$3 = createFileRoute("/cms-admin/settings/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./cms-admin.settings.admins-C2VhZHxl.mjs");
var Route$2 = createFileRoute("/cms-admin/settings/admins")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./cms-admin.settings.links-Du4v_MUD.mjs");
var Route$1 = createFileRoute("/cms-admin/settings/links")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./cms-admin.settings.social-C87i_JQi.mjs");
var Route = createFileRoute("/cms-admin/settings/social")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$37.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$38
});
var AboutRoute = Route$36.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$38
});
var BusinessRoute = Route$35.update({
	id: "/business",
	path: "/business",
	getParentRoute: () => Route$38
});
var CardsRoute = Route$34.update({
	id: "/cards",
	path: "/cards",
	getParentRoute: () => Route$38
});
var CmsAdminRoute = Route$33.update({
	id: "/cms-admin",
	path: "/cms-admin",
	getParentRoute: () => Route$38
});
var ContactRoute = Route$32.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$38
});
var MarketplaceRoute = Route$31.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => Route$38
});
var PaymentLinksRoute = Route$30.update({
	id: "/payment-links",
	path: "/payment-links",
	getParentRoute: () => Route$38
});
var PaymentRequestsRoute = Route$29.update({
	id: "/payment-requests",
	path: "/payment-requests",
	getParentRoute: () => Route$38
});
var PaymentsRoute = Route$28.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => Route$38
});
var PricingRoute = Route$27.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$38
});
var PrivacyRoute = Route$26.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$38
});
var ResourcesRoute = Route$25.update({
	id: "/resources",
	path: "/resources",
	getParentRoute: () => Route$38
});
var SecurityRoute = Route$24.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$38
});
var StoreRoute = Route$23.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => Route$38
});
var TermsRoute = Route$22.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$38
});
var TransfersRoute = Route$21.update({
	id: "/transfers",
	path: "/transfers",
	getParentRoute: () => Route$38
});
var WalletRoute = Route$20.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$38
});
var CmsAdminIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminActivityRoute = Route$18.update({
	id: "/activity",
	path: "/activity",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminAnnouncementsRoute = Route$17.update({
	id: "/announcements",
	path: "/announcements",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminBlogRoute = Route$16.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminBusinessRoute = Route$15.update({
	id: "/business",
	path: "/business",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminContentRoute = Route$14.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminFaqRoute = Route$13.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminHeroRoute = Route$12.update({
	id: "/hero",
	path: "/hero",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminLoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminMarketplaceRoute = Route$10.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminMediaRoute = Route$9.update({
	id: "/media",
	path: "/media",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminNavigationRoute = Route$8.update({
	id: "/navigation",
	path: "/navigation",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminPagesRoute = Route$7.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminProductsRoute = Route$6.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminSeoRoute = Route$5.update({
	id: "/seo",
	path: "/seo",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminTestimonialsRoute = Route$4.update({
	id: "/testimonials",
	path: "/testimonials",
	getParentRoute: () => CmsAdminRoute
});
var ResourcesSlugRoute = Route$42.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ResourcesRoute
});
var CmsAdminSettingsIndexRoute = Route$3.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminSettingsAdminsRoute = Route$2.update({
	id: "/settings/admins",
	path: "/settings/admins",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminSettingsLinksRoute = Route$1.update({
	id: "/settings/links",
	path: "/settings/links",
	getParentRoute: () => CmsAdminRoute
});
var CmsAdminSettingsSocialRoute = Route.update({
	id: "/settings/social",
	path: "/settings/social",
	getParentRoute: () => CmsAdminRoute
});
var MarketplaceProductSlugRoute = Route$39.update({
	id: "/product/$slug",
	path: "/product/$slug",
	getParentRoute: () => MarketplaceRoute
});
var MarketplaceStoreSlugRoute = Route$40.update({
	id: "/store/$slug",
	path: "/store/$slug",
	getParentRoute: () => MarketplaceRoute
});
var MarketplaceVendorIdRoute = Route$41.update({
	id: "/vendor/$id",
	path: "/vendor/$id",
	getParentRoute: () => MarketplaceRoute
});
var CmsAdminRouteChildren = {
	CmsAdminActivityRoute,
	CmsAdminAnnouncementsRoute,
	CmsAdminBlogRoute,
	CmsAdminBusinessRoute,
	CmsAdminContentRoute,
	CmsAdminFaqRoute,
	CmsAdminHeroRoute,
	CmsAdminLoginRoute,
	CmsAdminMarketplaceRoute,
	CmsAdminMediaRoute,
	CmsAdminNavigationRoute,
	CmsAdminPagesRoute,
	CmsAdminProductsRoute,
	CmsAdminSeoRoute,
	CmsAdminTestimonialsRoute,
	CmsAdminIndexRoute,
	CmsAdminSettingsAdminsRoute,
	CmsAdminSettingsLinksRoute,
	CmsAdminSettingsSocialRoute,
	CmsAdminSettingsIndexRoute
};
var CmsAdminRouteWithChildren = CmsAdminRoute._addFileChildren(CmsAdminRouteChildren);
var MarketplaceRouteChildren = {
	MarketplaceProductSlugRoute,
	MarketplaceStoreSlugRoute,
	MarketplaceVendorIdRoute
};
var MarketplaceRouteWithChildren = MarketplaceRoute._addFileChildren(MarketplaceRouteChildren);
var ResourcesRouteChildren = { ResourcesSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	BusinessRoute,
	CardsRoute,
	CmsAdminRoute: CmsAdminRouteWithChildren,
	ContactRoute,
	MarketplaceRoute: MarketplaceRouteWithChildren,
	PaymentLinksRoute,
	PaymentRequestsRoute,
	PaymentsRoute,
	PricingRoute,
	PrivacyRoute,
	ResourcesRoute: ResourcesRoute._addFileChildren(ResourcesRouteChildren),
	SecurityRoute,
	StoreRoute,
	TermsRoute,
	TransfersRoute,
	WalletRoute
};
var routeTree = Route$38._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
