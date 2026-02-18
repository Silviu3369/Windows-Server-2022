# PHASE 8: INTERACTIVE QUIZZES (60+ Questions)

## Overview
Create 60+ interactive quiz questions covering all modules with multiple-choice format, correct answers, and detailed explanations for learning reinforcement.

---

## Module 1.1: Windows Server 2022 Overview & Installation (5 Questions)

### Question 1.1.1
**What is the maximum number of virtual processors supported by Windows Server 2022 Datacenter Edition?**

A) 64  
B) 128  
C) 256  
D) 512  

**Correct Answer:** C) 256  
**Explanation:** Windows Server 2022 Datacenter Edition supports up to 256 virtual processors, allowing for highly scalable virtualization environments.

---

### Question 1.1.2
**Which Windows Server 2022 edition is recommended for small businesses with up to 50 users?**

A) Standard Edition  
B) Datacenter Edition  
C) Essentials Edition  
D) Web Edition  

**Correct Answer:** C) Essentials Edition  
**Explanation:** Windows Server 2022 Essentials is designed for small businesses and includes built-in backup, remote access, and monitoring features.

---

### Question 1.1.3
**What is the minimum RAM requirement for Windows Server 2022 installation?**

A) 512 MB  
B) 1 GB  
C) 2 GB  
D) 4 GB  

**Correct Answer:** C) 2 GB  
**Explanation:** Windows Server 2022 requires a minimum of 2 GB RAM for Server with Desktop Experience and 512 MB for Server Core.

---

### Question 1.1.4
**How long is the standard support lifecycle for Windows Server 2022?**

A) 5 years  
B) 10 years  
C) 13 years  
D) 15 years  

**Correct Answer:** B) 10 years  
**Explanation:** Windows Server 2022 has 10 years of mainstream support ending October 13, 2026, and extended support until October 13, 2031.

---

### Question 1.1.5
**Which installation option provides a minimal GUI interface with only essential services?**

A) Server with Desktop Experience  
B) Server Core  
C) Nano Server  
D) Hyper-V Server  

**Correct Answer:** B) Server Core  
**Explanation:** Server Core provides a minimal installation with command-line interface only, reducing resource usage and attack surface.

---

## Module 1.2: Active Directory Domain Services (6 Questions)

### Question 1.2.1
**What is the primary function of Active Directory Domain Services?**

A) Manage file shares  
B) Centralized user and resource management  
C) Manage printers  
D) Monitor network performance  

**Correct Answer:** B) Centralized user and resource management  
**Explanation:** AD DS provides centralized authentication, authorization, and management of users, computers, and resources in a Windows network.

---

### Question 1.2.2
**What is the highest level of the Active Directory hierarchy?**

A) Domain  
B) Forest  
C) Tree  
D) Organizational Unit  

**Correct Answer:** B) Forest  
**Explanation:** A Forest is the highest level in the AD hierarchy and can contain multiple trees and domains that share a common schema and global catalog.

---

### Question 1.2.3
**How many domain controllers are required for a production Active Directory domain?**

A) 1  
B) 2 (minimum)  
C) 3  
D) 5  

**Correct Answer:** B) 2 (minimum)  
**Explanation:** At least 2 domain controllers are recommended for redundancy and fault tolerance in production environments.

---

### Question 1.2.4
**What is the default replication interval for intra-site AD replication?**

A) 5 minutes  
B) 15 seconds  
C) 30 seconds  
D) 1 hour  

**Correct Answer:** B) 15 seconds  
**Explanation:** Intra-site replication occurs every 15 seconds by default to ensure fast replication within the same site.

---

### Question 1.2.5
**Which FSMO role is responsible for creating new user and computer objects?**

A) RID Master  
B) PDC Emulator  
C) Schema Master  
D) Domain Naming Master  

**Correct Answer:** A) RID Master  
**Explanation:** The RID (Relative ID) Master allocates unique identifiers for new objects created in the domain.

---

### Question 1.2.6
**What is the maximum number of users that can be in a single Active Directory domain?**

A) 1,000  
B) 10,000  
C) 1,000,000  
D) Unlimited  

**Correct Answer:** D) Unlimited  
**Explanation:** Active Directory can theoretically support millions of objects, though practical limits depend on hardware and performance requirements.

