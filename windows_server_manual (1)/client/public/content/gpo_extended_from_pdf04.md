# Group Policy în Windows Server 2022 - Teorie Detaliată (PDF 04)

## 1. Introducere în Mediul Utilizatorului (Gebruikersomgeving)

### 1.1 Scopul Mediului Utilizatorului

Una dintre funcțiile importante ale unui administrator de rețea este gestionarea mediului utilizatorului. Utilizatorii au nevoie de acces la date și setări personalizate care sunt stocate pe calculatoarele locale.

**Componentele mediului utilizatorului:**
- **Folder Documents:** Conține documentele personale ale utilizatorului
- **Desktop:** Conține documentele și shortcut-urile utilizatorului
- **Favorites:** Favoritele din Internet Explorer sau alte browsere
- **Folder Appdata:** Conține setări de aplicații și fișiere de configurare
- **Ntuser.dat:** Registry hive cu setări personale ale utilizatorului

### 1.2 Provocări în Gestionarea Mediului Utilizatorului

**Probleme comune:**
- Utilizatorii stochează date pe calculatoare locale, care nu sunt accesibile din alte locații
- Dacă utilizatorul se mută la alt calculator, trebuie să-și reconfigureze setările
- Datele locale nu sunt protejate în caz de defecțiune hardware
- Utilizatorii pot pierde date dacă nu le salvează pe server

### 1.3 Soluții pentru Gestionarea Mediului Utilizatorului

**Opțiuni disponibile:**
- **Centralizare:** Datele utilizatorului sunt stocate pe server, accesibile din orice locație
- **Securitate:** Atât local cât și pe rețea, ACL-urile protejează datele
- **Backup:** Datele pe server sunt incluse în backup-ul serverului
- **Roaming:** Utilizatorul poate accesa profilul din orice calculator din domeniu
- **Offline Files:** Utilizatorii pot lucra offline și sincroniza la revenirea online

---

## 2. Home Directories, Roaming Profiles și Logon Scripts

### 2.1 Home Directories (Directoare Personale)

Un **home directory** este un folder pe server alocat fiecărui utilizator pentru stocarea documentelor personale.

**Avantaje:**
- Centralizare datelor
- Acces din orice calculator din domeniu
- Backup centralizat
- Gestionare permisiuni simplificată

**Creare Home Directory:**
1. Crearea unui folder pe server (ex: \\Server\HomeDirectories\username)
2. Setarea permisiunilor NTFS (utilizatorul are Full Control)
3. Asignarea în proprietățile contului de utilizator
4. Utilizatorul accesează prin mapare de drive (H:)

### 2.2 Profiluri Utilizatorului

#### 2.2.1 Ce este un Profil?

Un **profil de utilizator** conține:
- Setări personale ale utilizatorului
- Fișiere din Desktop, Documents, Favorites
- Setări de aplicații
- Registry hive personal (Ntuser.dat)

#### 2.2.2 Profiluri Locale vs Roaming

**Profiluri Locale:**
- Stocate pe calculatorul local
- Accesibile doar pe acel calculator
- Rapid (fără latență de rețea)
- Nu sunt sincronizate între calculatoare

**Profiluri Roaming:**
- Stocate pe server
- Accesibile din orice calculator din domeniu
- Mai lente (latență de rețea)
- Sincronizate automat la logare/logoff

#### 2.2.3 Profiluri Zwervende (Roaming Profiles)

Profilurile roaming permit utilizatorului să aibă același mediu pe orice calculator:
1. La logare, profilul este descărcat de pe server
2. Utilizatorul lucrează cu profilul local
3. La logoff, profilul este sincronizat înapoi pe server

**Configurare:**
- Setarea path-ului de profil roaming în proprietățile contului
- Crearea share-ului de profiluri pe server
- Setarea permisiunilor corespunzătoare

#### 2.2.4 Administratori Nu Pot Edita Profiluri

