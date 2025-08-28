# Widget Data Flow Examples

## 1. Admin Side - Live Preview dengan Zustand

```typescript
// Store (Admin)
interface AdminPageStore {
  sections: SectionData[]
  addSection: (widgetType: string) => void
  updateSection: (id: string, data: WidgetData) => void
  savePage: () => Promise<void>
}

// Usage in Admin
const AdminPageEditor = () => {
  const { sections, updateSection } = useAdminPageStore()
  
  return (
    <div>
      {/* Live Preview */}
      <PageRenderer 
        sections={sections} 
        context={{ isPreview: true }} 
      />
      
      {/* Config Panel */}
      <SectionManager sections={sections} />
    </div>
  )
}
```

## 2. Public Side - SSR dengan Pre-fetched Data

```typescript
// Public Page (SSR)
export default async function DynamicPage({ params }: { params: { id: string } }) {
  // Pre-fetch data from API/Mock
  const pageData = await getPageData(params.id)
  
  return (
    <main>
      {/* Static Content */}
      <SomeStaticComponent />
      
      {/* Dynamic Widget Content */}
      <PageRenderer 
        sections={pageData.sections}
        context={{ 
          isPreview: false,
          locale: 'th',
          theme: 'light'
        }}
      />
    </main>
  )
}

async function getPageData(pageId: string): Promise<PageData> {
  // อาจจะมาจาก API หรือ Mock Data
  const response = await fetch(`/api/pages/${pageId}`)
  return response.json()
}
```

## 3. Widget Component รับ Data

```typescript
// Widget Component
export const SingleCardComponent: React.FC<SingleCardComponentProps> = ({
  title,        // ← มาจาก SectionData.data.title
  subtitle,     // ← มาจาก SectionData.data.subtitle
  context       // ← มาจาก PageRenderer
}) => {
  const isPreview = context?.isPreview || false
  
  // ถ้า isPreview = true → Admin กำลัง preview
  // ถ้า isPreview = false → Public page (SSR)
  
  return (
    <section>
      {/* Render based on data */}
    </section>
  )
}
```

## 4. API Endpoints Structure

```typescript
// API Routes
GET  /api/pages/:id          // ดึงข้อมูลหน้า (สำหรับ Public)
POST /api/pages/:id/sections // เพิ่ม section ใหม่
PUT  /api/pages/:id/sections/:sectionId // อัพเดท section
DEL  /api/pages/:id/sections/:sectionId // ลบ section

// Response Example
{
  "id": "home-page",
  "title": "Home Page",
  "sections": [
    {
      "id": "hero-section",
      "widgetType": "single-card",
      "order": 1,
      "isActive": true,
      "data": {
        "title": "Welcome to Uplift",
        "subtitle": "Build Amazing Software",
        // ... widget-specific data
      }
    }
  ]
}
```

## 5. Widget Registration Flow

```typescript
// 1. Widget Registry (Boot time)
initializeWidgets() // Register all widgets

// 2. Admin ดึง available widgets
const availableWidgets = getAvailableWidgets()

// 3. User เลือก widget type
const widgetConfig = registry.get('single-card').getConfig()

// 4. แสดง config form
<WidgetConfigModal config={widgetConfig} />

// 5. Save data เป็น SectionData
const sectionData: SectionData = {
  id: generateId(),
  widgetType: 'single-card',
  data: formData,  // จาก config form
  order: 1,
  isActive: true
}
```