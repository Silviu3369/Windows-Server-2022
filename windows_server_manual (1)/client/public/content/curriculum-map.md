# Windows Server 2022 Enterprise Manual
## Curriculum Map + Gap Analysis

**Document Version:** 1.0  
**Date:** 2026-02-16  
**Status:** Planning Phase

---

## A) CURRICULUM MAP - 4-Level Learning Path

### NIVEL 1: FUNDAMENTALS (Săptămâna 1-2)
**Obiectiv:** Instalare, configurare de bază, networking, și tools de administrare

| Modul | Titlu | Durată | Prerechizite | Rezultate Așteptate |
|-------|-------|--------|--------------|-------------------|
| 1.1 | Introducere + Cerințe Hardware | 1h | Niciun | Înțelegere arhitectură WS2022 |
| 1.2 | Instalare Windows Server 2022 | 2h | 1.1 | Server instalat și configurat |
| 1.3 | Configurare Rețea (IP, DNS, Gateway) | 2h | 1.2 | Conectivitate de rețea funcțională |
| 1.4 | Server Manager și Tools Administrare | 1.5h | 1.3 | Navigare în Server Manager |
| 1.5 | Introducere PowerShell | 1.5h | 1.3 | Executare comenzi PS simple |
| **Total Nivel 1** | | **8h** | | |

---

### NIVEL 2: CORE SERVICES (Săptămâna 3-5)
**Obiectiv:** Serviciile critice enterprise (AD, DNS, DHCP, File Server, GPO)

| Modul | Titlu | Durată | Prerechizite | Rezultate Așteptate |
|-------|-------|--------|--------------|-------------------|
| 2.1 | Active Directory Domain Services (AD DS) | 3h | 1.5 | Domain Controller instalat |
| 2.2 | Structura AD: Forest/Tree/Domain/OU | 2h | 2.1 | OU-uri create și organizate |
| 2.3 | Utilizatori și Grupuri în AD | 2.5h | 2.2 | Utilizatori creați și în grupuri |
| 2.4 | DNS Server - Configurare și Recorduri | 2.5h | 2.1 | DNS funcțional, recorduri SRV |
| 2.5 | DHCP Server - Scopes și Leases | 2h | 1.3 | DHCP scope creat și activ |
| 2.6 | Permisiuni NTFS vs Share | 2h | 1.2 | Matrice permisiuni înțeleasă |
| 2.7 | File Server - Configurare și Partajări | 2.5h | 2.6 | Partajări create cu permisiuni |
| 2.8 | Group Policy Objects (GPO) - Fundamente | 2.5h | 2.2 | GPO creată și legată la OU |
| 2.9 | GPO - Politici de Securitate | 2h | 2.8 | Politici parolă și audit active |
| **Total Nivel 2** | | **21h** | | |

---

### NIVEL 3: ENTERPRISE (Săptămâna 6-7)
**Obiectiv:** Caracteristici avansate și management la scară

| Modul | Titlu | Durată | Prerechizite | Rezultate Așteptate |
|-------|-------|--------|--------------|-------------------|
| 3.1 | Distributed File System (DFS) | 2.5h | 2.7 | DFS namespace creat |
| 3.2 | Shadow Copies și Recuperare | 1.5h | 2.7 | Shadow Copies active |
| 3.3 | FSRM - File Server Resource Manager | 1.5h | 2.7 | Quotas și screening active |
| 3.4 | Print Server - Configurare și Management | 2h | 1.2 | Print server configurat |
| 3.5 | RSAT - Remote Server Administration Tools | 1.5h | 2.1 | RSAT instalat pe client |
| 3.6 | Integrare Client Windows 11 | 1.5h | 2.1 | Client alăturat la domeniu |
| 3.7 | Monitoring - Event Viewer și PerfMon | 2h | 1.4 | Contori monitorizați |
| **Total Nivel 3** | | **12.5h** | | |

---

### NIVEL 4: ADVANCED/OPERATIONS (Săptămâna 8)
**Obiectiv:** Mentenanță, backup, disaster recovery, și hardening

