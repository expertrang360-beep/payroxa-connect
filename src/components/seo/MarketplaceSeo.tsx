import { siteConfig } from "@/config/siteConfig";

interface MarketplaceSeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  keywords?: string;
  productPrice?: number;
  productCurrency?: string;
}

/**
 * Returns the meta array for TanStack Router's head option.
 * This ensures consistency across all marketplace pages.
 */
export function getMarketplaceMeta({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
  productPrice,
  productCurrency = "NGN",
}: MarketplaceSeoProps) {
  const fullTitle = title
    ? `${title} | ${siteConfig.name} Marketplace`
    : `Payroxa Marketplace | Shop Verified African Stores`;

  const fullDescription =
    description ||
    "Discover curated technology, fashion, beauty and home essentials from verified African stores with Payroxa-protected checkout.";
  const fullImage = image || `${siteConfig.websiteUrl}/og-marketplace.jpg`;
  const fullUrl = url || `${siteConfig.websiteUrl}/marketplace`;

  const meta = [
    { title: fullTitle },
    { name: "description", content: fullDescription },
    {
      name: "keywords",
      content: keywords || "marketplace, africa, ecommerce, payroxa, shopping, verified stores",
    },

    // OpenGraph
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: fullDescription },
    { property: "og:image", content: fullImage },
    { property: "og:url", content: fullUrl },
    { property: "og:type", content: type },
    { property: "og:site_name", content: siteConfig.name },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: fullDescription },
    { name: "twitter:image", content: fullImage },
  ];

  if (type === "product" && productPrice) {
    meta.push(
      { property: "product:price:amount", content: productPrice.toString() },
      { property: "product:price:currency", content: productCurrency },
    );
  }

  return meta;
}

/**
 * Component to render Product JSON-LD for Rich Snippets (Google Search Results)
 */
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "NGN",
  sku,
  brand = siteConfig.name,
  availability = "https://schema.org/InStock",
  url,
}: {
  name: string;
  description: string;
  image: string[];
  price: number;
  currency?: string;
  sku?: string;
  brand?: string;
  availability?: string;
  url: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name,
    image,
    description,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      availability,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Component to render Breadcrumb JSON-LD
 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; item: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.websiteUrl}${item.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
