import React from 'react'
import { Section } from '@/components/ui/section'
import { SearchIcon } from 'lucide-react'

interface Category {
    id: string;
    name: string;
}

interface SolutionHeroProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    categories: Category[];
}

export const SolutionHero: React.FC<SolutionHeroProps> = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory, categories }) => {
    return (
        <Section className=" mx-auto h-[50vh] flex flex-col justify-end bg-gradient-to-b from-black to-gray-900/30">
            <div className="max-w-7xl w-full mx-auto">
                <div className="text-center mb-14">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            OUR SOLUTIONS
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        แหล่งรวมความรู้ บทความ และเทรนด์ล่าสุดด้านซอฟต์แวร์ เทคโนโลยี
                        และการพัฒนาธุรกิจ
                    </p>
                </div>
                {/* Search and Filter */}
                <div className="flex flex-col max-w-7xl justify-between items-center mb-12 gap-12 ">
                    <div className="flex relative w-[50%]">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-2 pl-10 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeCategory === category.id ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
