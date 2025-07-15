import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Section } from "@/components/ui/section";
import { AnimateEffect } from "@/components/animate-effect";
import { getProducts } from "@/lib/actions/productActions";

export const Product = async () => {
    const products = await getProducts();

    const cards = products.map((product, index) => (
        <Card
            key={product.id}
            card={{
                src: product.image || '',
                title: product.title,
                category: product.subtitle, // Using subtitle as category
                link: product.link || '/coming-soon',
            }}
            index={index}
        />
    ));

    return (
        <Section className="w-full h-[70vh] sm:h-[100vh] bg-gradient-to-b from-black to-gray-900/30 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <AnimateEffect index={0}>
                    <h2 className="pl-4 text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                        OUR INNOVATION
                    </h2>
                </AnimateEffect>
                <AnimateEffect index={1}>
                    <Carousel items={cards} />
                </AnimateEffect>
            </div>
        </Section>
    );
};

