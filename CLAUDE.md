# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Production build**: `npm run build`
- **Start production server**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: `npx tsc --noEmit` (no dedicated typecheck script in package.json)
- **Database operations**:
  - `npx prisma generate` - Generate Prisma client
  - `npx prisma migrate dev` - Run database migrations
  - `npm run db:seed` - Seed database with initial data
  - `npx prisma studio` - Open Prisma Studio for database inspection
- **Docker operations**:
  - `docker compose up -d` - Start PostgreSQL and pgAdmin containers
  - Access pgAdmin: `localhost:5050` (admin@uplift.com / admin123)
  - PostgreSQL: `localhost:5432` (myuser / mypassword / mydb)

## Architecture Overview

This is a Next.js 15 application for Uplift consulting services with sophisticated content management, user authentication, and file handling capabilities.

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers (Google, Facebook, Credentials)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **File Storage**: AWS S3 with presigned URLs
- **Internationalization**: next-intl for English/Thai localization
- **State Management**: Zustand stores
- **3D Graphics**: Three.js with React Three Fiber

### Database Schema
Complex multi-tenant system with:
- **User Management**: Users, profiles, roles (USER/ADMIN/SUPER_ADMIN), social accounts
- **Content Management**: Database-driven CMS with workflow states (DRAFT/REVIEW/PUBLISHED/ARCHIVED)
- **Product Management**: Full product lifecycle with sections, cards, tech stacks
- **Media Management**: Image storage with S3 integration and usage tracking
- **Technology Stack**: Dynamic tech stack assignment to products

### Directory Structure
- `src/app/`: App Router with route groups:
  - `(Public)/`: Public marketing pages
  - `admin/`: Role-protected admin dashboard
  - `auth/`: Authentication pages
  - `api/`: Comprehensive API endpoints
- `src/components/`: UI components including admin interfaces
- `src/lib/`: Core utilities, API clients, stores, authentication
- `prisma/`: Database schema and migrations

### Authentication System
NextAuth.js configuration with:
- **Google OAuth**: Production-ready with proper consent flow
- **Facebook OAuth**: Social login integration  
- **Credentials**: bcrypt password hashing with user status validation
- **Role-based Access**: Middleware protection for admin routes
- **Session Management**: JWT with database user lookup

### Content Management System
Database-driven CMS with:
- **Workflow States**: DRAFT → REVIEW → PUBLISHED → ARCHIVED
- **Content Types**: HERO_SECTION, PROBLEM_SECTION, FEATURES_SECTION, etc.
- **Dynamic Fields**: SHORT/LONG field types with configurable buttons
- **Version Control**: Content history tracking with user attribution
- **Multi-language**: English/Thai content support

### File Upload System
AWS S3 integration featuring:
- **Presigned URLs**: Secure direct-to-S3 uploads via `/api/upload/presigned`
- **Image Management**: Usage tracking, metadata storage, CDN URLs
- **File Validation**: Type/size validation with error handling
- **Admin Interface**: Image gallery management with filters

### API Architecture
Comprehensive REST APIs:
- `/api/auth/*` - Authentication endpoints
- `/api/admin/*` - Role-protected admin operations
- `/api/products/*` - Product CRUD with sections/cards/tech-stack
- `/api/content/*` - CMS operations with workflow
- `/api/upload/*` - File upload with S3 integration
- `/api/technologies/*` - Tech stack management

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb

# Authentication  
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# File Storage
S3_ACCESS_KEY_ID=your-s3-key
S3_ACCESS_SECRET=your-s3-secret  
AWS_REGION=ap-southeast-1
AWS_BUCKET=uplift-uploads
CDN_URL=https://uplift-uploads.s3.ap-southeast-1.amazonaws.com

# External Services
NEXT_PUBLIC_NOTION_TOKEN=your-notion-token
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
```

### Development Setup
1. **Database**: Start Docker containers with `docker compose up -d`
2. **Migrations**: Run `npx prisma migrate dev` to setup schema
3. **Seeding**: Use `npm run db:seed` to populate initial data
4. **Development**: Start with `npm run dev` using Turbopack
5. **Admin Access**: Seed creates admin user or assign ADMIN role via database

### Role-Based Access Control
- **USER**: Basic access to public content
- **ADMIN**: Access to admin dashboard, content management, product management
- **SUPER_ADMIN**: Full system access including user management
- **Route Protection**: Middleware validates roles for protected routes

### Production Considerations
- Database migrations must be run before deployment
- S3 bucket and IAM permissions required for file uploads
- Social OAuth credentials needed for authentication
- Environment variables must be configured for all services

### Internationalization (i18n)
- **Languages**: English (default) and Thai support
- **Locale Handling**: Middleware-based locale detection and routing
- **File Structure**: 
  - `src/lib/dictionaries/en.json` - English translations
  - `src/lib/dictionaries/th.json` - Thai translations
- **URL Structure**: 
  - Default (Thai): `/` 
  - English: `/en/`
- **Implementation**: Uses `next-intl` with custom middleware for locale routing

### Key Architecture Patterns
- **Route Groups**: App Router organizes routes with `(Public)` for marketing pages and `admin` for protected admin functionality
- **Middleware Protection**: Authentication and role-based access control via middleware
- **API Organization**: RESTful endpoints with nested routes for complex relationships (e.g., `/api/products/[id]/sections/[sectionId]/cards`)
- **State Management**: Zustand stores for client-side state (article, footer, landing, product stores)
- **Error Handling**: Global error boundary and toast notifications via Sonner
- **Image Optimization**: Next.js Image component with remote patterns for S3 and external sources