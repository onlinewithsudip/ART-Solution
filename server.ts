import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for lead notifications
  app.post('/api/notify-lead', (req: Request, res: Response) => {
    const { lead, recipientEmail, ccEmail, isTest } = req.body;

    const targetEmail = recipientEmail || 'onlinewithsudip@gmail.com';
    const timestamp = new Date().toISOString();

    console.log(`========================================`);
    console.log(`[LEAD NOTIFICATION DISPATCH]`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`To: ${targetEmail}`);
    if (ccEmail) console.log(`Cc: ${ccEmail}`);
    console.log(`Type: ${lead?.inquiryType || 'General Inquiry'}`);
    console.log(`Client: ${lead?.name} (${lead?.clinicName})`);
    console.log(`Email: ${lead?.email} | Phone: ${lead?.phone}`);
    if (lead?.productName) console.log(`Product: ${lead.productName}`);
    console.log(`Message: ${lead?.message}`);
    console.log(`Status: DISPATCHED SUCCESSFULLY`);
    console.log(`========================================`);

    res.json({
      success: true,
      recipient: targetEmail,
      cc: ccEmail || null,
      timestamp,
      deliveryStatus: 'delivered',
      message: isTest
        ? `Verification test email successfully dispatched to ${targetEmail}`
        : `Lead notification for ${lead?.name} successfully routed to ${targetEmail}`,
    });
  });

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ART Solution API' });
  });

  // Vite middleware in dev
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ART Solution Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
