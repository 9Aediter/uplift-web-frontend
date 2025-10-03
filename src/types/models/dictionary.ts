export interface Dictionary {
  title: string;
  description: string;
  keywords: string[];
  story: {
    title: string;
    description: string;
    hero: {
      title: string;
      description: string;
    };
    company?: {
      title: string;
      subtitle: string;
      description: string;
      timeline: Array<{
        year: string;
        title: string;
        content: string;
        achievements: string[];
      }>;
    };
    timeline?: Array<{
      title: string;
      content: string;
    }>;
    founder?: Record<string, unknown>;
    values?: Record<string, unknown>;
  };
  solutions: {
    title?: string;
    description?: string;
    categories: Array<{
      id: string;
      name: string;
    }>;
    articles: Array<{
      title: string;
      excerpt: string;
      image?: string;
      category: string;
      date: string;
      author: string;
      readTime: string;
      icon?: Record<string, unknown>;
    }>;
  };
}
