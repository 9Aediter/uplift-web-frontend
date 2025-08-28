"use client"

import React, { Suspense } from 'react'
import { WidgetFactory } from '../core/WidgetFactory'
import { SectionData, RenderContext } from '../core/types'
import { getWidgetRegistry } from '../index'

interface WidgetRendererProps {
  section: SectionData
  context?: RenderContext
  className?: string
}

interface SectionSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  sectionId?: string
}

/**
 * Suspense wrapper for individual sections
 * Provides isolated loading states for each widget
 */
export const SectionSuspense: React.FC<SectionSuspenseProps> = ({
  children,
  fallback,
  sectionId
}) => {
  return (
    <Suspense fallback={fallback}>
      <div data-section-id={sectionId}>
        {children}
      </div>
    </Suspense>
  )
}

/**
 * Renders a single widget section with Suspense boundary
 */
export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  section,
  context,
  className
}) => {
  // Ensure widgets are initialized
  getWidgetRegistry()

  const renderWidget = () => {
    try {
      const WidgetComponent = WidgetFactory.renderSection(section, context)
      
      if (!WidgetComponent) {
        console.warn(`Widget not found: ${section.widgetType}`)
        return (
          <div className="p-8 text-center text-gray-500">
            <p>Widget "{section.widgetType}" not found</p>
          </div>
        )
      }

      return <WidgetComponent />
    } catch (error) {
      console.error(`Error rendering widget ${section.widgetType}:`, error)
      return (
        <div className="p-8 text-center text-red-500">
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

  const renderSkeleton = () => {
    try {
      const SkeletonComponent = WidgetFactory.renderSkeleton(section.widgetType)
      return SkeletonComponent ? <SkeletonComponent /> : (
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
    } catch (error) {
      console.warn(`Error rendering skeleton for ${section.widgetType}:`, error)
      return (
        <div className="animate-pulse p-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      )
    }
  }

  return (
    <SectionSuspense
      sectionId={section.id}
      fallback={renderSkeleton()}
    >
      <div className={className} data-widget-type={section.widgetType}>
        {renderWidget()}
      </div>
    </SectionSuspense>
  )
}

/**
 * Renders multiple widget sections as a complete page
 */
interface PageRendererProps {
  sections: SectionData[]
  context?: RenderContext
  className?: string
}

export const PageRenderer: React.FC<PageRendererProps> = ({
  sections,
  context,
  className
}) => {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">No content configured for this page.</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {sections.map((section, index) => (
        <WidgetRenderer
          key={section.id || index}
          section={section}
          context={context}
        />
      ))}
    </div>
  )
}

/**
 * Hook for getting widget metadata
 */
export function useWidgetMetadata(widgetType: string) {
  const registry = getWidgetRegistry()
  const widget = registry.get(widgetType)
  
  return {
    widget,
    config: widget?.getConfig(),
    isValid: !!widget
  }
}

/**
 * Utility to get all available widgets for admin interface
 */
export function getAvailableWidgets() {
  const registry = getWidgetRegistry()
  return registry.getAll()
}

/**
 * Utility to get widgets by category
 */
export function getWidgetsByCategory(category: string) {
  const registry = getWidgetRegistry()
  return registry.getByCategory(category as any)
}