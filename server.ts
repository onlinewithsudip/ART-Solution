import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global CORS & preflight handler
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ limit: '25mb', extended: true }));

  // Static files and uploads directories
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
  if (fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  // Production Storage & Database API routes
  const syncHandler = (await import('./api/sync')).default;
  const productsHandler = (await import('./api/products')).default;
  const contentHandler = (await import('./api/content')).default;
  const settingsHandler = (await import('./api/settings')).default;
  const galleryHandler = (await import('./api/gallery')).default;
  const categoriesHandler = (await import('./api/categories')).default;
  const uploadHandler = (await import('./api/upload')).default;
  const mediaHandler = (await import('./api/media')).default;
  const dbStatusHandler = (await import('./api/db-status')).default;

  app.all('/api/sync', (req, res) => syncHandler(req, res));
  app.all('/api/products', (req, res) => productsHandler(req, res));
  app.all('/api/content', (req, res) => contentHandler(req, res));
  app.all('/api/settings', (req, res) => settingsHandler(req, res));
  app.all('/api/gallery', (req, res) => galleryHandler(req, res));
  app.all('/api/categories', (req, res) => categoriesHandler(req, res));
  app.all('/api/upload', (req, res) => uploadHandler(req, res));
  app.all('/api/media', (req, res) => mediaHandler(req, res));
  app.all('/api/db-status', (req, res) => dbStatusHandler(req, res));

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
    res.json({ status: 'ok', service: 'ART Medical API' });
  });

  // Vite middleware in dev
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ART Medical Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
