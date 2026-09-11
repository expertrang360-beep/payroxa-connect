import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Zap,
  CreditCard,
  ShoppingBag,
  Send,
  Building2,
} from "lucide-react";
import { useState } from "react";
import Section, { SectionHeading } from "@/components/Section";
import PayroxaButton from "@/components/PayroxaButton";
import FinalCTA from "@/components/FinalCTA";
import { siteConfig } from "@/config/siteConfig";
import { PAYROXA_LINKS } from "@/config/links";
import { usePublicCms } from "@/cms/context/PublicCmsContext";
import type { BlogPost } from "@/cms/types";

export const Route = createFileRoute("/resources/$slug")({
  head: ({ params }) => {
    // Basic dynamic fallback meta; enhanced inside component
    return {
      meta: [{ name: "robots", content: "index, follow" }],
      links: [{ rel: "canonical", href: `${siteConfig.websiteUrl}/resources/${params.slug}` }],
    };
  },
  component: SingleResourceArticlePage,
});

function SingleResourceArticlePage() {
  const { slug } = Route.useParams();
  const { blogPosts, blogAuthors } = usePublicCms();
  const [copied, setCopied] = useState(false);

  const posts: BlogPost[] = blogPosts || [];
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <BookOpen className="mx-auto size-12 text-muted-foreground/60" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Article Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested guide (/resources/{slug}) may have been moved or updated.
        </p>
        <div className="mt-6">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to All Resources</span>
          </Link>
        </div>
      </div>
    );
  }

  const author = (blogAuthors || []).find((a) => a.id === post.authorId);
  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.ogImageUrl || post.featuredImageUrl,
    author: {
      "@type": "Person",
      name: post.authorName,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.websiteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.websiteUrl}/logo-payroxa.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${siteConfig.websiteUrl}/resources/${post.slug}`,
  };

  return (
    <article className="bg-background">
      {/* Dynamic structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-border/60 bg-muted/30 py-3.5">
        <div className="mx-auto max-w-4xl px-5 text-xs text-muted-foreground">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link to="/resources" className="hover:text-foreground">
              Resources
            </Link>
            <span>/</span>
            <span className="text-purple-600 font-medium">{post.categoryName}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 sm:py-16 border-b border-border/60 bg-linear-to-b from-purple-500/5 to-transparent">
        <div className="mx-auto max-w-4xl px-5 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-purple-800">
              {post.categoryName}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="text-xs text-muted-foreground">
              Published{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-NG", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{post.authorName}</div>
                <div className="text-xs text-muted-foreground">{post.authorRole}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <Share2 className="size-3.5" />
              <span>{copied ? "Link Copied!" : "Share Guide"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Hero Image */}
      <div className="mx-auto max-w-4xl px-5 -mt-6 sm:-mt-8">
        <div className="overflow-hidden rounded-3xl border border-border/80 shadow-md bg-muted aspect-video max-h-[440px]">
          <img
            src={post.featuredImageUrl || "/hero-payroxa.jpg"}
            alt={post.featuredImageAlt || post.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Main Article Body */}
      <div className="mx-auto max-w-3xl px-5 py-14">
        <div className="prose prose-slate prose-purple max-w-none text-foreground">
          {/* Simple Markdown Renderer simulation for formatted guides */}
          {post.content.split("\n\n").map((block, idx) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-bold text-foreground mt-8 mb-4 tracking-tight"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl font-bold text-foreground mt-6 mb-3 tracking-tight"
                >
                  {block.replace("### ", "")}
                </h3>
              );
            }
            if (block.startsWith("- ")) {
              const items = block.split("\n").map((line) => line.replace(/^- /, ""));
              return (
                <ul
                  key={idx}
                  className="list-disc list-inside space-y-2 my-4 text-muted-foreground text-base leading-relaxed"
                >
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-base leading-relaxed text-muted-foreground my-4">
                {block}
              </p>
            );
          })}
        </div>

        {/* Embedded Contextual Conversion Call to Action */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-purple-200 bg-linear-to-br from-purple-50 via-white to-purple-50/40 p-8 text-foreground shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
              <Zap className="size-6" />
            </div>
            <div className="space-y-2 flex-1">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Related Solution for Nigerian Merchants
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Ready to implement this for your business?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Accept customer payments through cards, bank transfers, and USSD, or launch a free
                mobile store in under 5 minutes with Payroxa.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <PayroxaButton href={PAYROXA_LINKS.register} size="sm">
                  Get Started Free
                </PayroxaButton>
                {post.relatedProduct === "store" ? (
                  <PayroxaButton href="/store" variant="outline" size="sm">
                    Explore Store Builder
                  </PayroxaButton>
                ) : post.relatedProduct === "cards" ? (
                  <PayroxaButton href="/cards" variant="outline" size="sm">
                    Explore Cards & Expenses
                  </PayroxaButton>
                ) : post.relatedProduct === "wallet" ? (
                  <PayroxaButton href="/wallet" variant="outline" size="sm">
                    Explore Business Wallet
                  </PayroxaButton>
                ) : post.relatedProduct === "transfers" ? (
                  <PayroxaButton href="/transfers" variant="outline" size="sm">
                    Explore Transfers
                  </PayroxaButton>
                ) : (
                  <PayroxaButton href="/payments" variant="outline" size="sm">
                    Explore Payment Solutions
                  </PayroxaButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Author Bio Box */}
        {author && (
          <div className="mt-12 rounded-2xl border border-border/80 bg-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={author.avatarUrl || "/logo-payroxa.png"}
              alt={author.name}
              className="size-16 rounded-full border border-border object-cover"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
                Written by
              </div>
              <h4 className="text-base font-bold text-foreground">{author.name}</h4>
              <p className="text-xs text-muted-foreground font-medium">{author.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">{author.bio}</p>
            </div>
          </div>
        )}
      </div>

      {/* Related Resources Cross-Links */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border/60 bg-muted/20 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-foreground">Related Resources & Guides</h3>
                <p className="text-xs text-muted-foreground">
                  Keep reading practical playbooks for African entrepreneurs
                </p>
              </div>
              <Link
                to="/resources"
                className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700"
              >
                <span>All Guides</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all group"
                >
                  <div className="h-40 w-full overflow-hidden bg-muted">
                    <img
                      src={r.featuredImageUrl || "/hero-payroxa.jpg"}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-purple-600 uppercase">
                        {r.categoryName}
                      </span>
                      <h4 className="mt-1 text-sm font-bold text-foreground group-hover:text-purple-600 transition-colors line-clamp-2">
                        <Link to="/resources/$slug" params={{ slug: r.slug }}>
                          {r.title}
                        </Link>
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{r.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{r.readTimeMinutes} min read</span>
                      <Link
                        to="/resources/$slug"
                        params={{ slug: r.slug }}
                        className="font-semibold text-purple-600 inline-flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </article>
  );
}
