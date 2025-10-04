import React from "react";
import { AppleCardsCarousel } from "@/components/basic/carousel";
import { Section } from "@/components/ui/section";
import { AnimateEffect } from "@/components/common/animate-effect";

// Mock data for products/innovations
const mockProducts = [
    {
        id: '1',
        title: 'Smart ERP System',
        subtitle: 'Enterprise Solution',
        category: 'ERP',
        slug: 'smart-erp-system',
        coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop'
    },
    {
        id: '2',
        title: 'Modern POS Solution',
        subtitle: 'Retail Technology',
        category: 'POS',
        slug: 'modern-pos-solution',
        coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop'
    },
    {
        id: '3',
        title: 'Web Application Platform',
        subtitle: 'Custom Development',
        category: 'Web App',
        slug: 'web-app-platform',
        coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop'
    },
    {
        id: '4',
        title: 'Mobile Business App',
        subtitle: 'Mobile Solution',
        category: 'Mobile',
        slug: 'mobile-business-app',
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop'
    },
    {
        id: '5',
        title: 'Cloud Analytics Platform',
        subtitle: 'Data Intelligence',
        category: 'Analytics',
        slug: 'cloud-analytics-platform',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
    },
    {
        id: '6',
        title: 'AI-Powered CRM',
        subtitle: 'Customer Management',
        category: 'CRM',
        slug: 'ai-powered-crm',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop'
    }
];

export const Product = async () => {
    // Use mock data instead of database call
    const products = mockProducts.slice(0, 6);

    const cards = products.map((product) => ({
        src: product.coverImage || '',
        title: product.title,
        category: product.subtitle || product.category || 'Innovation',
        link: `/innovation/${product.slug}`,
    }));

    return (
        <Section className="w-full h-[100vh] bg-gradient-to-b from-background to-muted/30 flex flex-col">
            <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
                <AnimateEffect index={0}>
                    <h2 className="pl-4 text-4xl md:text-5xl font-bold text-foreground font-sans mb-8">
                        OUR INNOVATION
                    </h2>
                </AnimateEffect>
                <div className="flex-1">
                    <AnimateEffect index={1}>
                        <AppleCardsCarousel cards={cards} />
                    </AnimateEffect>
                </div>
            </div>
        </Section>
    );
};

