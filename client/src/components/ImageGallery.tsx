import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
            />
            {image.caption && (
              <p className="text-sm text-muted-foreground p-3 bg-muted">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => {
        if (!open) setSelectedIndex(null);
      }}>
        <DialogContent className="max-w-4xl">
          {selectedIndex !== null && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevious}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              {images[selectedIndex].caption && (
                <p className="text-sm text-muted-foreground text-center">
                  {images[selectedIndex].caption}
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
