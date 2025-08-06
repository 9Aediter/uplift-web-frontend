import React from "react";
import HeroSection from "../../repp/hero";
import TeamSection from "../../repp/team";
import ProblemsSection from "../../repp/problem";
import FeaturesSection from "../../repp/feature";
import PricingSection from "../../repp/pricing";
import ContactSection from "../../repp/contract";
import HowItWorksSection from "../../repp/howitwork";
import DemoShowcaseSection from "../../repp/demo";
import { Function } from "../../repp/function"
import Footer from "../../repp/footer";

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
