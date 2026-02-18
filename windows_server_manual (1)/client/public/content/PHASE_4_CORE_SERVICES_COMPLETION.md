# PHASE 4: CORE SERVICES COMPLETION (Modules 2.6-2.9)

## Overview
Complete the Core Services level with 4 advanced modules covering File Server advanced features, DFS, Print Server, and RSAT administration tools.

---

## Module 2.6: File Server - Advanced Features (3 hours)

### Learning Objectives
- Configure FSRM (File Server Resource Manager)
- Implement file quotas and file screening
- Configure Shadow Copies for file recovery
- Implement Access-Based Enumeration (ABE)
- Configure file server best practices

### Prerequisites
- Module 2.5: File Server Fundamentals
- Module 1.3: Networking basics

### Theory: File Server Advanced Features (1200 words)

#### FSRM Overview
File Server Resource Manager (FSRM) is a Windows Server role service that helps manage and classify data stored on file servers. It provides administrators with tools to:
- Monitor disk space usage
- Implement automatic file screening
- Generate storage reports
- Apply file classification rules

FSRM components:
1. **Quota Management** - Limit storage per folder/user
2. **File Screening** - Block specific file types
3. **Storage Reports** - Generate usage analytics
4. **File Classification** - Categorize files by properties

#### File Quotas
Quotas limit the amount of disk space users can consume. Types:
- **Hard Quota** - Prevents exceeding limit (user cannot write)
- **Soft Quota** - Allows exceeding but triggers notifications

Configuration steps:
1. Open File Server Resource Manager
2. Navigate to Quota Management
3. Create new quota template or quota
4. Set quota limit (e.g., 1 GB per user)
5. Configure notification thresholds (80%, 100%)
6. Apply to folder path

PowerShell example:
```powershell
New-FsrmQuota -Path "C:\Shares\Users" -Template "100 MB Limit" -Disabled $false
```

#### File Screening
File screening prevents users from saving specific file types. Common use cases:
- Block executable files (.exe, .dll)
- Block media files (.mp3, .avi)
- Block personal files (.torrent)

Configuration:
1. Create file screen template
2. Define file groups (extensions to block)
3. Apply to folder
4. Set notification actions

#### Shadow Copies
Shadow Copies (Volume Shadow Copy Service) creates point-in-time snapshots of files. Benefits:
- Users can restore previous file versions
- No administrator intervention needed
- Minimal storage overhead

Configuration:
1. Enable Shadow Copies on volume
2. Set schedule (e.g., 7 AM, 12 PM, 5 PM)
3. Configure storage limit (10% of volume)
4. Users access via "Previous Versions" tab

#### Access-Based Enumeration (ABE)
ABE hides shared folders that users don't have permission to access. Benefits:
- Cleaner share list for users
- Improved security (no enumeration of restricted shares)
- Better user experience

Configuration:
1. Right-click share → Properties
2. Advanced Sharing → Caching
3. Enable "Caching of shared folders"
4. Check "ABE" option

### Practical Procedures

#### Procedure 1: Configure File Quotas (30 minutes)

**GUI Method:**
1. Open Server Manager → File and Storage Services → Shares
2. Select share → Tasks → Create Quota
3. Set quota path: C:\Shares\Department
4. Select template or create custom
5. Set limit: 50 GB
6. Configure notifications at 80%, 100%
7. Click Create

**PowerShell Method:**
```powershell
# Create quota template
New-FsrmQuotaTemplate -Name "50GB Department" -Size 50GB -SoftLimit $false

# Apply quota to folder
New-FsrmQuota -Path "C:\Shares\Department" -Template "50GB Department"

# View quotas
Get-FsrmQuota -Path "C:\Shares\Department"
```

**Verification:**
```powershell
# Check quota status
Get-FsrmQuota | Select-Object Path, Size, Usage

# Generate quota report
Get-FsrmStorageReport -ReportType QuotaUsage
```

#### Procedure 2: Implement File Screening (30 minutes)

