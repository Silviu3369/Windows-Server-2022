# Windows Server 2022 Manual - Professional Diagrams Collection
## Phase D: Visual Diagrams (10+ Mermaid Diagrams)

---

## Diagram 1: AD Forest/Domain/OU Structure

```mermaid
graph TD
    A["🌳 Forest: company.com"] --> B["🌲 Tree: company.com"]
    A --> C["🌲 Tree: subsidiary.com"]
    
    B --> B1["🔷 Domain: company.com"]
    B --> B2["🔷 Domain: branch.company.com"]
    
    B1 --> B1a["📁 OU: Users"]
    B1 --> B1b["📁 OU: Computers"]
    B1 --> B1c["📁 OU: Servers"]
    
    B1a --> B1a1["👤 Sales Users"]
    B1a --> B1a2["👤 IT Users"]
    
    B1b --> B1b1["💻 Workstations"]
    B1b --> B1b2["💻 Laptops"]
    
    B1c --> B1c1["🖥️ DC01"]
    B1c --> B1c2["🖥️ DC02"]
    B1c --> B1c3["🖥️ FileServer01"]
    
    C --> C1["🔷 Domain: subsidiary.com"]
    C1 --> C1a["📁 OU: Users"]
    C1 --> C1b["📁 OU: Computers"]
    
    style A fill:#e1f5ff
    style B fill:#b3e5fc
    style C fill:#b3e5fc
    style B1 fill:#81d4fa
    style B2 fill:#81d4fa
```

---

## Diagram 2: DNS Query Flow

```mermaid
graph LR
    A["🖥️ Client<br/>192.168.1.50"] -->|"1. nslookup google.com"| B["🔹 DNS Server<br/>192.168.1.10"]
    
    B -->|"2. Query Recursive"| C["🔹 Forwarder<br/>8.8.8.8"]
    
    C -->|"3. Query Iterative"| D["🌐 Root Nameserver"]
    D -->|"4. Referral"| E["🌐 TLD Nameserver<br/>.com"]
    E -->|"5. Referral"| F["🌐 Authoritative NS<br/>google.com"]
    
    F -->|"6. Answer: 142.251.41.14"| C
    C -->|"7. Answer"| B
    B -->|"8. Answer"| A
    
    A -->|"9. google.com = 142.251.41.14"| A
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#ffccbc
    style D fill:#f8bbd0
    style E fill:#f8bbd0
    style F fill:#f8bbd0
```

---

## Diagram 3: DHCP Lease Lifecycle (DORA)

```mermaid
graph TD
    A["🖥️ Client<br/>No IP"] -->|"DISCOVER<br/>(broadcast)"| B["🔹 DHCP Server"]
    
    B -->|"OFFER<br/>192.168.1.50<br/>(unicast)"| A
    
    A -->|"REQUEST<br/>Accept 192.168.1.50<br/>(broadcast)"| B
    
    B -->|"ACK<br/>Lease 8 hours<br/>(unicast)"| A
    
    A -->|"Client uses IP"| C["✅ Configured<br/>192.168.1.50"]
    
    C -->|"After 4 hours<br/>RENEW"| B
    B -->|"ACK<br/>Lease renewed"| C
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#a5d6a7
```

---

## Diagram 4: GPO Processing Order (LSDOU)

```mermaid
graph TD
    A["🖥️ Computer Startup"] --> B["1️⃣ Local Policies<br/>HKEY_LOCAL_MACHINE"]
    
    B --> C["2️⃣ Site GPO<br/>Linked to AD Site"]
    
    C --> D["3️⃣ Domain GPO<br/>Linked to Domain"]
    
    D --> E["4️⃣ OU GPO<br/>Linked to OU"]
    
    E --> F["5️⃣ Child OU GPO<br/>Linked to Child OU"]
    
    F --> G["✅ Effective Policy<br/>Last one wins<br/>unless blocked"]
    
    style A fill:#fff9c4
    style B fill:#ffccbc
    style C fill:#ffccbc
    style D fill:#ffccbc
    style E fill:#ffccbc
    style F fill:#ffccbc
    style G fill:#a5d6a7
```

---

