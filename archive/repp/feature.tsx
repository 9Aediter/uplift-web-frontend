import React from "react";
import {
    BarChart,
    Calendar,
    CheckCircle2,
    Gift,
    LineChart,
    MessageCircle,
    Smartphone,
    Target,
    Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

export const features = {
  member: {
    icon: Smartphone,
    title: "For Members",
    variant: "secondary",
    items: [
      {
        title: "Mobile check-in via QR or LINE",
        description: "No more forgotten cards or waiting in line. Quick access with your phone.",
        icon: Smartphone,
      },
      {
        title: "Calendar-based class & trainer booking",
        description: "Book your favorite classes and trainers with just a few taps.",
        icon: Calendar,
      },
      {
        title: "Real-time gym traffic display",
        description: "Check how busy the gym is before you go. Plan your workout during quieter times.",
        icon: BarChart,
      },
      {
        title: "LINE integration",
        description: "Communicate with members directly through their preferred messaging platform.",
        icon: MessageCircle,
      },
    ],
  },
  owner: {
    icon: LineChart,
    title: "For Owners",
    variant: "outline",
    items: [
      {
        title: "Daily revenue dashboard",
        description: "See your gym's financial performance at a glance with real-time updates.",
        icon: LineChart,
      },
      {
        title: "Staff performance tracking",
        description: "Monitor staff productivity, class attendance, and member satisfaction.",
        icon: CheckCircle2,
      },
      {
        title: "Ad tracking: clicks → signups → revenue",
        description: "See exactly which marketing efforts are paying off and optimize your spending.",
        icon: Target,
      },
      {
        title: "CRM system: birthday offers, inactive user reminders",
        description: "Automated retention tools to keep members engaged and coming back.",
        icon: Gift,
      },
      {
        title: "LINE integration",
        description: "Communicate with members directly through their preferred messaging platform.",
        icon: MessageCircle,
      },
    ],
  },
};

const FeatureGroup = ({ group }: { group: typeof features.member }) => (
  <div className="reveal">
    <div className="flex items-center mb-8">
      <div className="bg-[#007AFF]/10 p-3 rounded-full">
        <Users size={24} className="text-[#007AFF]" />
      </div>
      <h3 className="text-2xl font-semibold ml-4 text-foreground/80">{group.title}</h3>
    </div>
    <div className="grid gap-8">
      {group.items.map((item, idx) => (
        <Card key={idx} className="flex feature-card p-8 rounded-xl shadow-sm">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#007AFF]/10 text-[#007AFF]">
              <item.icon size={24} />
            </div>
          </div>
          <CardContent className="p-0">
            <h4 className="text-lg font-medium text-foreground">{item.title}</h4>
            <p className="mt-2 text-foreground/60">{item.description}</p>
            <div className="mt-2">
              <Badge variant={group.variant as "secondary" | "outline" | "default" | "destructive" | undefined}>{group.title.split(" ")[1]}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="h-fit bg-gradient-to-b from-black/10 to-white/20 py-16 md:py-24" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <AnimateEffect index={0}> {/* H2 */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground/80 mb-4">
              What <span className="text-[#007AFF]">Repp</span> Offers
            </h2>
          </AnimateEffect>
          <AnimateEffect index={1}> {/* P */}
            <p className="text-xl text-foreground/50 max-w-3xl mx-auto">
              Comprehensive solutions for both members and owners
            </p>
          </AnimateEffect>
        </div>
        <div className="grid md:grid-cols-2 gap-16">
          <AnimateEffect index={2}> {/* Member Features */}
            <FeatureGroup group={features.member} />
          </AnimateEffect>
          <AnimateEffect index={3}> {/* Owner Features */}
            <FeatureGroup group={features.owner} />
          </AnimateEffect>
        </div>
      </div>
      <div className="section-divider mt-16"></div>
    </section>
  );
};
export default FeaturesSection;