import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginCmsFn, getCmsSessionFn } from "../api";
import type { CmsUser, AdminRole } from "../types";

interface CmsAuthContextType {
  user: CmsUser | null;
  role: AdminRole | null;
  isSuperAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const CmsAuthContext = createContext<CmsAuthContextType | undefined>(undefined);

const TOKEN_KEY = "payroxa_cms_session_token";

export function CmsAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
    }
    return null;
  });
  const [user, setUser] = useState<CmsUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSession = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await getCmsSessionFn({ data: { token } });
      if (res.authenticated && res.user) {
        setUser(res.user);
      } else {
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

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (email: string, password: string) => {
    try {
      const res = await loginCmsFn({ data: { email, password } });
      if (res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(TOKEN_KEY, res.token);
        }
        return { success: true };
      }
      return { success: false, error: res.error || "Authentication failed." };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Connection error during login.";
      return { success: false, error: message };
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

  return (
    <CmsAuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isSuperAdmin: user?.role === "Super Admin",
        isAuthenticated: !!user,
        isLoading,
        token,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </CmsAuthContext.Provider>
  );
}

export function useCmsAuth() {
  const context = useContext(CmsAuthContext);
  if (!context) {
    throw new Error("useCmsAuth must be used within a CmsAuthProvider");
  }
  return context;
}
