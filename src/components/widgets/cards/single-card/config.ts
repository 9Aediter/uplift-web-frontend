import { WidgetConfig } from '../../types'

export const singleCardConfig: WidgetConfig = {
  id: 'single-card',
  name: 'Single CTA Card',
  category: 'cards',
  description: 'Large hero card with call-to-action buttons and animated background for landing pages',
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
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-gradient-to-br from-black via-gray-900 to-black', label: 'Dark Gradient' },
        { value: 'bg-gradient-to-br from-blue-900 via-purple-900 to-black', label: 'Blue Purple Gradient' },
        { value: 'bg-background', label: 'Default Background' }
      ],
      defaultValue: 'bg-black'
    },
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
  defaultData: {
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