"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/button/button"
import { Input } from "@/components/input/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/input/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/input/select"
import { Trash2, Plus, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { WIDGET_REGISTRY } from "@/components/widgets"
import type { FieldDefinition } from "@/components/widgets/types"

interface WidgetConfigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  widgetId: string | null
  editData?: any // Existing section data for editing
  sectionId?: string // Section ID for editing
  onConfirm: (widgetId: string, data: any, sectionId?: string) => void
  onCancel: () => void
}

export function WidgetConfigModal({
  open,
  onOpenChange,
  widgetId,
  editData,
  sectionId,
  onConfirm,
  onCancel
}: WidgetConfigModalProps) {
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const widget = widgetId ? WIDGET_REGISTRY[widgetId] : null

  // Initialize form data when widget changes
  useEffect(() => {
    if (widget) {
      // Use editData if editing, otherwise use default data
      const initialData = editData || widget.config.defaultData
      setFormData(initialData)
      setErrors({})
    }
  }, [widget, editData])

  if (!widget) return null

  const handleInputChange = (key: string, value: any, parentKey?: string) => {
    if (parentKey) {
      setFormData((prev: any) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [key]: value
        }
      }))
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [key]: value
      }))
    }

    // Clear error when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }))
    }
  }

  const handleArrayChange = (fieldKey: string, index: number, itemKey: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldKey]: prev[fieldKey].map((item: any, i: number) =>
        i === index ? { ...item, [itemKey]: value } : item
      )
    }))
  }

  const handleAddArrayItem = (fieldKey: string, field: FieldDefinition) => {
    const currentItems = formData[fieldKey] || []
    if (field.maxItems && currentItems.length >= field.maxItems) {
      toast.error(`Maximum ${field.maxItems} items allowed`)
      return
    }

    const newItem: any = {}
    field.fields?.forEach(subField => {
      newItem[subField.key] = subField.defaultValue || ''
    })

    setFormData((prev: any) => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), newItem]
    }))
  }

  const handleRemoveArrayItem = (fieldKey: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldKey]: prev[fieldKey].filter((_: any, i: number) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    widget.config.fields.forEach(field => {
      if (field.required && !formData[field.key]) {
        newErrors[field.key] = `${field.label} is required`
      }

      if (field.type === 'array' && field.fields) {
        const arrayItems = formData[field.key] || []
        arrayItems.forEach((item: any, index: number) => {
          field.fields?.forEach(subField => {
            if (subField.required && !item[subField.key]) {
              newErrors[`${field.key}[${index}].${subField.key}`] = `${subField.label} is required`
            }
          })
        })
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onConfirm(widgetId!, formData, sectionId)
      setFormData({})
      setErrors({})
    }
  }

  const renderField = (field: FieldDefinition, value: any, onChange: (value: any) => void, keyPrefix: string = '') => {
    const fieldKey = keyPrefix ? `${keyPrefix}.${field.key}` : field.key
    const error = errors[fieldKey]

    switch (field.type) {
      case 'text':
      case 'url':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
            <Input
              id={fieldKey}
              type={field.type === 'url' ? 'url' : 'text'}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )

      case 'textarea':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
            <Textarea
              id={fieldKey}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )

      case 'select':
        return (
          <div key={fieldKey} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )

      case 'array':
        const arrayItems = value || []
        return (
          <div key={fieldKey} className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddArrayItem(field.key, field)}
                disabled={field.maxItems ? arrayItems.length >= field.maxItems : false}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {arrayItems.map((item: any, index: number) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveArrayItem(field.key, index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {field.fields?.map(subField =>
                      renderField(
                        subField,
                        item[subField.key],
                        (val) => handleArrayChange(field.key, index, subField.key, val),
                        `${field.key}[${index}]`
                      )
                    )}
                  </div>
                </Card>
              ))}
              {arrayItems.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">No items added yet</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[90vw] w-[90vw] max-h-[90vh] overflow-hidden flex flex-col sm:!max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {sectionId ? 'Edit' : 'Configure'} {widget.config.name}
          </DialogTitle>
          <DialogDescription>
            {sectionId ? 'แก้ไข' : 'กำหนดค่า'}เนื้อหาและรูปแบบสำหรับ {widget.config.name} section
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Widget Settings</CardTitle>
                  <CardDescription>
                    กำหนดค่าเนื้อหาที่จะแสดงผล
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {widget.config.fields.map(field =>
                    renderField(
                      field,
                      formData[field.key],
                      (value) => handleInputChange(field.key, value)
                    )
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                  <CardDescription>
                    ตัวอย่างที่จะแสดงผลบนหน้าเว็บ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900/50">
                    <div className="text-xs text-muted-foreground mb-2 text-center">
                      🔍 Preview (ตัวอย่างการแสดงผล)
                    </div>
                    <div className="transform scale-75 origin-top">
                      <widget.skeleton />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Widget Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Widget Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Category:</strong> {widget.config.category}</div>
                  <div><strong>Description:</strong> {widget.config.description}</div>
                  <div><strong>Configurable Fields:</strong> {widget.config.fields.length} items</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {sectionId ? '💾 Update Section' : '✅ Add Section'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}