'use client';

import React, { useState, useEffect } from 'react';
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
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Technology {
  id: string;
  name: string;
  slug: string;
  svgCode: string;
  category?: string;
}

interface TechStackSectionTechnology {
  id: string;
  technologyId: string;
  order: number;
  technology: Technology;
}

interface TechStackSection {
  id: string;
  title: string;
  subtitle: string;
  technologies: TechStackSectionTechnology[];
}

interface TechStackSectionManagerProps {
  productId: string;
}

export const TechStackSectionManager: React.FC<TechStackSectionManagerProps> = ({
  productId
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [techStackSection, setTechStackSection] = useState<TechStackSection | null>(null);
  const [availableTechnologies, setAvailableTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch existing tech stack section
      const sectionResponse = await fetch(`/api/products/${productId}/tech-stack`);
      if (sectionResponse.ok) {
        const sectionData = await sectionResponse.json();
        setTechStackSection(sectionData);
      }
      
      // Fetch available technologies
      const techResponse = await fetch('/api/technologies');
      if (techResponse.ok) {
        const techData = await techResponse.json();
        setAvailableTechnologies(techData);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load tech stack data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!techStackSection) return;
    
    try {
      setSaving(true);
      const response = await fetch(`/api/products/${productId}/tech-stack`, {
        method: techStackSection.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: techStackSection.title,
          subtitle: techStackSection.subtitle,
          technologies: techStackSection.technologies.map((tech, index) => ({
            technologyId: tech.technologyId,
            order: index,
          })),
        }),
      });

      if (response.ok) {
        toast.success('Tech stack updated successfully');
        await fetchData(); // Refresh data
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update tech stack');
      }
    } catch (error) {
      console.error('Error saving tech stack:', error);
      toast.error('Failed to update tech stack');
    } finally {
      setSaving(false);
    }
  };

  const addTechnology = () => {
    if (!availableTechnologies.length) return;
    
    const firstTech = availableTechnologies[0];
    const newTech: TechStackSectionTechnology = {
      id: `new-${Date.now()}`,
      technologyId: firstTech.id,
      order: techStackSection?.technologies.length || 0,
      technology: firstTech,
    };

    if (techStackSection) {
      setTechStackSection({
        ...techStackSection,
        technologies: [...techStackSection.technologies, newTech],
      });
    } else {
      setTechStackSection({
        id: '',
        title: 'Technology Stack',
        subtitle: 'Cutting-edge tools & technologies we use',
        technologies: [newTech],
      });
    }
  };

  const removeTechnology = (index: number) => {
    if (!techStackSection) return;
    
    const newTechnologies = techStackSection.technologies.filter((_, i) => i !== index);
    setTechStackSection({
      ...techStackSection,
      technologies: newTechnologies,
    });
  };

  const updateTechnology = (index: number, technologyId: string) => {
    if (!techStackSection) return;
    
    const selectedTech = availableTechnologies.find(t => t.id === technologyId);
    if (!selectedTech) return;

    const newTechnologies = [...techStackSection.technologies];
    newTechnologies[index] = {
      ...newTechnologies[index],
      technologyId,
      technology: selectedTech,
    };

    setTechStackSection({
      ...techStackSection,
      technologies: newTechnologies,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technology Stack</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={techStackSection?.title || 'Technology Stack'}
              onChange={(e) => setTechStackSection(prev => prev ? {
                ...prev,
                title: e.target.value
              } : {
                id: '',
                title: e.target.value,
                subtitle: 'Cutting-edge tools & technologies we use',
                technologies: []
              })}
              placeholder="Technology Stack"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Input
              id="subtitle"
              value={techStackSection?.subtitle || 'Cutting-edge tools & technologies we use'}
              onChange={(e) => setTechStackSection(prev => prev ? {
                ...prev,
                subtitle: e.target.value
              } : {
                id: '',
                title: 'Technology Stack',
                subtitle: e.target.value,
                technologies: []
              })}
              placeholder="Cutting-edge tools & technologies we use"
            />
          </div>
        </div>

        {/* Technologies List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Technologies</Label>
            <Button onClick={addTechnology} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </div>

          {techStackSection?.technologies.map((tech, index) => (
            <div key={tech.id} className="flex items-center gap-3 p-4 border rounded-lg">
              <GripVertical className="w-4 h-4 text-muted-foreground" />
              
              <div className="flex-1">
                <Select
                  value={tech.technologyId}
                  onValueChange={(value) => updateTechnology(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTechnologies.map((availableTech) => (
                      <SelectItem key={availableTech.id} value={availableTech.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            dangerouslySetInnerHTML={{ __html: availableTech.svgCode }} 
                            className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full"
                          />
                          {availableTech.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => removeTechnology(index)}
                variant="outline"
                size="icon"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {(!techStackSection?.technologies.length) && (
            <p className="text-muted-foreground text-center py-6">
              No technologies added yet. Click "Add Technology" to get started.
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};