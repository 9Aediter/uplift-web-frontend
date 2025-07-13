import React from 'react';
import { Section } from '@/components/ui/section';
import { ShowAnimate } from './show-animate';

const Show = React.forwardRef<HTMLDivElement>((props, ref) => {
    const projects = [
        {
            title: 'Enterprise CMS Platform',
            description:
                'Custom content management system with advanced workflow automation',
            image:
                'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            tags: ['Next.js', 'Prisma', 'PostgreSQL'],
        },
        {
            title: 'E-commerce System',
            description:
                'High-performance storefront with custom inventory management',
            image:
                'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            tags: ['React', 'Node.js', 'AWS'],
        },
        {
            title: 'Analytics Dashboard',
            description:
                'Real-time data visualization platform for business intelligence',
            image:
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            tags: ['TypeScript', 'D3.js', 'Firebase'],
        },
    ];

    return (
        <Section
            ref={ref}
            id="Show"
            className="mx-auto h-[100vh] flex justify-center items-center bg-gradient-to-b from-black to-gray-900/30"
        >
            <div className="max-w-7xl px-8 flex flex-col h-fit">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            Showcase
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real systems built for real clients solving real problems.
                    </p>
                </div>
                <ShowAnimate projects={projects} />
            </div>
        </Section>
    );
});

Show.displayName = 'Show';

export default Show;
