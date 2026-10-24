import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface SidebarNavContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarNavContext = createContext<SidebarNavContextType | undefined>(undefined);

const COLLAPSED_STORAGE_KEY = "payroxa_sidebar_collapsed";

export function SidebarNavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSED_STORAGE_KEY, String(next));
      } catch {
        // Ignore localStorage errors
      }
      return next;
    });
  }, []);

  // Listen to keyboard shortcut (Cmd+B or Ctrl+B) to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SidebarNavContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        isCollapsed,
        toggleCollapsed,
      }}
    >
      {children}
    </SidebarNavContext.Provider>
  );
}

export function useSidebarNav() {
  const context = useContext(SidebarNavContext);
  if (!context) {
    throw new Error("useSidebarNav must be used within a SidebarNavProvider");
  }
  return context;
}
