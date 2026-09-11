import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import PayroxaButton from "@/components/PayroxaButton";
import { PAYROXA_LINKS } from "@/config/links";

const navItems = [
  { to: "/payments", label: "Payments" },
  { to: "/store", label: "Store" },
  { to: "/cards", label: "Cards" },
  { to: "/business", label: "Business" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <BrandLogo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PayroxaButton href={PAYROXA_LINKS.login} variant="outline" size="sm">
            Sign In
          </PayroxaButton>
          <PayroxaButton href={PAYROXA_LINKS.register} size="sm">
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
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
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
            <PayroxaButton href={PAYROXA_LINKS.login} variant="outline">
              Sign In
            </PayroxaButton>
            <PayroxaButton href={PAYROXA_LINKS.register}>Get Started</PayroxaButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