## Diagram 5: Share vs NTFS Permissions Decision Flow

```mermaid
graph TD
    A["Need to Share Folder?"] -->|YES| B["Set SHARE Permissions"]
    A -->|NO| Z["❌ Not Shared"]
    
    B --> C["Who needs access?"]
    
    C -->|"Everyone"| D["Share: Everyone - Read"]
    C -->|"Specific Users"| E["Share: Specific Group - Read"]
    C -->|"Full Control"| F["Share: Group - Full Control"]
    
    D --> G["Set NTFS Permissions"]
    E --> G
    F --> G
    
    G --> H["Effective Permission = MIN<br/>Share vs NTFS"]
    
    H --> I["Example:<br/>Share: Read<br/>NTFS: Full Control<br/>Result: Read"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style G fill:#ffccbc
    style H fill:#a5d6a7
    style I fill:#e1bee7
```

---

## Diagram 6: DFS Namespace + Targets + Replication

```mermaid
graph TD
    A["🌐 DFS Namespace<br/>\\\\company.local\\data"] --> B["📁 Namespace Root<br/>on DC01"]
    
    B --> C["📁 Folder Link: Projects<br/>\\\\company.local\\data\\projects"]
    B --> D["📁 Folder Link: Shared<br/>\\\\company.local\\data\\shared"]
    
    C --> C1["🖥️ Target 1<br/>\\\\FileServer01\\projects"]
    C --> C2["🖥️ Target 2<br/>\\\\FileServer02\\projects"]
    
    D --> D1["🖥️ Target 1<br/>\\\\FileServer01\\shared"]
    D --> D2["🖥️ Target 2<br/>\\\\FileServer02\\shared"]
    
    C1 -.->|"Replication Group"| C2
    D1 -.->|"Replication Group"| D2
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#ffccbc
    style D fill:#ffccbc
    style C1 fill:#a5d6a7
    style C2 fill:#a5d6a7
    style D1 fill:#a5d6a7
    style D2 fill:#a5d6a7
```

---

## Diagram 7: Shadow Copies Restore Flow

```mermaid
graph TD
    A["📅 Monday 9:00 AM<br/>File created"] --> B["📸 Shadow Copy 1"]
    
    C["📅 Monday 6:00 PM<br/>File modified"] --> D["📸 Shadow Copy 2"]
    
    E["📅 Tuesday 9:00 AM<br/>File deleted"] --> F["❌ File missing"]
    
    F -->|"Right-click folder<br/>Restore previous versions"| G["🔄 Choose Shadow Copy"]
    
    G -->|"Select Monday 6:00 PM"| H["✅ File restored"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#fff9c4
    style D fill:#c8e6c9
    style E fill:#ffccbc
    style F fill:#ff8a80
    style H fill:#a5d6a7
```

---

## Diagram 8: RSAT Admin Workflow

```mermaid
graph LR
    A["💻 Windows 11 Client<br/>192.168.1.50"] -->|"Install RSAT"| B["📦 RSAT Tools"]
    
    B --> C["🔧 Active Directory Users and Computers"]
    B --> D["🔧 DNS Manager"]
    B --> E["🔧 DHCP Manager"]
    B --> F["🔧 Group Policy Management"]
    B --> G["🔧 Server Manager"]
    
    C -->|"Connect to"| H["🖥️ DC01<br/>192.168.1.10"]
    D -->|"Connect to"| H
    E -->|"Connect to"| H
    F -->|"Connect to"| H
    G -->|"Connect to"| H
    
    H -->|"Remote Admin"| I["✅ Manage Server<br/>from Client"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style H fill:#ffccbc
    style I fill:#a5d6a7
```

---

## Diagram 9: File Server Recommended Structure

