import React from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/common/card'
import { CalendarIcon, UserIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Article } from '@/types/models/article'

const featuredArticles: Article[] = [
    {
        id: '235d48fa-5857-8058-8946-cfef0596cb57',
        title: '10 Software Trends ที่จะเปลี่ยนอนาคตธุรกิจในปี 2023',
        description:
            'เจาะลึกเทรนด์ซอฟต์แวร์ล่าสุดที่กำลังเปลี่ยนแปลงโลกธุรกิจ จาก AI และ Machine Learning ไปจนถึง Low-Code Development',
        category: 'Software Trends',
        url: 'https://www.notion.so/10-Software-Trends-2023-235d48fa585780588946cfef0596cb57',
        slug: '10-software-trends-2023',
    },
    {
        id: '235d48fa-5857-80ee-bc2f-e80f1b4c27d5',
        title: 'UX Design ที่ดีส่งผลต่อ Conversion Rate อย่างไร',
        description:
            'ศึกษาความสัมพันธ์ระหว่าง UX Design กับอัตราการ Convert และวิธีปรับปรุง UX เพื่อเพิ่มยอดขายอย่างมีประสิทธิภาพ',
        category: 'UX/UI',
        url: 'https://www.notion.so/UX-Design-Conversion-Rate-235d48fa585780eebc2fe80f1b4c27d5',
        slug: 'ux-design-conversion-rate',
    },
]

export const FeaturedArticles = () => {
    return (
        <Section className="h-fit lg:h-[60vh] flex justify-center items-center bg-gradient-to-b from-muted/30 to-background">
            <div className='max-w-7xl mx-auto'>
                <h2 className="text-2xl md:text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Featured Articles
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {featuredArticles.map((article, index) => (
                        <Link href={`/solutions/${article.slug}`} key={article.id}>
                            <Card
                                key={index}
                                className="p-0 overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
                                glowColor={index === 0 ? 'cyan' : 'magenta'}
                            >
                                <div className="relative h-60 overflow-hidden">
                                    {/* Placeholder image as Notion API doesn't directly provide image URLs in the database query */}
                                    <img
                                        src="https://via.placeholder.com/600x400?text=Featured+Article"
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center border border-border">
                                        <span className="text-sm font-medium text-foreground">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 text-foreground">{article.title}</h3>
                                    <p className="text-muted-foreground mb-4">{article.description}</p>
                                    {/* Date, Author, Read Time are not directly available from Notion API properties in the initial query */}
                                    <div className="flex justify-end">
                                        <button className="text-cyan-400 flex items-center font-medium hover:text-cyan-300 transition-colors">
                                            Read More <ArrowRightIcon className="h-4 w-4 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </Section>
    )
}
