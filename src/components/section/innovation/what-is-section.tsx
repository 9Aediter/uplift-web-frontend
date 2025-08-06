import React from 'react';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface WhatIsSectionCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  imageUrl?: string;
  order: number;
}


interface WhatIsSectionProps {
  title?: string;
  subtitle?: string;
  cards?: WhatIsSectionCard[];
  systemName?: string;
}

export const WhatIsSection: React.FC<WhatIsSectionProps> = ({ 
  title,
  subtitle,
  cards,
  systemName 
}) => {
  // Default fallback content if no database data
  const defaultTitle = title || `What is ${systemName}?`;
  const defaultSubtitle = subtitle || "Comprehensive solution designed for modern business needs";
  
  const defaultCards = cards && cards.length > 0 ? cards : [
    {
      id: "1",
      title: "Business Management",
      description: "ช่วยให้การบันทึกข้อมูลการขายเป็นไปอย่างรวดเร็วและแม่นยำ",
      icon: "BarChart3Icon",
      iconColor: "text-blue-400",
      order: 0
    },
    {
      id: "2", 
      title: "Real-time Inventory",
      description: "จัดการสต็อกสินค้าแบบเรียลไทม์ ลดปัญหาของขาดหรือเกิน",
      icon: "PackageIcon",
      iconColor: "text-green-400",
      order: 1
    },
    {
      id: "3",
      title: "Data Analytics",
      description: "วิเคราะห์ข้อมูลการขายเพื่อช่วยในการตัดสินใจทางธุรกิจ",
      icon: "TrendingUpIcon", 
      iconColor: "text-purple-400",
      order: 2
    }
  ];

  // Sort cards by order
  const sortedCards = defaultCards.sort((a, b) => a.order - b.order);

  // Convert cards to carousel format
  const carouselCards = sortedCards.map((card, index) => (
    <Card 
      key={card.id}
      card={{
        src: card.imageUrl && card.imageUrl.trim() !== "" 
          ? card.imageUrl 
          : `https://images.unsplash.com/photo-${1518020382113 + index}-2a4b9c7d4b4c?w=500&h=300&fit=crop`,
        title: card.title,
        category: "Feature",
        content: <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
          <p className="text-gray-400 leading-relaxed">{card.description}</p>
        </div>
      }} 
      index={index}
    />
  ));

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {defaultTitle}
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {defaultSubtitle}
          </p>
        </div>
        
        <Carousel items={carouselCards} />
      </div>
    </section>
  );
};