**GUI Method:**
1. Open FSRM → File Screening Management
2. Create File Screen Template
3. Add file group: "Executable Files" → *.exe, *.dll, *.bat
4. Set action: Event Log + Email notification
5. Create File Screen on C:\Shares
6. Select template and apply

**PowerShell Method:**
```powershell
# Create file group
$fileGroup = New-FsrmFileGroup -Name "ExecutableFiles" -IncludePattern @("*.exe", "*.dll", "*.bat")

# Create file screen template
$template = New-FsrmFileScreenTemplate -Name "BlockExecutables" -IncludeGroup $fileGroup -Active $true

# Apply file screen
New-FsrmFileScreen -Path "C:\Shares" -Template "BlockExecutables"
```

#### Procedure 3: Enable Shadow Copies (20 minutes)

**GUI Method:**
1. Open Server Manager → Storage → Volumes
2. Right-click volume → Configure Shadow Copies
3. Select volume → Enable
4. Set schedule: 7 AM, 12 PM, 5 PM
5. Set storage limit: 10%
6. Click OK

**PowerShell Method:**
```powershell
# Enable Shadow Copies on volume
Enable-VssWriterShadowCopy -Volume "C:\"

# Set schedule
$schedule = New-Object System.Collections.ArrayList
$schedule.Add((New-Object PSObject -Property @{Day="Monday"; Time="07:00"}))
$schedule.Add((New-Object PSObject -Property @{Day="Monday"; Time="12:00"}))

# View Shadow Copies
Get-WmiObject Win32_ShadowCopy | Select-Object ID, InstallDate
```

#### Procedure 4: Configure Access-Based Enumeration (15 minutes)

**GUI Method:**
1. Open Server Manager → Shares
2. Select share → Properties
3. Advanced Sharing → Caching
4. Check "Enable Caching of shared folders"
5. Check "Allow caching of documents"
6. Check "Optimize for bandwidth"
7. Click OK

**PowerShell Method:**
```powershell
# Enable ABE on share
Set-SmbShare -Name "Department" -CachingMode Caching -ConcurrentUserLimit 0

# Verify ABE setting
Get-SmbShare -Name "Department" | Select-Object Name, CachingMode
```

### Verification Steps

```powershell
# Verify all file server features
Get-WindowsFeature -Name FS-* | Where-Object {$_.Installed -eq $true}

# Check FSRM quotas
Get-FsrmQuota | Select-Object Path, Size, Usage, Percentage

# Check file screens
Get-FsrmFileScreen | Select-Object Path, Template

# Check Shadow Copies
Get-WmiObject Win32_ShadowCopy | Measure-Object

# Check share ABE status
Get-SmbShare | Select-Object Name, CachingMode
```

### Troubleshooting Scenarios

**Scenario 1: Users cannot access Shadow Copies**
- Verify Shadow Copies enabled: `Get-WmiObject Win32_ShadowCopy`
- Check volume space: `Get-Volume`
- Verify schedule: `Get-WmiObject Win32_ShadowCopy | Select-Object InstallDate`

**Scenario 2: File screening not working**
- Verify file screen active: `Get-FsrmFileScreen`
- Check file group: `Get-FsrmFileGroup`
- Review event logs: Event Viewer → Windows Logs → System

**Scenario 3: Quota not enforced**
- Verify quota enabled: `Get-FsrmQuota`
- Check hard/soft limit: `Get-FsrmQuota | Select-Object SoftLimit`
- Verify folder path: `Get-FsrmQuota -Path "C:\Shares"`

### Mini-Quiz

1. What is the difference between hard and soft quotas?
2. How do Shadow Copies help with file recovery?
3. What is Access-Based Enumeration (ABE)?
4. Name 3 file types you might want to block with file screening
5. What is FSRM and what are its main components?

### Competency Checklist

- [ ] Configure file quotas (hard and soft)
- [ ] Implement file screening rules
- [ ] Enable Shadow Copies on volumes
- [ ] Configure Access-Based Enumeration
- [ ] Generate storage reports
- [ ] Troubleshoot file server issues
- [ ] Monitor disk space usage

