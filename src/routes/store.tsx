import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingBag,
  Store,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  CreditCard,
  QrCode,
  Smartphone,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Store — Launch Your Online Storefront in 2 Minutes";
const description =
  "Create a stunning digital store, showcase products on WhatsApp and social media, collect instant payments, and manage orders with zero coding.";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/store` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/store` }],
  }),
  component: StorePage,
});

const storeFeatures = [
  {
    icon: Store,
    title: "Zero Setup, Instant Live Store",
    description:
      "No hosting, no technical skills, and no domain setup needed. Get a clean, branded link (payroxa.com.ng/store/yourname) ready in seconds.",
  },
  {
    icon: ShoppingBag,
    title: "Product Catalogs & Variants",
    description:
      "Add multiple photos, size variants, stock counts, and promotional discounts easily from your mobile phone or laptop.",
  },
  {
    icon: CreditCard,
    title: "Frictionless Checkout",
    description:
      "Customers pay with Cards, Bank Transfers, USSD, or Payroxa Wallet. No sign-up required for buyers.",
  },
  {
    icon: Share2,
    title: "WhatsApp & Instagram Integration",
    description:
      "Share direct product links to your Instagram bio, TikTok, or WhatsApp status for one-click checkout.",
  },
  {
    icon: Truck,
    title: "Integrated Delivery Options",
    description:
      "Define delivery fee zones across states or integrate with local courier partners for streamlined fulfillment.",
  },
  {
    icon: Zap,
    title: "Instant Wallet Settlement",
    description:
      "Every order payment settles directly into your Payroxa balance in real-time, ready for immediate payout or spending.",
  },
];

const steps = [
  {
    num: "1",
    title: "Create your free store",
    desc: "Sign up on Payroxa, pick your unique store link and upload your store logo.",
  },
  {
    num: "2",
    title: "Add your products",
    desc: "Upload photos, set prices, write descriptions and specify available inventory.",
  },
  {
    num: "3",
    title: "Share & start selling",
    desc: "Paste your link across social media and receive real-time order alerts on your phone.",
  },
];

function StorePage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;
  const loginUrl = links?.login || PAYROXA_LINKS.login;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Payroxa Digital Storefronts
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Turn your social followers into{" "}
            <span className="text-gradient-brand">paying customers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Stop replying to endless "how much" DMs. Launch a free online store on Payroxa, showcase
            your products, and collect payments automatically.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PayroxaButton href={registerUrl} size="lg">
              Create Your Free Store <ArrowRight className="size-4" aria-hidden="true" />
            </PayroxaButton>
            <PayroxaButton href={loginUrl} variant="outline" size="lg">
              Manage Existing Store
            </PayroxaButton>
          </div>
        </div>
      </section>

      {/* 2. Store Features */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything you need to sell online effortlessly"
          description="Designed to eliminate friction between your social content and your bank account."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storeFeatures.map((item) => (
            <ProductCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      {/* 3. How It Works Steps */}
      <Section>
        <SectionHeading
          eyebrow="How It Works"
          title="From zero to selling in 3 simple steps"
          description="You don't need a developer or complex web servers. If you know how to use WhatsApp, you can run a Payroxa store."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="surface-card flex flex-col items-center p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-extrabold text-primary-foreground shadow-md">
                {step.num}
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Final CTA */}
      <FinalCTA
        title="Start selling online with Payroxa Store"
        description="Join thousands of fashion vendors, bakers, electronics sellers and beauty brands selling online today."
      />
    </>
  );
}

export default StorePage;
