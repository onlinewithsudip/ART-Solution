import { applyApiHeaders, saveMediaFile } from './storage';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
  },
};

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

    // Check if Vercel Blob token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const buffer = Buffer.from(
          base64.replace(/^data:[^;]+;base64,/, ''),
          'base64'
        );
        const cleanName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
        const blobRes = await fetch(`https://blob.vercel-storage.com/${cleanName}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            'x-api-version': '7',
            'content-type': contentType || 'application/octet-stream',
          },
          body: buffer,
        });

        if (blobRes.ok) {
          const blobData: any = await blobRes.json();
          if (blobData && blobData.url) {
            return res.status(200).json({
              success: true,
              url: blobData.url,
              id: blobData.pathname || cleanName,
              filename,
              provider: 'vercel-blob'
            });
          }
        }
      } catch (blobErr) {
        console.warn('[UPLOAD] Vercel blob direct upload error, using fallback:', blobErr);
      }
    }

    // Use built-in persistent media manager
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
      provider: 'production-storage'
    });
  } catch (err: any) {
    console.error('[API upload] Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'File upload failed'
    });
  }
}
