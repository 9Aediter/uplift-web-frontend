import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Import Checkbox components from OOP system
import { 
  Checkbox,
  CheckboxWithLabel,
  CheckboxGroup,
  CheckboxGroupItem,
  useCheckbox,
  useCheckboxGroup,
  type CheckboxVariant,
  type CheckboxSize,
  type CheckboxState
} from '@/components/input/checkbox'

// Icons
import { 
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  BellIcon,
  MailIcon,
  UserIcon,
  SettingsIcon,
  DatabaseIcon
} from 'lucide-react'

/**
 * Checkbox System - Complete collection of checkbox components using Object-Oriented design
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox System',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive OOP-based checkbox system with multiple variants and sizes. Built on Radix UI primitives with full accessibility support and SSR compatibility.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'accent', 'success', 'warning', 'destructive'],
      description: 'Visual variant of the checkbox'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
      description: 'Size of the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Checked state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
}

export default meta
type Story = StoryObj<typeof Checkbox>

/**
 * Interactive Checkbox Playground - Use controls to test different variants
 */
export const CheckboxPlayground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    checked: false,
    disabled: false
  }
}

/**
 * Basic Checkbox Example
 */
export const BasicCheckbox: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="flex items-center space-x-3">
        <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
        <label className="text-sm font-medium">
          Basic checkbox ({checked ? 'checked' : 'unchecked'})
        </label>
      </div>
    )
  },
}

/**
 * All Checkbox Variants
 */
