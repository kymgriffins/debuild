import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching project:', error);
      return NextResponse.json(
        { error: 'Failed to fetch project' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      project: data
    });

  } catch (error) {
    console.error('Project fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'slug', 'category', 'description', 'long_description', 'images', 'year', 'location', 'size', 'status'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const projectData = {
      title: body.title,
      slug: body.slug,
      category: body.category,
      description: body.description,
      long_description: body.long_description,
      images: body.images,
      year: body.year,
      location: body.location,
      size: body.size,
      status: body.status,
      features: body.features || [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating project:', error);
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      project: data[0]
    });

  } catch (error) {
    console.error('Project update error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Project deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
