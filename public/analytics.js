/**
 * First-party ATW Analytics snippet (kept in sync with ATWNetworkWebpage
 * src/app/(site)/analytics.js/route.ts).
 */
(() => {
  const KEY_STORAGE = "atw_analytics_vid";
  const SESSION_STORAGE = "atw_analytics_sid";
  const SESSION_TS = "atw_analytics_sid_ts";
  const SESSION_MS = 30 * 60 * 1000;
  const scriptEl = document.currentScript;
  const writeKey =
    (scriptEl && scriptEl.getAttribute("data-key")) ||
    (typeof window !== "undefined" && window.__ATW_ANALYTICS_KEY) ||
    "";
  if (!writeKey) return;

  const collectUrl =
    (scriptEl && scriptEl.getAttribute("data-endpoint")) ||
    (typeof window !== "undefined" && window.__ATW_ANALYTICS_ENDPOINT) ||
    "/api/public/analytics/collect";

  function uuid() {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getVisitorId() {
    try {
      let id = localStorage.getItem(KEY_STORAGE);
      if (!id) {
        id = uuid();
        localStorage.setItem(KEY_STORAGE, id);
      }
      return id;
    } catch (_) {
      return uuid();
    }
  }

  function getSessionId() {
    try {
      const now = Date.now();
      const prev = parseInt(sessionStorage.getItem(SESSION_TS) || "0", 10);
      let sid = sessionStorage.getItem(SESSION_STORAGE);
      if (!sid || !prev || now - prev > SESSION_MS) {
        sid = uuid();
        sessionStorage.setItem(SESSION_STORAGE, sid);
      }
      sessionStorage.setItem(SESSION_TS, String(now));
      return sid;
    } catch (_) {
      return uuid();
    }
  }

  function utm() {
    try {
      const u = new URL(location.href);
      return {
        utmSource: u.searchParams.get("utm_source"),
        utmMedium: u.searchParams.get("utm_medium"),
        utmCampaign: u.searchParams.get("utm_campaign"),
      };
    } catch (_) {
      return {};
    }
  }

  function getIds() {
    return { visitorId: getVisitorId(), sessionId: getSessionId() };
  }

  const queue = [];
  let flushTimer = null;

  function enqueue(ev) {
    queue.push(ev);
    if (flushTimer) return;
    flushTimer = setTimeout(flush, 80);
  }

  function flush() {
    flushTimer = null;
    if (!queue.length) return;
    const batch = queue.splice(0, 50);
    const body = JSON.stringify({ writeKey: writeKey, events: batch });
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon(collectUrl, blob);
        return;
      }
    } catch (_) {}
    fetch(collectUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Atw-Analytics-Key": writeKey },
      body: body,
      keepalive: true,
      credentials: "omit",
    }).catch(function () {});
  }

  function pageView() {
    const ids = getIds();
    const u = utm();
    enqueue({
      type: "page_view",
      visitorId: ids.visitorId,
      sessionId: ids.sessionId,
      path: location.pathname + location.search,
      referrer: document.referrer || null,
      title: document.title || null,
      ts: new Date().toISOString(),
      utmSource: u.utmSource,
      utmMedium: u.utmMedium,
      utmCampaign: u.utmCampaign,
    });
  }

  function track(name, props) {
    const ids = getIds();
    enqueue({
      type: "event",
      visitorId: ids.visitorId,
      sessionId: ids.sessionId,
      path: location.pathname + location.search,
      name: String(name || "event"),
      props: props || null,
      ts: new Date().toISOString(),
    });
  }

  window.atwAnalytics = { track: track, getIds: getIds, pageView: pageView };

  pageView();

  const pushState = history.pushState;
  history.pushState = function () {
    pushState.apply(this, arguments);
    setTimeout(pageView, 0);
  };
  window.addEventListener("popstate", function () {
    setTimeout(pageView, 0);
  });
})();