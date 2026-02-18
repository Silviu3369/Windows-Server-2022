# DNS și Networking în Windows Server - Teorie Detaliată din PDF 01

## 1. Instalarea Domain Controller și Cerințe Preliminare

### 1.1 Cerințe Hardware și Software

Înainte de a instala Active Directory Domain Services, serverul trebuie să îndeplinească anumite cerințe:

**Cerințe Hardware:**
- Hard disk: Minim 10 GB, recomandat 40 GB sau mai mult
- Memorie RAM: Minim 2 GB (recomandat 4 GB+)
- Procesor: Minim Pentium 1 GHz (recomandat 2 GHz+)

**Cerințe Software:**
- Windows Server 2022 instalat și actualizat
- Acces administrativ la server
- Adresă IP statică (nu DHCP)

### 1.2 Instalarea AD DS

Instalarea Active Directory Domain Services se realizează în două etape:

**Etapa 1:** Instalarea rolului AD DS via Server Manager
**Etapa 2:** Configurarea avansată cu AD DS Installation Wizard (DCPROMO.EXE)

După instalare, serverul devine **Domain Controller (DC)** și poate gestiona domeniul.

---

## 2. Rolul DNS în Active Directory

### 2.1 Importanța DNS în AD DS

DNS (Domain Name System) este **esențial** pentru funcționarea corectă a Active Directory. Fără DNS, AD DS nu poate funcționa:

- **Rezolvare de Nume:** Convertește numele domeniului în adrese IP
- **Localizarea Serviciilor:** Permite clienților să găsească Domain Controllers
- **Localizarea Resurselor:** Permite găsirea imprimantelor, serverelor de fișiere, etc.

### 2.2 DNS pe Internet vs DNS Intern

**DNS pe Internet:**
- Gestionat de furnizorii de internet (ISP)
- Rezolvă domenii publice (www.vdab.be)
- Necesită înregistrare la autorități DNS

**DNS Intern (pentru AD DS):**
- Gestionat de organizație
- Rezolvă domenii interne (contoso.com)
- Minim un server DNS este necesar
- Recomandare: Doi servere DNS pentru redundanță

### 2.3 Naming Convention pentru Domenii Interne

Microsoft recomandă respectarea RFC 2606 pentru domenii interne. Opțiuni disponibile:

**Sufixe Recomandate:**
- `.test`
- `.example`
- `.invalid`
- `.localhost`

**Exemple de Domenii Valide:**
- `example.com`
- `example.net`
- `example.org`

### 2.4 Diferența între Domeniu Intern și Domeniu Internet

Deși ambele folosesc DNS, sunt diferite:

| Aspect | Domeniu Intern | Domeniu Internet |
|--------|---|---|
| Gestionare | Organizație | ISP / Registrar |
| Acces | Numai în rețea internă | Public pe internet |
| Sufixe | .test, .example, .invalid | .com, .net, .org, etc. |
| Rezolvare | Server DNS intern | Servere DNS publice |

---

## 3. Tipuri de Înregistrări DNS

DNS stochează informații sub formă de **înregistrări** organizate în zone. Fiecare tip de înregistrare conține informații specifice:

### 3.1 A Records (Address Records)

**Descriere:** Cel mai comun tip de înregistrare. Conectează un nume la o adresă IPv4.

**Exemplu:**
```
vdab.be  →  193.53.101.103
```

Atunci când ceri `vdab.be`, DNS răspunde cu adresa IP `193.53.101.103`.

### 3.2 AAAA Records (IPv6 Address Records)

**Descriere:** Similar cu A records, dar pentru adrese IPv6.

**Exemplu:**
```
vdab.be  →  2001:db8::1
```

Permite conectarea la resurse IPv6.

### 3.3 SOA Records (Start of Authority)

**Descriere:** Înregistrare importantă care definește autoritatea pentru o zonă DNS.

**Conține:**
- Serverul DNS primar
- Serverul DNS secundar
- Email administratorului
- Informații de caching

**Exemplu:**
```
Zone: contoso.com
Primary NS: ns1.contoso.com
Secondary NS: ns2.contoso.com
Administrator: admin@contoso.com
```

### 3.4 CNAME Records (Canonical Name)

**Descriere:** Creează un alias pentru un alt nume. Util pentru servere cu multiple nume.

**Exemplu:**
```
ftp.vdab.be  →  www.vdab.be
```

Atunci când ceri `ftp.vdab.be`, DNS te redirecționează la `www.vdab.be`.

### 3.5 MX Records (Mail Exchange)

**Descriere:** Specifică serverul de email pentru un domeniu.

**Exemplu:**
```
Domeniu: vdab.be
Mail Server: mail.vdab.be
```

