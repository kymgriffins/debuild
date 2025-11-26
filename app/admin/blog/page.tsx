import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Calendar,
  Eye as ViewIcon
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  const publishedPosts = posts.filter(post => post.is_published);
  const draftPosts = posts.filter(post => !post.is_published);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const BlogTable = ({ posts }: { posts: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium max-w-xs">
              <div>
                <p className="truncate">{post.title}</p>
                <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
              </div>
            </TableCell>
            <TableCell>{post.author_name}</TableCell>
            <TableCell>
              <Badge variant="outline">{post.category}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={post.is_published ? "default" : "secondary"}>
                {post.is_published ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell>
              {post.published_at ? formatDate(post.published_at) : "-"}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <ViewIcon className="w-4 h-4 mr-1" />
                {post.views_count || 0}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                {post.is_published && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <BookOpen className="w-8 h-8 mr-3" />
            Blog Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage your blog content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <ViewIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {posts.reduce((sum, post) => sum + (post.views_count || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Published ({publishedPosts.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts ({draftPosts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No blog posts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start writing your first blog post to share your knowledge and insights.
                  </p>
                  <Button asChild>
                    <Link href="/admin/blog/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Post
                    </Link>
                  </Button>
                </div>
              ) : (
                <BlogTable posts={posts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {publishedPosts.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No published posts</h3>
                  <p className="text-muted-foreground mb-4">
                    Publish your draft posts to make them visible to readers.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/admin/blog">
                      View All Posts
                    </Link>
                  </Button>
                </div>
              ) : (
                <BlogTable posts={publishedPosts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {draftPosts.length === 0 ? (
                <div className="text-center py-8">
                  <Edit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No draft posts</h3>
                  <p className="text-muted-foreground mb-4">
                    All your posts are published! Create a new draft to continue writing.
                  </p>
                  <Button asChild>
                    <Link href="/admin/blog/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Draft
                    </Link>
                  </Button>
                </div>
              ) : (
                <BlogTable posts={draftPosts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
