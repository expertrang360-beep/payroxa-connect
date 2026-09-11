import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Image as ImageIcon,
  Upload,
  Check,
  Copy,
  ExternalLink,
  Trash2,
  Edit2,
  FolderOpen,
  Search,
  Sparkles,
  Layers,
  Palette,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Sliders,
  Maximize2,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import {
  getMediaFn,
  uploadMediaFn,
  updateMediaAssetFn,
  deleteMediaAssetFn,
  getCmsSettingsFn,
  updateBrandVisualsFn,
} from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsImagePicker } from "@/cms/components/CmsImagePicker";
import { CMS_ICON_CATALOG, ICON_CATEGORIES, renderCmsIcon } from "@/cms/icons";
import type { MediaAsset, MediaCategory, SiteSettings } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/media")({
  component: CmsMediaManagementPage,
});

function CmsMediaManagementPage() {
  const { token, isSuperAdmin } = useCmsAuth();
  const [activeTab, setActiveTab] = useState<"media" | "icons" | "branding">("media");

  // Media state
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Edit Modal State
  const [editingAsset, setEditingAsset] = useState<MediaAsset | null>(null);
  const [editFilename, setEditFilename] = useState("");
  const [editAltText, setEditAltText] = useState("");
  const [editCategory, setEditCategory] = useState<MediaCategory>("general");
  const [savingEdit, setSavingEdit] = useState(false);

  // Icon System State
  const [iconSearch, setIconSearch] = useState("");
  const [iconCategory, setIconCategory] = useState<string>("All");
  const [iconSize, setIconSize] = useState<number>(24);
  const [iconTone, setIconTone] = useState<"purple" | "emerald" | "blue" | "navy" | "slate">(
    "purple",
  );
  const [iconShape, setIconShape] = useState<"none" | "squircle" | "circle" | "soft">("squircle");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Branding & Logo State
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savingBrand, setSavingBrand] = useState(false);
  const [brandSuccess, setBrandSuccess] = useState<string | null>(null);
  const [brandError, setBrandError] = useState<string | null>(null);

  const [brandForm, setBrandForm] = useState<{
    logoType: "symbol_text" | "image" | "symbol_only";
    logoUrl: string;
    logoDarkUrl: string;
    logoHeightPx: number;
    brandSymbol: string;
    brandSymbolBg: "gradient-purple" | "solid-purple" | "dark-slate" | "emerald" | "custom";
    faviconUrl: string;
    appIconUrl: string;
    defaultOgImageUrl: string;
  }>({
    logoType: "symbol_text",
    logoUrl: "",
    logoDarkUrl: "",
    logoHeightPx: 36,
    brandSymbol: "P",
    brandSymbolBg: "gradient-purple",
    faviconUrl: "/favicon.ico",
    appIconUrl: "/favicon.ico",
    defaultOgImageUrl: "/src/assets/hero-payroxa.jpg",
  });

  // Load Media Assets
  const loadMedia = async () => {
    if (!token) return;
    setLoadingMedia(true);
    try {
      const res = await getMediaFn({ data: { token } });
      if (res && res.media) {
        setMediaList(res.media);
      }
    } catch (err) {
      console.error("Failed to load media assets:", err);
    } finally {
      setLoadingMedia(false);
    }
  };

  // Load Settings for Branding
  const loadSettings = async () => {
    if (!token) return;
    try {
      const res = await getCmsSettingsFn({ data: { token } });
      if (res && res.settings) {
        setSettings(res.settings);
        setBrandForm({
          logoType: res.settings.logoType || "symbol_text",
          logoUrl: res.settings.logoUrl || "",
          logoDarkUrl: res.settings.logoDarkUrl || "",
          logoHeightPx: res.settings.logoHeightPx || 36,
          brandSymbol: res.settings.brandSymbol || "P",
          brandSymbolBg: res.settings.brandSymbolBg || "gradient-purple",
          faviconUrl: res.settings.faviconUrl || "/favicon.ico",
          appIconUrl: res.settings.appIconUrl || "/favicon.ico",
          defaultOgImageUrl: res.settings.defaultOgImageUrl || "/src/assets/hero-payroxa.jpg",
        });
      }
    } catch (err) {
      console.error("Failed to load settings for branding:", err);
    }
  };

  useEffect(() => {
    loadMedia();
    loadSettings();
  }, [token]);

  // Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const res = await uploadMediaFn({
          data: {
            token,
            filename: file.name,
            mimeType: file.type || "image/png",
            sizeBytes: file.size,
            dataUrl: base64Data,
            category: (selectedCategory !== "All" ? selectedCategory : "general") as MediaCategory,
            altText: file.name.replace(/\.[^/.]+$/, ""),
          },
        });

        if (res.success && res.asset) {
          setMediaList((prev) => [res.asset, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Delete handler
  const handleDeleteAsset = async (id: string, name: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await deleteMediaAssetFn({ data: { token, id } });
      if (res.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete asset:", err);
    }
  };

  // Open Edit Modal
  const openEditModal = (asset: MediaAsset) => {
    setEditingAsset(asset);
    setEditFilename(asset.filename);
    setEditAltText(asset.altText || "");
    setEditCategory(asset.category || "general");
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!token || !editingAsset) return;
    setSavingEdit(true);
    try {
      const res = await updateMediaAssetFn({
        data: {
          token,
          id: editingAsset.id,
          filename: editFilename,
          altText: editAltText,
          category: editCategory,
        },
      });
      if (res.success && res.asset) {
        setMediaList((prev) => prev.map((m) => (m.id === editingAsset.id ? res.asset : m)));
        setEditingAsset(null);
      }
    } catch (err) {
      console.error("Failed to update asset:", err);
    } finally {
      setSavingEdit(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleCopyIcon = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIcon(name);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  // Save Brand Visuals
  const handleSaveBrandVisuals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSavingBrand(true);
    setBrandSuccess(null);
    setBrandError(null);

    try {
      const res = await updateBrandVisualsFn({
        data: {
          token,
          ...brandForm,
        },
      });
      if (res.success) {
        setSettings(res.settings);
        setBrandSuccess("Brand logos and visual identity saved and published successfully.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update brand visuals.";
      setBrandError(msg);
    } finally {
      setSavingBrand(false);
    }
  };

  // Filtered media
  const filteredMedia = useMemo(() => {
    return mediaList.filter((m) => {
      const matchesCategory = selectedCategory === "All" || m.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        m.filename.toLowerCase().includes(query) ||
        (m.altText && m.altText.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [mediaList, selectedCategory, searchQuery]);

  // Filtered icons
  const filteredIcons = useMemo(() => {
    return CMS_ICON_CATALOG.filter((item) => {
      const matchesCategory = iconCategory === "All" || item.category === iconCategory;
      const query = iconSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query) ||
        item.keywords.some((k) => k.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [iconSearch, iconCategory]);

  const totalStorageKb = useMemo(() => {
    return Math.round(mediaList.reduce((acc, curr) => acc + (curr.sizeBytes || 0), 0) / 1024);
  }, [mediaList]);

  // Helper for Icon preview styling
  const getIconColorClass = () => {
    switch (iconTone) {
      case "emerald":
        return "text-emerald-600";
      case "blue":
        return "text-blue-600";
      case "navy":
        return "text-slate-900";
      case "slate":
        return "text-slate-600";
      case "purple":
      default:
        return "text-purple-600";
    }
  };

  const getIconContainerClass = () => {
    switch (iconShape) {
      case "squircle":
        return "rounded-2xl bg-purple-50 p-4 border border-purple-100 shadow-2xs";
      case "circle":
        return "rounded-full bg-slate-100 p-4 shadow-2xs";
      case "soft":
        return "rounded-xl bg-purple-100/60 p-3";
      case "none":
      default:
        return "p-2";
    }
  };

  return (
    <div>
      <CmsHeader
        title="Media, Icons & Brand Identity Hub"
        description="Manage brand logos, uploaded imagery, visual graphics, and interface icon library across the entire Payroxa platform."
      />

      {/* Overview Metric Bar */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Assets
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{mediaList.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Storage Used
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalStorageKb} KB</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Icon Catalog
          </p>
          <p className="mt-1 text-2xl font-bold text-purple-600">{CMS_ICON_CATALOG.length} Icons</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Active Brand Mode
          </p>
          <p className="mt-1 text-sm font-bold text-slate-900 capitalize">
            {brandForm.logoType.replace("_", " + ")}
          </p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="mb-6 flex border-b border-slate-200 bg-white rounded-xl shadow-2xs px-4 pt-1">
        <button
          type="button"
          onClick={() => setActiveTab("media")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${
            activeTab === "media"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <ImageIcon className="size-4" />
          <span>Image & Media Library</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("icons")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${
            activeTab === "icons"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="size-4" />
          <span>Icon Directory & Studio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-colors ${
            activeTab === "branding"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Palette className="size-4" />
          <span>Logo & Brand Kit</span>
        </button>
      </div>

      {/* TAB 1: MEDIA & IMAGE LIBRARY */}
      {activeTab === "media" && (
        <div className="space-y-6">
          {/* Upload Zone & Quick Controls */}
          <CmsCard
            title="Upload New Asset"
            subtitle="Add high-res photos, banners, logos, or vectors"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-600">
                  Upload visual assets to reference across the website. Supported formats: PNG, JPG,
                  SVG, WebP, and ICO.
                </p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors">
                <Upload className="size-4" />
                <span>{uploading ? "Uploading..." : "Upload Media File"}</span>
                <input
                  type="file"
                  accept="image/*,.ico"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </CmsCard>

          {/* Search, Filter & Grid Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search media by filename or alt text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
              {["All", "branding", "heroes", "products", "icons", "testimonials", "general"].map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors capitalize ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Media Grid */}
          {loadingMedia ? (
            <div className="flex items-center justify-center py-20">
              <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <CmsCard>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-3">
                  <ImageIcon className="size-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No media assets found</h4>
                <p className="mt-1 max-w-xs text-xs text-slate-400">
                  Upload an image above or clear your search filter to see assets.
                </p>
              </div>
            </CmsCard>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMedia.map((m) => (
                <CmsCard key={m.id} className="overflow-hidden p-0">
                  <div className="relative flex h-48 items-center justify-center bg-slate-900/90 p-4 group">
                    <img
                      src={m.url}
                      alt={m.altText || m.filename}
                      className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-slate-900/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white capitalize border border-white/10">
                        {m.category || "general"}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => openEditModal(m)}
                        title="Edit metadata"
                        className="rounded-lg bg-white/90 p-1.5 text-slate-700 shadow-xs hover:bg-white"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAsset(m.id, m.filename)}
                        title="Delete asset"
                        className="rounded-lg bg-rose-600/90 p-1.5 text-white shadow-xs hover:bg-rose-600"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="truncate text-xs font-bold text-slate-900" title={m.filename}>
                      {m.filename}
                    </h4>
                    <p className="mt-0.5 truncate text-[11px] text-slate-500" title={m.altText}>
                      Alt: {m.altText || "None specified"}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400 font-mono">
                      {Math.round(m.sizeBytes / 1024)} KB • {m.mimeType}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => handleCopy(m.url)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700"
                      >
                        {copiedUrl === m.url ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied URL</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy Path</span>
                          </>
                        )}
                      </button>

                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
                      >
                        <span>View</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </CmsCard>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ICON DIRECTORY & STUDIO */}
      {activeTab === "icons" && (
        <div className="space-y-6">
          <CmsCard
            title="Icon Directory & Visual Studio"
            subtitle="Search and customize the Lucide icon library used across products, trust badges, and security cards"
          >
            {/* Interactive Customizer Bar */}
            <div className="mb-6 rounded-xl border border-purple-100 bg-purple-50/40 p-4">
              <p className="text-xs font-bold text-purple-900 mb-3">Live Icon Preview & Styler</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Size Control */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Display Size: {iconSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="48"
                    step="4"
                    value={iconSize}
                    onChange={(e) => setIconSize(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                </div>

                {/* Color Tone */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Color Accent
                  </label>
                  <select
                    value={iconTone}
                    onChange={(e) =>
                      setIconTone(
                        e.target.value as "purple" | "emerald" | "blue" | "navy" | "slate",
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:border-purple-500 focus:outline-none"
                  >
                    <option value="purple">Brand Purple</option>
                    <option value="emerald">Emerald Success</option>
                    <option value="blue">Electric Blue</option>
                    <option value="navy">Deep Navy</option>
                    <option value="slate">Neutral Slate</option>
                  </select>
                </div>

                {/* Shape Container */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Container Badge
                  </label>
                  <select
                    value={iconShape}
                    onChange={(e) =>
                      setIconShape(e.target.value as "none" | "squircle" | "circle" | "soft")
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:border-purple-500 focus:outline-none"
                  >
                    <option value="squircle">Squircle Badge</option>
                    <option value="circle">Circular Soft</option>
                    <option value="soft">Minimal Pill</option>
                    <option value="none">Icon Only (Clean)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Icon Search & Filter */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search icons (e.g. wallet, shield, card, zap)..."
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {ICON_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setIconCategory(cat)}
                    className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      iconCategory === cat
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Catalog Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredIcons.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center hover:border-purple-400 hover:shadow-xs transition-all"
                >
                  <div
                    className={`mb-3 flex items-center justify-center ${getIconContainerClass()}`}
                  >
                    <div className={getIconColorClass()}>
                      {renderCmsIcon(item.name, { size: iconSize })}
                    </div>
                  </div>

                  <p className="truncate w-full text-xs font-bold text-slate-800">{item.label}</p>
                  <p className="truncate w-full text-[10px] font-mono text-slate-400 mt-0.5">
                    {item.name}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCopyIcon(item.name)}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors w-full justify-center"
                  >
                    {copiedIcon === item.name ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Name</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </CmsCard>
        </div>
      )}

      {/* TAB 3: LOGO & BRAND KIT */}
      {activeTab === "branding" && (
        <form onSubmit={handleSaveBrandVisuals} className="space-y-6">
          {brandSuccess && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
              <span>{brandSuccess}</span>
            </div>
          )}

          {brandError && (
            <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
              <AlertCircle className="size-4 shrink-0 text-rose-600" />
              <span>{brandError}</span>
            </div>
          )}

          {/* Live Preview Card */}
          <CmsCard
            title="Live Brand Logo Preview"
            subtitle="Real-time rendering of your brand mark across Light and Dark surfaces"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Light Mode Preview */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  Light Surface (Navbar / Main Pages)
                </p>
                <div className="flex h-24 items-center justify-center rounded-lg border border-slate-100 bg-slate-50/50 p-4">
                  {brandForm.logoType === "image" && brandForm.logoUrl ? (
                    <img
                      src={brandForm.logoUrl}
                      alt="Brand Logo"
                      style={{ height: `${brandForm.logoHeightPx}px` }}
                      className="w-auto object-contain"
                    />
                  ) : brandForm.logoType === "symbol_only" ? (
                    <span
                      className={`flex size-10 items-center justify-center rounded-xl text-xl font-bold ${
                        brandForm.brandSymbolBg === "solid-purple"
                          ? "bg-purple-600 text-white"
                          : brandForm.brandSymbolBg === "dark-slate"
                            ? "bg-slate-900 text-white"
                            : brandForm.brandSymbolBg === "emerald"
                              ? "bg-emerald-600 text-white"
                              : "gradient-brand text-white shadow-soft"
                      }`}
                    >
                      {brandForm.brandSymbol || "P"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl text-xl font-bold ${
                          brandForm.brandSymbolBg === "solid-purple"
                            ? "bg-purple-600 text-white"
                            : brandForm.brandSymbolBg === "dark-slate"
                              ? "bg-slate-900 text-white"
                              : brandForm.brandSymbolBg === "emerald"
                                ? "bg-emerald-600 text-white"
                                : "gradient-brand text-white shadow-soft"
                        }`}
                      >
                        {brandForm.brandSymbol || "P"}
                      </span>
                      <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                        {settings?.name || "Payroxa"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dark Mode Preview */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xs">
                <p className="text-xs font-semibold text-slate-400 mb-4">
                  Dark Surface (Footer / Dark Banners)
                </p>
                <div className="flex h-24 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 p-4">
                  {brandForm.logoType === "image" &&
                  (brandForm.logoDarkUrl || brandForm.logoUrl) ? (
                    <img
                      src={brandForm.logoDarkUrl || brandForm.logoUrl}
                      alt="Brand Logo Dark"
                      style={{ height: `${brandForm.logoHeightPx}px` }}
                      className="w-auto object-contain"
                    />
                  ) : brandForm.logoType === "symbol_only" ? (
                    <span
                      className={`flex size-10 items-center justify-center rounded-xl text-xl font-bold ${
                        brandForm.brandSymbolBg === "solid-purple"
                          ? "bg-purple-600 text-white"
                          : brandForm.brandSymbolBg === "dark-slate"
                            ? "bg-slate-900 text-white"
                            : brandForm.brandSymbolBg === "emerald"
                              ? "bg-emerald-600 text-white"
                              : "gradient-brand text-white shadow-soft"
                      }`}
                    >
                      {brandForm.brandSymbol || "P"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl text-xl font-bold ${
                          brandForm.brandSymbolBg === "solid-purple"
                            ? "bg-purple-600 text-white"
                            : brandForm.brandSymbolBg === "dark-slate"
                              ? "bg-slate-900 text-white"
                              : brandForm.brandSymbolBg === "emerald"
                                ? "bg-emerald-600 text-white"
                                : "gradient-brand text-white shadow-soft"
                        }`}
                      >
                        {brandForm.brandSymbol || "P"}
                      </span>
                      <span className="font-display text-xl font-bold tracking-tight text-white">
                        {settings?.name || "Payroxa"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CmsCard>

          {/* Logo Format & Symbol Customization */}
          <CmsCard
            title="Logo Configuration"
            subtitle="Select logo display structure and icon styling"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Logo Display Style
                </label>
                <select
                  disabled={!isSuperAdmin}
                  value={brandForm.logoType}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      logoType: e.target.value as "symbol_text" | "image" | "symbol_only",
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                >
                  <option value="symbol_text">Symbol Badge + Brand Text (Default)</option>
                  <option value="image">Full Custom Image Logo</option>
                  <option value="symbol_only">Symbol Mark Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Logo Display Height (Pixels)
                </label>
                <input
                  type="number"
                  min="20"
                  max="80"
                  disabled={!isSuperAdmin}
                  value={brandForm.logoHeightPx}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      logoHeightPx: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brand Symbol Letter / Character
                </label>
                <input
                  type="text"
                  maxLength={3}
                  disabled={!isSuperAdmin}
                  value={brandForm.brandSymbol}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      brandSymbol: e.target.value,
                    })
                  }
                  placeholder="P"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Brand Symbol Background Style
                </label>
                <select
                  disabled={!isSuperAdmin}
                  value={brandForm.brandSymbolBg}
                  onChange={(e) =>
                    setBrandForm({
                      ...brandForm,
                      brandSymbolBg: e.target.value as
                        "gradient-purple" | "solid-purple" | "dark-slate" | "emerald",
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                >
                  <option value="gradient-purple">Purple Gradient (Vibrant)</option>
                  <option value="solid-purple">Solid Purple</option>
                  <option value="dark-slate">Dark Slate / Black</option>
                  <option value="emerald">Emerald Green</option>
                </select>
              </div>
            </div>
          </CmsCard>

          {/* Logo Images & Favicon Uploader */}
          <CmsCard
            title="Image Files & Favicon"
            subtitle="Upload custom logos, dark mode versions, and browser favicons"
          >
            <div className="space-y-6">
              <CmsImagePicker
                label="Primary Light Logo (Navbar & Light Surfaces)"
                value={brandForm.logoUrl}
                onChange={(url) => setBrandForm({ ...brandForm, logoUrl: url })}
                categoryFilter="branding"
                recommendedDimensions="240 × 60 px (Transparent PNG / SVG)"
                disabled={!isSuperAdmin}
              />

              <CmsImagePicker
                label="Dark Surface Logo (Footer & Dark Themes)"
                value={brandForm.logoDarkUrl}
                onChange={(url) => setBrandForm({ ...brandForm, logoDarkUrl: url })}
                categoryFilter="branding"
                recommendedDimensions="240 × 60 px (White / Light Colored Logo)"
                disabled={!isSuperAdmin}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <CmsImagePicker
                  label="Browser Favicon (.ico / .png)"
                  value={brandForm.faviconUrl}
                  onChange={(url) => setBrandForm({ ...brandForm, faviconUrl: url })}
                  categoryFilter="branding"
                  recommendedDimensions="32 × 32 px or 64 × 64 px"
                  disabled={!isSuperAdmin}
                />

                <CmsImagePicker
                  label="Web App Touch Icon"
                  value={brandForm.appIconUrl}
                  onChange={(url) => setBrandForm({ ...brandForm, appIconUrl: url })}
                  categoryFilter="branding"
                  recommendedDimensions="192 × 192 px"
                  disabled={!isSuperAdmin}
                />
              </div>
            </div>
          </CmsCard>

          {isSuperAdmin && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={savingBrand}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
              >
                {savingBrand ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Publishing Brand Kit...</span>
                  </>
                ) : (
                  <>
                    <Palette className="size-4" />
                    <span>Save & Publish Brand Identity</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      )}

      {/* Edit Metadata Modal */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Edit Asset Metadata</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Update filename, alt text, and categorization for this asset.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Filename</label>
                <input
                  type="text"
                  value={editFilename}
                  onChange={(e) => setEditFilename(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={editAltText}
                  onChange={(e) => setEditAltText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as MediaCategory)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none capitalize"
                >
                  <option value="branding">Branding & Logos</option>
                  <option value="heroes">Heroes & Banners</option>
                  <option value="products">Products</option>
                  <option value="icons">Icons & Badges</option>
                  <option value="testimonials">Testimonials & Avatars</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {savingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
