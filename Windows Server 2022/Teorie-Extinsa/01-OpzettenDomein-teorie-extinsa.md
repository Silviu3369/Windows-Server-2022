# 01 - OpzettenDomein (Active Directory Domain Services): Teorie extinsa

## 1. AD DS ca serviciu de identitate
Active Directory Domain Services (AD DS) este nucleul de identitate al domeniului. Ofera:
- autentificare centralizata (Kerberos, NTLM fallback);
- autorizare pe baza de grupuri si ACL-uri;
- director ierarhic pentru obiecte (utilizatori, computere, grupuri, OU).

## 2. Componente logice esentiale
- Forest: frontiera de securitate maxima.
- Domain: unitate administrativa si de replicare partiala.
- OU: container administrativ pentru delegare si GPO.
- Trust: relatii de incredere intre domenii/foresturi.

Regula practica: nu proiectati OU "dupa organigrama temporara", ci dupa modelul de administrare si aplicare politici.

## 3. Componente fizice
- Domain Controller (DC): server cu baza de date AD + servicii critice.
- Site-uri AD: optimizeaza replicarea in functie de topologia de retea.
- Replicare: intrasite (rapid), intersite (controlata prin schedule/cost).

## 4. FSMO Roles explicate operational
- Schema Master
- Domain Naming Master
- RID Master
- PDC Emulator
- Infrastructure Master

Pentru laborator, documentati unde sunt rolurile FSMO si cum verificati starea lor.

## 5. DNS integrat cu AD
AD depinde de DNS pentru localizarea serviciilor (`_ldap._tcp`, `_kerberos`).
Fara DNS corect, autentificarea si join-ul in domeniu vor esua.

## 6. Etape profesioniste de implementare domeniu
1. Pregatire server (nume, IP static, timp sincronizat).
2. Instalare rol AD DS + DNS.
3. Promovare DC cu naming corect (ex: `corp.local` in lab).
4. Verificare servicii (`dcdiag`, `repadmin`, DNS Manager).
5. Backup initial System State.

## 7. Probleme frecvente
- DNS setat spre gateway in loc de DNS local pe DC.
- Time skew > 5 minute, care rupe Kerberos.
- Folosirea excesiva a contului Administrator in loc de conturi delegate.

## 8. Mini-lab de validare
- Creati un OU nou pentru studenti.
- Creati 2 useri si 1 grup global.
- Aplicati o GPO simpla pe OU.
- Validati cu `gpresult /r` pe client.
