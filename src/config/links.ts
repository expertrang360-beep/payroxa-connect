import { PAYROXA_LINKS, type PayroxaLinkKey } from "./siteConfig";

/**
 * Central link helper. Use this (or PAYROXA_LINKS directly) for every CTA that
 * sends a visitor into the Payroxa application. Never hard-code app URLs in UI.
 */
export function getPayroxaLink(key: PayroxaLinkKey): string {
  return PAYROXA_LINKS[key] ?? PAYROXA_LINKS.app;
}

export { PAYROXA_LINKS };
export type { PayroxaLinkKey };
