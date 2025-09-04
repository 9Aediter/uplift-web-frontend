import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { SectionData, WidgetData } from '@/lib/widgets/core/types'
import { getWidgetRegistry } from '@/lib/widgets'
import { WebsiteApiService, ApiWebsitePageData } from '@/lib/api/website'

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
  // Current page data
  currentPage: WebsitePageData | null
  sections: SectionData[]
  selectedSection: string | null
  isLoading: boolean
  isDirty: boolean
  
  // Available pages list
  pages: WebsitePageData[]
  
  // Widget management
  availableWidgets: any[]
  
  // UI state
  previewMode: 'desktop' | 'tablet' | 'mobile'
  showPreview: boolean
}

interface WebsiteActions {
  // Page management
  loadPage: (id: string) => Promise<void>
  loadPagesList: () => Promise<void>
  createNewPage: (title: string, slug: string) => void
  savePage: () => Promise<void>
  publishPage: () => Promise<void>
  resetPage: () => void
  setPageMetadata: (metadata: Partial<WebsitePageData>) => void
  
  // Section management
  addSection: (widgetType: string, insertAfter?: string) => string
  updateSection: (sectionId: string, data: Partial<SectionData>) => void
  updateSectionData: (sectionId: string, data: WidgetData) => void
  deleteSection: (sectionId: string) => void
  duplicateSection: (sectionId: string) => string
  reorderSections: (sectionIds: string[]) => void
  toggleSectionActive: (sectionId: string) => void
  
  // Selection management
  selectSection: (sectionId: string | null) => void
  
  // UI management
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
  togglePreview: () => void
  
  // Utility
  generateSectionId: () => string
  getNextOrder: () => number
  validateSectionData: (sectionId: string) => { isValid: boolean; errors: string[] }
}

type WebsiteStore = WebsiteState & WebsiteActions

