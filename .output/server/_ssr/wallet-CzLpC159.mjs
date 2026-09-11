import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { E as ShieldCheck, Ot as Coins, Vt as Building2, Yt as ArrowRightLeft, a as Wallet } from "../_libs/lucide-react.mjs";
import { a as SectionHeading, i as Section, n as PAYROXA_LINKS, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-c-S2hXna.mjs";
import { t as ProductCard } from "./ProductCard-DA2C9GZz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-CzLpC159.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/wallet.tsx?tsr-split=component";
var walletFeatures = [
	{
		icon: Coins,
		title: "Multi-Currency Balances",
		description: "Hold NGN, USD, and regional currencies in one unified dashboard with zero maintenance fees.",
		badge: "Multi-Currency"
	},
	{
		icon: ArrowRightLeft,
		title: "Instant Currency Conversion",
		description: "Swap between currencies in seconds with transparent competitive FX rates and no hidden markups.",
		badge: "Real-Time FX"
	},
	{
		icon: Building2,
		title: "Dedicated Virtual Accounts",
		description: "Generate dedicated Nigerian bank accounts under your business name for effortless reconciliation.",
		badge: "Auto Reconciliation"
	},
	{
		icon: ShieldCheck,
		title: "Bank-Grade Encryption",
		description: "Funds safeguarded with licensed tier-1 partner banks and NDPR compliant data storage.",
		badge: "NDPR Compliant"
	}
];
function WalletPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			className: "gradient-hero text-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Wallet, { className: "size-3.5 text-purple-600" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital Business Wallet" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 34,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl",
						children: "A flexible business wallet built for modern commerce."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-base text-muted-foreground sm:text-lg",
						children: "Receive customer payments, hold funds securely, manage multiple sub-balances, and disburse money instantly with Payroxa's enterprise-grade business wallet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: PAYROXA_LINKS.register,
							size: "lg",
							children: "Open Free Business Wallet"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: PAYROXA_LINKS.login,
							variant: "outline",
							size: "lg",
							children: "Sign In to Wallet"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
			badge: "Features",
			title: "Designed for high-volume African businesses",
			description: "Everything you need to safeguard capital, track daily cash flow, and manage multi-currency settlements."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 55,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
			children: walletFeatures.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
				icon: item.icon,
				title: item.title,
				description: item.description,
				badge: item.badge
			}, item.title, false, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 39
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 54,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FinalCTA, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 10
	}, this);
}
//#endregion
export { WalletPage as component };
