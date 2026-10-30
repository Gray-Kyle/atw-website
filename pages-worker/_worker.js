/**
 * Pages Advanced Mode (_worker.js copied to dist on build).
 *
 * Marketing APIs on apex use same-origin /api/* proxied to auth.atw.net (monolith APIs today).
 * Only whitelisted paths are forwarded; other /api/* return 404 so we do not expose the full ERP surface.
 */
const AUTH_API_ORIGIN = "https://auth.atw.net";

const CORS_ALLOWED_ORIGINS = new Set([
  "https://atw-website-9br.pages.dev",
  "https://atw.net",
  "https://www.atw.net",
  "http://localhost:4321",
  "http://127.0.0.1:4321",
]);

/** @param {string} pathname */
function shouldProxyApi(pathname) {
  if (pathname.startsWith("/api/auth/")) return true;
  if (pathname === "/api/contact") return true;
  if (pathname.startsWith("/api/zoho-bookings/")) return true;
  if (pathname.startsWith("/api/public/lead-forms/")) return true;
  if (pathname.startsWith("/api/posts/public")) return true;
  return false;
}

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "cf-connecting-ip",
  "cf-ipcountry",
  "cf-ray",
  "cf-visitor",
  "cdn-loop",
]);

function corsHeaders(request) {
  const origin = (request.headers.get("Origin") || "").trim();
  if (!origin || !CORS_ALLOWED_ORIGINS.has(origin)) {
    return {};
  }
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      request.headers.get("Access-Control-Request-Headers") ||
      "Content-Type, Authorization, X-Requested-With, X-Atw-User-Email",
    Vary: "Origin",
  };
}

function proxyHeaders(request) {
  const headers = new Headers();
  for (const [key, value] of request.headers.entries()) {
    if (HOP_BY_HOP.has(key.toLowerCase())) continue;
    headers.append(key, value);
  }
  if (!headers.has("Accept")) headers.set("Accept", "application/json, */*");
  return headers;
}

async function proxyToAuthApi(request) {
  const url = new URL(request.url);
  const upstream = new URL(url.pathname + url.search, AUTH_API_ORIGIN);
  const init = {
    method: request.method,
    headers: proxyHeaders(request),
    redirect: "manual",
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }
  const response = await fetch(upstream.toString(), init);
  const out = new Headers(response.headers);
  out.set("X-Atw-Website-Proxy", "1");
  for (const [key, value] of Object.entries(corsHeaders(request))) {
    out.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: out,
  });
}

const ATW_PLATFORM_ORG_ID = "4133643";
const ONE_ORIGIN = "https://one.atw.net";

/** Legacy Amplify tenant/platform paths → One Pages. */
function legacyAppOrgRedirect(url) {
  const match = url.pathname.match(/^\/app\/org\/(\d{7})(\/.*)?$/);
  if (!match) return null;
  const orgId = match[1];
  const rest = match[2] || "/";
  if (orgId === ATW_PLATFORM_ORG_ID) {
    const target = new URL(rest === "/" ? "/" : rest, ONE_ORIGIN);
    target.search = url.search;
    return Response.redirect(target.toString(), 301);
  }
  // Multi-tenant One URLs: land on One with org query until tenant host strategy ships.
  const target = new URL("/", ONE_ORIGIN);
  target.searchParams.set("org", orgId);
  if (rest && rest !== "/") target.searchParams.set("path", rest);
  for (const [key, value] of url.searchParams.entries()) {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  }
  return Response.redirect(target.toString(), 302);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const orgRedirect = legacyAppOrgRedirect(url);
    if (orgRedirect) return orgRedirect;

    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      if (!shouldProxyApi(url.pathname)) {
        return new Response(null, { status: 404 });
      }
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    if (url.pathname.startsWith("/api/")) {
      if (!shouldProxyApi(url.pathname)) {
        return new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return proxyToAuthApi(request);
    }

    const hostedFormPath = url.pathname.match(/^\/forms\/(\d{7})\/([^/]+)\/?$/);
    if (hostedFormPath && request.method === "GET") {
      const accept = request.headers.get("Accept") || "";
      if (accept.includes("text/html") || accept.includes("*/*")) {
        return env.ASSETS.fetch(new URL("/forms/index.html", url.origin));
      }
    }

    return env.ASSETS.fetch(request);
  },
};
