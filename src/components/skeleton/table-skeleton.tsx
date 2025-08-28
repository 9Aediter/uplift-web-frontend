'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 6,
  showHeader = true 
}) => {
  // Create array for skeleton rows
  const skeletonRows = Array.from({ length: rows }, (_, i) => i)
  const skeletonColumns = Array.from({ length: columns }, (_, i) => i)

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        {showHeader && (
          <TableHeader className="bg-muted">
            <TableRow>
              {skeletonColumns.map((col) => (
                <TableHead key={col} className="h-12">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {skeletonRows.map((row) => (
            <TableRow key={row}>
              {skeletonColumns.map((col) => (
                <TableCell key={col} className="h-16">
                  <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${
                    col === 0 ? 'w-3/4' :
                    col === 1 ? 'w-full' :
                    col === 2 ? 'w-1/2' :
                    col === 3 ? 'w-1/3' :
                    col === 4 ? 'w-2/3' : 'w-1/4'
                  }`}></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface DataTableSkeletonProps {
  showTabs?: boolean
  showToolbar?: boolean
}

export const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({
  showTabs = true,
  showToolbar = true
}) => {
  return (
    <div className="space-y-4">
      {/* Tabs skeleton */}
      {showTabs && (
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex space-x-4">
            <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          {/* Toolbar skeleton */}
          {showToolbar && (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      )}

      {/* Table skeleton */}
      <div className="px-4 lg:px-6">
        <TableSkeleton rows={8} columns={7} />
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex space-x-1">
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const EmptyState: React.FC<{ 
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}> = ({ 
  title = "No data found", 
  description = "There are no items to display at the moment.",
  actionLabel = "Create New",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-gray-400 dark:text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {actionLabel}
        </button>
      )}
    </div>
  )
}