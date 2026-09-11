import { siteConfig } from "@/config/siteConfig";
import type { CmsDatabaseState, SeoMetadata, BlogPost, RedirectRule } from "./types";

export interface SeoHealthIssue {
  pageSlug: string;
  pageTitle: string;
  type: "critical" | "warning" | "good";
  message: string;
  recommendation: string;
}

export interface SeoHealthReport {
  score: number;
  totalPages: number;
  totalBlogPosts: number;
  indexedPages: number;
  redirectsCount: number;
  issues: SeoHealthIssue[];
}

export function generateSitemapXml(db: CmsDatabaseState, baseUrl: string = siteConfig.websiteUrl) {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const urls: Array<{ loc: string; lastmod: string; changefreq: string; priority: number }> = [];

  // Add configured static and marketing pages
  const seoEntries = Object.values(db.seo || {});
  for (const page of seoEntries) {
    if (page.robotsDirective && page.robotsDirective.includes("noindex")) {
      continue;
    }
    const cleanSlug =
      page.pageSlug === "/"
        ? ""
        : page.pageSlug.startsWith("/")
          ? page.pageSlug
          : `/${page.pageSlug}`;
    urls.push({
      loc: `${cleanBase}${cleanSlug}`,
      lastmod: page.updatedAt
        ? new Date(page.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      changefreq: page.changefreq || (cleanSlug === "" ? "daily" : "weekly"),
      priority: page.priority !== undefined ? page.priority : cleanSlug === "" ? 1.0 : 0.8,
    });
  }

  // Add published blog posts
  const blogPosts = (db.blogPosts || []).filter((p) => p.status === "published");
  for (const post of blogPosts) {
    urls.push({
      loc: `${cleanBase}/resources/${post.slug}`,
      lastmod: post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.7,
    });
  }

  // Format as valid XML
  const xmlItems = urls
    .map(
      (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${xmlItems}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string = siteConfig.websiteUrl) {
  const cleanBase = baseUrl.replace(/\/$/, "");
  return `# robots.txt for Payroxa (Production Engine)
User-agent: *
Allow: /
Disallow: /cms-admin
Disallow: /cms-admin/
Disallow: /api/
Disallow: /_build/

# Host configuration
Host: ${cleanBase}

# Canonical XML Sitemap
Sitemap: ${cleanBase}/sitemap.xml
`;
}

export function handleServerRedirect(
  pathname: string,
  redirects: RedirectRule[],
): { shouldRedirect: boolean; target: string; status: number; ruleId?: string } | null {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, "");
  for (const rule of redirects) {
    if (!rule.enabled) continue;
    const ruleSource = rule.sourcePath.toLowerCase().replace(/\/$/, "");
    if (cleanPath === ruleSource) {
      return {
        shouldRedirect: true,
        target: rule.targetPath,
        status: rule.statusCode || 301,
        ruleId: rule.id,
      };
    }
  }
  return null;
}

export function auditSeoHealth(db: CmsDatabaseState): SeoHealthReport {
  const issues: SeoHealthIssue[] = [];
  const pages = Object.values(db.seo || {});
  const posts = (db.blogPosts || []).filter((p) => p.status === "published");

  let deductions = 0;

  for (const page of pages) {
    // Title checks
    if (!page.metaTitle || page.metaTitle.trim().length === 0) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "critical",
        message: "Missing Meta Title tag",
        recommendation:
          "Search engines require a distinctive <title> tag between 50 and 60 characters.",
      });
      deductions += 12;
    } else if (page.metaTitle.length < 35) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: `Short Meta Title (${page.metaTitle.length} characters)`,
        recommendation: "Expand the title with target search keywords (aim for 50-60 chars).",
      });
      deductions += 3;
    } else if (page.metaTitle.length > 65) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: `Long Meta Title (${page.metaTitle.length} characters)`,
        recommendation: "Google truncates titles over ~60 characters on desktop and mobile SERPs.",
      });
      deductions += 3;
    }

    // Description checks
    if (!page.metaDescription || page.metaDescription.trim().length === 0) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "critical",
        message: "Missing Meta Description",
        recommendation: "Add a compelling call-to-action summary between 140 and 160 characters.",
      });
      deductions += 10;
    } else if (page.metaDescription.length < 90) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: `Short Meta Description (${page.metaDescription.length} characters)`,
        recommendation:
          "Expand the description to ~140-160 characters to maximize click-through rate.",
      });
      deductions += 2;
    } else if (page.metaDescription.length > 165) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: `Long Meta Description (${page.metaDescription.length} characters)`,
        recommendation: "Shorten under 160 characters so Google does not trim the snippet.",
      });
      deductions += 2;
    }

    // Canonical URL
    if (!page.canonicalUrl || !page.canonicalUrl.startsWith("http")) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: "Missing or relative Canonical URL",
        recommendation: "Specify an absolute canonical URL to consolidate ranking signals.",
      });
      deductions += 4;
    }

    // OpenGraph image
    if (!page.ogImageUrl) {
      issues.push({
        pageSlug: page.pageSlug,
        pageTitle: page.pageTitle,
        type: "warning",
        message: "Missing OpenGraph Social Sharing Image",
        recommendation:
          "Add a 1200x630 preview image for WhatsApp, X (Twitter), and LinkedIn shares.",
      });
      deductions += 3;
    }
  }

  // Audit blog posts
  for (const post of posts) {
    if (!post.metaDescription || post.metaDescription.length < 50) {
      issues.push({
        pageSlug: `/resources/${post.slug}`,
        pageTitle: post.title,
        type: "warning",
        message: "Blog post has thin or missing Meta Description",
        recommendation: "Craft an enticing 140-character summary of this resource.",
      });
      deductions += 3;
    }
    if (!post.featuredImageUrl) {
      issues.push({
        pageSlug: `/resources/${post.slug}`,
        pageTitle: post.title,
        type: "warning",
        message: "Missing Featured Image for Article",
        recommendation:
          "Articles with high-quality featured images earn higher CTR in Google Discover.",
      });
      deductions += 3;
    }
  }

  const score = Math.max(15, Math.min(100, 100 - deductions));

  return {
    score,
    totalPages: pages.length,
    totalBlogPosts: posts.length,
    indexedPages: pages.filter((p) => !p.robotsDirective || !p.robotsDirective.includes("noindex"))
      .length,
    redirectsCount: (db.redirects || []).filter((r) => r.enabled).length,
    issues,
  };
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
