import { applyApiHeaders, getCategories, updateCategories } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const categories = await getCategories();
      return res.status(200).json({
        success: true,
        categories
      });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const { categories } = req.body || {};
      if (!Array.isArray(categories)) {
        return res.status(400).json({ success: false, error: 'Array of categories required' });
      }
      const updated = await updateCategories(categories);
      return res.status(200).json({
        success: true,
        message: 'Categories updated in production database',
        categories: updated
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API categories] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
