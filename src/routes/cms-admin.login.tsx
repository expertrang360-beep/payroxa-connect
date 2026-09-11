import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useCmsAuth, CmsAuthProvider } from "@/cms/context/CmsAuthContext";

import { APP_URL } from "@/config/siteConfig";

export const Route = createFileRoute("/cms-admin/login")({
  component: CmsLoginWrapper,
});

function CmsLoginWrapper() {
  return <CmsLoginPage />;
}

function CmsLoginPage() {
  const { login, isAuthenticated } = useCmsAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/cms-admin" });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate({ to: "/cms-admin" });
      } else {
        setError(
          `Authentication failed. If you are a standard user, please login via the User Portal at ${APP_URL.replace(/^https?:\/\//, "")}`,
        );
      }
    } catch {
      setError("An unexpected error occurred while connecting to the CMS server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12 selection:bg-purple-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-indigo-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7928CA] to-[#9b51e0] text-2xl font-bold text-white shadow-lg shadow-purple-500/25">
            P
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex flex-col gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs">
              <div className="flex items-start gap-3 text-rose-300">
                <AlertCircle className="size-4 shrink-0 text-rose-400" />
                <div className="flex-1">{error}</div>
              </div>
              {error.includes(APP_URL.replace(/^https?:\/\//, "")) && (
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-lg bg-rose-500/20 px-3 py-1.5 font-bold text-rose-200 transition-colors hover:bg-rose-500/30"
                >
                  Go to User Portal
                  <ArrowRight className="size-3" />
                </a>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="cms-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  id="cms-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@payroxa.com.ng"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-purple-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cms-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  id="cms-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 transition-all focus:border-purple-500 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-500/40 disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Continue to Dashboard</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Payroxa Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
