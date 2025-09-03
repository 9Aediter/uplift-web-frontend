'use client';

import { useEffect } from 'react';
import { ImageCardView } from './image/image-card-view';

interface ImageDataCardViewProps {
  data: any[];
  selectedRows: Record<string, boolean>;
  onRowSelect: (id: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
}

// Transform data back to image format for ImageCardView
function transformDataToImages(data: any[]) {
  return data.map(item => ({
    id: item.id,
    filename: item.header || 'unknown.jpg',
    originalName: item.header || 'Unknown',
    url: '', // We'll need to get this from somewhere
    key: '',
    s3Key: `uploads/${item.id}`,
    s3Url: '',
    thumbnailUrl: '',
    contentType: 'image/jpeg',
    mimeType: 'image/jpeg',
    size: 0,
    width: 1920,
    height: 1080,
    uploadType: item.type || 'general',
    category: 'general',
    altText: item.header || 'Image',
    usageCount: parseInt(item.limit) || 0,
    isActive: item.status === 'Active',
    tags: [],
    metadata: {},
    uploadedAt: new Date().toISOString(),
    uploadedBy: item.reviewer || 'Unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    uploader: {
      id: '',
      profile: {
        displayName: item.reviewer || 'Unknown'
      }
    }
  }));
}

export function ImageDataCardView({ 
  data, 
  selectedRows, 
  onRowSelect, 
  onSelectAll 
}: ImageDataCardViewProps) {
  // Check if this is image data based on data structure
  const isImageData = data.length > 0 && data[0].header && data[0].type;
  
  if (!isImageData) {
    // Fallback to default card view for non-image data
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg">
            <h3 className="font-medium">{item.header || item.title || 'Item'}</h3>
            <p className="text-sm text-muted-foreground">{item.type || item.status}</p>
          </div>
        ))}
      </div>
    );
  }

  // For image data, we need to get the original images from context
  // This is a temporary solution - ideally we'd pass images directly
  const images = transformDataToImages(data);

  return (
    <ImageCardView
      images={images}
      onImageClick={(image) => {
        console.log('Image clicked:', image);
      }}
      onDelete={(image) => {
        console.log('Delete image:', image);
      }}
      onToggleStatus={(image) => {
        console.log('Toggle status:', image);
      }}
    />
  );
}