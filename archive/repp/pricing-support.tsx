import React from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const pricingPlansData = [
    {
        title: "Starter",
        price: "$999",
        period: "one-time",
        description: "Perfect for small gyms just getting started",
        features: [
            "Mobile check-in system",
            "Basic member management",
            "Simple revenue tracking",
            "$49/month maintenance",
        ],
        buttonText: "Get Started",
        buttonVariant: "default",
        isPopular: false,
        headerBg: "bg-gray-50",
        headerBorder: "border-gray-100",
        footerBg: "bg-gray-50",
        footerBorder: "border-gray-100",
    },
    {
        title: "Professional",
        price: "$2,499",
        period: "one-time",
        description: "Ideal for established gyms looking to grow",
        features: [
            "All Starter features",
            "LINE integration",
            "Class & trainer booking",
            "Staff performance tracking",
            "CRM system with automations",
            "$99/month maintenance",
        ],
        buttonText: "Request Demo",
        buttonVariant: "default",
        isPopular: true,
        headerBg: "bg-blue-50",
        headerBorder: "border-blue-100",
        footerBg: "bg-blue-50",
        footerBorder: "border-blue-100",
    },
    {
        title: "Enterprise",
        price: "$4,999",
        period: "one-time",
        description: "For multi-location gyms and franchises",
        features: [
            "All Professional features",
            "Multi-location management",
            "Advanced analytics & reporting",
            "Custom integrations",
            "Dedicated support team",
            "$199/month maintenance",
        ],
        buttonText: "Contact Sales",
        buttonVariant: "default",
        isPopular: false,
        headerBg: "bg-gray-50",
        headerBorder: "border-gray-100",
        footerBg: "bg-gray-50",
        footerBorder: "border-gray-100",
    },
];

interface PricingCardListProps {
    plans: typeof pricingPlansData;
}

export const PricingCardList: React.FC<PricingCardListProps> = ({ plans }) => (
    <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
            <Card
                key={index}
                className={`rounded-xl overflow-hidden shadow-sm border flex flex-col ${plan.isPopular ? "border-2 border-blue-500 transform scale-105 z-10" : "border-gray-100"}`}
            >
                <CardHeader className={`p-8 ${plan.headerBg} border-b ${plan.headerBorder}`}>
                    {plan.isPopular && (
                        <div className="absolute inset-x-0 -top-4 flex justify-center">
                            <Badge className="text-sm font-medium px-4 py-1 rounded-full">
                                Most Popular
                            </Badge>
                        </div>
                    )}
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                        {plan.title}
                    </CardTitle>
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="ml-2 text-gray-600">{plan.period}</span>
                    </div>
                    <p className="mt-4 text-gray-600">
                        {plan.description}
                    </p>
                </CardHeader>
                <CardContent className="p-8 flex-grow">
                    <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5"/>
                                <span className="ml-3 text-gray-600">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <div className={`p-6 ${plan.footerBg} border-t ${plan.footerBorder}`}>
                    <Button
                        className="w-full"
                    >
                        {plan.buttonText}
                    </Button>
                </div>
            </Card>
        ))}
    </div>
);