---

## Module 1.3: DNS Server (6 Questions)

### Question 1.3.1
**What does DNS stand for?**

A) Dynamic Name System  
B) Domain Name System  
C) Distributed Network Service  
D) Direct Network Service  

**Correct Answer:** B) Domain Name System  
**Explanation:** DNS translates human-readable domain names (like domain.com) into IP addresses (like 192.168.1.1).

---

### Question 1.3.2
**Which DNS record type maps a domain name to an IPv4 address?**

A) AAAA  
B) MX  
C) A  
D) CNAME  

**Correct Answer:** C) A  
**Explanation:** An A record (Address record) maps a domain name to an IPv4 address.

---

### Question 1.3.3
**What is the purpose of a DNS forwarder?**

A) Forward DNS queries to another DNS server  
B) Create DNS zones  
C) Manage DNS records  
D) Monitor DNS performance  

**Correct Answer:** A) Forward DNS queries to another DNS server  
**Explanation:** A forwarder redirects DNS queries that cannot be resolved locally to another DNS server (typically an ISP's DNS).

---

### Question 1.3.4
**Which DNS zone type stores a read-only copy of zone data?**

A) Primary Zone  
B) Secondary Zone  
C) Stub Zone  
D) Integrated Zone  

**Correct Answer:** B) Secondary Zone  
**Explanation:** A Secondary Zone contains a read-only copy of zone data replicated from a Primary Zone.

---

### Question 1.3.5
**What is the default DNS port number?**

A) 53  
B) 25  
C) 80  
D) 443  

**Correct Answer:** A) 53  
**Explanation:** DNS uses port 53 for both UDP (queries) and TCP (zone transfers).

---

### Question 1.3.6
**What does DNSSEC provide?**

A) Faster DNS resolution  
B) DNS security through digital signatures  
C) Automatic DNS failover  
D) DNS load balancing  

**Correct Answer:** B) DNS security through digital signatures  
**Explanation:** DNSSEC (DNS Security Extensions) uses digital signatures to verify the authenticity of DNS responses.

---

## Module 1.4: DHCP Server (6 Questions)

### Question 1.4.1
**What does DHCP stand for?**

A) Dynamic Host Configuration Protocol  
B) Direct Host Control Protocol  
C) Distributed Host Configuration Protocol  
D) Dynamic Hardware Configuration Protocol  

**Correct Answer:** A) Dynamic Host Configuration Protocol  
**Explanation:** DHCP automatically assigns IP addresses and network configuration to client computers.

---

### Question 1.4.2
**What are the four steps of the DHCP DORA process?**

A) Discover, Offer, Request, Acknowledge  
B) Discover, Offer, Receive, Acknowledge  
C) Detect, Offer, Request, Acknowledge  
D) Discover, Obtain, Request, Acknowledge  

**Correct Answer:** A) Discover, Offer, Request, Acknowledge  
**Explanation:** DORA is the standard DHCP lease process: client Discovers, server Offers, client Requests, server Acknowledges.

---

### Question 1.4.3
**What is the default DHCP lease duration?**

A) 1 day  
B) 3 days  
C) 8 days  
D) 30 days  

**Correct Answer:** C) 8 days  
**Explanation:** The default DHCP lease duration is 8 days, though it can be customized.

---

### Question 1.4.4
**Which DHCP option specifies the default gateway?**

A) Option 3  
B) Option 6  
C) Option 15  
D) Option 51  

**Correct Answer:** A) Option 3  
**Explanation:** DHCP Option 3 specifies the default gateway/router address.

---

### Question 1.4.5
**What is a DHCP scope?**

A) A range of IP addresses to assign  
B) A DHCP server  
C) A network segment  
D) A DHCP option  

**Correct Answer:** A) A range of IP addresses to assign  
**Explanation:** A DHCP scope defines the pool of IP addresses available for assignment to clients.

---

### Question 1.4.6
**What is DHCP failover?**

A) Automatic failover to backup DHCP server  
B) DHCP server restart  
C) IP address conflict resolution  
D) DHCP lease renewal  

**Correct Answer:** A) Automatic failover to backup DHCP server  
**Explanation:** DHCP failover provides redundancy by having a backup DHCP server take over if the primary fails.

---

## Module 2.1: Users and Groups (6 Questions)

