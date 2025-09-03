import React from 'react'
import { getHeroRegistry } from '@/lib/widgets/hero'
import { HeroData } from '@/lib/widgets/hero/BaseHeroWidget'

interface HeroRendererProps {
  heroData: HeroData & { heroWidgetType: string }
  locale?: 'en' | 'th'
  className?: string
}

export function HeroRenderer({ heroData, locale = 'en', className }: HeroRendererProps) {
  // Get hero widget from registry
  const heroRegistry = getHeroRegistry()
  const heroWidget = heroRegistry.get(heroData.heroWidgetType)

  if (!heroWidget) {
    console.error(`🚫 [HERO RENDERER] Hero widget not found: ${heroData.heroWidgetType}`)
    return (
      <section className={`bg-gray-100 dark:bg-gray-900 py-20 ${className || ''}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Hero Widget Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Widget type "{heroData.heroWidgetType}" is not registered
          </p>
        </div>
      </section>
    )
  }

  try {
    console.log('🎨 [HERO RENDERER] Rendering hero widget:', heroWidget.name, heroData.heroWidgetType)
    
    // Transform data for the specific hero widget
    const processedData = {
      ...heroData,
      // Use locale-specific data
      title: locale === 'en' ? heroData.titleEn : heroData.titleTh,
      subtitle: locale === 'en' ? heroData.subtitleEn : heroData.subtitleTh,
      description: locale === 'en' ? heroData.descriptionEn : heroData.descriptionTh,
      ctaButtonText: locale === 'en' ? heroData.ctaButtonTextEn : heroData.ctaButtonTextTh,
    }

    // Get the rendered component from hero widget
    const HeroComponent = heroWidget.render(processedData, {
      isPreview: false,
      locale,
      theme: 'light'
    })

    if (!HeroComponent) {
      throw new Error(`Hero widget ${heroWidget.name} returned null component`)
    }

    return <HeroComponent />
  } catch (error) {
    console.error('🚫 [HERO RENDERER] Failed to render hero widget:', error)
    
    // Fallback UI
    return (
      <section className={`bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 ${className || ''}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
            <h1 className="text-4xl font-bold text-red-800 dark:text-red-200 mb-4">
              {locale === 'en' ? heroData.titleEn : heroData.titleTh}
            </h1>
            <p className="text-red-600 dark:text-red-400 mb-6">
              {locale === 'en' ? heroData.descriptionEn : heroData.descriptionTh}
            </p>
            <p className="text-sm text-red-500">
              Error rendering hero widget: {(error as Error).message}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

// Server-side component wrapper for better SSR performance
export async function SSRHeroRenderer({ heroData, locale, className }: HeroRendererProps) {
  // This runs on server-side only
  return <HeroRenderer heroData={heroData} locale={locale} className={className} />
}