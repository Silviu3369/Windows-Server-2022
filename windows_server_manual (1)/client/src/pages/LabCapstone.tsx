import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock, Users, Server, Download } from 'lucide-react';

const labCapstoneData = {
  scenario: 'Acme Corporation',
  description: 'Enterprise infrastructure with 3 departments, 2 locations, 50 users',
  duration: '16 hours',
  phases: [
    {
      id: 1,
      name: 'Infrastructure Setup',
      duration: '4 hours',
      tasks: [
        { id: '1.1', title: 'Install DC01', status: 'pending' },
        { id: '1.2', title: 'Configure AD Structure', status: 'pending' },
        { id: '1.3', title: 'Create Users and Groups', status: 'pending' },
        { id: '1.4', title: 'Configure DNS', status: 'pending' },
        { id: '1.5', title: 'Configure DHCP', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'File Server Setup',
      duration: '3 hours',
      tasks: [
        { id: '2.1', title: 'Install FileServer01', status: 'pending' },
        { id: '2.2', title: 'Configure File Shares', status: 'pending' },
        { id: '2.3', title: 'Configure Shadow Copies', status: 'pending' },
        { id: '2.4', title: 'Configure DFS', status: 'pending' }
      ]
    },
    {
      id: 3,
      name: 'Print Server Setup',
      duration: '2 hours',
      tasks: [
        { id: '3.1', title: 'Install PrintServer01', status: 'pending' },
        { id: '3.2', title: 'Configure Printers', status: 'pending' },
        { id: '3.3', title: 'Configure Print Pooling', status: 'pending' }
      ]
    },
    {
      id: 4,
      name: 'Group Policy Configuration',
      duration: '2 hours',
      tasks: [
        { id: '4.1', title: 'Create Security Policies', status: 'pending' },
        { id: '4.2', title: 'Create User Policies', status: 'pending' },
        { id: '4.3', title: 'Link GPOs', status: 'pending' }
      ]
    },
    {
      id: 5,
      name: 'Client Integration',
      duration: '2 hours',
      tasks: [
        { id: '5.1', title: 'Join Clients to Domain', status: 'pending' },
        { id: '5.2', title: 'Test User Logon', status: 'pending' },
        { id: '5.3', title: 'Test Printer Access', status: 'pending' }
      ]
    },
    {
      id: 6,
      name: 'Branch Office Setup',
      duration: '2 hours',
      tasks: [
        { id: '6.1', title: 'Install DC02 (Replica)', status: 'pending' },
        { id: '6.2', title: 'Install FileServer02 (DFS Replica)', status: 'pending' },
        { id: '6.3', title: 'Join Branch Clients', status: 'pending' }
      ]
    },
    {
      id: 7,
      name: 'Monitoring & Troubleshooting',
      duration: '2 hours',
      tasks: [
        { id: '7.1', title: 'Configure Monitoring', status: 'pending' },
        { id: '7.2', title: 'Troubleshooting Scenarios', status: 'pending' },
        { id: '7.3', title: 'Verify Infrastructure', status: 'pending' }
      ]
    }
  ]
};

interface TaskStatus {
  [key: string]: 'pending' | 'completed' | 'failed';
}

export default function LabCapstone() {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>({});
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const toggleTask = (taskId: string) => {
    setTaskStatus(prev => ({
      ...prev,
      [taskId]: prev[taskId] === 'completed' ? 'pending' : 'completed'
    }));
  };

  const totalTasks = labCapstoneData.phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = Object.values(taskStatus).filter(s => s === 'completed').length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Lab Capstone: {labCapstoneData.scenario}</h1>
        <p className="text-gray-600 mb-4">{labCapstoneData.description}</p>
        
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{labCapstoneData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>50 Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            <span>4 Servers</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Lab Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">Completed: {completedTasks}/{totalTasks} tasks</p>
            <p className="text-3xl font-bold">{completionPercentage}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Phases */}
      <div className="space-y-4">
        {labCapstoneData.phases.map(phase => {
          const phaseTasks = phase.tasks;
          const phaseCompleted = phaseTasks.filter(t => taskStatus[t.id] === 'completed').length;
          const phasePercentage = Math.round((phaseCompleted / phaseTasks.length) * 100);
          const isExpanded = expandedPhase === phase.id;

          return (
            <Card key={phase.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    Phase {phase.id}: {phase.name}
                  </h3>
                  <p className="text-sm text-gray-600">{phaseCompleted}/{phaseTasks.length} tasks completed</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{phasePercentage}%</p>
                    <p className="text-xs text-gray-600">{phase.duration}</p>
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${phasePercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {isExpanded && (
                <CardContent className="pt-0 border-t">
                  <div className="mt-4 space-y-2">
                    {phaseTasks.map(task => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleTask(task.id)}
                      >
                        {taskStatus[task.id] === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={taskStatus[task.id] === 'completed' ? 'line-through text-gray-400' : ''}>
                          {task.id}: {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Download */}
      <div className="mt-8 flex gap-4">
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Lab Guide (PDF)
        </Button>
        <Button variant="outline">
          View Troubleshooting Guide
        </Button>
      </div>

      {/* Success Criteria */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Success Criteria</CardTitle>
          <CardDescription>Minimum 80/100 to pass</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Infrastructure Setup: 15 pts</p>
              <p className="font-semibold">Active Directory: 15 pts</p>
              <p className="font-semibold">DNS & DHCP: 15 pts</p>
              <p className="font-semibold">File Server: 15 pts</p>
            </div>
            <div>
              <p className="font-semibold">Print Server: 10 pts</p>
              <p className="font-semibold">Group Policy: 10 pts</p>
              <p className="font-semibold">Client Integration: 10 pts</p>
              <p className="font-semibold">Troubleshooting: 10 pts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
