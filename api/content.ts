import { applyApiHeaders, getWebsiteContent, updateWebsiteContent, replaceEntireContent } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const content = await getWebsiteContent();
      return res.status(200).json({
        success: true,
        content
      });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const { section, data, content } = req.body || {};

      if (section && data) {
        const updated = await updateWebsiteContent(section, data);
        return res.status(200).json({
          success: true,
          message: `Section "${section}" updated in production database`,
          content: updated
        });
      }

      if (content) {
        const updated = await replaceEntireContent(content);
        return res.status(200).json({
          success: true,
          message: 'Website content updated in production database',
          content: updated
        });
      }

      return res.status(400).json({ success: false, error: 'Provide either { section, data } or { content }' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API content] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
