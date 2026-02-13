# 03 - File Server: Teorie extinsa

## 1. NTFS ca baza de securitate date
NTFS ofera control granular la nivel de fisier/folder prin ACL. Concept central:
- permisiunea efectiva = combinatia dintre grupuri + mostenire + deny + context de autentificare.

## 2. NTFS vs Share Permissions
- Share permissions se aplica la acces prin retea.
- NTFS se aplica mereu (local + remote).
- In practica, accesul final este cel mai restrictiv rezultat.

Pattern recomandat:
- Share: permissive controlat (ex: `Authenticated Users: Change`)
- NTFS: control fin pe grupuri AGDLP

## 3. Mostenire si modelul ACL
- Mostenirea simplifica administrarea.
- Ruptura mostenirii trebuie justificata si documentata.
- Evitati ACL-uri direct pe useri individuali.

## 4. EFS, compresie si impact operational
- EFS util pentru protectie la nivel de fisier, dar necesita management chei.
- Compresia NTFS ajuta la spatiu, dar poate afecta performanta pe workload I/O intens.

## 5. DFS si namespace unificat
Distributed File System permite:
- cale logica unica (`\\corp.local\Data`);
- abstractizarea serverului fizic;
- scalare mai usoara pe termen lung.

## 6. Shadow Copies pentru self-service recovery
Beneficii:
- utilizatorii recupereaza versiuni anterioare fara ticket IT;
- reduce timpul de restaurare operationala.

Limite:
- nu inlocuieste backupul complet;
- necesita monitorizare spatiu snapshot.

## 7. Bune practici de proiectare file server
- Separati datele pe volume dedicate.
- Folositi naming standard pentru share-uri.
- Auditati accesul la foldere sensibile.
- Documentati owner-ul fiecarui share.

## 8. Mini-lab
- Creati `\\FS01\Departamente`.
- Aplicati AGDLP pe 2 departamente.
- Activati Shadow Copies.
- Testati restaurarea unei versiuni sterse accidental.
