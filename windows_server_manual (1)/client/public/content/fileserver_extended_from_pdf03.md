# File Server în Windows Server 2022 - Teorie Detaliată (PDF 03)

## 1. Introducere în File Server

Una dintre funcțiile principale ale unui administrator de rețea este gestionarea accesului utilizatorilor la obiecte din rețea (mapări, foldere, imprimante, etc.).

**Rolul File Server:**
Windows Server poate juca rolul de file server pe rețea. Prin această funcție, serverul permite:
- Stocarea centralizată a datelor
- Replicarea datelor
- Protecția datelor împotriva accesului neautorizat
- Gestionarea centrală a imprimantelor

**Beneficiile pentru utilizatori:**
- Acces la resurse partajate selectiv și într-o manieră user-friendly
- Descoperire rapidă a fișierelor necesare

**Nota Importantă:** Deși rolul file server este discutat, nu este vorba doar de file server în sine, ci și de **sistemul de fișiere NTFS** care este folosit în contextul Windows Server.

---

## 2. Sistemul de Fișiere NTFS

### 2.1 Comprimarea Fișierelor

#### 2.1.1 Comprimarea cu WinZip

WinZip este un instrument popular pentru comprimarea fișierelor în format ZIP. Avantajele:
- Compatibilitate universală (Windows, Mac, Linux)
- Ușor de utilizat
- Suportat pe toate platformele

#### 2.1.2 Comprimarea cu NTFS

NTFS oferă compresie nativă la nivelul sistemului de fișiere:
- **Avantaj:** Transparentă pentru aplicații
- **Dezavantaj:** Doar pe partiții NTFS
- **Performanță:** Poate afecta performanța I/O

### 2.2 Encriptare

#### 2.2.1 Ce este Encriptia?

Encriptia este procesul de transformare a datelor în format ilegibil fără cheia corectă. În Windows Server, encriptia se realizează prin:
- **EFS (Encrypting File System):** Encriptie la nivel de fișier/folder
- **BitLocker:** Encriptie la nivel de disc

#### 2.2.2 Cum Funcționează NTFS Encryption?

NTFS encryption (EFS) funcționează prin:
1. Generarea unei chei de encriptie pentru fișier
2. Stocarea cheii în metadatele fișierului
3. Encriptarea conținutului fișierului cu cheia respectivă

**Caracteristici importante:**
- Transparență pentru utilizator (fișierele se deschid automat dacă ai drepturi)
- Protecție la nivel de fișier individual
- Integrare cu Active Directory

#### 2.2.3 Cum Poate Cineva să Decodifice un Fișier Encriptat?

Doar utilizatorul care a encriptat fișierul (și administratorii cu recovery key) pot accesa fișierul encriptat.

### 2.3 NTFS Machtigingen (Permisiuni NTFS)

#### 2.3.1 Access Tokens și Security Descriptors

Când un utilizator se conectează la un calculator Windows, sistemul creează un **access token** care conține:
- SID-ul utilizatorului
- SID-urile grupurilor din care face parte
- Drepturile și privilegiile utilizatorului

Un **security descriptor** este o structură de date care definește:
- Proprietarul resursei
- Permisiunile pentru resurse (Access Control List - ACL)

#### 2.3.2 Waar Vind Je de Moleculaire Toegangsrechten Tot een Object?

Permisiunile moleculare (granulare) se găsesc în:
- **Properties > Security tab** pentru foldere/fișiere
- **Advanced Security Settings** pentru control detaliat

#### 2.3.3 Determinarea Permisiunilor Moleculare Efective

Permisiunile efective sunt calculate prin:
1. Colectarea tuturor permisiunilor din ACL
2. Aplicarea regulilor de moștenire
3. Calcularea permisiunilor finale (Allow/Deny)

**Reguli importante:**
- **Deny** întotdeauna prevalează asupra **Allow**
- Permisiunile se moștenesc de la parent la child
- Permisiunile explicite prevalează asupra celor moștenite

#### 2.3.4 Waar Vind Je de Atoomaire Toegangsrechten Tot een Object?

Permisiunile atomare (individuale) se găsesc în:
- **Advanced Security Settings > Permission Entries**
- Fiecare intrare definește permisiuni pentru un security principal specific

#### 2.3.5 De Betekenis van de Atoomaire Rechten

Permisiunile atomare includ:
- **Full Control:** Acces complet
- **Modify:** Modificare fișiere
- **Read & Execute:** Citire și execuție
- **Read:** Doar citire
- **Write:** Doar scriere
- **List Folder Contents:** Listare conținut folder

