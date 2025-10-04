import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Temporary types (replacing widget types)
type SectionData = Record<string, unknown>
type WidgetData = Record<string, unknown>

export interface WebsitePageData {
  id: string
  title: string
  slug: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  sections: SectionData[]
  metadata: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    status: 'draft' | 'published' | 'archived'
  }
}

interface WebsiteState {
  currentPage: WebsitePageData | null
  sections: SectionData[]
  selectedSection: string | null
  isLoading: boolean
  isDirty: boolean
  pages: WebsitePageData[]
  availableWidgets: Record<string, unknown>[]
  previewMode: 'desktop' | 'tablet' | 'mobile'
  showPreview: boolean
}

interface WebsiteActions {
  loadPage: (id: string) => Promise<void>
  loadPagesList: () => Promise<void>
  createNewPage: (title: string, slug: string) => void
  savePage: () => Promise<void>
  publishPage: () => Promise<void>
  resetPage: () => void
  setPageMetadata: (metadata: Partial<WebsitePageData>) => void
  addSection: (widgetType: string, insertAfter?: string) => string
  updateSection: (sectionId: string, data: Partial<SectionData>) => void
  updateSectionData: (sectionId: string, data: WidgetData) => void
  deleteSection: (sectionId: string) => void
  duplicateSection: (sectionId: string) => string
  reorderSections: (sectionIds: string[]) => void
  toggleSectionActive: (sectionId: string) => void
  selectSection: (sectionId: string | null) => void
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  togglePreview: () => void
  generateSectionId: () => string
  getNextOrder: () => number
  validateSectionData: (sectionId: string) => { isValid: boolean; errors: string[] }
}

type WebsiteStore = WebsiteState & WebsiteActions

export const useWebsiteStore = create<WebsiteStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentPage: null,
        sections: [],
        selectedSection: null,
        isLoading: false,
        isDirty: false,
        pages: [],
        availableWidgets: [],
        previewMode: 'desktop',
        showPreview: true,

        // Stub implementations
        loadPagesList: async () => {
          console.warn('loadPagesList: Not implemented')
        },
        
        loadPage: async (_id: string) => {
          console.warn('loadPage: Not implemented')
        },
        
        createNewPage: (_title: string, _slug: string) => {
          console.warn('createNewPage: Not implemented')
        },
        
        savePage: async () => {
          console.warn('savePage: Not implemented')
        },
        
        publishPage: async () => {
          console.warn('publishPage: Not implemented')
        },
        
        resetPage: () => {
          set({ currentPage: null, sections: [], selectedSection: null, isDirty: false })
        },
        
        setPageMetadata: (_metadata: Partial<WebsitePageData>) => {
          console.warn('setPageMetadata: Not implemented')
        },
        
        addSection: (_widgetType: string, _insertAfter?: string): string => {
          console.warn('addSection: Not implemented')
          return ''
        },
        
        updateSection: (_sectionId: string, _data: Partial<SectionData>) => {
          console.warn('updateSection: Not implemented')
        },
        
        updateSectionData: (_sectionId: string, _data: WidgetData) => {
          console.warn('updateSectionData: Not implemented')
        },
        
        deleteSection: (_sectionId: string) => {
          console.warn('deleteSection: Not implemented')
        },
        
        duplicateSection: (_sectionId: string): string => {
          console.warn('duplicateSection: Not implemented')
          return ''
        },
        
        reorderSections: (_sectionIds: string[]) => {
          console.warn('reorderSections: Not implemented')
        },
        
        toggleSectionActive: (_sectionId: string) => {
          console.warn('toggleSectionActive: Not implemented')
        },
        
        selectSection: (sectionId: string | null) => {
          set({ selectedSection: sectionId })
        },
        
        setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => {
          set({ previewMode: mode })
        },
        
        togglePreview: () => {
          set((state) => ({ showPreview: !state.showPreview }))
        },
        
        generateSectionId: (): string => {
          return `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        },
        
        getNextOrder: (): number => {
          const sections = get().sections
          return sections.length > 0 ? Math.max(...sections.map(s => (s.order as number) || 0)) + 1 : 0
        },
        
        validateSectionData: (_sectionId: string) => {
          return { isValid: true, errors: [] }
        },
      }),
      {
        name: 'website-store',
        partialize: (state) => ({
          currentPage: state.currentPage,
          sections: state.sections,
          previewMode: state.previewMode,
          showPreview: state.showPreview,
        }),
      }
    )
  )
)
