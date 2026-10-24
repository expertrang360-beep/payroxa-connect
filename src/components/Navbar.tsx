import { Link } from "@tanstack/react-router";
import { Menu, X, PanelLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import PayroxaButton from "@/components/PayroxaButton";
import { PAYROXA_LINKS } from "@/config/links";
import { usePublicCms } from "@/cms/context/PublicCmsContext";
import { useSidebarNav } from "@/context/SidebarNavContext";

const fallbackNavItems = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/payments", label: "Payments" },
  { to: "/store", label: "Store" },
  { to: "/cards", label: "Cards" },
  { to: "/business", label: "Business" },
  { to: "/resources", label: "Resources" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { toggle: toggleSidebar, open: openSidebar } = useSidebarNav();
  const { navigation, links } = usePublicCms();

  const rawNav =
    navigation && navigation.length > 0
      ? navigation.filter((n) => n.enabled)
      : fallbackNavItems.map((item, idx) => ({
          id: `fb_${idx}`,
          label: item.label,
          url: item.to,
          type: "internal" as const,
          displayOrder: idx + 1,
          enabled: true,
          section: "header" as const,
        }));

  const activeNav = rawNav.some((item) => item.url === "/marketplace")
    ? rawNav
    : [
        {
          id: "nav-mkt",
          label: "Marketplace",
          url: "/marketplace",
          type: "internal" as const,
          displayOrder: 2,
          enabled: true,
          section: "header" as const,
        },
        ...rawNav,
      ];

  const loginUrl = links?.login || PAYROXA_LINKS.login;
  const registerUrl = links?.register || PAYROXA_LINKS.register;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleSidebar}
            title="Open services & financial modules sidebar (Ctrl+B)"
            aria-label="Open services & financial modules sidebar"
            className="flex size-9 items-center justify-center rounded-xl border border-border/80 bg-background/50 text-foreground transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <PanelLeft className="size-4" />
          </button>
          <BrandLogo />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {activeNav.map((item) =>
            item.url.startsWith("http") ? (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.url}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-accent text-accent-foreground" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PayroxaButton href={loginUrl} variant="outline" size="sm">
            Sign In
          </PayroxaButton>
          <PayroxaButton href={registerUrl} size="sm">
            Get Started
          </PayroxaButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSidebar();
              }}
              className="flex w-full items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <div className="flex items-center gap-2">
                <PanelLeft className="size-4" />
                <span>All Financial & Business Services</span>
              </div>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {activeNav.map((item) =>
              item.url.startsWith("http") ? (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.id}
                  to={item.url}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <PayroxaButton href={loginUrl} variant="outline">
              Sign In
            </PayroxaButton>
            <PayroxaButton href={registerUrl}>Get Started</PayroxaButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
