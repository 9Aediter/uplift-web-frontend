import { WidgetConfig } from '../../types'

export const cardListConfig: WidgetConfig = {
  id: 'card-list',
  name: 'Card List',
  category: 'cards',
  description: 'Article/blog cards with images, perfect for news, blogs, or featured content',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'Featured Articles',
      defaultValue: 'Featured Articles'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description of your content',
      defaultValue: 'Latest insights and updates from our team'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-gradient-to-b from-gray-900/30 to-black', label: 'Dark Gradient' },
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-gradient-to-b from-gray-900/30 to-black'
    },
    {
      key: 'layout',
      label: 'Layout Style',
      type: 'select',
      options: [
        { value: 'grid', label: 'Grid Layout' },
        { value: 'list', label: 'List Layout' }
      ],
      defaultValue: 'grid'
    },
    {
      key: 'items',
      label: 'Articles/Posts',
      type: 'array',
      maxItems: 12,
      fields: [
        {
          key: 'title',
          label: 'Article Title',
          type: 'text',
          required: true,
          placeholder: '10 Software Trends That Will Shape Business'
        },
        {
          key: 'description',
          label: 'Article Description',
          type: 'textarea',
          required: true,
          placeholder: 'Brief summary or excerpt of the article content'
        },
        {
          key: 'category',
          label: 'Category',
          type: 'text',
          required: true,
          placeholder: 'Software Trends, UX/UI, Development, etc.'
        },
        {
          key: 'image',
          label: 'Featured Image URL',
          type: 'url',
          required: true,
          placeholder: 'https://images.unsplash.com/photo-...'
        },
        {
          key: 'link',
          label: 'Article Link',
          type: 'url',
          required: true,
          placeholder: '/blog/article-slug or https://example.com'
        },
        {
          key: 'author',
          label: 'Author Name (Optional)',
          type: 'text',
          placeholder: 'John Doe'
        },
        {
          key: 'date',
          label: 'Publication Date (Optional)',
          type: 'text',
          placeholder: 'March 15, 2024'
        },
        {
          key: 'readTime',
          label: 'Read Time (Optional)',
          type: 'text',
          placeholder: '5 min read'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Featured Articles',
    subtitle: 'Latest insights and updates from our team',
    backgroundColor: 'bg-gradient-to-b from-gray-900/30 to-black',
    layout: 'grid',
    items: [
      {
        title: '10 Software Trends That Will Shape Business in 2024',
        description: 'Explore the latest software trends that are changing the business landscape, from AI and Machine Learning to Low-Code Development platforms.',
        category: 'Software Trends',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
        link: '/blog/software-trends-2024',
        author: 'Tech Team',
        date: 'March 15, 2024',
        readTime: '8 min read'
      },
      {
        title: 'How Good UX Design Impacts Conversion Rates',
        description: 'Study the relationship between UX Design and conversion rates, and learn how to improve UX to increase sales effectively.',
        category: 'UX/UI',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
        link: '/blog/ux-design-conversion-rates',
        author: 'Design Team',
        date: 'March 10, 2024',
        readTime: '6 min read'
      },
      {
        title: 'Building Scalable Applications with Modern Architecture',
        description: 'Learn about microservices, containerization, and cloud-native approaches to building applications that can handle growth.',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
        link: '/blog/scalable-applications',
        author: 'Engineering Team',
        date: 'March 5, 2024',
        readTime: '10 min read'
      }
    ]
  }
}