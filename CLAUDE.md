# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds on port 4000)
- **Production build**: `npm run build`
- **Post-build**: `npm run postbuild` (generates sitemap using next-sitemap)
- **Start production server**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: `npx tsc --noEmit` (no dedicated typecheck script in package.json)
- **Testing**: Uses Vitest with jsdom environment
  - Test configuration in `vitest.config.ts`
  - Run tests: `npm test` (if configured) or `npx vitest`

## Architecture Overview

This is a Next.js 15 application for Uplift consulting services with sophisticated content management, user authentication, and file handling capabilities.

### Core Technologies
- **Framework**: Next.js 15.3.5 with App Router and Turbopack
- **Frontend**: React 19 with TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: Zustand 5 stores with persistence for client-side state
- **3D Graphics**: Three.js with React Three Fiber (@react-three/fiber, @react-three/drei)
- **Drag & Drop**: @dnd-kit for sortable interfaces
- **Animations**: Motion (formerly Framer Motion), Lottie animations
- **Icons**: Heroicons, Tabler Icons, React Icons, Lucide React
- **Authentication**: Custom JWT-based system with httpOnly cookies and social OAuth (Google, Facebook)
- **Internationalization**: next-intl for English/Thai localization
- **External Integrations**: Google Analytics, LINE LIFF

### Authentication System
Custom JWT-based authentication system:
- **JWT Tokens**: Access tokens stored in httpOnly cookies (name: `accessToken`)
- **Social OAuth**: Google and Facebook integration via backend API endpoints
- **Role-based Access**: Roles checked via `role.name === 'Admin'` or `role.pathRoles === 'admin'`
- **State Management**: Zustand auth store with localStorage persistence
- **API Client**: Axios client with `withCredentials: true` for cookie handling
- **Route Protection**: Middleware decodes JWT payload to check user roles for `/admin` routes
- **Auth Flow**: `useAuthInit` hook handles token refresh and session initialization

### Directory Structure & Routing
Next.js 15 App Router with route groups:
- `src/app/(Public)/`: Public marketing pages (home, services, solutions, etc.)
- `src/app/admin/`: Role-protected admin dashboard with full CRUD management
- `src/app/auth/`: Authentication pages (signin, signup)
- `src/app/api/`: API endpoints (currently pointing to external NestJS backend)

### Widget System Architecture
Sophisticated widget-based content system:
- **Widget Registry**: Type-safe widget registration with `WidgetFactory` and `WidgetRegistry`
- **Widget Categories**: Hero, Cards (Single, Three-Column, Four-Column, Grid, List, Problems)
- **SSR Support**: Server-side rendering with `SSRWidgetRenderer`
- **Dynamic Configuration**: Runtime widget configuration with field definitions

#### Widget File Structure Pattern (IMPORTANT)
Each widget follows this exact structure:
```
/src/lib/widgets/[category]/[WidgetName]/
  ├── WidgetName.widget.ts     # OOP class with config/validation
  ├── WidgetName.ssr.tsx       # SSR component (production)
  ├── WidgetName.component.tsx # Client component (admin preview)
  └── WidgetName.skeleton.tsx  # Loading skeleton
```

**Critical Implementation Rules:**
- **render()** method uses `.component.tsx` (client-side for admin preview)
- **renderSSR()** method uses `.ssr.tsx` (server-side for production)
- **Both components MUST produce identical output** - only difference is animation capability
- **SSR components import animated components** from `/components/widgets/[name]/` folder
- **Animated components are "use client"** and contain motion/framer-motion code
- **Never use styled-jsx in SSR components** - it breaks server rendering
- **Hero Widgets**: OOP-based HeroAI widget in `/lib/widgets/hero/HeroAI/` with SSR and client components

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

### Component Organization
Clean component structure in `/components/`:
- `/hero/`: Hero-specific components (animations, stats cards, globe)
  - `hero-animated.tsx`: Animated text components
  - `stats-cards.tsx`: Statistics cards with responsive layouts
  - `globe-animated.tsx`: Interactive globe with hover effects
- `/button/`: Button component variants
- `/input/`: Form input components
- `/nav/`: Navigation components
- `/admin/`: Admin dashboard components
- `/section/`: Page section components

### External Backend Integration
This frontend connects to a separate NestJS backend:
- **API Base**: Configurable via `NEXT_PUBLIC_API_URL` environment variable (default: `http://localhost:3000`)
- **Client**: Axios-based API client (`/lib/api/client.ts`) with cookie authentication
- **Error Handling**: Centralized error handling with Sonner toast notifications
- **File Uploads**: S3 presigned URL system via backend API
- **API Endpoints**: Backend handles auth, users, roles, products, services, website content, images

### Environment Variables
```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Authentication (Legacy - NextAuth remnants)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Social OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# LINE LIFF Integration
NEXT_PUBLIC_LINE_LIFF_ID=your-line-liff-id
NEXT_PUBLIC_LINE_CHANNEL_ID=your-line-channel-id

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id

# AWS S3 (for file uploads)
AWS_S3_BUCKET_NAME=uplift-uploads
AWS_S3_REGION=ap-southeast-1
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

### Testing Infrastructure
- **Framework**: Vitest with jsdom environment
- **Coverage**: @vitest/coverage-v8 for code coverage reports

### Common Pitfalls & Solutions
- **Dynamic Tailwind Classes**: Avoid template literals in className (e.g., `text-${color}-400`). Use complete class names or cn() utility
- **Optional Chaining**: Always use optional chaining for potentially undefined properties (e.g., `item.gradientFrom?.split()`)
- **Type Conflicts**: Watch for duplicate type definitions between local interfaces and external types
- **SSR vs Client Components**: Hero widgets have both SSR (`.ssr.tsx`) and client (`.component.tsx`) versions for optimal performance
- **Node Modules Permission**: If you encounter EACCES errors with node_modules, delete and reinstall: `rm -rf node_modules package-lock.json && npm install`
- **Image Optimization**: Next.js Image component configured with remote patterns for external sources (S3, Unsplash, etc.)
- **Middleware JWT Decoding**: JWT payload structure has user roles at `payload.user.roles` array
- **TypeScript Path Aliases**: Use `@/*` to import from `src/*` directory
- **Next.js Output**: Configured for standalone deployment mode
- **Sitemap Generation**: Automatic generation via next-sitemap post-build with internationalization support