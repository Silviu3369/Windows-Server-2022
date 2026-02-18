# Structura Active Directory

## Introducere

Active Directory Domain Services (AD DS) reprezintă implementarea Microsoft a standardului X.500 pentru servicii de director de rețea. În calitate de instructor IT senior, voi explica pas cu pas cum funcționează AD DS, de la conceptele fundamentale până la implementarea practică în medii enterprise.

## 1. Concepte Fundamentale

### 1.1 Evoluția Rețelelor: De la Peer-to-Peer la Directory

**Context Istoric:**
Rețelele de calculatoare au apărut inițial ca un mijloc simplu de partajare a resurselor hardware (imprimante, scanere) și spațiului de stocare între calculatoare. Aceste rețele timpurii foloseau modelul **peer-to-peer**, în care fiecare calculator era egal cu celelalte și administrarea se făcea individual pe fiecare mașină.

**Provocările Modelului Peer-to-Peer:**
Pe măsură ce rețelele au crescut, modelul peer-to-peer a devenit ineficient din cauza:
- Administrare descentralizată (fiecare calculator trebuia configurat separat)
- Lipsa unei baze de date centrale cu utilizatori
- Dificultăți în aplicarea politicilor de securitate uniforme
- Imposibilitatea gestionării centralizate a resurselor

**Soluția: Network Directory:**
Pentru a simplifica administrarea rețelelor moderne, acestea au evoluat către un model bazat pe **directory** (director de rețea) - o bază de date centralizată care stochează informații despre toate obiectele din rețea și permite administrarea centralizată.

### 1.2 Standardul X.500 și Implementarea Microsoft

**Standardul X.500:**
X.500 este un standard internațional dezvoltat de IEEE (Institute of Electrical and Electronic Engineers) pentru servicii de director. Acest standard definește:
- Structura ierarhică a informațiilor
- Protocoale de acces la director (LDAP - Lightweight Directory Access Protocol)
- Metode de autentificare și securitate
- Mecanisme de replicare

**Active Directory Domain Services (AD DS):**
Microsoft a implementat standardul X.500 în Windows Server sub forma AD DS, începând cu Windows 2000 Server. AD DS este integrat în sistemul de operare și oferă:
- Administrare centralizată a rețelei
- Autentificare și autorizare utilizatori
- Gestionarea politicilor de grup (Group Policy)
- Replicare automată între servere
- Scalabilitate pentru milioane de obiecte

### 1.3 Directory vs Database: Diferențe Fundamentale

**Directory (Director):**
Un directory este o bază de date **optimizată pentru citire**. Caracteristici:
- Obiectele sunt citite foarte frecvent (de exemplu, autentificare utilizatori)
- Obiectele sunt modificate rar (de exemplu, schimbare parolă ocazională)
- Structură ierarhică (nu relațională)
- Replicare multi-master (modificări pe orice server)

**Database (Bază de Date Relațională):**
O bază de date relațională este **optimizată pentru scriere și modificare frecventă**. Caracteristici:
- Datele se modifică constant (de exemplu, tranzacții bancare)
- Structură relațională (tabele cu relații)
- De obicei, un singur master pentru scriere

**De ce este Important?**
Înțelegerea acestei diferențe explică de ce AD DS este atât de rapid la autentificare (operație de citire) și de ce modificările (de exemplu, adăugare utilizatori) se propagă cu o ușoară întârziere prin replicare.

### 1.4 Ce Informații Stochează AD DS?

**Obiecte în AD DS:**
Baza de date AD DS stochează informații despre toate obiectele din rețea:
- **Users** (Utilizatori): conturi de autentificare, date personale
- **Computers** (Calculatoare): workstation-uri, servere
- **Printers** (Imprimante): resurse de printare partajate
- **Groups** (Grupuri): colecții de utilizatori pentru administrare
- **Organizational Units** (OU-uri): containere pentru organizare logică
- **Group Policy Objects** (GPO-uri): politici de configurare

**Informații Extinse:**
Pe lângă datele tehnice necesare pentru funcționarea rețelei, AD DS poate stoca orice tip de informație despre utilizatori:
- Adresă personală, număr de telefon, număr GSM
- Departament, titlu job, manager
- Pagină web, fotografie
- Orice atribut personalizat definit de organizație

