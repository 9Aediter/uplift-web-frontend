import React from "react";
import { Code, Dumbbell } from "lucide-react";
import { Card } from "@/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

const teamMembersData = [
    {
        title: "The Developer Team",
        description: "We&apos;ve built systems for gyms for over 5 years. We know what works and what doesn&apos;t.",
        icon: Code,
        iconBgColor: "bg-blue-100",
        iconTextColor: "text-blue-600",
        avatarSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        avatarFallback: "DT",
        alt: "Developer Team Lead",
    },
    {
        title: "The Gym Owners",
        description: "We&apos;ve run gyms for a decade and know exactly what frustrates owners and members alike.",
        icon: Dumbbell,
        iconBgColor: "bg-green-100",
        iconTextColor: "text-green-600",
        avatarSrc: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        avatarFallback: "GO",
        alt: "Gym Owner Advisor",
    },
];

interface TeamCardListProps {
    members: typeof teamMembersData;
}

const TeamCardList: React.FC<TeamCardListProps> = ({ members }) => (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {members.map((member, index) => (
            <Card
                key={index}
                className="rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="w-full flex items-center justify-center">
                    <div className={`${member.iconBgColor} p-4 rounded-full mb-6 flex items-center justify-center w-16 h-16`}>
                        <member.icon size={32} className={`${member.iconTextColor} m-auto`} />
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.title}</h3>
                <p className="text-gray-600 mb-4">
                    {member.description}
                </p>
                <div className="mt-4 flex justify-center">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={member.avatarSrc} alt={member.alt} />
                        <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                    </Avatar>
                </div>
            </Card>
        ))}
    </div>
);

const TeamSection = () => {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <AnimateEffect index={0}> {/* H2 */}
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Who's Behind It?
                        </h2>
                    </AnimateEffect>
                    <AnimateEffect index={1}> {/* P */}
                        <p className="text-xl text-foreground/50 max-w-3xl mx-auto">
                            Built by a Tech Lead & Real Gym Owners<br/>We understand both
                            operations and member experience.
                        </p>
                    </AnimateEffect>
                </div>
                <AnimateEffect index={2}> {/* TeamCardList */}
                    <TeamCardList members={teamMembersData} />
                </AnimateEffect>
            </div>
        </section>
    );
};

export default TeamSection;