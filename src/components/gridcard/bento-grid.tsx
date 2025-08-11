import { cn } from "@/lib/utils";

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
  iconColor,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  bgColor?: string;
  iconColor?: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-xl border border-neutral-200 p-8 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:shadow-none overflow-hidden relative",
        bgColor || "bg-white dark:bg-black",
        className,
      )}
    >
      {/* Background Image with gradient overlay */}
      {image && (
        <div className="absolute inset-0 z-0 p-4">
          <img 
            src={image}
            alt={typeof title === 'string' ? title : 'Solution'} 
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
      )}
      
      {/* Icon in top-left corner with circular background */}
      {icon && (
        <div className="absolute top-6 left-6 z-10">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg",
            iconColor?.replace('text-', 'bg-') || "bg-gray-500"
          )}>
            {icon}
          </div>
        </div>
      )}
      
      {/* Content at bottom with gradient overlay */}
      <div className="relative z-10 mt-auto">
        <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 -m-4 rounded-b-xl">
          <div className="font-sans font-bold text-white mb-2">
            {title}
          </div>
          <div className="font-sans text-sm font-normal text-white/90">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
