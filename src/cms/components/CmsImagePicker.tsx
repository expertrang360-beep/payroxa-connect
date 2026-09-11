import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  Trash2,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { useCmsAuth } from "../context/CmsAuthContext";
import { getMediaFn, uploadMediaFn } from "../api";
import type { MediaAsset, MediaCategory } from "../types";

interface CmsImagePickerProps {
  value: string;
  onChange: (url: string, asset?: MediaAsset) => void;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  label?: string;
  helperText?: string;
  categoryFilter?: MediaCategory;
  recommendedDimensions?: string;
  disabled?: boolean;
}

export function CmsImagePicker({
  value,
  onChange,
  altText,
  onAltTextChange,
  label,
  helperText,
  categoryFilter,
  recommendedDimensions,
  disabled = false,
}: CmsImagePickerProps) {
  const { token } = useCmsAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "upload" | "url">("library");
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");
  const [altInput, setAltInput] = useState(altText || "");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

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

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setUrlInput(value || "");
      setAltInput(altText || "");
    }
  }, [isOpen, token, value, altText]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);
    try {
      // Convert file to Base64 data URL
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
            category: categoryFilter || "general",
            altText: altInput || file.name.replace(/\.[^/.]+$/, ""),
          },
        });

        if (res.success && res.asset) {
          onChange(res.asset.url, res.asset);
          if (onAltTextChange && res.asset.altText) {
            onAltTextChange(res.asset.altText);
          }
          setIsOpen(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      if (onAltTextChange && altInput.trim()) {
        onAltTextChange(altInput.trim());
      }
      setIsOpen(false);
    }
  };

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setUrlInput(asset.url);
    if (!altInput && asset.altText) {
      setAltInput(asset.altText);
    }
  };

  const handleConfirmSelection = () => {
    if (urlInput) {
      onChange(urlInput, selectedAsset || undefined);
      if (onAltTextChange && altInput) {
        onAltTextChange(altInput);
      }
      setIsOpen(false);
    }
  };

  const filteredMedia = categoryFilter
    ? mediaList.filter((m) => m.category === categoryFilter || m.category === "general")
    : mediaList;

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      )}

      {/* Main Preview / Control Box */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
        {/* Thumbnail Preview */}
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-900/90 border border-slate-200">
          {value ? (
            <img
              src={value}
              alt={altText || "Preview"}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                // If broken image URL, fallback icon
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <ImageIcon className="size-8 text-slate-500" />
          )}
        </div>

        {/* Info & Action Buttons */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="truncate text-xs font-semibold text-slate-900">
              {value
                ? value.substring(value.lastIndexOf("/") + 1) || "Custom Image"
                : "No image selected"}
            </span>
          </div>

          <p className="truncate text-[11px] font-mono text-slate-400">
            {value || "Default fallback will be used"}
          </p>

          {recommendedDimensions && (
            <p className="text-[10px] text-purple-600 font-medium">
              Recommended: {recommendedDimensions}
            </p>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              disabled={disabled}
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 border border-purple-200 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-50"
            >
              <FolderOpen className="size-3.5" />
              <span>{value ? "Change Image" : "Select / Upload Image"}</span>
            </button>

            {value && !disabled && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                title="Remove image"
              >
                <Trash2 className="size-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {helperText && <p className="mt-1 text-[11px] text-slate-400">{helperText}</p>}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="flex h-[85vh] max-h-[640px] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Media Asset Manager</h3>
                <p className="text-xs text-slate-500">
                  Select an asset from the media library, upload from your device, or paste a link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100 bg-slate-50/70 px-6 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("library")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "library"
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <ImageIcon className="size-4" />
                <span>Media Library ({filteredMedia.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "upload"
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Upload className="size-4" />
                <span>Upload New</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                  activeTab === "url"
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <LinkIcon className="size-4" />
                <span>Direct Image URL</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "library" && (
                <div>
                  {loadingMedia ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="size-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
                    </div>
                  ) : filteredMedia.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 mb-3">
                        <ImageIcon className="size-6" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">No media assets found</h4>
                      <p className="mt-1 max-w-xs text-xs text-slate-400">
                        Upload an image or add an external URL to get started.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab("upload")}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700"
                      >
                        <Upload className="size-3.5" />
                        <span>Upload File</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                      {filteredMedia.map((asset) => {
                        const isChosen = urlInput === asset.url;
                        return (
                          <div
                            key={asset.id}
                            onClick={() => handleSelectAsset(asset)}
                            className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all ${
                              isChosen
                                ? "border-purple-600 ring-2 ring-purple-600/20 shadow-xs"
                                : "border-slate-200 hover:border-purple-300 hover:shadow-xs"
                            }`}
                          >
                            <div className="relative flex h-28 items-center justify-center bg-slate-900/90 p-2">
                              <img
                                src={asset.url}
                                alt={asset.altText}
                                className="max-h-full max-w-full object-contain"
                              />
                              {isChosen && (
                                <div className="absolute top-2 right-2 size-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs">
                                  <Check className="size-3" />
                                </div>
                              )}
                            </div>
                            <div className="p-2.5 bg-white">
                              <p className="truncate text-[11px] font-bold text-slate-800">
                                {asset.filename}
                              </p>
                              <p className="text-[10px] text-slate-400 capitalize">
                                {asset.category} • {Math.round(asset.sizeBytes / 1024)} KB
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "upload" && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/20 p-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 mb-4">
                    <Upload className="size-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Upload Media File</h4>
                  <p className="mt-1 max-w-sm text-xs text-slate-500">
                    Drag and drop your image file here, or click browse. Supports PNG, JPG, SVG,
                    WebP, and ICO up to 5MB.
                  </p>

                  <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700">
                    <Upload className="size-4" />
                    <span>{uploading ? "Processing Upload..." : "Browse Local File"}</span>
                    <input
                      type="file"
                      accept="image/*,.ico"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {activeTab === "url" && (
                <div className="max-w-xl mx-auto space-y-4 py-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Direct Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.png or /src/assets/hero-payroxa.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {onAltTextChange && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Image Alt Text (Accessibility & SEO)
                      </label>
                      <input
                        type="text"
                        placeholder="Descriptive explanation of the image..."
                        value={altInput}
                        onChange={(e) => setAltInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {urlInput && (
                    <div className="mt-4 rounded-xl border border-slate-200 p-3 bg-slate-50">
                      <p className="text-[11px] font-semibold text-slate-600 mb-2">Live Preview:</p>
                      <div className="flex h-32 items-center justify-center bg-slate-900 rounded-lg p-2">
                        <img
                          src={urlInput}
                          alt="URL Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-100 bg-slate-50 p-4 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                {urlInput ? "Asset ready to apply" : "No asset selected"}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSelection}
                  disabled={!urlInput}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
                >
                  <Check className="size-3.5" />
                  <span>Use This Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
