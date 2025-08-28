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
  category: 'cards' | 'carousel' | 'tabs' | 'hero' | 'content' | 'interactive'
  description: string
  maxItems?: number
  fields: FieldDefinition[]
  defaultData: any
}

export interface Widget {
  config: WidgetConfig
  component: React.ComponentType<any>
  skeleton: React.ComponentType
  preview?: string
}