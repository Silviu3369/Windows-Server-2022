const body = document.body;
const langToggle = document.getElementById("langToggle");
const lessonSearch = document.getElementById("lessonSearch");
const links = Array.from(document.querySelectorAll(".toc-link"));
const sections = Array.from(document.querySelectorAll(".panel[id]"));
const checks = Array.from(document.querySelectorAll("input[type='checkbox'][data-progress]"));

const LANG_KEY = "academy_lang";
const PROGRESS_KEY = "academy_progress";

function setLanguage(lang) {
  const isEn = lang === "en";
  body.classList.toggle("lang-en", isEn);
  document.documentElement.lang = isEn ? "en" : "ro";
  langToggle.textContent = isEn ? "RO" : "EN";
  localStorage.setItem(LANG_KEY, lang);
}

function loadLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  setLanguage(saved === "en" ? "en" : "ro");
}

function loadProgress() {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    data = {};
  }

  checks.forEach((check) => {
    const key = check.dataset.progress;
    check.checked = Boolean(data[key]);
    check.addEventListener("change", () => {
      data[key] = check.checked;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    });
  });
}

function filterContent(query) {
  const q = query.trim().toLowerCase();

  sections.forEach((section) => {
    const text = `${section.id} ${section.dataset.search || ""} ${section.textContent}`.toLowerCase();
    const match = q === "" || text.includes(q);
    section.classList.toggle("hidden-section", !match);
  });

  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    const section = document.getElementById(id);
    const visible = section && !section.classList.contains("hidden-section");
    link.classList.toggle("hidden-link", !visible);
  });
}

function markActiveLink() {
  const visibleSections = sections.filter((s) => !s.classList.contains("hidden-section"));
  const fromTop = window.scrollY + 120;

  let current = visibleSections[0]?.id || "";
  for (const section of visibleSections) {
    if (section.offsetTop <= fromTop) current = section.id;
  }

  links.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    link.classList.toggle("active", id === current);
  });
}

langToggle.addEventListener("click", () => {
  setLanguage(body.classList.contains("lang-en") ? "ro" : "en");
});

lessonSearch.addEventListener("input", (e) => {
  filterContent(e.target.value);
  markActiveLink();
});

window.addEventListener("scroll", markActiveLink);
window.addEventListener("load", () => {
  loadLanguage();
  loadProgress();
  filterContent("");
  markActiveLink();
});
