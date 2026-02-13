const i18n = {
  ro: {
    nav_modules: "Module",
    nav_labs: "Mini Laburi",
    nav_resources: "Resurse",
    nav_materials: "Materiale",
    hero_badge: "Program de invatare practic",
    hero_title: "Windows Server 2022, Windows 11, Microsoft 365 si Azure",
    hero_subtitle: "Invata in romana si engleza, pas cu pas, cu comenzi PowerShell, mini-laburi si materiale video.",
    hero_cta: "Incepe cursul",
    modules_title: "Module de curs",
    server_desc: "AD DS, conturi, file server, print server, management si disk administration.",
    win11_desc: "Configurare client, securitate, update-uri, productivitate si troubleshooting.",
    m365_desc: "Administrare utilizatori, licente, Exchange Online, Teams si securitate de baza.",
    azure_desc: "Resource groups, VM-uri, storage, networking si monitorizare.",
    view_materials: "Vezi materialele",
    practice_lab: "Practica in lab",
    labs_title: "Mini laburi ghidate",
    lab1_title: "Lab 1: Active Directory rapid",
    lab1_step1: "Instaleaza AD DS pe Windows Server 2022.",
    lab1_step2: "Promoveaza serverul ca Domain Controller nou.",
    lab1_step3: "Creeaza OU, utilizator si grup de test.",
    lab2_title: "Lab 2: Hardening Windows 11",
    lab2_step1: "Activeaza BitLocker pe drive-ul OS.",
    lab2_step2: "Configureaza Windows Defender Firewall profile.",
    lab2_step3: "Verifica statusul de update.",
    lab3_title: "Lab 3: Onboarding Microsoft 365",
    lab3_step1: "Conecteaza-te la Microsoft Graph PowerShell.",
    lab3_step2: "Creeaza un user cloud de test.",
    lab3_step3: "Aloca o licenta disponibila.",
    lab4_title: "Lab 4: Azure VM + Monitoring",
    lab4_step1: "Creeaza resource group pentru laborator.",
    lab4_step2: "Provisioneaza o VM Windows.",
    lab4_step3: "Verifica metricele de baza.",
    resources_title: "Video si imagini utile",
    media1_desc: "Canal oficial pentru demo-uri tehnice Windows, Azure si Microsoft 365.",
    media2_desc: "Learning paths oficiale pentru certificari si laboratoare interactive.",
    materials_title: "Materialele tale integrate",
    mat_server: "Windows Server 2022 (PDF)",
    mat_client: "Windows 11 + Azure (PDF)",
    footer_text: "Construit pentru invatare practica IT (RO/EN) cu materialele tale existente."
  },
  en: {
    nav_modules: "Modules",
    nav_labs: "Mini Labs",
    nav_resources: "Resources",
    nav_materials: "Materials",
    hero_badge: "Hands-on learning program",
    hero_title: "Windows Server 2022, Windows 11, Microsoft 365 and Azure",
    hero_subtitle: "Learn in Romanian and English step by step, with PowerShell commands, mini labs, and video materials.",
    hero_cta: "Start learning",
    modules_title: "Learning modules",
    server_desc: "AD DS, accounts, file server, print server, management, and disk administration.",
    win11_desc: "Client setup, security, updates, productivity, and troubleshooting.",
    m365_desc: "User administration, licensing, Exchange Online, Teams, and core security.",
    azure_desc: "Resource groups, VMs, storage, networking, and monitoring.",
    view_materials: "View materials",
    practice_lab: "Practice in lab",
    labs_title: "Guided mini labs",
    lab1_title: "Lab 1: Fast Active Directory",
    lab1_step1: "Install AD DS on Windows Server 2022.",
    lab1_step2: "Promote the server to a new Domain Controller.",
    lab1_step3: "Create an OU, user, and test group.",
    lab2_title: "Lab 2: Windows 11 hardening",
    lab2_step1: "Enable BitLocker on the OS drive.",
    lab2_step2: "Configure Windows Defender Firewall profiles.",
    lab2_step3: "Check update status.",
    lab3_title: "Lab 3: Microsoft 365 onboarding",
    lab3_step1: "Connect to Microsoft Graph PowerShell.",
    lab3_step2: "Create a cloud test user.",
    lab3_step3: "Assign an available license.",
    lab4_title: "Lab 4: Azure VM + monitoring",
    lab4_step1: "Create a lab resource group.",
    lab4_step2: "Provision a Windows VM.",
    lab4_step3: "Review baseline metrics.",
    resources_title: "Useful videos and images",
    media1_desc: "Official channel with Windows, Azure, and Microsoft 365 technical demos.",
    media2_desc: "Official learning paths for certifications and hands-on labs.",
    materials_title: "Your integrated materials",
    mat_server: "Windows Server 2022 (PDF)",
    mat_client: "Windows 11 + Azure (PDF)",
    footer_text: "Built for practical IT learning (RO/EN) using your existing materials."
  }
};

let currentLang = "ro";
const toggle = document.getElementById("langToggle");

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  toggle.textContent = lang === "ro" ? "EN" : "RO";
}

toggle.addEventListener("click", () => {
  applyLang(currentLang === "ro" ? "en" : "ro");
});

applyLang("ro");