```mermaid
graph TD
    A["FileServer01<br/>\\\\company.local\\data"] --> B["📁 Departments"]
    A --> C["📁 Home Folders"]
    A --> D["📁 Shared"]
    
    B --> B1["📁 Sales"]
    B --> B2["📁 IT"]
    B --> B3["📁 HR"]
    B --> B4["📁 Finance"]
    
    B1 --> B1a["👥 Permissions: Sales Group - RW"]
    B2 --> B2a["👥 Permissions: IT Group - RW"]
    B3 --> B3a["👥 Permissions: HR Group - RW"]
    B4 --> B4a["👥 Permissions: Finance Group - RW"]
    
    C --> C1["👤 jsmith"]
    C --> C2["👤 msmith"]
    C --> C3["👤 jdoe"]
    
    D --> D1["📁 Common Files"]
    D --> D2["📁 Templates"]
    D --> D3["📁 Archive"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#c8e6c9
    style D fill:#c8e6c9
```

---

## Diagram 10: Troubleshooting Decision Tree (AD/DNS/DHCP/GPO)

```mermaid
graph TD
    A["❓ Problem: Client cannot logon"] --> B{"Can ping DC?"}
    
    B -->|NO| C["❌ Network Problem"]
    C --> C1["Check: IP, Gateway, DNS"]
    
    B -->|YES| D{"Can resolve DC name?"}
    
    D -->|NO| E["❌ DNS Problem"]
    E --> E1["Check: DNS Server"]
    E --> E2["Check: DNS Records"]
    
    D -->|YES| F{"Can reach LDAP port 389?"}
    
    F -->|NO| G["❌ Firewall Problem"]
    G --> G1["Check: Firewall Rules"]
    
    F -->|YES| H{"AD User exists?"}
    
    H -->|NO| I["❌ User Problem"]
    I --> I1["Create User in AD"]
    
    H -->|YES| J{"Password correct?"}
    
    J -->|NO| K["❌ Password Problem"]
    K --> K1["Reset Password"]
    
    J -->|YES| L["✅ Logon Successful"]
    
    style A fill:#fff9c4
    style C fill:#ff8a80
    style E fill:#ff8a80
    style G fill:#ff8a80
    style I fill:#ff8a80
    style K fill:#ff8a80
    style L fill:#a5d6a7
```

---

## Diagram 11: Windows Server 2022 Architecture

```mermaid
graph TD
    A["Windows Server 2022 Architecture"] --> B["🔷 Kernel (10.0.20348)"]
    
    B --> C["System Services"]
    C --> C1["Active Directory"]
    C --> C2["DNS"]
    C --> C3["DHCP"]
    C --> C4["File Server"]
    C --> C5["Print Server"]
    
    B --> D["Networking Stack"]
    D --> D1["TCP/IP"]
    D --> D2["IPv6"]
    D --> D3["Firewall"]
    
    B --> E["Storage"]
    E --> E1["NTFS"]
    E --> E2["ReFS"]
    E --> E3["Storage Spaces"]
    
    B --> F["Virtualization"]
    F --> F1["Hyper-V"]
    F --> F2["Containers"]
    
    B --> G["Security"]
    G --> G1["Kerberos"]
    G --> G2["BitLocker"]
    G --> G3["Auditing"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#ffccbc
    style D fill:#ffccbc
    style E fill:#ffccbc
    style F fill:#ffccbc
    style G fill:#ffccbc
```

---

## Diagram 12: Backup Strategy 3-2-1

```mermaid
graph TD
    A["📊 Backup Strategy 3-2-1"] --> B["3️⃣ Three Copies"]
    A --> C["2️⃣ Two Media Types"]
    A --> D["1️⃣ One Offsite"]
    
    B --> B1["Copy 1: Production Data"]
    B --> B2["Copy 2: Backup (Local)"]
    B --> B3["Copy 3: Backup (Offsite)"]
    
    C --> C1["Media 1: Disk/SSD"]
    C --> C2["Media 2: Tape/Cloud"]
    
    D --> D1["Location 1: Server Room"]
    D --> D2["Location 2: Cloud/Remote"]
    
    B1 --> E["🖥️ FileServer01"]
    B2 --> F["💾 Local Backup<br/>NAS/USB"]
    B3 --> G["☁️ Cloud Backup<br/>Azure/AWS"]
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#c8e6c9
    style D fill:#c8e6c9
    style E fill:#ffccbc
    style F fill:#ffccbc
    style G fill:#ffccbc
```

---

## Diagram 13: Active Directory Replication

