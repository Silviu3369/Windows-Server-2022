# Utilizatori și Grupuri în Windows Server 2022 - Teorie Detaliată (PDF 02)

## 1. Obiectele în Active Directory

### 1.1 Security Principals (Principalii de Securitate)

Un **security principal** este orice obiect din Active Directory care poate fi asignat drepturi și permisiuni pe resurse. Sistemul Windows atribuie fiecărui security principal un **Security Identifier (SID)** unic - o valoare numerică care identifică în mod unic obiectul în domeniu.

**Caracteristici importante ale SID:**
- **Unic și persistent:** Fiecare SID este unic în domeniu și nu se reutilizează niciodată
- **Imuabil:** Dacă redenumești un obiect, SID-ul rămâne același
- **Non-reusable:** Chiar dacă ștergi un obiect, SID-ul nu va fi atribuit altui obiect

**Exemplu SID:** `S-1-5-{domainid}-500` (Administrator)

Security principals în AD DS includ:
- **User accounts** (conturi de utilizatori)
- **Computer accounts** (conturi de calculatoare)
- **Group accounts** (conturi de grupuri)

### 1.2 Organizational Units (OU-uri)

O **Organizational Unit (OU)** este un container logic în Active Directory care permite organizarea și gestionarea obiectelor AD. OU-urile sunt esențiale pentru:

**Funcții principale:**
- **Delegare de autoritate:** Permite administratorilor să delegue responsabilități pentru anumite obiecte
- **Aplicare de Group Policy:** Permite aplicarea de politici diferite pentru diferite grupuri de obiecte
- **Structurare logică:** Reflectă structura organizațională a companiei

**Obiecte care pot fi în OU:**
- Utilizatori
- Grupuri
- Calculatoare
- Contacte
- Obiecte Shared Folder
- Imprimante
- InetOrgPerson objects
- Microsoft Message Queuing Queue aliases
- Alte OU-uri (imbricate)

**Factori în planificarea unei structuri OU:**
- **Delegarea de autoritate:** Care administratori vor fi responsabili pentru care obiecte?
- **Aplicarea Group Policy:** Ce politici diferite sunt necesare pentru diferite grupuri?
- **Structurare AD:** Cum reflectă structura OU-urilor structura organizației?

---

## 2. Active Directory Users and Computers (ADUC)

### 2.1 Interfața ADUC

ADUC este instrumentul principal pentru gestionarea obiectelor în Active Directory. Se găsește în **Server Manager > Tools > Active Directory Users and Computers**.

**Structura ferestrei ADUC:**
- **Console tree (panoul stâng):** Arată structura cu diferitele containere care sunt create automat la instalare
- **Details pane (panoul din mijloc):** Arată conținutul containerului selectat
- **Action pane (panoul din dreapta):** Oferă acțiuni relevante pentru selecția curentă

**Containere standard create la instalare:**
- **Builtin:** Conține grupuri locale din domeniu
- **Computers:** Conturi standard ale tuturor calculatoarelor client și memberservers din domeniu
- **Domain Controllers:** Toți controlerii de domeniu din domeniu
- **ForeignSecurityPrincipals:** Security principals din domenii de încredere
- **Managed Service Accounts:** Conturi folosite de servicii (IIS, SQL Server, etc.)
- **Users:** Administrator, Guest și alte grupuri create automat

### 2.1.1 Advanced Mode

Modul Advanced se activează via **View > Advanced features**. Oferă mai multă informație despre obiectele din ADUC, inclusiv:
- Atribute suplimentare ale obiectelor
- Containere ascunse în mod normal
- Opțiuni de configurare avansate

### 2.1.2 Kolommen toevoegen (Adăugarea de coloane)

Panoul din mijloc afișează standard coloanele: Name, Type, Description. Poți adăuga coloane suplimentare via **View > Add/remove Columns** pentru a vedea mai multă informație.

### 2.1.3 Users, Contacts, Groups and Computers as containers

