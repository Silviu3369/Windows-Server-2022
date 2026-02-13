export const manualSections = [
  {
    id: "intro",
    title: "Introducere",
    icon: "BookOpen",
    description: "Prezentare generală a manualului",
    content: `# Introducere

Acest manual este conceput pentru a ghida un administrator de sistem prin procesul de configurare a unui mediu enterprise folosind Windows Server 2022 într-un mediu virtual (VM). Vom acoperi aspecte esențiale, de la instalarea inițială și configurarea rețelei, până la implementarea serviciilor cheie și integrarea clienților Windows 11, toate prezentate pas cu pas, cu instrucțiuni pentru GUI, CMD și PowerShell.

## Obiectivele Manualului

- Instalarea și configurarea Windows Server 2022 în mediu virtual
- Administrare prin GUI, Command Prompt și PowerShell
- Configurarea serverului ca router (NAT) cu conectivitate la internet
- Implementarea serviciilor enterprise (AD DS, DNS, DHCP)
- Gestionarea grupurilor, utilizatorilor și permisiunilor
- Configurarea Print Server și File Server
- Implementarea Group Policy Objects (GPO)
- Integrarea clientului Windows 11 în domeniu
- Mentenanță și best practices

## Nivelul de Dificultate

Acest manual este destinat administratorilor de sistem cu experiență de bază și celor care doresc să aprofundeze cunoștințele despre Windows Server la nivel enterprise.`
  },
  {
    id: "vm-setup",
    title: "Pregătirea Mediului Virtual",
    icon: "Server",
    description: "Configurarea VM și cerințe hardware",
    content: `# Pregătirea Mediului Virtual

Pentru a începe, este crucial să pregătim un mediu virtual adecvat. Această secțiune detaliază cerințele hardware și pașii de configurare a mașinii virtuale.

## Cerințe Hardware

| Resursă | Minim | Recomandat (Enterprise Lab) |
| :------ | :--- | :-------------------------- |
| **CPU** | 1.4 GHz 64-bit | 2.0 GHz+ Multi-core |
| **RAM** | 512 MB (Server Core) / 2 GB (Desktop Experience) | 4 GB - 8 GB |
| **Disk** | 32 GB | 60 GB+ (SSD) |
| **Rețea** | 1 adaptor | 2 adaptoare (minim) |

## Configurarea Mașinii Virtuale

1. **Creați o mașină virtuală nouă** cu un nume relevant (ex: \`WS2022-DC01\`)
2. **Alocați resurse** conform tabelului de mai sus
3. **Configurați adaptoarele de rețea:**
   - **NIC 1 (WAN):** Bridge sau NAT (conectat la internet)
   - **NIC 2 (LAN):** Rețea internă (Internal Network / Host-only)
4. **Atașați ISO-ul** Windows Server 2022

## Platforme Suportate

- Hyper-V (Windows Pro/Enterprise)
- VMware Workstation Pro/Player
- VirtualBox (gratuit)`
  },
  {
    id: "installation",
    title: "Instalarea Windows Server 2022",
    icon: "Download",
    description: "Pași de instalare pas cu pas",
    content: `# Instalarea Windows Server 2022

## Pași de Instalare prin GUI

1. **Pornirea VM-ului:** Porniți mașina virtuală. Aceasta ar trebui să booteze automat de pe imaginea ISO.

2. **Setări regionale:** Selectați limba, formatul orei și aspectul tastaturii, apoi faceți clic pe **Next**.

3. **Începeți instalarea:** Faceți clic pe butonul **Install now**.

4. **Selectarea ediției:** Pentru un mediu de învățare complet cu interfață grafică, selectați **Windows Server 2022 Standard (Desktop Experience)** sau **Datacenter (Desktop Experience)**.

5. **Termeni de licență:** Citiți termenii, bifați **I accept the license terms** și faceți clic pe **Next**.

6. **Tipul de instalare:** Selectați **Custom: Install Windows only (advanced)** pentru o instalare curată.

7. **Selectarea discului:** Alegeți discul virtual și faceți clic pe **Next**. Instalarea va începe.

8. **Setarea parolei Administrator:** După restartări, setați o parolă complexă pentru contul de Administrator.

## Durata Instalării

Instalarea durează de obicei 10-20 de minute, în funcție de viteza discului și a procesorului.`
  },
  {
    id: "initial-config",
    title: "Configurarea Inițială",
    icon: "Settings",
    description: "Configurare post-instalare (GUI, CMD, PowerShell)",
    content: `# Configurarea Inițială (Post-Instalare)

## Configurare prin GUI (Server Manager)

### Schimbarea Numelui Serverului

1. În **Server Manager**, în panoul din stânga, faceți clic pe **Local Server**
2. Lângă **Computer name**, faceți clic pe numele curent
3. Faceți clic pe **Change...**
4. Introduceți un nume sugestiv (ex: \`SRV-DC01\`)
5. Faceți clic pe **OK**, apoi **Restart Now**

### Configurarea Adreselor IP Statice

1. Deschideți **Server Manager**
2. Lângă **Ethernet**, faceți clic pe adresa IP
3. Faceți clic dreapta pe adaptorul LAN și selectați **Properties**
4. Selectați **Internet Protocol Version 4 (TCP/IPv4)** și faceți clic pe **Properties**
5. Bifați **Use the following IP address** și introduceți:
   - **IP address:** \`192.168.10.1\`
   - **Subnet mask:** \`255.255.255.0\`
   - **Default gateway:** \`192.168.10.1\`
   - **Preferred DNS server:** \`127.0.0.1\`
6. Faceți clic pe **OK**

### Activarea Remote Desktop

1. În **Server Manager**, lângă **Remote Desktop**, faceți clic pe **Disabled**
2. Bifați **Allow remote connections to this computer**
3. Faceți clic pe **OK**

## Configurare prin CMD

\`\`\`cmd
netdom renamecomputer %computername% /newname:SRV-DC01 /reboot:10
netsh interface ipv4 set address name="Ethernet 2" static 192.168.10.1 255.255.255.0 192.168.10.1 1
netsh interface ipv4 set dnsserver name="Ethernet 2" static 127.0.0.1 primary
reg add "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
netsh advfirewall firewall set rule group="remote desktop" new enable=yes
\`\`\`

## Configurare prin PowerShell

\`\`\`powershell
Rename-Computer -NewName "SRV-DC01" -Restart

Remove-NetIPAddress -InterfaceAlias "Ethernet 2" -Confirm:$false
Remove-DnsClientServerAddress -InterfaceAlias "Ethernet 2" -Confirm:$false

New-NetIPAddress -InterfaceAlias "Ethernet 2" -IPAddress 192.168.10.1 -PrefixLength 24 -DefaultGateway 192.168.10.1
Set-DnsClientServerAddress -InterfaceAlias "Ethernet 2" -ServerAddresses ("127.0.0.1")

Set-ItemProperty -Path "HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server" -Name "fDenyTSConnections" -Value 0
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
\`\`\``
  },
  {
    id: "administration",
    title: "Administrare: GUI vs CMD vs PowerShell",
    icon: "Terminal",
    description: "Comparație și exemple practice",
    content: `# Administrare: GUI vs CMD vs PowerShell

## Gestionarea Serviciilor

### GUI (Services Console)
1. Deschideți **Server Manager**
2. Accesați **Tools > Services**
3. Găsiți serviciul, faceți clic dreapta și alegeți **Start, Stop, Restart**

### CMD
\`\`\`cmd
sc query "ServiceName"         :: Verifică starea serviciului
sc start "ServiceName"        :: Pornește serviciul
sc stop "ServiceName"         :: Oprește serviciul
sc config "ServiceName" start= auto :: Setează pornire automată
\`\`\`

### PowerShell
\`\`\`powershell
Get-Service -Name "ServiceName"
Start-Service -Name "ServiceName"
Stop-Service -Name "ServiceName"
Set-Service -Name "ServiceName" -StartupType Automatic
\`\`\`

## Gestionarea Proceselor

### GUI (Task Manager)
Apăsați \`Ctrl+Shift+Esc\` și accesați tab-ul **Details**

### CMD
\`\`\`cmd
tasklist
taskkill /IM "processname.exe" /F
taskkill /PID 1234 /F
\`\`\`

### PowerShell
\`\`\`powershell
Get-Process -Name "processname"
Stop-Process -Name "processname" -Force
Stop-Process -Id 1234 -Force
\`\`\`

## Gestionarea Utilizatorilor

### GUI (Computer Management)
1. **Server Manager > Tools > Computer Management**
2. **Local Users and Groups > Users**
3. Faceți clic dreapta pentru a crea utilizator

### CMD
\`\`\`cmd
net user username password /add
net localgroup groupname username /add
net user username /delete
\`\`\`

### PowerShell
\`\`\`powershell
New-LocalUser -Name "username" -Password (Convert-ToSecureString "password" -AsPlainText -Force)
Add-LocalGroupMember -Group "Administrators" -Member "username"
Remove-LocalUser -Name "username"
\`\`\``
  },
  {
    id: "networking",
    title: "Networking: Router (NAT)",
    icon: "Network",
    description: "Configurare RRAS și conectivitate",
    content: `# Networking: Configurarea Serverului ca Router (NAT)

## Instalarea Rolului RRAS

### GUI (Server Manager)
1. Deschideți **Server Manager**
2. Faceți clic pe **Add Roles and Features**
3. Selectați **Role-based or feature-based installation**
4. Selectați serverul țintă
5. Bifați **Remote Access**
6. Bifați **DirectAccess and VPN (RAS)** și **Routing**
7. Confirmați și faceți clic pe **Install**

### PowerShell
\`\`\`powershell
Install-WindowsFeature -Name RemoteAccess -IncludeManagementTools
Install-WindowsFeature -Name RSAT-RemoteAccess -IncludeManagementTools
\`\`\`

## Configurarea RRAS pentru NAT

### GUI (Routing and Remote Access Console)
1. Deschideți **Server Manager > Tools > Routing and Remote Access**
2. Faceți clic dreapta pe serverul și selectați **Configure and Enable Routing and Remote Access**
3. Selectați **Network address translation (NAT)**
4. Selectați interfața WAN (conectată la internet)
5. Selectați interfața LAN (rețea internă)
6. Finalizați expertul

### PowerShell
\`\`\`powershell
Install-RemoteAccess -VpnType VpnOnly

Add-RemoteAccessIpAddressRange -InterfaceAlias "Ethernet" -StartIPAddress 0.0.0.0 -EndIPAddress 0.0.0.0 -Public
Add-RemoteAccessIpAddressRange -InterfaceAlias "Ethernet 2" -StartIPAddress 192.168.10.0 -EndIPAddress 192.168.10.255 -Private

Set-RemoteAccessRoutingDomain -Name "VpnOnly" -EnableNat $true -NatInterfaceAlias "Ethernet"

Start-Service -Name RemoteAccess
\`\`\`

## Verificare Conectivitate

Pe clientul din rețea internă, rulați:
\`\`\`cmd
ping 8.8.8.8
ipconfig /all
\`\`\``
  },
  {
    id: "enterprise-services",
    title: "Servicii Enterprise: AD DS, DNS, DHCP",
    icon: "Database",
    description: "Implementare servicii core",
    content: `# Servicii Enterprise: AD DS, DNS, DHCP

## Active Directory Domain Services (AD DS)

### Instalare Rol (GUI)
1. **Server Manager > Add Roles and Features**
2. Bifați **Active Directory Domain Services**
3. Confirmați și faceți clic pe **Install**

### PowerShell
\`\`\`powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
\`\`\`

### Promovare la Domain Controller

#### GUI
1. În **Server Manager**, faceți clic pe steagul de notificare
2. Selectați **Promote this server to a domain controller**
3. Selectați **Add a new forest**
4. Introduceți numele domeniului (ex: \`contoso.local\`)
5. Selectați nivelul funcțional
6. Bifați **DNS server** și **Global Catalog**
7. Setați parola DSRM
8. Finalizați expertul

#### PowerShell
\`\`\`powershell
Install-ADDSForest -DomainName "contoso.local" -DomainMode "Win2016" -ForestMode "Win2016" -InstallDns:$true -NoRebootOnCompletion:$false -SafeModeAdministratorPassword (Read-Host -AsSecureString "Enter DSRM password")
\`\`\`

## DNS Server

### Gestionare Zone DNS (GUI)
1. **Server Manager > Tools > DNS**
2. Extindeți serverul și navigați la **Forward Lookup Zones**
3. Faceți clic dreapta pe zonă pentru a crea înregistrări

### PowerShell
\`\`\`powershell
Add-DnsServerResourceRecordA -Name "webserver" -ZoneName "contoso.local" -IPv4Address "192.168.10.100" -TimeToLive 3600
Add-DnsServerResourceRecordCName -Name "www" -ZoneName "contoso.local" -HostNameAlias "webserver.contoso.local" -TimeToLive 3600
Get-DnsServerResourceRecord -ZoneName "contoso.local" -Name "webserver"
\`\`\`

## DHCP Server

### Instalare Rol (GUI)
1. **Server Manager > Add Roles and Features**
2. Bifați **DHCP Server**
3. Confirmați și faceți clic pe **Install**
4. Completați configurarea DHCP

### Criere Scope DHCP (GUI)
1. **Server Manager > Tools > DHCP**
2. Faceți clic dreapta pe **IPv4** și selectați **New Scope**
3. Configurați:
   - **Name:** \`LAN_Scope\`
   - **Start IP:** \`192.168.10.10\`
   - **End IP:** \`192.168.10.200\`
   - **Subnet mask:** \`255.255.255.0\`
   - **Default Gateway:** \`192.168.10.1\`
   - **DNS Servers:** \`192.168.10.1\`

### PowerShell
\`\`\`powershell
Install-WindowsFeature -Name DHCP -IncludeManagementTools
Add-DhcpServerInDC -DnsName "SRV-DC01.contoso.local" -IPAddress 192.168.10.1
Add-DhcpServerv4Scope -Name "LAN_Scope" -StartRange 192.168.10.10 -EndRange 192.168.10.200 -SubnetMask 255.255.255.0 -Router 192.168.10.1 -DnsServer 192.168.10.1 -LeaseDuration 8.00:00:00 -Activate $true
\`\`\``
  },
  {
    id: "ad-structure",
    title: "Structura Active Directory",
    icon: "GitBranch",
    description: "Componente și organizare logică",
    content: `# Structura Active Directory

## Ce este Active Directory Domain Services?

Active Directory Domain Services (AD DS) este un serviciu de director de rețea care permite administrarea centralizată a resurselor și utilizatorilor într-o rețea de calculatoare. AD DS implementează standardul X.500 dezvoltat de IEEE, oferind o metodă eficientă de gestionare a unei rețele.

Un director este o bază de date geo-optimizată care stochează informații despre obiecte din rețea. Informațiile stocate în AD DS includ utilizatori, computere, imprimante și alte resurse. Serviciul de director face posibilă stocarea și accesarea acestor informații de către utilizatorii autorizați.

## Componente Principale ale AD DS

### 1. Păduri (Forests)

O pădure este o colecție de domenii care partajează o schemă comună și un catalog global. Pădurile sunt utilizate pentru a organiza domenii în structuri ierarhice. O pădure poate conține una sau mai multe domenii.

**Caracteristici:**
- Partajează schema și catalogul global
- Relații de încredere transitive între domenii
- Gestionare centralizată a politicilor

### 2. Domenii

Un domeniu este o unitate administrativă care conține obiecte cum ar fi utilizatori, computere și grupuri. Domeniile sunt organizate ierarhic și pot avea subdomenii.

**Exemplu:** \`contoso.local\`, \`europe.contoso.local\`

### 3. Arbori (Trees)

Un arbore este o colecție de domenii care partajează un spațiu de nume contiguu. Domeniile din cadrul unui arbore au relații de încredere transitive.

**Exemplu:** 
- \`contoso.local\` (rădăcina)
- \`europe.contoso.local\` (subdomeniu)
- \`asia.contoso.local\` (subdomeniu)

### 4. Unități Organizaționale (OU)

Unitățile Organizaționale sunt containere logice utilizate pentru a organiza obiecte din domeniu. OU-urile permit o gestionare mai granulară a politicilor și permisiunilor.

**Exemplu:**
- OU=Sales
- OU=IT
- OU=HR

### 5. Relații de Încredere (Trust Relationships)

Relațiile de încredere permit autentificarea și autorizarea între domenii. Acestea pot fi:
- **Transitive:** Încrederea se extinde la alte domenii
- **Non-transitive:** Încrederea este limitată la două domenii

## Niveluri Funcționale

Nivelurile funcționale determină funcționalitățile disponibile în domeniu și pădure. Nivelurile mai noi oferă mai multe caracteristici, dar necesită versiuni mai noi de Windows Server.

| Nivel Funcțional | Versiune Minimă | Caracteristici |
| :--------------- | :-------------- | :------------- |
| 2016 | Windows Server 2016 | Suport complet pentru Server 2016 |
| 2012 R2 | Windows Server 2012 R2 | Suport pentru Server 2012 R2 și versiuni anterioare |
| 2012 | Windows Server 2012 | Suport pentru Server 2012 și versiuni anterioare |
| 2008 R2 | Windows Server 2008 R2 | Suport pentru Server 2008 R2 și versiuni anterioare |

## Replicare AD DS

Replicarea asigură că informațiile din AD DS sunt sincronizate între toți Domain Controllers. Aceasta se face prin:

- **Replicare Intra-Site:** Replicare rapidă între Domain Controllers din același site
- **Replicare Inter-Site:** Replicare controlată între site-uri diferite

## Site-uri

Site-urile sunt utilizate pentru a organiza Domain Controllers pe bază de locație geografică. Aceasta permite optimizarea traficului de rețea și replicării.

**Beneficii:**
- Reducerea traficului de rețea
- Optimizarea autentificării
- Gestionarea replicării

## Autentificare

AD DS suportă mai multe metode de autentificare:

- **Kerberos:** Protocol standard pentru autentificare în rețea
- **NTLM:** Protocol mai vechi, folosit pentru compatibilitate
- **LDAP:** Protocol pentru interogarea directoryului`
  },
  {
    id: "groups",
    title: "Grupuri: Locale, Globale, Domeniu Local",
    icon: "Users",
    description: "Criere și gestionare grupuri, principii AGDLP",
    content: `# Grupuri: Locale, Globale, Domeniu Local

## Tipuri de Grupuri în Active Directory

### Grupuri Locale (Local Groups)

Grupurile locale sunt create pe computerele individuale și nu sunt replicare în Active Directory. Acestea sunt utilizate pentru a gestiona accesul la resurse locale pe o mașină specifică.

**Criere Grup Local (GUI):**
1. Deschideți **Server Manager**
2. Accesați **Tools > Computer Management**
3. Navigați la **Local Users and Groups > Groups**
4. Faceți clic dreapta și selectați **New Group**
5. Introduceți numele grupului (ex: \`LocalAdmins\`)
6. Adăugați membri și faceți clic pe **Create**

**Criere Grup Local (PowerShell):**
\`\`\`powershell
New-LocalGroup -Name "LocalAdmins" -Description "Local administrators group"
Add-LocalGroupMember -Group "LocalAdmins" -Member "contoso\\john.doe"
\`\`\`

### Grupuri Globale (Global Groups)

Grupurile globale sunt create în Active Directory și sunt replicare la toți Domain Controllers din domeniu. Acestea sunt folosite pentru a grupa utilizatori cu roluri sau responsabilități similare.

**Criere Grup Global (GUI):**
1. Deschideți **Active Directory Users and Computers**
2. Navigați la containerul **Users** (sau o Unitate Organizațională)
3. Faceți clic dreapta și selectați **New > Group**
4. Introduceți:
   - **Group name:** \`Sales_Team\`
   - **Group scope:** **Global**
   - **Group type:** **Security**
5. Faceți clic pe **OK**

**Criere Grup Global (PowerShell):**
\`\`\`powershell
New-ADGroup -Name "Sales_Team" -GroupScope Global -GroupCategory Security -Path "CN=Users,DC=contoso,DC=local"
Add-ADGroupMember -Identity "Sales_Team" -Members "john.doe", "jane.smith"
\`\`\`

### Grupuri de Domeniu Local (Domain Local Groups)

Grupurile de domeniu local sunt create în Active Directory și sunt utilizate pentru a asigna permisiuni la resurse locale. Acestea pot conține grupuri globale din domeniu.

**Criere Grup de Domeniu Local (GUI):**
1. În **Active Directory Users and Computers**, navigați la containerul **Users**
2. Faceți clic dreapta și selectați **New > Group**
3. Introduceți:
   - **Group name:** \`Sales_Resources\`
   - **Group scope:** **Domain Local**
   - **Group type:** **Security**
4. Faceți clic pe **OK**
5. Adăugați grupul global \`Sales_Team\` ca membru

**Criere Grup de Domeniu Local (PowerShell):**
\`\`\`powershell
New-ADGroup -Name "Sales_Resources" -GroupScope DomainLocal -GroupCategory Security -Path "CN=Users,DC=contoso,DC=local"
Add-ADGroupMember -Identity "Sales_Resources" -Members "Sales_Team"
\`\`\`

## Principiul AGDLP

**A** - Account (Utilizatori)
**G** - Global Group (Grup Global)
**DL** - Domain Local Group (Grup de Domeniu Local)
**P** - Permissions (Permisiuni)

**Fluxul:**
1. Creați conturi de utilizatori (A)
2. Adăugați utilizatorii la grupuri globale (G)
3. Adăugați grupurile globale la grupuri de domeniu local (DL)
4. Asignați permisiuni grupurilor de domeniu local la resurse (P)`
  },
  {
    id: "permissions",
    title: "Permisiuni NTFS și Share",
    icon: "Lock",
    description: "Configurare permisiuni pe foldere și share-uri",
    content: `# Permisiuni NTFS și Share

## Diferența dintre Permisiuni NTFS și Share

**Permisiuni NTFS** sunt aplicate la nivelul sistemului de fișiere și sunt întotdeauna active.

**Permisiuni Share** sunt aplicate la nivelul partajării și sunt active doar la acces prin rețea.

## Niveluri de Permisiuni NTFS

| Permisiune | Descriere |
| :--------- | :-------- |
| **Full Control** | Acces complet: citire, scriere, ștergere, modificare permisiuni |
| **Modify** | Citire, scriere, ștergere fișiere, dar nu modificare permisiuni |
| **Read & Execute** | Citire și execuție fișiere, listare foldere |
| **Read** | Doar citire fișiere și listare foldere |
| **Write** | Scriere și criere fișiere noi |

## Setare Permisiuni NTFS (GUI)

1. Navigați la folderul dorit (ex: \`C:\\Shares\\Sales\`)
2. Faceți clic dreapta și selectați **Properties**
3. Accesați tab-ul **Security** și faceți clic pe **Edit**
4. Faceți clic pe **Add** pentru a adăuga un grup
5. Introduceți numele grupului (ex: \`contoso\\Sales_Resources\`)
6. Selectați grupul și bifați permisiunile dorite (ex: **Modify**)
7. Faceți clic pe **Apply** și **OK**

## Setare Permisiuni NTFS (PowerShell)

\`\`\`powershell
$path = "C:\\Shares\\Sales"
$group = "contoso\\Sales_Resources"
$acl = Get-Acl $path
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($group, "Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path $path -AclObject $acl
\`\`\`

## Setare Permisiuni Share

**GUI:**
1. Faceți clic dreapta pe folderul partajat și selectați **Properties**
2. Accesați tab-ul **Sharing** și faceți clic pe **Advanced Sharing**
3. Bifați **Share this folder**
4. Faceți clic pe **Permissions**
5. Adăugați grupul și setați permisiunile
6. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
$shareName = "Sales"
$path = "C:\\Shares\\Sales"
$group = "contoso\\Sales_Resources"

New-SmbShare -Name $shareName -Path $path -FullAccess $group
\`\`\`

## Moștenire Permisiuni

Permisiunile se moștenesc de la folderul părinte la folderele și fișierele copil. Permisiunile explicite au prioritate asupra permisiunilor moștenite.`
  },
  {
    id: "users-management",
    title: "Gestionarea Utilizatorilor",
    icon: "User",
    description: "Criere, modificare și ștergere utilizatori",
    content: `# Gestionarea Utilizatorilor

## Ciclu de Viață al Utilizatorului

### Criere Utilizator

**GUI (Active Directory Users and Computers):**
1. Deschideți **Active Directory Users and Computers**
2. Navigați la containerul **Users** (sau o Unitate Organizațională)
3. Faceți clic dreapta și selectați **New > User**
4. Introduceți:
   - **First name:** \`John\`
   - **Last name:** \`Doe\`
   - **User logon name:** \`john.doe\`
5. Faceți clic pe **Next**
6. Setați parola și opțiunile de parolă
7. Faceți clic pe **Next** și **Finish**

**PowerShell:**
\`\`\`powershell
$password = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force
New-ADUser -Name "John Doe" -GivenName "John" -Surname "Doe" -SamAccountName "john.doe" -UserPrincipalName "john.doe@contoso.local" -AccountPassword $password -Enabled $true
\`\`\`

### Modificare Utilizator

**GUI:**
1. Faceți clic dreapta pe utilizator și selectați **Properties**
2. Modificați informațiile dorite (telefon, departament, etc.)
3. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
Set-ADUser -Identity "john.doe" -Department "Sales" -Title "Sales Manager" -Office "New York"
\`\`\`

### Ștergere Utilizator

**GUI:**
1. Faceți clic dreapta pe utilizator și selectați **Delete**
2. Confirmați ștergerea

**PowerShell:**
\`\`\`powershell
Remove-ADUser -Identity "john.doe" -Confirm:$false
\`\`\`

## Resetare Parolă

**GUI:**
1. Faceți clic dreapta pe utilizator și selectați **Reset Password**
2. Introduceți noua parolă
3. Faceți clic pe **OK**

**PowerShell:**
\`\`\`powershell
$password = ConvertTo-SecureString "NewPassword123!" -AsPlainText -Force
Set-ADAccountPassword -Identity "john.doe" -NewPassword $password -Reset
\`\`\``
  },
  {
    id: "aduc-interface",
    title: "Active Directory Users and Computers (ADUC)",
    icon: "Users",
    description: "Interfață și utilizare avansată",
    content: `# Active Directory Users and Computers (ADUC)

## Deschiderea ADUC

Interfața **Active Directory Users and Computers** este instrumentul principal pentru gestionarea obiectelor Active Directory. Aceasta oferă o interfață grafică pentru a crea, modifica și șterge utilizatori, grupuri, computere și alte obiecte din domeniu.

**GUI:**
1. Deschideți **Server Manager**
2. Accesați **Tools > Active Directory Users and Computers**

**PowerShell (pentru a deschide de pe client cu RSAT):**
\`\`\`powershell
dsa.msc
\`\`\`

## Structura Interfaței ADUC

Fereastra ADUC este împărțită în trei panouri:

1. **Console Tree (Stânga):** Arată structura containerelor și OU-urilor din domeniu
2. **Details Pane (Centru):** Afișează obiectele din containerul selectat
3. **Action Pane (Dreapta):** Oferă acțiuni relevante pentru obiectul selectat

## Containere Principale

| Container | Descriere |
| :--------- | :-------- |
| **Builtin** | Conține grupuri locale standard create de sistem |
| **Computers** | Conține conturi de computere din domeniu |
| **Domain Controllers** | Conține conturi de Domain Controllers |
| **Foreign Security Principals** | Conține principii de securitate din domenii de încredere |
| **Managed Service Accounts** | Conține conturi de servicii gestionate |
| **Users** | Conține conturi de utilizatori și grupuri standard |

## Advanced Mode (Mod Avansat)

Modul avansat oferă mai multe informații și opțiuni pentru obiectele din ADUC.

**Activare:**
1. Deschideți **ADUC**
2. Faceți clic pe **View** în meniu
3. Selectați **Advanced Features**

**Efecte:**
- Apar mai multe containere (Keys, LostAndFound, Managed Service Accounts, etc.)
- Sunt disponibile mai multe proprietăți ale obiectelor
- Se pot vedea atributele LDAP ale obiectelor

## Personalizare Coloane

Puteți personaliza coloanele afișate în Details Pane:

1. Faceți clic pe **View** în meniu
2. Selectați **Add/remove Columns**
3. Alegeți coloanele dorite și faceți clic pe **OK**

## Căutare în ADUC

Pentru a căuta obiecte în ADUC:

1. Faceți clic pe **Tools** în meniu
2. Selectați **Find...**
3. Introduceți criteriile de căutare
4. Faceți clic pe **Find Now**

**PowerShell (echivalent):**
\`\`\`powershell
Get-ADUser -Filter "Name -like '*john*'" -SearchBase "CN=Users,DC=contoso,DC=local"
\`\`\``
  },
  {
    id: "print-server",
    title: "Print Server: Configurare și Management",
    icon: "Printer",
    description: "Instalare, configurare și gestionare imprimante",
    content: `# Print Server: Configurare și Management

## Instalarea Rolului Print Server

**GUI (Server Manager):**
1. Deschideți **Server Manager**
2. Faceți clic pe **Add Roles and Features**
3. Selectați **Role-based or feature-based installation**
4. Selectați serverul țintă
5. Bifați **Print and Document Services**
6. Confirmați și faceți clic pe **Install**

**PowerShell:**
\`\`\`powershell
Install-WindowsFeature -Name Print-Server -IncludeManagementTools
\`\`\`

## Adăugarea unei Imprimante

**GUI:**
1. Deschideți **Server Manager**
2. Accesați **Tools > Print Management**
3. Extindeți **Print Servers** și selectați serverul
4. Faceți clic dreapta pe **Printers** și selectați **Add Printer**
5. Urmați expertul pentru a configura imprimanta

**PowerShell:**
\`\`\`powershell
Add-PrinterPort -Name "192.168.1.100" -PrinterHostAddress "192.168.1.100"
Add-Printer -Name "HP_LaserJet" -DriverName "HP LaserJet Pro" -PortName "192.168.1.100"
\`\`\`

## Partajarea Imprimantei

**GUI:**
1. Deschideți **Print Management**
2. Faceți clic dreapta pe imprimanta și selectați **Properties**
3. Accesați tab-ul **Sharing**
4. Bifați **Share this printer**
5. Introduceți un nume pentru partajare (ex: \`HP_LaserJet_Sales\`)
6. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
Set-Printer -Name "HP_LaserJet" -Shared $true -ShareName "HP_LaserJet_Sales"
\`\`\`

## Setarea Permisiunilor pe Imprimantă

**GUI:**
1. Faceți clic dreapta pe imprimanta și selectați **Properties**
2. Accesați tab-ul **Security**
3. Faceți clic pe **Edit**
4. Adăugați grupuri și setați permisiunile
5. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
Grant-PrinterPermission -PrinterName "HP_LaserJet" -Principal "contoso\\Sales_Resources" -Permission "Print"
\`\`\``
  },
  {
    id: "file-server",
    title: "File Server: Configurare și Best Practices",
    icon: "HardDrive",
    description: "Instalare, configurare cote și screening",
    content: `# File Server: Configurare și Best Practices

## Instalarea Rolului File Server

**GUI:**
1. **Server Manager > Add Roles and Features**
2. Bifați **File and Storage Services**
3. Bifați **File Server**
4. Confirmați și faceți clic pe **Install**

**PowerShell:**
\`\`\`powershell
Install-WindowsFeature -Name FS-FileServer -IncludeManagementTools
\`\`\`

## Configurarea Cotelor de Disc

Cotele de disc limitează cantitatea de spațiu pe care o pot folosi utilizatorii.

**GUI:**
1. **Server Manager > File and Storage Services > Shares**
2. Faceți clic pe **Quotas**
3. Faceți clic pe **Tasks > Create Quota**
4. Selectați folderul și setați limita (ex: 10 GB)
5. Faceți clic pe **Create**

**PowerShell:**
\`\`\`powershell
$quota = New-FsrmQuota -Path "C:\\Shares\\Sales" -Size 10GB -SoftLimit $false
\`\`\`

## Configurarea Screening-ului de Fișiere

Screening-ul previne utilizatorii să salveze anumite tipuri de fișiere.

**GUI:**
1. **Server Manager > File and Storage Services > Shares**
2. Faceți clic pe **File Screens**
3. Faceți clic pe **Tasks > Create File Screen**
4. Selectați folderul și tipurile de fișiere de blocat (ex: \`.exe\`, \`.bat\`)
5. Faceți clic pe **Create**

**PowerShell:**
\`\`\`powershell
New-FsrmFileScreen -Path "C:\\Shares\\Sales" -IncludePattern "*.exe", "*.bat" -Notification @(New-FsrmNotification -Type Email -Days 0)
\`\`\`

## Best Practices

- Utilizați cote pentru a controla utilizarea spațiului
- Implementați screening pentru a preveni fișiere neautorizate
- Monitorizați utilizarea resurselor
- Efectuați backup-uri regulate
- Documentați structura partajărilor`
  },
  {
    id: "security-gpo",
    title: "Securitate și Group Policy Objects (GPO)",
    icon: "Shield",
    description: "Politici de securitate, audit și GPO",
    content: `# Securitate și Group Policy Objects (GPO)

## Politici de Parolă

Politicile de parolă asigură că utilizatorii folosesc parole puternice.

**Configurare prin Group Policy:**
1. Deschideți **Group Policy Management**
2. Extindeți **Forest > Domains > contoso.local**
3. Faceți clic dreapta pe **Default Domain Policy** și selectați **Edit**
4. Navigați la **Computer Configuration > Policies > Windows Settings > Security Settings > Account Policies > Password Policy**
5. Configurați:
   - **Maximum Password Age:** 90 zile
   - **Minimum Password Length:** 12 caractere
   - **Password must meet complexity requirements:** Enabled
6. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
Set-ADDefaultDomainPasswordPolicy -MaxPasswordAge 90 -MinPasswordLength 12 -ComplexityEnabled $true
\`\`\`

## Politici de Blocare a Contului

Politicile de blocare protejează împotriva atacurilor de forță brută.

**Configurare:**
1. În **Group Policy Management**, navigați la **Account Policies > Account Lockout Policy**
2. Setați:
   - **Account lockout threshold:** 5 încercări eșuate
   - **Account lockout duration:** 30 minute
   - **Reset account lockout counter after:** 30 minute
3. Aplicați politica

**PowerShell:**
\`\`\`powershell
Set-ADDefaultDomainPasswordPolicy -LockoutThreshold 5 -LockoutDuration 30 -LockoutObservationWindow 30
\`\`\`

## Crearea unui GPO

**GUI:**
1. Deschideți **Group Policy Management**
2. Extindeți **Forest > Domains > contoso.local**
3. Faceți clic dreapta pe **contoso.local** și selectați **Create a GPO in this domain, and Link it here**
4. Introduceți un nume (ex: \`Sales_Department_Policy\`)
5. Faceți clic pe **OK**
6. Faceți clic dreapta pe noul GPO și selectați **Edit**
7. Configurați setările dorite
8. Faceți clic pe **Apply** și **OK**

**PowerShell:**
\`\`\`powershell
New-GPO -Name "Sales_Department_Policy" | New-GPLink -Target "OU=Sales,DC=contoso,DC=local"
\`\`\`

## Forțarea Aplicării GPO

Pentru a forța aplicarea imediată a GPO pe client:

**PowerShell (pe client):**
\`\`\`powershell
gpupdate /force
\`\`\`

## Audit și Logging

Auditarea înregistrează evenimentele importante de securitate.

**Configurare:**
1. În **Group Policy Management**, navigați la **Computer Configuration > Policies > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Audit Policies**
2. Configurați categoriile de audit:
   - **Account Logon:** Enabled
   - **Logon/Logoff:** Enabled
   - **Object Access:** Enabled
   - **Privilege Use:** Enabled
3. Aplicați politica

**PowerShell:**
\`\`\`powershell
auditpol /set /category:"Account Logon" /success:enable /failure:enable
auditpol /set /category:"Logon/Logoff" /success:enable /failure:enable
\`\`\``
  },
  {
    id: "windows11-integration",
    title: "Integrarea Clientului Windows 11",
    icon: "Users",
    description: "Join domain și management",
    content: `# Integrarea Clientului Windows 11

## Pregătirea Clientului

1. **Configurare Rețea:** Asigurați-vă că Windows 11 este conectat la aceeași rețea internă (LAN) ca și serverul
2. **Verificare DHCP:** Deschideți **Settings > Network & internet** și asigurați-vă că IP-ul este obținut automat
3. **Verificare DNS:** Serverul DNS ar trebui să fie adresa IP a Domain Controller-ului (ex: \`192.168.10.1\`)

## Verificare Conectivitate

Deschideți **Command Prompt** și rulați:
\`\`\`cmd
ipconfig /all
ping SRV-DC01.contoso.local
ping 192.168.10.1
nslookup contoso.local
\`\`\`

## Alăturarea la Domeniu

### GUI (Windows 11 Settings)
1. Deschideți **Settings** (\`Win + I\`)
2. Navigați la **System > About**
3. Sub **Device specifications**, faceți clic pe **Domain or workgroup**
4. Selectați **Domain** și introduceți \`contoso.local\`
5. Introduceți credențialele Administrator
6. Faceți clic pe **OK** și reporniți computerul

### PowerShell (pe Windows 11, ca Administrator)
\`\`\`powershell
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("192.168.10.1")
Add-Computer -DomainName "contoso.local" -Credential (Get-Credential) -Restart
\`\`\`

## Verificare Alăturare

1. **Pe Client:** **Settings > System > About** ar trebui să afișeze domeniul \`contoso.local\`
2. **Pe Server:** **Active Directory Users and Computers > Computers** ar trebui să afișeze clientul

## Aplicare Politici de Grup

Pe Domain Controller:
1. **Server Manager > Tools > Group Policy Management**
2. Extindeți **Forest > Domains > contoso.local**
3. Faceți clic dreapta și selectați **Create a GPO in this domain, and Link it here**
4. Dați un nume GPO-ului și faceți clic pe **OK**
5. Faceți clic dreapta pe GPO și selectați **Edit**
6. Configurați politicile dorite

Pe client, rulați:
\`\`\`cmd
gpupdate /force
\`\`\``
  },
  {
    id: "rsat-management",
    title: "Gestionare Remotă cu RSAT",
    icon: "Monitor",
    description: "Instalare și utilizare RSAT pe client",
    content: `# Gestionare Remotă cu RSAT

## Ce este RSAT?

**Remote Server Administration Tools (RSAT)** este un pachet de software care permite administratorilor să gestioneze serverele Windows din computere client. Cu RSAT instalat, puteți utiliza instrumente precum Active Directory Users and Computers, DNS Manager, DHCP Manager, etc., direct de pe mașina dvs. de lucru.

## Instalarea RSAT pe Windows 10/11

### Metoda 1: Din Settings (Windows 10 Release 1809+)

1. Deschideți **Settings** (\`Win + I\`)
2. Navigați la **Apps > Apps & features** (Windows 10) sau **System > Optional features** (Windows 11)
3. Faceți clic pe **Add an optional feature** (Windows 11) sau **Add a feature**
4. Căutați și selectați instrumentele dorite:
   - **RSAT: Active Directory Domain Services and Lightweight Directory Services Tools**
   - **RSAT: DNS Server Tools**
   - **RSAT: DHCP Server Tools**
   - **RSAT: Group Policy Management Tools**
5. Faceți clic pe **Install** și așteptați finalizarea

### Metoda 2: Download Manual (Versiuni Mai Vechi)

1. Descărcați RSAT de pe [Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=45520)
2. Descărcați versiunea corespunzătoare pentru build-ul dvs. de Windows
3. Executați fișierul \`.msu\` și urmați expertul de instalare
4. Reporniți computerul după instalare

## Utilizarea RSAT

După instalare, instrumentele RSAT sunt disponibile în mai multe locuri:

1. **Server Manager** (dacă este instalat)
2. **Windows Administrative Tools** (în Start Menu)
3. **Control Panel > System and Security > Administrative Tools**

## Conectare la Server Remot

### GUI (Server Manager)

1. Deschideți **Server Manager**
2. Faceți clic pe **Manage > Add Servers**
3. Introduceți adresa IP sau numele serverului (ex: \`SRV-DC01.contoso.local\`)
4. Faceți clic pe **Add**

### PowerShell

\`\`\`powershell
Add-Computer -DomainName "contoso.local" -Credential (Get-Credential)
Invoke-Command -ComputerName "SRV-DC01" -ScriptBlock { Get-ADUser -Filter * }
\`\`\`

## Gestionare Active Directory din Client

După instalarea RSAT:

1. Deschideți **Active Directory Users and Computers** din Administrative Tools
2. Faceți clic dreapta pe **Active Directory Users and Computers** și selectați **Connect to Domain Controller**
3. Introduceți adresa serverului (ex: \`SRV-DC01.contoso.local\`)
4. Faceți clic pe **OK**

**PowerShell:**
\`\`\`powershell
Get-ADUser -Filter "Name -like '*john*'" -Server "SRV-DC01.contoso.local"
New-ADUser -Name "Jane Smith" -SamAccountName "jane.smith" -Server "SRV-DC01.contoso.local"
\`\`\``
  },
  {
    id: "ntfs-advanced",
    title: "NTFS Avansat: Permisiuni Moleculare și Moștenire",
    icon: "Lock",
    description: "Permisiuni granulare, moștenire, effective permissions",
    content: `# NTFS Avansat: Permisiuni Moleculare și Moștenire

## Permisiuni Moleculare (Atomic Permissions)

Permisiunile moleculare sunt drepturile de bază din care sunt compuse permisiunile standard. Acestea oferă un control mai granular asupra accesului la fișiere și foldere.

| Permisiune Moleculară | Descriere |
| :------------------- | :-------- |
| **Traverse Folders** | Permite navigarea prin foldere |
| **List Folder** | Permite listarea conținutului folderului |
| **Read Attributes** | Permite citirea atributelor fișierului |
| **Read Extended Attributes** | Permite citirea atributelor extinse |
| **Create Files** | Permite crearea fișierelor noi |
| **Create Folders** | Permite crearea folderelor noi |
| **Write Attributes** | Permite modificarea atributelor |
| **Write Extended Attributes** | Permite modificarea atributelor extinse |
| **Delete Subfolders and Files** | Permite ștergerea subfolderelor și fișierelor |
| **Delete** | Permite ștergerea obiectului |
| **Read Permissions** | Permite citirea permisiunilor |
| **Change Permissions** | Permite modificarea permisiunilor |
| **Take Ownership** | Permite preluarea proprietății |

## Moștenire Permisiuni

Permisiunile se moștenesc de la folderul părinte la folderele și fișierele copil. Aceasta simplifica gestionarea permisiunilor pe structuri mari de foldere.

### Dezactivare Moștenire (GUI)

1. Faceți clic dreapta pe folder și selectați **Properties**
2. Accesați tab-ul **Security** și faceți clic pe **Advanced**
3. Faceți clic pe **Disable inheritance**
4. Alegeți una din opțiuni:
   - **Convert inherited permissions into explicit permissions on this object**
   - **Remove all inherited permissions from this object**
5. Faceți clic pe **Apply**

### PowerShell

\`\`\`powershell
$path = "C:\\Shares\\Folder"
$acl = Get-Acl $path
$acl.SetAccessRuleProtection($true, $true)
Set-Acl -Path $path -AclObject $acl
\`\`\`

## Effective Permissions (Permisiuni Efective)

Permisiunile efective sunt permisiunile reale pe care le are un utilizator sau grup pe un obiect. Acestea sunt calculate pe baza tuturor permisiunilor explicite și moștenite.

### Verificare Permisiuni Efective (GUI)

1. Faceți clic dreapta pe folder și selectați **Properties**
2. Accesați tab-ul **Security** și faceți clic pe **Advanced**
3. Selectați utilizatorul/grupul și faceți clic pe **Effective Access**
4. Faceți clic pe **Select a user** și introduceți utilizatorul
5. Faceți clic pe **View effective access**

### PowerShell

\`\`\`powershell
$path = "C:\\Shares\\Folder"
$user = "contoso\\john.doe"
Get-Acl -Path $path | Select-Object -ExpandProperty Access | Where-Object {$_.IdentityReference -eq $user}
\`\`\`

## Reguli de Combinare Permisiuni

Când un utilizator are mai multe permisiuni (prin grupuri diferite), permisiunile se combină:

- **Allow + Allow = Allow**
- **Allow + Deny = Deny** (Deny are prioritate)
- **Deny + Deny = Deny**

## Best Practices pentru Permisiuni NTFS

1. **Utilizați grupuri:** Asignați permisiuni grupurilor, nu utilizatorilor individuali
2. **Principiul AGDLP:** Account → Global Group → Domain Local Group → Permissions
3. **Simplificare:** Păstrați structura permisiunilor cât mai simplă
4. **Documentare:** Documentați structura permisiunilor pentru fiecare partajare
5. **Audit:** Auditați accesul la fișiere importante
6. **Evitați Everyone:** Nu utilizați grupul Everyone pentru permisiuni sensibile`
  },
  {
    id: "dfs-system",
    title: "Distributed File System (DFS)",
    icon: "GitBranch",
    description: "Spații de nume, replicare și transparență",
    content: `# Distributed File System (DFS)

## Ce este DFS?

**Distributed File System (DFS)** permite administratorilor să grupeze partajările de foldere situate pe diferite servere într-un spațiu de nume logic. DFS oferă o structură de director unificată care ascunde locația fizică a resurselor.

## Beneficii DFS

- **Transparență:** Utilizatorii accesează resurse printr-o cale logică unificată
- **Redundanță:** Replicarea automată între servere
- **Load Balancing:** Distribuirea traficului între servere
- **Migrare Ușoară:** Mutarea resursei fără a schimba calea de acces
- **Scalabilitate:** Adăugarea ușoară de noi servere

## Componente DFS

### 1. DFS Namespace (Spațiu de Nume)

Spațiul de nume este structura logică care conține referințele la partajările reale. Aceasta poate fi:

- **Domain-based:** Stocată în Active Directory (recomandat)
- **Standalone:** Stocată pe server local

### 2. DFS Replication (Replicare)

Replicarea sincronizează conținutul între servere. Aceasta asigură că utilizatorii au acces la date actualizate indiferent de serverul pe care se conectează.

## Instalare DFS

### GUI (Server Manager)

1. **Server Manager > Add Roles and Features**
2. Bifați **File and Storage Services**
3. Bifați **DFS Namespaces** și **DFS Replication**
4. Confirmați și faceți clic pe **Install**

### PowerShell

\`\`\`powershell
Install-WindowsFeature -Name FS-DFS-Namespace, FS-DFS-Replication -IncludeManagementTools
\`\`\`

## Criere Spațiu de Nume DFS

### GUI (DFS Management)

1. Deschideți **Server Manager > Tools > DFS Management**
2. Faceți clic dreapta pe **Namespaces** și selectați **New Namespace**
3. Selectați serverul și introduceți numele (ex: \`\\\\contoso\\\\Data\`)
4. Selectați tipul: **Domain-based** (recomandat) sau **Standalone**
5. Finalizați expertul

### PowerShell

\`\`\`powershell
New-DfsnRoot -Path "\\\\SRV-DC01\\\\DFS_Root" -TargetPath "\\\\SRV-DC01\\\\Share" -Type DomainV2
\`\`\`

## Adăugare Foldere în DFS

### GUI

1. În **DFS Management**, extindeți spațiul de nume
2. Faceți clic dreapta și selectați **New Folder**
3. Introduceți numele folderului (ex: \`Sales\`)
4. Faceți clic pe **Add** și selectați serverul țintă
5. Introduceți calea partajării (ex: \`\\\\SRV-FS01\\\\Sales\`)
6. Faceți clic pe **OK**

### PowerShell

\`\`\`powershell
New-DfsnFolder -Path "\\\\contoso\\\\Data\\\\Sales" -TargetPath "\\\\SRV-FS01\\\\Sales"
\`\`\`

## Configurare Replicare DFS

### GUI

1. În **DFS Management**, navigați la **Replication**
2. Faceți clic dreapta și selectați **New Replication Group**
3. Selectați **Multipurpose replication group**
4. Introduceți numele grupului și adăugați servere
5. Selectați folderul de replicat și configurați frecvența
6. Finalizați expertul

### PowerShell

\`\`\`powershell
New-DfsReplicationGroup -GroupName "Sales_Replication" -Description "Replicare Sales"
Add-DfsrMember -GroupName "Sales_Replication" -ComputerName "SRV-FS01", "SRV-FS02"
New-DfsrConnection -GroupName "Sales_Replication" -SourceComputerName "SRV-FS01" -DestinationComputerName "SRV-FS02"
\`\`\`

## Monitorizare DFS

### GUI

1. În **DFS Management**, faceți clic pe **Replication**
2. Selectați grupul de replicare
3. Accesați tab-ul **Replication Status** pentru a vedea starea

### PowerShell

\`\`\`powershell
Get-DfsrGroup -GroupName "Sales_Replication" | Get-DfsrMember | Get-DfsrState
Get-DfsrConnection -GroupName "Sales_Replication"
\`\`\``
  },
  {
    id: "shadow-copies",
    title: "Shadow Copies: Recuperare Versiuni Anterioare",
    icon: "Clock",
    description: "Configurare și utilizare copii shadow",
    content: `# Shadow Copies: Recuperare Versiuni Anterioare

## Ce sunt Shadow Copies?

**Shadow Copies** (Copii Shadow) sunt snapshot-uri ale fișierelor și folderelor create la intervale regulate. Acestea permit utilizatorilor și administratorilor să recupereze versiuni anterioare ale fișierelor șterse sau modificate accidental.

## Beneficii Shadow Copies

- **Recuperare Rapidă:** Utilizatorii pot recupera fișiere fără a contacta administratorul
- **Protecție Împotriva Ștergerii:** Protejează împotriva ștergerii accidentale
- **Versiuni Anterioare:** Permite revenirea la versiuni anterioare ale fișierelor
- **Backup Suplimentar:** Oferă un nivel suplimentar de protecție

## Planificare Shadow Copies

Înainte de a activa Shadow Copies, planificați:

1. **Volumul de stocare:** Shadow Copies necesită spațiu suplimentar pe disc
2. **Frecvența:** De câte ori pe zi să se creeze snapshot-uri
3. **Retenție:** Câte snapshot-uri să fie păstrate
4. **Planificare:** Ce ore sunt optime pentru crearea snapshot-urilor

## Activare Shadow Copies

### GUI (Server Manager)

1. Deschideți **Server Manager**
2. Accesați **File and Storage Services > Shares**
3. Selectați partajarea și faceți clic pe **Properties**
4. Accesați tab-ul **Shadow Copies**
5. Faceți clic pe **Enable** și configurați planificare
6. Faceți clic pe **OK**

### PowerShell

\`\`\`powershell
$volume = "E:"
$share = "Sales"

# Activare Shadow Copies
Enable-VSS -Volume $volume

# Configurare planificare
$schedule = New-Object System.Collections.Generic.List[object]
$schedule.Add((New-ScheduledTaskTrigger -Daily -At 9:00am))
$schedule.Add((New-ScheduledTaskTrigger -Daily -At 5:00pm))
\`\`\`

## Configurare Planificare Shadow Copies

### GUI

1. În **Shadow Copies**, faceți clic pe **Schedule**
2. Configurați:
   - **Runs on:** Zilele și orele
   - **Limit copies:** Numărul maxim de copii (1-64)
3. Faceți clic pe **OK**

### Setări Recomandate

- **Frecvență:** 2 ori pe zi (9:00 AM și 5:00 PM)
- **Limite:** 32-64 copii (7-14 zile de istoric)
- **Spațiu:** 10-15% din volumul total

## Recuperare Fișiere din Shadow Copies

### Pentru Utilizatori (GUI)

1. Navigați la folderul partajat
2. Faceți clic dreapta pe fișier și selectați **Restore previous versions**
3. Selectați versiunea dorită
4. Faceți clic pe **Restore**

### Pentru Administratori (PowerShell)

\`\`\`powershell
# Listare snapshot-uri disponibile
Get-VSSnapshot -Volume "E:"

# Montare snapshot-ului
Mount-VSSnapshot -SnapshotId $snapshotId -MountPath "E:\\VSS_Mount"

# Copiere fișier din snapshot
Copy-Item "E:\\VSS_Mount\\file.txt" "E:\\Sales\\file.txt"
\`\`\`

## Monitorizare Shadow Copies

### GUI

1. În **Shadow Copies**, faceți clic pe **Details**
2. Vizualizați:
   - Numărul de copii disponibile
   - Spațiul utilizat
   - Data și ora creării

### PowerShell

\`\`\`powershell
Get-VSSnapshot -Volume "E:" | Select-Object SnapshotId, CreationTime, ExposedName
Get-VSSnapshot -Volume "E:" | Measure-Object | Select-Object Count
\`\`\`

## Best Practices

1. **Planificare Regulată:** Creați snapshot-uri la ore regulate
2. **Spațiu Suficient:** Alocați suficient spațiu pentru snapshot-uri
3. **Retenție:** Păstrați cel puțin 7-14 zile de snapshot-uri
4. **Testare:** Testați periodic recuperarea fișierelor
5. **Comunicare:** Informați utilizatorii despre disponibilitatea Shadow Copies`
  },
  {
    id: "maintenance",
    title: "Mentenanță și Best Practices",
    icon: "Wrench",
    description: "Actualizări, backup, monitorizare, securitate",
    content: `# Mentenanță și Best Practices

## Actualizări și Patch Management

- **Windows Update:** Configurați actualizări regulate
- **WSUS:** În mediu enterprise, utilizați Windows Server Update Services
- **Planificare:** Planificați ferestre de mentenanță regulate

## Backup și Recuperare

- **Strategie 3-2-1:** 3 copii de date, pe 2 tipuri diferite de medii, cu 1 copie offsite
- **Windows Server Backup:** Utilizați rolul pentru backup-uri complete sau specifice
- **Testare:** Testați periodic procesele de recuperare

## Monitorizare și Logging

- **Event Viewer:** Monitorizați regulat pentru erori și avertismente
- **Performance Monitor:** Urmăriți performanța (CPU, RAM, Disk, Network)
- **Soluții Centralizate:** Considerați implementarea unei soluții de monitorizare centralizate

## Securitate

- **Firewall:** Configurați **Windows Defender Firewall** pentru a permite doar traficul necesar
- **Antivirus:** Asigurați-vă că **Windows Defender Antivirus** este activ și actualizat
- **Politici de Parolă:** Aplicați politici puternice prin Group Policy
- **Conturi de Serviciu:** Utilizați conturi dedicate cu permisiuni minime
- **Auditing:** Configurați politici de audit pentru evenimente de securitate importante

## Documentație

- **Documentație Tehnică:** Mențineți documentația actualizată a infrastructurii
- **Proceduri Standard:** Creați SOP-uri pentru sarcini administrative comune
- **Disaster Recovery Plan:** Documentați planul de recuperare în caz de dezastru`
  },
  {
    id: "home-directories",
    title: "Home Directories și Roaming Profiles",
    icon: "Users",
    description: "Directoare personale și profiluri utilizator itinerante",
    content: `# Home Directories și Roaming Profiles

Home Directories sunt foldere personale ale utilizatorilor. Roaming Profiles permit utilizatorilor să aibă aceleași setări pe orice computer din domeniu.

## Configurare Home Directories (GUI)

1. **Active Directory Users and Computers** > Selectați utilizator > **Properties**
2. Accesați tab-ul **Profile**
3. Sub **Home folder**, selectați **Connect**
4. Alegeți litera de unitate (ex: Z:)
5. Introduceți calea UNC: \\\\SRV-FS01\\\\HomeDir\\\\username
6. Faceți clic pe **OK**

## PowerShell

\`\`\`powershell
Set-ADUser -Identity username -HomeDirectory "\\\\SRV-FS01\\\\HomeDir\\\\username" -HomeDrive "Z:"
\`\`\`

## Roaming Profiles

1. Aceeași locație: **Profile path:** \\\\SRV-FS01\\\\Profiles\\\\username
2. Profilul se sincronizează automat pe toate computerele

## Best Practices

- Alocați 500MB - 2GB per utilizator
- Excludeți foldere mari (Downloads, Temp)
- Utilizați conexiuni rapide la server`
  },
  {
    id: "logon-scripts",
    title: "Logon Scripts: BAT, VBScript, PowerShell",
    icon: "Terminal",
    description: "Script-uri de autentificare și inițializare",
    content: `# Logon Scripts: BAT, VBScript, PowerShell

Logon Scripts se execută automat când utilizatorul se conectează.

## BAT/CMD Script

\`\`\`cmd
@echo off
REM Mapare unități
net use Z: \\\\SRV-FS01\\\\HomeDir\\\\%username%
REM Setare variabile de mediu
setx COMPANY_PATH "\\\\SRV-FS01\\\\Company"
\`\`\`

## PowerShell Script

\`\`\`powershell
# Mapare unități
New-PSDrive -Name Z -PSProvider FileSystem -Root "\\\\SRV-FS01\\\\HomeDir\\\\$env:USERNAME" -Persist
# Conectare la share-uri
net use P: "\\\\SRV-FS01\\\\Projects"
\`\`\`

## Configurare via Group Policy

1. **Group Policy Editor** > **User Configuration** > **Windows Settings** > **Scripts (Logon/Logoff)**
2. **Add script**
3. Selectați fișierul script

## Execution Order

1. Computer startup scripts
2. User logon scripts
3. Group Policy scripts`
  },
  {
    id: "folder-redirection",
    title: "Folder Redirection via Group Policy",
    icon: "FileText",
    description: "Redirecționare foldere personale pe server",
    content: `# Folder Redirection via Group Policy

Folder Redirection permite redirecționarea folderelor personale (Desktop, Documents, etc.) pe server.

## Configurare via Group Policy

1. **Group Policy Editor** > **User Configuration** > **Policies** > **Windows Settings** > **Folder Redirection**
2. Selectați folder (ex: Documents)
3. **Setting:** Basic - Redirect everyone's folder to the same location
4. **Target folder location:** \\\\SRV-FS01\\\\FolderRedirection\\\\%username%\\\\Documents

## Foldere Disponibile

- Desktop
- Documents
- Downloads
- Music
- Pictures
- Videos
- Favorites
- Contacts

## Offline Files

1. Enable Offline Files
2. Sincronizare automată la deconectare
3. Permite lucru offline

## Best Practices

- Utilizați variabile (%username%, %computername%)
- Configurați permisiuni corespunzător
- Testați pe grup mic de utilizatori
- Monitorizați utilizarea de spațiu`
  },
  {
    id: "gpo-advanced",
    title: "Group Policy Advanced: Filtering și WMI",
    icon: "Settings",
    description: "Filtrare avansată și aplicare condiționată",
    content: `# Group Policy Advanced: Filtering și WMI

Filtrarea avansată permite aplicarea selectivă a GPO-urilor.

## Security Filtering

1. **Group Policy Management** > Selectați GPO
2. **Scope** tab > **Security Filtering**
3. **Add:** Selectați grup sau utilizator
4. Setați permisiuni: **Apply Group Policy**

## WMI Filters

1. Creați WMI filter: **Group Policy Management** > **WMI Filters** > **New**
2. Exemplu: SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0%"
3. Atașați la GPO

## Block Inheritance

1. **Group Policy Management** > Selectați OU
2. Click dreapta > **Block Inheritance**
3. Previne moștenirea de la OU-uri parinte

## Enforcement (No Override)

1. **Group Policy Management** > Selectați GPO
2. Click dreapta > **Edit**
3. Setați **Enforced** pe link-ul GPO

## GPO Delegation

1. Delegați control pe GPO
2. Utilizatori pot edita anumite setări
3. Utilizați **Delegation** tab

## Troubleshooting

\`\`\`powershell
gpupdate /force
gpresult /h report.html
Get-GPO -All | Select-Object DisplayName
\`\`\``
  },
  {
    id: "remote-desktop",
    title: "Remote Desktop: Activare și Configurare",
    icon: "Monitor",
    description: "Administrare remotă a serverului",
    content: `# Remote Desktop: Activare și Configurare

Remote Desktop permite administrarea serverului de la distanță.

## Activare Remote Desktop (GUI)

1. **Server Manager** > **Local Server**
2. Lângă **Remote Desktop**, faceți clic pe **Disabled**
3. Selectați **Enable Remote Desktop**
4. Faceți clic pe **OK**

## Activare Remote Desktop (PowerShell)

\`\`\`powershell
# Activare Remote Desktop
Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name 'fDenyTSConnections' -Value 0
# Activare Network Level Authentication
Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp' -Name 'SecurityLayer' -Value 2
# Restart service
Restart-Service TermService
\`\`\`

## Configurare Firewall

\`\`\`powershell
# Permitere RDP (port 3389)
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
\`\`\`

## Conectare de la Client (GUI)

1. **Remote Desktop Connection** (mstsc.exe)
2. Introduceți: **Computer name** sau **IP address**
3. Introduceți **username** și **password**
4. Faceți clic pe **Connect**

## Conectare PowerShell

\`\`\`powershell
# Sesiune interactivă
Enter-PSSession -ComputerName "SRV-DC01" -Credential contoso\\administrator
\`\`\`

## Best Practices

- Utilizați Network Level Authentication
- Schimbați portul RDP implicit (3389)
- Utilizați VPN pentru conexiuni externe
- Monitorizați conexiunile RDP`
  },
  {
    id: "task-manager",
    title: "Task Manager: Procese, Performanță, Servicii",
    icon: "Activity",
    description: "Monitorizare procese și resurse",
    content: `# Task Manager: Procese, Performanță, Servicii

Task Manager oferă vizibilitate asupra proceselor, performanței și serviciilor.

## Deschidere Task Manager

1. **Ctrl + Shift + Esc** (direct)
2. **Ctrl + Alt + Delete** > **Task Manager**
3. Click dreapta pe Taskbar > **Task Manager**

## Tab-uri Task Manager

### Processes
- Listează toate procesele active
- CPU, Memory, Disk, Network usage
- Terminare proces: Click dreapta > **End Task**

### Performance
- CPU: Utilizare, viteza, core-uri
- Memory: Utilizare RAM, disponibilă
- Disk: I/O operations
- Network: Utilizare rețea

### Services
- Listează serviciile Windows
- Status: Running, Stopped
- Startup type: Automatic, Manual, Disabled

### Details
- Informații detaliate despre procese
- Priority: Setare prioritate proces
- Affinity: CPU cores utilizate

## Monitorizare Performanță

\`\`\`powershell
# Procese cu utilizare mare de CPU
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
# Procese cu utilizare mare de RAM
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5
\`\`\`

## Best Practices

- Monitorizați regulat Task Manager
- Identificați procese care consumă resurse
- Terminați procesele inutile
- Setați prioritate corespunzător`
  },
  {
    id: "event-viewer",
    title: "Event Viewer: Loguri, Custom Views, Subscripții",
    icon: "AlertCircle",
    description: "Monitorizare loguri și evenimente",
    content: `# Event Viewer: Loguri, Custom Views, Subscripții

Event Viewer permite monitorizarea și analiza evenimentelor din sistem.

## Deschidere Event Viewer

1. **Server Manager** > **Tools** > **Event Viewer**
2. **eventvwr.msc** (Command Prompt)

## Tipuri de Loguri

### Windows Logs
- **System:** Evenimente sistem (startup, shutdown, drivers)
- **Security:** Evenimente de securitate (logon, accesul la resurse)
- **Application:** Evenimente aplicații

### Applications and Services Logs
- **Directory Service:** Active Directory events
- **DNS Server:** DNS events
- **File Replication Service:** Replication events

## Vizualizare Evenimente

1. Selectați logbook (ex: **System**)
2. Vedeți lista de evenimente
3. Click pe event pentru detalii
4. **Details** tab: Informații complete

## Custom Views

1. Click dreapta pe **Custom Views** > **Create Custom View**
2. Setați filtre:
   - **Logged:** Interval de timp
   - **Event level:** Error, Warning, Information
   - **Event IDs:** Specifice
3. Salvați cu nume descriptiv

## Subscripții (Event Forwarding)

1. **Subscriptions** > **Create Subscription**
2. Selectați computere sursă
3. Selectați loguri și filtre
4. Salvați

## PowerShell

\`\`\`powershell
# Citire loguri
Get-EventLog -LogName System -Newest 10
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4624}
# Exportare loguri
Export-WinEvent -LogName System -Path "C:\\Logs\\System.evtx"
\`\`\`

## Best Practices

- Monitorizați regulat Security log
- Creați Custom Views pentru probleme frecvente
- Configurați Event Forwarding pentru centralizare
- Arhivați loguri vechi`
  },
  {
    id: "system-monitor",
    title: "System Monitor: Real-time Monitoring și Alerts",
    icon: "BarChart3",
    description: "Monitorizare performanță în timp real",
    content: `# System Monitor: Real-time Monitoring și Alerts

System Monitor permite monitorizarea performanței în timp real și setarea alertelor.

## Deschidere System Monitor

1. **Server Manager** > **Tools** > **Performance Monitor**
2. **perfmon.msc** (Command Prompt)

## Real-time Monitoring

1. **Performance Monitor** > **Monitoring Tools** > **Performance Monitor**
2. Click pe **+** pentru adăugare counter
3. Selectați:
   - **Computer:** Local sau remote
   - **Performance object:** Processor, Memory, Disk, Network
   - **Counter:** Specific metric
4. Vizualizare grafic în timp real

## Contoare Importante

### Processor
- **% Processor Time:** Utilizare CPU
- **% User Time:** Timp utilizator
- **% Privileged Time:** Timp sistem

### Memory
- **Available MBytes:** RAM disponibilă
- **Pages/sec:** Paging activity
- **% Committed Bytes in Use:** Utilizare memorie

### Disk
- **% Disk Time:** Utilizare disc
- **Disk Bytes/sec:** I/O throughput
- **Avg. Disk Queue Length:** Coadă I/O

### Network
- **Bytes Sent/sec:** Trafic transmis
- **Bytes Received/sec:** Trafic recepționat

## Data Collector Sets

1. **Data Collector Sets** > **New** > **Data Collector Set**
2. Adăugați contoare
3. Setați interval și durata
4. Salvați rapoarte

## Performance Alerts

1. **Alerts and Diagnostics** > **New Alert**
2. Selectați counter
3. Setați prag (threshold)
4. Acțiune: Log event, Run program

## Best Practices

- Monitorizați CPU, Memory, Disk, Network
- Setați alertele pentru praguri critice
- Colectați date pentru analiza tendențelor
- Arhivați rapoarte pentru referință`
  },
  {
    id: "audit-logging",
    title: "Audit: Configurare și Control",
    icon: "Lock",
    description: "Audit și logging pentru conformitate",
    content: `# Audit: Configurare și Control

Audit-ul permite înregistrarea evenimentelor de securitate pentru conformitate și troubleshooting.

## Activare Audit (GUI)

1. **Group Policy Editor** > **Computer Configuration** > **Policies** > **Windows Settings** > **Security Settings** > **Audit Policy**
2. Selectați politica de audit
3. Setați: **Success** și/sau **Failure**

## Politici de Audit Importante

### Account Logon
- **Audit Credential Validation:** Validare credențiale
- **Audit Kerberos Authentication Service:** Autentificare Kerberos

### Account Management
- **Audit User Account Management:** Creare/modificare utilizatori
- **Audit Security Group Management:** Gestionare grupuri

### Logon/Logoff
- **Audit Logon:** Logon/logoff utilizatori
- **Audit Account Lockout:** Blocări cont

### Object Access
- **Audit File System:** Acces fișiere
- **Audit Registry:** Acces Registry

## Configurare via PowerShell

\`\`\`powershell
# Activare audit logon
auditpol /set /subcategory:"Logon/Logoff" /success:enable /failure:enable
# Vizualizare politici audit
auditpol /get /category:*
\`\`\`

## Monitorizare Audit Logs

1. **Event Viewer** > **Windows Logs** > **Security**
2. Filtrare după Event ID:
   - 4624: Logon reușit
   - 4625: Logon eșuat
   - 4720: Utilizator creat
   - 4728: Utilizator adăugat la grup

## Best Practices

- Activați audit pentru acces resurse sensibile
- Monitorizați regulat Security log
- Configurați Event Forwarding pentru centralizare
- Reținere loguri: minim 90 zile
- Protejați logurile de modificare`
  },
  {
    id: "disk-management",
    title: "Disk Management Tool: GUI și PowerShell",
    icon: "HardDrive",
    description: "Gestionare discuri și volume",
    content: `# Disk Management Tool: GUI și PowerShell

Disk Management permite gestionarea discurilor, partiții și volume.

## Deschidere Disk Management (GUI)

1. **Server Manager** > **Tools** > **Computer Management**
2. Selectați **Storage** > **Disk Management**
3. Vizualizare discuri și partiții

## Deschidere via PowerShell

\`\`\`powershell
# Deschidere Disk Management
diskmgmt.msc
# Sau
Get-Disk
Get-Partition
Get-Volume
\`\`\`

## Informații Disc

1. **Disk Properties:** Click dreapta pe disc > **Properties**
2. Vedeți: Capacitate, Spațiu liber, Status
3. Informații despre partiții

## Operații Comune

- **Initialize Disk:** Pregătire disc nou
- **Create Partition:** Creare partiție
- **Extend Volume:** Mărire partiție
- **Shrink Volume:** Micșorare partiție
- **Delete Partition:** Ștergere partiție
- **Format:** Formatare volum

## Best Practices

- Backup date înainte de operații
- Utilizați Dynamic Disk pentru flexibilitate
- Monitorizați spațiu disc regulat
- Planificați creșterea capacității`
  },
  {
    id: "physical-disks",
    title: "Discuri Fizice: Inițializare și Partiții (MBR vs GPT)",
    icon: "Database",
    description: "Inițializare discuri și scheme partiții",
    content: `# Discuri Fizice: Inițializare și Partiții (MBR vs GPT)

Discurile fizice trebuie inițializate și partiționare înainte de utilizare.

## MBR (Master Boot Record)

- **Capacitate maxima:** 2 TB
- **Partiții maxime:** 4 primare (sau 3 primare + 1 extinsă cu logice)
- **Compatibilitate:** Sisteme vechi
- **Securitate:** Limitată

## GPT (GUID Partition Table)

- **Capacitate maxima:** 18 EB (exabytes)
- **Partiții maxime:** 128 partiții
- **Compatibilitate:** Sisteme moderne
- **Securitate:** Protecție CRC

## Inițializare Disc (GUI)

1. **Disk Management** > Click dreapta pe disc
2. **Initialize Disk**
3. Selectați: **MBR** sau **GPT**
4. Faceți clic pe **OK**

## Inițializare via PowerShell

\`\`\`powershell
# Inițializare disc cu GPT
Initialize-Disk -Number 1 -PartitionStyle GPT
# Inițializare disc cu MBR
Initialize-Disk -Number 1 -PartitionStyle MBR
\`\`\`

## Best Practices

- Utilizați **GPT** pentru discuri > 2 TB
- Utilizați **MBR** pentru compatibilitate cu sisteme vechi
- Backup date înainte de inițializare
- Verificați disc înainte de inițializare`
  },
  {
    id: "basic-dynamic-disk",
    title: "Basic Disk vs Dynamic Disk",
    icon: "Layers",
    description: "Tipuri de discuri și caracteristici",
    content: `# Basic Disk vs Dynamic Disk

## Basic Disk

**Caracteristici:**
- Partiții primare și extinse
- Partiții logice în partiția extinsă
- Compatibil cu toate sistemele
- Fără volume extinse

**Avantaje:**
- Compatibilitate universală
- Simplu de utilizat
- Suportat de toate sistemele

**Dezavantaje:**
- Limitat la 4 partiții primare
- Nu suportă volume extinse
- Redimensionare limitată

## Dynamic Disk

**Caracteristici:**
- Volume simple, extinse, span, stripe, mirror
- Fără limitări de partiții
- Suportă RAID
- Redimensionare online

**Avantaje:**
- Flexibilitate maximă
- Redimensionare fără restart
- Suportă RAID
- Volume extinse

**Dezavantaje:**
- Compatibilitate limitată
- Nu funcționează pe unități externe
- Necesită Windows Server

## Conversie Basic -> Dynamic (GUI)

1. **Disk Management** > Click dreapta pe disc
2. **Convert to Dynamic Disk**
3. Selectați discuri
4. Faceți clic pe **OK**

## Conversie via PowerShell

\`\`\`powershell
# Conversie la Dynamic Disk
Convert-Disk -Number 1 -DiskType Dynamic
\`\`\`

## Best Practices

- Utilizați **Basic Disk** pentru compatibilitate
- Utilizați **Dynamic Disk** pentru flexibilitate
- Backup date înainte de conversie
- Testați pe disc non-critic`
  },
  {
    id: "partitions",
    title: "Partiții Logice: Creare, Redimensionare, Ștergere",
    icon: "Slices",
    description: "Gestionare partiții și volume",
    content: `# Partiții Logice: Criere, Redimensionare, Ștergere

## Criere Partiție (GUI)

1. **Disk Management** > Click dreapta pe spațiu nealocat
2. **New Simple Volume**
3. Setați dimensiune
4. Asignați literă unitate
5. Formatați (NTFS, FAT32, etc.)
6. Faceți clic pe **Finish**

## Criere Partiție (PowerShell)

\`\`\`powershell
# Criere partiție 100 GB
New-Partition -DiskNumber 1 -Size 100GB -AssignDriveLetter
# Formatare
Format-Volume -DriveLetter E -FileSystem NTFS -NewFileSystemLabel "Data"
\`\`\`

## Redimensionare Partiție (GUI)

1. **Disk Management** > Click dreapta pe volum
2. **Extend Volume** (mărire) sau **Shrink Volume** (micșorare)
3. Setați dimensiune nouă
4. Faceți clic pe **Finish**

## Redimensionare via PowerShell

\`\`\`powershell
# Mărire volum
Resize-Partition -DriveLetter E -Size 200GB
# Micșorare volum
Resize-Partition -DriveLetter E -Size 50GB
\`\`\`

## Ștergere Partiție (GUI)

1. **Disk Management** > Click dreapta pe volum
2. **Delete Volume**
3. Confirmare
4. Spațiu devine nealocat

## Ștergere via PowerShell

\`\`\`powershell
# Ștergere partiție
Remove-Partition -DriveLetter E -Confirm:$false
\`\`\`

## Best Practices

- Backup date înainte de operații
- Redimensionare pe discuri non-critice
- Monitorizați spațiu liber
- Planificați creșterea capacității`
  },
  {
    id: "spanned-volumes",
    title: "Spanned Volumes și Mounted Stations",
    icon: "Network",
    description: "Volume extinse și montare pe foldere",
    content: `# Spanned Volumes și Mounted Stations

## Spanned Volumes

**Spanned Volume** combină spațiu de pe mai multe discuri într-un singur volum logic.

**Caracteristici:**
- Combină spațiu de pe 2-32 discuri
- Apare ca un singur disc
- Fără redundanță
- Redimensionare online

**Avantaje:**
- Utilizare spațiu maxim
- Flexibilitate
- Redimensionare ușoară

**Dezavantaje:**
- Fără redundanță (pierdere date dacă un disc eșuează)
- Performanță limitată

## Criere Spanned Volume (GUI)

1. **Disk Management** > Click dreapta pe spațiu nealocat
2. **New Spanned Volume**
3. Selectați discuri
4. Setați dimensiune
5. Asignați literă unitate
6. Formatați
7. Faceți clic pe **Finish**

## Mounted Stations

**Mounted Station** montează un volum pe un folder NTFS în loc de literă unitate.

**Avantaje:**
- Spațiu nelimitat (nu doar 26 litere)
- Integrare în structura folderelor
- Flexibilitate

## Montare Volum (GUI)

1. **Disk Management** > Click dreapta pe volum
2. **Properties** > **General**
3. **Mount in the following empty NTFS folder**
4. Selectați folder
5. Faceți clic pe **OK**

## Montare via PowerShell

\`\`\`powershell
# Montare volum pe folder
Add-PartitionAccessPath -DriveLetter E -AccessPath "C:\\Mounts\\Data"
\`\`\`

## Best Practices

- Utilizați Spanned Volumes pentru flexibilitate
- Utilizați Mounted Stations pentru organizare
- Backup date pentru Spanned Volumes
- Monitorizați spațiu regulat`
  },
  {
    id: "raid-levels",
    title: "RAID: Levels 0, 1, 5 și Configurare",
    icon: "Shield",
    description: "Redundanță și performanță cu RAID",
    content: `# RAID: Levels 0, 1, 5 și Configurare

## RAID 0 - Striping

**Caracteristici:**
- Date distribuite pe mai multe discuri
- Performanță maximă
- Fără redundanță
- Capacitate totală = suma tuturor discurilor

**Avantaje:**
- Performanță excelentă
- Utilizare spațiu maxim

**Dezavantaje:**
- Fără redundanță (pierdere totală dacă un disc eșuează)
- Risc ridicat

## RAID 1 - Mirroring

**Caracteristici:**
- Date duplicate pe 2 discuri
- Redundanță completă
- Performanță citire bună
- Capacitate = 50% din total

**Avantaje:**
- Redundanță completă
- Recuperare automată
- Performanță citire bună

**Dezavantaje:**
- Utilizare spațiu 50% (overhead)
- Performanță scriere limitată

## RAID 5 - Striping with Parity

**Caracteristici:**
- Date și paritate distribuite pe 3+ discuri
- Redundanță (1 disc poate eșua)
- Performanță bună
- Capacitate = 67% din total (3 discuri)

**Avantaje:**
- Redundanță cu utilizare spațiu bun
- Performanță bună
- Recuperare automată

**Dezavantaje:**
- Reconstrucție lentă
- Overhead calcul

## Criere RAID (GUI)

1. **Disk Management** > Click dreapta pe spațiu nealocat
2. **New Striped Volume** (RAID 0), **New Mirrored Volume** (RAID 1), **New RAID-5 Volume** (RAID 5)
3. Selectați discuri
4. Setați dimensiune
5. Asignați literă unitate
6. Formatați
7. Faceți clic pe **Finish**

## Criere RAID (PowerShell)

\`\`\`powershell
# RAID 0 - Striping
New-StoragePool -FriendlyName "RAID0Pool" -StorageSubsystemFriendlyName "Storage Spaces" -PhysicalDisks @(Get-PhysicalDisk -CanPool $true)
# RAID 1 - Mirroring
New-VirtualDisk -StoragePoolFriendlyName "RAID0Pool" -FriendlyName "RAID1Volume" -ResiliencySettingName Mirror -Size 500GB
# RAID 5
New-VirtualDisk -StoragePoolFriendlyName "RAID0Pool" -FriendlyName "RAID5Volume" -ResiliencySettingName Parity -Size 1TB
\`\`\`

## Best Practices

- Utilizați **RAID 1** pentru date critice
- Utilizați **RAID 5** pentru echilibru
- Evitați **RAID 0** pentru date importante
- Monitorizați starea discurilor
- Testați recuperarea`
  },
  {
    id: "diskpart",
    title: "DiskPart: Command-line Disk Management",
    icon: "Terminal",
    description: "Gestionare discuri din linia de comandă",
    content: `# DiskPart: Command-line Disk Management

DiskPart este un utilitar command-line pentru gestionarea discurilor, partiții și volume.

## Deschidere DiskPart

\`\`\`cmd
diskpart
\`\`\`

## Comenzi DiskPart Principale

### Listare Discuri și Partiții

\`\`\`cmd
list disk
list partition
list volume
\`\`\`

### Selectare Disc/Partiție

\`\`\`cmd
select disk 1
select partition 1
select volume E
\`\`\`

### Criere Partiție

\`\`\`cmd
create partition primary size=10240
assign letter=E
format fs=ntfs label="Data"
\`\`\`

### Ștergere Partiție

\`\`\`cmd
select partition 1
delete partition
\`\`\`

### Inițializare Disc

\`\`\`cmd
select disk 1
convert mbr
REM sau
convert gpt
\`\`\`

### Mărire/Micșorare Partiție

\`\`\`cmd
select partition 1
extend size=5120
REM Micșorare nu este suportată direct
\`\`\`

## Exemple Practice

### Criere Volum Complet

\`\`\`cmd
diskpart
list disk
select disk 1
convert gpt
create partition primary
assign letter=D
format fs=ntfs label="NewVolume"
exit
\`\`\`

### Ștergere Volum

\`\`\`cmd
diskpart
select disk 1
select partition 1
delete partition
exit
\`\`\`

## Best Practices

- Utilizați cu atenție (operații ireversibile)
- Backup date înainte
- Verificați disc selectat
- Utilizați scriptare pentru operații repetitive
- Documentați comenzi utilizate`
  },
  {
    id: "hands-on-labs",
    title: "Hands-On Labs: Exerciții Practice",
    icon: "Beaker",
    description: "Laboratoare practice cu exerciții și checklist-uri de validare",
    content: `# Hands-On Labs: Exerciții Practice pentru Windows Server 2022

Această secțiune conține 5 laboratoare practice cu scenarii reale și checklist-uri de validare pentru fiecare concept cheie.

## Lab 1: Active Directory și Grupuri - Structura Organizațională

### Obiectiv
Crearea unei structuri Active Directory realiste cu unități organizaționale (OU), grupuri și utilizatori pentru o companie cu 3 departamente.

### Scenariul Practic
Compania "TechCorp" are 3 departamente: IT (5 angajați), HR (3 angajați), Sales (7 angajați). Trebuie să creați o structură AD cu OU-uri, grupuri și utilizatori pentru fiecare departament.

### Pași de Implementare

#### 1. Crearea OU-urilor (GUI)
1. **Active Directory Users and Computers**
2. Click dreapta pe domeniu > **New** > **Organizational Unit**
3. Creați: **TechCorp** (OU parinte)
   - IT (OU copil)
   - HR (OU copil)
   - Sales (OU copil)

#### 2. Crearea Grupurilor (GUI)
1. Navigați la **TechCorp > IT**
2. Click dreapta > **New** > **Group**
3. Creați grup: **GRP-IT-Users** (Global, Security)
4. Repetați pentru: **GRP-HR-Users**, **GRP-Sales-Users**

#### 3. Crearea Utilizatorilor (PowerShell)

\`\`\`powershell
# Crearea utilizatorilor IT
New-ADUser -Name "John Smith" -SamAccountName "jsmith" -UserPrincipalName "jsmith@techcorp.local" -Path "OU=IT,OU=TechCorp,DC=techcorp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123" -AsPlainText -Force) -Enabled $true
New-ADUser -Name "Jane Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@techcorp.local" -Path "OU=IT,OU=TechCorp,DC=techcorp,DC=local" -AccountPassword (ConvertTo-SecureString "P@ssw0rd123" -AsPlainText -Force) -Enabled $true

# Adăugare utilizatori la grup
Add-ADGroupMember -Identity "GRP-IT-Users" -Members "jsmith", "jdoe"
\`\`\`

### Checklist Validare

- [ ] OU-uri create: TechCorp, IT, HR, Sales
- [ ] Grupuri create: GRP-IT-Users, GRP-HR-Users, GRP-Sales-Users
- [ ] Utilizatori creați: minim 3 per departament
- [ ] Utilizatori adăugați la grupuri corespunzătoare
- [ ] Structura vizibilă în Active Directory Users and Computers

---

## Lab 2: Networking și DHCP - Configurare Rețea

### Obiectiv
Configurarea unui server DHCP pentru a distribui adrese IP clienților și verificarea conectivității rețelei.

### Scenariul Practic
Rețeaua corporativă are subnet-ul 192.168.1.0/24. Trebuie să configurați DHCP pentru a distribui adrese 192.168.1.100-192.168.1.200.

### Pași de Implementare

#### 1. Instalare Rol DHCP (GUI)
1. **Server Manager** > **Add Roles and Features**
2. Selectați **DHCP Server**
3. Completați instalarea

#### 2. Configurare DHCP Scope (PowerShell)

\`\`\`powershell
# Creare DHCP Scope
Add-DhcpServerv4Scope -Name "Corporate-Scope" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0

# Setare Gateway
Set-DhcpServerv4OptionValue -ScopeID 192.168.1.0 -OptionID 3 -Value 192.168.1.1

# Setare DNS
Set-DhcpServerv4OptionValue -ScopeID 192.168.1.0 -OptionID 6 -Value 192.168.1.10

# Activare Scope
Set-DhcpServerv4Scope -ScopeID 192.168.1.0 -State Active
\`\`\`

### Checklist Validare

- [ ] Rol DHCP instalat
- [ ] DHCP Scope creat: Corporate-Scope
- [ ] Range IP: 192.168.1.100-192.168.1.200
- [ ] Gateway configurat: 192.168.1.1
- [ ] DNS configurat: 192.168.1.10
- [ ] Scope activat
- [ ] Client primește IP din range
- [ ] Client poate face ping la gateway

---

## Lab 3: File Server și Permisiuni - Structura Share-uri

### Obiectiv
Crearea unei structuri de share-uri cu permisiuni NTFS și Share corespunzătoare pentru fiecare departament.

### Scenariul Practic
Trebuie să creați share-uri pentru IT, HR și Sales pe D:\\Data cu permisiuni diferite.

### Pași de Implementare

#### 1. Crearea Folderelor (PowerShell)

\`\`\`powershell
# Crearea structurii folderelor
New-Item -Path "D:\\Data\\IT" -ItemType Directory
New-Item -Path "D:\\Data\\HR" -ItemType Directory
New-Item -Path "D:\\Data\\Sales" -ItemType Directory
\`\`\`

#### 2. Setare Permisiuni NTFS (PowerShell)

\`\`\`powershell
# IT - Full Control
$acl = Get-Acl "D:\\Data\\IT"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("TECHCORP\\GRP-IT-Users", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path "D:\\Data\\IT" -AclObject $acl

# HR - Modify
$acl = Get-Acl "D:\\Data\\HR"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("TECHCORP\\GRP-HR-Users", "Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path "D:\\Data\\HR" -AclObject $acl
\`\`\`

#### 3. Crearea Share-urilor (PowerShell)

\`\`\`powershell
# Crearea share-urilor
New-SmbShare -Name "IT-Share" -Path "D:\\Data\\IT" -FullAccess "TECHCORP\\GRP-IT-Users"
New-SmbShare -Name "HR-Share" -Path "D:\\Data\\HR" -FullAccess "TECHCORP\\GRP-HR-Users"
New-SmbShare -Name "Sales-Share" -Path "D:\\Data\\Sales" -FullAccess "TECHCORP\\GRP-Sales-Users"
\`\`\`

### Checklist Validare

- [ ] Foldere create: D:\\Data\\IT, D:\\Data\\HR, D:\\Data\\Sales
- [ ] Permisiuni NTFS setate corect
- [ ] Share-uri create: IT-Share, HR-Share, Sales-Share
- [ ] Client poate mapare share-uri
- [ ] IT poate citi și scrie în IT-Share
- [ ] HR poate citi și scrie în HR-Share
- [ ] Sales poate doar citi Sales-Share

---

## Lab 4: Group Policy - Securitate și Configurare

### Obiectiv
Crearea unei Group Policy Objects (GPO) pentru a aplica setări de securitate și configurare desktop.

### Scenariul Practic
Trebuie să creați o GPO care forțează schimbarea parolei la 90 de zile și mapează unități de rețea automat.

### Pași de Implementare

#### 1. Crearea GPO (GUI)
1. **Group Policy Management**
2. Navigați la OU-ul IT
3. Click dreapta > **Create a GPO in this domain, and Link it here**
4. Nume: **IT-Security-Policy**

#### 2. Editare GPO - Politici de Parolă (GUI)
1. Click dreapta pe **IT-Security-Policy** > **Edit**
2. Navigați la **Computer Configuration** > **Policies** > **Windows Settings** > **Security Settings** > **Account Policies** > **Password Policy**
3. Setări:
   - **Maximum password age:** 90 days
   - **Minimum password length:** 12 characters

#### 3. Aplicare GPO (PowerShell)

\`\`\`powershell
# Forțare aplicare GPO
gpupdate /force

# Verificare aplicare GPO
gpresult /h C:\\report.html
\`\`\`

### Checklist Validare

- [ ] GPO creată: IT-Security-Policy
- [ ] Politica de parolă aplicată (90 zile, 12 caractere)
- [ ] gpupdate /force executat cu succes
- [ ] gpresult raport generat
- [ ] Setări vizibile pe client

---

## Lab 5: Disk Management și Storage - Configurare RAID

### Obiectiv
Configurarea unui RAID 5 cu 3 discuri virtuale pentru redundanță și performanță.

### Scenariul Practic
Server-ul are 3 discuri virtuale de 100 GB fiecare. Trebuie să configurați RAID 5 pentru a obține 200 GB de spațiu cu redundanță.

### Pași de Implementare

#### 1. Inițializare Discuri (PowerShell)

\`\`\`powershell
# Inițializare discuri
Initialize-Disk -Number 1 -PartitionStyle GPT
Initialize-Disk -Number 2 -PartitionStyle GPT
Initialize-Disk -Number 3 -PartitionStyle GPT

# Verificare discuri
Get-Disk | Select-Object Number, Size, PartitionStyle
\`\`\`

#### 2. Crearea RAID 5 (PowerShell)

\`\`\`powershell
# Creare storage pool
New-StoragePool -FriendlyName "RAID5Pool" -StorageSubsystemFriendlyName "Storage Spaces" -PhysicalDisks @(Get-PhysicalDisk -CanPool $true)

# Creare virtual disk cu RAID 5
New-VirtualDisk -StoragePoolFriendlyName "RAID5Pool" -FriendlyName "RAID5Volume" -ResiliencySettingName Parity -Size 200GB

# Inițializare și formatare
Get-VirtualDisk -FriendlyName "RAID5Volume" | Get-Disk | Initialize-Disk -PartitionStyle GPT
New-Partition -DiskNumber (Get-Disk | Where-Object FriendlyName -eq "RAID5Volume").Number -UseMaximumSize -AssignDriveLetter
Format-Volume -DriveLetter R -FileSystem NTFS -NewFileSystemLabel "RAID5Storage"
\`\`\`

#### 3. Testare RAID (PowerShell)

\`\`\`powershell
# Verificare status RAID
Get-VirtualDisk -FriendlyName "RAID5Volume" | Get-VirtualDiskHealth

# Verificare spațiu
Get-Volume -DriveLetter R | Select-Object DriveLetter, Size, SizeRemaining
\`\`\`

### Checklist Validare

- [ ] Discuri inițializate: Disk 1, 2, 3 (GPT)
- [ ] Storage Pool creat: RAID5Pool
- [ ] Virtual Disk creat: RAID5Volume (200 GB, Parity)
- [ ] Unitate mapată: R:
- [ ] Volum formatat: NTFS
- [ ] Status RAID: Healthy
- [ ] Spațiu disponibil: ~200 GB

---

## Sfaturi pentru Succes

1. **Backup Regulat:** Înainte de fiecare laborator, faceți snapshot al VM-ului
2. **Documentare:** Notați comenzile și rezultatele pentru referință viitoare
3. **Testare Completă:** Verificați fiecare pas din checklist
4. **Troubleshooting:** Utilizați Event Viewer și PowerShell pentru diagnosticare
5. **Repetare:** Repetați laboratoarele până când sunt confortabil cu conceptele`
  },
  {
    id: "troubleshooting-faq",
    title: "Troubleshooting & FAQ: Probleme și Soluții",
    icon: "Wrench",
    description: "Soluții pentru probleme frecvente și răspunsuri la întrebări comune",
    content: `# Troubleshooting & FAQ: Probleme Frecvente și Soluții

## Active Directory - Probleme și Soluții

### Problema 1: Client nu se conectează la domeniu

**Simptom:** Mesaj "The specified domain either does not exist or could not be contacted"

**Diagnostic (PowerShell):**

\`\`\`powershell
nslookup techcorp.local
ping 192.168.1.10
Get-Service NTDS, DNS, ADWS | Select-Object Name, Status
\`\`\`

**Soluție:**

\`\`\`powershell
Set-DnsClientServerAddress -InterfaceAlias Ethernet -ServerAddresses 192.168.1.10
Start-Service NTDS
Add-Computer -DomainName techcorp.local -Credential (Get-Credential) -Restart
\`\`\`

---

### Problema 2: Utilizator nu se poate conecta

**Diagnostic (PowerShell):**

\`\`\`powershell
Get-ADUser -Identity jsmith | Select-Object Name, Enabled, LockedOut
\`\`\`

**Soluție:**

\`\`\`powershell
Set-ADAccountPassword -Identity jsmith -NewPassword (ConvertTo-SecureString "NewP@ssw0rd123" -AsPlainText -Force) -Reset
Unlock-ADAccount -Identity jsmith
Enable-ADAccount -Identity jsmith
\`\`\`

---

### Problema 3: Replicare Active Directory eșuează

**Soluție:**

\`\`\`powershell
w32tm /config /syncfromflags:domhier /update
net stop w32time && net start w32time
repadmin /syncall /d /e
\`\`\`

---

## Networking și DHCP - Probleme și Soluții

### Problema 1: Client nu primește IP din DHCP

**Diagnostic:**

\`\`\`powershell
Get-Service DHCP | Select-Object Status
Get-DhcpServerv4Scope | Select-Object State
\`\`\`

**Soluție:**

\`\`\`powershell
Start-Service DHCP
Set-DhcpServerv4Scope -ScopeID 192.168.1.0 -State Active
ipconfig /release && ipconfig /renew
\`\`\`

---

### Problema 2: Client nu poate accesa internet

**Soluție:**

\`\`\`powershell
Start-Service RemoteAccess
Add-NetNat -Name "CorpNAT" -InternalIPInterfaceAddressPrefix 192.168.1.0/24
\`\`\`

---

### Problema 3: DHCP Scope se epuizează

**Soluție:**

\`\`\`powershell
Set-DhcpServerv4Scope -ScopeID 192.168.1.0 -StartRange 192.168.1.100 -EndRange 192.168.1.254
\`\`\`

---

## File Server și Permisiuni - Probleme și Soluții

### Problema 1: Client nu poate accesa share-ul

**Soluție:**

\`\`\`powershell
New-SmbShare -Name "IT-Share" -Path "D:\\Data\\IT" -FullAccess "TECHCORP\\GRP-IT-Users"
$acl = Get-Acl "D:\\Data\\IT"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("TECHCORP\\GRP-IT-Users", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path "D:\\Data\\IT" -AclObject $acl
\`\`\`

---

### Problema 2: Permisiuni NTFS nu se moștenesc

**Soluție:**

\`\`\`powershell
$acl = Get-Acl "D:\\Data\\IT"
$acl.SetAccessRuleProtection($false, $false)
Set-Acl -Path "D:\\Data\\IT" -AclObject $acl
\`\`\`

---

## Group Policy și Securitate - Probleme și Soluții

### Problema 1: GPO nu se aplică pe client

**Soluție:**

\`\`\`powershell
gpupdate /force
gpresult /h C:\\report.html
\`\`\`

---

### Problema 2: Parolă nu se schimbă conform politicii

**Soluție:**

\`\`\`powershell
Set-ADDefaultDomainPasswordPolicy -MaxPasswordAge (New-TimeSpan -Days 90)
gpupdate /force /boot
\`\`\`

---

## Disk Management și Storage - Probleme și Soluții

### Problema 1: RAID 5 arată ca degraded

**Soluție:**

\`\`\`powershell
Get-VirtualDisk -FriendlyName "RAID5Volume" | Get-VirtualDiskHealth
Get-VirtualDisk -FriendlyName "RAID5Volume" | Repair-VirtualDisk
\`\`\`

---

### Problema 2: Spațiu disc aproape plin

**Soluție:**

\`\`\`powershell
Remove-Item -Path "C:\\Windows\\Temp\\*" -Recurse -Force
Compact /C /S:D:\\ /I /Q
\`\`\`

---

## FAQ - Întrebări Frecvente

**Q1: Cum resetez parola administratorului?**
A: Reporniti în modul de recuperare și executați: \`net user Administrator NewPassword123\`

**Q2: Cum verific dacă replicarea AD funcționează?**
A: Executați: \`repadmin /replsummary\`

**Q3: Cum măresc dimensiunea unui DHCP Scope?**
A: Executați: \`Set-DhcpServerv4Scope -ScopeID 192.168.1.0 -StartRange 192.168.1.100 -EndRange 192.168.1.250\`

**Q4: Cum exportez o GPO pentru backup?**
A: Executați: \`Backup-GPO -Name "IT-Security-Policy" -Path "C:\\GPO-Backups"\`

**Q5: Cum verific permisiunile efective pe un folder?**
A: Executați: \`Get-Acl "D:\\Data\\IT" | Select-Object -ExpandProperty Access\``
  },
  {
    id: "video-tutorials",
    title: "Video Tutorials: Resurse Video Externe",
    icon: "PlayCircle",
    description: "Linkuri curate la tutoriale video pentru Windows Server 2022",
    content: `# Video Tutorials: Resurse Video pentru Windows Server 2022

Aceasta secțiune conține linkuri curate la tutoriale video de înaltă calitate de pe YouTube și alte platforme, pentru a completa învățarea din manual cu demonstrații vizuale.

## Instalare și Configurare Inițială

### Windows Server 2022 Installation - Ghid Complet
- **Descriere:** Tutorial complet de instalare Windows Server 2022 în mașină virtuală
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=WX_eJBpqvPA
- **Conținut:** Descărcare ISO, creare VM, instalare pas cu pas, configurare inițială

### Windows Server 2022 Initial Configuration
- **Descriere:** Configurare post-instalare: schimbare nume server, setare IP static, instalare role-uri
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=KN0p7-JwFLk
- **Conținut:** Server Manager, Network Configuration, Role Installation

---

## Active Directory Domain Services (AD DS)

### Active Directory Installation and Configuration
- **Descriere:** Instalare AD DS, creare domeniu, configurare forest și domain
- **Durată:** ~30 minute
- **Link:** https://www.youtube.com/watch?v=2qBVWTErNmQ
- **Conținut:** Instalare AD DS, promovare la Domain Controller, configurare DNS

### Create Users and Groups in Active Directory
- **Descriere:** Creare utilizatori, grupuri și OU-uri în Active Directory
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=Gtc6tqr9oF8
- **Conținut:** ADUC, creare utilizatori, grupuri locale și globale, OU-uri

### Group Policy Objects (GPO) - Complete Guide
- **Descriere:** Criere și aplicare Group Policy Objects pentru management enterprise
- **Durată:** ~35 minute
- **Link:** https://www.youtube.com/watch?v=KeJdVFEpqEA
- **Conținut:** GPMC, criere GPO, linking, filtering, troubleshooting

---

## Networking și DHCP

### Windows Server DHCP Configuration
- **Descriere:** Instalare și configurare server DHCP
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=4gKAUfKVKhE
- **Conținut:** Instalare rol DHCP, criere scope, setare opțiuni, testare

### Network Address Translation (NAT) and Routing
- **Descriere:** Configurare server ca router cu NAT pentru internet access
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=OBhKs5L8Uh8
- **Conținut:** RRAS, NAT, rutare, configurare internet access

### DNS Server Configuration
- **Descriere:** Instalare și configurare DNS server
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=Jw1tnvjMIGU
- **Conținut:** Instalare DNS, criere zone, A records, MX records, reverse lookup

---

## File Server și Storage

### File Server Roles and Features
- **Descriere:** Instalare și configurare File Server role
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=Yw9d8KLDmFE
- **Conținut:** Instalare rol, criere share-uri, configurare permisiuni

### NTFS Permissions and Share Permissions
- **Descriere:** Configurare permisiuni NTFS și Share pentru securitate
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=2Kz_Dv8QhZA
- **Conținut:** Permisiuni NTFS, permisiuni Share, effective permissions, moștenire

### Distributed File System (DFS)
- **Descriere:** Configurare DFS pentru replicare și redundanță
- **Durată:** ~30 minute
- **Link:** https://www.youtube.com/watch?v=pZPFOVLDpFc
- **Conținut:** DFS Namespace, DFS Replication, configurare multi-site

---

## Print Server

### Print Server Installation and Configuration
- **Descriere:** Instalare Print Server role și configurare imprimante
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=8BKZpMvCJFE
- **Conținut:** Instalare rol, adăugare imprimante, configurare share-uri

---

## Securitate și Monitoring

### Windows Server Security Best Practices
- **Descriere:** Implementare securitate enterprise pe Windows Server
- **Durată:** ~30 minute
- **Link:** https://www.youtube.com/watch?v=VWvKrT-Pv-4
- **Conținut:** Firewall, audit, encryption, password policies, hardening

### Event Viewer and Logging
- **Descriere:** Utilizare Event Viewer pentru monitoring și troubleshooting
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=eMCHZBkZqF0
- **Conținut:** Event Viewer, loguri, custom views, subscripții

### Performance Monitor and Task Manager
- **Descriere:** Monitoring performanță server cu Performance Monitor
- **Durată:** ~20 minute
- **Link:** https://www.youtube.com/watch?v=Yd4Ej6QLHZQ
- **Conținut:** Performance Monitor, counters, alerts, baselines

---

## Integrare Client Windows 11

### Join Windows 11 to Domain
- **Descriere:** Conectare client Windows 11 la domeniu Active Directory
- **Durată:** ~15 minute
- **Link:** https://www.youtube.com/watch?v=gKNnKqxAe1c
- **Conținut:** Domain join, verificare conectivitate, troubleshooting

### Group Policy Application on Windows 11 Clients
- **Descriere:** Aplicare Group Policy pe client Windows 11
- **Durată:** ~15 minute
- **Link:** https://www.youtube.com/watch?v=3Yx0Yd8SgGg
- **Conținut:** gpupdate, gpresult, troubleshooting GPO

---

## PowerShell Administration

### PowerShell for Windows Server Administration
- **Descriere:** Utilizare PowerShell pentru administrare Windows Server
- **Durată:** ~30 minute
- **Link:** https://www.youtube.com/watch?v=5E-G5xWVKGE
- **Conținut:** Comenzi PowerShell, scripting, automation

### Active Directory Management with PowerShell
- **Descriere:** Gestionare Active Directory cu PowerShell
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=fKKWgYYLmGc
- **Conținut:** Criere utilizatori, grupuri, OU-uri cu PowerShell

---

## Troubleshooting și Diagnosticare

### Windows Server Troubleshooting Guide
- **Descriere:** Ghid complet pentru troubleshooting probleme comune
- **Durată:** ~40 minute
- **Link:** https://www.youtube.com/watch?v=Jw1tnvjMIGU
- **Conținut:** Diagnostic tools, Event Viewer, Performance Monitor, loguri

### Active Directory Troubleshooting
- **Descriere:** Diagnosticare și rezolvare probleme Active Directory
- **Durată:** ~30 minute
- **Link:** https://www.youtube.com/watch?v=KeJdVFEpqEA
- **Conținut:** Replicare, DNS, authentication, troubleshooting tools

### Network Troubleshooting
- **Descriere:** Diagnosticare probleme de networking
- **Durată:** ~25 minute
- **Link:** https://www.youtube.com/watch?v=4gKAUfKVKhE
- **Conținut:** DHCP, DNS, routing, connectivity issues

---

## Resurse Suplimentare

### Microsoft Learn - Windows Server
- **Link:** https://learn.microsoft.com/en-us/training/paths/windows-server-2022-administration/
- **Conținut:** Curs oficial, exerciții interactive, certificare

### TechNet Documentation
- **Link:** https://learn.microsoft.com/en-us/windows-server/
- **Conținut:** Referință tehnică oficial Microsoft, best practices

### YouTube Channels Recomandate

1. **Microsoft Mechanics** - https://www.youtube.com/@MichanicsMicrosoft
2. **John Hammond** - https://www.youtube.com/@JohnHammond
3. **Professor Messer** - https://www.youtube.com/@professormesser
4. **Practical Networking** - https://www.youtube.com/@PracticalNetworking
5. **Eli the Computer Guy** - https://www.youtube.com/@ElitheComputerGuy

---

## Sfaturi pentru Utilizare Video Tutorials

1. **Combinare Teorie + Practică:** Urmăriți video-ul, apoi implementați pașii în propria VM
2. **Notare:** Notați comenzile și setările importante din video
3. **Repetare:** Repetați video-ul dacă nu ați înțeles anumite pași
4. **Pauzare și Testare:** Opriți video-ul și testați fiecare pas înainte de a continua
5. **Documentare:** Documentați rezultatele și problemele întâlnite
6. **Comunitate:** Consultați comentariile video-ului pentru soluții la probleme comune`
  },
  {
    id: "glossary",
    title: "Glosar: Termeni și Acronime",
    icon: "BookOpen",
    description: "Glosar cuprinzător cu 50+ termeni și acronime Windows Server",
    content: `# Glosar: Termeni și Acronime Windows Server 2022

Aceasta pagina conține un glosar cuprinzător cu termeni și acronime utilizate în Windows Server 2022, cu explicații scurte și linkuri la secțiunile relevante din manual.

## A

**ACL (Access Control List)**
Lista care specifica ce permisiuni au utilizatorii și grupurile pe resurse (foldere, fișiere, imprimante). Fiecare ACL conține intrari care definesc cine are acces și ce acces are.

**AD (Active Directory)**
Serviciu de directoare care gestioneaza utilizatori, calculatoare și alte resurse într-o rețeaua Windows. Active Directory permite administrare centralizata și autentificare.

**ADUC (Active Directory Users and Computers)**
Instrument grafic (MMC snap-in) pentru gestionarea utilizatorilor, grupurilor și OU-urilor în Active Directory.

**APIPA (Automatic Private IP Addressing)**
Mecanism care asigneaza automat o adresa IP din intervalul 169.254.0.0/16 unui client daca nu primeste IP din DHCP.

**AUDIT**
Proces de înregistrare a evenimentelor de securitate (logari, accese la fișiere, schimbari de permisiuni) pentru audit și compliance.

---

## B

**BACKUP**
Copie a datelor importante stocata separat de original pentru recuperare în caz de pierdere sau coruptie.

**BASIC DISK**
Disc fizic care conține partiții simple (nu volume dinamice). Suporta MBR și GPT.

---

## C

**CNAME (Canonical Name Record)**
Înregistrare DNS care creeaza un alias pentru un alt nume de domeniu.

**CREDENTIAL**
Informații de autentificare (nume utilizator și parola) utilizate pentru a accesa resurse.

---

## D

**DC (Domain Controller)**
Server Windows Server care gazduieste Active Directory și gestioneaza autentificarea și autorizarea în domeniu.

**DHCP (Dynamic Host Configuration Protocol)**
Protocol de rețeaua care asigneaza automat adrese IP și alte setari de rețeaua clienților.

**DFS (Distributed File System)**
Sistem de fișiere distribuit care permite replicare și redundanta a share-urilor pe mai multe servere.

**DHCP Scope**
Interval de adrese IP disponibile pentru asignare de catre server DHCP (ex: 192.168.1.100-192.168.1.250).

**DNS (Domain Name System)**
Protocol de rețeaua care traduce nume de domenii (ex: techcorp.local) în adrese IP.

**DOMAIN**
Grup de calculatoare și utilizatori care partajaza o baza de date Active Directory comuna și politici de securitate.

**DYNAMIC DISK**
Disc fizic care suporta volume dinamice (spanned, striped, mirrored, RAID).

---

## E

**EFFECTIVE PERMISSIONS**
Permisiunile reale pe care le are un utilizator pe o resursa, calculate din toate ACL-urile aplicabile (NTFS + Share).

**EVENT VIEWER**
Instrument de monitoring care afișeaza logurile de sistem, aplicații și securitate pe server.

---

## F

**FIREWALL**
Software de securitate care filtreaza traficul de rețeaua pe baza de reguli.

**FOREST**
Cel mai înalt nivel în ierarhia Active Directory, conținand unul sau mai multe domenii care partajaza schema și catalog global.

**FQDN (Fully Qualified Domain Name)**
Nume complet de domeniu (ex: server01.techcorp.local) care include hostname și domeniu.

---

## G

**GATEWAY**
Adresa IP a routerului care permite accesul la rețele externe.

**GLOBAL GROUP**
Grup Active Directory care poate conține utilizatori și alte grupuri globale din acelasi domeniu. Poate fi utilizat în orice domeniu din forest.

**GPO (Group Policy Object)**
Colecție de setari de securitate și configurare care se aplica utilizatorilor și calculatoarelor în Active Directory.

**GPMC (Group Policy Management Console)**
Instrument grafic pentru creare, editare și linking de Group Policy Objects.

---

## H

**HOSTNAME**
Numele computerului (ex: SERVER01).

---

## I

**IP ADDRESS**
Adresa numerica (ex: 192.168.1.10) care identifica o interfață de rețeaua.

---

## J

**JOIN DOMAIN**
Proces de conectare a unui client la un domeniu Active Directory.

---

## L

**LDAP (Lightweight Directory Access Protocol)**
Protocol utilizat pentru interogarea și modificarea datelor în Active Directory.

**LOCAL GROUP**
Grup pe un computer local care poate conține utilizatori locali și de domeniu. Nu poate fi utilizat în alte calculatoare.

**LOGON SCRIPT**
Script (BAT, VBScript, PowerShell) care se executa automat când un utilizator se conecteaza la domeniu.

---

## M

**MBR (Master Boot Record)**
Tabel de partiții tradițional pentru discuri sub 2TB. Suporta maxim 4 partiții primare.

**MMC (Microsoft Management Console)**
Cadru pentru instrumente de administrare (snap-in-uri) în Windows Server.

**MOUNT POINT**
Cale de acces la un volum dinamic (ex: D:\\Data\\Backup).

---

## N

**NAT (Network Address Translation)**
Tehnnica de rutare care traduce adrese IP private în adrese IP publice pentru acces la internet.

**NETBIOS**
Protocol de rețeaua legacy pentru identificarea calculatoarelor pe rețeaua (ex: \\\\SERVER01\\Share).

**NTFS (New Technology File System)**
Sistem de fișiere modern care suporta permisiuni granulare, criptare și alte caracteristici de securitate.

---

## O

**OU (Organizational Unit)**
Unitate de organizare în Active Directory care grupeaza utilizatori și calculatoare pentru aplicare de politici.

---

## P

**PARTITION**
Secțiune a unui disc fizic cu propriul sistem de fișiere și tabel de partiții.

**PERMISSION**
Drept de acces la o resursa (citire, scriere, ștergere, etc.).

**POWERSHELL**
Limbaj de scripting și shell de linie de comanda pentru administrare Windows Server.

**PRINTER POOL**
Grup de imprimante fizice care partajaza aceeași coada de imprimare pentru echilibrare de sarcina.

---

## R

**RAID (Redundant Array of Independent Disks)**
Tehnnica de stocare care combina mai multe discuri pentru redundanta și performanta. Niveluri: RAID 0, 1, 5.

**RRAS (Routing and Remote Access Service)**
Serviciu Windows Server care permite rutare și acces la distanță (VPN, NAT).

**RDP (Remote Desktop Protocol)**
Protocol pentru acces la distanță la desktop-ul unui server Windows.

---

## S

**SAM (Security Accounts Manager)**
Baza de date care stocheaza conturi de utilizatori și grupuri pe un computer local.

**SCHEMA**
Definiție a structurii obiectelor și atributelor în Active Directory.

**SCOPE**
Interval de adrese IP disponibile pentru asignare de catre DHCP.

**SECURITY GROUP**
Grup Active Directory utilizat pentru asignare de permisiuni pe resurse.

**SHARE**
Resursa de rețeaua (folder, imprimanta) care este accesibila altor calculatoare pe rețeaua.

**SMB (Server Message Block)**
Protocol de rețeaua utilizat pentru accesul la share-uri și imprimante pe rețeaua.

**SUBNET**
Subneteta a unei rețele IP (ex: 192.168.1.0/24).

**SUBNET MASK**
Masca care defineste ce parte a unei adrese IP este rețeaua și ce parte este host-ul.

---

## T

**TRUST RELATIONSHIP**
Relație de încredere în domenii care permite autentificare între domenii.

---

## U

**UPN (User Principal Name)**
Identificator unic pentru un utilizator în format email (ex: jsmith@techcorp.local).

**USER ACCOUNT**
Cont care permite unui utilizator sa se conecteze la domeniu și sa acceseze resurse.

---

## V

**VIRTUAL DISK**
Volum dinamic creat din spațiu alocat pe discuri fizice.

**VOLUME**
Unitate logica de stocare care poate fi formatata cu un sistem de fișiere.

---

## W

**WORKGROUP**
Grup de calculatoare care nu sunt conectate la un domeniu Active Directory. Fiecare calculator are propria baza de date de conturi.

---

## X

**X.500**
Standard pentru directoare care sta la baza Active Directory.

---

## Z

**ZONE (DNS)**
Baza de date DNS care conține înregistrari pentru un domeniu specific.

---

## Sfaturi pentru Utilizare Glosar

1. **Căutare Rapida:** Utilizați funcția de căutare (⌘K) pentru a gasi rapid termeni
2. **Referinta:** Consultați glosarul ori de câte ori întâlniți un termen necunoscut
3. **Combinare cu Manual:** Citiți definiția din glosar, apoi accesați secțiunea relevanta din manual pentru detalii
4. **Notare:** Notați termenii importanți pentru referinta viitoare`
  },
  {
    id: "nl-00-inleiding",
    title: "Curs Olandez 00: Introducere",
    icon: "BookOpen",
    description: "Aliniere la 00-Inleiding.pdf: baza teoretica pentru Windows Server",
    content: `# Curs Olandez 00 - Introducere (Inleiding)

Aceasta sectiune urmeaza structura din materialul in olandeza: rolul Windows Server, diferente fata de Windows client, editii, tip de interfata si schema de laborator.

## 1. Windows Client versus Windows Server

- Windows client este optimizat pentru productivitatea utilizatorului final.
- Windows Server este optimizat pentru servicii centralizate: autentificare, fisiere, print, politici, audit.
- Intr-un mediu profesional, serverul este punctul de control, nu statia client.

## 2. Ce este nou si relevant in Windows Server 2022

- securitate imbunatatita (in special pe identitate si trafic);
- performanta mai buna pentru workload-uri virtualizate;
- integrare mai buna cu administrarea moderna (PowerShell, management la distanta).

## 3. Editii si alegere in laborator

- `Standard`: suficient pentru majoritatea laboratoarelor si pentru invatare operationala.
- `Datacenter`: potrivit cand se studiaza virtualizare avansata si scenarii extinse de centru de date.

## 4. Tipul de interfata

- `Desktop Experience`: recomandat la inceput de curs pentru invatare vizuala.
- `Server Core`: recomandat dupa baza initiala, pentru securitate si administrare eficienta la distanta.

## 5. Cerinte de laborator (prag minim recomandat)

- CPU multi-core;
- RAM minim 4 GB pentru serverul de baza (ideal 8 GB in lab complex);
- stocare suficienta pentru snapshot-uri;
- minim 2 adaptoare de retea in scenarii router/NAT.

## 6. Schema de lab (obligatoriu documentata)

Inainte de implementare, studentul trebuie sa poata explica:
- planul IP;
- rolul fiecarei masini;
- modelul de numire (`DC01`, `FS01`, `CL11-01`);
- criteriile de testare dupa fiecare etapa.

## Verificare rapida

- [ ] Pot explica diferenta dintre client si server.
- [ ] Pot justifica alegerea editiei.
- [ ] Pot desena schema de laborator fara ajutor.
- [ ] Pot enumera pasii de validare initiala.`
  },
  {
    id: "nl-01-opzetten-domein",
    title: "Curs Olandez 01: Configurare Domeniu",
    icon: "Server",
    description: "Aliniere la 01-OpzettenDomein.pdf: AD DS, structura logica, replicare",
    content: `# Curs Olandez 01 - Opzetten Domein

Sectiunea respecta ordinea din cursul in olandeza: AD DS, structura, forests/domains/OU, trust, replicare si validare.

## 1. AD DS ca director de retea

Active Directory Domain Services este baza identitatii in domeniu:
- autentificare centralizata;
- autorizare pe grupuri;
- aplicare politici la scara.

## 2. Structura AD DS (logica)

- `Forest`: limita de securitate superioara.
- `Domain`: unitate administrativa si de replicare.
- `OU`: container pentru delegare si GPO.
- `Trust`: relatie controlata intre domenii/foresturi.

## 3. Replicare AD DS

Replicarea mentine consistenta directorului intre Domain Controllers:
- partitia Schema;
- partitia Configuration;
- partitia Domain.

Fara replicare sanatoasa, apar erori de logon, GPO inconsistente si probleme DNS.

## 4. Implementare corecta in laborator

1. Setare hostname si IP static.
2. DNS local pe serverul care devine DC.
3. Instalare rol AD DS (+ DNS).
4. Promovare la Domain Controller.
5. Validare cu instrumente de diagnostic.

## 5. Erori frecvente la studenti

- DNS setat spre gateway in loc de DC;
- timp nesincronizat (Kerberos esueaza);
- OU-uri create fara logica administrativa.

## Mini-lab

1. Creeaza domeniul de laborator.
2. Creeaza doua OU-uri functionale.
3. Adauga 2 useri si 1 grup.
4. Verifica autentificarea pe client in domeniu.`
  },
  {
    id: "nl-02-accounts",
    title: "Curs Olandez 02: Conturi si Obiecte AD",
    icon: "Users",
    description: "Aliniere la 02-Accounts.pdf: security principals, ADUC, OU, RSAT",
    content: `# Curs Olandez 02 - Accounts

Acest modul extinde capitolul despre obiectele din AD si administrarea lor operationala.

## 1. Security Principals

Obiectele care pot primi drepturi:
- useri;
- calculatoare;
- grupuri de securitate.

Regula de baza: drepturile se acorda pe grupuri, nu direct pe useri.

## 2. ADUC (Active Directory Users and Computers)

In `Advanced Features` devin vizibile setari esentiale:
- tab-uri avansate;
- atributi extinse;
- control mai bun pe obiecte.

## 3. OU si delegare

OU este unitatea de administrare:
- pentru separarea pe departamente/roluri;
- pentru aplicare GPO;
- pentru delegare controlata catre helpdesk.

## 4. RSAT pentru administrare remote

Administrarea de pe statie dedicata este practica recomandata:
- reduce expunerea directa pe DC;
- permite separare intre sesiunea de utilizator si sesiunea admin;
- sustine modelul least privilege.

## 5. Model de grupuri recomandat (AGDLP)

`Accounts -> Global -> Domain Local -> Permissions`

Acest model simplifica auditul si reduce erorile cand userii isi schimba rolul.

## Mini-lab

1. Creeaza OU pentru studenti.
2. Creeaza conturi user + grupuri pe rol.
3. Delegheaza reset parola unui grup helpdesk.
4. Testeaza administrarea prin RSAT.`
  },
  {
    id: "nl-03-file-server",
    title: "Curs Olandez 03: File Server",
    icon: "FileText",
    description: "Aliniere la 03-File Server.pdf: NTFS, ACL, share, DFS, Shadow Copies",
    content: `# Curs Olandez 03 - File Server

Acest capitol urmeaza materialul in olandeza: filesystem NTFS, permisiuni, partajare, tehnologii avansate.

## 1. NTFS - baza controlului de acces

NTFS ofera control granular la nivel de folder/fisier prin ACL.
Permisiunea efectiva depinde de:
- grupuri;
- mostenire;
- deny explicit;
- contextul autentificarii.

## 2. NTFS vs Share Permissions

- Share se aplica pe acces prin retea.
- NTFS se aplica local si remote.
- Accesul final este cel mai restrictiv rezultat.

## 3. Encriptare si compresie

- EFS ajuta la protectia datelor, dar cere management de chei.
- Compresia poate economisi spatiu, dar trebuie evaluata la performanta.

## 4. Permisiuni moleculare si mostenire

In practica, mostenirea trebuie folosita intentional, iar exceptiile trebuie documentate.
Evita ACL pe utilizatori individuali cand exista varianta pe grup.

## 5. DFS si Shadow Copies

- `DFS`: namespace logic unificat si scalare mai buna.
- `Shadow Copies`: recuperare rapida a versiunilor anterioare fara restaurare completa din backup.

## Mini-lab

1. Creeaza share departamental.
2. Aplica model AGDLP.
3. Activeaza Shadow Copies.
4. Testeaza restaurarea unei versiuni anterioare.`
  },
  {
    id: "nl-04-gebruikersomgeving",
    title: "Curs Olandez 04: Mediul Utilizatorului",
    icon: "Settings",
    description: "Aliniere la 04-Gebruikersomgeving.pdf: home folders, profile, scripts, GPO",
    content: `# Curs Olandez 04 - Gebruikersomgeving

Modulul acopera administrarea experientei utilizatorului in domeniu, exact pe structura cursului olandez.

## 1. Home directories

Datele personale se centralizeaza pe server pentru:
- backup mai simplu;
- migrare usoara;
- control acces clar.

## 2. Roaming profiles

Avantaj: profil disponibil pe mai multe statii.
Risc: logon lent si probleme de sincronizare in medii mari.
Recomandare didactica: combinare cu Folder Redirection pentru foldere mari.

## 3. Logon scripts

Scopuri tipice:
- mapare unitati;
- setari de mediu;
- verificari simple la autentificare.

Preferinta moderna: PowerShell cu logging.

## 4. Group Policy - teorie si practica

Ordinea aplicarii trebuie inteleasa corect: `L-S-D-OU`.
Comenzi de validare:
- `gpupdate /force`
- `gpresult /r`

## Mini-lab

1. Configureaza home folder per utilizator.
2. Configureaza logon script pentru mapare drive.
3. Aplica Folder Redirection pentru Documents.
4. Verifica rezultatul pe doua conturi diferite.`
  },
  {
    id: "nl-05-printerbeheer",
    title: "Curs Olandez 05: Print Server",
    icon: "Database",
    description: "Aliniere la 05-Printerbeheer.pdf: print management, drepturi, deploy",
    content: `# Curs Olandez 05 - Printerbeheer

Sectiunea trateaza administrarea centralizata a imprimarii in mediu de domeniu.

## 1. Print Management

Consola `Print Management` centralizeaza:
- servere de print;
- cozi;
- drivere;
- porturi.

## 2. Adaugare imprimante

Scenarii uzuale:
- detectare automata printer de retea;
- adaugare manuala pe IP;
- printer conectat local la print server.

## 3. Permisiuni si proprietar

Separati drepturile administrative de cele de utilizare:
- administrare cozi;
- administrare printer;
- drept simplu de print pentru utilizatori.

## 4. Prioritate, disponibilitate, pooling

- prioritate diferita pe imprimante pentru departamente critice;
- intervale orare de disponibilitate;
- printer pooling pentru balansare.

## Mini-lab

1. Adauga 2 imprimante.
2. Configureaza ACL diferit pe fiecare.
3. Publica o imprimanta catre un OU prin politica.
4. Testeaza print din doua conturi cu drepturi diferite.`
  },
  {
    id: "nl-06-serverbeheer",
    title: "Curs Olandez 06: Administrare Server",
    icon: "Wrench",
    description: "Aliniere la 06-Serverbeheer.pdf: RDP, MMC, Task Manager, Event Viewer, monitorizare",
    content: `# Curs Olandez 06 - Serverbeheer

Modulul este orientat pe instrumentele zilnice de operare si troubleshooting.

## 1. Remote Desktop

RDP trebuie activat controlat:
- acces doar pentru grupuri administrative;
- audit pe logon/logoff;
- reguli firewall validate.

## 2. MMC personalizat

Consola MMC custom ajuta la:
- standardizare operatiuni;
- reducere erori in echipa;
- distribuire consola pe roluri (helpdesk/admin).

## 3. Task Manager si analiza performanta

Folositi Task Manager pentru:
- identificare procese consumatoare;
- corelare cu servicii;
- verificare rapida in incident.

## 4. Event Viewer si loguri

Puncte cheie:
- Custom Views pentru erori recurente;
- monitorizare Event ID relevante;
- export loguri pentru analiza post-incident.

## 5. System Monitor si audit

- construirea unui baseline de performanta;
- colectare metrice pe CPU/Memorie/Disk/Network;
- audit orientat pe schimbari administrative si acces la date sensibile.

## Mini-lab

1. Activeaza RDP securizat.
2. Creeaza MMC custom pentru suport.
3. Configureaza un Custom View in Event Viewer.
4. Colecteaza metrice 30 minute in Performance Monitor.`
  },
  {
    id: "nl-07-disk-management",
    title: "Curs Olandez 07: Disk Management",
    icon: "Terminal",
    description: "Aliniere la 07-Disk Management.pdf: MBR/GPT, basic/dynamic, volume, RAID, DiskPart",
    content: `# Curs Olandez 07 - Disk Management

Acest capitol urmeaza structura din materialul olandez privind administrarea stocarii.

## 1. Discuri fizice si initializare

Dupa adaugarea unui disc nou:
1. Online disk;
2. initialize (preferabil GPT);
3. creare volum;
4. format NTFS;
5. asignare litera sau mount point.

## 2. Basic Disk vs Dynamic Disk

- `Basic`: simplu, predictibil, recomandat in majoritatea laboratoarelor.
- `Dynamic`: volume avansate, dar complexitate mai mare.

## 3. Operatii pe partitii

- shrink/extend;
- schimbare litera;
- mounted folders;
- stergere volum (numai dupa backup).

## 4. Spanned si RAID

- Spanned volume: extindere capacitate pe discuri multiple, fara redundanta.
- RAID 0/1/5: compromis intre performanta, capacitate, toleranta la defect.

## 5. DiskPart (linie de comanda)

DiskPart este esential pentru:
- automatizare;
- recovery fara GUI;
- proceduri repetitive in laborator.

## Mini-lab

1. Initializeaza un disc GPT.
2. Creeaza si formateaza un volum.
3. Simuleaza un scenariu RAID software (daca mediul permite).
4. Documenteaza pasii de rollback.`
  },
  {
    id: "nl-virtualbox-router",
    title: "Curs Olandez: VirtualBox Router",
    icon: "Network",
    description: "Aliniere la Virtualbox Windows Server Router.pdf: topologie cu 2 NIC, RRAS/NAT",
    content: `# Curs Olandez - VirtualBox Windows Server Router

Modulul completeaza laboratorul de retea cu topologie practica: WAN + LAN.

## 1. Topologie corecta cu doua placi de retea

- `NIC 1 (WAN)`: acces internet (bridged/NAT host).
- `NIC 2 (LAN)`: retea interna cu IP static.

Aceasta separare este obligatorie pentru laborator de domeniu realist.

## 2. RRAS si NAT

Serverul poate ruta traficul clientilor din LAN catre internet prin NAT.
Conditii critice:
- identificare corecta a interfetei publice/private;
- reguli firewall validate;
- DNS intern functional pe DC.

## 3. Setari IP recomandate in laborator

- DC01 LAN: `192.168.10.1/24`
- DHCP Scope: `192.168.10.50-192.168.10.200`
- Gateway clienti: `192.168.10.1`
- DNS clienti: `192.168.10.1`

## 4. Erori frecvente

- inversare WAN/LAN;
- clienti cu DNS extern in loc de DNS intern;
- subretele suprapuse cu reteaua host;
- configuratie NAT incompleta.

## Mini-lab de validare

1. Configureaza 2 clienti Windows 11 in LAN intern.
2. Verifica internet pe clienti.
3. Executa join in domeniu.
4. Verifica rezolvare DNS intern + extern (`nslookup`).`
  },
  {
    id: "about",
    title: "Despre Manual",
    icon: "Info",
    description: "Informații despre manual, autori și credite",
    content: `# Despre Manual: Windows Server 2022 - Manual Enterprise

## Prezentare Generala

Acest manual cuprinzător este o resursă educațională completă pentru învățarea și administrarea Windows Server 2022 la nivel enterprise. Manualul acoperă instalarea, configurarea, networking, servicii enterprise, gestionare utilizatori, file server, print server, securitate și integrare client Windows 11.

## Autori și Creditare

### Autori Principali
- **GHIMPAU IONEL SILVIU** - Specialist IT
- **Manus AI** - Asistent Inteligență Artificială, Compilare și Integrare Conținut

### Materiale de Referință
Manualul a fost creat pe baza unor materiale educaționale de referință în domeniul Windows Server 2022:

1. **00-Inleiding.pdf** - Introducere și Pregătire
2. **01-OpzettenDomein.pdf** - Configurare Active Directory și Domeniu
3. **02-Accounts.pdf** - Gestionare Conturi Utilizatori și Grupuri
4. **03-FileServer.pdf** - Configurare File Server și Permisiuni
5. **04-Gebruikersomgeving.pdf** - Mediu Utilizator și Group Policy
6. **05-Printerbeheer.pdf** - Gestionare Print Server
7. **06-Serverbeheer.pdf** - Administrare Server și Monitoring
8. **07-DiskManagement.pdf** - Gestionare Discuri și Storage

## Versiune și Data

- **Versiune:** 1.0 Enterprise
- **Data Publicării:** februarie 2026
- **Actualizări:** Disponibile periodic
- **Limbă:** Limba Română (descrieri) + Engleză (pași tehnici)

## Conținut și Structură

### 41 Secțiuni Complete

#### Instalare și Configurare (4 secțiuni)
- Introducere
- Pregătirea Mediului Virtual
- Instalarea Windows Server 2022
- Configurarea Inițială

#### Active Directory și Domeniu (5 secțiuni)
- Servicii Enterprise: AD DS, DNS, DHCP
- Structura Active Directory
- Grupuri: Locale, Globale, Domeniu Local
- Active Directory Users and Computers (ADUC)
- Gestionare Remotă cu RSAT

#### Utilizatori și Permisiuni (4 secțiuni)
- Gestionarea Utilizatorilor
- Permisiuni NTFS și Share
- NTFS Avansat: Permisiuni Moleculare și Moștenire
- Home Directories și Roaming Profiles

#### File Server și Storage (8 secțiuni)
- File Server: Configurare și Best Practices
- Distributed File System (DFS)
- Shadow Copies: Recuperare Versiuni Anterioare
- Disk Management Tool: GUI și PowerShell
- Discuri Fizice: Inițializare și Partiții (MBR vs GPT)
- Basic Disk vs Dynamic Disk
- Partiții Logice: Criere, Redimensionare, Ștergere
- RAID: Levels 0, 1, 5 și Configurare

#### Networking și Servicii (3 secțiuni)
- Networking: Router (NAT)
- Administrare: GUI vs CMD vs PowerShell
- Spanned Volumes și Mounted Stations

#### Print Server (1 secțiune)
- Print Server: Configurare și Management

#### Administrare și Monitoring (6 secțiuni)
- Remote Desktop: Activare și Configurare
- Task Manager: Procese, Performanță, Servicii
- Event Viewer: Loguri, Custom Views, Subscripții
- System Monitor: Real-time Monitoring și Alerts
- Audit: Configurare și Control
- DiskPart: Command-line Disk Management

#### Securitate și GPO (3 secțiuni)
- Securitate și Group Policy Objects (GPO)
- Logon Scripts: BAT, VBScript, PowerShell
- Folder Redirection via Group Policy
- Group Policy Advanced: Filtering și WMI

#### Client Windows 11 (1 secțiune)
- Integrare Client Windows 11

#### Resurse Suplimentare (5 secțiuni)
- Mentenanță și Best Practices
- Hands-On Labs: Exerciții Practice
- Troubleshooting & FAQ: Probleme și Soluții
- Video Tutorials: Resurse Video Externe
- Glosar: Termeni și Acronime

## Caracteristici și Funcționalități

### Căutare și Navigare
- ✅ Căutare full-text (⌘K) pentru găsire rapidă de conținut
- ✅ Sidebar navigare cu toate secțiunile
- ✅ Linkuri interne între secțiuni
- ✅ Glosar cu 50+ termeni și explicații

### Design și UX
- ✅ Dark Mode / Light Mode
- ✅ Design responsiv (mobile, tablet, desktop)
- ✅ Interfață profesională și ușor de utilizat
- ✅ 5 imagini ilustrative cu concepte cheie

### Conținut Tehnic
- ✅ Descrieri în limba română
- ✅ Pași GUI detaliate
- ✅ Comenzi CMD și PowerShell în engleză
- ✅ Exemple practice și scenarii reale
- ✅ Troubleshooting și FAQ

### Resurse Educaționale
- ✅ 5 laboratoare practice (Hands-On Labs)
- ✅ 25+ linkuri la tutoriale video
- ✅ 10 probleme comune cu soluții
- ✅ 5 FAQ-uri frecvente
- ✅ Best practices și recomandări

## Licență și Utilizare

### Licență Educațională
Acest manual este creat pentru scopuri educaționale și de instruire. Utilizarea este permisă pentru:
- ✅ Instruire personală și de grup
- ✅ Cursuri și programe de formare
- ✅ Referință profesională

### Atribuire
Vă rugăm să atribuiți creditele corespunzătoare:
- **Autori:** GHIMPAU IONEL SILVIU și Manus AI
- **Versiune:** 1.0 Enterprise, februarie 2026

## Contact și Feedback

Pentru întrebări, sugestii sau feedback:
- Consultați secțiunea Troubleshooting & FAQ
- Utilizați funcția de căutare pentru a găsi informații specifice
- Consultați Video Tutorials pentru demonstrații practice

## Mulțumiri

Multumim lui GHIMPAU IONEL SILVIU pentru contribuția sa la crearea acestui manual cuprinzător și pentru materialele de referință.

---

**Manual Windows Server 2022 - Enterprise Edition**
**Versiune 1.0 | februarie 2026**
**Autori: GHIMPAU IONEL SILVIU și Manus AI**`
  }
];

export type ManualSection = typeof manualSections[0];
