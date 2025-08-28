"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { X, Save, Eye, AlertCircle, Plus, Trash2, Monitor, Smartphone } from 'lucide-react'
import { getWidgetRegistry, WidgetFactory } from '@/lib/widgets'
import { WidgetConfig, FieldDefinition, WidgetData } from '@/lib/widgets/core/types'
import { useWebsiteStore } from '@/lib/store/website-store'
import { ModalFloatingInput, ModalFloatingTextarea, ModalFloatingSelect } from './modal-floating-input'
import { z } from 'zod'

/**
 * Props สำหรับ DynamicWidgetConfigModal
 */
interface DynamicWidgetConfigModalProps {
  isOpen: boolean                    // เปิด/ปิด modal
  onClose: () => void               // function เมื่อปิด modal
  sectionId?: string               // ID ของ section (สำหรับแก้ไข)
  widgetType?: string              // ประเภทของ widget (สำหรับสร้างใหม่)
  isNewWidget?: boolean            // flag บอกว่าเป็น widget ใหม่
  onSave?: (data: WidgetData) => void                              // callback เมื่อ save
  onCreateSection?: (widgetType: string, data: WidgetData) => string // callback สำหรับสร้าง section ใหม่
}

/**
 * DynamicWidgetConfigModal - Modal สำหรับ config widget แบบ dynamic
 * สร้าง form จาก widget configuration อัตโนมัติ
 * รองรับ field types: text, textarea, select, url, image, array
 * มี validation, preview, และ real-time save
 */
