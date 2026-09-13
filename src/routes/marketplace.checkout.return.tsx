import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMarketplaceOrderFn } from "../cms/marketplace-api";
import { CheckCircle2, XCircle, Clock, ArrowRight, Loader2, Package } from "lucide-react";
import type { MarketplaceOrder } from "../cms/marketplace.server";

export const Route = createFileRoute("/marketplace/checkout/return")({
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

    let intervalId: any;
    
    const fetchStatus = async () => {
      try {
        const res = await getMarketplaceOrderFn({ data: { orderId: search.orderId! } });
        if (res.success && res.order) {
          setOrder(res.order);
          // Stop polling if status is final
          if (res.order.paymentStatus !== "INITIATED" && res.order.paymentStatus !== "PENDING" && res.order.paymentStatus !== "PROCESSING") {
            setLoading(false);
            if (intervalId) clearInterval(intervalId);
          }
        } else {
          setError(res.error || "Order not found.");
          setLoading(false);
          if (intervalId) clearInterval(intervalId);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        if (intervalId) clearInterval(intervalId);
      }
    };

    fetchStatus();
    // Poll every 3 seconds if not final
    intervalId = setInterval(fetchStatus, 3000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [search.orderId]);

  if (loading && !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Loader2 className="size-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-black">Confirming your payment...</h2>
        <p className="text-muted-foreground mt-2">Please wait while we verify the transaction with the provider.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <XCircle className="size-16 text-red-500 mb-4" />
        <h2 className="text-xl font-black text-foreground">Verification Failed</h2>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Link to="/marketplace" className="mt-8 bg-primary text-white px-6 py-3 rounded-full font-bold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  if (!order) return null;

  const isSuccess = order.paymentStatus === "SUCCESS";
  const isFailed = order.paymentStatus === "FAILED" || order.paymentStatus === "CANCELLED";
  const isPending = order.paymentStatus === "INITIATED" || order.paymentStatus === "PENDING" || order.paymentStatus === "PROCESSING";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-soft border border-border/40 overflow-hidden">
        
        {/* Header section based on status */}
        <div className={`p-8 text-center text-white ${isSuccess ? 'bg-emerald-600' : isFailed ? 'bg-red-600' : 'bg-primary'}`}>
          {isSuccess && <CheckCircle2 className="size-16 mx-auto mb-4 opacity-90" />}
          {isFailed && <XCircle className="size-16 mx-auto mb-4 opacity-90" />}
          {isPending && <Clock className="size-16 mx-auto mb-4 opacity-90" />}
          
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {isSuccess ? 'Payment Successful' : isFailed ? 'Payment Failed' : 'Payment Processing'}
          </h1>
          <p className="text-white/80 text-sm">
            Order Reference: <span className="font-mono font-bold bg-black/20 px-2 py-1 rounded">{order.id}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
            <div>
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Total Paid</h3>
              <p className="text-2xl font-black">{order.currency} {order.total.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm font-bold text-muted-foreground uppercase">Order Status</h3>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700 mt-1">
                {order.orderStatus.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-black flex items-center gap-2"><Package className="size-5" /> Items Summary</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500">{item.quantity}x</span>
                    <span className="font-medium">{item.productNameSnapshot}</span>
                  </div>
                  <span className="font-bold">{(item.subtotal).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-sm">
            <h4 className="font-black mb-3">Delivery Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground block mb-1">Recipient</span>
                <span className="font-medium block">{order.customerName}</span>
                <span className="text-gray-500">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Address</span>
                <span className="font-medium block">{order.deliveryAddress}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/marketplace" 
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full text-center flex items-center justify-center gap-2 transition-colors"
            >
              Continue Shopping <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
