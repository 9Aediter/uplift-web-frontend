export type WidgetCategory = 'card' | 'cards' | 'carousel' | 'tabs' | 'hero' | 'content' | 'interactive' | 'grid'

export interface FieldDefinition {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'color' | 'image' | 'icon-picker' | 'url' | 'array' | 'group'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  maxItems?: number
  fields?: FieldDefinition[]
  defaultValue?: any
}

export interface WidgetConfig {
  id: string
  name: string
  category: WidgetCategory
  description: string
  maxItems?: number
  fields: FieldDefinition[]
  defaultData: any
}

export interface WidgetMetadata {
  id: string
  name: string
  category: WidgetCategory
  description: string
  version: string
  author?: string
  tags?: string[]
  preview?: string
}

export interface RenderContext {
  isPreview?: boolean
  isAdmin?: boolean
  pageSlug?: string
  sectionId?: string
  locale?: string
  theme?: 'light' | 'dark'
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

export interface WidgetData {
  [key: string]: any
}

export interface SectionData {
  id: string
  type?: 'widget'
  widgetType: string
  title?: string
  order?: number
  isActive?: boolean
  data: WidgetData
  metadata?: {
    createdAt?: string
    updatedAt?: string
    createdBy?: string
  }
}