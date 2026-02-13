const body = document.body;
const langToggle = document.getElementById("langToggle");
const searchInput = document.getElementById("lessonSearch");
const searchable = Array.from(document.querySelectorAll(".lesson, .mini"));
const checkboxes = Array.from(document.querySelectorAll("input[type='checkbox'][data-progress]"));

const LANG_KEY = "academy_lang";
const PROGRESS_KEY = "academy_progress_v2";

function setLang(lang) {
  const isEn = lang === "en";
  body.classList.toggle("lang-en", isEn);
  document.documentElement.lang = isEn ? "en" : "ro";
  langToggle.textContent = isEn ? "RO" : "EN";
  localStorage.setItem(LANG_KEY, lang);
}

function loadLang() {
  const saved = localStorage.getItem(LANG_KEY);
  setLang(saved === "en" ? "en" : "ro");
}

function loadProgress() {
  let data = {};
  try {
    data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    data = {};
  }

  checkboxes.forEach((box) => {
    const key = box.dataset.progress;
    box.checked = Boolean(data[key]);
    box.addEventListener("change", () => {
      data[key] = box.checked;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
    });
  });
}

function applySearch(value) {
  const q = value.trim().toLowerCase();
  searchable.forEach((el) => {
    const text = `${el.dataset.search || ""} ${el.textContent}`.toLowerCase();
    const match = !q || text.includes(q);
    el.classList.toggle("hidden", !match);
  });
}

langToggle.addEventListener("click", () => {
  setLang(body.classList.contains("lang-en") ? "ro" : "en");
});

searchInput.addEventListener("input", (e) => {
  applySearch(e.target.value);
});

window.addEventListener("load", () => {
  loadLang();
  loadProgress();
  applySearch("");
});