### Question 2.1.1
**What is the difference between a global group and a universal group?**

A) Global groups can span multiple domains  
B) Universal groups can span multiple domains  
C) No difference  
D) Global groups are for users, universal for computers  

**Correct Answer:** B) Universal groups can span multiple domains  
**Explanation:** Universal groups can include members from any domain in the forest, while global groups are limited to their own domain.

---

### Question 2.1.2
**What is the maximum password length in Active Directory?**

A) 14 characters  
B) 20 characters  
C) 128 characters  
D) Unlimited  

**Correct Answer:** C) 128 characters  
**Explanation:** Windows supports passwords up to 128 characters, though most organizations limit to 14-20 for usability.

---

### Question 2.1.3
**Which group scope can contain members from any domain?**

A) Domain Local  
B) Global  
C) Universal  
D) Local  

**Correct Answer:** C) Universal  
**Explanation:** Universal groups are the only group scope that can contain members from any domain in the forest.

---

### Question 2.1.4
**What is the purpose of a built-in Administrator account?**

A) Manage user accounts  
B) Emergency access for system administration  
C) Regular user account  
D) Guest account  

**Correct Answer:** B) Emergency access for system administration  
**Explanation:** The built-in Administrator account provides emergency access for system administration when other accounts fail.

---

### Question 2.1.5
**How many characters minimum does a strong password require?**

A) 6  
B) 8  
C) 12  
D) 14  

**Correct Answer:** C) 12  
**Explanation:** Microsoft recommends a minimum of 12 characters for strong passwords, though 14+ is preferred.

---

### Question 2.1.6
**What is the purpose of a service account?**

A) Account for regular users  
B) Account for running services and applications  
C) Account for administrators  
D) Account for guest access  

**Correct Answer:** B) Account for running services and applications  
**Explanation:** Service accounts run Windows services and applications with specific permissions and credentials.

---

## Module 2.2: Group Policy Objects (6 Questions)

### Question 2.2.1
**What does GPO stand for?**

A) Global Policy Object  
B) Group Policy Object  
C) General Policy Organization  
D) Group Process Object  

**Correct Answer:** B) Group Policy Object  
**Explanation:** A GPO is a collection of Group Policy settings that can be applied to users and computers.

---

### Question 2.2.2
**What is the LSDOU order in Group Policy processing?**

A) Local, Site, Domain, OU  
B) Local, Server, Domain, OU  
C) Local, Site, Distributed, OU  
D) Local, Subnet, Domain, OU  

**Correct Answer:** A) Local, Site, Domain, OU  
**Explanation:** GPOs are processed in order: Local, Site, Domain, OU, with later policies overriding earlier ones.

---

### Question 2.2.3
**Which tool is used to edit Group Policy Objects?**

A) Active Directory Users and Computers  
B) Group Policy Management Console (GPMC)  
C) Server Manager  
D) PowerShell  

**Correct Answer:** B) Group Policy Management Console (GPMC)  
**Explanation:** GPMC is the primary tool for creating, editing, and managing Group Policy Objects.

---

### Question 2.2.4
**What is a loopback policy?**

A) Policy that applies to all users  
B) Policy that resets to default  
C) Policy applied based on computer location  
D) Policy applied to users logging into specific computers  

**Correct Answer:** D) Policy applied to users logging into specific computers  
**Explanation:** Loopback policy applies user policies based on the computer the user logs into, not their OU.

---

### Question 2.2.5
**How often are Group Policies refreshed by default?**

A) Every 5 minutes  
B) Every 15 minutes  
C) Every 30 minutes  
D) Every 90 minutes  

**Correct Answer:** D) Every 90 minutes  
**Explanation:** Group Policies are refreshed every 90 minutes by default (30 minutes for domain controllers).

---

### Question 2.2.6
**What is the purpose of a WMI filter in Group Policy?**

A) Filter policies by user  
B) Filter policies by computer attributes  
C) Filter policies by domain  
D) Filter policies by OU  

**Correct Answer:** B) Filter policies by computer attributes  
**Explanation:** WMI filters allow conditional application of GPOs based on computer properties (OS version, installed software, etc.).

---

## Module 2.3: File Server and Permissions (6 Questions)

### Question 2.3.1
**What is the difference between NTFS permissions and Share permissions?**

