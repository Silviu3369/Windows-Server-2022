# Server Management în Windows Server 2022 - Teorie Detaliată (PDF 06)

## 1. Introducere în Server Management

Administrarea unui server Windows necesită monitorizare constantă, gestionarea resurselor și înregistrarea evenimentelor. Windows Server oferă mai multe instrumente pentru aceste sarcini: Task Manager, Event Viewer, Performance Monitor și Task Scheduler.

---

## 2. Task Manager

Task Manager este instrumentul principal pentru monitorizarea proceselor și resurselor sistemului.

### 2.1 Lansarea Task Manager

**Metode:**
- Apasă Ctrl+Shift+Esc
- Right-click pe taskbar și selectează Task Manager
- Server Manager > Tools > Task Manager

### 2.2 Fila Processes

Afișează toate procesele în execuție pe server.

**Informații disponibile:**
- Nume proces
- PID (Process ID)
- Utilizare CPU (%)
- Utilizare memorie (MB)
- Stare proces

**Operații:**
- Terminare proces: Right-click > End Task
- Prioritate proces: Right-click > Set Priority
- Afinitate CPU: Right-click > Set Affinity

### 2.3 Fila Performance

Monitorizează performanța sistemului în timp real.

**Metrici:**
- CPU: Utilizare procentuală și frecvență
- Memorie: RAM utilizată și disponibilă
- Disk: Activitate I/O
- Network: Trafic de rețea

### 2.4 Fila Services

Afișează serviciile Windows și starea acestora.

**Operații:**
- Start/Stop serviciu
- Restart serviciu
- Deschidere Services.msc pentru configurare avansată

### 2.5 Fila Users

Arată utilizatorii conectați la server.

**Operații:**
- Disconnect user
- Logoff user
- Send message

---

## 3. Event Viewer

Event Viewer este instrumentul pentru vizualizarea și analiza evenimentelor sistemului.

### 3.1 Lansarea Event Viewer

```
Server Manager > Tools > Event Viewer
```

### 3.2 Tipuri de Loguri

**System Log:**
- Evenimente generate de sistem și drivere
- Erori hardware, servicii, etc.

**Security Log:**
- Evenimente de securitate
- Logări, accesuri la resurse
- Necesită audit logging activat

**Application Log:**
- Evenimente generate de aplicații
- Erori aplicații, avertismente

**Forwarded Events:**
- Evenimente colectate de pe alte computere
- Centralizare logging

### 3.3 Niveluri de Evenimente

- **Error:** Probleme grave care necesită atenție
- **Warning:** Avertismente, probleme potențiale
- **Information:** Evenimente normale, informații
- **Success Audit:** Acțiuni de audit reușite
- **Failure Audit:** Acțiuni de audit eșuate

### 3.4 Filtrare Evenimente

**Pași:**
1. Right-click pe log
2. Selectează "Filter Current Log"
3. Setează criterii: Level, Event ID, Time, etc.
4. Aplică filtrul

### 3.5 Crearea Abonamentelor (Subscriptions)

Permite colectarea centralizată a evenimentelor de pe mai multe computere.

**Pași de configurare:**

1. Deschide Event Viewer pe server-ul central
2. Selectează "Subscriptions"
3. Right-click > "Create Subscription"
4. Setează:
   - Nume abonament
   - Computere sursă (Add Domain Computers)
   - Tipuri de evenimente (Select Events)
5. Finalizează

**Condiții prealabile:**
- WinRM (Windows Remote Management) trebuie activat pe computere
- Firewall trebuie să permită WS-Management (port 5985)
- Contul de colector trebuie să aibă permisiuni pe computere sursă

### 3.6 Gestionarea Logurilor

**Ștergere log:**
1. Right-click pe log
2. Selectează "Clear Log"

**Exportare log:**
1. Right-click pe log
2. Selectează "Save All Events As"
3. Alege format: .evtx, .txt, .csv, .xml

**Proprietăți log:**
- Dimensiune maximă
- Comportament la atingerea limitei (Overwrite, Archive, Do not overwrite)

---

## 4. Performance Monitor

Performance Monitor permite monitorizarea detaliată a performanței sistemului.

### 4.1 Lansarea Performance Monitor

```
Server Manager > Tools > Performance Monitor
```

### 4.2 Contori de Performanță

**Contori comuni:**

- **Processor:** CPU Usage, Context Switches
- **Memory:** Available MB, Pages/sec
- **PhysicalDisk:** Disk Time, Avg. Disk Queue Length
- **Network Interface:** Bytes Sent/Received

### 4.3 Crearea Graficelor

**Pași:**
1. Deschide Performance Monitor
2. Selectează "Performance Monitor" din arbore
3. Click pe "+" pentru adăugare contor
4. Alege obiect și contor
5. Finalizează

### 4.4 Data Collector Sets

