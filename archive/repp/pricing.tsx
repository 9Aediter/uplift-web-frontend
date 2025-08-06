import React from "react";
import { pricingPlansData, PricingCardList } from "./pricing-support";
import { Card } from "@/components/card";
import { AnimateEffect } from "@/components/animate-effect";

// รวม icons ที่รองรับไว้ตรงนี้
import { FaCheckCircle } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { MdUpgrade } from "react-icons/md";

const PricingSection = () => {
    return (
        <section className="h-fit bg-background py-16 md:py-24" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <AnimateEffect index={0}>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Pricing Model
                        </h2>
                    </AnimateEffect>
                    <AnimateEffect index={1}>
                        <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
                            Transparent pricing with no hidden fees
                        </p>
                    </AnimateEffect>
                </div>

                <AnimateEffect index={1}>
                    <PricingCardList plans={pricingPlansData} />
                </AnimateEffect>

                <div className="mt-20 max-w-4xl mx-auto text-center">
                    <AnimateEffect index={3}>
                        <h3 className="text-3xl font-semibold text-foreground mb-6">
                            All Plans Include
                        </h3>
                    </AnimateEffect>
                    <AnimateEffect index={4}>
                        <BenefitsGrid />
                    </AnimateEffect>
                </div>
            </div>
        </section>
    );
};
export default PricingSection;

export const benefitsData = [
    {
        icon: "FaCheckCircle", // จาก react-icons/fa
        text: "One-time payment — you own the system",
    },
    {
        icon: "FiDollarSign", // จาก react-icons/fi
        text: "Lightweight monthly fee for hosting & support",
    },
    {
        icon: "MdUpgrade", // จาก react-icons/md
        text: "Optional feature upgrades anytime",
    },
];


// map ชื่อ icon string → เป็น Component จริง
const iconMap = {
    FaCheckCircle: FaCheckCircle,
    FiDollarSign: FiDollarSign,
    MdUpgrade: MdUpgrade,
};

export const BenefitsGrid = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {benefitsData.map(({ icon, text }, index) => {
                const IconComponent = iconMap[icon as keyof typeof iconMap];
                return (
                    <Card key={index} className="flex flex-col items-center p-6">
                        <div className="w-full flex justify-center pb-2">
                            {IconComponent && <IconComponent className="h-8 w-8 text-green-500 mb-2" />}
                        </div>
                        <p className="text-foreground/50 text-center">{text}</p>
                    </Card>
                );
            })}
        </div>
    );
};
