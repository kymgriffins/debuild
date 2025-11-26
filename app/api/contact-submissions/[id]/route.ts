import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();

    const { status, notes } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating contact submission:', error);
      return NextResponse.json(
        { error: 'Failed to update contact submission' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Contact submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission updated successfully',
      submission: data[0]
    });

  } catch (error) {
    console.error('Contact submission update error:', error);
    return NextResponse.json(
      { error: 'Failed to update contact submission' },
      { status: 500 }
    );
  }
}
