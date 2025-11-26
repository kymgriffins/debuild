"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    featuredImage: "",
    seoTitle: "",
    seoDescription: "",
    isPublished: false,
    authorName: "Debuild Team", // Default author
  });
  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          readingTime: Math.ceil(formData.content.split(' ').length / 200), // Rough estimate
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link href="/admin/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Blog Post</h1>
            <p className="text-muted-foreground">
              Write and publish your latest insights
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter blog post title"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="url-friendly-slug"
                    required
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This will be used in the URL: /blog/your-slug-here
                  </p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Brief description of the blog post (150-200 characters)"
                    required
                    className="mt-1 min-h-[100px]"
                    maxLength={300}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.excerpt.length}/300 characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="content">Blog Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Write your blog post content here..."
                    required
                    className="mt-1 min-h-[400px]"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Use simple formatting. HTML is supported.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Publish immediately</Label>
                  <Switch
                    id="published"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, isPublished: checked }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange("authorName", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category & Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Category & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    placeholder="e.g., Architecture, Design, Sustainability"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter a URL for the featured image
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                    placeholder="Custom SEO title (optional)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                    placeholder="Custom SEO description (optional)"
                    className="mt-1"
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.seoDescription.length}/160 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
