import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SimpleHeroWidget } from '@/lib/widgets/hero/SimpleHero/SimpleHero.widget'

// Create widget instance for stories
const simpleHeroWidget = new SimpleHeroWidget()

// Wrapper component for Storybook
function SimpleHeroWrapper(props: any) {
  try {
    const HeroComponent = simpleHeroWidget.render(props, { isPreview: true })
    if (!HeroComponent) {
      return (
        <div className="p-8 text-yellow-600 bg-yellow-50 rounded border">
          <h3 className="font-bold">SimpleHero render returned null</h3>
          <p className="mt-2">Check widget render method and data structure</p>
        </div>
      )
    }
    return <HeroComponent />
  } catch (error) {
    return (
      <div className="p-8 text-red-500 bg-red-50 rounded border">
        <h3 className="font-bold">Failed to render SimpleHero</h3>
        <p className="mt-2">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    )
  }
}

/**
 * SimpleHero widget - Clean and minimal hero section without animations.
 * Perfect for professional websites, documentation, and content-focused pages.
 */
const meta: Meta<typeof SimpleHeroWrapper> = {
  title: 'Widgets/HeroSimple',
  component: SimpleHeroWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Simple hero section with clean typography and minimal design. Optimized for readability and fast loading without complex animations.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    ctaButtonText: { control: 'text' },
    ctaButtonLink: { control: 'text' },
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
type Story = StoryObj<typeof SimpleHeroWrapper>

/**
 * Default professional hero
 */
export const Default: Story = {
  args: {
    title: 'Professional Solutions',
    subtitle: 'Built for Success',
    description: 'We deliver high-quality software solutions that help businesses achieve their goals with reliability and efficiency.',
    ctaButtonText: 'Get Started',
    ctaButtonLink: '/contact',
    textPosition: 'center',
    overlayOpacity: 0.7,
    context: { isPreview: true }
  },
}

/**
 * Documentation style hero
 */
export const Documentation: Story = {
  args: {
    title: 'Developer Documentation',
    subtitle: 'Everything you need to get started',
    description: 'Comprehensive guides, API references, and tutorials to help you integrate our platform into your applications.',
    ctaButtonText: 'View Docs',
    ctaButtonLink: '/docs',
    textPosition: 'left',
    overlayOpacity: 0.5,
    context: { isPreview: true }
  },
}

/**
 * Service offering hero
 */
export const ServiceOffering: Story = {
  args: {
    title: 'Consulting Services',
    subtitle: 'Expert guidance for your projects',
    description: 'Our team of experienced consultants provides strategic guidance and technical expertise to ensure your project success.',
    ctaButtonText: 'Schedule Consultation',
    ctaButtonLink: '/consultation',
    textPosition: 'center',
    overlayOpacity: 0.6,
    context: { isPreview: true }
  },
}

/**
 * About page hero
 */
export const AboutPage: Story = {
  args: {
    title: 'About Our Company',
    subtitle: 'Innovation meets expertise',
    description: 'Founded in 2020, we have been helping businesses transform through technology with a focus on quality, innovation, and customer success.',
    ctaButtonText: 'Our Story',
    ctaButtonLink: '/about',
    textPosition: 'left',
    overlayOpacity: 0.4,
    context: { isPreview: true }
  },
}

/**
 * Contact page hero
 */
export const ContactPage: Story = {
  args: {
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you',
    description: 'Have a project in mind or need expert advice? Our team is ready to help you achieve your goals.',
    ctaButtonText: 'Contact Us',
    ctaButtonLink: '/contact',
    textPosition: 'center',
    overlayOpacity: 0.8,
    context: { isPreview: true }
  },
}

/**
 * Minimal variant with right alignment
 */
export const MinimalRight: Story = {
  args: {
    title: 'Clean & Simple',
    subtitle: 'Minimalist design approach',
    description: 'Sometimes less is more. This variant showcases our minimalist design philosophy.',
    ctaButtonText: 'Learn More',
    ctaButtonLink: '/minimal',
    textPosition: 'right',
    overlayOpacity: 0.3,
    context: { isPreview: true }
  },
}