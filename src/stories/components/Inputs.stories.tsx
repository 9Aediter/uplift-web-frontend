import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Import all input components from new OOP system
import { 
  Input,
  DefaultInput,
  FloatingInput,
  PasswordInput,
  DefaultPasswordInput,
  FloatingPasswordInput,
  Textarea,
  DefaultTextarea,
  FloatingTextarea,
  type DefaultInputVariant,
  type DefaultInputSize,
  type DefaultInputState,
  type FloatingInputVariant,
  type FloatingInputSize,
  type FloatingInputState,
  type PasswordInputVariant,
  type PasswordInputSize
} from '@/components/input/input'

// Icons
import { 
  UserIcon, 
  MailIcon, 
  SearchIcon,
  LockIcon,
  MessageSquareIcon,
  EditIcon
} from 'lucide-react'

/**
 * Input System OOP - Complete collection of all input variants using Object-Oriented design
 */
const meta: Meta<typeof Input> = {
  title: 'Components/Input System OOP',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive OOP-based input system with multiple specialized variants. Features Default, Floating, and Password input types with extensive customization options. All components are SSR-compatible.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost', 'underlined'],
      description: 'Input visual variant'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
      description: 'Input size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Interactive Default Input - Use controls to test different variants
 */
export const DefaultInputPlayground: Story = {
  args: {
    variant: "default",
    size: "default", 
    placeholder: "Enter your text...",
    disabled: false
  },
}

/**
 * All Default Input Variants
 */
export const DefaultInputVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Input Variants</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <DefaultInput placeholder="Default input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <DefaultInput variant="filled" placeholder="Filled input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ghost</label>
            <DefaultInput variant="ghost" placeholder="Ghost input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Underlined</label>
            <DefaultInput variant="underlined" placeholder="Underlined input" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <DefaultInput size="sm" placeholder="Small input" />
          <DefaultInput size="default" placeholder="Default input" />
          <DefaultInput size="lg" placeholder="Large input" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="space-y-4">
          <DefaultInput placeholder="Normal state" />
          <DefaultInput error="This field has an error" placeholder="Error state" />
          <DefaultInput disabled placeholder="Disabled state" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <DefaultInput className="pl-10" placeholder="Username" />
          </div>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <DefaultInput className="pl-10" placeholder="Email address" />
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <DefaultInput className="pl-10" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Floating Input
 */
export const FloatingInputPlayground: StoryObj<typeof FloatingInput> = {
  render: (args) => <FloatingInput {...args} />,
  args: {
    label: "Floating Label",
    variant: "default",
    size: "default",
    required: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Floating label text'
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'modal', 'minimal'] as FloatingInputVariant[],
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator'
    },
    placeholder: {
      control: 'text',
    }
  }
}

/**
 * All Floating Input Variants
 */
export const FloatingInputVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Floating Input Variants</h3>
        <div className="space-y-4">
          <FloatingInput label="Default Theme" variant="default" />
          <FloatingInput label="Light Theme" variant="light" />
          <FloatingInput label="Modal Theme" variant="modal" />
          <FloatingInput label="Minimal Theme" variant="minimal" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Sizes</h3>
        <div className="space-y-4">
          <FloatingInput label="Small" size="sm" />
          <FloatingInput label="Default" size="default" />
          <FloatingInput label="Large" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">States</h3>
        <div className="space-y-4">
          <FloatingInput label="Normal" />
          <FloatingInput label="Required Field" required />
          <FloatingInput label="Error State" error="This field has an error" />
          <FloatingInput label="With Value" defaultValue="Pre-filled value" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Password Input
 */
export const PasswordInputPlayground: StoryObj<typeof PasswordInput> = {
  render: (args) => <PasswordInput {...args} />,
  args: {
    variant: "default",
    size: "default",
    placeholder: "Enter password"
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'floating'] as PasswordInputVariant[],
      description: 'Password input variant'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
    },
    label: {
      control: 'text',
      description: 'Label (for floating variant)'
    },
    placeholder: {
      control: 'text',
    }
  }
}

/**
 * All Password Input Variants
 */
