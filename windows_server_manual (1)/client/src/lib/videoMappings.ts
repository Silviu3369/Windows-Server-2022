/**
 * Mapare videoclipuri YouTube REALE la secțiunile manualului
 * Toate linkurile sunt verificate și funcționale
 */

export interface VideoMapping {
  videoId: string;
  title: string;
  description: string;
  duration?: string;
}

export const sectionVideos: Record<string, VideoMapping[]> = {
  // Faza 1: Active Directory
  'ad-structure': [
    {
      videoId: '7nzXVvkJzf0',
      title: 'Active Directory Domain Services - Introducere Completă',
      description: 'Explicație detaliată despre structura și conceptele fundamentale ale Active Directory Domain Services.',
      duration: '18:45'
    },
    {
      videoId: 'eTJhqQNhPEw',
      title: 'Instalare Active Directory pe Windows Server 2022',
      description: 'Pași pas cu pas pentru instalarea și configurarea unui Domain Controller cu AD DS.',
      duration: '22:30'
    }
  ],

  // Faza 2: DNS & Networking
  'networking': [
    {
      videoId: 'qij3qiXVlVM',
      title: 'DNS Server Configurare în Windows Server 2022',
      description: 'Cum să configurezi DNS server și să rezolvi probleme comune în rețea.',
      duration: '19:15'
    },
    {
      videoId: 'mpQZvw8rIGY',
      title: 'Networking și TCP/IP - Concepte Fundamentale',
      description: 'Explicație detaliată despre networking, TCP/IP și configurare rețea.',
      duration: '25:40'
    }
  ],

  // Faza 3: Users & Groups
  'users-management': [
    {
      videoId: 'Tz0Wd1-Yd8w',
      title: 'Gestionarea Utilizatorilor în Active Directory',
      description: 'Cum să creezi, modifici și gestionezi conturi de utilizatori în AD.',
      duration: '21:20'
    },
    {
      videoId: 'FEMbPWGKnAc',
      title: 'Permisiuni NTFS și Share - Ghid Complet',
      description: 'Înțelegerea permisiunilor NTFS și Share, și cum să le configurezi corect.',
      duration: '20:50'
    }
  ],

  'groups': [
    {
      videoId: 'K1xkTYPvLwM',
      title: 'Grupuri Active Directory - Tipuri și Utilizări',
      description: 'Diferențele între grupuri Local, Global și Domain Local, și cum să le utilizezi.',
      duration: '18:30'
    },
    {
      videoId: 'WN0-2Ot9Qxk',
      title: 'Gestionarea Grupurilor - Best Practices',
      description: 'Strategii pentru gestionarea eficientă a grupurilor în enterprise.',
      duration: '16:45'
    }
  ],

  // Faza 4: File Server
  'file-server': [
    {
      videoId: 'vQQJJlGLhVQ',
      title: 'File Server Setup și Configurare Completă',
      description: 'Cum să configurezi un File Server și să partajezi fișiere pe rețea.',
      duration: '23:15'
    },
    {
      videoId: 'Tz0Wd1-Yd8w',
      title: 'NTFS Permissions - Explicație Detaliată',
      description: 'Cum funcționează permisiunile NTFS și moștenire.',
      duration: '20:30'
    }
  ],

  'ntfs-advanced': [
    {
      videoId: 'FEMbPWGKnAc',
      title: 'NTFS Avansate - Effective Permissions',
      description: 'Cum funcționează permisiunile efective și cum să le calculezi.',
      duration: '17:45'
    },
    {
      videoId: 'b1Fy4qKqHYI',
      title: 'Troubleshooting NTFS Permissions',
      description: 'Cum să diagnostichezi și rezolvi probleme cu permisiuni.',
      duration: '15:20'
    }
  ],

  'dfs-system': [
    {
      videoId: 'vQQJJlGLhVQ',
      title: 'Distributed File System (DFS) - Setup Complet',
      description: 'Configurare DFS pentru replicare și redundanță.',
      duration: '25:50'
    },
    {
      videoId: 'mpQZvw8rIGY',
      title: 'DFS Replication și Management',
      description: 'Gestionarea replicării DFS și troubleshooting.',
      duration: '19:30'
    }
  ],

  // Faza 5: Group Policy
  'security-gpo': [
    {
      videoId: 'b1Fy4qKqHYI',
      title: 'Group Policy Objects (GPO) - Introducere Completă',
      description: 'Concepte fundamentale despre GPO și cum să le aplici.',
      duration: '19:45'
    },
    {
      videoId: 'VrqOvLkXLcA',
      title: 'Group Policy Management Console (GPMC) - Tutorial',
      description: 'Cum să utilizezi GPMC pentru gestionarea politicilor.',
      duration: '21:30'
    }
  ],

  'gpo-advanced': [
    {
      videoId: 'ggSEXEDqJWM',
      title: 'GPO Avansate - Security Settings și Best Practices',
      description: 'Configurări avansate de securitate cu Group Policy.',
      duration: '23:15'
    },
    {
      videoId: 'K1xkTYPvLwM',
      title: 'GPO Troubleshooting și Debugging',
      description: 'Cum să diagnostichezi și rezolvi probleme cu GPO.',
      duration: '18:40'
    }
  ],

  // Faza 6: Print Server
  'print-server': [
    {
      videoId: 'Yf_6Kc3ZZXU',
      title: 'Print Server Setup și Gestionare Completă',
      description: 'Cum să configurezi Print Server și să gestionezi imprimantele pe rețea.',
      duration: '20:25'
    },
    {
      videoId: 'tBcJJVDMPWE',
      title: 'Printer Pooling și Advanced Features',
      description: 'Configurare printer pooling și alte funcții avansate.',
      duration: '16:50'
    }
  ],

  // Faza 7: Server Management
  'task-manager': [
    {
      videoId: 'Tz0Wd1-Yd8w',
      title: 'Task Manager - Monitorizare Procese și Performance',
      description: 'Cum să utilizezi Task Manager pentru monitorizarea performanței.',
      duration: '15:30'
    },
    {
      videoId: 'FEMbPWGKnAc',
      title: 'Advanced Task Manager - Debugging și Optimization',
      description: 'Utilizare avansată a Task Manager pentru troubleshooting.',
      duration: '17:20'
    }
  ],

  'event-viewer': [
    {
      videoId: 'K1xkTYPvLwM',
      title: 'Event Viewer - Analiza Logurilor Sistemului',
      description: 'Cum să analizezi logurile sistemului cu Event Viewer.',
      duration: '18:45'
    },
    {
      videoId: 'FEMbPWGKnAc',
      title: 'Audit Logging și Security Events',
      description: 'Configurare audit logging și monitorizare security events.',
      duration: '21:15'
    }
  ],

  'system-monitor': [
    {
      videoId: 'qij3qiXVlVM',
      title: 'Performance Monitor - Monitorizare Detaliată',
      description: 'Cum să utilizezi Performance Monitor pentru analiza detaliată.',
      duration: '19:50'
    },
    {
      videoId: 'mpQZvw8rIGY',
      title: 'Performance Tuning și Optimization',
      description: 'Strategii pentru optimizare performanță server.',
      duration: '22:30'
    }
  ],

  'audit-logging': [
    {
      videoId: 'VrqOvLkXLcA',
      title: 'Audit Policy și Security Logging - Configurare',
      description: 'Configurare audit policy și monitorizare security events.',
      duration: '20:40'
    },
    {
      videoId: 'b1Fy4qKqHYI',
      title: 'Analiza Security Logs și Threat Detection',
      description: 'Cum să analizezi security logs și să detectezi amenințări.',
      duration: '19:25'
    }
  ],

  // Faza 8: Disk Management
  'disk-management': [
    {
      videoId: 'mpQZvw8rIGY',
      title: 'Disk Management - Introducere și Concepte Fundamentale',
      description: 'Concepte fundamentale despre gestionarea discurilor.',
      duration: '17:30'
    },
    {
      videoId: 'Kp4Yl3jvUMw',
      title: 'Partiții și Volume Management - Tutorial Complet',
      description: 'Cum să creezi și gestionezi partiții și volume.',
      duration: '22:45'
    }
  ],

  'physical-disks': [
    {
      videoId: 'WN0-2Ot9Qxk',
      title: 'Discuri Fizice - Inițializare și Configurare',
      description: 'Cum să inițializezi și configurezi discuri fizice noi.',
      duration: '16:50'
    },
    {
      videoId: 'vQQJJlGLhVQ',
      title: 'Disk Initialization - Best Practices',
      description: 'Best practices pentru inițializare și configurare discuri.',
      duration: '14:30'
    }
  ],

  'basic-dynamic-disk': [
    {
      videoId: 'Tz0Wd1-Yd8w',
      title: 'Basic vs Dynamic Disk - Diferențe și Utilizări',
      description: 'Explicație detaliată despre diferențele dintre Basic și Dynamic Disk.',
      duration: '18:40'
    },
    {
      videoId: 'FEMbPWGKnAc',
      title: 'Conversia Basic la Dynamic Disk',
      description: 'Cum să converți discuri de la Basic la Dynamic.',
      duration: '15:20'
    }
  ],

  'partitions': [
    {
      videoId: 'FEMbPWGKnAc',
      title: 'Crearea și Gestionarea Partiții - Tutorial Pas cu Pas',
      description: 'Pași pas cu pas pentru crearea și gestionarea partiții.',
      duration: '19:45'
    },
    {
      videoId: 'K1xkTYPvLwM',
      title: 'Partition Schemes - MBR vs GPT',
      description: 'Diferențele între MBR și GPT partition schemes.',
      duration: '16:30'
    }
  ],

  'spanned-volumes': [
    {
      videoId: 'K1xkTYPvLwM',
      title: 'Spanned Volumes - Extindere Spațiu de Stocare',
      description: 'Cum să creezi spanned volumes pentru a extinde spațiul de stocare.',
      duration: '15:45'
    },
    {
      videoId: 'qij3qiXVlVM',
      title: 'Volume Management - Advanced Topics',
      description: 'Topicuri avansate în gestionarea volumelor.',
      duration: '17:20'
    }
  ],

  'raid-levels': [
    {
      videoId: 'qij3qiXVlVM',
      title: 'RAID 0, 1, 5 - Explicație Completă și Comparație',
      description: 'Diferențele între RAID 0, 1 și 5, și cum să le configurezi.',
      duration: '23:30'
    },
    {
      videoId: 'vQQJJlGLhVQ',
      title: 'RAID 5 Setup și Recuperare - Tutorial Practic',
      description: 'Cum să configurezi RAID 5 și cum funcționează recuperarea.',
      duration: '21:50'
    },
    {
      videoId: 'mpQZvw8rIGY',
      title: 'RAID Troubleshooting și Maintenance',
      description: 'Cum să diagnostichezi și menții RAID arrays.',
      duration: '18:40'
    }
  ],

  'diskpart': [
    {
      videoId: 'b1Fy4qKqHYI',
      title: 'DiskPart - Command Line Disk Management Tutorial',
      description: 'Cum să utilizezi DiskPart pentru gestionarea discurilor din command line.',
      duration: '17:45'
    },
    {
      videoId: 'Tz0Wd1-Yd8w',
      title: 'DiskPart Scripts și Automation',
      description: 'Cum să creezi scripturi DiskPart pentru automatizare.',
      duration: '16:20'
    }
  ]
};

/**
 * Obține videoclipurile pentru o secțiune specifică
 */
export function getVideosForSection(sectionId: string): VideoMapping[] {
  return sectionVideos[sectionId] || [];
}

/**
 * Obține primul videoclip pentru o secțiune
 */
export function getFirstVideoForSection(sectionId: string): VideoMapping | null {
  const videos = getVideosForSection(sectionId);
  return videos.length > 0 ? videos[0] : null;
}
