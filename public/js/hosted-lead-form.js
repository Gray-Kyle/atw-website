/**
 * Hosted CRM lead form at /forms/[orgId]/[slug]
 */
(function () {
  const root = document.getElementById("atw-hosted-form-root");
  if (!root) return;
  const orgId = root.dataset.orgId;
  const slug = root.dataset.slug;
  if (!orgId || !slug) return;

  if (!orgId || !slug) {
    root.innerHTML = `<p class="text-sm text-muted-foreground">Invalid form link.</p>`;
    return;
  }

  root.innerHTML = `<p class="text-sm text-muted-foreground">Loading form…</p>`;

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function fieldInput(field) {
    const req = field.required ? "required" : "";
    const common = `name="${esc(field.id)}" id="lf-${esc(field.id)}" ${req} class="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"`;
    if (field.type === "textarea") {
      return `<textarea ${common} rows="4" placeholder="${esc(field.placeholder || "")}"></textarea>`;
    }
    if (field.type === "select" && field.options?.length) {
      return `<select ${common}>${field.options.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}</select>`;
    }
    const type = field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";
    return `<input type="${type}" ${common} placeholder="${esc(field.placeholder || "")}" />`;
  }

  async function load() {
    try {
      const res = await fetch(
        `/api/public/lead-forms/${encodeURIComponent(orgId)}/hosted/${encodeURIComponent(slug)}`,
      );
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.form) {
        root.innerHTML = `<p class="rounded-md border border-border bg-muted/30 p-6 text-center text-sm">This form is not available.</p>`;
        return;
      }
      const form = data.form;
      if (form.status === "archived") {
        root.innerHTML = `<p class="rounded-md border border-border p-6 text-center text-sm text-muted-foreground">This form is no longer available.</p>`;
        return;
      }
      const draftNote =
        form.status === "draft"
          ? `<p class="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">Preview only — this form is not published yet.</p>`
          : "";
      const fields = Array.isArray(form.hostedFields) ? form.hostedFields : [];
      root.innerHTML = `
        ${draftNote}
        <h1 class="text-xl font-semibold">${esc(form.name || "Contact form")}</h1>
        ${form.description ? `<p class="mt-2 text-sm text-muted-foreground">${esc(form.description)}</p>` : ""}
        <form id="atw-hosted-form" class="mt-6 space-y-4">
          ${fields
            .map(
              (f) => `
            <div>
              <label class="text-sm font-medium" for="lf-${esc(f.id)}">${esc(f.label)}${f.required ? " *" : ""}</label>
              ${fieldInput(f)}
            </div>`,
            )
            .join("")}
          <p id="atw-hosted-error" class="hidden text-sm text-red-600"></p>
          <button type="submit" ${form.status !== "active" ? "disabled" : ""} class="rounded bg-brand-navy px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">${form.status === "active" ? "Submit" : "Preview only"}</button>
        </form>
        <p class="mt-6 text-center text-xs text-muted-foreground">Powered by ATW One</p>`;

      const formEl = document.getElementById("atw-hosted-form");
      if (!formEl || form.status !== "active") return;
      formEl.addEventListener("submit", async (e) => {
        e.preventDefault();
        const errEl = document.getElementById("atw-hosted-error");
        errEl.classList.add("hidden");
        const payload = {};
        fields.forEach((f) => {
          const el = document.getElementById(`lf-${f.id}`);
          if (el) payload[f.id] = el.value;
        });
        try {
          const submitRes = await fetch(
            `/api/public/lead-forms/${encodeURIComponent(orgId)}/hosted/${encodeURIComponent(slug)}/submit`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            },
          );
          const submitData = await submitRes.json().catch(() => null);
          if (!submitRes.ok) {
            errEl.textContent = submitData?.error || "Submission failed.";
            errEl.classList.remove("hidden");
            return;
          }
          root.innerHTML = `
            <div class="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
              <h2 class="text-lg font-semibold text-emerald-900">Thank you</h2>
              <p class="mt-2 text-sm text-emerald-800">Your submission was received. We will be in touch soon.</p>
            </div>`;
        } catch {
          errEl.textContent = "Submission failed. Please try again.";
          errEl.classList.remove("hidden");
        }
      });
    } catch {
      root.innerHTML = `<p class="text-sm text-red-600">Could not load this form.</p>`;
    }
  }

  load();
})();
