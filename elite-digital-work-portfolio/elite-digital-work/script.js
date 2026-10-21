/*
 * QUICK CUSTOMIZATION — Edit the values in SITE_SETTINGS and PROJECTS.
 * No programming or database is required for this website.
 * See README.md for full instructions before publishing.
 */
const SITE_SETTINGS = {
  studioName: "Elite Digital Work",                  // e.g. "Nadun Web Studio"
  email: "jayashankabandara278@gmail.com",                                // e.g. "hello@yourdomain.com"
  whatsappNumber: "94702742696",                       // e.g. "94771234567" (country code, numbers only)
  location: "Based in Sri Lanka · Available worldwide",
  availabilityLabel: "Now booking new projects",
  instagramUrl: "",                         // e.g. "https://instagram.com/yourprofile"
  linkedinUrl: "",                          // e.g. "https://linkedin.com/in/yourprofile"
  formMode: "netlify",                      // "netlify" = Netlify Forms; "email" = mailto
  showDemoNote: true                        // Set false after replacing sample projects
};

/* Replace the examples with your own projects and URLs.
 * A blank liveUrl means only an on-page project-details window is shown.
 */
const PROJECTS = [
  {
    id: "print",
    title: "Suranga Printers Website",
    category: "website",
    categoryLabel: "Business website",
    description: "A modern printing business presence with a clear services showcase, visual portfolio, and easy customer enquiries.",
    details: "A printing business website concept focused on service discovery, visual storytelling, mobile responsiveness, and effortless customer contact.",
    features: ["Responsive layout", "Services showcase", "Portfolio gallery", "Customer enquiries"],
    preview: "print",
    liveUrl: "" // Paste your real public website URL here, if available
  },
  {
    id: "jewelry",
    title: "Gemstone Jewelry Experience",
    category: "commerce",
    categoryLabel: "E-commerce / catalog",
    description: "An elegant jewelry shopping concept with curated collections, beautiful product displays, and detailed browsing.",
    details: "An elegant boutique concept designed to help customers discover collections and view jewelry in detail. Features can include product images, categories, individual product pages, and enquiry links.",
    features: ["Product collections", "Detailed product views", "Elegant responsive design", "Customer enquiry flow"],
    preview: "jewelry",
    liveUrl: ""
  },
  {
    id: "system",
    title: "Inventory & Sales Dashboard",
    category: "system",
    categoryLabel: "Custom web system",
    description: "A smart operations dashboard concept that brings purchases, sales, stock, and insights into one clean interface.",
    details: "A business-management concept showing how a custom web app can bring scattered information together. Useful modules can include purchases, sales, stock levels, financial summaries, and reporting.",
    features: ["Inventory tracking", "Sales overview", "Dashboard widgets", "Business reports"],
    preview: "system",
    liveUrl: ""
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const safeUrl = value => {
  if (!value) return "";
  try { const u = new URL(value); return ["https:", "http:"].includes(u.protocol) ? u.href : ""; }
  catch { return ""; }
};
let toastTimer;
let lastDialogTrigger = null;

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
}

function initSettings() {
  $$("[data-brand]").forEach(el => el.textContent = SITE_SETTINGS.studioName);
  $(".brand").setAttribute("aria-label", `${SITE_SETTINGS.studioName} home`);
  $("#year").textContent = new Date().getFullYear();
  $("[data-availability]").textContent = SITE_SETTINGS.availabilityLabel;
  $("#location-display").textContent = SITE_SETTINGS.location;
  document.title = `${SITE_SETTINGS.studioName} | Creative Web Design & Development`;
  if (!SITE_SETTINGS.showDemoNote) $("#work-note").hidden = true;

  const mail = SITE_SETTINGS.email.trim();
  const emailDisplay = $("#email-display");
  const contactEmail = $("#contact-email");
  const footerEmail = $("#footer-email");
  if (mail) {
    emailDisplay.textContent = mail;
    contactEmail.href = `mailto:${mail}`;
    footerEmail.href = `mailto:${mail}`;
  } else {
    emailDisplay.textContent = "Add your email in script.js";
    [contactEmail, footerEmail].forEach(el => el.addEventListener("click", e => {
      e.preventDefault(); toast("Add your business email to SITE_SETTINGS in script.js.");
    }));
  }
  const number = SITE_SETTINGS.whatsappNumber.replace(/\D/g, "");
  if (number) {
    const wa = $("#contact-whatsapp");
    wa.hidden = false;
    wa.href = `https://wa.me/${number}?text=${encodeURIComponent("Hello! I would like to discuss a website project.")}`;
    wa.target = "_blank";
    wa.rel = "noopener noreferrer";
  }
  [["instagramUrl", "#footer-instagram"],["linkedinUrl", "#footer-linkedin"]].forEach(([key, selector]) => {
    const url = safeUrl(SITE_SETTINGS[key]);
    if (url) { const el = $(selector); el.hidden = false; el.href = url; el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });
  if (SITE_SETTINGS.formMode === "email") $("#form-footnote").textContent = "Submitting this form opens your email app so you can send your enquiry.";
}

function initTheme() {
  let saved = "dark";
  try { saved = localStorage.getItem("elite-digital-work-theme") || "dark"; } catch {}
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    $("#theme-icon").textContent = theme === "dark" ? "☼" : "☾";
    $("#theme-toggle").setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  };
  applyTheme(saved === "light" ? "light" : "dark");
  $("#theme-toggle").addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try { localStorage.setItem("elite-digital-work-theme", theme); } catch {}
  });
}

