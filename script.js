const buildCard = (item) => {
  const summaryEn = item.summaryEn || item.summary;
  const labEn = item.labEn || item.lab;
  const stepsRo = item.steps.map((s) => `<li>${s}</li>`).join("");
  const stepsEn = (item.stepsEn || item.steps).map((s) => `<li>${s}</li>`).join("");
  const checksRo = item.verify.map((v) => `<li>${v}</li>`).join("");
  const checksEn = (item.verifyEn || item.verify).map((v) => `<li>${v}</li>`).join("");
  const cmds = item.commands.join("\n");
  return `
    <article class="card chapter searchable" data-search="${(item.title + " " + item.summary + " " + item.tags).toLowerCase()}">
      <div class="chapter-top">
        <h3>${item.title}</h3>
        <label class="done"><input type="checkbox" data-progress="${item.id}"/> Done</label>
      </div>
      <p class="ro"><strong>Teorie:</strong> ${item.summary}</p>
      <p class="en"><strong>Theory:</strong> ${summaryEn}</p>
      <details>
        <summary><span class="ro">Plan de lucru + validare + mini-lab</span><span class="en">Workflow + validation + mini-lab</span></summary>
        <p class="ro"><strong>Pasi:</strong></p>
        <p class="en"><strong>Steps:</strong></p>
        <ol class="ro">${stepsRo}</ol>
        <ol class="en">${stepsEn}</ol>
        <p class="ro"><strong>Verificare:</strong></p>
        <p class="en"><strong>Validation:</strong></p>
        <ul class="ro">${checksRo}</ul>
        <ul class="en">${checksEn}</ul>
        <p class="ro"><strong>Mini-lab:</strong> ${item.lab}</p>
        <p class="en"><strong>Mini-lab:</strong> ${labEn}</p>
      </details>
      <p class="ro"><strong>Comenzi utile:</strong></p>
      <p class="en"><strong>Useful commands:</strong></p>
      <pre><code>${cmds}</code></pre>
    </article>
  `;
};

