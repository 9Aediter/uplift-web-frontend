"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaButton: string;
  items: FAQItem[];
}

interface FAQProps {
  data: FAQData;
}

export function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { title, subtitle, ctaText, ctaButton, items } = data;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Side - Header (Sticky on Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {subtitle}
            </p>

            {/* CTA - Visible on Desktop */}
            <div className="hidden lg:block">
              <p className="text-muted-foreground mb-4">
                {ctaText}
              </p>
              <a
                href="/consult"
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0175BC', color: 'white' }}
              >
                {ctaButton}
              </a>
            </div>
          </motion.div>

          {/* Right Side - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-border rounded-2xl overflow-hidden bg-background hover:border-primary/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-lg font-semibold pr-8">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA - Visible on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-center lg:hidden"
            >
              <p className="text-muted-foreground mb-4">
                {ctaText}
              </p>
              <a
                href="/consult"
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0175BC', color: 'white' }}
              >
                {ctaButton}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
