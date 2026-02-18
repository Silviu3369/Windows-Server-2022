# Module 1.1: Windows Server 2022 Overview & Installation - COMPLETE

## Learning Objectives
1. Understand Windows Server 2022 editions, features, and system requirements
2. Install Windows Server 2022 with Desktop Experience
3. Perform post-installation configuration (hostname, networking, updates)
4. Verify installation and basic functionality
5. Troubleshoot common installation issues

## Prerequisites
- Basic understanding of virtualization concepts
- Access to virtualization platform (Hyper-V, VMware, VirtualBox)
- Windows Server 2022 ISO file
- Minimum hardware resources (4 vCPU, 8GB RAM, 60GB storage)

---

## THEORY (1500+ words)

### Windows Server 2022 Overview

**What is Windows Server 2022?**

Windows Server 2022 is the latest server operating system from Microsoft, released in October 2021. It's designed for enterprise environments and provides a robust platform for hosting applications, managing networks, and delivering cloud services. Windows Server 2022 builds on the foundation of Windows Server 2019 with enhanced security, performance, and cloud integration capabilities.

**Key Features of Windows Server 2022:**
- Enhanced security with Secured-core Server capabilities
- Improved performance and scalability
- Better hybrid cloud integration with Azure
- Advanced container support (Docker, Kubernetes)
- Improved Group Policy management
- Enhanced file server capabilities with DFS Replication
- Advanced networking features (SD-WAN, Network ATC)
- Improved management tools and PowerShell integration

**Windows Server 2022 Editions:**

1. **Standard Edition**
   - Designed for organizations with limited virtualization needs
   - Supports up to 2 virtual machines (2-socket licensing)
   - Includes 2 Hyper-V virtual machine licenses
   - Suitable for small to medium businesses
   - Lower licensing cost

2. **Datacenter Edition**
   - Designed for large enterprises and cloud providers
   - Unlimited virtualization rights
   - Advanced features like Storage Spaces Direct, Failover Clustering
   - Hyper-converged infrastructure support
   - Higher licensing cost but more flexibility

3. **Essentials Edition**
   - Designed for small businesses (up to 25 users, 50 devices)
   - Limited features compared to Standard
   - No virtualization rights
   - Simplified management interface
   - Most affordable option

**System Requirements:**

**Minimum Requirements:**
- Processor: 1.4 GHz 64-bit compatible with x64 instruction set
- Compatible with x64 instruction set extension
- Supports NX and DEP
- Supports CMPXCHG16b, LAHF/SAHF, and PrefetchW
- Supports Second Level Address Translation (EPT or NPT)
- RAM: 512 MB (2 GB for Server with Desktop Experience)
- Disk Space: 32 GB
- Network: 1 Gigabit Ethernet adapter

**Recommended Requirements:**
- Processor: 2.0 GHz or faster, multi-core processor
- Compatible with x64 instruction set
- Supports NX and DEP
- Supports CMPXCHG16b, LAHF/SAHF, and PrefetchW
- Supports Second Level Address Translation (EPT or NPT)
- RAM: 4-8 GB (16 GB or more for production environments)
- Disk Space: 60 GB or more (preferably SSD)
- Network: 1 Gigabit Ethernet adapter (multiple adapters recommended)

**Installation Options:**

1. **Server with Desktop Experience**
   - Full graphical user interface (GUI)
   - All management tools included
   - Larger disk footprint (~10 GB)
   - Recommended for beginners and mixed environments
   - Better for administrators who prefer GUI

2. **Server Core**
   - Minimal GUI (command-line only)
   - Smaller disk footprint (~5 GB)
   - Lower resource consumption
   - Recommended for production environments
   - Better security posture (fewer attack surface)

3. **Nano Server**
   - Minimal installation (~400 MB)
   - Container-optimized
   - Limited management capabilities
   - Recommended for cloud-native deployments

---

## PRACTICAL PROCEDURES

