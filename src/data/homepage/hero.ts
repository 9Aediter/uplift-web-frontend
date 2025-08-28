import { HeroData } from "@/lib/widgets/hero/BaseHeroWidget"

// Mock Hero Data - simulates API response
export const mockHeroData: HeroData & { heroWidgetType: string } = {
  id: "homepage-hero-1",
  pageId: "homepage",
  heroWidgetType: "hero-ai", // ใช้ HeroAI widget
  titleEn: "The Future of Technology is",
  titleTh: "อนาคตของเทคโนโลยี คือ",
  subtitleEn: "Here & Now With AI",
  subtitleTh: "ที่นี่ และ ตอนนี้ กับ AI",
  descriptionEn: "We create cutting-edge software solutions that transform businesses and drive growth in the digital age.",
  descriptionTh: "เราสร้างโซลูชันซอฟต์แวร์ล้ำสมัยที่เปลี่ยนแปลงธุรกิจและขับเคลื่อนการเติบโตในยุคดิจิทัล",
  backgroundImageUrl: "",
  ctaButtonTextEn: "Launch Project",
  ctaButtonTextTh: "เริ่มโปรเจค",
  ctaButtonUrl: "/contact",
  ctaButtonType: "primary",
  overlayOpacity: 0.3,
  textPosition: "left",
  isActive: true,
  // HeroAI specific fields (extension)
  badge: "AI-Powered Solutions",
  titlePart1: "The Future of",
  titlePart2: "Technology is",
  titleGradient1: "Here & Now",
  titleGradient2: "With AI",
  launchButton: "Launch Project",
  exploreButton: "Explore Innovation"
}

// Alternative hero data for different patterns
export const mockHeroSimpleData: HeroData & { heroWidgetType: string } = {
  id: "homepage-hero-simple",
  pageId: "homepage",
  heroWidgetType: "hero-simple",
  titleEn: "Build Modern Business Systems",
  titleTh: "สร้างระบบธุรกิจสมัยใหม่",
  subtitleEn: "Custom Software Solutions for Growing Businesses",
  subtitleTh: "โซลูชันซอฟต์แวร์ตามต้องการสำหรับธุรกิจที่กำลังเติบโต",
  descriptionEn: "Transform your business operations with our custom ERP, POS, and web applications designed specifically for your industry needs.",
  descriptionTh: "เปลี่ยนแปลงการดำเนินงานธุรกิจของคุณด้วย ERP, POS และเว็บแอปพลิเคชันที่ออกแบบเฉพาะสำหรับความต้องการในอุตสาหกรรมของคุณ",
  backgroundImageUrl: "/images/hero-bg.jpg",
  ctaButtonTextEn: "Get Started Today",
  ctaButtonTextTh: "เริ่มต้นวันนี้",
  ctaButtonUrl: "/consult",
  ctaButtonType: "primary",
  overlayOpacity: 0.5,
  textPosition: "center",
  isActive: true
}

// Function to get hero data (simulates API call)
export async function getHeroData(variant: 'ai' | 'simple' = 'ai'): Promise<HeroData & { heroWidgetType: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 10))
  
  switch (variant) {
    case 'simple':
      return mockHeroSimpleData
    case 'ai':
    default:
      return mockHeroData
  }
}

// Function to get localized hero content (current format compatibility)
export function getLocalizedHeroContent(heroData: HeroData, locale: 'en' | 'th' = 'en') {
  return {
    badge: (heroData as any).badge || heroData.subtitleEn || heroData.subtitleTh,
    title_part1: (heroData as any).titlePart1 || heroData.titleEn?.split(' ').slice(0, 3).join(' ') || heroData.titleTh?.split(' ').slice(0, 3).join(' '),
    title_part2: (heroData as any).titlePart2 || heroData.titleEn?.split(' ').slice(3, 6).join(' ') || heroData.titleTh?.split(' ').slice(3, 6).join(' '),
    title_gradient1: (heroData as any).titleGradient1 || heroData.titleEn?.split(' ').slice(-3).join(' ') || heroData.titleTh?.split(' ').slice(-3).join(' '),
    title_gradient2: (heroData as any).titleGradient2 || '',
    subtitle: locale === 'en' ? heroData.descriptionEn : heroData.descriptionTh,
    launch_button: (heroData as any).launchButton || (locale === 'en' ? heroData.ctaButtonTextEn : heroData.ctaButtonTextTh),
    explore_button: (heroData as any).exploreButton || 'Explore More',
    backgroundImageUrl: heroData.backgroundImageUrl,
    overlayOpacity: heroData.overlayOpacity || 0.5,
    textPosition: heroData.textPosition || 'center'
  }
}