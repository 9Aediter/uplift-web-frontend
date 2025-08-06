import { 
  Content, 
  ContentStatus, 
  ContentType, 
  CreateContentRequest, 
  UpdateContentRequest,
  UpdateContentStatusRequest,
  ContentResponse,
  HeroSectionData,
  HeroFieldData,
  HeroButtonData
} from "@/types/content"

class ContentService {
  private baseUrl = "/api/content"

  // Fetch content with optional filters
  async getContent({
    pageSlug,
    sectionType,
    language = "en",
    status,
    includeUnpublished = false
  }: {
    pageSlug?: string
    sectionType?: ContentType
    language?: string
    status?: ContentStatus
    includeUnpublished?: boolean
  } = {}): Promise<Content[]> {
    const params = new URLSearchParams()
    
    if (pageSlug) params.append("pageSlug", pageSlug)
    if (sectionType) params.append("sectionType", sectionType)
    if (language) params.append("language", language)
    if (status) params.append("status", status)
    if (includeUnpublished) params.append("includeUnpublished", "true")

    const response = await fetch(`${this.baseUrl}?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ContentResponse = await response.json()
    return Array.isArray(result.data) ? result.data : [result.data]
  }

  // Get single content by ID
  async getContentById(id: string): Promise<Content> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result: ContentResponse = await response.json()
    return result.data as Content
  }

  // Create new content
  async createContent(data: CreateContentRequest): Promise<Content> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }
    
    const result: ContentResponse = await response.json()
    return result.data as Content
  }

  // Update content fields and buttons
  async updateContent(id: string, data: UpdateContentRequest): Promise<Content> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }
    
    const result: ContentResponse = await response.json()
    return result.data as Content
  }

  // Update content status (workflow)
  async updateContentStatus(data: UpdateContentStatusRequest): Promise<Content> {
    const response = await fetch(this.baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }
    
    const result: ContentResponse = await response.json()
    return result.data as Content
  }

  // Delete content
  async deleteContent(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }
  }

  // Convert Hero Section data to/from database format
  convertToHeroSectionData(contentEn: Content, contentTh?: Content): HeroSectionData {
    const fields: HeroFieldData[] = contentEn.fields.map(field => ({
      id: field.id,
      key: field.key,
      label: field.label,
      type: field.type,
      values: {
        en: field.value,
        th: contentTh?.fields.find(f => f.key === field.key)?.value || ""
      }
    }))

    const buttons: HeroButtonData[] = contentEn.buttons.map(button => ({
      id: button.id,
      label: button.label,
      url: button.url,
      values: {
        en: button.text,
        th: contentTh?.buttons.find(b => b.label === button.label)?.text || ""
      }
    }))

    return { fields, buttons }
  }

  convertFromHeroSectionData(
    data: HeroSectionData, 
    language: "en" | "th",
    pageSlug: string = "home",
    sectionType: ContentType = "HERO_SECTION"
  ): CreateContentRequest {
    return {
      pageSlug,
      sectionType,
      language,
      fields: data.fields.map((field, index) => ({
        key: field.key,
        label: field.label,
        type: field.type,
        value: field.values[language],
        order: index
      })),
      buttons: data.buttons.map((button, index) => ({
        label: button.label,
        text: button.values[language],
        url: button.url,
        order: index
      }))
    }
  }

  // Get Hero Section data for both languages
  async getHeroSectionData(pageSlug: string = "home"): Promise<HeroSectionData | null> {
    try {
      const [contentEn, contentTh] = await Promise.all([
        this.getContent({
          pageSlug,
          sectionType: "HERO_SECTION",
          language: "en",
          status: "PUBLISHED"
        }),
        this.getContent({
          pageSlug,
          sectionType: "HERO_SECTION", 
          language: "th",
          status: "PUBLISHED"
        })
      ])

      if (contentEn.length === 0) return null

      return this.convertToHeroSectionData(contentEn[0], contentTh[0])
    } catch (error) {
      console.error("Error fetching hero section data:", error)
      return null
    }
  }

  // Save Hero Section data for both languages
  async saveHeroSectionData(
    data: HeroSectionData, 
    pageSlug: string = "home"
  ): Promise<{ en: Content; th: Content }> {
    try {
      const [contentEn, contentTh] = await Promise.all([
        this.createContent(this.convertFromHeroSectionData(data, "en", pageSlug)),
        this.createContent(this.convertFromHeroSectionData(data, "th", pageSlug))
      ])

      return { en: contentEn, th: contentTh }
    } catch (error) {
      console.error("Error saving hero section data:", error)
      throw error
    }
  }

  // Update Hero Section data for both languages
  async updateHeroSectionData(
    data: HeroSectionData,
    enContentId: string,
    thContentId: string
  ): Promise<{ en: Content; th: Content }> {
    try {
      const updateDataEn: UpdateContentRequest = {
        fields: data.fields.map((field, index) => ({
          key: field.key,
          label: field.label,
          type: field.type,
          value: field.values.en,
          order: index
        })),
        buttons: data.buttons.map((button, index) => ({
          label: button.label,
          text: button.values.en,
          url: button.url,
          order: index
        }))
      }

      const updateDataTh: UpdateContentRequest = {
        fields: data.fields.map((field, index) => ({
          key: field.key,
          label: field.label,
          type: field.type,
          value: field.values.th,
          order: index
        })),
        buttons: data.buttons.map((button, index) => ({
          label: button.label,
          text: button.values.th,
          url: button.url,
          order: index
        }))
      }

      const [contentEn, contentTh] = await Promise.all([
        this.updateContent(enContentId, updateDataEn),
        this.updateContent(thContentId, updateDataTh)
      ])

      return { en: contentEn, th: contentTh }
    } catch (error) {
      console.error("Error updating hero section data:", error)
      throw error
    }
  }
}

export const contentService = new ContentService()