"use client"

import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { ContentStatus } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Product {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  features: string[];
  image?: string;
  color: string;
  icon: string;
  category?: string;
  tags: string[];
  status: ContentStatus;
  isPublished: boolean;
  publishedAt?: string;
  price?: string;
  featureCount?: number;
  clientCount?: number;
  language: string;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    profile?: {
      displayName?: string;
      firstName?: string;
      lastName?: string;
    };
  };
}

interface ProductsResponse {
  products: Product[];
  totalCount: number;
  hasMore: boolean;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    const product = item.originalData || item;
    router.push(`/admin/products/${product.slug || product.id}`);
  };

  const handleView = (item: any) => {
    const product = item.originalData || item;
    window.open(`/innovation/${product.slug}`, '_blank');
  };

  const handleDelete = async (item: any) => {
    const product = item.originalData || item;
    if (!confirm(`Are you sure you want to delete "${product.title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== product.id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  // Transform products for DataTable
  const transformedProducts = products.map(product => ({
    id: product.id,
    originalData: product, // Keep original data for callbacks
    title: (
      <Link 
        href={`/admin/products/${product.slug || product.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
      >
        {product.title}
      </Link>
    ),
    subtitle: product.subtitle || '',
    category: product.category || 'Uncategorized',
    status: product.isPublished ? 'Published' : 'Draft',
    statusBadge: (
      <Badge variant={product.isPublished ? 'default' : 'secondary'}>
        {product.isPublished ? 'Published' : 'Draft'}
      </Badge>
    ),
    price: product.price || 'Contact us',
    features: product.featureCount || 0,
    clients: product.clientCount || 0,
    language: product.language,
    createdAt: new Date(product.createdAt).toLocaleDateString(),
    updatedAt: new Date(product.updatedAt).toLocaleDateString(),
    creator: product.creator?.profile?.displayName || 
             `${product.creator?.profile?.firstName || ''} ${product.creator?.profile?.lastName || ''}`.trim() ||
             'Unknown',
    actions: (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/products/${product.slug || product.id}`}>
            Edit
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/innovation/${product.slug}`} target="_blank">
            Preview
          </Link>
        </Button>
      </div>
    )
  }));

  if (loading) {
    return (
      <>
        <SiteHeader 
          breadcrumbs={[
            { href: "/admin", label: "Admin" },
            { label: "Products" }
          ]}
          action={
            <Button size="sm" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          }
        />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SiteHeader 
          breadcrumbs={[
            { href: "/admin", label: "Admin" },
            { label: "Products" }
          ]}
          action={
            <Button size="sm" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          }
        />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p className="text-red-500">Error: {error}</p>
            <Button onClick={fetchProducts} className="mt-2">
              Retry
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Products" }
        ]}
        action={
          <Button size="sm" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage products and innovation solutions ({products.length} total)
          </p>
        </div>
        <DataTable 
          data={transformedProducts} 
          entityName="Product" 
          views={["table", "card"]}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}