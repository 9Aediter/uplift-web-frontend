/**
 * Store-specific Types
 * Generic types used across Zustand stores
 */

// Generic data structures
export type JsonObject = Record<string, unknown>;
export type JsonArray = unknown[];
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

// Footer store types
export interface FooterContract {
  name: string;
  address: string;
  phone: string;
  email: string;
  [key: string]: string;
}

export interface FooterService {
  name: string;
  path: string;
  [key: string]: string;
}

export interface FooterData {
  contract: FooterContract;
  services: FooterService[];
}

// Website store types
export interface SectionData {
  id: string;
  type: string;
  config: JsonObject;
  order: number;
}

export interface PageData {
  id: string;
  title: string;
  slug: string;
  sections: SectionData[];
  metadata?: JsonObject;
}

export interface WidgetConfig {
  id: string;
  type: string;
  category: string;
  config: JsonObject;
}

// Home store types
export interface HeroData {
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    link: string;
  };
  image?: string;
  [key: string]: JsonValue;
}

// Generic error type for stores
export interface StoreError {
  message: string;
  code?: string;
  details?: JsonObject;
}

// Transform function type
export type TransformFunction<T, R> = (input: T) => R;
