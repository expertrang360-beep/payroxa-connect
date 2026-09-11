import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Building2,
  BellRing,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";

const title = "Payroxa Payment Requests — Professional Invoices & Digital Billing for Nigeria";
const description =
  "Send professional payment requests with automated payment reminders, custom line items, VAT calculation, and instant settlement.";

export const Route = createFileRoute("/payment-requests")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/payment-requests` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/payment-requests` }],
  }),
  component: PaymentRequestsPage,
});

const requestFeatures = [
  {
    icon: FileText,
    title: "Branded Digital Invoices",
    description:
      "Issue polished PDF invoices and responsive web invoices customized with your logo, tax ID, and terms.",
    badge: "Professional Invoicing",
  },
  {
    icon: BellRing,
    title: "Automated Friendly Reminders",
    description:
      "Never chase unpaid bills manually again. Gentle email and SMS reminders trigger automatically before due dates.",
    badge: "Auto Follow-Ups",
  },
  {
    icon: Zap,
    title: "1-Click Customer Payment",
    description:
      "Clients pay directly from the invoice link via bank transfer, card, or USSD without signing up.",
    badge: "Frictionless",
  },
  {
    icon: CheckCircle2,
    title: "Real-Time Tracking",
    description:
      "See when clients open invoices, when payment is initiated, and when funds settle into your Payroxa account.",
    badge: "Audit Trail",
  },
];

function PaymentRequestsPage() {
  return (
    <div>
      <Section className="gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800">
            <FileText className="size-3.5 text-purple-600" />
            <span>Digital Invoicing & Requests</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Get invoices paid 3x faster with digital requests.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Create professional invoices, send payment requests to corporate clients, and automate
            reminders so you can focus on building your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PayroxaButton href={PAYROXA_LINKS.register} size="lg">
              Send Your First Invoice
            </PayroxaButton>
            <PayroxaButton href="/pricing" variant="outline" size="lg">
              See Pricing
            </PayroxaButton>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          badge="Invoicing"
          title="Designed for agencies, freelancers & wholesalers"
          description="Everything required to keep accounts receivable under control."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {requestFeatures.map((item) => (
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
