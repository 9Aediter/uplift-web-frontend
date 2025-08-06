'use client';

import React, { useState, useEffect } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  slug: string;
  svgCode: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_OPTIONS = [
  'Frontend',
  'Backend', 
  'Database',
  'Cloud',
  'DevOps',
  'Mobile',
  'Design',
  'Other'
];

export default function TechnologiesPage() {
  const [loading, setLoading] = useState(true);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    svgCode: '',
  });

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/technologies');
      if (response.ok) {
        const data = await response.json();
        setTechnologies(data);
      } else {
        toast.error('Failed to load technologies');
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
      toast.error('Failed to load technologies');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.svgCode.trim()) {
      toast.error('Name and SVG code are required');
      return;
    }

    try {
      setSaving(true);
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const response = await fetch('/api/admin/technologies', {
        method: editingTech ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(editingTech && { id: editingTech.id }),
          name: formData.name,
          slug,
          svgCode: formData.svgCode,
          category: formData.category || null,
        }),
      });

      if (response.ok) {
        toast.success(editingTech ? 'Technology updated' : 'Technology created');
        setIsDialogOpen(false);
        resetForm();
        await fetchTechnologies();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save technology');
      }
    } catch (error) {
      console.error('Error saving technology:', error);
      toast.error('Failed to save technology');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (tech: Technology) => {
    if (!confirm(`Are you sure you want to delete "${tech.name}"?`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/technologies', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tech.id }),
      });

      if (response.ok) {
        toast.success('Technology deleted');
        await fetchTechnologies();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete technology');
      }
    } catch (error) {
      console.error('Error deleting technology:', error);
      toast.error('Failed to delete technology');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
      toast.error('Please upload an SVG file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const svgContent = e.target?.result as string;
      setFormData(prev => ({ ...prev, svgCode: svgContent }));
    };
    reader.readAsText(file);
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingTech(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (tech: Technology) => {
    setFormData({
      name: tech.name,
      category: tech.category || '',
      svgCode: tech.svgCode,
    });
    setEditingTech(tech);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      svgCode: '',
    });
    setEditingTech(null);
  };

  if (loading) {
    return (
      <>
        <SiteHeader />
        <div className="container mx-auto py-8">
          <p>Loading technologies...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Technologies</h1>
          <Button onClick={openCreateDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Technology
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <Card key={tech.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(tech)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(tech)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div 
                      dangerouslySetInnerHTML={{ __html: tech.svgCode }} 
                      className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {tech.category || 'No category'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Slug: {tech.slug}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {technologies.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No technologies found</p>
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Technology
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTech ? 'Edit Technology' : 'Add Technology'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    placeholder="React, Node.js, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      category: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="svg-upload">SVG Icon</Label>
                <div className="flex gap-2">
                  <Input
                    id="svg-upload"
                    type="file"
                    accept=".svg,image/svg+xml"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('svg-upload')?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="svg-code">SVG Code</Label>
                <Textarea
                  id="svg-code"
                  value={formData.svgCode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    svgCode: e.target.value
                  }))}
                  placeholder="<svg>...</svg>"
                  rows={6}
                />
              </div>

              {formData.svgCode && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div 
                      dangerouslySetInnerHTML={{ __html: formData.svgCode }} 
                      className="w-12 h-12 [&>svg]:w-full [&>svg]:h-full"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : (editingTech ? 'Update' : 'Create')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}