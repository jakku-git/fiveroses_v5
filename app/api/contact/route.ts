import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      jobTitle,
      company,
      email,
      location,
      market,
      comment,
    } = body;

    // Validate the email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Fiveroses Contact Form <contact@fiveroses.com.au>',
      to: ['hello@fiveroses.com.au'],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #000; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #666; }
              .message { background: #fff; padding: 15px; border-left: 4px solid #000; margin-top: 20px; }
              .footer { text-align: center; padding: 20px; font-size: 0.9em; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>A new inquiry has been received from your website</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <p class="label">Contact Information:</p>
                  <p>${firstName} ${lastName}</p>
                  <p>${email}</p>
                  ${location ? `<p>${location}</p>` : ''}
                </div>

                <div class="field">
                  <p class="label">Company Details:</p>
                  ${company ? `<p>Company: ${company}</p>` : ''}
                  ${jobTitle ? `<p>Position: ${jobTitle}</p>` : ''}
                  ${market ? `<p>Market: ${market}</p>` : ''}
                </div>

                <div class="message">
                  <p class="label">Message:</p>
                  <p>${comment}</p>
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from your Fiveroses contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
} 