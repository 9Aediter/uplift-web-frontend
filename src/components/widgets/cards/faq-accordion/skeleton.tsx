import React from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export const FaqAccordionSkeleton: React.FC = () => {
  const mockFaqs = [
    {
      question: "What services do you offer?",
      isOpen: true
    },
    {
      question: "How long does implementation take?",
      isOpen: false
    },
    {
      question: "Do you provide ongoing support?",
      isOpen: false
    }
  ]

  return (
    <div className="bg-background p-4 rounded-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Get answers to the most common questions
        </p>
      </div>

      {/* FAQ Accordion Preview */}
      <div className="space-y-3 scale-90 origin-top">
        {mockFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-start flex-1">
                <div className="text-blue-400 mr-3 flex-shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  faq.isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
            
            {faq.isOpen && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pl-7">
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Show collapsed items indicator */}
        <div className="text-center text-xs text-muted-foreground mt-2">
          ... and more questions
        </div>
      </div>
      
      {/* Widget Info */}
      <div className="text-center mt-4 pt-4 border-t border-muted">
        <p className="text-xs text-muted-foreground">
          FAQ Accordion • Interactive expandable questions
        </p>
      </div>
    </div>
  )
}