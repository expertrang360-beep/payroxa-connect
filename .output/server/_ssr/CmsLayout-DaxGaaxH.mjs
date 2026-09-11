import { i as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { $ as Image, B as Menu, Bt as Activity, Et as ChevronRight, J as Link2, Mt as Briefcase, Nt as BookOpen, O as Search, R as Package, St as CircleQuestionMark, T as Settings, V as Megaphone, W as LogOut, X as LayoutDashboard, Z as Layers, _ as Sparkles, ct as FileText, ht as ExternalLink, o as Users, r as X, w as Share2, x as ShoppingBag, yt as Compass, z as MessageSquareQuote } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CmsLayout-DaxGaaxH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/cms/components/CmsLayout.tsx";
function CmsLayout({ children }) {
	const { user, role, isSuperAdmin, logout, isAuthenticated, isLoading } = useCmsAuth();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const currentPath = useRouterState().location.pathname;
	const navigate = useNavigate();
	import_react.useEffect(() => {
		if (!isLoading && !isAuthenticated && currentPath !== "/cms-admin/login") navigate({ to: "/cms-admin/login" });
	}, [
		isLoading,
		isAuthenticated,
		currentPath,
		navigate
	]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-50",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-slate-600",
				children: "Loading Payroxa CMS..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 53,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 52,
		columnNumber: 7
	}, this);
	if (!isAuthenticated && currentPath !== "/cms-admin/login") return null;
	const navGroups = [
		{
			title: "Overview",
			items: [{
				label: "Dashboard",
				href: "/cms-admin",
				icon: LayoutDashboard,
				exact: true
			}]
		},
		{
			title: "Content Studio",
			items: [
				{
					label: "All Pages",
					href: "/cms-admin/pages",
					icon: Layers
				},
				{
					label: "Blog & Resources",
					href: "/cms-admin/blog",
					icon: BookOpen
				},
				{
					label: "Hero Section",
					href: "/cms-admin/hero",
					icon: Sparkles
				},
				{
					label: "Products",
					href: "/cms-admin/products",
					icon: Package
				},
				{
					label: "Marketplace API",
					href: "/cms-admin/marketplace",
					icon: ShoppingBag
				},
				{
					label: "Business Types",
					href: "/cms-admin/business",
					icon: Briefcase
				},
				{
					label: "Content Sections",
					href: "/cms-admin/content",
					icon: FileText
				},
				{
					label: "Announcements",
					href: "/cms-admin/announcements",
					icon: Megaphone
				}
			]
		},
		{
			title: "Engagement & Media",
			items: [
				{
					label: "FAQs",
					href: "/cms-admin/faq",
					icon: CircleQuestionMark
				},
				{
					label: "Testimonials",
					href: "/cms-admin/testimonials",
					icon: MessageSquareQuote
				},
				{
					label: "Media Library",
					href: "/cms-admin/media",
					icon: Image
				},
				{
					label: "Navigation Links",
					href: "/cms-admin/navigation",
					icon: Compass
				}
			]
		},
		{
			title: "SEO & Growth Engine",
			items: [{
				label: "SEO & Redirects Suite",
				href: "/cms-admin/seo",
				icon: Search
			}]
		},
		{
			title: "Settings & System",
			items: [
				{
					label: "General Settings",
					href: "/cms-admin/settings",
					icon: Settings,
					exact: true
				},
				{
					label: "Application Links",
					href: "/cms-admin/settings/links",
					icon: Link2
				},
				{
					label: "Social Media",
					href: "/cms-admin/settings/social",
					icon: Share2
				},
				{
					label: "Admin Users",
					href: "/cms-admin/settings/admins",
					icon: Users
				},
				{
					label: "Activity Audit Log",
					href: "/cms-admin/activity",
					icon: Activity
				}
			]
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen bg-slate-50 text-slate-900",
		children: [
			mobileOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden",
				onClick: () => setMobileOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: `fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-16 items-center justify-between border-b border-slate-100 px-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/cms-admin",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7928CA] to-[#9b51e0] text-lg font-bold text-white shadow-sm",
								children: "P"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-base font-bold tracking-tight text-slate-900",
									children: "Payroxa"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "rounded-md bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-purple-700 uppercase",
									children: "CMS"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[11px] text-slate-500",
								children: "Website Management"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 137,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 130,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 126,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden",
							onClick: () => setMobileOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 overflow-y-auto px-4 py-5 space-y-6",
						children: navGroups.map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase",
								children: group.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-0.5 pt-1",
								children: group.items.map((item) => {
									const isActive = item.exact ? currentPath === item.href : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
										to: item.href,
										onClick: () => setMobileOpen(false),
										className: `group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-purple-50 text-purple-700 font-semibold shadow-2xs" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `size-4 transition-colors ${isActive ? "text-purple-600" : "text-slate-400 group-hover:text-slate-600"}` }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 175,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.label }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 182,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 23
										}, this), isActive && /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5 text-purple-500" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 184,
											columnNumber: 36
										}, this)]
									}, item.href, true, {
										fileName: _jsxFileName,
										lineNumber: 164,
										columnNumber: 21
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 15
							}, this)]
						}, group.title, true, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-t border-slate-100 p-4 bg-slate-50/70",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white",
									children: user?.name?.[0]?.toUpperCase() || "A"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "truncate text-xs font-semibold text-slate-900",
										children: user?.name || "Admin"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 201,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-1.5",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `inline-flex items-center rounded px-1.5 py-0.2 text-[10px] font-medium ${isSuperAdmin ? "bg-purple-100 text-purple-700" : "bg-slate-200 text-slate-700"}`,
											children: role || "Editor"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 205,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 196,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: logout,
								title: "Sign Out",
								className: "rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-600 hover:shadow-xs transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 194,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 119,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-1 flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							className: "rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden",
							onClick: () => setMobileOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden sm:flex items-center gap-2 text-xs text-slate-500",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Payroxa Website CMS" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 240,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "/" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 241,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-semibold text-slate-800 capitalize",
									children: currentPath === "/cms-admin" ? "Dashboard" : currentPath.replace("/cms-admin/", "").replace("/", " • ")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 231,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Live Website" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 257,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden md:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-2 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Production Live" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 230,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto",
					children
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 268,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 109,
		columnNumber: 5
	}, this);
}
//#endregion
export { CmsLayout as t };
