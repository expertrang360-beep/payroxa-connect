import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  Store,
  Receipt,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  CreditCard,
  Send,
  Smartphone,
  Globe2,
} from "lucide-react";
import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Business — All-in-One Operating System for African Enterprises";
const description =
  "Invoicing, storefronts, multi-user permissions, vendor payouts, and fast customer payments designed for modern African businesses.";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/business` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/business` }],
  }),
  component: BusinessPage,
});

const businessSolutions = [
  {
    icon: Receipt,
    title: "Instant Invoicing & Payment Links",
    description:
      "Generate branded professional invoices with embedded payment links. Accept bank transfers, cards, and USSD with real-time settlement.",
  },
  {
    icon: Store,
    title: "Zero-Code Online Storefront",
    description:
      "Create a digital catalog in under 2 minutes. Receive customer orders and payments directly into your Payroxa business wallet.",
  },
  {
    icon: Send,
    title: "Bulk Payouts & Payroll",
    description:
      "Disburse salaries, supplier payments, and operational expenses in seconds across all Nigerian commercial banks and fintech wallets.",
  },
  {
    icon: Users,
    title: "Team & Role-Based Access",
    description:
      "Empower accountants, sales managers, and cashiers with segregated permissions without exposing your master wallet credentials.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Cash Flow Analytics",
    description:
      "Monitor sales velocity, top-performing product categories, and recurring customer trends with automated transaction reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Grade Security",
    description:
      "Multi-factor authentication, biometric transaction approvals, and NDPR-compliant data protection for your enterprise funds.",
  },
];

const tiers = [
  {
    name: "Starter & Sole Trader",
    focus: "Individual merchants, freelancers & instagram vendors",
    features: [
      "Payroxa digital store link",
      "Instant bank transfer collection",
      "Unlimited invoices & receipts",
      "Standard support via WhatsApp & in-app",
    ],
  },
  {
    name: "Growing Business",
    focus: "Retail outlets, restaurants, logistics & agencies",
    highlight: true,
    features: [
      "Everything in Starter, plus:",
      "Up to 5 team member accounts",
      "Bulk transfers & payroll batch uploads",
      "Virtual and physical corporate expense cards",
      "Priority customer success manager",
    ],
  },
  {
    name: "Enterprise & Franchise",
    focus: "Multi-branch stores, distributors & corporate entities",
    features: [
      "Custom multi-outlet balance management",
      "Dedicated account manager & SLA",
      "Custom API & POS terminal integration",
      "Automated tax & custom compliance reporting",
    ],
  },
];

const industries = [
  {
    name: "Retail & Supermarkets",
    desc: "Fast checkout and real-time inventory payment reconciliation.",
  },
  {
    name: "Restaurants & Bars",
    desc: "Split bills, table QR codes, and automated supplier disbursements.",
  },
  {
    name: "Logistics & Fleet",
    desc: "Driver expense cards, fuel stipends, and automated customer COD payouts.",
  },
  {
    name: "Digital Agencies & Freelancers",
    desc: "International invoice links and automated payment confirmations.",
  },
  {
    name: "Health & Pharmacy",
    desc: "Multi-teller settlement and accurate daily reconciliation ledgers.",
  },
  {
    name: "Fashion & Lifestyle",
    desc: "Mobile-first social storefronts with automated shipping link generation.",
  },
];

function BusinessPage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;
  const loginUrl = links?.login || PAYROXA_LINKS.login;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Payroxa for Business
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            The modern financial engine for{" "}
            <span className="text-gradient-brand">African commerce.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Accept customer payments seamlessly, launch instant digital storefronts, pay vendors in
            bulk, and manage team expenses — all under one unified Payroxa business account.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PayroxaButton href={registerUrl} size="lg">
              Open a Business Account <ArrowRight className="size-4" aria-hidden="true" />
            </PayroxaButton>
            <PayroxaButton href={loginUrl} variant="outline" size="lg">
              Sign In to Business Portal
            </PayroxaButton>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-y border-border/80 py-8 sm:grid-cols-4">
            <div>
              <p className="text-3xl font-extrabold text-foreground">99.9%</p>
              <p className="mt-1 text-xs text-muted-foreground">Transaction Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">&lt; 3s</p>
              <p className="mt-1 text-xs text-muted-foreground">Settlement Speed</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">0%</p>
              <p className="mt-1 text-xs text-muted-foreground">Hidden Monthly Fees</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">24/7</p>
              <p className="mt-1 text-xs text-muted-foreground">Dedicated Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Business Solutions */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Solutions"
          title="Everything you need to run cash, card and online sales"
          description="Built specifically for the everyday reality of African retail and commerce."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessSolutions.map((item) => (
            <ProductCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      {/* 3. Interactive Industry Deep Dive */}
      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Tailored for your business sector"
          description="Whether you run a fast-paced supermarket or a distributed logistics fleet, Payroxa streamlines your operations."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, idx) => (
            <div
              key={ind.name}
              className="surface-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{ind.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{ind.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Plan Comparison */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Scalable Plans"
          title="Ready to grow with your business at every stage"
          description="Start for free with zero setup fees. Scale as your transaction volumes grow."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl border p-8 transition-all ${
                tier.highlight
                  ? "border-primary bg-background shadow-xl ring-2 ring-primary/20"
                  : "border-border bg-background"
              }`}
            >
              <div>
                {tier.highlight ? (
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="mt-3 text-2xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.focus}</p>
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-foreground/90">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6">
                <PayroxaButton
                  href={registerUrl}
                  variant={tier.highlight ? "default" : "outline"}
                  className="w-full"
                >
                  Get Started
                </PayroxaButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Final CTA */}
      <FinalCTA
        title="Transform your business finances today"
        description="Join thousands of African business owners who trust Payroxa for reliable payments and effortless operations."
      />
    </>
  );
}

export default BusinessPage;
