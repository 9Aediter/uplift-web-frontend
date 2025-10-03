import { create } from 'zustand'
import { WebsiteApiService, HeroData } from '@/lib/api/website'

interface HomeHeroData {
  heroWidgetType?: string
  titleEn: string
  titleTh: string
  subtitleEn: string
  subtitleTh: string
  descriptionEn: string
  descriptionTh: string
  backgroundImageUrl: string
  ctaButtonTextEn: string
  ctaButtonTextTh: string
  ctaButtonUrl: string
  ctaButtonType: 'primary' | 'secondary'
  overlayOpacity: number
  textPosition: 'left' | 'center' | 'right'
  isActive: boolean
}

interface HomeState {
  heroData: HomeHeroData
  status: 'draft' | 'published' | 'archived'
  isLoading: boolean
  currentPageId: string | null
  loadHeroData: (pageId: string) => Promise<void>
  updateHeroData: (data: HomeHeroData) => void
  saveHeroData: () => Promise<void>
  publishHeroData: () => Promise<void>
}

// Convert API HeroData to HomeHeroData format
const convertApiToHomeHeroData = (heroData: HeroData | null): HomeHeroData => {
  if (!heroData) {
    return {
      heroWidgetType: 'hero-simple',
      titleEn: 'Welcome to the Future of Technology',
      titleTh: 'ยินดีต้อนรับสู่อนาคตแห่งเทคโนโลยี',
      subtitleEn: 'Leading Innovation in Digital Solutions',
      subtitleTh: 'ผู้นำนวัตกรรมในโซลูชันดิจิทัล',
      descriptionEn: 'We create cutting-edge software solutions that transform businesses and drive growth in the digital age.',
      descriptionTh: 'เราสร้างโซลูชันซอฟต์แวร์ล้ำสมัยที่เปลี่ยนแปลงธุรกิจและขับเคลื่อนการเติบโตในยุคดิจิทัล',
      backgroundImageUrl: '',
      ctaButtonTextEn: 'Get Started Today',
      ctaButtonTextTh: 'เริ่มต้นวันนี้',
      ctaButtonUrl: '/contact',
      ctaButtonType: 'primary',
      overlayOpacity: 0.5,
      textPosition: 'center',
      isActive: true
    }
  }

  return {
    heroWidgetType: (heroData as Record<string, unknown>).heroWidgetType as string || 'hero-simple',
    titleEn: heroData.titleEn || '',
    titleTh: heroData.titleTh || '',
    subtitleEn: heroData.subtitleEn || '',
    subtitleTh: heroData.subtitleTh || '',
    descriptionEn: heroData.descriptionEn || '',
    descriptionTh: heroData.descriptionTh || '',
    backgroundImageUrl: heroData.backgroundImageUrl || '',
    ctaButtonTextEn: heroData.ctaButtonTextEn || '',
    ctaButtonTextTh: heroData.ctaButtonTextTh || '',
    ctaButtonUrl: heroData.ctaButtonUrl || '',
    ctaButtonType: heroData.ctaButtonType || 'primary',
    overlayOpacity: heroData.overlayOpacity || 0.5,
    textPosition: heroData.textPosition || 'center',
    isActive: heroData.isActive !== false
  }
}

// Convert HomeHeroData to API HeroData format
const convertHomeToApiHeroData = (homeData: HomeHeroData, pageId: string): Partial<HeroData> => {
  const apiData = {
    pageId,
    titleEn: homeData.titleEn,
    titleTh: homeData.titleTh,
    subtitleEn: homeData.subtitleEn,
    subtitleTh: homeData.subtitleTh,
    descriptionEn: homeData.descriptionEn,
    descriptionTh: homeData.descriptionTh,
    backgroundImageUrl: homeData.backgroundImageUrl,
    ctaButtonTextEn: homeData.ctaButtonTextEn,
    ctaButtonTextTh: homeData.ctaButtonTextTh,
    ctaButtonUrl: homeData.ctaButtonUrl,
    ctaButtonType: homeData.ctaButtonType,
    overlayOpacity: homeData.overlayOpacity,
    textPosition: homeData.textPosition,
    isActive: homeData.isActive
  }

  // Add heroWidgetType as extended field if present
  if (homeData.heroWidgetType) {
    (apiData as Record<string, unknown>).heroWidgetType = homeData.heroWidgetType
  }

  return apiData
}

export const useHomeStore = create<HomeState>((set, get) => ({
  // Initial state
  heroData: convertApiToHomeHeroData(null),
  status: 'draft',
  isLoading: false,
  currentPageId: null,
  
  loadHeroData: async (pageId: string) => {
    set({ isLoading: true, currentPageId: pageId })

    try {
      // Load hero data from API
      const heroData = await WebsiteApiService.getHero(pageId)

      // Convert API data to HomeHeroData format
      const homeHeroData = convertApiToHomeHeroData(heroData)

      set({
        heroData: homeHeroData,
        status: 'draft', // Hero data is always in draft mode
        isLoading: false
      })
    } catch (error) {
      console.error('🚫 [HOME STORE] Failed to load hero data:', error)
      
      // Set default hero data on error
      const defaultHeroData = convertApiToHomeHeroData(null)
      set({ 
        heroData: defaultHeroData,
        status: 'draft',
        isLoading: false 
      })
    }
  },
  
  updateHeroData: (data: HomeHeroData) => {
    set({ heroData: data })
  },
  
  saveHeroData: async () => {
    const { heroData, currentPageId } = get()

    if (!currentPageId) {
      throw new Error('No page ID available for saving hero data')
    }

    try {
      // Convert HomeHeroData to API format
      const apiHeroData = convertHomeToApiHeroData(heroData, currentPageId)

      // Save to API
      const savedData = await WebsiteApiService.updateHero(currentPageId, apiHeroData)

      // Update local state with saved data
      const updatedHeroData = convertApiToHomeHeroData(savedData)
      set({ heroData: updatedHeroData })

    } catch (error) {
      console.error('🚫 [HOME STORE] Failed to save hero data:', error)
      throw error
    }
  },
  
  publishHeroData: async () => {
    const { currentPageId } = get()

    if (!currentPageId) {
      throw new Error('No page ID available for publishing hero data')
    }

    try {
      // First save the current hero data
      await get().saveHeroData()

      // Then publish the entire page (this will handle hero data publishing)
      await WebsiteApiService.publishPage(currentPageId, 'Published hero section')

      set({ status: 'published' })

    } catch (error) {
      console.error('🚫 [HOME STORE] Failed to publish hero data:', error)
      throw error
    }
  }
}))