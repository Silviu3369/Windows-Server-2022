# PHASE 7: HANDS-ON LABS (10+ Detailed Labs)

## Overview
Create 10+ detailed, step-by-step hands-on labs covering practical implementation of Windows Server 2022 services. Each lab includes prerequisites, objectives, procedures, verification, and troubleshooting.

---

## Lab 1: Active Directory Domain Services Setup (4 hours)

### Objectives
- Install Active Directory Domain Services
- Create forest and domain
- Configure domain controller replication
- Verify AD functionality

### Prerequisites
- Windows Server 2022 installed
- Network configured (static IP)
- Admin credentials

### Lab Environment
- **Server 1 (DC1):** 192.168.1.10 (First DC)
- **Server 2 (DC2):** 192.168.1.11 (Replica DC)
- **Domain:** domain.com
- **Forest Functional Level:** 2016

### Procedure 1: Install AD DS on DC1 (45 minutes)

**Step 1: Install AD DS Role**
```powershell
# Install Active Directory Domain Services
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Verify installation
Get-WindowsFeature -Name AD-Domain-Services
```

**Step 2: Promote to Domain Controller**
```powershell
# Import ADDSDeployment module
Import-Module ADDSDeployment

# Create forest
Install-ADDSForest -DomainName "domain.com" `
  -ForestMode "WinThreshold" `
  -DomainMode "WinThreshold" `
  -InstallDns:$true `
  -NoRebootOnCompletion:$false `
  -Force:$true
```

**Step 3: Verify AD Installation**
```powershell
# Check domain
Get-ADDomain

# Check forest
Get-ADForest

# Check domain controller
Get-ADDomainController

# Check DNS
nslookup domain.com
```

### Procedure 2: Add Replica DC (DC2) (45 minutes)

**Step 1: Install AD DS on DC2**
```powershell
# Install AD DS role
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

**Step 2: Promote DC2 to Domain Controller**
```powershell
# Import module
Import-Module ADDSDeployment

# Add replica DC
Install-ADDSDomainController -DomainName "domain.com" `
  -Credential (Get-Credential) `
  -InstallDns:$true `
  -Force:$true
```

**Step 3: Verify Replication**
```powershell
# Check replication status
Get-ADReplicationPartnerMetadata -Target DC1 -Scope Forest

# Force replication
Sync-ADObject -Identity (Get-ADDomainController DC1).NTDSSettingsObjectGuid -Source DC2

# Check replication partners
Get-ADReplicationPartnerMetadata -Target DC1
```

### Procedure 3: Create OUs and Users (30 minutes)

**Step 1: Create Organizational Units**
```powershell
# Create OU structure
New-ADOrganizationalUnit -Name "Servers" -Path "DC=domain,DC=com"
New-ADOrganizationalUnit -Name "Workstations" -Path "DC=domain,DC=com"
New-ADOrganizationalUnit -Name "Users" -Path "DC=domain,DC=com"

# Create sub-OUs
New-ADOrganizationalUnit -Name "Domain Controllers" -Path "OU=Servers,DC=domain,DC=com"
New-ADOrganizationalUnit -Name "File Servers" -Path "OU=Servers,DC=domain,DC=com"
New-ADOrganizationalUnit -Name "IT" -Path "OU=Users,DC=domain,DC=com"
New-ADOrganizationalUnit -Name "Sales" -Path "OU=Users,DC=domain,DC=com"
```

**Step 2: Create Users**
```powershell
# Create IT users
New-ADUser -Name "John Admin" -SamAccountName "jadmin" `
  -Path "OU=IT,OU=Users,DC=domain,DC=com" `
  -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) `
  -Enabled $true

# Create Sales users
New-ADUser -Name "Jane Sales" -SamAccountName "jsales" `
  -Path "OU=Sales,OU=Users,DC=domain,DC=com" `
  -AccountPassword (ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force) `
  -Enabled $true
```

**Step 3: Create Groups**
```powershell
# Create security groups
New-ADGroup -Name "IT Admins" -SamAccountName "IT_Admins" `
  -GroupCategory Security -GroupScope Global `
  -Path "OU=IT,OU=Users,DC=domain,DC=com"

New-ADGroup -Name "Sales Team" -SamAccountName "Sales_Team" `
  -GroupCategory Security -GroupScope Global `
  -Path "OU=Sales,OU=Users,DC=domain,DC=com"

