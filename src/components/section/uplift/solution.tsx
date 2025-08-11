import React from 'react';
import { Section } from '@/components/ui/section';
import { BentoGrid, BentoGridItem } from '@/components/gridcard/bento-grid';
import { AnimateEffect } from '@/components/animate-effect';
import { cn } from '@/lib/utils';
import { 
  FaShippingFast, 
  FaWarehouse, 
  FaCashRegister, 
  FaHotel, 
  FaTruck,
  FaDumbbell
} from 'react-icons/fa';

interface SolutionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  bgColor: string;
  iconColor: string;
  className?: string;
}

const mockSolutionData: SolutionItem[] = [
  {
    title: "Laundry Operation System",
    description: "ระบบติดตามการซักรีดครบวงจร รองรับเครือข่ายระดับประเทศ",
    icon: <FaShippingFast />,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-sky-100 dark:bg-sky-900/20",
    iconColor: "bg-sky-600",
    className: "md:col-span-1",
  },
  {
    title: "Laundry Tracking Core",
    description: "เรียลไทม์ติดตาม ลดเวลาสูญเปล่า เพิ่มความแม่นยำ",
    icon: <FaShippingFast />,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-sky-100 dark:bg-sky-900/20",
    iconColor: "bg-sky-600",
    className: "md:col-span-1",
  },
  {
    title: "Warehouse Management",
    description: "ระบบคลังสินค้าอัตโนมัติ เชื่อมต่อ Automation ลดต้นทุนแรงงาน",
    icon: <FaWarehouse />,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&auto=format",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    iconColor: "bg-yellow-600",
    className: "md:col-span-2",
  },
  {
    title: "Retail POS System",
    description: "ขายหน้าร้าน+ออนไลน์ จัดการหลายสาขา ชำระเงินครบรูปแบบ",
    icon: <FaCashRegister />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-gray-100 dark:bg-gray-900/20",
    iconColor: "bg-gray-600",
    className: "md:col-span-1",
  },
  {
    title: "Hotel Booking System",
    description: "ระบบจองโรงแรม 5 ดาว Dynamic Pricing เพิ่ม RevPAR",
    icon: <FaHotel />,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&auto=format",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "bg-purple-600",
    className: "md:col-span-2",
  },
  {
    title: "Transport Management",
    description: "บริหารยานพาหนะ วางแผนเส้นทาง ติดตามเรียลไทม์",
    icon: <FaTruck />,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "bg-orange-600",
    className: "md:col-span-1",
  },
  {
    title: "Smart Gym Management",
    description: "ระบบบริหารฟิตเนส สมาชิก อุปกรณ์ คลาส แบบครบวงจร",
    icon: <FaDumbbell />,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    iconColor: "bg-green-600",
    className: "md:col-span-1",
  },
];

export const Solution = () => {
  return (
    <Section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateEffect index={0}>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Solutions & Expertise
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              ออกแบบและพัฒนาระบบสารสนเทศขนาดใหญ่สำหรับธุรกิจในหลากหลายอุตสาหกรรม
            </p>
          </div>
        </AnimateEffect>

        <AnimateEffect index={1}>
          <BentoGrid className="max-w-7xl mx-auto">
            {mockSolutionData.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                image={item.image}
                bgColor={item.bgColor}
                iconColor={item.iconColor}
                className={cn(item.className)}
              />
            ))}
          </BentoGrid>
        </AnimateEffect>
      </div>
    </Section>
  );
};