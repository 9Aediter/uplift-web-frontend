'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { ImageCardView } from './image-card-view';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/input/select';
import { Label } from '@/components/ui/label';
import { IconTable, IconCards } from '@tabler/icons-react';

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

interface ImageDataTableProps {
  images: Image[];
  dataTableData: any[];
  loading?: boolean;
  onImageClick?: (image: Image) => void;
  onDelete?: (image: Image) => void;
  onToggleStatus?: (image: Image) => void;
}

export function ImageDataTable({
  images,
  dataTableData,
  loading = false,
  onImageClick,
  onDelete,
  onToggleStatus,
}: ImageDataTableProps) {
  const availableViews = [
    { key: "table", label: "Table", icon: IconTable },
    { key: "card", label: "Card", icon: IconCards },
  ];

  return (
    <Tabs defaultValue="table" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="table">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            {availableViews.map((view) => (
              <SelectItem key={view.key} value={view.key}>
                {view.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TabsList className="hidden @4xl/main:flex">
          {availableViews.map((view) => {
            const IconComponent = view.icon;
            return (
              <TabsTrigger key={view.key} value={view.key} className="flex items-center gap-2">
                <IconComponent className="h-4 w-4" />
                <span className="hidden lg:inline">{view.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {images.length} images
          </span>
        </div>
      </div>

      <TabsContent value="table" className="relative flex flex-col gap-4 overflow-auto">
        <DataTable
          data={dataTableData}
          entityName="Image"
          views={["table"]}
        />
      </TabsContent>

      <TabsContent value="card" className="relative flex flex-col gap-4 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-2">
            <IconCards className="w-12 h-12 text-muted-foreground" />
            <span className="text-muted-foreground">No images found</span>
          </div>
        ) : (
          // TODO: Fix Image type mismatch - temporarily disabled for admin
          // <ImageCardView
          //   images={images}
          //   onImageClick={onImageClick}
          //   onDelete={onDelete}
          //   onToggleStatus={onToggleStatus}
          // />
          <div className="p-8 text-center text-gray-500">
            Image management temporarily disabled
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}