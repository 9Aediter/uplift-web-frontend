import React, { JSX } from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import { CalendarIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'

interface Article {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    icon: JSX.Element;
}
interface AllArticlesProps {
    articles: Article[];
    filteredArticles: Article[];
}

const categories = [
    {
        id: 'all',
        name: 'All Articles',
    },
    {
        id: 'software',
        name: 'Software Trends',
    },
    {
        id: 'ux',
        name: 'UX/UI',
    },
    {
        id: 'automation',
        name: 'Automation',
    },
    {
        id: 'martech',
        name: 'MarTech',
    },
    {
        id: 'case-study',
        name: 'Case Studies',
    },
]

export const AllArticles: React.FC<AllArticlesProps> = ({ articles, filteredArticles }) => {

    return (
        <Section className="bg-gradient-to-b from-gray-900/30 to-black">
            <div className="max-w-7xl mx-auto py-8 md:py-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Latest Articles
                    </span>
                </h2>
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article, index) => (
                            <Card
                                key={index}
                                className="p-0 overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                                glowColor={
                                    index % 3 === 0
                                        ? 'cyan'
                                        : index % 3 === 1
                                            ? 'blue'
                                            : 'magenta'
                                }
                            >
                                <div className="relative h-48 overflow-hidden">

                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                                        {article.icon}
                                        <span className="ml-2 text-xs font-medium">
                                            {categories.find((c) => c.id === article.category)?.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-300 mb-4 text-sm line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-400">
                                        <CalendarIcon className="h-3 w-3 mr-1" />
                                        <span className="mr-3">{article.date}</span>
                                        <span className="ml-auto">{article.readTime}</span>
                                    </div>
                                </div>
                            </Card>
                           
                ))}
            </div>
            ) : (
            <div className="text-center py-12 bg-gray-900/30 rounded-lg border border-gray-800">
                <SearchIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No articles found</h3>
                <p className="text-gray-400">
                    Try adjusting your search or filter criteria
                </p>
            </div>
                )}
        </div>
        </Section >
    )
}
