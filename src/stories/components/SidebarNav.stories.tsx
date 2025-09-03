import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { NavMain } from '@/components/nav/nav-main'
import { NavUser } from '@/components/nav/nav-user'
import { 
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from '@/components/ui/sidebar'
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconAnalyze,
  IconFiles,
  IconCalendar,
  IconMail,
  IconShoppingCart
} from '@tabler/icons-react'

/**
 * Sidebar Navigation Components - Main navigation and user components for admin layouts
 */
const meta: Meta<typeof NavMain> = {
  title: 'Components/SidebarNav',
  component: NavMain,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sidebar navigation components designed for admin dashboards and internal applications.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NavMain>

const mockNavItems = [
  { title: "Dashboard", url: "/admin", icon: IconDashboard },
  { title: "Users", url: "/admin/users", icon: IconUsers },
  { title: "Analytics", url: "/admin/analytics", icon: IconAnalyze },
  { title: "Files", url: "/admin/files", icon: IconFiles },
  { title: "Calendar", url: "/admin/calendar", icon: IconCalendar },
  { title: "Mail", url: "/admin/mail", icon: IconMail },
  { title: "Orders", url: "/admin/orders", icon: IconShoppingCart },
  { title: "Settings", url: "/admin/settings", icon: IconSettings },
]

const mockUser = {
  name: "John Doe",
  email: "john.doe@uplift.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
}

/**
 * NavMain Component Only
 */
export const MainNavigation: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-96 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent>
            <NavMain items={mockNavItems} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * NavUser Component Only
 */
export const UserNavigation: StoryObj<typeof NavUser> = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-32 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent className="justify-end">
            <NavUser user={mockUser} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * Complete Sidebar Layout
 */
export const CompleteSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-[600px] w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <NavMain items={mockNavItems} />
              </div>
              <div className="mt-auto">
                <NavUser user={mockUser} />
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * Minimal Navigation Items
 */
export const MinimalNavigation: Story = {
  args: {
    items: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Settings", url: "/settings", icon: IconSettings },
    ]
  },
  render: (args) => (
    <SidebarProvider>
      <div className="flex h-64 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent>
            <NavMain {...args} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * Navigation without Icons
 */
export const NavigationNoIcons: Story = {
  args: {
    items: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Users", url: "/users" },
      { title: "Analytics", url: "/analytics" },
      { title: "Settings", url: "/settings" },
    ]
  },
  render: (args) => (
    <SidebarProvider>
      <div className="flex h-80 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent>
            <NavMain {...args} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * User without Avatar
 */
export const UserNoAvatar: StoryObj<typeof NavUser> = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-32 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent className="justify-end">
            <NavUser user={{
              name: "Jane Smith",
              email: "jane.smith@uplift.com",
              avatar: ""
            }} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * Long User Name and Email
 */
export const LongUserDetails: StoryObj<typeof NavUser> = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-32 w-80 border rounded-lg">
        <Sidebar>
          <SidebarContent className="justify-end">
            <NavUser user={{
              name: "Alexander Christopher Johnson",
              email: "alexander.christopher.johnson@verylongdomain.com",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }} />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  ),
}

/**
 * Interactive Sidebar Demo
 */
export const InteractiveSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Admin Panel</h2>
                <p className="text-sm text-muted-foreground">Uplift Management</p>
              </div>
              <div className="flex-1 p-2">
                <NavMain items={mockNavItems} />
              </div>
              <div className="mt-auto p-2 border-t">
                <NavUser user={mockUser} />
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8 bg-muted/50">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Sidebar Navigation Demo</h1>
            <p className="text-muted-foreground mb-6">
              This demonstrates how the sidebar navigation components work together in a complete layout.
            </p>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">NavMain Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Quick Create button</li>
                  <li>• Active state highlighting</li>
                  <li>• Icon support</li>
                  <li>• Tooltip integration</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">NavUser Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User dropdown menu</li>
                  <li>• Avatar with fallback</li>
                  <li>• Account management links</li>
                  <li>• Mobile responsive</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  ),
}