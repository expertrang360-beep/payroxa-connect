import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  User,
  Sparkles,
  TrendingUp,
  Tag,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/siteConfig";
import { PAYROXA_LINKS } from "@/config/links";
import { usePublicCms } from "@/cms/context/PublicCmsContext";
import type { BlogPost } from "@/cms/types";

const title = "Payroxa Resources — Payment Guides, E-commerce & Business Insights for Nigeria";
const description =
  "Comprehensive guides, payment tutorials, POS advice, and financial strategies to grow your business in Nigeria and across Africa.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${siteConfig.websiteUrl}/resources` },
      { property: "og:image", content: `${siteConfig.websiteUrl}/hero-payroxa.jpg` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/resources` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: `${siteConfig.websiteUrl}/resources`,
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.websiteUrl,
          },
        }),
      },
    ],
  }),
  component: ResourcesIndexPage,
});

function ResourcesIndexPage() {
  const { blogPosts, blogCategories } = usePublicCms();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const posts: BlogPost[] = blogPosts || [];
  const categories = blogCategories || [];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter(
    (p) =>
      p.id !== (featuredPost && selectedCategory === "all" && !searchQuery ? featuredPost.id : ""),
  );

  return (
    <div className="bg-background">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-border/60 bg-linear-to-b from-purple-500/10 via-background to-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-3.5 py-1 text-xs font-semibold text-purple-800">
              <Sparkles className="size-3.5 text-purple-600" />
              <span>Knowledge Base & Merchant Playbooks</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Practical guides to accept payments, sell online & scale in Nigeria.
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Explore step-by-step fintech strategies, payment compliance breakdowns, e-commerce
              tactics, and financial playbooks tailored for modern African businesses.
            </p>

            {/* Search Input */}
            <div className="mt-8 relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides (e.g. online payments, store setup, POS terminal)..."
                className="w-full rounded-full border border-border bg-card/90 pl-11 pr-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-md focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-border/60 bg-card/40 py-4 sticky top-16 z-30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              All Topics ({posts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 space-y-12">
          {/* Featured Article Banner (only when viewing all & no search query) */}
          {selectedCategory === "all" && !searchQuery && featuredPost && (
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm hover:border-purple-500/40 transition-all">
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-purple-800">
                      Featured Guide
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {featuredPost.categoryName}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl hover:text-purple-600 transition-colors">
                    <Link to="/resources/$slug" params={{ slug: featuredPost.slug }}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <div className="flex size-7 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
                        {featuredPost.authorName.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{featuredPost.authorName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {featuredPost.readTimeMinutes} min read
                      </span>
                    </div>
                    <Link
                      to="/resources/$slug"
                      params={{ slug: featuredPost.slug }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-700 group"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative overflow-hidden bg-muted">
                  <img
                    src={featuredPost.featuredImageUrl || "/hero-payroxa.jpg"}
                    alt={featuredPost.featuredImageAlt || featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Grid of Articles */}
          {regularPosts.length === 0 ? (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto size-10 text-muted-foreground/60" />
              <h3 className="mt-3 text-base font-bold text-foreground">No resources found</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adjusting your search query or selecting a different topic.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">
                  {searchQuery
                    ? `Search results for "${searchQuery}"`
                    : "Latest Playbooks & Articles"}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {regularPosts.length} articles
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all group"
                  >
                    <div className="h-48 w-full overflow-hidden bg-muted relative">
                      <img
                        src={post.featuredImageUrl || "/hero-payroxa.jpg"}
                        alt={post.featuredImageAlt || post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold text-purple-700 backdrop-blur-md shadow-xs">
                          {post.categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString("en-NG", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {post.readTimeMinutes} min read
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-foreground group-hover:text-purple-600 transition-colors line-clamp-2">
                        <Link to="/resources/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                        <span className="text-muted-foreground font-medium">{post.authorName}</span>
                        <Link
                          to="/resources/$slug"
                          params={{ slug: post.slug }}
                          className="inline-flex items-center gap-1 font-semibold text-purple-600 hover:text-purple-700"
                        >
                          <span>Read</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Internal Conversion Call To Action */}
      <section className="border-t border-border/60 bg-linear-to-b from-card to-background py-16">
        <div className="mx-auto max-w-4xl px-5 text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold text-purple-800">
            <Zap className="size-3.5 text-purple-600" />
            <span>Built for African Merchants</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Start accepting payments in minutes with Payroxa.
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            No complex setup. Create payment links, accept cards and bank transfers, sell through an
            online store, and issue corporate cards with zero setup fees.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <PayroxaButton href={PAYROXA_LINKS.register} size="lg">
              Create Free Merchant Account
            </PayroxaButton>
            <PayroxaButton href="/payments" variant="outline" size="lg">
              Explore Payment Solutions
            </PayroxaButton>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
