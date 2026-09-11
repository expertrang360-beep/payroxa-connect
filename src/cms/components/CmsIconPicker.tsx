import React, { useState, useMemo } from "react";
import { Search, X, Check, Sparkles } from "lucide-react";
import { CMS_ICON_CATALOG, ICON_CATEGORIES, renderCmsIcon } from "../icons";

interface CmsIconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

export function CmsIconPicker({
  value,
  onChange,
  label,
  helperText,
  disabled = false,
}: CmsIconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [customInput, setCustomInput] = useState("");

  const filteredIcons = useMemo(() => {
    return CMS_ICON_CATALOG.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.label.toLowerCase().includes(query) ||
        item.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
  };

  const handleApplyCustom = () => {
    if (customInput.trim()) {
      onChange(customInput.trim());
      setCustomInput("");
      setIsOpen(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">{label}</label>
      )}

      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-2xs hover:border-purple-300 hover:bg-purple-50/20 focus:border-purple-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400 transition-colors"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
            {renderCmsIcon(value, { className: "size-4.5" })}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-900">
              {value || "Select Icon"}
            </p>
            <p className="text-[11px] text-slate-400">Click to change icon</p>
          </div>
        </button>

        {value && !disabled && (
          <button
            type="button"
            onClick={() => onChange("Sparkles")}
            title="Reset to default icon"
            className="text-[11px] text-slate-400 hover:text-slate-600 px-1.5 py-1"
          >
            Reset
          </button>
        )}
      </div>

      {helperText && <p className="mt-1 text-[11px] text-slate-400">{helperText}</p>}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="flex h-[85vh] max-h-[640px] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Select Visual Icon</h3>
                <p className="text-xs text-slate-500">
                  Choose from curated brand and interface icons or specify a custom Lucide
                  identifier.
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

            {/* Search & Category Filter */}
            <div className="border-b border-slate-100 bg-slate-50/50 p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search icons by name (e.g. wallet, shield, send, card)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                {ICON_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white shadow-2xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {filteredIcons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                    <Sparkles className="size-6" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">No matching icons found</h4>
                  <p className="mt-1 max-w-xs text-xs text-slate-400">
                    Try searching for different keywords or manually enter an icon name below.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {filteredIcons.map((item) => {
                    const isSelected = value === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleSelect(item.name)}
                        className={`group relative flex flex-col items-center justify-center rounded-xl p-3 text-center border transition-all ${
                          isSelected
                            ? "border-purple-600 bg-purple-50/70 text-purple-700 ring-2 ring-purple-600/20 shadow-xs"
                            : "border-slate-150 bg-white hover:border-purple-300 hover:bg-purple-50/20 text-slate-700"
                        }`}
                      >
                        <div
                          className={`mb-2 flex size-9 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                            isSelected
                              ? "bg-purple-600 text-white shadow-xs"
                              : "bg-slate-50 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-700"
                          }`}
                        >
                          {renderCmsIcon(item.name, { className: "size-5" })}
                        </div>
                        <span className="truncate w-full text-[11px] font-semibold">
                          {item.label}
                        </span>
                        <span className="truncate w-full text-[9px] font-mono text-slate-400 mt-0.5">
                          {item.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 size-4 rounded-full bg-purple-600 text-white flex items-center justify-center">
                            <Check className="size-2.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom Icon Identifier Footer */}
            <div className="border-t border-slate-100 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  placeholder="Custom Lucide Icon Name (e.g. ShieldCheck)"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none max-w-xs"
                />
                <button
                  type="button"
                  onClick={handleApplyCustom}
                  disabled={!customInput.trim()}
                  className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-slate-900 disabled:opacity-40"
                >
                  Apply Custom
                </button>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
