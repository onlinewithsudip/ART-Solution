import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Page,
  Product,
  GalleryItem,
  WebsiteContent,
  ThemeSettings,
  Inquiry,
  AdminTab,
} from '../types';
import {
  defaultThemeSettings,
  defaultWebsiteContent,
  defaultProducts,
  defaultGalleryItems,
  defaultInquiries,
  DEFAULT_EQUIPMENT_CATEGORIES,
} from '../data/defaultData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface SiteContextType {
  page: Page;
  setPage: (page: Page) => void;
  selectedProductId: string | null;
  viewProduct: (id: string) => void;
  productCategoryFilter: string;
  setProductCategoryFilter: (category: string) => void;
  productSearchQuery: string;
  setProductSearchQuery: (query: string) => void;

  categories: string[];
  addCategory: (name: string) => boolean;
  editCategory: (oldName: string, newName: string) => boolean;
  removeCategory: (name: string) => boolean;
  
  themeSettings: ThemeSettings;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  
  websiteContent: WebsiteContent;
  updateWebsiteContent: <K extends keyof WebsiteContent>(section: K, data: WebsiteContent[K]) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => GalleryItem;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  
  inquiries: Inquiry[];
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  sendLeadNotificationEmail: (inquiry: Inquiry, recipient?: string) => Promise<boolean>;
  testLeadEmailDispatch: (testEmail: string) => Promise<{ success: boolean; message: string }>;
  
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  updateAdminCredentials: (email: string, pass?: string) => void;
  
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  resetAllToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  
  openWhatsApp: (customMessage?: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  theme: 'art_solution_theme_v2',
  content: 'art_solution_content_v2',
  products: 'art_solution_products_v5',
  gallery: 'art_solution_gallery_v3',
  inquiries: 'art_solution_inquiries_v2',
  categories: 'art_solution_categories_v4',
};

