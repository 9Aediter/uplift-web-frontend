"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/button/button"
import { Badge } from "@/components/button/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Search, Sparkles, Zap, Layout, Plus, Settings } from "lucide-react"
import { getHeroRegistry } from "@/lib/widgets/hero"
import { BaseHeroWidget, HeroData } from "@/lib/widgets/hero/BaseHeroWidget"
import { HeroConfigModal } from "./hero-config-modal"

interface HeroSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (heroWidget: BaseHeroWidget, heroData: HeroData) => void
  currentHeroId?: string
  initialData?: Partial<HeroData>
}

const heroTypeLabels = {
  'all': 'All Patterns',
  'ai-interactive': 'AI Interactive',
  'simple': 'Simple',
  'animated': 'Animated'
} as const

const heroTypeIcons = {
  'ai-interactive': Sparkles,
  'simple': Layout,
  'animated': Zap
} as const

export function HeroSelector({ isOpen, onClose, onSelect, currentHeroId, initialData }: HeroSelectorProps) {
  const [allHeroes, setAllHeroes] = useState<BaseHeroWidget[]>([])
  const [filteredHeroes, setFilteredHeroes] = useState<BaseHeroWidget[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeType, setActiveType] = useState<string>('all')
  const [selectedHero, setSelectedHero] = useState<BaseHeroWidget | null>(null)
  const [showConfigModal, setShowConfigModal] = useState(false)

  // Load heroes once when component mounts
  useEffect(() => {
    const heroRegistry = getHeroRegistry()
    const heroes = heroRegistry.getAll()
    setAllHeroes(heroes)
  }, [])

  // Get available hero types
  const availableTypes = Array.from(new Set(allHeroes.map(h => h.getHeroType())))

  // Filter heroes based on type and search
  useEffect(() => {
    let filtered = allHeroes

    // Filter by type
    if (activeType !== 'all') {
      filtered = filtered.filter(hero => hero.getHeroType() === activeType)
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(hero =>
        hero.name.toLowerCase().includes(search) ||
        hero.description.toLowerCase().includes(search) ||
        hero.getTags().some(tag => tag.toLowerCase().includes(search))
      )
    }

    setFilteredHeroes(filtered)
  }, [allHeroes, activeType, searchTerm])

  // Handle type selection
  const handleTypeChange = (type: string) => {
    setActiveType(type)
  }

  const handleSelect = () => {
    if (selectedHero) {
      // Open config modal instead of direct selection
      setShowConfigModal(true)
    }
  }

  const handleConfigSave = (heroWidget: BaseHeroWidget, heroData: HeroData) => {
    onSelect(heroWidget, heroData)
    setShowConfigModal(false)
    handleClose()
  }

  const handleConfigClose = () => {
    setShowConfigModal(false)
    setSelectedHero(null)
  }

  const handleClose = () => {
    onClose()
    setSelectedHero(null)
    setSearchTerm('')
    setActiveType('all')
  }

  const getHeroIcon = (hero: BaseHeroWidget) => {
    const heroType = hero.getHeroType() as keyof typeof heroTypeIcons
    return heroTypeIcons[heroType] || Layout
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="!w-[95vw] !max-w-7xl max-h-[90vh] mx-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Select Hero Pattern
          </DialogTitle>
          <DialogDescription>
            Choose a hero pattern for your page. Different patterns offer various layouts and features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search hero patterns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Type Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTypeChange('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeType === 'all'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              All Patterns ({allHeroes.length})
            </button>

            {availableTypes.map(type => {
              const Icon = heroTypeIcons[type as keyof typeof heroTypeIcons] || Layout
              const count = allHeroes.filter(h => h.getHeroType() === type).length
              const label = heroTypeLabels[type as keyof typeof heroTypeLabels] || type.charAt(0).toUpperCase() + type.slice(1)

              return (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center ${activeType === type
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {label} ({count})
                </button>
              )
            })}
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredHeroes.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No hero patterns found matching your search.' : 'No hero patterns available.'}
              </div>
            ) : (
              filteredHeroes.map(hero => {
                const Icon = getHeroIcon(hero)
                const isSelected = selectedHero?.id === hero.id
                const isCurrent = currentHeroId === hero.id

                return (
                  <div
                    key={hero.id}
                    onClick={() => setSelectedHero(hero)}
                    className={`group relative rounded-lg p-4 border-2 cursor-pointer transition-all duration-200 ${isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isCurrent
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                  >
                    {/* Hero Icon & Type */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex flex-col gap-1">
                        {hero.isAnimatedHero() && (
                          <Badge variant="secondary" className="text-xs">
                            Animated
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Hero Info */}
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {hero.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {hero.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Features</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hero.getSupportedFeatures().slice(0, 3).map(feature => (
                            <span
                              key={feature}
                              className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                          {hero.getSupportedFeatures().length > 3 && (
                            <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                              +{hero.getSupportedFeatures().length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Tags</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {hero.getTags().slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        v{hero.getVersion()} • {hero.getHeroType()}
                      </div>
                    </div>

                    {/* Select Icon */}
                    <div className={`absolute top-2 right-2 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Pattern Count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Showing {filteredHeroes.length} of {allHeroes.length} hero patterns
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedHero}>
            <Settings className="w-4 h-4 mr-2" />
            {selectedHero && currentHeroId === selectedHero.id
              ? 'Configure Current'
              : 'Configure Pattern'
            }
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Hero Config Modal */}
      <HeroConfigModal
        isOpen={showConfigModal}
        onClose={handleConfigClose}
        heroWidget={selectedHero}
        initialData={initialData}
        onSave={handleConfigSave}
      />
    </Dialog>
  )
}