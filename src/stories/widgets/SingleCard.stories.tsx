import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SingleCardComponent } from '@/lib/widgets/cards/SingleCard/SingleCard.component'

/**
 * SingleCard widget - Large hero card with call-to-action buttons and animated background for landing pages.
 * Perfect for hero sections, product announcements, and call-to-action areas.
 */
const meta: Meta<typeof SingleCardComponent> = {
  title: 'Widgets/SingleCard',
  component: SingleCardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Large hero card with call-to-action buttons and animated background. Includes trust indicators, gradient text effects, and responsive design.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    primaryButtonText: { control: 'text' },
    primaryButtonLink: { control: 'text' },
    secondaryButtonText: { control: 'text' },
    secondaryButtonLink: { control: 'text' },
    backgroundColor: {
      control: 'select',
      options: ['bg-black', 'bg-blue-600', 'bg-purple-600', 'bg-gray-900']
    },
    showAnimations: { control: 'boolean' },
    trustIndicators: { control: 'object' },
    context: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof SingleCardComponent>

/**
 * Default SingleCard with business transformation theme
 */
export const Default: Story = {
  args: {
    title: 'Ready to Transform Your Business?',
    subtitle: 'Start Your Journey Today',
    description: 'Join hundreds of businesses that have revolutionized their operations with our custom software solutions.',
    primaryButtonText: 'Get Free Consultation',
    primaryButtonLink: '/consultation',
    secondaryButtonText: 'View Case Studies',
    secondaryButtonLink: '/case-studies',
    backgroundColor: 'bg-black',
    trustIndicators: [
      { indicator: 'FINTECH' },
      { indicator: 'HEALTHCARE' },
      { indicator: 'RETAIL' },
      { indicator: 'MANUFACTURING' }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Product launch variant with different styling
 */
export const ProductLaunch: Story = {
  args: {
    title: 'Introducing Our Latest Innovation',
    subtitle: 'Built for the Future',
    description: 'Experience the next generation of business automation with our cutting-edge platform designed for modern enterprises.',
    primaryButtonText: 'Start Free Trial',
    primaryButtonLink: '/trial',
    secondaryButtonText: 'Watch Demo',
    secondaryButtonLink: '/demo',
    backgroundColor: 'bg-blue-600',
    trustIndicators: [
      { indicator: 'ENTERPRISE' },
      { indicator: 'SAAS' },
      { indicator: 'AI-POWERED' }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * Service offering variant
 */
export const ServiceOffering: Story = {
  args: {
    title: 'Custom Development Services',
    subtitle: 'From Concept to Launch',
    description: 'We build tailored software solutions that scale with your business. Our expert team delivers results that exceed expectations.',
    primaryButtonText: 'Get Quote',
    primaryButtonLink: '/quote',
    secondaryButtonText: 'Portfolio',
    secondaryButtonLink: '/portfolio',
    backgroundColor: 'bg-purple-600',
    trustIndicators: [
      { indicator: 'NODEJS' },
      { indicator: 'REACT' },
      { indicator: 'AWS' },
      { indicator: 'TYPESCRIPT' }
    ],
    showAnimations: true,
    context: { isPreview: true }
  },
}

/**
 * No animations variant for performance testing
 */
export const NoAnimations: Story = {
  args: {
    title: 'Performance Optimized',
    subtitle: 'Lightning Fast',
    description: 'This variant has animations disabled for better performance on lower-end devices or when animations are not needed.',
    primaryButtonText: 'Learn More',
    primaryButtonLink: '/learn',
    backgroundColor: 'bg-gray-900',
    trustIndicators: [
      { indicator: 'OPTIMIZED' },
      { indicator: 'FAST' }
    ],
    showAnimations: false,
    context: { isPreview: true }
  },
}

/**
 * Minimal variant with no trust indicators
 */
export const Minimal: Story = {
  args: {
    title: 'Simple and Clean',
    subtitle: 'Less is More',
    description: 'Sometimes simplicity is the best approach. This variant focuses on the essential message without additional elements.',
    primaryButtonText: 'Get Started',
    primaryButtonLink: '/start',
    backgroundColor: 'bg-black',
    trustIndicators: [],
    showAnimations: true,
    context: { isPreview: true }
  },
}