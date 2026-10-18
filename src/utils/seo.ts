/**
 * Dynamic SEO Head Manager Utility
 * Handles setting page titles and injecting / updating meta tags
 * for Open Graph (Facebook/LinkedIn) and Twitter Cards dynamically.
 */
export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "product";
  currency?: string;
  price?: number;
}

export function updateSEO(meta: SEOMetadata) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // 1. Update Title
  document.title = meta.title;

  // 2. Helper to set or create meta tag by attribute
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrVal);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const description =
    meta.description || "Buy premium verified drops securely through Payroxa escrow vaults.";
  const image = meta.image?.startsWith("https://") ? meta.image : undefined;
  const currentUrl = meta.url || window.location.href;
  const type = meta.type || "product";

  // Standard Description Meta
  setMetaTag("name", "description", description);

  // Open Graph / Facebook
  setMetaTag("property", "og:title", meta.title);
  setMetaTag("property", "og:description", description);
  if (image) setMetaTag("property", "og:image", image);
  else document.querySelector('meta[property="og:image"]')?.remove();
  setMetaTag("property", "og:url", currentUrl);
  setMetaTag("property", "og:type", type);
  setMetaTag("property", "og:site_name", "Payroxa Sovereign Marketplace");

  // Twitter Cards
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", meta.title);
  setMetaTag("name", "twitter:description", description);
  if (image) setMetaTag("name", "twitter:image", image);
  else document.querySelector('meta[name="twitter:image"]')?.remove();
  setMetaTag("name", "twitter:url", currentUrl);

  // If product specific, inject product metadata
  if (type === "product" && meta.price !== undefined) {
    setMetaTag("property", "product:price:amount", String(meta.price));
    setMetaTag("property", "product:price:currency", meta.currency || "NGN");
  }
}