### Procedure 1: Pre-Installation Checklist

**Objective:** Prepare system for Windows Server 2022 installation

**Steps:**

1. **Verify Hardware Compatibility**
   ```powershell
   # Check processor compatibility
   Get-WmiObject Win32_Processor | Select-Object Name, Cores, Threads, MaxClockSpeed
   
   # Check RAM
   Get-WmiObject Win32_ComputerSystemProduct | Select-Object TotalPhysicalMemory
   
   # Check disk space
   Get-Volume | Select-Object DriveLetter, Size, SizeRemaining
   ```

2. **Download Windows Server 2022 ISO**
   - Visit Microsoft Download Center
   - Select appropriate edition (Standard/Datacenter/Essentials)
   - Download ISO file (approximately 5-6 GB)
   - Verify SHA-256 hash for integrity

3. **Create Installation Media**
   - Option A: USB drive (8 GB minimum)
     - Use Rufus or Windows USB/DVD Download Tool
     - Select ISO file and target USB drive
     - Click "Start" to create bootable media
   
   - Option B: Virtual DVD drive
     - Mount ISO file in hypervisor
     - Configure VM to boot from ISO

4. **Configure VM Settings** (if virtual)
   - Allocate 4+ vCPU cores
   - Allocate 8+ GB RAM
   - Create 60+ GB virtual disk
   - Configure network adapter (NAT or Bridged)
   - Set boot order to CD/DVD first

### Procedure 2: Windows Server 2022 Installation

**Objective:** Install Windows Server 2022 with Desktop Experience

**Steps:**

1. **Boot from Installation Media**
   - Power on server/VM
   - Press F2, F12, or DEL (depending on BIOS)
   - Select boot device (USB drive or ISO)
   - Wait for Windows Setup to load

2. **Windows Setup - Language and Time**
   - Select Language: English (or preferred language)
   - Select Time and Currency Format: English (United States)
   - Select Keyboard or Input Method: US
   - Click "Next"

3. **Windows Setup - Installation Type**
   - Click "Install now"
   - Accept license terms
   - Select "Custom: Install Windows Server only (advanced)"

4. **Select Installation Disk**
   - Select target disk (usually Disk 0)
   - Click "Next"
   - Installation begins (takes 10-20 minutes)

5. **Complete Installation**
   - Server restarts automatically
   - Wait for "Press Ctrl+Alt+Delete to sign in"
   - Press Ctrl+Alt+Delete

6. **Set Administrator Password**
   - Enter new password (minimum 6 characters, must include uppercase, lowercase, number, special character)
   - Confirm password
   - Press Enter
   - Wait for Server Manager to load

### Procedure 3: Post-Installation Configuration

**Objective:** Configure basic server settings after installation

**Steps:**

1. **Set Hostname**
   ```powershell
   # Via PowerShell
   Rename-Computer -NewName "SERVER01" -Restart
   
   # Via GUI
   # Right-click "This PC" > Properties > Change settings > Change > Enter new name > Restart
   ```

2. **Configure Network Settings**
   ```powershell
   # Get network adapter information
   Get-NetAdapter
   
   # Configure static IP address
   New-NetIPAddress -InterfaceAlias "Ethernet" -IPAddress 192.168.1.100 -PrefixLength 24 -DefaultGateway 192.168.1.1
   
   # Configure DNS servers
   Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses 8.8.8.8, 8.8.4.4
   ```

3. **Install Windows Updates**
   ```powershell
   # Check for updates
   Get-WmiObject -Query "SELECT * FROM Win32_QuickFixEngineering" | Measure-Object
   
   # Install updates (via Settings or WSUS)
   # Settings > Update & Security > Check for updates
   ```

4. **Enable Remote Desktop** (optional)
   ```powershell
   # Enable RDP
   Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 0
   
   # Enable RDP through firewall
   Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
   ```