const datasets = {
  serverChapters: [
    {
      id: "sv00",
      title: "00. Inleiding - Fundament",
      summary: "Diferente client/server, editii, roluri, cerinte, design logic de infrastructura.",
      tags: "windows server fundament editie roluri",
      steps: [
        "Defineste roluri server (DC, file, print, management).",
        "Stabileste standardul de naming si IP plan.",
        "Documenteaza baseline-ul de securitate si administrare."
      ],
      verify: [
        "Exista document de design aprobat.",
        "Serverul are configuratie de baza coerenta."
      ],
      lab: "Creeaza documentul de infrastructura pentru o firma cu 3 departamente.",
      commands: [
        "Get-ComputerInfo | Select WindowsProductName,WindowsVersion",
        "Get-NetIPConfiguration",
        "hostname"
      ]
    },
    {
      id: "sv01",
      title: "01. Active Directory Domain Services",
      summary: "Forest, domain, OU, trust, FSMO, autentificare si replicare AD DS.",
      tags: "active directory domain services kerberos fsmo",
      steps: [
        "Instaleaza AD DS + DNS.",
        "Promoveaza Domain Controller.",
        "Configureaza functional level si valideaza health."
      ],
      verify: [
        "Domain-ul raspunde corect.",
        "dcdiag nu arata erori critice."
      ],
      lab: "Creeaza domeniul academy.local si adauga un al doilea DC pentru redundanta.",
      commands: [
        "Install-WindowsFeature AD-Domain-Services,DNS -IncludeManagementTools",
        "Install-ADDSForest -DomainName 'academy.local' -DomainNetbiosName 'ACADEMY'",
        "Get-ADForest; Get-ADDomain",
        "dcdiag /v"
      ]
    },
    {
      id: "sv02",
      title: "02. Accounts si Object Management",
      summary: "Managementul obiectelor AD: users, groups, OU, delegation, RSAT.",
      tags: "accounts users groups ou delegation rsat",
      steps: [
        "Proiecteaza OU structure pe departamente.",
        "Creeaza grupuri pe model AGDLP.",
        "Deleaga task-uri catre helpdesk."
      ],
      verify: [
        "Utilizatorii si grupurile sunt standardizate.",
        "Delegarea functioneaza fara Domain Admin."
      ],
      lab: "Creeaza OU HR/IT/FIN, grupuri GG si atribuie useri pe departament.",
      commands: [
        "New-ADOrganizationalUnit -Name 'HR' -Path 'DC=academy,DC=local'",
        "New-ADUser -Name 'Test User' -SamAccountName tuser -Enabled $true -AccountPassword (ConvertTo-SecureString 'P@ssw0rd!' -AsPlainText -Force)",
        "New-ADGroup -Name 'GG-HR-RW' -GroupScope Global -GroupCategory Security",
        "Add-ADGroupMember -Identity 'GG-HR-RW' -Members tuser"
      ]
    },
    {
      id: "sv03",
      title: "03. File Server",
      summary: "NTFS security, share security, quotas, ownership, encryptie si best practices.",
      tags: "file server ntfs smb share quota",
      steps: [
        "Instaleaza FS role + FSRM.",
        "Construieste share-uri cu permisiuni corecte.",
        "Activeaza quota pe foldere critice."
      ],
      verify: [
        "Accesul e controlat corect.",
        "Quota blocheaza depasirile."
      ],
      lab: "Configureaza share Finance$ cu acces doar pentru GG-Finance-RW.",
      commands: [
        "Install-WindowsFeature FS-FileServer,FS-Resource-Manager -IncludeManagementTools",
        "New-Item -Path C:\\Shares\\Finance -ItemType Directory",
        "New-SmbShare -Name 'Finance$' -Path C:\\Shares\\Finance -FullAccess 'Domain Admins'",
        "icacls C:\\Shares\\Finance /grant 'ACADEMY\\GG-Finance-RW:(OI)(CI)M'"
      ]
    },
    {
      id: "sv04",
      title: "04. Gebruikersomgeving si GPO",
      summary: "Home directories, roaming profiles, logon scripts, Group Policy processing.",
      tags: "gpo home folder roaming profile",
      steps: [
        "Configureaza home folder mapping.",
        "Aplica GPO baseline pe OU.",
        "Valideaza precedence/filtering."
      ],
      verify: [
        "gpresult confirma aplicarea politicilor.",
        "Setarile userului sunt consistente."
      ],
      lab: "Creeaza GPO Baseline-Users cu mapare H: si policy de parola.",
      commands: [
        "New-GPO -Name 'Baseline-Users'",
        "New-GPLink -Name 'Baseline-Users' -Target 'OU=Users,DC=academy,DC=local'",
        "gpupdate /force",
        "gpresult /r"
      ]
    },
    {
      id: "sv05",
      title: "05. Printerbeheer",
      summary: "Print management centralizat: queue, drivere, ACL si deployment.",
      tags: "printerbeheer print management",
      steps: [
        "Instaleaza Print Server role.",
        "Adauga port si imprimanta.",
        "Distribuie printerele pe grupuri."
      ],
      verify: [
        "Print test reusit pentru grup tinta.",
        "Queue management functioneaza."
      ],
      lab: "Deployeaza imprimanta HR-Printer doar pentru grupul GG-HR-Print.",
      commands: [
        "Install-WindowsFeature Print-Server -IncludeManagementTools",
        "Add-PrinterPort -Name 'IP_192.168.10.50' -PrinterHostAddress '192.168.10.50'",
        "Add-Printer -Name 'HR-Printer' -DriverName 'Microsoft IPP Class Driver' -PortName 'IP_192.168.10.50'",
        "Get-Printer"
      ]
    },
    {
      id: "sv06",
      title: "06. Serverbeheer",
      summary: "Administrare remote, MMC custom, event monitoring, task control.",
      tags: "serverbeheer rdp mmc event viewer",
      steps: [
        "Activeaza RDP securizat.",
        "Construieste consola MMC pe roluri.",
        "Monitorizeaza event logs operationale."
      ],
      verify: [
        "Administrarea remote functioneaza corect.",
        "Evenimentele critice sunt monitorizate."
      ],
      lab: "Configureaza monitorizare pentru restart servicii critice.",
      commands: [
        "Enable-NetFirewallRule -DisplayGroup 'Remote Desktop'",
        "Get-Service | Where-Object {$_.Status -eq 'Running'}",
        "Get-WinEvent -LogName System -MaxEvents 30"
      ]
    },
    {
      id: "sv07",
      title: "07. Disk Management",
      summary: "Partitii, volume, basic/dynamic disk, operations si mentenanta storage.",
      tags: "disk management partition volume",
      steps: [
        "Initializeaza discuri noi.",
        "Creeaza partition/volume standards.",
        "Testeaza integritatea storage."
      ],
      verify: [
        "Volumele sunt online si formatate.",
        "Spatiul e monitorizat."
      ],
      lab: "Creeaza volumul DATA pe Disk 1 si valideaza mount/format.",
      commands: [
        "Get-Disk",
        "Initialize-Disk -Number 1 -PartitionStyle GPT",
        "New-Partition -DiskNumber 1 -UseMaximumSize -DriveLetter F",
        "Format-Volume -DriveLetter F -FileSystem NTFS -NewFileSystemLabel 'DATA'"
      ]
    }
  ],
  win11Chapters: Array.from({ length: 18 }, (_, i) => ({
    id: `w11${i + 1}`,
    title: `${i + 1}. ${[
      "Windows 11 Intro",
      "Instalare",
      "Accounts",
      "Werkomgeving",
      "Browser",
      "Bestandsbeheer",
      "Bestandssysteem",
      "Storage",
      "Networking",
      "Printing",
      "Software",
      "Hardware",
      "Security",
      "Services & Processes",
      "Advanced Config",
      "Troubleshooting Tools",
      "User Support",
      "Recovery"
    ][i]}`,
    summary: [
      "Windows as a service, editii, hardware compatibility.",
      "Install media, deployment, activation, updates.",
      "Local/Microsoft/Domain/Entra accounts si UAC.",
      "Desktop, taskbar, start si workflow settings.",
      "Edge management si securizare browser.",
      "File Explorer, OneDrive, search, organizare.",
      "NTFS rights, ownership, compression, encryption.",
      "Disk management, diskpart, volume tasks.",
      "TCP/IP, hostnames, sharing, workgroup/domain.",
      "Printer setup si management.",
      "Install/remove software and features.",
      "Drivers, devices, PnP.",
      "Defender, firewall, SmartScreen.",
      "Service/process/task scheduling.",
      "Settings, control panel, registry/policies.",
      "PerfMon, Event Viewer, Task Manager diagnostics.",
      "Remote support si documentatie tehnica.",
      "Backup, restore, reset, recovery procedures."
    ][i],
    tags: "windows 11 syllabus chapter",
    steps: [
      "Studiaza teoria capitolului.",
      "Executa configuratia practica din capitol.",
      "Documenteaza rezultatele in jurnalul de curs."
    ],
    verify: [
      "Verificarea practica trece fara erori critice.",
      "Configuratia poate fi repetata de la zero."
    ],
    lab: `Executa mini-labul capitolului ${i + 1} intr-un mediu controlat.`,
    commands: [
      "Get-ComputerInfo | Select OsName,WindowsVersion",
      "Get-Service | Select -First 5",
      "Get-EventLog -LogName System -Newest 5"
    ]
  })),
  azureChapters: [
    "Inleiding Cloud",
    "Toegang Azure",
    "Virtuele Machines",
    "Storage",
    "Netwerking",
    "Webapplicatie",
    "Database",
    "Kostenbeheer",
    "Voor wie meer wil",
    "Multifactor Authentication"
  ].map((title, idx) => ({
    id: `az${idx + 1}`,
    title: `${idx + 1}. ${title}`,
    summary: "Capitol Azure aliniat pe syllabus, cu orientare practica si validare operationala.",
    tags: "azure cloud portal vm storage nsg mfa",
    steps: [
      "Studiaza conceptele de baza.",
      "Realizeaza setup-ul din capitol in Azure.",
      "Valideaza cost/siguranta/functionare."
    ],
    verify: [
      "Resursa creata este functionala.",
      "Configuratia respecta bune practici."
    ],
    lab: `Implementare practica pentru capitolul Azure ${idx + 1}.`,
    commands: [
      "Connect-AzAccount",
      "Get-AzSubscription",
      "Get-AzResource | Select -First 10"
    ]
  })),
  m365Chapters: [
    {
      id: "m365-1",
      title: "1. Tenant Foundation",
      summary: "Structura tenant, domenii, branding, organizatie.",
      tags: "m365 tenant domain",
      steps: [
        "Conecteaza-te la Graph.",
        "Verifica organization profile.",
        "Valideaza domeniile."
      ],
      verify: ["Tenant info complet disponibil."],
      lab: "Configureaza un domeniu custom si valideaza-l.",
      commands: [
        "Connect-MgGraph -Scopes Organization.Read.All,Domain.Read.All",
        "Get-MgOrganization",
        "Get-MgDomain"
      ]
    },
    {
      id: "m365-2",
      title: "2. Identity & Access",
      summary: "Users, groups, roles, least privilege.",
      tags: "m365 identity access rbac",
      steps: [
        "Creeaza user/group standards.",
        "Atribuie roluri minime.",
        "Testeaza accesul."
      ],
      verify: ["RBAC functioneaza corect."],
      lab: "Creeaza un user helpdesk cu rol minim necesar.",
      commands: [
        "Get-MgUser -Top 20",
        "Get-MgGroup -Top 20",
        "Get-MgDirectoryRole"
      ]
    },
    {
      id: "m365-3",
      title: "3. Exchange Online",
      summary: "Mailbox lifecycle si mail flow.",
      tags: "exchange online",
      steps: [
        "Provision mailbox.",
        "Testeaza send/receive.",
        "Valideaza reguli de transport."
      ],
      verify: ["Mail flow intern/extern functioneaza."],
      lab: "Configureaza mailbox nou si ruleaza test de livrare.",
      commands: ["Connect-ExchangeOnline", "Get-Mailbox -ResultSize 20"]
    },
    {
      id: "m365-4",
      title: "4. Teams & SharePoint",
      summary: "Teams governance si colaborare SharePoint/OneDrive.",
      tags: "teams sharepoint onedrive",
      steps: [
        "Configureaza teams policies.",
        "Configureaza sharing policy.",
        "Valideaza access model."
      ],
      verify: ["Politicile se aplica per grup tinta."],
      lab: "Creeaza Team proiect + site SharePoint cu permisiuni controlate.",
      commands: [
        "Get-Team",
        "Connect-SPOService -Url https://contoso-admin.sharepoint.com",
        "Get-SPOSite -Limit 20"
      ]
    }
  ],
  powershellChapters: [
    {
      id: "ps1",
      title: "1. PowerShell Fundamentals",
      summary: "Cmdlets, objects, pipeline, help, module discovery.",
      tags: "powershell fundamentals",
      steps: [
        "Invata Verb-Noun.",
        "Exploreaza module/cmdlets.",
        "Ruleaza pipeline-uri simple."
      ],
      verify: ["Poti compune comenzi utile independent."],
      lab: "Creeaza un raport simplu servicii active.",
      commands: [
        "Get-Command",
        "Get-Help Get-Service -Full",
        "Get-Service | Where-Object Status -eq Running"
      ]
    },
    {
      id: "ps2",
      title: "2. Scripting & Automation",
      summary: "Scripturi, functii, parametri, error handling, logs.",
      tags: "powershell scripting automation",
      steps: [
        "Scrie script cu parametri.",
        "Adauga try/catch.",
        "Logheaza output-ul."
      ],
      verify: ["Scriptul ruleaza robust si repetabil."],
      lab: "Automatizeaza verificarea zilnica a serviciilor critice.",
      commands: [
        "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser",
        "try { Get-Process } catch { $_ }",
        "Start-Transcript -Path .\\session.log"
      ]
    }
  ],
  cmdChapters: [
    {
      id: "cmd1",
      title: "1. Networking CMD Kit",
      summary: "Diagnostic rapid retea cu comenzi clasice CMD.",
      tags: "cmd ipconfig ping tracert netstat nslookup",
      steps: [
        "Colecteaza configuratia IP.",
        "Testeaza reachability.",
        "Inspecteaza rutele/conexiunile."
      ],
      verify: ["Poti identifica punctul de defect."],
      lab: "Ruleaza un diagnostic complet pe un client cu probleme de DNS.",
      commands: [
        "ipconfig /all",
        "ping 8.8.8.8",
        "tracert 8.8.8.8",
        "nslookup academy.local",
        "netstat -ano"
      ]
    },
    {
      id: "cmd2",
      title: "2. System CMD Kit",
      summary: "Comenzi de sistem, procese, servicii, integritate.",
      tags: "cmd systeminfo tasklist sc sfc dism",
      steps: [
        "Verifica procesele active.",
        "Verifica serviciile.",
        "Ruleaza scan de integritate."
      ],
      verify: ["Ai raport clar de stare sistem."],
      lab: "Genereaza baseline de sanatate pentru un endpoint.",
      commands: [
        "systeminfo",
        "tasklist",
        "sc query",
        "sfc /scannow",
        "DISM /Online /Cleanup-Image /RestoreHealth"
      ]
    }
  ],
  troubleChapters: [
    {
      id: "tr1",
      title: "1. AD Login Incident",
      summary: "User nu se autentifica in domeniu.",
      tags: "troubleshooting ad login",
      steps: [
        "Verifica DNS si DC discoverability.",
        "Verifica lockout events.",
        "Reseteaza datele daca este necesar."
      ],
      verify: ["Login reusit post-remediere."],
      lab: "Simuleaza si rezolva un cont lockout.",
      commands: [
        "nltest /dsgetdc:academy.local",
        "ipconfig /all",
        "Get-WinEvent -LogName Security -MaxEvents 50"
      ]
    },
    {
      id: "tr2",
      title: "2. GPO Apply Failure",
      summary: "GPO nu se aplica pe client.",
      tags: "troubleshooting gpo",
      steps: [
        "Ruleaza gpupdate/gpresult.",
        "Verifica OU link si security filtering.",
        "Corecteaza precedence/conflict."
      ],
      verify: ["Setarile GPO se aplica pe client."],
      lab: "Depaneaza un GPO care nu mapeaza drive-ul H:.",
      commands: ["gpupdate /force", "gpresult /h c:\\temp\\gpo.html"]
    },
    {
      id: "tr3",
      title: "3. Azure VM Access Failure",
      summary: "VM indisponibila la RDP/SSH.",
      tags: "troubleshooting azure vm nsg",
      steps: [
        "Verifica NSG si NIC rules.",
        "Verifica status VM.",
        "Verifica public IP assignment."
      ],
      verify: ["Conexiunea remote este restabilita."],
      lab: "Depaneaza un VM blocat de NSG.",
      commands: [
        "Get-AzVM -Status -ResourceGroupName rg-lab -Name vm-lab",
        "Get-AzNetworkSecurityGroup"
      ]
    }
  ]
};

