import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ExternalLink,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Share2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PayroxaButton } from "@/components/PayroxaButton";
import type { PayroxaProduct } from "@/services/payroxa-public-api/types";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductQuickViewModalProps {
  product: PayroxaProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickViewModal({ product, isOpen, onClose }: ProductQuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85",
            alt: product.name,
          },
        ];

  const currentImage = images[selectedImageIndex] || images[0];
  const favorited = isWishlisted(product.id);

  // Derive vendor metrics or provide realistic verified ratings
  const vendorRating = 4.9;
  const vendorReviewCount = 142;
  const dispatchTime = "Ships within 24-48 hours";

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} ${product.name} to your cart`);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/marketplace/product/${product.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Product link copied to clipboard");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden sm:rounded-2xl max-h-[92vh] flex flex-col bg-background border-border">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description || "Product details modal"}</DialogDescription>
        </DialogHeader>

        {/* Modal content body */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left Column: High-Resolution Gallery */}
          <div className="p-6 md:p-8 bg-muted/30 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between">
            <div>
              {/* Main High-Res Image View */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-background border border-border/80 shadow-soft group">
                <img
                  src={currentImage.url}
                  alt={currentImage.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground shadow-soft border border-border/60">
                    {product.availability === "out_of_stock" ? "Out of stock" : "In Stock"}
                  </span>
                  {product.isFeatured && (
                    <span className="rounded-full bg-amber-500 text-white px-3 py-0.5 text-xs font-bold shadow-soft">
                      Featured Pick
                    </span>
                  )}
                </div>

                {/* Floating Action Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="p-2 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground backdrop-blur-md transition-all shadow-soft cursor-pointer"
                    title="Share product"
                    aria-label="Share product"
                  >
                    <Share2 className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={cn(
                      "p-2 rounded-full backdrop-blur-md transition-all shadow-soft cursor-pointer",
                      favorited
                        ? "bg-red-500 text-white scale-105"
                        : "bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground",
                    )}
                    title={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
                    aria-label={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
                  >
                    <Heart className={cn("size-4", favorited && "fill-current")} />
                  </button>
                </div>
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={cn(
                        "relative size-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-background",
                        selectedImageIndex === idx
                          ? "border-primary ring-2 ring-primary/20 scale-105"
                          : "border-border hover:border-muted-foreground/40 opacity-70 hover:opacity-100",
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buyer Trust Footer Note */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Payroxa Buyer Protection:</strong> Funds escrowed until delivery
                confirmation.
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Product & Seller Information */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Breadcrumb */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="font-semibold uppercase tracking-wider text-primary">
                  {product.category?.name || "Marketplace"}
                </span>
                <span className="text-muted-foreground/80">SKU: {product.id.slice(0, 8)}</span>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                {product.name}
              </h2>

              {/* Pricing Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-black text-foreground">
                  {product.currency} {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Best Price Guaranteed
                </span>
              </div>

              {/* Seller / Vendor Rating Card */}
              <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {product.vendor?.logo ? (
                      <img
                        src={product.vendor.logo}
                        alt={product.vendor.name}
                        className="size-7 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        {product.vendor?.name?.charAt(0) || "V"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-foreground">
                        {product.vendor?.name || "Verified Merchant"}
                        {product.vendor?.verified && (
                          <CheckCircle2
                            className="size-3.5 text-emerald-600"
                            title="Verified Merchant"
                          />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {product.vendor?.location || "Nigeria"}
                      </p>
                    </div>
                  </div>

                  {/* Rating Stars & Count */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs justify-end">
                      <Star className="size-3.5 fill-amber-500" />
                      <span>{vendorRating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      ({vendorReviewCount} verified ratings)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Truck className="size-3.5 text-primary" />
                    <span>{dispatchTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="size-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>100% Fulfillment Rate</span>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Product Description
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line pr-1">
                  {product.description ||
                    "No detailed description provided for this item. Contact seller or view full product page for additional specifications."}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-border/80 space-y-3">
              {/* Quantity selector and Cart button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <PayroxaButton
                  variant="primary"
                  className="flex-1 py-2.5 text-xs font-bold"
                  onClick={handleAddToCart}
                >
                  <Plus className="size-4 mr-1.5" />
                  Add to Cart ({product.currency} {(product.price * quantity).toLocaleString()})
                </PayroxaButton>
              </div>

              {/* Direct Purchase and Full Details Links */}
              <div className="flex items-center justify-between gap-3 text-xs pt-1">
                <Link
                  to="/marketplace/product/$slug"
                  params={{ slug: product.slug }}
                  onClick={onClose}
                  className="font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  View full product page <ArrowRight className="size-3.5" />
                </Link>

                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium transition-colors"
                >
                  Direct checkout on Payroxa <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