Această vizualizare permite ca imprimantele și alte obiecte asociate să fie organizate cu conturile de calculator corespunzătoare.

Se activează via **View > Users, Contacts, Groups and computers as containers**.

### 2.2 Remote beheren met RSAT

Serverele sunt în practică în locații îndepărtate, iar administratorii nu sunt mereu locali. RSAT (Remote Server Administration Tools) permite administrării serverelor de pe o stație de lucru client.

**Instalare RSAT:**

**Windows 10 (release 1809 și mai nou):**
```
Settings > Apps > Optional features > Add a feature
```

**Windows 11:**
```
Settings > System > Optional features > Add a feature
```

**RSAT pentru release-uri mai vechi (pre-1809):**
Descarcă din: https://www.microsoft.com/en-us/download/details.aspx?id=45520

**Instalare manuală pentru release pre-1809:**
```
1. Descarcă fișierul MSU corespunzător build-ului Windows
2. Exemplu: WindowsTH-RSAT_WS_1803-x64.msu
3. Execută instalatorul
4. Reboot dacă este necesar
```

**Utilizare RSAT:**
- În Server Manager: Tools menu
- În Windows Administrative Tools
- În Control Panel > Administrative Tools

---

## 3. Organizational Units (OU) - Planificare și Implementare

### 3.1 OU's plannen (Planificarea OU-urilor)

**Principii de planificare:**

1. **Numărul de obiecte:** Câte obiecte vor fi în fiecare OU? (Recomandare: 1000-2000 obiecte per OU)
2. **Structura de delegare:** Ce obiecte vor fi delegate administratorilor locali?
3. **Politici care se vor aplica:** Ce Group Policy Objects (GPO) vor fi aplicate pe diferite OU-uri?

### 3.2 OU's beheren (Gestionarea OU-urilor)

Gestionarea OU-urilor se face prin:
- Creare OU-uri noi
- Ștergere OU-uri
- Deplasare obiecte între OU-uri
- Delegare de drepturi administrative

### 3.3 Accounts verplaatsen naar een OU (Mutarea conturilor într-o OU)

Conturile de utilizatori și calculatoare pot fi mutate între OU-uri pentru a le organiza conform structurii dorite.

### 3.4 Een beveiligde OU verwijderen (Ștergerea unei OU protejate)

OU-urile pot fi protejate de ștergere accidentală. Pentru a șterge o OU protejată:
1. Dezactivează protecția
2. Asigură-te că OU nu conține obiecte
3. Șterge OU-ul

### 3.5 Het beheer van een OU (Gestionarea unei OU)

**Delegare de autoritate în OU:**
- Delegează gestionarea unei OU unui administrator local
- Setează permisiuni specifice pe OU
- Permite administratorului local să gestioneze obiecte în OU

---

## 4. Conturi de Utilizatori

### 4.1 Creare cont de utilizator

**Pași în ADUC:**
1. Right-click pe OU > New > User
2. Completează informații: First name, Last name, User logon name
3. Setează parola și opțiuni de parolă
4. Finalizează crearea

**Opțiuni importante:**
- **User logon name:** Numele unic de logare în domeniu
- **Password:** Parola inițială
- **User must change password at next logon:** Forțează schimbarea parolei la prima logare
- **Account is disabled:** Dezactivează contul inițial

### 4.2 Proprietăți cont de utilizator

Fiecare cont de utilizator are proprietăți care pot fi configurate:
- **General:** Informații de bază (nume, descriere)
- **Address:** Adresă, telefon, email
- **Account:** Opțiuni de logare, expirare parolă
- **Profile:** Path-uri pentru profil, home folder, script de logare
- **Member Of:** Grupurile din care face parte utilizatorul

### 4.3 Gestionare conturi de utilizatori

**Operații comune:**
- **Resetare parolă:** Right-click > Reset Password
- **Unlock account:** Deblochează cont blocat după prea multe încercări greșite
- **Disable account:** Dezactivează temporar un cont
- **Delete account:** Șterge permanent un cont

