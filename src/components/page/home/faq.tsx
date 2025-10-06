"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services does UPLIFT Technology provide?",
    answer: "We provide comprehensive technology solutions including web development, mobile app development, cloud solutions, ERP systems, POS solutions, and custom software development tailored to your business needs.",
  },
  {
    question: "How long does it take to develop a custom software solution?",
    answer: "Development time varies based on project complexity. Typically, a basic web application takes 2-3 months, while more complex enterprise solutions may take 4-6 months or more. We'll provide a detailed timeline during the consultation phase.",
  },
  {
    question: "Do you offer maintenance and support after project completion?",
    answer: "Yes, we offer comprehensive maintenance and support packages. Our team provides ongoing technical support, security updates, feature enhancements, and performance optimization to ensure your solution runs smoothly.",
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern tech stacks including Next.js, React, Node.js, TypeScript, Python, and cloud platforms like AWS and Azure. We always use the best technology suited for your specific requirements.",
  },
  {
    question: "Can you integrate with existing systems?",
    answer: "Absolutely! We have extensive experience integrating new solutions with legacy systems, third-party APIs, and existing databases. We ensure seamless data flow and minimal disruption to your current operations.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. Pricing depends on project scope, complexity, and timeline. Contact us for a detailed quote.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Got questions? We've got answers. Find everything you need to know about our services.
            </p>

            {/* CTA - Visible on Desktop */}
            <div className="hidden lg:block">
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <a
                href="/consult"
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0175BC', color: 'white' }}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          {/* Right Side - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
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
                Still have questions?
              </p>
              <a
                href="/consult"
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: '#0175BC', color: 'white' }}
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
