import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { Jt as ArrowRight, Nt as CircleAlert, Y as Mail, Z as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.login-Dhrd4NnN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.login.tsx?tsr-split=component";
function CmsLoginWrapper() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsLoginPage, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 10
	}, this);
}
function CmsLoginPage() {
	const { login, isAuthenticated } = useCmsAuth();
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	import_react.useEffect(() => {
		if (isAuthenticated) navigate({ to: "/cms-admin" });
	}, [isAuthenticated, navigate]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			if ((await login(email, password)).success) navigate({ to: "/cms-admin" });
			else setError("Authentication failed. If you are a standard user, please login via the User Portal at payroxa-connect.vercel.app");
		} catch {
			setError("An unexpected error occurred while connecting to the CMS server.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 selection:bg-purple-500 selection:text-white",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-purple-600/20 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-1/4 right-1/4 size-80 rounded-full bg-indigo-600/15 blur-3xl" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7928CA] to-[#9b51e0] text-2xl font-bold text-white shadow-lg shadow-purple-500/25",
						children: "P"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl",
					children: [error && /* @__PURE__ */ (void 0)("div", {
						className: "mb-6 flex flex-col gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-3 text-rose-300",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 63,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex-1",
								children: error
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 15
						}, this), error.includes("payroxa-connect.vercel.app") && /* @__PURE__ */ (void 0)("a", {
							href: "https://payroxa-connect.vercel.app/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-rose-500/20 px-3 py-1.5 font-bold text-rose-200 transition-colors hover:bg-rose-500/30",
							children: ["Go to User Portal", /* @__PURE__ */ (void 0)(ArrowRight, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 66,
							columnNumber: 64
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 21
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								htmlFor: "cms-email",
								className: "block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5",
								children: "Email"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 78,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									id: "cms-email",
									type: "email",
									required: true,
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "admin@payroxa.com.ng",
									className: "w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-purple-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 79,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								htmlFor: "cms-password",
								className: "block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5",
								children: "Password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									id: "cms-password",
									type: "password",
									required: true,
									autoComplete: "current-password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••••••",
									className: "w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-purple-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 89,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 87,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "submit",
								disabled: loading,
								className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-500/40 disabled:pointer-events-none disabled:opacity-60",
								children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-4 animate-spin rounded-full border-2 border-white border-t-transparent" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 95,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Authenticating..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 96,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 94,
									columnNumber: 26
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Sign In to Dashboard" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 98,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 97,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 93,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "text-xs font-medium text-slate-400 hover:text-white transition-colors",
						children: "← Return to Payroxa Public Website"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsLoginWrapper as component };
