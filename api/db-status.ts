import { applyApiHeaders, getDbStatus, getDatabase } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await getDatabase();
    const status = getDbStatus();

    return res.status(200).json({
      success: true,
      status: {
        ...status,
        productsCount: db.products.length,
        galleryCount: db.gallery.length,
        categoriesCount: db.categories.length,
        inquiriesCount: db.inquiries.length,
        mediaCount: Object.keys(db.media || {}).length,
        lastUpdated: db.lastUpdated,
        version: db.version
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Database status check failed'
    });
  }
}