| Modul | Titlu | Durată | Prerechizite | Rezultate Așteptate |
|-------|-------|--------|--------------|-------------------|
| 4.1 | Windows Server Backup | 1.5h | 1.2 | Backup policy creat |
| 4.2 | Patching și Windows Update | 1h | 1.2 | Update policy înțeleasă |
| 4.3 | Hardening - Security Baseline | 2h | 2.9 | Server hardened |
| 4.4 | Auditing și Event Log Analysis | 1.5h | 3.7 | Audit policy configurată |
| 4.5 | Troubleshooting AD/DNS/DHCP | 2h | 2.1-2.5 | Probleme diagnosticate |
| 4.6 | Lab Capstone - Enterprise Setup | 4h | Toate | Infrastructură completă |
| **Total Nivel 4** | | **12h** | | |

---

### TOTAL CURRICULUM
- **Nivel 1 (Fundamentals):** 8 ore
- **Nivel 2 (Core Services):** 21 ore
- **Nivel 3 (Enterprise):** 12.5 ore
- **Nivel 4 (Advanced):** 12 ore
- **TOTAL:** 53.5 ore

---

## B) GAP ANALYSIS - Ce Lipsește și Plan de Completare

### Modul 1: FUNDAMENTALS

#### 1.1 Introducere + Cerințe Hardware
**Status:** ✅ Existent  
**Calitate:** 70% Complet  
**Lipsește:**
- [ ] Comparație WS2022 vs WS2019 vs WS2016
- [ ] Licensing (Standard vs Datacenter)
- [ ] Suport și lifecycle
- [ ] Cerințe hardware detaliate (CPU, RAM, Disk, Network)

**Plan Completare:**
- Adaug tabel comparativ versiuni
- Adaug informații licensing din Microsoft Learn
- Adaug hardware matrix (minim/recomandat/enterprise)

**Sursă PDF:** PDF 01 (pagini 1-5)

---

#### 1.2 Instalare Windows Server 2022
**Status:** ✅ Existent  
**Calitate:** 80% Complet  
**Lipsește:**
- [ ] Pași detaliați cu screenshot-uri
- [ ] Verificare post-instalare (comenzi)
- [ ] Troubleshooting instalare
- [ ] Rollback procedure

**Plan Completare:**
- Adaug pași GUI cu descrieri detaliate
- Adaug verificări PowerShell
- Adaug troubleshooting common issues
- Adaug checklist post-instalare

**Sursă PDF:** PDF 01 (pagini 6-15)

---

#### 1.3 Configurare Rețea
**Status:** ⚠️ Parțial  
**Calitate:** 60% Complet  
**Lipsește:**
- [ ] Configurare IP static (GUI + PowerShell)
- [ ] Configurare DNS (GUI + PowerShell)
- [ ] Testare conectivitate (ping, nslookup, tracert)
- [ ] Troubleshooting rețea
- [ ] Configurare router (NAT)

**Plan Completare:**
- Adaug pași GUI detaliat
- Adaug comenzi PowerShell complete
- Adaug comenzi de testare și diagnostic
- Adaug troubleshooting flowchart

**Sursă PDF:** PDF 01 (pagini 16-25)

---

#### 1.4 Server Manager și Tools
**Status:** ✅ Existent  
**Calitate:** 75% Complet  
**Lipsește:**
- [ ] Navigare detaliată Server Manager
- [ ] Add Roles and Features workflow
- [ ] Remote management setup
- [ ] Best practices

**Plan Completare:**
- Adaug screenshot-uri cu adnotări
- Adaug workflow diagram
- Adaug common tasks

**Sursă PDF:** PDF 01 (pagini 26-30)

---

#### 1.5 Introducere PowerShell
**Status:** ⚠️ Parțial  
**Calitate:** 50% Complet  
**Lipsește:**
- [ ] Sintaxă de bază (cmdlets, parameters)
- [ ] Operatori și variabile
- [ ] Piping și filtering
- [ ] Scripting simple
- [ ] Help system

