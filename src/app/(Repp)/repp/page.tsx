import React from "react";
import HeroSection from "@/components/section/repp/hero";
import TeamSection from "@/components/section/repp/team";
import ProblemsSection from "@/components/section/repp/problem";
import FeaturesSection from "@/components/section/repp/feature";
import PricingSection from "@/components/section/repp/pricing";
import ContactSection from "@/components/section/repp/contract";
import HowItWorksSection from "@/components/section/repp/howitwork";
import DemoShowcaseSection from "@/components/section/repp/demo";
import { Function } from "@/components/section/repp/function"
import Footer from "@/components/section/repp/footer";

const page: React.FC = () => {
    return (
        <>
            <main>
                <HeroSection />
                <ProblemsSection />
                <Function />
                <TeamSection />
                <FeaturesSection />
                <HowItWorksSection />
                <DemoShowcaseSection />
                <PricingSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};

export default page;