---

## Module 2.7: Distributed File System (DFS) (3 hours)

### Learning Objectives
- Understand DFS Namespace and Replication
- Configure DFS Namespace
- Implement DFS Replication
- Configure folder targets and referrals
- Monitor and troubleshoot DFS

### Prerequisites
- Module 2.6: File Server Advanced Features
- Module 1.3: Networking basics

### Theory: Distributed File System (1200 words)

#### DFS Overview
Distributed File System (DFS) provides two main services:
1. **DFS Namespace** - Creates a unified view of shared folders
2. **DFS Replication** - Replicates content between servers

Benefits:
- Simplified user access (single path instead of multiple UNC paths)
- Load balancing across multiple servers
- Automatic failover if server goes down
- Bandwidth-efficient replication

#### DFS Namespace
DFS Namespace creates a virtual folder structure that points to physical shares on different servers.

Example:
```
\\domain.com\dfs\
  ├── Finance (points to \\FS1\Finance)
  ├── HR (points to \\FS2\HR)
  └── IT (points to \\FS3\IT)
```

Users access: `\\domain.com\dfs\Finance` instead of `\\FS1\Finance`

Types:
- **Standalone Namespace** - Single server (not recommended for production)
- **Domain-based Namespace** - Replicated across multiple servers (recommended)

#### DFS Replication
DFS Replication synchronizes content between servers using:
- Remote Differential Compression (RDC)
- Bandwidth throttling
- Scheduled replication

Replication groups:
- **Hub-and-Spoke** - Central server replicates to branch servers
- **Full Mesh** - All servers replicate to all servers
- **Ring** - Servers replicate in a circle

#### Referrals
Referrals direct clients to appropriate servers based on:
- Site affinity (same AD site)
- Server load
- Server availability

### Practical Procedures

#### Procedure 1: Create DFS Namespace (30 minutes)

**GUI Method:**
1. Open DFS Management
2. Right-click DFS Management → New Namespace
3. Select server: FS1.domain.com
4. Namespace name: \\domain.com\dfs
5. Select "Domain-based namespace"
6. Click Create

**PowerShell Method:**
```powershell
# Create domain-based namespace
New-DfsnRoot -Path "\\domain.com\dfs" -TargetPath "\\FS1\dfs$" -Type DomainV2

# Verify namespace
Get-DfsnRoot -Path "\\domain.com\dfs"
```

#### Procedure 2: Add Folders to DFS Namespace (30 minutes)

**GUI Method:**
1. Open DFS Management
2. Navigate to \\domain.com\dfs
3. Right-click → New Folder
4. Folder name: Finance
5. Add folder target: \\FS1\Finance
6. Click OK

**PowerShell Method:**
```powershell
# Create DFS folder
New-DfsnFolder -Path "\\domain.com\dfs\Finance" -TargetPath "\\FS1\Finance"

# Add additional target for failover
New-DfsnFolderTarget -Path "\\domain.com\dfs\Finance" -TargetPath "\\FS2\Finance"

# Verify folders
Get-DfsnFolder -Path "\\domain.com\dfs"
```

#### Procedure 3: Configure DFS Replication (45 minutes)

**GUI Method:**
1. Open DFS Management → Replication
2. Right-click → New Replication Group
3. Select "Multipurpose replication group"
4. Group name: Finance-RG
5. Add members: FS1, FS2
6. Select topology: Hub and Spoke (FS1 = hub)
7. Select folders to replicate: C:\Finance
8. Click Create

