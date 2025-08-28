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
import { Edit, Eye, Save, RefreshCw, Palette } from "lucide-react"
import { toast } from "sonner"
import { useHomeStore } from "@/lib/store/home-store"
import { HeroSelector } from "./website/hero-selector"
import { getHeroRegistry, BaseHeroWidget } from "@/lib/widgets/hero"
import { HeroData } from "@/lib/widgets/hero/BaseHeroWidget"

interface HeroSectionData {
  heroWidgetType?: string
  titleEn: string
  titleTh: string
  subtitleEn: string
  subtitleTh: string
  descriptionEn: string
  descriptionTh: string
  backgroundImageUrl: string
  ctaButtonTextEn: string
  ctaButtonTextTh: string
  ctaButtonUrl: string
  ctaButtonType: 'primary' | 'secondary'
  overlayOpacity: number
  textPosition: 'left' | 'center' | 'right'
  isActive: boolean
}

interface HeroSectionEditorProps {
  pageId?: string
  pageSlug?: string // Keep for backward compatibility
  title?: string
  description?: string
  onDataChange?: (data: HeroSectionData) => void
  mode?: 'simple' | 'advanced'
  initialData?: HeroSectionData
}

export function HeroSectionEditor({
  pageId,
  pageSlug = "home",
  title = "Hero Section",
  description = "Main banner and call-to-action area",
  onDataChange,
  mode = 'advanced',
  initialData
}: HeroSectionEditorProps) {
  const { heroData, status, isLoading, loadHeroData, updateHeroData, saveHeroData, publishHeroData } = useHomeStore()
  
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "th">("en")
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showHeroSelector, setShowHeroSelector] = useState(false)
  const [currentHeroWidget, setCurrentHeroWidget] = useState<BaseHeroWidget | null>(null)
  const [data, setData] = useState<HeroSectionData>(
    initialData || {
      heroWidgetType: 'hero-simple',
      titleEn: '',
      titleTh: '',
      subtitleEn: '',
      subtitleTh: '',
      descriptionEn: '',
      descriptionTh: '',
      backgroundImageUrl: '',
      ctaButtonTextEn: '',
      ctaButtonTextTh: '',
      ctaButtonUrl: '',
      ctaButtonType: 'primary',
      overlayOpacity: 0.5,
      textPosition: 'center',
      isActive: true
    }
  )

  // Use different data sources based on mode
  const currentData = mode === 'simple' ? data : heroData
  const isUsingStore = mode === 'advanced'

  // Load data on mount for advanced mode
  useEffect(() => {
    if (mode === 'advanced' && pageId) {
      loadHeroData(pageId)
    } else if (mode === 'advanced' && pageSlug) {
      // Fallback to pageSlug for backward compatibility
      loadHeroData(pageSlug)
    }
  }, [pageId, pageSlug, loadHeroData, mode])

  // Update parent when data changes
  useEffect(() => {
    if (currentData.titleEn || currentData.titleTh) {
      onDataChange?.(currentData)
    }
  }, [currentData, onDataChange])

  // Update local state for simple mode
  useEffect(() => {
    if (mode === 'simple' && initialData) {
      setData(initialData)
    }
  }, [initialData, mode])

  // Initialize current hero widget
  useEffect(() => {
    const heroRegistry = getHeroRegistry()
    const heroType = currentData.heroWidgetType || 'hero-simple'
    const widget = heroRegistry.get(heroType)
    setCurrentHeroWidget(widget || null)
  }, [currentData.heroWidgetType])

  const handleDataUpdate = (newData: HeroSectionData) => {
    if (mode === 'simple') {
      setData(newData)
    } else {
      updateHeroData(newData)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      if (mode === 'advanced') {
        await saveHeroData()
      }
      toast.success("Content saved successfully")
      // Auto switch back to view mode after successful save
      setIsEditMode(false)
    } catch (error) {
      toast.error("Failed to save content")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    try {
      if (mode === 'advanced') {
        await publishHeroData()
      }
      toast.success("Content published successfully")
    } catch (error) {
      toast.error("Failed to publish content")
    }
  }

  const updateHeroField = (field: keyof HeroSectionData, value: any) => {
    const updatedData = { ...currentData, [field]: value }
    handleDataUpdate(updatedData)
  }

  const handleHeroWidgetSelect = (heroWidget: BaseHeroWidget, heroData: HeroData) => {
    console.log('📝 [HERO EDITOR] Selected hero widget:', heroWidget.name, heroWidget.id)
    console.log('📝 [HERO EDITOR] Hero data:', heroData)
    
    // Convert HeroData to HeroSectionData format
    const updatedData: HeroSectionData = {
      ...currentData,
      heroWidgetType: heroWidget.id,
      titleEn: heroData.titleEn || currentData.titleEn,
      titleTh: heroData.titleTh || currentData.titleTh,
      subtitleEn: heroData.subtitleEn || currentData.subtitleEn,
      subtitleTh: heroData.subtitleTh || currentData.subtitleTh,
      descriptionEn: heroData.descriptionEn || currentData.descriptionEn,
      descriptionTh: heroData.descriptionTh || currentData.descriptionTh,
      backgroundImageUrl: heroData.backgroundImageUrl || currentData.backgroundImageUrl,
      ctaButtonTextEn: heroData.ctaButtonTextEn || currentData.ctaButtonTextEn,
      ctaButtonTextTh: heroData.ctaButtonTextTh || currentData.ctaButtonTextTh,
      ctaButtonUrl: heroData.ctaButtonUrl || currentData.ctaButtonUrl,
      ctaButtonType: heroData.ctaButtonType || currentData.ctaButtonType,
      overlayOpacity: heroData.overlayOpacity ?? currentData.overlayOpacity,
      textPosition: heroData.textPosition || currentData.textPosition,
      isActive: heroData.isActive ?? currentData.isActive,
    }
    
    handleDataUpdate(updatedData)
    setCurrentHeroWidget(heroWidget)
    toast.success(`Hero pattern configured: ${heroWidget.name}`)
  }

  if (isUsingStore && isLoading) {
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
              {mode === 'advanced' && (
                <>
                  <Badge variant="outline">{currentLanguage.toUpperCase()}</Badge>
                  {isEditMode && <Badge variant="secondary">Edit Mode</Badge>}
                  <Badge 
                    variant={status === "published" ? "default" : 
                            status === "draft" ? "outline" : "secondary"}
                  >
                    {status.toUpperCase()}
                  </Badge>
                  {currentHeroWidget && (
                    <Badge variant="outline" className="ml-2">
                      {currentHeroWidget.name}
                    </Badge>
                  )}
                </>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          <div className="flex items-center gap-4">
            {mode === 'advanced' && (
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
            )}
            
            {/* Status Actions */}
            {mode === 'advanced' && (
              <div className="flex items-center gap-2">
                {status === "draft" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handlePublish}
                  >
                    Publish
                  </Button>
                )}
              </div>
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHeroSelector(true)}
            >
              <Palette className="h-4 w-4 mr-2" />
              Change Pattern
            </Button>

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
              onClick={handleSave}
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
            {/* Edit Mode - Hero Fields */}
            <div className="space-y-6">
              {/* Title Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Hero Title</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Title ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                    <Input
                      value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.titleEn : currentData.titleTh) : currentData.titleEn}
                      onChange={(e) => 
                        mode === 'advanced'
                          ? updateHeroField(currentLanguage === 'en' ? 'titleEn' : 'titleTh', e.target.value)
                          : updateHeroField('titleEn', e.target.value)
                      }
                      placeholder="Enter hero title"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Hero Subtitle</h4>
                <div className="space-y-2">
                  <Label>Subtitle ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                  <Input
                    value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.subtitleEn : currentData.subtitleTh) : currentData.subtitleEn}
                    onChange={(e) => 
                      mode === 'advanced'
                        ? updateHeroField(currentLanguage === 'en' ? 'subtitleEn' : 'subtitleTh', e.target.value)
                        : updateHeroField('subtitleEn', e.target.value)
                    }
                    placeholder="Enter hero subtitle"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Hero Description</h4>
                <div className="space-y-2">
                  <Label>Description ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                  <Textarea
                    value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.descriptionEn : currentData.descriptionTh) : currentData.descriptionEn}
                    onChange={(e) => 
                      mode === 'advanced'
                        ? updateHeroField(currentLanguage === 'en' ? 'descriptionEn' : 'descriptionTh', e.target.value)
                        : updateHeroField('descriptionEn', e.target.value)
                    }
                    placeholder="Enter hero description"
                    rows={3}
                  />
                </div>
              </div>

              {/* Background Image */}
              <div className="space-y-4">
                <h4 className="font-medium">Background Image</h4>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={currentData.backgroundImageUrl}
                    onChange={(e) => updateHeroField('backgroundImageUrl', e.target.value)}
                    placeholder="https://example.com/hero-bg.jpg"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4">
                <h4 className="font-medium">Call-to-Action Button</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                    <Input
                      value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.ctaButtonTextEn : currentData.ctaButtonTextTh) : currentData.ctaButtonTextEn}
                      onChange={(e) => 
                        mode === 'advanced'
                          ? updateHeroField(currentLanguage === 'en' ? 'ctaButtonTextEn' : 'ctaButtonTextTh', e.target.value)
                          : updateHeroField('ctaButtonTextEn', e.target.value)
                      }
                      placeholder="Enter button text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Button URL</Label>
                    <Input
                      value={currentData.ctaButtonUrl}
                      onChange={(e) => updateHeroField('ctaButtonUrl', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Button Type</Label>
                  <Select
                    value={currentData.ctaButtonType}
                    onValueChange={(value: 'primary' | 'secondary') => updateHeroField('ctaButtonType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Advanced Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Text Position</Label>
                    <Select
                      value={currentData.textPosition}
                      onValueChange={(value: 'left' | 'center' | 'right') => updateHeroField('textPosition', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Overlay Opacity ({Math.round(currentData.overlayOpacity * 100)}%)</Label>
                    <Input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={currentData.overlayOpacity}
                      onChange={(e) => updateHeroField('overlayOpacity', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hero-active"
                    checked={currentData.isActive}
                    onCheckedChange={(checked) => updateHeroField('isActive', checked)}
                  />
                  <Label htmlFor="hero-active">Hero Section Active</Label>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* View Mode - Hero Preview */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                <Input
                  value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.titleEn : currentData.titleTh) : currentData.titleEn}
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Subtitle ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                <Input
                  value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.subtitleEn : currentData.subtitleTh) : currentData.subtitleEn}
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Description ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                <Textarea
                  value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.descriptionEn : currentData.descriptionTh) : currentData.descriptionEn}
                  readOnly
                  className="bg-muted"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Background Image</Label>
                <Input
                  value={currentData.backgroundImageUrl}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CTA Button Text ({mode === 'advanced' ? currentLanguage.toUpperCase() : 'Text'})</Label>
                  <Input
                    value={mode === 'advanced' ? (currentLanguage === 'en' ? currentData.ctaButtonTextEn : currentData.ctaButtonTextTh) : currentData.ctaButtonTextEn}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button URL</Label>
                  <Input
                    value={currentData.ctaButtonUrl}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <Label>Button Type</Label>
                  <Badge variant="outline" className="ml-2">{currentData.ctaButtonType}</Badge>
                </div>
                <div>
                  <Label>Text Position</Label>
                  <Badge variant="outline" className="ml-2">{currentData.textPosition}</Badge>
                </div>
                <div>
                  <Label>Overlay</Label>
                  <Badge variant="outline" className="ml-2">{Math.round(currentData.overlayOpacity * 100)}%</Badge>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {/* Hero Widget Selector */}
      <HeroSelector
        isOpen={showHeroSelector}
        onClose={() => setShowHeroSelector(false)}
        onSelect={handleHeroWidgetSelect}
        currentHeroId={currentData.heroWidgetType}
        initialData={{
          titleEn: currentData.titleEn,
          titleTh: currentData.titleTh,
          subtitleEn: currentData.subtitleEn,
          subtitleTh: currentData.subtitleTh,
          descriptionEn: currentData.descriptionEn,
          descriptionTh: currentData.descriptionTh,
          backgroundImageUrl: currentData.backgroundImageUrl,
          ctaButtonTextEn: currentData.ctaButtonTextEn,
          ctaButtonTextTh: currentData.ctaButtonTextTh,
          ctaButtonUrl: currentData.ctaButtonUrl,
          ctaButtonType: currentData.ctaButtonType,
          overlayOpacity: currentData.overlayOpacity,
          textPosition: currentData.textPosition,
          isActive: currentData.isActive,
        }}
      />
    </Card>
  )
}