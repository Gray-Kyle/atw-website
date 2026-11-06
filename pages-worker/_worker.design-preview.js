/**
 * Design-preview Pages worker (Option A / Option B sandbox builds only).
 *
 * Intentionally does NOT proxy contact, bookings, lead forms, auth, or blog
 * APIs to auth.atw.net / one.atw.net. Non-GET/HEAD requests are rejected
 * locally. Production worker: pages-worker/_worker.js (unchanged).
 */
const PATH_REDIRECTS = new Map([
  ["/privacy", "/privacy-policy/"],
  ["/privacy/", "/privacy-policy/"],
  ["/directory", "/systems/directory/"],
  ["/directory/", "/systems/directory/"],
  ["/hosting", "/pricing/"],
  ["/hosting/", "/pricing/"],
  ["/credits", "/pricing/"],
  ["/credits/", "/pricing/"],
]);

function previewHeaders(extra = {}) {
  return {
    "X-Robots-Tag": "noindex, nofollow",
    "X-ATW-Design-Preview": "1",
    ...extra,
  };
}

function jsonRejected(status, message) {
  return new Response(JSON.stringify({ error: message, designPreview: true }), {
    status,
    headers: previewHeaders({ "Content-Type": "application/json" }),
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const method = request.method.toUpperCase();

    // Hard block every mutating / non-safe method on the preview host.
    if (method !== "GET" && method !== "HEAD") {
      if (url.pathname.startsWith("/api/") || method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE") {
        return jsonRejected(
          403,
          "Design preview builds do not accept writes or proxy APIs to production hosts.",
        );
      }
      if (method === "OPTIONS") {
        return new Response(null, {
          status: 403,
          headers: previewHeaders(),
        });
      }
    }

    // No API proxying of any kind (contact, leads, bookings, auth, blog).
    if (url.pathname.startsWith("/api/")) {
      return jsonRejected(
        404,
        "API routes are disabled on ATW design previews.",
      );
    }

    // Hosted lead form shells must not run against live lead APIs.
    if (url.pathname.match(/^\/forms\/(\d{7})\/([^/]+)\/?$/)) {
      return new Response(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="robots" content="noindex,nofollow"/><title>Design preview</title></head><body style="font-family:system-ui;padding:2rem"><h1>Design preview</h1><p>Hosted lead forms are disabled on this sandbox. No submissions are sent.</p></body></html>`,
        {
          status: 200,
          headers: previewHeaders({ "Content-Type": "text/html; charset=utf-8" }),
        },
      );
    }

    const pathRedirect = PATH_REDIRECTS.get(url.pathname);
    if (pathRedirect) {
      const target = new URL(pathRedirect, url.origin);
      target.search = url.search;
      return new Response(null, {
        status: 301,
        headers: previewHeaders({ Location: target.toString() }),
      });
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    headers.set("X-ATW-Design-Preview", "1");
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};