Permite colectarea automată de date de performanță.

**Utilizări:**
- Analiză performanță pe termen lung
- Identificare probleme
- Rapoarte

---

## 5. Task Scheduler

Task Scheduler permite programarea automată a sarcinilor.

### 5.1 Lansarea Task Scheduler

```
Server Manager > Tools > Task Scheduler
```

### 5.2 Crearea unei Sarcini

**Pași:**

1. Deschide Task Scheduler
2. Right-click pe folder > "Create Task"
3. Fila "General":
   - Nume sarcină
   - Descriere
   - Utilizator care execută sarcina

4. Fila "Triggers":
   - Setează când se execută (orar, la logare, la pornire, etc.)

5. Fila "Actions":
   - Setează ce se execută (program, script, etc.)

6. Fila "Conditions":
   - Condiții suplimentare (baterie, rețea, etc.)

7. Fila "Settings":
   - Comportament la erori, timeout, etc.

### 5.3 Tipuri de Trigger-e

- **Schedule:** La o oră anumită
- **Event:** La apariția unui eveniment
- **At logon:** La logarea utilizatorului
- **At startup:** La pornirea sistemului
- **On idle:** Când sistemul este inactiv

### 5.4 Acțiuni în Sarcini

- **Start a program:** Execută program sau script
- **Send an e-mail:** Trimite notificare (deprecated)
- **Display a message:** Afișează mesaj (deprecated)

### 5.5 Monitorizare Sarcini

**Vizualizare:**
1. Task Scheduler Library > Event Viewer Tasks
2. Selectează sarcina
3. Vizualizează istoric și status

---

## 6. Audit Logging

Audit logging permite înregistrarea detaliată a activităților pentru securitate și conformitate.

### 6.1 Configurarea Audit Policy

**Pași:**

1. Deschide Group Policy Management
2. Selectează Default Domain Controllers Policy (sau altă politică)
3. Edit > Computer Configuration > Policies > Windows Settings > Security Settings > Local Policies > Audit Policy

**Setări audit disponibile:**
- Audit account logon events
- Audit account management
- Audit logon events
- Audit object access
- Audit policy change
- Audit privilege use
- Audit process tracking
- Audit system events

### 6.2 Nivele Audit

- **No Auditing:** Fără înregistrare
- **Success:** Înregistrează doar acțiuni reușite
- **Failure:** Înregistrează doar acțiuni eșuate
- **Success and Failure:** Înregistrează ambele

### 6.3 Vizualizarea Audit Events

**Locație:**
Event Viewer > Windows Logs > Security

**Filtrare:**
- Event ID 4624: Logare reușită
- Event ID 4625: Logare eșuată
- Event ID 4720: Utilizator creat
- Event ID 4722: Utilizator activat

---

## 7. Remote Desktop Services

Permite acces la server de la distanță.

### 7.1 Activarea Remote Desktop

**Pași:**

1. Server Manager > Local Server
2. Selectează "Remote Desktop"
3. Alege "Allow remote connections"
4. Configurează utilizatorii cu permisiuni

### 7.2 Conectare RDP

**Metode:**
- Remote Desktop Connection (mstsc.exe)
- Aplicație Remote Desktop din Microsoft Store
- Web Access (dacă instalat)

**Comandă:**
```
mstsc.exe /v:server_ip
```

### 7.3 Securitate RDP

- Activează Network Level Authentication (NLA)
- Restricționează accesul prin firewall
- Utilizează VPN pentru acces de la distanță
- Monitorizează tentative de logare eșuate

---

## 8. Best Practices

### 8.1 Monitorizare Regulată

- Verifică regulat Event Viewer pentru erori
- Monitorizează performanța sistemului
- Analizează logurile de audit

### 8.2 Gestionarea Alertelor

- Configurează notificări pentru erori critice
- Creează sarcini automate pentru probleme comune
- Documentează probleme și soluții

### 8.3 Backup Loguri

- Exportă regulat logurile importante
- Stochează pe locație sigură
- Păstrează pentru audit și conformitate

### 8.4 Optimizare Performanță

- Identifică procese consumatoare de resurse
- Ajustează prioritatea proceselor
- Monitorizează memoria și CPU

---

## 9. Întrebări de Verificare

1. Care sunt funcțiile principale ale Task Manager?
2. Cum se lansează Event Viewer?
3. Care sunt tipurile de loguri în Event Viewer?
4. Cum se creează o abonare (subscription) în Event Viewer?
5. Care sunt condiții prealabile pentru event forwarding?
6. Cum se creează un contor de performanță în Performance Monitor?
7. Care sunt pașii pentru crearea unei sarcini în Task Scheduler?
8. Ce sunt trigger-ele în Task Scheduler?
9. Cum se configurează audit logging?
10. Care sunt Event ID-urile importante pentru audit logări?
