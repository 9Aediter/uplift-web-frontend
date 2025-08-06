import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Adding WhyNeedIt sections to existing products...')

  // Find AI Analytics Platform product
  const aiAnalyticsProduct = await prisma.product.findUnique({
    where: { slug: 'ai-analytics-platform' }
  });

  if (!aiAnalyticsProduct) {
    console.log('❌ AI Analytics Platform product not found');
    return;
  }

  // Check if WhyNeedIt section already exists
  const existingSection = await prisma.productSection.findFirst({
    where: {
      productId: aiAnalyticsProduct.id,
      sectionType: 'why_need_it'
    }
  });

  if (existingSection) {
    console.log('✅ WhyNeedIt section already exists for AI Analytics Platform');
    return;
  }

  // Create WhyNeedIt section
  const whyNeedItSection = await prisma.productSection.create({
    data: {
      productId: aiAnalyticsProduct.id,
      sectionType: 'why_need_it',
      title: 'Why Your Business Needs AI Analytics',
      subtitle: 'Transform your data into competitive advantages',
      order: 0
    }
  });

  // Create cards for WhyNeedIt section
  const whyNeedItCards = [
    {
      title: 'แก้ปัญหาหลังบ้านล่ม',
      description: 'ระบบที่เสถียรและเชื่อถือได้ ช่วยให้การดำเนินงานไม่สะดุด',
      icon: 'LightbulbIcon',
      iconColor: 'text-yellow-400',
      order: 0
    },
    {
      title: 'เชื่อมต่อยอดขายกับสต็อก',
      description: 'เห็นภาพรวมธุรกิจแบบเรียลไทม์ ตัดสินใจได้รวดเร็ว',
      icon: 'TrendingUpIcon',
      iconColor: 'text-green-400',
      order: 1
    },
    {
      title: 'บันทึกการขายที่เชื่อถือได้',
      description: 'ข้อมูลแม่นยำ ลดข้อผิดพลาด เพิ่มความน่าเชื่อถือ',
      icon: 'CodeIcon',
      iconColor: 'text-blue-400',
      order: 2
    }
  ];

  for (const cardData of whyNeedItCards) {
    await prisma.productCard.create({
      data: {
        sectionId: whyNeedItSection.id,
        ...cardData
      }
    });
  }

  console.log(`✅ Added WhyNeedIt section for ${aiAnalyticsProduct.title}`);
  console.log(`  - Section ID: ${whyNeedItSection.id}`);
  console.log(`  - Created ${whyNeedItCards.length} cards`);
  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })