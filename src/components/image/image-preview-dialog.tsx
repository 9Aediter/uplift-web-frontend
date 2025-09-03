'use client';

import { Button } from '@/components/button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { formatBytes, formatDate } from '@/lib/utils';
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
  const { users } = useUsersStore();

  // Helper function to get user name by ID
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? (user.name || user.email || 'Unknown User') : 'Unknown User';
  };

  if (!image) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(image.s3Url);
    toast.success('Image URL copied to clipboard');
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${image.filename}"?`)) {
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
          <DialogTitle>{image.filename}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={image.s3Url}
              alt={image.altText || image.filename}
              className="max-w-full max-h-96 object-contain rounded-lg border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>File Size:</strong> {formatBytes(image.size)}
            </div>
            <div>
              <strong>Type:</strong> {image.mimeType}
            </div>
            <div>
              <strong>Category:</strong> {image.category}
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
              {getUserName(image.uploadedBy)}
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