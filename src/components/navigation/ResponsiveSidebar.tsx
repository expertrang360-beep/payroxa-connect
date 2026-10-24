import React, { useState, useMemo } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Wallet,
  CreditCard,
  ArrowLeftRight,
  Store,
  ShoppingBag,
  Link2,
  Receipt,
  Terminal,
  Briefcase,
  Truck,
  Car,
  LayoutDashboard,
  LogIn,
  UserPlus,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  ExternalLink,
  ShieldCheck,
  PanelLeftClose,
  Sparkles,
} from "lucide-react";

import BrandLogo from "@/components/BrandLogo";
import { PAYROXA_LINKS, type PayroxaLinkKey } from "@/config/links";
import { usePublicCms } from "@/cms/context/PublicCmsContext";
import { useSidebarNav } from "@/context/SidebarNavContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface NavSectionItem {
  id: string;
  label: string;
  description: string;
  tag?: string;
  icon: React.ElementType;
  envKey?: string;
  linkKey?: PayroxaLinkKey;
  defaultUrl: string;
  external?: boolean;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavSectionItem[];
}

export const SIDEBAR_NAV_SECTIONS: NavSection[] = [
  {
    id: "finance",
    title: "Financial Services",
    items: [
      {
        id: "wallet",
        label: "Wallet",
        description: "Multi-currency digital business balances & real-time FX",
        tag: "NGN · USD",
        icon: Wallet,
        envKey: "VITE_PAYROXA_WALLET_URL",
        linkKey: "wallet",
        defaultUrl: "/wallet",
      },
      {
        id: "payments",
        label: "Payments",
        description: "Accept seamless omni-channel customer settlements",
        tag: "Checkout",
        icon: CreditCard,
        envKey: "VITE_PAYROXA_PAYMENTS_URL",
        linkKey: "payments",
        defaultUrl: "/payments",
      },
      {
        id: "transfers",
        label: "Transfers",
        description: "Instant single & bulk payouts to any Nigerian bank",
        tag: "Instant Payouts",
        icon: ArrowLeftRight,
        envKey: "VITE_PAYROXA_TRANSFERS_URL",
        linkKey: "transfers",
        defaultUrl: "/transfers",
      },
      {
        id: "cards",
        label: "Cards",
        description: "Virtual and physical corporate spending cards",
        tag: "Visa · Verve",
        icon: ShieldCheck,
        envKey: "VITE_PAYROXA_CARDS_URL",
        linkKey: "cards",
        defaultUrl: "/cards",
      },
    ],
  },
  {
    id: "commerce",
    title: "Commerce & Sales",
    items: [
      {
        id: "store",
        label: "Merchant Store",
        description: "Launch an online store with checkout in under 5 minutes",
        tag: "Storefront",
        icon: Store,
        envKey: "VITE_PAYROXA_STORE_URL",
        linkKey: "store",
        defaultUrl: "/store",
      },
      {
        id: "marketplace",
        label: "Marketplace",
        description: "Discover curated African products, vendors, and services",
        tag: "Live Directory",
        icon: ShoppingBag,
        envKey: "VITE_PAYROXA_MARKETPLACE_URL",
        linkKey: "marketplace",
        defaultUrl: "/marketplace",
      },
      {
        id: "payment-links",
        label: "Payment Links",
        description: "Generate instant shareable checkout links for social media",
        tag: "No-Code",
        icon: Link2,
        envKey: "VITE_PAYROXA_PAYMENT_LINKS_URL",
        linkKey: "paymentLinks",
        defaultUrl: "/payment-links",
      },
      {
        id: "payment-requests",
        label: "Payment Requests",
        description: "Send automated invoice requests and get paid promptly",
        tag: "Invoicing",
        icon: Receipt,
        envKey: "VITE_PAYROXA_PAYMENT_REQUESTS_URL",
        linkKey: "paymentRequests",
        defaultUrl: "/payment-requests",
      },
      {
        id: "payment-gateway",
        label: "Payment Gateway",
        description: "Developer REST APIs and drop-in checkout SDKs",
        tag: "Developer API",
        icon: Terminal,
        envKey: "VITE_PAYROXA_PAYMENT_GATEWAY_URL",
        linkKey: "paymentGateway",
        defaultUrl: "/payment-gateway",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations & Mobility",
    items: [
      {
        id: "business",
        label: "Business Suite",
        description: "Operating system and management portal for enterprises",
        tag: "Operations",
        icon: Briefcase,
        envKey: "VITE_PAYROXA_BUSINESS_URL",
        linkKey: "business",
        defaultUrl: "/business",
      },
      {
        id: "delivery",
        label: "Delivery & Logistics",
        description: "On-demand parcel dispatch and order delivery tracking",
        tag: "Logistics",
        icon: Truck,
        envKey: "VITE_PAYROXA_DELIVERY_URL",
        linkKey: "delivery",
        defaultUrl: "/resources",
      },
      {
        id: "ride",
        label: "Ride & Mobility",
        description: "Integrated transit payments and driver settlement system",
        tag: "Mobility",
        icon: Car,
        envKey: "VITE_PAYROXA_RIDE_URL",
        linkKey: "ride",
        defaultUrl: "/resources",
      },
    ],
  },
  {
    id: "portal",
    title: "Portals & Access",
    items: [
      {
        id: "app-portal",
        label: "Application Portal",
        description: "Unified Payroxa web management console",
        tag: "Main Console",
        icon: LayoutDashboard,
        envKey: "VITE_PAYROXA_APP_URL",
        linkKey: "app",
        defaultUrl: PAYROXA_LINKS.app,
        external: true,
      },
      {
        id: "sign-in",
        label: "Sign In",
        description: "Access your Payroxa account",
        icon: LogIn,
        envKey: "VITE_PAYROXA_LOGIN_URL",
        linkKey: "login",
        defaultUrl: PAYROXA_LINKS.login,
        external: true,
      },
      {
        id: "register",
        label: "Open Account",
        description: "Register a verified business account in minutes",
        tag: "Free Sign-up",
        icon: UserPlus,
        envKey: "VITE_PAYROXA_REGISTER_URL",
        linkKey: "register",
        defaultUrl: PAYROXA_LINKS.register,
        external: true,
      },
    ],
  },
];

export function ResponsiveSidebar() {
  const { isOpen, close, isCollapsed, toggleCollapsed } = useSidebarNav();
  const { links: cmsLinks } = usePublicCms();
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /**
   * Resolves target destination for a given item:
   * 1. Check CMS dynamic link overrides
   * 2. Check PAYROXA_LINKS configured from .env
   * 3. Fallback to default internal route
   */
  const resolveItemUrl = (item: NavSectionItem): { url: string; isExternal: boolean } => {
    let target = item.defaultUrl;

    if (item.linkKey) {
      const cmsValue = cmsLinks?.[item.linkKey as keyof typeof cmsLinks];
      if (cmsValue && typeof cmsValue === "string" && cmsValue.trim().length > 0) {
        target = cmsValue.trim();
      } else if (PAYROXA_LINKS[item.linkKey]) {
        target = PAYROXA_LINKS[item.linkKey];
      }
    }

    const isExternal =
      item.external ||
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      (target.startsWith("http") && !target.includes(window.location.host));

    return { url: target, isExternal };
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SIDEBAR_NAV_SECTIONS;
    const query = searchQuery.toLowerCase().trim();

    return SIDEBAR_NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          (item.tag && item.tag.toLowerCase().includes(query)) ||
          section.title.toLowerCase().includes(query),
      ),
    })).filter((section) => section.items.length > 0);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop for mobile & desktop drawer mode */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              close();
            }
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in cursor-pointer"
        />

        {/* Responsive Sidebar Panel */}
        <aside
          aria-label="Payroxa Application Navigation"
          className={`relative z-10 flex h-full flex-col border-r border-border/80 bg-background text-foreground shadow-2xl transition-all duration-300 ease-out animate-in slide-in-from-left ${
            isCollapsed ? "w-20" : "w-80 sm:w-88"
          }`}
        >
          {/* Header Zone */}
          <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
            {!isCollapsed ? (
              <div className="flex items-center gap-2 overflow-hidden">
                <BrandLogo />
              </div>
            ) : (
              <div className="mx-auto flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                P
              </div>
            )}

            <div className="flex items-center gap-1">
              {/* Collapse/Expand Toggle (Desktop only) */}
              <button
                type="button"
                onClick={toggleCollapsed}
                title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
              >
                {isCollapsed ? (
                  <ChevronRight className="size-4" />
                ) : (
                  <PanelLeftClose className="size-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={close}
                title="Close sidebar navigation (Esc)"
                aria-label="Close sidebar navigation"
                className="flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Quick Search Bar (when expanded) */}
          {!isCollapsed && (
            <div className="border-b border-border/60 p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Quick find service or link..."
                  className="w-full rounded-xl border border-input bg-muted/40 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Nav Sections Scroll Container */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {filteredSections.map((section) => (
              <div key={section.id} className="space-y-1">
                {!isCollapsed && (
                  <p className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {section.title}
                  </p>
                )}

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const { url, isExternal } = resolveItemUrl(item);
                    const isActive =
                      !isExternal &&
                      (pathname === url || (url !== "/" && pathname.startsWith(`${url}/`)));
                    const Icon = item.icon;

                    const itemContent = (
                      <div
                        className={`group flex items-center gap-3 rounded-xl transition-all ${
                          isCollapsed
                            ? "justify-center p-2.5"
                            : "justify-between px-3 py-2.5 text-sm"
                        } ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold shadow-2xs"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-xs"
                                : "bg-muted text-foreground/80 group-hover:bg-primary/15 group-hover:text-primary"
                            }`}
                          >
                            <Icon className="size-4" />
                          </span>

                          {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate font-medium text-foreground">
                                  {item.label}
                                </span>
                                {item.tag && (
                                  <span className="text-[10px] text-muted-foreground/80 font-normal">
                                    · {item.tag}
                                  </span>
                                )}
                              </div>
                              <p className="truncate text-[11px] text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>

                        {!isCollapsed && (
                          <div className="shrink-0 pl-1 text-muted-foreground group-hover:text-foreground">
                            {isExternal ? (
                              <ExternalLink className="size-3.5 opacity-60 group-hover:opacity-100" />
                            ) : (
                              <ChevronRight className="size-3.5 opacity-40 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5" />
                            )}
                          </div>
                        )}
                      </div>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.id}>
                          <TooltipTrigger asChild>
                            {isExternal ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={close}
                                className="block"
                                aria-label={item.label}
                              >
                                {itemContent}
                              </a>
                            ) : (
                              <Link
                                to={url}
                                onClick={close}
                                className="block"
                                aria-label={item.label}
                              >
                                {itemContent}
                              </Link>
                            )}
                          </TooltipTrigger>
                          <TooltipContent side="right" align="center" className="max-w-xs">
                            <p className="font-semibold">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return isExternal ? (
                      <a
                        key={item.id}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={close}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <Link
                        key={item.id}
                        to={url}
                        onClick={close}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                      >
                        {itemContent}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredSections.length === 0 && (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No matching navigation items found.
              </div>
            )}
          </div>

          {/* Footer Quick Action Zone */}
          <div className="border-t border-border/60 bg-muted/20 p-3">
            {!isCollapsed ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>Payroxa Network</span>
                  <span className="font-mono text-[10px]">v1.0.0</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PAYROXA_LINKS.login}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 items-center justify-center rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <LogIn className="mr-1.5 size-3.5" />
                    <span>Sign In</span>
                  </a>
                  <a
                    href={PAYROXA_LINKS.register}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 items-center justify-center rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                  >
                    <Sparkles className="mr-1.5 size-3.5" />
                    <span>Register</span>
                  </a>
                </div>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={PAYROXA_LINKS.register}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 mx-auto items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
                    aria-label="Register"
                  >
                    <Sparkles className="size-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">Open Free Account</TooltipContent>
              </Tooltip>
            )}
          </div>
        </aside>
      </div>
    </TooltipProvider>
  );
}

export default ResponsiveSidebar;
