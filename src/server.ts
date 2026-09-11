import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getCmsDb, saveCmsDb } from "./cms/db.server";
import { generateRobotsTxt, generateSitemapXml, handleServerRedirect } from "./cms/seo.server";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Automated robots.txt handler
      if (pathname === "/robots.txt") {
        const origin = `${url.protocol}//${url.host}`;
        const robotsTxt = generateRobotsTxt(origin);
        return new Response(robotsTxt, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }

      // Automated sitemap.xml handler
      if (pathname === "/sitemap.xml") {
        const db = getCmsDb();
        const origin = `${url.protocol}//${url.host}`;
        const sitemapXml = generateSitemapXml(db, origin);
        return new Response(sitemapXml, {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600, s-maxage=86400",
          },
        });
      }

      // 301 / 302 Redirect Manager
      try {
        const db = getCmsDb();
        if (db.redirects && db.redirects.length > 0) {
          const match = handleServerRedirect(pathname, db.redirects);
          if (match && match.shouldRedirect) {
            const rule = db.redirects.find((r) => r.id === match.ruleId);
            if (rule) {
              rule.hitCount = (rule.hitCount || 0) + 1;
              rule.lastHitAt = new Date().toISOString();
              saveCmsDb(db);
            }
            const destination = match.target.startsWith("http")
              ? match.target
              : `${url.protocol}//${url.host}${match.target.startsWith("/") ? "" : "/"}${match.target}`;
            return Response.redirect(destination, match.status);
          }
        }
      } catch (redirectErr) {
        console.warn("Redirect processing error:", redirectErr);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
