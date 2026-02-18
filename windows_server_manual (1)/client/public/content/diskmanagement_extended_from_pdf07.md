# Disk Management în Windows Server 2022 - Teorie Detaliată (PDF 07)

## 1. Introducere în Disk Management

Disk Management este instrumentul esențial pentru administrarea discurilor și volumelor în Windows Server. Permite crearea, modificarea și ștergerea partiții, configurarea RAID, și gestionarea spațiului de stocare.

### 1.1 Lansarea Disk Management

```
Server Manager > Tools > Computer Management > Disk Management
```

### 1.2 Interfața Disk Management

**Panoul superior:** Afișează volumele și proprietățile acestora
- Volume
- Layout
- Type
- File System
- Status

**Panoul inferior:** Afișează reprezentarea grafică a discurilor și partiții

---

## 2. Discuri Fizice

### 2.1 Identificare Discuri

Fiecare disc fizic primește o identificare numerică: Disk 0, Disk 1, Disk 2, etc.

**Informații disponibile:**
- Capacitate totală
- Stare (Online, Offline)
- Tip (Basic, Dynamic)
- Partiții și volumuri pe disc

### 2.2 Initialize Disk

Discurile noi trebuie inițializate înainte de utilizare.

**Pași:**
1. Right-click pe disc
2. Selectează "Initialize Disk"
3. Alege stil partiție: MBR sau GPT
4. Finalizează

**MBR vs GPT:**

| Caracteristică | MBR | GPT |
|---|---|---|
| Capacitate maximă | 2 TB | > 2 TB |
| Partiții maxime | 4 primare (sau 3 + 1 extinsă) | 128 partiții |
| Compatibilitate | Sisteme mai vechi | UEFI, sisteme noi |
| Redundanță | Nu | Da (tabel partiții duplicat) |

---

## 3. Basic Disk vs Dynamic Disk

### 3.1 Basic Disk

Mod tradițional de gestionare a discurilor.

**Caracteristici:**
- Partiții primare și extinse
- Partiții logice în partiția extinsă
- Maxim 4 partiții primare (sau 3 + 1 extinsă)
- Compatibilitate universală

**Conversie la Dynamic:**
1. Right-click pe disc
2. Selectează "Convert to Dynamic Disk"
3. Finalizează

### 3.2 Dynamic Disk

Mod avansat care permite volume mai flexibile.

**Caracteristici:**
- Volumuri simple, spanned, striped, mirrored, RAID-5
- Fără limitare de 4 partiții
- Informații de configurare stocate pe disc
- Nu pot fi convertite înapoi la Basic fără pierdere de date

**Avantaje:**
- Volumuri care se pot extinde pe mai multe discuri
- RAID software
- Gestionare mai flexibilă

**Dezavantaje:**
- Nu pot fi folosite pentru boot/system pe unele sisteme
- Compatibilitate redusă cu unele aplicații
- Procesul de recuperare este mai complex

---

## 4. Partiții și Volumuri

### 4.1 Partiții Logice

O partiție este o diviziune logică a unui disc fizic.

**Tipuri:**
- **Partiție Primară:** Poate conține sistem de operare
- **Partiție Extinsă:** Conține partiții logice
- **Partiție Logică:** Unități în partiția extinsă

**Limitări:**
- Maxim 4 partiții primare pe disc MBR
- Maxim 3 primare + 1 extinsă pe disc MBR
- Partiții logice în partiția extinsă: nelimitate

### 4.2 Crearea unei Partiții

**Pași:**
1. Right-click pe spațiu nealocat
2. Selectează "New Simple Volume"
3. Setează dimensiune
4. Alege literă de unitate
5. Formatează (NTFS, FAT32, etc.)
6. Finalizează

### 4.3 Ștergerea unei Partiții

**Pași:**
1. Right-click pe partiție
2. Selectează "Delete Volume"
3. Confirma (atenție: pierde date!)

### 4.4 Montare Partiții

Partiții pot fi montate ca dosare în alte volumuri.

**Avantaje:**
- Fără limitare de litere de unitate
- Organizare mai bună
- Transparență pentru utilizatori

**Pași:**
1. Creează dosar în volum existent
2. Right-click pe partiție
3. Selectează "Properties"
4. Setează mount point

---

## 5. Volumuri Avansate (Dynamic Disks)

### 5.1 Simple Volume

Volum pe un singur disc.

**Utilizări:**
- Stocare de date
- Partiții standard

### 5.2 Spanned Volume

Volum care se extinde pe mai multe discuri.

**Caracteristici:**
- Datele sunt scrise secvențial pe discuri
- Dacă un disc cade, tot volumul este pierdut
- Fără redundanță

**Utilizări:**
- Extindere spațiu de stocare
- Combinare mai multor discuri

**Creație:**
1. Right-click pe spațiu nealocat
2. Selectează "New Spanned Volume"
3. Selectează discuri
4. Setează dimensiune
5. Finalizează

### 5.3 Striped Volume (RAID 0)

Datele sunt distribuite pe mai multe discuri în blocuri.

**Caracteristici:**
- Performanță mai bună (citire/scriere paralele)
- Fără redundanță
- Dacă un disc cade, tot volumul este pierdut
- Minst 2 discuri

**Utilizări:**
- Aplicații care necesită performanță mare
- Baze de date, video editing

