import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bike,
  Briefcase,
  CreditCard,
  Fingerprint,
  Gauge,
  Headphones,
  Landmark,
  Lock,
  Package,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  Wallet,
  Zap,
} from "lucide-react";

import heroImage from "@/assets/hero-payroxa.jpg";
import FinalCTA from "@/components/FinalCTA";
import PayroxaButton from "@/components/PayroxaButton";
import ProductCard from "@/components/ProductCard";
import Section, { SectionHeading } from "@/components/Section";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const iconMap: Record<string, any> = {
  Send,
  Wallet,
  ShoppingBag,
  Briefcase,
  Truck,
  Smartphone,
  Gauge,
  CreditCard,
  Bike,
  Package,
  ShieldCheck,
  Zap,
  Headphones,
  Landmark,
};

const title = "Payroxa — Payments, Wallet, Cards & Store for African Businesses";
const description =
  "Everything your business needs to move money, get paid, sell online and grow. Payroxa is the operating system for African businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: siteConfig.websiteUrl },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.websiteUrl,
          description,
        }),
      },
    ],
  }),
  component: HomePage,
});

const trust = [
  { icon: ShieldCheck, title: "Secure", copy: "Your funds and data are protected end to end." },
  { icon: Zap, title: "Fast", copy: "Instant payments and real-time settlement." },
  { icon: Headphones, title: "Reliable", copy: "Support whenever you need us." },
  { icon: Landmark, title: "Built for Africa", copy: "Made for African businesses and customers." },
];

const pillars = [
  {
    icon: Send,
    title: "Move Money",
    description: "Send and receive money in seconds, to any bank or Payroxa account.",
  },
  {
    icon: Wallet,
    title: "Get Paid",
    description: "Collect payments with links, transfers, cards and QR — settled to your wallet.",
  },
  {
    icon: ShoppingBag,
    title: "Sell",
    description: "Launch a storefront, list products and reach customers already on Payroxa.",
  },
  {
    icon: Briefcase,
    title: "Run Your Business",
    description: "Invoices, records and insights that keep the numbers where you can see them.",
  },
  {
    icon: Truck,
    title: "Move Your Business",
    description: "Fulfil orders with delivery and logistics built around your storefront.",
  },
];

const ecosystem = [
  { icon: Smartphone, title: "Airtime & data", description: "Top up any network in a tap." },
  { icon: Gauge, title: "Bills & utilities", description: "Electricity, cable TV and internet." },
  { icon: CreditCard, title: "Card payments", description: "Accept cards from local customers." },
  { icon: Send, title: "Bank transfers", description: "Payouts to every Nigerian bank." },
  { icon: ShoppingBag, title: "Gift cards", description: "Buy and send digital value instantly." },
  { icon: Bike, title: "Rides & delivery", description: "Movement services inside one app." },
];

const businessTypes = [
  "Retail shops",
  "Restaurants & food vendors",
  "Fashion & beauty brands",
  "Online sellers",
  "Service professionals",
  "Logistics & delivery",
  "Agents & merchants",
  "Growing SMEs",
];

const security = [
  { icon: Lock, title: "Encryption everywhere", copy: "Data is encrypted in transit and at rest." },
  {
    icon: Fingerprint,
    title: "Verified identities",
    copy: "Tiered verification keeps accounts real.",
  },
  { icon: ShieldCheck, title: "Fraud monitoring", copy: "Suspicious activity is flagged early." },
  {
    icon: BarChart3,
    title: "Full audit trail",
    copy: "Every transaction is recorded and traceable.",
  },
];

const steps = [
  { step: "01", title: "Create your account", copy: "Sign up with your phone number or email." },
  {
    step: "02",
    title: "Verify your business",
    copy: "Complete verification to unlock full limits.",
  },
  { step: "03", title: "Fund your wallet", copy: "Add money by transfer, card or agent." },
  { step: "04", title: "Start transacting", copy: "Pay, get paid, sell and grow from one place." },
];

