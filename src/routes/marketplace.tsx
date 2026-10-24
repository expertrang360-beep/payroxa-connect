import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { WEBSITE_URL } from "@/config/siteConfig";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Payroxa Marketplace | Live Market Mirror" },
      {
        name: "description",
        content:
          "Discover verified stores and products directly mirrored from Payroxa Marketplace.",
      },
      { property: "og:title", content: "Payroxa Marketplace | Live Market Mirror" },
      {
        property: "og:description",
        content: "Live mirror of https://app.payroxa.com.ng/market with secure checkout.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${WEBSITE_URL}/marketplace` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${WEBSITE_URL}/marketplace` }],
  }),
  component: MarketplacePage,
});

function MarketplacePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <Link
        to="/"
        className="absolute top-3 left-3 z-50 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-md backdrop-blur-sm transition hover:bg-white hover:shadow-lg"
        title="Back to Home"
      >
        <ArrowLeft className="size-4" /> Home
      </Link>
      <iframe
        src="https://app.payroxa.com.ng/market"
        title="Payroxa Market Mirror"
        className="h-full w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
      />
    </div>
  );
}
