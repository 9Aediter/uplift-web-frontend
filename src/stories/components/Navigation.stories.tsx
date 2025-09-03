import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Navigation from '@/components/nav/navigation'
import DesktopNav from '@/components/nav/resnav'

/**
 * Navigation component - Modern, responsive navigation bar with logo, menu items, and user actions.
 * Features sticky positioning, mobile responsiveness, and proper design principles.
 */
const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive navigation component with modern design patterns, mobile menu, language switching, and user authentication support.',
      },
    },
  },
  argTypes: {
    user: { 
      control: 'object',
      description: 'User object with id, name, email, avatar, and role properties'
    },
    isAuthenticated: { 
      control: 'boolean',
      description: 'Whether the user is authenticated'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes'
    },
  },
}

export default meta
type Story = StoryObj<typeof Navigation>

/**
 * Default navigation for unauthenticated users
 */
export const Default: Story = {
  args: {
    isAuthenticated: false,
    user: null,
  },
}

/**
 * Navigation with authenticated user
 */
export const Authenticated: Story = {
  args: {
    isAuthenticated: true,
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'USER'
    },
  },
}

/**
 * Navigation with admin user
 */
export const AdminUser: Story = {
  args: {
    isAuthenticated: true,
    user: {
      id: '2',
      name: 'Admin User',
      email: 'admin@uplift.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'ADMIN'
    },
  },
}

/**
 * Navigation with user without avatar
 */
export const UserWithoutAvatar: Story = {
  args: {
    isAuthenticated: true,
    user: {
      id: '3',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'USER'
    },
  },
}

/**
 * Navigation with only email (no name)
 */
export const UserWithEmailOnly: Story = {
  args: {
    isAuthenticated: true,
    user: {
      id: '4',
      email: 'user@example.com',
      role: 'USER'
    },
  },
}

// ResNav (Resizable/Responsive Navigation) Component Stories
/**
 * ResNav component - Alternative navigation with resizable/responsive design using UI components
 */
const resNavMeta: Meta<typeof DesktopNav> = {
  title: 'Components/ResNav',
  component: DesktopNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Alternative responsive navigation component using resizable navbar UI components with sheet-based mobile menu and user authentication.',
      },
    },
  },
}

export const ResNavDefault: StoryObj<typeof DesktopNav> = {
  ...resNavMeta,
  name: 'Default ResNav',
  args: {},
}

/**
 * ResNav in mobile view (force mobile styling)
 */
export const ResNavMobile: StoryObj<typeof DesktopNav> = {
  ...resNavMeta,
  name: 'ResNav Mobile',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {},
}

/**
 * ResNav in tablet view
 */
export const ResNavTablet: StoryObj<typeof DesktopNav> = {
  ...resNavMeta,
  name: 'ResNav Tablet',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {},
}