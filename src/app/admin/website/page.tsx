"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWebsiteStore } from "@/lib/store/website-store"
import { DataTableSkeleton, EmptyState } from "@/components/skeleton/table-skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function WebsitePage() {
  const router = useRouter()
  const { pages, isLoading, loadPagesList } = useWebsiteStore()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load pages on mount
  useEffect(() => {
    loadPagesList()
  }, [loadPagesList])

  // Transform pages data for DataTable display - organized logically
  const transformedPages = pages.map((page, index) => ({
    id: page.id,
    
    // Main content (Header + Description)
    header: page.title,
    description: page.description || `${page.title} landing page with dynamic content management`,
    
    // Page info
    type: 'Website Page',
    target: `/${page.slug}`,
    version: `v1.${index + 1}`,
    
    // Status & Activity
    status: page.metadata?.status?.charAt(0).toUpperCase() + page.metadata.status?.slice(1) || 'Draft',
    statusType: page.metadata?.status || 'draft', // for badge styling
    isActive: true, // Active toggle for the page
    
    // Content metrics
    sectionsCount: page.sections?.length || 0,
    activeSections: page.sections?.filter(s => s.isActive !== false).length || page.sections?.length || 0,
    
    // Meta info
    lastEditor: 'Admin',
    uploader: page.metadata?.updatedAt ? new Date(page.metadata.updatedAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }) : 'Unknown',
    publishedDate: page.metadata?.publishedAt || page.metadata?.updatedAt,
    previewUrl: `/${page.slug}`
  }))

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await loadPagesList()
      toast.success('Pages refreshed successfully')
    } catch (error) {
      toast.error('Failed to refresh pages')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleStatusChange = async (item: any, newStatus: string) => {
    try {
      // TODO: Implement API call to update page active status
      console.log('Updating page status:', item.id, newStatus)
      toast.success(`Page ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`)
      // Optionally refresh the list
      // await loadPagesList()
    } catch (error) {
      toast.error('Failed to update page status')
    }
  }

  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Website" }
        ]}
        action={
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Link href="/admin/website/create">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Page
              </Button>
            </Link>
          </div>
        }
      />
      
      {/* Container with hidden scrollbars */}
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage website pages and content. Create, edit, and publish pages with our widget system.
          </p>
          {!isLoading && pages.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Total: {pages.length} pages • Published: {pages.filter(p => p.metadata?.status === 'published').length} • Draft: {pages.filter(p => p.metadata?.status === 'draft').length}
            </p>
          )}
        </div>
        
        {/* Loading State - Skeleton */}
        {isLoading ? (
          <DataTableSkeleton />
        ) : pages.length === 0 ? (
          /* Empty State */
          <EmptyState
            title="No pages found"
            description="You haven't created any website pages yet. Start by creating your first page."
            actionLabel="Create First Page"
            onAction={() => router.push('/admin/website/create')}
          />
        ) : (
          /* Data Table */
          <div className="overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DataTable 
              data={transformedPages} 
              entityName="Page" 
              views={["table", "card"]}
              onView={(row: any) => {
                // Navigate to page editor using id
                const page = pages.find(p => p.id === row.id)
                if (page) {
                  router.push(`/admin/website/${page.id}`)
                } else {
                  toast.error('Page not found')
                }
              }}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </div>
    </>
  )
}