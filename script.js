const db = {
  serverModules: [
    {
      title: "00. Inleiding - Fundamente Windows Server",
      source: "00-Inleiding.pdf",
      meaning: "Diferente Client vs Server, editii, interface type, cerinte sistem, schema de laborator.",
      steps: [
        "Defineste rolurile serverului in organizatie (DC, file, print, management).",
        "Alege editie Server 2022 conform scenariului (Standard/Datacenter).",
        "Documenteaza schema de retea si naming convention."
      ],
      verify: [
        "Documentul de design include IP plan, hostname si roluri.",
        "Serverul raspunde in retea si are setari de baza valide."
      ],
      commands: [
        "Get-ComputerInfo | Select WindowsProductName,WindowsVersion,OsHardwareAbstractionLayer",
        "Get-NetIPConfiguration",
        "hostname"
      ]
    },
    {
      title: "01. OpzettenDomein - Active Directory Domain Services",
      source: "01-OpzettenDomein.pdf",
      meaning: "AD DS, forests, domains, trees, trust relationships, replicatie, FSMO, functional levels, autentificare Kerberos.",
      steps: [
        "Instaleaza rolurile AD DS + DNS.",
        "Promoveaza serverul la Domain Controller intr-un forest nou.",
        "Valideaza DNS intern si health-ul DC dupa promovare."
      ],
      verify: [
        "Exista forest si domain functional.",
        "dcdiag si DNS checks nu raporteaza erori critice."
      ],
      commands: [
        "Install-WindowsFeature AD-Domain-Services,DNS -IncludeManagementTools",
        "Install-ADDSForest -DomainName 'academy.local' -DomainNetbiosName 'ACADEMY'",
        "Get-ADForest; Get-ADDomain",
        "dcdiag /v"
      ]
    },
    {
      title: "02. Accounts - Obiecte in Active Directory",
      source: "02-Accounts.pdf",
      meaning: "Security principals, OU planning, ADUC, RSAT, utilizatori, grupuri, delegare de administrare.",
      steps: [
        "Construieste OU structure pentru Users, Computers, Servers, Groups.",
        "Creeaza user/group standards cu naming consistent.",
        "Deleaga management unde este nevoie (helpdesk/department admins)."
      ],
      verify: [
        "Obiectele AD sunt organizate pe OUs corecte.",
        "Delegarea functioneaza fara a oferi Domain Admin inutil."
      ],
      commands: [
        "New-ADOrganizationalUnit -Name 'Users' -Path 'DC=academy,DC=local'",
        "New-ADUser -Name 'Ana Pop' -SamAccountName apop -Enabled $true -AccountPassword (ConvertTo-SecureString 'P@ssw0rd!' -AsPlainText -Force)",
        "New-ADGroup -Name 'GG-IT-Helpdesk' -GroupScope Global -GroupCategory Security",
        "Add-ADGroupMember -Identity 'GG-IT-Helpdesk' -Members apop"
      ]
    },
    {
      title: "03. File Server - NTFS, Shares, Quota",
      source: "03-File Server.pdf",
      meaning: "NTFS permissions, encryptie, ownership, quota, File Server role si best-practices de acces.",
      steps: [
        "Instaleaza rolul File Server + FSRM.",
        "Creeaza share-uri pe model AGDLP (fara permisiuni direct pe user).",
        "Configureaza quota si file screening unde este cazul."
      ],
      verify: [
        "Utilizatorii vad doar datele autorizate.",
        "Quota este aplicata si monitorizata."
      ],
      commands: [
        "Install-WindowsFeature FS-FileServer,FS-Resource-Manager -IncludeManagementTools",
        "New-Item -Path C:\\Shares\\Finance -ItemType Directory",
        "New-SmbShare -Name 'Finance$' -Path C:\\Shares\\Finance -FullAccess 'Domain Admins'",
        "icacls C:\\Shares\\Finance /grant 'ACADEMY\\GG-Finance-RW:(OI)(CI)M'"
      ]
    },
    {
      title: "04. Gebruikersomgeving - User Environment & GPO",
      source: "04-Gebruikersomgeving.pdf",
      meaning: "Home directories, roaming profiles, logon scripts, Group Policy management, filtering si precedence.",
      steps: [
        "Configureaza home folder mapping standard pentru utilizatori.",
        "Construieste GPO baseline pentru user/computer.",
        "Testeaza policy application cu gpresult si RSOP."
      ],
      verify: [
        "User profile settings sunt consistente la logon.",
        "GPO links si filtering functioneaza corect."
      ],
      commands: [
        "New-GPO -Name 'Baseline-Users'",
        "New-GPLink -Name 'Baseline-Users' -Target 'OU=Users,DC=academy,DC=local'",
        "gpupdate /force",
        "gpresult /r"
      ]
    },
    {
      title: "05. Printerbeheer - Print Management",
      source: "05-Printerbeheer.pdf",
      meaning: "Print server centralizat, drivere, cozi de printare, drepturi pe imprimante si deploy prin GPO.",
      steps: [
        "Instaleaza Print Server role.",
        "Adauga imprimantele (auto sau manual) in Print Management.",
        "Configureaza deploy pentru grupuri de utilizatori/computere."
      ],
      verify: [
        "Imprimantele se mapeaza automat catre grupul tinta.",
        "Drepturile de print sunt aplicate corect."
      ],
      commands: [
        "Install-WindowsFeature Print-Server -IncludeManagementTools",
        "Add-PrinterPort -Name 'IP_192.168.10.50' -PrinterHostAddress '192.168.10.50'",
        "Add-Printer -Name 'Office-Printer' -DriverName 'Microsoft IPP Class Driver' -PortName 'IP_192.168.10.50'",
        "Get-Printer"
      ]
    },
    {
      title: "06. Serverbeheer - Remote & Monitoring",
      source: "06-Serverbeheer.pdf",
      meaning: "Remote Desktop, MMC custom console, Task Manager, Services, Event Viewer, automatizari pe event.",
      steps: [
        "Activeaza RDP in mod securizat.",
        "Construieste console administrative MMC pe roluri.",
        "Seteaza monitorizare de baza pe logs si servicii critice."
      ],
      verify: [
        "Administrarea remote functioneaza controlat.",
        "Evenimentele critice sunt usor de filtrat si urmarit."
      ],
      commands: [
        "Enable-NetFirewallRule -DisplayGroup 'Remote Desktop'",
        "Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name fDenyTSConnections -Value 0",
        "Get-Service | Where-Object {$_.Status -eq 'Running'}",
        "Get-WinEvent -LogName System -MaxEvents 30"
      ]
    },
    {
      title: "07. Disk Management - Volumes & RAID",
      source: "07-Disk Management.pdf",
      meaning: "Initialize disk, basic vs dynamic, partitioning, mounted folders, RAID concepte, DiskPart examples.",
      steps: [
        "Initializeaza si partitioneaza discurile noi.",
        "Aloca litere sau mount points dupa standard.",
        "Documenteaza strategia RAID si recovery."
      ],
      verify: [
        "Volumele sunt online si formatate corect.",
        "Structura storage respecta designul operational."
      ],
      commands: [
        "Get-Disk",
        "Initialize-Disk -Number 1 -PartitionStyle GPT",
        "New-Partition -DiskNumber 1 -UseMaximumSize -DriveLetter F",
        "Format-Volume -DriveLetter F -FileSystem NTFS -NewFileSystemLabel 'DATA'"
      ]
    },
    {
      title: "Virtualbox Windows Server Router - Lab Topology",
      source: "Virtualbox Windows Server Router.pdf",
      meaning: "Topologie de laborator cu 2 NIC (internet + LAN intern), IP plan, RAS/NAT adaptat pentru medii de training.",
      steps: [
        "Configureaza adaptoarele conform topologiei din curs.",
        "Seteaza IP fix pe interfata interna.",
        "Testeaza conectivitate intre clienti si DC."
      ],
      verify: [
        "Reteaua interna functioneaza fara conflicte.",
        "Clientii pot rezolva DNS in domeniu si accesa resursele."
      ],
      commands: [
        "Get-NetAdapter",
        "New-NetIPAddress -InterfaceAlias 'Ethernet 2' -IPAddress 10.10.10.1 -PrefixLength 24",
        "Test-NetConnection SRV-DC01 -Port 53"
      ]
    }
  ],
  win11Modules: [
    { title: "1. Windows 11 introductie", meaning: "Windows as a Service, editie, hardware, compatibilitate.", steps: ["Analizeaza canalele de update.", "Alege editia corecta pentru scenariu.", "Verifica cerintele hardware."], verify: ["Device-ul este eligibil pentru Windows 11.", "Strategia de update este clara."], commands: ["Get-ComputerInfo | Select OsName,WindowsVersion", "Confirm-SecureBootUEFI"] },
    { title: "2. Instalarea Windows 11", meaning: "Media instalare, instalare, activare, updates.", steps: ["Pregateste media.", "Instaleaza OS pe scenariul dat.", "Activeaza si actualizeaza sistemul."], verify: ["Windows este activat.", "Nu exista update-uri critice restante."], commands: ["slmgr /xpr", "Get-WindowsUpdateLog"] },
    { title: "3. Accounts", meaning: "Conturi locale, Microsoft, AD, Entra ID, UAC.", steps: ["Configureaza tipurile de cont.", "Aplica reguli de parole.", "Valideaza UAC si rights."], verify: ["Autentificarea functioneaza pe toate tipurile de cont."], commands: ["Get-LocalUser", "whoami /groups"] },
    { title: "4. Werkomgeving", meaning: "Desktop, start menu, taskbar, UX settings.", steps: ["Configureaza taskbar/start.", "Seteaza profile de lucru."], verify: ["Interfata este standardizata pe useri."], commands: ["Get-StartApps"] },
    { title: "5. Browser (Edge)", meaning: "Navigare enterprise, securitate browser, management setari.", steps: ["Configureaza browser policies.", "Valideaza profile/work data separation."], verify: ["Politicile browser se aplica."], commands: ["Get-AppxPackage *MicrosoftEdge*"] },
    { title: "6. Bestandsbeheer", meaning: "File Explorer, OneDrive, search, organizare fisiere.", steps: ["Defineste structura fisiere.", "Configureaza OneDrive basics."], verify: ["Fisierele sunt organizate si accesibile corect."], commands: ["Get-ChildItem $env:USERPROFILE -Depth 1"] },
    { title: "7. Bestandssysteem", meaning: "NTFS, compresie, encriptie, ownership, ACL.", steps: ["Aplica ACL corecte.", "Testeaza EFS/BitLocker unde e nevoie."], verify: ["Permisiunile reflecta modelul de securitate."], commands: ["icacls C:\\Temp", "cipher /c C:\\Temp"] },
    { title: "8. Beheer van opslagruimten", meaning: "Disk management cu GUI, DiskPart, PowerShell.", steps: ["Initializeaza discuri.", "Creeaza/gestioneaza volume."], verify: ["Volumele sunt valide si monitorizate."], commands: ["Get-Disk", "Get-Volume"] },
    { title: "9. Windows 11 in netwerkomgeving", meaning: "TCP/IP, host names, sharing, domain/workgroup.", steps: ["Configureaza IP si DNS.", "Join in domeniu si test sharing."], verify: ["Conectivitatea si sharing functioneaza."], commands: ["ipconfig /all", "Test-NetConnection SRV-DC01"] },
    { title: "10. Afdrukken", meaning: "Instalare si management imprimante locale/retea.", steps: ["Instaleaza printer.", "Testeaza queue si rights."], verify: ["Print job-urile ruleaza corect."], commands: ["Get-Printer", "Get-PrintJob"] },
    { title: "11. Software installeren", meaning: "Instalare/dezinstalare, compatibilitate, Windows Features.", steps: ["Instaleaza aplicatii aprobate.", "Configureaza asociatii de fisiere."], verify: ["Aplicatiile functioneaza conform politicii."], commands: ["Get-WindowsOptionalFeature -Online"] },
    { title: "12. Hardware", meaning: "Drivers, device management, Plug and Play.", steps: ["Verifica device state.", "Remediaza drivere neconforme."], verify: ["Nu exista device-uri cu erori critice."], commands: ["Get-PnpDevice | Where-Object Status -ne 'OK'"] },
    { title: "13. Elementaire beveiliging", meaning: "Malware basics, Windows Security, Defender, Firewall, SmartScreen.", steps: ["Configureaza protectia endpoint.", "Valideaza profile firewall."], verify: ["Statusul securitatii endpoint este healthy."], commands: ["Get-MpComputerStatus", "Get-NetFirewallProfile"] },
    { title: "14. Services en processen", meaning: "Services, procese, Task Scheduler.", steps: ["Monitorizeaza servicii esentiale.", "Automatizeaza task-uri repetitive."], verify: ["Serviciile critice sunt up si job-urile ruleaza."], commands: ["Get-Service", "Get-ScheduledTask | Select TaskName,State -First 20"] },
    { title: "15. Verdere configuratie", meaning: "Settings, Control Panel, Policies, Registry.", steps: ["Aplica baseline de configurare.", "Documenteaza schimbari in registry/policies."], verify: ["Configuratia este reproducibila si auditabila."], commands: ["Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion"] },
    { title: "16. Troubleshooting tools", meaning: "System info, Task Manager, Resource Monitor, PerfMon, Event Viewer.", steps: ["Ruleaza diagnostic pe simptome.", "Coreleaza logs cu performanta."], verify: ["Cauza incidentului este identificata."], commands: ["Get-EventLog -LogName System -Newest 20"] },
    { title: "17. User support tools", meaning: "Suport remote si documentare operationala.", steps: ["Foloseste sesiuni remote securizate.", "Documenteaza remedierea."], verify: ["Ticket-ul include root cause + fix."], commands: ["Get-Help Get-Process -Online"] },
    { title: "18. Recovery", meaning: "File History, Backup & Restore, System Restore, Recovery, Reset, BCD.", steps: ["Configureaza backup si restore points.", "Testeaza scenarii de recuperare."], verify: ["Sistemul poate fi restaurat dupa incident."], commands: ["reagentc /info", "wbadmin get versions"] }
  ],
  azureModules: [
    { title: "1. Inleiding Cloud", meaning: "Cloud basics, proprietati, service models, cloud models.", steps: ["Compara IaaS/PaaS/SaaS pe cazuri reale.", "Alege modelul potrivit."], verify: ["Modelul ales este justificat tehnic si financiar."], commands: ["az account show"] },
    { title: "2. Toegang tot Azure", meaning: "Subscriptions, Portal, Cloud Shell, student benefits.", steps: ["Configureaza subscription activa.", "Valideaza accesul din portal si CLI."], verify: ["Contextul de subscription este corect."], commands: ["Connect-AzAccount", "Get-AzSubscription"] },
    { title: "3. Virtuele machines", meaning: "Resource groups, region, creare VM, conectare, stop/start corect.", steps: ["Creeaza RG.", "Creeaza VM cu configuratie minima.", "Testeaza conectivitate."], verify: ["VM este accesibila si administrabila."], commands: ["New-AzResourceGroup -Name rg-lab -Location westeurope", "New-AzVM -ResourceGroupName rg-lab -Name vm-lab -Location westeurope", "Get-AzVM -Status"] },
    { title: "4. Storage", meaning: "Tipuri storage, storage account, upload, Storage Explorer.", steps: ["Creeaza storage account.", "Incarca si valideaza date."], verify: ["Datele sunt accesibile conform politicii."], commands: ["New-AzStorageAccount -ResourceGroupName rg-lab -Name stlabdemo001 -SkuName Standard_LRS -Location westeurope"] },
    { title: "5. Netwerking", meaning: "VNet, subnet, NSG, private/public IP.", steps: ["Creeaza VNet + subnet.", "Aplica NSG rules minime."], verify: ["Traficul permis/blocat este conform designului."], commands: ["Get-AzVirtualNetwork", "Get-AzNetworkSecurityGroup"] },
    { title: "6. Webapplicatie", meaning: "App Service Plan, Web App, custom domains.", steps: ["Creeaza App Service Plan.", "Deploy web app."], verify: ["Aplicatia raspunde public conform configuratiei."], commands: ["New-AzAppServicePlan -Name asp-lab -Location westeurope -ResourceGroupName rg-lab -Tier Free", "New-AzWebApp -Name web-lab-demo-001 -Location westeurope -AppServicePlan asp-lab -ResourceGroupName rg-lab"] },
    { title: "7. Database", meaning: "Azure SQL Database provisioning si conexiune.", steps: ["Creeaza SQL logical server.", "Creeaza DB si reguli de acces."], verify: ["Conexiunea la DB este functionala."], commands: ["Get-AzSqlServer", "Get-AzSqlDatabase"] },
    { title: "8. Kostenbeheer", meaning: "Cost Management, pricing calculator, control buget.", steps: ["Seteaza budget alert.", "Monitorizeaza cost trend."], verify: ["Costurile sunt urmarite si controlate."], commands: ["Get-AzConsumptionUsageDetail -StartDate (Get-Date).AddDays(-30) -EndDate (Get-Date)"] },
    { title: "9. Voor wie meer wil", meaning: "Extensii pentru aprofundare: monitorizare, governance, automation.", steps: ["Adauga tagging si policy.", "Testeaza automation accounts."], verify: ["Resursele respecta governance rules."], commands: ["Get-AzResource | Select Name,ResourceType -First 20"] },
    { title: "10. Multifactor Authentication", meaning: "MFA si protectia identitatii in Entra ID.", steps: ["Analizeaza metode de autentificare.", "Aplicare politici MFA."], verify: ["Utilizatorii tintiti sunt acoperiti de MFA."], commands: ["Connect-MgGraph -Scopes Policy.Read.All", "Get-MgPolicyAuthenticationMethodPolicy"] }
  ],
  m365Modules: [
    { title: "1. Tenant Foundation", meaning: "Structura tenant, domenii, branding, setari organizationale.", steps: ["Verifica domeniul principal.", "Configureaza domeniu custom."], verify: ["Domeniul este validat in tenant."], commands: ["Connect-MgGraph -Scopes Organization.Read.All,Domain.Read.All", "Get-MgOrganization", "Get-MgDomain"] },
    { title: "2. Identity & Access", meaning: "Utilizatori, grupuri, roluri administrative, least privilege.", steps: ["Creeaza user + group model.", "Atribuie roluri strict necesare."], verify: ["RBAC este aplicat corect."], commands: ["Get-MgUser -Top 20", "Get-MgGroup -Top 20", "Get-MgDirectoryRole"] },
    { title: "3. Licensing", meaning: "Planuri licente, asignare pe utilizatori/grupuri, control consum.", steps: ["Analizeaza SKU.", "Asigneaza licente targetat."], verify: ["Licentele active corespund necesitatii."], commands: ["Get-MgSubscribedSku", "Set-MgUserLicense -UserId <userId> -AddLicenses @(@{SkuId='<skuId>'}) -RemoveLicenses @()"] },
    { title: "4. Exchange Online", meaning: "Mailbox provisioning, mail flow, anti-spam policy.", steps: ["Provision mailbox.", "Testeaza transport rules."], verify: ["Mail flow intern/extern functioneaza."], commands: ["Connect-ExchangeOnline", "Get-Mailbox -ResultSize 20"] },
    { title: "5. Teams Administration", meaning: "Teams policies, meetings, governance canale.", steps: ["Creeaza teams standard.", "Aplica meeting policies."], verify: ["Politicile Teams sunt aplicate utilizatorilor tinta."], commands: ["Get-Team", "Get-CsOnlineUser -ResultSize 20"] },
    { title: "6. SharePoint & OneDrive", meaning: "Site collections, sharing policies, data lifecycle.", steps: ["Defineste sharing policy.", "Revizuieste external access."], verify: ["Datele sunt partajate conform politicii."], commands: ["Connect-SPOService -Url https://contoso-admin.sharepoint.com", "Get-SPOSite -Limit 20"] },
    { title: "7. Compliance & DLP", meaning: "Retention, sensitivity labels, DLP rules.", steps: ["Configureaza reguli DLP.", "Testeaza scenarii de scurgere date."], verify: ["Politicile blocheaza/alerteaza corect."], commands: ["Connect-IPPSSession", "Get-DlpCompliancePolicy"] },
    { title: "8. Security Baseline", meaning: "MFA, Conditional Access, secure defaults.", steps: ["Activeaza MFA pentru grupuri critice.", "Seteaza Conditional Access baseline."], verify: ["Logins riscante sunt conditionate."], commands: ["Get-MgIdentityConditionalAccessPolicy"] },
    { title: "9. Monitoring & Reports", meaning: "Audit logs, usage reports, incident review.", steps: ["Activeaza audit logging.", "Revizuieste activity reports."], verify: ["Ai vizibilitate operationala pe tenant."], commands: ["Search-UnifiedAuditLog -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date) -ResultSize 100"] },
    { title: "10. Backup & Continuity", meaning: "Strategii de backup/restore si continuitate operationala in M365.", steps: ["Defineste RPO/RTO.", "Testeaza restore pe scenarii."], verify: ["Runbook de incident este validat."], commands: ["Get-Mailbox | Select DisplayName,WhenCreated"] }
  ],
  powershellModules: [
    { title: "1. Sintaxa si pipeline", meaning: "Cmdlet-uri, obiecte, pipeline, help system.", steps: ["Invata Verb-Noun model.", "Foloseste Get-Help/Get-Command."], verify: ["Poti compune comenzi pipeline corecte."], commands: ["Get-Command", "Get-Help Get-Service -Full", "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10"] },
    { title: "2. Filtrare si selectie", meaning: "Where-Object, Select-Object, sortare, export.", steps: ["Filtreaza date relevante.", "Exporta rezultate in CSV/JSON."], verify: ["Raportul exportat este coerent."], commands: ["Get-Service | Where-Object Status -eq 'Running'", "Get-ADUser -Filter * | Select Name,Enabled | Export-Csv .\\users.csv -NoTypeInformation"] },
    { title: "3. Scripturi si functii", meaning: "Variabile, functii, parametri, control flow.", steps: ["Construieste script reutilizabil.", "Valideaza parametrii."], verify: ["Scriptul ruleaza idempotent."], commands: ["param([string]$Name='World')\nWrite-Host \"Hello $Name\"", "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"] },
    { title: "4. Error handling", meaning: "Try/Catch/Finally, ErrorAction, logging.", steps: ["Gestioneaza exceptii.", "Logheaza erorile utile."], verify: ["Scriptul trateaza erorile controlat."], commands: ["try { Get-Item C:\\no-file.txt -ErrorAction Stop } catch { $_ | Out-File .\\errors.log -Append }"] },
    { title: "5. Remote management", meaning: "PSRemoting, Invoke-Command, sessions.", steps: ["Activeaza remoting securizat.", "Ruleaza comenzi remote."], verify: ["Administrarea remote functioneaza pe servere tinta."], commands: ["Enable-PSRemoting -Force", "Invoke-Command -ComputerName SRV-DC01 -ScriptBlock { Get-Service }"] },
    { title: "6. Automation jobs", meaning: "Scheduled tasks, runbooks, operational scripts.", steps: ["Automatizeaza task-uri repetitive.", "Versioneaza scripturile."], verify: ["Task-urile ruleaza la timp si cu output valid."], commands: ["Register-ScheduledTask -TaskName 'DailyReport' -Action (New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-File C:\\Scripts\\report.ps1') -Trigger (New-ScheduledTaskTrigger -Daily -At 08:00) -User 'SYSTEM' -RunLevel Highest"] }
  ],
  cmdModules: [
    { title: "Networking rapid", meaning: "Diagnostic rapid de conectivitate in CMD.", steps: ["Ruleaza IP/DNS tests.", "Analizeaza route si latency."], verify: ["Identifici unde cade conexiunea."], commands: ["ipconfig /all", "ping 8.8.8.8", "tracert 8.8.8.8", "nslookup academy.local", "netstat -ano"] },
    { title: "Fisier si sistem", meaning: "Comenzi utile pentru fisiere, procese si procese batch.", steps: ["Navigheaza si cauta fisiere.", "Gestioneaza procesele."], verify: ["Poti localiza rapid fisiere/procese."], commands: ["dir /s *.log", "findstr /i error *.log", "tasklist", "taskkill /PID 1234 /F"] },
    { title: "Utilizatori si securitate", meaning: "Inspectie useri si politici locale.", steps: ["Verifica user/group context.", "Analizeaza policy basics."], verify: ["Poti confirma drepturile curente."], commands: ["whoami", "whoami /groups", "net user", "net localgroup administrators"] },
    { title: "Servicii", meaning: "Control servicii din CMD.", steps: ["Verifica starea serviciului.", "Porneste/opreste serviciul."], verify: ["Serviciile critice pot fi controlate rapid."], commands: ["sc query", "sc query w32time", "sc start w32time", "sc stop w32time"] },
    { title: "Discuri", meaning: "Inspectie storage din linie de comanda.", steps: ["Verifica volume si spatiu.", "Ruleaza verificari de integritate."], verify: ["Problemele de disc sunt detectate timpuriu."], commands: ["wmic logicaldisk get caption,freespace,size", "chkdsk C: /scan"] },
    { title: "Sistem", meaning: "Informatii sistem si reparatie de baza.", steps: ["Colecteaza info sistem.", "Ruleaza verificare fisiere sistem."], verify: ["Ai diagnostic minim pentru escalare."], commands: ["systeminfo", "sfc /scannow", "DISM /Online /Cleanup-Image /RestoreHealth"] }
  ],
  troubleshootingModules: [
    { title: "1. AD login failure", meaning: "User nu se poate autentifica in domeniu.", steps: ["Verifica DNS pe client.", "Testeaza reachability DC.", "Revizuieste lockout/password events."], verify: ["User se poate loga normal dupa remediere."], commands: ["ipconfig /all", "nltest /dsgetdc:academy.local", "Get-WinEvent -LogName Security -MaxEvents 50"] },
    { title: "2. GPO not applying", meaning: "Politicile nu se aplica pe user/computer.", steps: ["Ruleaza gpupdate/gpresult.", "Verifica OU link + security filtering."], verify: ["Setarile apar in RSOP si pe client."], commands: ["gpupdate /force", "gpresult /h c:\\temp\\gpo.html"] },
    { title: "3. File share access denied", meaning: "Acces refuzat pe share.", steps: ["Verifica share permission + NTFS ACL.", "Verifica membership in grup."], verify: ["Accesul respecta modelul AGDLP."], commands: ["Get-SmbShareAccess -Name Finance$", "icacls C:\\Shares\\Finance", "whoami /groups"] },
    { title: "4. Print failures", meaning: "Printer queue blocata sau drivere defecte.", steps: ["Curata queue.", "Revizuieste spooler si driver."], verify: ["Joburile ies corect din coada."], commands: ["Get-PrintJob -PrinterName Office-Printer", "Restart-Service Spooler", "Get-PrinterDriver"] },
    { title: "5. Azure VM inaccessible", meaning: "VM nu raspunde la RDP/SSH.", steps: ["Verifica NSG rules.", "Verifica status VM + serial console."], verify: ["Conexiunea remote este restabilita."], commands: ["Get-AzVM -Status -ResourceGroupName rg-lab -Name vm-lab", "Get-AzNetworkSecurityGroup"] },
    { title: "6. M365 sign-in blocked", meaning: "Utilizator blocat de Conditional Access/MFA.", steps: ["Verifica sign-in logs.", "Analizeaza CA policy hit."], verify: ["User se autentifica conform politicii."], commands: ["Get-MgAuditLogSignIn -Top 20", "Get-MgIdentityConditionalAccessPolicy"] },
    { title: "7. Windows performance issue", meaning: "Sistem lent/instabil.", steps: ["Identifica procese consumatoare.", "Verifica event logs + disk health."], verify: ["Performanta revine la baseline."], commands: ["Get-Process | Sort-Object CPU -Descending | Select-Object -First 15", "Get-WinEvent -LogName System -MaxEvents 50", "Get-Volume"] }
  ]
};