### 4.4 Conturi standard de sistem

Windows Server creează automat câteva conturi:
- **Administrator:** Cont cu drepturi depline
- **Guest:** Cont pentru acces invitat (dezactivat implicit)

### 4.5 Managed Service Accounts

Sunt conturi speciale folosite de servicii (IIS, SQL Server, etc.) pentru a rula cu drepturi specifice fără a necesita schimbarea parolei manual.

---

## 5. Conturi de Calculatoare

### 5.1 Proprietăți cont de calculator

Fiecare calculator din domeniu are un cont în AD DS cu proprietăți specifice.

### 5.2 Meniu de gestionare a calculatorului

Permite gestionarea calculatoarelor din domeniu:
- **Manage:** Conectare la calculator pentru administrare remotă
- **Reset Account:** Resetare relație de încredere cu domeniul

### 5.3 Creare cont de calculator

Calculatoarele se adaugă la domeniu în timpul instalării Windows sau prin:
1. System Properties > Computer Name > Change
2. Selectează "Domain" și introdu domeniul
3. Furnizează credențiale de administrator

---

## 6. Grupuri în Active Directory

### 6.1 Creare grup

**Tipuri de grupuri:**
- **Security groups:** Folosite pentru asignare de drepturi și permisiuni
- **Distribution groups:** Folosite pentru email și comunicare

**Pași de creare:**
1. Right-click pe OU > New > Group
2. Introdu numele grupului
3. Selectează tipul (Security/Distribution)
4. Selectează scope (Domain Local, Global, Universal)

### 6.2 Utilizatori adăugați la grup

Utilizatorii pot fi adăugați la grupuri pentru a primi drepturi și permisiuni colective.

### 6.3 Proprietăți grup

Fiecare grup are proprietăți care pot fi configurate:
- **General:** Nume, descriere, email
- **Members:** Utilizatori și alte grupuri care sunt membri
- **Member Of:** Grupurile din care face parte acest grup

### 6.4 Planificarea grupurilor

**Factori de planificare:**
- **Structura organizațională:** Grupuri pe departamente, proiecte, etc.
- **Drepturi și permisiuni:** Ce drepturi vor avea membrii fiecărui grup?
- **Imbricarea grupurilor:** Cum vor fi organizate grupurile în ierarhie?

### 6.5 Grupuri inglobate într-un Windows Domain

Grupurile pot fi imbricate (un grup poate conține alte grupuri) pentru a simplifica gestionarea permisiunilor.

---

## 7. Instrumente suplimentare pentru gestionare Accounts

### 7.1 Exportare și importare conturi cu csvde

Permite exportarea și importarea în masă a conturilor din/în AD DS.

### 7.2 Căutare în AD DS

Permite căutarea rapidă a obiectelor din AD DS după diverse criterii.

### 7.3 Queries în AD DS cu ADUC

ADUC permite crearea de query-uri pentru a găsi obiecte specifice.

### 7.4 Active Directory Administrative Center (ADAC)

Interfață mai modernă pentru gestionarea AD DS cu funcții avansate.

### 7.5 PowerShell

PowerShell oferă control complet asupra gestionării AD DS prin cmdlets specifice.

---

## 8. Întrebări de Verificare

1. Ce este un Security Identifier (SID) și care sunt caracteristicile sale?
2. Care sunt funcțiile principale ale unei Organizational Unit (OU)?
3. Cum se instalează RSAT pe Windows 10/11?
4. Care sunt diferențele între Security groups și Distribution groups?
5. Ce sunt Managed Service Accounts și pentru ce sunt folosite?
6. Cum se delegă autoritatea administrativă pe o OU?
7. Care sunt pașii pentru a crea un nou cont de utilizator în ADUC?
8. Ce opțiuni sunt disponibile pentru resetarea unui cont blocat?
9. Cum se organizează grupurile în ierarhie (imbricare)?
10. Care sunt avantajele utilizării RSAT pentru administrare remotă?
