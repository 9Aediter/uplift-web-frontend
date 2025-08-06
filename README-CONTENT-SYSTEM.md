# Content Management System Setup

## Overview

ระบบจัดการเนื้อหาสำหรับ Hero Section พร้อม stage/review workflow และระบบ permission

### Features

✅ **Database Schema**: Prisma models สำหรับจัดการ content
✅ **Stage/Review Workflow**: DRAFT → REVIEW → PUBLISHED → ARCHIVED
✅ **Permission System**: Admin เท่านั้นที่เข้าถึง unpublished content ได้
✅ **Multi-language**: รองรับ EN/TH
✅ **Dynamic Fields**: เพิ่ม/ลบ fields ได้ (SHORT/LONG types)
✅ **API Endpoints**: RESTful APIs สำหรับ CRUD
✅ **Hero Section Editor**: UI component พร้อม database integration

## Database Setup

### 1. Run Prisma Migration

```bash
npx prisma migrate dev --name add-content-management
npx prisma generate
```

### 2. Setup Sample Data

```bash
npx ts-node scripts/setup-content-db.ts
```

## API Endpoints

### Admin API (requires authentication)

- `GET /api/content` - Fetch content with filters
- `POST /api/content` - Create new content  
- `GET /api/content/[id]` - Get single content
- `PATCH /api/content/[id]` - Update content
- `DELETE /api/content/[id]` - Delete content
- `PUT /api/content` - Update content status

### Public API (published content only)

- `GET /api/public/content` - Fetch published content

## Permission System

### Content Access Rules

- **PUBLISHED**: ทุกคนเข้าถึงได้ (ไม่ต้อง login)
- **DRAFT/REVIEW/ARCHIVED**: Admin เท่านั้น

### User Roles

- `USER`: ผู้ใช้ทั่วไป
- `ADMIN`: ผู้ดูแลระบบ (เข้าถึง content management ได้)
- `SUPER_ADMIN`: ผู้ดูแลระบบระดับสูง

## Workflow States

```
DRAFT → REVIEW → PUBLISHED
  ↓        ↓         ↓
ARCHIVED ← ARCHIVED ← ARCHIVED
```

### State Transitions

1. **DRAFT**: สร้างใหม่หรือแก้ไข content
2. **REVIEW**: ส่งให้ผู้อนุมัติตรวจสอบ
3. **PUBLISHED**: เผยแพร่สู่สาธารณะ
4. **ARCHIVED**: เก็บถาวร (ไม่แสดงผล)

## Components

### HeroSectionEditorDB

ใช้แทน HeroSectionEditor เดิม:

```tsx
<HeroSectionEditorDB
  pageSlug="home"
  title="Hero Section"
  description="Database-integrated hero section editor"
  onDataChange={(data) => console.log(data)}
/>
```

### Features

- **View/Edit Modes**: สลับระหว่างโหมดดูและแก้ไข
- **Language Toggle**: EN/TH
- **Auto-save**: บันทึกลง database
- **Status Management**: จัดการ workflow states
- **Dynamic Fields**: เพิ่ม/ลบ fields แบบ real-time

## Usage Example

```tsx
// ใน admin page
import { HeroSectionEditorDB } from "@/components/admin/hero-section-editor-db"

export default function AdminPage() {
  return (
    <HeroSectionEditorDB
      pageSlug="home"
      onDataChange={(data) => {
        // Handle data changes
        console.log("Content updated:", data)
      }}
    />
  )
}
```

## Content Service

```tsx
import { contentService } from "@/lib/services/content-service"

// Get published hero section
const heroData = await contentService.getHeroSectionData("home")

// Save hero section (both languages)
await contentService.saveHeroSectionData(heroData, "home")

// Update content status
await contentService.updateContentStatus({
  contentId: "content-id",
  status: "PUBLISHED"
})
```

## Security Notes

1. **Authentication**: ใช้ NextAuth.js
2. **Authorization**: ตรวจสอบ role ใน API
3. **Validation**: ใช้ Zod schemas
4. **Input Sanitization**: ทุก input ถูก validate
5. **Database Security**: Prisma ORM ป้องกัน SQL injection

## Development

### Dependencies Required

```json
{
  "@prisma/client": "latest",
  "prisma": "latest", 
  "zod": "latest",
  "sonner": "latest"
}
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Migration Path

1. ✅ เพิ่ม Prisma schema
2. ✅ สร้าง API endpoints
3. ✅ สร้าง UI components
4. ✅ เพิ่ม permission system
5. ⏳ Run migration และ setup data
6. ⏳ Test ระบบ
7. ⏳ Deploy

ระบบพร้อมใช้งาน! 🎉