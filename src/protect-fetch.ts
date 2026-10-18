
(function () {
  const protect = (obj: any) => {
    if (!obj) return;
    try {
      const originalFetch = obj.fetch;
      if (typeof originalFetch !== "function") return;
      Object.defineProperty(obj, "fetch", {
        get: () => originalFetch,
        set: (v) => {
          console.warn("Attempted fetch overwrite blocked!", new Error().stack);
        },
        configurable: true,
        enumerable: true,
      });
    } catch (e) {}
  };
  if (typeof window !== "undefined") protect(window);
  if (typeof globalThis !== "undefined") protect(globalThis);
  if (typeof self !== "undefined") protect(self);
})();
