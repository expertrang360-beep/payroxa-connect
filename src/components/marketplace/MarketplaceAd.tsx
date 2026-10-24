import { ArrowUpRight, Megaphone } from "lucide-react";
import { marketplaceAds } from "@/config/marketplace-promotions";
import { siteConfig } from "@/config/siteConfig";
import { PayroxaButton } from "@/components/PayroxaButton";
import { useQuery } from "@tanstack/react-query";
import { listPublicAdvertsFn } from "@/cms/advertising.functions";
import { NetworkAdvert } from "./NetworkAdvert";

export function MarketplaceAd({ placement }: { placement: "sidebar" | "banner" }) {
  const { data: adverts = [] } = useQuery({
    queryKey: ["public-marketplace-adverts"],
    queryFn: () => listPublicAdvertsFn(),
    staleTime: 60_000,
    retry: false,
  });
  const merchant = adverts.find(
    (item) =>
      item.placement === placement &&
      Date.parse(item.starts_at) <= Date.now() &&
      Date.parse(item.ends_at) > Date.now(),
  );
  const ad = merchant
    ? { image: merchant.image_url, href: merchant.destination_url }
    : marketplaceAds[placement];
  const filled = Boolean(ad.image && ad.href);
  return (
    <div className="flex h-full min-w-0 flex-col gap-3">
      <aside
        aria-label={filled ? "Sponsored advertisement" : "Advertising space"}
        className="flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-market-line bg-card"
      >
        <p className="border-b border-market-line px-3 py-1.5 text-[10px] font-semibold uppercase text-market-muted">
          {filled ? "Sponsored" : "Advertisement"}
        </p>
        {filled ? (
          <a
            href={ad.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            aria-label={merchant ? `Visit ${merchant.business_name}` : "Visit sponsor"}
            className="block flex-1"
          >
            <img
              src={ad.image}
              alt={merchant?.title ?? "Sponsored advertisement"}
              loading="lazy"
              className={`h-full w-full object-contain ${placement === "banner" ? "max-h-40" : "min-h-44"}`}
            />
          </a>
        ) : (
          <div
            className={`flex flex-1 gap-3 p-4 ${placement === "sidebar" ? "flex-col justify-center" : "flex-wrap items-center sm:justify-between"}`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <Megaphone className="size-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-bold">Your brand. Their next discovery.</p>
                <p className="mt-1 text-xs text-market-muted">Advertise on Payroxa Marketplace</p>
              </div>
            </div>
            <PayroxaButton
              to="/marketplace/advertise"
              variant="outline"
              size="sm"
              className="w-fit shrink-0 rounded-sm"
            >
              Advertise here <ArrowUpRight className="size-4" />
            </PayroxaButton>
          </div>
        )}
      </aside>
      <NetworkAdvert placement={placement} />
    </div>
  );
}
