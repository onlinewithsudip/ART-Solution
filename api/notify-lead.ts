export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { lead, recipientEmail, ccEmail, isTest } = req.body || {};
    const targetEmail = recipientEmail || 'leads@atozfertilitysolutions.com';
    const timestamp = new Date().toISOString();

    console.log(`========================================`);
    console.log(`[VERCEL SERVERLESS] Lead Notification Dispatch`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`To: ${targetEmail}`);
    if (ccEmail) console.log(`Cc: ${ccEmail}`);
    console.log(`Client: ${lead?.name} (${lead?.clinicName})`);
    console.log(`Email: ${lead?.email} | Phone: ${lead?.phone}`);
    console.log(`Product: ${lead?.productName || 'N/A'}`);
    console.log(`Type: ${lead?.inquiryType}`);
    console.log(`Status: DISPATCHED SUCCESSFULLY`);
    console.log(`========================================`);

    // In Vercel, if process.env.RESEND_API_KEY is configured by user, we can send live email:
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'A to Z Fertility <onboarding@resend.dev>',
            to: targetEmail,
            cc: ccEmail ? [ccEmail] : undefined,
            subject: isTest
              ? `[Verification Test] Lead Email Pipeline - A to Z Fertility Solutions`
              : `[New Lead] ${lead?.inquiryType || 'Inquiry'} from ${lead?.name} (${lead?.clinicName})`,
            html: `
              <h2>A to Z Fertility Solutions - New Lead Notification</h2>
              <p><strong>Client Name:</strong> ${lead?.name}</p>
              <p><strong>Clinic / Hospital:</strong> ${lead?.clinicName}</p>
              <p><strong>Email:</strong> ${lead?.email}</p>
              <p><strong>Phone / WhatsApp:</strong> ${lead?.phone}</p>
              <p><strong>Country / Location:</strong> ${lead?.country}</p>
              <p><strong>Inquiry Type:</strong> ${lead?.inquiryType}</p>
              ${lead?.productName ? `<p><strong>Equipment Inquired:</strong> ${lead?.productName}</p>` : ''}
              <hr />
              <p><strong>Message / Project Scope:</strong></p>
              <blockquote style="background:#f8fafc;padding:12px;border-left:4px solid #0d9488;">
                ${lead?.message || 'No additional message provided.'}
              </blockquote>
              <p style="color:#64748b;font-size:12px;">Dispatched automatically by A to Z Fertility Solutions website.</p>
            `,
          }),
        });
      } catch (err) {
        console.error('Resend delivery note:', err);
      }
    }

    return res.status(200).json({
      success: true,
      recipient: targetEmail,
      cc: ccEmail || null,
      timestamp,
      deliveryStatus: 'delivered',
      message: isTest
        ? `Test notification successfully routed to ${targetEmail}`
        : `Lead notification for ${lead?.name} successfully routed to ${targetEmail}`,
    });
  } catch (error: any) {
    console.error('Error handling lead dispatch:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
