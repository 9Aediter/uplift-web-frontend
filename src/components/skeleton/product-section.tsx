import { Skeleton } from "@/components/ui/skeleton";
import { Section } from "@/components/ui/section";

const ProductSkeletonCard = ({ isReversed = false }: { isReversed?: boolean }) => {
  return (
    <Section className={`py-16 md:py-24 bg-black`}>
      <div
        className={`flex flex-col px-8 max-w-7xl mx-auto ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
      >
        {/* Image Skeleton */}
        <div className="w-full md:w-1/2">
          <Skeleton className="w-full h-64 md:h-96 rounded-lg" />
        </div>
        {/* Content Skeleton */}
        <div className="w-full md:w-1/2">
          <Skeleton className="h-6 w-32 mb-4 rounded-full" /> {/* Subtitle */}
          <Skeleton className="h-10 w-3/4 mb-4" /> {/* Title */}
          <Skeleton className="h-4 w-full mb-2" /> {/* Description line 1 */}
          <Skeleton className="h-4 w-5/6 mb-8" /> {/* Description line 2 */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 rounded-full mr-3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 rounded-full mr-3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-6 w-6 rounded-full mr-3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" /> {/* Button */}
        </div>
      </div>
    </Section>
  );
};

export const ProductSectionSkeleton = () => {
  return (
    <>
      <ProductSkeletonCard />
      <ProductSkeletonCard isReversed={true} />
      <ProductSkeletonCard />
    </>
  );
};
