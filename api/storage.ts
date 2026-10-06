import fs from 'fs';
import path from 'path';
import { Product, GalleryItem, WebsiteContent, ThemeSettings, Inquiry } from '../src/types';
import {
  defaultWebsiteContent,
  defaultThemeSettings,
  defaultProducts,
  defaultGalleryItems,
  DEFAULT_EQUIPMENT_CATEGORIES,
  defaultInquiries
} from '../src/data/defaultData';

export interface SiteDatabase {
  content: WebsiteContent;
  settings: ThemeSettings;
  products: Product[];
  gallery: GalleryItem[];
  categories: string[];
  inquiries: Inquiry[];
  media: Record<string, {
    id: string;
    filename: string;
    contentType: string;
    url: string;
    data?: string; // base64
    size: number;
    createdAt: string;
  }>;
  lastUpdated: string;
  version: number;
}

// Global in-memory cache to share across invocations
let memoryDb: SiteDatabase | null = null;
let isLoaded = false;

// Resolve storage file path (works in Node.js server and Vercel serverless /tmp fallback)
function getStorageFilePath(): string {
  try {
    const localDataDir = path.join(process.cwd(), 'data');
    if (fs.existsSync(localDataDir) || !process.env.VERCEL) {
      if (!fs.existsSync(localDataDir)) {
        fs.mkdirSync(localDataDir, { recursive: true });
      }
      return path.join(localDataDir, 'site_storage.json');
    }
  } catch {
    // fallback to /tmp on serverless environments
  }
  return path.join('/tmp', 'art_medical_site_storage.json');
}

// Check for Cloud KV / Upstash Redis configuration
function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (
    url &&
    token &&
    !url.includes('your-kv-db.upstash.io') &&
    !url.includes('example.com') &&
    token !== 'your-kv-token'
  ) {
    return { url: url.replace(/\/$/, ''), token };
  }
  return null;
}

// Fetch from KV store
async function fetchFromKv(): Promise<SiteDatabase | null> {
  const kv = getKvConfig();
  if (!kv) return null;
  try {
    const res = await fetch(`${kv.url}/get/art_medical_site_db`, {
      headers: { Authorization: `Bearer ${kv.token}` },
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data: any = await res.json();
      if (data && data.result !== undefined && data.result !== null) {
        let parsed = data.result;
        if (typeof parsed === 'string') {
          try { parsed = JSON.parse(parsed); } catch {}
        }
        if (typeof parsed === 'string') {
          try { parsed = JSON.parse(parsed); } catch {}
        }
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          return parsed as SiteDatabase;
        }
      }
    }
  } catch (err) {
    console.warn('[STORAGE] KV read failed:', err);
  }
  return null;
}

