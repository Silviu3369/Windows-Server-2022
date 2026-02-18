import React from 'react';
import { BookOpen, FileText, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'guide' | 'reference';
  url: string;
  size?: string;
  downloadable?: boolean;
}

const resources: Resource[] = [
  {
    id: 'phase-1-audit',
    title: 'Phase 1: Complete Audit Report',
    description: 'Comprehensive audit identifying all gaps in the manual with status and priorities',
    type: 'document',
    url: '/docs/PHASE_1_COMPLETE_AUDIT.md',
    size: '19 KB',
    downloadable: true
  },
  {
    id: 'phase-2-curriculum',
    title: 'Phase 2: Curriculum Map & Gap Analysis',
    description: 'Detailed roadmap with 4 learning levels, 18 modules, and implementation plan',
    type: 'document',
    url: '/docs/PHASE_2_CURRICULUM_MAP_AND_GAP_ANALYSIS.md',
    size: '29 KB',
    downloadable: true
  },
  {
    id: 'phase-3-content',
    title: 'Phase 3: Critical Content Implementation',
    description: 'Complete content for 10 modules with procedures, labs, diagrams, and quizzes',
    type: 'document',
    url: '/docs/PHASE_3_CRITICAL_CONTENT_IMPLEMENTATION.md',
    size: '23 KB',
    downloadable: true
  },
  {
    id: 'phase-e-capstone',
    title: 'Phase E: Standardization & Capstone Lab',
    description: 'Competency checklists, capstone lab scenario, and standardization guidelines',
    type: 'document',
    url: '/docs/PHASE_E_STANDARDIZATION_AND_CAPSTONE.md',
    size: '27 KB',
    downloadable: true
  }
];

const referenceLinks = [
  {
    title: 'Microsoft Learn',
    description: 'Official Microsoft training and documentation',
    url: 'https://learn.microsoft.com/en-us/windows-server/',
    icon: '📚'
  },
  {
    title: 'Microsoft Docs',
    description: 'Comprehensive technical documentation',
    url: 'https://docs.microsoft.com/en-us/windows-server/',
    icon: '📖'
  },
  {
    title: 'TechNet',
    description: 'Technical community and resources',
    url: 'https://technet.microsoft.com/',
    icon: '🔧'
  }
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            Learning Resources
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Comprehensive documentation, guides, and reference materials for Windows Server 2022 training
          </p>
        </div>

        {/* Documentation Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {resource.size && <span>{resource.size}</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </a>
                      </Button>
                      {resource.downloadable && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                        >
                          <a href={resource.url} download>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reference Links Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            External References
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {referenceLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-3xl mb-2">{link.icon}</div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="default"
                    className="w-full"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Manual Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">18</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Words</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Diagrams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">80+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Hours Training</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
