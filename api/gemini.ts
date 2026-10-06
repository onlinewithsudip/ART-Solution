import { applyApiHeaders } from './storage';
import { GoogleGenAI } from '@google/genai';

/**
 * Server-side Gemini API Route
 * Securely uses only process.env.GEMINI_API_KEY.
 * Never exposes the API key to client-side code.
 */
export default async function handler(req: any, res: any) {
  applyApiHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Health check / status check to verify if GEMINI_API_KEY is configured
  if (req.method === 'GET') {
    const isConfigured = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
    return res.status(200).json({
      success: true,
      configured: isConfigured,
      model: 'gemini-3.8-flash',
      message: isConfigured
        ? 'Gemini API is securely configured on server environment'
        : 'GEMINI_API_KEY is not configured. Add GEMINI_API_KEY to Vercel environment variables.',
    });
  }

  // POST: Secure content generation
  if (req.method === 'POST') {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim().length === 0) {
      return res.status(200).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on Vercel environment variables. Please add GEMINI_API_KEY to your Vercel project settings.',
        code: 'MISSING_API_KEY',
      });
    }

    try {
      const {
        action = 'custom-prompt',
        prompt,
        productName,
        category,
        makeImporter,
        modelNumber,
        currentText,
        context,
      } = req.body || {};

      let constructedPrompt = '';

      if (action === 'generate-description') {
        constructedPrompt = `You are a medical copywriter specializing in Assisted Reproductive Technology (ART) and IVF laboratory equipment.
Write a professional, compelling, and clinically sound product description for:
Product Name: ${productName || 'IVF Laboratory Equipment'}
Category: ${category || 'Laboratory Equipment'}
Make / Importer: ${makeImporter || 'ART Medical'}
Model: ${modelNumber || 'Standard'}
${currentText ? `Current Notes / Text: ${currentText}` : ''}

Include:
1. An engaging 2-3 paragraph overview describing clinical utility, precision, and benefits for embryologists and IVF clinics.
2. 4-6 key bullet points highlighting quality compliance (e.g. MEA tested, endotoxin tested, ISO/CE/FDA compliance, non-toxic biocompatibility).

Keep tone professional, authoritative, and medically accurate. Do not include markdown code fences.`;
      } else if (action === 'improve-text') {
        constructedPrompt = `You are a professional medical website copywriter. Enhance, polish, and professionalize the following website text for an ART & IVF medical equipment company. Keep the meaning intact while making it compelling, clear, and trustworthy:

Text:
"${currentText || prompt}"

Context: ${context || 'Website content for IVF lab equipment supplier'}.
Return only the improved text.`;
      } else if (action === 'generate-seo') {
        constructedPrompt = `Generate an optimized SEO Meta Title (under 60 characters) and Meta Description (140-160 characters) for an IVF equipment supplier page:
Subject: ${productName || context || prompt || 'ART Medical IVF Equipment'}
Category: ${category || 'IVF Supplies'}

Format output strictly as:
Title: [Meta Title]
Description: [Meta Description]`;
      } else if (action === 'generate-faq') {
        constructedPrompt = `You are a biomedical expert in IVF laboratories. Generate 3 frequently asked questions with clear, reassuring, and technically accurate answers regarding:
Topic: ${prompt || context || 'IVF Equipment & Media QA Compliance'}

Format as:
Q: [Question]
A: [Answer]`;
      } else if (action === 'generate-specs') {
        constructedPrompt = `Generate a realistic structured list of technical specifications for this IVF medical equipment:
Product: ${productName}
Category: ${category}
${makeImporter ? `Brand: ${makeImporter}` : ''}

Provide 5-8 bulleted technical specifications (e.g. temperature uniformity, materials, sterilization, certifications, shelf life, storage requirements).`;
      } else {
        // Custom prompt
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
          return res.status(400).json({
            success: false,
            error: 'Prompt is required for Gemini AI request.',
          });
        }
        constructedPrompt = prompt.trim();
      }

      const ai = new GoogleGenAI({ apiKey });
      let generatedText = '';
      let usedModel = 'gemini-3.8-flash';

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: constructedPrompt,
        });
        generatedText = response.text || '';
      } catch (primaryErr: any) {
        const msg = primaryErr?.message || '';
        // If 503 high demand or unavailable, seamlessly fallback to gemini-3.5-flash-lite
        if (msg.includes('503') || msg.includes('high demand') || msg.includes('UNAVAILABLE') || msg.includes('NOT_FOUND')) {
          usedModel = 'gemini-3.5-flash-lite';
          const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-3.5-flash-lite',
            contents: constructedPrompt,
          });
          generatedText = fallbackResponse.text || '';
        } else {
          throw primaryErr;
        }
      }

      return res.status(200).json({
        success: true,
        text: generatedText,
        model: usedModel,
        action,
      });
    } catch (err: any) {
      console.error('[Gemini API Server Error]:', err);
      const errorMessage = err?.message || 'Failed to generate content with Gemini API';
      const isAuthError =
        errorMessage.includes('API key not valid') ||
        errorMessage.includes('API_KEY_INVALID') ||
        errorMessage.includes('403') ||
        errorMessage.includes('401');

      return res.status(200).json({
        success: false,
        error: isAuthError
          ? 'Invalid GEMINI_API_KEY. Please verify your Google AI Studio API key in Vercel environment variables.'
          : errorMessage,
        code: isAuthError ? 'INVALID_API_KEY' : 'API_ERROR',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
