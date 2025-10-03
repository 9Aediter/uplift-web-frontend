// API service for website management using Axios
import { apiClient } from './client'
import type { SectionData, WidgetData } from '@/types/models/widget'

export interface ApiWebsitePageData {
  id: string
  slug: string
  titleEn: string
  titleTh: string
  descriptionEn?: string
  descriptionTh?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  isActive: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  sections?: ApiSectionData[]
  seo?: SeoData
  hero?: HeroData
}

export interface ApiSectionData {
  id: string
  pageId: string
  widgetType: string
  titleEn: string
  titleTh: string
  orderIndex: number
  isActive: boolean
  widgetDataEn: WidgetData
  widgetDataTh: WidgetData
  createdAt: string
  updatedAt: string
}

export interface SeoData {
  id: string
  pageId: string
  titleEn?: string
  titleTh?: string
  descriptionEn?: string
  descriptionTh?: string
  keywordsEn?: string[]
  keywordsTh?: string[]
  ogImageUrl?: string
}

export interface HeroData {
  id: string
  pageId: string
  titleEn: string
  titleTh: string
  subtitleEn?: string
  subtitleTh?: string
  descriptionEn?: string
  descriptionTh?: string
  backgroundImageUrl?: string
  ctaButtonTextEn?: string
  ctaButtonTextTh?: string
  ctaButtonUrl?: string
  ctaButtonType?: 'primary' | 'secondary'
  overlayOpacity?: number
  textPosition?: 'left' | 'center' | 'right'
  isActive: boolean
}

export interface CreatePageRequest {
  slug: string
  titleEn: string
  titleTh: string
  descriptionEn?: string
  descriptionTh?: string
  changeLog?: string
}

export interface CreateSectionRequest {
  widgetType: string
  titleEn: string
  titleTh: string
  orderIndex: number
  isActive?: boolean
  widgetDataEn: WidgetData
  widgetDataTh: WidgetData
}

export interface ReorderSectionsRequest {
  sections: Array<{
    id: string
    orderIndex: number
  }>
}

// Use existing apiClient from client.ts (already has withCredentials: true)

