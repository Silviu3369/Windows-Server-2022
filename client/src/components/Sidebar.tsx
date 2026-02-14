import { manualSections } from "@/lib/manualContent";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { X, Home } from "lucide-react";
import * as Icons from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
      PlayCircle: Icons.PlayCircle,
      Lightbulb: Icons.Lightbulb,
      AlertCircle: Icons.AlertCircle,
      Info: Icons.Info,
    };
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 z-50 lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <div>
              <h2 className="font-bold text-sidebar-foreground">Cuprins</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {/* Home Button */}
            <button
              onClick={() => {
                setLocation("/");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group text-left mb-2 border-b border-sidebar-border pb-3"
            >
              <span className="text-sidebar-primary group-hover:text-sidebar-primary-foreground">
                <Home className="w-4 h-4" />
              </span>
              <span className="font-medium">Acasă</span>
            </button>
            {manualSections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setLocation(`/section/${section.id}`);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group text-left"
              >
                <span className="text-sidebar-primary group-hover:text-sidebar-primary-foreground">
                  {getIcon(section.icon)}
                </span>
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <p className="text-xs text-sidebar-foreground/60">
              Windows Server 2022 - Manual Enterprise
            </p>
            <p className="text-xs text-sidebar-foreground/60 mt-1">
              v1.0 | 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
