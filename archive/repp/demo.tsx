import React from "react";
import { Button } from "@/components/ui/button";
import { DemoAnimate } from "./animate/demo-animate"; // นำเข้า DemoAnimate
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

const DemoShowcaseSection = () => {
    const slides = [
        {
            title: "Mobile Check-in",
            description: "Members can check in with a simple QR code scan",
            image:
                "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Class Booking",
            description:
                "Intuitive calendar interface for booking classes and trainers",
            image:
                "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
        {
            title: "Revenue Dashboard",
            description: "Real-time analytics and financial tracking",
            image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        },
    ];
    return (
        <section className="bg-[#f5f5f7] py-16 md:py-24" id="demo-showcase">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <AnimateEffect index={0}> {/* H2 */}
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1F1F1F] mb-4">
                            Live Demo Showcase
                        </h2>
                    </AnimateEffect>
                    <AnimateEffect index={1}> {/* P */}
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See the system in action with our interactive demo
                        </p>
                    </AnimateEffect>
                </div>
                <AnimateEffect index={2}> {/* DemoAnimate */}
                    <DemoAnimate slides={slides} />
                </AnimateEffect>
            </div>
            <div className="section-divider mt-16"></div>
        </section>
    );
};

export default DemoShowcaseSection;
