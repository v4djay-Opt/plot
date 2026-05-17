import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us via WhatsApp.' },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const { name, phone, location, message, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const toEmail = process.env.LEAD_EMAIL ?? 'info@plotsgurgaon.in';
    const fromEmail = process.env.LEAD_FROM ?? 'leads@plotsgurgaon.in';

    await resend.emails.send({
      from: `PlotsGurgaon Leads <${fromEmail}>`,
      to: toEmail,
      subject: `New Lead: ${name} â€” ${location || 'No location'}`,
      text: `New lead from plotsgurgaon.in

Name: ${name}
Phone: ${phone}
Location Interest: ${location || 'Not specified'}
Source: ${source || 'Website'}

Message:
${message || 'No message'}`,
      html: `<h2>New Lead from plotsgurgaon.in</h2>
<table>
  <tr><td><strong>Name</strong></td><td>${name}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
  <tr><td><strong>Location Interest</strong></td><td>${location || 'Not specified'}</td></tr>
  <tr><td><strong>Source</strong></td><td>${source || 'Website'}</td></tr>
</table>
<p><strong>Message:</strong></p>
<p>${(message || 'No message').replace(/\n/g, '<br/>')}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to send lead. Please try again or WhatsApp us directly.' },
      { status: 500 }
    );
  }
}
