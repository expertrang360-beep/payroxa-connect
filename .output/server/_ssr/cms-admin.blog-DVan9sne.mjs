import { i as __toESM } from "../_runtime.mjs";
import { A as saveBlogCategoryFn, j as saveBlogPostFn, k as saveBlogAuthorFn, l as getBlogDataFn, r as deleteBlogPostFn } from "./api-CzvtI6QF.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as useCmsAuth } from "./CmsAuthContext-D6Q6fF4Y.mjs";
import { Ct as CircleCheck, Nt as BookOpen, O as Search, P as Plus, Tt as CircleAlert, _ as Sparkles, ct as FileText, ht as ExternalLink, k as Save, o as Users, ot as FolderOpen, p as Trash2, pt as Eye, xt as Clock } from "../_libs/lucide-react.mjs";
import { n as CmsHeader, t as CmsCard } from "./CmsCard-B91kIm87.mjs";
import { t as CmsImagePicker } from "./CmsImagePicker-9Z_c_NmU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms-admin.blog-DVan9sne.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/cms-admin.blog.tsx?tsr-split=component";
function CmsBlogAdminPage() {
	const { token, user } = useCmsAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("posts");
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [authors, setAuthors] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [editingPost, setEditingPost] = (0, import_react.useState)(null);
	const [postEditorMode, setPostEditorMode] = (0, import_react.useState)("write");
	const [showPostModal, setShowPostModal] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [showCategoryModal, setShowCategoryModal] = (0, import_react.useState)(false);
	const [editingAuthor, setEditingAuthor] = (0, import_react.useState)(null);
	const [showAuthorModal, setShowAuthorModal] = (0, import_react.useState)(false);
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
	(0, import_react.useEffect)(() => {
		loadData();
	}, [token]);
	const handleOpenNewPost = () => {
		const defaultAuthor = authors[0] || {
			id: "auth-1",
			name: "Payroxa Team",
			role: "Editorial"
		};
		const defaultCategory = categories[0] || {
			id: "cat-1",
			name: "Payments & Invoicing"
		};
		setEditingPost({
			id: "",
			title: "",
			slug: "",
			excerpt: "",
			content: "## Overview\n\nWrite your guide here using standard Markdown.\n\n### Why it matters\n\nExplain key insights for Nigerian merchants.",
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
			publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			featured: false,
			relatedProduct: "payments"
		});
		setPostEditorMode("write");
		setShowPostModal(true);
	};
	const handleSavePost = async (e) => {
		e.preventDefault();
		if (!token || !editingPost) return;
		if (!editingPost.title || !editingPost.content) {
			setError("Title and content are required.");
			return;
		}
		setSaving(true);
		setError(null);
		try {
			const res = await saveBlogPostFn({ data: {
				token,
				post: editingPost
			} });
			if (res.success) {
				setPosts(res.posts);
				setShowPostModal(false);
				setSuccess(`Article "${res.post.title}" saved successfully.`);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to save post.";
			setError(msg);
		} finally {
			setSaving(false);
		}
	};
	const handleDeletePost = async (id, title) => {
		if (!token || !confirm(`Delete article "${title}"?`)) return;
		try {
			const res = await deleteBlogPostFn({ data: {
				token,
				id
			} });
			if (res.success) {
				setPosts(res.posts);
				setSuccess("Article deleted.");
			}
		} catch (err) {
			console.error(err);
			setError("Failed to delete post.");
		}
	};
	const handleSaveCategory = async (e) => {
		e.preventDefault();
		if (!token || !editingCategory) return;
		try {
			const res = await saveBlogCategoryFn({ data: {
				token,
				category: editingCategory
			} });
			if (res.success) {
				setCategories(res.categories);
				setShowCategoryModal(false);
				setSuccess("Category saved.");
			}
		} catch (err) {
			setError("Failed to save category.");
		}
	};
	const handleSaveAuthor = async (e) => {
		e.preventDefault();
		if (!token || !editingAuthor) return;
		try {
			const res = await saveBlogAuthorFn({ data: {
				token,
				author: editingAuthor
			} });
			if (res.success) {
				setAuthors(res.authors);
				setShowAuthorModal(false);
				setSuccess("Author saved.");
			}
		} catch (err) {
			setError("Failed to save author.");
		}
	};
	const filteredPosts = posts.filter((p) => {
		const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || p.slug.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === "all" || p.status === statusFilter;
		const matchesCat = categoryFilter === "all" || p.categoryId === categoryFilter;
		return matchesSearch && matchesStatus && matchesCat;
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 192,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 191,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CmsHeader, {
				title: "Blog & Resources Publishing Suite",
				description: "Publish educational guides, technical comparisons, and SEO-driven content targeting high-intent Nigerian search queries.",
				action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/resources",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "size-3.5 text-purple-600" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "View Public Resources" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "size-3 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: handleOpenNewPost,
						className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Create New Article" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 203
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 196,
				columnNumber: 7
			}, this),
			success && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: success }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 211,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => setSuccess(null),
					className: "text-emerald-700 hover:text-emerald-900",
					children: "Dismiss"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 213,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 208,
				columnNumber: 19
			}, this),
			error && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 text-rose-600" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("span", { children: error }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("button", {
					onClick: () => setError(null),
					className: "text-rose-700 hover:text-rose-900",
					children: "Dismiss"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 218,
				columnNumber: 17
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-2 border-b border-slate-200 pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("posts"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "posts" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 231,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Articles & Guides" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700",
								children: posts.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("categories"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "categories" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderOpen, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Categories" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700",
								children: categories.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("authors"),
						className: `inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === "authors" ? "border-purple-600 text-purple-700" : "border-transparent text-slate-600 hover:text-slate-900"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Authors" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700",
								children: authors.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 229,
				columnNumber: 7
			}, this),
			activeTab === "posts" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search articles by title, excerpt, slug...",
							className: "w-full rounded-xl border border-slate-200 pl-9 pr-3.5 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (void 0)("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							className: "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "all",
									children: "All Statuses"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "published",
									children: "Published"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 266,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "draft",
									children: "Drafts"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 267,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "archived",
									children: "Archived"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 268,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 264,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: categoryFilter,
							onChange: (e) => setCategoryFilter(e.target.value),
							className: "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-purple-600 focus:outline-none",
							children: [/* @__PURE__ */ (void 0)("option", {
								value: "all",
								children: "All Categories"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 17
							}, this), categories.map((c) => /* @__PURE__ */ (void 0)("option", {
								value: c.id,
								children: c.name
							}, c.id, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 38
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 258,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)(CmsCard, { children: filteredPosts.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "py-12 text-center",
					children: [/* @__PURE__ */ (void 0)(BookOpen, { className: "mx-auto size-8 text-slate-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 282,
						columnNumber: 17
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "mt-2 text-xs font-medium text-slate-500",
						children: "No articles match your search or filter."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 283,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 281,
					columnNumber: 43
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "divide-y divide-slate-100",
					children: filteredPosts.map((post) => /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 hover:bg-slate-50/60 transition-colors",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (void 0)("img", {
								src: post.featuredImageUrl || "/hero-payroxa.jpg",
								alt: post.title,
								className: "size-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 289,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)("span", {
											className: `rounded-md px-2 py-0.5 text-[10px] font-bold ${post.status === "published" ? "bg-emerald-100 text-emerald-800" : post.status === "draft" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}`,
											children: post.status.toUpperCase()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 292,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-700",
											children: post.categoryName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 295,
											columnNumber: 27
										}, this),
										post.featured && /* @__PURE__ */ (void 0)("span", {
											className: "rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700",
											children: "Featured"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 298,
											columnNumber: 45
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] text-slate-400 flex items-center gap-1",
											children: [
												/* @__PURE__ */ (void 0)(Clock, { className: "size-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 302,
													columnNumber: 29
												}, this),
												post.readTimeMinutes,
												" min read"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 301,
											columnNumber: 27
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (void 0)("h4", {
									className: "mt-1 text-sm font-bold text-slate-900 hover:text-purple-600 transition-colors",
									children: post.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 307,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-0.5 text-xs text-slate-500 line-clamp-1",
									children: post.excerpt
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 310,
									columnNumber: 25
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-1 flex items-center gap-2 text-[11px] font-mono text-purple-700",
									children: /* @__PURE__ */ (void 0)("span", { children: ["/resources/", post.slug] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 312,
									columnNumber: 25
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 290,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 shrink-0 self-end sm:self-center",
							children: [
								/* @__PURE__ */ (void 0)("a", {
									href: `/resources/${post.slug}`,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors",
									title: "View Public Post",
									children: /* @__PURE__ */ (void 0)(ExternalLink, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 319,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										setEditingPost(post);
										setPostEditorMode("write");
										setShowPostModal(true);
									},
									className: "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors",
									children: "Edit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 322,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => handleDeletePost(post.id, post.title),
									className: "rounded-xl border border-slate-200 bg-white p-2 text-rose-600 hover:bg-rose-50 hover:text-rose-800 transition-colors",
									title: "Delete Post",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 329,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 21
						}, this)]
					}, post.id, true, {
						fileName: _jsxFileName,
						lineNumber: 287,
						columnNumber: 44
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 286,
					columnNumber: 24
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 280,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 256,
				columnNumber: 33
			}, this),
			activeTab === "categories" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "Content Categories"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-slate-500",
						children: "Group articles into topic clusters for structured internal linking"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 341,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => {
							setEditingCategory({
								id: `cat-${Date.now()}`,
								name: "",
								slug: "",
								description: "",
								color: "purple"
							});
							setShowCategoryModal(true);
						},
						className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 357,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Add Category" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 358,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 347,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 340,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: categories.map((cat) => /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800",
									children: cat.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										setEditingCategory(cat);
										setShowCategoryModal(true);
									},
									className: "text-xs font-semibold text-purple-600 hover:text-purple-800",
									children: "Edit"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 368,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-2 text-xs font-mono text-slate-400",
								children: ["slug: ", cat.slug]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 375,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-2 text-xs text-slate-600 line-clamp-2",
								children: cat.description || "No description."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 376,
								columnNumber: 17
							}, this)
						]
					}, cat.id, true, {
						fileName: _jsxFileName,
						lineNumber: 363,
						columnNumber: 36
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 362,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 339,
				columnNumber: 38
			}, this),
			activeTab === "authors" && /* @__PURE__ */ (void 0)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "Editorial Authors"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 387,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-xs text-slate-500",
						children: "Author bios establish E-E-A-T trust signals for Google quality raters"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 388,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 386,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("button", {
						type: "button",
						onClick: () => {
							setEditingAuthor({
								id: `auth-${Date.now()}`,
								name: "",
								role: "Fintech Specialist",
								bio: "",
								avatarUrl: "/logo-payroxa.png"
							});
							setShowAuthorModal(true);
						},
						className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors",
						children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 402,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("span", { children: "Add Author" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 403,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 385,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: authors.map((auth) => /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (void 0)("img", {
									src: auth.avatarUrl || "/logo-payroxa.png",
									alt: auth.name,
									className: "size-12 rounded-full border border-slate-200 object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 410,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
									className: "text-sm font-bold text-slate-900",
									children: auth.name
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 412,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs text-purple-600 font-medium",
									children: auth.role
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 413,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 411,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mt-3 text-xs text-slate-500 line-clamp-3",
								children: auth.bio
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 416,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-3 flex justify-end",
								children: /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										setEditingAuthor(auth);
										setShowAuthorModal(true);
									},
									className: "text-xs font-semibold text-purple-600 hover:text-purple-800",
									children: "Edit Bio"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 418,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 417,
								columnNumber: 17
							}, this)
						]
					}, auth.id, true, {
						fileName: _jsxFileName,
						lineNumber: 408,
						columnNumber: 34
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 407,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 384,
				columnNumber: 35
			}, this),
			showPostModal && editingPost && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden my-auto",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70 shrink-0",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-base font-bold text-slate-900",
								children: editingPost.id ? "Edit Article" : "Create New Resource Article"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 435,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-slate-500",
								children: "Complete technical and content specifications for publishing on Payroxa"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setShowPostModal(false),
									className: "rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 443,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: handleSavePost,
									disabled: saving,
									className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
									children: [/* @__PURE__ */ (void 0)(Save, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 447,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("span", { children: saving ? "Saving..." : "Save Article" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 448,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 446,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 442,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 433,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex-1 overflow-y-auto p-6 space-y-6",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Article Headline (H1)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 458,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: editingPost.title,
											onChange: (e) => {
												const newTitle = e.target.value;
												const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
												setEditingPost({
													...editingPost,
													title: newTitle,
													slug: editingPost.id ? editingPost.slug : autoSlug,
													seoTitle: editingPost.seoTitle || `${newTitle} | Payroxa`
												});
											},
											placeholder: "e.g. How to Accept Online Payments in Nigeria: The Definitive 2026 Guide",
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											required: true
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 461,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 457,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
												className: "block text-xs font-semibold text-slate-700 mb-1",
												children: "URL Slug"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "text-xs text-slate-400 font-mono",
													children: "/resources/"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 479,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("input", {
													type: "text",
													value: editingPost.slug,
													onChange: (e) => setEditingPost({
														...editingPost,
														slug: e.target.value
													}),
													className: "flex-1 bg-transparent font-mono text-xs text-slate-900 focus:outline-none ml-1",
													required: true
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 480,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 478,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 474,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
												className: "block text-xs font-semibold text-slate-700 mb-1",
												children: "Publishing Status"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 488,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("select", {
												value: editingPost.status,
												onChange: (e) => setEditingPost({
													...editingPost,
													status: e.target.value
												}),
												className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
												children: [
													/* @__PURE__ */ (void 0)("option", {
														value: "draft",
														children: "Draft (Private, not in sitemap)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 495,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "published",
														children: "Published (Live to public & Googlebot)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 496,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "archived",
														children: "Archived"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 497,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 491,
												columnNumber: 21
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 487,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 473,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Article Excerpt / Abstract"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 503,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("textarea", {
											rows: 2,
											value: editingPost.excerpt,
											onChange: (e) => setEditingPost({
												...editingPost,
												excerpt: e.target.value,
												metaDescription: editingPost.metaDescription || e.target.value
											}),
											placeholder: "Brief 2-sentence overview that hooks the reader and serves as the summary card snippet.",
											className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 506,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 502,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 456,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Category"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: editingPost.categoryId,
											onChange: (e) => {
												const cat = categories.find((c) => c.id === e.target.value);
												setEditingPost({
													...editingPost,
													categoryId: e.target.value,
													categoryName: cat ? cat.name : editingPost.categoryName
												});
											},
											className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											children: categories.map((c) => /* @__PURE__ */ (void 0)("option", {
												value: c.id,
												children: c.name
											}, c.id, false, {
												fileName: _jsxFileName,
												lineNumber: 528,
												columnNumber: 42
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 520,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Author"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 535,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: editingPost.authorId,
											onChange: (e) => {
												const a = authors.find((auth) => auth.id === e.target.value);
												setEditingPost({
													...editingPost,
													authorId: e.target.value,
													authorName: a ? a.name : editingPost.authorName,
													authorRole: a ? a.role : editingPost.authorRole
												});
											},
											className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											children: authors.map((a) => /* @__PURE__ */ (void 0)("option", {
												value: a.id,
												children: [
													a.name,
													" (",
													a.role,
													")"
												]
											}, a.id, true, {
												fileName: _jsxFileName,
												lineNumber: 545,
												columnNumber: 39
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 536,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 534,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-xs font-semibold text-slate-700 mb-1",
											children: "Related Conversion Solution"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 552,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("select", {
											value: editingPost.relatedProduct || "payments",
											onChange: (e) => setEditingPost({
												...editingPost,
												relatedProduct: e.target.value
											}),
											className: "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-purple-600 focus:outline-none",
											children: [
												/* @__PURE__ */ (void 0)("option", {
													value: "payments",
													children: "Online Payments (/payments)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 559,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "store",
													children: "Store Builder (/store)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 560,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "cards",
													children: "Cards & Expenses (/cards)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 561,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "wallet",
													children: "Multi-Currency Wallet (/wallet)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 562,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "transfers",
													children: "Transfers & Payroll (/transfers)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 563,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (void 0)("option", {
													value: "business",
													children: "Business Operations (/business)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 564,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 551,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 515,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)(CmsImagePicker, {
										label: "Featured Article Image",
										value: editingPost.featuredImageUrl || "/hero-payroxa.jpg",
										onChange: (val) => setEditingPost({
											...editingPost,
											featuredImageUrl: val
										}),
										category: "heroes"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 571,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: editingPost.featuredImageAlt || "",
										onChange: (e) => setEditingPost({
											...editingPost,
											featuredImageAlt: e.target.value
										}),
										placeholder: "Alt text describing the image for accessibility & image search",
										className: "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 focus:border-purple-600 focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 575,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 570,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (void 0)("label", {
											className: "text-xs font-semibold text-slate-700",
											children: "Article Content (Markdown)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 584,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1 rounded-lg bg-slate-100 p-0.5 text-xs",
											children: [/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => setPostEditorMode("write"),
												className: `px-3 py-1 rounded-md font-semibold transition-colors ${postEditorMode === "write" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"}`,
												children: "Write"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 588,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => setPostEditorMode("preview"),
												className: `px-3 py-1 rounded-md font-semibold transition-colors ${postEditorMode === "preview" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"}`,
												children: "Preview"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 591,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 587,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 583,
										columnNumber: 17
									}, this), postEditorMode === "write" ? /* @__PURE__ */ (void 0)("textarea", {
										rows: 12,
										value: editingPost.content,
										onChange: (e) => setEditingPost({
											...editingPost,
											content: e.target.value
										}),
										className: "w-full font-mono text-xs leading-relaxed rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-purple-600 focus:outline-none",
										placeholder: "Write article content using Markdown (headings, lists, bold text, links)...",
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 597,
										columnNumber: 47
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "rounded-xl border border-slate-200 bg-slate-50/50 p-6 prose prose-slate max-w-none text-xs leading-relaxed max-h-80 overflow-y-auto",
										children: /* @__PURE__ */ (void 0)("div", {
											className: "whitespace-pre-wrap font-sans",
											children: editingPost.content
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 601,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 600,
										columnNumber: 282
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 582,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "rounded-2xl border border-purple-100 bg-purple-50/40 p-4 space-y-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "size-4 text-purple-600" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 608,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("h4", {
											className: "text-xs font-bold text-purple-950",
											children: "Article Search Engine Optimization"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 609,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 607,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-[11px] font-semibold text-slate-700 mb-1",
											children: "SEO Title"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 616,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: editingPost.seoTitle || "",
											onChange: (e) => setEditingPost({
												...editingPost,
												seoTitle: e.target.value
											}),
											placeholder: "Title tag displayed on Google SERPs",
											className: "w-full rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 619,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 615,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
											className: "block text-[11px] font-semibold text-slate-700 mb-1",
											children: "Meta Description"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 626,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											value: editingPost.metaDescription || "",
											onChange: (e) => setEditingPost({
												...editingPost,
												metaDescription: e.target.value
											}),
											placeholder: "140-160 char summary for Google snippet",
											className: "w-full rounded-xl border border-purple-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 629,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 625,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 614,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 606,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 454,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/70 shrink-0",
							children: [/* @__PURE__ */ (void 0)("label", {
								className: "flex items-center gap-2 cursor-pointer",
								children: [/* @__PURE__ */ (void 0)("input", {
									type: "checkbox",
									checked: editingPost.featured,
									onChange: (e) => setEditingPost({
										...editingPost,
										featured: e.target.checked
									}),
									className: "rounded border-slate-300 text-purple-600 focus:ring-purple-500"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 641,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "text-xs font-semibold text-slate-700",
									children: "Pin as Featured Resource on Homepage"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 645,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 640,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: handleSavePost,
								disabled: saving,
								className: "inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-purple-700 disabled:opacity-50",
								children: [/* @__PURE__ */ (void 0)(Save, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 651,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", { children: saving ? "Publishing..." : "Save and Publish" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 652,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 639,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 431,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 430,
				columnNumber: 40
			}, this),
			showCategoryModal && editingCategory && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
					children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "Edit Category"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 661,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("form", {
						onSubmit: handleSaveCategory,
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Category Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 664,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editingCategory.name,
								onChange: (e) => {
									const name = e.target.value;
									const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
									setEditingCategory({
										...editingCategory,
										name,
										slug: editingCategory.slug || slug
									});
								},
								className: "w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 667,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 663,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Slug"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 679,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editingCategory.slug,
								onChange: (e) => setEditingCategory({
									...editingCategory,
									slug: e.target.value
								}),
								className: "w-full font-mono rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 680,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 678,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Description"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 687,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 2,
								value: editingCategory.description || "",
								onChange: (e) => setEditingCategory({
									...editingCategory,
									description: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 690,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 686,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-end gap-2 pt-2 border-t border-slate-100",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setShowCategoryModal(false),
									className: "rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 697,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "submit",
									className: "rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700",
									children: "Save Category"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 700,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 696,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 662,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 660,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 659,
				columnNumber: 48
			}, this),
			showAuthorModal && editingAuthor && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (void 0)("div", {
					className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
					children: [/* @__PURE__ */ (void 0)("h3", {
						className: "text-base font-bold text-slate-900",
						children: "Edit Author Bio"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 711,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("form", {
						onSubmit: handleSaveAuthor,
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Author Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 714,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editingAuthor.name,
								onChange: (e) => setEditingAuthor({
									...editingAuthor,
									name: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 717,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 713,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Role / Title"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 724,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("input", {
								type: "text",
								value: editingAuthor.role,
								onChange: (e) => setEditingAuthor({
									...editingAuthor,
									role: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 727,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 723,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "block text-xs font-semibold text-slate-700 mb-1",
								children: "Biography"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 734,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("textarea", {
								rows: 3,
								value: editingAuthor.bio,
								onChange: (e) => setEditingAuthor({
									...editingAuthor,
									bio: e.target.value
								}),
								className: "w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 735,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 733,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-end gap-2 pt-2 border-t border-slate-100",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setShowAuthorModal(false),
									className: "rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 742,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									type: "submit",
									className: "rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700",
									children: "Save Author"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 745,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 741,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 712,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 710,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 709,
				columnNumber: 44
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 195,
		columnNumber: 10
	}, this);
}
//#endregion
export { CmsBlogAdminPage as component };
