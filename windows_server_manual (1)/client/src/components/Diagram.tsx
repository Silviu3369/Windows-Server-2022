import React from 'react';
import { Card } from '@/components/ui/card';

interface DiagramProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function Diagram({ title, description, children }: DiagramProps) {
  return (
    <Card className="p-6 md:p-8 bg-card border-border my-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="flex justify-center bg-background/50 rounded-lg p-4 overflow-x-auto">
          {children}
        </div>
      </div>
    </Card>
  );
}

// AD Structure Diagram
export function ADStructureDiagram() {
  return (
    <svg viewBox="0 0 800 400" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="400" fill="#f5f5f5" />
      
      {/* Forest */}
      <rect x="50" y="20" width="700" height="360" fill="none" stroke="#333" strokeWidth="2" rx="10" />
      <text x="70" y="45" fontSize="16" fontWeight="bold" fill="#333">Forest: contoso.com</text>
      
      {/* Domain 1 */}
      <rect x="70" y="70" width="300" height="280" fill="none" stroke="#0066cc" strokeWidth="2" rx="8" />
      <text x="90" y="95" fontSize="14" fontWeight="bold" fill="#0066cc">Domain: contoso.com</text>
      
      {/* OUs in Domain 1 */}
      <rect x="90" y="110" width="260" height="60" fill="#e6f2ff" stroke="#0066cc" strokeWidth="1" rx="4" />
      <text x="110" y="135" fontSize="12" fill="#333">OU: Accounting</text>
      <text x="110" y="155" fontSize="11" fill="#666">Users: 15</text>
      
      <rect x="90" y="180" width="260" height="60" fill="#e6f2ff" stroke="#0066cc" strokeWidth="1" rx="4" />
      <text x="110" y="205" fontSize="12" fill="#333">OU: IT Department</text>
      <text x="110" y="225" fontSize="11" fill="#666">Users: 8, Computers: 5</text>
      
      <rect x="90" y="250" width="260" height="80" fill="#e6f2ff" stroke="#0066cc" strokeWidth="1" rx="4" />
      <text x="110" y="275" fontSize="12" fill="#333">OU: Sales</text>
      <text x="110" y="295" fontSize="11" fill="#666">Users: 25, Computers: 10</text>
      <text x="110" y="315" fontSize="11" fill="#666">Printers: 3</text>
      
      {/* Domain 2 */}
      <rect x="430" y="70" width="300" height="280" fill="none" stroke="#cc0000" strokeWidth="2" rx="8" />
      <text x="450" y="95" fontSize="14" fontWeight="bold" fill="#cc0000">Domain: branch.contoso.com</text>
      
      {/* OUs in Domain 2 */}
      <rect x="450" y="110" width="260" height="80" fill="#ffe6e6" stroke="#cc0000" strokeWidth="1" rx="4" />
      <text x="470" y="135" fontSize="12" fill="#333">OU: Branch Office</text>
      <text x="470" y="155" fontSize="11" fill="#666">Users: 12, Computers: 8</text>
      <text x="470" y="175" fontSize="11" fill="#666">Printers: 2</text>
      
      <rect x="450" y="200" width="260" height="130" fill="#ffe6e6" stroke="#cc0000" strokeWidth="1" rx="4" />
      <text x="470" y="225" fontSize="12" fill="#333">OU: Remote Workers</text>
      <text x="470" y="245" fontSize="11" fill="#666">Users: 18</text>
      <text x="470" y="265" fontSize="11" fill="#666">VPN Connections: Active</text>
      <text x="470" y="285" fontSize="11" fill="#666">Security: High Priority</text>
      <text x="470" y="305" fontSize="11" fill="#666">Laptops: 15</text>
      
      {/* Trust relationship */}
      <line x1="370" y1="210" x2="430" y2="210" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <text x="390" y="200" fontSize="11" fill="#666">Trust</text>
    </svg>
  );
}

