import { cn } from "@/lib/utils";
import Image from "next/image";

// SSR-friendly base components without interactivity
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[24rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
  image,
  bgColor,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  bgColor?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/bento row-span-1 h-full min-h-[14rem] list-none",
        onClick && "cursor-pointer",
        className,
      )}
    >
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <div className={cn(
          "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6",
          bgColor || "bg-white dark:bg-black dark:shadow-[0px_0px_27px_0px_#2D2D2D]"
        )}>
          {/* Background Image with gradient overlay */}
          {image && (
            <div className="absolute inset-0 z-0">
              <Image 
                src={image}
                alt={typeof title === 'string' ? title : 'Solution'} 
                fill
                className="object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 rounded-xl"></div>
            </div>
          )}
          
          <div className="relative flex flex-1 flex-col justify-between gap-3 z-10">
            {/* Icon */}
            {icon && (
              <div className="w-fit rounded-lg border border-gray-600 dark:border-gray-400 p-2 bg-black/20 backdrop-blur-sm">
                <div className="text-white text-base">
                  {icon}
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="space-y-3">
              <h3 className="font-sans text-xl md:text-2xl font-semibold text-white">
                {title}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/90 line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
