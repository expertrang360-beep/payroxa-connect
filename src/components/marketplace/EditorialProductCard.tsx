import { Link } from "@tanstack/react-router";
import { CheckCircle2, Heart, ShoppingCart } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import type { PayroxaProduct } from "@/services/payroxa-public-api/types";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface EditorialProductCardProps {
  product: PayroxaProduct;
  index: number;
  viewMode: "grid" | "dense" | "list";
  onAdd: (product: PayroxaProduct) => void;
}

/** Dense, Jumia-style retail card: white tile, discount badge, bold price, add-to-cart. */
export function EditorialProductCard({ product, viewMode, onAdd }: EditorialProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const favorited = isWishlisted(product.id);
  const extra = product as PayroxaProduct & { compareAtPrice?: number; rating?: number; reviewCount?: number };
  const image = product.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85";
  const oldPrice = typeof extra.compareAtPrice === "number" && extra.compareAtPrice > product.price ? extra.compareAtPrice : null;
  const discount = oldPrice ? Math.round(((oldPrice - product.price) / oldPrice) * 100) : null;
  const price = `${product.currency} ${product.price.toLocaleString()}`;

  const wishlist = (
    <PayroxaButton variant="text" ariaLabel={favorited ? "Remove from saved items" : "Save item"}
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
      aria-label={favorited ? "Remove from saved items" : "Save item"}
      className={cn("absolute right-2 top-2 z-10 grid size-10 place-items-center rounded-full bg-card p-0 shadow-soft transition", favorited ? "text-primary" : "text-market-muted hover:text-primary")}
    >
      <Heart className={cn("size-4", favorited && "fill-current")} />
    </PayroxaButton>
  );

  if (viewMode === "list") {
    return (
      <article className="group grid grid-cols-[96px_minmax(0,1fr)] gap-3 rounded-sm bg-card p-3 shadow-soft sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:items-center">
        <Link to="/marketplace/product/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden rounded-sm bg-muted">
          <img src={image} alt={product.images?.[0]?.alt || product.name} loading="lazy" className="h-full w-full object-cover" />
          {discount && <span className="absolute left-1 top-1 rounded-sm bg-accent px-1.5 py-0.5 text-[11px] font-bold text-primary">-{discount}%</span>}
        </Link>
        <div className="min-w-0">
          <Link to="/marketplace/product/$slug" params={{ slug: product.slug }}><h3 className="line-clamp-2 text-sm text-market-ink group-hover:text-primary">{product.name}</h3></Link>
          <p className="mt-1 text-base font-bold">{price}</p>
          {oldPrice && <p className="text-xs text-market-muted line-through">{product.currency} {oldPrice.toLocaleString()}</p>}
          <p className="mt-1 flex items-center gap-1 truncate text-xs text-market-muted">{product.vendor?.verified && <CheckCircle2 className="size-3 shrink-0 text-primary" />}{product.vendor?.name}</p>
        </div>
        <PayroxaButton size="sm" onClick={() => onAdd(product)} className="col-span-2 h-10 rounded-sm sm:col-span-1"><ShoppingCart className="size-4" /> Add to cart</PayroxaButton>
      </article>
    );
  }

  return (
    <article className="group relative flex min-w-0 flex-col rounded-sm bg-card p-2 transition hover:z-10 hover:shadow-card">
      <Link to="/marketplace/product/$slug" params={{ slug: product.slug }} className="relative block aspect-square overflow-hidden rounded-sm bg-muted">
        <img src={image} alt={product.images?.[0]?.alt || product.name} loading="lazy" className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none" />
        {discount && <span className="absolute left-1.5 top-1.5 rounded-sm bg-accent px-1.5 py-0.5 text-[11px] font-bold text-primary">-{discount}%</span>}
      </Link>
      {wishlist}
      <div className="flex flex-1 flex-col px-0.5 pt-2">
        <Link to="/marketplace/product/$slug" params={{ slug: product.slug }}>
          <h3 className={cn("line-clamp-2 text-market-ink hover:text-primary", viewMode === "dense" ? "text-xs" : "text-[13px] leading-snug sm:text-sm")}>{product.name}</h3>
        </Link>
        <p className={cn("mt-1 font-bold", viewMode === "dense" ? "text-sm" : "text-base")}>{price}</p>
        {oldPrice && <p className="text-xs text-market-muted line-through">{product.currency} {oldPrice.toLocaleString()}</p>}
        {product.vendor?.verified && <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-primary"><CheckCircle2 className="size-3" /> Verified store</p>}
        <PayroxaButton size="sm" onClick={() => onAdd(product)} className="mt-auto h-11 w-full rounded-sm text-xs shadow-none sm:opacity-0 sm:transition sm:group-hover:opacity-100 sm:focus-visible:opacity-100">
          <ShoppingCart className="size-3.5" /> Add to cart
        </PayroxaButton>
      </div>
    </article>
  );
}

export default EditorialProductCard;
