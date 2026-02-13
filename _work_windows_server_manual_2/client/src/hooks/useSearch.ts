import { useMemo } from "react";
import { manualSections } from "@/lib/manualContent";

export function useSearch(query: string) {
  return useMemo(() => {
    if (!query.trim()) {
      return manualSections;
    }

    const lowerQuery = query.toLowerCase();

    return manualSections.filter((section) => {
      const titleMatch = section.title.toLowerCase().includes(lowerQuery);
      const descriptionMatch = section.description.toLowerCase().includes(lowerQuery);
      const contentMatch = section.content.toLowerCase().includes(lowerQuery);

      return titleMatch || descriptionMatch || contentMatch;
    });
  }, [query]);
}
