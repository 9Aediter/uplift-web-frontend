import { WidgetConfig } from '../../types'

export const faqAccordionConfig: WidgetConfig = {
  id: 'faq-accordion',
  name: 'FAQ Accordion',
  category: 'cards',
  description: 'Interactive FAQ section with expandable questions and answers',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'Frequently Asked Questions',
      defaultValue: 'Frequently Asked Questions'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description about your FAQ section',
      defaultValue: 'Get answers to the most common questions about our services'
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
      key: 'accentColor',
      label: 'Accent Color',
      type: 'select',
      options: [
        { value: 'blue', label: '🔵 Blue' },
        { value: 'green', label: '🟢 Green' },
        { value: 'purple', label: '🟣 Purple' },
        { value: 'red', label: '🔴 Red' },
        { value: 'yellow', label: '🟡 Yellow' },
        { value: 'pink', label: '🩷 Pink' },
        { value: 'indigo', label: '🔵 Indigo' },
        { value: 'teal', label: '🩵 Teal' }
      ],
      defaultValue: 'blue'
    },
    {
      key: 'faqs',
      label: 'FAQ Items',
      type: 'array',
      maxItems: 10,
      fields: [
        {
          key: 'question',
          label: 'Question',
          type: 'text',
          required: true,
          placeholder: 'What services do you offer?'
        },
        {
          key: 'answer',
          label: 'Answer',
          type: 'textarea',
          required: true,
          placeholder: 'We offer a comprehensive range of business solutions including...'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Frequently Asked Questions',
    subtitle: 'Get answers to the most common questions about our services',
    backgroundColor: 'bg-background',
    accentColor: 'blue',
    faqs: [
      {
        question: 'What services do you offer?',
        answer: 'We offer a comprehensive range of business solutions including ERP systems, POS solutions, web applications, and custom software development tailored to your specific needs.'
      },
      {
        question: 'How long does implementation take?',
        answer: 'Implementation timelines vary depending on the complexity and scope of your project. Typically, basic setups can be completed in 2-4 weeks, while more complex implementations may take 2-3 months.'
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes, we provide comprehensive ongoing support including maintenance, updates, training, and technical assistance. Our support team is available to help you get the most out of your investment.'
      },
      {
        question: 'Can you customize solutions for our business?',
        answer: 'Absolutely! We specialize in creating customized solutions that perfectly fit your business processes and requirements. Every implementation is tailored to your unique needs.'
      },
      {
        question: 'What is your pricing model?',
        answer: 'Our pricing varies based on the scope and complexity of your requirements. We offer flexible pricing models including one-time implementation fees, subscription-based services, and custom packages. Contact us for a personalized quote.'
      }
    ]
  }
}