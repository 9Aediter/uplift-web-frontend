'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { formatBytes, formatDate } from '@/lib/utils';

interface Image {
  id: string;
  url: string;
  key: string;
  originalName: string;
  contentType: string;
  size: number;
  uploadType: string;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  uploader?: {
    id: string;
    profile?: {
      displayName?: string;
      firstName?: string;
      lastName?: string;
    };
  };
}

interface ImagePreviewDialogProps {
  image: Image | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (image: Image) => void;
  onToggleStatus?: (image: Image) => void;
}

export function ImagePreviewDialog({ 
  image, 
  isOpen, 
  onClose, 
  onDelete, 
  onToggleStatus 
}: ImagePreviewDialogProps) {
  if (!image) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(image.url);
    toast.success('Image URL copied to clipboard');
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${image.originalName}"?`)) {
      onDelete?.(image);
      onClose();
    }
  };

  const handleToggleStatus = () => {
    onToggleStatus?.(image);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{image.originalName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={image.url}
              alt={image.originalName}
              className="max-w-full max-h-96 object-contain rounded-lg border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>File Size:</strong> {formatBytes(image.size)}
            </div>
            <div>
              <strong>Type:</strong> {image.contentType}
            </div>
            <div>
              <strong>Upload Type:</strong> {image.uploadType}
            </div>
            <div>
              <strong>Usage Count:</strong> {image.usageCount}
            </div>
            <div>
              <strong>Status:</strong> {image.isActive ? 'Active' : 'Inactive'}
            </div>
            <div>
              <strong>Created:</strong> {formatDate(image.createdAt)}
            </div>
            <div className="col-span-2">
              <strong>Uploaded by:</strong>{' '}
              {image.uploader?.profile?.displayName ||
               `${image.uploader?.profile?.firstName || ''} ${image.uploader?.profile?.lastName || ''}`.trim() ||
               'Unknown'}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCopyUrl}>
              Copy URL
            </Button>
            <Button variant="outline" onClick={handleToggleStatus}>
              {image.isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={image.usageCount > 0}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}