const faqs = [
  {
    q: "What is Payroxa?",
    a: "Payroxa is a business platform that brings payments, a secure wallet, cards, a storefront and business tools together in one app.",
  },
  {
    q: "Who can use Payroxa?",
    a: "Individuals, merchants and registered businesses across Africa who want a simpler way to move money and get paid.",
  },
  {
    q: "How long does verification take?",
    a: "Most accounts are verified shortly after the required details are submitted. Higher limits may need additional business documents.",
  },
  {
    q: "Can I sell on Payroxa without a website?",
    a: "Yes. Payroxa Store gives you a storefront and a shareable link, so you can start selling without building a website.",
  },
  {
    q: "Is my money safe?",
    a: "Payroxa uses encryption, identity verification and continuous monitoring, and works with licensed financial partners.",
  },
];

function HomePage() {
  const cms = usePublicCms();
  const hero = cms.hero || {};
  const activeProducts = cms.products?.filter((p) => p.published) || [];
  const activeBusinessTypes = cms.businessTypes?.filter((b) => b.active).map((b) => b.name) || businessTypes;
  const activeFaqs = cms.faqs?.filter((f) => f.status === "published") || [];

  return (
    <>
      {/* 2. Hero */}
      <section className="gradient-soft relative overflow-hidden px-5 pt-14 pb-16 sm:pt-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
              {hero.eyebrow || siteConfig.tagline}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              {hero.headline || "Everything your business needs to"}{" "}
              <span className="text-gradient-brand">
                {hero.highlightedText || "move, sell and grow."}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              {hero.description ||
                "Send, receive, save and manage your money with confidence — then sell to customers, issue cards and run the whole business from one Payroxa account."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PayroxaButton
                href={hero.primaryCtaUrl || PAYROXA_LINKS.register}
                size="lg"
              >
                {hero.primaryCtaLabel || "Get Started"}{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </PayroxaButton>
              <PayroxaButton
                href={hero.secondaryCtaUrl || PAYROXA_LINKS.login}
                variant="outline"
                size="lg"
              >
                {hero.secondaryCtaLabel || "Sign In"}
              </PayroxaButton>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              {hero.footnote || "Your Money. Your Control. Your Payroxa."}
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute inset-8 rounded-full bg-lavender-strong/50 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={hero.heroImageUrl || heroImage}
              alt={hero.heroImageAlt || "Payroxa mobile wallet app shown with a Payroxa payment card and coins"}
              width={1280}
              height={1280}
              className="relative mx-auto w-full max-w-lg rounded-4xl"
            />
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      <Section className="py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => (
            <li key={item.title} className="surface-card flex items-start gap-3 p-5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. More than payments */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="More than payments"
          title="Five things Payroxa does for your business"
          description="One account replaces the tangle of apps, spreadsheets and bank visits."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <ProductCard key={p.title} icon={p.icon} title={p.title} description={p.description} />
          ))}
        </div>
      </Section>

      {/* 5. Payroxa Store */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow={cms.storeSection?.eyebrow || "Payroxa Store"}
              title={cms.storeSection?.title || "Shop smarter — and sell smarter"}
              description={
                cms.storeSection?.description ||
                "Open a storefront, list your products and let customers discover and pay you inside Payroxa. No website required."
              }
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>• Product listings, categories and store profile</li>
              <li>• Payments settled straight into your wallet</li>
              <li>• Orders, delivery and customer records in one view</li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PayroxaButton href={PAYROXA_LINKS.store}>Create Your Store</PayroxaButton>
              <PayroxaButton to="/store" variant="outline">
                Learn more
              </PayroxaButton>
            </div>
          </div>
          <div className="gradient-navy rounded-4xl p-8 text-navy-foreground shadow-card">
            <Store className="size-8" aria-hidden="true" />
            <p className="mt-6 text-2xl font-semibold">
              Discover great products from trusted businesses.
            </p>
            <p className="mt-3 text-sm text-navy-foreground/75">
              Payroxa Store puts your business in front of customers already moving money on Payroxa
              every day.
            </p>
          </div>
        </div>
      </Section>

      {/* 6. Payment ecosystem */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Payment ecosystem"
          title="Every everyday payment, in one place"
          description="From airtime to bank transfers, Payroxa covers the payments your business and customers make daily."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeProducts.length > 0
            ? activeProducts.map((item) => {
                const IconComp = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Package;
                return (
                  <ProductCard
                    key={item.id}
                    icon={IconComp}
                    title={item.name}
                    description={item.shortDescription}
                  />
                );
              })
            : ecosystem.map((item) => (
                <ProductCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
        </div>
        <div className="mt-10 flex justify-center">
          <PayroxaButton to="/payments" variant="outline">
            Explore payments
          </PayroxaButton>
        </div>
      </Section>

      {/* 7. Wallet */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="surface-card order-2 p-8 lg:order-1">
            <p className="text-sm text-muted-foreground">Multi-currency balances</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="gradient-brand rounded-2xl p-5 text-primary-foreground">
                <p className="text-xs opacity-80">Naira wallet</p>
                <p className="mt-2 text-xl font-bold">Instant transfers</p>
              </div>
              <div className="gradient-navy rounded-2xl p-5 text-navy-foreground">
                <p className="text-xs opacity-80">Dollar wallet</p>
                <p className="mt-2 text-xl font-bold">Cross-border ready</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li>• Add money, send, withdraw, exchange</li>
              <li>• Statements and transaction history</li>
              <li>• Saved bank accounts and beneficiaries</li>
              <li>• Clear limits and spending controls</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Wallet"
              title={cms.walletSection?.title || "A secure wallet for your funds"}
              description={
                cms.walletSection?.description ||
                "Hold, move and track your money with balances you can see at a glance and controls you actually understand."
              }
            />
            <div className="mt-8">
              <PayroxaButton href={PAYROXA_LINKS.wallet}>Open your wallet</PayroxaButton>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Business dashboard */}
      <Section tone="navy">
        <SectionHeading
          tone="navy"
          eyebrow="Business dashboard"
          title="Know your numbers without the guesswork"
          description="Track inflows, outflows, orders and customers with reporting built for the way African businesses actually operate."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Inflow & outflow",
              copy: "See money in and money out per day, week or month.",
            },
            { label: "Order insights", copy: "Best sellers, repeat buyers and fulfilment status." },
            { label: "Team access", copy: "Give staff the access they need, nothing more." },
            { label: "Exportable records", copy: "Download statements for accounting and audits." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 p-6"
            >
              <p className="font-semibold">{item.label}</p>
              <p className="mt-2 text-sm text-navy-foreground/70">{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <PayroxaButton href={PAYROXA_LINKS.business} variant="outline">
            Start with Payroxa Business
          </PayroxaButton>
        </div>
      </Section>

      {/* 9. Business types */}
      <Section>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for the businesses that keep Africa moving"
        />
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {activeBusinessTypes.map((type) => (
            <li
              key={type}
              className="rounded-full border border-border bg-muted/60 px-5 py-2.5 text-sm font-medium"
            >
              {type}
            </li>
          ))}
        </ul>
      </Section>

      {/* 10. Security */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Security"
          title="Safe. Fast. Reliable. That's the Payroxa way."
          description="Security is not a feature we added later — it shapes how every part of Payroxa is built."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {security.map((item) => (
            <ProductCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.copy}
            />
          ))}
        </div>
      </Section>

      {/* 11. How Payroxa works */}
      <Section>
        <SectionHeading eyebrow="How it works" title="Live on Payroxa in four steps" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.step} className="surface-card p-6">
              <span className="text-sm font-bold text-primary">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 12. Cards */}
      <Section tone="soft">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Cards"
              title={cms.cardsSection?.title || "Virtual and physical cards for real spending"}
              description={
                cms.cardsSection?.description ||
                "Spend online and in store, set limits, freeze a card instantly and keep every transaction visible."
              }
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PayroxaButton href={PAYROXA_LINKS.cards}>Get a card</PayroxaButton>
              <PayroxaButton to="/cards" variant="text">
                See how cards work
              </PayroxaButton>
            </div>
          </div>
          <div className="gradient-brand relative rounded-4xl p-8 text-primary-foreground shadow-glow">
            <CreditCard className="size-8" aria-hidden="true" />
            <p className="mt-8 text-lg font-semibold tracking-[0.3em]">•••• •••• •••• 7528</p>
            <div className="mt-6 flex items-center justify-between text-sm opacity-85">
              <span>Payroxa Card</span>
              <span>••/••</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 13. FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {activeFaqs.length > 0
            ? activeFaqs.map((f) => (
                <details key={f.id} className="surface-card group p-6">
                  <summary className="cursor-pointer list-none text-base font-semibold">
                    {f.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
                </details>
              ))
            : faqs.map((f) => (
                <details key={f.q} className="surface-card group p-6">
                  <summary className="cursor-pointer list-none text-base font-semibold">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
        </div>
      </Section>

      {/* 14. Final CTA */}
      <FinalCTA />
    </>
  );
}
