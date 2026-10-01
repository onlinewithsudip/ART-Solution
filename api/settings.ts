import { applyApiHeaders, getThemeSettings, updateThemeSettings } from './storage';

export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const settings = await getThemeSettings();
      return res.status(200).json({
        success: true,
        settings
      });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const updates = req.body || {};
      const updated = await updateThemeSettings(updates);
      return res.status(200).json({
        success: true,
        message: 'Branding & theme settings updated in production database',
        settings: updated
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API settings] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
  }
}
