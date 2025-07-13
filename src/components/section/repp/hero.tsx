import React from "react";
import { ArrowRight, Download, Smartphone, CheckCircle, Calendar, LineChart, LayoutDashboard } from "lucide-react";
import { FaLine } from "react-icons/fa6"; // สำหรับ Line Icon
import { Button } from "@/components/buttonsp"; // นำเข้า Button จาก buttonsp.tsx
import { HeroBgAnimate } from "./animate/hero-bg-animate"; // นำเข้า HeroBgAnimate
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

// Map คำกับ Icon Component (ไม่มี mr-2 แล้ว)
const getFeatureIcon = (feature: string) => {
    switch (feature) {
        case "Mobile":
            return <Smartphone size={28} />;
        case "Check-In":
            return <CheckCircle size={28} />;
        case "Class booking":
            return <Calendar size={28} />;
        case "LINE":
            return <FaLine size={28} />;
        case "Realtime Revenue":
            return <LineChart size={28} />;
        case "Dashboard":
            return <LayoutDashboard size={28} />;
        default:
            return null;
    }
};

// Map คำกับสี gradient
const getFeatureColor = (feature: string) => {
    switch (feature) {
        case "Mobile":
            return "from-blue-500 to-purple-500";
        case "Check-In":
            return "from-green-500 to-teal-500";
        case "Class booking":
            return "from-orange-500 to-red-500";
        case "LINE":
            return "from-lime-500 to-emerald-500";
        case "Realtime Revenue":
            return "from-pink-500 to-fuchsia-500";
        case "Dashboard":
            return "from-yellow-500 to-amber-500";
        default:
            return "from-gray-500 to-gray-700";
    }
};

const HeroSection = () => {
    const features = [
        "Mobile",
        "Check-In",
        "Class booking",
        "LINE",
        "Realtime Revenue",
        "Dashboard",
    ];

    return (
        <section className="h-[70vh] relative w-full text-white">

            {/* BG */}
            <HeroBgAnimate />

            {/* Content */}
            <div className="flex items-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 relative z-10">
                <AnimateEffect index={0}> {/* ห่อหุ้มด้วย AnimateEffect */}
                    <div className="w-full">
                        <AnimateEffect index={0}> {/* H1 */}
                            <div className="text-5xl md:text-7xl font-bold mb-6">
                                Run Your Gym
                                <ContainerTextFlip
                                    words={["Smarter", "Modern", "Awesome"]}
                                />
                            </div >

                        </AnimateEffect>
                        <AnimateEffect index={1}> {/* P */}
                            <p className="text-xl md:text-2xl mb-8">
                                Pay once. Use it forever. Simple monthly maintenance for peace of
                                mind.
                            </p>
                        </AnimateEffect>
                        <AnimateEffect index={2}> {/* Icons */}
                            <div className="flex flex-wrap items-center my-12 gap-x-4 gap-y-2">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${getFeatureColor(feature)} text-white`}
                                    >
                                        {getFeatureIcon(feature)}
                                    </div>
                                ))}
                            </div>
                        </AnimateEffect>
                        <AnimateEffect index={3}> {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    size="md"
                                    className="p-6"
                                >
                                    Request a Demo
                                    <ArrowRight size={20} className="ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="md"
                                    className="p-6"
                                >
                                    Download Feature Sheet
                                    <Download size={20} className="ml-2" />
                                </Button>
                            </div>
                        </AnimateEffect>
                    </div>
                </AnimateEffect>
            </div>
        </section>
    );
};

export default HeroSection;