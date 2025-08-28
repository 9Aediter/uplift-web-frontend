"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { X, Save, Eye, AlertCircle, Monitor, Smartphone, Sparkles } from 'lucide-react'
import { getHeroRegistry } from '@/lib/widgets/hero'
import { BaseHeroWidget, HeroData } from '@/lib/widgets/hero/BaseHeroWidget'
import { FieldDefinition } from '@/lib/widgets/core/types'
import { ModalFloatingInput, ModalFloatingTextarea, ModalFloatingSelect } from './modal-floating-input'

interface HeroConfigModalProps {
  isOpen: boolean
  onClose: () => void
  heroWidget: BaseHeroWidget | null
  initialData?: Partial<HeroData>
  onSave: (heroWidget: BaseHeroWidget, data: HeroData) => void
}

export const HeroConfigModal: React.FC<HeroConfigModalProps> = ({
  isOpen,
  onClose,
  heroWidget,
  initialData,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<HeroData>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [isPreview, setIsPreview] = useState(false)
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [isSaving, setIsSaving] = useState(false)

  // Initialize form data
  useEffect(() => {
    if (!isOpen || !heroWidget) return

    // Start with hero widget default data
    const defaultData = heroWidget.getDefaultData()
    
    // Override with initial data if provided
    const mergedData = {
      ...defaultData,
      ...initialData
    }
    
    setFormData(mergedData)
  }, [isOpen, heroWidget, initialData])

  const handleFieldChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }))

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

  const handleFieldBlur = (fieldKey: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldKey))
    
    if (heroWidget) {
      const config = heroWidget.getConfig()
      const field = config.fields.find(f => f.key === fieldKey)
      if (field?.required) {
        const value = formData[fieldKey as keyof HeroData]
        if (!value) {
          setErrors(prev => ({
            ...prev,
            [fieldKey]: `${field.label} is required`
          }))
        }
      }
    }
  }

  const getFieldError = (fieldKey: string): string | undefined => {
    if (!heroWidget) return undefined
    
    const error = errors[fieldKey]
    const config = heroWidget.getConfig()
    const field = config.fields.find(f => f.key === fieldKey)
    const isRequired = field?.required
    const isTouched = touchedFields.has(fieldKey)
    const value = formData[fieldKey as keyof HeroData]
    const isEmpty = !value
    
    if (error) return error
    if (isRequired && isTouched && isEmpty) return `This field is required`
    return undefined
  }

  const validateForm = (): boolean => {
    if (!heroWidget) return false

    const config = heroWidget.getConfig()
    const newErrors: Record<string, string> = {}

    config.fields.forEach(field => {
      const value = formData[field.key as keyof HeroData]

      if (field.required && !value) {
        newErrors[field.key] = `${field.label} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm() || !heroWidget) return

    setIsSaving(true)

    try {
      // Transform formData to complete HeroData
      const heroData = {
        ...heroWidget.getDefaultData(),
        ...formData
      } as HeroData

      onSave(heroWidget, heroData)
      onClose()
    } catch (error) {
      console.error('Failed to save hero config:', error)
    } finally {
      setIsSaving(false)
    }
  }

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

  const renderHeroPreview = () => {
    if (!heroWidget || !formData) return null
    
    try {
      const heroData = {
        ...heroWidget.getDefaultData(),
        ...formData
      } as HeroData

      // Get rendered component from hero widget
      const HeroComponent = heroWidget.render(heroData)
      if (!HeroComponent) return <div className="text-gray-500">Preview not available</div>
      
      return (
        <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
          {/* Preview Header with Viewport Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Live Hero Preview
              </h4>
              
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
                    Loading hero preview...
                  </div>
                }>
                  <HeroComponent />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.error('Hero preview render error:', error)
      return (
        <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400 text-sm">Preview error: {(error as Error).message}</p>
        </div>
      )
    }
  }

  const renderField = (field: FieldDefinition, value: any, onChange: (value: any) => void) => {
    const fieldError = getFieldError(field.key)

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

      default:
        return (
          <div className="text-gray-500">
            Unsupported field type: {field.type}
          </div>
        )
    }
  }

  if (!isOpen || !heroWidget) return null

  const config = heroWidget.getConfig()
  const { shortFields, longFields } = categorizeFields(config.fields)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-[90vw] max-h-[90vh] flex flex-col mx-auto">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Configure Hero Pattern
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {heroWidget.name} - {heroWidget.description}
            </p>
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className={`${isPreview ? 'grid grid-cols-2 gap-6' : ''} h-full`}>
            {/* Form Section */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Short Fields - 2 Columns */}
                {shortFields.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {shortFields.map(field => (
                      <div key={field.key}>
                        {renderField(field, formData[field.key as keyof HeroData], (value) => handleFieldChange(field.key, value))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Long Fields - Full Width */}
                {longFields.length > 0 && (
                  <div className="space-y-6">
                    {longFields.map(field => (
                      <div key={field.key}>
                        {renderField(field, formData[field.key as keyof HeroData], (value) => handleFieldChange(field.key, value))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
                {renderHeroPreview()}
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
            {isSaving ? 'Saving...' : 'Save Hero Pattern'}
          </button>
        </div>
      </div>
    </div>
  )
}