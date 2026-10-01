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
  if (url && token) {
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
      headers: { Authorization: `Bearer ${kv.token}` }
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
    const rawJson = JSON.stringify(db);
    // 1. Try standard Upstash / Vercel KV REST command payload
    const res = await fetch(`${kv.url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['SET', 'art_medical_site_db', rawJson])
    });
    if (res.ok) return true;

    // 2. Fallback to /set endpoint
    const fallbackRes = await fetch(`${kv.url}/set/art_medical_site_db`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rawJson)
    });
    return fallbackRes.ok;
  } catch (err) {
    console.warn('[STORAGE] KV write failed:', err);
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

// Load database from KV or file or defaults
export async function getDatabase(): Promise<SiteDatabase> {
  if (memoryDb && isLoaded) {
    return memoryDb;
  }

  // 1. Try Cloud KV
  const kvData = await fetchFromKv();
  if (kvData) {
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

// Save database to all available stores
export async function saveDatabase(db: SiteDatabase): Promise<void> {
  db.lastUpdated = new Date().toISOString();
  db.version = (db.version || 0) + 1;
  memoryDb = db;
  isLoaded = true;

  // 1. Save to Cloud KV if available
  await saveToKv(db);

  // 2. Save to local disk file
  try {
    const filePath = getStorageFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.warn('[STORAGE] File write error:', err);
  }
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
