import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SingleCardComponent } from '@/lib/widgets/cards/SingleCard/SingleCard.component'
import { SingleCardSkeleton } from '@/lib/widgets/cards/SingleCard/SingleCard.skeleton'

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
 * Skeleton loading state (SSR-safe for Suspense fallback)
 */
export const Skeleton: StoryObj<typeof SingleCardSkeleton> = {
  render: () => <SingleCardSkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'SSR-safe skeleton component for use with Suspense fallback. Shows the loading state while content is being fetched.',
      },
    },
  },
}