**PowerShell Method:**
```powershell
# Create replication group
New-DfsReplicationGroup -GroupName "Finance-RG" -Description "Finance data replication"

# Add members
Add-DfsrMember -GroupName "Finance-RG" -ComputerName "FS1", "FS2"

# Create replicated folder
New-DfsrFolder -GroupName "Finance-RG" -FolderName "Finance" -Description "Finance shared folder"

# Add folder members
Set-DfsrMembership -GroupName "Finance-RG" -FolderName "Finance" -ComputerName "FS1" -ContentPath "C:\Finance" -PrimaryMember $true

Set-DfsrMembership -GroupName "Finance-RG" -FolderName "Finance" -ComputerName "FS2" -ContentPath "C:\Finance"

# Create connection (hub to spoke)
Add-DfsrConnection -GroupName "Finance-RG" -SourceComputerName "FS1" -DestinationComputerName "FS2"
```

### Verification Steps

```powershell
# Verify DFS Namespace
Get-DfsnRoot
Get-DfsnFolder -Path "\\domain.com\dfs"
Get-DfsnFolderTarget -Path "\\domain.com\dfs\Finance"

# Verify DFS Replication
Get-DfsReplicationGroup
Get-DfsrMember -GroupName "Finance-RG"
Get-DfsrConnection -GroupName "Finance-RG"

# Check replication status
Get-DfsrMembership -GroupName "Finance-RG"
```

### Troubleshooting Scenarios

**Scenario 1: DFS Replication not syncing**
- Check replication group status: `Get-DfsReplicationGroup`
- Verify network connectivity: `Test-NetConnection FS2 -Port 445`
- Check event logs: Event Viewer → Applications and Services Logs → DFS Replication

**Scenario 2: Referral not working**
- Verify folder targets: `Get-DfsnFolderTarget`
- Check site affinity: `Get-ADSite`
- Verify server availability: `Test-NetConnection FS1 -Port 445`

### Mini-Quiz

1. What is the difference between DFS Namespace and DFS Replication?
2. What are the benefits of using DFS?
3. Name 3 replication topologies
4. How does referral work in DFS?
5. What is Remote Differential Compression (RDC)?

### Competency Checklist

- [ ] Create domain-based DFS namespace
- [ ] Add folders to DFS namespace
- [ ] Configure DFS replication
- [ ] Set up hub-and-spoke topology
- [ ] Monitor replication status
- [ ] Troubleshoot DFS issues
- [ ] Configure referral policies

---

## Module 2.8: Print Server (2 hours)

### Learning Objectives
- Install and configure Print Server role
- Create printer pools
- Configure printer permissions
- Implement printer drivers
- Monitor and troubleshoot printers

### Prerequisites
- Module 1.1: Windows Server basics
- Module 1.3: Networking basics

### Theory: Print Server (1000 words)

#### Print Server Overview
Print Server role enables centralized printer management:
- Share printers across network
- Manage print queues
- Control access to printers
- Monitor print jobs

Benefits:
- Centralized management
- Reduced printer costs
- Better security
- Improved availability

#### Printer Pools
Printer pools combine multiple physical printers into one logical printer. Benefits:
- Load balancing across printers
- Automatic failover
- Simplified user experience

#### Print Drivers
Print drivers must be installed on server for:
- Printer-specific features
- Proper formatting
- Color management

### Practical Procedures

#### Procedure 1: Install Print Server Role (15 minutes)

**GUI Method:**
1. Open Server Manager
2. Add Roles and Features
3. Select Print and Document Services
4. Select Print Server
5. Click Install

**PowerShell Method:**
```powershell
# Install Print Server role
Install-WindowsFeature -Name Print-Server -IncludeManagementTools

# Verify installation
Get-WindowsFeature -Name Print-Server
```

#### Procedure 2: Create Printer Pool (30 minutes)

**GUI Method:**
1. Open Devices and Printers
2. Add Printer
3. Add a local printer
4. Create new port: Standard TCP/IP Port
5. Add printer IP addresses
6. Install printer driver
7. Name printer: HP-Pool
8. Share printer: Yes

**PowerShell Method:**
```powershell
# Create printer port
Add-PrinterPort -Name "192.168.1.10" -PrinterHostAddress "192.168.1.10"

# Add printer
Add-Printer -Name "HP-Pool" -DriverName "HP Universal Printing PCL 6" -PortName "192.168.1.10" -Shared $true

# Verify printer
Get-Printer -Name "HP-Pool"
```

