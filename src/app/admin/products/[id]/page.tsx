'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CoverImageCard } from '@/components/image';
import { ImageGalleryCards } from '@/components/image/image-gallery-cards';
import { ProductSectionManager } from '@/components/admin/product-section-manager';
import { TechStackSectionManager } from '@/components/admin/tech-stack-section-manager';
import { ProductFeatureManager } from '@/components/admin/product-feature-manager';
import { useProductFeaturesStore } from '@/lib/store/product-features-store';

interface Product {
  id?: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  coverImage?: string;
  imageGallery: string[];
  caseStudy?: string;
  color: string;
  icon: string;
  category?: string;
  tags: string[];
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  isPublished: boolean;
  publishedAt?: string;
  price?: string;
  featureCount?: number;
  clientCount?: number;
  language: string;
}

const STATUS_OPTIONS = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
];

const COLOR_OPTIONS = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'red', label: 'Red' },
  { value: 'pink', label: 'Pink' },
];

const ICON_OPTIONS = [
  { value: 'MonitorIcon', label: 'Monitor' },
  { value: 'CpuChipIcon', label: 'CPU Chip' },
  { value: 'CloudIcon', label: 'Cloud' },
  { value: 'ShieldCheckIcon', label: 'Shield' },
  { value: 'ChartBarIcon', label: 'Chart' },
  { value: 'CogIcon', label: 'Cog' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'th', label: 'Thai' },
];

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const isNew = productId === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product>({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    coverImage: '',
    imageGallery: [],
    caseStudy: '',
    color: 'blue',
    icon: 'MonitorIcon',
    category: '',
    tags: [],
    status: 'DRAFT',
    isPublished: false,
    price: '',
    featureCount: 0,
    clientCount: 0,
    language: 'en',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    }
  }, [productId, isNew]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (response.ok) {
        setProduct({
          ...data,
          imageGallery: data.imageGallery || [],
          caseStudy: data.caseStudy || '',
        });
      } else {
        toast.error(data.error || 'Failed to fetch product');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setProduct(prev => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from title
    if (field === 'title' && typeof value === 'string') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setProduct(prev => ({
        ...prev,
        slug,
      }));
    }
  };



  const addTag = () => {
    if (tagInput.trim() && !product.tags.includes(tagInput.trim())) {
      setProduct(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProduct(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleGalleryChange = (newImages: string[]) => {
    setProduct(prev => ({
      ...prev,
      imageGallery: newImages,
    }));
  };

  const handleCoverImageChange = (imageUrl: string | null, imageId?: string | null) => {
    setProduct(prev => ({
      ...prev,
      coverImage: imageUrl || undefined,
    }));

    // Note: imageId can be used for additional tracking if needed
    // Currently we store the URL in coverImage field as per existing schema
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Validation
      if (!product.title.trim()) {
        toast.error('Title is required');
        return;
      }
      if (!product.slug.trim()) {
        toast.error('Slug is required');
        return;
      }
      if (!product.description.trim()) {
        toast.error('Description is required');
        return;
      }

      // Filter out empty gallery images
      const cleanedProduct = {
        ...product,
        imageGallery: product.imageGallery.filter(img => img.trim() !== ''),
      };

      const url = isNew ? '/api/products' : `/api/products/${productId}`;
      const method = isNew ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedProduct),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isNew ? 'Product created successfully' : 'Product updated successfully');
        if (isNew) {
          // Use slug for better URLs, fallback to id if slug not available
          router.push(`/admin/products/${data.slug || data.id}`);
        }
      } else {
        toast.error(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) return;

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        router.push('/admin/products');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SiteHeader
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/products", label: "Products" },
          { label: isNew ? "New Product" : product.title || "Edit Product" }
        ]}
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/admin/products')}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
            {!isNew && (
              <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : isNew ? 'Create Product' : 'Save Changes'}
            </Button>
          </div>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={product.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Product title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={product.subtitle || ''}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      placeholder="Product subtitle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={product.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="product-slug"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Product description"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={product.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Innovation, Service"
                  />
                </div>
              </CardContent>
            </Card>



            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tag"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ImageGalleryCards
                  images={product.imageGallery}
                  onImagesChange={handleGalleryChange}
                />
              </CardContent>
            </Card>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Publishing */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={product.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublished"
                    checked={product.isPublished}
                    onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
                  />
                  <Label htmlFor="isPublished">Published</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={product.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color Theme</Label>
                  <Select value={product.color} onValueChange={(value) => handleInputChange('color', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLOR_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={product.icon} onValueChange={(value) => handleInputChange('icon', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <CoverImageCard
                    imageUrl={product.coverImage}
                    onImageChange={handleCoverImageChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={product.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="$999/month or Contact us"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientCount">Client Count</Label>
                    <Input
                      id="clientCount"
                      type="number"
                      value={product.clientCount || 0}
                      onChange={(e) => handleInputChange('clientCount', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Study */}
            <Card>
              <CardHeader>
                <CardTitle>Case Study</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caseStudy">Case Study Content</Label>
                  <Textarea
                    id="caseStudy"
                    value={product.caseStudy || ''}
                    onChange={(e) => handleInputChange('caseStudy', e.target.value)}
                    placeholder="Describe the case study, example screens, or implementation details..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    This content will be displayed in the "Example Screens" section
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Product Sections */}
        {!isNew && product.id && (
          <ProductSectionManager productId={product.id} />
        )}
        
        {/* Tech Stack Section */}
        {!isNew && product.id && (
          <TechStackSectionManager productId={product.id} />
        )}
        
        {/* Core Features Management */}
        <ProductFeatureManager productId={!isNew ? product.id : undefined} />
      </div>
    </>
  );
}