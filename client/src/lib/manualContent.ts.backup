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
  }
];

export type ManualSection = typeof manualSections[0];