// File Server Permissions Diagram
export function FileServerPermissionsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="500" fill="#f5f5f5" />
      
      {/* File Server */}
      <rect x="300" y="20" width="200" height="60" fill="#0066cc" stroke="#333" strokeWidth="2" rx="5" />
      <text x="320" y="55" fontSize="14" fontWeight="bold" fill="white">File Server</text>
      
      {/* Shares */}
      <rect x="50" y="120" width="150" height="80" fill="#e6f2ff" stroke="#0066cc" strokeWidth="2" rx="5" />
      <text x="70" y="145" fontSize="12" fontWeight="bold" fill="#333">\\Server\Public</text>
      <text x="70" y="165" fontSize="11" fill="#666">Everyone: Read</text>
      <text x="70" y="185" fontSize="11" fill="#666">Admin: Full Control</text>
      
      <rect x="250" y="120" width="150" height="80" fill="#e6f2ff" stroke="#0066cc" strokeWidth="2" rx="5" />
      <text x="270" y="145" fontSize="12" fontWeight="bold" fill="#333">\\Server\Accounting</text>
      <text x="270" y="165" fontSize="11" fill="#666">Accounting: Modify</text>
      <text x="270" y="185" fontSize="11" fill="#666">Others: Read</text>
      
      <rect x="450" y="120" width="150" height="80" fill="#e6f2ff" stroke="#0066cc" strokeWidth="2" rx="5" />
      <text x="470" y="145" fontSize="12" fontWeight="bold" fill="#333">\\Server\IT</text>
      <text x="470" y="165" fontSize="11" fill="#666">IT Team: Full Control</text>
      <text x="470" y="185" fontSize="11" fill="#666">Others: No Access</text>
      
      <rect x="650" y="120" width="120" height="80" fill="#e6f2ff" stroke="#0066cc" strokeWidth="2" rx="5" />
      <text x="665" y="145" fontSize="12" fontWeight="bold" fill="#333">\\Server\HR</text>
      <text x="665" y="165" fontSize="11" fill="#666">HR: Full Control</text>
      <text x="665" y="185" fontSize="11" fill="#666">Restricted</text>
      
      {/* Connections from server */}
      <line x1="350" y1="80" x2="125" y2="120" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="375" y1="80" x2="325" y2="120" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="425" y1="80" x2="525" y2="120" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="450" y1="80" x2="710" y2="120" stroke="#666" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* NTFS Permissions */}
      <text x="50" y="250" fontSize="14" fontWeight="bold" fill="#333">NTFS Permissions Hierarchy:</text>
      
      <rect x="50" y="270" width="700" height="40" fill="#fff3cd" stroke="#ff9800" strokeWidth="1" rx="3" />
      <text x="70" y="295" fontSize="12" fill="#333">Full Control (Modify, Read, Write, Delete, Change Permissions)</text>
      
      <rect x="50" y="320" width="700" height="40" fill="#fff3cd" stroke="#ff9800" strokeWidth="1" rx="3" />
      <text x="70" y="345" fontSize="12" fill="#333">Modify (Read, Write, Delete)</text>
      
      <rect x="50" y="370" width="700" height="40" fill="#fff3cd" stroke="#ff9800" strokeWidth="1" rx="3" />
      <text x="70" y="395" fontSize="12" fill="#333">Read & Execute (List, Read, Execute)</text>
      
      <rect x="50" y="420" width="700" height="40" fill="#fff3cd" stroke="#ff9800" strokeWidth="1" rx="3" />
      <text x="70" y="445" fontSize="12" fill="#333">Read (List, Read)</text>
    </svg>
  );
}

// GPO Application Order Diagram
export function GPOApplicationOrderDiagram() {
  return (
    <svg viewBox="0 0 800 450" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="450" fill="#f5f5f5" />
      
      <text x="300" y="35" fontSize="16" fontWeight="bold" fill="#333">GPO Application Order (LSDOU)</text>
      
      {/* Local */}
      <rect x="50" y="60" width="150" height="70" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="5" />
      <text x="70" y="85" fontSize="13" fontWeight="bold" fill="#333">1. Local</text>
      <text x="70" y="105" fontSize="11" fill="#666">Computer Local GPO</text>
      <text x="70" y="120" fontSize="11" fill="#666">(Lowest Priority)</text>
      
      {/* Site */}
      <rect x="250" y="60" width="150" height="70" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="5" />
      <text x="270" y="85" fontSize="13" fontWeight="bold" fill="#333">2. Site</text>
      <text x="270" y="105" fontSize="11" fill="#666">Applied to all computers</text>
      <text x="270" y="120" fontSize="11" fill="#666">in the site</text>
      
      {/* Domain */}
      <rect x="450" y="60" width="150" height="70" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" rx="5" />
      <text x="470" y="85" fontSize="13" fontWeight="bold" fill="#333">3. Domain</text>
      <text x="470" y="105" fontSize="11" fill="#666">Applied to all computers</text>
      <text x="470" y="120" fontSize="11" fill="#666">in the domain</text>
      
      {/* OU */}
      <rect x="650" y="60" width="120" height="70" fill="#fce4ec" stroke="#e91e63" strokeWidth="2" rx="5" />
      <text x="665" y="85" fontSize="13" fontWeight="bold" fill="#333">4. OU</text>
      <text x="665" y="105" fontSize="11" fill="#666">Applied to OU</text>
      <text x="665" y="120" fontSize="11" fill="#666">(Highest Priority)</text>
      
      {/* Arrows */}
      <path d="M 200 95 L 250 95" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M 400 95 L 450 95" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M 600 95 L 650 95" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      
      {/* Processing Details */}
      <text x="50" y="180" fontSize="13" fontWeight="bold" fill="#333">Processing Details:</text>
      
      <rect x="50" y="200" width="700" height="35" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="3" />
      <text x="70" y="225" fontSize="11" fill="#333">• GPOs are processed in order: Local → Site → Domain → OU</text>
      
      <rect x="50" y="245" width="700" height="35" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="3" />
      <text x="70" y="270" fontSize="11" fill="#333">• Later GPOs override earlier ones (OU has highest priority)</text>
      
      <rect x="50" y="290" width="700" height="35" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="3" />
      <text x="70" y="315" fontSize="11" fill="#333">• "Block Inheritance" can prevent higher-level GPOs from applying</text>
      
      <rect x="50" y="335" width="700" height="35" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="3" />
      <text x="70" y="360" fontSize="11" fill="#333">• "Enforce" on a GPO prevents lower-level overrides</text>
      
      <rect x="50" y="380" width="700" height="35" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="3" />
      <text x="70" y="405" fontSize="11" fill="#333">• Processing occurs at computer startup and user logon</text>
    </svg>
  );
}

