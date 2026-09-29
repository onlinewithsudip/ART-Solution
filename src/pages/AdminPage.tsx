import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Product,
  GalleryItem,
  WebsiteContent,
  ThemeSettings,
  Inquiry,
  AdminTab,
} from '../types';
import {
  Sliders,
  Package,
  Image as ImageIcon,
  Palette,
  Mail,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  ExternalLink,
  Check,
  CheckCircle2,
  X,
  MessageCircle,
  Eye,
  FileText,
  AlertTriangle,
  Send,
  Bell,
  Inbox,
  SendHorizontal,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
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
    themeSettings,
    updateThemeSettings,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    sendLeadNotificationEmail,
    testLeadEmailDispatch,
    resetAllToDefaults,
    exportDataJSON,
    importDataJSON,
    setPage,
    viewProduct,
    showToast,
    openWhatsApp,
  } = useSite();

  // Local state for Content editing form
  const [contentForm, setContentForm] = useState<WebsiteContent>(websiteContent);

  // Local state for lead email test
  const [testEmailAddress, setTestEmailAddress] = useState(
    themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com'
  );
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Local state for forwarding/resending lead email modal
  const [forwardingInquiry, setForwardingInquiry] = useState<Inquiry | null>(null);
  const [forwardEmailInput, setForwardEmailInput] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);

  // Local state for Product modal (Add or Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'IVF Workstations',
    modelNumber: '',
    shortDesc: '',
    fullDesc: '',
    price: '$10,000',
    priceType: 'fixed',
    inStock: true,
    isFeatured: false,
    image: '',
    features: ['ISO Class 5 laminar air environment', 'PID temperature stability ±0.1°C'],
    specs: [
      { key: 'Temperature Stability', value: '±0.1°C' },
      { key: 'Dimensions', value: '1800 x 780 x 1400 mm' },
    ],
  });
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Local state for Gallery item modal
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    category: 'IVF Labs',
    image: '',
    description: '',
  });

  // Local state for Settings tab
  const [settingsForm, setSettingsForm] = useState<ThemeSettings>(themeSettings);

  // JSON import input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const logoFileInputRef = React.useRef<HTMLInputElement>(null);
  const prodImgFileInputRef = React.useRef<HTMLInputElement>(null);
  const galImgFileInputRef = React.useRef<HTMLInputElement>(null);

  // Preset Colors for Theme
  const themePresets = [
    { name: 'Medical Teal', hex: '#0d9488' },
    { name: 'Royal Sapphire', hex: '#1d4ed8' },
    { name: 'Clinic Cyan', hex: '#0284c7' },
    { name: 'Deep Emerald', hex: '#047857' },
    { name: 'Bio Cobalt', hex: '#2563eb' },
    { name: 'Plum Amethyst', hex: '#7e22ce' },
    { name: 'Navy Slate', hex: '#1e293b' },
    { name: 'Crimson Care', hex: '#be123c' },
  ];

  // Preset Colors for CTA
  const ctaPresets = [
    { name: 'High-Contrast Cyan', hex: '#0284c7' },
    { name: 'Vibrant Emerald', hex: '#10b981' },
    { name: 'Energetic Amber', hex: '#d97706' },
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Coral Flame', hex: '#ea580c' },
    { name: 'Modern Rose', hex: '#e11d48' },
    { name: 'Violet Pulse', hex: '#7c3aed' },
    { name: 'Dark Obsidian', hex: '#0f172a' },
  ];

  // Product modal handlers
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'IVF Workstations',
      modelNumber: 'MOD-' + Math.floor(100 + Math.random() * 900),
      shortDesc: '',
      fullDesc: '',
      price: '$12,000',
      priceType: 'fixed',
      inStock: true,
      isFeatured: false,
      image: products[0]?.image || '',
      features: ['Precision thermal PID regulation', 'Cleanroom HEPA filtration'],
      specs: [
        { key: 'Filtration Efficiency', value: '99.999% at 0.12 μm' },
        { key: 'Temperature Uniformity', value: '±0.1°C' },
      ],
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      modelNumber: prod.modelNumber,
      shortDesc: prod.shortDesc,
      fullDesc: prod.fullDesc,
      price: prod.price,
      priceType: prod.priceType,
      inStock: prod.inStock,
      isFeatured: prod.isFeatured,
      image: prod.image,
      features: [...prod.features],
      specs: [...prod.specs],
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct(productForm);
    }
    setIsProductModalOpen(false);
  };

  // Gallery modal handlers
  const openAddGalleryModal = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      category: 'IVF Labs',
      image: galleryItems[0]?.image || '',
      description: '',
    });
    setIsGalleryModalOpen(true);
  };

  const openEditGalleryModal = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title) return;

    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, galleryForm);
    } else {
      addGalleryItem(galleryForm);
    }
    setIsGalleryModalOpen(false);
  };

  // Image Upload helper (FileReader to base64)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onSuccess(base64);
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  // JSON Import & Export
  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atoz_fertility_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Website database downloaded as JSON backup.');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        setContentForm(websiteContent);
        setSettingsForm(themeSettings);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-28">
      {/* Top Admin Navigation Ribbon */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-5 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Website Administration & CMS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE EDIT
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Manage site content, products catalog, images, branding themes & leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>

            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Download full backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-2">
          {[
            { id: 'content', label: 'Website Content', icon: FileText },
            { id: 'products', label: 'Products & Pricing', icon: Package, badge: products.length },
            { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon, badge: galleryItems.length },
            { id: 'settings', label: 'Theme & Logo Settings', icon: Palette },
            { id: 'inquiries', label: 'Inquiries & Leads', icon: Mail, badge: inquiries.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Tab Content Containers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* ============================================================== */}
        {/* TAB 1: WEBSITE CONTENT EDITOR */}
        {/* ============================================================== */}
        {adminTab === 'content' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Save notice */}
            <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Edits made here reflect immediately on the live website and are stored in browser persistence.
                </span>
              </div>
              <button
                onClick={() => {
                  updateWebsiteContent('hero', contentForm.hero);
                  updateWebsiteContent('about', contentForm.about);
                  updateWebsiteContent('contact', contentForm.contact);
                  updateWebsiteContent('footer', contentForm.footer);
                }}
                className="px-4 py-2 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-colors shadow-xs"
              >
                Save All Content
              </button>
            </div>

            {/* Hero Section Content Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">
                  1. Hero Banner Content
                </h3>
                <p className="text-xs text-slate-500">
                  Edit main headline, subtext, badges, and statistical metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Top Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.highlightBadge}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, highlightBadge: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Kicker Label
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.kicker}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, kicker: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Main Hero Headline
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.title}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, title: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={2}
                    value={contentForm.hero.subtitle}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.primaryCtaText}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={contentForm.hero.secondaryCtaText}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        hero: { ...contentForm.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Stats Editor */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block font-bold uppercase text-slate-600 text-xs mb-3">
                  Hero Statistical Proof Numbers (4 items)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {contentForm.hero.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Value</span>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...contentForm.hero.stats];
                            newStats[idx].value = e.target.value;
                            setContentForm({
                              ...contentForm,
                              hero: { ...contentForm.hero, stats: newStats },
                            });
                          }}
                          className="w-full p-1.5 rounded border border-slate-200 bg-white font-mono font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Label</span>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...contentForm.hero.stats];
                            newStats[idx].label = e.target.value;
                            setContentForm({
                              ...contentForm,
                              hero: { ...contentForm.hero, stats: newStats },
                            });
                          }}
                          className="w-full p-1.5 rounded border border-slate-200 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => updateWebsiteContent('hero', contentForm.hero)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Save Hero Section
                </button>
              </div>
            </div>

            {/* About Us Content Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">
                  2. About Us Section Content
                </h3>
                <p className="text-xs text-slate-500">
                  Company story, mission statement, vision, and operational values.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    About Page Title
                  </label>
                  <input
                    type="text"
                    value={contentForm.about.title}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, title: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    About Subtitle
                  </label>
                  <input
                    type="text"
                    value={contentForm.about.subtitle}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, subtitle: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Story Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={contentForm.about.storyParagraph1}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, storyParagraph1: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Story Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={contentForm.about.storyParagraph2}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, storyParagraph2: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Mission Statement
                  </label>
                  <textarea
                    rows={3}
                    value={contentForm.about.mission}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, mission: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Vision Statement
                  </label>
                  <textarea
                    rows={3}
                    value={contentForm.about.vision}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        about: { ...contentForm.about, vision: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => updateWebsiteContent('about', contentForm.about)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Save About Section
                </button>
              </div>
            </div>

            {/* Contact Information Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">
                  3. Contact Information & Direct Channels
                </h3>
                <p className="text-xs text-slate-500">
                  Phone numbers, official email, physical address, and WhatsApp contact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Company Registered Name
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.companyName}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, companyName: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    WhatsApp Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.whatsapp}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, whatsapp: e.target.value },
                      })
                    }
                    placeholder="e.g. 919871234567"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.phone1}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, phone1: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.phone2}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, phone2: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    General Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={contentForm.contact.email}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, email: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Technical Service Email
                  </label>
                  <input
                    type="email"
                    value={contentForm.contact.supportEmail}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, supportEmail: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Physical Facility Address
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.address}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, address: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={contentForm.contact.workingHours}
                    onChange={(e) =>
                      setContentForm({
                        ...contentForm,
                        contact: { ...contentForm.contact, workingHours: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => updateWebsiteContent('contact', contentForm.contact)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Save Contact Information
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PRODUCTS MANAGER (CRUD) */}
        {/* ============================================================== */}
        {adminTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Equipment Catalog Management
                </h3>
                <p className="text-xs text-slate-500">
                  Add, update, or remove medical systems, pricing, specifications, and images.
                </p>
              </div>

              <button
                onClick={openAddProductModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Equipment</span>
              </button>
            </div>

            {/* Product List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Model</th>
                      <th className="py-3 px-4">Price / Estimate</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-slate-100 shrink-0"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block line-clamp-1 max-w-xs">
                                {prod.name}
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                {prod.shortDesc}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {prod.category}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {prod.modelNumber}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 tabular-nums">
                          {prod.price}
                        </td>
                        <td className="py-3.5 px-4">
                          {prod.inStock ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                              Order
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => viewProduct(prod.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                              title="View on site"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `Are you sure you want to delete "${prod.name}"?`
                                  )
                                ) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: GALLERY MANAGER (CRUD) */}
        {/* ============================================================== */}
        {adminTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Facility & Lab Gallery Items
                </h3>
                <p className="text-xs text-slate-500">
                  Upload photos of clinic installations, cleanrooms, and workshops.
                </p>
              </div>

              <button
                onClick={openAddGalleryModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo to Gallery</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="p-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditGalleryModal(item)}
                      className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50"
                      title="Edit item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: SETTINGS & APPEARANCE (Crucial user requirement) */}
        {/* ============================================================== */}
        {adminTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in">
            {/* 1. Theme Color Settings */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: settingsForm.primaryColor }}
                  />
                  <h3 className="text-base font-bold text-slate-900">
                    Website Theme Color
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Controls the primary brand color across headers, banners, cards, and icons.
                </p>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-slate-600">
                  Curated Healthcare Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {themePresets.map((preset) => {
                    const isSelected = settingsForm.primaryColor.toLowerCase() === preset.hex.toLowerCase();
                    return (
                      <button
                        key={preset.hex}
                        onClick={() => {
                          const updated = { ...settingsForm, primaryColor: preset.hex };
                          setSettingsForm(updated);
                          updateThemeSettings({ primaryColor: preset.hex });
                        }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 shadow-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: preset.hex }}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </span>
                        <span className="truncate">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Hex Picker */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Custom Hex Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settingsForm.primaryColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettingsForm({ ...settingsForm, primaryColor: val });
                        updateThemeSettings({ primaryColor: val });
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={settingsForm.primaryColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettingsForm({ ...settingsForm, primaryColor: val });
                        if (/^#[0-9A-F]{6}$/i.test(val)) {
                          updateThemeSettings({ primaryColor: val });
                        }
                      }}
                      className="w-28 p-2 rounded-xl border border-slate-200 font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-500 sm:pt-4">
                  Theme color updates in real-time on all pages.
                </div>
              </div>
            </div>

            {/* 2. CTA Button Color Settings */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: settingsForm.ctaColor }}
                  />
                  <h3 className="text-base font-bold text-slate-900">
                    Call to Action (CTA) Button Color
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust the specific accent color used on "Request Quotation", "View Details", and RFP triggers.
                </p>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-slate-600">
                  CTA Color Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ctaPresets.map((preset) => {
                    const isSelected = settingsForm.ctaColor.toLowerCase() === preset.hex.toLowerCase();
                    return (
                      <button
                        key={preset.hex}
                        onClick={() => {
                          const updated = { ...settingsForm, ctaColor: preset.hex };
                          setSettingsForm(updated);
                          updateThemeSettings({ ctaColor: preset.hex });
                        }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 shadow-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: preset.hex }}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </span>
                        <span className="truncate">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Hex Picker for CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Custom CTA Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settingsForm.ctaColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettingsForm({ ...settingsForm, ctaColor: val });
                        updateThemeSettings({ ctaColor: val });
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={settingsForm.ctaColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSettingsForm({ ...settingsForm, ctaColor: val });
                        if (/^#[0-9A-F]{6}$/i.test(val)) {
                          updateThemeSettings({ ctaColor: val });
                        }
                      }}
                      className="w-28 p-2 rounded-xl border border-slate-200 font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                {/* Live Preview Button */}
                <div className="sm:pt-4">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold mb-1">
                    Live Button Preview
                  </span>
                  <button
                    style={{
                      backgroundColor: settingsForm.ctaColor,
                      color: settingsForm.ctaTextColor,
                    }}
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs shadow-xs"
                  >
                    Sample CTA Button
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Logo Management */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Logo & Brand Mark
                </h3>
                <p className="text-xs text-slate-500">
                  Upload an image logo or configure the brand wordmark and height.
                </p>
              </div>

              {/* Logo Preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                    Current Header Preview
                  </span>
                  <div className="flex items-center gap-3">
                    {settingsForm.logoUrl ? (
                      <img
                        src={settingsForm.logoUrl}
                        alt="Logo"
                        style={{ height: `${settingsForm.logoHeight}px` }}
                        className="w-auto object-contain"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: settingsForm.primaryColor }}
                      >
                        <Palette className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-slate-900 block text-base">
                        {settingsForm.logoText}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {settingsForm.logoTagline}
                      </span>
                    </div>
                  </div>
                </div>

                {settingsForm.logoUrl && (
                  <button
                    onClick={() => {
                      const updated = { ...settingsForm, logoUrl: '' };
                      setSettingsForm(updated);
                      updateThemeSettings({ logoUrl: '' });
                    }}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Remove Logo Image
                  </button>
                )}
              </div>

              {/* Upload direct from computer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Upload Logo from Device
                  </label>
                  <input
                    type="file"
                    ref={logoFileInputRef}
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, (base64) => {
                        const updated = { ...settingsForm, logoUrl: base64 };
                        setSettingsForm(updated);
                        updateThemeSettings({ logoUrl: base64 });
                      })
                    }
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Or Enter Logo Image URL
                  </label>
                  <input
                    type="text"
                    value={settingsForm.logoUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettingsForm({ ...settingsForm, logoUrl: val });
                      updateThemeSettings({ logoUrl: val });
                    }}
                    placeholder="https://example.com/logo.png"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Brand Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.logoText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettingsForm({ ...settingsForm, logoText: val });
                      updateThemeSettings({ logoText: val });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.logoTagline}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettingsForm({ ...settingsForm, logoTagline: val });
                      updateThemeSettings({ logoTagline: val });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Logo Height in Header ({settingsForm.logoHeight}px)
                  </label>
                  <input
                    type="range"
                    min={24}
                    max={64}
                    value={settingsForm.logoHeight}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSettingsForm({ ...settingsForm, logoHeight: val });
                      updateThemeSettings({ logoHeight: val });
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 4. Lead Email Notification Routing (Requested by user) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      Lead Email Notification Routing
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Automated Dispatch
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Configure the destination email addresses that receive instant alerts when a visitor submits any form on the website.
                  </p>
                </div>

                <button
                  onClick={() => {
                    updateThemeSettings({
                      leadNotificationEmail: settingsForm.leadNotificationEmail,
                      ccNotificationEmail: settingsForm.ccNotificationEmail,
                      enableEmailAlerts: settingsForm.enableEmailAlerts,
                    });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold shadow-xs shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Email Routing</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      Primary Lead Recipient Email ID *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={settingsForm.leadNotificationEmail}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSettingsForm({ ...settingsForm, leadNotificationEmail: val });
                          setTestEmailAddress(val);
                        }}
                        placeholder="e.g. sales@atozfertilitysolutions.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      All RFPs from Product Pages & Contact forms are routed here immediately.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      CC Notification Email ID (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={settingsForm.ccNotificationEmail || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSettingsForm({ ...settingsForm, ccNotificationEmail: val });
                        }}
                        placeholder="e.g. director@atozfertilitysolutions.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Additional team recipient who should be copied on new leads.
                    </span>
                  </div>
                </div>

                {/* Enable toggle */}
                <div className="pt-2 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-teal-600" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        Instant Email Alerts
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Automatically trigger email delivery on every submission
                      </span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.enableEmailAlerts}
                      onChange={(e) => {
                        const val = e.target.checked;
                        setSettingsForm({ ...settingsForm, enableEmailAlerts: val });
                        updateThemeSettings({ enableEmailAlerts: val });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                {/* Test Email Dispatch Tool */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Test Email Dispatch Pipeline
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Verify delivery to your mailbox
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="email"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      placeholder="Enter email to test dispatch..."
                      className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={isTestingEmail}
                      onClick={async () => {
                        setIsTestingEmail(true);
                        setTestResult(null);
                        const res = await testLeadEmailDispatch(testEmailAddress);
                        setTestResult(res);
                        setIsTestingEmail(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isTestingEmail ? 'Dispatching...' : 'Send Test Lead Email'}</span>
                    </button>
                  </div>

                  {testResult && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        testResult.success
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {testResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{testResult.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 5. Reset & Backup Tools */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Data Backup & Factory Reset
                </h3>
                <p className="text-xs text-slate-500">
                  Export site configurations or restore original clinical defaults.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Database JSON</span>
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Import Database JSON</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to reset all site content, products, and colors to factory defaults?'
                      )
                    ) {
                      resetAllToDefaults();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold ml-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: INQUIRIES & LEADS INBOX */}
        {/* ============================================================== */}
        {adminTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Customer Inquiries & RFPs</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {inquiries.length} total
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Leads generated from the contact page and product detail inquiry forms.
                </p>
              </div>

              {/* Email Notification Status Badge */}
              <div className="flex items-center gap-3 p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-700 block">
                    Lead Notification Destination
                  </span>
                  <span className="font-mono font-semibold">
                    {themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com'}
                  </span>
                </div>
                <button
                  onClick={() => setAdminTab('settings')}
                  className="ml-2 text-[11px] font-semibold text-teal-700 underline hover:text-teal-900"
                >
                  Change
                </button>
              </div>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">
                            {inq.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium">
                            · {inq.clinicName}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                          <span>Received: {inq.date} · {inq.country}</span>
                          <span>·</span>
                          <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-semibold">
                            {inq.inquiryType}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status Select */}
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            updateInquiryStatus(inq.id, e.target.value as any)
                          }
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                            inq.status === 'new'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : inq.status === 'contacted'
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="closed">Status: Closed</option>
                        </select>

                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Email Routing Verification Pill */}
                    <div className="flex items-center justify-between text-xs bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-slate-600">
                          Dispatched to Email:{' '}
                          <span className="font-mono font-semibold text-slate-800">
                            {inq.emailSentTo || themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com'}
                          </span>
                        </span>
                        {inq.emailSentAt && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            at {inq.emailSentAt}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setForwardingInquiry(inq);
                          setForwardEmailInput(
                            inq.emailSentTo || themeSettings.leadNotificationEmail || 'leads@atozfertilitysolutions.com'
                          );
                        }}
                        className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline flex items-center gap-1"
                      >
                        <SendHorizontal className="w-3 h-3" />
                        <span>Forward / Resend Email</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1">
                      {inq.productName && (
                        <div className="font-semibold text-teal-800 pb-1">
                          Product Inquired: {inq.productName}
                        </div>
                      )}
                      <p className="leading-relaxed">{inq.message}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      <span className="text-slate-500">Contact Details:</span>
                      <a
                        href={`mailto:${inq.email}?subject=RE: Inquiry with A to Z Fertility Solutions&body=Dear ${encodeURIComponent(inq.name)},%0D%0A%0D%0AThank you for contacting A to Z Fertility Solutions regarding ${encodeURIComponent(inq.productName || inq.inquiryType)}.`}
                        className="font-mono text-sky-600 hover:underline flex items-center gap-1"
                        title="Click to email customer"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </a>
                      <span className="text-slate-300">·</span>
                      <a
                        href={`tel:${inq.phone}`}
                        className="font-mono text-slate-700 hover:underline"
                      >
                        {inq.phone}
                      </a>

                      <div className="ml-auto flex items-center gap-2">
                        <button
                          onClick={() => {
                            const mailtoUrl = `mailto:${themeSettings.leadNotificationEmail}?subject=Forwarded Lead: ${encodeURIComponent(inq.name)} - ${encodeURIComponent(inq.clinicName)}&body=Lead Details:%0D%0AName: ${encodeURIComponent(inq.name)}%0D%0AClinic: ${encodeURIComponent(inq.clinicName)}%0D%0AEmail: ${encodeURIComponent(inq.email)}%0D%0APhone: ${encodeURIComponent(inq.phone)}%0D%0ACountry: ${encodeURIComponent(inq.country)}%0D%0AType: ${encodeURIComponent(inq.inquiryType)}%0D%0AProduct: ${encodeURIComponent(inq.productName || 'N/A')}%0D%0AMessage:%0D%0A${encodeURIComponent(inq.message)}`;
                            window.open(mailtoUrl, '_blank');
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs"
                          title="Open lead in Mail client"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>Open in Mail</span>
                        </button>

                        <button
                          onClick={() => {
                            const cleanPhone = inq.phone.replace(/\D/g, '');
                            const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hello ${inq.name}, this is A to Z Fertility Solutions regarding your inquiry about ${
                                inq.productName || 'our turnkey IVF services'
                              }.`
                            )}`;
                            window.open(url, '_blank');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reply on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                No inquiries logged yet. Inquiries from the website forms will appear here.
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* FORWARD / RESEND LEAD EMAIL MODAL */}
      {/* ============================================================== */}
      {forwardingInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Forward / Resend Lead Email
                </h3>
              </div>
              <button
                onClick={() => setForwardingInquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold uppercase text-slate-700 mb-1">
                  Recipient Email Address
                </label>
                <input
                  type="email"
                  value={forwardEmailInput}
                  onChange={(e) => setForwardEmailInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="Enter email to receive this lead..."
                />
              </div>

              {/* Email Content Preview */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px]">
                <div className="font-bold text-slate-700">Email Notification Preview:</div>
                <div className="font-mono text-slate-800 space-y-1 bg-white p-2.5 rounded border border-slate-100">
                  <div><strong>Subject:</strong> [New Lead] {forwardingInquiry.inquiryType} - {forwardingInquiry.name}</div>
                  <div><strong>Clinic:</strong> {forwardingInquiry.clinicName} ({forwardingInquiry.country})</div>
                  <div><strong>Client Email:</strong> {forwardingInquiry.email}</div>
                  <div><strong>Client Phone:</strong> {forwardingInquiry.phone}</div>
                  {forwardingInquiry.productName && (
                    <div><strong>Product:</strong> {forwardingInquiry.productName}</div>
                  )}
                  <div className="pt-1 text-slate-600 border-t border-slate-100">
                    "{forwardingInquiry.message}"
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setForwardingInquiry(null)}
                className="px-3.5 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                disabled={isForwarding || !forwardEmailInput}
                onClick={async () => {
                  setIsForwarding(true);
                  await sendLeadNotificationEmail(forwardingInquiry, forwardEmailInput);
                  setIsForwarding(false);
                  setForwardingInquiry(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isForwarding ? 'Sending...' : 'Dispatch Lead Email'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PRODUCT MODAL (Add / Edit) */}
      {/* ============================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingProductId ? 'Edit Equipment Details' : 'Add New Equipment'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Equipment Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="IVF Workstations">IVF Workstations</option>
                    <option value="Incubators & Warming">Incubators & Warming</option>
                    <option value="Micromanipulation & Laser">Micromanipulation & Laser</option>
                    <option value="Turnkey Lab Setup">Turnkey Lab Setup</option>
                    <option value="Cryopreservation">Cryopreservation</option>
                    <option value="Consumables & Labware">Consumables & Labware</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Model Number
                  </label>
                  <input
                    type="text"
                    value={productForm.modelNumber}
                    onChange={(e) =>
                      setProductForm({ ...productForm, modelNumber: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Price or Quotation Estimate
                  </label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    placeholder="e.g. $14,500 or Custom Quote"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              {/* Image selection / Upload */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="block font-bold uppercase text-slate-600 text-[11px]">
                  Product Image
                </span>
                <div className="flex items-center gap-3">
                  {productForm.image && (
                    <img
                      src={productForm.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      ref={prodImgFileInputRef}
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (base64) =>
                          setProductForm({ ...productForm, image: base64 })
                        )
                      }
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-200 hover:file:bg-slate-300"
                    />
                    <input
                      type="text"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({ ...productForm, image: e.target.value })
                      }
                      placeholder="Or paste image URL"
                      className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">
                  Short Summary (Catalog Card)
                </label>
                <input
                  type="text"
                  value={productForm.shortDesc}
                  onChange={(e) =>
                    setProductForm({ ...productForm, shortDesc: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">
                  Full Detailed Description (Product Detail Page)
                </label>
                <textarea
                  rows={3}
                  value={productForm.fullDesc}
                  onChange={(e) =>
                    setProductForm({ ...productForm, fullDesc: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              {/* Status toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, inStock: e.target.checked })
                    }
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">In Stock / Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span className="font-semibold text-slate-700">
                    Feature on Home Page
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* GALLERY ITEM MODAL (Add / Edit) */}
      {/* ============================================================== */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingGalleryId ? 'Edit Gallery Photo' : 'Add Photo to Gallery'}
              </h3>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">
                  Title / Subject *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, title: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">
                  Category
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, category: e.target.value as any })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="IVF Labs">IVF Labs</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Clinic Setup">Clinic Setup</option>
                  <option value="Trainings & Workshops">Trainings & Workshops</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="block font-bold uppercase text-slate-600 text-[11px]">
                  Image
                </span>
                {galleryForm.image && (
                  <img
                    src={galleryForm.image}
                    alt="Preview"
                    className="w-full h-32 rounded-lg object-cover border border-slate-200"
                  />
                )}
                <input
                  type="file"
                  ref={galImgFileInputRef}
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(e, (base64) =>
                      setGalleryForm({ ...galleryForm, image: base64 })
                    )
                  }
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-200"
                />
                <input
                  type="text"
                  value={galleryForm.image}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, image: e.target.value })
                  }
                  placeholder="Or paste image URL"
                  className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) =>
                    setGalleryForm({ ...galleryForm, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
