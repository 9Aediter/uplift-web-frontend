import React from "react";
import Marquee from "react-fast-marquee";

interface Technology {
  id: string;
  name: string;
  slug: string;
  svgCode: string;
  category?: string;
}

interface TechStackProps {
  title?: string;
  subtitle?: string;
  technologies: Technology[];
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

interface TechCardProps {
  technology: Technology;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ technology, index }) => (
  <div
    className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
    key={index}
  >
    <div className="h-full w-full rounded-xl backdrop-blur-sm shadow-lg border border-cyan-500/20 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all duration-500 bg-white/5">
      <div className="flex flex-col items-center justify-center gap-3 p-6">
        <div className="h-8 sm:h-10 flex items-center justify-center">
          <div 
            dangerouslySetInnerHTML={{ __html: technology.svgCode }} 
            className="w-auto h-full [&>svg]:w-auto [&>svg]:h-full [&>svg]:max-w-10 [&>svg]:max-h-10 group-hover:drop-shadow-lg transition-all duration-500"
          />
        </div>
        <p className="text-sm text-white sm:text-lg font-medium group-hover:text-cyan-300 transition-colors duration-300">
          {technology.name}
        </p>
      </div>
    </div>
  </div>
);

export const TechStack: React.FC<TechStackProps> = ({
  title = "Technology Stack",
  subtitle = "Tools & technologies we use to build amazing products",
  technologies,
  speed = 80,
  direction = "left",
  pauseOnHover = true,
  className = ""
}) => {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 md:py-24 w-full ${className}`} id="tech-stack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tech Stack Marquee */}
        <div className="w-full">
          <Marquee
            gradient={false}
            speed={speed}
            pauseOnHover={pauseOnHover}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction={direction}
            className="py-4"
          >
            {technologies.map((tech, index) => (
              <TechCard
                key={`${tech.id}-${index}`}
                technology={tech}
                index={index}
              />
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
};