**Plan Completare:**
- Adaug tutorial PowerShell complet
- Adaug exemple practice
- Adaug help commands
- Adaug mini-quiz

**Sursă PDF:** PDF 01 (pagini 31-40)

---

### Modul 2: CORE SERVICES

#### 2.1 Active Directory Domain Services
**Status:** ⚠️ Parțial  
**Calitate:** 65% Complet  
**Lipsește:**
- [ ] Instalare AD DS (pași detaliați)
- [ ] Promovare la Domain Controller
- [ ] Verificare instalare
- [ ] Troubleshooting AD
- [ ] FSMO roles

**Plan Completare:**
- Adaug pași instalare complet
- Adaug verificări post-instalare
- Adaug FSMO roles explanation
- Adaug troubleshooting guide

**Sursă PDF:** PDF 02 (pagini 1-20)

---

#### 2.2 Structura AD: Forest/Tree/Domain/OU
**Status:** ✅ Existent  
**Calitate:** 75% Complet  
**Lipsește:**
- [ ] Diagramă Forest/Tree/Domain
- [ ] OU design best practices
- [ ] Delegation strategy
- [ ] Naming conventions
- [ ] Multi-domain considerations

**Plan Completare:**
- Adaug diagrama Mermaid Forest/Tree/Domain
- Adaug OU design examples
- Adaug delegation scenarios
- Adaug naming convention guide

**Sursă PDF:** PDF 02 (pagini 21-35)

---

#### 2.3 Utilizatori și Grupuri
**Status:** ✅ Existent  
**Calitate:** 70% Complet  
**Lipsește:**
- [ ] Tipuri de grupuri (Local, Global, Domain Local)
- [ ] Grup nesting strategy
- [ ] Creare utilizatori (GUI + PowerShell)
- [ ] Creare grupuri (GUI + PowerShell)
- [ ] Membership management
- [ ] Troubleshooting

**Plan Completare:**
- Adaug tabel tipuri grupuri
- Adaug flowchart alegere tip grup
- Adaug comenzi PowerShell complete
- Adaug troubleshooting scenarios

**Sursă PDF:** PDF 02 (pagini 36-50)

---

#### 2.4 DNS Server
**Status:** ⚠️ Parțial  
**Calitate:** 60% Complet  
**Lipsește:**
- [ ] Instalare DNS Server
- [ ] Recorduri DNS (A, AAAA, CNAME, MX, SRV)
- [ ] Forward lookup zones
- [ ] Reverse lookup zones
- [ ] Forwarders și conditional forwarders
- [ ] DNS scavenging
- [ ] Troubleshooting (nslookup, dcdiag)

**Plan Completare:**
- Adaug pași instalare DNS
- Adaug tabel recorduri DNS
- Adaug diagrama DNS query flow
- Adaug comenzi diagnostic
- Adaug troubleshooting guide

**Sursă PDF:** PDF 01 (pagini 41-55)

---

#### 2.5 DHCP Server
**Status:** ⚠️ Parțial  
**Calitate:** 55% Complet  
**Lipsește:**
- [ ] Instalare DHCP Server
- [ ] Creare DHCP scope
- [ ] DHCP lease lifecycle (DORA)
- [ ] DHCP reservations
- [ ] DHCP options
- [ ] DHCP failover
- [ ] Troubleshooting (ipconfig /all, Get-DhcpServerv4Lease)

**Plan Completare:**
- Adaug pași instalare DHCP
- Adaug diagrama DORA lifecycle
- Adaug scope creation steps
- Adaug reservation examples
- Adaug troubleshooting commands

**Sursă PDF:** PDF 01 (pagini 56-70)

---

#### 2.6 Permisiuni NTFS vs Share
**Status:** ✅ Existent  
**Calitate:** 75% Complet  
**Lipsește:**
- [ ] Matrice permisiuni NTFS vs Share
- [ ] Permisiune efectivă (calculare)
- [ ] Inheritance și blocking
- [ ] Special permissions
- [ ] Troubleshooting permissions

