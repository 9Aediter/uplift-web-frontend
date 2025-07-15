import React from 'react'
import { Section } from "@/components/ui/section"

export const Newsletter = () => {
    return (
        <Section className="flex items-center h-fit lg:h-[40vh] rounded-lg border bg-black border-gray-800 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Text */}
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h3 className="text-3xl font-bold mb-2">Stay Updated</h3>
                        <p className="text-gray-300">
                            รับบทความและอัพเดทล่าสุดจากเราทุกเดือน
                        </p>
                    </div>

                    {/* Input */}
                    <div className="w-full md:w-auto flex flex-col sm:flex-row">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full sm:w-80 px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-l-lg focus:outline-none focus:border-cyan-500 text-white mb-2 sm:mb-0"
                        />
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium px-6 py-2 rounded-r-lg hover:from-cyan-400 hover:to-blue-400 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    )
}
