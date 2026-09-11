import React from "react";
import { usePublicCms } from "@/cms/context/PublicCmsContext";
import { ArrowRight, Megaphone } from "lucide-react";

export function AnnouncementBar() {
  const { activeAnnouncement } = usePublicCms();

  if (!activeAnnouncement || !activeAnnouncement.enabled) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 px-4 py-2 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Megaphone className="size-3" />
          </span>
          <span className="rounded bg-white/20 px-1.5 py-0.5 font-bold tracking-wider uppercase text-[10px]">
            {activeAnnouncement.title}
          </span>
          <span className="truncate font-medium">{activeAnnouncement.message}</span>
        </div>
        {activeAnnouncement.ctaUrl && activeAnnouncement.ctaLabel && (
          <a
            href={activeAnnouncement.ctaUrl}
            className="inline-flex shrink-0 items-center gap-1 font-semibold underline hover:text-purple-200 transition-colors"
          >
            <span>{activeAnnouncement.ctaLabel}</span>
            <ArrowRight className="size-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default AnnouncementBar;
