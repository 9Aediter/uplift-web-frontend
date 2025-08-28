import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HeroAIWidget } from '@/lib/widgets/hero/HeroAI/HeroAI.widget'

// Create widget instance for stories
const heroAIWidget = new HeroAIWidget()

// Wrapper component for Storybook
function HeroAIWrapper(props: any) {
  try {
    const HeroComponent = heroAIWidget.render(props, { isPreview: true })
    if (!HeroComponent) {
      return (
        <div className="p-8 text-yellow-600 bg-yellow-50 rounded border">
          <h3 className="font-bold">HeroAI render returned null</h3>
          <p className="mt-2">Check widget render method and data structure</p>
        </div>
      )
    }
    return <HeroComponent />
  } catch (error) {
    return (
      <div className="p-8 text-red-500 bg-red-50 rounded border">
        <h3 className="font-bold">Failed to render HeroAI</h3>
        <p className="mt-2">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    )
  }
}

/**
 * HeroAI widget - Interactive AI-themed hero section with globe, particles, and animations.
 * Perfect for technology companies, AI products, and modern landing pages.
 */
const meta: Meta<typeof HeroAIWrapper> = {
  title: 'Widgets/HeroAI',
  component: HeroAIWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive AI-themed hero section with 3D globe, particle effects, scroll indicators, and gradient text animations. Built for modern technology presentations.',
      },
    },
  },
  argTypes: {
    badge: { control: 'text' },
    titlePart1: { control: 'text' },
    titlePart2: { control: 'text' },
    titleGradient1: { control: 'text' },
    titleGradient2: { control: 'text' },
    subtitle: { control: 'text' },
    launchButton: { control: 'text' },
    exploreButton: { control: 'text' },
    backgroundImageUrl: { control: 'text' },
    overlayOpacity: { 
      control: { type: 'range', min: 0, max: 1, step: 0.1 }
    },
    textPosition: {
      control: 'select',
      options: ['left', 'center', 'right']
    },
    context: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof HeroAIWrapper>

/**
 * Default AI-powered business hero
 */
export const Default: Story = {
  args: {
    badge: 'AI-Powered Solutions',
    titlePart1: 'The Future of',
    titlePart2: 'Technology is',
    titleGradient1: 'Here & Now',
    titleGradient2: 'With AI',
    subtitle: 'Transform your business with cutting-edge artificial intelligence solutions that drive growth and innovation.',
    launchButton: 'Launch Project',
    exploreButton: 'Explore Innovation',
    textPosition: 'center',
    overlayOpacity: 0.5,
    context: { isPreview: true }
  },
}

/**
 * Startup focused variant
 */
export const StartupFocus: Story = {
  args: {
    badge: 'Next-Gen Startup',
    titlePart1: 'Build the',
    titlePart2: 'Future',
    titleGradient1: 'Today',
    titleGradient2: 'Together',
    subtitle: 'Join the revolution of innovative startups leveraging AI and modern technology to disrupt industries.',
    launchButton: 'Start Building',
    exploreButton: 'View Success Stories',
    textPosition: 'center',
    overlayOpacity: 0.4,
    context: { isPreview: true }
  },
}

/**
 * Enterprise solutions variant
 */
export const Enterprise: Story = {
  args: {
    badge: 'Enterprise Ready',
    titlePart1: 'Scale Your',
    titlePart2: 'Business',
    titleGradient1: 'Intelligently',
    titleGradient2: 'Efficiently',
    subtitle: 'Enterprise-grade AI solutions designed to transform large organizations with security, compliance, and scalability.',
    launchButton: 'Get Enterprise Demo',
    exploreButton: 'Case Studies',
    textPosition: 'center',
    overlayOpacity: 0.6,
    context: { isPreview: true }
  },
}

/**
 * Product launch variant
 */
export const ProductLaunch: Story = {
  args: {
    badge: 'Product Launch 2024',
    titlePart1: 'Introducing',
    titlePart2: 'Revolutionary',
    titleGradient1: 'AI Platform',
    titleGradient2: 'v2.0',
    subtitle: 'Experience the most advanced AI platform with breakthrough features that will redefine how you work.',
    launchButton: 'Try Beta',
    exploreButton: 'Watch Demo',
    textPosition: 'center',
    overlayOpacity: 0.7,
    context: { isPreview: true }
  },
}

/**
 * Technology showcase variant
 */
export const TechShowcase: Story = {
  args: {
    badge: 'Cutting-Edge Technology',
    titlePart1: 'Powered by',
    titlePart2: 'Advanced',
    titleGradient1: 'Machine Learning',
    titleGradient2: '& Neural Networks',
    subtitle: 'Discover how our advanced AI algorithms and neural networks are pushing the boundaries of what\'s possible.',
    launchButton: 'Explore Technology',
    exploreButton: 'Technical Docs',
    textPosition: 'center',
    overlayOpacity: 0.3,
    context: { isPreview: true }
  },
}