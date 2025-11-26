import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/supabase/queries';
import { sendNewsletterWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newsletterData = {
      email: body.email,
      name: body.name || null,
    };

    // Subscribe to newsletter
    const subscription = await subscribeToNewsletter(newsletterData.email, newsletterData.name);

    // Send welcome email (don't fail the request if email fails)
    try {
      await sendNewsletterWelcomeEmail(newsletterData);
    } catch (emailError) {
      console.error('Newsletter welcome email failed:', emailError);
      // Continue with success response since subscription was saved
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscription
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
