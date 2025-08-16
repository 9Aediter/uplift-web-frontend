// src/lib/content-db.ts
import 'server-only';
import { prisma } from '@/lib/prisma';

type HeroContent = {
  badge: string;
  title_part1: string;
  title_part2: string;
  title_gradient1: string;
  title_gradient2: string;
  subtitle: string;
  launch_button: string;
  explore_button: string;
};

type PageContent = {
  hero?: HeroContent;
  [key: string]: any;
};

/**
 * Get localized page content from database
 */
export async function getLGPageDB(
  locale: string,
  pageSlug: string = 'home'
): Promise<HeroContent | null> {
  try {
    // console.log(`[getLGPageDB] Loading ${pageSlug} hero for locale: ${locale}`);

    const content = await prisma.content.findFirst({
      where: {
        pageSlug,
        sectionType: 'HERO_SECTION',
        language: locale,
        status: 'PUBLISHED'
      },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        },
        buttons: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!content) {
      console.warn(`[getLGPageDB] No published hero content found for ${pageSlug}/${locale}`);
      return null;
    }

    // Transform database content to expected format
    const heroContent: HeroContent = {
      badge: content.fields.find(f => f.key === 'badge')?.value || '',
      title_part1: content.fields.find(f => f.key === 'title_part1')?.value || '',
      title_part2: content.fields.find(f => f.key === 'title_part2')?.value || '',
      title_gradient1: content.fields.find(f => f.key === 'title_gradient1')?.value || '',
      title_gradient2: content.fields.find(f => f.key === 'title_gradient2')?.value || '',
      subtitle: content.fields.find(f => f.key === 'subtitle')?.value || '',
      launch_button: content.buttons.find(b => b.label === 'Launch Button')?.text || 'Launch Your Vision',
      explore_button: content.buttons.find(b => b.label === 'Explore Button')?.text || 'Explore Our Innovations'
    };

    // console.log(`[getLGPageDB] Successfully loaded hero content for ${pageSlug}/${locale}`);
    return heroContent;
  } catch (error) {
    console.error(`[getLGPageDB] Error loading hero content for ${pageSlug}/${locale}:`, error);
    return null;
  }
}

/**
 * Enhanced content loader that tries database first, falls back to JSON files
 */
export async function getLocalizedPageContentFromDB(
  locale: string,
  pageName: string
): Promise<PageContent | null> {
  try {
    // console.log(`[getLocalizedPageContentFromDB] Loading content for ${locale}/${pageName}`);

    // Load hero section from database
    const heroContent = await getLGPageDB(locale, pageName);
    
    if (heroContent) {
      // For now, we only have hero section in DB
      // Other sections will fallback to JSON files
      const content: PageContent = {
        hero: heroContent
      };

      // Try to load additional sections from JSON (fallback)
      try {
        const { getLGPageJSON } = await import('./content');
        const jsonContent = await getLGPageJSON(locale, pageName);
        
        if (jsonContent) {
          // Merge DB content with JSON content, DB takes precedence for hero
          Object.assign(content, jsonContent, { hero: heroContent });
        }
      } catch (jsonError) {
        console.warn(`[getLocalizedPageContentFromDB] JSON fallback failed for ${locale}/${pageName}:`, jsonError);
      }

      // console.log(`[getLocalizedPageContentFromDB] Successfully loaded content from database for ${locale}/${pageName}`);
      return content;
    } else {
      // Fallback to original JSON loader
      // console.log(`[getLocalizedPageContentFromDB] Falling back to JSON for ${locale}/${pageName}`);
      const { getLGPageJSON } = await import('./content');
      return await getLGPageJSON(locale, pageName);
    }
  } catch (error) {
    console.error(`[getLocalizedPageContentFromDB] Error loading content for ${locale}/${pageName}:`, error);
    
    // Final fallback to JSON
    try {
      const { getLGPageJSON } = await import('./content');
      return await getLGPageJSON(locale, pageName);
    } catch (fallbackError) {
      console.error(`[getLocalizedPageContentFromDB] All content loading methods failed:`, fallbackError);
      return null;
    }
  }
}

/**
 * Get all published content for a specific page and language
 */
export async function getAllPageSectionsFromDB(
  locale: string,
  pageSlug: string
): Promise<any[]> {
  try {
    const sections = await prisma.content.findMany({
      where: {
        pageSlug,
        language: locale,
        status: 'PUBLISHED'
      },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        },
        buttons: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    return sections;
  } catch (error) {
    console.error(`[getAllPageSectionsFromDB] Error loading sections for ${pageSlug}/${locale}:`, error);
    return [];
  }
}