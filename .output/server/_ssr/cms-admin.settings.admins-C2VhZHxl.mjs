import { i as __toESM } from "../_runtime.mjs";
import { n as deleteAdminUserFn, s as getAdminUsersFn, t as createAdminUserFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { Ct as CircleCheck, G as Lock, S as Shield, Tt as CircleAlert, U as Mail, c as UserPlus, o as Users, p as Trash2, s as User } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.settings.admins-C2VhZHxl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.settings.admins.tsx?tsr-split=component";
function CmsAdminUsersPage() {
	const { token, user: currentUser, isSuperAdmin } = useCmsAuth();
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("Editor");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const loadUsers = async () => {
		if (!token) return;
		setLoading(true);
		try {
			const res = await getAdminUsersFn({ data: { token } });
			setUsers(res.users);
		} catch (err) {
			console.error("Failed to load admin users:", err);
			setError("Unable to load administrator users.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadUsers();
	}, [token]);
	const handleCreateUser = async (e) => {
		e.preventDefault();
		if (!token) return;
		setError(null);
		setSuccess(null);
		setSubmitting(true);
		try {
			const res = await createAdminUserFn({ data: {
				token,
				name,
				email,
				password,
				role
			} });
			if (res.success && res.user) {
				setUsers([...users, res.user]);
				setSuccess(`Administrator account created for ${res.user.name} (${res.user.role}).`);
				setShowAddModal(false);
				setName("");
				setEmail("");
				setPassword("");
				setRole("Editor");
			} else setError(res.error || "Failed to create administrator account.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to create user.";
			setError(message);
		} finally {
			setSubmitting(false);
		}
	};
	const handleDeleteUser = async (userId, userName) => {
		if (!token) return;
		if (!window.confirm(`Are you sure you want to remove administrator access for ${userName}?`)) return;
		try {
			const res = await deleteAdminUserFn({ data: {
				token,
				userId
			} });
			if (res.success) {
				setUsers(users.filter((u) => u.id !== userId));
				setSuccess(`Removed administrator access for ${userName}.`);
			} else setError(res.error || "Failed to remove user.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to remove user.";
			setError(message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
			title: "Administrator Accounts & Roles",
			description: "Manage team access, permissions, and security roles across the Payroxa website CMS.",
			actions: isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
				type: "button",
				onClick: () => setShowAddModal(true),
				className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "size-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 104,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Add Administrator" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 179
			}, this) : void 0
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this),
		success && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
			children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 110,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 108,
			columnNumber: 19
		}, this),
		error && /* @__PURE__ */ (void 0)("div", {
			className: "mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
			children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 114,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mb-8 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-purple-200 bg-purple-50/50 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "size-4 text-purple-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Super Admin Role" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs text-purple-800",
					children: "Full administrative authority. Can modify Application destination URLs, system settings, invite/remove users, configure social channels, and publish all website content."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-2xl border border-slate-200 bg-white p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4 text-slate-500" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Editor Role" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs text-slate-600",
					children: "Content management access. Can edit and draft Hero banners, Products, Business Types, FAQs, Testimonials, Media assets, and announcements. Cannot modify application URLs or admin roles."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 136,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 131,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 119,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsCard, {
			title: "Active Administrators",
			subtitle: "Current authorized CMS accounts",
			children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 147,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 20
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "divide-y divide-slate-100",
				children: users.map((u) => {
					const isMe = u.id === currentUser?.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-sm text-purple-700",
								children: u.name[0]?.toUpperCase() || "A"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 153,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-sm font-bold text-slate-900",
									children: u.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 25
								}, this), isMe && /* @__PURE__ */ (void 0)("span", {
									className: "rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600",
									children: "You"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 34
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-slate-500",
								children: u.email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between sm:justify-end gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${u.role === "Super Admin" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-700"}`,
								children: u.role
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 21
							}, this), isSuperAdmin && !isMe && /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => handleDeleteUser(u.id, u.name),
								className: "rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors",
								title: "Remove Administrator",
								children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 47
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 19
						}, this)]
					}, u.id, true, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 148,
				columnNumber: 20
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 7
		}, this),
		showAddModal && /* @__PURE__ */ (void 0)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (void 0)("h3", {
						className: "text-lg font-bold text-slate-900",
						children: "Add New Administrator"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("p", {
						className: "mt-1 text-xs text-slate-500",
						children: "Create an administrative login for a Payroxa team member."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("form", {
						onSubmit: handleCreateUser,
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Full Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (void 0)(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "text",
									required: true,
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "e.g. Sarah Adeyemi",
									className: "w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 192,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Email Address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (void 0)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "sarah@payroxa.com.ng",
									className: "w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Temporary Password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (void 0)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("input", {
									type: "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "At least 8 characters",
									className: "w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Role Assignment"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 219,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("select", {
								value: role,
								onChange: (e) => setRole(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none",
								children: [/* @__PURE__ */ (void 0)("option", {
									value: "Editor",
									children: "Editor (Content & Media only)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 223,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("option", {
									value: "Super Admin",
									children: "Super Admin (Full System Access)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 224,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 222,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 218,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-6 flex justify-end gap-3 pt-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setShowAddModal(false),
									className: "rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "submit",
									disabled: submitting,
									className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
									children: submitting ? "Creating..." : "Create Account"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 232,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 183,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 182,
			columnNumber: 24
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsAdminUsersPage as component };