# Add users to groups
Add-ADGroupMember -Identity "IT_Admins" -Members "jadmin"
Add-ADGroupMember -Identity "Sales_Team" -Members "jsales"
```

### Verification Steps

```powershell
# Verify OUs
Get-ADOrganizationalUnit -Filter * | Select-Object Name, DistinguishedName

# Verify users
Get-ADUser -Filter * | Select-Object Name, SamAccountName, Enabled

# Verify groups
Get-ADGroup -Filter * | Select-Object Name, SamAccountName

# Verify group members
Get-ADGroupMember -Identity "IT_Admins"

# Check replication
Get-ADReplicationPartnerMetadata -Target DC1 -Scope Forest
```

### Troubleshooting

**Issue: Replication failed**
```powershell
# Force replication
Sync-ADObject -Identity (Get-ADDomainController DC1).NTDSSettingsObjectGuid -Source DC2

# Check replication status
Get-ADReplicationFailure -Scope Forest

# Check DNS resolution
nslookup DC1.domain.com
nslookup DC2.domain.com
```

**Issue: User cannot log in**
```powershell
# Check user properties
Get-ADUser -Identity "jadmin" -Properties *

# Reset password
Set-ADAccountPassword -Identity "jadmin" -NewPassword (ConvertTo-SecureString "NewP@ss123!" -AsPlainText -Force)

# Unlock account
Unlock-ADAccount -Identity "jadmin"
```

---

## Lab 2: DNS Server Configuration (3 hours)

### Objectives
- Install DNS Server role
- Create DNS zones
- Configure DNS records
- Implement DNS forwarding

### Prerequisites
- Active Directory installed
- Static IP configured

### Procedure 1: Install DNS Server (20 minutes)

```powershell
# Install DNS Server
Install-WindowsFeature -Name DNS -IncludeManagementTools

# Verify installation
Get-WindowsFeature -Name DNS

# Start DNS service
Start-Service DNS
```

### Procedure 2: Create DNS Zones (30 minutes)

```powershell
# Create primary zone (integrated with AD)
Add-DnsServerPrimaryZone -Name "domain.com" `
  -ReplicationScope "Forest" `
  -PassThru

# Create reverse lookup zone
Add-DnsServerPrimaryZone -NetworkID "192.168.1.0/24" `
  -ReplicationScope "Forest" `
  -PassThru

# Verify zones
Get-DnsServerZone
```

### Procedure 3: Create DNS Records (30 minutes)

```powershell
# Create A record
Add-DnsServerResourceRecordA -ZoneName "domain.com" `
  -Name "www" `
  -IPv4Address "192.168.1.100" `
  -PassThru

# Create MX record
Add-DnsServerResourceRecordMX -ZoneName "domain.com" `
  -Name "@" `
  -MailExchange "mail.domain.com" `
  -Preference 10 `
  -PassThru

# Create CNAME record
Add-DnsServerResourceRecordCName -ZoneName "domain.com" `
  -Name "mail" `
  -HostNameAlias "server1.domain.com" `
  -PassThru

# Verify records
Get-DnsServerResourceRecord -ZoneName "domain.com"
```

### Procedure 4: Configure DNS Forwarding (20 minutes)

```powershell
# Add DNS forwarder
Add-DnsServerForwarder -IPAddress "8.8.8.8" `
  -PassThru

# Configure conditional forwarder
Add-DnsServerConditionalForwarderZone -Name "subsidiary.com" `
  -MasterServers "192.168.2.10" `
  -PassThru

# Verify forwarders
Get-DnsServerForwarder
```

### Verification Steps

```powershell
# Test DNS resolution
nslookup www.domain.com
nslookup domain.com

# Check DNS records
Get-DnsServerResourceRecord -ZoneName "domain.com"

# Test DNS forwarding
nslookup google.com
```

---

## Lab 3: DHCP Server Configuration (2.5 hours)

### Objectives
- Install DHCP Server role
- Create DHCP scopes
- Configure DHCP options
- Authorize DHCP server

### Procedure 1: Install DHCP Server (15 minutes)

```powershell
# Install DHCP Server
Install-WindowsFeature -Name DHCP -IncludeManagementTools

# Verify installation
Get-WindowsFeature -Name DHCP

# Start DHCP service
Start-Service DHCPServer
```

### Procedure 2: Create DHCP Scope (30 minutes)

