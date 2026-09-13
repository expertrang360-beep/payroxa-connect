import { useState, useEffect } from "react";
import { RotateCw, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function LuckyWheelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelRewards, setWheelRewards] = useState<any[]>([]);
  const [wheelResult, setWheelResult] = useState<{
    prize: string;
    coupon: string;
    discountPercent: number;
  } | null>(null);
  
  // To avoid spamming, let's only show it once per session when adding to cart
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  useEffect(() => {
    // Load rewards
    const loadRewards = async () => {
      try {
        const { getWheelRewardsFn } = await import("@/cms/marketplace-api");
        const res = await getWheelRewardsFn();
        if (res.success && res.rewards) {
          setWheelRewards(res.rewards);
        }
      } catch (err) {
        console.warn("Failed to load wheel rewards", err);
      }
    };
    loadRewards();

    const handleTrigger = () => {
      if (!hasBeenTriggered) {
        setIsOpen(true);
        setHasBeenTriggered(true);
      }
    };

    window.addEventListener("trigger-lucky-wheel", handleTrigger);
    return () => window.removeEventListener("trigger-lucky-wheel", handleTrigger);
  }, [hasBeenTriggered]);

  if (!isOpen) return null;

  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWheelResult(null);

    const extraDegrees = Math.floor(Math.random() * 360);
    const newRotation = wheelRotation + 1800 + extraDegrees;
    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const defaultPrizes = [
        { prize: "15% OFF Escrow Checkout", coupon: "SOVEREIGN15", discountPercent: 15 },
        { prize: "FREE Express Air DHL Cargo", coupon: "SHIPDHL", discountPercent: 5 },
        { prize: "Zero Safe-Vault Escrow Fees", coupon: "NOFEE", discountPercent: 10 },
        { prize: "NGN 25,000 / $50 Safe Wallet Credit", coupon: "VAULT50", discountPercent: 20 },
      ];
      
      const prizes = wheelRewards && wheelRewards.length > 0 ? wheelRewards : defaultPrizes;
      
      setWheelResult(prizes[Math.floor(Math.random() * prizes.length)]);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-6 animate-scale-in">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 bg-white/80 rounded-full p-1"
        >
          <X className="size-5" />
        </button>
        
        <div className="flex-1 space-y-3 text-center md:text-left z-10">
          <span className="inline-flex items-center justify-center gap-1 bg-primary text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
            <RotateCw className="size-3 animate-spin" /> Free bonus spin!
          </span>
          <h2 className="text-xl font-black text-foreground font-display">
            You added to cart!
          </h2>
          <p className="text-xs text-muted-foreground leading-normal">
            Spin the lucky wheel now to unlock exclusive checkout discounts and rewards.
          </p>
          
          {wheelResult && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 inline-block animate-fade-in mt-2 w-full text-center">
              <p className="text-[10px] font-bold text-emerald-600 uppercase flex items-center justify-center gap-1">
                ✔ REWARD UNLOCKED
              </p>
              <p className="text-xs font-black text-foreground mt-0.5">{wheelResult.prize}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Code: <span className="font-mono font-bold text-emerald-600">{wheelResult.coupon}</span></p>
            </div>
          )}
        </div>

        <div className="w-full max-w-[200px] shrink-0 flex flex-col items-center gap-4 z-10 mt-4 md:mt-0">
          <div
            className="relative size-40 rounded-full border-4 border-primary bg-muted overflow-hidden shadow-medium transition-transform duration-[3000ms] ease-out mx-auto"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-yellow-400 to-red-500 opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white text-[9px] font-black font-sans leading-none">
              <span className="bg-black/40 p-2 rounded-full uppercase tracking-wider shadow-inner">
                Lucky Reel
              </span>
            </div>
            {/* Inner lines/segments could go here for realism */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/20"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-white/20"></div>
          </div>
          <button
            onClick={handleSpinWheel}
            disabled={isSpinning || !!wheelResult}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-white py-2.5 text-xs font-black rounded-xl transition-all shadow-soft"
          >
            {isSpinning ? "SPINNING..." : wheelResult ? "CLAIMED!" : "SPIN AND CLAIM NOW"}
          </button>
        </div>
      </div>
    </div>
  );
}
