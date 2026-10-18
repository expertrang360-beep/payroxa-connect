import { createServerFn } from "@tanstack/react-start";
export const createMarketplaceOrderFn = createServerFn({ method: "POST" })
  .validator((data: { cartItems: any[]; customerName: string; customerEmail: string; deliveryAddress: string; customerPhone?: string; origin: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { createOrderServer } = await import("./marketplace.server");
      const result = await createOrderServer(data, data.origin);
      return { success: true, ...result };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

export const getMarketplaceOrderFn = createServerFn({ method: "GET" })
  .validator((data: { orderId: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { getOrderByIdServer } = await import("./marketplace.server");
      const order = getOrderByIdServer(data.orderId);
      return { success: true, order };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

// Simulated Webhook Processor
export const simulatePaymentWebhookFn = createServerFn({ method: "POST" })
  .validator((data: { sessionId: string; status: 'SUCCESS' | 'FAILED' | 'CANCELLED' }) => data)
  .handler(async ({ data }) => {
    try {
      const { updateOrderPaymentServer } = await import("./marketplace.server");
      const order = updateOrderPaymentServer(data.sessionId, data.status);
      if (!order) throw new Error("Payment session not found");
      return { success: true, orderId: order.id, paymentStatus: order.paymentStatus };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

export const getWheelRewardsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { getWheelRewardsServer } = await import("./marketplace.server");
      const rewards = getWheelRewardsServer();
      return { success: true, rewards };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

export const updateWheelRewardsFn = createServerFn({ method: "POST" })
  .validator((data: any[]) => data)
  .handler(async ({ data }) => {
    try {
      const { updateWheelRewardsServer } = await import("./marketplace.server");
      const rewards = updateWheelRewardsServer(data);
      return { success: true, rewards };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
