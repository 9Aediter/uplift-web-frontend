'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useProductFeaturesStore, ProductFeature } from '@/lib/store/product-features-store';

interface ProductFeatureManagerProps {
  productId?: string;
}

const ICON_TYPE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'security', label: 'Security' },
  { value: 'performance', label: 'Performance' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'database', label: 'Database' },
  { value: 'users', label: 'Users' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'processing', label: 'Processing' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'global', label: 'Global' },
];

export function ProductFeatureManager({ productId }: ProductFeatureManagerProps) {
  const {
    features,
    setFeatures,
    addFeature,
    updateFeature,
    removeFeature,
    clearFeatures
  } = useProductFeaturesStore();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const [formData, setFormData] = useState<ProductFeature>({
    title: '',
    description: '',
    icon: 'default'
  });

  // Load features for existing product
  useEffect(() => {
    if (productId) {
      fetchFeatures();
    }
  }, [productId]);

  const fetchFeatures = async () => {
    if (!productId) return;

    try {
      const response = await fetch(`/api/products/${productId}/features`);
      if (response.ok) {
        const featuresData = await response.json();
        setFeatures(featuresData);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      toast.error('Failed to fetch features');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'default'
    });
  };

  const handleCreateFeature = () => {
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    addFeature(formData);
    toast.success('Feature added to local store');
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditFeature = (index: number) => {
    setEditingIndex(index);
    setFormData(features[index]);
    setIsEditDialogOpen(true);
  };

  const handleUpdateFeature = () => {
    if (!formData.title || !formData.description) {
      toast.error('Title and description are required');
      return;
    }

    if (editingIndex >= 0) {
      updateFeature(editingIndex, formData);
      toast.success('Feature updated in local store');
      setIsEditDialogOpen(false);
      resetForm();
      setEditingIndex(-1);
    }
  };

  const handleDeleteFeature = (index: number) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      removeFeature(index);
      toast.success('Feature removed from local store');
    }
  };

  const getIconLabel = (icon: string) => {
    const option = ICON_TYPE_OPTIONS.find(opt => opt.value === icon);
    return option?.label || icon;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Features ({features.length})</h3>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Feature</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feature-title">Title</Label>
                  <Input
                    id="feature-title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <Label htmlFor="feature-description">Description</Label>
                  <Textarea
                    id="feature-description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Feature description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="feature-icon">Icon Type</Label>
                  <Select 
                    value={formData.icon} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFeature}>
                    Add Feature
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {features.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No features added yet. Add your first feature to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 border rounded-lg bg-card"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{feature.title}</h4>
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted">
                    {getIconLabel(feature.icon)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditFeature(index)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFeature(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Feature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-feature-title">Title</Label>
              <Input
                id="edit-feature-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Feature title"
              />
            </div>
            <div>
              <Label htmlFor="edit-feature-description">Description</Label>
              <Textarea
                id="edit-feature-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Feature description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-feature-icon">Icon Type</Label>
              <Select 
                value={formData.icon} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon type" />
                </SelectTrigger>
                <SelectContent>
                  {ICON_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                  setEditingIndex(-1);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateFeature}>
                Update Feature
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}