import { createFileRoute } from "@tanstack/react-router";
import {
  Smartphone,
  Zap,
  Tv,
  Wifi,
  CreditCard,
  Send,
  Building2,
  Receipt,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Clock,
  Sparkles,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Payments — Fast Airtime, Utilities, Bills & Bank Transfers";
const description =
  "Pay utility bills, buy instant airtime & data bundles, send money to all Nigerian banks, and collect payments with zero friction.";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/payments` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/payments` }],
  }),
  component: PaymentsPage,
});

const billServices = [
  {
    icon: Smartphone,
    title: "Airtime & Mobile Data",
    description:
      "Instant recharge on MTN, Airtel, Glo, and 9mobile with up to 3% cashback on every top-up.",
    badge: "Instant Top-Up",
  },
  {
    icon: Zap,
    title: "Electricity Tokens",
    description:
      "Purchase prepaid and postpaid meter tokens for IKEDC, EKEDC, AEDC, IBEDC, EEDC, and more.",
    badge: "Instant Token Generation",
  },
  {
    icon: Tv,
    title: "Cable TV Subscriptions",
    description:
      "Renew DStv, GOtv, and StarTimes packages with instant automated signal activation.",
    badge: "Auto-Reconnection",
  },
  {
    icon: Wifi,
    title: "Internet & Broadband",
    description:
      "Subscribe to Spectranet, Smile, Swift, and Starlink local service payments seamlessly.",
    badge: "High-Speed Top Up",
  },
  {
    icon: Send,
    title: "Direct Bank Transfers",
    description:
      "Send funds to any commercial bank, microfinance bank, or mobile money operator with sub-second delivery.",
    badge: "99.98% Success Rate",
  },
  {
    icon: QrCode,
    title: "QR & Payment Links",
    description:
      "Generate shareable links or dynamic QR codes for customers to pay via card, transfer, or USSD.",
    badge: "Instant Confirmation",
  },
];

const paymentFeatures = [
  {
    title: "Lightning Settlement",
    desc: "No waiting for batch processing. Transactions confirm and credit recipient accounts in under 3 seconds.",
  },
  {
    title: "Automated Receipts & Reconciliation",
    desc: "Download detailed PDF receipts and export transaction logs directly for your personal records or accounting.",
  },
  {
    title: "Scheduled & Recurring Bills",
    desc: "Set automatic monthly payments for utility and internet bills so your family or office never faces downtime.",
  },
  {
    title: "Smart Beneficiary Directory",
    desc: "Save frequently used bank accounts and meter numbers to complete transactions in two taps.",
  },
];

function PaymentsPage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;
  const loginUrl = links?.login || PAYROXA_LINKS.login;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Payroxa Fast Payments
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Smarter, faster bills &amp;{" "}
            <span className="text-gradient-brand">transfers in one tap.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Pay electricity, recharge data, renew cable subscriptions, and send money to any
            Nigerian bank account with industry-leading speed and zero hidden charges.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PayroxaButton href={registerUrl} size="lg">
              Make a Payment Now <ArrowRight className="size-4" aria-hidden="true" />
            </PayroxaButton>
            <PayroxaButton href={loginUrl} variant="outline" size="lg">
              Sign In to Wallet
            </PayroxaButton>
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Everyday Utilities"
          title="All your essential payments under one roof"
          description="Enjoy guaranteed network delivery and direct integrations with Nigerian utility providers."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {billServices.map((service) => (
            <div
              key={service.title}
              className="surface-card flex flex-col justify-between p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <service.icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                    {service.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <a
                  href={loginUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  Pay now <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Value Props */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Engineered for Reliability
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Never get stuck on pending transfers again
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              We leverage direct clearing routes and automated fallback rails across top settlement
              networks. If a bank route experiences congestion, Payroxa switches routes in
              milliseconds.
            </p>

            <div className="mt-8 space-y-4">
              {paymentFeatures.map((feat) => (
                <div key={feat.title} className="flex gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{feat.title}</h4>
                    <p className="text-xs text-muted-foreground">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-muted/40 p-8 shadow-inner">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Electricity Token Generated</p>
                    <p className="text-[11px] text-muted-foreground">
                      IKEDC Prepaid • 0419-8821-9920
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-foreground">₦15,000.00</span>
              </div>
              <div className="mt-4 rounded-xl bg-muted/70 p-4 text-center">
                <p className="text-xs font-semibold text-muted-foreground">Token Code</p>
                <p className="mt-1 font-mono text-lg font-extrabold tracking-wider text-primary">
                  4821 - 9912 - 0451 - 8823 - 1042
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Units: 68.4 kWh • Token status: Active
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Send className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Bank Transfer Completed</p>
                    <p className="text-[11px] text-muted-foreground">
                      Access Bank • Adebayo Enterp...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-foreground">₦250,000.00</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Delivered in 1.2s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Final CTA */}
      <FinalCTA
        title="Experience seamless payments today"
        description="Create your free Payroxa wallet in under 2 minutes and take control of all your transfers and bills."
      />
    </>
  );
}

export default PaymentsPage;
