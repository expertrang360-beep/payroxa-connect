import React from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IconDefinition {
  name: string;
  label: string;
  category:
    | "Payments & Money"
    | "Security & Trust"
    | "Commerce & Store"
    | "Business & Growth"
    | "Cards & Banking"
    | "Communication & Support"
    | "General & Interface";
  keywords: string[];
}

export const ICON_CATEGORIES = [
  "All",
  "Payments & Money",
  "Security & Trust",
  "Commerce & Store",
  "Business & Growth",
  "Cards & Banking",
  "Communication & Support",
  "General & Interface",
] as const;

export const CMS_ICON_CATALOG: IconDefinition[] = [
  // Payments & Money
  {
    name: "Wallet",
    label: "Wallet",
    category: "Payments & Money",
    keywords: ["wallet", "money", "funds", "balance", "pay"],
  },
  {
    name: "Send",
    label: "Send / Transfer",
    category: "Payments & Money",
    keywords: ["send", "transfer", "payout", "forward", "arrow"],
  },
  {
    name: "ArrowUpRight",
    label: "Outflow / Send",
    category: "Payments & Money",
    keywords: ["arrow", "outflow", "expense", "transfer"],
  },
  {
    name: "ArrowDownLeft",
    label: "Inflow / Receive",
    category: "Payments & Money",
    keywords: ["arrow", "inflow", "receive", "deposit"],
  },
  {
    name: "DollarSign",
    label: "Dollar / FX",
    category: "Payments & Money",
    keywords: ["dollar", "usd", "currency", "fx", "cash"],
  },
  {
    name: "Banknote",
    label: "Cash / Banknote",
    category: "Payments & Money",
    keywords: ["cash", "money", "bills", "banknote"],
  },
  {
    name: "Coins",
    label: "Coins / Savings",
    category: "Payments & Money",
    keywords: ["coins", "savings", "interest", "micro"],
  },
  {
    name: "QrCode",
    label: "QR Code Pay",
    category: "Payments & Money",
    keywords: ["qr", "scan", "barcode", "instant"],
  },
  {
    name: "Receipt",
    label: "Receipt / Invoice",
    category: "Payments & Money",
    keywords: ["receipt", "bill", "invoice", "statement"],
  },
  {
    name: "RefreshCcw",
    label: "Exchange / Convert",
    category: "Payments & Money",
    keywords: ["exchange", "swap", "convert", "currency", "refresh"],
  },

  // Cards & Banking
  {
    name: "CreditCard",
    label: "Credit / Debit Card",
    category: "Cards & Banking",
    keywords: ["card", "credit", "debit", "visa", "mastercard"],
  },
  {
    name: "Landmark",
    label: "Bank / Institution",
    category: "Cards & Banking",
    keywords: ["bank", "central", "building", "landmark", "institution"],
  },
  {
    name: "Building2",
    label: "Corporate Bank",
    category: "Cards & Banking",
    keywords: ["building", "enterprise", "company", "firm"],
  },
  {
    name: "Smartphone",
    label: "Mobile Banking",
    category: "Cards & Banking",
    keywords: ["mobile", "phone", "app", "ios", "android"],
  },
  {
    name: "Contactless",
    label: "Contactless / Tap",
    category: "Cards & Banking",
    keywords: ["contactless", "nfc", "tap", "wave", "wifi"],
  },

  // Security & Trust
  {
    name: "ShieldCheck",
    label: "Shield Verified",
    category: "Security & Trust",
    keywords: ["shield", "verify", "secure", "protection", "safe"],
  },
  {
    name: "Shield",
    label: "Shield",
    category: "Security & Trust",
    keywords: ["shield", "security", "defense", "armor"],
  },
  {
    name: "Lock",
    label: "Lock / Encryption",
    category: "Security & Trust",
    keywords: ["lock", "encrypt", "password", "safe", "pin"],
  },
  {
    name: "KeyRound",
    label: "Key / 2FA",
    category: "Security & Trust",
    keywords: ["key", "auth", "2fa", "login", "access"],
  },
  {
    name: "Fingerprint",
    label: "Biometrics / Fingerprint",
    category: "Security & Trust",
    keywords: ["fingerprint", "biometric", "kyc", "identity", "verification"],
  },
  {
    name: "Eye",
    label: "Audit / Visibility",
    category: "Security & Trust",
    keywords: ["eye", "see", "monitor", "visible"],
  },
  {
    name: "CheckCircle2",
    label: "Checkmark Verified",
    category: "Security & Trust",
    keywords: ["check", "success", "confirmed", "verified", "done"],
  },
  {
    name: "BadgeCheck",
    label: "Badge Verified",
    category: "Security & Trust",
    keywords: ["badge", "official", "certified", "trusted"],
  },

  // Commerce & Store
  {
    name: "ShoppingBag",
    label: "Shopping Bag",
    category: "Commerce & Store",
    keywords: ["store", "shop", "bag", "cart", "retail", "buy"],
  },
  {
    name: "ShoppingCart",
    label: "Shopping Cart",
    category: "Commerce & Store",
    keywords: ["cart", "checkout", "store", "ecommerce"],
  },
  {
    name: "Store",
    label: "Storefront",
    category: "Commerce & Store",
    keywords: ["store", "shop", "merchant", "vendor", "retail"],
  },
  {
    name: "Package",
    label: "Package / Product",
    category: "Commerce & Store",
    keywords: ["package", "box", "product", "item", "inventory"],
  },
  {
    name: "Tag",
    label: "Price Tag / Discount",
    category: "Commerce & Store",
    keywords: ["tag", "price", "discount", "offer", "sale"],
  },
  {
    name: "Truck",
    label: "Logistics / Delivery",
    category: "Commerce & Store",
    keywords: ["truck", "delivery", "shipping", "fulfilment", "order"],
  },

  // Business & Growth
  {
    name: "Briefcase",
    label: "Business / Enterprise",
    category: "Business & Growth",
    keywords: ["business", "sme", "corporate", "briefcase", "work"],
  },
  {
    name: "TrendingUp",
    label: "Growth / Analytics",
    category: "Business & Growth",
    keywords: ["growth", "trend", "analytics", "chart", "metrics"],
  },
  {
    name: "BarChart3",
    label: "Bar Chart / Reports",
    category: "Business & Growth",
    keywords: ["chart", "bar", "data", "report", "accounting"],
  },
  {
    name: "PieChart",
    label: "Pie Chart",
    category: "Business & Growth",
    keywords: ["pie", "allocation", "budget", "stats"],
  },
  {
    name: "Users",
    label: "Team / Customers",
    category: "Business & Growth",
    keywords: ["users", "team", "people", "clients", "staff"],
  },
  {
    name: "Zap",
    label: "Instant / Lightning",
    category: "Business & Growth",
    keywords: ["zap", "fast", "instant", "speed", "lightning"],
  },
  {
    name: "Sparkles",
    label: "Smart / AI / Magic",
    category: "Business & Growth",
    keywords: ["sparkles", "magic", "smart", "star", "featured"],
  },
  {
    name: "Globe",
    label: "Global / Cross-Border",
    category: "Business & Growth",
    keywords: ["globe", "world", "international", "africa", "cross-border"],
  },

  // Communication & Support
  {
    name: "Headphones",
    label: "24/7 Support",
    category: "Communication & Support",
    keywords: ["support", "help", "customer", "agent", "headphones"],
  },
  {
    name: "MessageSquare",
    label: "Chat / Messaging",
    category: "Communication & Support",
    keywords: ["chat", "message", "sms", "comment"],
  },
  {
    name: "Mail",
    label: "Email",
    category: "Communication & Support",
    keywords: ["mail", "email", "inbox", "newsletter"],
  },
  {
    name: "Phone",
    label: "Phone / Call",
    category: "Communication & Support",
    keywords: ["phone", "call", "hotline", "voice"],
  },
  {
    name: "Bell",
    label: "Notifications",
    category: "Communication & Support",
    keywords: ["bell", "alert", "notice", "push"],
  },
  {
    name: "HelpCircle",
    label: "FAQ / Help",
    category: "Communication & Support",
    keywords: ["help", "faq", "question", "info"],
  },

  // General & Interface
  {
    name: "Layers",
    label: "All-in-One / Layers",
    category: "General & Interface",
    keywords: ["layers", "stack", "platform", "system"],
  },
  {
    name: "Sliders",
    label: "Settings / Controls",
    category: "General & Interface",
    keywords: ["sliders", "settings", "filter", "config"],
  },
  {
    name: "Compass",
    label: "Navigation / Explore",
    category: "General & Interface",
    keywords: ["compass", "explore", "discover", "guide"],
  },
  {
    name: "Star",
    label: "Star / Rating",
    category: "General & Interface",
    keywords: ["star", "rating", "favorite", "review"],
  },
  {
    name: "Award",
    label: "Award / Premium",
    category: "General & Interface",
    keywords: ["award", "badge", "winner", "top"],
  },
  {
    name: "Clock",
    label: "24/7 Realtime",
    category: "General & Interface",
    keywords: ["clock", "time", "realtime", "instant"],
  },
];

/**
 * Returns a Lucide icon component by name, or a safe fallback (Sparkles).
 */
export function renderCmsIcon(
  iconName?: string | null,
  props: { className?: string; size?: number } = {},
): React.ReactElement {
  if (!iconName) {
    return React.createElement(LucideIcons.Sparkles, props);
  }

  // Look up icon in lucide-react exports
  const IconComponent = (LucideIcons as Record<string, unknown>)[iconName] as
    LucideIcon | undefined;

  if (IconComponent && typeof IconComponent === "function") {
    return React.createElement(IconComponent, props);
  }

  // Default fallback
  return React.createElement(LucideIcons.Sparkles, props);
}
