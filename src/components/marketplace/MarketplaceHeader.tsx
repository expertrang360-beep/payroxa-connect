import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Search, ShoppingBag, UserRound } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import { PAYROXA_LINKS } from "@/config/siteConfig";
import { useCart } from "@/hooks/useCart";
import { MarketplaceCart } from "./MarketplaceCart";

export function MarketplaceHeader() {
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  return <>
    <header className="sticky top-0 z-40 border-b border-market-line bg-card shadow-soft">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
        <Link to="/marketplace" className="shrink-0 font-market-display text-2xl font-bold">Payroxa<span className="text-primary">.</span></Link>
        <form className="order-3 flex w-full min-w-0 gap-2 sm:order-none sm:ml-5 sm:w-auto sm:flex-1" onSubmit={(event) => { event.preventDefault(); navigate({ to: "/marketplace", search: { q: query.trim() } }); }}>
          <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-3.5 size-4 text-market-muted" /><input aria-label="Search marketplace" placeholder="Search products, brands and categories" value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 w-full rounded-sm border border-market-line bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" /></div>
          <PayroxaButton type="submit" className="rounded-sm px-3 shadow-none">Search</PayroxaButton>
        </form>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <PayroxaButton href={PAYROXA_LINKS.login} variant="text" ariaLabel="Sign in to Payroxa" className="h-11 gap-2 px-2 text-market-ink"><UserRound className="size-5" /><span className="hidden md:inline">Account</span></PayroxaButton>
          <PayroxaButton variant="text" ariaLabel={`Open bag with ${totalCount} items`} onClick={() => setCartOpen(true)} className="relative h-11 px-2 text-market-ink"><ShoppingBag className="size-5" /><span className="hidden md:inline">Cart</span>{totalCount > 0 && <span className="absolute -right-1 top-0 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-xs text-primary-foreground">{totalCount}</span>}</PayroxaButton>
        </div>
      </div>
    </header>
    <MarketplaceCart open={cartOpen} onClose={() => setCartOpen(false)} />
  </>;
}

export function MarketplaceBreadcrumb({ current }: { current: string }) {
  return <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1200px] items-center gap-2 px-3 py-4 text-xs text-market-muted sm:px-4"><Link to="/marketplace" className="flex shrink-0 items-center gap-1 hover:text-primary"><ArrowLeft className="size-3.5" /> Marketplace</Link><span aria-hidden="true">/</span><span className="truncate">{current}</span></nav>;
}