import { useEffect, useRef, useState } from "react";
import { hasAdConsent, validNetworkConfig } from "@/lib/advertising";

type ConsentData = Parameters<typeof hasAdConsent>[0] & { listenerId?: number };
type AdWindow = Window & {
  adsbygoogle?: object[];
  __tcfapi?: (
    command: string,
    version: number,
    callback: (data: ConsentData, success: boolean) => void,
    parameter?: number,
  ) => void;
};
let scriptPromise: Promise<void> | undefined;
function loadAdScript(publisher: string) {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisher}`;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = undefined;
      script.remove();
      reject(new Error("Advertising unavailable"));
    };
    document.head.append(script);
  });
  return scriptPromise;
}

export function NetworkAdvert({ placement }: { placement: "sidebar" | "banner" }) {
  const publisher = String(import.meta.env.VITE_PAYROXA_ADSENSE_CLIENT ?? "");
  const slot = String(
    placement === "banner"
      ? (import.meta.env.VITE_PAYROXA_ADSENSE_BANNER_SLOT ?? "")
      : (import.meta.env.VITE_PAYROXA_ADSENSE_SIDEBAR_SLOT ?? ""),
  );
  const cmpPublisher = String(import.meta.env.VITE_PAYROXA_GOOGLE_CMP_PUBLISHER ?? "");
  const configured = validNetworkConfig(publisher, slot) && /^pub-\d{16}$/.test(cmpPublisher);
  const [consent, setConsent] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const element = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  useEffect(() => {
    if (!configured) return;
    const adWindow = window as AdWindow;
    let listenerId: number | undefined;
    let disposed = false;
    let attached = false;
    if (!document.getElementById("payroxa-certified-cmp")) {
      const script = document.createElement("script");
      script.id = "payroxa-certified-cmp";
      script.async = true;
      script.src = `https://fundingchoicesmessages.google.com/i/${cmpPublisher}?ers=1`;
      document.head.append(script);
    }
    const attach = () => {
      if (attached || !adWindow.__tcfapi) return;
      attached = true;
      adWindow.__tcfapi("addEventListener", 2, (data, success) => {
        if (disposed) return;
        listenerId = data.listenerId;
        setConsent(success && hasAdConsent(data));
      });
    };
    attach();
    const poll = window.setInterval(attach, 500);
    const timeout = window.setTimeout(() => window.clearInterval(poll), 15000);
    return () => {
      disposed = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
      if (listenerId !== undefined)
        adWindow.__tcfapi?.("removeEventListener", 2, () => {}, listenerId);
    };
  }, [configured, cmpPublisher]);
  useEffect(() => {
    const node = element.current;
    if (!configured || !consent || !node || pushed.current) return;
    let disposed = false;
    const observer = new MutationObserver(() => {
      if (node.getAttribute("data-ad-status") === "unfilled") setUnavailable(true);
    });
    observer.observe(node, { attributes: true, attributeFilter: ["data-ad-status"] });
    void loadAdScript(publisher)
      .then(() => {
        if (disposed || pushed.current) return;
        pushed.current = true;
        const adWindow = window as AdWindow;
        try {
          (adWindow.adsbygoogle = adWindow.adsbygoogle ?? []).push({});
        } catch {
          setUnavailable(true);
        }
      })
      .catch(() => {
        if (!disposed) setUnavailable(true);
      });
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [configured, consent, publisher]);
  if (!configured || !consent || unavailable) return null;
  return (
    <aside
      aria-label="Ad network advertisement"
      className="min-w-0 border border-market-line bg-card"
    >
      <p className="px-3 py-1.5 text-[10px] uppercase text-market-muted">Advertisement</p>
      <ins
        ref={element}
        className={`adsbygoogle block w-full ${placement === "banner" ? "min-h-24" : "min-h-64"}`}
        data-ad-client={publisher}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
