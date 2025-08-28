import React, { Suspense } from 'react'
import { SectionData, RenderContext } from '../core/types'
import { getWidgetRegistry } from '../index'

interface SSRWidgetRendererProps {
  section: SectionData
  context?: RenderContext
  className?: string
}

interface SSRPageRendererProps {
  sections: SectionData[]
  context?: RenderContext
  className?: string
}

interface SuspenseWrapperProps {
  children: React.ReactNode
  fallback: React.ReactNode
  sectionId?: string
}

/**
 * Suspense wrapper for SSR widgets to enable fast loading
 */
function SuspenseWrapper({ children, fallback, sectionId }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <div data-section-id={sectionId}>
        {children}
      </div>
    </Suspense>
  )
}

/**
 * Server-Side Rendering Widget Renderer
 * PRODUCTION ONLY - All widgets MUST support SSR
 * Fast loading with Suspense support
 */
export function SSRWidgetRenderer({ 
  section, 
  context, 
  className 
}: SSRWidgetRendererProps) {
  try {
    const registry = getWidgetRegistry()
    const widget = registry.get(section.widgetType)
    
    if (!widget) {
      console.warn(`Widget not found: ${section.widgetType}`)
      return (
        <div className={`p-8 text-center text-gray-500 ${className || ''}`}>
          <p>Widget "{section.widgetType}" not found</p>
        </div>
      )
    }

    // Validate data
    const validation = widget.validateData(section.data)
    if (!validation.isValid) {
      console.warn(`Widget data validation failed for '${section.widgetType}':`, validation.errors)
    }

    // MANDATORY: Use renderSSR for production (no React hooks allowed)
    const WidgetComponent = widget.renderSSR(section.data, context)
    
    if (!WidgetComponent) {
      return (
        <div className={`p-8 text-center text-gray-500 ${className || ''}`}>
          <p>Failed to render widget: {section.widgetType}</p>
        </div>
      )
    }

    return (
      <div className={className} data-widget-type={section.widgetType} data-section-id={section.id}>
        <WidgetComponent />
      </div>
    )
  } catch (error) {
    console.error(`Error rendering widget ${section.widgetType} in SSR:`, error)
    return (
      <div className={`p-8 text-center text-red-500 ${className || ''}`}>
        <p>Error rendering widget: {section.widgetType}</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-2 text-xs text-left bg-red-50 p-2 rounded">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        )}
      </div>
    )
  }
}

/**
 * Server-Side Page Renderer for multiple widget sections
 * Fast loading with individual Suspense boundaries for each widget
 */
export function SSRPageRenderer({ 
  sections, 
  context, 
  className 
}: SSRPageRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">No content configured for this page.</p>
      </div>
    )
  }

  // Filter active sections and sort by order
  const activeSections = sections
    .filter(section => section.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className={className}>
      {activeSections.map((section, index) => (
        <SuspenseWrapper
          key={section.id || index}
          sectionId={section.id}
          fallback={<SSRSkeletonRenderer widgetType={section.widgetType} />}
        >
          <SSRWidgetRenderer
            section={section}
            context={context}
          />
        </SuspenseWrapper>
      ))}
    </div>
  )
}

/**
 * SSR Skeleton renderer for loading states
 * MANDATORY: Use renderSkeletonSSR (no React hooks allowed)
 */
export function SSRSkeletonRenderer({ widgetType }: { widgetType: string }) {
  try {
    const registry = getWidgetRegistry()
    const widget = registry.get(widgetType)
    
    if (!widget) {
      return <DefaultSSRSkeleton />
    }

    // MANDATORY: Use renderSkeletonSSR for production (no React hooks allowed)
    const SkeletonComponent = widget.renderSkeletonSSR()
    
    return SkeletonComponent ? <SkeletonComponent /> : <DefaultSSRSkeleton />
  } catch (error) {
    console.warn(`Error rendering SSR skeleton for ${widgetType}:`, error)
    return <DefaultSSRSkeleton />
  }
}

/**
 * Default skeleton component for SSR
 */
function DefaultSSRSkeleton() {
  return (
    <div className="animate-pulse p-8">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  )
}