import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { advertSchema, reviewSchema } from "@/lib/advertising";

export const submitAdvertFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => advertSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: advert, error } = await context.supabase.from("marketplace_adverts")
      .insert({ ...data, owner_id: context.userId }).select("id").single();
    if (error) throw new Error("Your advert could not be submitted. Please try again.");
    return advert;
  });

export const listMyAdvertsFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from("marketplace_adverts").select("*").eq("owner_id", context.userId).order("created_at", { ascending: false }).limit(50);
    if (error) throw new Error("Your adverts could not be loaded.");
    return data;
  });

export const listAdvertReviewsFn = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc("is_advert_admin");
    if (roleError || !admin) throw new Error("Administrator access is required.");
    const { data, error } = await context.supabase.from("marketplace_adverts").select("*").order("created_at", { ascending: false }).limit(100);
    if (error) throw new Error("Advert reviews could not be loaded.");
    return data;
  });

export const reviewAdvertFn = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => reviewSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc("is_advert_admin");
    if (roleError || !admin) throw new Error("Administrator access is required.");
    const { data: result, error } = await context.supabase.from("marketplace_adverts").update({ status: data.status, review_note: data.review_note }).eq("id", data.id).select("id").single();
    if (error) throw new Error("The review could not be saved.");
    return result;
  });

export const listPublicAdvertsFn = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return [];
  const { createClient } = await import("@supabase/supabase-js");
  const { supabasePublic: unused } = { supabasePublic: undefined };
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => {
    const headers = new Headers(init?.headers);
    if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  } } });
  const { data, error } = await client.from("marketplace_adverts").select("id,business_name,title,image_url,destination_url,placement,starts_at,ends_at,created_at").order("created_at", { ascending: false }).limit(20);
  return error ? [] : data ?? [];
});