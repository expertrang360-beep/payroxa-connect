import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  FileCheck2,
  AlertTriangle,
  Server,
  KeyRound,
  EyeOff,
  Building,
  CheckCircle2,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Security — Bank-Grade Protection & NDPR Compliance";
const description =
  "Learn how Payroxa safeguards your funds, transaction data, and personal privacy with end-to-end encryption and automated fraud detection.";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/security` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/security` }],
  }),
  component: SecurityPage,
});

const securityPillars = [
  {
    icon: Lock,
    title: "End-to-End 256-Bit Encryption",
    description:
      "All financial data, identity credentials, and transaction requests are encrypted in transit via TLS 1.3 and at rest with AES-256 standards.",
  },
  {
    icon: Fingerprint,
    title: "Biometrics & Multi-Factor Auth",
    description:
      "Sensitive operations such as fund transfers, card detail reveals, and password changes require biometric approval or real-time SMS/Email OTPs.",
  },
  {
    icon: ShieldCheck,
    title: "Automated AI Fraud Defense",
    description:
      "Our real-time anomaly detection engine flags suspicious IP jumps, unusual transaction volumes, and compromised device signatures immediately.",
  },
  {
    icon: FileCheck2,
    title: "NDPR & Regulatory Compliance",
    description:
      "We strictly adhere to the Nigeria Data Protection Regulation (NDPR) and international best practices for data sovereignty and consumer privacy.",
  },
  {
    icon: Building,
    title: "Licensed Banking Partners",
    description:
      "User wallet deposits are held in custodial trust accounts with CBN-licensed commercial banks and regulated financial institutions.",
  },
  {
    icon: Server,
    title: "99.9% Redundant Infrastructure",
    description:
      "Distributed cloud infrastructure across multiple global availability zones guarantees continuous uptime and instantaneous disaster recovery.",
  },
];

const bestPractices = [
  "Never share your Payroxa PIN, password, or OTP with anyone, including individuals claiming to be Payroxa staff.",
  "Enable Face ID / Fingerprint authentication in your app settings for effortless one-touch login protection.",
  "Check your transaction history regularly and freeze cards instantly if you spot unfamiliar merchant charges.",
  "Always ensure you are visiting official domains (payroxa.com.ng and app.payroxa.com.ng).",
];

function SecurityPage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Safe, Solid, Secure
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Bank-grade security guarding{" "}
            <span className="text-gradient-brand">every transaction.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Your trust is our most valuable asset. We employ modern cryptographic standards and
            continuous compliance monitoring to keep your money and identity safe.
          </p>
        </div>
      </section>

      {/* 2. Pillars Grid */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Architecture"
          title="Defense-in-depth security infrastructure"
          description="How we protect millions of Naira in customer and business transactions daily."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {securityPillars.map((p) => (
            <div key={p.title} className="surface-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. User Safety Tips */}
      <Section>
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck className="size-6" />
              <h3 className="text-xl font-bold text-foreground">Tips to Protect Your Account</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Security is a shared commitment. Follow these simple guidelines to maximize your
              digital safety:
            </p>
            <ul className="mt-6 space-y-3">
              {bestPractices.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. Final CTA */}
      <FinalCTA
        title="Experience secure financial tools"
        description="Open your secure Payroxa wallet today and join thousands who trade with confidence."
      />
    </>
  );
}

export default SecurityPage;
