# 02 - Accounts (Obiecte AD si administrare conturi): Teorie extinsa

## 1. Security Principals si modelul de acces
Security principal = obiect care poate primi permisiuni:
- user account;
- computer account;
- group (security group).

Accesul se acorda pe grupuri, nu direct pe useri, pentru control scalabil.

## 2. Organizational Units (OU) - scop real
OU nu este mecanism de securitate; este mecanism de administrare:
- delegare sarcini (reset parola, unlock, join masini);
- aplicare GPO pe loturi de obiecte;
- separare logica pe echipe/locatii/functii.

## 3. ADUC in modul avansat
In practica avansata, activati `Advanced Features` pentru:
- atributi extinse;
- tab Security;
- object protection / accidental deletion.

## 4. Strategia de grupuri (AGDLP)
Model recomandat:
- A (Accounts) -> G (Global groups) -> DL (Domain Local groups) -> P (Permissions)

Avantaje:
- schimbari simple cand userii muta roluri;
- audit clar pe permisiuni;
- reducere erori manuale.

## 5. Tipuri de conturi in curs
- User account standard;
- Service account (ideal gMSA in productie);
- Break-glass admin account (izolat, monitorizat);
- Computer account cu naming standard.

## 6. RSAT pentru administrare remote
Administrarea centralizata de pe statii Windows 10/11 reduce accesul direct pe DC. In curs, insistati pe:
- least privilege;
- sesiuni separate admin/user;
- evitarea browsing-ului web de pe server.

## 7. Politici de parola si blocare
Minim pentru laborator avansat:
- complexitate ON;
- lockout threshold (ex: 5 incercari);
- lockout duration controlata;
- audit pentru brute force.

## 8. Mini-lab: ciclu complet de viata al unui cont
1. Creare cont student.
2. Adaugare in grupuri pe rol.
3. Simulare schimbare departament (mutare grupuri).
4. Dezactivare cont.
5. Reactivare / apoi deprovision final (cu arhivare date).
