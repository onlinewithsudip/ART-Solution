export default function handler(_req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    service: 'A to Z Fertility Solutions API (Vercel)',
    timestamp: new Date().toISOString(),
  });
}
