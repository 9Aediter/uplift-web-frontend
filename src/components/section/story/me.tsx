import { personalData } from "@/data/personal-data";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import ReactMarkdown from "react-markdown";

function AboutSection() {
    return (
        <Section id="about" className="w-full max-w-7xl h-[100vh] flex mx-auto justify-center items-center">
            <div className="relative my-12 lg:my-16 h-fit">
                <div className="absolute flex-col items-center hidden lg:flex top-16 -right-8">
                    <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
                        ABOUT ME
                    </span>
                    <span className="h-36 w-[2px] bg-[#1a1443]"></span>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                The Innovator
                            </span>
                        </h2>
                        <div className="text-sm text-gray-200 lg:text-lg prose text-justify">
                            <ReactMarkdown>
                                {personalData.description}
                            </ReactMarkdown>
                        </div>
                    </div>
                    <div className="flex justify-center order-1 lg:order-2">
                        <Image
                            src={personalData.profile}
                            width={400}
                            height={400}
                            alt="Profile"
                            className="transition-all duration-1000 rounded-lg cursor-pointer grayscale hover:grayscale-0 hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default AboutSection;