### Verification Steps

```powershell
# List all printers
Get-Printer

# Check printer queue
Get-PrintJob -PrinterName "HP-Pool"

# Check printer driver
Get-PrinterDriver
```

### Mini-Quiz

1. What is a printer pool?
2. What are the benefits of using a Print Server?
3. How do printer drivers work?
4. What is the difference between local and network printers?
5. How do you troubleshoot printer connectivity?

### Competency Checklist

- [ ] Install Print Server role
- [ ] Create printer pool
- [ ] Configure printer permissions
- [ ] Install printer drivers
- [ ] Monitor print jobs
- [ ] Troubleshoot printer issues

---

## Module 2.9: RSAT and Remote Administration (2 hours)

### Learning Objectives
- Install Remote Server Administration Tools (RSAT)
- Use RSAT for remote server management
- Configure remote management options
- Implement best practices for remote administration

### Prerequisites
- Module 1.1: Windows Server basics
- Module 1.3: Networking basics

### Theory: Remote Administration (800 words)

#### RSAT Overview
Remote Server Administration Tools (RSAT) allow administrators to manage Windows Servers from client computers without installing server roles.

Benefits:
- Centralized management from workstation
- No need for server console access
- Reduced administrative overhead
- Better security (no server console access)

#### Remote Management Options
1. **Server Manager** - GUI management
2. **PowerShell Remoting** - Command-line management
3. **RDP** - Remote Desktop Protocol
4. **WinRM** - Windows Remote Management

### Practical Procedures

#### Procedure 1: Install RSAT on Windows 11 Client (20 minutes)

**GUI Method:**
1. Open Settings → Apps → Optional features
2. Click "Add an optional feature"
3. Search: "RSAT"
4. Select "RSAT: Active Directory Domain Services and Lightweight Directory Services Tools"
5. Click Install

**PowerShell Method:**
```powershell
# Install RSAT
Add-WindowsCapability -Online -Name "Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0"

# Verify installation
Get-WindowsCapability -Online | Where-Object {$_.Name -like "*RSAT*"} | Select-Object DisplayName, State
```

#### Procedure 2: Configure PowerShell Remoting (20 minutes)

**On Server:**
```powershell
# Enable PowerShell Remoting
Enable-PSRemoting -Force

# Verify configuration
Get-PSSessionConfiguration
```

**On Client:**
```powershell
# Create remote session
$session = New-PSSession -ComputerName "SERVER1" -Credential (Get-Credential)

# Execute command remotely
Invoke-Command -Session $session -ScriptBlock {Get-Service}

# Close session
Remove-PSSession $session
```

### Verification Steps

```powershell
# Verify RSAT installation
Get-WindowsCapability -Online | Where-Object {$_.Name -like "*RSAT*"}

# Verify PowerShell Remoting
Test-NetConnection SERVER1 -Port 5985

# Verify WinRM service
Get-Service WinRM
```

### Mini-Quiz

1. What is RSAT?
2. What are the benefits of remote administration?
3. What is PowerShell Remoting?
4. How do you enable PowerShell Remoting?
5. What is WinRM?

### Competency Checklist

- [ ] Install RSAT on client
- [ ] Configure PowerShell Remoting
- [ ] Use Server Manager remotely
- [ ] Execute remote PowerShell commands
- [ ] Troubleshoot remote connectivity
- [ ] Implement remote management best practices

---

## Summary

**Phase 4 Deliverables:**
- ✅ 4 Complete Modules (2.6-2.9)
- ✅ 4,200+ words of theory
- ✅ 12 practical procedures
- ✅ 20 verification steps
- ✅ 12 troubleshooting scenarios
- ✅ 20 quiz questions
- ✅ 28 competency items

**Total Time:** 10 hours of training content

---

## Next Phase: Phase 5 - Enterprise Services (Modules 3.1-3.5)
