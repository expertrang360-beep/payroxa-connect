import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ExternalLink, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PayroxaProduct } from "@/services/payroxa-api";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional small label shown above the feature title. */
  badge?: string;
  className?: string;
  product?: never;
}

interface ProductItemCardProps {
  product: PayroxaProduct;
  viewMode?: "grid" | "dense" | "list" | "showcase";
  className?: string;
  icon?: never;
  title?: never;
  description?: never;
}

export type ProductCardProps = FeatureCardProps | ProductItemCardProps;

export function ProductCard(props: ProductCardProps) {
  if (props.product) {
    const { product, viewMode = "grid", className } = props;
    const imageUrl =
      product.images && product.images[0]?.url
        ? product.images[0].url
        : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";

    if (viewMode === "list") {
      return (
        <article
          className={cn(
            "group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 w-full",
            className,
          )}
        >
          <div className="sm:w-56 aspect-[4/3] sm:aspect-auto shrink-0 overflow-hidden bg-muted relative">
            <img
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft sm:hidden">
              {product.currency} {product.price.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span className="font-medium text-primary">
                  {product.category?.name || "Marketplace"}
                </span>
                {product.vendor && (
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="size-3.5" /> {product.vendor.name}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
              <div className="text-base font-extrabold text-foreground">
                {product.currency} {product.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/marketplace/product/$slug"
                  params={{ slug: product.slug }}
                  className="rounded-xl border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-1"
                >
                  Details <ArrowRight className="size-3" />
                </Link>
                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all flex items-center gap-1"
                >
                  Buy <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </article>
      );
    }

    if (viewMode === "showcase") {
      return (
        <article
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full",
            className,
          )}
        >
          <div className="aspect-[16/10] w-full overflow-hidden bg-muted relative">
            <img
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1.5 text-sm font-extrabold text-foreground shadow-medium">
              {product.currency} {product.price.toLocaleString()}
            </div>
            {product.isFeatured && (
              <div className="absolute top-4 right-4 rounded-full bg-amber-500/90 text-white backdrop-blur-md px-3 py-1 text-xs font-bold shadow-soft">
                Featured Item
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="font-semibold text-primary">{product.category?.name}</span>
                {product.vendor && (
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="size-4" /> {product.vendor.name}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60">
              <Link
                to="/marketplace/product/$slug"
                params={{ slug: product.slug }}
                className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline"
              >
                View Full Details <ArrowRight className="size-3.5" />
              </Link>
              <a
                href={product.appUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all flex items-center gap-1.5"
              >
                Buy Now <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </article>
      );
    }

    if (viewMode === "dense") {
      return (
        <article
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 h-full",
            className,
          )}
        >
          <div className="aspect-square w-full overflow-hidden bg-muted relative">
            <img
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 rounded-md bg-background/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-foreground shadow-soft">
              {product.currency} {product.price.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <p className="text-[10px] text-muted-foreground truncate">{product.category?.name}</p>
              <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 mt-0.5">
                {product.name}
              </h3>
            </div>
            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border/50">
              <Link
                to="/marketplace/product/$slug"
                params={{ slug: product.slug }}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                Details
              </Link>
              <a
                href={product.appUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground hover:bg-primary/90"
              >
                Buy
              </a>
            </div>
          </div>
        </article>
      );
    }

    return (
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full",
          className,
        )}
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
          <img
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft">
            {product.currency} {product.price.toLocaleString()}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{product.category?.name || "Marketplace"}</span>
              {product.vendor && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="size-3.5" /> {product.vendor.name}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60">
            <Link
              to="/marketplace/product/$slug"
              params={{ slug: product.slug }}
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              View Details <ArrowRight className="size-3.5" />
            </Link>
            <a
              href={product.appUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-1"
            >
              Buy <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  const { icon: Icon, title, description, badge, className } = props;
  return (
    <article
      className={cn(
        "surface-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        className,
      )}
    >
      {Icon && (
        <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      )}
      {badge ? (
        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
          {badge}
        </p>
      ) : null}
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export default ProductCard;
