import { WidgetConfig } from '../../types'

export const fourColumnCardsConfig: WidgetConfig = {
  id: 'four-column-cards',
  name: '4-Column Cards',
  category: 'cards',
  description: '4-column layout with gradient icons, perfect for showcasing problems, features, or benefits',
  fields: [
    {
      key: 'title',
      label: 'Section Title',
      type: 'text',
      placeholder: 'Business Challenges',
      defaultValue: 'Business Challenges'
    },
    {
      key: 'subtitle',
      label: 'Section Subtitle',
      type: 'textarea',
      placeholder: 'Brief description of your section',
      defaultValue: 'Common problems that slow down modern businesses and how technology can solve them'
    },
    {
      key: 'backgroundColor',
      label: 'Background Style',
      type: 'select',
      options: [
        { value: 'bg-black', label: 'Black' },
        { value: 'bg-gray-900', label: 'Dark Gray' },
        { value: 'bg-background', label: 'Default Background' },
        { value: 'bg-gradient-to-b from-background to-gray-900', label: 'Dark Gradient' },
        { value: 'bg-gradient-to-r from-blue-900 to-purple-900', label: 'Blue Purple Gradient' }
      ],
      defaultValue: 'bg-black'
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
    },
    {
      key: 'items',
      label: 'Cards',
      type: 'array',
      maxItems: 4,
      fields: [
        {
          key: 'title',
          label: 'Card Title',
          type: 'text',
          required: true,
          placeholder: 'Slow Manual Processes'
        },
        {
          key: 'description',
          label: 'Card Description',
          type: 'textarea',
          required: true,
          placeholder: 'Brief description of the challenge or benefit'
        },
        {
          key: 'icon',
          label: 'Icon (Emoji)',
          type: 'text',
          required: true,
          placeholder: '⚙️ (use emoji or single character)'
        },
        {
          key: 'gradient',
          label: 'Gradient Color',
          type: 'select',
          required: true,
          options: [
            { value: 'from-red-500 via-red-400 to-orange-500', label: '🔴 Red to Orange' },
            { value: 'from-blue-500 via-blue-400 to-cyan-500', label: '🔵 Blue to Cyan' },
            { value: 'from-purple-500 via-purple-400 to-pink-500', label: '🟣 Purple to Pink' },
            { value: 'from-green-500 via-green-400 to-emerald-500', label: '🟢 Green to Emerald' },
            { value: 'from-yellow-500 via-yellow-400 to-orange-500', label: '🟡 Yellow to Orange' },
            { value: 'from-indigo-500 via-indigo-400 to-blue-500', label: '🔵 Indigo to Blue' },
            { value: 'from-pink-500 via-pink-400 to-rose-500', label: '🩷 Pink to Rose' },
            { value: 'from-teal-500 via-teal-400 to-cyan-500', label: '🩵 Teal to Cyan' }
          ]
        },
        {
          key: 'impact',
          label: 'Impact Badge (Optional)',
          type: 'text',
          placeholder: '85% Time Loss'
        }
      ]
    }
  ],
  defaultData: {
    title: 'Business Challenges',
    subtitle: 'Common problems that slow down modern businesses and how technology can solve them',
    backgroundColor: 'bg-black',
    showAnimations: true,
    items: [
      {
        title: 'Slow Manual Processes',
        description: 'Teams waste hours on repetitive tasks that could be automated, reducing productivity and increasing human error.',
        icon: '⚙️',
        gradient: 'from-red-500 via-red-400 to-orange-500',
        impact: '85% Time Loss'
      },
      {
        title: 'Poor Data Insights',
        description: 'Critical business decisions are made with incomplete information due to scattered data and lack of analytics.',
        icon: '📊',
        gradient: 'from-blue-500 via-blue-400 to-cyan-500',
        impact: '60% Bad Decisions'
      },
      {
        title: 'System Integration Issues',
        description: 'Different software tools don\'t communicate well, creating data silos and workflow bottlenecks.',
        icon: '🔗',
        gradient: 'from-purple-500 via-purple-400 to-pink-500',
        impact: '40% Efficiency Drop'
      },
      {
        title: 'Scalability Limitations',
        description: 'Current systems can\'t handle business growth, leading to crashes, slowdowns, and lost opportunities.',
        icon: '🚀',
        gradient: 'from-green-500 via-green-400 to-emerald-500',
        impact: '30% Growth Blocked'
      }
    ]
  }
}