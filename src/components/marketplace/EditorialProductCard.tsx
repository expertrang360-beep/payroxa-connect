import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Plus, Heart, Eye } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import type { PayroxaProduct } from "@/services/payroxa-public-api/types";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductQuickViewModal } from "@/components/marketplace/ProductQuickViewModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          : "bg-white/80 text-market-muted hover:text-market-ink hover:bg-white",
      )}
      title={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
      aria-label={favorited ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart className={cn("size-4", favorited && "fill-current")} />
    </button>
  );

  if (viewMode === "list") {
    return (
      <>
        <article className="group grid gap-5 border-b border-market-line py-6 sm:grid-cols-[180px_1fr_auto] sm:items-center">
          <div
            onClick={() => setIsModalOpen(true)}
            className="block aspect-[4/3] overflow-hidden bg-market-lilac relative cursor-pointer group/img"
          >
            <img
              src={image}
              alt={product.images?.[0]?.alt || product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-105 motion-reduce:transition-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 text-market-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-medium flex items-center gap-1.5">
                <Eye className="size-3.5" /> Quick View
              </span>
            </div>
            {renderWishlistBtn("absolute top-2 right-2")}
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-[0.68rem] font-bold uppercase text-primary">
              {product.category?.name || "Marketplace"}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-left font-market-display text-xl font-medium hover:underline cursor-pointer block"
            >
              {product.name}
            </button>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm text-market-muted">
              {product.description}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-market-muted">
              {product.vendor?.verified && <CheckCircle2 className="size-3.5 text-primary" />}
              {product.vendor?.name}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
            <p className="font-market-display text-lg font-semibold">
              {product.currency} {product.price.toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-market-line hover:bg-market-lilac/50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="size-3.5" /> Quick View
              </button>
              <PayroxaButton variant="secondary" size="sm" onClick={() => onAdd(product)}>
                <Plus className="size-4" /> Add to bag
              </PayroxaButton>
            </div>
          </div>
        </article>
        <ProductQuickViewModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <article className="group min-w-0">
        <div
          onClick={() => setIsModalOpen(true)}
          className={`relative mb-5 block overflow-hidden bg-market-lilac cursor-pointer group/img ${
            viewMode === "dense" ? "aspect-square" : "aspect-[3/4]"
          }`}
        >
          <img
            src={image}
            alt={product.images?.[0]?.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105 motion-reduce:transition-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 text-market-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-medium flex items-center gap-1.5">
              <Eye className="size-3.5" /> Quick View
            </span>
          </div>
          {label && (
            <span className="absolute left-3 top-3 bg-market-paper px-3 py-1 text-[0.62rem] font-bold uppercase text-market-ink">
              {label}
            </span>
          )}
          {renderWishlistBtn("absolute top-3 right-3")}
          <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none z-10">
            <PayroxaButton
              variant="secondary"
              size="sm"
              className="w-full rounded-none"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onAdd(product);
              }}
            >
              <Plus className="size-4" /> Add to bag
            </PayroxaButton>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-1 truncate text-[0.65rem] font-bold uppercase text-primary">
              {product.vendor?.name || product.category?.name}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-left cursor-pointer block"
            >
              <h3 className="font-market-display line-clamp-2 text-base font-medium leading-tight hover:underline">
                {product.name}
              </h3>
            </button>
          </div>
          <p className="shrink-0 text-sm font-semibold">
            {product.currency} {product.price.toLocaleString()}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-market-muted">
          <p className="flex items-center gap-1">
            {product.vendor?.verified && <CheckCircle2 className="size-3 text-primary" />}
            {product.category?.name}
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </article>
      <ProductQuickViewModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