export const CheckboxVariants: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      default: false,
      secondary: false,
      accent: false,
      success: false,
      warning: false,
      destructive: false
    })

    const toggleState = (variant: keyof typeof states) => {
      setStates(prev => ({ ...prev, [variant]: !prev[variant] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox Variants</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default (Primary)</label>
              <Checkbox 
                variant="default" 
                checked={states.default}
                onCheckedChange={() => toggleState('default')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Secondary</label>
              <Checkbox 
                variant="secondary" 
                checked={states.secondary}
                onCheckedChange={() => toggleState('secondary')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Accent</label>
              <Checkbox 
                variant="accent" 
                checked={states.accent}
                onCheckedChange={() => toggleState('accent')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Success</label>
              <Checkbox 
                variant="success" 
                checked={states.success}
                onCheckedChange={() => toggleState('success')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Warning</label>
              <Checkbox 
                variant="warning" 
                checked={states.warning}
                onCheckedChange={() => toggleState('warning')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Destructive</label>
              <Checkbox 
                variant="destructive" 
                checked={states.destructive}
                onCheckedChange={() => toggleState('destructive')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Checkbox Sizes
 */
export const CheckboxSizes: Story = {
  render: () => {
    const [sizes, setSizes] = React.useState({
      sm: false,
      default: false,
      lg: false
    })

    const toggleSize = (size: keyof typeof sizes) => {
      setSizes(prev => ({ ...prev, [size]: !prev[size] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox Sizes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Small</label>
              <Checkbox 
                size="sm" 
                checked={sizes.sm}
                onCheckedChange={() => toggleSize('sm')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default</label>
              <Checkbox 
                size="default" 
                checked={sizes.default}
                onCheckedChange={() => toggleSize('default')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Large</label>
              <Checkbox 
                size="lg" 
                checked={sizes.lg}
                onCheckedChange={() => toggleSize('lg')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Checkbox States
 */
export const CheckboxStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Checkbox States</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Normal (unchecked)</label>
            <Checkbox defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Checked</label>
            <Checkbox defaultChecked={true} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Indeterminate</label>
            <Checkbox checked="indeterminate" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Disabled (unchecked)</label>
            <Checkbox disabled defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Disabled (checked)</label>
            <Checkbox disabled defaultChecked={true} />
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Checkbox with Labels
 */
export const CheckboxWithLabels: Story = {
  render: () => {
    const [preferences, setPreferences] = React.useState({
      newsletter: true,
      updates: false,
      marketing: false,
      terms: true
    })

    const updatePreference = (key: keyof typeof preferences) => {
      setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Checkbox with Labels & Descriptions</h3>
          <div className="space-y-6">
            <CheckboxWithLabel
              label="Email Newsletter"
              description="Receive weekly updates about new features and content"
              checked={preferences.newsletter}
              onCheckedChange={() => updatePreference('newsletter')}
            />

            <CheckboxWithLabel
              label="Product Updates"
              description="Get notified when we release new versions"
              checked={preferences.updates}
              onCheckedChange={() => updatePreference('updates')}
            />

            <CheckboxWithLabel
              label="Marketing Communications"
              description="Receive promotional content and special offers"
              checked={preferences.marketing}
              onCheckedChange={() => updatePreference('marketing')}
            />

            <CheckboxWithLabel
              label="Terms and Conditions"
              description="I agree to the terms of service and privacy policy"
              checked={preferences.terms}
              onCheckedChange={() => updatePreference('terms')}
              variant="success"
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Checkbox Groups
 */
export const CheckboxGroups: Story = {
  render: () => {
    const techStack = useCheckboxGroup(['react', 'typescript'])
    const permissions = useCheckboxGroup(['read'])

    return (
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Tech Stack Preferences</h3>
          <CheckboxGroup {...techStack.props}>
            <CheckboxGroupItem value="react" label="React" description="JavaScript library for building user interfaces" />
            <CheckboxGroupItem value="vue" label="Vue.js" description="Progressive framework for building UI" />
            <CheckboxGroupItem value="angular" label="Angular" description="Platform for building mobile and desktop apps" />
            <CheckboxGroupItem value="typescript" label="TypeScript" description="Typed superset of JavaScript" />
            <CheckboxGroupItem value="nextjs" label="Next.js" description="React framework for production" />
          </CheckboxGroup>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Selected: {techStack.value.length > 0 ? techStack.value.join(', ') : 'None'}
          </div>
          <button
            onClick={techStack.clear}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">User Permissions</h3>
          <CheckboxGroup {...permissions.props} variant="success">
            <CheckboxGroupItem value="read" label="Read Access" description="View content and data" />
            <CheckboxGroupItem value="write" label="Write Access" description="Create and edit content" />
            <CheckboxGroupItem value="delete" label="Delete Access" description="Remove content and data" />
            <CheckboxGroupItem value="admin" label="Admin Access" description="Full system administration" />
          </CheckboxGroup>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Permissions: {permissions.value.length > 0 ? permissions.value.join(', ') : 'None'}
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Checkbox with Icons
 */
export const CheckboxWithIcons: Story = {
  render: () => {
    const [features, setFeatures] = React.useState({
      security: true,
      favorites: false,
      notifications: true,
      email: false,
      profile: true
    })

    const updateFeature = (key: keyof typeof features) => {
      setFeatures(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Features with Icons</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                variant="success"
                checked={features.security}
                onCheckedChange={() => updateFeature('security')}
              />
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                <label className="text-sm font-medium">Enhanced Security</label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                variant="destructive"
                checked={features.favorites}
                onCheckedChange={() => updateFeature('favorites')}
              />
              <div className="flex items-center gap-2">
                <HeartIcon className="h-4 w-4 text-red-500" />
                <label className="text-sm font-medium">Add to Favorites</label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                variant="warning"
                checked={features.notifications}
                onCheckedChange={() => updateFeature('notifications')}
              />
              <div className="flex items-center gap-2">
                <BellIcon className="h-4 w-4 text-yellow-600" />
                <label className="text-sm font-medium">Push Notifications</label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                variant="accent"
                checked={features.email}
                onCheckedChange={() => updateFeature('email')}
              />
              <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 text-blue-600" />
                <label className="text-sm font-medium">Email Digest</label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                variant="secondary"
                checked={features.profile}
                onCheckedChange={() => updateFeature('profile')}
              />
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-gray-600" />
                <label className="text-sm font-medium">Public Profile</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * useCheckbox Hook Example
 */
export const UseCheckboxHookExample: Story = {
  render: () => {
    const darkMode = useCheckbox(false)
    const autoSave = useCheckbox(true)
    const analytics = useCheckbox(false)

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">useCheckbox Hook Example</h3>
          <div className="space-y-4">
            <CheckboxWithLabel
              {...darkMode.props}
              label="Dark Mode"
              description="Switch to dark theme"
            />

            <CheckboxWithLabel
              {...autoSave.props}
              label="Auto Save"
              description="Automatically save changes"
              variant="success"
            />

            <CheckboxWithLabel
              {...analytics.props}
              label="Analytics"
              description="Help improve the product"
              variant="accent"
            />

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Current Settings:</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Dark Mode: {darkMode.checked ? 'ON' : 'OFF'}</div>
                <div>Auto Save: {autoSave.checked ? 'ON' : 'OFF'}</div>
                <div>Analytics: {analytics.checked ? 'ON' : 'OFF'}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={darkMode.toggle}
                  className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                >
                  Toggle Dark Mode
                </button>
                <button
                  onClick={() => {
                    darkMode.reset()
                    autoSave.reset()
                    analytics.reset()
                  }}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded hover:bg-secondary/90"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Complete Checkbox Showcase
 */
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Checkbox Component System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete collection of checkbox components with multiple variants, sizes, and states built on Radix UI primitives.
        </p>
      </div>

      {/* Variants Grid */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Variants
          </span>
          6 Color Schemes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Default</label>
            <Checkbox variant="default" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Secondary</label>
            <Checkbox variant="secondary" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Accent</label>
            <Checkbox variant="accent" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Success</label>
            <Checkbox variant="success" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Warning</label>
            <Checkbox variant="warning" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Destructive</label>
            <Checkbox variant="destructive" defaultChecked />
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
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Small</label>
            <Checkbox size="sm" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Default</label>
            <Checkbox size="default" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Large</label>
            <Checkbox size="lg" defaultChecked />
          </div>
        </div>
      </div>

      {/* Advanced Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">With Labels</h2>
          <div className="space-y-4">
            <CheckboxWithLabel
              label="Terms & Conditions"
              description="I agree to the terms"
              defaultChecked
            />
            <CheckboxWithLabel
              label="Email Notifications"
              description="Receive updates via email"
              defaultChecked={false}
            />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">With Icons</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox variant="success" defaultChecked />
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm">Security</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox variant="accent" />
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OOP Architecture Summary */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">OOP Checkbox System Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <div className="font-bold text-3xl text-blue-600 mb-2">6</div>
            <div className="text-muted-foreground">Variants</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-green-600 mb-2">3</div>
            <div className="text-muted-foreground">Sizes</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-purple-600 mb-2">Groups</div>
            <div className="text-muted-foreground">Supported</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-cyan-600 mb-2">Hooks</div>
            <div className="text-muted-foreground">useCheckbox</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Built with Radix UI primitives featuring indeterminate state, keyboard navigation, and full accessibility support
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}