'use server';

import { prisma } from '@/lib/prisma';
import { IconMap } from '@/data/products';

// Define the Product type that the frontend components expect (updated for our schema)
export interface ProductDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStackSection?: {
    id: string;
    title: string;
    subtitle: string;
    technologies: Array<{
      id: string;
      technology: {
        id: string;
        name: string;
        slug: string;
        svgCode: string;
        category?: string;
      };
      order: number;
    }>;
  };
  image?: Array<{
    id: number;
    url: string;
    formats?: {
      large?: { url: string; };
      medium?: { url: string; };
      small?: { url: string; };
      thumbnail?: { url: string; };
    };
  }>;
  coverImage?: string;
  imageGallery: string[];
  color: string;
  icon: keyof typeof IconMap;
  caseStudy?: string;
  slug: string;
  category?: string;
  price?: string;
  clientCount?: number;
  sections?: Array<{
    id: string;
    sectionType: string;
    title?: string;
    subtitle?: string;
    order: number;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      icon?: string;
      iconColor?: string;
      order: number;
    }>;
  }>;
}

// Helper function to map Prisma Product to ProductDetail
const mapProductToProductDetail = (product: any): ProductDetail => {
  const iconName = product.icon as keyof typeof IconMap;
  const icon = IconMap[iconName] ? iconName : 'MonitorIcon';

  // Transform imageGallery array to match expected image format
  const image = product.imageGallery?.map((url: string, index: number) => ({
    id: index + 1,
    url: url,
    formats: {
      large: { url: url },
      medium: { url: url },
      small: { url: url },
      thumbnail: { url: url }
    }
  })) || [];

  // Map all product sections
  const sections = product.productSections?.map((section: any) => ({
    id: section.id,
    sectionType: section.sectionType,
    title: section.title,
    subtitle: section.subtitle,
    order: section.order,
    cards: section.cards?.map((card: any) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      icon: card.icon,
      iconColor: card.iconColor,
      order: card.order,
    })) || []
  })) || [];

  return {
    id: product.slug,
    title: product.title,
    subtitle: product.subtitle || '',
    description: product.description,
    features: product.features || [],
    techStackSection: product.techStackSection || undefined,
    image: image,
    coverImage: product.coverImage,
    imageGallery: product.imageGallery || [],
    color: product.color,
    icon: icon,
    caseStudy: product.caseStudy,
    slug: product.slug,
    category: product.category,
    price: product.price,
    clientCount: product.clientCount,
    sections: sections,
  };
};

export const getInnovationDetail = async (slug: string): Promise<ProductDetail | null> => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug } // Allow lookup by ID as fallback
        ],
        status: 'PUBLISHED',
        isPublished: true
      },
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        images: {
          select: {
            id: true,
            url: true,
            originalName: true,
            contentType: true,
            size: true
          }
        },
        productSections: {
          include: {
            cards: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        techStackSection: {
          include: {
            technologies: {
              include: {
                technology: true
              },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    if (!product) {
      return null;
    }

    const productDetail = mapProductToProductDetail(product);
    return productDetail;
  } catch (error) {
    console.error(`Failed to fetch innovation detail for slug ${slug}:`, error);
    return null;
  }
};

// New function to get all published products for lists
export const getAllInnovations = async (params?: {
  category?: string;
  language?: string;
  limit?: number;
}): Promise<ProductDetail[]> => {
  try {
    const where: any = {
      status: 'PUBLISHED',
      isPublished: true
    };

    if (params?.category) {
      where.category = params.category;
    }
    
    if (params?.language) {
      where.language = params.language;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      take: params?.limit,
      include: {
        creator: {
          select: {
            id: true,
            profile: {
              select: {
                displayName: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        images: {
          select: {
            id: true,
            url: true,
            originalName: true,
            contentType: true,
            size: true
          }
        },
        productSections: {
          include: {
            cards: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        techStackSection: {
          include: {
            technologies: {
              include: {
                technology: true
              },
              orderBy: { order: 'asc' }
            }
          }
        }
      }
    });

    return products.map(mapProductToProductDetail);
  } catch (error) {
    console.error('Failed to fetch all innovations:', error);
    return [];
  }
};
