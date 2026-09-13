import { useState, useEffect } from "react";
import { useCart } from "./useCart";

export interface LuckyWheelTriggerOptions {
  itemCountThreshold?: number;
  cartValueThreshold?: number;
}

export function useLuckyWheelTrigger(
  options: LuckyWheelTriggerOptions = { itemCountThreshold: 1 }
) {
  const { items, totalCount } = useCart();
  const [shouldShowWheel, setShouldShowWheel] = useState(false);
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  useEffect(() => {
    if (hasBeenTriggered) return;
    if (totalCount === 0 && items.length === 0) return; // Cart is empty

    const cartValue = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const meetsItemThreshold = options.itemCountThreshold !== undefined
      ? totalCount >= options.itemCountThreshold
      : false;

    const meetsValueThreshold = options.cartValueThreshold !== undefined
      ? cartValue >= options.cartValueThreshold
      : false;

    // Trigger if either threshold condition is provided and met
    const isTriggered =
      (options.itemCountThreshold !== undefined && meetsItemThreshold) ||
      (options.cartValueThreshold !== undefined && meetsValueThreshold);

    if (isTriggered) {
      setShouldShowWheel(true);
      setHasBeenTriggered(true);
    }
  }, [
    items,
    totalCount,
    hasBeenTriggered,
    options.itemCountThreshold,
    options.cartValueThreshold,
  ]);

  const closeWheel = () => setShouldShowWheel(false);

  return { shouldShowWheel, closeWheel };
}
