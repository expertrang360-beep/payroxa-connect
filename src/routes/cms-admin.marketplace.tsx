import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sparkles, Save, ShieldCheck, CheckCircle2, RotateCw, Plus, Trash2 } from "lucide-react";
import { CmsLayout } from "@/cms/components/CmsLayout";
import { PUBLIC_API_BASE_URL } from "@/config/siteConfig";

export const Route = createFileRoute("/cms-admin/marketplace")({
  component: CmsAdminMarketplacePage,
});

function CmsAdminMarketplacePage() {
  const [apiBaseUrl, setApiBaseUrl] = useState(PUBLIC_API_BASE_URL);
  const [featuredBanner, setFeaturedBanner] = useState(
    "Discover Verified African Merchants & Products",
  );
  const [enableCache, setEnableCache] = useState(true);
  const [saved, setSaved] = useState(false);
  
  // Wheel Settings
  const [wheelRewards, setWheelRewards] = useState<any[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(true);
  const [savingRewards, setSavingRewards] = useState(false);

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const { getWheelRewardsFn } = await import("../cms/marketplace-api");
        const res = await getWheelRewardsFn();
        if (res.success && res.rewards) {
          setWheelRewards(res.rewards);
        }
      } catch (err) {
        console.error("Failed to load wheel rewards", err);
      } finally {
        setLoadingRewards(false);
      }
    };
    loadRewards();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  const handleSaveRewards = async () => {
    setSavingRewards(true);
    try {
      const { updateWheelRewardsFn } = await import("../cms/marketplace-api");
      await updateWheelRewardsFn({ data: wheelRewards });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save wheel rewards", err);
    } finally {
      setSavingRewards(false);
    }
  };
  
  const updateReward = (index: number, field: string, value: any) => {
    const updated = [...wheelRewards];
    updated[index] = { ...updated[index], [field]: value };
    setWheelRewards(updated);
  };
  
  const addReward = () => {
    setWheelRewards([
      ...wheelRewards,
      { 
        id: `rw-${Date.now()}`, 
        prize: "New Reward", 
        coupon: "NEWCODE", 
        discountPercent: 10, 
        probability: 10, 
        enabled: true 
      }
    ]);
  };
  
  const removeReward = (index: number) => {
    setWheelRewards(wheelRewards.filter((_, i) => i !== index));
  };

  return (
    <CmsLayout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <Sparkles className="size-4" /> Authoritative Source Synchronization
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display">
            Marketplace Presentation & API Connector
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure how the CMS consumes authoritative marketplace data from the Payroxa app
            without duplicating underlying product databases.
          </p>
        </div>

        {saved && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="size-5" /> Settings saved successfully!
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h2 className="text-lg font-bold font-display mb-4">Payroxa API Connection Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Authoritative Public API Base URL
                  </label>
                  <input
                    type="text"
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    All products, vendors, and stores are fetched dynamically from this production
                    endpoint.
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-border">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Public Marketplace Hero Banner Title
                    </label>
                    <input
                      type="text"
                      value={featuredBanner}
                      onChange={(e) => setFeaturedBanner(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-sm font-bold">Enable Public API Response Caching</h4>
                      <p className="text-xs text-muted-foreground">
                        Cache category listings and static vendor profiles for optimized
                        performance.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={enableCache}
                      onChange={(e) => setEnableCache(e.target.checked)}
                      className="size-5 rounded border-border text-primary focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Save className="size-4" /> Save Presentation Preferences
                  </button>
                </form>
              </div>
            </div>
            
            {/* Gamification Settings */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-display flex items-center gap-2">
                    <RotateCw className="size-5 text-primary" /> Gamification & Rewards
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage the prizes that appear on the lucky wheel in the user wallet.
                  </p>
                </div>
                <button 
                  onClick={addReward}
                  className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Plus className="size-3.5" /> Add Reward
                </button>
              </div>
              
              {loadingRewards ? (
                <div className="text-sm text-muted-foreground p-4 text-center">Loading rewards...</div>
              ) : (
                <div className="space-y-4">
                  {wheelRewards.map((reward, i) => (
                    <div key={reward.id || i} className="p-4 border border-border/60 rounded-2xl bg-background/50 flex flex-col md:flex-row gap-4 items-start relative group">
                      <div className="flex-1 w-full space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Prize Name</label>
                            <input 
                              type="text" 
                              value={reward.prize}
                              onChange={(e) => updateReward(i, "prize", e.target.value)}
                              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium focus:border-primary focus:outline-none" 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Coupon Code</label>
                            <input 
                              type="text" 
                              value={reward.coupon}
                              onChange={(e) => updateReward(i, "coupon", e.target.value)}
                              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-mono uppercase focus:border-primary focus:outline-none" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Discount (%)</label>
                            <input 
                              type="number" 
                              value={reward.discountPercent}
                              onChange={(e) => updateReward(i, "discountPercent", parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs focus:border-primary focus:outline-none" 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">Probability Weight</label>
                            <input 
                              type="number" 
                              value={reward.probability}
                              onChange={(e) => updateReward(i, "probability", parseInt(e.target.value) || 0)}
                              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs focus:border-primary focus:outline-none" 
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-5">
                            <input 
                              type="checkbox" 
                              checked={reward.enabled}
                              onChange={(e) => updateReward(i, "enabled", e.target.checked)}
                              className="size-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-xs font-bold text-foreground">Active</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeReward(i)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                        title="Remove Reward"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                  
                  {wheelRewards.length === 0 && (
                    <div className="text-center p-6 border border-dashed border-border rounded-2xl text-sm text-muted-foreground">
                      No rewards configured. Click "Add Reward" to create one.
                    </div>
                  )}

                  <div className="pt-4 border-t border-border mt-6">
                    <button
                      type="button"
                      onClick={handleSaveRewards}
                      disabled={savingRewards}
                      className="rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
                    >
                      <Save className="size-4" /> 
                      {savingRewards ? "Saving..." : "Save Wheel Rewards"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
              <h3 className="text-sm font-bold font-display flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600" /> Single Source of Truth Rule
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Payroxa application database remains the authoritative owner of all products,
                prices, and vendor verification records. The CMS only controls presentation layers.
              </p>
              <div className="rounded-2xl border border-border bg-muted/50 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Ownership</span>
                  <span className="font-bold text-foreground">Payroxa App</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sync Interval</span>
                  <span className="font-bold text-emerald-600">Real-Time (API)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CmsLayout>
  );
}