#### 2.3.6 Cum Funcționează Permisiunile NTFS pe un Object?

Procesul de verificare a permisiunilor:
1. Sistemul citește access token-ul utilizatorului
2. Compară SID-urile din token cu ACL-ul resursei
3. Calculează permisiunile efective
4. Permite/refuză accesul

#### 2.3.7 Sfaturi la Instalarea Permisiunilor NTFS

**Best Practices:**
- Utilizează grupuri pentru a gestiona permisiunile
- Evită permisiunile individuale pe fișiere
- Moștenește permisiunile din parent folders
- Testează permisiunile cu conturi de test
- Documentează structura de permisiuni

#### 2.3.8 Încă o Trecere în Revistă a NTFS Security

**Rezumat:**
- Permisiunile NTFS sunt stocate în ACL
- Access tokens conțin informații despre utilizator
- Permisiunile efective sunt calculate din ACL + token
- Deny prevalează asupra Allow
- Moștenirea simplifica gestionarea permisiunilor

---

## 3. File Server Role

### 3.1 Rolul File Server Instalat

Instalarea rolului File Server adaugă:
- Servicii de partajare a fișierelor
- Gestionare de quote-uri
- Caching offline
- Replicare DFS

### 3.2 Mapări Partajate

#### 3.2.1 Cum Pot Mapări Partajate?

Mapările partajate sunt foldere pe server care sunt accesibile prin rețea. Se creează prin:
1. Crearea unui folder pe server
2. Right-click > Share with > Specific people
3. Selectarea utilizatorilor/grupurilor
4. Setarea permisiunilor de share

#### 3.2.2 Cum Creezi o Altă Mapare Proprie de o Bestand?

Se poate crea o mapare proprie prin:
1. Crearea unui folder nou
2. Setarea permisiunilor NTFS
3. Partajarea folder-ului
4. Conectarea clientului la share

### 3.3 Mapări Gedeelde Benadering Vanop een Client

#### 3.3.1 O Gedeelde Map Benadering Via File Explorer

Clientul poate accesa maparea prin:
1. File Explorer > Network
2. Selectarea serverului
3. Dublu-click pe share
4. Introducerea credențialelor dacă este necesar

#### 3.3.2 Via Search Windows

Prin Search Windows, clientul poate găsi share-uri disponibile pe rețea.

#### 3.3.3 Een Mapping Leggen naar een Gedeelde Map

Se poate crea o mapare permanentă prin:
1. Right-click pe share > Map network drive
2. Selectarea literei de drive
3. Opțional: "Reconnect at sign-in"

#### 3.3.4 Een Share Publiceren in Active Directory

Share-urile pot fi publicate în AD DS pentru a fi ușor de găsit:
1. Crearea unui obiect "Shared Folder" în AD
2. Legarea la share-ul fizic
3. Publicarea în AD

### 3.4 Toegangsrechten op een Gedeelde Map

#### 3.4.1 Welke Rechten Kunnen Ingesteld Worden op een Map bij het Delen?

Permisiunile de share includ:
- **Full Control:** Acces complet
- **Change:** Modificare
- **Read:** Doar citire

#### 3.4.2 Overeenkomsten en Verschillen met NTFS Rechten

**Relația Share vs NTFS:**
- Share permissions controlează accesul prin rețea
- NTFS permissions controlează accesul local
- Ambele trebuie să permită accesul (AND logic)
- Permisiunea mai restrictivă prevalează

#### 3.4.3 Wat Gebeurt er als Verschillende Rechten bij Sharing Gecombineerd Worden?

Când sunt combinate permisiuni de share și NTFS:
- Se aplică cea mai restrictivă
- Exemplu: Share = Full, NTFS = Read → Rezultat = Read

#### 3.4.4 Hoe Worden Toegangsrechten Ingesteld bij Sharing Gecombineerd met NTFS Rechten?

Procesul de verificare:
1. Verifica permisiunile de share
2. Verifica permisiunile NTFS
3. Calculează intersecția (cea mai restrictivă)
4. Permite/refuza accesul

#### 3.4.5 Voorbeeld

**Exemplu:**
- Share permissions: Full Control pentru Group1
- NTFS permissions: Read pentru Group1
- Rezultat: Read (cea mai restrictivă)

---

## 4. File Server Resource Management

### 4.1 Ce este File Server Resource Manager?

File Server Resource Manager (FSRM) este o componentă care permite:
- Gestionarea quote-urilor
- Filtrarea fișierelor
- Raportare asupra utilizării resursei
- Clasificare automată a fișierelor

### 4.2 Instalație