export class WebsiteApiService {
  // Pages Management
  static async getPages(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
    isActive?: boolean
  }) {
    const { data } = await apiClient.get('/website/pages', {
      params
    })
    return data
  }

  static async getPage(id: string): Promise<ApiWebsitePageData> {
    const { data } = await apiClient.get(`/website/pages/${id}`)
    return data
  }

  static async createPage(requestData: CreatePageRequest): Promise<ApiWebsitePageData> {
    const { data } = await apiClient.post('/website/pages', requestData)
    return data
  }

  static async updatePage(id: string, requestData: Partial<CreatePageRequest>): Promise<ApiWebsitePageData> {
    const { data } = await apiClient.patch(`/website/pages/${id}`, requestData)
    return data
  }

  static async publishPage(id: string, changeLog?: string): Promise<ApiWebsitePageData> {
    const { data } = await apiClient.post(`/website/pages/${id}/publish`, { changeLog })
    return data
  }

  static async deletePage(id: string): Promise<void> {
    await apiClient.delete(`/website/pages/${id}`)
  }

  static async getPageVersions(id: string) {
    const { data } = await apiClient.get(`/website/pages/${id}/versions`)
    return data
  }

  // Sections Management
  static async getSections(pageId: string, params?: {
    widgetType?: string
    isActive?: boolean
  }): Promise<ApiSectionData[]> {
    const { data } = await apiClient.get(`/website/pages/${pageId}/sections`, {
      params
    })
    return data
  }

  static async createSection(pageId: string, requestData: CreateSectionRequest): Promise<ApiSectionData> {
    const { data } = await apiClient.post(`/website/pages/${pageId}/sections`, requestData)
    return data
  }

  static async updateSection(id: string, requestData: Partial<CreateSectionRequest>): Promise<ApiSectionData> {
    const { data } = await apiClient.patch(`/website/sections/${id}`, requestData)
    return data
  }

  static async deleteSection(id: string): Promise<void> {
    await apiClient.delete(`/website/sections/${id}`)
  }

  static async reorderSections(pageId: string, requestData: ReorderSectionsRequest): Promise<void> {
    await apiClient.post(`/website/pages/${pageId}/sections/reorder`, requestData)
  }

  // SEO Management
  static async getSeo(pageId: string): Promise<SeoData> {
    const { data } = await apiClient.get(`/website/pages/${pageId}/seo`)
    return data
  }

  static async updateSeo(pageId: string, requestData: Partial<SeoData>): Promise<SeoData> {
    const { data } = await apiClient.patch(`/website/pages/${pageId}/seo`, requestData)
    return data
  }

  static async deleteSeo(pageId: string): Promise<void> {
    await apiClient.delete(`/website/pages/${pageId}/seo`)
  }

  // Hero Management
  static async getHero(pageId: string): Promise<HeroData> {
    const { data } = await apiClient.get(`/website/pages/${pageId}/hero`)
    return data
  }

  static async updateHero(pageId: string, requestData: Partial<HeroData>): Promise<HeroData> {
    const { data } = await apiClient.patch(`/website/pages/${pageId}/hero`, requestData)
    return data
  }

  static async deleteHero(pageId: string): Promise<void> {
    await apiClient.delete(`/website/pages/${pageId}/hero`)
  }

  // Public API (no auth required)
  static async getPublicPage(slug: string, lang: string = 'en'): Promise<ApiWebsitePageData> {
    const { data } = await apiClient.get(`/public/website/pages/${slug}`, {
      params: { lang }
    })
    return data
  }

  static async getSitemap() {
    const { data } = await apiClient.get('/public/website/sitemap')
    return data
  }

  static async getRobotsTxt(): Promise<string> {
    const { data } = await apiClient.get('/public/website/robots.txt', {
      responseType: 'text'
    })
    return data
  }

  // Data transformation helpers
  static apiSectionToLocal(apiSection: ApiSectionData, locale: 'en' | 'th' = 'en'): SectionData {
    return {
      id: apiSection.id,
      type: 'widget',
      widgetType: apiSection.widgetType,
      title: locale === 'en' ? apiSection.titleEn : apiSection.titleTh,
      order: apiSection.orderIndex,
      isActive: apiSection.isActive,
      data: locale === 'en' ? apiSection.widgetDataEn : apiSection.widgetDataTh,
      metadata: {
        createdAt: apiSection.createdAt,
        updatedAt: apiSection.updatedAt
      }
    }
  }

  static localSectionToApi(section: SectionData, locale: 'en' | 'th' = 'en'): CreateSectionRequest {
    return {
      widgetType: section.widgetType,
      titleEn: locale === 'en' ? section.title || '' : '',
      titleTh: locale === 'th' ? section.title || '' : '',
      orderIndex: section.order || 0,
      isActive: section.isActive !== false,
      widgetDataEn: locale === 'en' ? section.data : {},
      widgetDataTh: locale === 'th' ? section.data : {}
    }
  }

  static apiPageToLocal(apiPage: ApiWebsitePageData, locale: 'en' | 'th' = 'en') {
    return {
      id: apiPage.id,
      title: locale === 'en' ? apiPage.titleEn : apiPage.titleTh,
      slug: apiPage.slug,
      description: locale === 'en' ? apiPage.descriptionEn : apiPage.descriptionTh,
      sections: apiPage.sections?.map(section => this.apiSectionToLocal(section, locale)) || [],
      metadata: {
        status: apiPage.status.toLowerCase() as 'draft' | 'published' | 'archived',
        publishedAt: apiPage.publishedAt,
        createdAt: apiPage.createdAt,
        updatedAt: apiPage.updatedAt
      }
    }
  }
}