import { PrismaClient, ContentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Skip content creation if already exists
  const existingContent = await prisma.content.findFirst({
    where: {
      pageSlug: 'home',
      sectionType: 'HERO_SECTION',
      language: 'en',
      status: ContentStatus.PUBLISHED
    }
  });

  let heroContentEn, heroContentTh;
  
  if (!existingContent) {
    // Create sample Hero Section content for English (without user requirement)
    heroContentEn = await prisma.content.create({
    data: {
      pageSlug: 'home',
      sectionType: 'HERO_SECTION',
      language: 'en',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      fields: {
        create: [
          {
            key: 'badge',
            label: 'Badge Text',
            type: 'SHORT',
            value: 'Innovating the Future',
            order: 0
          },
          {
            key: 'title_part1',
            label: 'Title Part 1',
            type: 'SHORT',
            value: 'Transforming',
            order: 1
          },
          {
            key: 'title_part2',
            label: 'Title Part 2',
            type: 'SHORT',
            value: 'Ideas Into',
            order: 2
          },
          {
            key: 'title_gradient1',
            label: 'Gradient Title 1',
            type: 'SHORT',
            value: 'Revolutionary',
            order: 3
          },
          {
            key: 'title_gradient2',
            label: 'Gradient Title 2',
            type: 'SHORT',
            value: 'Solutions',
            order: 4
          },
          {
            key: 'subtitle',
            label: 'Subtitle',
            type: 'LONG',
            value: "We're not just another tech startup. We're building the Future.",
            order: 5
          }
        ]
      },
      buttons: {
        create: [
          {
            label: 'Launch Button',
            text: 'Launch Your Vision',
            url: '/launch',
            order: 0
          },
          {
            label: 'Explore Button',
            text: 'Explore Our Innovations',
            url: '/innovations',
            order: 1
          }
        ]
      }
    }
  })

  // Create sample Hero Section content for Thai
  const heroContentTh = await prisma.content.create({
    data: {
      pageSlug: 'home',
      sectionType: 'HERO_SECTION',
      language: 'th',
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
      fields: {
        create: [
          {
            key: 'badge',
            label: 'Badge Text',
            type: 'SHORT',
            value: 'Innovating the Future',
            order: 0
          },
          {
            key: 'title_part1',
            label: 'Title Part 1',
            type: 'SHORT',
            value: 'เปลี่ยน IDEAS',
            order: 1
          },
          {
            key: 'title_part2',
            label: 'Title Part 2',
            type: 'SHORT',
            value: 'ให้กลายเป็น',
            order: 2
          },
          {
            key: 'title_gradient1',
            label: 'Gradient Title 1',
            type: 'SHORT',
            value: 'นวัตกรรมระดับ',
            order: 3
          },
          {
            key: 'title_gradient2',
            label: 'Gradient Title 2',
            type: 'SHORT',
            value: 'Revolutionary',
            order: 4
          },
          {
            key: 'subtitle',
            label: 'Subtitle',
            type: 'LONG',
            value: 'เราไม่ใช่แค่สตาร์ทอัพด้านเทคโนโลยี แต่เรากำลังสร้างอนาคต',
            order: 5
          }
        ]
      },
      buttons: {
        create: [
          {
            label: 'Launch Button',
            text: 'เปิดตัววิสัยทัศน์ของคุณ',
            url: '/launch',
            order: 0
          },
          {
            label: 'Explore Button',
            text: 'สำรวจนวัตกรรมของเรา',
            url: '/innovations',
            order: 1
          }
        ]
      }
    }
  })
  } else {
    console.log('✅ Content already exists, skipping content creation...')
    heroContentEn = existingContent;
    heroContentTh = await prisma.content.findFirst({
      where: {
        pageSlug: 'home',
        sectionType: 'HERO_SECTION',
        language: 'th',
        status: ContentStatus.PUBLISHED
      }
    });
  }

  // Create sample products
  const sampleProducts = [
    {
      title: 'AI-Powered Analytics Platform',
      subtitle: 'Advanced Business Intelligence',
      slug: 'ai-analytics-platform',
      description: 'Transform your business data into actionable insights with our cutting-edge AI analytics platform. Features real-time processing, predictive modeling, and intuitive dashboards.',
      features: [
        'Real-time data processing',
        'Predictive analytics',
        'Interactive dashboards',
        'Custom reporting',
        'API integrations',
        'Machine learning insights'
      ],
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      color: 'blue',
      icon: 'ChartBarIcon',
      category: 'Innovation',
      tags: ['AI', 'Analytics', 'Business Intelligence', 'Data Science'],
      price: '$299/month',
      status: ContentStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      language: 'en',
      clientCount: 150
    },
    {
      title: 'Cloud Infrastructure Manager',
      subtitle: 'Simplified Cloud Operations',
      slug: 'cloud-infrastructure-manager',
      description: 'Streamline your cloud infrastructure management with automated deployment, monitoring, and scaling capabilities across multiple cloud providers.',
      features: [
        'Multi-cloud support',
        'Automated deployment',
        'Resource monitoring',
        'Auto-scaling',
        'Cost optimization',
        'Security compliance'
      ],
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      color: 'green',
      icon: 'CloudIcon',
      category: 'Service',
      tags: ['Cloud', 'Infrastructure', 'DevOps', 'Automation'],
      price: '$199/month',
      status: ContentStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      language: 'en',
      clientCount: 89
    },
    {
      title: 'Mobile App Development Kit',
      subtitle: 'Rapid Mobile Development',
      slug: 'mobile-app-dev-kit',
      description: 'Build stunning mobile applications faster with our comprehensive development kit featuring pre-built components, templates, and deployment tools.',
      features: [
        'Cross-platform support',
        'Pre-built UI components',
        'Template library',
        'Automated testing',
        'CI/CD integration',
        'App store deployment'
      ],
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      color: 'purple',
      icon: 'DevicePhoneMobileIcon',
      category: 'Innovation',
      tags: ['Mobile', 'Development', 'React Native', 'Flutter'],
      price: '$149/month',
      status: ContentStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      language: 'en',
      clientCount: 234
    },
    {
      title: 'Digital Marketing Suite',
      subtitle: 'Complete Marketing Automation',
      slug: 'digital-marketing-suite',
      description: 'Comprehensive digital marketing platform with email campaigns, social media management, analytics, and lead generation tools all in one place.',
      features: [
        'Email campaign automation',
        'Social media scheduling',
        'Lead generation tools',
        'Performance analytics',
        'A/B testing',
        'CRM integration'
      ],
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      color: 'orange',
      icon: 'MegaphoneIcon',
      category: 'Service',
      tags: ['Marketing', 'Automation', 'Email', 'Social Media'],
      price: '$99/month',
      status: ContentStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      language: 'en',
      clientCount: 456
    },
    {
      title: 'Cybersecurity Shield',
      subtitle: 'Advanced Threat Protection',
      slug: 'cybersecurity-shield',
      description: 'Protect your digital assets with enterprise-grade cybersecurity solutions including threat detection, vulnerability assessment, and incident response.',
      features: [
        'Real-time threat detection',
        'Vulnerability scanning',
        'Incident response',
        'Security compliance',
        'Employee training',
        '24/7 monitoring'
      ],
      coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
      color: 'red',
      icon: 'ShieldCheckIcon',
      category: 'Service',
      tags: ['Security', 'Cybersecurity', 'Protection', 'Monitoring'],
      price: '$399/month',
      status: ContentStatus.PUBLISHED,
      isPublished: true,
      publishedAt: new Date(),
      language: 'en',
      clientCount: 78
    }
  ];

  console.log('🌱 Creating sample products...')
  
  for (const productData of sampleProducts) {
    const product = await prisma.product.create({
      data: {
        ...productData,
        featureCount: productData.features.length
      }
    });
    console.log(`  ✅ Created product: ${product.title} (${product.slug})`);
    
    // Add WhyNeedItSection for AI Analytics Platform
    if (product.slug === 'ai-analytics-platform') {
      const whyNeedItSection = await prisma.productSection.create({
        data: {
          productId: product.id,
          sectionType: 'why_need_it',
          title: 'Why Your Business Needs AI Analytics',
          subtitle: 'Transform your data into competitive advantages',
          order: 0
        }
      });

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
      
      console.log(`    ✅ Added WhyNeedIt section with ${whyNeedItCards.length} cards`);
    }
  }

  console.log('✅ Sample content created:')
  console.log(`  - Home Hero (EN): ${heroContentEn.id}`)
//  console.log(`  - Home Hero (TH): ${heroContentTh.id}`)
  console.log(`  - ${sampleProducts.length} sample products created`)
  console.log('🌱 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })