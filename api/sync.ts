import { applyApiHeaders, getDatabase, saveDatabase, getDbStatus } from './storage';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb',
    },
  },
};

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const db = await getDatabase();
      return res.status(200).json({
        success: true,
        content: db.content,
        settings: db.settings,
        products: db.products,
        gallery: db.gallery,
        categories: db.categories,
        inquiries: db.inquiries,
        lastUpdated: db.lastUpdated,
        version: db.version,
        status: getDbStatus()
      });
    }

    if (req.method === 'POST') {
      const db = await getDatabase();
      let body = req.body || {};
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          // fallback
        }
      }

      if (body.content) db.content = body.content;
      if (body.settings) db.settings = body.settings;
      if (Array.isArray(body.products) && body.products.length > 0) db.products = body.products;
      if (Array.isArray(body.gallery)) db.gallery = body.gallery;
      if (Array.isArray(body.categories)) db.categories = body.categories;
      if (Array.isArray(body.inquiries)) db.inquiries = body.inquiries;

      await saveDatabase(db);

      return res.status(200).json({
        success: true,
        message: 'Production database synchronized successfully',
        lastUpdated: db.lastUpdated,
        version: db.version,
        status: getDbStatus()
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API sync] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
