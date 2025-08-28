import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FourColumnCardsComponent } from '@/lib/widgets/cards/FourColumnCards/FourColumnCards.component'

/**
 * FourColumnCards widget - Showcase content in 4 columns.
 * Ideal for benefits, team features, or statistics display.
 */
const meta: Meta<typeof FourColumnCardsComponent> = {
  title: 'Widgets/FourColumnCards',
  component: FourColumnCardsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Four column grid layout with icons and descriptions. Perfect for showcasing benefits, features, or team highlights with responsive design.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    backgroundColor: {
      control: 'select',
      options: ['bg-white', 'bg-gray-50', 'bg-blue-50', 'bg-black']
    },
    showAnimations: { control: 'boolean' },
    items: { control: 'object' },
    context: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof FourColumnCardsComponent>

/**
 * Default company benefits showcase
 */
export const Default: Story = {
  args: {
    title: 'Why Choose Uplift Technology?',
    subtitle: 'We understand the challenges facing modern businesses',
    backgroundColor: 'bg-gray-50',
    items: [
      {
        title: 'Expert Team',
        description: 'Seasoned developers with 10+ years of experience in enterprise solutions',
        icon: 'award',
        color: 'blue'
      },
      {
        title: 'Proven Results',
        description: 'Successfully delivered 100+ projects across various industries',
        icon: 'rocket',
        color: 'green'
      },
      {
        title: 'Latest Technology',
        description: 'Using cutting-edge tech stack for scalable and secure solutions',
        icon: 'zap',
        color: 'purple'
      },
      {
        title: '24/7 Support',
        description: 'Round-the-clock technical support and maintenance services',
        icon: 'shield',
        color: 'orange'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Statistics showcase variant
 */
export const Statistics: Story = {
  args: {
    title: 'Our Track Record',
    subtitle: 'Numbers that speak for our excellence',
    backgroundColor: 'bg-white',
    items: [
      {
        title: '500+ Projects',
        description: 'Successfully completed projects across diverse industries and scales',
        icon: 'bar-chart-3',
        color: 'blue'
      },
      {
        title: '98% Satisfaction',
        description: 'Client satisfaction rate based on post-project surveys and reviews',
        icon: 'heart',
        color: 'red'
      },
      {
        title: '50+ Clients',
        description: 'Long-term partnerships with businesses of all sizes globally',
        icon: 'users',
        color: 'green'
      },
      {
        title: '5+ Years',
        description: 'Years of experience in delivering cutting-edge technology solutions',
        icon: 'clock',
        color: 'purple'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Feature highlights variant
 */
export const Features: Story = {
  args: {
    title: 'Platform Capabilities',
    subtitle: 'Everything you need in one powerful solution',
    backgroundColor: 'bg-blue-50',
    items: [
      {
        title: 'Real-time Analytics',
        description: 'Comprehensive dashboards with live data visualization and insights',
        icon: 'trending-up',
        color: 'blue'
      },
      {
        title: 'Smart Automation',
        description: 'AI-powered workflow automation to streamline business processes',
        icon: 'zap',
        color: 'yellow'
      },
      {
        title: 'Secure Cloud Storage',
        description: 'Enterprise-grade security with encrypted data storage and backup',
        icon: 'shield',
        color: 'green'
      },
      {
        title: 'Mobile Responsive',
        description: 'Fully responsive design that works perfectly on all devices',
        icon: 'smartphone',
        color: 'purple'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    title: 'Modern Solutions',
    subtitle: 'Built for the digital age',
    backgroundColor: 'bg-black',
    items: [
      {
        title: 'Cloud First',
        description: 'Native cloud architecture for maximum scalability and reliability',
        icon: 'cloud',
        color: 'blue'
      },
      {
        title: 'API Driven',
        description: 'RESTful APIs and GraphQL for seamless integrations',
        icon: 'code',
        color: 'green'
      },
      {
        title: 'Microservices',
        description: 'Modular architecture for better maintainability and updates',
        icon: 'layers',
        color: 'purple'
      },
      {
        title: 'DevOps Ready',
        description: 'CI/CD pipelines and infrastructure as code implementation',
        icon: 'settings',
        color: 'orange'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}