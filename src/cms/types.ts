export type AdminRole = "Super Admin" | "Editor";

export interface CmsUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface CmsSession {
  user: CmsUser;
  token: string;
  expiresAt: number;
}

export type ContentStatus = "draft" | "published" | "archived";

export interface SiteSettings {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  appUrl: string;
  defaultLanguage: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  supportEmail: string;
  copyrightText: string;
  // Brand Logo & Visual Assets
  logoType?: "symbol_text" | "image" | "symbol_only";
  logoUrl?: string;
  logoDarkUrl?: string;
  logoHeightPx?: number;
  brandSymbol?: string;
  brandSymbolBg?: "gradient-purple" | "solid-purple" | "dark-slate" | "emerald" | "custom";
  faviconUrl?: string;
  appIconUrl?: string;
  defaultOgImageUrl?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ApplicationLinks {
  app: string;
  login: string;
  register: string;
  wallet: string;
  payments: string;
  cards: string;
  store: string;
  business: string;
  transfers: string;
  delivery: string;
  ride: string;
  updatedAt: string;
  updatedBy: string;
}

export interface SocialLink {
  id: string;
  platform: "instagram" | "x" | "linkedin" | "facebook" | "youtube" | "tiktok";
  label: string;
  href: string;
  enabled: boolean;
}

export interface SocialSettings {
  links: SocialLink[];
  updatedAt: string;
  updatedBy: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  type: "internal" | "external" | "app";
  displayOrder: number;
  enabled: boolean;
  target?: "_blank" | "_self";
  section?: "header" | "footer_products" | "footer_company" | "footer_get_started";
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  highlightedText: string;
  description: string;
  footnote: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  heroImageUrl: string;
  heroImageAlt: string;
  visibility: boolean;
  status: ContentStatus;
  updatedAt: string;
  updatedBy: string;
}

export interface TrustItem {
  id: string;
  icon: string;
  title: string;
  copy: string;
  displayOrder: number;
  enabled: boolean;
}

export interface TrustStripContent {
  items: TrustItem[];
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface ProductItem {
  id: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  icon: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  displayOrder: number;
  featured: boolean;
  published: boolean;
  category?: string;
  updatedAt: string;
}

export interface BusinessTypeItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  displayOrder: number;
  active: boolean;
  updatedAt: string;
}

export interface StoreSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  cardHeadline: string;
  cardDescription: string;
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface WalletSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  nairaTitle: string;
  nairaSubtitle: string;
  dollarTitle: string;
  dollarSubtitle: string;
  features: string[];
  ctaLabel: string;
  ctaUrl: string;
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface DashboardSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Array<{ id: string; label: string; copy: string }>;
  ctaLabel: string;
  ctaUrl: string;
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface SecuritySectionContent {
  eyebrow: string;
  title: string;
  description: string;
  points: Array<{ id: string; icon: string; title: string; copy: string }>;
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface HowItWorksStep {
  id: string;
  step: string;
  title: string;
  copy: string;
  displayOrder: number;
  enabled: boolean;
}

export interface CardsSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  cardPlaceholderNumber: string;
  cardLabel: string;
  cardExpiry: string;
  visibility: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  status: "published" | "draft" | "hidden";
  updatedAt: string;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  businessName: string;
  role: string;
  testimonial: string;
  photoUrl?: string;
  rating: number;
  displayOrder: number;
  status: "published" | "draft" | "hidden";
  updatedAt: string;
}

export type MediaCategory =
  "branding" | "heroes" | "products" | "icons" | "testimonials" | "general";

export interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  category: MediaCategory;
  altText: string;
  dimensions?: { width: number; height: number };
  createdAt: string;
  uploadedBy: string;
}

export interface AnnouncementBanner {
  id: string;
  title: string;
  message: string;
  ctaLabel?: string;
  ctaUrl?: string;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface SeoMetadata {
  pageSlug: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  twitterCard: "summary" | "summary_large_image";
  updatedAt: string;
  updatedBy: string;
}

export interface CmsActivityLog {
  id: string;
  action:
    | "content_created"
    | "content_updated"
    | "content_published"
    | "content_unpublished"
    | "product_enabled"
    | "product_disabled"
    | "link_changed"
    | "seo_changed"
    | "admin_added"
    | "admin_role_changed"
    | "admin_logged_in"
    | "settings_updated"
    | "faq_added"
    | "faq_updated"
    | "announcement_updated";
  description: string;
  userName: string;
  userEmail: string;
  timestamp: string;
  resourceType: string;
  resourceId?: string;
}

export interface ContentRevision {
  id: string;
  sectionKey: string;
  snapshot: unknown;
  savedBy: string;
  savedAt: string;
  status: ContentStatus;
  note?: string;
}

export interface CmsDatabaseState {
  version: number;
  users: Array<CmsUser & { passwordHash: string }>;
  settings: SiteSettings;
  links: ApplicationLinks;
  social: SocialSettings;
  navigation: NavigationItem[];
  hero: {
    published: HeroContent;
    draft: HeroContent;
  };
  trustStrip: TrustStripContent;
  products: ProductItem[];
  businessTypes: BusinessTypeItem[];
  storeSection: StoreSectionContent;
  walletSection: WalletSectionContent;
  dashboardSection: DashboardSectionContent;
  securitySection: SecuritySectionContent;
  howItWorks: HowItWorksStep[];
  cardsSection: CardsSectionContent;
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  media: MediaAsset[];
  announcements: AnnouncementBanner[];
  seo: Record<string, SeoMetadata>;
  activities: CmsActivityLog[];
  revisions: ContentRevision[];
}