// RAID Levels Comparison Diagram
export function RAIDLevelsDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="500" fill="#f5f5f5" />
      
      <text x="250" y="35" fontSize="16" fontWeight="bold" fill="#333">RAID Levels Comparison</text>
      
      {/* RAID 0 */}
      <rect x="50" y="60" width="220" height="180" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="5" />
      <text x="70" y="85" fontSize="13" fontWeight="bold" fill="#333">RAID 0 (Striping)</text>
      
      <rect x="65" y="100" width="45" height="30" fill="#2196f3" stroke="#333" strokeWidth="1" rx="2" />
      <text x="75" y="120" fontSize="10" fill="white" textAnchor="middle">D1</text>
      
      <rect x="120" y="100" width="45" height="30" fill="#2196f3" stroke="#333" strokeWidth="1" rx="2" />
      <text x="130" y="120" fontSize="10" fill="white" textAnchor="middle">D2</text>
      
      <rect x="175" y="100" width="45" height="30" fill="#2196f3" stroke="#333" strokeWidth="1" rx="2" />
      <text x="185" y="120" fontSize="10" fill="white" textAnchor="middle">D3</text>
      
      <text x="70" y="155" fontSize="11" fill="#333">✓ High Performance</text>
      <text x="70" y="175" fontSize="11" fill="#333">✗ No Redundancy</text>
      <text x="70" y="195" fontSize="11" fill="#333">✗ 1 disk failure = Total loss</text>
      <text x="70" y="215" fontSize="11" fill="#333">Capacity: 100% of total</text>
      
      {/* RAID 1 */}
      <rect x="310" y="60" width="220" height="180" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" rx="5" />
      <text x="330" y="85" fontSize="13" fontWeight="bold" fill="#333">RAID 1 (Mirroring)</text>
      
      <rect x="325" y="100" width="45" height="30" fill="#9c27b0" stroke="#333" strokeWidth="1" rx="2" />
      <text x="335" y="120" fontSize="10" fill="white" textAnchor="middle">D1</text>
      
      <rect x="380" y="100" width="45" height="30" fill="#9c27b0" stroke="#333" strokeWidth="1" rx="2" />
      <text x="390" y="120" fontSize="10" fill="white" textAnchor="middle">D1</text>
      
      <text x="330" y="155" fontSize="11" fill="#333">✓ Full Redundancy</text>
      <text x="330" y="175" fontSize="11" fill="#333">✓ 1 disk can fail</text>
      <text x="330" y="195" fontSize="11" fill="#333">✗ High cost (50% waste)</text>
      <text x="330" y="215" fontSize="11" fill="#333">Capacity: 50% of total</text>
      
      {/* RAID 5 */}
      <rect x="570" y="60" width="220" height="180" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="5" />
      <text x="590" y="85" fontSize="13" fontWeight="bold" fill="#333">RAID 5 (Striping+Parity)</text>
      
      <rect x="585" y="100" width="35" height="30" fill="#ff9800" stroke="#333" strokeWidth="1" rx="2" />
      <text x="595" y="120" fontSize="9" fill="white" textAnchor="middle">D1</text>
      
      <rect x="630" y="100" width="35" height="30" fill="#ff9800" stroke="#333" strokeWidth="1" rx="2" />
      <text x="640" y="120" fontSize="9" fill="white" textAnchor="middle">D2</text>
      
      <rect x="675" y="100" width="35" height="30" fill="#ffeb3b" stroke="#333" strokeWidth="1" rx="2" />
      <text x="685" y="120" fontSize="9" fill="#333" textAnchor="middle">P</text>
      
      <text x="590" y="155" fontSize="11" fill="#333">✓ Good Performance</text>
      <text x="590" y="175" fontSize="11" fill="#333">✓ 1 disk can fail</text>
      <text x="590" y="195" fontSize="11" fill="#333">✓ Efficient (33% overhead)</text>
      <text x="590" y="215" fontSize="11" fill="#333">Capacity: 67% of total</text>
      
      {/* Comparison Table */}
      <text x="50" y="290" fontSize="13" fontWeight="bold" fill="#333">Performance & Reliability Comparison:</text>
      
      <rect x="50" y="310" width="700" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1" rx="3" />
      <text x="70" y="335" fontSize="11" fill="#333">RAID 0: Fastest read/write, but NO protection - Use for temporary data only</text>
      
      <rect x="50" y="355" width="700" height="35" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="1" rx="3" />
      <text x="70" y="380" fontSize="11" fill="#333">RAID 1: Good protection, slower writes - Use for critical data (databases, logs)</text>
      
      <rect x="50" y="400" width="700" height="35" fill="#fff3e0" stroke="#ff9800" strokeWidth="1" rx="3" />
      <text x="70" y="425" fontSize="11" fill="#333">RAID 5: Best balance - Use for file servers, general storage (Most common)</text>
    </svg>
  );
}

