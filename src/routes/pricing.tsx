import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calculator,
  Building2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Pricing — Transparent, Predictable & Fair Rates";
const description =
  "No hidden fees, no monthly maintenance charges. See our full breakdown for transfers, bills, cards, and storefront processing.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/pricing` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/pricing` }],
  }),
  component: PricingPage,
});

const feeTables = [
  {
    category: "Wallet & Account Services",
    items: [
      { service: "Personal Wallet Registration", fee: "Free (₦0)", note: "Instant account setup" },
      {
        service: "Business Account Onboarding",
        fee: "Free (₦0)",
        note: "Includes invoice & payout tools",
      },
      {
        service: "Monthly Maintenance / Inactivity",
        fee: "Free (₦0)",
        note: "No maintenance charges ever",
      },
      { service: "Payroxa to Payroxa Transfers", fee: "Free (₦0)", note: "Unlimited peer-to-peer" },
    ],
  },
  {
    category: "Transfers & Payouts",
    items: [
      { service: "Transfer below ₦5,000", fee: "₦10", note: "Direct bank network fee" },
      { service: "Transfer ₦5,001 - ₦50,000", fee: "₦25", note: "Direct bank network fee" },
      { service: "Transfer above ₦50,000", fee: "₦50", note: "Direct bank network fee" },
      {
        service: "Bulk Payroll Batch Transfers",
        fee: "Custom bulk tier",
        note: "Discounted for high-volume enterprises",
      },
    ],
  },
  {
    category: "Utility & Bill Payments",
    items: [
      {
        service: "Airtime Top-ups (MTN, Glo, Airtel, 9mobile)",
        fee: "Free (0% fee)",
        note: "Earn up to 3% cashback",
      },
      {
        service: "Data Bundles Top-ups",
        fee: "Free (0% fee)",
        note: "Instant network direct delivery",
      },
      {
        service: "Electricity Meter Tokens",
        fee: "₦0 - ₦100",
        note: "Depends on distribution DISCO provider",
      },
      {
        service: "Cable TV Subscription (DStv, GOtv)",
        fee: "Free (0% fee)",
        note: "Instant automated reconnection",
      },
    ],
  },
  {
    category: "Payroxa Store & Merchant Processing",
    items: [
      {
        service: "Storefront Creation & Hosting",
        fee: "Free (₦0)",
        note: "Unlimited product listings",
      },
      {
        service: "Local Cards & Transfer Checkout",
        fee: "1.4% (capped at ₦2,000)",
        note: "Zero fee on failed attempts",
      },
      {
        service: "International Card Checkout",
        fee: "3.8% + ₦100",
        note: "Settled directly in local or USD",
      },
    ],
  },
];

function PricingPage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;
  const [calcAmount, setCalcAmount] = useState<number>(25000);

  const transferFee = calcAmount <= 5000 ? 10 : calcAmount <= 50000 ? 25 : 50;
  const storeProcessingFee = Math.min(calcAmount * 0.014, 2000);
  const merchantPayout = calcAmount - storeProcessingFee;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Simple &amp; Transparent
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Honest pricing with <span className="text-gradient-brand">zero surprises.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            We believe in complete transparency. No hidden account maintenance fees, no surprise
            deductions, and no arbitrary ledger penalties.
          </p>
          <div className="mt-8 flex justify-center">
            <PayroxaButton href={registerUrl} size="lg">
              Open a Free Account <ArrowRight className="size-4" aria-hidden="true" />
            </PayroxaButton>
          </div>
        </div>
      </section>

      {/* 2. Interactive Fee Estimator */}
      <Section tone="soft">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-background p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calculator className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Interactive Fee Calculator</h3>
              <p className="text-xs text-muted-foreground">
                Estimate your transaction costs instantly
              </p>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-xs font-semibold text-muted-foreground">
              Transaction Amount (₦)
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <span className="min-w-[120px] rounded-lg border border-border bg-muted/50 px-3 py-2 text-right font-mono text-base font-bold text-foreground">
                ₦{calcAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Bank Transfer Fee</p>
              <p className="mt-1 text-xl font-extrabold text-primary">₦{transferFee}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Recipient gets full ₦{calcAmount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Store Processing Fee</p>
              <p className="mt-1 text-xl font-extrabold text-foreground">
                ₦{Math.round(storeProcessingFee).toLocaleString()}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">1.4% (Max ₦2,000 cap)</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:col-span-1">
              <p className="text-xs text-primary font-semibold">Net Payout to You</p>
              <p className="mt-1 text-xl font-extrabold text-foreground">
                ₦{Math.round(merchantPayout).toLocaleString()}
              </p>
              <p className="mt-0.5 text-[10px] text-emerald-600 font-semibold">
                Settles in real-time
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Comprehensive Tables */}
      <Section>
        <SectionHeading
          eyebrow="Detailed Breakdown"
          title="Clear rates for every transaction category"
          description="Everything published upfront so you can run your personal finances and business with complete peace of mind."
        />

        <div className="mt-12 space-y-10">
          {feeTables.map((group) => (
            <div
              key={group.category}
              className="overflow-hidden rounded-3xl border border-border bg-background"
            >
              <div className="bg-muted/50 px-6 py-4 border-b border-border">
                <h3 className="text-base font-bold text-foreground">{group.category}</h3>
              </div>
              <div className="divide-y divide-border">
                {group.items.map((row) => (
                  <div
                    key={row.service}
                    className="flex flex-col justify-between px-6 py-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{row.service}</p>
                      <p className="text-xs text-muted-foreground">{row.note}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <span className="inline-block rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-foreground">
                        {row.fee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Final CTA */}
      <FinalCTA
        title="Ready for fair and transparent financial services?"
        description="Join Payroxa today with no initial deposit or monthly subscription fees required."
      />
    </>
  );
}

export default PricingPage;
