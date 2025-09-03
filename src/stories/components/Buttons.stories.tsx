import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

// Import all button components from new OOP system
import { 
  Button,
  CustomButton,
  NavbarButton,
  ConsultButton,
  SpecializedButton,
  type ShadcnButtonVariant,
  type ShadcnButtonSize,
  type CustomButtonVariant,
  type CustomButtonSize,
  type NavbarButtonVariant,
  type SpecializedButtonVariant
} from '@/components/button/button'
import { Toggle } from '@/components/button/toggle'
import { Badge } from '@/components/button/badge'

// Icons
import { 
  RocketIcon, 
  StarIcon, 
  HeartIcon, 
  CheckIcon,
  XIcon,
  DownloadIcon,
  MailIcon,
  PhoneIcon,
  ArrowRightIcon
} from 'lucide-react'

/**
 * Button System OOP - Complete collection of all button variants using Object-Oriented design
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button System OOP',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive OOP-based button system with multiple specialized classes. All components are SSR-compatible and follow modern design patterns. Features 5 distinct button systems with 20+ variants total.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Button visual variant'
    },
    size: {
      control: 'select', 
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Button size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Interactive Shadcn/UI Button - Use controls to test different variants
 */
export const ShadcnButton: Story = {
  args: {
    variant: "default",
    size: "default", 
    children: "Click me!",
    disabled: false
  },
}

/**
 * All Shadcn/UI Button Variants
 */
export const ShadcnButtonVariants: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex items-center flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <HeartIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">
            <RocketIcon className="mr-2 h-4 w-4" />
            Launch
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="secondary">
            <StarIcon className="mr-2 h-4 w-4" />
            Favorite
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Custom Button
 */
export const CustomButtonPlayground: StoryObj<typeof CustomButton> = {
  render: (args) => <CustomButton {...args} />,
  args: {
    variant: "primary",
    size: "md",
    children: "Custom Button",
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'] as CustomButtonVariant[],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    children: {
      control: 'text',
    }
  }
}

/**
 * All Custom Button Variants
 */
export const CustomButtonVariants: StoryObj = {
  render: () => (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton variant="primary">Primary</CustomButton>
          <CustomButton variant="secondary">Secondary</CustomButton>
          <CustomButton variant="outline">Outline</CustomButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex items-center flex-wrap gap-4">
          <CustomButton size="sm" variant="primary">Small</CustomButton>
          <CustomButton size="md" variant="primary">Medium</CustomButton>
          <CustomButton size="lg" variant="primary">Large</CustomButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <CustomButton variant="primary">
            <RocketIcon className="mr-2 h-4 w-4" />
            Launch Project
          </CustomButton>
          <CustomButton variant="secondary">
            <MailIcon className="mr-2 h-4 w-4" />
            Contact Us
          </CustomButton>
          <CustomButton variant="outline">
            Learn More
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </CustomButton>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Navbar Button
 */
export const NavbarButtonPlayground: StoryObj<typeof NavbarButton> = {
  render: (args) => <NavbarButton {...args} />,
  args: {
    variant: "primary",
    children: "Navbar Button",
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'dark', 'gradient', 'ghost'] as NavbarButtonVariant[],
    },
    href: {
      control: 'text',
      description: 'Optional link URL'
    },
    children: {
      control: 'text',
    }
  }
}

/**
 * All Navbar Button Variants
 */
export const NavbarButtonVariants: StoryObj = {
  render: () => (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-4">Navbar Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <NavbarButton variant="primary">Primary</NavbarButton>
          <NavbarButton variant="secondary">Secondary</NavbarButton>
          <NavbarButton variant="dark">Dark</NavbarButton>
          <NavbarButton variant="gradient">Gradient</NavbarButton>
          <NavbarButton variant="ghost">Ghost</NavbarButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">As Links</h3>
        <div className="flex flex-wrap gap-4">
          <NavbarButton href="/consult" variant="primary">
            Consult Now
          </NavbarButton>
          <NavbarButton href="/contact" variant="secondary">
            Contact
          </NavbarButton>
          <NavbarButton href="/about" variant="ghost">
            About Us
          </NavbarButton>
        </div>
      </div>
    </div>
  ),
}

/**
 * Interactive Consult Button (Specialized System)
 */
export const ConsultButtonPlayground: StoryObj<typeof ConsultButton> = {
  render: (args) => <ConsultButton {...args} />,
  args: {
    buttonText: "Get Free Consultation",
    variant: "consult",
    size: "default"
  },
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'Button text content'
    },
    variant: {
      control: 'select',
      options: ['consult', 'cta', 'danger', 'success'] as SpecializedButtonVariant[],
      description: 'Button variant'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
}

/**
 * Interactive Specialized Button System
 */
