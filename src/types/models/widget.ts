// Widget data structure types

export interface WidgetData {
  title?: string;
  subtitle?: string;
  content?: string;
  description?: string;
  images?: string[];
  buttons?: ButtonData[];
  items?: unknown[];
  [key: string]: unknown; // Allow additional properties
}

export interface ButtonData {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  target?: '_blank' | '_self';
}

export interface SectionData {
  id: string;
  type: string;
  order: number;
  enabled: boolean;
  data: WidgetData;
}
