import React from 'react'

import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import { services, IconMap, getGradient } from '@/data/services'; // Import from new data file
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

const Services = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <Section
            ref={ref}
            id="services"
            className="h-full md:h-[100vh] flex justify-center items-center px-8 mx-auto bg-gradient-to-b from-background to-black"
        >
            <div className="flex flex-col max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            What I Offer
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Core services designed to transform your digital infrastructure from
                        the ground up.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const IconComponent = IconMap[service.icon]; // Get the icon component from IconMap

                        return (
                            <AnimateEffect key={index} index={index}

                            >
                                <Card
                                    key={index}
                                    className="p-6 group hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                                    glowColor={service.color as any}
                                >
                                    <div className="mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGradient(service.color)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {IconComponent && <IconComponent className="w-6 h-6" />}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                            {service.description}
                                        </p>
                                    </div>
                                    {/* Circuit board pattern */}
                                    <div className="w-full h-px bg-gray-800 mt-4 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent transition-all duration-1000"></div>
                                    </div>
                                    <div className="w-full h-8 relative">
                                        <div className="absolute top-0 left-1/4 h-full w-px bg-gray-800"></div>
                                        <div className="absolute top-0 left-3/4 h-full w-px bg-gray-800"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-px bg-gray-800"></div>
                                    </div>
                                </Card>
                            </AnimateEffect>
                        )
                    })}
                </div>
            </div>
        </Section>
    )
});
Services.displayName = 'Services';
export default Services;