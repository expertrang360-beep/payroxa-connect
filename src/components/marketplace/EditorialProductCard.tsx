import { Link } from "@tanstack/react-router";
import { CheckCircle2, Plus, Heart } from "lucide-react";
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

export function EditorialProductCard({
  product,
  index,
  viewMode,
  onAdd,
}: EditorialProductCardProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const favorited = isWishlisted(product.id);

  const image =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85";
  const label = product.isFeatured ? "Editor's pick" : index % 4 === 0 ? "New arrival" : null;

  const renderWishlistBtn = (posClass = "absolute top-3 right-3") => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
      }}
      className={cn(
        "z-20 p-2 rounded-full backdrop-blur-md transition-all shadow-soft cursor-pointer",
        posClass,
        favorited
          ? "bg-red-500 text-white shadow-md scale-105"
          : "bg-white/80 text-market-muted hover:text-market-ink hover:bg-white"
      )}
      title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
      aria-label={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart className={cn("size-4", favorited && "fill-current")} />
    </button>
  );

  if (viewMode === "list") {
    return (
      <article className="group grid gap-5 border-b border-market-line py-6 sm:grid-cols-[180px_1fr_auto] sm:items-center">
        <Link
          to="/marketplace/product/$slug"
          params={{ slug: product.slug }}
          className="block aspect-[4/3] overflow-hidden bg-market-lilac relative"
        >
          <img
            src={image}
            alt={product.images?.[0]?.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            loading="lazy"
          />
          {renderWishlistBtn("absolute top-2 right-2")}
        </Link>
        <div className="min-w-0">
          <p className="mb-2 text-[0.68rem] font-bold uppercase text-primary">
            {product.category?.name || "Marketplace"}
          </p>
          <Link to="/marketplace/product/$slug" params={{ slug: product.slug }}>
            <h3 className="font-market-display text-xl font-medium group-hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 max-w-xl text-sm text-market-muted">{product.description}</p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-market-muted">
            {product.vendor?.verified && <CheckCircle2 className="size-3.5 text-primary" />}
            {product.vendor?.name}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <p className="font-market-display text-lg font-semibold">
            {product.currency} {product.price.toLocaleString()}
          </p>
          <PayroxaButton variant="secondary" size="sm" onClick={() => onAdd(product)}>
            <Plus className="size-4" /> Add to bag
          </PayroxaButton>
        </div>
      </article>
    );
  }

  return (
    <article className="group min-w-0">
      <Link
        to="/marketplace/product/$slug"
        params={{ slug: product.slug }}
        className={`relative mb-5 block overflow-hidden bg-market-lilac ${
          viewMode === "dense" ? "aspect-square" : "aspect-[3/4]"
        }`}
      >
        <img
          src={image}
          alt={product.images?.[0]?.alt || product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          loading="lazy"
        />
        {label && (
          <span className="absolute left-3 top-3 bg-market-paper px-3 py-1 text-[0.62rem] font-bold uppercase text-market-ink">
            {label}
          </span>
        )}
        {renderWishlistBtn("absolute top-3 right-3")}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
          <PayroxaButton
            variant="secondary"
            size="sm"
            className="w-full rounded-none"
            onClick={(event) => {
              event.preventDefault();
              onAdd(product);
            }}
          >
            <Plus className="size-4" /> Add to bag
          </PayroxaButton>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="mb-1 truncate text-[0.65rem] font-bold uppercase text-primary">
            {product.vendor?.name || product.category?.name}
          </p>
          <Link to="/marketplace/product/$slug" params={{ slug: product.slug }}>
            <h3 className="font-market-display line-clamp-2 text-base font-medium leading-tight group-hover:underline">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="shrink-0 text-sm font-semibold">
          {product.currency} {product.price.toLocaleString()}
        </p>
      </div>
      <p className="mt-2 flex items-center gap-1 text-xs text-market-muted">
        {product.vendor?.verified && <CheckCircle2 className="size-3 text-primary" />}
        {product.category?.name}
      </p>
    </article>
  );
}