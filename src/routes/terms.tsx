import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Scale, CheckCircle2 } from "lucide-react";
import Section from "@/components/Section";
import { siteConfig } from "@/config/siteConfig";

const title = "Terms of Service — Payroxa";
const description =
  "Review the official Payroxa Terms of Service. Understand your rights and responsibilities when using our wallet, storefronts, and payment services.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/terms` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="border-b border-border pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
            Legal Terms &amp; Conditions
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl text-foreground">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: January 1, 2026 • Please read these terms carefully before creating an
            account or using Payroxa.
          </p>
        </div>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              By accessing or using Payroxa's website, mobile application, APIs, or merchant tools
              (collectively, the "Services"), you agree to be bound by these Terms of Service. If
              you do not agree, you must not access or use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              2. Eligibility &amp; Account Verification
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              To use Payroxa, you must be at least 18 years old and capable of forming a binding
              contract under applicable Nigerian law. You agree to provide accurate, current, and
              complete information during registration and keep your KYC documentation up to date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. Acceptable Use Policy</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You agree not to use Payroxa for any unlawful or prohibited activity, including but
              not limited to money laundering, terrorist financing, sale of counterfeit goods,
              fraudulent pyramid schemes, or unauthorized gambling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              4. Merchant Storefronts &amp; Settlements
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Merchants utilizing Payroxa Storefronts are solely responsible for accurately
              describing products, fulfilling customer orders, and addressing shipping disputes.
              Payroxa acts solely as the payment collection and settlement processor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Fees &amp; Transaction Limits</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All applicable transaction fees and exchange rates are displayed before confirming a
              transaction. Transaction limits are established based on your KYC verification tier
              and regulatory guidelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Termination &amp; Suspension</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We reserve the right to suspend or terminate accounts that violate these Terms or
              present an unacceptable financial or security risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">7. Governing Law</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of the
              Federal Republic of Nigeria. For disputes or questions, contact{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary underline">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