```powershell
# Create DHCP scope
Add-DhcpServerv4Scope -Name "Main Network" `
  -StartRange "192.168.1.100" `
  -EndRange "192.168.1.200" `
  -SubnetMask "255.255.255.0" `
  -PassThru

# Set scope options
Set-DhcpServerv4OptionValue -ScopeID "192.168.1.0" `
  -Router "192.168.1.1" `
  -DnsServer "192.168.1.10" `
  -DnsDomain "domain.com" `
  -PassThru

# Configure lease duration
Set-DhcpServerv4Scope -ScopeID "192.168.1.0" `
  -LeaseDuration (New-TimeSpan -Days 8) `
  -PassThru

# Verify scope
Get-DhcpServerv4Scope
```

### Procedure 3: Authorize DHCP Server (15 minutes)

```powershell
# Authorize DHCP in AD
Add-DhcpServerInDC -DnsName "dc1.domain.com" `
  -IPAddress "192.168.1.10" `
  -PassThru

# Verify authorization
Get-DhcpServerInDC
```

### Verification Steps

```powershell
# Check DHCP scopes
Get-DhcpServerv4Scope

# Check DHCP leases
Get-DhcpServerv4Lease -ScopeID "192.168.1.0"

# Check DHCP statistics
Get-DhcpServerv4Statistics
```

---

## Lab 4: File Server and NTFS Permissions (3 hours)

### Objectives
- Create file shares
- Configure NTFS permissions
- Implement share permissions
- Test access

### Procedure 1: Create File Share (30 minutes)

```powershell
# Create folder
New-Item -Path "C:\Shares\Finance" -ItemType Directory

# Create SMB share
New-SmbShare -Name "Finance" `
  -Path "C:\Shares\Finance" `
  -FullAccess "DOMAIN\Finance_Team" `
  -ChangeAccess "DOMAIN\Finance_Admins" `
  -ReadAccess "DOMAIN\Domain Users" `
  -PassThru

# Verify share
Get-SmbShare
```

### Procedure 2: Configure NTFS Permissions (45 minutes)

```powershell
# Get current permissions
Get-Acl "C:\Shares\Finance"

# Add NTFS permission
$acl = Get-Acl "C:\Shares\Finance"
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
  "DOMAIN\Finance_Team",
  "Modify",
  "ContainerInherit,ObjectInherit",
  "None",
  "Allow"
)
$acl.AddAccessRule($rule)
Set-Acl -Path "C:\Shares\Finance" -AclObject $acl

# Verify permissions
Get-Acl "C:\Shares\Finance" | Format-List
```

### Procedure 3: Test Access (30 minutes)

```powershell
# Test share access
Test-Path "\\dc1\Finance"

# Test file creation
New-Item -Path "\\dc1\Finance\test.txt" -ItemType File

# Test permissions
Get-Acl "\\dc1\Finance" | Select-Object -ExpandProperty Access
```

---

## Lab 5: Group Policy Objects (GPO) (3 hours)

### Objectives
- Create Group Policy Objects
- Configure GPO settings
- Link GPO to OUs
- Test GPO application

### Procedure 1: Create GPO (30 minutes)

```powershell
# Create GPO
New-GPO -Name "Password Policy" `
  -Comment "Enforce strong passwords" `
  -PassThru

# Create another GPO
New-GPO -Name "Security Baseline" `
  -Comment "Apply security baseline" `
  -PassThru

# Verify GPOs
Get-GPO -All
```

### Procedure 2: Configure GPO Settings (45 minutes)

```powershell
# Set password policy in GPO
Set-GPRegistryValue -Name "Password Policy" `
  -Key "HKLM\System\CurrentControlSet\Services\Netlogon\Parameters" `
  -ValueName "MaximumPasswordAge" `
  -Type DWord `
  -Value 90

# Set firewall rule in GPO
Set-GPRegistryValue -Name "Security Baseline" `
  -Key "HKLM\Software\Policies\Microsoft\WindowsFirewall\DomainProfile" `
  -ValueName "EnableFirewall" `
  -Type DWord `
  -Value 1
```

### Procedure 3: Link GPO to OU (30 minutes)

```powershell
# Link GPO to OU
New-GPLink -Name "Password Policy" `
  -Target "OU=Users,DC=domain,DC=com" `
  -LinkEnabled Yes `
  -PassThru

# Link GPO to another OU
New-GPLink -Name "Security Baseline" `
  -Target "OU=Servers,DC=domain,DC=com" `
  -LinkEnabled Yes `
  -PassThru