// DNS Resolution Process Diagram
export function DNSResolutionDiagram() {
  return (
    <svg viewBox="0 0 800 450" className="w-full max-w-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="800" height="450" fill="#f5f5f5" />
      
      <text x="200" y="35" fontSize="16" fontWeight="bold" fill="#333">DNS Resolution Process</text>
      
      {/* Client */}
      <rect x="50" y="70" width="120" height="60" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="5" />
      <text x="70" y="100" fontSize="12" fontWeight="bold" fill="#333">Client</text>
      <text x="70" y="120" fontSize="10" fill="#666">www.contoso.com?</text>
      
      {/* DNS Resolver */}
      <rect x="250" y="70" width="120" height="60" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="5" />
      <text x="270" y="100" fontSize="12" fontWeight="bold" fill="#333">DNS Resolver</text>
      <text x="270" y="120" fontSize="10" fill="#666">(Recursive)</text>
      
      {/* Root Nameserver */}
      <rect x="450" y="70" width="120" height="60" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="5" />
      <text x="470" y="100" fontSize="12" fontWeight="bold" fill="#333">Root NS</text>
      <text x="470" y="120" fontSize="10" fill="#666">.com location</text>
      
      {/* TLD Nameserver */}
      <rect x="650" y="70" width="120" height="60" fill="#fff3e0" stroke="#ff9800" strokeWidth="2" rx="5" />
      <text x="670" y="100" fontSize="12" fontWeight="bold" fill="#333">TLD NS</text>
      <text x="670" y="120" fontSize="10" fill="#666">contoso.com NS</text>
      
      {/* Authoritative NS */}
      <rect x="350" y="220" width="120" height="60" fill="#f3e5f5" stroke="#9c27b0" strokeWidth="2" rx="5" />
      <text x="370" y="250" fontSize="12" fontWeight="bold" fill="#333">Auth NS</text>
      <text x="370" y="270" fontSize="10" fill="#666">192.168.1.5</text>
      
      {/* Arrows and Steps */}
      <path d="M 170 100 L 250 100" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <text x="200" y="90" fontSize="10" fill="#333">1. Query</text>
      
      <path d="M 370 100 L 450 100" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <text x="400" y="90" fontSize="10" fill="#333">2. Query</text>
      
      <path d="M 570 100 L 650 100" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <text x="600" y="90" fontSize="10" fill="#333">3. Query</text>
      
      <path d="M 710 130 L 410 220" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
      <text x="550" y="170" fontSize="10" fill="#333">4. Referral</text>
      
      <path d="M 410 220 L 310 130" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
      <text x="350" y="170" fontSize="10" fill="#333">5. Answer</text>
      
      <path d="M 250 130 L 110 130" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
      <text x="150" y="150" fontSize="10" fill="#333">6. Response</text>
      
      {/* Cache Info */}
      <rect x="50" y="320" width="700" height="100" fill="#f5f5f5" stroke="#999" strokeWidth="1" rx="5" />
      <text x="70" y="345" fontSize="12" fontWeight="bold" fill="#333">DNS Caching:</text>
      <text x="70" y="365" fontSize="11" fill="#666">• Resolver caches results for TTL (Time To Live) duration</text>
      <text x="70" y="385" fontSize="11" fill="#666">• Subsequent queries return cached answer (faster)</text>
      <text x="70" y="405" fontSize="11" fill="#666">• TTL typically 3600 seconds (1 hour) or more</text>
    </svg>
  );
}
