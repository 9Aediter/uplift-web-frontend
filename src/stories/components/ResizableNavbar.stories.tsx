import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Navbar,
  NavBody,
  NavItems,
  NavLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle
} from '@/components/nav'

/**
 * ResizableNavbar - Individual resizable navbar components for building navigation
 */
const meta: Meta<typeof Navbar> = {
  title: 'Components/ResizableNavbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Collection of resizable navbar components that respond to scroll events and viewport changes.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Navbar>

const mockNavItems = [
  { name: "Story", link: "/story" },
  { name: "Service", link: "/service" },
  { name: "Solution", link: "/solutions" },
  { name: "Innovation", link: "/innovation" },
]

/**
 * Complete Desktop Navbar
 */
export const DesktopNavbar: Story = {
  render: () => (
    <Navbar>
      <NavBody>
        <NavLogo />
        <NavItems items={mockNavItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="ghost">Language</NavbarButton>
          <NavbarButton href="/consult" variant="primary">
            Consult
          </NavbarButton>
        </div>
      </NavBody>
    </Navbar>
  ),
}

/**
 * Mobile Navigation
 */
export const MobileNavbar: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)
    
    return (
      <MobileNav>
        <MobileNavHeader>
          <NavLogo />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex flex-col space-y-4 w-full">
            {mockNavItems.map((item, idx) => (
              <a key={idx} href={item.link} className="text-lg font-medium">
                {item.name}
              </a>
            ))}
            <NavbarButton href="/consult" variant="primary" className="w-full">
              Consult
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

/**
 * NavItems Component Only
 */
export const NavItemsOnly: StoryObj<typeof NavItems> = {
  render: () => (
    <div className="relative w-full h-20 bg-gray-50 flex items-center justify-center">
      <NavItems items={mockNavItems} />
    </div>
  ),
}

/**
 * NavLogo Component Only
 */
export const LogoOnly: StoryObj<typeof NavLogo> = {
  render: () => (
    <div className="p-4 bg-gray-50">
      <NavLogo />
    </div>
  ),
}

/**
 * NavbarButton Variants
 */
export const NavbarButtonVariants: StoryObj<typeof NavbarButton> = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 bg-gray-50">
      <NavbarButton variant="primary">Primary</NavbarButton>
      <NavbarButton variant="secondary">Secondary</NavbarButton>
      <NavbarButton variant="dark">Dark</NavbarButton>
      <NavbarButton variant="gradient">Gradient</NavbarButton>
      <NavbarButton variant="ghost">Ghost</NavbarButton>
      <NavbarButton href="/consult" variant="primary">Link NavbarButton</NavbarButton>
    </div>
  ),
}

/**
 * Scrolled State Simulation
 */
export const ScrolledState: Story = {
  render: () => (
    <div className="min-h-screen">
      <Navbar>
        <NavBody visible={true}>
          <NavLogo />
          <NavItems items={mockNavItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="ghost">Language</NavbarButton>
            <NavbarButton href="/consult" variant="primary">
              Consult
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
      <div className="pt-32 px-8">
        <h2 className="text-2xl font-bold mb-4">Scrolled State</h2>
        <p>This shows how the navbar appears when scrolled (with backdrop blur and shadow).</p>
      </div>
    </div>
  ),
}

/**
 * Interactive Scroll Demo
 */
export const InteractiveScrollDemo: Story = {
  render: () => (
    <div className="min-h-[200vh]">
      <Navbar>
        <NavBody>
          <NavLogo />
          <NavItems items={mockNavItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="ghost">Language</NavbarButton>
            <NavbarButton href="/consult" variant="primary">
              Consult
            </NavbarButton>
          </div>
        </NavBody>
      </Navbar>
      <div className="pt-32 px-8 space-y-8">
        <h2 className="text-3xl font-bold">Scroll to see navbar animation</h2>
        <p className="text-lg">The navbar will transform as you scroll down...</p>
        <div className="h-96 bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <p className="text-2xl font-semibold">Keep scrolling...</p>
        </div>
        <div className="h-96 bg-gradient-to-b from-green-100 to-yellow-100 rounded-lg flex items-center justify-center">
          <p className="text-2xl font-semibold">Notice the navbar changes</p>
        </div>
        <div className="h-96 bg-gradient-to-b from-pink-100 to-red-100 rounded-lg flex items-center justify-center">
          <p className="text-2xl font-semibold">End of demo</p>
        </div>
      </div>
    </div>
  ),
}