function renderModules(containerId, modules) {
  const container = document.getElementById(containerId);
  container.innerHTML = modules.map((m) => `
    <article class="card module searchable" data-search="${(m.title + ' ' + m.meaning + ' ' + (m.source || '')).toLowerCase()}">
      <h3>${m.title}</h3>
      ${m.source ? `<p class="source">Sursa: ${m.source}</p>` : ""}
      <p><strong>Teorie:</strong> ${m.meaning}</p>
      <p><strong>Pasi:</strong></p>
      <ol>${m.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      <p><strong>Verificare:</strong></p>
      <ul>${m.verify.map((v) => `<li>${v}</li>`).join("")}</ul>
      <p><strong>Comenzi:</strong></p>
      <pre><code>${m.commands.join("\n")}</code></pre>
    </article>
  `).join("");
}

renderModules("serverModules", db.serverModules);
renderModules("win11Modules", db.win11Modules);
renderModules("azureModules", db.azureModules);
renderModules("m365Modules", db.m365Modules);
renderModules("powershellModules", db.powershellModules);
renderModules("cmdModules", db.cmdModules);
renderModules("troubleshootingModules", db.troubleshootingModules);

const searchInput = document.getElementById("globalSearch");
searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll(".searchable").forEach((el) => {
    const text = `${el.dataset.search || ""} ${el.textContent}`.toLowerCase();
    el.classList.toggle("hidden", q && !text.includes(q));
  });
});

const langToggle = document.getElementById("langToggle");
const langKey = "portal_lang";
function applyLang(lang) {
  const isEn = lang === "en";
  document.body.classList.toggle("lang-en", isEn);
  document.documentElement.lang = isEn ? "en" : "ro";
  langToggle.textContent = isEn ? "RO" : "EN";
  localStorage.setItem(langKey, lang);
}
langToggle.addEventListener("click", () => {
  applyLang(document.body.classList.contains("lang-en") ? "ro" : "en");
});
applyLang(localStorage.getItem(langKey) === "en" ? "en" : "ro");
