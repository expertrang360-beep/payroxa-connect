import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  try {
    Object.defineProperty(window, "fetch", {
      configurable: true,
      enumerable: true,
      get: () => originalFetch,
      set: (value) => {
        console.error("ALARM: Something tried to overwrite window.fetch!", new Error().stack);
      },
    });
  } catch (e) {
    console.error("Could not protect window.fetch", e);
  }
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
