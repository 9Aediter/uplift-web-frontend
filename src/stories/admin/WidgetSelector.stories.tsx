import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { WidgetSelector } from '@/components/admin/website/widget-selector'

// Widget Selector Demo Component
function WidgetSelectorDemo() {
  const [selectedWidget, setSelectedWidget] = useState<string>('')
  const [showSelector, setShowSelector] = useState(true)

  const handleSelectWidget = (widgetType: string) => {
    setSelectedWidget(widgetType)
    setShowSelector(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Widget Selector Demo</h1>
          <p className="text-gray-600 mb-4">
            This is the same widget selector used in the admin panel for choosing widgets to add to pages.
            Click on any widget to select it and see the result.
          </p>
          
          {selectedWidget && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-green-800">Selected Widget:</h3>
              <p className="text-green-700">{selectedWidget}</p>
              <button
                onClick={() => {
                  setSelectedWidget('')
                  setShowSelector(true)
                }}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Choose Another Widget
              </button>
            </div>
          )}
        </div>

        {showSelector ? (
          <WidgetSelector onSelectWidget={handleSelectWidget} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Widget Selected!</h2>
            <p className="text-gray-600 mb-4">
              You selected: <span className="font-semibold">{selectedWidget}</span>
            </p>
            <p className="text-sm text-gray-500">
              In the actual admin panel, this would open the configuration modal 
              for the selected widget where you can customize its settings.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const meta: Meta<typeof WidgetSelectorDemo> = {
  title: 'Admin/Widget Selector',
  component: WidgetSelectorDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive widget selector component used in the admin panel. Displays all available widgets in categories with search functionality.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof WidgetSelectorDemo>

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive widget selector demo. Try searching for widgets, browsing categories, and selecting different widget types.',
      },
    },
  },
}

// Standalone Widget Selector (for testing in isolation)
function StandaloneWidgetSelector({ onSelectWidget }: { onSelectWidget?: (widget: string) => void }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <WidgetSelector 
          onSelectWidget={onSelectWidget || ((widget) => console.log('Selected:', widget))} 
        />
      </div>
    </div>
  )
}

export const Standalone: Story = {
  render: () => <StandaloneWidgetSelector />,
  parameters: {
    docs: {
      description: {
        story: 'Standalone widget selector for testing the component in isolation.',
      },
    },
  },
}