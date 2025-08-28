// Images API functions for NestJS backend
import { api } from './client';

export interface ImageData {
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

export interface ImagesListResponse {
  images: ImageData[];
  total: number;
  page: number;
  limit: number;
}

export interface ImageUploadRequest {
  file: File;
  category?: 'general' | 'avatar' | 'product' | 'banner' | 'thumbnail';
  tags?: string[];
  altText?: string;
}

export interface UpdateImageRequest {
  altText?: string;
  category?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface ImagesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isActive?: boolean;
}

export interface ImageUsage {
  id: string;
  tableName: string;
  recordId: string;
  fieldName: string;
  createdAt: string;
  updatedAt: string;
}

export const imagesApi = {
  // Get images with pagination and filters
  getImages: async (params?: ImagesQueryParams): Promise<{ data: ImagesListResponse }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    
    const queryString = queryParams.toString();
    const url = queryString ? `/v1/images?${queryString}` : '/v1/images';
    
    const response = await api.get<ImagesListResponse>(url);
    return { data: response.data! };
  },

  // Get images for gallery/picker UI
  getGallery: async (params?: { search?: string; category?: string }): Promise<{ data: ImageData[] }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/v1/images/gallery?${queryString}` : '/v1/images/gallery';
    
    const response = await api.get<ImageData[]>(url);
    return { data: response.data! };
  },

  // Get single image by ID
  getImage: async (id: string): Promise<{ data: ImageData }> => {
    const response = await api.get<ImageData>(`/v1/images/${id}`);
    return { data: response.data! };
  },

  // Upload new image
  uploadImage: async (imageData: ImageUploadRequest): Promise<{ data: ImageData }> => {
    const formData = new FormData();
    formData.append('file', imageData.file);
    if (imageData.category) formData.append('category', imageData.category);
    if (imageData.tags) {
      // Send each tag separately so backend receives as array
      imageData.tags.forEach(tag => formData.append('tags[]', tag));
    }
    if (imageData.altText) formData.append('altText', imageData.altText);

    // Use direct fetch for file upload instead of api wrapper
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    console.log('🔍 Uploading to:', `${apiUrl}/v1/images/upload`);
    console.log('🔍 FormData contents:', {
      file: imageData.file.name,
      size: imageData.file.size,
      type: imageData.file.type,
      category: imageData.category,
      tags: imageData.tags,
      altText: imageData.altText
    });

    const response = await fetch(`${apiUrl}/v1/images/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    console.log('🔍 Upload response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
      console.error('🔍 Upload error response:', errorData);
      throw new Error(errorData.message || `Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('🔍 Upload success response:', data);
    return { data };
  },

  // Update image metadata
  updateImage: async (id: string, imageData: UpdateImageRequest): Promise<{ data: ImageData }> => {
    const response = await api.put<ImageData>(`/v1/images/${id}`, imageData);
    return { data: response.data! };
  },

  // Delete image
  deleteImage: async (id: string): Promise<void> => {
    await api.delete(`/v1/images/${id}`);
  },

  // Link image to a record
  linkImage: async (id: string, linkData: { tableName: string; recordId: string; fieldName: string }): Promise<void> => {
    await api.post(`/v1/images/${id}/link`, linkData);
  },

  // Unlink image from a record
  unlinkImage: async (id: string, unlinkData: { tableName: string; recordId: string; fieldName: string }): Promise<void> => {
    await api.post(`/v1/images/${id}/unlink`, unlinkData);
  },

  // Get image usage history
  getImageUsages: async (id: string): Promise<{ data: ImageUsage[] }> => {
    const response = await api.get<ImageUsage[]>(`/v1/images/${id}/usages`);
    return { data: response.data! };
  }
};

export default imagesApi;