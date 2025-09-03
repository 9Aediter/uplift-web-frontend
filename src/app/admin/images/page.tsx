'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { SiteHeader } from '@/components/site-header';
import { 
  ImageUploadDialog, 
  ImagePreviewDialog, 
  ImageFilters,
  useImages 
} from '@/components/image';

interface ImageData {
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
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function ImagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadTypeFilter, setUploadTypeFilter] = useState('all');
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const { 
    images, 
    loading, 
    dataTableData, 
    fetchImages, 
    deleteImage, 
    toggleImageStatus 
  } = useImages({
    searchTerm,
    uploadTypeFilter,
    isActiveFilter,
  });

  console.log('Current dataTableData state:', dataTableData);

  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Images" }
        ]}
        action={
          <ImageUploadDialog onUploadSuccess={fetchImages} />
        }
      />
      <div className="space-y-6">
        {/* Filters */}
        <ImageFilters
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          uploadTypeFilter={uploadTypeFilter}
          onUploadTypeFilterChange={setUploadTypeFilter}
          isActiveFilter={isActiveFilter}
          onIsActiveFilterChange={setIsActiveFilter}
        />

        {/* Images Table */}
        <DataTable
          data={dataTableData}
          entityName="Image"
          views={["table", "card"]}
          imagesData={images}
          onImageClick={setSelectedImage}
          onImageDelete={deleteImage}
          onImageToggleStatus={toggleImageStatus}
        />

        {/* Image Preview Dialog */}
        <ImagePreviewDialog
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={deleteImage}
          onToggleStatus={toggleImageStatus}
        />
      </div>
    </>
  );
}