FSRM se instalează prin:
1. Server Manager > Add Roles and Features
2. Selectarea "File Server Resource Manager"
3. Finalizarea instalării

### 4.3 Componenta Opstarten

După instalare, FSRM se lansează din:
- Server Manager > Tools > File Server Resource Manager

### 4.4 Rapoarte asupra Opslag van Gegevens

FSRM poate genera rapoarte despre:
- Utilizarea spațiului de stocare
- Fișierele mari
- Fișierele accesate rar
- Clasificarea fișierelor

### 4.5 Quotamanagement

#### 4.5.1 NTFS Disk Quota versus File Server Resource Manager Quota

**Diferențe:**
- NTFS Quota: Limită per utilizator
- FSRM Quota: Limită per folder/volume

#### 4.5.2 Quota Instellen

Se setează prin FSRM:
1. Quota Management > New Quota
2. Selectarea folderului
3. Setarea limitei
4. Configurarea notificărilor

#### 4.5.3 Instellingen voor Quota

Opțiuni de configurare:
- Limita hard (nu permite depășire)
- Limita soft (avertisment)
- Notificări email
- Rapoarte

#### 4.5.4 Een Template Aanpassen

Șabloanele de quota pot fi personalizate pentru a fi reutilizate.

#### 4.5.5 Voorbeeld

**Exemplu de configurare:**
- Folder: \\Server\Data
- Limita: 100 GB
- Notificare la 80%
- Email la administrator

---

## 5. Distributed File System (DFS)

### 5.1 Rolul DFS

DFS permite:
- Crearea unui spațiu de nume unificat
- Replicarea automată între servere
- Transparență pentru utilizator

### 5.2 Cum Funcționează DFS

DFS funcționează prin:
1. Crearea unui spațiu de nume (namespace)
2. Legarea folderelor fizice la namespace
3. Replicarea conținutului între servere
4. Redirecționarea automată a clientului

### 5.3 Componentele DFS

**Componente principale:**
- **Namespace server:** Serverul care găzduiește namespace-ul
- **Replication group:** Grupul de servere care replicează conținut
- **Target:** Serverul fizic care conține datele

### 5.4 Instalație

DFS se instalează prin:
1. Server Manager > Add Roles and Features
2. Selectarea "DFS Namespaces" și "DFS Replication"
3. Finalizarea instalării

### 5.5 DFS Management Opstarten

DFS Management se lansează din:
- Server Manager > Tools > DFS Management

### 5.6 DFS Naamruimten

#### 5.6.1 Terminologie

**Termeni importanți:**
- **Namespace:** Spațiul de nume unificat
- **Root:** Rădăcina namespace-ului
- **Folder:** Folder în namespace
- **Target:** Serverul fizic care conține datele

#### 5.6.2 Een Naamruimte Maken

Se creează prin:
1. DFS Management > New Namespace
2. Selectarea serverului
3. Crearea numelui namespace
4. Configurarea tipului (Standalone/Domain-based)

---

## 6. Shadow Copies (Copii Umbră)

### 6.1 Ce este o Shadow Copy?

O shadow copy este o copie incrementală a fișierelor din anumite momente în timp. Permite:
- Recuperarea fișierelor șterse
- Revenire la versiuni anterioare
- Backup transparent

### 6.2 Planificarea Shadow Copies

Se planifică prin:
1. Selectarea volumelor
2. Setarea frecvenței (zilnic, orar)
3. Setarea numărului de copii reținute
4. Alocarea spațiului de stocare

### 6.3 Activarea Shadow Copies

Se activează prin:
1. Right-click pe volume > Properties
2. Tab "Shadow Copies"
3. Click "Enable"
4. Selectarea planificării

### 6.4 Recuperarea Fișierelor

Utilizatorii pot recupera fișiere prin:
1. Right-click pe folder > Restore previous versions
2. Selectarea versiunii dorite
3. Click "Restore"

---

## 7. Întrebări de Verificare

1. Care sunt principalele funcții ale unui file server?
2. Cum funcționează encriptia NTFS (EFS)?
3. Care este diferența între permisiunile de share și permisiunile NTFS?
4. Ce este File Server Resource Manager și ce funcții oferă?
5. Cum se calculează permisiunile efective pe un fișier?
6. Care sunt componentele principale ale DFS?
7. Cum funcționează shadow copies și pentru ce sunt folosite?
8. Care sunt best practices pentru gestionarea permisiunilor NTFS?
9. Cum se creează și se configurează o mapare de share?
10. Care sunt diferențele între NTFS Quota și FSRM Quota?