**Directory Service:**
Un **directory service** este componenta software care permite interogarea și modificarea datelor din baza de date directory. În Windows, acest serviciu se numește **Active Directory Domain Services**.

## 2. Structura Ierarhică AD DS

### 2.1 Analogia cu Cartea de Telefon

Pentru a înțelege structura ierarhică a AD DS, să folosim analogia cu o carte de telefon națională:

**Problema:** Dacă toate numele din țară ar fi listate alfabetic într-o singură listă, căutarea ar dura foarte mult.

**Soluția Ierarhică:**
1. Împarte pe **țară** (nivel superior)
2. Apoi pe **provincie** (nivel intermediar)
3. Apoi pe **comună** (nivel local)
4. Abia apoi **alfabetic pe nume** (nivel individual)

**Căutare Eficientă:**
Pentru a găsi numărul lui Jean Peeters din Deurne, Antwerpen:
1. Mergi la provincia Antwerpen
2. Apoi la comuna Deurne
3. Apoi cauți alfabetic Peeters

**Aplicare în AD DS:**
Același principiu se aplică în AD DS. Un utilizator nu este numit simplu "Jean", ci **Jean.opleidingen.intra** (Jean din domeniul opleidingen.intra). Un calculator nu este "Server0", ci **Server0.opleidingen.intra**.

### 2.2 Rolul DNS în AD DS

**Similaritate cu Internet:**
Numele obiectelor în AD DS seamănă cu URL-urile de pe Internet. Pe Internet, **DNS (Domain Name System)** traduce numele de domeniu (www.example.com) în adrese IP.

**DNS în AD DS:**
În AD DS, DNS joacă un rol **crucial și esențial**:
- Localizează domain controllers pe bază de nume
- Rezolvă numele obiectelor în adrese IP
- Folosește înregistrări speciale **SRV (Service Records)** pentru a găsi servicii
- **Fără DNS funcțional, AD DS nu poate funcționa!**

## 3. Componente Logice AD DS

### 3.1 Imaginea Globală: Forest → Tree → Domain → OU

Active Directory Domain Services folosește o structură ierarhică cu patru niveluri logice:

```
FOREST (Pădure)
  └── TREE (Arbore)
        └── DOMAIN (Domeniu)
              └── ORGANIZATIONAL UNIT (OU)
```

**Relații:**
- Un AD DS = Un Forest (relație 1:1)
- Un Forest poate conține unul sau mai multe Trees
- Un Tree poate conține unul sau mai multe Domains
- Un Domain poate conține mai multe Organizational Units

### 3.2 FOREST (Pădure) - Nivelul Superior

**Definiție:**
Un **forest** este containerul de nivel superior în AD DS. Reprezintă întreaga structură de director și are o **limită de securitate** clară.

**Caracteristici Forest:**
- Conține UN singur AD DS (relație 1:1)
- Are o **schemă comună** pentru toate domeniile
- Are un grup de **Enterprise Administrators** cu drepturi pe toate domeniile
- Toate domeniile din forest au **trust relationships automate**

**Principiu de Design:**
În majoritatea organizațiilor, **un singur forest** este suficient și recomandat. Structuri cu multiple forests complică administrarea semnificativ.

**Când să Folosești Multiple Forests:**
Doar în situații speciale:
- **Forest de testare:** Pentru testarea configurațiilor înainte de implementare în producție
- **Forest de dezvoltare:** Pentru dezvoltatori să testeze software fără a afecta producția
- **Izolare totală:** Date extrem de sensibile care nu trebuie accesibile niciunui administrator din forest-ul principal

**Enterprise Administrators:**
Primul administrator care creează primul domeniu dintr-un forest devine automat **Enterprise Administrator** și primește drepturi de administrare asupra **tuturor domeniilor** din forest. Acest rol este extrem de puternic și trebuie protejat corespunzător.

### 3.3 TREE (Arbore) - Namespace Ierarhic

**Definiție:**
Un **tree** este o colecție ierarhic structurată de domenii care partajează un **namespace comun** (spațiu de nume continuu).

