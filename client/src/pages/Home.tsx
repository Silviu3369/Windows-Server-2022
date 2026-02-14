import { manualSections } from "@/lib/manualContent";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import * as Icons from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      BookOpen: Icons.BookOpen,
      Server: Icons.Server,
      Download: Icons.Download,
      Settings: Icons.Settings,
      Terminal: Icons.Terminal,
      Network: Icons.Network,
      Database: Icons.Database,
      FileText: Icons.FileText,
      Users: Icons.Users,
      Wrench: Icons.Wrench,
    };
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 text-center py-8">
          <h1 className="text-5xl font-bold text-foreground">
            Windows Server 2022
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manual Complet de Învățare la Nivel Enterprise
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Ghid pas cu pas pentru instalarea, configurarea și administrarea Windows Server 2022 
            în mediu virtual, acoperind GUI, Command Prompt, PowerShell, networking, servicii enterprise 
            și integrarea clienților Windows 11.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">10</div>
            <p className="text-sm text-muted-foreground">Secțiuni Principale</p>
          </Card>
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <p className="text-sm text-muted-foreground">Metode de Administrare</p>
          </Card>
          <Card className="p-6 text-center bg-card border-border">
            <div className="text-3xl font-bold text-primary mb-2">Enterprise</div>
            <p className="text-sm text-muted-foreground">Nivel de Dificultate</p>
          </Card>
        </div>

        {/* Sections Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Cuprinsul Manualului</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manualSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setLocation(`/section/${section.id}`)}
                className="block text-left"
              >
                <Card className="p-6 bg-card border-border hover:border-primary hover:shadow-lg transition-all cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">
                      {getIcon(section.icon)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Gata să Începi?
          </h2>
          <p className="text-muted-foreground mb-6">
            Selectează o secțiune din meniu pentru a continua cu învățarea.
          </p>
          <Button
            size="lg"
            onClick={() => setLocation(`/section/${manualSections[0].id}`)}
          >
            Începe cu Introducerea
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Ce Vei Învăța</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Instalare & Configurare</h3>
              <p className="text-sm text-muted-foreground">
                Instalarea Windows Server 2022 în mediu virtual și configurarea inițială completă.
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Trei Metode de Administrare</h3>
              <p className="text-sm text-muted-foreground">
                GUI (Server Manager), Command Prompt și PowerShell cu exemple practice.
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Networking Avansat</h3>
              <p className="text-sm text-muted-foreground">
                Configurarea serverului ca router (NAT), conectivitate internet și rețea internă.
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Servicii Enterprise</h3>
              <p className="text-sm text-muted-foreground">
                Active Directory, DNS, DHCP și alte servicii core pentru mediu enterprise.
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">File Services & Securitate</h3>
              <p className="text-sm text-muted-foreground">
                Partajări de fișiere, permisiuni NTFS și best practices de securitate.
              </p>
            </Card>
            <Card className="p-4 bg-card border-border">
              <h3 className="font-semibold text-foreground mb-2">Integrare Client Windows 11</h3>
              <p className="text-sm text-muted-foreground">
                Alăturarea clienților Windows 11 la domeniu și management centralizat.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
