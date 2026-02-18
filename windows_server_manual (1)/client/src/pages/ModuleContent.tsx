import React, { useMemo, useState } from "react";
import { useRoute } from "wouter";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  PlayCircle,
  Wrench,
  Zap
} from "lucide-react";
import Layout from "@/components/Layout";
import allModulesData from "@/lib/allModulesData.json";
import { moduleReferences, moduleVideos } from "@/lib/moduleEnhancements";

interface Module {
  id: string;
  title: string;
  level: string;
  duration: string;
  objectives: string[];
  prerequisites: string[];
  theory: string;
  procedures: Array<{
    title: string;
    steps?: string[];
    powershellCommands?: string[];
    cmdCommands?: string[];
    verification?: string[];
  }>;
  diagrams: string[];
  labs: Array<{
    id: string;
    title: string;
    duration: string;
    objectives: string[];
    procedures: string[];
    verification: string[];
  }>;
  quizzes: Array<{
    id?: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  competencies: string[];
  troubleshooting: Array<{
    issue: string;
    solution: string;
  }>;
  sources: string[];
}

function Section({
  title,
  icon,
  open,
  onToggle,
  children
}: {
  title: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
      </button>
      {open && <div className="border-t border-gray-200 p-4">{children}</div>}
    </div>
  );
}

export default function ModuleContent() {
  const [, params] = useRoute("/module/:id");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "objectives",
    "theory",
    "procedures",
    "videos"
  ]);

  const moduleId = params?.id;
  const module: Module | undefined = useMemo(() => {
    return (allModulesData as Module[]).find((m) => m.id === moduleId);
  }, [moduleId]);

  const videos = moduleId ? moduleVideos[moduleId] || [] : [];
  const refs = moduleId ? moduleReferences[moduleId] : undefined;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]));
  };

  if (!module) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Module not found</h1>
            <p className="text-gray-600 mt-2">Module {moduleId} does not exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-2 md:p-4 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{module.level}</span>
                <span className="text-gray-600 text-sm">{module.duration}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
              <p className="text-gray-600">Module {module.id}</p>
            </div>
          </div>
        </div>

        <Section
          title="Objectives"
          icon={<Zap className="w-5 h-5 text-blue-600" />}
          open={expandedSections.includes("objectives")}
          onToggle={() => toggleSection("objectives")}
        >
          <div className="space-y-2">
            {module.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{obj}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Theory"
          icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
          open={expandedSections.includes("theory")}
          onToggle={() => toggleSection("theory")}
        >
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">{module.theory}</div>
        </Section>

        <Section
          title="Prerequisites"
          icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
          open={expandedSections.includes("prerequisites")}
          onToggle={() => toggleSection("prerequisites")}
        >
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {module.prerequisites.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section
          title="Practical Steps (GUI / PowerShell / CMD)"
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          open={expandedSections.includes("procedures")}
          onToggle={() => toggleSection("procedures")}
        >
          <div className="space-y-6">
            {module.procedures.map((proc, idx) => (
              <div key={idx} className="space-y-3 pb-4 border-b border-gray-100 last:border-b-0">
                <h3 className="font-semibold text-gray-900">{proc.title}</h3>
                {!!proc.steps?.length && (
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    {proc.steps.map((step, sidx) => (
                      <li key={sidx}>{step}</li>
                    ))}
                  </ol>
                )}
                {!!proc.powershellCommands?.length && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">PowerShell</h4>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">{proc.powershellCommands.join("\n")}</pre>
                  </div>
                )}
                {!!proc.cmdCommands?.length && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Command Prompt</h4>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">{proc.cmdCommands.join("\n")}</pre>
                  </div>
                )}
                {!!proc.verification?.length && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Verification</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {proc.verification.map((v, vidx) => (
                        <li key={vidx}>{v}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Verification and Troubleshooting"
          icon={<Wrench className="w-5 h-5 text-orange-600" />}
          open={expandedSections.includes("troubleshooting")}
          onToggle={() => toggleSection("troubleshooting")}
        >
          <div className="space-y-4">
            {module.troubleshooting.map((item, idx) => (
              <div key={idx} className="rounded-md border border-orange-200 bg-orange-50 p-3">
                <p className="font-medium text-gray-900">{item.issue}</p>
                <p className="text-sm text-gray-700 mt-1">{item.solution}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Lab Practice"
          icon={<ClipboardCheck className="w-5 h-5 text-teal-600" />}
          open={expandedSections.includes("labs")}
          onToggle={() => toggleSection("labs")}
        >
          <div className="space-y-6">
            {module.labs.map((lab, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{lab.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Duration: {lab.duration}</p>
                <h4 className="text-sm font-medium text-gray-700 mt-3">Objectives</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {lab.objectives.map((o, oidx) => (
                    <li key={oidx}>{o}</li>
                  ))}
                </ul>
                <h4 className="text-sm font-medium text-gray-700 mt-3">Tasks</h4>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                  {lab.procedures.map((p, pidx) => (
                    <li key={pidx}>{p}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title={`Quiz (${module.quizzes.length} questions)`}
          icon={<CheckCircle2 className="w-5 h-5 text-purple-600" />}
          open={expandedSections.includes("quiz")}
          onToggle={() => toggleSection("quiz")}
        >
          <div className="space-y-6">
            {module.quizzes.map((quiz, idx) => (
              <div key={idx} className="space-y-3 pb-4 border-b border-gray-200 last:border-b-0">
                <p className="font-medium text-gray-900">
                  Q{idx + 1}: {quiz.question}
                </p>
                <div className="space-y-2">
                  {quiz.options.map((option, oidx) => (
                    <div key={oidx} className={`p-2 rounded border ${oidx === quiz.correctAnswer ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-300"}`}>
                      <p className="text-sm text-gray-700">
                        {String.fromCharCode(65 + oidx)}) {option} {oidx === quiz.correctAnswer ? "✓" : ""}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">{quiz.explanation}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Video"
          icon={<PlayCircle className="w-5 h-5 text-red-600" />}
          open={expandedSections.includes("videos")}
          onToggle={() => toggleSection("videos")}
        >
          {videos.length > 0 ? (
            <ul className="space-y-3">
              {videos.map((video, idx) => (
                <li key={idx} className="rounded-md border border-red-200 bg-red-50 p-3">
                  <a href={video.url} target="_blank" rel="noreferrer" className="font-medium text-red-700 hover:underline">
                    {video.title}
                  </a>
                  <p className="text-sm text-gray-700">Channel: {video.channel}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-amber-700 font-medium">VIDEO_LINK_NEEDED</p>
          )}
        </Section>

        <Section
          title="Sources"
          icon={<BookOpen className="w-5 h-5 text-slate-700" />}
          open={expandedSections.includes("sources")}
          onToggle={() => toggleSection("sources")}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Module Sources</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {module.sources.map((source, idx) => (
                  <li key={idx}>{source}</li>
                ))}
              </ul>
            </div>
            {refs && (
              <>
                <div>
                  <h4 className="font-medium text-gray-900">Course PDFs</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {refs.pdf.map((pdf, idx) => (
                      <li key={idx}>{pdf}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Microsoft Official Documentation</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {refs.microsoft.map((url, idx) => (
                      <li key={idx}>
                        <a href={url} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
