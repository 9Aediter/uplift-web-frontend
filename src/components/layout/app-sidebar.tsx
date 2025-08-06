"use client"

import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconShield,
  IconSettings,
  IconWorld,
  IconPackage,
  IconHeadset,
  IconNews,
  IconHelp,
  IconInnerShadowTop,
  IconPhoto,
  IconBrandReact,
} from "@tabler/icons-react"

import { NavContent } from "@/components/nav/nav-content"
import { NavMain } from "@/components/nav/nav-main"
import { NavSecondary } from "@/components/nav/nav-secondary"
import { NavUser } from "@/components/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin User",
    email: "admin@uplift.com",
    avatar: "/profile.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: IconUsers,
    },
    {
      title: "Roles",
      url: "/admin/roles",
      icon: IconShield,
    },
    {
      title: "Images",
      url: "/admin/images",
      icon: IconPhoto,
    },
    {
      title: "Technologies",
      url: "/admin/technologies",
      icon: IconBrandReact,
    },
  ],
  navContent: [
    {
      title: "Website",
      icon: IconWorld,
      url: "/admin/website",
      items: [
        {
          title: "Website",
          url: "/admin/website",
        },
        {
          title: "Home Page",
          url: "/admin/website/home",
        },
        {
          title: "About Page",
          url: "/admin/website/about",
        },
        {
          title: "Contact Page",
          url: "/admin/website/contact",
        },
      ],
    },
    {
      title: "Products",
      icon: IconPackage,
      url: "/admin/products",
      items: [
        {
          title: "Innovation",
          url: "/admin/products/innovation",
        },
        {
          title: "All Products",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Services",
      icon: IconHeadset,
      url: "/admin/services",
      items: [
        {
          title: "All Services",
          url: "/admin/services",
        },
        {
          title: "Service Categories",
          url: "/admin/services/categories",
        },
      ],
    },
    {
      title: "Blogs",
      icon: IconNews,
      url: "/admin/blogs",
      items: [
        {
          title: "All Posts",
          url: "/admin/blogs",
        },
        {
          title: "Categories",
          url: "/admin/blogs/categories",
        },
        {
          title: "Tags",
          url: "/admin/blogs/tags",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">UPLIFTTECH</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavContent items={data.navContent} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
