import { createFileRoute } from "@tanstack/react-router";
import {
  Wallet,
  Coins,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  TrendingUp,
  CreditCard,
  Building2,
  Lock,
  Globe2,
  CheckCircle2,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";

const title = "Payroxa Business Wallet — Multi-Currency Digital Accounts for African Businesses";
const description =
  "Hold Naira and foreign currencies in dedicated business accounts. Convert at real-time market rates, manage sub-accounts, and safeguard funds with enterprise encryption.";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/wallet` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/wallet` }],
  }),
  component: WalletPage,
});

const walletFeatures = [
  {
    icon: Coins,
    title: "Multi-Currency Balances",
    description:
      "Hold NGN, USD, and regional currencies in one unified dashboard with zero maintenance fees.",
    badge: "Multi-Currency",
  },
  {
    icon: ArrowRightLeft,
    title: "Instant Currency Conversion",
    description:
      "Swap between currencies in seconds with transparent competitive FX rates and no hidden markups.",
    badge: "Real-Time FX",
  },
  {
    icon: Building2,
    title: "Dedicated Virtual Accounts",
    description:
      "Generate dedicated Nigerian bank accounts under your business name for effortless reconciliation.",
    badge: "Auto Reconciliation",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Encryption",
    description:
      "Funds safeguarded with licensed tier-1 partner banks and NDPR compliant data storage.",
    badge: "NDPR Compliant",
  },
];

function WalletPage() {
  return (
    <div>
      <Section className="gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800">
            <Wallet className="size-3.5 text-purple-600" />
            <span>Digital Business Wallet</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            A flexible business wallet built for modern commerce.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Receive customer payments, hold funds securely, manage multiple sub-balances, and
            disburse money instantly with Payroxa's enterprise-grade business wallet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PayroxaButton href={PAYROXA_LINKS.register} size="lg">
              Open Free Business Wallet
            </PayroxaButton>
            <PayroxaButton href={PAYROXA_LINKS.login} variant="outline" size="lg">
              Sign In to Wallet
            </PayroxaButton>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          badge="Features"
          title="Designed for high-volume African businesses"
          description="Everything you need to safeguard capital, track daily cash flow, and manage multi-currency settlements."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {walletFeatures.map((item) => (
            <ProductCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              badge={item.badge}
            />
          ))}
        </div>
      </Section>

      <FinalCTA />
    </div>
  );
}
