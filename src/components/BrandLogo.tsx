import { Link } from "@tanstack/react-router";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

export function BrandLogo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { settings } = usePublicCms();

  const brandName = settings?.name || "Payroxa";
  const logoType = settings?.logoType || "symbol_text";
  const brandSymbol = settings?.brandSymbol || "P";
  const brandSymbolBg = settings?.brandSymbolBg || "gradient-purple";

  const customLogoImg =
    tone === "dark" && settings?.logoDarkUrl ? settings.logoDarkUrl : settings?.logoUrl || "";

  // Render Full Image Logo
  if (logoType === "image" && customLogoImg) {
    return (
      <Link
        to="/"
        className={`inline-flex items-center ${className}`}
        aria-label={`${brandName} home`}
      >
        <img
          src={customLogoImg}
          alt={brandName}
          style={{ height: settings?.logoHeightPx ? `${settings.logoHeightPx}px` : "36px" }}
          className="w-auto object-contain"
        />
      </Link>
    );
  }

  // Symbol background styles
  const getSymbolBgClass = () => {
    switch (brandSymbolBg) {
      case "solid-purple":
        return "bg-purple-600 text-white";
      case "dark-slate":
        return "bg-slate-900 text-white";
      case "emerald":
        return "bg-emerald-600 text-white";
      case "gradient-purple":
      default:
        return "gradient-brand text-primary-foreground";
    }
  };

  // Render Symbol Only
  if (logoType === "symbol_only") {
    return (
      <Link
        to="/"
        className={`inline-flex items-center gap-2.5 ${className}`}
        aria-label={`${brandName} home`}
      >
        <span
          className={`flex size-9 items-center justify-center rounded-xl text-lg font-bold shadow-soft ${getSymbolBgClass()}`}
        >
          {brandSymbol}
        </span>
      </Link>
    );
  }

  // Default: Symbol + Brand Text
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label={`${brandName} home`}
    >
      <span
        className={`flex size-9 items-center justify-center rounded-xl text-lg font-bold shadow-soft ${getSymbolBgClass()}`}
      >
        {brandSymbol}
      </span>
      <span
        className={`font-display text-lg font-bold tracking-tight ${
          tone === "dark" ? "text-navy-foreground" : "text-foreground"
        }`}
      >
        {brandName}
      </span>
    </Link>
  );
}

export default BrandLogo;
