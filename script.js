const LANG_KEY = "academy_lang_v5";

function applyLang(lang) {
  const en = lang === "en";
  document.body.classList.toggle("lang-en", en);
  document.documentElement.lang = en ? "en" : "ro";
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = en ? "RO" : "EN";
  localStorage.setItem(LANG_KEY, lang);
}

function setupLang() {
  const saved = localStorage.getItem(LANG_KEY);
  applyLang(saved === "en" ? "en" : "ro");
  const btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", () => applyLang(document.body.classList.contains("lang-en") ? "ro" : "en"));
}

function setupSearch() {
  const input = document.getElementById("globalSearch");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll(".searchable").forEach((el) => {
      const t = `${el.dataset.search || ""} ${el.textContent}`.toLowerCase();
      el.classList.toggle("hidden", q && !t.includes(q));
    });
  });
}

function setStep(flow, idx) {
  const steps = Array.from(flow.querySelectorAll(".step"));
  if (!steps.length) return;
  let i = idx;
  if (i < 0) i = 0;
  if (i > steps.length - 1) i = steps.length - 1;
  steps.forEach((s, n) => s.classList.toggle("active", n === i));
  flow.dataset.current = String(i);
}

function setupFlows() {
  document.querySelectorAll(".flow").forEach((flow) => {
    const tabs = Array.from(flow.querySelectorAll("[data-step-index]"));
    const prev = flow.querySelector(".prev-step");
    const next = flow.querySelector(".next-step");
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        setStep(flow, Number(t.dataset.stepIndex || 0));
      });
    });
    if (prev) prev.addEventListener("click", () => setStep(flow, Number(flow.dataset.current || 0) - 1));
    if (next) next.addEventListener("click", () => setStep(flow, Number(flow.dataset.current || 0) + 1));
    setStep(flow, 0);
  });
}

setupLang();
setupSearch();
setupFlows();
