# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build`
- **Start production server**: `npm start`
- **Linting**: `npm run lint`
- **Sitemap generation**: Automatically runs after build via `postbuild` script

## Architecture Overview

This is a Next.js 15 application for the Uplift consulting services website with the following key architectural components:

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Content Management**: Notion API integration
- **Internationalization**: next-intl for English/Thai localization
- **State Management**: Zustand stores
- **3D Graphics**: Three.js with React Three Fiber for interactive elements

### Directory Structure
- `src/app/`: App Router pages with route groups:
  - `(Public)/`: Public marketing pages (innovation, service, solutions, story, vision)
  - `(Repp)/`: Repp product-specific pages
  - `test/`: Development/testing pages
- `src/components/`: Reusable UI components organized by purpose
- `src/lib/`: Core utilities, API clients, stores, and configurations
- `src/data/`: Static content data and mock data
- `src/types/`: TypeScript type definitions

### Key Integrations
- **Notion CMS**: Content fetched via `@notionhq/client` (configured in `src/lib/notion.ts`)
- **Analytics**: Google Analytics via custom provider (`src/lib/analytics-provider.tsx`)
- **Internationalization**: Locale-aware routing with dictionary-based translations
- **SEO**: Dynamic metadata generation with locale support

### Content Management
- Service pages and content are managed through Notion databases
- Product information stored in TypeScript files (`src/data/products.ts`, `src/data/services.ts`)
- Multi-language content stored in JSON dictionaries (`src/lib/dictionaries/`)

### State Management
Zustand stores handle various application state:
- `article-store.ts`: Article/blog content
- `footer-store.ts`: Footer content
- `landing-store.ts`: Landing page data
- `product-store.ts`: Product information

### Environment Variables
- `NEXT_PUBLIC_NOTION_TOKEN`: Notion API integration
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics tracking

### Path Aliases
- `@/*`: Maps to `src/*` for cleaner imports

## Development Notes

The application uses Turbopack for development builds and includes comprehensive SEO optimization with OpenGraph and Twitter card support. The codebase follows a component-driven architecture with clear separation between public marketing pages and product-specific sections.