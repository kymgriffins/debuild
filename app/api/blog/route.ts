import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'excerpt', 'content', 'category', 'authorName'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Get current user for author association
    const { data: { user } } = await supabase.auth.getUser();

    const blogPostData = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags || [],
      featured_image: body.featuredImage || null,
      seo_title: body.seoTitle || null,
      seo_description: body.seoDescription || null,
      seo_keywords: body.tags || [],
      is_published: body.isPublished || false,
      published_at: body.isPublished ? new Date().toISOString() : null,
      author_name: body.authorName,
      author_id: user?.id || null,
      reading_time: body.readingTime || 5,
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPostData])
      .select();

    if (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      post: data?.[0]
    });

  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const published = searchParams.get('published') !== 'false';

    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (published) {
      query = query.eq('is_published', true);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      posts: data || []
    });

  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
