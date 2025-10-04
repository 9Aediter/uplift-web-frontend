'use client'
import React, { useState } from 'react'
import Nav from '@/components/basic/nav/resnav'
import Footer from '@/components/layout/footer/footer'
import { SolutionHero } from '@/components/page/solution/hero'
import { FeaturedArticles } from '@/components/page/solution/featured-articles'
import { AllArticles } from '@/components/page/solution/all-articles'
import { Newsletter } from '@/components/page/solution/newsletter'
import { FileTextIcon, BarChartIcon, ZapIcon, LayoutIcon, TrendingUpIcon } from 'lucide-react'
import { Particles } from '@/components/page/home/hero/particles'

const SolutionsPage = () => {
    const [searchTerm] = useState('')
    const [activeCategory] = useState('all')

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

    const articles = [
        {
            title: 'Automation ในอุตสาหกรรมการผลิต: กรณีศึกษาจากลูกค้าจริง',
            excerpt:
                'เรียนรู้วิธีการที่บริษัทผลิตชิ้นส่วนอิเล็กทรอนิกส์ใช้ระบบอัตโนมัติเพื่อเพิ่มประสิทธิภาพการผลิตได้ถึง 35%',
            image:
                'https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            category: 'case-study',
            date: '20 Jun 2023',
            author: 'Alex Chen',
            readTime: '10 min read',
            icon: <FileTextIcon className="h-5 w-5 text-green-400" />,
        },
        {
            title: 'เจาะลึกเทคโนโลยี MarTech ที่ธุรกิจต้องมีในปี 2023',
            excerpt:
                'แนะนำเครื่องมือ MarTech ที่จำเป็นสำหรับธุรกิจยุคใหม่ พร้อมวิธีการเลือกใช้ให้เหมาะกับองค์กรของคุณ',
            image:
                'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            category: 'martech',
            date: '8 Jul 2023',
            author: 'Lisa Wang',
            readTime: '7 min read',
            icon: <BarChartIcon className="h-5 w-5 text-amber-400" />,
        },
        {
            title: 'How-to: สร้างระบบ Automation สำหรับงาน Back-office',
            excerpt:
                'คู่มือแนะนำขั้นตอนการสร้างระบบอัตโนมัติสำหรับงานหลังบ้าน เพื่อลดเวลาและข้อผิดพลาดจากการทำงานด้วยมือ',
            image:
                'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            category: 'automation',
            date: '30 Jun 2023',
            author: 'David Kim',
            readTime: '12 min read',
            icon: <ZapIcon className="h-5 w-5 text-blue-400" />,
        },
        {
            title: '5 หลักการออกแบบ UI ที่ช่วยให้ผู้ใช้ทำงานได้เร็วขึ้น',
            excerpt:
                'เรียนรู้หลักการออกแบบ User Interface ที่ช่วยเพิ่มประสิทธิภาพการทำงานของผู้ใช้ พร้อมตัวอย่างจากแอพพลิเคชันชั้นนำ',
            image:
                'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            category: 'ux',
            date: '12 Jul 2023',
            author: 'Emma Wilson',
            readTime: '5 min read',
            icon: <LayoutIcon className="h-5 w-5 text-fuchsia-400" />,
        },
        {
            title: 'No-Code vs Low-Code: เลือกแพลตฟอร์มไหนให้เหมาะกับธุรกิจคุณ',
            excerpt:
                'เปรียบเทียบข้อดีข้อเสียของแพลตฟอร์ม No-Code และ Low-Code พร้อมแนวทางการเลือกใช้ให้เหมาะกับความต้องการขององค์กร',
            image:
                'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
            category: 'software',
            date: '5 Jul 2023',
            author: 'Sarah Johnson',
            readTime: '9 min read',
            icon: <TrendingUpIcon className="h-5 w-5 text-cyan-400" />,
        },
    ]

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory =
            activeCategory === 'all' || article.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <>
            <Nav />
            <main className="w-full z-0">
                <div
                    className="absolute z-0 h-[100vh] w-full"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                    }}
                >
                    <Particles />
                </div>
                <SolutionHero
                // searchTerm={searchTerm}
                // setSearchTerm={setSearchTerm}
                // activeCategory={activeCategory}
                // setActiveCategory={setActiveCategory}
                // categories={categories}
                />
                <AllArticles articles={articles} filteredArticles={filteredArticles} />
                <FeaturedArticles />
                <Newsletter />
            </main>
            <Footer />
        </>
    )
}

export default SolutionsPage