export const SpecializedButtonPlayground: StoryObj<typeof SpecializedButton> = {
  render: (args) => <SpecializedButton {...args} />,
  args: {
    variant: "consult",
    size: "default",
    children: "Specialized Button"
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['consult', 'cta', 'danger', 'success'] as SpecializedButtonVariant[],
    },
    size: {
      control: 'select', 
      options: ['default', 'sm', 'lg'],
    },
    children: {
      control: 'text',
    }
  }
}

/**
 * Interactive Toggle Component
 */
export const TogglePlayground: StoryObj<typeof Toggle> = {
  render: (args) => {
    const [pressed, setPressed] = React.useState(args.pressed || false)
    return (
      <Toggle 
        {...args} 
        pressed={pressed} 
        onPressedChange={setPressed}
      />
    )
  },
  args: {
    variant: "default",
    size: "default",
    children: "Toggle me",
    pressed: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select', 
      options: ['default', 'sm', 'lg'],
    },
    pressed: {
      control: 'boolean',
      description: 'Toggle state'
    },
    children: {
      control: 'text',
    }
  }
}

/**
 * Interactive Badge Component
 */
export const BadgePlayground: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: "default",
    children: "Badge"
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    children: {
      control: 'text',
    }
  }
}

/**
 * Complete Button System Showcase
 */
export const CompleteShowcase: StoryObj = {
  render: () => (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Uplift Button System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Complete collection of all button components, variants, and states used throughout the Uplift project.
        </p>
      </div>

      {/* Shadcn/UI Buttons */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Shadcn/UI
          </span>
          Main Button System (6 variants)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Custom Buttons */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-cyan-50 to-blue-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Custom
          </span>
          Gradient Button System (3 variants)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <CustomButton variant="primary">Primary Gradient</CustomButton>
          <CustomButton variant="secondary">Secondary Gradient</CustomButton>
          <CustomButton variant="outline">Outline Cyan</CustomButton>
        </div>
      </div>

      {/* Navbar Buttons */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Navbar
          </span>
          Navigation Button System (5 variants)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <NavbarButton variant="primary">Primary</NavbarButton>
          <NavbarButton variant="secondary">Secondary</NavbarButton>
          <NavbarButton variant="dark">Dark</NavbarButton>
          <NavbarButton variant="gradient">Gradient</NavbarButton>
          <NavbarButton variant="ghost">Ghost</NavbarButton>
        </div>
      </div>

      {/* Specialized */}
      <div className="border rounded-lg p-6 bg-gradient-to-br from-gray-50 to-slate-50">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
            Specialized
          </span>
          Context-Specific Buttons (4 variants)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SpecializedButton variant="consult">Consult</SpecializedButton>
          <SpecializedButton variant="cta">Call to Action</SpecializedButton>
          <SpecializedButton variant="danger">Danger</SpecializedButton>
          <SpecializedButton variant="success">Success</SpecializedButton>
        </div>
      </div>

      {/* Toggles and Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
              Toggle
            </span>
            Toggle Components
          </h2>
          <div className="flex flex-wrap gap-3">
            <Toggle>Default</Toggle>
            <Toggle variant="outline">Outline</Toggle>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
              Badge
            </span>
            Badge Components
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </div>

      {/* OOP Architecture Summary */}
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-4">OOP Button System Architecture</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
          <div>
            <div className="font-bold text-3xl text-blue-600 mb-2">20+</div>
            <div className="text-muted-foreground">Unique Variants</div>
          </div>
          <div>
            <div className="font-bold text-3xl text-cyan-600 mb-2">5</div>
            <div className="text-muted-foreground">Button Classes</div>
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
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          <div className="p-3 border rounded-lg bg-blue-50">
            <div className="font-semibold text-blue-800 mb-1">ShadcnButtonSystem</div>
            <div className="text-blue-600">6 variants • Main UI</div>
          </div>
          <div className="p-3 border rounded-lg bg-cyan-50">
            <div className="font-semibold text-cyan-800 mb-1">CustomButtonSystem</div>
            <div className="text-cyan-600">3 variants • Gradients</div>
          </div>
          <div className="p-3 border rounded-lg bg-purple-50">
            <div className="font-semibold text-purple-800 mb-1">NavbarButtonSystem</div>
            <div className="text-purple-600">5 variants • Navigation</div>
          </div>
          <div className="p-3 border rounded-lg bg-gray-50">
            <div className="font-semibold text-gray-800 mb-1">SpecializedButtonSystem</div>
            <div className="text-gray-600">4 variants • Context</div>
          </div>
          <div className="p-3 border rounded-lg bg-green-50">
            <div className="font-semibold text-green-800 mb-1">ButtonFactory</div>
            <div className="text-green-600">Dynamic • Factory</div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}