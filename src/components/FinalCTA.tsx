import PayroxaButton from "@/components/PayroxaButton";
import { PAYROXA_LINKS } from "@/config/links";
import Section from "@/components/Section";

export function FinalCTA({
  title = "Ready to run your business on Payroxa?",
  description = "Create your free account in minutes and start moving money, getting paid and selling — all from one place.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Section className="pb-20">
      <div className="gradient-brand relative overflow-hidden rounded-4xl px-6 py-14 text-center text-primary-foreground shadow-glow sm:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-primary-foreground/85">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PayroxaButton href={PAYROXA_LINKS.register} variant="outline" size="lg">
              Get Started
            </PayroxaButton>
            <PayroxaButton href={PAYROXA_LINKS.login} variant="secondary" size="lg">
              Sign In
            </PayroxaButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default FinalCTA;
