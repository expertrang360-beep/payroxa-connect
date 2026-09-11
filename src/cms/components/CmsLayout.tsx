import React, { useState } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Package,
  Briefcase,
  HelpCircle,
  MessageSquareQuote,
  Image as ImageIcon,
  Compass,
  Megaphone,
  Search,
  Settings,
  Link2,
  Share2,
  Users,
  Activity,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  Layers,
  CheckCircle2,
  BookOpen,
  ShoppingBag,
} from "lucide-react";
import { useCmsAuth } from "../context/CmsAuthContext";

interface CmsLayoutProps {
  children: React.ReactNode;
}

export function CmsLayout({ children }: CmsLayoutProps) {
  const { user, role, isSuperAdmin, logout, isAuthenticated, isLoading } = useCmsAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && currentPath !== "/cms-admin/login") {
      navigate({ to: "/cms-admin/login" });
    }
  }, [isLoading, isAuthenticated, currentPath, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading Payroxa CMS...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && currentPath !== "/cms-admin/login") {
    return null;
  }

  // Do not show the navigation layout on the login page
  if (currentPath === "/cms-admin/login") {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  const navGroups = [
    {
      title: "Overview",
      items: [{ label: "Dashboard", href: "/cms-admin", icon: LayoutDashboard, exact: true }],
    },
    {
      title: "Content Studio",
      items: [
        { label: "All Pages", href: "/cms-admin/pages", icon: Layers },
        { label: "Blog & Resources", href: "/cms-admin/blog", icon: BookOpen },
        { label: "Hero Section", href: "/cms-admin/hero", icon: Sparkles },
        { label: "Products", href: "/cms-admin/products", icon: Package },
        { label: "Marketplace API", href: "/cms-admin/marketplace", icon: ShoppingBag },
        { label: "Business Types", href: "/cms-admin/business", icon: Briefcase },
        { label: "Content Sections", href: "/cms-admin/content", icon: FileText },
        { label: "Announcements", href: "/cms-admin/announcements", icon: Megaphone },
      ],
    },
    {
      title: "Engagement & Media",
      items: [
        { label: "FAQs", href: "/cms-admin/faq", icon: HelpCircle },
        { label: "Testimonials", href: "/cms-admin/testimonials", icon: MessageSquareQuote },
        { label: "Media Library", href: "/cms-admin/media", icon: ImageIcon },
        { label: "Navigation Links", href: "/cms-admin/navigation", icon: Compass },
      ],
    },
    {
      title: "SEO & Growth Engine",
      items: [{ label: "SEO & Redirects Suite", href: "/cms-admin/seo", icon: Search }],
    },
    {
      title: "Settings & System",
      items: [
        { label: "General Settings", href: "/cms-admin/settings", icon: Settings, exact: true },
        { label: "Application Links", href: "/cms-admin/settings/links", icon: Link2 },
        { label: "Social Media", href: "/cms-admin/settings/social", icon: Share2 },
        { label: "Team Access", href: "/cms-admin/settings/admins", icon: Users },
        { label: "Activity Audit Log", href: "/cms-admin/activity", icon: Activity },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <Link to="/cms-admin" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7928CA] to-[#9b51e0] text-lg font-bold text-white shadow-sm">
              P
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900">Payroxa</span>
              </div>
              <p className="text-[11px] text-slate-500">Platform Overview</p>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Group Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                {group.title}
              </p>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item) => {
                  const isActive = item.exact
                    ? currentPath === item.href
                    : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-purple-50 text-purple-700 font-semibold shadow-2xs"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`size-4 transition-colors ${
                            isActive
                              ? "text-purple-600"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="size-3.5 text-purple-500" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card & Logout */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {user?.name || "Member"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.2 text-[10px] font-medium ${
                      isSuperAdmin ? "bg-purple-100 text-purple-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {role || "Editor"}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-600 hover:shadow-xs transition-colors"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span>Website Management</span>
              <span>/</span>
              <span className="font-semibold text-slate-800 capitalize">
                {currentPath === "/cms-admin"
                  ? "Dashboard"
                  : currentPath.replace("/cms-admin/", "").replace("/", " • ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
            <div className="hidden md:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Live</span>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
