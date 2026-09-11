import { createFileRoute } from "@tanstack/react-router";
import {
  Link2,
  QrCode,
  Smartphone,
  CreditCard,
  Zap,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";

const title = "Payroxa Payment Links — Share & Collect Payments via WhatsApp, Instagram & SMS";
const description =
  "Generate instant branded payment links and scannable QR codes without writing a line of code. Accept cards, USSD, and bank transfers on any social platform.";

export const Route = createFileRoute("/payment-links")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/payment-links` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/payment-links` }],
  }),
  component: PaymentLinksPage,
});

const linkFeatures = [
  {
    icon: Share2,
    title: "Share Anywhere in Seconds",
    description:
      "Drop your custom payment link into WhatsApp chats, Instagram DMs, SMS messages, or website buttons.",
    badge: "Omnichannel",
  },
  {
    icon: QrCode,
    title: "Instant QR Codes",
    description:
      "Display scannable dynamic QR codes on checkout counters, packaging, invoices, or event posters.",
    badge: "In-Person Checkout",
  },
  {
    icon: CreditCard,
    title: "All Payment Methods Supported",
    description:
      "Customers pay via Debit Card (Visa, Mastercard, Verve), Bank Transfer, or USSD directly from their phone.",
    badge: "Multi-Rail",
  },
  {
    icon: Zap,
    title: "Instant Payment Alerts",
    description:
      "Get immediate WhatsApp and email confirmations the second funds clear into your business account.",
    badge: "Real-Time Alerts",
  },
];

function PaymentLinksPage() {
  return (
    <div>
      <Section className="gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800">
            <Link2 className="size-3.5 text-purple-600" />
            <span>No-Code Payment Links</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Get paid from anyone, anywhere with a simple link.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Create professional payment links in under 60 seconds. Share them over WhatsApp, email,
            or social media to collect customer payments with zero developer setup.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PayroxaButton href={PAYROXA_LINKS.register} size="lg">
              Create Your First Link
            </PayroxaButton>
            <PayroxaButton href="/store" variant="outline" size="lg">
              Looking for a Store?
            </PayroxaButton>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          badge="Simplicity"
          title="The easiest way to accept payments in Africa"
          description="Empower your sales reps, social media sellers, and freelance business with instant links."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {linkFeatures.map((item) => (
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