Când trimiți email la `user@vdab.be`, sistemul folosește MX record pentru a găsi serverul de email.

---

## 4. Service Records în AD DS

Atunci când instalezi AD DS, DCPROMO.EXE creează automat **service records** în DNS. Aceste înregistrări permit clienților să descopere serviciile disponibile:

### 4.1 Tipuri de Service Records

Clienții folosesc service records pentru a găsi:
- **Domain Controllers** pentru autentificare
- **Global Catalog** pentru căutări în domeniu
- **Kerberos** pentru autentificare securizată
- **LDAP** pentru interogări directory

### 4.2 Exemplu de Service Records

```
_ldap._tcp.dc._msdcs.contoso.com
_kerberos._tcp.dc._msdcs.contoso.com
_gc._tcp.contoso.com
```

Clienții interogheaza aceste înregistrări pentru a descoperi serviciile disponibile.

---

## 5. Configurarea DNS pentru AD DS

### 5.1 Instalarea DNS Server Role

DNS trebuie instalat pe serverul care va fi Domain Controller. Instalarea se face via Server Manager:

**Pași:**
1. Deschide Server Manager
2. Selectează "Add Roles and Features"
3. Alege "DNS Server" din lista de roluri
4. Completează instalarea

### 5.2 Configurarea DNS Server

După instalare, DNS trebuie configurat pentru a funcționa cu AD DS:

**Pași:**
1. Deschide DNS Manager
2. Creează o nouă zonă pentru domeniu (ex: contoso.com)
3. Configurează forwarders pentru rezolvarea domeniilor externe
4. Testează rezolvarea de nume

### 5.3 Testarea DNS

Atât pe server cât și pe client, trebuie testat dacă serviciul DNS funcționează corect:

**Testare pe Server:**
```powershell
nslookup localhost
nslookup contoso.com
```

**Testare pe Client:**
```powershell
nslookup contoso.com
nslookup domaincontroller.contoso.com
```

Dacă rezolvarea funcționează, clienții pot găsi Domain Controller și alte servicii.

---

## 6. Instalarea AD DS în Practică

### 6.1 Pași Generali

Instalarea AD DS se realizează în două faze:

**Faza 1: Instalarea Rolului via Server Manager**
- Deschide Server Manager
- Selectează "Add Roles and Features"
- Alege "Active Directory Domain Services"
- Alege "DNS Server" (dacă nu este deja instalat)
- Completează instalarea

**Faza 2: Configurarea cu DCPROMO**
- După instalarea rolului, apare o notificare
- Selectează "Promote this server to a domain controller"
- Completează AD DS Installation Wizard

### 6.2 AD DS Installation Wizard

Wizard-ul solicită informații importante:

**Informații Necesare:**
- **Deployment Operation:** Creare domeniu nou sau adăugare DC la domeniu existent
- **Domain Name:** Numele domeniului (ex: contoso.com)
- **NetBIOS Name:** Nume scurt pentru compatibilitate (ex: CONTOSO)
- **Forest Functional Level:** Nivelul de compatibilitate (2016, 2019, 2022)
- **Database Location:** Locul unde sunt stocate datele AD
- **SYSVOL Location:** Locul unde sunt stocate politicile

---

## 7. Verificarea Instalării

După instalare, verific că totul funcționează corect:

### 7.1 Verificări în Server Manager

- AD DS apare în lista de roluri instalate
- Notificări despre DCPROMO completat
- Server Manager arată statusul serviciilor

### 7.2 Verificări în DNS Manager

- Zona pentru domeniu este creată
- Service records sunt prezente
- Rezolvarea de nume funcționează

### 7.3 Verificări în Active Directory Users and Computers

- Domeniu este vizibil
- OU-uri implicite sunt create (Users, Computers, etc.)
- Utilizatori impliciti sunt prezenti

---

## Concepte Cheie pentru Studenți

1. **DNS este esențial:** AD DS nu poate funcționa fără DNS
2. **Service Records:** Permit clienților să descopere serviciile
3. **Naming Convention:** Respectă RFC 2606 pentru domenii interne
4. **Tipuri de Înregistrări:** A, AAAA, SOA, CNAME, MX sunt cele mai comune
5. **Testare:** Testează DNS pe server și client după instalare
6. **Redundanță:** Recomandare: doi servere DNS pentru disponibilitate

---

## Întrebări de Verificare

1. De ce este DNS esențial pentru AD DS?
2. Care sunt diferențele între DNS intern și DNS public?
3. Ce sunt service records și cum sunt folosite?
4. Cum se testează dacă DNS funcționează corect?
5. Care sunt pașii pentru instalarea AD DS?
6. Ce informații sunt necesare în AD DS Installation Wizard?
7. Cum verifici că instalarea a fost reușită?

