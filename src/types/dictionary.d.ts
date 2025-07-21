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
    timeline: Array<{
      title: string;
      content: string;
    }>;
    founder?: any; // Assuming founder might be an object, adjust as needed
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
      icon?: any; // Assuming icon might be a React element or path, adjust as needed
    }>;
  };
  // Add other sections as needed
}
