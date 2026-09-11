import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Ct as CircleCheck, Ft as BellRing, ct as FileText, n as Zap } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-CIO-WwIt.mjs";
import { a as SectionHeading, i as Section, n as PAYROXA_LINKS, r as PayroxaButton, t as FinalCTA } from "./FinalCTA-BWKZzTI8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-requests-4RIPU56Z.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/payment-requests.tsx?tsr-split=component";
var requestFeatures = [
	{
		icon: FileText,
		title: "Branded Digital Invoices",
		description: "Issue polished PDF invoices and responsive web invoices customized with your logo, tax ID, and terms.",
		badge: "Professional Invoicing"
	},
	{
		icon: BellRing,
		title: "Automated Friendly Reminders",
		description: "Never chase unpaid bills manually again. Gentle email and SMS reminders trigger automatically before due dates.",
		badge: "Auto Follow-Ups"
	},
	{
		icon: Zap,
		title: "1-Click Customer Payment",
		description: "Clients pay directly from the invoice link via bank transfer, card, or USSD without signing up.",
		badge: "Frictionless"
	},
	{
		icon: CircleCheck,
		title: "Real-Time Tracking",
		description: "See when clients open invoices, when payment is initiated, and when funds settle into your Payroxa account.",
		badge: "Audit Trail"
	}
];
function PaymentRequestsPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
			className: "gradient-hero text-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-3.5 text-purple-600" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 33,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Digital Invoicing & Requests" }, void 0, false, {
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
						children: "Get invoices paid 3x faster with digital requests."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 36,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 text-base text-muted-foreground sm:text-lg",
						children: "Create professional invoices, send payment requests to corporate clients, and automate reminders so you can focus on building your business."
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
							children: "Send Your First Invoice"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PayroxaButton, {
							href: "/pricing",
							variant: "outline",
							size: "lg",
							children: "See Pricing"
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
			badge: "Invoicing",
			title: "Designed for agencies, freelancers & wholesalers",
			description: "Everything required to keep accounts receivable under control."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 55,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
			children: requestFeatures.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, {
				icon: item.icon,
				title: item.title,
				description: item.description,
				badge: item.badge
			}, item.title, false, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 40
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
export { PaymentRequestsPage as component };
