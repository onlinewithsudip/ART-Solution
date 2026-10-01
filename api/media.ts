import { getMediaById } from './storage';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const id = req.query?.id || req.url?.split('?id=')[1]?.split('&')[0];
    if (!id) {
      return res.status(400).json({ error: 'Media ID is required' });
    }

    const item = await getMediaById(id);
    if (!item || !item.data) {
      return res.status(404).json({ error: 'Media not found or data expired' });
    }

    const contentType = item.contentType || 'image/jpeg';
    const base64Data = item.data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(buffer);
  } catch (err: any) {
    console.error('[API media] Error:', err);
    return res.status(500).json({ error: err.message || 'Error retrieving media' });
  }
}
