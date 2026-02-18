import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import allModulesData from "@/lib/allModulesData.json";
import { moduleVideos } from "@/lib/moduleEnhancements";

export default function Home() {
  const [, setLocation] = useLocation();
  const moduleCount = allModulesData.length;
  const quizCount = allModulesData.reduce((acc, item) => acc + (item.quizzes?.length || 0), 0);
  const videoCount = Object.values(moduleVideos).reduce((acc, items) => acc + items.length, 0);

  return (
    <Layout>
      <div className="space-y-10">
        <div className="space-y-4 text-center py-6">
          <h1 className="text-4xl font-bold text-foreground">Windows Server 2022 Manual</h1>
          <p className="text-sm font-semibold text-blue-700">Deployment marker: 2026-02-18 / build v2</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Complete training manual aligned with the course PDFs, Microsoft Learn documentation, practical labs, quizzes, and module-specific video references.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">{moduleCount}</div>
            <p className="text-sm text-muted-foreground">Modules</p>
          </Card>
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">{quizCount}</div>
            <p className="text-sm text-muted-foreground">Quiz Questions</p>
          </Card>
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">{videoCount}</div>
            <p className="text-sm text-muted-foreground">Video Links</p>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Start with the Learning Path</h2>
          <p className="text-blue-700 mb-4">Follow modules in order for progressive coverage from fundamentals to enterprise operations.</p>
          <Button onClick={() => setLocation("/learning-path")} className="bg-blue-600 hover:bg-blue-700">
            Open Learning Path
          </Button>
        </div>
      </div>
    </Layout>
  );
}
