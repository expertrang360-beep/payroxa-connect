import { createFileRoute } from "@tanstack/react-router";
import {
  Send,
  Users,
  Zap,
  Building2,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";

const title = "Payroxa Transfers — Instant Payouts, Bulk Transfers & Payroll for African Teams";
const description =
  "Send money instantly to all commercial banks and mobile money wallets across Nigeria. Run bulk payroll with one click and automated reconciliation.";

export const Route = createFileRoute("/transfers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/transfers` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/transfers` }],
  }),
  component: TransfersPage,
});

const transferFeatures = [
  {
    icon: Zap,
    title: "Instant Bank Settlements",
    description:
      "Funds land in recipient accounts within seconds across Access, GTBank, Zenith, UBA, Kuda, and 20+ Nigerian institutions.",
    badge: "Sub-Second Speed",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk CSV Payroll",
    description:
      "Upload a single Excel or CSV file to disburse thousands of vendor and staff payments in one batch with real-time tracking.",
    badge: "One-Click Bulk",
  },
  {
    icon: Building2,
    title: "Vendor Payouts",
    description:
      "Schedule supplier payments and automate repeat disbursements with customizable approval hierarchies.",
    badge: "Automated Workflows",
  },
  {
    icon: ShieldCheck,
    title: "Zero Failed Transfers",
    description:
      "Smart routing automatically detects bank downtime and selects the fastest banking rail to guarantee delivery.",
    badge: "99.9% Success Rate",
  },
];

function TransfersPage() {
  return (
    <div>
      <Section className="gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold text-purple-800">
            <Send className="size-3.5 text-purple-600" />
            <span>Payouts & Bulk Transfers</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Instant payouts and effortless payroll across Nigeria.
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Send single or bulk payments to any Nigerian bank account, microfinance bank, or mobile
            money wallet in seconds with guaranteed delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PayroxaButton href={PAYROXA_LINKS.register} size="lg">
              Start Sending Transfers
            </PayroxaButton>
            <PayroxaButton href="/pricing" variant="outline" size="lg">
              View Low Transfer Rates
            </PayroxaButton>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          badge="Capabilities"
          title="Engineered for reliability and compliance"
          description="Whether paying five contractors or five thousand employees, Payroxa handles high-frequency settlements effortlessly."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transferFeatures.map((item) => (
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
