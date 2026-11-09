/**
 * ATW ERP beta announcement bar: expand/collapse, dismiss, and contact submit.
 * POSTs to same-origin /api/contact (Pages worker → auth).
 */
(function () {
  const STORAGE_KEY = "atw-erp-beta-bar-dismissed";
  const SMS_CONSENT_VERSION = "sms-2026-11-01";
  const bar = document.querySelector("[data-erp-beta-bar]");
  if (!bar) return;

  const openBtn = bar.querySelector("[data-erp-beta-open]");
  const dismissBtn = bar.querySelector("[data-erp-beta-dismiss]");
  const panel = bar.querySelector("[data-erp-beta-panel]");
  const root = document.getElementById("erp-beta-form-root");

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
    document.documentElement.dataset.hideErpBetaBar = "1";
    bar.remove();
  }

  function setOpen(open) {
    if (!panel || !openBtn) return;
    panel.hidden = !open;
    panel.classList.toggle("hidden", !open);
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    openBtn.textContent = open ? "Close" : "Learn more";
    if (open) {
      const first = panel.querySelector("input, textarea, button");
      if (first && typeof first.focus === "function") first.focus();
    }
  }

  dismissBtn?.addEventListener("click", dismiss);
  openBtn?.addEventListener("click", () => {
    const expanded = openBtn.getAttribute("aria-expanded") === "true";
    setOpen(!expanded);
  });

  if (!root) return;

  // Design / CF preview sandboxes must never POST to live auth.atw.net.
  if (
    document.documentElement.dataset.designPreview === "true" ||
    document.body?.dataset?.designPreview === "true"
  ) {
    root.innerHTML = `
      <div class="rounded-lg border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-50" role="status">
        <p class="font-semibold">Form disabled on design preview</p>
        <p class="mt-1.5 text-amber-100/90">Use <a class="underline" href="https://atw.net/contact/?topic=erp-beta">atw.net/contact</a> for real beta inquiries.</p>
      </div>`;
    return;
  }

  const turnstileSiteKey = root.dataset.turnstileSiteKey || "";
  let formStartTime = Date.now();
  let lastSubmissionTime = 0;
  let turnstileToken = "";
  let turnstileWidgetId = null;

  const fieldClass =
    "h-10 w-full rounded-md border border-white/15 bg-[#0d1a2e] px-3 text-sm text-white placeholder:text-[#a8b6c9] focus:border-[#5b9bff] focus:outline-none focus:ring-1 focus:ring-[#5b9bff]";
  const labelClass = "text-xs font-medium text-[#c5d0e0]";

  root.innerHTML = `
    <form id="erp-beta-form" class="space-y-3" novalidate>
      <div id="erp-beta-errors" class="hidden rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-100"></div>
      <div id="erp-beta-success" class="hidden rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4 text-center">
        <p class="font-semibold text-emerald-50">Thanks. We will follow up about ATW ERP beta.</p>
        <button type="button" id="erp-beta-another" class="mt-3 text-sm font-medium text-[#7ee0ff] underline">Send another</button>
      </div>
      <div id="erp-beta-fields" class="space-y-3">
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label class="${labelClass}" for="erp-first">First name *</label>
            <input id="erp-first" name="firstName" required maxlength="40" autocomplete="given-name" class="${fieldClass}" />
          </div>
          <div class="space-y-1.5">
            <label class="${labelClass}" for="erp-last">Last name *</label>
            <input id="erp-last" name="lastName" required maxlength="80" autocomplete="family-name" class="${fieldClass}" />
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label class="${labelClass}" for="erp-email">Email *</label>
            <input id="erp-email" name="email" type="email" required maxlength="100" autocomplete="email" class="${fieldClass}" />
          </div>
          <div class="space-y-1.5">
            <label class="${labelClass}" for="erp-company">Company *</label>
            <input id="erp-company" name="company" required maxlength="200" autocomplete="organization" class="${fieldClass}" />
          </div>
        </div>
        <div class="space-y-1.5">
          <label class="${labelClass}" for="erp-desc">What are you hoping to try in beta? (optional)</label>
          <textarea id="erp-desc" name="description" rows="2" maxlength="2000" class="min-h-[72px] w-full rounded-md border border-white/15 bg-[#0d1a2e] px-3 py-2 text-sm text-white placeholder:text-[#a8b6c9] focus:border-[#5b9bff] focus:outline-none focus:ring-1 focus:ring-[#5b9bff]" placeholder="Modules, team size, timeline…"></textarea>
        </div>
        <div id="erp-turnstile" class="min-h-[65px] w-full"></div>
        <button type="submit" id="erp-submit" class="inline-flex h-10 min-w-[140px] items-center justify-center rounded-md bg-[#5b9bff] px-5 text-sm font-semibold text-[#06101c] transition hover:bg-[#7ee0ff] disabled:opacity-50">
          Request beta info
        </button>
        <p class="text-[11px] leading-relaxed text-[#a8b6c9]">
          Submitting sends your details to the ATW team. Or email
          <a class="text-[#7ee0ff] underline" href="mailto:support@atw.net?subject=ATW%20ERP%20beta">support@atw.net</a>.
        </p>
      </div>
    </form>
  `;

  const form = document.getElementById("erp-beta-form");
  const errorsEl = document.getElementById("erp-beta-errors");
  const successEl = document.getElementById("erp-beta-success");
  const fieldsEl = document.getElementById("erp-beta-fields");
  const submitBtn = document.getElementById("erp-submit");

  function showErrors(messages) {
    errorsEl.textContent = messages.join(" ");
    errorsEl.classList.remove("hidden");
  }

  function clearErrors() {
    errorsEl.classList.add("hidden");
    errorsEl.textContent = "";
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function loadTurnstile() {
    if (!turnstileSiteKey) return;
    const render = () => {
      const container = document.getElementById("erp-turnstile");
      if (!container || !window.turnstile || container.childNodes.length) return;
      turnstileWidgetId = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        theme: "dark",
        size: "flexible",
        callback: (token) => {
          turnstileToken = token;
        },
        "expired-callback": () => {
          turnstileToken = "";
        },
      });
    };
    if (document.getElementById("turnstile-api-script")) {
      if (window.turnstile) render();
      else {
        document.getElementById("turnstile-api-script").addEventListener("load", render);
      }
      return;
    }
    const script = document.createElement("script");
    script.id = "turnstile-api-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = render;
    document.body.appendChild(script);
  }

  loadTurnstile();

  document.getElementById("erp-beta-another")?.addEventListener("click", () => {
    successEl.classList.add("hidden");
    fieldsEl.classList.remove("hidden");
    form.reset();
    formStartTime = Date.now();
    turnstileToken = "";
    if (window.turnstile && turnstileWidgetId != null) window.turnstile.reset(turnstileWidgetId);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const firstName = document.getElementById("erp-first").value.trim();
    const lastName = document.getElementById("erp-last").value.trim();
    const email = document.getElementById("erp-email").value.trim();
    const company = document.getElementById("erp-company").value.trim();
    const userNote = document.getElementById("erp-desc").value.trim();
    const description = userNote
      ? `ATW ERP beta interest. ${userNote}`
      : "ATW ERP beta interest. Please share beta timing and how to get access.";

    const now = Date.now();
    if (now - formStartTime < 3000) {
      showErrors(["Please take a moment to fill out the form."]);
      return;
    }
    if (lastSubmissionTime > 0 && now - lastSubmissionTime < 30000) {
      showErrors(["Please wait 30 seconds before submitting again."]);
      return;
    }
    if (!firstName || !lastName || !email || !company) {
      showErrors(["Please complete all required fields."]);
      return;
    }
    if (!validEmail(email)) {
      showErrors(["Please enter a valid email address."]);
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      showErrors(["Please complete the verification."]);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    lastSubmissionTime = now;

    const params = new URLSearchParams(window.location.search);
    const body = {
      firstName,
      lastName,
      email,
      phone: "",
      company,
      description,
      service: "ATW ERP Beta",
      smsConsent: false,
      smsConsentVersion: SMS_CONSENT_VERSION,
      pageUrl: window.location.href,
      utm_source: params.get("utm_source") || "site-top-bar",
      utm_medium: params.get("utm_medium") || "announcement",
      utm_campaign: params.get("utm_campaign") || "erp-beta",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "learn-more",
    };
    if (turnstileSiteKey && turnstileToken) body.turnstileToken = turnstileToken;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          res.status === 429
            ? "Too many submissions. Please try again later."
            : data.error || "Something went wrong. Please try again.";
        showErrors([message]);
        return;
      }
      fieldsEl.classList.add("hidden");
      successEl.classList.remove("hidden");
      form.reset();
      formStartTime = Date.now();
      turnstileToken = "";
      if (window.turnstile && turnstileWidgetId != null) window.turnstile.reset(turnstileWidgetId);
    } catch {
      showErrors(["Unable to send. Please check your connection and try again."]);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Request beta info";
    }
  });
})();
