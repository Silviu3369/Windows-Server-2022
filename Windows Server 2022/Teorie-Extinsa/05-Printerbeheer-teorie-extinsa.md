# 05 - Printerbeheer (Print Server): Teorie extinsa

## 1. Rolul Print Server-ului in infrastructura
Print Server centralizeaza:
- cozi de imprimare;
- drivere;
- politici de acces;
- audit pentru consum si incidente.

## 2. Arhitectura recomandata
- server dedicat sau rol separat pe server stabil;
- monitorizare spooler;
- drivere standardizate pe model imprimanta.

## 3. Delegare si securitate
Roluri tipice:
- Print Administrators: management complet;
- Helpdesk: pauza/restart joburi;
- utilizatori: doar print.

Nu acordati drepturi excesive pe `Manage Printers` fara justificare.

## 4. Prioritati, availability windows si pooling
- prioritati diferite pentru echipe critice;
- intervale de disponibilitate pentru imprimante speciale;
- printer pooling cand exista mai multe device-uri identice.

## 5. Deploy imprimante prin GPO
Avantaje:
- provisioning automat;
- consistenta pe departamente;
- reducere interventii manuale.

## 6. Troubleshooting standard
- verificati serviciul `Print Spooler`;
- verificati driver, port, queue status;
- izolati problema: client vs server vs device fizic.

## 7. Mini-lab
- Adaugati doua imprimante (una manual, una detectata).
- Aplicati ACL diferit pe fiecare.
- Publicati imprimanta prin GPO pe un OU de test.
