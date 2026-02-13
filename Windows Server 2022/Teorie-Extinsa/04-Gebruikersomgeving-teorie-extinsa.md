# 04 - Gebruikersomgeving (Mediul utilizatorului): Teorie extinsa

## 1. Home Directories
Home folder-ul centralizeaza datele utilizatorului si simplifica backup-ul. Bune practici:
- folder dedicat per user;
- quota unde este necesar;
- permisiuni stricte (user + admins autorizati).

## 2. Roaming Profiles - cand si cum
Roaming profile sincronizeaza profilul pe mai multe statii.
Avantaj: experienta consistenta.
Riscuri: logon lent, profile corruption, trafic mare.

Recomandare moderna:
- profile locale + folder redirection pentru datele mari.

## 3. Logon Scripts
Scripturile de logon sunt utile pentru:
- mapare drive-uri;
- setari de mediu;
- validari de conformitate.

Preferinta:
- PowerShell semnat in loc de scripturi legacy.
- logging explicit in script pentru troubleshooting.

## 4. Group Policy Fundamentals
Ordine aplicare: LSDOU (Local, Site, Domain, OU).
Instrumente cheie:
- `gpupdate /force`
- `gpresult /r` sau `gpresult /h`
- Event Viewer (GroupPolicy Operational log)

## 5. Folder Redirection
Redirectionarea folderelor (Documents, Desktop) aduce:
- centralizare date;
- backup mai usor;
- migrare simplificata.

Atentie la:
- permisiuni share + NTFS;
- politici Offline Files;
- scenarii de deconectare retea.

## 6. Filtering avansat pentru GPO
- Security Filtering pentru aplicare pe grupuri.
- WMI Filtering pentru aplicare conditionata (versiune OS, hardware).

## 7. Mini-lab
1. Configurati home directory per user.
2. Aplicati logon script de mapare unitati.
3. Activati folder redirection pentru `Documents`.
4. Validati pe doi utilizatori cu roluri diferite.
