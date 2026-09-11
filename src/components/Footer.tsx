import { Link } from "@tanstack/react-router";

import BrandLogo from "@/components/BrandLogo";
import { PAYROXA_LINKS } from "@/config/links";
import { siteConfig } from "@/config/siteConfig";

const productLinks = [
  { label: "Payments", to: "/payments" as const },
  { label: "Wallet", href: PAYROXA_LINKS.wallet },
  { label: "Cards", to: "/cards" as const },
  { label: "Store", to: "/store" as const },
  { label: "Business", to: "/business" as const },
];

const companyLinks = [
  { label: "About", to: "/about" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Footer() {
  return (
    <footer className="gradient-navy text-navy-foreground">
      <div className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo tone="dark" />
            <p className="mt-4 max-w-xs text-sm text-navy-foreground/70">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-sm text-navy-foreground/70">{siteConfig.contact.handle}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              {productLinks.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className="hover:text-navy-foreground">
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy-foreground"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-navy-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Get started</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
              <li>
                <a
                  href={PAYROXA_LINKS.register}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground"
                >
                  Create an account
                </a>
              </li>
              <li>
                <a
                  href={PAYROXA_LINKS.login}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href={PAYROXA_LINKS.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground"
                >
                  Open Payroxa
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-navy-foreground">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-foreground/15 pt-6 text-sm text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. Safe. Fast. Reliable.
          </p>
          <ul className="flex flex-wrap gap-4">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-navy-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
