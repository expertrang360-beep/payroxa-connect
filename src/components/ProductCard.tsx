import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProductCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "surface-card group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export default ProductCard;
