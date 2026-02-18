import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import allModulesData from "@/lib/allModulesData.json";
import { pdfTopicCountByModule } from "@/lib/pdfTopicCoverage";

interface Module {
  id: string;
  title: string;
  level: string;
  duration: string;
  objectives: string[];
}

export default function LearningPath() {
  const [, setLocation] = useLocation();
  const modules = allModulesData as Module[];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Path</h1>
          <p className="text-muted-foreground">Complete progression from setup, identity, networking, and operations to capstone implementation.</p>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <Card key={module.id} className="p-5 border-border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-slate-100 border">{module.level}</span>
                    <span className="text-xs text-muted-foreground">{module.duration}</span>
                  </div>
                  <h2 className="text-lg font-semibold">
                    {module.id} - {module.title}
                  </h2>
                  <p className="text-xs text-slate-500">
                    PDF topics mapped from cursus: {pdfTopicCountByModule[module.id] || 0}
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {module.objectives.slice(0, 3).map((objective, idx) => (
                      <li key={idx}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Button onClick={() => setLocation(`/module/${module.id}`)}>Open Module</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
