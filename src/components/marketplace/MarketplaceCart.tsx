import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2, X, LockKeyhole } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import { useCart } from "@/hooks/useCart";

export function MarketplaceCart({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, totalCount, updateQuantity, removeFromCart } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const close = () => { if (!busy) { setCheckout(false); setError(""); onClose(); } };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true); setError("");
    try {
      const { createMarketplaceOrderFn } = await import("../../cms/marketplace-api");
      const result = await createMarketplaceOrderFn({ data: {
        customerName: name, customerEmail: "guest@example.com", customerPhone: phone,
        deliveryAddress: address, cartItems: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        origin: window.location.origin,
      } });
      if (result.success && result.checkoutUrl) window.location.href = result.checkoutUrl;
      else { setError(result.error || "Checkout could not be started. Please try again."); setBusy(false); }
    } catch (err) { setError(err instanceof Error ? err.message : "Checkout could not be started."); setBusy(false); }
  };
  return <Dialog.Root open={open} onOpenChange={(value) => { if (!value) close(); }}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[80] bg-market-ink/55" />
      <Dialog.Content onEscapeKeyDown={(event) => { if (busy) event.preventDefault(); }} onPointerDownOutside={(event) => { if (busy) event.preventDefault(); }} className="theme-marketplace fixed inset-y-0 right-0 z-[81] flex w-full max-w-lg flex-col bg-market-paper shadow-card outline-none">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-market-line bg-card p-4">
          <div><Dialog.Title className="font-market-display text-xl font-semibold">{checkout ? "Checkout" : `Cart (${totalCount})`}</Dialog.Title><Dialog.Description className="mt-1 text-xs text-market-muted">{checkout ? "Delivery details · Secure payment" : "Your selected products"}</Dialog.Description></div>
          <PayroxaButton disabled={busy} variant="text" ariaLabel="Close bag" onClick={close} className="size-11 px-0 text-market-ink"><X className="size-5" /></PayroxaButton>
        </div>
        {checkout ? <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 sm:p-6">
            <PayroxaButton variant="text" disabled={busy} onClick={() => { setCheckout(false); setError(""); }} className="h-10 text-market-muted"><ArrowLeft className="size-4" /> Back to cart</PayroxaButton>
            <div className="flex items-center gap-3 border-b border-market-line pb-4 text-sm"><span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">1</span><strong>Delivery details</strong><span className="ml-auto text-market-muted">2 · Payment</span></div>
            <label className="block text-sm font-medium">Full name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} disabled={busy} className="mt-2 h-12 w-full rounded-sm border border-market-line bg-card px-3 text-base outline-none focus:border-primary" /></label>
            <label className="block text-sm font-medium">Phone number<input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={busy} className="mt-2 h-12 w-full rounded-sm border border-market-line bg-card px-3 text-base outline-none focus:border-primary" /></label>
            <label className="block text-sm font-medium">Delivery address<textarea required autoComplete="street-address" rows={3} value={address} onChange={(event) => setAddress(event.target.value)} disabled={busy} className="mt-2 w-full rounded-sm border border-market-line bg-card p-3 text-base outline-none focus:border-primary" /></label>
            <div className="border-t border-market-line pt-4"><h3 className="mb-3 text-sm font-semibold">Order summary</h3>{items.map((item) => <div key={`${item.id}-${item.size}-${item.color}`} className="mb-2 flex items-start justify-between gap-3 text-sm"><span className="min-w-0 break-words text-market-muted">{item.quantity} × {item.name}</span><span className="shrink-0 font-medium">{item.currency} {(item.price * item.quantity).toLocaleString()}</span></div>)}</div>
            {error && <p role="alert" className="border-l-2 border-destructive bg-card p-3 text-sm text-destructive">{error}</p>}
          </div>
          <div className="shrink-0 border-t border-market-line bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"><div className="mb-4 flex justify-between gap-3 text-sm"><span>Order total</span><strong>{items[0]?.currency} {subtotal.toLocaleString()}</strong></div><PayroxaButton type="submit" disabled={busy || items.length === 0} className="h-12 w-full rounded-sm shadow-none">{busy ? <><Loader2 className="size-4 animate-spin" /> Preparing payment…</> : <>Continue to payment <ArrowRight className="size-4" /></>}</PayroxaButton></div>
        </form> : <>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
            {items.length === 0 ? <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center"><ShoppingBag className="size-12 text-market-muted" /><h3 className="font-market-display text-xl font-semibold">Your cart is empty</h3><p className="text-sm text-market-muted">Find your next favourite in the marketplace.</p><PayroxaButton onClick={close} className="mt-2 rounded-sm shadow-none">Continue shopping</PayroxaButton></div> : <div className="space-y-3">{items.map((item) => <article key={`${item.id}-${item.size}-${item.color}`} className="rounded-sm bg-card p-3 shadow-soft">
              <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3"><img src={item.image} alt={item.name} className="size-16 rounded-sm bg-muted object-contain" /><div className="min-w-0"><h3 className="line-clamp-2 text-sm leading-snug">{item.name}</h3><p className="mt-2 break-words text-base font-bold">{item.currency} {item.price.toLocaleString()}</p></div></div>
              <div className="mt-3 flex items-center justify-between gap-2"><PayroxaButton variant="text" size="sm" ariaLabel={`Remove ${item.name}`} onClick={() => removeFromCart(item.id, item.size, item.color)} className="h-11 px-0 text-primary"><Trash2 className="size-4" /> Remove</PayroxaButton><div className="flex items-center gap-1"><PayroxaButton variant="outline" ariaLabel="Decrease quantity" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="size-11 rounded-sm px-0"><Minus className="size-4" /></PayroxaButton><span className="w-8 text-center text-sm font-semibold">{item.quantity}</span><PayroxaButton ariaLabel="Increase quantity" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="size-11 rounded-sm px-0 shadow-none"><Plus className="size-4" /></PayroxaButton></div></div>
            </article>)}</div>}
          </div>
          {items.length > 0 && <div className="shrink-0 border-t border-market-line bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"><h3 className="mb-3 border-b border-market-line pb-3 text-sm font-bold uppercase">Cart summary</h3><div className="flex justify-between gap-3"><span className="text-sm">Subtotal</span><strong className="text-lg">{items[0]?.currency} {subtotal.toLocaleString()}</strong></div><p className="mt-2 text-xs text-market-muted">Delivery and availability confirmed at checkout.</p><PayroxaButton onClick={() => setCheckout(true)} className="mt-4 h-12 w-full rounded-sm shadow-none">Checkout <ArrowRight className="size-4" /></PayroxaButton><p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-market-muted"><LockKeyhole className="size-3.5" /> Secure checkout with Payroxa</p></div>}
        </>}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}