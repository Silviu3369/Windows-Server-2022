import allModulesData from "@/lib/allModulesData.json";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ListTree, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Module {
  id: string;
  title: string;
  level: string;
}

const modules = allModulesData as Module[];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [, setLocation] = useLocation();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 z-50 lg:z-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <div>
              <h2 className="font-bold text-sidebar-foreground">Curriculum</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            <button
              onClick={() => {
                setLocation("/");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group text-left"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Home</span>
            </button>
            <button
              onClick={() => {
                setLocation("/learning-path");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group text-left mb-2 border-b border-sidebar-border pb-3"
            >
              <ListTree className="w-4 h-4" />
              <span className="font-medium">Learning Path</span>
            </button>

            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  setLocation(`/module/${module.id}`);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <span className="font-semibold">{module.id}</span> {module.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
