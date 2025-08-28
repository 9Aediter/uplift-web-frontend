'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { imagesApi } from '@/lib/api/images';

interface ImageUploadDialogProps {
  onUploadSuccess?: () => void;
  children?: React.ReactNode;
}

export function ImageUploadDialog({ onUploadSuccess, children }: ImageUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async () => {
    if (!uploadingFile) return;

    try {
      setUploadProgress(10);
      
      await imagesApi.uploadImage({
        file: uploadingFile,
        category: 'general',
        tags: ['admin'],
        altText: uploadingFile.name
      });

      setUploadProgress(100);
      toast.success('Image uploaded successfully');
      setIsOpen(false);
      setUploadingFile(null);
      setUploadProgress(0);
      onUploadSuccess?.();
    } catch (error: any) {
      const errorMessage = error.message || 'Upload failed';
      toast.error(errorMessage);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUploadingFile(null);
    setUploadProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <CloudArrowUpIcon className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Select Image</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setUploadingFile(e.target.files?.[0] || null)}
            />
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!uploadingFile || uploadProgress > 0}
            >
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}