```mermaid
graph TD
    A["🖥️ DC01<br/>company.local"] -->|"Replication"| B["🖥️ DC02<br/>company.local"]
    
    A -->|"Replication"| C["🖥️ DC03<br/>branch.company.local"]
    
    B -->|"Replication"| C
    
    A -->|"Change: New User"| D["📝 Originating Write"]
    
    D -->|"Replication<br/>Update Sequence<br/>Number"| B
    D -->|"Replication<br/>Update Sequence<br/>Number"| C
    
    B -->|"Converged"| E["✅ All DCs<br/>Same Data"]
    C -->|"Converged"| E
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#c8e6c9
    style D fill:#ffccbc
    style E fill:#a5d6a7
```

---

## Diagram 14: Network Topology - Enterprise

```mermaid
graph TD
    A["🌐 Internet<br/>8.8.8.8"] --> B["🔹 Router/Gateway<br/>192.168.1.1"]
    
    B --> C["🖥️ DC01<br/>192.168.1.10"]
    B --> D["🖥️ FileServer01<br/>192.168.1.20"]
    B --> E["🖥️ PrintServer01<br/>192.168.1.30"]
    B --> F["💻 Workstations<br/>192.168.1.50-100"]
    
    C -->|"AD Replication"| G["🖥️ DC02<br/>192.168.1.11"]
    
    D -->|"DFS Replication"| H["🖥️ FileServer02<br/>192.168.1.21"]
    
    C -->|"DNS"| F
    C -->|"DHCP"| F
    C -->|"GPO"| F
    
    style A fill:#fff9c4
    style B fill:#c8e6c9
    style C fill:#ffccbc
    style D fill:#ffccbc
    style E fill:#ffccbc
    style F fill:#a5d6a7
    style G fill:#ffccbc
    style H fill:#ffccbc
```

---

## Diagram 15: Group Policy Processing - Client

```mermaid
graph TD
    A["💻 Client Startup"] --> B["1. Local GPO Applied"]
    
    B --> C["2. Site GPO Applied<br/>from AD Site"]
    
    C --> D["3. Domain GPO Applied<br/>from Domain"]
    
    D --> E["4. OU GPO Applied<br/>from OU"]
    
    E --> F["5. Child OU GPO Applied<br/>from Child OU"]
    
    F --> G{"Blocking<br/>Inheritance?"}
    
    G -->|YES| H["🚫 Block Inheritance"]
    G -->|NO| I["✅ Inherit from Parent"]
    
    H --> J["Enforce GPO?"]
    I --> J
    
    J -->|YES| K["🔒 Enforce<br/>Cannot Override"]
    J -->|NO| L["✅ Normal<br/>Can Override"]
    
    K --> M["✅ Effective Policy Applied"]
    L --> M
    
    style A fill:#fff9c4
    style B fill:#ffccbc
    style C fill:#ffccbc
    style D fill:#ffccbc
    style E fill:#ffccbc
    style F fill:#ffccbc
    style M fill:#a5d6a7
```

---

## Summary

**Total Diagrams:** 15 Professional Mermaid Diagrams

### Diagrams by Category

**Infrastructure (5):**
1. AD Forest/Domain/OU Structure
2. Network Topology - Enterprise
3. DFS Namespace + Targets + Replication
4. File Server Recommended Structure
5. Windows Server 2022 Architecture

**Protocols & Services (5):**
1. DNS Query Flow
2. DHCP Lease Lifecycle (DORA)
3. Active Directory Replication
4. GPO Processing Order (LSDOU)
5. Group Policy Processing - Client

**Administration & Troubleshooting (5):**
1. Share vs NTFS Permissions Decision Flow
2. Shadow Copies Restore Flow
3. RSAT Admin Workflow
4. Troubleshooting Decision Tree
5. Backup Strategy 3-2-1

---

**All diagrams are:**
✅ Professional quality  
✅ Color-coded for clarity  
✅ Easy to understand  
✅ Ready for website integration  
✅ Mermaid format (editable)  

**Next Step:** Convert to SVG/PNG and integrate in website

---

**Document Status:** Complete  
**Total Diagrams:** 15  
**Format:** Mermaid (editable)  
**Ready for:** Website Integration
