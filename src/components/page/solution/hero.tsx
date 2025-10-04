import React from 'react'
import { Section } from '@/components/ui/section'

interface SolutionHeroProps {
}

export const SolutionHero: React.FC<SolutionHeroProps> = ({}) => {
    return (
        <Section className="mx-auto h-[100vh] lg:h-[60vh] flex flex-col justify-center lg:justify-end bg-gradient-to-b from-background via-background/80 to-muted/50">
            <div className="max-w-7xl w-full mx-auto">
                <div className="text-center mb-14">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                            OUR SOLUTIONS
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        แหล่งรวมความรู้ บทความ และเทรนด์ล่าสุดด้านซอฟต์แวร์ เทคโนโลยี
                        และการพัฒนาธุรกิจ
                    </p>
                </div>
            </div>
        </Section>
    )
}
