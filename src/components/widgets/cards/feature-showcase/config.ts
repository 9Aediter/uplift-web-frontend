import { WidgetConfig } from '../../types'

export const featureShowcaseConfig: WidgetConfig = {
  id: 'feature-showcase',
  name: 'Feature Showcase',
  category: 'cards',
  description: 'Alternating left/right layout showcasing products or services with features list and images',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'Our Products',
      defaultValue: 'Our Products'
    },
    {
      key: 'subtitle', 
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description of your products or services',
      defaultValue: 'Innovative solutions for your business'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-gradient-to-b from-black to-gray-900', label: 'Dark Gradient' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-gradient-to-b from-black to-gray-900'
    },
    {
      key: 'items',
      label: 'Feature Items',
      type: 'array',
      maxItems: 6,
      fields: [
        {
          key: 'title',
          label: 'Product/Service Name',
          type: 'text',
          required: true,
          placeholder: 'Smart ERP System'
        },
        {
          key: 'subtitle',
          label: 'Category/Type',
          type: 'text',
          required: true,
          placeholder: 'Enterprise Management'
        },
        {
          key: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          placeholder: 'Brief description of your product or service'
        },
        {
          key: 'image',
          label: 'Product Image URL',
          type: 'url',
          required: true,
          placeholder: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop'
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
          key: 'features',
          label: 'Key Features',
          type: 'array',
          maxItems: 5,
          fields: [
            {
              key: 'title',
              label: 'Feature Name',
              type: 'text',
              required: true,
              placeholder: 'Real-time Analytics'
            },
            {
              key: 'description',
              label: 'Feature Description',
              type: 'text',
              required: true,
              placeholder: 'Live business insights'
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
                { value: 'bar-chart', label: '📊 Bar Chart' },
                { value: 'package', label: '📦 Package' },
                { value: 'credit-card', label: '💳 Credit Card' },
                { value: 'trending-up', label: '📈 Trending Up' },
                { value: 'code', label: '💻 Code' },
                { value: 'cloud', label: '☁️ Cloud' }
              ]
            }
          ]
        },
        {
          key: 'link',
          label: 'Learn More Link (Optional)',
          type: 'url',
          placeholder: '/product/smart-erp or https://example.com'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Our Products',
    subtitle: 'Innovative solutions for your business',
    backgroundColor: 'bg-gradient-to-b from-black to-gray-900',
    items: [
      {
        title: 'Smart ERP System',
        subtitle: 'Enterprise Management',
        description: 'Complete business management solution with advanced features for modern enterprises',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop',
        color: 'blue',
        features: [
          { title: 'Real-time Analytics', description: 'Live business insights', icon: 'bar-chart' },
          { title: 'Multi-user Access', description: 'Role-based permissions', icon: 'users' },
          { title: 'Cloud Integration', description: 'Seamless cloud sync', icon: 'cloud' }
        ],
        link: '/product/smart-erp-system'
      },
      {
        title: 'Modern POS Solution', 
        subtitle: 'Retail Technology',
        description: 'Advanced point-of-sale system designed for modern retail businesses',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
        color: 'green',
        features: [
          { title: 'Inventory Management', description: 'Real-time stock tracking', icon: 'package' },
          { title: 'Payment Processing', description: 'Multiple payment methods', icon: 'credit-card' },
          { title: 'Sales Reports', description: 'Detailed analytics', icon: 'trending-up' }
        ],
        link: '/product/pos-solution'
      }
    ]
  }
}