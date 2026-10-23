import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Megaphone, Loader2, LogOut, Send, Check, X, Pause } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PayroxaButton } from "@/components/PayroxaButton";
import { MarketplaceHeader, MarketplaceBreadcrumb } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceCart } from "@/components/marketplace/MarketplaceCart";
import { useCart } from "@/hooks/useCart";
import { pageHead } from "@/config/seo";
import { advertSchema } from "@/lib/advertising";
import { listMyAdvertsFn, listAdvertReviewsFn, submitAdvertFn, reviewAdvertFn } from "@/cms/advertising.functions";

export const Route = createFileRoute("/marketplace/advertise")({
  head: () => pageHead("Advertise on Payroxa Marketplace", "Submit your merchant advert for review and reach shoppers on Payroxa Marketplace.", "/marketplace/advertise"),
  component: AdvertisePage,
});

const inputClass = "mt-2 h-11 w-full rounded-sm border border-market-line bg-background px-3 text-sm";
function AdvertisePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalCount } = useCart();
  const queryClient = useQueryClient();
  const submit = useServerFn(submitAdvertFn);
  const listMine = useServerFn(listMyAdvertsFn);
  const listReviews = useServerFn(listAdvertReviewsFn);
  const review = useServerFn(reviewAdvertFn);
  const [form, setForm] = useState({ business_name: "", title: "", image_url: "", destination_url: "", placement: "banner", starts_at: "", ends_at: "" });
  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => { if (active) { setSession(data.session); setReady(true); } });
    const { data } = supabase.auth.onAuthStateChange((event, value) => {
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED", "INITIAL_SESSION"].includes(event)) { setSession(value); setReady(true); }
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const adverts = useQuery({ queryKey: ["my-adverts", session?.user.id], queryFn: () => listMine(), enabled: !!session });
  const admin = useQuery({ queryKey: ["advert-admin", session?.user.id], queryFn: async () => {
    const { data, error: roleError } = await supabase.rpc("is_advert_admin");
    if (roleError) throw new Error("Advert permissions could not be checked.");
    return data;
  }, enabled: !!session });
  const reviews = useQuery({ queryKey: ["advert-reviews", session?.user.id], queryFn: () => listReviews(), enabled: !!session && admin.data === true });
  async function signIn() {
    setError("");
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/marketplace/advertise` });
      if (result.error) setError("Sign-in was not completed. Please try again.");
    } catch { setError("Sign-in is unavailable. Please try again."); }
  }
  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const parsed = advertSchema.safeParse({ ...form, starts_at: form.starts_at ? new Date(`${form.starts_at}T00:00:00Z`).toISOString() : "", ends_at: form.ends_at ? new Date(`${form.ends_at}T00:00:00Z`).toISOString() : "" });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your advert details."); return; }
    setBusy(true);
    try {
      await submit({ data: parsed.data });
      setMessage("Advert submitted for review. It will not appear until approved.");
      await queryClient.invalidateQueries({ queryKey: ["my-adverts"] });
    } catch { setError("Your advert could not be submitted. Please try again."); }
    finally { setBusy(false); }
  }
  async function moderate(id: string, status: "approved" | "rejected" | "paused", note: string) {
    setBusy(true); setError("");
    try {
      await review({ data: { id, status, review_note: note } });
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["advert-reviews"] }), queryClient.invalidateQueries({ queryKey: ["my-adverts"] }), queryClient.invalidateQueries({ queryKey: ["public-marketplace-adverts"] })]);
      setMessage("Advert review saved.");
    } catch { setError("The review could not be saved. Please try again."); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen bg-market-paper pb-12 text-market-ink">
    <MarketplaceHeader totalCount={totalCount} onCartOpen={() => setCartOpen(true)} />
    <main className="mx-auto max-w-[1200px] px-4">
      <MarketplaceBreadcrumb current="Advertise" />
      <div className="border-b border-market-line py-6"><Megaphone className="mb-3 size-8 text-primary" /><h1 className="font-market-display text-3xl font-bold">Advertise on Payroxa</h1><p className="mt-2 text-sm text-market-muted">Merchant sponsorships · Marketplace placements</p></div>
      {error && <p role="alert" className="my-4 text-sm text-destructive">{error}</p>}
      {message && <p role="status" className="my-4 border-l-4 border-primary bg-accent p-4 text-sm">{message}</p>}
      {!ready ? <Loader2 className="my-12 animate-spin text-primary" /> : !session ? <section className="py-10"><h2 className="text-xl font-bold">Your next customers are here</h2><p className="mb-5 mt-2 text-sm text-market-muted">Sign in to submit an advert and follow its review.</p><PayroxaButton onClick={signIn} className="rounded-sm">Continue with Google</PayroxaButton></section> : <>
        <div className="flex flex-wrap items-center justify-between gap-3 py-5"><h2 className="text-xl font-bold">Submit an advert</h2><PayroxaButton variant="text" onClick={async () => { await supabase.auth.signOut(); queryClient.removeQueries({ queryKey: ["my-adverts"] }); queryClient.removeQueries({ queryKey: ["advert-reviews"] }); }}><LogOut className="size-4" />Sign out</PayroxaButton></div>
        <form onSubmit={submitForm} className="grid gap-5 border-b border-market-line pb-8 sm:grid-cols-2">
          {([ ["business_name", "Business name", "text", 100], ["title", "Advert title", "text", 120], ["image_url", "Advert image URL", "url", 2048], ["destination_url", "Destination URL", "url", 2048] ] as const).map(([key, label, type, max]) => <label key={key} className="text-sm font-semibold">{label}<input required type={type} maxLength={max} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} /></label>)}
          <label className="text-sm font-semibold">Placement<select value={form.placement} onChange={(e) => setForm({ ...form, placement: e.target.value })} className={inputClass}><option value="banner">Banner</option><option value="sidebar">Sidebar</option></select></label>
          <div className="grid grid-cols-2 gap-3">{([ ["starts_at", "Start date (UTC)"], ["ends_at", "End date (UTC)"] ] as const).map(([key, label]) => <label key={key} className="text-sm font-semibold">{label}<input required type="date" value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputClass} /></label>)}</div>
          <p className="text-xs text-market-muted sm:col-span-2">All adverts require review. No payment is collected and placement is not guaranteed.</p>
          <PayroxaButton type="submit" disabled={busy} className="w-fit rounded-sm">{busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}Submit for review</PayroxaButton>
        </form>
        <section className="py-8"><h2 className="mb-4 text-xl font-bold">Your adverts</h2>{adverts.isPending ? <Loader2 className="animate-spin" /> : adverts.isError ? <PayroxaButton variant="outline" onClick={() => adverts.refetch()}>Retry adverts</PayroxaButton> : !adverts.data?.length ? <p className="text-sm text-market-muted">No adverts submitted yet.</p> : <div className="grid gap-4 sm:grid-cols-2">{adverts.data.map((ad) => <article key={ad.id} className="rounded-sm border border-market-line bg-card p-4"><p className="text-xs font-semibold uppercase text-primary">{ad.status} · {ad.placement}</p><h3 className="mt-2 break-words font-bold">{ad.title}</h3><p className="mt-1 text-xs text-market-muted">{ad.starts_at.slice(0,10)} — {ad.ends_at.slice(0,10)} UTC</p>{ad.review_note && <p className="mt-3 text-sm">{ad.review_note}</p>}</article>)}</div>}</section>
        {admin.isError && <p className="text-sm text-destructive">Advert permissions could not be checked.</p>}
        {admin.data === true && <section className="border-t border-market-line py-8"><h2 className="mb-4 text-xl font-bold">Advert review queue</h2>{reviews.isError ? <PayroxaButton onClick={() => reviews.refetch()}>Retry reviews</PayroxaButton> : reviews.isPending ? <Loader2 className="animate-spin" /> : !reviews.data?.length ? <p className="text-sm text-market-muted">No adverts to review.</p> : reviews.data.map((ad) => <ReviewRow key={ad.id} ad={ad} busy={busy} onReview={moderate} />)}</section>}
      </>}
    </main><MarketplaceCart open={cartOpen} onClose={() => setCartOpen(false)} />
  </div>;
}

function ReviewRow({ ad, busy, onReview }: { ad: { id: string; title: string; business_name: string; image_url: string; destination_url: string; status: string; review_note: string }; busy: boolean; onReview: (id: string, status: "approved" | "rejected" | "paused", note: string) => Promise<void> }) {
  const [note, setNote] = useState(ad.review_note);
  return <article className="mb-4 rounded-sm border border-market-line bg-card p-4"><div className="flex flex-wrap justify-between gap-3"><h3 className="break-words font-bold">{ad.title} · {ad.business_name}</h3><span className="text-xs uppercase text-primary">{ad.status}</span></div><div className="my-3 flex flex-wrap gap-4 text-sm"><a href={ad.image_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">Inspect image</a><a href={ad.destination_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">Inspect destination</a></div><label className="text-sm">Review note<input value={note} maxLength={500} onChange={(event) => setNote(event.target.value)} className={inputClass} /></label><div className="mt-4 flex flex-wrap gap-3"><PayroxaButton disabled={busy} onClick={() => onReview(ad.id, "approved", note)} className="rounded-sm"><Check className="size-4" />Approve</PayroxaButton><PayroxaButton disabled={busy} onClick={() => onReview(ad.id, "rejected", note)} variant="outline" className="rounded-sm"><X className="size-4" />Reject</PayroxaButton><PayroxaButton disabled={busy} onClick={() => onReview(ad.id, "paused", note)} variant="outline" className="rounded-sm"><Pause className="size-4" />Pause</PayroxaButton></div></article>;
}