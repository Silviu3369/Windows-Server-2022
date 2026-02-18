export interface VideoResource {
  title: string;
  url: string;
  channel: string;
}

export interface ModuleReference {
  pdf: string[];
  microsoft: string[];
}

export const moduleVideos: Record<string, VideoResource[]> = {
  "1.1": [
    { title: "Windows Server 2022 Installation", url: "https://www.youtube.com/watch?v=58Ul1hZRXxU", channel: "vCloudBitsBytes" }
  ],
  "1.2": [
    { title: "AD DS Installation and Configuration (WS 2022)", url: "https://www.youtube.com/watch?v=WfofLqlxZBQ", channel: "ittaster" }
  ],
  "1.3": [
    { title: "Install and Configure DNS on Windows Server 2022", url: "https://www.youtube.com/watch?v=OtdOEiTozUE", channel: "Jon Good" }
  ],
  "1.4": [
    { title: "Install and Configure DHCP Server in Windows Server 2022", url: "https://www.youtube.com/watch?v=I4pG29mT-oI", channel: "Jon Good" }
  ],
  "1.5": [
    { title: "Windows Server 2022 Network Configuration", url: "https://www.youtube.com/watch?v=NfV0Hh3daYw", channel: "ZineTek" }
  ],
  "2.1": [
    { title: "Learn Microsoft Active Directory (ADDS)", url: "https://www.youtube.com/watch?v=85-bp7XxWDQ", channel: "Andy Malone MVP" }
  ],
  "2.2": [
    { title: "Creating, Managing, and Delegating OUs in Active Directory", url: "https://www.youtube.com/watch?v=cfY9JoBDep0", channel: "David Dalton" }
  ],
  "2.3": [
    { title: "DNS Forwarding and Conditional Forwarding", url: "https://www.youtube.com/watch?v=_GJPBg1D0sY", channel: "ITFreeTraining" }
  ],
  "2.4": [
    { title: "Configure DHCP Failover", url: "https://www.youtube.com/watch?v=S7Eh7ubTVtY", channel: "Danny Moran" }
  ],
  "2.5": [
    { title: "Understanding Group Policy Order of Precedence", url: "https://www.youtube.com/watch?v=cWraXsgOJ7U", channel: "MSFT WebCast" }
  ],
  "2.6": [
    { title: "Configure Disk Quota with FSRM", url: "https://www.youtube.com/watch?v=e9e4ek4p-y0", channel: "Vincent's Tech Blog" }
  ],
  "2.7": [
    { title: "Setup DFS Namespaces in Windows Server 2022", url: "https://www.youtube.com/watch?v=1TzACXtrB-U", channel: "MSFT WebCast" }
  ],
  "2.8": [
    { title: "Setup a Windows Print Server and Deploy Printers", url: "https://www.youtube.com/watch?v=xZY4C4zMHlw", channel: "Danny Moran" }
  ],
  "2.9": [
    { title: "Install RSAT on Windows 11", url: "https://www.youtube.com/watch?v=DhoeB2QoJkU", channel: "OnlineComputerTips" }
  ],
  "3.1": [
    { title: "Windows Server Hardening Commands", url: "https://www.youtube.com/watch?v=O7ZQHt1jQBo", channel: "Real World IT Tech" }
  ],
  "3.2": [
    { title: "Bare Metal Backup on Windows Server 2022", url: "https://www.youtube.com/watch?v=MdKCMQPJalc", channel: "MSFT WebCast" }
  ],
  "3.3": [
    { title: "Using Windows Performance Monitor", url: "https://www.youtube.com/watch?v=XQjs7KW43Uk", channel: "David Dalton" }
  ],
  "3.4": [
    { title: "Configure Windows Failover Cluster on Windows Server 2022", url: "https://www.youtube.com/watch?v=4Rvt0zZjhpM", channel: "MSFT WebCast" }
  ],
  "3.5": [
    { title: "Windows Event Viewer for Security Audit", url: "https://www.youtube.com/watch?v=-fV7jZwZuGQ", channel: "Jon Good" }
  ],
  "4.1": []
};

export const moduleReferences: Record<string, ModuleReference> = {
  "1.1": { pdf: ["00-Inleiding.pdf", "01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements", "https://learn.microsoft.com/en-us/windows-server/get-started/install-upgrade-migrate"] },
  "1.2": { pdf: ["01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"] },
  "1.3": { pdf: ["01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-top", "https://learn.microsoft.com/en-us/windows-server/networking/dns/quickstart-install-configure-dns-server"] },
  "1.4": { pdf: ["01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top", "https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-deploy-wps"] },
  "1.5": { pdf: ["00-Inleiding.pdf", "Virtualbox Windows Server Router.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top", "https://learn.microsoft.com/en-us/windows-server/remote/remote-access/remote-access"] },
  "2.1": { pdf: ["02-Accounts.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"] },
  "2.2": { pdf: ["02-Accounts.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/reviewing-ou-design-concepts", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/understand-security-identifiers"] },
  "2.3": { pdf: ["01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/networking/dns/dns-top"] },
  "2.4": { pdf: ["01-OpzettenDomein.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top"] },
  "2.5": { pdf: ["04-Gebruikersomgeving.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview", "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-processing"] },
  "2.6": { pdf: ["03-File Server.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/storage/fsrm/fsrm-overview"] },
  "2.7": { pdf: ["03-File Server.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/storage/dfs-namespaces/dfs-overview"] },
  "2.8": { pdf: ["05-Printerbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/print"] },
  "2.9": { pdf: ["02-Accounts.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/administration/install-remote-server-administration-tools"] },
  "3.1": { pdf: ["06-Serverbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/security/security-and-assurance"] },
  "3.2": { pdf: ["06-Serverbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/forest-recovery-guide/ad-forest-recovery-backing-up-a-full-server"] },
  "3.3": { pdf: ["06-Serverbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/administration/performance-tuning/"] },
  "3.4": { pdf: ["06-Serverbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/failover-clustering/failover-clustering-overview"] },
  "3.5": { pdf: ["06-Serverbeheer.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection"] },
  "4.1": { pdf: ["Virtualbox Windows Server Router.pdf", "01-OpzettenDomein.pdf", "04-Gebruikersomgeving.pdf"], microsoft: ["https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview"] }
};
