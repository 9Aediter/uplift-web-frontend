export type ContentStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED"
export type ContentType = "HERO_SECTION" | "PROBLEM_SECTION" | "FEATURES_SECTION" | "TESTIMONIALS" | "FAQ"
export type FieldType = "SHORT" | "LONG"

export interface ContentField {
  id: string
  contentId: string
  key: string
  label: string
  type: FieldType
  value: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface ContentButton {
  id: string
  contentId: string
  label: string
  text: string
  url: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Content {
  id: string
  pageSlug: string
  sectionType: ContentType
  language: string
  status: ContentStatus
  version: number
  
  // Relations
  fields: ContentField[]
  buttons: ContentButton[]
  
  // Workflow
  createdBy: string
  updatedBy?: string
  reviewedBy?: string
  publishedBy?: string
  publishedAt?: Date
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  
  // User relations (when included)
  creator?: {
    id: string
    email: string
    profile?: {
      displayName?: string
      firstName?: string
      lastName?: string
    } | null
  }
  updater?: {
    id: string
    email: string
    profile?: {
      displayName?: string
      firstName?: string
      lastName?: string
    } | null
  } | null
}

export interface ContentHistory {
  id: string
  contentId: string
  action: string
  changes?: any
  userId: string
  createdAt: Date
  
  user?: {
    id: string
    email: string
    profile?: {
      displayName?: string
      firstName?: string
      lastName?: string
    } | null
  }
}

// API Request/Response types
export interface CreateContentRequest {
  pageSlug: string
  sectionType: ContentType
  language?: string
  fields: {
    key: string
    label: string
    type: FieldType
    value: string
    order?: number
  }[]
  buttons?: {
    label: string
    text: string
    url: string
    order?: number
  }[]
}

export interface UpdateContentRequest {
  fields: {
    id?: string
    key: string
    label: string
    type: FieldType
    value: string
    order?: number
  }[]
  buttons?: {
    id?: string
    label: string
    text: string
    url: string
    order?: number
  }[]
}

export interface UpdateContentStatusRequest {
  status: ContentStatus
  contentId: string
}

export interface ContentResponse {
  data: Content | Content[]
  error?: string
  details?: any
}

// Hero Section specific types
export interface HeroFieldData {
  id: string
  key: string
  label: string
  type: FieldType
  values: {
    en: string
    th: string
  }
}

export interface HeroButtonData {
  id: string
  label: string
  url: string
  values: {
    en: string
    th: string
  }
}

export interface HeroSectionData {
  fields: HeroFieldData[]
  buttons: HeroButtonData[]
}