import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, ArrowRight, Loader2, Package } from "lucide-react";
import type { MarketplaceOrder } from "../cms/marketplace.server";
import { pageHead } from "@/config/seo";
import {
  MarketplaceHeader,
  MarketplaceBreadcrumb,
} from "@/components/marketplace/MarketplaceHeader";
import { PayroxaButton } from "@/components/PayroxaButton";

export const Route = createFileRoute("/marketplace_/checkout/return")({
  head: () => {
    const head = pageHead(
      "Order Status | Payroxa Marketplace",
      "Check the status of your Payroxa Marketplace order.",
      "/marketplace/checkout/return",
    );
    return { ...head, meta: [...head.meta, { name: "robots", content: "noindex, nofollow" }] };
  },
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const search = Route.useSearch() as { orderId?: string; session_id?: string };
  const [order, setOrder] = useState<MarketplaceOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!search.orderId) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }
    const orderId = search.orderId;

    // Polling interval

    const fetchStatus = async () => {
      try {
        const { getMarketplaceOrderFn } = await import("../cms/marketplace-api");
        const res = await getMarketplaceOrderFn({ data: { orderId } });
        if (res.success && res.order) {
          setOrder(res.order);
          // Stop polling if status is final
          if (
            res.order.paymentStatus !== "INITIATED" &&
            res.order.paymentStatus !== "PENDING" &&
            res.order.paymentStatus !== "PROCESSING"
          ) {
            setLoading(false);
          }
        } else {
          setError(res.error || "Order not found.");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStatus();
    // Poll every 3 seconds if not final
    const intervalId = setInterval(fetchStatus, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [search.orderId]);

  if (loading && !order) {
    return (
      <div className="min-h-screen bg-market-paper">
        <MarketplaceHeader />
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
          <Loader2 className="size-12 text-primary animate-spin mb-4" />
          <h2 className="text-xl font-black">Confirming your payment...</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we verify the transaction with the provider.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-market-paper">
        <MarketplaceHeader />
        <MarketplaceBreadcrumb current="Order status" />
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center bg-card p-5 text-center">
          <XCircle className="size-12 text-destructive mb-4" />
          <h1 className="text-xl font-semibold text-foreground">Unable to verify this order</h1>
          <p className="text-muted-foreground mt-2">{error}</p>
          <PayroxaButton to="/marketplace" className="mt-8 rounded-sm shadow-none">
            Return to Marketplace
          </PayroxaButton>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const isSuccess = order.paymentStatus === "SUCCESS";
  const isFailed = order.paymentStatus === "FAILED" || order.paymentStatus === "CANCELLED";
  const isPending =
    order.paymentStatus === "INITIATED" ||
    order.paymentStatus === "PENDING" ||
    order.paymentStatus === "PROCESSING";

  return (
    <div className="min-h-screen bg-market-paper pb-12">
      <MarketplaceHeader />
      <MarketplaceBreadcrumb current="Order status" />
      <main className="mx-auto max-w-2xl overflow-hidden rounded-sm border border-market-line bg-card shadow-soft">
        {/* Header section based on status */}
        <div
          className={`border-b border-market-line p-5 text-center sm:p-8 ${isFailed ? "bg-destructive/10 text-destructive" : "bg-accent text-primary"}`}
        >
          {isSuccess && <CheckCircle2 className="size-16 mx-auto mb-4 opacity-90" />}
          {isFailed && <XCircle className="size-16 mx-auto mb-4 opacity-90" />}
          {isPending && <Clock className="size-16 mx-auto mb-4 opacity-90" />}

          <h1 className="text-2xl font-semibold mb-2">
            {isSuccess ? "Payment Successful" : isFailed ? "Payment Failed" : "Payment Processing"}
          </h1>
          <p className="text-market-muted text-sm">
            Order Reference: <span className="break-all font-mono font-medium">{order.id}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="p-5 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-market-line pb-6">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase">
                {isSuccess ? "Total paid" : "Order total"}
              </h3>
              <p className="text-2xl font-black">
                {order.currency} {order.total.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Order Status</h3>
              <span className="mt-1 inline-block rounded-sm bg-muted px-3 py-1 text-xs font-semibold text-market-ink">
                {order.orderStatus.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-black flex items-center gap-2">
              <Package className="size-5" /> Items Summary
            </h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-3 text-sm">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="shrink-0 font-bold text-market-muted">{item.quantity}x</span>
                    <span className="break-words font-medium">{item.productNameSnapshot}</span>
                  </div>
                  <span className="shrink-0 font-bold">{item.subtotal.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-y border-market-line py-5 mb-8 text-sm">
            <h4 className="font-black mb-3">Delivery Information</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground block mb-1">Recipient</span>
                <span className="font-medium block">{order.customerName}</span>
                <span className="text-market-muted">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Address</span>
                <span className="block break-words font-medium">{order.deliveryAddress}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <PayroxaButton to="/marketplace" className="h-12 flex-1 rounded-sm shadow-none">
              Continue Shopping <ArrowRight className="size-4" />
            </PayroxaButton>
          </div>
        </div>
      </main>
    </div>
  );
}