export const DynamicWidgetConfigModal: React.FC<DynamicWidgetConfigModalProps> = ({
  isOpen,
  onClose,
  sectionId,
  widgetType,
  isNewWidget = false,
  onSave,
  onCreateSection
}) => {
  // ดึง functions จาก store
  const { sections, updateSectionData, addSection } = useWebsiteStore()

  // State สำหรับจัดการ form
  const [config, setConfig] = useState<WidgetConfig | null>(null)      // widget configuration
  const [formData, setFormData] = useState<WidgetData>({})            // ข้อมูลที่กรอกในฟอร์ม
  const [errors, setErrors] = useState<Record<string, string>>({})    // error messages
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set()) // fields that have been touched
  const [isPreview, setIsPreview] = useState(false)                  // mode แสดงตัวอย่าง
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop') // viewport สำหรับ preview
  const [isSaving, setIsSaving] = useState(false)                    // กำลังบันทึกอยู่

  // Initialize widget config and form data
  useEffect(() => {
    if (!isOpen) return

    const registry = getWidgetRegistry()
    let targetWidgetType = widgetType

    // If editing existing section, get widget type from section
    if (sectionId) {
      const section = sections.find(s => s.id === sectionId)
      if (section) {
        targetWidgetType = section.widgetType
        setFormData(section.data)
      }
    }

    if (targetWidgetType) {
      const widget = registry.get(targetWidgetType)
      if (widget) {
        const widgetConfig = widget.getConfig()
        setConfig(widgetConfig)

        // Initialize form data with default values if creating new
        if (!sectionId) {
          setFormData(widgetConfig.defaultData)
        }
      }
    }
  }, [isOpen, sectionId, widgetType, sections])

  /**
   * จัดการการเปลี่ยนแปลงข้อมูลใน form field
   * - รองรับทั้ง field ธรรมดาและ array field
   * - ลบ error message real-time เมื่อผู้ใช้แก้ไข
   * - ลบ field ออกจาก touchedFields เมื่อมีการแก้ไข
   */
  const handleFieldChange = (fieldKey: string, value: any, arrayIndex?: number) => {
    setFormData(prev => {
      const newData = { ...prev }

      if (arrayIndex !== undefined) {
        // Handle array field changes
        if (!Array.isArray(newData[fieldKey])) {
          newData[fieldKey] = []
        }
        newData[fieldKey][arrayIndex] = value
      } else {
        newData[fieldKey] = value
      }

      return newData
    })

    // Clear error for this field
    if (errors[fieldKey]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldKey]
        return newErrors
      })
    }

    // Remove from touched fields when user starts typing
    setTouchedFields(prev => {
      const newTouched = new Set(prev)
      newTouched.delete(fieldKey)
      return newTouched
    })
  }

  /**
   * จัดการเมื่อ field ถูก blur (ออกจาก focus)
   * - เพิ่ม field เข้า touchedFields
   * - validate field ทันที
   */
  const handleFieldBlur = (fieldKey: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldKey))
    
    // Validate this specific field
    if (config) {
      const field = config.fields.find(f => f.key === fieldKey)
      if (field?.required) {
        const value = formData[fieldKey]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          setErrors(prev => ({
            ...prev,
            [fieldKey]: `${field.label} is required`
          }))
        }
      }
    }
  }

  /**
   * ตรวจสอบว่า field มี error หรือไม่ (สำหรับสี border)
   */
  const getFieldError = (fieldKey: string): string | undefined => {
    const error = errors[fieldKey]
    const isRequired = config?.fields.find(f => f.key === fieldKey)?.required
    const isTouched = touchedFields.has(fieldKey)
    const value = formData[fieldKey]
    const isEmpty = !value || (Array.isArray(value) && value.length === 0)
    
    if (error) return error
    if (isRequired && isTouched && isEmpty) return `This field is required`
    return undefined
  }

  // Handle array field operations
  const handleArrayAdd = (fieldKey: string, defaultItem: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), defaultItem]
    }))
  }

  const handleArrayRemove = (fieldKey: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || []).filter((_: any, i: number) => i !== index)
    }))
  }

  /**
   * ตรวจสอบความถูกต้องของฟอร์ม
   * - ตรวจสอบ required fields
   * - ตรวจสอบ min/max items สำหรับ array
   * - ตรวจสอบ nested fields ใน array items
   */
  const validateForm = (): boolean => {
    if (!config) return false

    const newErrors: Record<string, string> = {}

    config.fields.forEach(field => {
      const value = formData[field.key]

      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.key] = `${field.label} is required`
      }

      if (field.type === 'array' && value && Array.isArray(value)) {
        if (field.maxItems && value.length > field.maxItems) {
          newErrors[field.key] = `Maximum ${field.maxItems} items allowed`
        }

        // Validate array items
        value.forEach((item, index) => {
          if (field.fields) {
            field.fields.forEach(subField => {
              const subValue = item[subField.key]
              if (subField.required && !subValue) {
                newErrors[`${field.key}.${index}.${subField.key}`] = `${subField.label} is required`
              }
            })
          }
        })
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * บันทึกการ config widget
   * - validate form ก่อนบันทึก
   * - ถ้ามี sectionId = อัปเดต section เก่า
   * - ถ้าเป็น widget ใหม่ = สร้าง section ใหม่พร้อมข้อมูล
   * - auto-save ผ่าน API หลังจาก 100ms
   */
  const handleSave = async () => {
    if (!validateForm() || !config || !widgetType) return

    setIsSaving(true)

    try {
      if (sectionId) {
        // Update existing section
        updateSectionData(sectionId, formData)
        console.log('🔄 Updated existing section:', sectionId)
      } else if (isNewWidget && widgetType) {
        // Create new section with configured data
        const newSectionId = addSection(widgetType)
        updateSectionData(newSectionId, formData)
        console.log('🆕 Created new section:', newSectionId, 'with data:', formData)
      } else {
        // Fallback: Call parent onSave
        onSave?.(formData)
      }

      onClose()
    } catch (error) {
      console.error('Failed to save widget config:', error)
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * แยกประเภท fields ออกเป็น short และ long fields
   * - Short: text, url, select (2 columns)
   * - Long: textarea, image, array (full width)
   */
  const categorizeFields = (fields: FieldDefinition[]) => {
    const shortFields: FieldDefinition[] = []
    const longFields: FieldDefinition[] = []
    
    fields.forEach(field => {
      if (['text', 'url', 'select'].includes(field.type)) {
        shortFields.push(field)
      } else {
        longFields.push(field)
      }
    })
    
    return { shortFields, longFields }
  }

  /**
   * Render Widget Preview Component with responsive viewport tabs
   */
  const renderWidgetPreview = () => {
    if (!widgetType || !formData) return null
    
    try {
      const WidgetComponent = WidgetFactory.render(widgetType, formData)
      if (!WidgetComponent) return <div className="text-gray-500">Preview not available</div>
      
      return (
        <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
          {/* Preview Header with Viewport Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Preview</h4>
              
              {/* Viewport Toggle */}
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setPreviewViewport('desktop')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center space-x-1 ${
                    previewViewport === 'desktop'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setPreviewViewport('mobile')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center space-x-1 ${
                    previewViewport === 'mobile'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Content with Responsive Container */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-center">
            <div className={`border rounded bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
              previewViewport === 'mobile' 
                ? 'w-[375px] min-h-[600px]' // iPhone size
                : 'w-full min-h-[400px]'     // Desktop full width
            }`}>
              <div className={`${previewViewport === 'mobile' ? 'scale-90 origin-top' : ''}`}>
                <Suspense fallback={
                  <div className="p-8 text-center text-gray-500 flex items-center justify-center min-h-[200px]">
                    <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full mr-2"></div>
                    Loading preview...
                  </div>
                }>
                  <WidgetComponent />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.error('Preview render error:', error)
      return (
        <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400 text-sm">Preview error: {(error as Error).message}</p>
        </div>
      )
    }
  }

  /**
   * แสดง form field ตามประเภท
   * - ใช้ FloatingInput components แทน HTML elements
   * - มี validation และ error display
   * - array field มี nested fields และ CRUD operations
   */
  const renderField = (field: FieldDefinition, value: any, onChange: (value: any) => void, errorKey?: string) => {
    const fieldError = getFieldError(errorKey || field.key)

    switch (field.type) {
      case 'text':
        return (
          <ModalFloatingInput
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => handleFieldBlur(field.key)}
            placeholder={field.placeholder}
            required={field.required}
            error={fieldError}
          />
        )

      case 'textarea':
        return (
          <ModalFloatingTextarea
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => handleFieldBlur(field.key)}
            placeholder={field.placeholder}
            required={field.required}
            error={fieldError}
            rows={3}
          />
        )

      case 'select':
        return (
          <ModalFloatingSelect
            label={field.label}
            value={value || field.defaultValue || ''}
            onValueChange={onChange}
            required={field.required}
            error={fieldError}
            placeholder={field.placeholder || 'Select an option'}
            options={field.options || []}
          >
            {field.options?.map(option => (
              <div key={option.value} data-value={option.value}>
                {option.label}
              </div>
            ))}
          </ModalFloatingSelect>
        )

      case 'url':
        return (
          <ModalFloatingInput
            type="url"
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => handleFieldBlur(field.key)}
            placeholder={field.placeholder}
            required={field.required}
            error={fieldError}
          />
        )

      case 'image':
        return (
          <div className="space-y-2">
            <ModalFloatingInput
              type="url"
              label={field.label}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => handleFieldBlur(field.key)}
              placeholder={field.placeholder || 'Image URL'}
              required={field.required}
              error={fieldError}
            />
            {value && (
              <div className="mt-2">
                <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
              </div>
            )}
          </div>
        )

      case 'array':
        const arrayValue = value || []
        const getDefaultItem = () => {
          const defaultItem: any = {}
          if (field.fields) {
            field.fields.forEach(subField => {
              defaultItem[subField.key] = subField.defaultValue || ''
            })
          }
          return defaultItem
        }

        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
                <span className="text-gray-500 ml-1">({arrayValue.length})</span>
              </label>
              <button
                type="button"
                onClick={() => handleArrayAdd(field.key, getDefaultItem())}
                disabled={!!field.maxItems && arrayValue.length >= field.maxItems}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {arrayValue.map((item: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Item {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleArrayRemove(field.key, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {field.fields?.map(subField => {
                      const subFieldError = getFieldError(`${field.key}.${index}.${subField.key}`)
                      
                      return (
                        <div key={subField.key}>
                          {subField.type === 'text' ? (
                            <ModalFloatingInput
                              label={subField.label}
                              value={item[subField.key] || ''}
                              onChange={(e) => {
                                const newItem = { ...item, [subField.key]: e.target.value }
                                handleFieldChange(field.key, newItem, index)
                              }}
                              onBlur={() => handleFieldBlur(`${field.key}.${index}.${subField.key}`)}
                              placeholder={subField.placeholder}
                              required={subField.required}
                              error={subFieldError}
                            />
                          ) : subField.type === 'textarea' ? (
                            <ModalFloatingTextarea
                              label={subField.label}
                              value={item[subField.key] || ''}
                              onChange={(e) => {
                                const newItem = { ...item, [subField.key]: e.target.value }
                                handleFieldChange(field.key, newItem, index)
                              }}
                              onBlur={() => handleFieldBlur(`${field.key}.${index}.${subField.key}`)}
                              placeholder={subField.placeholder}
                              required={subField.required}
                              error={subFieldError}
                              rows={2}
                            />
                          ) : subField.type === 'url' ? (
                            <ModalFloatingInput
                              type="url"
                              label={subField.label}
                              value={item[subField.key] || ''}
                              onChange={(e) => {
                                const newItem = { ...item, [subField.key]: e.target.value }
                                handleFieldChange(field.key, newItem, index)
                              }}
                              onBlur={() => handleFieldBlur(`${field.key}.${index}.${subField.key}`)}
                              placeholder={subField.placeholder}
                              required={subField.required}
                              error={subFieldError}
                            />
                          ) : (
                            renderField(
                              subField,
                              item[subField.key],
                              (subValue) => {
                                const newItem = { ...item, [subField.key]: subValue }
                                handleFieldChange(field.key, newItem, index)
                              },
                              `${field.key}.${index}.${subField.key}`
                            )
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
          </div>
        )

      default:
        return (
          <div className="text-gray-500">
            Unsupported field type: {field.type}
          </div>
        )
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-[90vw] max-h-[90vh] flex flex-col mx-auto">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {sectionId ? 'Edit Widget' : 'Configure Widget'}
            </h2>
            {config && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {config.name} - {config.description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable with hidden scrollbar */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className={`${isPreview ? 'grid grid-cols-2 gap-6' : ''} h-full`}>
            {/* Form Section */}
            <div className="p-6">
              {config && (() => {
                const { shortFields, longFields } = categorizeFields(config.fields)
                
                return (
                  <div className="space-y-6">
                    {/* Short Fields - 2 Columns */}
                    {shortFields.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {shortFields.map(field => (
                          <div key={field.key}>
                            {renderField(field, formData[field.key], (value) => handleFieldChange(field.key, value))}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Long Fields - Full Width */}
                    {longFields.length > 0 && (
                      <div className="space-y-6">
                        {longFields.map(field => (
                          <div key={field.key}>
                            {renderField(field, formData[field.key], (value) => handleFieldChange(field.key, value))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Validation Errors */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Please fix the following errors:
                      </h4>
                      <ul className="mt-1 text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                        {Object.values(errors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Section - Only show when preview is enabled */}
            {isPreview && (
              <div className="border-l border-gray-200 dark:border-gray-700 p-6 bg-gray-50/50 dark:bg-gray-900/50">
                {renderWidgetPreview()}
              </div>
            )}
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Widget'}
          </button>
        </div>
      </div>
    </div>
  )
}