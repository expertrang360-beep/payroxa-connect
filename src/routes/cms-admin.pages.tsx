import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";

export const Route = createFileRoute("/cms-admin/pages")({
  component: CmsPagesListPage,
});

function CmsPagesListPage() {
  const pages = [
    {
      title: "Home Page",
      slug: "/",
      description: "Main Payroxa landing page with Hero, Store, Wallet, Products, and FAQ",
      editUrl: "/cms-admin/hero",
    },
    {
      title: "Business Solutions",
      slug: "/business",
      description: "Dedicated features and financial tools for merchants & SMEs",
      editUrl: "/cms-admin/business",
    },
    {
      title: "Payments & Collections",
      slug: "/payments",
      description: "Instant settlement, payment links, transfers, and QR codes",
      editUrl: "/cms-admin/products",
    },
    {
      title: "Storefront (Payroxa Store)",
      slug: "/store",
      description: "Online store creator without needing a standalone website",
      editUrl: "/cms-admin/content",
    },
    {
      title: "Cards (Virtual & Physical)",
      slug: "/cards",
      description: "Virtual cards and debit card issuance for teams & businesses",
      editUrl: "/cms-admin/content",
    },
    {
      title: "Pricing & Limits",
      slug: "/pricing",
      description: "Transparent fees and verification tier limits",
      editUrl: "/cms-admin/faq",
    },
    {
      title: "About Payroxa",
      slug: "/about",
      description: "Company background, African fintech mission, and leadership",
      editUrl: "/cms-admin/settings",
    },
    {
      title: "Contact & Support",
      slug: "/contact",
      description: "Customer helpdesk, business inquiries, and office locations",
      editUrl: "/cms-admin/settings",
    },
  ];

  return (
    <div>
      <CmsHeader
        title="Website Pages Management"
        description="View and jump directly into content modules powering each public marketing route."
      />

      <div className="space-y-3">
        {pages.map((p) => (
          <CmsCard key={p.slug}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Layers className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                    <span className="font-mono rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                      {p.slug}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <CheckCircle2 className="size-3" />
                      Live
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{p.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={p.slug}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <span>Preview</span>
                  <ExternalLink className="size-3" />
                </a>
                <Link
                  to={p.editUrl}
                  className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700"
                >
                  <span>Edit Content</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </CmsCard>
        ))}
      </div>
    </div>
  );
}
