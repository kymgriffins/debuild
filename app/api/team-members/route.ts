import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('experience_years', { ascending: false });

    if (error) {
      console.error('Error fetching team members:', error);
      return NextResponse.json(
        { error: 'Failed to fetch team members' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      teamMembers: data || []
    });

  } catch (error) {
    console.error('Team members fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
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
    };

    const { data, error } = await supabase
      .from('team_members')
      .insert([teamMemberData])
      .select();

    if (error) {
      console.error('Error creating team member:', error);
      return NextResponse.json(
        { error: 'Failed to create team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Team member created successfully',
      teamMember: data?.[0]
    });

  } catch (error) {
    console.error('Team member creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