**Plan Completare:**
- Adaug matrice comparație NTFS vs Share
- Adaug flowchart calcul permisiuni efective
- Adaug inheritance examples
- Adaug troubleshooting scenarios

**Sursă PDF:** PDF 03 (pagini 1-20)

---

#### 2.7 File Server
**Status:** ⚠️ Parțial  
**Calitate:** 65% Complet  
**Lipsește:**
- [ ] Instalare File Server role
- [ ] Creare partajări (GUI + PowerShell)
- [ ] Setare permisiuni (NTFS + Share)
- [ ] Home directories
- [ ] Folder redirection
- [ ] Access-Based Enumeration (ABE)
- [ ] Troubleshooting

**Plan Completare:**
- Adaug pași instalare File Server
- Adaug workflow creare partajări
- Adaug home directory setup
- Adaug ABE configuration
- Adaug troubleshooting guide

**Sursă PDF:** PDF 03 (pagini 21-40)

---

#### 2.8 Group Policy Objects (GPO)
**Status:** ⚠️ Parțial  
**Calitate:** 60% Complet  
**Lipsește:**
- [ ] Instalare GPMC (Group Policy Management Console)
- [ ] Creare GPO
- [ ] Editare GPO
- [ ] Legare GPO la OU
- [ ] GPO processing order (LSDOU)
- [ ] Loopback processing
- [ ] Security filtering
- [ ] WMI filters
- [ ] Troubleshooting (gpupdate, gpresult, RSOP)

**Plan Completare:**
- Adaug pași instalare GPMC
- Adaug diagrama LSDOU processing
- Adaug GPO creation workflow
- Adaug troubleshooting commands
- Adaug common GPO scenarios

**Sursă PDF:** PDF 04 (pagini 1-30)

---

#### 2.9 GPO - Politici de Securitate
**Status:** ⚠️ Parțial  
**Calitate:** 55% Complet  
**Lipsește:**
- [ ] Politică parolă (lungime, complexitate, expirare)
- [ ] Account lockout policy
- [ ] Audit policy (logon, account management, object access)
- [ ] User rights assignment
- [ ] Security options
- [ ] Firewall policy
- [ ] Troubleshooting

**Plan Completare:**
- Adaug tabel politici de securitate
- Adaug recommended values
- Adaug implementare via GPO
- Adaug verificare via gpresult
- Adaug troubleshooting scenarios

**Sursă PDF:** PDF 04 (pagini 31-50)

---

### Modul 3: ENTERPRISE

#### 3.1 Distributed File System (DFS)
**Status:** ❌ Lipsă  
**Calitate:** 0% Complet  
**Lipsește:**
- [ ] DFS Namespaces
- [ ] DFS Replication
- [ ] Setup și configurare
- [ ] Troubleshooting replication
- [ ] Failover scenarios

**Plan Completare:**
- Creare modul complet DFS
- Adaug diagrama DFS architecture
- Adaug pași setup
- Adaug replication monitoring
- Adaug troubleshooting guide

**Sursă PDF:** PDF 03 (pagini 41-56)

---

#### 3.2 Shadow Copies
**Status:** ⚠️ Parțial  
**Calitate:** 50% Complet  
**Lipsește:**
- [ ] Activare Shadow Copies
- [ ] Configurare schedule
- [ ] Sizing și storage
- [ ] Restore procedure
- [ ] Troubleshooting

**Plan Completare:**
- Adaug pași activare
- Adaug configurare schedule
- Adaug restore scenarios
- Adaug troubleshooting guide

**Sursă PDF:** PDF 03 (pagini 57-70)

---

#### 3.3 FSRM - File Server Resource Manager
**Status:** ❌ Lipsă  
**Calitate:** 0% Complet  
**Lipsește:**
- [ ] Instalare FSRM
- [ ] Quotas (hard vs soft)
- [ ] File Screening
- [ ] Storage Reports
- [ ] Notifications

