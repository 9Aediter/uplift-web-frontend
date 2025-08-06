"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, GripVertical, Edit, Eye, Save, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { contentService } from "@/lib/services/content-service"
import { HeroSectionData, HeroFieldData, HeroButtonData, ContentStatus } from "@/types/content"

interface HeroSectionEditorDBProps {
  pageSlug?: string
  title?: string
  description?: string
  onDataChange?: (data: HeroSectionData) => void
}

export function HeroSectionEditorDB({
  pageSlug = "home",
  title = "Hero Section",
  description = "Main banner and call-to-action area with database integration",
  onDataChange
}: HeroSectionEditorDBProps) {
  const [data, setData] = useState<HeroSectionData>({ fields: [], buttons: [] })
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "th">("en")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [contentStatus, setContentStatus] = useState<ContentStatus>("DRAFT")
  const [contentIds, setContentIds] = useState<{ en?: string; th?: string }>({})

  // Load existing data on mount
  useEffect(() => {
    loadHeroSectionData()
  }, [pageSlug])

  const loadHeroSectionData = async () => {
    try {
      setIsLoading(true)
      
      // Try to load published content first
      let heroData = await contentService.getHeroSectionData(pageSlug)
      
      // If no published content, try to load draft content (requires admin)
      if (!heroData) {
        try {
          const [draftEn, draftTh] = await Promise.all([
            contentService.getContent({
              pageSlug,
              sectionType: "HERO_SECTION",
              language: "en",
              includeUnpublished: true
            }),
            contentService.getContent({
              pageSlug,
              sectionType: "HERO_SECTION",
              language: "th",
              includeUnpublished: true
            })
          ])

          if (draftEn.length > 0) {
            heroData = contentService.convertToHeroSectionData(draftEn[0], draftTh[0])
            setContentStatus(draftEn[0].status)
            setContentIds({
              en: draftEn[0].id,
              th: draftTh[0]?.id
            })
          }
        } catch (error) {
          // User doesn't have permission to view draft content
          console.log("No draft content available or permission denied")
        }
      }

      if (heroData) {
        setData(heroData)
        onDataChange?.(heroData)
      } else {
        // Set default data if no content exists
        setData({
          fields: [
            {
              id: "1",
              key: "badge",
              label: "Badge Text",
              type: "SHORT",
              values: { en: "Innovating the Future", th: "Innovating the Future" }
            },
            {
              id: "2",
              key: "title_part1",
              label: "Title Part 1",
              type: "SHORT",  
              values: { en: "Transforming", th: "เปลี่ยน IDEAS" }
            },
            {
              id: "3",
              key: "subtitle",
              label: "Subtitle",
              type: "LONG",
              values: { en: "We're building the future", th: "เรากำลังสร้างอนาคต" }
            }
          ],
          buttons: [
            {
              id: "1",
              label: "Launch Button",
              url: "/launch",
              values: { en: "Launch Your Vision", th: "เปิดตัววิสัยทัศน์ของคุณ" }
            }
          ]
        })
      }
    } catch (error) {
      console.error("Error loading hero section data:", error)
      toast.error("Failed to load content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDataUpdate = (newData: HeroSectionData) => {
    setData(newData)
    onDataChange?.(newData)
  }

  const saveToDatabase = async () => {
    try {
      setIsSaving(true)
      
      if (contentIds.en && contentIds.th) {
        // Update existing content
        await contentService.updateHeroSectionData(data, contentIds.en, contentIds.th)
        toast.success("Content updated successfully")
      } else {
        // Create new content
        const result = await contentService.saveHeroSectionData(data, pageSlug)
        setContentIds({
          en: result.en.id,
          th: result.th.id
        })
        toast.success("Content saved successfully")
      }
      
      setContentStatus("DRAFT")
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Failed to save content")
    } finally {
      setIsSaving(false)
    }
  }

  const updateContentStatus = async (newStatus: ContentStatus) => {
    if (!contentIds.en || !contentIds.th) {
      toast.error("Please save content first")
      return
    }

    try {
      await Promise.all([
        contentService.updateContentStatus({
          contentId: contentIds.en,
          status: newStatus
        }),
        contentService.updateContentStatus({
          contentId: contentIds.th,
          status: newStatus
        })
      ])
      
      setContentStatus(newStatus)
      toast.success(`Content ${newStatus.toLowerCase()} successfully`)
    } catch (error) {
      console.error("Error updating content status:", error)
      toast.error("Failed to update content status")
    }
  }

  const addField = () => {
    const newField: HeroFieldData = {
      id: Date.now().toString(),
      key: `field_${Date.now()}`,
      label: "New Field",
      type: "SHORT",
      values: { en: "", th: "" }
    }
    
    handleDataUpdate({
      ...data,
      fields: [...data.fields, newField]
    })
  }

  const removeField = (fieldId: string) => {
    handleDataUpdate({
      ...data,
      fields: data.fields.filter(field => field.id !== fieldId)
    })
  }

  const updateField = (fieldId: string, updates: Partial<HeroFieldData>) => {
    handleDataUpdate({
      ...data,
      fields: data.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    })
  }

  const updateFieldValue = (fieldId: string, language: "en" | "th", value: string) => {
    handleDataUpdate({
      ...data,
      fields: data.fields.map(field =>
        field.id === fieldId
          ? {
              ...field,
              values: {
                ...field.values,
                [language]: value
              }
            }
          : field
      )
    })
  }

  const addButton = () => {
    if (data.buttons.length >= 2) return
    
    const newButton: HeroButtonData = {
      id: Date.now().toString(),
      label: "New Button",
      url: "/",
      values: { en: "Button Text", th: "ข้อความปุ่ม" }
    }
    
    handleDataUpdate({
      ...data,
      buttons: [...data.buttons, newButton]
    })
  }

  const removeButton = (buttonId: string) => {
    handleDataUpdate({
      ...data,
      buttons: data.buttons.filter(button => button.id !== buttonId)
    })
  }

  const updateButton = (buttonId: string, updates: Partial<HeroButtonData>) => {
    handleDataUpdate({
      ...data,
      buttons: data.buttons.map(button =>
        button.id === buttonId ? { ...button, ...updates } : button
      )
    })
  }

  const updateButtonValue = (buttonId: string, language: "en" | "th", value: string) => {
    handleDataUpdate({
      ...data,
      buttons: data.buttons.map(button =>
        button.id === buttonId
          ? {
              ...button,
              values: {
                ...button.values,
                [language]: value
              }
            }
          : button
      )
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          Loading content...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              <Badge variant="outline">{currentLanguage.toUpperCase()}</Badge>
              {isEditMode && <Badge variant="secondary">Edit Mode</Badge>}
              <Badge 
                variant={contentStatus === "PUBLISHED" ? "default" : 
                        contentStatus === "REVIEW" ? "secondary" : "outline"}
              >
                {contentStatus}
              </Badge>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="language-switch" className="text-sm">
                {currentLanguage === "en" ? "EN" : "TH"}
              </Label>
              <Switch
                id="language-switch"
                checked={currentLanguage === "th"}
                onCheckedChange={(checked) => setCurrentLanguage(checked ? "th" : "en")}
              />
            </div>
            
            {/* Status Actions */}
            <div className="flex items-center gap-2">
              {contentStatus === "DRAFT" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateContentStatus("REVIEW")}
                >
                  Submit for Review
                </Button>
              )}
              {contentStatus === "REVIEW" && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => updateContentStatus("PUBLISHED")}
                >
                  Publish
                </Button>
              )}
              {contentStatus === "PUBLISHED" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateContentStatus("ARCHIVED")}
                >
                  Archive
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={saveToDatabase}
              disabled={isSaving}
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditMode ? (
          <>
            {/* Edit Mode - Dynamic Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Content Fields</h4>
                <Button onClick={addField} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {data.fields.map((field) => (
                <Card key={field.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Field Key</Label>
                          <Input
                            value={field.key}
                            onChange={(e) => updateField(field.id, { key: e.target.value })}
                            placeholder="field_key"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            placeholder="Field Label"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select
                            value={field.type}
                            onValueChange={(value: "SHORT" | "LONG") => 
                              updateField(field.id, { type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SHORT">Short (Input)</SelectItem>
                              <SelectItem value="LONG">Long (Textarea)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeField(field.id)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>{field.label} ({currentLanguage.toUpperCase()})</Label>
                      {field.type === "SHORT" ? (
                        <Input
                          value={field.values[currentLanguage]}
                          onChange={(e) => updateFieldValue(field.id, currentLanguage, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <Textarea
                          value={field.values[currentLanguage]}
                          onChange={(e) => updateFieldValue(field.id, currentLanguage, e.target.value)}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          rows={3}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Action Buttons</h4>
                <Button 
                  onClick={addButton} 
                  size="sm" 
                  variant="outline"
                  disabled={data.buttons.length >= 2}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Button {data.buttons.length < 2 && `(${2 - data.buttons.length} left)`}
                </Button>
              </div>

              {data.buttons.map((button) => (
                <Card key={button.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Button Label</Label>
                          <Input
                            value={button.label}
                            onChange={(e) => updateButton(button.id, { label: e.target.value })}
                            placeholder="Button Label"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>URL</Label>
                          <Input
                            value={button.url}
                            onChange={(e) => updateButton(button.id, { url: e.target.value })}
                            placeholder="/path/to/page"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={() => removeButton(button.id)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Button Text ({currentLanguage.toUpperCase()})</Label>
                      <Input
                        value={button.values[currentLanguage]}
                        onChange={(e) => updateButtonValue(button.id, currentLanguage, e.target.value)}
                        placeholder={`Enter button text`}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* View Mode - Static Fields */}
            <div className="space-y-4">
              {data.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                  {field.type === "SHORT" ? (
                    <Input
                      id={`field-${field.id}`}
                      value={field.values[currentLanguage] || ""}
                      readOnly
                      className="bg-muted"
                    />
                  ) : (
                    <Textarea
                      id={`field-${field.id}`}
                      value={field.values[currentLanguage] || ""}
                      readOnly
                      className="bg-muted"
                      rows={3}
                    />
                  )}
                </div>
              ))}

              {data.buttons.length > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {data.buttons.map((button, index) => (
                      <div key={button.id} className="space-y-2">
                        <Label htmlFor={`button-${button.id}`}>
                          {button.label} Text
                        </Label>
                        <Input
                          id={`button-${button.id}`}
                          value={button.values[currentLanguage] || ""}
                          readOnly
                          className="bg-muted"
                        />
                        <Input
                          value={button.url || ""}
                          readOnly
                          className="bg-muted text-xs"
                          placeholder="URL"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}