**Exemplu Tree:**
```
contoso.com (root domain)
  ├── sales.contoso.com (child domain)
  ├── marketing.contoso.com (child domain)
  └── europe.contoso.com (child domain)
        └── uk.europe.contoso.com (grandchild domain)
```

**Relații Parent-Child:**
- **contoso.com** este **parent** (părinte) pentru sales.contoso.com
- **sales.contoso.com** este **child** (copil) al contoso.com
- Relația este **ierarhică** și **tranzitivă**

**Multiple Trees într-un Forest:**
Un forest poate conține multiple trees cu namespace-uri diferite:
- Tree 1: **contoso.com** (namespace principal)
- Tree 2: **fabrikam.local** (namespace secundar)

Ambele trees partajează aceeași schemă și sunt sub autoritatea acelorași Enterprise Administrators, dar au namespace-uri diferite.

**Când să Folosești Multiple Trees:**
- După o **fuziune/achiziție** de companii (fiecare companie își păstrează propriul namespace)
- Pentru **separare logică** a unor divizii cu identități distincte
- Pentru **compatibilitate** cu sisteme legacy care necesită namespace-uri specifice

### 3.4 DOMAIN (Domeniu) - Unitatea de Administrare

**Definiție:**
Un **domain** este o colecție de obiecte (utilizatori, calculatoare, resurse) care pot fi administrate centralizat cu ajutorul unei singure baze de date.

**Caracteristici Domain:**
- Are propria **bază de date** cu utilizatori, calculatoare, grupuri
- Este administrat de **Domain Controllers** (DC)
- Are propriii **Domain Administrators**
- Este **unitatea de replicare** (replicare intensă în domeniu, mai puțină între domenii)
- Este **limita de aplicare** a Group Policy Objects (GPO)

**Domain Controller (DC):**
Un **Domain Controller** este un server Windows care:
- Stochează o copie a bazei de date AD DS pentru domeniu
- Procesează autentificări de utilizatori
- Procesează modificări în baza de date
- Replică modificările către alte DC-uri din domeniu

**Principiu Important:**
- Fiecare domeniu are **cel puțin UN** domain controller
- Un domain controller aparține **UNUI SINGUR** domeniu
- Se recomandă **minimum DOI** domain controllers per domeniu pentru **fault tolerance**

**Replicare Multimaster:**
Toți domain controllers dintr-un domeniu dețin o **copie identică** a bazei de date. Modificările pot fi făcute pe **oricare DC** și sunt apoi replicate automat către toți ceilalți DC prin **multimaster replication**.

**Exemplu Replicare:**
1. Administrator creează utilizator nou pe DC1
2. DC1 replică modificarea către DC2 și DC3
3. După câteva secunde/minute, toți DC au utilizatorul nou
4. Utilizatorul se poate autentifica pe oricare DC

**Principiu de Design: "Mai Puține Domenii = Mai Simplu"**
Similar cu forests, se recomandă **cât mai puține domenii posibil**. Fiecare domeniu adițional adaugă complexitate administrativă.

**Când să Folosești Multiple Domenii:**
Doar în situații specifice:
1. **Administrare Descentralizată:** Părți ale organizației care trebuie administrate de echipe complet independente
2. **Limitare Trafic Replicare:** Domenii mari generează mult trafic de replicare intern
3. **Conexiuni Lente:** Între locații cu conexiuni lente, traficul între domenii este mai redus decât în domeniu
4. **Limitare Dimensiune Bază de Date:** Domenii mai mici = baze de date mai mici și mai rapide

**Domain Administrators:**
Fiecare domeniu are propriii **Domain Administrators** care au drepturi complete de administrare **doar pe acel domeniu**. Aceștia NU au drepturi pe alte domenii (spre deosebire de Enterprise Administrators).

### 3.5 ORGANIZATIONAL UNIT (OU) - Organizare Logică

**Definiție:**
O **Organizational Unit (OU)** este un container logic în cadrul unui domeniu care permite:
- Organizarea obiectelor în structuri ierarhice
- Delegarea controlului administrativ
- Aplicarea Group Policy Objects (GPO)

**Structură OU Tipică:**
```
contoso.com (domain)
  ├── Departments (OU)
  │     ├── Sales (OU)
  │     ├── Marketing (OU)
  │     └── IT (OU)
  ├── Servers (OU)
  │     ├── File Servers (OU)
  │     └── Web Servers (OU)
  └── Workstations (OU)
        ├── Desktops (OU)
        └── Laptops (OU)
```

**Avantaje OU:**
- **Flexibilitate:** Pot fi create, șterse, mutate fără a afecta structura de domenii
- **Delegare:** Poți delega drepturi administrative pe OU-uri specifice
- **Group Policy:** Poți aplica GPO-uri diferite pe OU-uri diferite
- **Organizare Logică:** Reflectă structura organizațională a companiei

## 4. Trust Relationships (Relații de Încredere)

### 4.1 Conceptul de Trust

**Definiție:**
Un **trust relationship** (relație de încredere) permite utilizatorilor dintr-un domeniu să acceseze resurse dintr-un alt domeniu.

**Exemplu:**
- Utilizator Jean din domeniul **sales.contoso.com**
- Folder partajat pe domeniul **marketing.contoso.com**
- Trust relationship permite lui Jean să acceseze folderul (dacă are permisiuni)

### 4.2 Tipuri de Trust

**1. Two-Way Trust (Simetric):**
- Domeniul A are încredere în domeniul B
- Domeniul B are încredere în domeniul A
- Utilizatori din A pot accesa resurse în B și invers

**2. One-Way Trust (Asimetric):**
- Doar o direcție de încredere
- Exemplu: Domeniul A are încredere în B, dar B nu are încredere în A

**3. Transitive Trust:**
- Dacă A → B și B → C, atunci A → C automat
- Tranzitivitatea se propagă prin ierarhie

**4. Non-Transitive Trust:**
- Trust direct între două domenii, fără propagare

### 4.3 Trust Automat în AD DS

**Windows Server creează automat trust relationships:**
- **Între Parent și Child:** Two-way transitive trust
- **Între Trees dintr-un Forest:** Two-way transitive trust
- **Între toate domeniile dintr-un Forest:** Two-way transitive trust prin tranzitivitate

**Rezultat:**
Un utilizator dintr-un domeniu poate accesa resurse pe **orice alt domeniu** din forest (cu permisiunile corecte), fără configurare manuală de trust.

## 5. Roluri Administrative

### 5.1 Enterprise Administrators
- Drepturi pe **toate domeniile** din forest
- Pot modifica schema AD DS
- Pot adăuga/șterge domenii din forest
- **Rol extrem de puternic** - folosit doar pentru operații critice

### 5.2 Domain Administrators
- Drepturi pe **un singur domeniu**
- Pot crea utilizatori, grupuri, OU-uri în domeniul lor
- Pot delega drepturi administrative
- **Rol zilnic** pentru administrarea domeniului

### 5.3 OU Administrators (Delegați)
- Drepturi pe **OU-uri specifice**
- Pot administra doar obiectele din OU-ul delegat
- **Rol pentru administrare descentralizată**

## 6. Best Practices de Design

### 6.1 Principii Generale
1. **Simplitate:** Un forest, un domeniu dacă este posibil
2. **Planificare:** Design-ul AD DS este dificil de modificat ulterior
3. **Securitate:** Separare clară între roluri administrative
4. **Scalabilitate:** Planifică pentru creștere viitoare

### 6.2 Recomandări Concrete
- **Un forest** pentru întreaga organizație
- **Un domeniu** dacă nu există motive clare pentru multiple domenii
- **OU-uri** pentru organizare logică și aplicare GPO
- **Minimum 2 DC** per domeniu pentru redundanță
- **DNS redundant** (minimum 2 servere DNS)

## 7. Verificare Cunoștințe

**Întrebări pentru Studenți:**
1. Care este diferența dintre un directory și o bază de date relațională?
2. De ce este DNS esențial pentru funcționarea AD DS?
3. Care este relația dintre Forest, Tree, Domain și OU?
4. Ce înseamnă "trust tranzitiv" și de ce este important?
5. Când ar fi justificat să creezi multiple domenii într-un forest?
6. Care este diferența dintre Enterprise Administrator și Domain Administrator?
