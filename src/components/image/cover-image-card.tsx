'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploadSingle } from './image-upload-single';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface CoverImageCardProps {
  imageUrl?: string;
  onImageChange: (imageUrl: string | null, imageId?: string | null) => void;
  className?: string;
}

export function CoverImageCard({ 
  imageUrl, 
  onImageChange, 
  className 
}: CoverImageCardProps) {
  const handleImageUpload = (newImageUrl: string, imageId?: string) => {
    onImageChange(newImageUrl, imageId);
  };

  const handleRemoveImage = () => {
    onImageChange(null, null);
  };

  return (
    <div className={className}>
      {imageUrl ? (
        // Show existing image
        <Card className="aspect-[16/9] overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-200">
          <CardContent className="p-0 h-full relative">
            <img
              src={imageUrl}
              alt="Cover image"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-image.png'; // Fallback image
              }}
            />
            
            {/* Overlay with actions - Show on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-200">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                {/* Replace Image */}
                <ImageUploadSingle onImageUploaded={handleImageUpload}>
                  <Button variant="secondary" size="sm">
                    Change Image
                  </Button>
                </ImageUploadSingle>
                
                {/* Remove Image */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            
            {/* Cover Image Label */}
            <div className="absolute top-2 left-2">
              <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                Cover Image
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Show upload placeholder
        <Card className="aspect-[16/9] border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all duration-200">
          <CardContent className="p-0 h-full flex items-center justify-center">
            <ImageUploadSingle onImageUploaded={handleImageUpload}>
              <div className="flex flex-col items-center justify-center text-gray-500 hover:text-primary transition-colors">
                <PlusIcon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Add Cover Image</span>
                <span className="text-xs text-gray-400 mt-1">16:9 aspect ratio recommended</span>
              </div>
            </ImageUploadSingle>
          </CardContent>
        </Card>
      )}
    </div>
  );
}