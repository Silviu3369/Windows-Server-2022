# 07 - Disk Management: Teorie extinsa

## 1. Disc fizic vs volum logic
Administrarea stocarii cere diferentiere clara:
- dispozitiv fizic (HDD/SSD);
- partitionare;
- volume logice;
- filesystem.

## 2. MBR vs GPT
- MBR: legacy, limitari de capacitate/partitii.
- GPT: standard modern, robustete mai buna, recomandat implicit.

## 3. Basic vs Dynamic Disk
- Basic: simplu, predictibil, recomandat in majoritatea scenariilor.
- Dynamic: permite volume avansate (spanned/striped/mirrored), dar introduce complexitate.

## 4. Operatii critice
- shrink/extend volume doar dupa verificare spatiu si backup;
- schimbari litere drive cu evaluare impact aplicatii;
- mounted folders pentru scenarii fara litera noua.

## 5. RAID software - intelegere corecta
- RAID 0: performanta, fara redundanta.
- RAID 1: redundanta, capacitate 50%.
- RAID 5: compromis capacitate + redundanta, penalizare la write.

In productie, preferati RAID hardware sau Storage Spaces avansat, in functie de arhitectura.

## 6. DiskPart pentru operare scriptabila
DiskPart este util pentru:
- configurari repetabile in laborator;
- recovery in medii fara GUI;
- proceduri standardizate.

## 7. Mini-lab
- Initializati disc nou GPT.
- Creati volum, formatati NTFS, alocati litera.
- Simulati un mirror software (daca lab permite).
- Documentati pasii de rollback.
