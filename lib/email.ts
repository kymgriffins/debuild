import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Debuild Contact <contact@debuild.co.ke>',
      to: ['hello@debuild.co.ke'], // Replace with your actual email
      subject: `New Contact Form Submission: ${formData.projectType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Client Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #667eea;">${formData.email}</a></td>
                </tr>
                ${formData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${formData.phone}" style="color: #667eea;">${formData.phone}</a></td>
                </tr>
                ` : ''}
                ${formData.company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0;">${formData.company}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: #fff; border: 1px solid #e9ecef; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Project Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Project Type:</td>
                  <td style="padding: 8px 0;">${formData.projectType}</td>
                </tr>
                ${formData.budget ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Budget Range:</td>
                  <td style="padding: 8px 0;">${formData.budget}</td>
                </tr>
                ` : ''}
                ${formData.timeline ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Timeline:</td>
                  <td style="padding: 8px 0;">${formData.timeline}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="background: #fff; border: 1px solid #e9ecef; padding: 30px; border-radius: 10px;">
              <h2 style="color: #333; margin-top: 0;">Message</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #667eea;">
                <p style="margin: 0; white-space: pre-wrap;">${formData.message}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 14px;">
                This message was sent from the Debuild website contact form.<br>
                Please respond within 2 hours as promised.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Client Information:
- Name: ${formData.name}
- Email: ${formData.email}
${formData.phone ? `- Phone: ${formData.phone}` : ''}
${formData.company ? `- Company: ${formData.company}` : ''}

Project Details:
- Project Type: ${formData.projectType}
${formData.budget ? `- Budget Range: ${formData.budget}` : ''}
${formData.timeline ? `- Timeline: ${formData.timeline}` : ''}

Message:
${formData.message}

---
This message was sent from the Debuild website contact form.
      `
    });

    if (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

export async function sendClientConfirmationEmail(formData: ContactFormData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Debuild <hello@debuild.co.ke>',
      to: [formData.email],
      subject: 'Thank you for contacting Debuild - We\'ll be in touch soon!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank you for contacting Debuild</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; text-align: center;">Thank You, ${formData.name}!</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">We've received your message</h2>
              <p>Thank you for reaching out to Debuild. We've received your inquiry about <strong>${formData.projectType}</strong> and our team is reviewing it now.</p>

              <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #667eea;">What happens next?</h3>
                <ol style="margin: 0; padding-left: 20px;">
                  <li><strong>Review (2 hours)</strong> - Our team reviews your project details</li>
                  <li><strong>Discovery Call (30 min)</strong> - Free consultation to understand your vision</li>
                  <li><strong>Custom Proposal (24 hours)</strong> - Detailed proposal with timeline and budget</li>
                </ol>
              </div>
            </div>

            <div style="background: #fff; border: 1px solid #e9ecef; padding: 30px; border-radius: 10px;">
              <h2 style="color: #333; margin-top: 0;">Your Project Summary</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Project Type:</td>
                  <td style="padding: 8px 0;">${formData.projectType}</td>
                </tr>
                ${formData.budget ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Budget Range:</td>
                  <td style="padding: 8px 0;">${formData.budget}</td>
                </tr>
                ` : ''}
                ${formData.timeline ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Timeline:</td>
                  <td style="padding: 8px 0;">${formData.timeline}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 14px;">
                Questions? Reply to this email or call us at +254 700 000 000<br>
                Visit <a href="https://debuild.co.ke" style="color: #667eea;">debuild.co.ke</a> to learn more about our work
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Thank you for contacting Debuild!

Hi ${formData.name},

We've received your message about ${formData.projectType} and our team is reviewing it now.

What happens next?
1. Review (2 hours) - Our team reviews your project details
2. Discovery Call (30 min) - Free consultation to understand your vision
3. Custom Proposal (24 hours) - Detailed proposal with timeline and budget

We'll be in touch within 2 hours!

Questions? Reply to this email or call us at +254 700 000 000
Visit https://debuild.co.ke to learn more about our work
      `
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
      // Don't throw error for confirmation email failure
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return null;
  }
}

export async function sendNewsletterWelcomeEmail(newsletterData: NewsletterData) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Debuild <hello@debuild.co.ke>',
      to: [newsletterData.email],
      subject: 'Welcome to the Debuild Newsletter!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Debuild Newsletter</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; text-align: center;">Welcome to Debuild!</h1>
            </div>

            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
              <h2 style="color: #333; margin-top: 0;">${newsletterData.name ? `Hi ${newsletterData.name}!` : 'Hello!'}</h2>
              <p>Thank you for subscribing to the Debuild newsletter! You're now part of our community of architecture and design enthusiasts.</p>

              <p>You'll receive:</p>
              <ul style="margin: 20px 0;">
                <li>Project updates and behind-the-scenes insights</li>
                <li>Architecture trends and design inspiration</li>
                <li>Exclusive previews of upcoming projects</li>
                <li>Tips for sustainable building and design</li>
              </ul>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://debuild.co.ke/projects" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Explore Our Projects
                </a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #666; font-size: 12px;">
                You can unsubscribe at any time by clicking the link in our emails.<br>
                Visit <a href="https://debuild.co.ke" style="color: #667eea;">debuild.co.ke</a>
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
Welcome to Debuild!

${newsletterData.name ? `Hi ${newsletterData.name}!` : 'Hello!'}

Thank you for subscribing to the Debuild newsletter!

You'll receive:
- Project updates and behind-the-scenes insights
- Architecture trends and design inspiration
- Exclusive previews of upcoming projects
- Tips for sustainable building and design

Visit https://debuild.co.ke/projects to explore our work.
      `
    });

    if (error) {
      console.error('Error sending newsletter welcome email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending newsletter welcome email:', error);
    throw error;
  }
}
