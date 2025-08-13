import React from 'react';
import { Section } from '@/components/ui/section';
import { BentoGridClient as BentoGrid, BentoGridItemClient as BentoGridItem } from '@/components/gridcard/bento-grid-client';
import { AnimateEffect } from '@/components/animate-effect';
import { ReusableModal } from '@/components/modal';
import {
  FaShippingFast,
  FaWarehouse,
  FaCashRegister,
  FaHotel,
  FaTruck,
  FaDumbbell,
  FaCheck,
  FaCode
} from 'react-icons/fa';

interface SolutionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  bgColor: string;
  className?: string;
  modalContent: {
    fullDescription: string;
    features: string[];
    techStack: string[];
    images: string[];
  };
}

const mockSolutionData: SolutionItem[] = [
  {
    title: "Laundry Operation System",
    description: "ระบบติดตามการซักรีดครบวงจร รองรับเครือข่ายระดับประเทศ",
    icon: <FaShippingFast />,
    image: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755080060582-s7qvzu2t2rh-view-laundromat-room-with-washing-machines.jpg",
    bgColor: "bg-sky-100 dark:bg-sky-900/20",
    className: "md:col-span-1",
    modalContent: {
      fullDescription: "ระบบบริหารจัดการการซักรีดแบบครบวงจร พร้อมด้วยระบบติดตามสถานะการดำเนินงานแบบเรียลไทม์ รองรับการขยายธุรกิจระดับเครือข่ายทั่วประเทศ",
      features: ["ระบบติดตามสถานะแบบ Real-time", "การจัดการลูกค้าและคำสั่งซื้อ", "ระบบบัญชีและรายงาน", "รองรับหลายสาขา"],
      techStack: ["React.js", "Node.js", "PostgreSQL", "Redis"],
      images: [
        "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg",
        "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755080060582-s7qvzu2t2rh-view-laundromat-room-with-washing-machines.jpg"
      ]
    }
  },
  {
    title: "Laundry Tracking Core",
    description: "เรียลไทม์ติดตาม ลดเวลาสูญเปล่า เพิ่มความแม่นยำ",
    icon: <FaShippingFast />,
    image: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg",
    bgColor: "bg-sky-100 dark:bg-sky-900/20",
    className: "md:col-span-1",
    modalContent: {
      fullDescription: "ระบบติดตามหลักสำหรับการซักรีด ช่วยลดเวลาสูญเปล่าและเพิ่มความแม่นยำในการติดตามสถานะผ้า",
      features: ["QR Code Tracking", "Auto Status Update", "Customer Notification", "Quality Control"],
      techStack: ["Flutter", "Firebase", "Node.js", "MongoDB"],
      images: [
        "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg"
      ]
    }
  },
  {
    title: "Smart Gym Management",
    description: "ระบบบริหารฟิตเนส สมาชิก อุปกรณ์ คลาส แบบครบวงจร",
    icon: <FaDumbbell />,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    className: "md:col-span-1",
    modalContent: {
      fullDescription: "ระบบบริหารจัดการศูนย์ออกกำลังกายแบบสมาร์ท ครอบคลุมการจัดการสมาชิก อุปกรณ์ และคลาสเรียนต่างๆ",
      features: ["จัดการสมาชิกและแพ็กเกจ", "จองคลาสออนไลน์", "ระบบเข้า-ออก IoT", "รายงานการใช้งาน"],
      techStack: ["Vue.js", "Laravel", "MySQL", "IoT Integration"],
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&auto=format"
      ]
    }
  },
  {
    title: "Warehouse Management",
    description: "ระบบคลังสินค้าอัตโนมัติ เชื่อมต่อ Automation ลดต้นทุนแรงงาน",
    icon: <FaWarehouse />,
    image: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081511881-7r0uq54z3v5-interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    className: "md:col-span-2",
    modalContent: {
      fullDescription: "ระบบบริหารคลังสินค้าอัตโนมัติที่เชื่อมต่อกับระบบ Automation เพื่อลดต้นทุนแรงงานและเพิ่มประสิทธิภาพ",
      features: ["Automated Inventory Management", "Barcode/RFID Integration", "Pick & Pack Optimization", "Real-time Dashboard"],
      techStack: ["React.js", "Python", "PostgreSQL", "RFID/Barcode", "Automation APIs"],
      images: [
        "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081511881-7r0uq54z3v5-interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg"
      ]
    }
  },
  {
    title: "Retail POS System",
    description: "ขายหน้าร้าน+ออนไลน์ จัดการหลายสาขา ชำระเงินครบรูปแบบ",
    icon: <FaCashRegister />,
    image: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081810814-csakbmjowd6-possystemcashier.jpg",
    bgColor: "bg-gray-100 dark:bg-gray-900/20",
    className: "md:col-span-1",
    modalContent: {
      fullDescription: "ระบบจุดขายครบครันสำหรับขายหน้าร้านและออนไลน์ รองรับการจัดการหลายสาขาพร้อมระบบชำระเงินครบรูปแบบ",
      features: ["Multi-channel Sales", "Inventory Sync", "Payment Gateway", "Multi-branch Management"],
      techStack: ["Angular", "Express.js", "MongoDB", "Payment APIs"],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format"
      ]
    }
  },
  {
    title: "Transport Management",
    description: "บริหารยานพาหนะ วางแผนเส้นทาง ติดตามเรียลไทม์",
    icon: <FaTruck />,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=600&fit=crop&auto=format",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    className: "md:col-span-1",
    modalContent: {
      fullDescription: "ระบบบริหารการขนส่งและยานพาหนะ วางแผนเส้นทางอัตโนมัติและติดตามสถานะแบบเรียลไทม์",
      features: ["Route Optimization", "GPS Tracking", "Fuel Management", "Driver Performance"],
      techStack: ["React Native", "Google Maps API", "GPS Integration", "Node.js"],
      images: [
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop&auto=format"
      ]
    }
  },
  {
    title: "Hotel Booking System",
    description: "ระบบจองโรงแรม 5 ดาว Dynamic Pricing เพิ่ม RevPAR",
    icon: <FaHotel />,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&auto=format",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    className: "md:col-span-2",
    modalContent: {
      fullDescription: "ระบบจองโรงแรมระดับ 5 ดาวพร้อมระบบ Dynamic Pricing ที่ช่วยเพิ่ม Revenue Per Available Room (RevPAR)",
      features: ["Dynamic Pricing Engine", "Channel Management", "Guest Experience", "Revenue Analytics"],
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Payment Gateway", "Analytics"],
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop&auto=format"
      ]
    }
  }
];

// Solution Card Component with Modal
const SolutionCard = ({ item }: { 
  item: SolutionItem;
}) => {
  return (
    <ReusableModal
      trigger={
        <BentoGridItem
          title={item.title}
          description={item.description}
          icon={item.icon}
          image={item.image}
          bgColor={item.bgColor}
        />
      }
      title={item.title}
      description={item.modalContent.fullDescription}
      images={item.modalContent.images}
      summary={[
        ...item.modalContent.features.map(feature => ({
          icon: <FaCheck className="text-green-500" />,
          text: feature
        })),
        ...item.modalContent.techStack.map(tech => ({
          icon: <FaCode className="text-blue-500" />,
          text: tech
        }))
      ]}
      buttons={[
        { label: "Close", variant: "secondary" as const },
        { label: "Learn More", variant: "primary" as const, path: "/solutions" }
      ]}
      triggerClassName={item.className}
      triggerAsDiv={true}
    />
  );
};

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
              <SolutionCard key={i} item={item} />
            ))}
          </BentoGrid>
        </AnimateEffect>
      </div>
    </Section>
  );
};