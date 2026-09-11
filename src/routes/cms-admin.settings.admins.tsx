import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  ShieldAlert,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import { getAdminUsersFn, createAdminUserFn, deleteAdminUserFn } from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import type { CmsUser, AdminRole } from "@/cms/types";

export const Route = createFileRoute("/cms/settings/admins")({
  component: CmsAdminUsersPage,
});

function CmsAdminUsersPage() {
  const { token, user: currentUser, isSuperAdmin } = useCmsAuth();
  const [users, setUsers] = useState<CmsUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New user form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AdminRole>("Editor");
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getAdminUsersFn({ data: { token } });
      setUsers(res.users);
    } catch (err) {
      console.error("Failed to load admin users:", err);
      setError("Unable to load administrator users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [token]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const res = await createAdminUserFn({
        data: {
          token,
          name,
          email,
          password,
          role,
        },
      });

      if (res.success && res.user) {
        setUsers([...users, res.user]);
        setSuccess(`Administrator account created for ${res.user.name} (${res.user.role}).`);
        setShowAddModal(false);
        setName("");
        setEmail("");
        setPassword("");
        setRole("Editor");
      } else {
        setError(res.error || "Failed to create administrator account.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create user.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to remove administrator access for ${userName}?`)) {
      return;
    }

    try {
      const res = await deleteAdminUserFn({
        data: {
          token,
          userId,
        },
      });

      if (res.success) {
        setUsers(users.filter((u) => u.id !== userId));
        setSuccess(`Removed administrator access for ${userName}.`);
      } else {
        setError(res.error || "Failed to remove user.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to remove user.";
      setError(message);
    }
  };

  return (
    <div>
      <CmsHeader
        title="Administrator Accounts & Roles"
        description="Manage team access, permissions, and security roles across the Payroxa website CMS."
        actions={
          isSuperAdmin ? (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors"
            >
              <UserPlus className="size-3.5" />
              <span>Add Administrator</span>
            </button>
          ) : undefined
        }
      />

      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Role Matrix Info Card */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
            <Shield className="size-4 text-purple-600" />
            <span>Super Admin Role</span>
          </div>
          <p className="mt-2 text-xs text-purple-800">
            Full administrative authority. Can modify Application destination URLs, system settings,
            invite/remove users, configure social channels, and publish all website content.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Users className="size-4 text-slate-500" />
            <span>Editor Role</span>
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Content management access. Can edit and draft Hero banners, Products, Business Types,
            FAQs, Testimonials, Media assets, and announcements. Cannot modify application URLs or
            admin roles.
          </p>
        </div>
      </div>

      {/* Administrators List */}
      <CmsCard title="Active Administrators" subtitle="Current authorized CMS accounts">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="size-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map((u) => {
              const isMe = u.id === currentUser?.id;
              return (
                <div
                  key={u.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 font-bold text-sm text-purple-700">
                      {u.name[0]?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{u.name}</h4>
                        {isMe && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                        u.role === "Super Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {u.role}
                    </span>

                    {isSuperAdmin && !isMe && (
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id, u.name)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Remove Administrator"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CmsCard>

      {/* Add Administrator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Add New Administrator</h3>
            <p className="mt-1 text-xs text-slate-500">
              Create an administrative login for a Payroxa team member.
            </p>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Adeyemi"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@payroxa.com.ng"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Temporary Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Assignment
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminRole)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none"
                >
                  <option value="Editor">Editor (Content & Media only)</option>
                  <option value="Super Admin">Super Admin (Full System Access)</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
