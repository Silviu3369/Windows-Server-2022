import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Download, RotateCcw } from 'lucide-react';

const competencyData = {
  level1: {
    name: 'Fundamentals (Nivel 1)',
    duration: '8 ore',
    modules: [
      {
        id: '1.1',
        name: 'Hardware Requirements',
        competencies: [
          'Explica diferențele între versiuni WS2022',
          'Identifica cerințe hardware minime și recomandate',
          'Verifica compatibilitate hardware cu PowerShell',
          'Alege edițiune corectă pentru scenariu',
          'Planifica implementare de server'
        ]
      },
      {
        id: '1.2',
        name: 'Installation',
        competencies: [
          'Descarca Windows Server 2022 ISO',
          'Crea mașină virtuală cu configurare corectă',
          'Executa instalare pas cu pas',
          'Verifica instalare cu PowerShell',
          'Rezolva probleme comune de instalare'
        ]
      },
      {
        id: '1.3',
        name: 'Network Configuration',
        competencies: [
          'Configura IP static pe server',
          'Configura DNS servers',
          'Configura default gateway',
          'Testa conectivitate cu ping și nslookup',
          'Rezolva probleme de rețea cu PowerShell'
        ]
      },
      {
        id: '1.4',
        name: 'Server Manager',
        competencies: [
          'Navigheaza Server Manager interface',
          'Adauga Roles și Features',
          'Configura remote management',
          'Monitorizeaza server health',
          'Utilizeaza best practices'
        ]
      },
      {
        id: '1.5',
        name: 'PowerShell Basics',
        competencies: [
          'Executa cmdlets PowerShell de bază',
          'Utilizeaza parameters și arguments',
          'Utilizeaza piping și filtering',
          'Scrie scripturi PowerShell simple',
          'Utilizeaza help system (Get-Help)'
        ]
      }
    ]
  },
  level2: {
    name: 'Core Services (Nivel 2)',
    duration: '21 ore',
    modules: [
      {
        id: '2.1',
        name: 'Active Directory Domain Services',
        competencies: [
          'Instaleaza AD DS role',
          'Promoveaza server la Domain Controller',
          'Verifica instalare AD cu Get-ADDomain',
          'Intelege FSMO roles',
          'Rezolva probleme de replicare AD'
        ]
      },
      {
        id: '2.2',
        name: 'AD Structure',
        competencies: [
          'Crea OU-uri în Active Directory',
          'Organizeaza resurse în OU-uri',
          'Intelege ierarhia Forest/Tree/Domain/OU',
          'Implementeaza strategie de delegare',
          'Aplica naming conventions'
        ]
      },
      {
        id: '2.3',
        name: 'Users and Groups',
        competencies: [
          'Crea utilizatori în AD',
          'Crea grupuri (Global, Domain Local)',
          'Adauga utilizatori în grupuri',
          'Configura proprietăți utilizator',
          'Rezolva probleme de membership'
        ]
      },
      {
        id: '2.4',
        name: 'DNS Server',
        competencies: [
          'Instaleaza DNS Server role',
          'Crea forward lookup zones',
          'Crea reverse lookup zones',
          'Adauga recorduri DNS (A, CNAME, SRV)',
          'Troubleshoot DNS cu nslookup și dcdiag'
        ]
      },
      {
        id: '2.5',
        name: 'DHCP Server',
        competencies: [
          'Instaleaza DHCP Server role',
          'Crea DHCP scopes',
          'Configura DHCP options',
          'Crea DHCP reservations',
          'Troubleshoot DHCP cu ipconfig'
        ]
      },
      {
        id: '2.6',
        name: 'File Server',
        competencies: [
          'Instaleaza File Server role',
          'Crea partajări cu permisiuni',
          'Configura home directories',
          'Implementeaza Access-Based Enumeration',
          'Rezolva probleme de acces'
        ]
      },
      {
        id: '2.7',
        name: 'NTFS Permissions',
        competencies: [
          'Intelege diferența NTFS vs Share',
          'Calculeaza permisiuni efective',
          'Configura inheritance și blocking',
          'Aplica special permissions',
          'Troubleshoot permission issues'
        ]
      },
      {
        id: '2.8',
        name: 'Group Policy Objects',
        competencies: [
          'Instaleaza GPMC',
          'Crea GPO-uri',
          'Leaga GPO-uri la OU-uri',
          'Intelege LSDOU processing order',
          'Troubleshoot GPO cu gpupdate și gpresult'
        ]
      },
      {
        id: '2.9',
        name: 'Security Policies',
        competencies: [
          'Configura password policies',
          'Configura account lockout policies',
          'Configura audit policies',
          'Configura user rights assignment',
          'Verifica effective policies cu gpresult'
        ]
      }
    ]
  }
};

interface CompetencyState {
  [key: string]: boolean;
}

export default function CompetencyChecklist() {
  const [level, setLevel] = useState<'level1' | 'level2'>('level1');
  const [checked, setChecked] = useState<CompetencyState>({});

  const currentLevel = competencyData[level];
  const totalCompetencies = currentLevel.modules.reduce((sum, m) => sum + m.competencies.length, 0);
  const completedCompetencies = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((completedCompetencies / totalCompetencies) * 100);

  const toggleCompetency = (id: string) => {
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    setChecked({});
  };

  const getLevelBadge = () => {
    if (percentage < 50) return { text: 'Beginner', color: 'bg-red-500' };
    if (percentage < 75) return { text: 'Intermediate', color: 'bg-yellow-500' };
    if (percentage < 90) return { text: 'Advanced', color: 'bg-blue-500' };
    return { text: 'Expert', color: 'bg-green-500' };
  };

  const badge = getLevelBadge();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Competency Checklist</h1>
        <p className="text-gray-600">Track your learning progress and verify your competencies</p>
      </div>

      {/* Level Selector */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={level === 'level1' ? 'default' : 'outline'}
          onClick={() => setLevel('level1')}
        >
          Level 1: Fundamentals (8h)
        </Button>
        <Button
          variant={level === 'level2' ? 'default' : 'outline'}
          onClick={() => setLevel('level2')}
        >
          Level 2: Core Services (21h)
        </Button>
      </div>

      {/* Progress Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Completed: {completedCompetencies}/{totalCompetencies}</p>
              <p className="text-3xl font-bold">{percentage}%</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-white font-bold ${badge.color}`}>
              {badge.text}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Competencies */}
      <div className="space-y-6">
        {currentLevel.modules.map(module => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="text-xl">{module.id}: {module.name}</CardTitle>
              <CardDescription>{module.competencies.length} competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {module.competencies.map((comp, idx) => {
                  const compId = `${module.id}-${idx}`;
                  const isChecked = checked[compId] || false;
                  return (
                    <div
                      key={compId}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleCompetency(compId)}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={isChecked ? 'line-through text-gray-400' : 'text-gray-700'}>
                        {comp}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={resetChecklist}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Checklist
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export as PDF
        </Button>
      </div>
    </div>
  );
}
