import { describe, expect, test } from "bun:test";
import { advertSchema, hasAdConsent, reviewSchema, validNetworkConfig } from "./advertising";

const advert = { business_name: "Merchant", title: "Summer collection", image_url: "https://example.com/banner.jpg", destination_url: "https://example.com/shop", placement: "banner", starts_at: "2026-10-23T00:00:00.000Z", ends_at: "2026-10-24T00:00:00.000Z" };
describe("Advertising safeguards", () => {
  test("accepts merchant submissions for either reserved placement", () => {
    expect(advertSchema.safeParse(advert).success).toBe(true);
    expect(advertSchema.safeParse({ ...advert, placement: "sidebar" }).success).toBe(true);
    expect(advertSchema.safeParse({ ...advert, placement: "hero" }).success).toBe(false);
  });
  test("rejects unsafe advert links", () => {
    expect(advertSchema.safeParse({ ...advert, destination_url: "javascript:alert(1)" }).success).toBe(false);
    expect(advertSchema.safeParse({ ...advert, image_url: "https://user:pass@example.com/a.jpg" }).success).toBe(false);
  });
  test("requires an end date after the start date", () => {
    expect(advertSchema.safeParse({ ...advert, ends_at: advert.starts_at }).success).toBe(false);
  });
  test("merchants cannot submit approval or ownership fields", () => {
    const result = advertSchema.parse({ ...advert, status: "approved", owner_id: "someone" });
    expect("status" in result).toBe(false);
    expect("owner_id" in result).toBe(false);
  });
  test("moderation cannot set an arbitrary status", () => {
    expect(reviewSchema.safeParse({ id: "00000000-0000-4000-8000-000000000001", status: "published", review_note: "" }).success).toBe(false);
  });
  test("no advertising without a completed CMP signal", () => {
    expect(hasAdConsent({})).toBe(false);
    expect(hasAdConsent({ cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: false })).toBe(true);
    expect(hasAdConsent({ cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true, purpose: { consents: { "1": true, "3": true, "4": true } }, vendor: { consents: { "755": true } } })).toBe(true);
    expect(hasAdConsent({ cmpStatus: "loaded", eventStatus: "tcloaded", gdprApplies: true })).toBe(false);
  });
  test("requires real-format publisher and slot identifiers", () => {
    expect(validNetworkConfig("ca-pub-1234567890123456", "1234567890")).toBe(true);
    expect(validNetworkConfig("", "")).toBe(false);
  });
});