# 00 - Inleiding (Introducere): Teorie extinsa

## 1. Rolul Windows Server in arhitectura enterprise
Windows Server nu este doar un sistem de operare, ci platforma centrala de servicii pentru identitate, retea, stocare si securitate. Intr-un mediu profesional, serverul este punctul de control pentru autentificare, autorizare, politici de grup, partajare de resurse si audit.

## 2. Client vs Server - perspectiva operationala
- Clientul consuma servicii (fisiere, imprimare, aplicatii, autentificare).
- Serverul ofera servicii, aplica reguli si mentine consistenta intre sute sau mii de endpoint-uri.
- Diferenta critica: predictibilitatea operationala. Un client poate cadea local; un server afecteaza multi utilizatori simultan.

## 3. Editii si scenarii de folosire
- Standard: potrivit pentru majoritatea laboratoarelor si IMM.
- Datacenter: pentru virtualizare intensa, izolari multiple, functii avansate de centru de date.
- Core vs Desktop Experience:
- Server Core: suprafata de atac mai mica, consum redus de resurse, administrare remote.
- Desktop Experience: utila pentru training initial si troubleshooting vizual.

## 4. Cerinte de proiectare in laborator
Inainte de instalare, definiti clar:
- modelul de adresare IP;
- naming convention (ex: `DC01`, `FS01`, `CL11-01`);
- structura OU;
- standard de parole si policy de securitate;
- matrice roluri (cine este Domain Admin, cine este Helpdesk).

## 5. Principii de baza pentru un curs profesionist
- Repetabilitate: fiecare laborator trebuie sa poata fi reconstruit de la zero.
- Trasabilitate: toate modificarile importante trebuie jurnalizate.
- Validare: dupa fiecare pas de configurare exista test functional.
- Segmentare: separare clara intre management, servere si clienti.

## 6. Checklist minim dupa introducere
- [ ] Aveti schema de retea documentata.
- [ ] Aveti schema de roluri si responsabilitati.
- [ ] Aveti baseline de securitate.
- [ ] Aveti plan de backup pentru date de laborator.