// Note: Mock data removed - using API data only

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

      // Page management
      loadPagesList: async () => {
        set({ isLoading: true })
        
        try {
          // console.log('📝 [STORE] Calling API to load pages list...')
          
          // Use API service
          const response = await WebsiteApiService.getPages({
            page: 1,
            limit: 50
          })
          
          // console.log('✅ [STORE] API Response received:', response)
          // console.log('📊 [STORE] Response structure:', {
          //   hasPages: !!response?.pages,
          //   pagesCount: response?.pages?.length || 0,
          //   firstPage: response?.pages?.[0]
          // })
          
          // Transform API response to local format
          const pages: WebsitePageData[] = response.pages.map((apiPage: ApiWebsitePageData) => ({
            id: apiPage.id,
            title: apiPage.titleEn, // TODO: Use locale preference
            slug: apiPage.slug,
            description: apiPage.descriptionEn,
            seoTitle: apiPage.seo?.titleEn,
            seoDescription: apiPage.seo?.descriptionEn,
            sections: apiPage.sections?.map(section => 
              WebsiteApiService.apiSectionToLocal(section, 'en')
            ) || [],
            metadata: {
              createdAt: apiPage.createdAt,
              updatedAt: apiPage.updatedAt,
              publishedAt: apiPage.publishedAt,
              status: apiPage.status.toLowerCase() as 'draft' | 'published' | 'archived'
            }
          }))
          
          console.log('🔄 [STORE] Transformed pages:', pages)
          console.log('🎯 [STORE] Setting pages in store, count:', pages.length)
          
          set({
            pages,
            isLoading: false
          })
        } catch (error) {
          console.error('🚫 [STORE] Failed to load pages list:', error)
          console.error('🚫 [STORE] Error details:', (error as any)?.response?.data)
          // Set empty pages array instead of mock data
          set({ pages: [], isLoading: false })
        }
      },

      loadPage: async (id: string) => {
        set({ isLoading: true })
        
        try {
          console.log('📝 [STORE] Loading single page by id:', id)
          
          // Load page by ID from API
          const apiPage = await WebsiteApiService.getPage(id)
          
          console.log('✅ [STORE] Single page API response:', apiPage)
          console.log('📊 [STORE] Page sections count:', apiPage.sections?.length || 0)
          
          // Transform API response to local format
          const pageData: WebsitePageData = {
            id: apiPage.id,
            title: apiPage.titleEn, // TODO: Use locale preference
            slug: apiPage.slug,
            description: apiPage.descriptionEn,
            seoTitle: apiPage.seo?.titleEn,
            seoDescription: apiPage.seo?.descriptionEn,
            sections: apiPage.sections?.map(section => 
              WebsiteApiService.apiSectionToLocal(section, 'en')
            ) || [],
            metadata: {
              createdAt: apiPage.createdAt,
              updatedAt: apiPage.updatedAt,
              publishedAt: apiPage.publishedAt,
              status: apiPage.status.toLowerCase() as 'draft' | 'published' | 'archived'
            }
          }
          
          console.log('🔄 [STORE] Transformed page data:', pageData)
          console.log('🎯 [STORE] Setting current page and sections:', {
            pageTitle: pageData.title,
            sectionsCount: pageData.sections.length,
            sections: pageData.sections.map(s => ({ id: s.id, type: s.widgetType, title: s.title }))
          })
          
          set({
            currentPage: pageData,
            sections: pageData.sections,
            selectedSection: null,
            isDirty: false,
            isLoading: false
          })
        } catch (error) {
          console.error('🚫 [STORE] Failed to load page from API:', error)
          console.error('🚫 [STORE] Load page error details:', (error as any)?.response?.data)
          // Page not found - return null
          set({
            currentPage: null,
            sections: [],
            selectedSection: null,
            isDirty: false,
            isLoading: false
          })
        }
      },

      createNewPage: (title: string, slug: string) => {
        const newPage: WebsitePageData = {
          id: `page-${Date.now()}`,
          title,
          slug,
          sections: [],
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'draft'
          }
        }
        
        set({
          currentPage: newPage,
          sections: [],
          selectedSection: null,
          isDirty: true
        })
      },

      savePage: async () => {
        const { currentPage, sections, pages } = get()
        if (!currentPage) return

        set({ isLoading: true })
        
        try {
          const updatedPage: WebsitePageData = {
            ...currentPage,
            sections,
            metadata: {
              ...currentPage.metadata,
              updatedAt: new Date().toISOString()
            }
          }
          
          // Try to save via API
          try {
            await WebsiteApiService.updatePage(currentPage.id, {
              slug: currentPage.slug,
              titleEn: currentPage.title,
              titleTh: currentPage.title,
              descriptionEn: currentPage.description,
              descriptionTh: currentPage.description
            })
            console.log('Saved to API:', updatedPage.title, updatedPage.sections.length, 'sections')
          } catch (apiError) {
            console.warn('API save failed, using local state:', apiError)
          }
          
          // Update local state
          const updatedPages = pages.map(p => 
            p.id === updatedPage.id ? updatedPage : p
          )
          
          // If page doesn't exist, add it
          if (!pages.find(p => p.id === updatedPage.id)) {
            updatedPages.push(updatedPage)
          }
          
          set({
            currentPage: updatedPage,
            pages: updatedPages,
            isDirty: false,
            isLoading: false
          })
        } catch (error) {
          console.error('Failed to save website page:', error)
          set({ isLoading: false })
        }
      },

      publishPage: async () => {
        const { currentPage, sections } = get()
        if (!currentPage) return

        set({ isLoading: true })
        
        try {
          // First save the page
          await get().savePage()
          
          // Try to publish via API
          try {
            await WebsiteApiService.publishPage(currentPage.id)
            console.log('Published via API:', currentPage.title)
          } catch (apiError) {
            console.warn('API publish failed, using local state:', apiError)
          }
          
          // Update local state
          const publishedPage: WebsitePageData = {
            ...currentPage,
            sections,
            metadata: {
              ...currentPage.metadata,
              status: 'published',
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }
          
          set({
            currentPage: publishedPage,
            isDirty: false,
            isLoading: false
          })
        } catch (error) {
          console.error('Failed to publish page:', error)
          set({ isLoading: false })
        }
      },

      resetPage: () => {
        set({
          currentPage: null,
          sections: [],
          selectedSection: null,
          isDirty: false
        })
      },

      setPageMetadata: (metadata) => {
        const { currentPage } = get()
        if (!currentPage) return

        const updatedPage: WebsitePageData = {
          ...currentPage,
          ...metadata,
          metadata: {
            ...currentPage.metadata,
            ...(metadata.metadata || {}),
            updatedAt: new Date().toISOString()
          }
        }

        set({
          currentPage: updatedPage,
          isDirty: true
        })
      },

      // Section management
      generateSectionId: () => {
        return `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      },

      getNextOrder: () => {
        const { sections } = get()
        if (sections.length === 0) return 1
        return Math.max(...sections.map(s => s.order || 0)) + 1
      },

      addSection: (widgetType: string, insertAfter?: string) => {
        const registry = getWidgetRegistry()
        const widget = registry.get(widgetType)
        
        if (!widget) {
          console.error(`Widget ${widgetType} not found`)
          return ''
        }

        const { sections, generateSectionId, getNextOrder } = get()
        const sectionId = generateSectionId()
        
        let insertOrder: number
        let insertIndex: number

        if (insertAfter) {
          const afterIndex = sections.findIndex(s => s.id === insertAfter)
          if (afterIndex >= 0) {
            insertIndex = afterIndex + 1
            insertOrder = sections[afterIndex].order! + 0.5
          } else {
            insertIndex = sections.length
            insertOrder = getNextOrder()
          }
        } else {
          insertIndex = sections.length
          insertOrder = getNextOrder()
        }

        const newSection: SectionData = {
          id: sectionId,
          type: 'widget',
          widgetType,
          title: widget.name,
          order: insertOrder,
          isActive: true,
          data: widget.getDefaultData(),
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }

        const newSections = [...sections]
        newSections.splice(insertIndex, 0, newSection)
        
        // Reorder all sections to have clean integer orders
        const reorderedSections = newSections.map((section, index) => ({
          ...section,
          order: index + 1
        }))

        set({
          sections: reorderedSections,
          selectedSection: sectionId,
          isDirty: true
        })

        // Auto-save when sections change
        setTimeout(() => get().savePage(), 100)

        return sectionId
      },

      updateSection: (sectionId: string, updates: Partial<SectionData>) => {
        const { sections } = get()
        const updatedSections = sections.map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              ...updates,
              metadata: {
                ...section.metadata,
                updatedAt: new Date().toISOString()
              }
            }
          }
          return section
        })

        set({
          sections: updatedSections,
          isDirty: true
        })

        // Auto-save when sections change
        setTimeout(() => get().savePage(), 100)
      },

      updateSectionData: (sectionId: string, data: WidgetData) => {
        get().updateSection(sectionId, { data })
      },

      deleteSection: (sectionId: string) => {
        const { sections, selectedSection } = get()
        const updatedSections = sections.filter(s => s.id !== sectionId)
        
        // Reorder remaining sections
        const reorderedSections = updatedSections.map((section, index) => ({
          ...section,
          order: index + 1
        }))

        set({
          sections: reorderedSections,
          selectedSection: selectedSection === sectionId ? null : selectedSection,
          isDirty: true
        })
      },

      duplicateSection: (sectionId: string) => {
        const { sections, generateSectionId } = get()
        const sectionToDuplicate = sections.find(s => s.id === sectionId)
        
        if (!sectionToDuplicate) return ''

        const newSectionId = generateSectionId()
        const duplicatedSection: SectionData = {
          ...sectionToDuplicate,
          id: newSectionId,
          title: `${sectionToDuplicate.title} (Copy)`,
          metadata: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        }

        const originalIndex = sections.findIndex(s => s.id === sectionId)
        const newSections = [...sections]
        newSections.splice(originalIndex + 1, 0, duplicatedSection)
        
        // Reorder sections
        const reorderedSections = newSections.map((section, index) => ({
          ...section,
          order: index + 1
        }))

        set({
          sections: reorderedSections,
          selectedSection: newSectionId,
          isDirty: true
        })

        return newSectionId
      },

      reorderSections: (sectionIds: string[]) => {
        const { sections } = get()
        const reorderedSections = sectionIds.map((id, index) => {
          const section = sections.find(s => s.id === id)
          return section ? { ...section, order: index + 1 } : null
        }).filter(Boolean) as SectionData[]

        set({
          sections: reorderedSections,
          isDirty: true
        })
      },

      toggleSectionActive: (sectionId: string) => {
        const { sections } = get()
        const section = sections.find(s => s.id === sectionId)
        if (!section) return

        get().updateSection(sectionId, { isActive: !section.isActive })
      },

      // Selection management
      selectSection: (sectionId: string | null) => {
        set({ selectedSection: sectionId })
      },

      // UI management
      setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => {
        set({ previewMode: mode })
      },

      togglePreview: () => {
        set(state => ({ showPreview: !state.showPreview }))
      },

      // Validation
      validateSectionData: (sectionId: string) => {
        const { sections } = get()
        const section = sections.find(s => s.id === sectionId)
        
        if (!section) {
          return { isValid: false, errors: ['Section not found'] }
        }

        const registry = getWidgetRegistry()
        const widget = registry.get(section.widgetType)
        
        if (!widget) {
          return { isValid: false, errors: [`Widget ${section.widgetType} not found`] }
        }

        return widget.validateData(section.data)
      }
    }),
    {
      name: 'website-store',
      // Persist only essential data
      partialize: (state) => ({
        pages: state.pages,
        currentPage: state.currentPage,
        sections: state.sections
      })
    }
  ),
  {
    name: 'website-store-dev'
  }
))