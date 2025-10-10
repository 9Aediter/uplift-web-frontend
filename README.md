# Uplift Web Frontend

> **Official website and consulting services platform**
> Built with Next.js 15, React 19, TypeScript 5, and modern web technologies

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (port 4000)
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## About This Project

Uplift Web Frontend is a sophisticated Next.js application for software consulting services, featuring:

- 🎨 **Modern UI/UX** with Tailwind CSS 4 and shadcn/ui
- 🌐 **Internationalization** (English/Thai) via next-intl
- 🔐 **JWT Authentication** with social OAuth (Google, Facebook)
- 📝 **Widget-Based CMS** with database integration
- 🎭 **3D Graphics** powered by Three.js
- 🚀 **CI/CD Pipeline** with GitHub Actions + ArgoCD
- ⚡ **High Performance** with Turbopack and SSR optimization

## Copyright & License

**Copyright © 2025 UPLIFT TECHNOLOGY COMPANY LIMITED**
All rights reserved.

This source code is proprietary. Unauthorized copying, modification, reproduction, or distribution is strictly prohibited without prior written permission.

Open-source components (shadcn/ui, Tailwind CSS, etc.) are used under their respective licenses.

**Contact**: official@uplifttech.dev

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Development Guide](#development-guide)
5. [Deployment & CI/CD](#deployment--cicd)
6. [API Documentation](#api-documentation)
7. [Content Management System](#content-management-system)
8. [Coding Standards](#coding-standards)

---

## Project Overview

Uplift Web Frontend is a Next.js 15 application built for software consulting services with sophisticated content management, user authentication, and modern web technologies.

### Key Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4
- **Widget-Based CMS**: Dynamic content management with SSR support
- **Multi-language**: English/Thai support via next-intl
- **Authentication**: JWT-based with social OAuth (Google, Facebook)
- **3D Graphics**: Three.js integration with React Three Fiber
- **CI/CD Pipeline**: GitHub Actions + ArgoCD deployment to K3s

---

## Technology Stack

### Core Framework
- **Next.js 15.3.5**: App Router with Turbopack
- **React 19**: Latest React features with TypeScript 5
- **Node.js 22**: Runtime environment

### Frontend Technologies
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **State Management**: Zustand 5 with localStorage persistence
- **Animations**: Motion (Framer Motion), Lottie
- **Icons**: Heroicons, Tabler Icons, Lucide React
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Drag & Drop**: @dnd-kit for sortable interfaces

### Backend Integration
- **API Client**: Axios with httpOnly cookie authentication
- **External Backend**: NestJS backend (separate repository)
- **File Storage**: AWS S3 with presigned URLs

### Internationalization
- **Library**: next-intl
- **Languages**: English (default), Thai
- **URL Structure**: `/` (Thai), `/en/` (English)

### Testing & Quality
- **Testing**: Vitest with jsdom environment
- **Coverage**: @vitest/coverage-v8
- **Type Checking**: TypeScript strict mode

---

## Architecture

### Directory Structure

```
uplift-web-frontend/
├── src/
│   ├── app/
│   │   ├── (Public)/          # Public marketing pages
│   │   ├── admin/             # Protected admin dashboard
│   │   ├── auth/              # Authentication pages
│   │   └── api/               # API endpoints
│   ├── components/
│   │   ├── hero/              # Hero section components
│   │   ├── admin/             # Admin UI components
│   │   ├── section/           # Page section components
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── widgets/           # Widget system
│   │   ├── api/               # API client
│   │   ├── services/          # Business logic
│   │   └── dictionaries/      # i18n translations
│   ├── data/                  # Static JSON data
│   ├── store/                 # Zustand stores
│   └── styles/                # Global styles
├── public/                    # Static assets
└── docs/                      # Documentation
```

### Widget System Architecture

Sophisticated widget-based content system with type-safe registration:

#### Widget File Structure Pattern
```
/src/lib/widgets/[category]/[WidgetName]/
  ├── WidgetName.widget.ts     # OOP class with config/validation
  ├── WidgetName.ssr.tsx       # SSR component (production)
  ├── WidgetName.component.tsx # Client component (admin preview)
  └── WidgetName.skeleton.tsx  # Loading skeleton
```

#### Critical Implementation Rules
- **render()** method → `.component.tsx` (client-side for admin)
- **renderSSR()** method → `.ssr.tsx` (server-side for production)
- Both components MUST produce identical output
- SSR components import animated components from `/components/widgets/`
- Never use styled-jsx in SSR components (breaks server rendering)

### Authentication System

Custom JWT-based authentication:
- **JWT Storage**: httpOnly cookies (name: `accessToken`)
- **Social OAuth**: Google and Facebook via backend API
- **Role-Based Access**: Admin/User roles with path-based protection
- **State Management**: Zustand auth store with persistence
- **Route Protection**: Middleware decodes JWT for `/admin` routes
- **Session Management**: `useAuthInit` hook for token refresh

### State Management

Domain-driven Zustand stores:
- `auth.ts` - Authentication and user management
- `product-store.ts` - Product catalog
- `website-store.ts` - Website content
- `landing-store.ts` - Landing page configuration
- `footer-store.ts` - Footer content

---

## Development Guide

### Prerequisites
- Node.js 22 or higher
- npm 10 or higher
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/uplift-technology-company-limited/uplift-web-frontend.git
cd uplift-web-frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

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

# AWS S3
AWS_S3_BUCKET_NAME=uplift-uploads
AWS_S3_REGION=ap-southeast-1
```

### Development Commands

```bash
# Start development server (port 4000 with Turbopack)
npm run dev

# Production build
npm run build

# Generate sitemap
npm run postbuild

# Start production server
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Run tests
npm test
# or
npx vitest
```

### Common Development Pitfalls

1. **Dynamic Tailwind Classes**: Never use `text-${color}-400`. Use complete class names or `cn()` utility
2. **Optional Chaining**: Always use for potentially undefined properties: `item?.property`
3. **Styled-JSX**: Never use styled-jsx - it breaks SSR in Next.js 15
4. **Icon Mapping**: Ensure JSON icon names match component IconMap keys
5. **Path Aliases**: Always use `@/*` for imports from `src/` directory
6. **Node Modules**: If EACCES errors occur: `rm -rf node_modules package-lock.json && npm install`

---


## Data Architecture

### Homepage Data Structure (Split by Section)

**Location**: `src/data/homepage/[section]/[lang].json`

Each homepage section has dedicated JSON files for English and Thai:

```
src/data/homepage/
├── problems/
│   ├── en.json       # Problem statements (EN)
│   └── th.json       # Problem statements (TH)
├── faq/
│   ├── en.json       # FAQ content (EN)
│   └── th.json       # FAQ content (TH)
├── techstack/
│   ├── en.json       # Tech stack (EN)
│   └── th.json       # Tech stack (TH)
└── portfolio/
    ├── en.json       # Portfolio/Best Practices (EN)
    └── th.json       # Portfolio/Best Practices (TH)
```

### Data Loaders

Located in `src/app/[lang]/page.tsx`:

- `getProblemsData(locale)` - Load problem statements
- `getFAQData(locale)` - Load FAQ content
- `getTechStackData(locale)` - Load technology stack
- `getPortfolioData(locale)` - Load portfolio/best practices

**Features**: Automatic English fallback, type-safe interfaces, server-side loading

### Icon Mapping System

**Location**: `src/lib/utils/icon-mapper.tsx`

Maps technology names (strings in JSON) to React icon components. Must be a client component with `'use client'` directive. Supports 30+ technologies with React Icons (Si*, Ai*, Fa*).

**Usage**:
```typescript
import { getTechIcon } from '@/lib/utils/icon-mapper'
const icon = getTechIcon('React') // Returns <SiReact className="w-8 h-8" />
```

---

## Deployment & CI/CD

### Architecture Overview

```
GitHub Repository
    ↓
GitHub Actions Pipeline
    ↓
├─ Quality Gate (lint, type-check, build, security audit)
├─ Docker Build & Push to AWS ECR
└─ Update GitOps Repository
    ↓
ArgoCD Auto-Sync
    ↓
K3s Cluster Deployment
    ↓
Health Check
```

### AWS Setup

#### 1. Create ECR Repository

```bash
aws ecr create-repository \
  --repository-name uplift-web-frontend \
  --region ap-southeast-1
```

#### 2. Create IAM OIDC Provider

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

#### 3. Create IAM Role for GitHub Actions

**Trust Policy** (`trust-policy.json`):
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:OWNER/REPO:ref:refs/heads/main"
      }
    }
  }]
}
```

**ECR Permission Policy** (`ecr-policy.json`):
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:PutImage"
    ],
    "Resource": "*"
  }]
}
```

**Create Role**:
```bash
# Get AWS Account ID
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Update trust policy
sed -i "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g" trust-policy.json

# Create Role
aws iam create-role \
  --role-name GitHubActions-UpliftFrontend \
  --assume-role-policy-document file://trust-policy.json

# Create Policy
aws iam create-policy \
  --policy-name ECRAccess-UpliftFrontend \
  --policy-document file://ecr-policy.json

# Attach Policy to Role
aws iam attach-role-policy \
  --role-name GitHubActions-UpliftFrontend \
  --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/ECRAccess-UpliftFrontend

# Get Role ARN
aws iam get-role \
  --role-name GitHubActions-UpliftFrontend \
  --query 'Role.Arn' \
  --output text
```

### GitHub Configuration

#### Required Secrets

Navigate to: **Repository → Settings → Secrets and variables → Actions → Secrets**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AWS_ROLE_ARN` | IAM Role ARN for OIDC | `arn:aws:iam::123456789012:role/GitHubActions-UpliftFrontend` |
| `GITOPS_TOKEN` | GitHub Personal Access Token | `ghp_xxxxxxxxxxxxxxxxxxxx` |

#### Required Variables

Navigate to: **Repository → Settings → Secrets and variables → Actions → Variables**

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `GITOPS_REPO` | GitOps Repository | `owner/uplift-k3s-gitops` |
| `PRODUCTION_URL` | Production Website URL | `https://uplifttech.store` |

#### Creating GitHub Personal Access Token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **"Generate new token (classic)"**
3. Name: `GitOps Repository Access - Uplift Frontend`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Generate and copy token immediately

### GitOps Repository Structure

```
uplift-k3s-gitops/
└── manifests/
    └── uplift/
        └── uplift-web-frontend/
            ├── deployment.yaml
            ├── service.yaml
            ├── ingress.yaml
            └── configmap.yaml
```

### ArgoCD Configuration

**Application Manifest**:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: uplift-web-frontend
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/OWNER/uplift-k3s-gitops.git
    targetRevision: main
    path: manifests/uplift/uplift-web-frontend
  destination:
    server: https://kubernetes.default.svc
    namespace: uplift
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

Apply: `kubectl apply -f argocd-application.yaml -n argocd`

### CI/CD Pipeline Jobs

#### 1. Quality Gate
- Install Node.js 22 with npm cache
- Install dependencies (`npm ci`)
- ESLint code quality check
- TypeScript type checking
- Production build test
- npm audit security scan

#### 2. Docker Build
- AWS OIDC authentication
- ECR login
- Docker Buildx setup (multi-platform)
- Image metadata generation
- Build & push to ECR with tags (SHA + latest)

#### 3. GitOps Update
- Checkout GitOps repository
- Update Kubernetes manifest with new image tag
- Commit and push changes
- ArgoCD auto-detects and syncs

#### 4. Health Check
- Wait for ArgoCD sync
- Retry logic with backoff
- Verify application accessibility
- Debug logging on failure

### Troubleshooting

#### AWS Authentication Failed
```
Error: Could not assume role with OIDC
```
**Solution**: Check IAM role trust policy and repository path in condition

#### ECR Push Failed
```
Error: denied: requested access to the resource is denied
```
**Solution**: Verify IAM role has ECR permissions and repository exists

#### GitOps Update Failed
```
Error: remote: Permission to repository denied
```
**Solution**: Check GITOPS_TOKEN has write permissions and correct repository name

#### Health Check Failed
```
Health check failed after 12 attempts
```
**Solution**:
- Check ArgoCD sync status
- Verify Kubernetes ingress configuration
- Check application logs in K3s: `kubectl logs -l app=uplift-web-frontend -n uplift`

---

## API Documentation

The frontend integrates with a separate NestJS backend API.

### Base Configuration
- **Development**: `http://localhost:3000`
- **Production**: Configured via `NEXT_PUBLIC_API_URL`
- **Authentication**: httpOnly cookies with JWT

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js dynamic routes |
| `/api/auth/session` | GET | Get current session |
| `/api/auth/signin` | POST | Sign in with providers |
| `/api/auth/signout` | POST | Sign out |
| `/api/auth/callback/[provider]` | POST | OAuth callbacks |

### User Management (Admin Only)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/users` | GET | ✅ | List users with pagination |
| `/api/admin/users` | POST | ✅ | Create new user |
| `/api/admin/users/[id]` | GET | ✅ | Get user by ID |
| `/api/admin/users/[id]` | PUT | ✅ | Update user |
| `/api/admin/users/[id]` | DELETE | ✅ | Delete user (Super Admin) |

### Content Management (Admin Only)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/admin/content` | GET | ✅ | List content with filters |
| `/api/admin/content` | POST | ✅ | Create content |
| `/api/admin/content/[id]` | GET | ✅ | Get content by ID |
| `/api/admin/content/[id]` | PUT | ✅ | Update content |
| `/api/admin/content/[id]` | DELETE | ✅ | Delete content |
| `/api/admin/content/[id]/publish` | PATCH | ✅ | Publish content |

### Product Management

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/products` | GET | ❌ | List products (public) |
| `/api/products` | POST | ✅ | Create product |
| `/api/products/[id]` | GET | ❌ | Get product by ID |
| `/api/products/[id]` | PUT | ✅ | Update product |
| `/api/products/[id]` | DELETE | ✅ | Delete product |
| `/api/products/[id]/sections` | GET | ❌ | Get product sections |
| `/api/products/[id]/sections` | POST | ✅ | Create section |

### File Upload (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload/presigned` | POST | Generate S3 presigned URL |
| `/api/upload/complete` | POST | Upload completion callback |
| `/api/upload/history` | GET | Get upload history |

### Analytics (Admin Only)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Dashboard statistics |
| `/api/admin/activity` | GET | Activity logs |

### Error Response Format

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "object|null"
  },
  "statusCode": "number",
  "timestamp": "string"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Rate Limiting
- Public APIs: 100 requests/minute
- Authenticated APIs: 1000 requests/minute
- Admin APIs: 500 requests/minute
- Upload APIs: 50 requests/minute

---

## Content Management System

### Overview

Database-driven CMS with workflow states and permission system.

### Features
- ✅ Stage/Review workflow (DRAFT → REVIEW → PUBLISHED → ARCHIVED)
- ✅ Role-based permissions (Admin-only for unpublished content)
- ✅ Multi-language support (EN/TH)
- ✅ Dynamic field management
- ✅ RESTful API endpoints

### Content Workflow States

```
DRAFT → REVIEW → PUBLISHED
  ↓        ↓         ↓
ARCHIVED ← ARCHIVED ← ARCHIVED
```

#### State Descriptions
1. **DRAFT**: Created/edited content (not visible to public)
2. **REVIEW**: Submitted for approval
3. **PUBLISHED**: Live and visible to public
4. **ARCHIVED**: Hidden from public view

### Permission Rules

| State | Public Access | Admin Access |
|-------|---------------|--------------|
| PUBLISHED | ✅ Yes | ✅ Yes |
| DRAFT | ❌ No | ✅ Yes |
| REVIEW | ❌ No | ✅ Yes |
| ARCHIVED | ❌ No | ✅ Yes |

### User Roles
- **USER**: Regular users (public content only)
- **ADMIN**: Content management access
- **SUPER_ADMIN**: Full system access

### Content Types
- Hero Sections
- Problem Sections
- Feature Sections
- CTA Sections
- Product Showcases

### Usage Example

```tsx
import { HeroSectionEditorDB } from "@/components/admin/hero-section-editor-db"

export default function AdminPage() {
  return (
    <HeroSectionEditorDB
      pageSlug="home"
      title="Hero Section"
      description="Database-integrated hero section editor"
      onDataChange={(data) => console.log(data)}
    />
  )
}
```

### Content Service API

```tsx
import { contentService } from "@/lib/services/content-service"

// Get published content
const heroData = await contentService.getHeroSectionData("home")

// Save content (both languages)
await contentService.saveHeroSectionData(heroData, "home")

// Update status
await contentService.updateContentStatus({
  contentId: "content-id",
  status: "PUBLISHED"
})
```

---

## Coding Standards

### Critical Rules

#### 1. Never Use styled-jsx

❌ **WRONG**:
```tsx
<style jsx>{`
  .some-class { color: red; }
`}</style>
```

✅ **CORRECT** - External CSS:
```tsx
// Create: /src/styles/animations.css
@keyframes customAnimation { /* ... */ }

// Import in component
import '@/styles/animations.css'
```

✅ **CORRECT** - Tailwind Only:
```tsx
<div className="bg-gradient-to-r from-blue-500 to-purple-600" />
```

#### 2. Component Organization

**Client Components**:
```tsx
'use client'  // Must be first line
import React from 'react'
import { motion } from 'framer-motion'

export const InteractiveComponent = () => {
  // Component with animations/interactivity
}
```

**Server Components** (default):
```tsx
// No 'use client' directive
import React from 'react'

export default async function StaticComponent() {
  const data = await fetch(...)
  return <div>{/* content */}</div>
}
```

#### 3. Tailwind CSS Best Practices

❌ **AVOID Dynamic Classes**:
```tsx
className={`text-${color}-500`}  // Won't work!
```

✅ **Use Complete Classes**:
```tsx
className="text-blue-500"
className={variant === 'primary' ? 'bg-blue-100' : 'bg-gray-100'}

// Or use cn() utility
import { cn } from '@/lib/utils'
className={cn('base-classes', condition && 'conditional-classes')}
```

#### 4. Icon Usage

**Lucide React** (for service sections):
```tsx
import { UsersIcon, CloudIcon } from 'lucide-react'

const IconMap = { UsersIcon, CloudIcon }
const Icon = IconMap[iconName]
<Icon className="w-6 h-6" />
```

**Heroicons** (for UI elements):
```tsx
import { SparklesIcon } from '@heroicons/react/24/outline'
<SparklesIcon className="w-4 h-4" />
```

#### 5. Animation Patterns

**External CSS Animations**:
```css
/* /src/styles/animations.css */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite; }
```

**Framer Motion**:
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### 6. Data Management

**JSON Data Files**:
```json
{
  "showcase_items": [
    {
      "id": "service-id",
      "title": "Service Title",
      "icon": "IconName",  // Must match IconMap
      "features": [...]
    }
  ]
}
```

**Dynamic Loading**:
```tsx
const getData = async (locale: string) => {
  try {
    const data = await import(`@/data/services/${locale}.json`)
    return data.default
  } catch {
    const data = await import(`@/data/services/en.json`)
    return data.default
  }
}
```

#### 7. State Management with Zustand

```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data })
    }),
    { name: 'store-name' }
  )
)
```

### File Structure Guidelines

```
/src/
  /data/              # JSON data files
    /services/
      en.json
      th.json
  /styles/            # CSS files only
    animations.css
    globals.css
  /components/
    /section/         # Page sections
    /ui/              # Reusable UI
    /admin/           # Admin components
