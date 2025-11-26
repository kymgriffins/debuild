import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { getAllBlogPosts, getBlogPostsByCategory } from "@/lib/supabase/queries";

// Generate static params for categories
export async function generateStaticParams() {
  // This will be used for category filtering
  return [];
}

interface BlogPageProps {
  searchParams: { category?: string; search?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const category = searchParams.category;
  const search = searchParams.search;

  let posts;
  if (category) {
    posts = await getBlogPostsByCategory(category);
  } else {
    posts = await getAllBlogPosts(20); // Limit to 20 posts for performance
  }

  // Filter by search if provided
  if (search) {
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.category)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <Badge className="bg-primary/20 text-primary font-medium">
                ARCHITECTURE INSIGHTS
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight mt-6 mb-4">
              Design<br />Stories &<br />Insights
            </h1>
            <p className="text-xl text-muted-foreground/90 max-w-4xl mx-auto leading-relaxed mb-8">
              <strong>Explore our latest thoughts</strong> on architecture, design trends, sustainable building practices, and the stories behind our projects.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search articles..."
                  className="pl-10"
                  defaultValue={search}
                />
              </div>
            </form>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Link href="/blog">
                <Badge variant={!category ? "default" : "outline"} className="cursor-pointer">
                  All Posts
                </Badge>
              </Link>
              {categories.map((cat) => (
                <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}>
                  <Badge variant={category === cat ? "default" : "outline"} className="cursor-pointer">
                    {cat}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                {search ? `No articles match "${search}"` : category ? `No articles in category "${category}"` : "No blog posts available yet."}
              </p>
              <Button asChild>
                <Link href="/blog">
                  View All Articles
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {posts.length > 0 && (
                <div className="mb-12">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/2">
                        <div className="relative h-64 md:h-full">
                          <Image
                            src={posts[0].featured_image || "/placeholder-blog.jpg"}
                            alt={posts[0].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="secondary">{posts[0].category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(posts[0].published_at || posts[0].created_at)}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 leading-tight">
                          <Link href={`/blog/${posts[0].slug}`} className="hover:text-primary transition-colors">
                            {posts[0].title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {posts[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            {posts[0].author_name}
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            {posts[0].reading_time} min read
                          </div>
                          <Button asChild>
                            <Link href={`/blog/${posts[0].slug}`}>
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Grid of Posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image || "/placeholder-blog.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 leading-tight">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.reading_time} min read</span>
                        <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                          Read more →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More / Pagination could go here */}
              {posts.length >= 20 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
