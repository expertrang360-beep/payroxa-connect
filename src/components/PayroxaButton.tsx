import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "gradient-brand text-primary-foreground shadow-glow hover:brightness-110",
        secondary: "bg-navy text-navy-foreground hover:bg-navy/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        text: "text-primary hover:text-primary-glow underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof buttonStyles> & {
  children: ReactNode;
  className?: string;
  /** Absolute URL — opens the external Payroxa application. */
  href?: string;
  /** Internal marketing route handled by this website's router. */
  to?: "/" | "/business" | "/payments" | "/store" | "/cards" | "/pricing" | "/about" | "/contact";
  ariaLabel?: string;
};

/**
 * Single reusable CTA. Destinations always come from the centralized
 * link configuration — never hard-code an application URL at a call site.
 */
export function PayroxaButton({
  children,
  className,
  href,
  to,
  variant,
  size,
  ariaLabel,
}: BaseProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export default PayroxaButton;
