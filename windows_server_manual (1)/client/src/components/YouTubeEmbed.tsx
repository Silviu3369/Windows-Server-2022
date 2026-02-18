import React from 'react';
import { Card } from '@/components/ui/card';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
  width?: string;
  height?: string;
}

export default function YouTubeEmbed({
  videoId,
  title,
  description,
  width = '100%',
  height = '400px'
}: YouTubeEmbedProps) {
  return (
    <Card className="p-4 md:p-6 bg-card border-border my-6">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </Card>
  );
}
