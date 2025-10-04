// TODO: Implement website API service
// Stub file to prevent import errors during component reorganization

export interface HeroData {
  pageId?: string;
  titleEn: string;
  titleTh: string;
  subtitleEn: string;
  subtitleTh: string;
  descriptionEn: string;
  descriptionTh: string;
  backgroundImageUrl: string;
  ctaButtonTextEn: string;
  ctaButtonTextTh: string;
  ctaButtonUrl: string;
  ctaButtonType: 'primary' | 'secondary';
  overlayOpacity: number;
  textPosition: 'left' | 'center' | 'right';
  isActive: boolean;
}

export interface ApiWebsitePageData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  sections: Record<string, unknown>[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    status: 'draft' | 'published' | 'archived';
  };
}

export const WebsiteApiService = {
  getHero: async (_pageId: string): Promise<HeroData | null> => {
    // TODO: Implement API call
    return null;
  },

  updateHero: async (_pageId: string, _data: Partial<HeroData>): Promise<HeroData> => {
    // TODO: Implement API call
    throw new Error('Not implemented');
  },

  publishPage: async (_pageId: string, _message: string): Promise<void> => {
    // TODO: Implement API call
    throw new Error('Not implemented');
  },

  getPages: async (): Promise<ApiWebsitePageData[]> => {
    // TODO: Implement API call
    return [];
  },

  getPage: async (_pageId: string): Promise<ApiWebsitePageData | null> => {
    // TODO: Implement API call
    return null;
  },

  updatePage: async (_pageId: string, _data: Partial<ApiWebsitePageData>): Promise<ApiWebsitePageData> => {
    // TODO: Implement API call
    throw new Error('Not implemented');
  },
};