**Creație:**
1. Right-click pe spațiu nealocat
2. Selectează "New Striped Volume"
3. Selectează cel puțin 2 discuri
4. Setează dimensiune
5. Finalizează

---

## 6. RAID (Redundant Array of Independent Disks)

### 6.1 RAID 0 - Disk Striping

Distribuie datele pe mai multe discuri.

**Caracteristici:**
- Performanță: Excelentă (n × viteza unui disc)
- Redundanță: Nu
- Spațiu utilizabil: 100%
- Discuri minime: 2

**Risc:** Dacă un disc cade, toate datele sunt pierdute.

### 6.2 RAID 1 - Disk Mirroring

Copiază datele pe două discuri identice.

**Caracteristici:**
- Performanță: Bună (citire pe ambele discuri, scriere pe ambele)
- Redundanță: Totală
- Spațiu utilizabil: 50%
- Discuri necesare: Exact 2

**Avantaje:**
- Redundanță completă
- Recuperare rapidă la defectare
- Performanță bună la citire

**Dezavantaje:**
- Scump (50% spațiu pierdut)
- Performanță la scriere redusă

### 6.3 RAID 5 - Striping cu Parity

Distribuie datele și informații de paritate pe mai multe discuri.

**Caracteristici:**
- Performanță: Bună
- Redundanță: Paritate distribuită
- Spațiu utilizabil: (n-1)/n × 100%
- Discuri minime: 3
- Discuri maxime: 32

**Cum funcționează:**
- Datele sunt împărțite în blocuri
- Paritatea este calculată și distribuită pe discuri
- Dacă un disc cade, datele pot fi reconstruite din paritate
- Reconstrucția: lentă, dar posibilă

**Utilizări:**
- Servere cu cerințe mari de disponibilitate
- Stocare enterprise

**Avantaj vs RAID 1:**
- Spațiu mai eficient (1/3 pierdut vs 1/2)
- Cost mai mic

**Dezavantaj:**
- Reconstrucție lentă
- Risc la defectare simultană a 2 discuri

### 6.4 Disk Duplexing

Variație a RAID 1 cu controlere separate pentru fiecare disc.

**Avantaje:**
- Redundanță la nivel de controler
- Performanță mai bună

---

## 7. DiskPart - Gestionare prin Command Line

DiskPart este utilitar command-line pentru gestionarea discurilor și volumelor.

### 7.1 Lansarea DiskPart

```
diskpart
```

### 7.2 Comenzi Principale

**Listare discuri:**
```
list disk
```

**Selectare disc:**
```
select disk 1
```

**Listare volume:**
```
list volume
```

**Selectare volum:**
```
select volume 2
```

**Crearea partiție:**
```
create partition primary size=10000
```

**Formatare:**
```
format fs=ntfs quick
```

**Ștergere partiție:**
```
delete partition
```

**Convertire la Dynamic:**
```
convert dynamic
```

### 7.3 Scripturi DiskPart

Pot fi create scripturi pentru automatizare.

**Exemplu script:**
```
list disk
select disk 1
clean
create partition primary
format fs=ntfs quick
assign letter=E
```

**Execuție:**
```
diskpart /s script.txt
```

---

## 8. Best Practices

### 8.1 Planificare Stocare

- Planifică capacitate pentru 3-5 ani
- Lasă 20-30% spațiu liber pe volumuri
- Monitorizează utilizare regulat

### 8.2 Redundanță

- Folosește RAID 1 sau RAID 5 pentru date critice
- Backup-uri regulate
- Testează recuperarea

### 8.3 Performanță

- RAID 0 pentru performanță (fără redundanță)
- RAID 5 pentru balanță între performanță și redundanță
- Monitorizează I/O și latență

### 8.4 Gestionare

- Documentează configurația
- Monitorizează starea discurilor
- Planifică înlocuirea discurilor înainte de defectare

---

## 9. Troubleshooting

### 9.1 Disc Offline

**Cauze:** Defectare hardware, conexiune slabă, probleme driver

**Soluții:**
1. Verifică conexiunea fizică
2. Right-click pe disc > "Bring Online"
3. Actualizează drivere
4. Verifică Event Viewer pentru erori

### 9.2 Volum Degraded

**Cauze:** Defectare disc în RAID 5, probleme I/O

**Soluții:**
1. Identifică discul defect
2. Înlocuiește discul
3. Reconstrucția automată (lent)
4. Monitorizează progresul

### 9.3 Spațiu Insuficient

**Soluții:**
1. Șterge fișiere inutile
2. Comprimă fișiere
3. Extinde volum (dacă spațiu nealocat disponibil)
4. Adaugă disc nou

---

## 10. Întrebări de Verificare

1. Care sunt diferențele între MBR și GPT?
2. Care sunt diferențele între Basic și Dynamic Disk?
3. Ce este Spanned Volume și care sunt utilizările?
4. Cum funcționează RAID 0 și care sunt riscurile?
5. Cum funcționează RAID 1 și care sunt avantajele?
6. Cum funcționează RAID 5 și cum se reconstruiesc datele?
7. Care sunt pașii pentru crearea unui Striped Volume?
8. Cum se folosește DiskPart pentru gestionarea discurilor?
9. Ce este Disk Duplexing?
10. Care sunt best practices pentru planificare stocare?
