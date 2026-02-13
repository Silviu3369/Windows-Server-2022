# Verificare finala curs Windows Server - Ce mai este necesar

## 1. Zone care merita adaugate pentru un curs profesional complet
- Backup si Restore avansat (System State, bare-metal, restore autoritativ AD).
- Disaster Recovery (runbook, RTO/RPO, exercitii de failover).
- Hardening (baseline CIS/Microsoft Security Baselines).
- Patch management (WSUS sau policy controlat de update).
- Automatizare operationala cu PowerShell (scripturi modulare, logging, error handling).
- PKI de baza (AD CS) si certificate in infrastructura interna.
- Introducere in monitoring centralizat (Windows Event Forwarding / SIEM).

## 2. Componenta de evaluare studenti (recomandat)
- quiz teoretic pe module;
- checklist practic obligatoriu per laborator;
- scenarii de troubleshooting evaluate cu timp limitat;
- proiect final: proiectare mini-infrastructura end-to-end.

## 3. Criterii de maturitate ale laboratorului
- [ ] Totul este reproducibil pe o instalare curata.
- [ ] Exista standard de naming + documentatie actualizata.
- [ ] Exista scripturi pentru taskuri repetitive.
- [ ] Exista audit minim pe actiuni administrative.
- [ ] Exista procedura de rollback pentru schimbari majore.

## 4. Prioritate implementare (ordine recomandata)
1. Backup/Restore + DR.
2. Hardening + audit.
3. Automatizare PowerShell.
4. Evaluare formala studenti.
