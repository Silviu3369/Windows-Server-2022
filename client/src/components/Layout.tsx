import { useState } from "react";
import { Menu, X, Moon, Sun, Home } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import SearchDialog from "./SearchDialog";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex flex-col gap-4 h-auto px-4 sm:px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:h-16 sm:py-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Windows Server 2022
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Manual Enterprise</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 sm:flex-none sm:w-64">
                <SearchDialog />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocation("/")}
                title="Acasă"
              >
                <Home className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={theme === "light" ? "Mod întunecat" : "Mod luminos"}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
