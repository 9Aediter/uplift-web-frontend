'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { formatBytes } from '@/lib/utils';

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
  _count?: {
    products: number;
  };
}

interface UseImagesOptions {
  searchTerm?: string;
  uploadTypeFilter?: string;
  isActiveFilter?: string;
}

export function useImages(options: UseImagesOptions = {}) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState<any[]>([]);

  const { searchTerm = '', uploadTypeFilter = 'all', isActiveFilter = 'all' } = options;

  const fetchImages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (uploadTypeFilter !== 'all') params.append('uploadType', uploadTypeFilter);
      if (isActiveFilter !== 'all') params.append('isActive', isActiveFilter);

      console.log('Fetching images from:', `/api/images?${params.toString()}`);
      const response = await fetch(`/api/images?${params.toString()}`);
      const data = await response.json();
      
      console.log('API Response:', { status: response.status, data });
      
      if (response.ok) {
        const imageData = data.images || [];
        setImages(imageData);
        
        // Transform data for DataTable
        const transformed = imageData.map((image: Image, index: number) => ({
          id: image.id || `image-${index}`,
          header: image.originalName || 'Unknown File',
          type: image.uploadType || 'general',
          status: image.isActive ? 'Active' : 'Inactive',
          target: formatBytes(image.size || 0),
          limit: `${image.usageCount || 0}`,
          reviewer: image.uploader?.profile?.displayName ||
                    `${image.uploader?.profile?.firstName || ''} ${image.uploader?.profile?.lastName || ''}`.trim() ||
                    'Unknown User'
        }));
        
        console.log('Setting DataTable data:', transformed);
        setDataTableData(transformed);
        console.log('Images set:', imageData.length);
      } else {
        console.error('API Error:', data);
        toast.error(data.error || 'Failed to fetch images');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (image: Image) => {
    if (image.usageCount > 0) {
      toast.error('Cannot delete image that is currently in use');
      return;
    }

    try {
      const response = await fetch(`/api/upload?id=${image.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Image deleted successfully');
        fetchImages();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete image');
      }
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const toggleImageStatus = async (image: Image) => {
    try {
      const response = await fetch('/api/images', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: image.id,
          isActive: !image.isActive,
        }),
      });

      if (response.ok) {
        toast.success(`Image ${image.isActive ? 'deactivated' : 'activated'} successfully`);
        fetchImages();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to update image');
      }
    } catch (error) {
      toast.error('Failed to update image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchTerm, uploadTypeFilter, isActiveFilter]);

  return {
    images,
    loading,
    dataTableData,
    fetchImages,
    deleteImage,
    toggleImageStatus,
  };
}