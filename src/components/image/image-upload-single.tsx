'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { CloudArrowUpIcon, LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { shouldUsePresignedUpload, formatFileSize, isImageFile } from '@/lib/upload-utils';

interface ImageUploadSingleProps {
  onImageUploaded: (imageUrl: string, imageId?: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export function ImageUploadSingle({ 
  onImageUploaded, 
  children, 
  className 
}: ImageUploadSingleProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      setUploading(true);

      // Check if it's an image file
      if (!isImageFile(file)) {
        toast.error('Please select an image file');
        return;
      }

      // Determine upload method
      const uploadConfig = shouldUsePresignedUpload(file);
      console.log(`Upload strategy: ${uploadConfig.reason}`);

      if (uploadConfig.usePresigned) {
        // Use presigned URL upload for large files
        await handlePresignedUpload(file);
      } else {
        // Use direct upload for small images
        await handleDirectUpload(file);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDirectUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'product');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    
    if (data.success && data.data) {
      onImageUploaded(data.data.url, data.data.id);
      toast.success('Image uploaded successfully');
      setOpen(false);
    } else {
      throw new Error('Invalid response format');
    }
  };

  const handlePresignedUpload = async (file: File) => {
    // Step 1: Get presigned URL
    const presignedResponse = await fetch('/api/upload/presigned', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        uploadType: 'product',
        fileSize: file.size
      }),
    });

    if (!presignedResponse.ok) {
      throw new Error('Failed to get presigned URL');
    }

    const presignedData = await presignedResponse.json();
    
    if (!presignedData.success || !presignedData.data) {
      throw new Error('Invalid presigned URL response');
    }

    // Step 2: Upload directly to S3
    const uploadResponse = await fetch(presignedData.data.presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload to S3');
    }

    // Step 3: Save to database (if needed) and notify success
    const finalUrl = presignedData.data.uploadUrl;
    onImageUploaded(finalUrl);
    toast.success(`Large file (${formatFileSize(file.size)}) uploaded successfully`);
    setOpen(false);
  };


  const handleUrlUpload = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      setUploading(true);

      const response = await fetch('/api/upload/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: urlInput.trim(),
          uploadType: 'product',
        }),
      });

      if (!response.ok) {
        throw new Error('URL upload failed');
      }

      const data = await response.json();
      
      if (data.url) {
        onImageUploaded(data.url, data.id);
        toast.success('Image uploaded from URL successfully');
        setUrlInput('');
        setOpen(false);
      } else {
        throw new Error('No file URL returned');
      }
    } catch (error) {
      console.error('URL upload error:', error);
      toast.error('Failed to upload image from URL');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className={className}>
            <PhotoIcon className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Upload an image from your computer or provide a URL
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary hover:text-primary/80"
                      >
                        <span className="text-sm font-medium">Click to upload</span>
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileSelect}
                          disabled={uploading}
                        />
                      </Label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {uploading && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2 text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-url">Image URL</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="image-url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="pl-10"
                          disabled={uploading}
                        />
                      </div>
                      <Button 
                        onClick={handleUrlUpload}
                        disabled={uploading || !urlInput.trim()}
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Enter a direct link to an image. The image will be downloaded and uploaded to our servers.
                  </p>
                  {uploading && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2 text-sm">Processing URL...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}