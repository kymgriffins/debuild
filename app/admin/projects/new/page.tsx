'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    long_description: '',
    images: [] as string[],
    year: '',
    location: '',
    size: '',
    status: 'Planning',
    features: [] as string[],
  });

  const [newImage, setNewImage] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const addImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/projects');
      } else {
        alert('Error creating project: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/admin/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Project</h1>
            <p className="text-muted-foreground">
              Create a new project in your portfolio
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="project-url-slug"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Educational">Educational</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                        <SelectItem value="Hospitality">Hospitality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Under Construction">Under Construction</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the project"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long_description">Detailed Description *</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) => handleInputChange('long_description', e.target.value)}
                    placeholder="Detailed project description"
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Size *</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      placeholder="1,200 sq ft"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                    />
                    <Button type="button" onClick={addImage} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Images ({formData.images.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm truncate flex-1">{image}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Feature</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Sustainable materials"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" onClick={addFeature} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features ({formData.features.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {formData.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-2 flex items-center gap-1">
                        {feature}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="h-4 w-4 p-0 text-red-600 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Project'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
