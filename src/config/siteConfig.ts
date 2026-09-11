/**
 * Single source of truth for the Payroxa marketing website.
 *
 * This website is a standalone, statically deployable marketing site for
 * https://payroxa.com.ng — it has no backend, no database and no dependency
 * on the authenticated Payroxa application at https://app.payroxa.com.ng.
 *
 * Every destination below can be overridden with a public environment
 * variable at build time (see .env.example). All values fall back to safe
 * defaults so a missing variable can never break the site.
 */

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

const read = (key: string, fallback: string): string => {
  const value = env[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
};

/** Public marketing website origin. */
export const WEBSITE_URL = read("VITE_PAYROXA_WEBSITE_URL", "https://payroxa.com.ng");

/** Authenticated product application origin. */
export const APP_URL = read("VITE_PAYROXA_APP_URL", "https://app.payroxa.com.ng");

const appPath = (path: string) => `${APP_URL.replace(/\/$/, "")}${path}`;

/**
 * External destinations that hand the visitor over to the Payroxa product.
 * Only routes known to exist in the application are listed here.
 */
export const PAYROXA_LINKS = {
  app: read("VITE_PAYROXA_APP_URL", APP_URL),
  login: read("VITE_PAYROXA_LOGIN_URL", appPath("/login")),
  register: read("VITE_PAYROXA_REGISTER_URL", appPath("/register")),
  wallet: read("VITE_PAYROXA_WALLET_URL", appPath("/wallet")),
  payments: read("VITE_PAYROXA_PAYMENTS_URL", appPath("/payments")),
  cards: read("VITE_PAYROXA_CARDS_URL", appPath("/cards")),
  store: read("VITE_PAYROXA_STORE_URL", appPath("/store")),
  business: read("VITE_PAYROXA_BUSINESS_URL", appPath("/business")),
} as const;

export type PayroxaLinkKey = keyof typeof PAYROXA_LINKS;

export const siteConfig = {
  name: "Payroxa",
  legalName: "Payroxa",
  tagline: "More than payments.",
  description:
    "Payroxa is the operating system for African businesses — move money, get paid, sell online and run your business from one secure platform.",
  websiteUrl: WEBSITE_URL,
  appUrl: APP_URL,
  contact: {
    email: "support@payroxa.com.ng",
    handle: "@payroxaapp",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/payroxaapp" },
    { label: "X", href: "https://x.com/payroxaapp" },
    { label: "LinkedIn", href: "https://linkedin.com/company/payroxa" },
    { label: "Facebook", href: "https://facebook.com/payroxaapp" },
  ],
  links: PAYROXA_LINKS,
} as const;

/** Marketing pages served by this website's own router. */
export const MARKETING_ROUTES = [
  { to: "/", label: "Home" },
  { to: "/business", label: "Business" },
  { to: "/payments", label: "Payments" },
  { to: "/store", label: "Store" },
  { to: "/cards", label: "Cards" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export default siteConfig;
