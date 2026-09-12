import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RefreshCw, Activity, Filter, Search } from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getActivityLogFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsActivityFeed } from "@/cms/components/CmsActivityFeed";
import type { CmsActivityLog } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/activity")({
  component: CmsActivityAuditPage,
});

function CmsActivityAuditPage() {
  const { token } = useCmsAuth();
  const [activities, setActivities] = useState<CmsActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");

  const loadActivities = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getActivityLogFn({ data: { token } });
      setActivities(res.activities);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [token]);

  const filtered = activities.filter((act) => {
    const matchesSearch =
      search === "" ||
      act.description.toLowerCase().includes(search.toLowerCase()) ||
      act.userName.toLowerCase().includes(search.toLowerCase()) ||
      act.userEmail.toLowerCase().includes(search.toLowerCase());

    const matchesAction = filterAction === "all" || act.action === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div>
      <CmsHeader
        title="Activity Audit Log"
        description="Comprehensive audit trail tracking all CMS modifications, logins, content revisions, and configuration updates."
        actions={
          <button
            type="button"
            onClick={loadActivities}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Log</span>
          </button>
        }
      />

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, administrator name, or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-xs text-slate-900 shadow-2xs focus:border-purple-500 focus:outline-none"
          />
        </div>

        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-2xs focus:border-purple-500 focus:outline-none"
        >
          <option value="all">All Action Types</option>
          <option value="content_published">Published Content</option>
          <option value="link_changed">Link Changes</option>
          <option value="settings_updated">Settings Updated</option>
          <option value="admin_added">Admin Created</option>
          <option value="admin_logged_in">Sign-ins</option>
        </select>
      </div>

      <CmsCard
        title={`Audit Records (${filtered.length})`}
        subtitle="Chronological list of all recorded changes"
      >
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="size-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : (
          <CmsActivityFeed activities={filtered} />
        )}
      </CmsCard>
    </div>
  );
}
