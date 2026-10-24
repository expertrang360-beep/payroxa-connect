import { createFileRoute } from "@tanstack/react-router";
import {
  Heart,
  ShieldCheck,
  Zap,
  Users,
  Building2,
  Globe2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Target,
  Award,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "About Payroxa — Building the Financial Operating System for Africa";
const description =
  "Payroxa is on a mission to simplify payments, power digital commerce, and unlock economic freedom for African individuals and enterprises.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/about` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/about` }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Zap,
    title: "Relentless Speed",
    description:
      "Financial transactions should move as fast as modern conversation. We eliminate delays across every payment channel.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Security",
    description:
      "Your funds and data are guarded with military-grade encryption, biometric protocols, and proactive fraud engines.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description:
      "We build tools around the real daily hurdles of African merchants, shoppers, and families with 24/7 human support.",
  },
  {
    icon: Globe2,
    title: "Pan-African Vision",
    description:
      "Starting in Nigeria, we are constructing the digital financial rails to connect businesses and consumers across the continent.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Foundation & Wallet Architecture",
    desc: "Formed to resolve chronic payment drops and slow settlement across African digital commerce.",
  },
  {
    year: "2025",
    title: "Digital Storefronts & Invoicing",
    desc: "Empowered thousands of social media vendors and retail merchants to collect payments automatically.",
  },
  {
    year: "2026",
    title: "Borderless Cards & Enterprise API",
    desc: "Launched virtual USD issuance and robust business tools for pan-African growth.",
  },
];

function AboutPage() {
  const { links, settings } = usePublicCms();
  const registerUrl = links?.register || PAYROXA_LINKS.register;

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-20 sm:pt-20 lg:pb-28">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            Our Mission &amp; Story
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Empowering the next generation of{" "}
            <span className="text-gradient-brand">African commerce.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Payroxa was born out of a simple conviction: managing money, accepting customer
            payments, and running an online business should be effortless, fast, and transparent.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <Section tone="soft">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="surface-card p-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Target className="size-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">Our Mission</h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              To build modern, accessible, and ultra-reliable financial infrastructure that
              eliminates friction for millions of African entrepreneurs, creators, and everyday
              consumers.
            </p>
          </div>

          <div className="surface-card p-8">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Award className="size-6" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">Our Vision</h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              To become the unified digital operating system powering African trade—where anyone can
              accept payments, send money, and launch a global business from the palm of their hand.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Core Values */}
      <Section>
        <SectionHeading
          eyebrow="Values"
          title="The principles that guide how we build"
          description="Every product feature, server optimization, and customer conversation is rooted in our core tenets."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="surface-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Timeline */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Our Journey"
          title="Building with purpose and velocity"
          description="A look at our continuous growth and milestones as we expand our ecosystem."
        />
        <div className="mt-12 mx-auto max-w-3xl space-y-6">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="flex gap-5 rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <span className="font-mono text-xl font-extrabold text-primary">{m.year}</span>
              <div>
                <h4 className="text-base font-bold text-foreground">{m.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Final CTA */}
      <FinalCTA
        title="Be part of the Payroxa journey"
        description="Experience modern financial solutions built for you. Create your free account today."
      />
    </>
  );
}

export default AboutPage;
