import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FinalCTA-c-S2hXna.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$2 = "/app/applet/src/components/PayroxaButton.tsx";
var buttonStyles = cva("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 cursor-pointer", {
	variants: {
		variant: {
			primary: "gradient-brand text-primary-foreground shadow-glow hover:brightness-110",
			secondary: "bg-navy text-navy-foreground hover:bg-navy/90",
			outline: "border border-border bg-background text-foreground hover:bg-muted",
			text: "text-primary hover:text-primary-glow underline-offset-4 hover:underline px-0"
		},
		size: {
			sm: "h-9 px-4 text-sm",
			md: "h-11 px-6 text-sm",
			lg: "h-13 px-8 text-base"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function PayroxaButton({ children, className, href, to, variant, size, ariaLabel, onClick, type = "button", disabled }) {
	const classes = cn(buttonStyles({
		variant,
		size
	}), className);
	if (to) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to,
		className: classes,
		"aria-label": ariaLabel,
		onClick,
		children
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 53,
		columnNumber: 7
	}, this);
	if (href) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
		href,
		className: classes,
		"aria-label": ariaLabel,
		rel: "noopener noreferrer",
		target: "_blank",
		onClick,
		children
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 61,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type,
		className: classes,
		"aria-label": ariaLabel,
		onClick,
		disabled,
		children
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 75,
		columnNumber: 5
	}, this);
}
/**
* Single source of truth for the Payroxa marketing website.
*
* This website is a standalone, statically deployable marketing site for
* https://payroxa.com.ng — it has no backend, no database and no dependency
* on the authenticated Payroxa application at https://app.payroxa.com.ng.
*
* Every destination below can be overridden with a public environment
* variable at build time (see .env.example). All values fall back to safe
* defaults so a missing variable can never break the site.
*/
var env = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_PAYROXA_APP_URL": "https://app.payroxa.com.ng",
	"VITE_PAYROXA_BUSINESS_URL": "https://app.payroxa.com.ng/business",
	"VITE_PAYROXA_CARDS_URL": "https://app.payroxa.com.ng/cards",
	"VITE_PAYROXA_LOGIN_URL": "https://app.payroxa.com.ng/login",
	"VITE_PAYROXA_PAYMENTS_URL": "https://app.payroxa.com.ng/payments",
	"VITE_PAYROXA_PUBLIC_API_BASE_URL": "https://app.payroxa.com.ng/api/v1/public/marketplace",
	"VITE_PAYROXA_REGISTER_URL": "https://app.payroxa.com.ng/register",
	"VITE_PAYROXA_STORE_URL": "https://app.payroxa.com.ng/store",
	"VITE_PAYROXA_WALLET_URL": "https://app.payroxa.com.ng/wallet",
	"VITE_PAYROXA_WEBSITE_URL": "https://payroxa.com.ng"
};
var read = (key, fallback) => {
	const value = env[key];
	return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
};
/** Public marketing website origin. */
var WEBSITE_URL = read("VITE_PAYROXA_WEBSITE_URL", "https://payroxa.com.ng");
/** Authenticated product application origin. */
var APP_URL = read("VITE_PAYROXA_APP_URL", "https://app.payroxa.com.ng");
var appPath = (path) => `${APP_URL.replace(/\/$/, "")}${path}`;
/**
* External destinations that hand the visitor over to the Payroxa product.
* Only routes known to exist in the application are listed here.
*/
var PAYROXA_LINKS = {
	app: read("VITE_PAYROXA_APP_URL", APP_URL),
	login: read("VITE_PAYROXA_LOGIN_URL", appPath("/login")),
	register: read("VITE_PAYROXA_REGISTER_URL", appPath("/register")),
	wallet: read("VITE_PAYROXA_WALLET_URL", appPath("/wallet")),
	payments: read("VITE_PAYROXA_PAYMENTS_URL", appPath("/payments")),
	cards: read("VITE_PAYROXA_CARDS_URL", appPath("/cards")),
	store: read("VITE_PAYROXA_STORE_URL", appPath("/store")),
	business: read("VITE_PAYROXA_BUSINESS_URL", appPath("/business"))
};
var siteConfig = {
	name: "Payroxa",
	legalName: "Payroxa",
	tagline: "More than payments.",
	description: "Payroxa is the operating system for African businesses — move money, get paid, sell online and run your business from one secure platform.",
	websiteUrl: WEBSITE_URL,
	appUrl: APP_URL,
	contact: {
		email: "support@payroxa.com.ng",
		handle: "@payroxaapp"
	},
	social: [
		{
			label: "Instagram",
			href: "https://instagram.com/payroxaapp"
		},
		{
			label: "X",
			href: "https://x.com/payroxaapp"
		},
		{
			label: "LinkedIn",
			href: "https://linkedin.com/company/payroxa"
		},
		{
			label: "Facebook",
			href: "https://facebook.com/payroxaapp"
		}
	],
	links: PAYROXA_LINKS
};
var _jsxFileName$1 = "/app/applet/src/components/Section.tsx";
function Section({ children, className, id, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		id,
		className: cn("px-5 py-16 sm:py-20", tone === "soft" && "bg-muted/60", tone === "navy" && "gradient-navy text-navy-foreground", className),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto w-full max-w-6xl",
			children
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 26,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
function SectionHeading({ eyebrow, title, description, tone = "default", align = "center" }) {
	const navy = tone === "navy";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("max-w-2xl", align === "center" && "mx-auto text-center"),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: cn("text-xs font-semibold uppercase tracking-[0.18em]", navy ? "text-lavender-strong" : "text-primary"),
				children: eyebrow
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 48,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mt-3 text-3xl font-bold sm:text-4xl",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 57,
				columnNumber: 7
			}, this),
			description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: cn("mt-4 text-base", navy ? "text-navy-foreground/75" : "text-muted-foreground"),
				children: description
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 59,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/FinalCTA.tsx";
function FinalCTA({ title = "Ready to run your business on Payroxa?", description = "Create your free account in minutes and start moving money, getting paid and selling — all from one place." }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
		className: "pb-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "gradient-brand relative overflow-hidden rounded-4xl px-6 py-14 text-center text-primary-foreground shadow-glow sm:px-12",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-3xl font-bold sm:text-4xl",
						children: title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 16,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-base text-primary-foreground/85",
						children: description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 17,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: PAYROXA_LINKS.register,
							variant: "outline",
							size: "lg",
							children: "Get Started"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 19,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: PAYROXA_LINKS.login,
							variant: "secondary",
							size: "lg",
							children: "Sign In"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 22,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 18,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 15,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 14,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 13,
		columnNumber: 5
	}, this);
}
//#endregion
export { SectionHeading as a, Section as i, PAYROXA_LINKS as n, cn as o, PayroxaButton as r, siteConfig as s, FinalCTA as t };
