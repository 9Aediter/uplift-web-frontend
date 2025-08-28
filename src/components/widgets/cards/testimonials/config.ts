import { WidgetConfig } from '../../types'

export const testimonialsConfig: WidgetConfig = {
  id: 'testimonials',
  name: 'Testimonials Carousel',
  category: 'cards',
  description: 'Animated testimonials carousel with client photos and reviews',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'What Our Clients Say',
      defaultValue: 'What Our Clients Say'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description about your testimonials',
      defaultValue: 'Hear from businesses that have transformed with our solutions'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-gradient-to-b from-background to-gray-900', label: 'Gradient' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-background'
    },
    {
      key: 'autoplay',
      label: 'Auto Play',
      type: 'select',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ],
      defaultValue: 'true'
    },
    {
      key: 'testimonials',
      label: 'Client Testimonials',
      type: 'array',
      maxItems: 8,
      fields: [
        {
          key: 'name',
          label: 'Client Name',
          type: 'text',
          required: true,
          placeholder: 'Sarah Chen'
        },
        {
          key: 'designation',
          label: 'Job Title & Company',
          type: 'text',
          required: true,
          placeholder: 'Product Manager at TechFlow'
        },
        {
          key: 'quote',
          label: 'Testimonial Quote',
          type: 'textarea',
          required: true,
          placeholder: 'The attention to detail and innovative features have completely transformed our workflow...'
        },
        {
          key: 'image',
          label: 'Client Photo URL',
          type: 'url',
          required: true,
          placeholder: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
        },
        {
          key: 'rating',
          label: 'Rating (1-5)',
          type: 'select',
          options: [
            { value: '5', label: '⭐⭐⭐⭐⭐ (5 stars)' },
            { value: '4', label: '⭐⭐⭐⭐ (4 stars)' },
            { value: '3', label: '⭐⭐⭐ (3 stars)' },
            { value: '2', label: '⭐⭐ (2 stars)' },
            { value: '1', label: '⭐ (1 star)' }
          ]
        }
      ]
    }
  ],
  defaultData: {
    title: 'What Our Clients Say',
    subtitle: 'Hear from businesses that have transformed with our solutions',
    backgroundColor: 'bg-background',
    autoplay: true,
    testimonials: [
      {
        name: 'Sarah Chen',
        designation: 'Product Manager at TechFlow',
        quote: 'The attention to detail and innovative features have completely transformed our workflow. This is exactly what we\'ve been looking for.',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5
      },
      {
        name: 'Michael Rodriguez',
        designation: 'CTO at InnovateSphere',
        quote: 'Implementation was seamless and the results exceeded our expectations. The platform\'s flexibility is remarkable.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5
      },
      {
        name: 'Emily Watson',
        designation: 'Operations Director at CloudScale',
        quote: 'This solution has significantly improved our team\'s productivity. The intuitive interface makes complex tasks simple.',
        image: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        rating: 5
      }
    ]
  }
}