// Save to KV store
async function saveToKv(db: SiteDatabase): Promise<boolean> {
  const kv = getKvConfig();
  if (!kv) return false;
  try {
    // Strip large base64 payload to ensure Redis payload stays under provider limits
    const kvDb = { ...db };
    if (kvDb.media) {
      const sanitizedMedia: typeof kvDb.media = {};
      for (const [k, v] of Object.entries(kvDb.media)) {
        sanitizedMedia[k] = { ...v, data: undefined };
      }
      kvDb.media = sanitizedMedia;
    }
    const rawJson = JSON.stringify(kvDb);

    // 1. Try standard Upstash / Vercel KV REST command payload
    const res = await fetch(`${kv.url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['SET', 'art_medical_site_db', rawJson]),
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return true;

    // 2. Fallback to /set endpoint
    const fallbackRes = await fetch(`${kv.url}/set/art_medical_site_db`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rawJson),
      signal: AbortSignal.timeout(5000),
    });
    return fallbackRes.ok;
  } catch (err) {
    console.warn('[STORAGE] KV write non-fatal warning:', err);
    return false;
  }
}

// Initialize database with complete defaults
export function createInitialDatabase(): SiteDatabase {
  return {
    content: JSON.parse(JSON.stringify(defaultWebsiteContent)),
    settings: JSON.parse(JSON.stringify(defaultThemeSettings)),
    products: JSON.parse(JSON.stringify(defaultProducts)),
    gallery: JSON.parse(JSON.stringify(defaultGalleryItems)),
    categories: [...DEFAULT_EQUIPMENT_CATEGORIES],
    inquiries: JSON.parse(JSON.stringify(defaultInquiries)),
    media: {},
    lastUpdated: new Date().toISOString(),
    version: 1
  };
}

// Helper to guarantee all content sections and fields exist
function normalizeContent(raw: any): WebsiteContent {
  const base = JSON.parse(JSON.stringify(defaultWebsiteContent));
  if (!raw || typeof raw !== 'object') return base;
  return {
    ...base,
    ...raw,
    header: { ...base.header, ...(raw.header || {}) },
    hero: { ...base.hero, ...(raw.hero || {}) },
    about: { ...base.about, ...(raw.about || {}) },
    contact: { ...base.contact, ...(raw.contact || {}) },
    footer: { ...base.footer, ...(raw.footer || {}) },
  };
}

// Load database from KV or file or defaults
export async function getDatabase(): Promise<SiteDatabase> {
  if (memoryDb && isLoaded) {
    if (!memoryDb.media) memoryDb.media = {};
    if (!memoryDb.categories) memoryDb.categories = [...DEFAULT_EQUIPMENT_CATEGORIES];
    if (!memoryDb.gallery) memoryDb.gallery = [];
    if (!memoryDb.inquiries) memoryDb.inquiries = [];
    memoryDb.content = normalizeContent(memoryDb.content);
    return memoryDb;
  }

  // 1. Try Cloud KV
  const kvData = await fetchFromKv();
  if (kvData) {
    if (!kvData.media) kvData.media = {};
    if (!kvData.categories) kvData.categories = [...DEFAULT_EQUIPMENT_CATEGORIES];
    if (!kvData.gallery) kvData.gallery = [];
    if (!kvData.inquiries) kvData.inquiries = [];
    kvData.content = normalizeContent(kvData.content);
    memoryDb = kvData;
    isLoaded = true;
    return memoryDb;
  }

  // 2. Try Local File Storage
  const filePath = getStorageFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        if (!parsed.media) parsed.media = {};
        if (!parsed.categories) parsed.categories = [...DEFAULT_EQUIPMENT_CATEGORIES];
        if (!parsed.gallery) parsed.gallery = [];
        if (!parsed.inquiries) parsed.inquiries = [];
        parsed.content = normalizeContent(parsed.content);
        memoryDb = parsed as SiteDatabase;
        isLoaded = true;
        return memoryDb;
      }
    }
  } catch (err) {
    console.warn('[STORAGE] File read error:', err);
  }

  // 3. Fallback to initial defaults
  memoryDb = createInitialDatabase();
  isLoaded = true;

  // Persist the initial state asynchronously
  try {
    await saveDatabase(memoryDb);
  } catch {
    // ignore initial save error
  }

  return memoryDb;
}

// Sequential write queue to guarantee atomic persistence without concurrency collisions
let writeQueue: Promise<void> = Promise.resolve();

// Save database to all available stores safely
export async function saveDatabase(db: SiteDatabase): Promise<void> {
  return new Promise<void>((resolve) => {
    writeQueue = writeQueue
      .catch((prevErr) => {
        console.warn('[STORAGE] Recovering write queue from prior error:', prevErr);
      })
      .then(async () => {
        db.lastUpdated = new Date().toISOString();
        db.version = (db.version || 0) + 1;
        if (!db.media) db.media = {};
        memoryDb = db;
        isLoaded = true;

        // 1. Save to local disk file atomically
        try {
          const filePath = getStorageFilePath();
          const dir = path.dirname(filePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          const tempPath = `${filePath}.tmp.${uniqueSuffix}`;
          fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), 'utf8');
          fs.renameSync(tempPath, filePath);
        } catch (fileErr) {
          console.warn('[STORAGE] Local file write error:', fileErr);
        }

        // 2. Save to Cloud KV asynchronously (non-fatal, safe timeout)
        try {
          await saveToKv(db);
        } catch (kvErr) {
          console.warn('[STORAGE] KV save non-fatal error:', kvErr);
        }
      })
      .then(resolve)
      .catch((err) => {
        console.error('[STORAGE] Unexpected error in saveDatabase queue:', err);
        memoryDb = db;
        resolve();
      });
  });
}

// Helpers for CORS and Cache-Control
export function applyApiHeaders(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
}

// Content operations
export async function getWebsiteContent(): Promise<WebsiteContent> {
  const db = await getDatabase();
  return db.content;
}

export async function updateWebsiteContent<K extends keyof WebsiteContent>(
  section: K,
  data: WebsiteContent[K]
): Promise<WebsiteContent> {
  const db = await getDatabase();
  db.content[section] = data;
  await saveDatabase(db);
  return db.content;
}

export async function replaceEntireContent(content: WebsiteContent): Promise<WebsiteContent> {
  const db = await getDatabase();
  db.content = content;
  await saveDatabase(db);
  return db.content;
}

// Settings operations
export async function getThemeSettings(): Promise<ThemeSettings> {
  const db = await getDatabase();
  return db.settings;
}

export async function updateThemeSettings(partial: Partial<ThemeSettings>): Promise<ThemeSettings> {
  const db = await getDatabase();
  db.settings = { ...db.settings, ...partial };
  await saveDatabase(db);
  return db.settings;
}

// Products operations
export async function getAllProducts(): Promise<Product[]> {
  const db = await getDatabase();
  return db.products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const db = await getDatabase();
  return db.products.find((p) => p.id === id);
}

export async function addProduct(product: Omit<Product, 'id'> & { id?: string }): Promise<Product> {
  const db = await getDatabase();
  const newProduct: Product = {
    ...product,
    id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
  };
  db.products = [newProduct, ...db.products];
  await saveDatabase(db);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = await getDatabase();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...updates };
  await saveDatabase(db);
  return db.products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLen) {
    await saveDatabase(db);
    return true;
  }
  return false;
}

// Gallery operations
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDatabase();
  return db.gallery;
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id'> & { id?: string }): Promise<GalleryItem> {
  const db = await getDatabase();
  const newItem: GalleryItem = {
    ...item,
    id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
  };
  db.gallery = [newItem, ...db.gallery];
  await saveDatabase(db);
  return newItem;
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const db = await getDatabase();
  const index = db.gallery.findIndex((g) => g.id === id);
  if (index === -1) return null;
  db.gallery[index] = { ...db.gallery[index], ...updates };
  await saveDatabase(db);
  return db.gallery[index];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLen = db.gallery.length;
  db.gallery = db.gallery.filter((g) => g.id !== id);
  if (db.gallery.length !== initialLen) {
    await saveDatabase(db);
    return true;
  }
  return false;
}

// Categories operations
export async function getCategories(): Promise<string[]> {
  const db = await getDatabase();
  return db.categories;
}

export async function updateCategories(categories: string[]): Promise<string[]> {
  const db = await getDatabase();
  db.categories = categories;
  await saveDatabase(db);
  return db.categories;
}

// Media upload and retrieval
export async function saveMediaFile(fileInfo: {
  filename: string;
  contentType: string;
  base64Data?: string;
  size?: number;
}): Promise<{ id: string; url: string; filename: string }> {
  const db = await getDatabase();
  const id = `media-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const cleanExt = path.extname(fileInfo.filename) || '.jpg';
  const diskFilename = `${id}${cleanExt}`;
  let publicUrl = `/api/media?id=${id}`;

  // Try writing to public/uploads on Node.js / Docker
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    if (fileInfo.base64Data) {
      const buffer = Buffer.from(
        fileInfo.base64Data.replace(/^data:image\/\w+;base64,/, '').replace(/^data:[^;]+;base64,/, ''),
        'base64'
      );
      fs.writeFileSync(path.join(uploadDir, diskFilename), buffer);
      publicUrl = `/uploads/${diskFilename}`;
    }
  } catch (err) {
    console.warn('[STORAGE] Could not write to public/uploads, using API media URL:', err);
  }

  // Register in database media index
  if (!db.media) db.media = {};
  db.media[id] = {
    id,
    filename: fileInfo.filename,
    contentType: fileInfo.contentType || 'image/jpeg',
    url: publicUrl,
    data: fileInfo.base64Data, // Fallback persistence inside db
    size: fileInfo.size || 0,
    createdAt: new Date().toISOString()
  };

  await saveDatabase(db);

  return { id, url: publicUrl, filename: fileInfo.filename };
}

export async function getMediaById(id: string) {
  const db = await getDatabase();
  return db.media[id] || null;
}

// Status & diagnostics
export function getDbStatus() {
  const kv = getKvConfig();
  return {
    provider: kv ? 'Vercel KV / Upstash Redis' : (process.env.VERCEL ? 'Vercel Serverless Store' : 'Persistent File Store'),
    connected: true,
    isVercel: !!process.env.VERCEL,
    hasKvConfig: !!kv,
    lastUpdated: memoryDb?.lastUpdated || null,
    productsCount: memoryDb?.products?.length || 0,
    galleryCount: memoryDb?.gallery?.length || 0,
    version: memoryDb?.version || 1
  };
}
