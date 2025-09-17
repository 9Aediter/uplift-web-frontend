# System Prompt - Uplift Admin Coding Patterns

## Project Structure & Architecture

This is a Next.js 15 application with specific architectural patterns that must be followed.

### Technology Stack
- **Framework**: Next.js 15.3.5 with App Router
- **UI Libraries**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Animations**: Framer Motion (motion package), Lottie
- **State Management**: Zustand 5 with persistence
- **Icons**: Heroicons, Lucide React, Tabler Icons
- **3D Graphics**: Three.js with React Three Fiber

## Critical Coding Patterns

### 1. CSS and Styling Rules

#### ❌ NEVER USE styled-jsx
```tsx
// WRONG - Never use this pattern
<style jsx>{`
  .some-class {
    color: red;
  }
`}</style>
```

#### ✅ CORRECT Pattern - External CSS Files
```tsx
// 1. Create CSS file in /src/styles/
// File: /src/styles/animations.css
@keyframes customAnimation {
  /* animation rules */
}

// 2. Import in component
import '@/styles/animations.css'

// 3. Use classes in component
<div className="animate-custom">
```

#### ✅ CORRECT Pattern - Tailwind Classes Only
```tsx
// Use Tailwind utilities and arbitrary values
<div className="bg-gradient-to-r from-blue-500 to-purple-600">
<div className="animate-bounce hover:scale-105 transition-all">
```

### 2. Component Organization

#### Client Components
```tsx
'use client'  // Must be first line for client components
import React from 'react'
import { motion } from 'framer-motion'  // Client-only libraries

export const ClientComponent = () => {
  // Interactive components with animations
}
```

#### Server Components (Default)
```tsx
// No 'use client' directive
import React from 'react'

export default async function ServerComponent() {
  // Can fetch data directly
  const data = await fetch(...)
  return <div>{/* Static content */}</div>
}
```

### 3. File Structure Patterns

#### Service/Data Files
```
/src/data/
  /services/
    en.json    # English content
    th.json    # Thai content
  /story/
    en.json
    th.json
```

#### Style Files
```
/src/styles/
  animations.css    # Reusable animations
  globals.css       # Global styles
```

#### Component Structure
```
/src/components/
  /section/
    /service/
      hero.tsx       # Section components
      service.tsx
  /ui/              # Reusable UI components
  /admin/           # Admin-specific components
```

### 4. Animation Patterns

#### External CSS Animations
```css
/* /src/styles/animations.css */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
```

#### Framer Motion Animations
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### 5. Icon Usage Patterns

#### Lucide React Icons (for service sections)
```tsx
import { UsersIcon, CloudIcon, WrenchIcon } from 'lucide-react'

const IconMap = {
  UsersIcon,
  CloudIcon,
  WrenchIcon
}

// Dynamic usage
const Icon = IconMap[iconName]
<Icon className="w-6 h-6" />
```

#### Heroicons (for UI elements)
```tsx
import { SparklesIcon } from '@heroicons/react/24/outline'
import { ArrowDownIcon } from '@heroicons/react/24/solid'

<SparklesIcon className="w-4 h-4 text-blue-500" />
```

### 6. Tailwind CSS Best Practices

#### ❌ AVOID Dynamic Classes
```tsx
// WRONG - These won't work with Tailwind purging
className={`text-${color}-500`}
className={`bg-${variant}-100`}
```

#### ✅ Use Complete Classes
```tsx
// CORRECT - Use full class names
className="text-blue-500"
className={variant === 'primary' ? 'bg-blue-100' : 'bg-gray-100'}

// Or use cn() utility for conditional classes
import { cn } from '@/lib/utils'
className={cn(
  'base-classes',
  condition && 'conditional-classes'
)}
```

### 7. Data Management Patterns

#### JSON Data Files
```json
// /src/data/services/th.json
{
  "showcase_items": [
    {
      "id": "service-id",
      "title": "Service Title",
      "icon": "IconName",  // Must match IconMap keys
      "features": [...]
    }
  ]
}
```

#### Dynamic Data Loading
```tsx
const getServicesData = async (locale: string) => {
  try {
    const data = await import(`@/data/services/${locale}.json`)
    return data.default
  } catch {
    // Fallback to English
    const data = await import(`@/data/services/en.json`)
    return data.default
  }
}
```

### 8. Common Pitfalls to Avoid

1. **Never use styled-jsx** - It breaks SSR in Next.js 15
2. **Avoid dynamic Tailwind classes** - They won't be included in production
3. **Don't mix icon libraries** - Use Lucide for data-driven components, Heroicons for UI
4. **Always use absolute imports** - Use `@/` prefix for imports from src/
5. **Check icon name mapping** - Ensure JSON icon names match component IconMap

### 9. Environment-Specific Rules

#### Development
```bash
npm run dev         # Port 4000 with Turbopack
```

#### Production Build
```bash
npm run build       # Production build
npm run lint        # Check linting
npx tsc --noEmit   # Type checking
```

### 10. State Management with Zustand

```tsx
// Store pattern
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // State
      data: null,
      // Actions
      setData: (data) => set({ data })
    }),
    {
      name: 'store-name'
    }
  )
)
```

## File Creation Guidelines

### When Creating New Components:
1. Determine if it needs interactivity → use `'use client'`
2. Place animations in `/src/styles/animations.css`
3. Import CSS file if using custom animations
4. Use proper icon library based on context
5. Follow existing component patterns in the codebase

### When Modifying Existing Components:
1. Check for styled-jsx and remove it
2. Move CSS to external files
3. Maintain consistent icon usage
4. Preserve existing functionality
5. Test with both light and dark themes

## Summary

This codebase prioritizes:
- **Performance**: SSR by default, client components only when needed
- **Maintainability**: Clear separation of concerns, consistent patterns
- **Type Safety**: Full TypeScript coverage
- **Styling**: Tailwind-first approach, external CSS for animations
- **Best Practices**: Follow Next.js 15 and React 19 conventions