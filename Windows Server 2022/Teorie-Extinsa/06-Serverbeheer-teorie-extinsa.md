# 06 - Serverbeheer (Administrare server): Teorie extinsa

## 1. Remote Desktop - control si securitate
Remote Desktop este canal critic de administrare. Cerinte minime:
- acces doar prin grupuri administrative dedicate;
- audit logon/logoff;
- MFA/bastion in medii reale.

## 2. MMC custom pentru operare eficienta
Consola MMC personalizata permite:
- centralizare snap-in-uri;
- profiluri diferite pentru L1/L2/L3 support;
- taskpad-uri pentru operatiuni repetitive.

## 3. Task Manager in analiza incidentelor
Folosire avansata:
- corelare CPU/RAM/Disk/Network cu procesul responsabil;
- validare `Services` asociate proceselor;
- identificare leak-uri de memorie.

## 4. Event Viewer - observabilitate operationala
- folositi Custom Views pentru erori recurente;
- mapati Event ID relevante pe servicii critice;
- exportati loguri pentru analiza post-incident.

## 5. Performance Monitor / System Monitor
- colectati baseline inainte de productie;
- definiti counters pe CPU, Memory, Disk, Network, AD DS, DNS;
- setati Data Collector Sets pentru trend analysis.

## 6. Audit logging
Auditul util trebuie sa fie:
- orientat pe risc (logon, schimbari privilegii, acces date sensibile);
- filtrabil;
- corelat cu proceduri de raspuns la incident.

## 7. Mini-lab
1. Activati RDP securizat.
2. Creati MMC custom pentru helpdesk.
3. Definiti Custom View in Event Viewer pentru logon failures.
4. Porniti un Data Collector Set pe 30 minute si analizati rezultatul.
