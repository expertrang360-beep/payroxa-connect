import { getCmsDb, saveCmsDb } from "./db.server";
import crypto from "node:crypto";
import { getProduct } from "../services/payroxa-public-api/client";
import type { PayroxaProduct } from "../services/payroxa-public-api/types";
import { getCmsSessionFn } from "./api"; // To get authenticated user

export type OrderStatus = 'PENDING_PAYMENT' | 'PAYMENT_PROCESSING' | 'PAID' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'PAYMENT_FAILED' | 'REFUNDED';
export type PaymentStatus = 'INITIATED' | 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'EXPIRED' | 'REFUNDED';

export interface MarketplaceOrderItem {
  productId: string;
  sellerId: string;
  productNameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  variantSnapshot?: string;
  subtotal: number;
}

export interface MarketplaceOrder {
  id: string; // The order reference
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryMethod?: string;
  items: MarketplaceOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentSessionId?: string;
  paymentCheckoutUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Ensure the db has marketplaceOrders
export function getMarketplaceOrders(): MarketplaceOrder[] {
  const db = getCmsDb() as any;
  if (!db.marketplaceOrders) {
    db.marketplaceOrders = [];
    saveCmsDb(db);
  }
  return db.marketplaceOrders;
}

export async function createOrderServer(data: any, origin: string) {
  // 1. Authenticate user
  // For safety, we allow guest checkout if user not logged in, but prompt says "authenticated customer".
  // We'll trust the customer details provided if there's no auth session in this demo,
  // but let's assume `data.customerEmail` is required.
  if (!data.customerName || !data.customerEmail || !data.deliveryAddress || !data.cartItems || !data.cartItems.length) {
    throw new Error("Missing required checkout information.");
  }

  const db = getCmsDb() as any;
  if (!db.marketplaceOrders) db.marketplaceOrders = [];

  const items: MarketplaceOrderItem[] = [];
  let subtotal = 0;
  const currency = "NGN"; // default

  // 2-8. Re-fetch products, validate, calculate authoritative prices
  for (const item of data.cartItems) {
    const res = await getProduct(item.productId);
    if (!res.success || !res.data) {
      throw new Error(`Product ${item.productId} not found.`);
    }
    const product = res.data;
    if (product.availability !== "in_stock") {
      throw new Error(`Product ${product.name} is currently out of stock.`);
    }

    const itemSubtotal = product.price * item.quantity;
    subtotal += itemSubtotal;

    items.push({
      productId: product.id,
      sellerId: product.vendor.id,
      productNameSnapshot: product.name,
      unitPriceSnapshot: product.price,
      quantity: item.quantity,
      variantSnapshot: item.variant,
      subtotal: itemSubtotal,
    });
  }

  // 9-11. Calculate delivery, discount, total
  const deliveryFee = 2500; // Fixed authoritative delivery fee for demo
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  // 12. Create unique order reference
  const orderId = `ORD-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const paymentSessionId = `SESS-${crypto.randomBytes(8).toString("hex")}`;
  
  // 14. Create the associated payment transaction/session (Mock external provider for this demo)
  // Instead of hardcoding, we use the `origin`
  const checkoutUrl = `${origin}/payment-gateway?session=${paymentSessionId}`;

  // 13. Create the order in a pending/unpaid state
  const order: MarketplaceOrder = {
    id: orderId,
    customerId: data.customerId || "guest",
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone || "",
    deliveryAddress: data.deliveryAddress,
    deliveryMethod: data.deliveryMethod || "Standard",
    items,
    subtotal,
    deliveryFee,
    discount,
    total,
    currency,
    orderStatus: "PENDING_PAYMENT",
    paymentStatus: "INITIATED",
    paymentSessionId,
    paymentCheckoutUrl: checkoutUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.marketplaceOrders.push(order);
  saveCmsDb(db);

  // 15. Return the checkout destination to the frontend
  return {
    orderId,
    checkoutUrl
  };
}

export function getOrderByIdServer(id: string) {
  const orders = getMarketplaceOrders();
  const order = orders.find(o => o.id === id);
  if (!order) throw new Error("Order not found");
  return order;
}

export function updateOrderPaymentServer(sessionId: string, status: PaymentStatus) {
  const db = getCmsDb() as any;
  if (!db.marketplaceOrders) return null;
  const orderIndex = db.marketplaceOrders.findIndex((o: any) => o.paymentSessionId === sessionId);
  if (orderIndex === -1) return null;

  const order = db.marketplaceOrders[orderIndex];
  
  // Idempotency check: don't process if already paid
  if (order.paymentStatus === 'SUCCESS') return order;

  order.paymentStatus = status;
  if (status === 'SUCCESS') {
    order.orderStatus = 'PAID';
  } else if (status === 'FAILED' || status === 'CANCELLED') {
    order.orderStatus = 'PAYMENT_FAILED';
  }
  order.updatedAt = new Date().toISOString();
  saveCmsDb(db);
  return order;
}

export function getWheelRewardsServer() {
  const db = getCmsDb();
  if (db.wheelRewards && db.wheelRewards.length > 0) {
    return db.wheelRewards.filter(r => r.enabled);
  }
  return [
    { id: "rw-1", prize: "15% OFF Escrow Checkout", coupon: "SOVEREIGN15", discountPercent: 15, probability: 25, enabled: true },
    { id: "rw-2", prize: "FREE Express Air DHL Cargo", coupon: "SHIPDHL", discountPercent: 5, probability: 25, enabled: true },
    { id: "rw-3", prize: "Zero Safe-Vault Escrow Fees", coupon: "NOFEE", discountPercent: 10, probability: 25, enabled: true },
    { id: "rw-4", prize: "NGN 25,000 / $50 Safe Wallet Credit", coupon: "VAULT50", discountPercent: 20, probability: 25, enabled: true },
  ];
}

export function updateWheelRewardsServer(rewards: any[]) {
  const db = getCmsDb() as any;
  db.wheelRewards = rewards;
  saveCmsDb(db);
  return db.wheelRewards;
}
