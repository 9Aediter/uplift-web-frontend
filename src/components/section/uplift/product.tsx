import React from "react";
import { AppleCardsCarousel } from "@/components/carousel";
import { Section } from "@/components/ui/section";
import { AnimateEffect } from "@/components/animate-effect";
import { getAllInnovations } from "@/lib/actions/innovationActions";

export const Product = async () => {
    const products = await getAllInnovations({ limit: 6 });
    
    // Debug log for server issues
    console.log('Products loaded:', products.length);
    console.log('Sample coverImage:', products[0]?.coverImage);

    const cards = products.map((product, index) => {
        // Check if S3 image exists and is valid, otherwise use fallback
        const isS3Image = product.coverImage?.includes('s3.ap-southeast-1.amazonaws.com');
        const fallbackImage = `https://images.unsplash.com/photo-${1518020382113 + index * 100}-2a4b9c7d4b4c?w=600&h=400&fit=crop&auto=format`;
        
        return {
            src: isS3Image ? fallbackImage : (product.coverImage || fallbackImage),
            title: product.title,
            category: product.subtitle || product.category || 'Innovation',
            link: `/innovation/${product.slug}`,
        };
    });

    return (
        <Section className="w-full h-[80vh] sm:h-[100vh] bg-gradient-to-b from-black to-gray-900/30 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <AnimateEffect index={0}>
                    <h2 className="pl-4 text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                        OUR INNOVATION
                    </h2>
                </AnimateEffect>
                <AnimateEffect index={1}>
                    <AppleCardsCarousel cards={cards} />
                </AnimateEffect>
            </div>
        </Section>
    );
};

