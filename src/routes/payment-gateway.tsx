import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { simulatePaymentWebhookFn } from "../cms/marketplace-api";
import { ShieldCheck, Loader2 } from "lucide-react";

export const Route = createFileRoute("/payment-gateway")({
  component: PaymentGateway,
});

function PaymentGateway() {
  const navigate = useNavigate();
  const search = Route.useSearch() as { session?: string };
  const sessionId = search.session;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!sessionId) {
    return <div className="p-8 text-center text-red-500">Invalid Payment Session</div>;
  }

  const handlePayment = async (status: 'SUCCESS' | 'FAILED' | 'CANCELLED') => {
    setLoading(true);
    setError("");
    const res = await simulatePaymentWebhookFn({ data: { sessionId, status } });
    if (res.success) {
      // Redirect back to marketplace return url
      window.location.href = `/marketplace/checkout/return?orderId=${res.orderId}&session_id=${sessionId}`;
    } else {
      setError(res.error || "Payment simulation failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-primary p-6 text-white text-center">
          <ShieldCheck className="size-12 mx-auto mb-2 opacity-90" />
          <h1 className="text-xl font-black uppercase tracking-wider">Payroxa Secure Checkout</h1>
          <p className="text-sm opacity-80">Test Environment</p>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-center text-gray-500 mb-6">
            This is the Payroxa Payment Provider simulator. In a real environment, you would enter card details here.
          </p>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={() => handlePayment('SUCCESS')}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin mx-auto size-5" /> : "Simulate Successful Payment"}
          </button>
          
          <button
            onClick={() => handlePayment('FAILED')}
            disabled={loading}
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-xl disabled:opacity-50 transition-colors"
          >
            Simulate Failed Payment
          </button>
          
          <button
            onClick={() => handlePayment('CANCELLED')}
            disabled={loading}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl disabled:opacity-50 transition-colors"
          >
            Cancel and Return
          </button>
        </div>
      </div>
    </div>
  );
}