export const PasswordInputVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Password Input Variants</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Password</label>
            <DefaultPasswordInput placeholder="Enter password" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Floating Password</h3>
        <div className="space-y-4">
          <FloatingPasswordInput label="Password" />
          <FloatingPasswordInput label="Confirm Password" required />
          <FloatingPasswordInput label="Current Password" size="sm" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <DefaultPasswordInput size="sm" placeholder="Small password" />
          <DefaultPasswordInput size="default" placeholder="Default password" />
          <DefaultPasswordInput size="lg" placeholder="Large password" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Textarea
 */
export const TextareaPlayground: StoryObj<typeof Textarea> = {
  render: (args) => <Textarea {...args} />,
  args: {
    variant: "default",
    size: "default",
    placeholder: "Enter your message..."
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'ghost', 'underlined'] as DefaultInputVariant[],
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg'],
    },
    placeholder: {
      control: 'text',
    },
    rows: {
      control: 'number',
    }
  }
}

/**
 * All Textarea Variants
 */
export const TextareaVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Textarea Variants</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <DefaultTextarea placeholder="Default textarea" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <DefaultTextarea variant="filled" placeholder="Filled textarea" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ghost</label>
            <DefaultTextarea variant="ghost" placeholder="Ghost textarea" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Floating Textarea</h3>
        <div className="space-y-4">
          <FloatingTextarea label="Message" />
          <FloatingTextarea label="Description" required />
          <FloatingTextarea label="Notes" variant="minimal" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="space-y-4">
          <DefaultTextarea size="sm" placeholder="Small textarea" />
          <DefaultTextarea size="default" placeholder="Default textarea" />
          <DefaultTextarea size="lg" placeholder="Large textarea" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Complete Input System Showcase
 */
export const CompleteShowcase: StoryObj = {
  render: () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Uplift Input System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete collection of all input components, variants, and states used throughout the Uplift project.
        </p>
      </div>

      {/* Default Inputs */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Default
          </span>
          Shadcn/UI Input System (4 variants)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default</label>
            <DefaultInput placeholder="Default" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <DefaultInput variant="filled" placeholder="Filled" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ghost</label>
            <DefaultInput variant="ghost" placeholder="Ghost" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Underlined</label>
            <DefaultInput variant="underlined" placeholder="Underlined" />
          </div>
        </div>
      </div>

      {/* Floating Inputs */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
          <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Floating
          </span>
          Animated Label System (4 variants)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FloatingInput label="Default" variant="default" />
          <FloatingInput label="Light" variant="light" />
          <FloatingInput label="Modal" variant="modal" />
          <FloatingInput label="Minimal" variant="minimal" />
        </div>
      </div>

      {/* Password Inputs */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Password
          </span>
          Secure Input System (2 variants)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Password</label>
            <DefaultPasswordInput placeholder="Enter password" />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <FloatingPasswordInput label="Floating Password" />
          </div>
        </div>
      </div>

      {/* Textareas */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Textarea
          </span>
          Multi-line Input System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Textarea</label>
            <DefaultTextarea placeholder="Enter your message..." />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <FloatingTextarea label="Floating Textarea" variant="default" />
          </div>
        </div>
      </div>

      {/* OOP Architecture Summary */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">OOP Input System Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <div className="font-bold text-3xl text-blue-600 mb-2">15+</div>
            <div className="text-muted-foreground">Input Variants</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-cyan-600 mb-2">3</div>
            <div className="text-muted-foreground">Input Systems</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-purple-600 mb-2">100%</div>
            <div className="text-muted-foreground">SSR Compatible</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-green-600 mb-2">OOP</div>
            <div className="text-muted-foreground">Design Pattern</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 border rounded-lg bg-blue-50">
            <div className="font-semibold text-blue-800 mb-1">DefaultInputSystem</div>
            <div className="text-blue-600">4 variants • Shadcn/UI</div>
          </div>
          <div className="p-3 border rounded-lg bg-cyan-50">
            <div className="font-semibold text-cyan-800 mb-1">FloatingInputSystem</div>
            <div className="text-cyan-600">4 variants • Animated</div>
          </div>
          <div className="p-3 border rounded-lg bg-purple-50">
            <div className="font-semibold text-purple-800 mb-1">PasswordInputSystem</div>
            <div className="text-purple-600">2 variants • Secure</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}