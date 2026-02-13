import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSearch } from "@/hooks/useSearch";
import { useLocation } from "wouter";
import { manualSections } from "@/lib/manualContent";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleSelectSection = (sectionId: string) => {
    setOpen(false);
    setLocation(`/section/${sectionId}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Căutare...</span>
        <span className="sm:hidden">Căutare</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Căutare în manual</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cauta secțiuni, comenzi, concepte..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                results.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSelectSection(section.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {section.description}
                    </div>
                  </button>
                ))
              ) : query.trim() ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nicio secțiune găsită pentru "{query}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {manualSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSelectSection(section.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="font-medium text-sm">{section.title}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
