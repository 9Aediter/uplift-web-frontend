"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/button/button"
import { Badge } from "@/components/button/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, GripVertical, Eye } from "lucide-react"
import { toast } from "sonner"
import { WIDGET_CATEGORIES, WIDGET_REGISTRY, type WidgetCategory } from "@/components/widgets"
import { WidgetConfigModal } from "./widget-config-modal"
import type { WebsitePage } from "@/data/website-pages"

interface SectionManagerProps {
  pageData: WebsitePage
  onSectionUpdate?: (sections: any[]) => void
}

export function SectionManager({ pageData, onSectionUpdate }: SectionManagerProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<WidgetCategory | null>(null)
  const [previewWidget, setPreviewWidget] = useState<string | null>(null)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  const handleSelectWidget = (widgetId: string) => {
    setSelectedWidget(widgetId)
    setIsAddDialogOpen(false)
    setIsConfigModalOpen(true)
  }

  const handleConfirmWidget = (widgetId: string, configData: any, sectionId?: string) => {
    const widget = WIDGET_REGISTRY[widgetId]
    if (!widget) return

    if (sectionId) {
      // Edit existing section
      const updatedSections = pageData.sections.map(section =>
        section.id === sectionId
          ? { ...section, data: configData }
          : section
      )
      console.log('Updating section:', sectionId, configData)
      toast.success(`Updated ${widget.config.name} section`)
      onSectionUpdate?.(updatedSections)
    } else {
      // Add new section
      const newSection = {
        id: `section-${Date.now()}`,
        type: 'widget',
        widgetType: widgetId,
        title: widget.config.name,
        order: pageData.sections.length + 1,
        isActive: true,
        data: configData
      }
      console.log('Adding new section:', newSection)
      toast.success(`Added ${widget.config.name} section`)
      onSectionUpdate?.([...pageData.sections, newSection])
    }

    setIsConfigModalOpen(false)
    setSelectedWidget(null)
    setSelectedCategory(null)
    setEditingSectionId(null)
    setEditingData(null)
  }

  const handleCancelConfig = () => {
    setIsConfigModalOpen(false)
    setSelectedWidget(null)
    setEditingSectionId(null)
    setEditingData(null)
    if (!editingSectionId) {
      setIsAddDialogOpen(true)
    }
  }

  const handleEditSection = (sectionId: string) => {
    const section = pageData.sections.find(s => s.id === sectionId)
    if (section && (section as any).widgetType) {
      setSelectedWidget((section as any).widgetType)
      setEditingSectionId(sectionId)
      setEditingData(section.data)
      setIsConfigModalOpen(true)
    }
  }

  const handleDeleteSection = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      const updatedSections = pageData.sections.filter(s => s.id !== sectionId)
      onSectionUpdate?.(updatedSections)
      toast.success('Section deleted')
    }
  }

  const handleToggleSection = (sectionId: string) => {
    const updatedSections = pageData.sections.map(section =>
      section.id === sectionId
        ? { ...section, isActive: !section.isActive }
        : section
    )
    onSectionUpdate?.(updatedSections)
    toast.success('Section updated')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Page Sections</CardTitle>
            <CardDescription>
              จัดการส่วนเนื้อหาของหน้านี้ด้วย Widget ที่ใช้ซ้ำได้
            </CardDescription>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => {
                setSelectedCategory(null)
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-[90vw] max-h-[90vh] overflow-y-auto sm:max-w-7xl">
              <DialogHeader>
                <DialogTitle>เลือกประเภท Section</DialogTitle>
                <DialogDescription>
                  เลือกหมวดหมู่ Widget และรูปแบบที่ต้องการเพิ่มในหน้านี้
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Category Selection - เลือกหมวดหมู่ Widget */}
                {!selectedCategory && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">1️⃣ เลือกหมวดหมู่ Widget</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(WIDGET_CATEGORIES).map(([category, widgets]) => {
                        const widgetCount = widgets.length
                        const categoryInfo = {
                          cards: { icon: '🎴', name: 'Cards', desc: 'การ์ดแสดงข้อมูล' },
                          carousel: { icon: '🎠', name: 'Carousel', desc: 'สไลด์เนื้อหา' },
                          tabs: { icon: '📑', name: 'Tabs', desc: 'แท็บเนื้อหา' },
                          hero: { icon: '🎯', name: 'Hero', desc: 'ส่วนหัวหน้า' },
                          content: { icon: '📝', name: 'Content', desc: 'เนื้อหาทั่วไป' },
                          interactive: { icon: '💰', name: 'Interactive', desc: 'ส่วนโต้ตอบ' }
                        }

                        const info = categoryInfo[category as keyof typeof categoryInfo]

                        return (
                          <Card
                            key={category}
                            className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${widgetCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => widgetCount > 0 && setSelectedCategory(category as WidgetCategory)}
                          >
                            <CardContent className="p-6 text-center">
                              <div className="text-4xl mb-2">{info.icon}</div>
                              <h3 className="font-semibold">{info.name}</h3>
                              <p className="text-xs text-muted-foreground mb-2">{info.desc}</p>
                              <p className="text-sm text-muted-foreground">
                                {widgetCount} รูปแบบ
                              </p>
                              {widgetCount === 0 && (
                                <Badge variant="secondary" className="mt-2">เร็วๆ นี้</Badge>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Widget Selection - เลือก Widget Template */}
                {selectedCategory && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                      >
                        ← กลับ
                      </Button>
                      <h3 className="text-lg font-semibold">2️⃣ เลือกรูปแบบ {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {WIDGET_CATEGORIES[selectedCategory].map(widgetId => {
                        const widget = WIDGET_REGISTRY[widgetId]
                        if (!widget) return null

                        const SkeletonComponent = widget.skeleton

                        return (
                          <Card key={widgetId} className="overflow-hidden">
                            <div className="flex">
                              {/* Left: Widget Info */}
                              <div className="flex-1/3 p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <CardTitle className="text-lg mb-1">{widget.config.name}</CardTitle>
                                    <CardDescription className="text-sm mb-2">
                                      {widget.config.description}
                                    </CardDescription>
                                    <div className="text-xs text-muted-foreground">
                                      📝 ปรับแต่งได้ {widget.config.fields.length} อย่าง
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setPreviewWidget(previewWidget === widgetId ? null : widgetId)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      {previewWidget === widgetId ? 'ซ่อน' : 'ดู'}
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSelectWidget(widgetId)}
                                    >
                                      ✅ เลือก
                                    </Button>
                                  </div>
                                </div>

                                {/* Expanded Configuration */}
                                {previewWidget === widgetId && (
                                  <div className="mt-4 pt-4 border-t">
                                    <h4 className="font-medium mb-2 text-sm">⚙️ สิ่งที่ปรับแต่งได้:</h4>
                                    <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground">
                                      {widget.config.fields.slice(0, 6).map(field => (
                                        <div key={field.key} className="flex items-center gap-2">
                                          <div className="w-1 h-1 bg-current rounded-full"></div>
                                          {field.label}
                                        </div>
                                      ))}
                                      {widget.config.fields.length > 6 && (
                                        <div className="text-xs">และอีก {widget.config.fields.length - 6} อย่าง...</div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Right: Widget Preview */}
                              <div className="flex-2/3 w-80 border-l bg-gray-50 dark:bg-gray-900/50">
                                <div className="p-2">
                                  <div className="text-xs text-muted-foreground mb-2 text-center">🔍 ตัวอย่าง</div>
                                  <div className="transform scale-75 origin-top">
                                    <SkeletonComponent />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Existing Sections */}
        {pageData.sections.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            <p className="text-muted-foreground mb-4">🚀 ยังไม่มี section ในหน้านี้</p>
            <p className="text-sm text-muted-foreground mb-4">เริ่มต้นสร้างเนื้อหาด้วย Widget ต่างๆ</p>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              เพิ่ม Section แรก
            </Button>
          </div>
        ) : (
          pageData.sections.map((section) => (
            <Card key={section.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {section.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{section.title}</h4>
                      <Badge
                        variant={section.isActive ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => handleToggleSection(section.id)}
                      >
                        {section.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {(section as any).widgetType && (
                        <Badge variant="outline">
                          {WIDGET_REGISTRY[(section as any).widgetType]?.config.name || 'Widget'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {section.type.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSection(section.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => handleDeleteSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Section Data Preview */}
              <div className="mt-3 pl-10">
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    View Configuration
                  </summary>
                  <pre className="bg-muted/50 p-3 rounded text-xs overflow-auto mt-2 max-h-32">
                    {JSON.stringify(section.data, null, 2)}
                  </pre>
                </details>
              </div>
            </Card>
          ))
        )}
      </CardContent>

      {/* Widget Configuration Modal */}
      <WidgetConfigModal
        open={isConfigModalOpen}
        onOpenChange={setIsConfigModalOpen}
        widgetId={selectedWidget}
        editData={editingData}
        sectionId={editingSectionId || undefined}
        onConfirm={handleConfirmWidget}
        onCancel={handleCancelConfig}
      />
    </Card>
  )
}