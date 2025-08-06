'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ProductCardManager } from './product-card-manager';

interface ProductSection {
  id: string;
  sectionType: string;
  title?: string;
  subtitle?: string;
  order: number;
  cards: ProductCard[];
}

interface ProductCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  order: number;
}

interface ProductSectionManagerProps {
  productId: string;
}

const SECTION_TYPE_OPTIONS = [
  { value: 'why_need_it', label: 'Why Need It' },
  { value: 'core_features', label: 'Core Features' },
  { value: 'tech_stack', label: 'Tech Stack' },
  { value: 'how_we_build', label: 'How We Build' },
  { value: 'faq', label: 'FAQ' },
  { value: 'testimonials', label: 'Testimonials' },
];

export function ProductSectionManager({ productId }: ProductSectionManagerProps) {
  const [sections, setSections] = useState<ProductSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<ProductSection | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    sectionType: '',
    title: '',
    subtitle: '',
    order: 0,
  });

  useEffect(() => {
    fetchSections();
  }, [productId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}/sections`);
      const data = await response.json();

      if (response.ok) {
        setSections(data);
      } else {
        toast.error(data.error || 'Failed to fetch sections');
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async () => {
    try {
      if (!formData.sectionType) {
        toast.error('Section type is required');
        return;
      }

      const response = await fetch(`/api/products/${productId}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Section created successfully');
        setSections(prev => [...prev, data]);
        setIsCreateDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to create section');
      }
    } catch (error) {
      console.error('Error creating section:', error);
      toast.error('Failed to create section');
    }
  };

  const handleUpdateSection = async () => {
    if (!selectedSection) return;

    try {
      const response = await fetch(`/api/products/${productId}/sections/${selectedSection.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          subtitle: formData.subtitle,
          order: formData.order,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Section updated successfully');
        setSections(prev => prev.map(section => 
          section.id === selectedSection.id ? data : section
        ));
        setIsEditDialogOpen(false);
        setSelectedSection(null);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to update section');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section? All cards will be deleted as well.')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/sections/${sectionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Section deleted successfully');
        setSections(prev => prev.filter(section => section.id !== sectionId));
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete section');
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const openEditDialog = (section: ProductSection) => {
    setSelectedSection(section);
    setFormData({
      sectionType: section.sectionType,
      title: section.title || '',
      subtitle: section.subtitle || '',
      order: section.order,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      sectionType: '',
      title: '',
      subtitle: '',
      order: 0,
    });
  };

  const getSectionTypeLabel = (sectionType: string) => {
    const option = SECTION_TYPE_OPTIONS.find(opt => opt.value === sectionType);
    return option?.label || sectionType;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Product Sections</CardTitle>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Section</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sectionType">Section Type *</Label>
                  <Select value={formData.sectionType} onValueChange={(value) => setFormData(prev => ({ ...prev, sectionType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Section title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Section subtitle"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    placeholder="Display order"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSection}>
                    Create Section
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No sections created yet. Add your first section to get started.
          </p>
        ) : (
          sections.map((section) => (
            <Card key={section.id} className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getSectionTypeLabel(section.sectionType)}</Badge>
                    {section.title && <span className="font-medium">{section.title}</span>}
                    <Badge variant="outline">Order: {section.order}</Badge>
                    <Badge variant="outline">{section.cards.length} cards</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    >
                      {expandedSection === section.id ? 'Collapse' : 'Expand'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(section)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {section.subtitle && (
                  <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                )}
              </CardHeader>
              {expandedSection === section.id && (
                <CardContent className="pt-0">
                  <ProductCardManager
                    productId={productId}
                    sectionId={section.id}
                    cards={section.cards}
                    onCardsChange={(newCards) => {
                      setSections(prev => prev.map(s => 
                        s.id === section.id ? { ...s, cards: newCards } : s
                      ));
                    }}
                  />
                </CardContent>
              )}
            </Card>
          ))
        )}

        {/* Edit Section Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Section Type</Label>
                <Input value={getSectionTypeLabel(formData.sectionType)} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Section title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subtitle">Subtitle</Label>
                <Input
                  id="edit-subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Section subtitle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-order">Order</Label>
                <Input
                  id="edit-order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  placeholder="Display order"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateSection}>
                  Update Section
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}