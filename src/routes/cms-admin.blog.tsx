import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Search as SearchIcon,
  Filter,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Save,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  Tag,
  FolderOpen,
} from "lucide-react";
import { useCmsAuth } from "@/cms/context/CmsAuthContext";
import {
  getBlogDataFn,
  saveBlogPostFn,
  deleteBlogPostFn,
  saveBlogCategoryFn,
  deleteBlogCategoryFn,
  saveBlogAuthorFn,
  deleteBlogAuthorFn,
} from "@/cms/api";
import { CmsHeader } from "@/cms/components/CmsHeader";
import { CmsCard } from "@/cms/components/CmsCard";
import { CmsImagePicker } from "@/cms/components/CmsImagePicker";
import type { BlogPost, BlogCategory, BlogAuthor } from "@/cms/types";

export const Route = createFileRoute("/cms-admin/blog")({
  component: CmsBlogAdminPage,
});

type MainTab = "posts" | "categories" | "authors";

function CmsBlogAdminPage() {
  const { token, user } = useCmsAuth();
  const [activeTab, setActiveTab] = useState<MainTab>("posts");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Post Editor State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postEditorMode, setPostEditorMode] = useState<"write" | "preview">("write");
  const [showPostModal, setShowPostModal] = useState(false);

  // Category & Author modal states
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<BlogAuthor | null>(null);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getBlogDataFn({ data: { token } });
      setPosts(res.posts);
      setCategories(res.categories);
      setAuthors(res.authors);
    } catch (err) {
      console.error("Failed to load blog data:", err);
      setError("Unable to load blog resources data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleOpenNewPost = () => {
    const defaultAuthor = authors[0] || { id: "auth-1", name: "Payroxa Team", role: "Editorial" };
    const defaultCategory = categories[0] || { id: "cat-1", name: "Payments & Invoicing" };
    setEditingPost({
      id: "",
      title: "",
      slug: "",
      excerpt: "",
      content:
        "## Overview\n\nWrite your guide here using standard Markdown.\n\n### Why it matters\n\nExplain key insights for Nigerian merchants.",
      featuredImageUrl: "/hero-payroxa.jpg",
      featuredImageAlt: "",
      authorId: defaultAuthor.id,
      authorName: defaultAuthor.name,
      authorRole: defaultAuthor.role,
      categoryId: defaultCategory.id,
      categoryName: defaultCategory.name,
      tags: ["fintech", "Nigeria"],
      readTimeMinutes: 5,
      seoTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      ogImageUrl: "/hero-payroxa.jpg",
      status: "draft",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      featured: false,
      relatedProduct: "payments",
    });
    setPostEditorMode("write");
    setShowPostModal(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingPost) return;
    if (!editingPost.title || !editingPost.content) {
      setError("Title and content are required.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await saveBlogPostFn({
        data: {
          token,
          post: editingPost,
        },
      });
      if (res.success) {
        setPosts(res.posts);
        setShowPostModal(false);
        setSuccess(`Article "${res.post.title}" saved successfully.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save post.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!token || !confirm(`Delete article "${title}"?`)) return;
    try {
      const res = await deleteBlogPostFn({ data: { token, id } });
      if (res.success) {
        setPosts(res.posts);
        setSuccess("Article deleted.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to delete post.");
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingCategory) return;
    try {
      const res = await saveBlogCategoryFn({ data: { token, category: editingCategory } });
      if (res.success) {
        setCategories(res.categories);
        setShowCategoryModal(false);
        setSuccess("Category saved.");
      }
    } catch (err) {
      setError("Failed to save category.");
    }
  };

  const handleSaveAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editingAuthor) return;
    try {
      const res = await saveBlogAuthorFn({ data: { token, author: editingAuthor } });
      if (res.success) {
        setAuthors(res.authors);
        setShowAuthorModal(false);
        setSuccess("Author saved.");
      }
    } catch (err) {
      setError("Failed to save author.");
    }
  };

  // Filtered posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesCat = categoryFilter === "all" || p.categoryId === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CmsHeader
        title="Blog & Resources Publishing Suite"
        description="Publish educational guides, technical comparisons, and SEO-driven content targeting high-intent Nigerian search queries."
        action={
          <div className="flex items-center gap-2">
            <a
              href="/resources"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <Eye className="size-3.5 text-purple-600" />
              <span>View Public Resources</span>
              <ExternalLink className="size-3 text-slate-400" />
            </a>
            <button
              type="button"
              onClick={handleOpenNewPost}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors"
            >
              <Plus className="size-4" />
              <span>Create New Article</span>
            </button>
          </div>
        }
      />

      {success && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
            <span>{success}</span>
          </div>
          <button
            onClick={() => setSuccess(null)}
            className="text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-700 hover:text-rose-900">
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-1">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "posts"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="size-4" />
          <span>Articles & Guides</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
            {posts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "categories"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <FolderOpen className="size-4" />
          <span>Categories</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
            {categories.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("authors")}
          className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "authors"
              ? "border-purple-600 text-purple-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="size-4" />
          <span>Authors</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
            {authors.length}
          </span>
        </button>
      </div>

      {/* TAB 1: ARTICLES LIST */}
      {activeTab === "posts" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, excerpt, slug..."
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3.5 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <CmsCard>
            {filteredPosts.length === 0 ? (
              <div className="py-12 text-center">
                <BookOpen className="mx-auto size-8 text-slate-400" />
                <p className="mt-2 text-xs font-medium text-slate-500">
                  No articles match your search or filter.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={post.featuredImageUrl || "/hero-payroxa.jpg"}
                        alt={post.title}
                        className="size-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              post.status === "published"
                                ? "bg-emerald-100 text-emerald-800"
                                : post.status === "draft"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {post.status.toUpperCase()}
                          </span>
                          <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
                            {post.categoryName}
                          </span>
                          {post.featured && (
                            <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                              Featured
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="size-3" />
                            {post.readTimeMinutes} min read
                          </span>
                        </div>

                        <h4 className="mt-1 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors">
                          {post.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">{post.excerpt}</p>

                        <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-purple-700">
                          <span>/resources/{post.slug}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={`/resources/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        title="View Public Post"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPost(post);
                          setPostEditorMode("write");
                          setShowPostModal(true);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="rounded-xl border border-slate-200 bg-white p-2 text-rose-600 hover:bg-rose-50 hover:text-rose-800 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CmsCard>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === "categories" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Content Categories</h3>
              <p className="text-xs text-slate-500">
                Group articles into topic clusters for structured internal linking
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingCategory({
                  id: `cat-${Date.now()}`,
                  name: "",
                  slug: "",
                  description: "",
                  color: "purple",
                });
                setShowCategoryModal(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              <Plus className="size-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800">
                    {cat.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(cat);
                      setShowCategoryModal(true);
                    }}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-2 text-xs font-mono text-slate-400">slug: {cat.slug}</div>
                <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                  {cat.description || "No description."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUTHORS */}
      {activeTab === "authors" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Editorial Authors</h3>
              <p className="text-xs text-slate-500">
                Author bios establish E-E-A-T trust signals for Google quality raters
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingAuthor({
                  id: `auth-${Date.now()}`,
                  name: "",
                  role: "Fintech Specialist",
                  bio: "",
                  avatarUrl: "/logo-payroxa.png",
                });
                setShowAuthorModal(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors"
            >
              <Plus className="size-4" />
              <span>Add Author</span>
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((auth) => (
              <div
                key={auth.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={auth.avatarUrl || "/logo-payroxa.png"}
                    alt={auth.name}
                    className="size-12 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{auth.name}</h4>
                    <span className="text-xs text-purple-600 font-medium">{auth.role}</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 line-clamp-3">{auth.bio}</p>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAuthor(auth);
                      setShowAuthorModal(true);
                    }}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                  >
                    Edit Bio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ARTICLE EDITOR MODAL */}
      {showPostModal && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70 shrink-0">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingPost.id ? "Edit Article" : "Create New Resource Article"}
                </h3>
                <p className="text-xs text-slate-500">
                  Complete technical and content specifications for publishing on Payroxa
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePost}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
                >
                  <Save className="size-3.5" />
                  <span>{saving ? "Saving..." : "Save Article"}</span>
                </button>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title & Slug */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Article Headline (H1)
                  </label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = newTitle
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      setEditingPost({
                        ...editingPost,
                        title: newTitle,
                        slug: editingPost.id ? editingPost.slug : autoSlug,
                        seoTitle: editingPost.seoTitle || `${newTitle} | Payroxa`,
                      });
                    }}
                    placeholder="e.g. How to Accept Online Payments in Nigeria: The Definitive 2026 Guide"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      URL Slug
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
                      <span className="text-xs text-slate-400 font-mono">/resources/</span>
                      <input
                        type="text"
                        value={editingPost.slug}
                        onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                        className="flex-1 bg-transparent font-mono text-xs text-slate-900 focus:outline-none ml-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publishing Status
                    </label>
                    <select
                      value={editingPost.status}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          status: e.target.value as "draft" | "published" | "archived",
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                    >
                      <option value="draft">Draft (Private, not in sitemap)</option>
                      <option value="published">Published (Live to public & Googlebot)</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Article Excerpt / Abstract
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost.excerpt}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        excerpt: e.target.value,
                        metaDescription: editingPost.metaDescription || e.target.value,
                      })
                    }
                    placeholder="Brief 2-sentence overview that hooks the reader and serves as the summary card snippet."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Taxonomy & Cross Linking */}
              <div className="grid gap-4 sm:grid-cols-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingPost.categoryId}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.id === e.target.value);
                      setEditingPost({
                        ...editingPost,
                        categoryId: e.target.value,
                        categoryName: cat ? cat.name : editingPost.categoryName,
                      });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author</label>
                  <select
                    value={editingPost.authorId}
                    onChange={(e) => {
                      const a = authors.find((auth) => auth.id === e.target.value);
                      setEditingPost({
                        ...editingPost,
                        authorId: e.target.value,
                        authorName: a ? a.name : editingPost.authorName,
                        authorRole: a ? a.role : editingPost.authorRole,
                      });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    {authors.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Related Conversion Solution
                  </label>
                  <select
                    value={editingPost.relatedProduct || "payments"}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, relatedProduct: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none"
                  >
                    <option value="payments">Online Payments (/payments)</option>
                    <option value="store">Store Builder (/store)</option>
                    <option value="cards">Cards & Expenses (/cards)</option>
                    <option value="wallet">Multi-Currency Wallet (/wallet)</option>
                    <option value="transfers">Transfers & Payroll (/transfers)</option>
                    <option value="business">Business Operations (/business)</option>
                  </select>
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-3">
                <CmsImagePicker
                  label="Featured Article Image"
                  value={editingPost.featuredImageUrl || "/hero-payroxa.jpg"}
                  onChange={(val) => setEditingPost({ ...editingPost, featuredImageUrl: val })}
                  category="heroes"
                />
                <input
                  type="text"
                  value={editingPost.featuredImageAlt || ""}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, featuredImageAlt: e.target.value })
                  }
                  placeholder="Alt text describing the image for accessibility & image search"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 focus:border-purple-600 focus:outline-none"
                />
              </div>

              {/* Content Markdown Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Article Content (Markdown)
                  </label>
                  <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPostEditorMode("write")}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                        postEditorMode === "write"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostEditorMode("preview")}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                        postEditorMode === "preview"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {postEditorMode === "write" ? (
                  <textarea
                    rows={12}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full font-mono text-xs leading-relaxed rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-purple-600 focus:outline-none"
                    placeholder="Write article content using Markdown (headings, lists, bold text, links)..."
                    required
                  />
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 prose prose-slate max-w-none text-xs leading-relaxed max-h-80 overflow-y-auto">
                    <div className="whitespace-pre-wrap font-sans">{editingPost.content}</div>
                  </div>
                )}
              </div>

              {/* Dedicated Article SEO Box */}
              <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-purple-600" />
                  <h4 className="text-xs font-bold text-purple-950">
                    Article Search Engine Optimization
                  </h4>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={editingPost.seoTitle || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, seoTitle: e.target.value })}
                      placeholder="Title tag displayed on Google SERPs"
                      className="w-full rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      value={editingPost.metaDescription || ""}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, metaDescription: e.target.value })
                      }
                      placeholder="140-160 char summary for Google snippet"
                      className="w-full rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/70 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPost.featured}
                  onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Pin as Featured Resource on Homepage
                </span>
              </label>

              <button
                type="button"
                onClick={handleSavePost}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50"
              >
                <Save className="size-3.5" />
                <span>{saving ? "Publishing..." : "Save and Publish"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {showCategoryModal && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">Edit Category</h3>
            <form onSubmit={handleSaveCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    setEditingCategory({
                      ...editingCategory,
                      name,
                      slug: editingCategory.slug || slug,
                    });
                  }}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full font-mono rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUTHOR MODAL */}
      {showAuthorModal && editingAuthor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">Edit Author Bio</h3>
            <form onSubmit={handleSaveAuthor} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={editingAuthor.name}
                  onChange={(e) => setEditingAuthor({ ...editingAuthor, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={editingAuthor.role}
                  onChange={(e) => setEditingAuthor({ ...editingAuthor, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={editingAuthor.bio}
                  onChange={(e) => setEditingAuthor({ ...editingAuthor, bio: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAuthorModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700"
                >
                  Save Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