Administratorii nu pot edita direct profilurile utilizatorilor în timp ce sunt conectați. Trebuie să:
- Deconecteze utilizatorul
- Editeze profilul offline
- Reconecteze utilizatorul

### 2.3 Logon Scripts (Scripturi de Logare)

#### 2.3.1 BAT/CMD Files

Scripturile BAT/CMD sunt fișiere batch tradiționale:
```batch
@echo off
REM Exemplu de script de logare
net use H: \\Server\HomeDirectories\%username%
net use P: \\Server\Projects
```

**Avantaje:**
- Simplitate
- Compatibilitate universală
- Execuție rapidă

**Dezavantaje:**
- Funcționalitate limitată
- Greu de debuggat
- Fără control de erori avansat

#### 2.3.2 VBScript

VBScripturile oferă mai multă funcționalitate:
```vbscript
' Exemplu de script VBScript
Set objNetwork = CreateObject("WScript.Network")
objNetwork.MapNetworkDrive "H:", "\\Server\HomeDirectories\" & objNetwork.UserName
```

**Avantaje:**
- Funcționalitate mai bogată
- Control de erori
- Integrare cu WMI

**Dezavantaje:**
- Mai complex
- Necesită cunoștințe de programare
- Performanță mai slabă

#### 2.3.3 PowerShell

PowerShell oferă cea mai mare flexibilitate:
```powershell
# Exemplu de script PowerShell
$username = $env:USERNAME
New-PSDrive -Name H -PSProvider FileSystem -Root "\\Server\HomeDirectories\$username"
```

**Avantaje:**
- Funcționalitate foarte bogată
- Integrare cu sistemul
- Performanță bună
- Scriptare avansată

**Dezavantaje:**
- Necesită PowerShell instalat
- Curba de învățare mai abruptă

---

## 3. Group Policies - Teorie

### 3.1 Prezentare Generală

**Group Policy** este un instrument puternic pentru gestionarea centralizată a:
- Setărilor de securitate
- Configurării calculatoarelor
- Configurării utilizatorilor
- Restricțiilor software

### 3.2 Instalări Beheren via GPO's

Group Policy permite gestionarea instalării software-ului:
- Distribuire automată de aplicații
- Actualizări automate
- Restricții de instalare
- Gestionare licențe

### 3.3 Group Policy Management Console (GPMC)

GPMC este interfața pentru gestionarea Group Policy:
- Creare și editare GPO-uri
- Linkare la OU-uri
- Rapoarte și analize
- Backup și restore

**Lansare:**
```
Server Manager > Tools > Group Policy Management
```

### 3.4 Crearea și Gestionarea GPO-urilor

#### 3.4.1 Crearea unui GPO Nou

1. GPMC > Forest > Domains > Domain > Group Policy Objects
2. Right-click > New
3. Introdu numele GPO
4. Editează setările

#### 3.4.2 Legarea GPO la Container

1. GPMC > Selectează OU
2. Right-click > Link an Existing GPO
3. Selectează GPO-ul
4. Confirma

#### 3.4.3 Instalări Dedifiniți într-un GPO

Se pot defini instalări software prin:
- Software Installation extension
- Scripts (PowerShell, VBScript)
- WMI filters

#### 3.4.4 Testarea GPO

Testarea GPO se face prin:
```
gpupdate /force
gpresult /h report.html
```

### 3.5 Tipuri de Group Policy

#### 3.5.1 Local Group Policy

Politici aplicate local pe calculator:
- Fără dependență de domeniu
- Aplicate imediat
- Gestionare manuală

#### 3.5.2 AD Group Policy

Politici aplicate din Active Directory:
- Centralizate
- Aplicate automat
- Ușor de gestionat la scară

### 3.6 Filtrare și Aplicare Avansată

#### 3.6.1 Security Filtering

Permite aplicarea GPO doar pentru anumite grupuri:
1. GPMC > Selectează GPO
2. Scope tab > Security Filtering
3. Adaugă grupuri/utilizatori
4. Setează permisiuni

