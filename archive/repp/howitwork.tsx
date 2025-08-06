import React from "react";
import {LineChart, Rocket, Settings, TrendingUp} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/card";
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

const howItWorksData = [
    {
        step: 1,
        icon: Settings,
        title: "Setup",
        description: "We configure the system to match your gym&apos;s specific needs and workflows",
    },
    {
        step: 2,
        icon: Rocket,
        title: "Launch",
        description: "Go live with seamless member onboarding and staff training",
    },
    {
        step: 3,
        icon: LineChart,
        title: "Track",
        description: "Monitor key metrics and optimize your operations in real-time",
    },
    {
        step: 4,
        icon: TrendingUp,
        title: "Grow",
        description: "Leverage data insights to expand your business and increase revenue",
    },
];

interface HowItWorksCardListProps {
    cards: typeof howItWorksData;
}

const HowItWorksCardList: React.FC<HowItWorksCardListProps> = ({ cards }) => (
    <div className="grid md:grid-cols-4 gap-6">
        {cards.map((cardData, index) => (
            <AnimateEffect key={index} index={index}> {/* ห่อหุ้มด้วย AnimateEffect */}
                <Card
                    className="rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center reveal h-full">
                    <div className="w-full flex items-center justify-center">
                    <div className="bg-[#007AFF]/10 p-4 rounded-full mb-4 relative">
                        <cardData.icon size={28} className="text-[#007AFF]"/>
                        <div
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center font-bold">
                            {cardData.step}
                        </div>
                    </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{cardData.title}</h3>
                    <p className="text-gray-600">
                        {cardData.description}
                    </p>
                </Card>
            </AnimateEffect>
        ))}
    </div>
);

const HowItWorksSection = () => {
    return (
        <section className="bg-background py-16 md:py-24 relative" id="how-it-works">
            <div className="absolute inset-0 z-0 bg-texture"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 reveal">
                    <AnimateEffect index={0}> {/* H2 */}
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground/80 mb-4">
                            How <span className="text-[#007AFF]">Repp</span> Works
                        </h2>
                    </AnimateEffect>
                    <AnimateEffect index={1}> {/* P */}
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Simple 4-step process to transform your gym operations
                        </p>
                    </AnimateEffect>
                </div>
                <AnimateEffect index={2}> {/* HowItWorksCardList */}
                    <HowItWorksCardList cards={howItWorksData} />
                </AnimateEffect>
                <AnimateEffect index={3}> {/* Ready to transform your gym? */}
                    <div className="mt-16 max-w-3xl mx-auto bg-[#1F1F1F] rounded-xl p-8 text-center text-white reveal">
                        <h3 className="text-2xl font-semibold mb-4">
                            Ready to transform your gym?
                        </h3>
                        <p className="mb-6">
                            Our team will guide you through every step of the implementation
                            process.
                        </p>
                        <Button
                            className="bg-[#007AFF] hover:bg-[#0066CC] text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                            Get Started
                        </Button>
                    </div>
                </AnimateEffect>
            </div>
            <div className="section-divider mt-16"></div>
        </section>
    );
};

export default HowItWorksSection;