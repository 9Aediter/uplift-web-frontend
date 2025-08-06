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

export default function ImagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadTypeFilter, setUploadTypeFilter] = useState('all');
  const [isActiveFilter, setIsActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

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