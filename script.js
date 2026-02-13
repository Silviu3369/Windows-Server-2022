const LANG_KEY = "academy_lang_v4";

function applyLang(lang) {
  const en = lang === "en";
  document.body.classList.toggle("lang-en", en);
  document.documentElement.lang = en ? "en" : "ro";
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = en ? "RO" : "EN";
  localStorage.setItem(LANG_KEY, lang);
}

function setupLanguage() {
  const saved = localStorage.getItem(LANG_KEY);
  applyLang(saved === "en" ? "en" : "ro");
  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      applyLang(document.body.classList.contains("lang-en") ? "ro" : "en");
    });
  }
}

function setupSearch() {
  const input = document.getElementById("globalSearch");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll(".searchable").forEach((el) => {
      const text = `${el.dataset.search || ""} ${el.textContent}`.toLowerCase();
      el.classList.toggle("hidden", q && !text.includes(q));
    });
  });
}

function setFlowStep(flow, idx) {
  const steps = Array.from(flow.querySelectorAll(".step"));
  const tabs = Array.from(flow.querySelectorAll(".flow-tab"));
  if (!steps.length) return;
  let i = idx;
  if (i < 0) i = 0;
  if (i > steps.length - 1) i = steps.length - 1;
  steps.forEach((s, n) => s.classList.toggle("active", n === i));
  tabs.forEach((t, n) => t.classList.toggle("active", n === i));
  flow.dataset.current = String(i);
}

function setupFlows() {
  document.querySelectorAll(".flow").forEach((flow) => {
    const tabs = Array.from(flow.querySelectorAll(".flow-tab"));
    const prev = flow.querySelector(".prev-step");
    const next = flow.querySelector(".next-step");

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => setFlowStep(flow, i));
    });

    if (prev) {
      prev.addEventListener("click", () => {
        const current = Number(flow.dataset.current || 0);
        setFlowStep(flow, current - 1);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        const current = Number(flow.dataset.current || 0);
        setFlowStep(flow, current + 1);
      });
    }

    setFlowStep(flow, 0);
  });
}

function setupActiveSidebar() {
  const links = Array.from(document.querySelectorAll(".sidebar a[href^='#']"));
  if (!links.length) return;
  const onScroll = () => {
    let current = "";
    document.querySelectorAll("section[id]").forEach((sec) => {
      if (sec.offsetTop <= window.scrollY + 130) current = sec.id;
    });
    links.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll);
  onScroll();
}

setupLanguage();
setupSearch();
setupFlows();
setupActiveSidebar();
