"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Search, Grid3X3, List, Layers, Zap, BookOpen, MessageSquare } from 'lucide-react'
import { getWidgetRegistry } from '@/lib/widgets'
import { BaseWidget } from '@/lib/widgets/core/BaseWidget'
import { WidgetCategory } from '@/lib/widgets/core/types'

interface WidgetSelectorProps {
  onSelectWidget: (widgetType: string) => void
  selectedCategory?: WidgetCategory
  onCategoryChange?: (category: WidgetCategory | 'all') => void
}

const categoryIcons = {
  card: Grid3X3,
  cards: Grid3X3,
  carousel: Layers,
  tabs: BookOpen,
  hero: Zap,
  content: MessageSquare,
  interactive: List,
  grid: Grid3X3
} as const

const categoryLabels = {
  card: 'Card',
  cards: 'Cards',
  carousel: 'Carousels', 
  tabs: 'Tabs',
  hero: 'Hero Sections',
  content: 'Content',
  interactive: 'Interactive',
  grid: 'Grid Layouts'
} as const

export const WidgetSelector: React.FC<WidgetSelectorProps> = ({
  onSelectWidget,
  selectedCategory,
  onCategoryChange
}) => {
  const [widgets, setWidgets] = useState<BaseWidget[]>([])
  const [filteredWidgets, setFilteredWidgets] = useState<BaseWidget[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<WidgetCategory | 'all'>(selectedCategory || 'all')

  // Load widgets from registry
  useEffect(() => {
    const registry = getWidgetRegistry()
    const allWidgets = registry.getAll()
    console.log('🎨 Available widgets:', allWidgets.map(w => ({ id: w.id, name: w.name, category: w.category })))
    setWidgets(allWidgets)
  }, [])

  // Filter widgets based on category and search
  useEffect(() => {
    let filtered = widgets

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(widget => widget.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(widget => 
        widget.name.toLowerCase().includes(search) ||
        widget.description.toLowerCase().includes(search) ||
        widget.getTags().some(tag => tag.toLowerCase().includes(search))
      )
    }

    setFilteredWidgets(filtered)
  }, [widgets, activeCategory, searchTerm])

  // Handle category selection
  const handleCategoryChange = (category: WidgetCategory | 'all') => {
    setActiveCategory(category)
    onCategoryChange?.(category)
  }

  // Get available categories
  const availableCategories = Array.from(new Set(widgets.map(w => w.category)))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Widget
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Choose a widget to add to your page
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All ({widgets.length})
          </button>
          
          {availableCategories.map(category => {
            const Icon = categoryIcons[category]
            const count = widgets.filter(w => w.category === category).length
            
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {categoryLabels[category]} ({count})
              </button>
            )
          })}
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredWidgets.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No widgets found matching your search.' : 'No widgets available.'}
            </div>
          ) : (
            filteredWidgets.map(widget => {
              const Icon = categoryIcons[widget.category]
              
              return (
                <div
                  key={widget.id}
                  onClick={() => onSelectWidget(widget.id)}
                  className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-all duration-200"
                >
                  {/* Widget Icon & Category */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      {categoryLabels[widget.category]}
                    </span>
                  </div>

                  {/* Widget Info */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {widget.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {widget.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {widget.getTags().length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {widget.getTags().slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add Icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Widget Count */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Showing {filteredWidgets.length} of {widgets.length} widgets
        </div>
      </div>
    </div>
  )
}