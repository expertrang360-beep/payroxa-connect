
if (typeof window !== "undefined") {
  (function () {
    try {
      const descriptor = Object.getOwnPropertyDescriptor(window, "fetch");
      if (descriptor && !descriptor.writable && descriptor.configurable) {
        const originalFetch = window.fetch;
        Object.defineProperty(window, "fetch", {
          value: originalFetch,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
    } catch (e) {
      // Ignore
    }
  })();
}
