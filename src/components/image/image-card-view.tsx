'use client';

import { useState } from 'react';
import { Badge } from '@/components/button/badge';
import { Button } from '@/components/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatBytes, formatDate } from '@/lib/utils';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useUsersStore } from '@/lib/store/users';

interface Image {
  id: string;
  filename: string;
  s3Key: string;
  s3Url: string;
  thumbnailUrl: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
  usageCount: number;
  isActive: boolean;
  category: string;
  tags: string[];
  altText: string;
  uploadedBy: string; // User ID only
  createdAt: string;
  updatedAt: string;
}

interface ImageCardViewProps {
  images: Image[];
  onImageClick?: (image: Image) => void;
  onDelete?: (image: Image) => void;
  onToggleStatus?: (image: Image) => void;
}

export function ImageCardView({
  images,
  onImageClick,
  onDelete,
  onToggleStatus
}: ImageCardViewProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { users } = useUsersStore();

  // Helper function to get user name by ID
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? (user.name || user.email || 'Unknown User') : 'Unknown User';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative aspect-square group cursor-pointer rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-200"
          onMouseEnter={() => setHoveredCard(image.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onImageClick?.(image)}
        >
          {/* Image */}
          <img
            src={image.thumbnailUrl || image.s3Url}
            alt={image.altText || image.filename}
            className="w-full h-full object-cover"
          />

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge variant={image.isActive ? 'default' : 'destructive'} className="text-xs">
              {image.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>

          {/* Usage Count Badge */}
          {image.usageCount > 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                {image.usageCount} uses
              </Badge>
            </div>
          )}

          {/* Hover Overlay */}
          {hoveredCard === image.id && (
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-3 text-white text-xs">
              {/* Top Info */}
              <div className="space-y-1">
                <p className="font-medium truncate">{image.filename}</p>
                <p className="text-gray-300">{formatBytes(image.size)}</p>
                <Badge variant="outline" className="text-xs border-white/30 text-white">
                  {image.category}
                </Badge>
              </div>

              {/* Bottom Info */}
              <div className="space-y-1">
                <p className="text-gray-300">
                  By: {getUserName(image.uploadedBy)}
                </p>
                <p className="text-gray-300">{formatDate(image.createdAt)}</p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onImageClick?.(image);
                          }}
                        >
                          <EyeIcon className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleStatus?.(image);
                          }}
                        >
                          {image.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{image.isActive ? 'Deactivate' : 'Activate'} image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          disabled={image.usageCount > 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(image);
                          }}
                        >
                          <TrashIcon className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{image.usageCount > 0 ? 'Cannot delete (in use)' : 'Delete image'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}