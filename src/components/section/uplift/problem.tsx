import React from "react";
import { Section } from "@/components/ui/section";
import { Card } from "../../card";
import {
  TrendingUpIcon,
  ZapIcon,
  BarChartIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

// ฟังก์ชันสำหรับสร้าง delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const Problems = React.forwardRef<HTMLDivElement>(async (props, ref) => {
  // เพิ่ม delay 10 วินาที
  await delay(0);

  const challenges = [
    {
      title: "Market Disruption",
      description:
        "Traditional industries are ripe for innovation. We help you become the disruptor, not the disrupted.",
      icon: <TrendingUpIcon className="w-8 h-8 text-cyan-400" />,
      glowColor: "cyan",
    },
    {
      title: "Digital Transformation",
      description:
        "Organizations struggle to evolve digitally. Our solutions accelerate your transformation journey.",
      icon: <ZapIcon className="w-8 h-8 text-fuchsia-400" />,
      glowColor: "magenta",
    },
    {
      title: "Data-Driven Decisions",
      description:
        "Companies drown in data but starve for insights. We turn your data into strategic advantages.",
      icon: <BarChartIcon className="w-8 h-8 text-amber-400" />,
      glowColor: "blue",
    },
    {
      title: "Innovation Velocity",
      description:
        "Speed-to-market determines winners. Our agile approach accelerates your innovation cycle.",
      icon: <RefreshCcwIcon className="w-8 h-8 text-green-400" />,
      glowColor: "lime",
    },
  ];
  return (
    <Section ref={ref} id="problem" className="bg-black flex flex-col justify-center h-full md:h-[100vh]">
      <div className="w-full max-w-7xl px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Challenges We Solve
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In today's rapidly evolving landscape, innovation isn't optional—it's
            essential for survival.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {challenges.map((challenge, index) => {
            // const controls = useAnimation(); // ลบออก
            // const variants = { // ลบออก
            //   hidden: { opacity: 0, y: 50 }, // ลบออก
            //   visible: { opacity: 1, y: 0 }, // ลบออก
            // }; // ลบออก

            return (
              <AnimateEffect key={index} index={index}> {/* ใช้ AnimateEffect */}
                <Card
                  className="p-6 group hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all duration-300"
                  glowColor={challenge.glowColor}
                >
                  <div className="mb-4 relative">
                    <div className="absolute -left-2 -top-2 w-14 h-14 bg-card/80 rounded-lg flex items-center justify-center border border-border group-hover:border-cyan-500/50 transition-colors">
                      {challenge.icon}
                    </div>
                    <div className="ml-16 pl-2">
                      <h3 className="text-foreground text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                        {challenge.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-gray-300 transition-colors">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="text-xs text-muted-foreground mr-2">Industry Impact:</div>
                    <div className="w-full h-1 bg-input overflow-hidden rounded-full">
                      <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>
                </Card>
              </AnimateEffect>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Problems.displayName = 'Problems';
export default Problems;
