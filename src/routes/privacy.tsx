import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Lock, Clock } from "lucide-react";
import Section from "@/components/Section";
import { siteConfig } from "@/config/siteConfig";

const title = "Privacy Policy — Payroxa";
const description =
  "Read the official Payroxa Privacy Policy. Understand how we collect, process, store, and safeguard your personal and financial data.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/privacy` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="border-b border-border pb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
            Legal &amp; Privacy
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: January 2026 • In compliance with Nigeria Data Protection Regulation
            (NDPR) &amp; global data protection laws.
          </p>
        </div>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Introduction &amp; Scope</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Payroxa ("we", "our", or "us") is dedicated to safeguarding your personal data and
              respecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and protect your information when you access our website (payroxa.com.ng), web portal,
              mobile apps, and associated APIs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              To provide compliant, secure, and rapid financial services, we collect the following
              categories of information:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Identity Information:</strong> Full legal name,
                date of birth, government identification numbers (NIN, BVN for regulatory KYC
                verification).
              </li>
              <li>
                <strong className="text-foreground">Contact Information:</strong> Email address,
                phone number, residential or registered business address.
              </li>
              <li>
                <strong className="text-foreground">Financial &amp; Transactional Data:</strong>{" "}
                Bank account numbers, transaction histories, wallet balances, and merchant payment
                receipts.
              </li>
              <li>
                <strong className="text-foreground">Technical Device Data:</strong> IP addresses,
                browser types, operating system identifiers, and biometric token authorizations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We process your data strictly to deliver contracted financial services, fulfill
              statutory obligations under Nigerian anti-money laundering (AML) directives, prevent
              fraudulent transactions, and provide 24/7 customer assistance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">
              4. Information Sharing &amp; Third Parties
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Payroxa never sells your personal information to advertisers. We share information
              only with licensed payment switch operators, regulatory bodies when required by law,
              and verified identity verification infrastructure partners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Data Retention &amp; Security</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We retain transaction records according to Central Bank of Nigeria (CBN) and NDPR
              record-keeping requirements. All sensitive records are protected with AES-256
              encryption at rest and TLS 1.3 in transit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Your Rights</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You maintain the right to access, rectify, or request the deletion of your personal
              data subject to statutory regulatory compliance. For privacy inquiries, contact our
              Data Protection Officer at{" "}
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

export default PrivacyPage;
