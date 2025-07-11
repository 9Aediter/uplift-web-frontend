import React from "react";
interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverEffect?: boolean;
}
export const Card = ({
  children,
  className = "",
  glowColor = "cyan",
  hoverEffect = true,
}: CardProps) => {
  const glowColors = {
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    magenta: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
    lime: "from-lime-500/20 via-lime-500/5 to-transparent",
    blue: "from-blue-500/20 via-blue-500/5 to-transparent",
  };

  // Determine the gradient class to use
  const selectedGlow =
    (glowColor && (glowColors as Record<string, string>)[glowColor]) ||
    glowColor ||
    glowColors.cyan;

  return (
    <div
      className={`
        relative rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800
        overflow-hidden
        ${hoverEffect ? "transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg" : ""}
        ${className}
      `}
    >
      {/* Inner glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${selectedGlow} opacity-30 pointer-events-none`}
      ></div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
      {/* Border highlight */}
      <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none"></div>
    </div>
  );
};
