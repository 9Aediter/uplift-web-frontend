'use client';

import { Input } from '@/components/input/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/input/select';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ImageFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  uploadTypeFilter: string;
  onUploadTypeFilterChange: (value: string) => void;
  isActiveFilter: string;
  onIsActiveFilterChange: (value: string) => void;
}

export function ImageFilters({
  searchTerm,
  onSearchTermChange,
  uploadTypeFilter,
  onUploadTypeFilterChange,
  isActiveFilter,
  onIsActiveFilterChange,
}: ImageFiltersProps) {
  return (
    <div className="flex items-center space-x-4 p-6">
      <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={uploadTypeFilter} onValueChange={onUploadTypeFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="general">General</SelectItem>
          <SelectItem value="product">Product</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
      <Select value={isActiveFilter} onValueChange={onIsActiveFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}