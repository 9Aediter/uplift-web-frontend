import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { getWidgetRegistry } from '@/lib/widgets'
import { getHeroRegistry } from '@/lib/widgets/hero/HeroRegistry'

// Widget Registry Display Component
function WidgetRegistryDisplay() {
  const widgetRegistry = getWidgetRegistry()
  const heroRegistry = getHeroRegistry()
  
  const allWidgets = widgetRegistry.getAll()
  const allHeroes = heroRegistry.getAll()
  
  const categories = widgetRegistry.getStats().byCategory
  const widgetsByCategory = Object.keys(categories).map(category => ({
    category,
    count: categories[category],
    widgets: widgetRegistry.getByCategory(category as any)
  }))

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Widget Registry Overview</h1>
        <p className="text-gray-600 mb-6">
          Complete overview of all widgets available in the OOP Widget System.
          This includes both regular widgets and hero widgets with their configurations and capabilities.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900">Total Widgets</h3>
          <p className="text-2xl font-bold text-blue-600">{allWidgets.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900">Hero Widgets</h3>
          <p className="text-2xl font-bold text-green-600">{allHeroes.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900">Categories</h3>
          <p className="text-2xl font-bold text-purple-600">{Object.keys(categories).length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-orange-900">SSR Compatible</h3>
          <p className="text-2xl font-bold text-orange-600">100%</p>
        </div>
      </div>

      {/* Hero Widgets */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Hero Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allHeroes.map((hero) => (
            <div key={hero.heroType} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{hero.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {hero.heroType}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{hero.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Animated:</span>
                  <span className={`text-xs px-2 py-1 rounded ${hero.isAnimated ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {hero.isAnimated ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {hero.supportedFeatures.slice(0, 3).map((feature) => (
                      <span key={feature} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {feature}
                      </span>
                    ))}
                    {hero.supportedFeatures.length > 3 && (
                      <span className="text-xs text-gray-500">+{hero.supportedFeatures.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Widgets by Category */}
      {widgetsByCategory.map(({ category, count, widgets }) => (
        <div key={category} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold capitalize">{category} Widgets</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {count} widgets
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{widget.name}</h3>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                    {widget.id}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{widget.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Version:</span>
                    <span className="text-xs text-gray-700">{widget.version}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {widget.getTags().slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {tag}
                        </span>
                      ))}
                      {widget.getTags().length > 3 && (
                        <span className="text-xs text-gray-500">+{widget.getTags().length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* API Information */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Widget System Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Object-Oriented Programming (OOP) architecture</li>
              <li>Server-Side Rendering (SSR) support</li>
              <li>Dynamic configuration through admin panel</li>
              <li>Type-safe with TypeScript</li>
              <li>Drag & drop reordering with @dnd-kit</li>
              <li>Real-time preview and validation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Core Classes</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><code className="text-sm bg-gray-200 px-1 rounded">BaseWidget</code> - Abstract base class</li>
              <li><code className="text-sm bg-gray-200 px-1 rounded">BaseHeroWidget</code> - Hero widget base</li>
              <li><code className="text-sm bg-gray-200 px-1 rounded">WidgetRegistry</code> - Widget management</li>
              <li><code className="text-sm bg-gray-200 px-1 rounded">WidgetFactory</code> - Widget instantiation</li>
              <li><code className="text-sm bg-gray-200 px-1 rounded">SSRWidgetRenderer</code> - Server rendering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof WidgetRegistryDisplay> = {
  title: 'System/Widget Registry',
  component: WidgetRegistryDisplay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the OOP Widget System including all available widgets, categories, and system architecture.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof WidgetRegistryDisplay>

export const Registry: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full widget registry with statistics, categories, and detailed information about each widget in the system.',
      },
    },
  },
}