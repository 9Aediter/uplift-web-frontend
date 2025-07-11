import React from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/card'
import { CalendarIcon, UserIcon, ArrowRightIcon, TrendingUpIcon, LayoutIcon } from 'lucide-react'

const featuredArticles = [
    {
        title: '10 Software Trends ที่จะเปลี่ยนอนาคตธุรกิจในปี 2023',
        excerpt:
            'เจาะลึกเทรนด์ซอฟต์แวร์ล่าสุดที่กำลังเปลี่ยนแปลงโลกธุรกิจ จาก AI และ Machine Learning ไปจนถึง Low-Code Development',
        image:
            'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        category: 'software',
        date: '15 Jun 2023',
        author: 'Sarah Johnson',
        readTime: '8 min read',
        icon: <TrendingUpIcon className="h-6 w-6 text-cyan-400" />,
    },
    {
        title: 'UX Design ที่ดีส่งผลต่อ Conversion Rate อย่างไร',
        excerpt:
            'ศึกษาความสัมพันธ์ระหว่าง UX Design กับอัตราการ Convert และวิธีปรับปรุง UX เพื่อเพิ่มยอดขายอย่างมีประสิทธิภาพ',
        image:
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        category: 'ux',
        date: '2 Jul 2023',
        author: 'Maya Patel',
        readTime: '6 min read',
        icon: <LayoutIcon className="h-6 w-6 text-fuchsia-400" />,
    },
]

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

export const FeaturedArticles = () => {
    return (
        <Section className="h-[60vh] flex justify-center items-center bg-gradient-to-b from-gray-900/30 to-black">
            <div className='max-w-7xl mx-auto'>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Featured Articles
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {featuredArticles.map((article, index) => (
                        <Card
                            key={index}
                            className="p-0 overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                            glowColor={index === 0 ? 'cyan' : 'magenta'}
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                                    {article.icon}
                                    <span className="ml-2 text-sm font-medium">
                                        {categories.find((c) => c.id === article.category)?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                                <p className="text-gray-300 mb-4">{article.excerpt}</p>
                                <div className="flex items-center text-sm text-gray-400 mb-4">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    <span className="mr-4">{article.date}</span>
                                    <UserIcon className="h-4 w-4 mr-1" />
                                    <span>{article.author}</span>
                                    <span className="ml-auto">{article.readTime}</span>
                                </div>
                                <div className="flex justify-end">
                                    <button className="text-cyan-400 flex items-center font-medium hover:text-cyan-300 transition-colors">
                                        Read More <ArrowRightIcon className="h-4 w-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    )
}
