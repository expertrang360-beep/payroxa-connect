import { i as __toESM } from "../_runtime.mjs";
import { E as loginCmsFn, d as getCmsSessionFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CmsAuthContext-D6Q6fF4Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/cms/context/CmsAuthContext.tsx";
var CmsAuthContext = (0, import_react.createContext)(void 0);
var TOKEN_KEY = "payroxa_cms_session_token";
function CmsAuthProvider({ children }) {
	const [token, setToken] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
		return null;
	});
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const refreshSession = (0, import_react.useCallback)(async () => {
		if (!token) {
			setUser(null);
			setIsLoading(false);
			return;
		}
		try {
			const res = await getCmsSessionFn({ data: { token } });
			if (res.authenticated && res.user) setUser(res.user);
			else {
				setUser(null);
				setToken(null);
				if (typeof window !== "undefined") {
					sessionStorage.removeItem(TOKEN_KEY);
					localStorage.removeItem(TOKEN_KEY);
				}
			}
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		refreshSession();
	}, [refreshSession]);
	const login = async (email, password) => {
		try {
			const res = await loginCmsFn({ data: {
				email,
				password
			} });
			if (res.success && res.user && res.token) {
				setUser(res.user);
				setToken(res.token);
				if (typeof window !== "undefined") sessionStorage.setItem(TOKEN_KEY, res.token);
				return { success: true };
			}
			return {
				success: false,
				error: res.error || "Authentication failed."
			};
		} catch (err) {
			return {
				success: false,
				error: err instanceof Error ? err.message : "Connection error during login."
			};
		}
	};
	const logout = () => {
		setUser(null);
		setToken(null);
		if (typeof window !== "undefined") {
			sessionStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(TOKEN_KEY);
			window.location.href = "/cms-admin/login";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsAuthContext.Provider, {
		value: {
			user,
			role: user?.role || null,
			isSuperAdmin: user?.role === "Super Admin",
			isAuthenticated: !!user,
			isLoading,
			token,
			login,
			logout,
			refreshSession
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 90,
		columnNumber: 5
	}, this);
}
function useCmsAuth() {
	const context = (0, import_react.useContext)(CmsAuthContext);
	if (!context) throw new Error("useCmsAuth must be used within a CmsAuthProvider");
	return context;
}
//#endregion
export { useCmsAuth as n, CmsAuthProvider as t };
