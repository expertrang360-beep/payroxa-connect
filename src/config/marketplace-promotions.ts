import fashionImage from "@/assets/marketplace-fashion.jpg";
import techImage from "@/assets/marketplace-tech.jpg";
import homeImage from "@/assets/marketplace-home.jpg";

export const marketplacePromotions = [
  { id: "fashion", eyebrow: "Style edit", title: "Fashion & everyday style", description: "Discover statement pieces from African stores.", cta: "Explore fashion", category: "clothing-apparel", image: fashionImage, alt: "African print fabrics, purple handbag and white sneakers" },
  { id: "technology", eyebrow: "Tech essentials", title: "Electronics & gadgets", description: "Find your next everyday upgrade.", cta: "Explore electronics", category: "electronics-gadgets", image: techImage, alt: "Headphones, laptop, smartphone and wireless earbuds" },
  { id: "home", eyebrow: "The home edit", title: "Home & living", description: "Thoughtful finds for the spaces you love.", cta: "Explore homeware", category: "home-living", image: homeImage, alt: "Green ceramic vase, table lamp and lavender cushion" },
];

function httpsUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : undefined; } catch { return undefined; }
}

// Public direct-sponsor placements. No ad network or tracking runs without integration.
export const marketplaceAds = {
  sidebar: { image: httpsUrl(import.meta.env.VITE_PAYROXA_SIDEBAR_AD_IMAGE), href: httpsUrl(import.meta.env.VITE_PAYROXA_SIDEBAR_AD_URL) },
  banner: { image: httpsUrl(import.meta.env.VITE_PAYROXA_BANNER_AD_IMAGE), href: httpsUrl(import.meta.env.VITE_PAYROXA_BANNER_AD_URL) },
};