function initMobileMenu() {
  const toggle = $("#menu-toggle"), nav = $("#mobile-nav");
  const close = () => { nav.hidden = true; toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu"); };
  toggle.addEventListener("click", () => {
    const isOpening = !nav.hidden;
    nav.hidden = isOpening;
    toggle.setAttribute("aria-expanded", String(!isOpening));
    toggle.setAttribute("aria-label", isOpening ? "Open menu" : "Close menu");
  });
  $$("a", nav).forEach(a => a.addEventListener("click", close));
  window.addEventListener("resize", () => { if (window.innerWidth > 830) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function previewHtml(type) {
  const header = '<div class="mini-bar"><i></i><i></i><i></i></div>';
  if (type === "jewelry") return `<div class="project-mini-browser">${header}<div class="mini-page jewelry-page"><div class="jewelry-head"><b>ATELIER</b><span>SHOP &nbsp;&nbsp; STORY &nbsp;&nbsp; ↗</span></div><div class="jewel-object"></div><div class="jewelry-caption">Something extraordinary.</div><div class="jewelry-subcaption">A COLLECTION OF LITTLE WONDERS</div></div></div>`;
  if (type === "system") return `<div class="project-mini-browser">${header}<div class="mini-page system-page"><div class="system-side"><span>◈</span><span>▦</span><span>▤</span><span>◷</span></div><div class="system-body"><div class="system-top"><b>Business overview</b><span>October</span></div><div class="system-counters"><div>REVENUE<b>84.5k</b></div><div>PRODUCTS<b>129</b></div><div>ORDERS<b>48</b></div></div><div class="system-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div></div>`;
  return `<div class="project-mini-browser">${header}<div class="mini-page print-page"><div class="print-header">PRINTWORKS<span>ABOUT &nbsp; SERVICES &nbsp; CONTACT</span></div><div class="print-layout"><div><h4>YOUR IDEAS.<br>IN PRINT.</h4><p>Creative printing for big ideas and small moments.</p><b>OUR SERVICES ↗</b></div><div class="print-graphic"></div></div></div></div>`;
}

function cardHtml(project) {
  const live = safeUrl(project.liveUrl);
  return `<article class="project-card" data-category="${escapeHtml(project.category)}">
    <div class="project-art project-art--${escapeHtml(project.preview)}" aria-hidden="true"><span class="project-preview-label">ELITE / SELECTED WORK</span>${previewHtml(project.preview)}<span class="project-preview-arrow">↗</span></div>
    <div class="project-info"><span class="project-category">${escapeHtml(project.categoryLabel)}</span><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p>
    <div class="project-links"><button type="button" class="project-link" data-project-id="${escapeHtml(project.id)}">Project details <span aria-hidden="true">↗</span></button>${live ? `<a class="project-link" href="${escapeHtml(live)}" target="_blank" rel="noopener noreferrer">Live website <span aria-hidden="true">↗</span></a>` : `<span></span>`}</div></div></article>`;
}

function renderProjects(filter = "all") {
  const list = PROJECTS.filter(p => filter === "all" || p.category === filter);
  $("#project-grid").innerHTML = list.length ? list.map(cardHtml).join("") : '<p class="work-note">No projects in this category yet.</p>';
}

function initProjects() {
  renderProjects();
  $$(".filter-pill").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter-pill").forEach(other => { other.classList.remove("active"); other.setAttribute("aria-pressed", "false"); });
    btn.classList.add("active"); btn.setAttribute("aria-pressed", "true");
    renderProjects(btn.dataset.filter);
  }));
  $("#project-grid").addEventListener("click", e => {
    const button = e.target.closest("[data-project-id]");
    if (!button) return;
    const project = PROJECTS.find(p => p.id === button.dataset.projectId);
    if (project) openProjectDialog(project, button);
  });
  const dialog = $("#project-dialog");
  $("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { document.body.classList.remove("modal-open"); if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus(); });
}

function openProjectDialog(project, trigger) {
  lastDialogTrigger = trigger;
  const live = safeUrl(project.liveUrl);
  $("#dialog-content").innerHTML = `<p class="section-kicker">${escapeHtml(project.categoryLabel)}</p><h2 id="dialog-title" class="dialog-content-heading">${escapeHtml(project.title)}</h2><p class="dialog-lede">${escapeHtml(project.details)}</p><ul class="dialog-list">${project.features.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul><div class="dialog-action"><a href="#contact" class="btn btn-primary" id="dialog-enquiry">Start a similar project <span aria-hidden="true">↗</span></a>${live ? `<a class="btn btn-outline" href="${escapeHtml(live)}" target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>` : ""}</div>${SITE_SETTINGS.showDemoNote ? `<p class="dialog-note">Example portfolio content — edit this project in script.js before publishing.</p>` : ""}`;
  $("#dialog-enquiry").addEventListener("click", () => $("#project-dialog").close());
  $("#project-dialog").showModal();
  document.body.classList.add("modal-open");
}

function initPackageButtons() {
  $$("[data-package]").forEach(button => button.addEventListener("click", () => {
    const selectedPackage = button.dataset.package;
    const service = $("#project-type");
    if ([...service.options].some(option => option.value === selectedPackage)) service.value = selectedPackage;
    $("#contact").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setTimeout(() => $("#full-name").focus({ preventScroll: true }), 500);
  }));
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const temp = document.createElement("textarea");
    temp.value = text; temp.style.position = "fixed"; temp.style.opacity = "0";
    document.body.appendChild(temp); temp.select();
    const copied = document.execCommand("copy"); temp.remove(); return copied;
  } catch { return false; }
}

function initContactForm() {
  const form = $("#project-form");
  const isLocal = location.protocol === "file:" || ["localhost", "127.0.0.1"].includes(location.hostname);
  if (isLocal) $("#form-footnote").textContent = "Preview mode: launch on Netlify to receive enquiries in Netlify Forms.";
  form.addEventListener("submit", async event => {
    if (SITE_SETTINGS.formMode === "netlify" && !isLocal) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "New website project enquiry", "",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Project: ${data.get("project_type")}`,
      "", `Details:\n${data.get("message")}`
    ].join("\n");
    if (SITE_SETTINGS.email.trim()) {
      location.href = `mailto:${SITE_SETTINGS.email.trim()}?subject=${encodeURIComponent("New website project enquiry")}&body=${encodeURIComponent(message)}`;
      toast("Opening your email app to send your enquiry.");
    } else {
      const copied = await copyText(message);
      toast(copied ? "Enquiry copied! Set a contact email or deploy to Netlify." : "Add your email or publish on Netlify to send enquiries.");
    }
  });
}

function initReveals() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach(el => el.classList.add("in-view")); return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } });
  }, { threshold: .08, rootMargin: "0px 0px -35px 0px" });
  elements.forEach(el => observer.observe(el));
}

initSettings();
initTheme();
initMobileMenu();
initProjects();
initPackageButtons();
initContactForm();
initReveals();

// Lightweight details that add polish without external dependencies.
function initPremiumEffects() {
  const progress = document.querySelector("#page-progress");
  const setProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0})`;
  };
  window.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);
  setProgress();

  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll(".service-card, .package-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - bounds.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - bounds.top}px`);
    });
  });
}
initPremiumEffects();
