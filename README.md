# IT Learning Hub (RO/EN)

Site static pentru GitHub Pages, bazat pe materialele tale locale:
- Windows Server 2022
- Windows 11
- Azure
- plus sectiune noua Microsoft 365

## Publicare pe GitHub Pages

1. Creeaza un repository nou pe GitHub (ex: `it-learning-hub`).
2. Urca toate fisierele din acest folder (inclusiv `Windows Server 2022`, `windows 11`, `assets`, PDF Azure).
3. In GitHub: `Settings` -> `Pages`.
4. La `Source`, selecteaza `Deploy from a branch`.
5. Alege branch `main` si folder `/ (root)`.
6. Salveaza. Link-ul site-ului va aparea dupa deploy.

## Structura

- `index.html` - pagina principala cu module, laburi, resurse, materiale
- `styles.css` - design modern responsive
- `script.js` - toggle limba romana/engleza
- `assets/images` - imagini locale pentru partea vizuala

## Observatii

- Link-urile PDF folosesc calea fisierelor existente in acest folder.
- Mini-laburile au comenzi PowerShell orientate pe practica reala.
- Poti extinde usor cu module noi (Intune, Entra ID, Defender for Cloud etc.).
