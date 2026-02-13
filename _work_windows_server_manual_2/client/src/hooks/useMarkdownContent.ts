import { useState, useEffect } from 'react';

export interface MarkdownSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  loading: boolean;
  error: string | null;
}

export function useMarkdownContent(sectionId: string): MarkdownSection {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMarkdown() {
      setLoading(true);
      setError(null);
      
      try {
        // Încarcă fișierul Markdown din folderul content/sections/
        const response = await fetch(`/src/content/sections/${sectionId}.md`);
        
        if (!response.ok) {
          throw new Error(`Failed to load section: ${sectionId}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(`Error loading markdown for ${sectionId}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setContent('# Error\n\nFailed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadMarkdown();
  }, [sectionId]);

  return {
    id: sectionId,
    title: '', // Va fi extras din metadata
    icon: '', // Va fi extras din metadata
    content,
    loading,
    error
  };
}
