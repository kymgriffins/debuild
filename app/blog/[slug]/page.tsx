import { notFound } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { getBlogPostBySlug } from "@/lib/supabase/queries";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock related posts - in a real app, you'd fetch similar posts
  const relatedPosts: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b bg-muted/20">
        <div className="container mx-auto px-6 lg:px-20">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.published_at || post.created_at)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {post.reading_time} min read
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-light tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center text-muted-foreground">
                <User className="w-5 h-5 mr-2" />
                <span>By {post.author_name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg max-w-none">
                  {/* Convert the content to HTML - in a real app, you'd use a markdown parser */}
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
                </article>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-sm font-semibold mb-3">Share this article</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  {/* Author Info */}
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-1">{post.author_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Architecture Writer & Editor
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reading Progress */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3">Reading Progress</h4>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-1/3"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        35% complete
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.featured_image || "/placeholder-blog.jpg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">{relatedPost.category}</Badge>
                      <h3 className="text-lg font-semibold mb-3 leading-tight">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{relatedPost.reading_time} min read</span>
                        <Link href={`/blog/${relatedPost.slug}`} className="text-primary hover:underline">
                          Read more →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Enjoyed this article?</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for more insights on architecture and design.
            </p>
            <Card className="p-6">
              <CardContent className="p-0">
                <form className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
