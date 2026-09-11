import React from "react";
import {
  FileEdit,
  CheckCircle,
  Link2,
  Sparkles,
  ShieldCheck,
  UserPlus,
  HelpCircle,
  Radio,
  Clock,
} from "lucide-react";
import type { CmsActivityLog } from "../types";

export function CmsActivityFeed({ activities }: { activities: CmsActivityLog[] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        No recent activity recorded yet.
      </div>
    );
  }

  const getActionIcon = (action: CmsActivityLog["action"]) => {
    switch (action) {
      case "content_published":
        return <CheckCircle className="size-4 text-emerald-600" />;
      case "link_changed":
        return <Link2 className="size-4 text-blue-600" />;
      case "admin_added":
        return <UserPlus className="size-4 text-purple-600" />;
      case "admin_logged_in":
        return <ShieldCheck className="size-4 text-slate-500" />;
      case "faq_added":
      case "faq_updated":
        return <HelpCircle className="size-4 text-amber-600" />;
      case "announcement_updated":
        return <Radio className="size-4 text-rose-500" />;
      default:
        return <FileEdit className="size-4 text-purple-600" />;
    }
  };

  const formatTimeAgo = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return isoString;
    }
  };

  return (
    <div className="divide-y divide-slate-100">
      {activities.map((act) => (
        <div key={act.id} className="flex items-start gap-3 py-3.5 first:pt-1 last:pb-1">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
            {getActionIcon(act.action)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-900">{act.description}</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-600">{act.userName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {formatTimeAgo(act.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