# Verify links
Get-GPLink -Target "OU=Users,DC=domain,DC=com"
```

### Procedure 4: Test GPO Application (30 minutes)

```powershell
# Force GPO update on client
Invoke-GPUpdate -Computer "CLIENT1" -Force

# Check GPO status
Get-GPResultantSetOfPolicy -Computer "CLIENT1" -ReportType Html -Path "C:\gpo_report.html"

# Verify GPO applied
gpresult /h C:\gpo_report.html
```

---

## Lab 6: Backup and Disaster Recovery (4 hours)

### Objectives
- Configure Windows Server Backup
- Create backup schedule
- Perform system state backup
- Test bare-metal recovery

### Procedure 1: Install and Configure Backup (30 minutes)

```powershell
# Install Windows Server Backup
Install-WindowsFeature -Name Windows-Server-Backup -IncludeManagementTools

# Create backup policy
$policy = New-WBPolicy

# Add system state to backup
Add-WBSystemState -Policy $policy

# Set backup target
$target = New-WBBackupTarget -VolumePath "E:\" -Editable
Add-WBBackupTarget -Policy $policy -Target $target

# Set schedule (daily at 2 AM)
Set-WBSchedule -Policy $policy -Schedule "02:00"

# Save policy
Set-WBPolicy -Policy $policy -Force
```

### Procedure 2: Perform Manual Backup (30 minutes)

```powershell
# Start backup
Start-WBBackup -Policy (Get-WBPolicy)

# Monitor backup
Get-WBJob

# View backup history
Get-WBBackupSet
```

### Procedure 3: Test Bare-Metal Recovery (2 hours)

**Steps:**
1. Boot from Windows Server 2022 installation media
2. Select "Repair your computer"
3. Select "Troubleshoot" → "System Image Recovery"
4. Select backup image
5. Confirm recovery
6. Server restarts and recovers

### Verification Steps

```powershell
# Verify backup policy
Get-WBPolicy

# Check backup history
Get-WBBackupSet | Select-Object BackupTime, BackupTarget

# Verify system state backup
Get-WBBackupSet | Where-Object {$_.BackupType -eq "SystemState"}
```

---

## Lab 7: Monitoring and Performance Tuning (2.5 hours)

### Objectives
- Create Performance Monitor charts
- Configure Data Collector Sets
- Monitor key metrics
- Identify bottlenecks

### Procedure 1: Create Performance Monitor Chart (45 minutes)

```powershell
# Get CPU usage
Get-Counter -Counter "\Processor(_Total)\% Processor Time"

# Get memory usage
Get-Counter -Counter "\Memory\% Committed Bytes In Use"

# Get disk usage
Get-Counter -Counter "\PhysicalDisk(_Total)\% Disk Time"

# Create custom counter set
$counters = @(
  "\Processor(_Total)\% Processor Time",
  "\Memory\% Committed Bytes In Use",
  "\PhysicalDisk(_Total)\% Disk Time",
  "\Network Interface(*)\Bytes Total/sec"
)

Get-Counter -Counter $counters -SampleInterval 5 -MaxSamples 10
```

### Procedure 2: Create Data Collector Set (45 minutes)

```powershell
# Create data collector set
logman create counter "System Performance" `
  -o "C:\PerfLogs\Admin\System Performance" `
  -f bincirc `
  -v mmddhhmm `
  -max 500 `
  -cnf 1:0

# Add counters
logman update counter "System Performance" `
  -c "\Processor(_Total)\% Processor Time" `
  "\Memory\% Committed Bytes In Use" `
  "\PhysicalDisk(_Total)\% Disk Time"

# Start data collector
logman start "System Performance"

# Stop data collector
logman stop "System Performance"
```

### Verification Steps

```powershell
# View data collector sets
logman query

# View performance data
Get-Counter -Counter "\Processor(_Total)\% Processor Time"

# Check for bottlenecks
Get-Counter -Counter "\Memory\Pages/sec"
```

---

## Lab 8: Security Hardening (3 hours)

### Objectives
- Configure Windows Firewall
- Enable audit policies
- Apply security baseline
- Configure password policies

### Procedure 1: Configure Firewall Rules (45 minutes)

```powershell
# Create inbound rule for RDP
New-NetFirewallRule -DisplayName "Allow RDP" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 3389 `
  -Action Allow `
  -Profile Domain

