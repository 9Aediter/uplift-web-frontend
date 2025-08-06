'use client';

import { useState } from 'react';
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

interface ProductCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  order: number;
}

interface ProductCardManagerProps {
  productId: string;
  sectionId: string;
  cards: ProductCard[];
  onCardsChange: (cards: ProductCard[]) => void;
}

const ICON_OPTIONS = [
  { value: 'LightbulbIcon', label: 'Lightbulb' },
  { value: 'TrendingUpIcon', label: 'Trending Up' },
  { value: 'CodeIcon', label: 'Code' },
  { value: 'ShieldCheckIcon', label: 'Shield Check' },
  { value: 'ChartBarIcon', label: 'Chart Bar' },
  { value: 'CogIcon', label: 'Cog' },
  { value: 'CloudIcon', label: 'Cloud' },
  { value: 'CpuChipIcon', label: 'CPU Chip' },
  { value: 'RocketLaunchIcon', label: 'Rocket Launch' },
  { value: 'StarIcon', label: 'Star' },
];

const ICON_COLOR_OPTIONS = [
  { value: 'text-yellow-400', label: 'Yellow' },
  { value: 'text-green-400', label: 'Green' },
  { value: 'text-blue-400', label: 'Blue' },
  { value: 'text-red-400', label: 'Red' },
  { value: 'text-purple-400', label: 'Purple' },
  { value: 'text-orange-400', label: 'Orange' },
  { value: 'text-pink-400', label: 'Pink' },
  { value: 'text-cyan-400', label: 'Cyan' },
];

export function ProductCardManager({ productId, sectionId, cards, onCardsChange }: ProductCardManagerProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ProductCard | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    iconColor: '',
    order: 0,
  });

  const handleCreateCard = async () => {
    try {
      if (!formData.title || !formData.description) {
        toast.error('Title and description are required');
        return;
      }

      const response = await fetch(`/api/products/${productId}/sections/${sectionId}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Card created successfully');
        onCardsChange([...cards, data]);
        setIsCreateDialogOpen(false);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      toast.error('Failed to create card');
    }
  };

  const handleUpdateCard = async () => {
    if (!selectedCard) return;

    try {
      const response = await fetch(`/api/products/${productId}/sections/${sectionId}/cards/${selectedCard.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Card updated successfully');
        onCardsChange(cards.map(card => card.id === selectedCard.id ? data : card));
        setIsEditDialogOpen(false);
        setSelectedCard(null);
        resetForm();
      } else {
        toast.error(data.error || 'Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error('Failed to update card');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}/sections/${sectionId}/cards/${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Card deleted successfully');
        onCardsChange(cards.filter(card => card.id !== cardId));
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const openEditDialog = (card: ProductCard) => {
    setSelectedCard(card);
    setFormData({
      title: card.title,
      description: card.description,
      icon: card.icon || '',
      iconColor: card.iconColor || '',
      order: card.order,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      iconColor: '',
      order: 0,
    });
  };

  const getIconLabel = (iconValue: string) => {
    const option = ICON_OPTIONS.find(opt => opt.value === iconValue);
    return option?.label || iconValue;
  };

  const getColorLabel = (colorValue: string) => {
    const option = ICON_COLOR_OPTIONS.find(opt => opt.value === colorValue);
    return option?.label || colorValue;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Cards ({cards.length})</h4>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-title">Title *</Label>
                <Input
                  id="card-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Card title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-description">Description *</Label>
                <Textarea
                  id="card-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Card description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-icon">Icon</Label>
                  <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
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
                <div className="space-y-2">
                  <Label htmlFor="card-iconColor">Icon Color</Label>
                  <Select value={formData.iconColor} onValueChange={(value) => setFormData(prev => ({ ...prev, iconColor: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {ICON_COLOR_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-order">Order</Label>
                <Input
                  id="card-order"
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
                <Button onClick={handleCreateCard}>
                  Create Card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
          <p className="text-muted-foreground">No cards in this section yet.</p>
          <p className="text-sm text-muted-foreground">Add your first card to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {cards
            .sort((a, b) => a.order - b.order)
            .map((card) => (
            <Card key={card.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium">{card.title}</h5>
                      <Badge variant="outline">Order: {card.order}</Badge>
                      {card.icon && (
                        <Badge variant="secondary">
                          {getIconLabel(card.icon)}
                        </Badge>
                      )}
                      {card.iconColor && (
                        <Badge variant="secondary">
                          {getColorLabel(card.iconColor)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(card)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Card Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-card-title">Title *</Label>
              <Input
                id="edit-card-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-card-description">Description *</Label>
              <Textarea
                id="edit-card-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Card description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-card-icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
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
              <div className="space-y-2">
                <Label htmlFor="edit-card-iconColor">Icon Color</Label>
                <Select value={formData.iconColor} onValueChange={(value) => setFormData(prev => ({ ...prev, iconColor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_COLOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-card-order">Order</Label>
              <Input
                id="edit-card-order"
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
              <Button onClick={handleUpdateCard}>
                Update Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}