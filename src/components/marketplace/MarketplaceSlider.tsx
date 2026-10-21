import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { PayroxaButton } from "@/components/PayroxaButton";
import { marketplacePromotions } from "@/config/marketplace-promotions";

export function MarketplaceSlider({ onShop }: { onShop: (category: string) => void }) {
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion(); updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { media.removeEventListener("change", updateMotion); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);

  useEffect(() => {
    if (!carousel) return;
    const select = () => setActive(carousel.selectedScrollSnap());
    select(); carousel.on("select", select); carousel.on("reInit", select);
    return () => { carousel.off("select", select); carousel.off("reInit", select); };
  }, [carousel]);

  useEffect(() => {
    if (!carousel || paused || interacting || reducedMotion || !visible) return;
    const timer = window.setInterval(() => carousel.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [carousel, paused, interacting, reducedMotion, visible, active]);

  return (
    <section aria-label="Marketplace promotions" aria-roledescription="carousel" className="relative min-w-0 overflow-hidden rounded-sm bg-market-ink text-market-paper"
      onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
      onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); carousel?.scrollNext(); } if (event.key === "ArrowLeft") { event.preventDefault(); carousel?.scrollPrev(); } }}>
      <div ref={viewportRef} className="overflow-hidden touch-pan-y">
        <div className="flex">
          {marketplacePromotions.map((slide, index) => (
            <div key={slide.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${marketplacePromotions.length}`} aria-hidden={active !== index} inert={active !== index} className="relative min-h-[320px] min-w-0 flex-[0_0_100%] sm:min-h-[360px]">
              <img src={slide.image} alt={slide.alt} width={1536} height={1024} loading={index === 0 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover object-left" />
              <div className="relative z-10 flex min-h-[320px] w-[52%] flex-col justify-center px-5 pb-16 pt-7 sm:min-h-[360px] sm:px-7">
                <p className="mb-3 text-xs font-semibold uppercase text-market-paper/80">{slide.eyebrow}</p>
                {index === 0 ? <h1 className="font-market-display text-3xl font-bold leading-tight">{slide.title}</h1> : <h2 className="font-market-display text-3xl font-bold leading-tight">{slide.title}</h2>}
                <p className="mt-3 text-sm text-market-paper/85">{slide.description}</p>
                <PayroxaButton onClick={() => onShop(slide.category)} className="mt-5 h-auto min-h-11 w-fit rounded-sm px-3 py-2 text-left text-xs shadow-none">{slide.cta}<ArrowRight className="size-4 shrink-0" /></PayroxaButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-between gap-2 px-4">
        <div className="flex gap-1">
          <PayroxaButton variant="text" ariaLabel="Previous promotion" onClick={() => carousel?.scrollPrev()} className="h-10 w-10 rounded-sm bg-market-ink/70 px-0 text-market-paper hover:text-market-paper"><ChevronLeft className="size-5" /></PayroxaButton>
          <PayroxaButton variant="text" ariaLabel="Next promotion" onClick={() => carousel?.scrollNext()} className="h-10 w-10 rounded-sm bg-market-ink/70 px-0 text-market-paper hover:text-market-paper"><ChevronRight className="size-5" /></PayroxaButton>
        </div>
        <div className="flex gap-1" aria-label="Choose promotion">{marketplacePromotions.map((slide, index) => <PayroxaButton key={slide.id} variant="text" ariaLabel={`Show ${slide.eyebrow} promotion${active === index ? ", current" : ""}`} onClick={() => carousel?.scrollTo(index)} className="h-10 w-8 px-0"><span className={`h-1.5 rounded-full bg-market-paper ${active === index ? "w-6" : "w-2 opacity-50"}`} /></PayroxaButton>)}</div>
        <PayroxaButton variant="text" ariaLabel={paused || reducedMotion ? "Play promotions" : "Pause promotions"} onClick={() => { setPaused(!(paused || reducedMotion)); setReducedMotion(false); }} className="h-10 w-10 rounded-sm bg-market-ink/70 px-0 text-market-paper hover:text-market-paper">{paused || reducedMotion ? <Play className="size-4" /> : <Pause className="size-4" />}</PayroxaButton>
      </div>
    </section>
  );
}