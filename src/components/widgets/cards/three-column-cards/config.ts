import { WidgetConfig } from '../../types'

export const threeColumnCardsConfig: WidgetConfig = {
  id: 'three-column-cards',
  name: '3-Column Cards',
  category: 'cards',
  description: 'Display content in 3 equal columns with icons, perfect for services, features, or benefits',
  maxItems: 3,
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
      placeholder: 'Enter section title',
      defaultValue: 'Our Services'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Enter section subtitle or description',
      defaultValue: 'Complete business solutions tailored to your needs'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-gradient-to-b from-background to-black', label: 'Dark Gradient' },
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-gradient-to-b from-background to-black'
    },
    {
      key: 'items',
      label: 'Cards',
      type: 'array',
      maxItems: 3,
      fields: [
        {
          key: 'title',
          label: 'Card Title',
          type: 'text',
          required: true,
          placeholder: 'Service or feature name'
        },
        {
          key: 'description',
          label: 'Card Description',
          type: 'textarea',
          required: true,
          placeholder: 'Brief description of the service or feature'
        },
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          required: true,
          options: [
            { value: 'monitor', label: '🖥️ Monitor' },
            { value: 'smartphone', label: '📱 Smartphone' },
            { value: 'globe', label: '🌐 Globe' },
            { value: 'shopping-cart', label: '🛒 Shopping Cart' },
            { value: 'database', label: '🗄️ Database' },
            { value: 'settings', label: '⚙️ Settings' },
            { value: 'users', label: '👥 Users' },
            { value: 'chart', label: '📊 Chart' },
            { value: 'code', label: '💻 Code' },
            { value: 'palette', label: '🎨 Palette' },
            { value: 'shield', label: '🛡️ Shield' },
            { value: 'zap', label: '⚡ Zap' }
          ]
        },
        {
          key: 'color',
          label: 'Color Theme',
          type: 'select',
          required: true,
          options: [
            { value: 'blue', label: '🔵 Blue' },
            { value: 'green', label: '🟢 Green' },
            { value: 'purple', label: '🟣 Purple' },
            { value: 'red', label: '🔴 Red' },
            { value: 'yellow', label: '🟡 Yellow' },
            { value: 'pink', label: '🩷 Pink' },
            { value: 'indigo', label: '🔵 Indigo' },
            { value: 'teal', label: '🩵 Teal' }
          ]
        },
        {
          key: 'link',
          label: 'Link URL (Optional)',
          type: 'url',
          placeholder: '/service-page or https://example.com'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Our Services',
    subtitle: 'Complete business solutions tailored to your needs',
    backgroundColor: 'bg-gradient-to-b from-background to-black',
    items: [
      {
        title: 'ERP Systems',
        description: 'Comprehensive business management solutions',
        icon: 'monitor',
        color: 'blue',
        link: '/service/erp-system'
      },
      {
        title: 'POS Solutions',
        description: 'Modern point of sale systems',
        icon: 'shopping-cart',
        color: 'green',
        link: '/service/pos-solution'
      },
      {
        title: 'Web Applications',
        description: 'Custom web development services',
        icon: 'globe',
        color: 'purple',
        link: '/service/web-application'
      }
    ]
  }
}