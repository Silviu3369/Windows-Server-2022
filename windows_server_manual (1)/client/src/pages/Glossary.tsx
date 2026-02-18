import { useState, useMemo } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/Layout';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Active Directory (AD)',
    definition: 'A directory service for Windows networks that manages user accounts, computers, and resources. Provides centralized authentication and authorization.',
    category: 'Core Services'
  },
  {
    term: 'Active Directory Domain Services (AD DS)',
    definition: 'The core service in Active Directory that provides user and computer management, group policies, and authentication for Windows networks.',
    category: 'Core Services'
  },
  {
    term: 'Active Directory Forest',
    definition: 'The highest level in the Active Directory hierarchy, containing one or more trees and domains that share a common schema and global catalog.',
    category: 'Core Services'
  },
  {
    term: 'Active Directory Replication',
    definition: 'The process of synchronizing directory information between domain controllers to ensure consistency across the network.',
    category: 'Core Services'
  },
  {
    term: 'Audit Policy',
    definition: 'A security setting that determines which user and system activities are logged in the Security Event Log for compliance and troubleshooting.',
    category: 'Security'
  },
  {
    term: 'Authentication',
    definition: 'The process of verifying a user\'s identity through credentials (username and password) or other means.',
    category: 'Security'
  },
  {
    term: 'Authorization',
    definition: 'The process of determining what resources a user can access after successful authentication.',
    category: 'Security'
  },
  {
    term: 'Access Control List (ACL)',
    definition: 'A list of permissions that specifies which users or groups have access to a resource and what level of access they have.',
    category: 'Security'
  },
  {
    term: 'Backup',
    definition: 'A copy of data created for recovery purposes in case of data loss or system failure.',
    category: 'Backup & Recovery'
  },
  {
    term: 'Bare-Metal Recovery',
    definition: 'The process of restoring an entire server from a backup image, including the operating system, applications, and data.',
    category: 'Backup & Recovery'
  },
  {
    term: 'DHCP (Dynamic Host Configuration Protocol)',
    definition: 'A network protocol that automatically assigns IP addresses and network configuration to client computers.',
    category: 'Networking'
  },
  {
    term: 'DHCP Scope',
    definition: 'A range of IP addresses available for assignment to DHCP clients.',
    category: 'Networking'
  },
  {
    term: 'DNS (Domain Name System)',
    definition: 'A system that translates human-readable domain names into IP addresses.',
    category: 'Networking'
  },
  {
    term: 'Domain',
    definition: 'A logical grouping of computers and users managed by Active Directory.',
    category: 'Core Services'
  },
  {
    term: 'Domain Controller (DC)',
    definition: 'A server running Active Directory Domain Services that manages user authentication and domain resources.',
    category: 'Core Services'
  },
  {
    term: 'DORA (Discover, Offer, Request, Acknowledge)',
    definition: 'The four-step process used by DHCP to assign IP addresses to clients.',
    category: 'Networking'
  },
  {
    term: 'Event Log',
    definition: 'A record of system, security, and application events that can be used for troubleshooting and auditing.',
    category: 'Monitoring'
  },
  {
    term: 'Event Viewer',
    definition: 'A Windows tool that displays and manages event logs.',
    category: 'Monitoring'
  },
  {
    term: 'Failover',
    definition: 'The automatic transfer of services from a failed server to a backup server.',
    category: 'High Availability'
  },
  {
    term: 'Failover Cluster',
    definition: 'A group of servers configured to provide high availability by automatically failover services if a server fails.',
    category: 'High Availability'
  },
  {
    term: 'File Server',
    definition: 'A server that provides centralized file storage and sharing for network users.',
    category: 'File Services'
  },
  {
    term: 'File Server Resource Manager (FSRM)',
    definition: 'A Windows feature that manages file storage, quotas, and file screening.',
    category: 'File Services'
  },
  {
    term: 'Firewall',
    definition: 'A security device or software that controls network traffic based on configured rules.',
    category: 'Security'
  },
  {
    term: 'Global Catalog (GC)',
    definition: 'A domain controller that contains a partial copy of all objects in the forest, used for forest-wide searches.',
    category: 'Core Services'
  },
  {
    term: 'Global Group',
    definition: 'An Active Directory group that can contain members only from its own domain but can be used in any domain in the forest.',
    category: 'Core Services'
  },
  {
    term: 'GPO (Group Policy Object)',
    definition: 'A collection of Group Policy settings that can be applied to users and computers in Active Directory.',
    category: 'Group Policy'
  },
  {
    term: 'GPMC (Group Policy Management Console)',
    definition: 'A tool used to create, edit, and manage Group Policy Objects.',
    category: 'Group Policy'
  },
  {
    term: 'Group Policy',
    definition: 'A feature in Active Directory that allows administrators to define and enforce policies for users and computers.',
    category: 'Group Policy'
  },
  {
    term: 'Hardening',
    definition: 'The process of securing a system by reducing its attack surface and implementing security best practices.',
    category: 'Security'
  },
  {
    term: 'High Availability',
    definition: 'A system design that minimizes downtime by providing redundancy and automatic failover.',
    category: 'High Availability'
  },
  {
    term: 'IP Address',
    definition: 'A unique numerical address assigned to a device on a network (e.g., 192.168.1.1).',
    category: 'Networking'
  },
  {
    term: 'Kerberos',
    definition: 'The default authentication protocol used by Active Directory for secure authentication.',
    category: 'Security'
  },
  {
    term: 'LSDOU',
    definition: 'The order of Group Policy processing: Local, Site, Domain, OU.',
    category: 'Group Policy'
  },
  {
    term: 'NTFS (New Technology File System)',
    definition: 'The modern file system used by Windows that supports permissions, encryption, and compression.',
    category: 'File Services'
  },
  {
    term: 'NTFS Permissions',
    definition: 'Access control settings that apply to files and folders on NTFS volumes.',
    category: 'File Services'
  },
  {
    term: 'Organizational Unit (OU)',
    definition: 'A container in Active Directory used to organize users, computers, and other objects.',
    category: 'Core Services'
  },
  {
    term: 'Performance Monitor',
    definition: 'A Windows tool that tracks system performance metrics (CPU, memory, disk, network).',
    category: 'Monitoring'
  },
  {
    term: 'Permissions',
    definition: 'Rules that determine what actions a user can perform on a resource.',
    category: 'Security'
  },
  {
    term: 'Recovery Point Objective (RPO)',
    definition: 'The maximum amount of data loss acceptable (e.g., 1 hour of data).',
    category: 'Backup & Recovery'
  },
  {
    term: 'Recovery Time Objective (RTO)',
    definition: 'The maximum time allowed to restore a service after failure.',
    category: 'Backup & Recovery'
  },
  {
    term: 'Replication',
    definition: 'The process of synchronizing data between servers (e.g., Active Directory replication between domain controllers).',
    category: 'Core Services'
  },
  {
    term: 'Share Permission',
    definition: 'Access control settings that apply to network shares.',
    category: 'File Services'
  },
  {
    term: 'SMB (Server Message Block)',
    definition: 'The protocol used for file sharing and printing over networks.',
    category: 'Networking'
  },
  {
    term: 'Subnet',
    definition: 'A logical division of an IP network.',
    category: 'Networking'
  },
  {
    term: 'Subnet Mask',
    definition: 'A number that defines which portion of an IP address represents the network and which represents the host.',
    category: 'Networking'
  },
  {
    term: 'UAC (User Account Control)',
    definition: 'A Windows security feature that prompts administrators for confirmation when performing privileged operations.',
    category: 'Security'
  },
  {
    term: 'User Account',
    definition: 'An identity in Active Directory that represents a person or service.',
    category: 'Core Services'
  },
  {
    term: 'Windows Firewall',
    definition: 'A software firewall built into Windows that controls inbound and outbound network traffic.',
    category: 'Security'
  },
  {
    term: 'Windows Server Backup',
    definition: 'A feature that provides backup and recovery capabilities for Windows Server.',
    category: 'Backup & Recovery'
  },
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(glossaryTerms.map(t => t.category))).sort();

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Glosar Termeni</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Definiții complete ale termenilor tehnici folosiți în manual
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Caută termen sau definiție..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                Toate ({glossaryTerms.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {category} ({glossaryTerms.filter(t => t.category === category).length})
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid gap-4">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                          {term.term}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {term.category}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {term.definition}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                  Nu au fost găsite termeni care să corespundă căutării tale.
                </p>
              </Card>
            )}
          </div>

          {/* Stats */}
          <div className="mt-12 text-center text-slate-600 dark:text-slate-400">
            <p className="text-sm">
              Afișate {filteredTerms.length} din {glossaryTerms.length} termeni
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
