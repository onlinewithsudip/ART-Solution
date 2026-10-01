import { applyApiHeaders, getAllGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const items = await getAllGalleryItems();
      return res.status(200).json({
        success: true,
        count: items.length,
        gallery: items
      });
    }

    if (req.method === 'POST') {
      const itemData = req.body;
      if (!itemData || !itemData.title) {
        return res.status(400).json({ success: false, error: 'Gallery title is required' });
      }
      const created = await addGalleryItem(itemData);
      return res.status(201).json({
        success: true,
        message: 'Gallery item added to production database',
        item: created
      });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      const targetId = id || req.query?.id;
      if (!targetId) {
        return res.status(400).json({ success: false, error: 'Gallery item ID is required' });
      }
      const updated = await updateGalleryItem(targetId, updates);
      if (!updated) {
        return res.status(404).json({ success: false, error: `Gallery item ${targetId} not found` });
      }
      return res.status(200).json({
        success: true,
        message: 'Gallery item updated in production database',
        item: updated
      });
    }

    if (req.method === 'DELETE') {
      const id = req.body?.id || req.query?.id;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Gallery item ID is required' });
      }
      const deleted = await deleteGalleryItem(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: `Gallery item ${id} not found` });
      }
      return res.status(200).json({
        success: true,
        message: `Gallery item ${id} deleted from production database`
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API gallery] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
