import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Headphones,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";
import { usePublicCms } from "@/cms/context/PublicCmsContext";

const title = "Contact Payroxa — We're Here to Help 24/7";
const description =
  "Have a question about your Payroxa wallet, business tools, or API? Reach our dedicated support team via email, phone, or live chat.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/contact` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings, social } = usePublicCms();
  const supportEmail = settings?.supportEmail || siteConfig.contact.email;
  const supportPhone = settings?.supportPhone || "+234 800 PAYROXA";

  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden px-5 pt-12 pb-16 sm:pt-20 lg:pb-24">
        <div className="mx-auto w-full max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-primary">
            We're Always Here
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Let's connect and <span className="text-gradient-brand">solve it together.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Whether you need help with a transaction, want to explore an enterprise partnership, or
            have feedback, our team responds swiftly.
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <Section tone="soft">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Direct Info */}
          <div className="space-y-6 lg:col-span-5">
            <div className="surface-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Email Support</h4>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {supportEmail}
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Average response: &lt; 15 mins
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Phone &amp; WhatsApp</h4>
                  <p className="text-sm font-medium text-foreground">{supportPhone}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Available Mon - Sat, 8am - 8pm WAT
                  </p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Headquarters</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Victoria Island, Lagos State, Nigeria
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Operating across all 36 Nigerian states
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3">
                <Headphones className="size-5 text-primary" />
                <h4 className="text-sm font-bold text-foreground">Live In-App Chat</h4>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                For the fastest assistance with an ongoing transaction, log into the Payroxa app and
                tap "Help &amp; Support" to chat live with our support specialists.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="surface-card p-8 lg:col-span-7">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-foreground">
                  Message Sent Successfully
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Thank you, <span className="font-semibold text-foreground">{form.name}</span>. Our
                  support team has received your message and will respond to{" "}
                  <span className="font-semibold text-foreground">{form.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", category: "General Inquiry", message: "" });
                  }}
                  className="mt-6 rounded-full bg-muted px-6 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted/80"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Send Us a Direct Message</h3>
                <p className="text-xs text-muted-foreground">
                  Fill out the form below and an agent will be assigned to your ticket.
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chioma Adeyemi"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. chioma@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Inquiry Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Transaction Support">Transaction / Transfer Support</option>
                    <option value="Business Account Setup">Payroxa Business &amp; Invoicing</option>
                    <option value="Storefront Assistance">Payroxa Online Store</option>
                    <option value="Virtual Card Support">Payroxa Cards</option>
                    <option value="Partnership & Enterprise">
                      Partnership &amp; API Integration
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can assist you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* 3. Final CTA */}
      <FinalCTA
        title="Ready to get started with Payroxa?"
        description="Experience modern, dependable African payments today."
      />
    </>
  );
}

export default ContactPage;
