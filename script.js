/* ============================================================
   TechFix KL — JavaScript
   script.js
   ============================================================ */

/* ─── Google Sheets Web App URL ─── */
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyybbM8y9SI88sojyNBFeYVA3f-hCqpRjYVT9ZSc7OQgDbVI12qK1g7CxdsrHUGERyMUg/exec";

/* ============================================================
   TAB / PAGE SWITCHING
   ============================================================ */
function showPage(id, btn) {
  /* Hide all pages */
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  /* Deactivate all tab buttons */
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
  /* Show the selected page and mark its tab active */
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
  /* Scroll to top smoothly */
  window.scrollTo({ top: 0, behavior: "smooth" });
  /* Re-trigger fade-in for newly visible elements */
  triggerFade();
}

/* ============================================================
   INQUIRY FORM — GOOGLE SHEETS SUBMISSION
   ============================================================ */
document.getElementById("inquiryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const formMsg   = document.getElementById("form-msg");

  /* Disable button & show loading state */
  submitBtn.disabled    = true;
  submitBtn.textContent = "⏳ Sending…";
  formMsg.className     = "";
  formMsg.style.display = "none";

  /* Collect form data */
  const data = {
    name:        document.getElementById("name").value,
    email:       document.getElementById("email").value,
    phone:       document.getElementById("phone").value,
    serviceType: document.getElementById("serviceType").value,
    brand:       document.getElementById("brand").value,
    message:     document.getElementById("issue").value,
  };

  try {
    /* POST to Google Sheets via Apps Script web app.
       mode: "no-cors" avoids CORS errors — the response is opaque
       but the data still reaches the sheet successfully. */
    await fetch(WEB_APP_URL, {
      method:  "POST",
      mode:    "no-cors",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });

    /* Success feedback */
    formMsg.className     = "success";
    formMsg.innerHTML     = "✅ Request sent! We'll WhatsApp or email you shortly.";
    formMsg.style.display = "block";
    document.getElementById("inquiryForm").reset();

  } catch (err) {
    /* Error feedback */
    formMsg.className     = "error";
    formMsg.innerHTML     = "❌ Something went wrong. Please WhatsApp us directly!";
    formMsg.style.display = "block";
  }

  /* Re-enable button */
  submitBtn.disabled    = false;
  submitBtn.textContent = "🚀 Send My Request";
});

/* ============================================================
   SCROLL FADE-IN
   Adds .visible to .fade-in elements once they enter the viewport
   ============================================================ */
function triggerFade() {
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add("visible");
      }
    });
  }, 80);
}

/* Run on scroll and on page load */
window.addEventListener("scroll", triggerFade);
triggerFade();
