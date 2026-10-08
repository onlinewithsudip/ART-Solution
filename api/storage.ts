import fs from 'fs';
import path from 'path';
import { Product, GalleryItem, WebsiteContent, ThemeSettings, Inquiry } from '../src/types/index';
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

// Global in-memory database cache
let memoryDb: SiteDatabase | null = null;
let isLoaded = false;

// Check if running on Vercel serverless environment
export const isVercelEnvironment = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

// Resolve storage file path safely
function getStorageFilePath(): string {
  // On Vercel serverless functions, the root filesystem is read-only; use /tmp for temporary caching
  if (isVercelEnvironment) {
    return path.join('/tmp', 'art_medical_site_storage.json');
  }

  // On local Node.js / Docker server, use ./data/site_storage.json
  try {
    const localDataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(localDataDir)) {
      fs.mkdirSync(localDataDir, { recursive: true });
    }
    return path.join(localDataDir, 'site_storage.json');
  } catch {
    return path.join('/tmp', 'art_medical_site_storage.json');
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
export function normalizeContent(raw: any): WebsiteContent {
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

// Load database from file or initial seed
export async function getDatabase(): Promise<SiteDatabase> {
  if (memoryDb && isLoaded) {
    if (!memoryDb.media) memoryDb.media = {};
    if (!memoryDb.categories) memoryDb.categories = [...DEFAULT_EQUIPMENT_CATEGORIES];
    if (!memoryDb.gallery) memoryDb.gallery = [];
    if (!memoryDb.inquiries) memoryDb.inquiries = [];
    memoryDb.content = normalizeContent(memoryDb.content);
    return memoryDb;
  }

  // 1. Try reading from seed file or saved file
  const candidatePaths = [
    getStorageFilePath(),
    path.join(process.cwd(), 'data', 'site_storage.json'),
    path.join('/tmp', 'art_medical_site_storage.json')
  ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const fileContent = fs.readFileSync(p, 'utf8');
        const parsed = JSON.parse(fileContent);
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
      // Continue to next candidate
    }
  }

  // 2. Fallback to initial defaults
  memoryDb = createInitialDatabase();
  isLoaded = true;

  // Persist asynchronously if file system is writable
  try {
    await saveDatabase(memoryDb);
  } catch {
    // Ignore initial save error
  }

  return memoryDb;
}

// Save database safely without throwing unhandled errors
export async function saveDatabase(db: SiteDatabase): Promise<void> {
  try {
    db.lastUpdated = new Date().toISOString();
    db.version = (db.version || 0) + 1;
    if (!db.media) db.media = {};
    if (!db.categories) db.categories = [...DEFAULT_EQUIPMENT_CATEGORIES];
    if (!db.gallery) db.gallery = [];
    if (!db.inquiries) db.inquiries = [];
    db.content = normalizeContent(db.content);

    // Update in-memory database immediately
    memoryDb = db;
    isLoaded = true;

    // Try saving to disk if writable
    try {
      const filePath = getStorageFilePath();
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
    } catch (fileErr) {
      // If root is read-only (e.g. Vercel), try saving to /tmp cache
      if (!isVercelEnvironment) {
        console.warn('[STORAGE] Local file write note:', fileErr);
      }
      try {
        const tmpPath = path.join('/tmp', 'art_medical_site_storage.json');
        fs.writeFileSync(tmpPath, JSON.stringify(db, null, 2), 'utf8');
      } catch {
        // In-memory cache remains valid
      }
    }
  } catch (err) {
    console.error('[STORAGE] Unexpected error in saveDatabase:', err);
    memoryDb = db;
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
  db.content = normalizeContent(content);
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

  // Try writing to public/uploads on Node.js / Docker if writable
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
    // If not writable, publicUrl remains /api/media?id=${id}
  }

  // Register in database media index
  if (!db.media) db.media = {};
  db.media[id] = {
    id,
    filename: fileInfo.filename,
    contentType: fileInfo.contentType || 'image/jpeg',
    url: fileInfo.base64Data ? fileInfo.base64Data : publicUrl,
    data: fileInfo.base64Data,
    size: fileInfo.size || 0,
    createdAt: new Date().toISOString()
  };

  await saveDatabase(db);

  return { id, url: db.media[id].url, filename: fileInfo.filename };
}

export async function getMediaById(id: string) {
  const db = await getDatabase();
  return db.media[id] || null;
}

// Status & diagnostics
export function getDbStatus() {
  return {
    provider: isVercelEnvironment ? 'Production Serverless Store' : 'Local Persistent Store',
    connected: true,
    isVercel: isVercelEnvironment,
    lastUpdated: memoryDb?.lastUpdated || new Date().toISOString(),
    productsCount: memoryDb?.products?.length || 0,
    galleryCount: memoryDb?.gallery?.length || 0,
    categoriesCount: memoryDb?.categories?.length || 0,
    version: memoryDb?.version || 1
  };
}