**Plan Completare:**
- Creare modul complet FSRM
- Adaug pași instalare
- Adaug quota setup
- Adaug file screening examples
- Adaug reporting

**Sursă PDF:** PDF 03 (pagini 71-80)

---

#### 3.4 Print Server
**Status:** ⚠️ Parțial  
**Calitate:** 60% Complet  
**Lipsește:**
- [ ] Instalare Print Server role
- [ ] Adăugare imprimante
- [ ] Partajare imprimante
- [ ] Print pooling
- [ ] Permissions pe imprimante
- [ ] Troubleshooting

**Plan Completare:**
- Adaug pași instalare Print Server
- Adaug workflow adăugare imprimante
- Adaug print pooling setup
- Adaug troubleshooting guide

**Sursă PDF:** PDF 05 (pagini 1-30)

---

#### 3.5 RSAT
**Status:** ⚠️ Parțial  
**Calitate:** 50% Complet  
**Lipsește:**
- [ ] Instalare RSAT pe Windows 11
- [ ] Tools disponibile
- [ ] Remote management setup
- [ ] Best practices

**Plan Completare:**
- Adaug pași instalare RSAT
- Adaug lista tools disponibile
- Adaug remote management workflow
- Adaug best practices

**Sursă PDF:** PDF 06 (pagini 1-15)

---

#### 3.6 Integrare Client Windows 11
**Status:** ⚠️ Parțial  
**Calitate:** 60% Complet  
**Lipsește:**
- [ ] Configurare rețea client
- [ ] Alăturare la domeniu
- [ ] Verificare alăturare
- [ ] Troubleshooting conectare domeniu
- [ ] Group Policy application

**Plan Completare:**
- Adaug pași configurare rețea
- Adaug pași alăturare domeniu
- Adaug verificări post-alăturare
- Adaug troubleshooting scenarios

**Sursă PDF:** PDF 09 (pagini 1-20)

---

#### 3.7 Monitoring
**Status:** ⚠️ Parțial  
**Calitate:** 55% Complet  
**Lipsește:**
- [ ] Event Viewer (System, Security, Application logs)
- [ ] Custom views
- [ ] Event subscriptions
- [ ] Performance Monitor
- [ ] Data Collector Sets
- [ ] Alerts

**Plan Completare:**
- Adaug Event Viewer tutorial
- Adaug Performance Monitor setup
- Adaug monitoring best practices
- Adaug troubleshooting scenarios

**Sursă PDF:** PDF 06 (pagini 16-40)

---

### Modul 4: ADVANCED/OPERATIONS

#### 4.1 Windows Server Backup
**Status:** ❌ Lipsă  
**Calitate:** 0% Complet  
**Lipsește:**
- [ ] Instalare Windows Server Backup
- [ ] Creare backup policy
- [ ] Backup targets
- [ ] Restore procedure
- [ ] Disaster recovery

**Plan Completare:**
- Creare modul complet Backup
- Adaug pași instalare
- Adaug backup strategy (3-2-1)
- Adaug restore scenarios
- Adaug DR planning

**Sursă PDF:** PDF 06 (pagini 41-50)

---

#### 4.2 Patching și Updates
**Status:** ❌ Lipsă  
**Calitate:** 0% Complet  
**Lipsește:**
- [ ] Windows Update configuration
- [ ] WSUS (opțional)
- [ ] Patch Tuesday
- [ ] Testing updates
- [ ] Rollback procedure

**Plan Completare:**
- Creare modul complet Patching
- Adaug update policy via GPO
- Adaug testing strategy
- Adaug rollback procedure

**Sursă PDF:** Microsoft Learn (nu în PDF)

---

#### 4.3 Hardening
**Status:** ⚠️ Parțial  
**Calitate:** 50% Complet  
**Lipsește:**
- [ ] Security baseline
- [ ] Firewall configuration
- [ ] Service hardening
- [ ] Account security
- [ ] Audit logging

