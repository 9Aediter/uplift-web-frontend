"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, GripVertical, Edit, Eye } from "lucide-react"

interface HeroField {
  id: string
  key: string
  label: string
  type: "short" | "long"
  values: {
    en: string
    th: string
  }
}

interface HeroButton {
  id: string
  label: string
  url: string
  values: {
    en: string
    th: string
  }
}

interface HeroSectionData {
  fields: HeroField[]
  buttons: HeroButton[]
}

interface HeroSectionEditorProps {
  title?: string
  description?: string
  initialData?: HeroSectionData
  onDataChange?: (data: HeroSectionData) => void
}

const defaultData: HeroSectionData = {
  fields: [
    {
      id: "1",
      key: "badge",
      label: "Badge Text",
      type: "short",
      values: {
        en: "Innovating the Future",
        th: "Innovating the Future"
      }
    },
    {
      id: "2",
      key: "title_part1",
      label: "Title Part 1",
      type: "short",
      values: {
        en: "Transforming",
        th: "เปลี่ยน IDEAS"
      }
    },
    {
      id: "3",
      key: "title_part2",
      label: "Title Part 2",
      type: "short",
      values: {
        en: "Ideas Into",
        th: "ให้กลายเป็น"
      }
    },
    {
      id: "4",
      key: "title_gradient1",
      label: "Gradient Title 1",
      type: "short",
      values: {
        en: "Revolutionary",
        th: "นวัตกรรมระดับ"
      }
    },
    {
      id: "5",
      key: "title_gradient2",
      label: "Gradient Title 2",
      type: "short",
      values: {
        en: "Solutions",
        th: "Revolutionary"
      }
    },
    {
      id: "6",
      key: "subtitle",
      label: "Subtitle",
      type: "long",
      values: {
        en: "We're not just another tech startup. We're building the Future.",
        th: "เราไม่ใช่แค่สตาร์ทอัพด้านเทคโนโลยี แต่เรากำลังสร้างอนาคต"
      }
    }
  ],
  buttons: [
    {
      id: "1",
      label: "Launch Button",
      url: "/launch",
      values: {
        en: "Launch Your Vision",
        th: "เปิดตัววิสัยทัศน์ของคุณ"
      }
    },
    {
      id: "2",
      label: "Explore Button",
      url: "/innovations",
      values: {
        en: "Explore Our Innovations",
        th: "สำรวจนวัตกรรมของเรา"
      }
    }
  ]
}

export function HeroSectionEditor({
  title = "Hero Section",
  description = "Main banner and call-to-action area",
  initialData = defaultData,
  onDataChange
}: HeroSectionEditorProps) {
  const [data, setData] = useState<HeroSectionData>(initialData)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "th">("en")
  const [isEditMode, setIsEditMode] = useState(false)

  const handleDataUpdate = (newData: HeroSectionData) => {
    setData(newData)
    onDataChange?.(newData)
  }

  const addField = () => {
    const newField: HeroField = {
      id: Date.now().toString(),
      key: `field_${Date.now()}`,
      label: "New Field",
      type: "short",
      values: {
        en: "",
        th: ""
      }
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

  const updateField = (fieldId: string, updates: Partial<HeroField>) => {
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
    
    const newButton: HeroButton = {
      id: Date.now().toString(),
      label: "New Button",
      url: "/",
      values: {
        en: "Button Text",
        th: "ข้อความปุ่ม"
      }
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

  const updateButton = (buttonId: string, updates: Partial<HeroButton>) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              <Badge variant="outline">{currentLanguage.toUpperCase()}</Badge>
              {isEditMode && <Badge variant="secondary">Edit Mode</Badge>}
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
                        onValueChange={(value: "short" | "long") => 
                          updateField(field.id, { type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (Input)</SelectItem>
                          <SelectItem value="long">Long (Textarea)</SelectItem>
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
                  {field.type === "short" ? (
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
              <div className="space-y-2">
                <Label htmlFor="hero-badge">Badge Text</Label>
                <Input
                  id="hero-badge"
                  value={data.fields.find(f => f.key === "badge")?.values[currentLanguage] || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title-part1">Title Part 1</Label>
                  <Input
                    id="hero-title-part1"
                    value={data.fields.find(f => f.key === "title_part1")?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-title-part2">Title Part 2</Label>
                  <Input
                    id="hero-title-part2"
                    value={data.fields.find(f => f.key === "title_part2")?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-gradient1">Gradient Title 1</Label>
                  <Input
                    id="hero-gradient1"
                    value={data.fields.find(f => f.key === "title_gradient1")?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-gradient2">Gradient Title 2</Label>
                  <Input
                    id="hero-gradient2"
                    value={data.fields.find(f => f.key === "title_gradient2")?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={data.fields.find(f => f.key === "subtitle")?.values[currentLanguage] || ""}
                  readOnly
                  className="bg-muted"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-button1">Button 1 Text</Label>
                  <Input
                    id="hero-button1"
                    value={data.buttons[0]?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                  <Input
                    value={data.buttons[0]?.url || ""}
                    readOnly
                    className="bg-muted text-xs"
                    placeholder="URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-button2">Button 2 Text</Label>
                  <Input
                    id="hero-button2"
                    value={data.buttons[1]?.values[currentLanguage] || ""}
                    readOnly
                    className="bg-muted"
                  />
                  <Input
                    value={data.buttons[1]?.url || ""}
                    readOnly
                    className="bg-muted text-xs"
                    placeholder="URL"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}