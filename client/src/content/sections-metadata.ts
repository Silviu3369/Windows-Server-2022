export interface SectionMetadata {
  id: string;
  title: string;
  icon: string;
  category: string;
  order: number;
  markdownFile: string;
}

export const sectionsMetadata: SectionMetadata[] = [
  // Fundamentals
  {
    id: 'introduction',
    title: 'Introducere în Windows Server 2022',
    icon: '📚',
    category: 'Fundamentals',
    order: 1,
    markdownFile: 'introduction.md'
  },
  {
    id: 'vm-setup',
    title: 'Configurare Mașină Virtuală',
    icon: '💻',
    category: 'Fundamentals',
    order: 2,
    markdownFile: 'vm-setup.md'
  },
  {
    id: 'installation',
    title: 'Instalare Windows Server 2022',
    icon: '⚙️',
    category: 'Fundamentals',
    order: 3,
    markdownFile: 'installation.md'
  },
  {
    id: 'initial-config',
    title: 'Configurare Inițială',
    icon: '🔧',
    category: 'Fundamentals',
    order: 4,
    markdownFile: 'initial-config.md'
  },

  // Active Directory
  {
    id: 'ad-structure',
    title: 'Structura Active Directory',
    icon: '🌳',
    category: 'Active Directory',
    order: 7,
    markdownFile: 'ad-structure.md'
  },
  {
    id: 'ad-installation',
    title: 'Instalare Active Directory Domain Services',
    icon: '🏗️',
    category: 'Active Directory',
    order: 8,
    markdownFile: 'ad-installation.md'
  },
  {
    id: 'aduc-interface',
    title: 'Active Directory Users and Computers',
    icon: '👥',
    category: 'Active Directory',
    order: 9,
    markdownFile: 'aduc-interface.md'
  },

  // Networking
  {
    id: 'networking-basics',
    title: 'Networking și Servicii de Rețea',
    icon: '🌐',
    category: 'Networking',
    order: 5,
    markdownFile: 'networking-basics.md'
  },
  {
    id: 'dns-server',
    title: 'DNS Server',
    icon: '🔍',
    category: 'Networking',
    order: 6,
    markdownFile: 'dns-server.md'
  },
  {
    id: 'dhcp-server',
    title: 'DHCP Server',
    icon: '📡',
    category: 'Networking',
    order: 10,
    markdownFile: 'dhcp-server.md'
  },
  {
    id: 'nat-routing',
    title: 'NAT și Routing (Router Configuration)',
    icon: '🔀',
    category: 'Networking',
    order: 11,
    markdownFile: 'nat-routing.md'
  },

  // Users & Groups
  {
    id: 'users-groups',
    title: 'Gestionarea Utilizatorilor și Grupurilor',
    icon: '👤',
    category: 'Users & Groups',
    order: 12,
    markdownFile: 'users-groups.md'
  },
  {
    id: 'groups-types',
    title: 'Grupuri: Locale, Globale, Domain Local',
    icon: '👥',
    category: 'Users & Groups',
    order: 13,
    markdownFile: 'groups-types.md'
  },

  // File Server
  {
    id: 'file-server',
    title: 'File Server și Partajare Resurse',
    icon: '📁',
    category: 'File Server',
    order: 14,
    markdownFile: 'file-server.md'
  },
  {
    id: 'ntfs-permissions',
    title: 'Permisiuni NTFS',
    icon: '🔐',
    category: 'File Server',
    order: 15,
    markdownFile: 'ntfs-permissions.md'
  },
  {
    id: 'share-permissions',
    title: 'Permisiuni Share',
    icon: '🔓',
    category: 'File Server',
    order: 16,
    markdownFile: 'share-permissions.md'
  },
  {
    id: 'ntfs-advanced',
    title: 'NTFS Avansat: Permisiuni Moleculare',
    icon: '🔬',
    category: 'File Server',
    order: 17,
    markdownFile: 'ntfs-advanced.md'
  },
  {
    id: 'dfs',
    title: 'Distributed File System (DFS)',
    icon: '🗂️',
    category: 'File Server',
    order: 18,
    markdownFile: 'dfs.md'
  },
  {
    id: 'shadow-copies',
    title: 'Shadow Copies',
    icon: '📸',
    category: 'File Server',
    order: 19,
    markdownFile: 'shadow-copies.md'
  },

  // Print Server
  {
    id: 'print-server',
    title: 'Print Server',
    icon: '🖨️',
    category: 'Print Server',
    order: 20,
    markdownFile: 'print-server.md'
  },

  // Group Policy
  {
    id: 'gpo-basics',
    title: 'Group Policy Objects (GPO)',
    icon: '📋',
    category: 'Group Policy',
    order: 21,
    markdownFile: 'gpo-basics.md'
  },
  {
    id: 'home-directories',
    title: 'Home Directories și Roaming Profiles',
    icon: '🏠',
    category: 'Group Policy',
    order: 22,
    markdownFile: 'home-directories.md'
  },
  {
    id: 'logon-scripts',
    title: 'Logon Scripts',
    icon: '📜',
    category: 'Group Policy',
    order: 23,
    markdownFile: 'logon-scripts.md'
  },
  {
    id: 'folder-redirection',
    title: 'Folder Redirection',
    icon: '📂',
    category: 'Group Policy',
    order: 24,
    markdownFile: 'folder-redirection.md'
  },

  // Security
  {
    id: 'security-basics',
    title: 'Securitate și Best Practices',
    icon: '🔒',
    category: 'Security',
    order: 25,
    markdownFile: 'security-basics.md'
  },
  {
    id: 'audit-logging',
    title: 'Audit Logging',
    icon: '📊',
    category: 'Security',
    order: 26,
    markdownFile: 'audit-logging.md'
  },

  // Server Management
  {
    id: 'remote-desktop',
    title: 'Remote Desktop Services',
    icon: '🖥️',
    category: 'Server Management',
    order: 27,
    markdownFile: 'remote-desktop.md'
  },
  {
    id: 'rsat-management',
    title: 'RSAT - Remote Server Administration Tools',
    icon: '🛠️',
    category: 'Server Management',
    order: 28,
    markdownFile: 'rsat-management.md'
  },
  {
    id: 'mmc',
    title: 'Microsoft Management Console (MMC)',
    icon: '🎛️',
    category: 'Server Management',
    order: 29,
    markdownFile: 'mmc.md'
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    icon: '📈',
    category: 'Server Management',
    order: 30,
    markdownFile: 'task-manager.md'
  },
  {
    id: 'event-viewer',
    title: 'Event Viewer',
    icon: '📋',
    category: 'Server Management',
    order: 31,
    markdownFile: 'event-viewer.md'
  },
  {
    id: 'system-monitor',
    title: 'System Monitor',
    icon: '📊',
    category: 'Server Management',
    order: 32,
    markdownFile: 'system-monitor.md'
  },

  // Disk Management
  {
    id: 'disk-management',
    title: 'Disk Management',
    icon: '💾',
    category: 'Disk Management',
    order: 33,
    markdownFile: 'disk-management.md'
  },
  {
    id: 'disk-initialization',
    title: 'Discuri Fizice: Inițializare și Partiții',
    icon: '🔧',
    category: 'Disk Management',
    order: 34,
    markdownFile: 'disk-initialization.md'
  },
  {
    id: 'basic-dynamic-disks',
    title: 'Basic Disk vs Dynamic Disk',
    icon: '💿',
    category: 'Disk Management',
    order: 35,
    markdownFile: 'basic-dynamic-disks.md'
  },
  {
    id: 'raid',
    title: 'RAID: Levels 0, 1, 5',
    icon: '🔀',
    category: 'Disk Management',
    order: 36,
    markdownFile: 'raid.md'
  },
  {
    id: 'diskpart',
    title: 'DiskPart: Command-line Disk Management',
    icon: '⌨️',
    category: 'Disk Management',
    order: 37,
    markdownFile: 'diskpart.md'
  },

  // Windows 11 Integration
  {
    id: 'windows11-integration',
    title: 'Integrarea Clientului Windows 11',
    icon: '🪟',
    category: 'Windows 11 Integration',
    order: 38,
    markdownFile: 'windows11-integration.md'
  },

  // Hands-On Labs
  {
    id: 'hands-on-labs',
    title: 'Hands-On Labs',
    icon: '🧪',
    category: 'Hands-On Labs',
    order: 39,
    markdownFile: 'hands-on-labs.md'
  },

  // Troubleshooting
  {
    id: 'troubleshooting-faq',
    title: 'Troubleshooting & FAQ',
    icon: '🔧',
    category: 'Troubleshooting',
    order: 40,
    markdownFile: 'troubleshooting-faq.md'
  },

  // Video Tutorials
  {
    id: 'video-tutorials',
    title: 'Video Tutorials',
    icon: '🎥',
    category: 'Video Tutorials',
    order: 41,
    markdownFile: 'video-tutorials.md'
  },

  // Glossary
  {
    id: 'glossary',
    title: 'Glossary',
    icon: '📖',
    category: 'Glossary',
    order: 42,
    markdownFile: 'glossary.md'
  },

  // About
  {
    id: 'about',
    title: 'Despre Manual',
    icon: 'ℹ️',
    category: 'About',
    order: 43,
    markdownFile: 'about.md'
  }
];

export function getSectionMetadata(id: string): SectionMetadata | undefined {
  return sectionsMetadata.find(section => section.id === id);
}

export function getSectionsByCategory(category: string): SectionMetadata[] {
  return sectionsMetadata
    .filter(section => section.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getAllCategories(): string[] {
  const categories = new Set(sectionsMetadata.map(section => section.category));
  return Array.from(categories);
}
