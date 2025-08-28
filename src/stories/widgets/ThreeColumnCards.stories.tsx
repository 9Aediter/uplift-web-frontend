import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ThreeColumnCardsComponent } from '@/lib/widgets/cards/ThreeColumnCards/ThreeColumnCards.component'

/**
 * ThreeColumnCards widget - Display content in 3 equal columns with icons.
 * Perfect for services, features, or benefits showcase.
 */
const meta: Meta<typeof ThreeColumnCardsComponent> = {
  title: 'Widgets/ThreeColumnCards',
  component: ThreeColumnCardsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Three column layout with icons, perfect for services, features, or benefits. Includes hover animations and color-coded cards.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    backgroundColor: {
      control: 'select',
      options: ['bg-black', 'bg-white', 'bg-gray-50', 'bg-blue-50']
    },
    showAnimations: { control: 'boolean' },
    items: { control: 'object' },
    context: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof ThreeColumnCardsComponent>

/**
 * Default services showcase
 */
export const Default: Story = {
  args: {
    title: 'Featured Solutions',
    subtitle: 'Explore our most popular business transformation packages',
    backgroundColor: 'bg-black',
    items: [
      {
        title: 'Complete ERP Suite',
        description: 'End-to-end business management system with inventory, accounting, CRM, and reporting',
        icon: 'database',
        color: 'blue',
        link: '/service/erp-suite'
      },
      {
        title: 'Smart POS System',
        description: 'Modern point-of-sale solution with inventory management and analytics',
        icon: 'shopping-cart',
        color: 'green',
        link: '/service/pos-system'
      },
      {
        title: 'Custom Web Platform',
        description: 'Tailored web applications designed for your specific business needs',
        icon: 'globe',
        color: 'purple',
        link: '/service/web-platform'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Technology features variant
 */
export const TechFeatures: Story = {
  args: {
    title: 'Advanced Technology Stack',
    subtitle: 'Built with modern tools and frameworks',
    backgroundColor: 'bg-gray-50',
    items: [
      {
        title: 'Cloud Native',
        description: 'Deployed on AWS with auto-scaling and high availability architecture',
        icon: 'cloud',
        color: 'blue',
        link: '/tech/cloud'
      },
      {
        title: 'AI Integration',
        description: 'Machine learning and AI capabilities built into every solution',
        icon: 'zap',
        color: 'purple',
        link: '/tech/ai'
      },
      {
        title: 'Security First',
        description: 'Enterprise-grade security with encryption and compliance standards',
        icon: 'shield',
        color: 'green',
        link: '/tech/security'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Process steps variant
 */
export const ProcessSteps: Story = {
  args: {
    title: 'Our Development Process',
    subtitle: 'From discovery to delivery in structured phases',
    backgroundColor: 'bg-white',
    items: [
      {
        title: 'Discovery & Planning',
        description: 'We analyze your requirements and create a detailed project roadmap',
        icon: 'search',
        color: 'blue',
        link: '/process/discovery'
      },
      {
        title: 'Design & Prototype',
        description: 'User experience design and interactive prototypes for validation',
        icon: 'palette',
        color: 'purple',
        link: '/process/design'
      },
      {
        title: 'Development & Testing',
        description: 'Agile development with continuous testing and quality assurance',
        icon: 'code',
        color: 'green',
        link: '/process/development'
      }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * No animations variant
 */
export const NoAnimations: Story = {
  args: {
    title: 'Performance Optimized',
    subtitle: 'Static version without animations',
    backgroundColor: 'bg-blue-50',
    items: [
      {
        title: 'Fast Loading',
        description: 'Optimized for performance with minimal animation overhead',
        icon: 'zap',
        color: 'blue'
      },
      {
        title: 'Static Content',
        description: 'No motion effects for better accessibility and performance',
        icon: 'monitor',
        color: 'green'
      },
      {
        title: 'Clean Design',
        description: 'Focus on content without distracting animations',
        icon: 'target',
        color: 'purple'
      }
    ],
    showAnimations: false,
    context: { isPreview: true }
  },
}