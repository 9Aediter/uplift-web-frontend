"use client"

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FaqAccordionProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  faqs?: Array<{
    question: string
    answer: string
  }>
  accentColor?: string
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Get answers to the most common questions about our services",
  backgroundColor = "bg-background",
  accentColor = "blue",
  faqs = []
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const getAccentColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-400',
      green: 'text-green-400',
      purple: 'text-purple-400',
      red: 'text-red-400',
      yellow: 'text-yellow-400',
      pink: 'text-pink-400',
      indigo: 'text-indigo-400',
      teal: 'text-teal-400'
    }
    return colorMap[color] || colorMap.blue
  }

  if (!faqs.length) {
    return (
      <div className={`${backgroundColor} py-16 md:py-24`}>
        <div className="max-w-4xl mx-auto text-center px-8">
          <p className="text-muted-foreground">No FAQs available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${backgroundColor} py-16 md:py-24`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-16 px-8 max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card hover:bg-accent/5 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/10 transition-colors"
                onClick={() =>
                  setActiveFaq(activeFaq === index ? null : index)
                }
              >
                <div className="flex items-start flex-1">
                  <div className={`${getAccentColorClass(accentColor)} mr-4 flex-shrink-0 mt-1`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-lg pr-4">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    activeFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {activeFaq === index && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="pl-9">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}