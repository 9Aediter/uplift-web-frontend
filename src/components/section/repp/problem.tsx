import React from "react";
import {Calendar, Clock, CreditCard, LineChart, Target, Users, UserX,} from "lucide-react";
import { Card } from "@/components/card";
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

const problemCardsData = [
    {
        title: "For Gym Members",
        icon: Users,
        iconBgColor: "bg-green-100",
        iconTextColor: "text-green-600",
        problemIconColor: "text-green-500",
        problems: [
            { icon: Clock, text: "Don't know when the gym is too crowded" },
            { icon: Calendar, text: "Booking trainers/classes is a hassle" },
            { icon: CreditCard, text: "Hate carrying a physical membership card" },
        ],
    },
    {
        title: "For Gym Owners",
        icon: Users,
        iconBgColor: "bg-blue-100",
                iconTextColor: "text-blue-600",
        problemIconColor: "text-blue-500",
        problems: [
            { icon: LineChart, text: "No real-time revenue tracking" },
            { icon: UserX, text: "Hard to measure staff performance" },
            { icon: Target, text: "No way to track ROI from ads" },
            { icon: Calendar, text: "No customer retention system" },
        ],
    },
];

interface ProblemCardListProps {
    cards: typeof problemCardsData;
}

const ProblemCardList: React.FC<ProblemCardListProps> = ({ cards }) => (
    <div className="grid md:grid-cols-2 gap-12">
        {cards.map((cardData, index) => (
            <AnimateEffect key={index} index={index}> {/* ห่อหุ้มด้วย AnimateEffect */}
                <Card className="rounded-xl p-6 lg:px-20 lg:py-16 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-10">
                        <div className={`${cardData.iconBgColor} p-3 rounded-full`}>
                            <cardData.icon size={24} className={cardData.iconTextColor}/>
                        </div>
                        <h3 className="text-3xl font-semibold ml-4 text-foreground/75">
                            {cardData.title}
                        </h3>
                    </div>
                    <ul className="px-4 space-y-6">
                        {cardData.problems.map((problem, problemIndex) => (
                            <li key={problemIndex} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <problem.icon size={20} className={cardData.problemIconColor}/>
                                </div>
                                <p className="text-lg ml-3 text-foreground/60">
                                    {problem.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            </AnimateEffect>
        ))}
    </div>
);

const ProblemsSection = () => {
    return (
        <section className="h-[80vh] bg-black py-16 md:py-24" id="problems">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <AnimateEffect index={0}> {/* H2 */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Problems You Face
                        </h2>
                    </AnimateEffect>
                    <AnimateEffect index={1}> {/* P */}
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We understand the challenges faced by both gym members and owners
                        </p>
                    </AnimateEffect>
                </div>
                <ProblemCardList cards={problemCardsData} />
            </div>
        </section>
    );
};
export default ProblemsSection;