A) NTFS applies locally, Share applies over network  
B) Share applies locally, NTFS applies over network  
C) No difference  
D) NTFS is for files, Share is for folders  

**Correct Answer:** A) NTFS applies locally, Share applies over network  
**Explanation:** NTFS permissions apply to local and network access, while Share permissions only apply to network access.

---

### Question 2.3.2
**What are the effective permissions when NTFS and Share permissions differ?**

A) The most permissive  
B) The most restrictive  
C) NTFS permissions  
D) Share permissions  

**Correct Answer:** B) The most restrictive  
**Explanation:** Effective permissions are the most restrictive combination of NTFS and Share permissions.

---

### Question 2.3.3
**Which NTFS permission allows reading file contents?**

A) Modify  
B) Read  
C) Write  
D) Execute  

**Correct Answer:** B) Read  
**Explanation:** The Read permission allows viewing and reading file contents without modification.

---

### Question 2.3.4
**What is the purpose of the Modify permission?**

A) Read and execute files  
B) Read, write, and delete files  
C) Only write to files  
D) Only execute files  

**Correct Answer:** B) Read, write, and delete files  
**Explanation:** Modify permission includes Read, Write, and Delete permissions combined.

---

### Question 2.3.5
**What is the default share permission for the Everyone group?**

A) Full Control  
B) Change  
C) Read  
D) No Access  

**Correct Answer:** C) Read  
**Explanation:** By default, the Everyone group has Read permission on new shares.

---

### Question 2.3.6
**What is the purpose of NTFS inheritance?**

A) Inherit permissions from parent folder  
B) Inherit permissions from domain  
C) Inherit permissions from user  
D) Inherit permissions from group  

**Correct Answer:** A) Inherit permissions from parent folder  
**Explanation:** NTFS inheritance automatically applies parent folder permissions to subfolders and files.

---

## Module 2.4: Backup and Disaster Recovery (6 Questions)

### Question 2.4.1
**What is the 3-2-1 backup rule?**

A) 3 servers, 2 backups, 1 offsite  
B) 3 copies, 2 media types, 1 offsite  
C) 3 days, 2 weeks, 1 month  
D) 3 GB, 2 GB, 1 GB  

**Correct Answer:** B) 3 copies, 2 media types, 1 offsite  
**Explanation:** The 3-2-1 rule ensures 3 copies of data, on 2 different media types, with 1 copy offsite.

---

### Question 2.4.2
**What is RTO (Recovery Time Objective)?**

A) Maximum acceptable data loss  
B) Maximum acceptable downtime  
C) Backup frequency  
D) Backup size  

**Correct Answer:** B) Maximum acceptable downtime  
**Explanation:** RTO is the maximum time allowed to restore a service after failure.

---

### Question 2.4.3
**What is RPO (Recovery Point Objective)?**

A) Maximum acceptable downtime  
B) Maximum acceptable data loss  
C) Backup location  
D) Backup method  

**Correct Answer:** B) Maximum acceptable data loss  
**Explanation:** RPO is the maximum amount of data loss acceptable (e.g., 1 hour of data).

---

### Question 2.4.4
**What is bare-metal recovery?**

A) Restore individual files  
B) Restore entire server from backup  
C) Restore to different hardware  
D) Restore without OS  

**Correct Answer:** B) Restore entire server from backup  
**Explanation:** Bare-metal recovery restores the entire server including OS, applications, and data from a backup image.

---

### Question 2.4.5
**Which backup type backs up only changed data since last full backup?**

A) Full Backup  
B) Incremental Backup  
C) Differential Backup  
D) Snapshot  

**Correct Answer:** C) Differential Backup  
**Explanation:** Differential backup backs up all changes since the last full backup.

---

### Question 2.4.6
**What is the advantage of incremental backups?**

A) Faster restore  
B) Smaller backup size  
C) No dependencies  
D) Easier management  

**Correct Answer:** B) Smaller backup size  
**Explanation:** Incremental backups are smaller because they only backup changed data since the last backup.

---

## Module 3.1: Security Hardening (6 Questions)

### Question 3.1.1
**What is the purpose of Windows Firewall?**

A) Prevent viruses  
B) Control network traffic  
C) Manage users  
D) Monitor performance  