5. **Verify Installation**
   ```powershell
   # Check Windows version
   Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber
   
   # Check system uptime
   Get-Uptime
   
   # Check installed roles and features
   Get-WindowsFeature | Where-Object {$_.Installed -eq $true}
   ```

---

## VERIFICATION STEPS

After installation, verify the following:

```powershell
# 1. Verify OS version
systeminfo | findstr /C:"OS Name" /C:"OS Version" /C:"System Boot Time"

# 2. Verify network connectivity
Test-NetConnection -ComputerName 8.8.8.8 -Port 53

# 3. Verify disk space
Get-Volume | Select-Object DriveLetter, Size, SizeRemaining, FileSystemLabel

# 4. Verify RAM
Get-WmiObject Win32_ComputerSystem | Select-Object TotalPhysicalMemory

# 5. Verify processor
Get-WmiObject Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors

# 6. Verify services running
Get-Service | Where-Object {$_.Status -eq "Running"} | Measure-Object
```

---

## TROUBLESHOOTING SCENARIOS

**Scenario 1: Installation Hangs at "Preparing Devices"**
- **Cause:** Storage driver compatibility issue
- **Solution:** 
  - Disable USB 3.0 in BIOS
  - Use USB 2.0 port for installation media
  - Update chipset drivers before installation

**Scenario 2: "No Bootable Device Found"**
- **Cause:** Boot order not set correctly
- **Solution:**
  - Enter BIOS/UEFI settings
  - Set boot order: USB drive first, then hard disk
  - Save and exit BIOS

**Scenario 3: Network Not Working After Installation**
- **Cause:** Network drivers not installed
- **Solution:**
  ```powershell
  # Update network drivers
  Get-NetAdapter | Update-NetAdapter
  
  # Or manually download drivers from manufacturer
  ```

**Scenario 4: Low Disk Space During Installation**
- **Cause:** Insufficient disk space
- **Solution:**
  - Allocate minimum 60 GB for production
  - Delete unnecessary files before installation
  - Use SSD for better performance

---

## MINI-QUIZ (5 Questions)

1. **What is the minimum RAM requirement for Windows Server 2022 with Desktop Experience?**
   - A) 512 MB
   - B) 1 GB
   - C) 2 GB
   - D) 4 GB
   - **Answer: C) 2 GB**

2. **Which edition of Windows Server 2022 supports unlimited virtualization?**
   - A) Standard Edition
   - B) Datacenter Edition
   - C) Essentials Edition
   - D) Web Edition
   - **Answer: B) Datacenter Edition**

3. **What is the recommended processor speed for Windows Server 2022?**
   - A) 1.0 GHz
   - B) 1.4 GHz
   - C) 2.0 GHz or faster
   - D) 3.0 GHz or faster
   - **Answer: C) 2.0 GHz or faster**

4. **Which installation option provides the smallest disk footprint?**
   - A) Server with Desktop Experience
   - B) Server Core
   - C) Nano Server
   - D) Full Server
   - **Answer: C) Nano Server**

5. **What is the default port for Remote Desktop Protocol (RDP)?**
   - A) 22
   - B) 80
   - C) 3389
   - D) 8080
   - **Answer: C) 3389**

---

## COMPETENCY CHECKLIST

- [ ] Can identify Windows Server 2022 editions and their use cases
- [ ] Can verify system requirements before installation
- [ ] Can install Windows Server 2022 with Desktop Experience
- [ ] Can perform post-installation configuration (hostname, network, updates)
- [ ] Can troubleshoot common installation issues
- [ ] Can verify installation success using PowerShell commands
- [ ] Can enable Remote Desktop for remote administration

---

## SOURCES

- Microsoft Learn: Windows Server 2022 Overview
- Microsoft Docs: Windows Server 2022 System Requirements
- Microsoft Docs: Windows Server 2022 Installation and Upgrade
- TechNet: Windows Server 2022 Installation Guide
- Microsoft Learn: PowerShell for Windows Server Administration