Object.entries(datasets).forEach(([id, list]) => {
  const container = document.getElementById(id);
  container.innerHTML = list.map(buildCard).join("");
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll(".searchable").forEach((card) => {
    const hay = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
    card.classList.toggle("hidden", q && !hay.includes(q));
  });
});

const langToggle = document.getElementById("langToggle");
const LANG_KEY = "academy_lang_v3";
function applyLang(lang) {
  const en = lang === "en";
  document.body.classList.toggle("lang-en", en);
  document.documentElement.lang = en ? "en" : "ro";
  langToggle.textContent = en ? "RO" : "EN";
  localStorage.setItem(LANG_KEY, lang);
}
langToggle.addEventListener("click", () => {
  applyLang(document.body.classList.contains("lang-en") ? "ro" : "en");
});
applyLang(localStorage.getItem(LANG_KEY) === "en" ? "en" : "ro");

const PROGRESS_KEY = "academy_progress_v3";
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const boxes = Array.from(document.querySelectorAll("input[data-progress]"));
let progress = {};
try {
  progress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
} catch {
  progress = {};
}

function renderProgress() {
  const total = boxes.length || 1;
  let done = 0;
  boxes.forEach((b) => {
    if (b.checked) done += 1;
  });
  const pct = Math.round((done / total) * 100);
  progressFill.style.width = `${pct}%`;
  progressText.textContent = `${pct}% (${done}/${total})`;
}

boxes.forEach((box) => {
  const key = box.dataset.progress;
  box.checked = Boolean(progress[key]);
  box.addEventListener("change", () => {
    progress[key] = box.checked;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    renderProgress();
  });
});
renderProgress();
