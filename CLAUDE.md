# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds on port 4000)
- **Production build**: `npm run build`
- **Post-build**: `npm run postbuild` (generates sitemap using next-sitemap)
- **Start production server**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: `npx tsc --noEmit` (no dedicated typecheck script in package.json)
- **Storybook**: 
  - `npm run storybook` - Start Storybook development server
  - `npm run build-storybook` - Build Storybook for production
- **Testing**: Uses Vitest with browser testing via Playwright

## Architecture Overview

This is a Next.js 15 application for Uplift consulting services with sophisticated content management, user authentication, and file handling capabilities.

### Core Technologies
- **Framework**: Next.js 15 with App Router and Turbopack
- **Frontend**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: Zustand stores for client-side state
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber, @react-three/drei)
- **Drag & Drop**: @dnd-kit for sortable interfaces
- **Animations**: Motion (formerly Framer Motion), Lottie animations
- **Icons**: Heroicons, Tabler Icons, React Icons, Lucide React
- **Authentication**: Custom JWT-based system with social OAuth (Google, Facebook)
- **Internationalization**: next-intl for English/Thai localization
- **External Integrations**: Google Analytics

### Authentication System
Custom JWT-based authentication system replacing NextAuth.js:
- **JWT Tokens**: Access tokens stored in httpOnly cookies
- **Social OAuth**: Google and Facebook integration via backend API
- **Role-based Access**: USER, ADMIN role system with middleware protection
- **State Management**: Zustand-based auth store with persistent session
- **API Client**: Axios-based client with automatic cookie handling
- **Route Protection**: Middleware validates JWT and roles for `/admin` routes

### Directory Structure & Routing
Next.js 15 App Router with route groups:
- `src/app/(Public)/`: Public marketing pages (home, services, solutions, etc.)
- `src/app/admin/`: Role-protected admin dashboard with full CRUD management
- `src/app/auth/`: Authentication pages (signin, signup)
- `src/app/api/`: API endpoints (currently pointing to external NestJS backend)

### Widget System Architecture
Sophisticated widget-based content system:
- **Widget Registry**: Type-safe widget registration with `WidgetFactory` and `WidgetRegistry`
- **Widget Categories**: Hero, Cards (Single, Three-Column, Four-Column, Grid, List)
- **SSR Support**: Server-side rendering with `SSRWidgetRenderer`
- **Dynamic Configuration**: Runtime widget configuration with field definitions
- **Storybook Integration**: Component documentation and testing

### Content Management System
Database-driven CMS (pointing to external backend):
- **Content Types**: Hero sections, problem sections, features, etc.
- **Workflow States**: DRAFT → REVIEW → PUBLISHED → ARCHIVED
- **Multi-language**: English/Thai content support via locale system
- **Dynamic Fields**: Configurable field types with validation
- **API Integration**: RESTful endpoints for content CRUD operations

### State Management Architecture
Zustand stores for different domains:
- `auth.ts`: Authentication state and user management
- `product-store.ts`: Product catalog management
- `website-store.ts`: Website content state
- `landing-store.ts`: Landing page configuration
- `footer-store.ts`: Footer content management

### Internationalization (i18n)
- **Languages**: English (default) and Thai support
- **Locale Handling**: Middleware-based locale detection and routing
- **URL Structure**: 
  - Default (Thai): `/` 
  - English: `/en/`
- **File Structure**: 
  - `src/lib/dictionaries/en.json` - English translations
  - `src/lib/dictionaries/th.json` - Thai translations
- **Implementation**: Uses `next-intl` with custom middleware for locale routing

### External Backend Integration
This frontend connects to a separate NestJS backend:
- **API Base**: Configurable via `NEXT_PUBLIC_API_URL` environment variable
- **Client**: Axios-based API client with cookie authentication
- **Error Handling**: Centralized error handling with toast notifications
- **File Uploads**: S3 presigned URL system via backend API

### Environment Variables
```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Authentication (Legacy - may be removed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Social OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
```

### Development Setup
1. **Install dependencies**: `npm install`
2. **Configure environment**: Set up `.env` file with backend API URL
3. **Start development**: `npm run dev` (runs on port 4000 with Turbopack)
4. **Backend dependency**: Requires separate NestJS backend running on configured API URL

### Key Architecture Patterns
- **Route Groups**: App Router organizes routes with `(Public)` for marketing pages and `admin` for protected functionality
- **Middleware Protection**: Authentication and role-based access control via middleware
- **API Integration**: Frontend-only with external backend dependency
- **Widget System**: Modular, reusable content components with type safety
- **State Management**: Domain-driven Zustand stores for different app areas
- **Error Handling**: Global error boundary and toast notifications via Sonner
- **Image Optimization**: Next.js Image component with remote patterns for external sources

### Production Considerations
- Backend API must be running and accessible
- Environment variables must be configured for all external services
- Social OAuth credentials required for authentication
- Google Analytics tracking configured
- Next.js build optimization with Turbopack for faster development
- Storybook documentation for component testing and development

### Testing Infrastructure
- **Framework**: Vitest with browser testing capabilities
- **Browser Testing**: Playwright integration via @vitest/browser
- **Coverage**: @vitest/coverage-v8 for code coverage reports
- **Component Testing**: Storybook for UI component documentation and testing