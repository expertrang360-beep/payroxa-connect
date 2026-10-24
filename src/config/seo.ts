import socialBanner from "@/assets/payroxa-social.jpg.asset.json";
import { WEBSITE_URL } from "./siteConfig";

export const SOCIAL_BANNER_URL = new URL(socialBanner.url, WEBSITE_URL).href;

export function pageHead(title: string, description: string, path: string, type = "website") {
  const url = `${WEBSITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function resolveSocialBanner(value?: string) {
  if (!value || ["/hero-payroxa.jpg", "/src/assets/hero-payroxa.jpg"].includes(value)) {
    return SOCIAL_BANNER_URL;
  }
  return value;
}
