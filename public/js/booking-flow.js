/**
 * Zoho Bookings flow for /book (same-origin /api/zoho-bookings/* via Pages worker).
 */
(function () {
  const root = document.getElementById("atw-booking-root");
  if (!root) return;

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_FULL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function addDays(d, n) {
    const out = new Date(d);
    out.setDate(out.getDate() + n);
    return out;
  }
  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  function toZohoDate(d) {
    return `${String(d.getDate()).padStart(2, "0")}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
  }
  function formatSlotDisplay(slot) {
    const m = slot.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return slot;
    const h = parseInt(m[1], 10);
    const min = m[2];
    if (h === 0) return `12:${min} AM`;
    if (h < 12) return `${h}:${min} AM`;
    if (h === 12) return `12:${min} PM`;
    return `${h - 12}:${min} PM`;
  }
  function toFromTime(dateStr, slot) {
    const s = /^\d{1,2}:\d{2}$/.test(slot) ? `${slot}:00` : slot;
    return `${dateStr} ${s}`;
  }

  let config = null;
  let step = "pick";
  let weekStart = addDays(startOfDay(new Date()), 1);
  let selectedDate = null;
  let slotsByDate = {};
  let selectedSlot = null;
  let formData = { firstName: "", lastName: "", email: "", phone: "", company: "", notes: "" };

  try {
    const raw = sessionStorage.getItem("atw-contact-prefill");
    if (raw) {
      const pre = JSON.parse(raw);
      formData = { ...formData, ...pre };
      sessionStorage.removeItem("atw-contact-prefill");
    }
  } catch {
    /* ignore */
  }

  function render() {
    if (!config) {
      root.innerHTML = `<p class="text-muted-foreground">Loading scheduling…</p>`;
      return;
    }
    if (step === "success") {
      root.innerHTML = `
        <div class="rounded-2xl border border-emerald-200 bg-card p-8 text-center">
          <h3 class="text-xl font-semibold">Appointment booked</h3>
          <p class="mt-2 text-sm text-muted-foreground">We will send a confirmation to ${formData.email}.</p>
          ${root.dataset.summaryUrl ? `<a class="mt-4 inline-flex text-sm text-primary underline" href="${root.dataset.summaryUrl}" target="_blank" rel="noopener noreferrer">View booking details</a>` : ""}
        </div>`;
      return;
    }

    if (step === "details" && selectedDate && selectedSlot) {
      const dateLabel = `${DAYS[selectedDate.getDay()]}, ${MONTHS_FULL[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
      root.innerHTML = `
        <div class="rounded-2xl border border-border bg-card shadow-sm">
          <div class="border-b border-border bg-muted/30 p-6">
            <p class="text-sm text-muted-foreground">${dateLabel} · ${formatSlotDisplay(selectedSlot)}</p>
            <h2 class="text-lg font-semibold">Enter your details</h2>
          </div>
          <form id="atw-book-details" class="space-y-4 p-6">
            <div class="grid gap-4 sm:grid-cols-2">
              <div><label class="text-sm font-medium">First name *</label><input name="firstName" required value="${esc(formData.firstName)}" class="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
              <div><label class="text-sm font-medium">Last name *</label><input name="lastName" required value="${esc(formData.lastName)}" class="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
            </div>
            <div><label class="text-sm font-medium">Email *</label><input name="email" type="email" required value="${esc(formData.email)}" class="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
            <div><label class="text-sm font-medium">Phone *</label><input name="phone" type="tel" required value="${esc(formData.phone)}" class="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
            <div><label class="text-sm font-medium">Company *</label><input name="company" required value="${esc(formData.company)}" class="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm" /></div>
            <div><label class="text-sm font-medium">Notes (optional)</label><textarea name="notes" rows="3" class="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm">${esc(formData.notes)}</textarea></div>
            <p id="atw-book-error" class="hidden text-sm text-red-600"></p>
            <div class="flex flex-wrap gap-2">
              <button type="submit" class="rounded bg-brand-navy px-6 py-3 text-sm font-semibold text-white">Confirm booking</button>
              <button type="button" id="atw-book-back" class="rounded border-2 border-brand-navy px-6 py-3 text-sm font-semibold">Change time</button>
            </div>
          </form>
        </div>`;
      document.getElementById("atw-book-back").onclick = () => {
        step = "pick";
        render();
      };
      document.getElementById("atw-book-details").onsubmit = onSubmitDetails;
      return;
    }

    const minDate = addDays(startOfDay(new Date()), 1);
    const dayCards = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(weekStart, i);
      const dateStr = toZohoDate(d);
      const count = slotsByDate[dateStr];
      const disabled = d.getTime() < minDate.getTime();
      const selected = selectedDate && selectedDate.getTime() === d.getTime();
      return { d, dateStr, count, disabled, selected };
    });
    const slots = selectedDate ? slotsByDate[toZohoDate(selectedDate)] || [] : [];
    const monthYear = `${MONTHS_FULL[weekStart.getMonth()]} ${weekStart.getFullYear()}`;

    root.innerHTML = `
      <div class="rounded-2xl border border-border bg-card shadow-sm">
        <div class="border-b border-border bg-gradient-to-b from-muted/40 to-transparent p-6">
          <h2 class="text-lg font-semibold">30 minute call with our team</h2>
          <p class="mt-1 text-sm text-muted-foreground">Pick a day and time (${config.timezone.replace(/_/g, " ")}).</p>
        </div>
        <div class="space-y-6 p-6">
          <div class="flex items-center justify-between">
            <p class="text-xs font-medium uppercase tracking-wider text-muted-foreground">Week</p>
            <div class="flex items-center gap-2">
              <button type="button" id="atw-week-prev" class="rounded-lg border px-2 py-1 text-sm" aria-label="Previous week">←</button>
              <span class="min-w-[120px] text-center text-sm font-medium">${monthYear}</span>
              <button type="button" id="atw-week-next" class="rounded-lg border px-2 py-1 text-sm" aria-label="Next week">→</button>
            </div>
          </div>
          <div class="grid grid-cols-7 gap-2">
            ${dayCards
              .map(
                ({ d, count, disabled, selected }) => `
              <button type="button" data-date="${d.toISOString()}" ${disabled ? "disabled" : ""}
                class="rounded-lg border p-2 text-center text-xs ${selected ? "border-brand-navy bg-brand-navy/10" : "border-border"} ${disabled ? "opacity-40" : "hover:bg-muted/50"}">
                <div class="font-medium">${MONTHS[d.getMonth()]} ${d.getDate()}</div>
                <div class="text-muted-foreground">${count != null ? `${count} slots` : "…"}</div>
              </button>`,
              )
              .join("")}
          </div>
          <div>
            <p class="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Available times</p>
            <p id="atw-slots-error" class="mb-2 hidden text-sm text-red-600"></p>
            <div id="atw-slots" class="flex flex-wrap gap-2">
              ${
                !selectedDate
                  ? `<span class="text-sm text-muted-foreground">Select a date above.</span>`
                  : slots.length
                    ? slots
                        .map(
                          (slot) =>
                            `<button type="button" data-slot="${esc(slot)}" class="rounded-full border border-border px-3 py-1.5 text-sm hover:border-brand-navy">${formatSlotDisplay(slot)}</button>`,
                        )
                        .join("")
                    : `<span class="text-sm text-muted-foreground">No slots this day. Try another date.</span>`
              }
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById("atw-week-prev").onclick = () => {
      weekStart = addDays(weekStart, -7);
      selectedDate = null;
      fetchWeek();
    };
    document.getElementById("atw-week-next").onclick = () => {
      weekStart = addDays(weekStart, 7);
      selectedDate = null;
      fetchWeek();
    };
    root.querySelectorAll("button[data-date]").forEach((btn) => {
      btn.onclick = () => {
        if (btn.disabled) return;
        selectedDate = new Date(btn.dataset.date);
        selectedSlot = null;
        render();
      };
    });
    root.querySelectorAll("button[data-slot]").forEach((btn) => {
      btn.onclick = () => {
        selectedSlot = btn.dataset.slot;
        step = "details";
        render();
      };
    });
  }

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  async function fetchWeek() {
    if (!config) return;
    const errEl = document.getElementById("atw-slots-error");
    try {
      const params = new URLSearchParams({
        service_id: config.serviceId,
        staff_id: config.staffId,
        selected_date: toZohoDate(weekStart),
        days: "7",
      });
      const res = await fetch(`/api/zoho-bookings/fetch-availability?${params}`);
      const data = await res.json();
      if (res.ok && data.slotsByDate) {
        slotsByDate = data.slotsByDate;
        if (errEl) errEl.classList.add("hidden");
      } else {
        slotsByDate = {};
        if (errEl) {
          errEl.textContent = data.error || "Failed to load availability";
          errEl.classList.remove("hidden");
        }
      }
    } catch {
      slotsByDate = {};
    }
    render();
  }

  async function onSubmitDetails(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    formData = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      notes: String(fd.get("notes") || "").trim(),
    };
    const errEl = document.getElementById("atw-book-error");
    errEl.classList.add("hidden");
    const dateStr = toZohoDate(selectedDate);
    const fromTime = toFromTime(dateStr, selectedSlot);
    try {
      const res = await fetch("/api/zoho-bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: config.serviceId,
          staffId: config.staffId,
          fromTime,
          timezone: config.timezone,
          customerDetails: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone_number: formData.phone.replace(/\D/g, "").slice(0, 15),
          },
          additionalFields: { "Company Name": formData.company },
          notes: formData.notes || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        errEl.textContent = data.error || "Booking failed. Please try another slot.";
        errEl.classList.remove("hidden");
        return;
      }
      const rv = data?.data?.response?.returnvalue;
      root.dataset.summaryUrl = rv?.summary_url || "";
      step = "success";
      render();
    } catch {
      errEl.textContent = "Something went wrong. Please try again.";
      errEl.classList.remove("hidden");
    }
  }

  fetch("/api/zoho-bookings/config")
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        root.innerHTML = `<p class="text-red-600">${data.error}</p>`;
        return;
      }
      config = {
        serviceId: data.serviceId,
        staffId: data.staffId,
        timezone: data.timezone || "America/New_York",
      };
      fetchWeek();
    })
    .catch(() => {
      root.innerHTML = `<p class="text-red-600">Failed to load booking config.</p>`;
    });
})();
