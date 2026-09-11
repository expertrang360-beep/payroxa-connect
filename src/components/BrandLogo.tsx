import { Link } from "@tanstack/react-router";

export function BrandLogo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Payroxa home">
      <span className="gradient-brand flex size-9 items-center justify-center rounded-xl text-lg font-bold text-primary-foreground shadow-soft">
        P
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          tone === "dark" ? "text-navy-foreground" : "text-foreground"
        }`}
      >
        Payroxa
      </span>
    </Link>
  );
}

export default BrandLogo;
