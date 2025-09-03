import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HeroAIComponent } from '@/lib/widgets/hero/HeroAI/HeroAI.component'
import { HeroAISSR } from '@/lib/widgets/hero/HeroAI/HeroAI.ssr'
import { HeroAISkeleton } from '@/lib/widgets/hero/HeroAI/HeroAI.skeleton'

/**
 * HeroAI widget - Full-screen AI-themed hero section with customizable background effects.
 * Available in both Client-side (with 3D Globe and Particles) and SSR-safe versions.
 */
const meta: Meta<typeof HeroAIComponent> = {
  title: 'Widgets/HeroAI',
  component: HeroAIComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'AI-themed hero section with both client-side (interactive) and server-side (SSR-safe) versions. Client version includes 3D Globe and Particles effects.',
      },
    },
  },
  argTypes: {
    badge: { control: 'text' },
    title: { control: 'text' },
    titleGradient: { control: 'text' },
    subtitle: { control: 'text' },
    launchButton: { control: 'text' },
    exploreButton: { control: 'text' },
    backgroundImageUrl: { control: 'text' },
    overlayOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    textPosition: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    theme: {
      control: 'select', 
      options: ['light', 'dark']
    },
    backgroundEffect: {
      control: 'select',
      options: ['particles', 'static', 'none']
    },
    showGlobe: {
      control: 'boolean',
      description: 'Show/hide the globe element'
    },
    context: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof HeroAIComponent>

/**
 * Client-side version with 3D Globe and Particles effects (interactive)
 */
export const Client: Story = {
  args: {
    badge: 'AI-Powered Solutions',
    title: 'The Future of Technology is',
    titleGradient: 'Here & Now With AI',
    subtitle: 'Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation.',
    launchButton: 'Launch Project',
    exploreButton: 'Explore Innovation',
    overlayOpacity: 0.5,
    textPosition: 'center',
    backgroundEffect: 'particles',
    showGlobe: true,
    context: { isPreview: true }
  },
}

/**
 * Server-side safe version with static effects (production)
 */
export const SSR: StoryObj<typeof HeroAISSR> = {
  args: {
    backgroundEffect: "particles"
  },

  render: () => (
    <HeroAISSR
      badge="AI-Powered Solutions"
      title="The Future of Technology is"
      titleGradient="Here & Now With AI"
      subtitle="Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation."
      launchButton="Launch Project"
      exploreButton="Explore Innovation"
      backgroundEffect="static"
      showGlobe={true}
      context={{ isPreview: true }}
    />
  ),

  parameters: {
    docs: {
      description: {
        story: 'Server-side safe version used in production. Uses static background effects instead of interactive particles and simplified globe representation.',
      },
    },
  }
}

/**
 * Skeleton loading state (SSR-safe for Suspense fallback)
 */
export const Skeleton: StoryObj<typeof HeroAISkeleton> = {
  render: () => <HeroAISkeleton />,
  parameters: {
    docs: {
      description: {
        story: 'SSR-safe skeleton component for use with Suspense fallback. Shows the loading state while content is being fetched.',
      },
    },
  },
}