**Plan Completare:**
- Adaug security baseline checklist
- Adaug firewall rules
- Adaug service hardening guide
- Adaug account security best practices

**Sursă PDF:** PDF 04 (pagini 51-60)

---

#### 4.4 Auditing
**Status:** ⚠️ Parțial  
**Calitate:** 55% Complet  
**Lipsește:**
- [ ] Audit policy configuration
- [ ] Event log analysis
- [ ] Alerting
- [ ] Log retention
- [ ] Compliance

**Plan Completare:**
- Adaug audit policy setup
- Adaug event log analysis
- Adaug alerting configuration
- Adaug compliance checklist

**Sursă PDF:** PDF 06 (pagini 51-60)

---

#### 4.5 Troubleshooting
**Status:** ⚠️ Parțial  
**Calitate:** 50% Complet  
**Lipsește:**
- [ ] AD troubleshooting (dcdiag, repadmin)
- [ ] DNS troubleshooting (nslookup, dnscmd)
- [ ] DHCP troubleshooting (ipconfig)
- [ ] GPO troubleshooting (gpupdate, gpresult)
- [ ] File Server troubleshooting

**Plan Completare:**
- Adaug troubleshooting flowchart
- Adaug diagnostic commands
- Adaug common issues și soluții
- Adaug lab scenarios

**Sursă PDF:** Toate (scattered)

---

#### 4.6 Lab Capstone
**Status:** ❌ Lipsă  
**Calitate:** 0% Complet  
**Lipsește:**
- [ ] Scenario companie
- [ ] Cerințe infrastructură
- [ ] Pași implementare
- [ ] Verificări
- [ ] Troubleshooting scenarios

**Plan Completare:**
- Creare Lab Capstone complet
- Scenario: Companie cu 3 departamente
- Cerințe: AD, DNS, DHCP, File Server, GPO, DFS, Print Server
- Pași detaliați cu verificări
- Troubleshooting challenges

**Sursă PDF:** Toate

---

## C) CONȚINUT COMPLETAT - Plan de Implementare

### Prioritate 1 (CRITIC - Săptămâna 1)
- [ ] 1.2 Instalare WS2022 - Completare pași + verificări
- [ ] 1.3 Configurare Rețea - Completare IP, DNS, testare
- [ ] 2.1 Active Directory - Completare instalare + promovare
- [ ] 2.2 Structura AD - Adaug diagrame OU

### Prioritate 2 (IMPORTANT - Săptămâna 2)
- [ ] 2.3 Utilizatori și Grupuri - Completare comenzi PS
- [ ] 2.4 DNS Server - Completare recorduri + troubleshooting
- [ ] 2.5 DHCP Server - Completare scopes + DORA diagram
- [ ] 2.6 Permisiuni - Adaug matrice efective

### Prioritate 3 (STANDARD - Săptămâna 3)
- [ ] 2.7 File Server - Completare partajări + home dirs
- [ ] 2.8 GPO - Completare LSDOU + security filtering
- [ ] 3.1 DFS - Creare modul complet
- [ ] 3.4 Print Server - Completare pooling

### Prioritate 4 (ADVANCED - Săptămâna 4)
- [ ] 4.1 Backup - Creare modul complet
- [ ] 4.3 Hardening - Completare security baseline
- [ ] 4.6 Lab Capstone - Creare scenario complet

---

## D) SCHEME VIZUALE - Diagrame Obligatorii

### Diagrame Mermaid/SVG Necesare (Minim 10)

1. **AD Forest/Domain/OU Structure**
   - Hierarchie Forest → Tree → Domain → OU
   - Exemplu: company.com cu 3 departamente

2. **DNS Query Flow**
   - Client → DNS → Forwarder → Root Hints
   - Recursive vs Iterative queries

3. **DHCP Lease Lifecycle (DORA)**
   - Discover → Offer → Request → Acknowledge
   - Timeline și mesaje

4. **GPO Processing Order (LSDOU)**
   - Local → Site → Domain → OU
   - Precedence și override

