import { createFileRoute } from "@tanstack/react-router";
import {
  CreditCard,
  Lock,
  Globe,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Eye,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Payroxa Cards — Virtual USD & Naira Cards for Borderless Spending";
const description =
  "Pay for international subscriptions, cloud hosting, Facebook & Google ads, and local POS/ATMs with secure Payroxa cards.";

export const Route = createFileRoute("/cards")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/cards` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/cards` }],
  }),
  component: CardsPage,
});

const cardTypes = [
  {
    title: "Virtual Dollar (USD) Card",
    badge: "International",
    desc: "Pay globally without card decline headaches. Works seamlessly for subscriptions and global ads.",
    supported: [
      "Apple Music & iCloud",
      "Netflix & Spotify",
      "Google & Facebook Ads",
      "AWS, DigitalOcean & ChatGPT",
      "Canva & Shopify",
    ],
  },
  {
    title: "Naira (NGN) Debit Card",
    badge: "Local Spending",
    desc: "Direct access to your wallet balance for local POS terminals, online shopping, and all Nigerian ATMs.",
    supported: [
      "Supermarkets & POS terminals",
      "Local online checkouts",
      "All Nigerian ATMs",
      "Instant in-app PIN resets",
      "Zero maintenance fees",
    ],
  },
];

const securityPerks = [
  {
    icon: Lock,
    title: "One-Tap Instant Freeze",
    description:
      "Temporarily freeze or unfreeze your cards in the app anytime you suspect unauthorized activity.",
  },
  {
    icon: Globe,
    title: "Worldwide Acceptance",
    description:
      "Accepted on millions of international merchant sites supporting Mastercard and Visa networks.",
  },
  {
    icon: ShieldCheck,
    title: "3D Secure OTP Protection",
    description:
      "Receive instant one-time passwords directly in your Payroxa app for safe online checkouts.",
  },
  {
    icon: Zap,
    title: "Real-Time Funding",
    description:
      "Fund your virtual dollar card straight from your Payroxa Naira balance at transparent, competitive rates.",
  },
];

function CardsPage() {
  const { links } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;
  const loginUrl = links?.login || PAYROXA_LINKS.login;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Payroxa Borderless Cards
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Spend globally without limits,{" "}
            <span className="text-gradient-brand">powered by Payroxa.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Say goodbye to failed international card payments. Issue instant virtual USD cards and
            physical Naira cards in seconds straight from your phone.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PayroxaButton href={registerUrl} size="lg">
              Get Your Card <ArrowRight className="size-4" aria-hidden="true" />
            </PayroxaButton>
            <PayroxaButton href={loginUrl} variant="outline" size="lg">
              Sign In to Manage Cards
            </PayroxaButton>
          </div>
        </div>
      </section>

      {/* 2. Card Visual Showcase */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Card Options"
          title="Designed for both local life and global business"
          description="Choose between virtual and physical cards to match your lifestyle and spending requirements."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {cardTypes.map((card) => (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-3xl border border-border bg-background p-8 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {card.badge}
                  </span>
                  <CreditCard className="size-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Popular use cases:
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {card.supported.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <PayroxaButton href={registerUrl} className="w-full">
                  Create {card.title}
                </PayroxaButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Security Perks */}
      <Section>
        <SectionHeading
          eyebrow="Security & Control"
          title="Complete control over your card spending"
          description="Manage limits, track transactions in real time, and lock your card with one tap."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {securityPerks.map((item) => (
            <div key={item.title} className="surface-card p-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Final CTA */}
      <FinalCTA
        title="Get your Payroxa card today"
        description="Experience the freedom of borderless payments with transparent exchange rates and top-tier security."
      />
    </>
  );
}

export default CardsPage;
