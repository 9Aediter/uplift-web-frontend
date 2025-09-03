import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Import Select components from OOP system
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
  type SelectVariant,
  type SelectSize,
  type SelectState
} from '@/components/input/select'

// Icons
import { 
  MapPinIcon,
  GlobeIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  StarIcon
} from 'lucide-react'

/**
 * Select System - Complete collection of select components using Object-Oriented design
 */
const meta: Meta<typeof SelectTrigger> = {
  title: 'Components/Select System',
  component: SelectTrigger,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive OOP-based select system with multiple variants and sizes. Built on Radix UI primitives with full accessibility support and SSR compatibility.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost', 'outline'],
      description: 'Visual variant of the select trigger'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
      description: 'Size of the select trigger'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
}

export default meta
type Story = StoryObj<typeof SelectTrigger>

/**
 * Interactive Select Playground - Use controls to test different variants
 */
export const SelectPlayground: Story = {
  render: (args) => (
    <div className="w-64">
      <Select>
        <SelectTrigger {...args}>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  args: {
    variant: 'default',
    size: 'default',
    disabled: false
  }
}

/**
 * Basic Select Example
 */
export const BasicSelect: Story = {
  render: () => (
    <div className="w-64">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

/**
 * All Select Variants
 */
export const SelectVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Variants</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <Select>
              <SelectTrigger variant="default">
                <SelectValue placeholder="Default select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <Select>
              <SelectTrigger variant="filled">
                <SelectValue placeholder="Filled select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ghost</label>
            <Select>
              <SelectTrigger variant="ghost">
                <SelectValue placeholder="Ghost select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Outline</label>
            <Select>
              <SelectTrigger variant="outline">
                <SelectValue placeholder="Outline select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Select Sizes
 */
export const SelectSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Sizes</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Small</label>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Small select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <Select>
              <SelectTrigger size="default">
                <SelectValue placeholder="Default select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Large</label>
            <Select>
              <SelectTrigger size="lg">
                <SelectValue placeholder="Large select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Select States
 */
export const SelectStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select States</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Normal</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Normal state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Error</label>
            <Select>
              <SelectTrigger error="This field has an error">
                <SelectValue placeholder="Error state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-destructive mt-1">Please select a valid option</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Disabled</label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Disabled state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Select with Icons
 */
export const SelectWithIcons: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select with Icons</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thailand">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Thailand</span>
                  </div>
                </SelectItem>
                <SelectItem value="singapore">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Singapore</span>
                  </div>
                </SelectItem>
                <SelectItem value="malaysia">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>Malaysia</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">User Role</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Administrator</span>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Editor</span>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Viewer</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Select with Groups
 */
export const SelectWithGroups: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select with Groups</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Frontend</SelectLabel>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="svelte">Svelte</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Backend</SelectLabel>
              <SelectItem value="nodejs">Node.js</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Database</SelectLabel>
              <SelectItem value="postgresql">PostgreSQL</SelectItem>
              <SelectItem value="mysql">MySQL</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="redis">Redis</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

/**
 * Interactive Select with State Management
 */
export const InteractiveSelect: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('')

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Interactive Select</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Selected value: <code className="bg-muted px-2 py-1 rounded">{value || 'none'}</code>
          </p>
          
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your favorite..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">
                  <div className="flex items-center gap-2">
                    <span>🍎</span>
                    <span>Apple</span>
                  </div>
                </SelectItem>
                <SelectItem value="banana">
                  <div className="flex items-center gap-2">
                    <span>🍌</span>
                    <span>Banana</span>
                  </div>
                </SelectItem>
                <SelectItem value="orange">
                  <div className="flex items-center gap-2">
                    <span>🍊</span>
                    <span>Orange</span>
                  </div>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">
                  <div className="flex items-center gap-2">
                    <span>🥕</span>
                    <span>Carrot</span>
                  </div>
                </SelectItem>
                <SelectItem value="broccoli">
                  <div className="flex items-center gap-2">
                    <span>🥦</span>
                    <span>Broccoli</span>
                  </div>
                </SelectItem>
                <SelectItem value="tomato">
                  <div className="flex items-center gap-2">
                    <span>🍅</span>
                    <span>Tomato</span>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {value && (
            <button
              onClick={() => setValue('')}
              className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>
    )
  },
}

/**
 * Complete Select Showcase
 */
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Select Component System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete collection of select components with multiple variants, sizes, and states built on Radix UI primitives.
        </p>
      </div>

      {/* Variants Grid */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Variants
          </span>
          4 Visual Styles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <Select>
              <SelectTrigger variant="default">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <Select>
              <SelectTrigger variant="filled">
                <SelectValue placeholder="Filled" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ghost</label>
            <Select>
              <SelectTrigger variant="ghost">
                <SelectValue placeholder="Ghost" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Outline</label>
            <Select>
              <SelectTrigger variant="outline">
                <SelectValue placeholder="Outline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Sizes Grid */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Sizes
          </span>
          3 Size Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-2">Small</label>
            <Select>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Small" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <Select>
              <SelectTrigger size="default">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Large</label>
            <Select>
              <SelectTrigger size="lg">
                <SelectValue placeholder="Large" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* OOP Architecture Summary */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">OOP Select System Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <div className="font-bold text-3xl text-blue-600 mb-2">4</div>
            <div className="text-muted-foreground">Variants</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-green-600 mb-2">3</div>
            <div className="text-muted-foreground">Sizes</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-purple-600 mb-2">100%</div>
            <div className="text-muted-foreground">Accessible</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-cyan-600 mb-2">SSR</div>
            <div className="text-muted-foreground">Compatible</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Built on Radix UI primitives with full keyboard navigation, screen reader support, and type safety
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}