import { useState, useEffect } from "react";
import type { PayroxaProduct } from "@/services/payroxa-api";

const WISHLIST_KEY = "payroxa_sovereign_wishlist";
const WISHLIST_EVENT = "payroxa-wishlist-updated";

export function getWishlistIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWishlistIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(WISHLIST_EVENT));
  } catch (err) {
    console.error("Failed to save wishlist items:", err);
  }
}

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());

    const handleUpdate = () => {
      setWishlistIds(getWishlistIds());
    };

    window.addEventListener(WISHLIST_EVENT, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(WISHLIST_EVENT, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggleWishlist = (productId: string) => {
    const current = getWishlistIds();
    let updated: string[];
    if (current.includes(productId)) {
      updated = current.filter((id) => id !== productId);
    } else {
      updated = [...current, productId];
    }
    saveWishlistIds(updated);
  };

  const isWishlisted = (productId: string) => {
    return wishlistIds.includes(productId);
  };

  return {
    wishlistIds,
    toggleWishlist,
    isWishlisted,
  };
}