```

### Best Practices Checklist

- ✅ Use `'use client'` only when needed
- ✅ Prefer external CSS over styled-jsx
- ✅ Use complete Tailwind class names
- ✅ Match icon names to IconMap keys
- ✅ Use `@/` prefix for absolute imports
- ✅ Add TypeScript types for all data
- ✅ Use optional chaining for nullable properties
- ✅ Follow Next.js 15 App Router conventions
- ✅ Keep server components as default
- ✅ Test with both light/dark themes

---

## Security Considerations

### Authentication
1. JWT tokens in httpOnly cookies (prevents XSS)
2. OIDC for CI/CD (no long-lived credentials)
3. Role-based access control
4. Session management with refresh tokens

### API Security
1. Input validation with Zod schemas
2. Rate limiting on all endpoints
3. CORS configuration
4. SQL injection prevention via Prisma ORM

### File Uploads
1. S3 presigned URLs (temporary access)
2. File type validation
3. Size limits enforced
4. Virus scanning recommended

### Infrastructure
1. Environment variables for secrets
2. GitHub token rotation (90 days recommended)
3. AWS credentials rotation
4. HTTPS only in production
5. Network policies in K3s

---

## Support & Contributing

### Getting Help
- Documentation: This file
- Issues: GitHub Issues
- Contact: official@uplifttech.dev

### License
**Proprietary Software** - All rights reserved by UPLIFT TECHNOLOGY COMPANY LIMITED

This project uses open-source components (shadcn/ui, Tailwind CSS, etc.) under their respective licenses. This does not grant any rights to reuse, copy, or distribute this website as a whole.

For inquiries or permission requests: **official@uplifttech.dev**

---

**Last Updated**: 2025-10-01
**Version**: 1.0.0
**Maintained by**: UPLIFT TECHNOLOGY COMPANY LIMITED
