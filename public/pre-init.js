
(function() {
  if (typeof window !== 'undefined') {
    try {
      const originalFetch = window.fetch;
      if (originalFetch) {
        Object.defineProperty(window, 'fetch', {
          value: originalFetch,
          writable: true,
          configurable: true,
          enumerable: true
        });
      }
    } catch (e) {
      console.error('Fetch protection failed:', e);
    }
  }
})();
