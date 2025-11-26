import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm } from '@/lib/supabase/queries';
import { sendContactEmail, sendClientConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'projectType', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const formData = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      projectType: body.projectType,
      budget: body.budget || null,
      timeline: body.timeline || null,
      message: body.message,
    };

    // Save to database
    const submission = await submitContactForm(formData);

    // Send emails (don't fail the request if email fails)
    try {
      await Promise.all([
        sendContactEmail(formData),
        sendClientConfirmationEmail(formData)
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with success response since data was saved
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      submission
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
