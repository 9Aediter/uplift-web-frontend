'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { formatBytes } from '@/lib/utils';
import { imagesApi, ImageData } from '@/lib/api/images';
import { useUsersStore } from '@/lib/store/users';

// Remove duplicate interface - using ImageData from API client

interface UseImagesOptions {
  searchTerm?: string;
  uploadTypeFilter?: string;
  isActiveFilter?: string;
}

export function useImages(options: UseImagesOptions = {}) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState<any[]>([]);
  const { users } = useUsersStore();

  const { searchTerm = '', uploadTypeFilter = 'all', isActiveFilter = 'all' } = options;

  // Helper function to get user name by ID
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? (user.name || user.email || 'Unknown User') : 'Unknown User';
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      
      const params = {
        search: searchTerm || undefined,
        category: uploadTypeFilter !== 'all' ? uploadTypeFilter : undefined,
        isActive: isActiveFilter !== 'all' ? (isActiveFilter === 'true') : undefined,
        page: 1,
        limit: 50
      };

      console.log('Fetching images with params:', params);
      
      const response = await imagesApi.getImages(params);
      
      console.log('API Response:', response);
      
      if (response.data) {
        const imageData = response.data.images || [];
        setImages(imageData);
        
        // Transform data for DataTable
        const transformed = imageData.map((image: ImageData, index: number) => ({
          id: image.id || `image-${index}`,
          header: image.filename || 'Unknown File',
          type: image.category || 'general',
          status: image.isActive ? 'Active' : 'Inactive',
          target: formatBytes(image.size || 0),
          limit: `${image.usageCount || 0}`,
          uploader: getUserName(image.uploadedBy)
        }));
        
        console.log('Setting DataTable data:', transformed);
        setDataTableData(transformed);
        console.log('Images set:', imageData.length);
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load images';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (image: ImageData) => {
    if (image.usageCount > 0) {
      toast.error('Cannot delete image that is currently in use');
      return;
    }

    try {
      await imagesApi.deleteImage(image.id);
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete image';
      toast.error(errorMessage);
    }
  };

  const toggleImageStatus = async (image: ImageData) => {
    try {
      await imagesApi.updateImage(image.id, {
        isActive: !image.isActive,
      });
      toast.success(`Image ${image.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchImages();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update image';
      toast.error(errorMessage);
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