5. **Share vs NTFS Permissions Decision**
   - Flowchart: Cum alegi permisiuni
   - Effective permissions calculation

6. **DFS Namespace + Targets**
   - Namespace structure
   - Replication Group

7. **Shadow Copies Restore Flow**
   - Timeline snapshot-uri
   - Restore procedure

8. **RSAT Admin Workflow**
   - Client admin → Server roles
   - Remote management

9. **File Server Structure Recommended**
   - Departamente
   - Shares
   - Home folders
   - Permissions

10. **Troubleshooting Decision Tree**
    - AD/DNS/DHCP/GPO
    - If/Then logic

11. **Windows Server 2022 Architecture**
    - Kernel, Services, Roles
    - Integration points

12. **Backup Strategy 3-2-1**
    - 3 copii
    - 2 medii
    - 1 offsite

---

## E) STANDARDIZARE ȘI CALITATE

### Pentru Fiecare Modul - Template

```
# [Titlu Modul]

## Obiective de Învățare
- ✓ Obiectiv 1
- ✓ Obiectiv 2
- ✓ Obiectiv 3

## Prerechizite
- Modul X (prerequisit)
- Cunoștințe Y

## Teorie
[Conținut teoretic detaliat]

## Pași Practici
### Pasul 1: [Descriere]
[GUI steps / PowerShell / CMD]
[Verificare]

### Pasul 2: [Descriere]
...

## Verificare Post-Implementare
- [ ] Verificare 1
- [ ] Verificare 2
- [ ] Verificare 3

## Troubleshooting
### Problemă: [Descriere]
**Simptome:** ...
**Cauze posibile:** ...
**Soluție:** ...

## Greșeli Frecvente
- ❌ Greșeală 1: Explicație
- ❌ Greșeală 2: Explicație

## Mini-Quiz
1. Întrebare 1
   a) Răspuns A
   b) Răspuns B (corect)
   c) Răspuns C

## Recapitulare
[Rezumat 1-2 paragrafe]

## Checklist Competențe
După acest modul, ar trebui să poți:
- [ ] Competență 1
- [ ] Competență 2
- [ ] Competență 3

## Surse Folosite
- PDF 02 (Capitol: Active Directory, pagini 1-20)
- Microsoft Learn: [Link]
```

### Checklist Calitate pentru Fiecare Pagină
- [ ] Titlu clar și descriptiv
- [ ] Obiective de învățare definite
- [ ] Prerechizite listate
- [ ] Teorie detaliată (minim 500 cuvinte)
- [ ] Pași practici (GUI + PowerShell + CMD)
- [ ] Verificări post-implementare
- [ ] Troubleshooting scenarios (minim 3)
- [ ] Mini-quiz (minim 5 întrebări)
- [ ] Recapitulare
- [ ] Checklist competențe
- [ ] Surse citate

---

## TIMELINE IMPLEMENTARE

| Săptămâna | Fază | Deliverable |
|-----------|------|-------------|
| 1 | A + B | Curriculum Map + Gap Analysis (THIS DOCUMENT) |
| 2-3 | C | Completare Nivel 1 + 2 (Fundamentals + Core Services) |
| 4 | C | Completare Nivel 3 (Enterprise) |
| 5 | C + D | Completare Nivel 4 + Diagrame |
| 6 | E | Standardizare + Checklists + Lab Capstone |
| 7 | Review | QA și final adjustments |

---

## NEXT STEPS

1. ✅ **DONE:** Curriculum Map + Gap Analysis (acest document)
2. ⏳ **TODO:** Completare conținut Nivel 1-2 (Prioritate 1-2)
3. ⏳ **TODO:** Creare diagrame Mermaid/SVG
4. ⏳ **TODO:** Adăugare checklists și Lab Capstone
5. ⏳ **TODO:** QA și final review

---

**Document Prepared By:** Senior Windows Server 2022 Trainer  
**Date:** 2026-02-16  
**Version:** 1.0
