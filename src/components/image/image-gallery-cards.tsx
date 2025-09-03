'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/button/button';
import { ImageUploadSingle } from './image-upload-single';
import { Badge } from '@/components/button/badge';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface ImageGalleryCardsProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  className?: string;
}

export function ImageGalleryCards({
  images,
  onImagesChange,
  className
}: ImageGalleryCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const addImage = (imageUrl: string, imageId?: string) => {
    onImagesChange([...images, imageUrl]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Existing Images */}
        {images.map((imageUrl, index) => (
          <Card
            key={index}
            className="relative aspect-square overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-200"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CardContent className="p-0 h-full">
              <div className="relative h-full">
                <img
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-image.png'; // Fallback image
                  }}
                />

                {/* Image Number Badge */}
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                </div>

                {/* Delete Button - Show on Hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="opacity-90 hover:opacity-100"
                    >
                      <TrashIcon className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Image Card */}
        <Card className="aspect-square border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all duration-200">
          <CardContent className="p-0 h-full flex items-center justify-center">
            <ImageUploadSingle onImageUploaded={addImage}>
              <div className="flex flex-col items-center justify-center text-gray-500 hover:text-primary transition-colors">
                <PlusIcon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Add Image</span>
              </div>
            </ImageUploadSingle>
          </CardContent>
        </Card>
      </div>

      {/* Gallery Info */}
      {images.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          {images.length} image{images.length !== 1 ? 's' : ''} in gallery
        </div>
      )}
    </div>
  );
}