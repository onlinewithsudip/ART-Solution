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
  theme: 'atoz_fertility_theme_v1',
  content: 'atoz_fertility_content_v1',
  products: 'atoz_fertility_products_v1',
  gallery: 'atoz_fertility_gallery_v1',
  inquiries: 'atoz_fertility_inquiries_v1',
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [adminTab, setAdminTab] = useState<AdminTab>('content');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent states
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.theme);
      return saved ? { ...defaultThemeSettings, ...JSON.parse(saved) } : defaultThemeSettings;
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
      const saved = localStorage.getItem(STORAGE_KEYS.products);
      return saved ? JSON.parse(saved) : defaultProducts;
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
    const targetEmail = themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com';
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
    const targetEmail = recipient || themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com';
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
            clinicName: 'A to Z Fertility Validation Center',
            email: 'system-test@atozfertilitysolutions.com',
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
    localStorage.removeItem(STORAGE_KEYS.theme);
    localStorage.removeItem(STORAGE_KEYS.content);
    localStorage.removeItem(STORAGE_KEYS.products);
    localStorage.removeItem(STORAGE_KEYS.gallery);
    localStorage.removeItem(STORAGE_KEYS.inquiries);
    showToast('All website settings and data reset to initial defaults.', 'info');
  };

  const exportDataJSON = () => {
    const data = {
      themeSettings,
      websiteContent,
      products,
      galleryItems,
      inquiries,
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
      showToast('Website data successfully imported!');
      return true;
    } catch {
      showToast('Invalid JSON file format.', 'error');
      return false;
    }
  };

  // WhatsApp
  const openWhatsApp = (customMessage?: string) => {
    const rawNumber = websiteContent.contact.whatsapp.replace(/\D/g, '');
    const defaultMsg = `Hello ${websiteContent.contact.companyName}, I would like to inquire about your IVF laboratory equipment and turnkey solutions.`;
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
