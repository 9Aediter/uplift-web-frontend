"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/input/textarea"
import { Switch } from "@/components/input/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/input/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/button/badge"
import { Separator } from "@/components/ui/separator"
import { HeroSectionEditor } from "@/components/admin/hero-section-editor"
import { SectionManager } from "@/components/admin/website/section-manager"
import { useWebsiteStore } from "@/lib/store/website-store"
import { WebsiteApiService } from "@/lib/api/website"
import { Save, Eye, RefreshCw, Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface PageEditorProps {
  pageId?: string | null // null for new page creation
  isNewPage?: boolean
}

interface NewPageForm {
  title: string
  slug: string
  type: 'home' | 'about' | 'contact' | 'service' | 'custom'
  language: 'en' | 'th'
}

export default function PageEditor({ pageId, isNewPage = false }: PageEditorProps) {
  const router = useRouter()
  const {
    currentPage,
    sections,
    isLoading,
    isDirty,
    loadPage,
    savePage,
    publishPage,
    setPageMetadata
  } = useWebsiteStore()

  // New page creation form data
  const [newPageForm, setNewPageForm] = useState<NewPageForm>({
    title: '',
    slug: '',
    type: 'custom',
    language: 'en'
  })
  const [isCreating, setIsCreating] = useState(false)

  // Load existing page data
  useEffect(() => {
    if (!isNewPage && pageId) {
      loadPage(pageId)
    }
  }, [pageId, loadPage, isNewPage])

  // Auto-generate slug from title for new pages
  const handleNewPageInputChange = (field: keyof NewPageForm, value: string) => {
    setNewPageForm(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setNewPageForm(prev => ({ ...prev, slug }))
    }
  }

  const handleCreateNewPage = async () => {
    if (!newPageForm.title || !newPageForm.slug) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsCreating(true)

    try {
      console.log('📝 [PAGE EDITOR] Creating new page:', newPageForm)

      // Create page via API
      const pageData = await WebsiteApiService.createPage({
        slug: newPageForm.slug,
        titleEn: newPageForm.language === 'en' ? newPageForm.title : '',
        titleTh: newPageForm.language === 'th' ? newPageForm.title : '',
        descriptionEn: newPageForm.language === 'en' ? `${newPageForm.type} page` : '',
        descriptionTh: newPageForm.language === 'th' ? `หน้า ${newPageForm.type}` : '',
        changeLog: `Created new ${newPageForm.type} page`
      })

      console.log('✅ [PAGE EDITOR] Page created successfully:', pageData)
      toast.success('Page created successfully!')

      // Redirect to edit the new page
      router.replace(`/admin/website/${pageData.id}`)

    } catch (error) {
      console.error('🚫 [PAGE EDITOR] Failed to create page:', error)

      if (error instanceof Error) {
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          toast.error(`A page with slug "${newPageForm.slug}" already exists. Please choose a different URL.`)
        } else {
          toast.error(`Failed to create page: ${error.message}`)
        }
      } else {
        toast.error('Failed to create page. Please try again.')
      }
    } finally {
      setIsCreating(false)
    }
  }

  const handleSave = async () => {
    try {
      await savePage()
      toast.success("Page saved successfully!")
    } catch (error) {
      console.error('Save error:', error)
      toast.error("Failed to save page")
    }
  }

  const handlePublish = async () => {
    try {
      await publishPage()
      toast.success("Page published successfully!")
    } catch (error) {
      console.error('Publish error:', error)
      toast.error("Failed to publish page")
    }
  }

  const handlePreview = () => {
    const previewUrl = currentPage ? `/${currentPage.slug}` : '#'
    window.open(previewUrl, '_blank')
  }

  // Show loading state
  if (!isNewPage && isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Loading page data...</p>
      </div>
    )
  }

  // Show not found for edit mode
  if (!isNewPage && !currentPage && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">The requested page could not be found.</p>
        <Button onClick={() => router.push("/admin/website")}>
          Back to Website Pages
        </Button>
      </div>
    )
  }

  // New Page Creation Form
  if (isNewPage) {
    return (
      <div className="flex flex-col h-[calc(95vh-var(--header-height))] overflow-hidden">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Create New Page</h1>
                <p className="text-muted-foreground">Set up the basic information for your new website page.</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <div className="sticky top-0 bg-background z-10 px-4 lg:px-6 pb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="hero" disabled={true}>Hero Section</TabsTrigger>
                <TabsTrigger value="sections" disabled={true}>Section Details</TabsTrigger>
                <TabsTrigger value="settings" disabled={true}>Settings</TabsTrigger>
              </TabsList>
            </div>

            <div className="px-4 lg:px-6 pb-6">
              <TabsContent value="basic" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Page Information
                    </CardTitle>
                    <CardDescription>
                      Enter the basic details for your new page. You can configure the content after creation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Page Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter page title"
                        value={newPageForm.title}
                        onChange={(e) => handleNewPageInputChange('title', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        This will be displayed as the page title in the admin panel and can be used for SEO.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        placeholder="page-url-slug"
                        value={newPageForm.slug}
                        onChange={(e) => handleNewPageInputChange('slug', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        This will be the URL path: yoursite.com/<strong>{newPageForm.slug || 'page-slug'}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Page Type</Label>
                        <Select value={newPageForm.type} onValueChange={(value: NewPageForm['type']) => handleNewPageInputChange('type', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom Page</SelectItem>
                            <SelectItem value="home">Home Page</SelectItem>
                            <SelectItem value="about">About Page</SelectItem>
                            <SelectItem value="contact">Contact Page</SelectItem>
                            <SelectItem value="service">Service Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select value={newPageForm.language} onValueChange={(value: NewPageForm['language']) => handleNewPageInputChange('language', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="th">Thai</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => router.back()}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateNewPage}
                        disabled={isCreating || !newPageForm.title || !newPageForm.slug}
                      >
                        {isCreating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Create & Edit Page
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

  // Existing Page Editor (same as before)
  return (
    <div className="flex flex-col h-[calc(95vh-var(--header-height))] overflow-hidden">
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{currentPage?.title}</h1>
              <p className="text-muted-foreground">/{currentPage?.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={
                currentPage?.metadata?.status === 'published' ? 'default' :
                  currentPage?.metadata?.status === 'draft' ? 'secondary' : 'outline'
              }>
                {currentPage?.metadata?.status ? currentPage.metadata.status.charAt(0).toUpperCase() + currentPage.metadata.status.slice(1) : 'Draft'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              {currentPage?.metadata?.status === 'draft' && (
                <Button size="sm" onClick={handlePublish}>
                  Publish
                </Button>
              )}
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {sections.length} sections • {isDirty ? 'Unsaved changes' : 'Saved'}
            </span>
          </div>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <div className="sticky top-0 bg-background z-10 px-4 lg:px-6 pb-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="sections">Section Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
          </div>

          <div className="px-4 lg:px-6 pb-6">
            <TabsContent value="hero" className="space-y-6 mt-0">
              <HeroSectionEditor
                pageId={currentPage?.id}
                title="Hero Section"
                description="Main banner and call-to-action area for this page"
                mode="advanced"
                onDataChange={(data) => {
                  console.log('Hero data changed:', data)
                }}
              />
            </TabsContent>

            <TabsContent value="sections" className="space-y-6 mt-0">
              <SectionManager />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Page Settings</CardTitle>
                  <CardDescription>
                    Configure language, visibility, and access settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="th">Thai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Page Type</Label>
                      <Select defaultValue="custom">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Page</SelectItem>
                          <SelectItem value="about">About Page</SelectItem>
                          <SelectItem value="contact">Contact Page</SelectItem>
                          <SelectItem value="service">Service Page</SelectItem>
                          <SelectItem value="custom">Custom Page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Language Support</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="lang-en" defaultChecked={true} />
                        <Label htmlFor="lang-en">English</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="lang-th" defaultChecked={true} />
                        <Label htmlFor="lang-th">Thai</Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-detect" defaultChecked={true} />
                      <Label htmlFor="auto-detect">Auto-detect User Language</Label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Visibility & Access</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch id="is-public" defaultChecked={true} />
                        <Label htmlFor="is-public">Public Page</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="require-auth" defaultChecked={false} />
                        <Label htmlFor="require-auth">Require Authentication</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>
                    Search engine optimization settings for this page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* English SEO */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">English SEO</h4>
                      <Badge variant="outline">EN</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          defaultValue={currentPage?.seoTitle || ''}
                          placeholder="Enter meta title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Description</Label>
                        <Textarea
                          defaultValue={currentPage?.seoDescription || ''}
                          placeholder="Enter meta description"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Keywords</Label>
                        <Input
                          defaultValue=""
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Thai SEO */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Thai SEO</h4>
                      <Badge variant="outline">TH</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Meta Title (Thai)</Label>
                        <Input
                          defaultValue=""
                          placeholder="Enter Thai meta title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meta Description (Thai)</Label>
                        <Textarea
                          defaultValue=""
                          placeholder="Enter Thai meta description"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Keywords (Thai)</Label>
                        <Input
                          defaultValue=""
                          placeholder="คีย์เวิร์ด1, คีย์เวิร์ด2, คีย์เวิร์ด3"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* General SEO */}
                  <div className="space-y-4">
                    <h4 className="font-medium">General</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Open Graph Image</Label>
                        <Input
                          defaultValue=""
                          placeholder="/images/og-image.jpg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Canonical URL</Label>
                        <Input
                          defaultValue={`https://uplift.dev/${currentPage?.slug}`}
                          placeholder="https://yoursite.com/page-slug"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}