#### 3.6.2 WMI Filters

Permite aplicarea condiționată pe baza criteriilor WMI:
- Versiune OS
- Configurație hardware
- Setări de sistem

#### 3.6.3 Block Inheritance

Permite blocarea moștenirii politicilor din parent OU:
1. GPMC > Selectează OU
2. Right-click > Block Inheritance

#### 3.6.4 Enforced

Forțează aplicarea GPO chiar dacă este blocat:
1. GPMC > Selectează GPO link
2. Right-click > Enforced

### 3.7 Delegarea Administrării GPO-urilor

Permite delegarea gestionării GPO-urilor:
1. GPMC > Selectează OU
2. Delegation tab
3. Add > Selectează utilizator/grup
4. Setează permisiuni

### 3.8 Group Policy Onwarp

Permite gestionarea politicilor prin PowerShell.

### 3.9 Procesarea Group Policy

#### 3.9.1 Group Policy Client Service

Serviciul care aplică politicile pe client.

#### 3.9.2 Inițierea Procesului GPO

Se inițiază prin:
```
gpupdate /force
```

#### 3.9.3 Procesare Sincronă vs Asincronă

- **Sincronă:** Așteptă finalizarea politicilor înainte de logare
- **Asincronă:** Aplică politicile în background

#### 3.9.4 Vernieuwing Groepsbeleid

Politicile se reîmprospătează periodic (implicit 90 minute).

#### 3.9.5 Uitzonderingen

Anumite politici nu se reîmprospătează automat și necesită restart.

### 3.10 Starter GPO's

Șabloane predefinite pentru crearea rapidă de GPO-uri.

#### 3.10.1 Starter GPO's în Utilizare

Se folosesc pentru:
- Securitate standard
- Configurații comune
- Accelerarea implementării

#### 3.10.2 Crearea unui Starter GPO Nou

1. GPMC > Starter GPOs
2. Right-click > New
3. Configurează setările

#### 3.10.3 Crearea unui GPO din Starter GPO

1. GPMC > Group Policy Objects
2. Right-click > New from Starter GPO
3. Selectează Starter GPO

### 3.11 Troubleshooting Group Policy

#### 3.11.1 Group Policy Results

Raport cu politicile aplicate efectiv:
```
gpresult /h report.html
```

#### 3.11.2 Group Policy Modeling

Simulare a aplicării politicilor pentru utilizator/calculator specific.

---

## 4. Configurare Practică cu Group Policy

### 4.1 Gestionarea Profilului și Setărilor Utilizatorului

Se configurează prin:
- Folder Redirection
- Roaming Profiles
- Home Directories

### 4.2 Configurări de Securitate la Nivel de Domeniu

Se configurează prin:
- Account Policies
- Local Policies
- Security Options

### 4.3 Restricții Software

Se configurează prin:
- Software Restriction Policies
- AppLocker
- Windows Defender

### 4.4 Modele de Securitate

Se aplică prin:
- Security Templates
- Baseline configurations
- Compliance policies

### 4.5 Preferințe Group Policy

Extensii avansate pentru:
- Mapări de drive
- Conexiuni de imprimante
- Setări de registru
- Fișiere și foldere

---

## 5. Întrebări de Verificare

1. Care sunt componentele principale ale unui profil de utilizator?
2. Care sunt diferențele între profilurile locale și roaming?
3. Cum se configurează un home directory pentru un utilizator?
4. Ce sunt logon scripts și care sunt tipurile disponibile?
5. Care este rolul Group Policy Management Console (GPMC)?
6. Cum se creează și se linkează un GPO la o OU?
7. Ce este security filtering și cum se utilizează?
8. Care sunt diferențele între Local Group Policy și AD Group Policy?
9. Cum se testează aplicarea unei politici cu gpupdate?
10. Ce sunt Starter GPO's și cum se utilizează?