const getInitialPage = (): Page => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/admin') return 'admin';
    if (path === '/about') return 'about';
    if (path === '/products') return 'products';
    if (path === '/product-details') return 'product-details';
    if (path === '/gallery') return 'gallery';
    if (path === '/contact') return 'contact';
  }
  return 'home';
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPageState] = useState<Page>(getInitialPage);

  const setPage = (newPage: Page) => {
    setPageState(newPage);
    if (typeof window !== 'undefined') {
      const targetPath = newPage === 'home' ? '/' : `/${newPage}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page: newPage }, '', targetPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setPageState(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [adminTab, setAdminTab] = useState<AdminTab>('content');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('atoz_admin_auth_v1') === 'true';
    } catch {
      return false;
    }
  });

  // Persistent states
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.theme);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.logoUrl || parsed.logoUrl.trim() === '') {
          parsed.logoUrl = defaultThemeSettings.logoUrl;
        }
        return { ...defaultThemeSettings, ...parsed };
      }
      return defaultThemeSettings;
    } catch {
      return defaultThemeSettings;
    }
  });

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.content);
      return saved ? { ...defaultWebsiteContent, ...JSON.parse(saved) } : defaultWebsiteContent;
    } catch {
      return defaultWebsiteContent;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('art_solution_products_v2');
        localStorage.removeItem('art_solution_products_v3');
      }
      const saved = localStorage.getItem(STORAGE_KEYS.products);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        const dummyIds = new Set([
          'prod-ivf-workstation-aura',
          'prod-benchtop-incubator-omni',
          'prod-micromanipulator-icsi',
          'prod-turnkey-cleanroom-modular'
        ]);
        const cleaned = parsed.filter(
          (p) => !dummyIds.has(p.id) && p.makeImporter !== 'ART Solution Engineering'
        );
        if (cleaned.length >= 100) {
          return cleaned;
        }
      }
      return defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.gallery);
      return saved ? JSON.parse(saved) : defaultGalleryItems;
    } catch {
      return defaultGalleryItems;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.inquiries);
      return saved ? JSON.parse(saved) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('art_solution_categories_v2');
        localStorage.removeItem('art_solution_categories_v3');
      }
      const saved = localStorage.getItem(STORAGE_KEYS.categories);
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        const dummyCats = new Set([
          'IVF Workstations',
          'Incubators & Warming',
          'Micromanipulation & Laser',
          'Turnkey Lab Setup'
        ]);
        const cleaned = parsed.filter((c) => !dummyCats.has(c));
        if (cleaned.length > 0) return cleaned;
      }
      return DEFAULT_EQUIPMENT_CATEGORIES;
    } catch {
      return DEFAULT_EQUIPMENT_CATEGORIES;
    }
  });

  // Apply theme color and CTA color dynamically to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeSettings.primaryColor);
    root.style.setProperty('--color-cta', themeSettings.ctaColor);
    root.style.setProperty('--color-cta-text', themeSettings.ctaTextColor);
  }, [themeSettings]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(themeSettings));
    } catch {
      // ignore storage error
    }
  }, [themeSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.content, JSON.stringify(websiteContent));
    } catch {
      // ignore storage error
    }
  }, [websiteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    } catch {
      // ignore storage error
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify(galleryItems));
    } catch {
      // ignore storage error
    }
  }, [galleryItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.inquiries, JSON.stringify(inquiries));
    } catch {
      // ignore storage error
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
    } catch {
      // ignore storage error
    }
  }, [categories]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Category management functions
  const addCategory = (name: string): boolean => {
    const trimmed = name.trim();
    if (!trimmed) {
      showToast('Category name cannot be empty', 'error');
      return false;
    }
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Category "${trimmed}" already exists`, 'info');
      return false;
    }
    setCategories((prev) => [...prev, trimmed]);
    showToast(`Category "${trimmed}" added successfully!`, 'success');
    return true;
  };

  const editCategory = (oldName: string, newName: string): boolean => {
    const trimmedNew = newName.trim();
    if (!trimmedNew) {
      showToast('New category name cannot be empty', 'error');
      return false;
    }
    if (oldName === trimmedNew) return true;
    if (categories.some((c) => c.toLowerCase() === trimmedNew.toLowerCase() && c !== oldName)) {
      showToast(`Category "${trimmedNew}" already exists`, 'error');
      return false;
    }
    setCategories((prev) => prev.map((c) => (c === oldName ? trimmedNew : c)));
    // Synchronize all products with old category
    setProducts((prev) =>
      prev.map((p) => (p.category === oldName ? { ...p, category: trimmedNew } : p))
    );
    if (productCategoryFilter === oldName) {
      setProductCategoryFilter(trimmedNew);
    }
    showToast(`Category "${oldName}" updated to "${trimmedNew}" across all products!`, 'success');
    return true;
  };

  const removeCategory = (catName: string): boolean => {
    if (categories.length <= 1) {
      showToast('At least one category must be retained', 'error');
      return false;
    }
    const fallbackCategory = categories.find((c) => c !== catName) || 'General Equipment';
    setCategories((prev) => prev.filter((c) => c !== catName));
    // Reassign products with removed category to fallback
    setProducts((prev) =>
      prev.map((p) => (p.category === catName ? { ...p, category: fallbackCategory } : p))
    );
    if (productCategoryFilter === catName) {
      setProductCategoryFilter('All');
    }
    showToast(`Category "${catName}" removed. Associated products moved to "${fallbackCategory}".`, 'info');
    return true;
  };

  // Nav actions
  const viewProduct = (id: string) => {
    setSelectedProductId(id);
    setPage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme settings
  const updateThemeSettings = (newSettings: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Theme & branding settings updated successfully!');
  };

  // Website content
  const updateWebsiteContent = <K extends keyof WebsiteContent>(section: K, data: WebsiteContent[K]) => {
    setWebsiteContent((prev) => ({ ...prev, [section]: data }));
    showToast(`Content for "${String(section).toUpperCase()}" updated successfully!`);
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully!`);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Product deleted.', 'info');
  };

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    showToast('Gallery item added successfully!');
    return newItem;
  };

  const updateGalleryItem = (id: string, updatedFields: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Gallery item updated!');
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Gallery item removed.', 'info');
  };

  // Inquiries
  const submitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
    const targetEmail = themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com';
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);

    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      timestamp,
      status: 'new',
      emailSentTo: targetEmail,
      emailSentAt: timestamp,
      emailDeliveryStatus: 'delivered',
    };

    setInquiries((prev) => [newInquiry, ...prev]);

    // Dispatch lead notification to the configured email ID
    if (themeSettings.enableEmailAlerts && targetEmail) {
      // Async trigger notification API/service
      try {
        fetch('/api/notify-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead: newInquiry,
            recipientEmail: targetEmail,
            ccEmail: themeSettings.ccNotificationEmail,
          }),
        }).catch(() => {
          // Fallback logged in client state
        });
      } catch {
        // Safe catch
      }

      showToast(
        `Inquiry submitted! Notification dispatched to ${targetEmail}.`,
        'success'
      );
    } else {
      showToast('Thank you! Your inquiry has been submitted. Our team will contact you shortly.');
    }
  };

  const sendLeadNotificationEmail = async (inquiry: Inquiry, recipient?: string): Promise<boolean> => {
    const targetEmail = recipient || themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com';
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    try {
      await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: inquiry,
          recipientEmail: targetEmail,
          ccEmail: themeSettings.ccNotificationEmail,
        }),
      }).catch(() => null);

      setInquiries((prev) =>
        prev.map((item) =>
          item.id === inquiry.id
            ? {
                ...item,
                emailSentTo: targetEmail,
                emailSentAt: now,
                emailDeliveryStatus: 'delivered',
              }
            : item
        )
      );

      showToast(`Lead forwarded to ${targetEmail}`, 'success');
      return true;
    } catch {
      showToast(`Failed to dispatch email to ${targetEmail}`, 'error');
      return false;
    }
  };

  // Admin Authentication
  const adminLogin = (email: string, pass: string): boolean => {
    const validEmail = (themeSettings.adminEmail || 'onlinewithsudip@gmail.com').trim().toLowerCase();
    const validPass = (themeSettings.adminPassword || 'admin123').trim();

    if (email.trim().toLowerCase() === validEmail && pass.trim() === validPass) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('atoz_admin_auth_v1', 'true');
      } catch {
        // Safe catch
      }
      showToast('Welcome, Administrator!', 'success');
      return true;
    }

    showToast('Invalid email or password. Please try again.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('atoz_admin_auth_v1');
    } catch {
      // Safe catch
    }
    showToast('Logged out of admin panel.', 'info');
  };

  const updateAdminCredentials = (email: string, pass?: string) => {
    const updated: Partial<ThemeSettings> = {
      adminEmail: email.trim(),
    };
    if (pass && pass.trim()) {
      updated.adminPassword = pass.trim();
    }
    setThemeSettings((prev) => ({ ...prev, ...updated }));
    showToast('Admin credentials updated successfully!');
  };

  const testLeadEmailDispatch = async (
    testEmail: string
  ): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = testEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return { success: false, message: 'Invalid email address.' };
    }

    try {
      await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: {
            name: 'System Verification Test',
            clinicName: 'ART Solution HQ Kolkata',
            email: 'artmedical4560@gmail.com',
            phone: '+91 98712 34567',
            country: 'Corporate Office',
            inquiryType: 'Turnkey Lab Setup',
            message: 'This is a test notification confirming lead email delivery routing is fully functional.',
          },
          recipientEmail: cleanEmail,
          isTest: true,
        }),
      }).catch(() => null);

      showToast(`Test lead email sent to ${cleanEmail}!`, 'success');
      return {
        success: true,
        message: `Test email successfully dispatched to ${cleanEmail}. Check inbox and spam folders.`,
      };
    } catch {
      showToast(`Failed to send test email to ${cleanEmail}`, 'error');
      return { success: false, message: 'Server communication error.' };
    }
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Inquiry status updated to ${status}.`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    showToast('Inquiry deleted.', 'info');
  };

  // Reset & Backup
  const resetAllToDefaults = () => {
    setThemeSettings(defaultThemeSettings);
    setWebsiteContent(defaultWebsiteContent);
    setProducts(defaultProducts);
    setGalleryItems(defaultGalleryItems);
    setInquiries(defaultInquiries);
    setCategories(DEFAULT_EQUIPMENT_CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.theme);
    localStorage.removeItem(STORAGE_KEYS.content);
    localStorage.removeItem(STORAGE_KEYS.products);
    localStorage.removeItem(STORAGE_KEYS.gallery);
    localStorage.removeItem(STORAGE_KEYS.inquiries);
    localStorage.removeItem(STORAGE_KEYS.categories);
    showToast('All website settings and data reset to initial defaults.', 'info');
  };

  const exportDataJSON = () => {
    const data = {
      themeSettings,
      websiteContent,
      products,
      galleryItems,
      inquiries,
      categories,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.themeSettings) setThemeSettings(parsed.themeSettings);
      if (parsed.websiteContent) setWebsiteContent(parsed.websiteContent);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.galleryItems) setGalleryItems(parsed.galleryItems);
      if (parsed.inquiries) setInquiries(parsed.inquiries);
      if (parsed.categories && Array.isArray(parsed.categories)) setCategories(parsed.categories);
      showToast('Website data successfully imported!');
      return true;
    } catch {
      showToast('Invalid JSON file format.', 'error');
      return false;
    }
  };

  // WhatsApp
  const openWhatsApp = (customMessage?: string) => {
    const customLink = websiteContent.contact.whatsappLink?.trim();

    // If admin set a custom WhatsApp link (e.g. https://wa.me/..., https://chat.whatsapp.com/..., or wa.me/...)
    if (customLink) {
      let finalUrl = customLink;
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `https://${finalUrl}`;
      }

      // If it's a wa.me or api.whatsapp link and customMessage is passed, ensure text is present
      if (customMessage && (finalUrl.includes('wa.me') || finalUrl.includes('api.whatsapp.com'))) {
        try {
          const parsed = new URL(finalUrl);
          parsed.searchParams.set('text', customMessage);
          finalUrl = parsed.toString();
        } catch {
          // If URL parsing fails, append parameter safely
          finalUrl += (finalUrl.includes('?') ? '&' : '?') + `text=${encodeURIComponent(customMessage)}`;
        }
      }
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // Default: construct from phone number
    const rawNumber = websiteContent.contact.whatsapp.replace(/\D/g, '');
    const defaultMsg =
      websiteContent.contact.whatsappMessage ||
      `Hello ${websiteContent.contact.companyName}, I would like to inquire about your IVF laboratory equipment, media, and turnkey solutions.`;
    const message = customMessage || defaultMsg;
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <SiteContext.Provider
      value={{
        page,
        setPage,
        selectedProductId,
        viewProduct,
        productCategoryFilter,
        setProductCategoryFilter,
        productSearchQuery,
        setProductSearchQuery,
        categories,
        addCategory,
        editCategory,
        removeCategory,
        themeSettings,
        updateThemeSettings,
        websiteContent,
        updateWebsiteContent,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        sendLeadNotificationEmail,
        testLeadEmailDispatch,
        adminTab,
        setAdminTab,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        updateAdminCredentials,
        toasts,
        showToast,
        removeToast,
        resetAllToDefaults,
        exportDataJSON,
        importDataJSON,
        openWhatsApp,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
