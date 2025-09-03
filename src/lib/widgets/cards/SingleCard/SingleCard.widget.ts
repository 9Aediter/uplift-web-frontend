import React from 'react'
import { BaseCardWidget } from '../base/BaseCardWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Single Card Widget - Large hero card with CTA buttons
 * Perfect for landing pages and call-to-action sections
 */
export class SingleCardWidget extends BaseCardWidget {
  readonly id = 'single-card'
  readonly name = 'Single CTA Card'
  readonly description = 'Large hero card with call-to-action buttons and animated background for landing pages'
  readonly version = '1.0.0'
  protected tags = ['hero', 'cta', 'landing', 'buttons']

  /**
   * Render the SingleCard component (CLIENT-SIDE for admin preview only)
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { SingleCardComponent } = require('./SingleCard.component')
      
      if (!SingleCardComponent) {
        console.error('🚫 [SINGLE CARD] SingleCardComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function SingleCardRenderer() {
        return React.createElement(SingleCardComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [SINGLE CARD] Failed to require SingleCard component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state (Client-side + Admin preview)
   */
  renderSkeleton(): React.ComponentType {
    try {
      const { SingleCardSkeleton } = require('./SingleCard.skeleton')
      return SingleCardSkeleton
    } catch (error) {
      console.error('🚫 [SINGLE CARD] Failed to render skeleton:', error)
      // Fallback basic skeleton
      return () => React.createElement('div', {
        className: 'h-screen bg-black animate-pulse flex items-center justify-center'
      }, React.createElement('div', {
        className: 'text-gray-400'
      }, 'Loading Single Card...'))
    }
  }

  /**
   * MANDATORY: Render SingleCard for SSR (PRODUCTION - no React hooks)
   */
  renderSSR(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { SingleCardSSR } = require('./SingleCard.ssr')
      
      return function SingleCardSSRRenderer() {
        return React.createElement(SingleCardSSR, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [SINGLE CARD] Failed to load SSR component:', error)
      return this.renderSkeletonSSR()
    }
  }

  /**
   * MANDATORY: Render skeleton for SSR (PRODUCTION - SSR safe)
   */
  renderSkeletonSSR(): React.ComponentType {
    try {
      const { SingleCardSkeleton } = require('./SingleCard.skeleton')
      return SingleCardSkeleton
    } catch (error) {
      console.error('🚫 [SINGLE CARD] Failed to render SSR skeleton:', error)
      // Basic fallback skeleton
      return () => React.createElement('div', {
        className: 'h-screen bg-black animate-pulse flex items-center justify-center'
      }, React.createElement('div', {
        className: 'text-gray-400'
      }, 'Loading...'))
    }
  }

  /**
   * Get widget configuration for admin interface
   */
  getConfig(): WidgetConfig {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      fields: [
        {
          key: 'title',
          label: 'Main Title',
          type: 'text',
          required: true,
          placeholder: 'Build Your Next Big Thing',
          defaultValue: 'Build Your Next Big Thing'
        },
        {
          key: 'subtitle',
          label: 'Subtitle',
          type: 'text',
          placeholder: 'with Uplift Technology',
          defaultValue: 'with Uplift Technology'
        },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          placeholder: 'Brief description of your offer or services',
          defaultValue: 'Custom software solutions, from concept to launch. Empower your business with our cutting-edge technology and transform your ideas into reality.'
        },
        {
          key: 'primaryButtonText',
          label: 'Primary Button Text',
          type: 'text',
          required: true,
          placeholder: 'Start Your Project',
          defaultValue: 'Start Your Project'
        },
        {
          key: 'primaryButtonLink',
          label: 'Primary Button Link',
          type: 'url',
          required: true,
          placeholder: '/contact or https://example.com',
          defaultValue: '/contact'
        },
        {
          key: 'secondaryButtonText',
          label: 'Secondary Button Text',
          type: 'text',
          placeholder: 'Get Free Consultation',
          defaultValue: 'Get Free Consultation'
        },
        {
          key: 'secondaryButtonLink',
          label: 'Secondary Button Link',
          type: 'url',
          placeholder: '/consultation or https://example.com',
          defaultValue: '/consultation'
        },
        ...this.getCommonCardFields(),
        {
          key: 'trustIndicators',
          label: 'Trust Indicators',
          type: 'array',
          maxItems: 6,
          fields: [
            {
              key: 'indicator',
              label: 'Company Type/Industry',
              type: 'text',
              required: true,
              placeholder: 'STARTUP, FINTECH, ECOMMERCE, etc.'
            }
          ]
        },
        {
          key: 'showAnimations',
          label: 'Enable Animations',
          type: 'select',
          options: [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' }
          ],
          defaultValue: 'true'
        }
      ],
      defaultData: this.getDefaultData()
    }
  }

  /**
   * Get default data for new widget instances
   */
  getDefaultData(): WidgetData {
    return {
      title: 'Build Your Next Big Thing',
      subtitle: 'with Uplift Technology', 
      description: 'Custom software solutions, from concept to launch. Empower your business with our cutting-edge technology and transform your ideas into reality.',
      primaryButtonText: 'Start Your Project',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'Get Free Consultation',
      secondaryButtonLink: '/consultation',
      backgroundColor: 'bg-black',
      trustIndicators: [
        { indicator: 'STARTUP' },
        { indicator: 'FINTECH' },
        { indicator: 'ECOMMERCE' },
        { indicator: 'HEALTHCARE' }
      ],
      showAnimations: true
    }
  }

  /**
   * Enhanced validation for SingleCard specific requirements
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate primary button requirements
    if (!data.primaryButtonText || !data.primaryButtonLink) {
      errors.push('Primary button text and link are required')
    }

    // Validate trust indicators
    if (data.trustIndicators && Array.isArray(data.trustIndicators)) {
      data.trustIndicators.forEach((item: any, index: number) => {
        if (!item.indicator || typeof item.indicator !== 'string') {
          errors.push(`Trust indicator ${index + 1} must have a valid indicator text`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: baseValidation.warnings
    }
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['animations', 'trustIndicators', 'multipleButtons']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}