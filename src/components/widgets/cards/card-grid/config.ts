import { WidgetConfig } from '../../types'

export const cardGridConfig: WidgetConfig = {
  id: 'card-grid',
  name: 'Card Grid',
  category: 'cards',
  description: 'Grid layout for technologies, tools, logos, or any collection of items with icons',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'Technology Stack',
      defaultValue: 'Technology Stack'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description of your collection',
      defaultValue: 'Tools & technologies we use to build amazing products'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-gradient-to-b from-background to-gray-900', label: 'Dark Gradient' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-background'
    },
    {
      key: 'columns',
      label: 'Grid Layout',
      type: 'select',
      options: [
        { value: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4', label: '2-4 Columns (Responsive)' },
        { value: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6', label: '2-6 Columns (Responsive)' },
        { value: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8', label: '3-8 Columns (Dense)' },
        { value: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3', label: '1-3 Columns (Larger)' },
        { value: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5', label: '2-5 Columns (Custom)' }
      ],
      defaultValue: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
    },
    {
      key: 'showMarquee',
      label: 'Show as Marquee',
      type: 'select',
      options: [
        { value: 'false', label: 'No - Static Grid' },
        { value: 'true', label: 'Yes - Scrolling Marquee' }
      ],
      defaultValue: 'false'
    },
    {
      key: 'items',
      label: 'Grid Items',
      type: 'array',
      maxItems: 20,
      fields: [
        {
          key: 'name',
          label: 'Item Name',
          type: 'text',
          required: true,
          placeholder: 'React, Node.js, TypeScript, etc.'
        },
        {
          key: 'icon',
          label: 'Icon (Emoji or HTML)',
          type: 'text',
          required: true,
          placeholder: '⚛️ or <svg>...</svg>'
        },
        {
          key: 'category',
          label: 'Category (Optional)',
          type: 'text',
          placeholder: 'Frontend, Backend, Database, etc.'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Technology Stack',
    subtitle: 'Tools & technologies we use to build amazing products',
    backgroundColor: 'bg-background',
    columns: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    showMarquee: false,
    items: [
      {
        name: 'React',
        icon: '⚛️',
        category: 'Frontend'
      },
      {
        name: 'Node.js',
        icon: '🟢',
        category: 'Backend'
      },
      {
        name: 'TypeScript',
        icon: '🔷',
        category: 'Language'
      },
      {
        name: 'Next.js',
        icon: '▲',
        category: 'Framework'
      },
      {
        name: 'PostgreSQL',
        icon: '🐘',
        category: 'Database'
      },
      {
        name: 'Docker',
        icon: '🐳',
        category: 'DevOps'
      },
      {
        name: 'AWS',
        icon: '☁️',
        category: 'Cloud'
      },
      {
        name: 'GraphQL',
        icon: '◉',
        category: 'API'
      },
      {
        name: 'MongoDB',
        icon: '🍃',
        category: 'Database'
      },
      {
        name: 'Redis',
        icon: '🔴',
        category: 'Cache'
      }
    ]
  }
}