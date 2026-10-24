import { z } from "zod";

export const secureAdUrl = z
  .string()
  .trim()
  .url()
  .max(2048)
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  }, "Use a public HTTPS URL without credentials.");

export const advertSchema = z
  .object({
    business_name: z.string().trim().min(1).max(100),
    title: z.string().trim().min(1).max(120),
    image_url: secureAdUrl,
    destination_url: secureAdUrl,
    placement: z.enum(["sidebar", "banner"]),
    starts_at: z.string().datetime(),
    ends_at: z.string().datetime(),
  })
  .refine((ad) => Date.parse(ad.ends_at) > Date.parse(ad.starts_at), {
    message: "The end date must be after the start date.",
    path: ["ends_at"],
  });

export const reviewSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["approved", "rejected", "paused"]),
  review_note: z.string().trim().max(500),
});

export function hasAdConsent(data: {
  gdprApplies?: boolean;
  eventStatus?: string;
  cmpStatus?: string;
  purpose?: { consents?: Record<string, boolean> };
  vendor?: { consents?: Record<string, boolean> };
}) {
  if (
    data.cmpStatus !== "loaded" ||
    !["tcloaded", "useractioncomplete"].includes(data.eventStatus ?? "")
  )
    return false;
  if (data.gdprApplies === false) return true;
  return (
    data.gdprApplies === true &&
    data.vendor?.consents?.["755"] === true &&
    ["1", "3", "4"].every((purpose) => data.purpose?.consents?.[purpose] === true)
  );
}

export function validNetworkConfig(publisher: string, slot: string) {
  return /^ca-pub-\d{16}$/.test(publisher) && /^\d{10}$/.test(slot);
}
