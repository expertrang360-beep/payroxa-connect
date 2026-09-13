import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  size: string;
  color: string;
  image: string;
  slug: string;
}

const CART_KEY = "payroxa_sovereign_cart";
const CART_EVENT = "payroxa-cart-updated";

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch (err) {
    console.error("Failed to save cart items:", err);
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initial fetch
    setItems(getCartItems());

    // Sync across tabs/instances
    const handleUpdate = () => {
      setItems(getCartItems());
    };

    window.addEventListener(CART_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(CART_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const addToCart = (
    product: {
      id: string;
      name: string;
      price: number;
      currency: string;
      image: string;
      slug: string;
    },
    quantity = 1,
    size = "M",
    color = "Classic Edition",
  ) => {
    const current = getCartItems();
    const existingIndex = current.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color,
    );

    if (existingIndex > -1) {
      current[existingIndex].quantity += quantity;
    } else {
      current.push({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        image: product.image,
        slug: product.slug,
        quantity,
        size,
        color,
      });
    }
    saveCartItems(current);
    
    // Trigger Gamification Modal on add to cart
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("trigger-lucky-wheel"));
    }
  };

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    const current = getCartItems();
    const index = current.findIndex(
      (item) => item.id === id && item.size === size && item.color === color,
    );
    if (index > -1) {
      if (quantity <= 0) {
        current.splice(index, 1);
      } else {
        current[index].quantity = quantity;
      }
      saveCartItems(current);
    }
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    const current = getCartItems();
    const filtered = current.filter(
      (item) => !(item.id === id && item.size === size && item.color === color),
    );
    saveCartItems(filtered);
  };

  const clearCart = () => {
    saveCartItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
  };
}
