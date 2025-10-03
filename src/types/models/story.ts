// Frontend model for Story data

export interface StoryFounder {
  id: number;
  name: string;
  title: string;
  role: string;
  description: string;
  expertise: string[];
  vision: string;
  image: string;
}

export interface TimelineStat {
  value: string;
  label: string;
  icon: string;
}

export interface TimelineItem {
  title: string;
  period: string;
  content: string;
  highlight: string;
  image?: string;
  imageAlt?: string;
  stats?: TimelineStat[];
}

export interface StoryData {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  companyInfo: {
    registrationDate: string;
    location: string;
    capital: string;
    founder: string;
  };
  founders: StoryFounder[];
  timeline: TimelineItem[];
}
