import { applyApiHeaders, saveMediaFile } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { filename, contentType, base64, size } = req.body || {};

    if (!filename || !base64) {
      return res.status(400).json({
        success: false,
        error: 'Missing required upload parameters (filename and base64 data)'
      });
    }

    // Save media file cleanly into storage
    const saved = await saveMediaFile({
      filename,
      contentType: contentType || 'image/jpeg',
      base64Data: base64,
      size: size || 0
    });

    return res.status(200).json({
      success: true,
      url: saved.url,
      id: saved.id,
      filename: saved.filename,
      provider: 'site-storage'
    });
  } catch (err: any) {
    console.error('[API upload] Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'File upload failed'
    });
  }
}
