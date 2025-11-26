import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching contact submissions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contact submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submissions: data || []
    });

  } catch (error) {
    console.error('Contact submissions fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}
