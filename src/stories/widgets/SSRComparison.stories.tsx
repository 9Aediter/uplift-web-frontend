import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { getWidgetRegistry } from '@/lib/widgets'
import { WidgetFactory } from '@/lib/widgets/core/WidgetFactory'
import { SSRWidgetRenderer } from '@/lib/widgets/rendering/SSRWidgetRenderer'

// SSR vs Client Comparison Component
function SSRComparisonDisplay({ widgetType }: { widgetType: string }) {
  const sampleData = {
    title: 'SSR vs Client Rendering',
    subtitle: 'Performance Comparison',
    description: 'Compare the rendering performance and behavior between SSR and client-side rendering.',
    primaryButtonText: 'SSR Button',
    primaryButtonLink: '#ssr',
    secondaryButtonText: 'Client Button', 
    secondaryButtonLink: '#client',
    backgroundColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
    trustIndicators: [
      { indicator: 'FAST' },
      { indicator: 'SECURE' },
      { indicator: 'SEO-FRIENDLY' }
    ],
    showAnimations: true
  }

  const sectionData = {
    id: 'comparison-section',
    type: 'widget' as const,
    widgetType,
    title: 'Comparison Section',
    order: 1,
    isActive: true,
    data: sampleData
  }

  return (
    <div className="space-y-8">
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">SSR vs Client-Side Rendering</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This demo shows the difference between Server-Side Rendering (SSR) and Client-Side Rendering 
          for the same widget. SSR renders on the server for faster initial load and better SEO, 
          while client-side rendering provides interactive features and animations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SSR Version */}
        <div className="border-2 border-green-200 rounded-lg overflow-hidden">
          <div className="bg-green-50 p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-green-800">
                🚀 SSR Version
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Fast Initial Load
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  SEO Friendly
                </span>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-2">
              Rendered on server, no React hooks, optimized for performance and SEO
            </p>
          </div>
          <div className="relative">
            <SSRWidgetRenderer 
              section={sectionData}
              context={{ isPreview: false, locale: 'en', theme: 'light' }}
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
              SSR
            </div>
          </div>
        </div>

        {/* Client-Side Version */}
        <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-800">
                ⚡ Client-Side Version
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Interactive
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  Animated
                </span>
              </div>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              Rendered in browser, supports React hooks, animations, and interactions
            </p>
          </div>
          <div className="relative">
            {React.createElement(() => {
              const WidgetComponent = WidgetFactory.render(widgetType, sampleData, {
                isPreview: false, 
                locale: 'en', 
                theme: 'light'
              })
              return WidgetComponent ? <WidgetComponent /> : <div>Failed to render</div>
            })}
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
              CLIENT
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">SSR Benefits</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Faster First Contentful Paint</li>
            <li>✓ Better SEO crawling</li>
            <li>✓ Works without JavaScript</li>
            <li>✓ Lower client-side bundle</li>
            <li>✓ Better Core Web Vitals</li>
          </ul>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Client-Side Benefits</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Rich interactions</li>
            <li>✓ Smooth animations</li>
            <li>✓ React hooks support</li>
            <li>✓ Dynamic state management</li>
            <li>✓ Real-time updates</li>
          </ul>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Our Approach</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🔄 SSR for production pages</li>
            <li>🎨 Client-side for admin preview</li>
            <li>📱 Responsive design both ways</li>
            <li>🚀 Performance optimized</li>
            <li>♿ Accessibility compliant</li>
          </ul>
        </div>
      </div>

      {/* Code Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">SSR Implementation</h3>
          <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`// SSR Widget Renderer
export function SSRWidgetRenderer({ section }) {
  const widget = registry.get(section.widgetType)
  
  // Use renderSSR method (no React hooks)
  const Component = widget.renderSSR(section.data)
  
  return <Component />
}`}
          </pre>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Client-Side Implementation</h3>
          <pre className="text-xs bg-gray-800 text-blue-400 p-3 rounded overflow-x-auto">
{`// Client Widget Renderer  
export function WidgetRenderer({ section }) {
  const widget = registry.get(section.widgetType)
  
  // Use render method (supports React hooks)
  const Component = widget.render(section.data)
  
  return <Component />
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof SSRComparisonDisplay> = {
  title: 'System/SSR vs Client-Side',
  component: SSRComparisonDisplay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Side-by-side comparison of SSR and Client-Side rendering for the same widget, showing performance differences and use cases.',
      },
    },
  },
  argTypes: {
    widgetType: {
      control: 'select',
      options: ['single-card', 'three-column-cards', 'four-column-cards'],
      description: 'Widget type to compare',
    },
  },
}

export default meta
type Story = StoryObj<typeof SSRComparisonDisplay>

export const SingleCardComparison: Story = {
  args: {
    widgetType: 'single-card',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compare SSR vs Client-Side rendering for the SingleCard widget.',
      },
    },
  },
}

export const ThreeColumnComparison: Story = {
  args: {
    widgetType: 'three-column-cards',
  },
}

export const FourColumnComparison: Story = {
  args: {
    widgetType: 'four-column-cards',
  },
}