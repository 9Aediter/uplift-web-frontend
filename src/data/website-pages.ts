// Mock data for website pages management
export interface WebsitePage {
  id: string
  title: string
  slug: string
  type: 'home' | 'about' | 'contact' | 'service' | 'custom'
  status: 'draft' | 'published' | 'archived'
  language: 'en' | 'th'
  createdAt: string
  updatedAt: string
  author: string
  sections: PageSection[]
  settings: PageSettings
  seo: PageSEO
}

export interface PageSection {
  id: string
  type: 'hero' | 'problems' | 'features' | 'testimonials' | 'cta' | 'content'
  title: string
  order: number
  isActive: boolean
  data: Record<string, any>
}

export interface PageSettings {
  defaultLanguage: 'en' | 'th'
  enabledLanguages: string[]
  autoDetectLanguage: boolean
  isPublic: boolean
  requireAuth: boolean
}

export interface PageSEO {
  title: {
    en: string
    th: string
  }
  description: {
    en: string
    th: string
  }
  keywords: {
    en: string[]
    th: string[]
  }
  ogImage?: string
  canonicalUrl?: string
}

export const mockWebsitePages: WebsitePage[] = [
  {
    id: 'home-page',
    title: 'Home Page',
    slug: 'home',
    type: 'home',
    status: 'published',
    language: 'en',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    author: 'Admin User',
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Hero Section',
        order: 1,
        isActive: true,
        data: {
          badge: {
            en: 'Innovating the Future',
            th: 'นวัตกรรมอนาคต'
          },
          title: {
            en: 'Transform Your Business with Technology',
            th: 'เปลี่ยนธุรกิจของคุณด้วยเทคโนโลยี'
          },
          subtitle: {
            en: "We're not just another tech startup - we're building the future with revolutionary solutions.",
            th: 'เราไม่ใช่แค่ startup อีกแห่ง - เรากำลังสร้างอนาคตด้วยโซลูชั่นที่ปฏิวัติ'
          },
          buttons: [
            {
              text: { en: 'Launch Your Vision', th: 'เปิดตัววิสัยทัศน์ของคุณ' },
              url: '/contact',
              type: 'primary'
            },
            {
              text: { en: 'Learn More', th: 'เรียนรู้เพิ่มเติม' },
              url: '/about',
              type: 'secondary'
            }
          ]
        }
      },
      {
        id: 'problems-1',
        type: 'problems',
        title: 'Problems Section',
        order: 2,
        isActive: true,
        data: {
          title: {
            en: 'Challenges We Solve',
            th: 'ปัญหาที่เราแก้ให้'
          },
          subtitle: {
            en: "In today's rapidly evolving landscape, innovation isn't optional—it's essential for survival.",
            th: 'ในโลกที่เปลี่ยนแปลงอย่างรวดเร็ว นวัตกรรมไม่ใช่ทางเลือก แต่เป็นสิ่งจำเป็นสำหรับการอยู่รอด'
          },
          problems: [
            {
              title: { en: 'Stuck in Traditional Ways', th: 'ยังคิดแบบเดิม' },
              description: {
                en: 'You risk being left behind. We help future-proof your business before others take your place.',
                th: 'คุณเสี่ยงที่จะถูกทิ้งไว้ข้างหลัง เราช่วยทำให้ธุรกิจของคุณพร้อมสำหรับอนาคต'
              },
              icon: 'TrendingUpIcon',
              glow: 'cyan'
            }
          ]
        }
      }
    ],
    settings: {
      defaultLanguage: 'en',
      enabledLanguages: ['en', 'th'],
      autoDetectLanguage: true,
      isPublic: true,
      requireAuth: false
    },
    seo: {
      title: {
        en: 'Uplift - Transform Your Business with Innovation',
        th: 'Uplift - เปลี่ยนธุรกิจของคุณด้วยนวัตกรรม'
      },
      description: {
        en: 'Transform your business with revolutionary solutions. We\'re not just another tech startup - we\'re building the future.',
        th: 'เปลี่ยนธุรกิจของคุณด้วยโซลูชั่นที่ปฏิวัติ เราไม่ใช่แค่ startup - เรากำลังสร้างอนาคต'
      },
      keywords: {
        en: ['innovation', 'technology', 'business transformation', 'startup', 'solutions'],
        th: ['นวัตกรรม', 'เทคโนโลยี', 'การเปลี่ยนแปลงธุรกิจ', 'สตาร์ทอัพ', 'โซลูชั่น']
      },
      ogImage: '/og-home.jpg'
    }
  },
  {
    id: 'about-page',
    title: 'About Page',
    slug: 'about',
    type: 'about',
    status: 'published',
    language: 'en',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    author: 'Content Manager',
    sections: [
      {
        id: 'hero-about',
        type: 'hero',
        title: 'About Hero Section',
        order: 1,
        isActive: true,
        data: {
          title: {
            en: 'About Uplift Technologies',
            th: 'เกี่ยวกับ Uplift Technologies'
          },
          subtitle: {
            en: 'We are a team of innovators dedicated to transforming businesses through technology.',
            th: 'เราคือทีมนวัตกรรมที่มุ่งมั่นในการเปลี่ยนแปลงธุรกิจผ่านเทคโนโลยี'
          }
        }
      },
      {
        id: 'story-1',
        type: 'content',
        title: 'Company Story',
        order: 2,
        isActive: true,
        data: {
          title: {
            en: 'Our Story',
            th: 'เรื่องราวของเรา'
          },
          content: {
            en: 'Founded with a vision to transform businesses through technology, Uplift has been at the forefront of innovation since 2020.',
            th: 'ก่อตั้งขึ้นด้วยวิสัยทัศน์ในการเปลี่ยนแปลงธุรกิจผ่านเทคโนโลยี Uplift เป็นผู้นำด้านนวัตกรรมตั้งแต่ปี 2020'
          }
        }
      }
    ],
    settings: {
      defaultLanguage: 'en',
      enabledLanguages: ['en', 'th'],
      autoDetectLanguage: true,
      isPublic: true,
      requireAuth: false
    },
    seo: {
      title: {
        en: 'About Us - Uplift Technologies',
        th: 'เกี่ยวกับเรา - Uplift Technologies'
      },
      description: {
        en: 'Learn about Uplift Technologies - our story, vision, mission, and the expert team driving digital transformation.',
        th: 'เรียนรู้เกี่ยวกับ Uplift Technologies - เรื่องราว วิสัยทัศน์ ภารกิจ และทีมผู้เชี่ยวชาญที่ขับเคลื่อนการเปลี่ยนแปลงดิจิทัล'
      },
      keywords: {
        en: ['about', 'company', 'team', 'vision', 'mission', 'technology'],
        th: ['เกี่ยวกับ', 'บริษัท', 'ทีม', 'วิสัยทัศน์', 'ภารกิจ', 'เทคโนโลยี']
      }
    }
  },
  {
    id: 'contact-page',
    title: 'Contact Page',
    slug: 'contact',
    type: 'contact',
    status: 'published',
    language: 'en',
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-19T13:20:00Z',
    author: 'Admin User',
    sections: [
      {
        id: 'hero-contact',
        type: 'hero',
        title: 'Contact Hero',
        order: 1,
        isActive: true,
        data: {
          title: {
            en: 'Get in Touch',
            th: 'ติดต่อเรา'
          },
          subtitle: {
            en: "Ready to transform your business? Let's start the conversation.",
            th: 'พร้อมที่จะเปลี่ยนแปลงธุรกิจของคุณแล้วหรือยัง? มาเริ่มคุยกันเลย'
          }
        }
      },
      {
        id: 'contact-info',
        type: 'content',
        title: 'Contact Information',
        order: 2,
        isActive: true,
        data: {
          company: 'Uplift Technologies',
          email: 'contact@uplift.com',
          phone: '+66 2 123 4567',
          address: {
            en: '123 Innovation Drive, Tech District, Bangkok 10110, Thailand',
            th: '123 ถนนนวัตกรรม เขตเทคโนโลยี กรุงเทพมหานคร 10110'
          },
          hours: {
            en: 'Mon-Fri 9:00 AM - 6:00 PM',
            th: 'จันทร์-ศุกร์ 9:00 - 18:00 น.'
          }
        }
      }
    ],
    settings: {
      defaultLanguage: 'en',
      enabledLanguages: ['en', 'th'],
      autoDetectLanguage: true,
      isPublic: true,
      requireAuth: false
    },
    seo: {
      title: {
        en: 'Contact Us - Uplift Technologies',
        th: 'ติดต่อเรา - Uplift Technologies'
      },
      description: {
        en: 'Contact Uplift Technologies. Get in touch with our team, visit our office, or send us a message.',
        th: 'ติดต่อ Uplift Technologies ติดต่อทีมของเรา มาเยี่ยมชมสำนักงาน หรือส่งข้อความหาเรา'
      },
      keywords: {
        en: ['contact', 'office', 'location', 'phone', 'email', 'address'],
        th: ['ติดต่อ', 'สำนักงาน', 'ที่อยู่', 'โทรศัพท์', 'อีเมล']
      }
    }
  },
  {
    id: 'services-page',
    title: 'Our Services',
    slug: 'services',
    type: 'service',
    status: 'draft',
    language: 'en',
    createdAt: '2024-01-22T08:15:00Z',
    updatedAt: '2024-01-23T10:30:00Z',
    author: 'Content Manager',
    sections: [
      {
        id: 'hero-services',
        type: 'hero',
        title: 'Services Hero',
        order: 1,
        isActive: true,
        data: {
          title: {
            en: 'Our Services',
            th: 'บริการของเรา'
          },
          subtitle: {
            en: 'Comprehensive technology solutions to accelerate your business growth.',
            th: 'โซลูชั่นเทคโนโลยีที่ครอบคลุมเพื่อเร่งการเติบโตของธุรกิจคุณ'
          }
        }
      },
      {
        id: 'features-services',
        type: 'features',
        title: 'Service Features',
        order: 2,
        isActive: true,
        data: {
          features: [
            {
              title: { en: 'Custom Software Development', th: 'พัฒนาซอฟต์แวร์ที่กำหนดเอง' },
              description: {
                en: 'Tailored software solutions built for your specific business needs.',
                th: 'โซลูชั่นซอฟต์แวร์ที่ปรับแต่งเพื่อตอบสนองความต้องการธุรกิจเฉพาะของคุณ'
              },
              icon: 'CodeIcon'
            }
          ]
        }
      }
    ],
    settings: {
      defaultLanguage: 'en',
      enabledLanguages: ['en', 'th'],
      autoDetectLanguage: true,
      isPublic: false,
      requireAuth: false
    },
    seo: {
      title: {
        en: 'Our Services - Uplift Technologies',
        th: 'บริการของเรา - Uplift Technologies'
      },
      description: {
        en: 'Discover our comprehensive technology services including custom software development, digital transformation, and more.',
        th: 'ค้นหาบริการเทคโนโลยีที่ครอบคลุมของเรา รวมถึงการพัฒนาซอฟต์แวร์ที่กำหนดเอง การเปลี่ยนแปลงดิจิทัล และอื่นๆ'
      },
      keywords: {
        en: ['services', 'software development', 'digital transformation', 'consulting'],
        th: ['บริการ', 'พัฒนาซอฟต์แวร์', 'การเปลี่ยนแปลงดิจิทัล', 'ที่ปรึกษา']
      }
    }
  },
  {
    id: 'custom-landing',
    title: 'Product Landing',
    slug: 'product-showcase',
    type: 'custom',
    status: 'archived',
    language: 'en',
    createdAt: '2024-01-05T14:20:00Z',
    updatedAt: '2024-01-15T09:10:00Z',
    author: 'Marketing Team',
    sections: [
      {
        id: 'hero-product',
        type: 'hero',
        title: 'Product Hero',
        order: 1,
        isActive: false,
        data: {
          title: {
            en: 'Revolutionary Product Suite',
            th: 'ชุดผลิตภัณฑ์ปฏิวัติ'
          },
          subtitle: {
            en: 'Experience the next generation of business technology.',
            th: 'สัมผัสเทคโนโลยีธุรกิจยุคใหม่'
          }
        }
      }
    ],
    settings: {
      defaultLanguage: 'en',
      enabledLanguages: ['en'],
      autoDetectLanguage: false,
      isPublic: false,
      requireAuth: true
    },
    seo: {
      title: {
        en: 'Product Showcase - Uplift Technologies',
        th: 'แสดงผลิตภัณฑ์ - Uplift Technologies'
      },
      description: {
        en: 'Explore our revolutionary product suite designed to transform your business operations.',
        th: 'สำรวจชุดผลิตภัณฑ์ปฏิวัติที่ออกแบบมาเพื่อเปลี่ยนแปลงการดำเนินธุรกิจของคุณ'
      },
      keywords: {
        en: ['products', 'showcase', 'business solutions', 'technology suite'],
        th: ['ผลิตภัณฑ์', 'การแสดง', 'โซลูชั่นธุรกิจ', 'ชุดเทคโนโลยี']
      }
    }
  }
]

// Helper functions for working with mock data
export const getPageById = (id: string): WebsitePage | undefined => {
  return mockWebsitePages.find(page => page.id === id)
}

export const getPagesByStatus = (status: 'draft' | 'published' | 'archived'): WebsitePage[] => {
  return mockWebsitePages.filter(page => page.status === status)
}

export const getPagesByType = (type: WebsitePage['type']): WebsitePage[] => {
  return mockWebsitePages.filter(page => page.type === type)
}

export const searchPages = (query: string): WebsitePage[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockWebsitePages.filter(page => 
    page.title.toLowerCase().includes(lowercaseQuery) ||
    page.slug.toLowerCase().includes(lowercaseQuery) ||
    page.author.toLowerCase().includes(lowercaseQuery)
  )
}