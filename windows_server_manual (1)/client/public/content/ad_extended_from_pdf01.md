# Active Directory Domain Services - Teorie Detaliată din PDF 01

## 1. Conceptul de Network Directory și Evoluția

### 1.1 AD DS - Un Network Directory

Rețelele au apărut ca o necesitate pentru a partaja resurse și a comunica eficient. Inițial, controlul rețelelor era dificil și necesita o metodă de a organiza și partaja informații într-o manieră ordonată.

**Problema Inițială:** Controlul manual al rețelelor era complex, iar partajarea informațiilor despre utilizatori, computere și alte resurse era dificilă.

**Soluția:** Implementarea unui **directory service** - o bază de date centralizată care stochează informații despre toate obiectele din rețea (utilizatori, computere, imprimante, etc.).

### 1.2 Standardul X.500 și Implementarea Microsoft

Microsoft a implementat standardul **X.500** (dezvoltat de IEEE - Institute of Electrical and Electronic Engineers) pentru a crea un sistem eficient de management al rețelei. Această implementare se numește **Active Directory Domain Services (AD DS)**.

**Caracteristici Principale:**
- Directory service geoptimizat pentru management eficient
- Bază de date ierarhică care stochează informații despre obiecte
- Informații stocate sunt separate de informațiile de rețea
- Permite raportarea și gestionarea regulată a datelor

### 1.3 Structura Ierarhică - Analogie cu Telefonul

Structura AD DS este similară cu un registru telefonic:
- **Nivel 1:** Țări (Forest)
- **Nivel 2:** Regiuni/Provincii (Tree)
- **Nivel 3:** Orașe/Comune (Domain)
- **Nivel 4:** Străzi/Adrese (OU - Organizational Unit)

Această organizare permite căutarea rapidă și eficientă a informațiilor fără a fi nevoie să caut prin întreaga bază de date.

## 2. Structura Active Directory Domain Services

### 2.1 Obiectele în AD DS

Toate obiectele din AD DS (utilizatori, computere, imprimante, etc.) sunt reprezentate ca **clase de obiecte**. Fiecare clasă are atribute specifice care o definesc.

**Exemplu:**
- Clasa: User
- Atribute: username, email, telefon, adresă, etc.

### 2.2 Schema AD DS

**Schema-ul** defineș toate clasele și atributele care pot fi folosite în AD DS. Este esențialmente o listă de toate clasele și atributele disponibile.

### 2.3 Naming Convention în AD DS

Obiectele în AD DS sunt identificate printr-un **Distinguished Name (DN)** care urmează o structură ierarhică:

```
CN=Server0,OU=Servers,DC=contoso,DC=com
```

**Componente:**
- **CN (Common Name):** Numele obiectului
- **OU (Organizational Unit):** Unitatea organizațională
- **DC (Domain Component):** Componenta domeniului

### 2.4 Rolul DNS în AD DS

DNS (Domain Name System) joacă un rol crucial în AD DS:
- Permite localizarea obiectelor pe baza numelui
- Permite localizarea Domain Controllers
- Permite localizarea serviciilor (LDAP, Kerberos, etc.)

## 3. Alte Directory Services

AD DS nu este singurul directory service disponibil:
- **eDirectory:** Folosit în rețelele Novell
- **Fedora Directory Server:** Dezvoltat de Red Hat
- **OpenLDAP:** Software open-source pentru diverse sisteme
- **Network Information Service (NIS):** Pentru rețele Unix
- **Sun Java Directory:** Pentru medii Java
- **Metadirectory:** De la Critical Path

## 4. Integrarea AD DS în Sistemul de Operare

AD DS este integral integrat în Windows Server, oferind:
- Management centralizat al utilizatorilor și resurselor
- Politici de securitate la nivel de domeniu
- Distribuția de software și actualizări
- Gestionarea certificatelor
- Autentificare și autorizare

---

## Concepte Cheie pentru Studenți

1. **Directory Service:** O bază de date centralizată care stochează informații despre obiecte din rețea
2. **X.500 Standard:** Standardul internațional pe care se bazează AD DS
3. **Structură Ierarhică:** Organizarea obiectelor în Forest → Tree → Domain → OU
4. **Schema:** Definiția tuturor claselor și atributelor disponibile
5. **Distinguished Name:** Identificatorul unic al unui obiect în AD DS
6. **DNS Integration:** Rolul crucial al DNS în localizarea obiectelor și serviciilor

---

## Întrebări de Verificare

1. Ce este un directory service și de ce este necesar în rețele?
2. Care este diferența între o bază de date tradițională și un directory service?
3. Cum este structurata ierarhic AD DS? Dă exemple.
4. Ce este schema-ul în AD DS?
5. Care este rolul DNS în AD DS?
6. Cum se identifică un obiect în AD DS?

