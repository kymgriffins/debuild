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
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Team member not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching team member:', error);
      return NextResponse.json(
        { error: 'Failed to fetch team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      teamMember: data
    });

  } catch (error) {
    console.error('Team member fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
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
    const requiredFields = ['name', 'slug', 'role', 'bio', 'long_bio', 'image', 'credentials', 'experience', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const teamMemberData = {
      name: body.name,
      slug: body.slug,
      role: body.role,
      bio: body.bio,
      long_bio: body.long_bio,
      image: body.image,
      credentials: body.credentials,
      experience: body.experience,
      specializations: body.specializations || [],
      email: body.email,
      phone: body.phone,
      linkedin: body.linkedin || null,
      website: body.website || null,
      education: body.education || [],
      experience_years: parseInt(body.experience_years) || 0,
      projects_completed: parseInt(body.projects_completed) || 0,
      awards: body.awards || [],
      featured_projects: body.featured_projects || [],
      philosophies: body.philosophies || [],
      skills: body.skills || [],
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('team_members')
      .update(teamMemberData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating team member:', error);
      return NextResponse.json(
        { error: 'Failed to update team member' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      teamMember: data[0]
    });

  } catch (error) {
    console.error('Team member update error:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
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
      .from('team_members')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error deleting team member:', error);
      return NextResponse.json(
        { error: 'Failed to delete team member' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });

  } catch (error) {
    console.error('Team member deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}