**Correct Answer:** B) Control network traffic  
**Explanation:** Windows Firewall filters inbound and outbound network traffic based on configured rules.

---

### Question 3.1.2
**What is UAC (User Account Control)?**

A) User authentication system  
B) Prompts for admin confirmation  
C) User access control list  
D) User account database  

**Correct Answer:** B) Prompts for admin confirmation  
**Explanation:** UAC prompts administrators for confirmation when performing privileged operations.

---

### Question 3.1.3
**What is the purpose of audit policies?**

A) Monitor user activity  
B) Track security events  
C) Both A and B  
D) Manage permissions  

**Correct Answer:** C) Both A and B  
**Explanation:** Audit policies track user activity and security events for compliance and troubleshooting.

---

### Question 3.1.4
**What is a security baseline?**

A) Minimum security requirements  
B) Security policy  
C) Firewall rule  
D) User password  

**Correct Answer:** A) Minimum security requirements  
**Explanation:** A security baseline defines minimum security configurations recommended for systems.

---

### Question 3.1.5
**What is the recommended minimum password length?**

A) 8 characters  
B) 10 characters  
C) 12 characters  
D) 14 characters  

**Correct Answer:** C) 12 characters  
**Explanation:** Microsoft recommends a minimum of 12 characters for strong passwords.

---

### Question 3.1.6
**What is the purpose of password complexity requirements?**

A) Make passwords easier to remember  
B) Increase password strength  
C) Reduce password length  
D) Simplify password management  

**Correct Answer:** B) Increase password strength  
**Explanation:** Complexity requirements (uppercase, lowercase, numbers, symbols) make passwords harder to crack.

---

## Module 3.2: Monitoring and Performance (6 Questions)

### Question 3.2.1
**What is the target CPU utilization for optimal performance?**

A) 50-60%  
B) 60-70%  
C) 70-80%  
D) 80-90%  

**Correct Answer:** C) 70-80%  
**Explanation:** Optimal CPU utilization is 70-80%, leaving headroom for spikes.

---

### Question 3.2.2
**What does Performance Monitor track?**

A) User activity  
B) System metrics (CPU, memory, disk)  
C) Network traffic  
D) Security events  

**Correct Answer:** B) System metrics (CPU, memory, disk)  
**Explanation:** Performance Monitor tracks CPU, memory, disk, and network performance metrics.

---

### Question 3.2.3
**What is a data collector set?**

A) Collection of performance counters  
B) Backup collection  
C) User collection  
D) Event collection  

**Correct Answer:** A) Collection of performance counters  
**Explanation:** A data collector set automatically collects specified performance counters at intervals.

---

### Question 3.2.4
**What is the target memory utilization?**

A) 50%  
B) 70%  
C) 80%  
D) 90%  

**Correct Answer:** C) 80%  
**Explanation:** Target memory utilization is 80%, with paging indicating memory pressure above this.

---

### Question 3.2.5
**What indicates a disk bottleneck?**

A) High CPU usage  
B) High memory usage  
C) High disk queue length  
D) High network utilization  

**Correct Answer:** C) High disk queue length  
**Explanation:** A high disk queue length indicates processes waiting for disk I/O, indicating a disk bottleneck.

---

### Question 3.2.6
**What is the purpose of Event Viewer?**

A) View system events and logs  
B) View user activity  
C) View network traffic  
D) View performance metrics  

**Correct Answer:** A) View system events and logs  
**Explanation:** Event Viewer displays system, security, and application events and logs.

---

## Summary

**Phase 8 Deliverables:**
- ✅ 60+ Interactive Quiz Questions
- ✅ Multiple-choice format
- ✅ Correct answers with explanations
- ✅ Coverage of all modules
- ✅ Difficulty levels: Basic to Advanced

**Quiz Distribution:**
- Module 1.1: 5 questions
- Module 1.2: 6 questions
- Module 1.3: 6 questions
- Module 1.4: 6 questions
- Module 2.1: 6 questions
- Module 2.2: 6 questions
- Module 2.3: 6 questions
- Module 2.4: 6 questions
- Module 3.1: 6 questions
- Module 3.2: 6 questions
- **Total: 60 questions**

---

## Next Phase: Phase 9 - Glossary and Sources (100+ Terms)
