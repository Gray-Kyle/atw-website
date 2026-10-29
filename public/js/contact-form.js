/**
 * Contact form for /contact (same-origin POST /api/contact via Pages worker → auth).
 */
(function () {
  const SMS_CONSENT_VERSION = "sms-2026-11-01";
  const root = document.getElementById("atw-contact-form-root");
  if (!root) return;

  const turnstileSiteKey = root.dataset.turnstileSiteKey || "";
  let formStartTime = Date.now();
  let lastSubmissionTime = 0;
  let turnstileToken = "";
  let turnstileWidgetId = null;

  root.innerHTML = `
    <form id="atw-contact-form" class="space-y-5">
      <div id="atw-contact-errors" class="hidden rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"></div>
      <div id="atw-contact-success" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h3 class="text-xl font-semibold text-emerald-900">Message sent</h3>
        <p class="mt-2 text-sm text-emerald-800">Thank you for reaching out. We will get back to you shortly.</p>
        <div class="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <a href="/book" class="inline-flex justify-center rounded bg-brand-navy px-6 py-3 text-sm font-semibold text-white">Book a consultation</a>
          <button type="button" id="atw-contact-another" class="inline-flex justify-center rounded border-2 border-brand-navy px-6 py-3 text-sm font-semibold">Send another message</button>
        </div>
      </div>
      <div id="atw-contact-fields">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2"><label class="text-sm font-medium" for="cf-first">First name *</label><input id="cf-first" name="firstName" required maxlength="40" autocomplete="given-name" class="h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
          <div class="space-y-2"><label class="text-sm font-medium" for="cf-last">Last name *</label><input id="cf-last" name="lastName" required maxlength="80" autocomplete="family-name" class="h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div class="space-y-2"><label class="text-sm font-medium" for="cf-email">Email *</label><input id="cf-email" name="email" type="email" required maxlength="100" autocomplete="email" class="h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
          <div class="space-y-2"><label class="text-sm font-medium" for="cf-phone">Mobile phone (optional)</label><input id="cf-phone" name="phone" type="tel" maxlength="30" autocomplete="tel" class="h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
        </div>
        <div class="mt-4 space-y-2"><label class="text-sm font-medium" for="cf-company">Company *</label><input id="cf-company" name="company" required maxlength="200" autocomplete="organization" class="h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
        <div class="mt-4 space-y-2"><label class="text-sm font-medium" for="cf-desc">How can we help you? (optional)</label><textarea id="cf-desc" name="description" rows="3" class="min-h-[100px] w-full rounded-md border border-border px-3 py-2 text-sm" placeholder="Tell us about your project or question…"></textarea></div>
        <div id="cf-turnstile" class="mt-4 min-h-[65px] w-full"></div>
        <div class="mt-4 space-y-2">
          <label class="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
            <input id="cf-sms" type="checkbox" class="mt-1 h-4 w-4 rounded border-gray-300" />
            <span>I agree to receive SMS messages from ATW about marketing and customer care (mixed campaign), up to 4 messages per week, via Twilio. Message and data rates may apply. Reply STOP to opt out. See <a href="/sms-terms" class="text-primary underline" target="_blank" rel="noopener noreferrer">SMS Terms</a> (version ${SMS_CONSENT_VERSION}).</span>
          </label>
          <p id="cf-sms-error" class="hidden text-xs text-red-600"></p>
        </div>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="submit" id="cf-submit" class="inline-flex h-11 min-w-[140px] items-center justify-center rounded bg-brand-navy px-6 text-sm font-semibold text-white disabled:opacity-50">Submit</button>
          <button type="reset" class="inline-flex h-11 items-center justify-center rounded border-2 border-brand-navy px-6 text-sm font-semibold">Reset</button>
        </div>
      </div>
    </form>
  `;

  const form = document.getElementById("atw-contact-form");
  const errorsEl = document.getElementById("atw-contact-errors");
  const successEl = document.getElementById("atw-contact-success");
  const fieldsEl = document.getElementById("atw-contact-fields");
  const smsCheckbox = document.getElementById("cf-sms");
  const smsError = document.getElementById("cf-sms-error");
  const submitBtn = document.getElementById("cf-submit");

  function showErrors(messages) {
    errorsEl.textContent = messages.join(" ");
    errorsEl.classList.remove("hidden");
  }

  function clearErrors() {
    errorsEl.classList.add("hidden");
    errorsEl.textContent = "";
    smsError.classList.add("hidden");
    smsError.textContent = "";
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function buildSmsConsentPayload(checked) {
    if (!checked) return { smsConsent: false, smsConsentVersion: null };
    return { smsConsent: true, smsConsentVersion: SMS_CONSENT_VERSION };
  }

  function loadTurnstile() {
    if (!turnstileSiteKey) return;
    const render = () => {
      const container = document.getElementById("cf-turnstile");
      if (!container || !window.turnstile || container.childNodes.length) return;
      turnstileWidgetId = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        theme: "light",
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
      render();
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

  document.getElementById("atw-contact-another")?.addEventListener("click", () => {
    successEl.classList.add("hidden");
    fieldsEl.classList.remove("hidden");
    form.reset();
    formStartTime = Date.now();
    turnstileToken = "";
    if (window.turnstile && turnstileWidgetId) window.turnstile.reset(turnstileWidgetId);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const firstName = document.getElementById("cf-first").value.trim();
    const lastName = document.getElementById("cf-last").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const phone = document.getElementById("cf-phone").value.trim();
    const company = document.getElementById("cf-company").value.trim();
    const description = document.getElementById("cf-desc").value.trim();
    const smsConsent = smsCheckbox.checked;

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
    if (smsConsent && !phone) {
      smsError.textContent = "Enter a mobile number to opt in to SMS, or uncheck this box.";
      smsError.classList.remove("hidden");
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      showErrors(["Please complete the verification."]);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";
    lastSubmissionTime = now;

    const consent = buildSmsConsentPayload(smsConsent);
    const params = new URLSearchParams(window.location.search);
    const body = {
      firstName,
      lastName,
      email,
      phone,
      company,
      description,
      service: "General Inquiry",
      smsConsent: consent.smsConsent,
      smsConsentVersion: consent.smsConsentVersion || SMS_CONSENT_VERSION,
      pageUrl: window.location.href,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
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
      try {
        sessionStorage.setItem(
          "atw-contact-prefill",
          JSON.stringify({ firstName, lastName, email, phone, company }),
        );
      } catch {
        /* ignore */
      }
      fieldsEl.classList.add("hidden");
      successEl.classList.remove("hidden");
      form.reset();
      formStartTime = Date.now();
      turnstileToken = "";
      if (window.turnstile && turnstileWidgetId) window.turnstile.reset(turnstileWidgetId);
    } catch {
      showErrors(["Unable to send. Please check your connection and try again."]);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
})();
