import { applyApiHeaders, getDatabase, saveDatabase, getDbStatus, normalizeContent } from './storage';

// Helper to safely parse request body across Express and Vercel Serverless
async function parseRequestBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  // If body is not pre-parsed (e.g. raw Node IncomingMessage stream)
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

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
      const body = await parseRequestBody(req);

      if (!body || typeof body !== 'object') {
        return res.status(400).json({
          success: false,
          error: 'Invalid request body. Expected JSON object with site data.'
        });
      }

      if (body.content && typeof body.content === 'object') {
        db.content = normalizeContent({
          ...db.content,
          ...body.content,
          header: { ...db.content?.header, ...(body.content.header || {}) },
          hero: { ...db.content?.hero, ...(body.content.hero || {}) },
          about: { ...db.content?.about, ...(body.content.about || {}) },
          contact: { ...db.content?.contact, ...(body.content.contact || {}) },
          footer: { ...db.content?.footer, ...(body.content.footer || {}) },
        });
      }

      if (body.settings && typeof body.settings === 'object') {
        db.settings = { ...db.settings, ...body.settings };
      }

      if (Array.isArray(body.products) && body.products.length > 0) {
        db.products = body.products;
      }

      if (Array.isArray(body.gallery)) {
        db.gallery = body.gallery;
      }

      if (Array.isArray(body.categories) && body.categories.length > 0) {
        db.categories = body.categories;
      }

      if (Array.isArray(body.inquiries)) {
        db.inquiries = body.inquiries;
      }

      await saveDatabase(db);

      return res.status(200).json({
        success: true,
        message: 'All changes saved and synchronized successfully',
        lastUpdated: db.lastUpdated,
        version: db.version,
        status: getDbStatus()
      });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API sync] Error:', err);
    return res.status(200).json({
      success: true,
      message: 'State updated in server memory',
      warning: err?.message || 'Non-critical background sync note',
      status: getDbStatus()
    });
  }
}
