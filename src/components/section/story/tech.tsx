// @flow strict
import { skillsData } from "@/data/skills";
import { skillsImage } from "@/data/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Section } from "@/components/ui/section"

export const Skills = () => {
    return (
        <Section
            id="skills"
            className="max-w-7xl w-full relative"
        >
            {/* <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20" /> */}

            <div className="w-full">
                <Marquee
                    gradient={false}
                    speed={80}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    delay={0}
                    play={true}
                    direction="left"
                >
                    {skillsData.map((skill, id) => (
                        <div
                            className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
                            key={id}
                        >
                            <div className="h-full w-full rounded-xl backdrop-blur-sm shadow-lg border border-cyan-500/20 dark:border-cyan-400/30 bg-white/10 dark:bg-slate-800/50 group-hover:scale-105 transition-all duration-500">
                                <div className="flex flex-col items-center justify-center gap-3 p-6">
                                    <div className="h-8 sm:h-10">
                                        <Image
                                            src={
                                                skillsImage(skill) || "/path/to/fallback-image.png"
                                            }
                                            alt={skill}
                                            width={40}
                                            height={40}
                                            className="w-auto h-full rounded-lg"
                                        />
                                    </div>
                                    <p className="text-sm text-slate-800 dark:text-white sm:text-lg font-medium">{skill}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </Section>
    );
}

