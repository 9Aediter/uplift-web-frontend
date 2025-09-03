import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Import Switch components from OOP system
import { 
  Switch,
  SwitchWithLabel,
  useSwitch,
  type SwitchVariant,
  type SwitchSize,
  type SwitchState
} from '@/components/input/switch'

// Icons
import { 
  BellIcon,
  MoonIcon,
  SunIcon,
  WifiIcon,
  VolumeXIcon,
  Volume2Icon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-react'

/**
 * Switch System - Complete collection of switch components using Object-Oriented design
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch System',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive OOP-based switch system with multiple variants and sizes. Built on Radix UI primitives with full accessibility support and SSR compatibility.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'destructive'],
      description: 'Visual variant of the switch'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
      description: 'Size of the switch'
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
type Story = StoryObj<typeof Switch>

/**
 * Interactive Switch Playground - Use controls to test different variants
 */
export const SwitchPlayground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    checked: false,
    disabled: false
  }
}

/**
 * Basic Switch Example
 */
export const BasicSwitch: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="flex items-center space-x-3">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <label className="text-sm font-medium">
          Basic switch ({checked ? 'ON' : 'OFF'})
        </label>
      </div>
    )
  },
}

/**
 * All Switch Variants
 */
export const SwitchVariants: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      default: false,
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
          <h3 className="text-lg font-semibold mb-4">Switch Variants</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default (Primary)</label>
              <Switch 
                variant="default" 
                checked={states.default}
                onCheckedChange={() => toggleState('default')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Accent</label>
              <Switch 
                variant="accent" 
                checked={states.accent}
                onCheckedChange={() => toggleState('accent')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Success</label>
              <Switch 
                variant="success" 
                checked={states.success}
                onCheckedChange={() => toggleState('success')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Warning</label>
              <Switch 
                variant="warning" 
                checked={states.warning}
                onCheckedChange={() => toggleState('warning')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Destructive</label>
              <Switch 
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
 * Switch Sizes
 */
export const SwitchSizes: Story = {
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
          <h3 className="text-lg font-semibold mb-4">Switch Sizes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Small</label>
              <Switch 
                size="sm" 
                checked={sizes.sm}
                onCheckedChange={() => toggleSize('sm')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default</label>
              <Switch 
                size="default" 
                checked={sizes.default}
                onCheckedChange={() => toggleSize('default')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Large</label>
              <Switch 
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
 * Switch States
 */
export const SwitchStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Switch States</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Normal</label>
            <Switch defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Checked</label>
            <Switch defaultChecked={true} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Disabled (Off)</label>
            <Switch disabled defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">Disabled (On)</label>
            <Switch disabled defaultChecked={true} />
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Switch with Labels
 */
export const SwitchWithLabels: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      soundEnabled: false
    })

    const updateSetting = (key: keyof typeof settings) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Switch with Labels & Descriptions</h3>
          <div className="space-y-6">
            <SwitchWithLabel
              label="Push Notifications"
              description="Receive notifications about important updates"
              checked={settings.notifications}
              onCheckedChange={() => updateSetting('notifications')}
            />

            <SwitchWithLabel
              label="Dark Mode"
              description="Switch to dark theme for better low-light viewing"
              checked={settings.darkMode}
              onCheckedChange={() => updateSetting('darkMode')}
            />

            <SwitchWithLabel
              label="Auto Save"
              description="Automatically save your work every few minutes"
              checked={settings.autoSave}
              onCheckedChange={() => updateSetting('autoSave')}
            />

            <SwitchWithLabel
              label="Sound Effects"
              description="Play sounds for interactions and notifications"
              checked={settings.soundEnabled}
              onCheckedChange={() => updateSetting('soundEnabled')}
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * Switch with Icons
 */
export const SwitchWithIcons: Story = {
  render: () => {
    const [iconSettings, setIconSettings] = React.useState({
      notifications: true,
      darkMode: false,
      wifi: true,
      sound: false,
      visibility: true
    })

    const updateIconSetting = (key: keyof typeof iconSettings) => {
      setIconSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">Switch with Icons</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellIcon className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">Notifications</label>
              </div>
              <Switch 
                checked={iconSettings.notifications}
                onCheckedChange={() => updateIconSetting('notifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {iconSettings.darkMode ? (
                  <MoonIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <SunIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <label className="text-sm font-medium">Dark Mode</label>
              </div>
              <Switch 
                checked={iconSettings.darkMode}
                onCheckedChange={() => updateIconSetting('darkMode')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WifiIcon className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium">WiFi</label>
              </div>
              <Switch 
                variant="success"
                checked={iconSettings.wifi}
                onCheckedChange={() => updateIconSetting('wifi')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {iconSettings.sound ? (
                  <Volume2Icon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VolumeXIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <label className="text-sm font-medium">Sound</label>
              </div>
              <Switch 
                checked={iconSettings.sound}
                onCheckedChange={() => updateIconSetting('sound')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {iconSettings.visibility ? (
                  <EyeIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <label className="text-sm font-medium">Visible to others</label>
              </div>
              <Switch 
                variant="warning"
                checked={iconSettings.visibility}
                onCheckedChange={() => updateIconSetting('visibility')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

/**
 * useSwitch Hook Example
 */
export const UseSwitchHookExample: Story = {
  render: () => {
    const privacySwitch = useSwitch(false)
    const marketingSwitch = useSwitch(true)
    const analyticsSwitch = useSwitch(false)

    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-lg font-semibold mb-4">useSwitch Hook Example</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Privacy Mode</label>
              <Switch {...privacySwitch.props} />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Marketing Emails</label>
              <Switch {...marketingSwitch.props} variant="accent" />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Analytics</label>
              <Switch {...analyticsSwitch.props} variant="success" />
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Current Settings:</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Privacy Mode: {privacySwitch.checked ? 'ON' : 'OFF'}</div>
                <div>Marketing: {marketingSwitch.checked ? 'ON' : 'OFF'}</div>
                <div>Analytics: {analyticsSwitch.checked ? 'ON' : 'OFF'}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={privacySwitch.toggle}
                  className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
                >
                  Toggle Privacy
                </button>
                <button
                  onClick={() => {
                    privacySwitch.reset()
                    marketingSwitch.reset()
                    analyticsSwitch.reset()
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
 * Complete Switch Showcase
 */
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Switch Component System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete collection of switch components with multiple variants, sizes, and states built on Radix UI primitives.
        </p>
      </div>

      {/* Variants Grid */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Variants
          </span>
          5 Color Schemes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Default</label>
            <Switch variant="default" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Accent</label>
            <Switch variant="accent" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Success</label>
            <Switch variant="success" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Warning</label>
            <Switch variant="warning" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Destructive</label>
            <Switch variant="destructive" defaultChecked />
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
            <Switch size="sm" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Default</label>
            <Switch size="default" defaultChecked />
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-3">Large</label>
            <Switch size="lg" defaultChecked />
          </div>
        </div>
      </div>

      {/* Advanced Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">With Labels</h2>
          <div className="space-y-4">
            <SwitchWithLabel
              label="Email Notifications"
              description="Receive email updates"
              defaultChecked
            />
            <SwitchWithLabel
              label="Two-Factor Authentication"
              description="Add extra security to your account"
              defaultChecked={false}
            />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">With Icons</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellIcon className="h-4 w-4" />
                <span className="text-sm">Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MoonIcon className="h-4 w-4" />
                <span className="text-sm">Dark Mode</span>
              </div>
              <Switch variant="accent" />
            </div>
          </div>
        </div>
      </div>

      {/* OOP Architecture Summary */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">OOP Switch System Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <div className="font-bold text-3xl text-blue-600 mb-2">5</div>
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
            <div className="font-bold text-3xl text-cyan-600 mb-2">Hook</div>
            <div className="text-muted-foreground">useSwitch</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Built with Radix UI primitives featuring keyboard navigation, focus management, and screen reader support
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}