# Create outbound rule for HTTPS
New-NetFirewallRule -DisplayName "Allow HTTPS Out" `
  -Direction Outbound `
  -Protocol TCP `
  -RemotePort 443 `
  -Action Allow

# List firewall rules
Get-NetFirewallRule -Enabled True | Select-Object DisplayName, Direction
```

### Procedure 2: Enable Audit Policies (45 minutes)

```powershell
# Enable logon auditing
auditpol /set /subcategory:"Logon" /success:enable /failure:enable

# Enable account management auditing
auditpol /set /subcategory:"User Account Management" /success:enable /failure:enable

# View audit policies
auditpol /get /category:*

# View security events
Get-EventLog -LogName Security -Newest 50
```

### Procedure 3: Configure Password Policies (30 minutes)

```powershell
# Set password policy
Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 12 `
  -ComplexityEnabled $true `
  -MaxPasswordAge (New-TimeSpan -Days 90) `
  -MinPasswordAge (New-TimeSpan -Days 1) `
  -PasswordHistoryCount 24

# Verify policy
Get-ADDefaultDomainPasswordPolicy
```

---

## Lab 9: Failover Clustering (4 hours)

### Objectives
- Install Failover Clustering
- Create cluster
- Configure cluster resources
- Test failover

### Prerequisites
- 2+ servers with shared storage
- Network configured
- Active Directory installed

### Procedure 1: Install Failover Clustering (30 minutes)

```powershell
# Install on all nodes
Install-WindowsFeature -Name Failover-Clustering -IncludeManagementTools

# Verify installation
Get-WindowsFeature -Name Failover-Clustering
```

### Procedure 2: Create Cluster (60 minutes)

```powershell
# Validate cluster
Test-Cluster -Node SERVER1, SERVER2

# Create cluster
New-Cluster -Name CLUSTER1 `
  -Node SERVER1, SERVER2 `
  -StaticAddress 192.168.1.100

# Configure quorum
Set-ClusterQuorum -Cluster CLUSTER1 -NodeAndDiskMajority

# Verify cluster
Get-Cluster
```

### Procedure 3: Add Cluster Resource (60 minutes)

```powershell
# Add file server role
Add-ClusterFileServerRole -Name FileServer `
  -Storage "Cluster Disk 1"

# Verify resource
Get-ClusterResource
```

### Procedure 4: Test Failover (30 minutes)

```powershell
# Move resource to another node
Move-ClusterGroup -Name "FileServer" -Node SERVER2

# Verify failover
Get-ClusterGroup
```

---

## Lab 10: Capstone Lab - Acme Corporation (8 hours)

### Scenario
Design and implement complete infrastructure for Acme Corporation:
- 3 departments (Sales, IT, HR)
- 2 locations (HQ + Branch)
- 50 users
- 4 servers (2 DC, 1 FS, 1 PS)

### Tasks

**Phase 1: Infrastructure Setup (2 hours)**
- [ ] Install 2 Domain Controllers
- [ ] Configure DNS and DHCP
- [ ] Create forest and domain
- [ ] Configure replication

**Phase 2: User Management (1.5 hours)**
- [ ] Create OUs for departments
- [ ] Create 50 user accounts
- [ ] Create security groups
- [ ] Configure group memberships

**Phase 3: File Server Setup (1.5 hours)**
- [ ] Create file shares
- [ ] Configure NTFS permissions
- [ ] Implement DFS namespace
- [ ] Configure quotas

**Phase 4: Group Policy (1 hour)**
- [ ] Create password policy GPO
- [ ] Create security baseline GPO
- [ ] Link GPOs to OUs
- [ ] Test GPO application

**Phase 5: Backup and Recovery (1 hour)**
- [ ] Configure Windows Server Backup
- [ ] Create backup schedule
- [ ] Test backup and recovery

**Phase 6: Monitoring (0.5 hours)**
- [ ] Create Performance Monitor charts
- [ ] Configure Data Collector Sets
- [ ] Monitor system health

---

## Summary

**Phase 7 Deliverables:**
- ✅ 10 Detailed Hands-On Labs
- ✅ 30+ hours of practical training
- ✅ Step-by-step procedures
- ✅ Verification steps
- ✅ Troubleshooting guides
- ✅ 1 Capstone Lab (8 hours)

**Total Lab Hours:** 30+ hours

---

## Next Phase: Phase 8 - Interactive Quizzes (60+ Questions)
