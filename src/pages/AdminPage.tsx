import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
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
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  EyeOff,
  Shield,
  Phone,
  PhoneCall,
  Link2,
  Layers,
  UploadCloud,
  Layout,
  Globe,
  Tag,
  Building2,
  Box,
  FileSpreadsheet,
  Database,
  RefreshCw,
  Sparkles,
  Bot,
  Wand2,
  Lightbulb,
} from 'lucide-react';
import { defaultWebsiteContent, heroImg, cleanroomImg, mediaVialsImg, catheterImg, labwareImg, cryoImg, registerImg } from '../data/defaultData';
import { BrandIcon, AVAILABLE_ICONS } from '../components/BrandIcon';

export const AdminPage: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    websiteContent,
    updateWebsiteContent,
    updateEntireContent,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    editCategory,
    removeCategory,
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
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    updateAdminCredentials,
    resetAllToDefaults,
    exportDataJSON,
    importDataJSON,
    setPage,
    viewProduct,
    showToast,
    openWhatsApp,
    isSyncing,
    lastSyncedAt,
    dbStatus,
    publishFullStateToProduction,
    refreshFromProduction,
    uploadMedia,
  } = useSite();

  // Authentication form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Account settings form states
  const [accountEmail, setAccountEmail] = useState(themeSettings.adminEmail || 'onlinewithsudip@gmail.com');
  const [accountNewPassword, setAccountNewPassword] = useState('');
  const [accountConfirmPassword, setAccountConfirmPassword] = useState('');
  const [syncAllEmails, setSyncAllEmails] = useState(true);
  const [showAccountPass, setShowAccountPass] = useState(false);

  // Local state for Content editing form
  const [contentForm, setContentForm] = useState<WebsiteContent>(() => ({
    ...defaultWebsiteContent,
    ...websiteContent,
    header: { ...defaultWebsiteContent.header, ...(websiteContent?.header || {}) },
    hero: { ...defaultWebsiteContent.hero, ...(websiteContent?.hero || {}) },
    about: { ...defaultWebsiteContent.about, ...(websiteContent?.about || {}) },
    contact: { ...defaultWebsiteContent.contact, ...(websiteContent?.contact || {}) },
    footer: { ...defaultWebsiteContent.footer, ...(websiteContent?.footer || {}) },
  }));

  useEffect(() => {
    if (websiteContent) {
      setContentForm((prev) => ({
        ...defaultWebsiteContent,
        ...websiteContent,
        header: { ...defaultWebsiteContent.header, ...(websiteContent?.header || {}) },
        hero: { ...defaultWebsiteContent.hero, ...(websiteContent?.hero || {}) },
        about: { ...defaultWebsiteContent.about, ...(websiteContent?.about || {}) },
        contact: { ...defaultWebsiteContent.contact, ...(websiteContent?.contact || {}) },
        footer: { ...defaultWebsiteContent.footer, ...(websiteContent?.footer || {}) },
      }));
    }
  }, [websiteContent]);

  // Local state for lead email test
  const [testEmailAddress, setTestEmailAddress] = useState(
    themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'
  );
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Local state for forwarding lead email modal
  const [forwardingInquiry, setForwardingInquiry] = useState<Inquiry | null>(null);
  const [forwardEmailInput, setForwardEmailInput] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);

  // Category Manager Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [editingCatName, setEditingCatName] = useState<string | null>(null);
  const [editedCatNameInput, setEditedCatNameInput] = useState('');
  const [showInlineAddCat, setShowInlineAddCat] = useState(false);
  const [inlineCatInput, setInlineCatInput] = useState('');

  // Bulk Excel / CSV Import Modal state
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [importedPreview, setImportedPreview] = useState<Omit<Product, 'id'>[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const excelFileInputRef = useRef<HTMLInputElement>(null);
  const [adminProductSearch, setAdminProductSearch] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('All');

  // Local state for Product modal (Add or Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: categories[0] || 'IUI & IVF Media',
    modelNumber: '',
    makeImporter: '',
    packSize: '',
    rate: 550,
    shortDesc: '',
    fullDesc: '',
    price: '₹550',
    priceType: 'fixed',
    inStock: true,
    isFeatured: false,
    image: '',
    features: ['Sterility certified', 'MEA batch tested for high viability'],
    specs: [
      { key: 'Make / Importer', value: 'ART Medical' },
      { key: 'Pack Size', value: 'Single Sterile' },
      { key: 'FY 25-26 Cust Supply Rate', value: '₹550' }
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Gemini AI Assistant State
  const [geminiStatus, setGeminiStatus] = useState<{
    configured: boolean;
    model: string;
    message: string;
    checked: boolean;
  }>({
    configured: false,
    model: 'gemini-3.8-flash',
    message: 'Checking status...',
    checked: false,
  });
  const [isGeneratingAiDesc, setIsGeneratingAiDesc] = useState(false);
  const [isGeneratingAiSpecs, setIsGeneratingAiSpecs] = useState(false);
  const [aiStudioMode, setAiStudioMode] = useState<
    'product-copy' | 'cms-polisher' | 'faq-generator' | 'seo-generator' | 'custom-chat'
  >('product-copy');
  const [aiSelectedProductId, setAiSelectedProductId] = useState<string>('');
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');
  const [aiCmsTarget, setAiCmsTarget] = useState<'hero-title' | 'hero-subtitle' | 'about-story' | 'mission' | 'announcement'>('hero-subtitle');
  const [aiFaqTopic, setAiFaqTopic] = useState('Embryology culture media storage and pH stability standards');
  const [aiSeoPage, setAiSeoPage] = useState('Home Page - ART Medical IVF Equipment');
  const [aiOutput, setAiOutput] = useState('');
  const [isCallingAi, setIsCallingAi] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiCopied, setAiCopied] = useState(false);

  // Check Gemini status on mount
  useEffect(() => {
    fetch('/api/gemini')
      .then((r) => r.json())
      .then((data) => {
        setGeminiStatus({
          configured: !!data.configured,
          model: data.model || 'gemini-3.8-flash',
          message: data.message || '',
          checked: true,
        });
      })
      .catch(() => {
        setGeminiStatus({
          configured: false,
          model: 'gemini-3.8-flash',
          message: 'Unable to reach /api/gemini route',
          checked: true,
        });
      });
  }, []);

  const callGeminiApi = async (payload: any) => {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  };

  const handleAiGenerateProductDesc = async () => {
    if (!productForm.name) {
      showToast('Please enter an equipment name first to generate a description.', 'error');
      return;
    }
    setIsGeneratingAiDesc(true);
    try {
      const data = await callGeminiApi({
        action: 'generate-description',
        productName: productForm.name,
        category: productForm.category,
        makeImporter: productForm.makeImporter,
        modelNumber: productForm.modelNumber,
        currentText: productForm.fullDesc,
      });
      if (data.success && data.text) {
        setProductForm((prev) => ({
          ...prev,
          fullDesc: data.text,
          shortDesc: prev.shortDesc || data.text.split('\n')[0].replace(/^[#*\s]+/, '').substring(0, 160),
        }));
        showToast(`AI description generated with Gemini (${data.model || 'gemini-3.8-flash'})!`);
      } else {
        showToast(data.error || 'Failed to generate with Gemini', 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Error communicating with Gemini server', 'error');
    } finally {
      setIsGeneratingAiDesc(false);
    }
  };

  const handleAiGenerateProductSpecs = async () => {
    if (!productForm.name) {
      showToast('Please enter an equipment name first to generate specifications.', 'error');
      return;
    }
    setIsGeneratingAiSpecs(true);
    try {
      const data = await callGeminiApi({
        action: 'generate-specs',
        productName: productForm.name,
        category: productForm.category,
        makeImporter: productForm.makeImporter,
      });
      if (data.success && data.text) {
        const lines = data.text
          .split('\n')
          .map((l: string) => l.replace(/^[-*•0-9.)\s]+/, '').trim())
          .filter((l: string) => l.length > 5 && !l.toLowerCase().includes('technical specification'))
          .slice(0, 6);
        if (lines.length > 0) {
          setProductForm((prev) => ({
            ...prev,
            features: [...new Set([...prev.features, ...lines])],
          }));
          showToast(`Added ${lines.length} specifications generated with Gemini!`);
        }
      } else {
        showToast(data.error || 'Failed to generate specs with Gemini', 'error');
      }
    } catch (err: any) {
      showToast(err?.message || 'Error communicating with Gemini server', 'error');
    } finally {
      setIsGeneratingAiSpecs(false);
    }
  };

  const handleRunAiStudio = async () => {
    setIsCallingAi(true);
    setAiError('');
    setAiOutput('');

    try {
      let payload: any = {};
      if (aiStudioMode === 'product-copy') {
        const selProd = products.find((p) => p.id === aiSelectedProductId);
        payload = {
          action: 'generate-description',
          productName: selProd?.name || 'IVF Laboratory Equipment',
          category: selProd?.category || 'IUI & IVF Media',
          makeImporter: selProd?.makeImporter || 'ART Medical',
          modelNumber: selProd?.modelNumber || '',
          currentText: selProd?.fullDesc || '',
        };
      } else if (aiStudioMode === 'cms-polisher') {
        let current = '';
        if (aiCmsTarget === 'hero-title') current = contentForm.hero.title;
        else if (aiCmsTarget === 'hero-subtitle') current = contentForm.hero.subtitle;
        else if (aiCmsTarget === 'about-story') current = contentForm.about.storyParagraph1;
        else if (aiCmsTarget === 'mission') current = contentForm.about.mission;
        else if (aiCmsTarget === 'announcement') current = contentForm.header.topRibbonSubtitle;

        payload = {
          action: 'improve-text',
          currentText: current,
          context: `ART Medical Website section: ${aiCmsTarget}`,
        };
      } else if (aiStudioMode === 'faq-generator') {
        payload = {
          action: 'generate-faq',
          prompt: aiFaqTopic,
        };
      } else if (aiStudioMode === 'seo-generator') {
        payload = {
          action: 'generate-seo',
          prompt: aiSeoPage,
        };
      } else {
        payload = {
          action: 'custom-prompt',
          prompt: aiCustomPrompt,
        };
      }

      const res = await callGeminiApi(payload);
      if (res.success && res.text) {
        setAiOutput(res.text);
        showToast(`Gemini generation completed (${res.model || 'gemini-3.8-flash'})!`);
      } else {
        setAiError(res.error || 'Gemini request could not be processed.');
        showToast(res.error || 'Gemini error', 'error');
      }
    } catch (err: any) {
      setAiError(err?.message || 'Error contacting Gemini API server');
      showToast(err?.message || 'Network error with Gemini route', 'error');
    } finally {
      setIsCallingAi(false);
    }
  };

  const handleApplyAiOutputToProduct = async () => {
    if (!aiOutput || !aiSelectedProductId) return;
    const target = products.find((p) => p.id === aiSelectedProductId);
    if (!target) return;
    const updated = {
      fullDesc: aiOutput,
      shortDesc: aiOutput.split('\n')[0].replace(/^[#*\s]+/, '').substring(0, 160),
    };
    updateProduct(target.id, updated);
    showToast(`Applied Gemini description to "${target.name}" and saved to database!`);
  };

  const handleApplyAiOutputToCms = async () => {
    if (!aiOutput) return;
    const updated = { ...contentForm };
    if (aiCmsTarget === 'hero-title') {
      updated.hero = { ...updated.hero, title: aiOutput.trim().replace(/^"/, '').replace(/"$/, '') };
    } else if (aiCmsTarget === 'hero-subtitle') {
      updated.hero = { ...updated.hero, subtitle: aiOutput.trim() };
    } else if (aiCmsTarget === 'about-story') {
      updated.about = { ...updated.about, storyParagraph1: aiOutput.trim() };
    } else if (aiCmsTarget === 'mission') {
      updated.about = { ...updated.about, mission: aiOutput.trim() };
    } else if (aiCmsTarget === 'announcement') {
      updated.header = { ...updated.header, topRibbonSubtitle: aiOutput.trim() };
    }
    setContentForm(updated);
    updateEntireContent(updated);
    showToast(`Applied AI text to ${aiCmsTarget} and updated website!`);
  };

  const handleSaveAllCMS = async () => {
    const updatedContent: WebsiteContent = {
      ...websiteContent,
      header: contentForm.header,
      hero: contentForm.hero,
      about: contentForm.about,
      contact: contentForm.contact,
      footer: contentForm.footer,
    };
    const updatedSettings: ThemeSettings = {
      ...themeSettings,
      ...settingsForm,
    };

    updateEntireContent(updatedContent);
    setHasUnsavedChanges(false);

    await publishFullStateToProduction(updatedContent, updatedSettings);
  };

  const handleSaveHeaderFooter = async () => {
    const updatedContent: WebsiteContent = {
      ...websiteContent,
      header: contentForm.header,
      footer: contentForm.footer,
      contact: contentForm.contact,
    };
    const updatedSettings: ThemeSettings = {
      ...themeSettings,
      ...settingsForm,
    };

    updateEntireContent(updatedContent);
    setHasUnsavedChanges(false);

    await publishFullStateToProduction(updatedContent, updatedSettings);
  };

  const handleExportBackup = () => {
    const data = {
      themeSettings: settingsForm,
      websiteContent: contentForm,
      products,
      galleryItems,
      inquiries,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atoz_fertility_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Website content backup file downloaded!');
  };

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
      category: categories[0] || 'IUI & IVF Media',
      modelNumber: 'ART-' + Math.floor(100 + Math.random() * 900),
      makeImporter: 'ART Medical',
      packSize: 'Single Sterile',
      rate: 550,
      shortDesc: '',
      fullDesc: '',
      price: '₹550',
      priceType: 'fixed',
      inStock: true,
      isFeatured: false,
      image: mediaVialsImg || products[0]?.image || '',
      features: ['Sterility certified', 'MEA batch tested for clinical compliance'],
      specs: [
        { key: 'Make / Importer', value: 'ART Medical' },
        { key: 'Pack Size', value: 'Single Sterile' },
        { key: 'FY 25-26 Cust Supply Rate', value: '₹550' },
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
      makeImporter: prod.makeImporter || '',
      packSize: prod.packSize || '',
      rate: prod.rate || 0,
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

  // Excel / CSV File parser handler
  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const rows: any[] = XLSX.utils.sheet_to_json(ws);

        if (!rows || rows.length === 0) {
          showToast('No product records detected in file', 'error');
          return;
        }

        const parsedProducts: Omit<Product, 'id'>[] = rows.map((row, idx) => {
          const desc = row['Description'] || row['description'] || row['Item'] || row['Product'] || row['Name'] || `Product ${idx + 1}`;
          const make = row['Make/Importer'] || row['Make'] || row['Importer'] || row['Manufacturer'] || row['Brand'] || 'ART Medical';
          const pack = row['Pack Size in ml/pice'] || row['Pack Size'] || row['Pack'] || row['Size'] || 'Single Sterile';
          const rawRate = row['FY 25-26 Cust Supply Rate'] || row['Supply Rate'] || row['Rate'] || row['Price'] || row['Rate (₹)'] || '550';
          const numericRate = typeof rawRate === 'number' ? rawRate : parseFloat(String(rawRate).replace(/[^0-9.]/g, '')) || 550;
          const formattedPrice = `₹${numericRate.toLocaleString('en-IN')}`;

          let cat = row['Category'] || row['category'];
          if (!cat) {
            const descLower = String(desc).toLowerCase();
            if (descLower.includes('catheter') || descLower.includes('cannula') || descLower.includes('lumen') || descLower.includes('needle') || descLower.includes('opu')) {
              cat = 'Needles, Catheters & Cannulas';
            } else if (descLower.includes('oil') || descLower.includes('gradient') || descLower.includes('sil select')) {
              cat = 'Oils & Density Gradients';
            } else if (descLower.includes('cryo') || descLower.includes('vitrif') || descLower.includes('freeze') || descLower.includes('straw') || descLower.includes('cane') || descLower.includes('goblet')) {
              cat = 'Cryopreservation & Vitrification';
            } else if (descLower.includes('dish') || descLower.includes('tube') || descLower.includes('mat') || descLower.includes('syringe') || descLower.includes('container')) {
              cat = 'Disposables & Labware';
            } else if (descLower.includes('tip') || descLower.includes('pipette') || descLower.includes('stripper')) {
              cat = 'Micropipettes & Stripper Tips';
            } else if (descLower.includes('pvp') || descLower.includes('hydase') || descLower.includes('prp') || descLower.includes('dna') || descLower.includes('magic')) {
              cat = 'Enzymes & Preparation Kits';
            } else if (descLower.includes('register') || descLower.includes('record')) {
              cat = 'Clinical Registers & Documentation';
            } else if (descLower.includes('workstation') || descLower.includes('incubator') || descLower.includes('manipulator') || descLower.includes('cleanroom')) {
              cat = 'Laboratory Equipment & Accessories';
            } else {
              cat = 'IUI & IVF Media';
            }
          }

          let chosenImg = mediaVialsImg;
          if (cat === 'Needles, Catheters & Cannulas') chosenImg = catheterImg;
          else if (cat === 'Disposables & Labware') chosenImg = labwareImg;
          else if (cat === 'Cryopreservation & Vitrification') chosenImg = cryoImg;
          else if (cat === 'Clinical Registers & Documentation') chosenImg = registerImg;
          else if (cat === 'Micropipettes & Stripper Tips') chosenImg = catheterImg;

          return {
            name: String(desc),
            category: cat,
            modelNumber: `ART-${String(make).toUpperCase().replace(/[^A-Z0-9]/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
            makeImporter: String(make),
            packSize: String(pack),
            rate: numericRate,
            price: formattedPrice,
            priceType: 'fixed' as const,
            inStock: true,
            isFeatured: false,
            image: chosenImg,
            shortDesc: `${desc} by ${make}. Pack size: ${pack}. FY 25-26 Cust Supply Rate: ${formattedPrice}.`,
            fullDesc: `${desc} is an authentic clinical IVF/ART product manufactured/imported by ${make}. Validated for reproductive medicine laboratories. Pack: ${pack}.`,
            features: [
              `Make / Importer: ${make}`,
              `Pack Size: ${pack}`,
              `Supply Rate: ${formattedPrice}`,
              'Batch verified and sterility certified'
            ],
            specs: [
              { key: 'Make / Importer', value: String(make) },
              { key: 'Pack Size', value: String(pack) },
              { key: 'FY 25-26 Cust Supply Rate', value: formattedPrice },
              { key: 'Validity', value: '31st March 2026' }
            ]
          };
        });

        setImportedPreview(parsedProducts);
        setIsBulkImportModalOpen(true);
        showToast(`Parsed ${parsedProducts.length} items from file! Review preview before adding.`, 'info');
      } catch (err) {
        showToast('Error reading Excel/CSV file: ' + (err as any).message, 'error');
      }
    };
    reader.readAsBinaryString(file);
    if (e.target) e.target.value = '';
  };

  const handleConfirmBulkImport = async () => {
    if (importedPreview.length === 0) return;
    setIsImporting(true);

    importedPreview.forEach((p) => {
      if (p.category && !categories.includes(p.category)) {
        addCategory(p.category);
      }
      addProduct(p);
    });

    showToast(`Added ${importedPreview.length} products to inventory! Syncing to production database...`, 'info');
    await publishFullStateToProduction();
    setIsBulkImportModalOpen(false);
    setImportedPreview([]);
    setIsImporting(false);
  };

  const exportProductsCSV = () => {
    const headers = ['Description', 'Make/Importer', 'Pack Size', 'FY 25-26 Cust Supply Rate', 'Category', 'Code'];
    const rows = products.map((p) => [
      `"${p.name.replace(/"/g, '""')}"`,
      `"${(p.makeImporter || 'ART Medical').replace(/"/g, '""')}"`,
      `"${(p.packSize || 'Single Sterile').replace(/"/g, '""')}"`,
      `"${(p.price || 'Price on Request').replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      `"${p.modelNumber.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `art_solution_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Catalog exported to CSV successfully!', 'success');
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

  // Media & Image Upload helper (Uploads directly to production storage)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (urlOrBase64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast(`Uploading ${file.name} to production storage...`, 'info');
    try {
      const result = await uploadMedia(file);
      if (result.url) {
        onSuccess(result.url);
        showToast('Uploaded to production storage successfully!', 'success');
      } else {
        showToast('Upload failed, please try again.', 'error');
      }
    } catch (err: any) {
      showToast('Upload error: ' + err.message, 'error');
    }
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

  // If not authenticated, display login gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-100/70 animate-in fade-in">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md mb-3"
              style={{ backgroundColor: themeSettings.primaryColor }}
            >
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Admin Portal Login
            </h2>
            <p className="text-xs text-slate-500">
              Please enter your administrator credentials to access content editing, product management, and customer leads.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoginError('');
              const success = adminLogin(loginEmail, loginPassword);
              if (!success) {
                setLoginError('Invalid administrator email or password.');
              }
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">
                Admin Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-700 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: themeSettings.ctaColor,
                color: themeSettings.ctaTextColor,
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-xs shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              Return to Website Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Admin:</span>
              <span className="font-mono font-semibold text-white">
                {themeSettings.adminEmail || 'onlinewithsudip@gmail.com'}
              </span>
            </div>

            <button
              onClick={() => {
                setPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live Site</span>
            </button>

            {/* Save All Changes Button */}
            <button
              onClick={handleSaveAllCMS}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                hasUnsavedChanges
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 animate-pulse'
                  : 'bg-teal-700 hover:bg-teal-600 text-white'
              }`}
              title="Save all changes directly to website"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{hasUnsavedChanges ? 'Save Changes *' : 'Save Changes'}</span>
            </button>

            {/* Save & Download Backup File */}
            <button
              onClick={() => {
                handleSaveAllCMS();
                handleExportBackup();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Save changes and download JSON file to device"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Save & Download File</span>
            </button>

            <button
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
              title="Log Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Live Production Database Sync Bar */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Database className="w-3.5 h-3.5" />
              <span className="font-semibold">{dbStatus?.provider || 'Production Database Connected'}</span>
            </div>
            {lastSyncedAt && (
              <span className="text-slate-400 text-[11px]">
                Last Synced: <span className="font-mono text-slate-300">{lastSyncedAt}</span>
              </span>
            )}
            {isSyncing && (
              <span className="flex items-center gap-1 text-teal-400 text-[11px] font-medium">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Syncing with Production API...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshFromProduction()}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors disabled:opacity-50"
              title="Fetch latest data from production database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Pull Latest from Database</span>
            </button>
            <button
              onClick={() => publishFullStateToProduction()}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
              title="Push all local CMS and inventory data to production cloud database"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Publish All to Production</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-md border-b border-amber-600 sticky top-20 z-40 animate-in slide-in-from-top">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0" />
              <span>You have unsaved changes! Changes are strictly saved to the website only when you click Save.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setContentForm(websiteContent);
                  setSettingsForm(themeSettings);
                  setHasUnsavedChanges(false);
                  showToast('Draft changes discarded.');
                }}
                className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
              >
                Discard Edits
              </button>
              <button
                onClick={handleSaveAllCMS}
                className="px-4 py-1 rounded-lg bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save All Changes Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none py-2">
          {[
            { id: 'header-footer', label: 'Header & Footer CMS', icon: Layout },
            { id: 'content', label: 'Page Content & Contacts', icon: FileText },
            { id: 'images', label: 'Change Images & Media', icon: ImageIcon },
            { id: 'products', label: 'Products & Pricing', icon: Package, badge: products.length },
            { id: 'gallery', label: 'Photo Gallery', icon: Layers, badge: galleryItems.length },
            { id: 'settings', label: 'Theme & Brand Icon', icon: Palette },
            { id: 'inquiries', label: 'Inquiries & Leads', icon: Mail, badge: inquiries.length },
            { id: 'ai-studio', label: 'Gemini AI Assistant', icon: Sparkles, badge: 'AI' },
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
        {/* TAB 0: HEADER & FOOTER CMS (Requested by User) */}
        {/* ============================================================== */}
        {adminTab === 'header-footer' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Save notice & Action Bar */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Header & Footer CMS Manager
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    Global Navigation & Branding
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Edit top ribbon announcements, phone numbers, brand logos, icons, CTAs, footer taglines, certifications, and legal notices.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    handleSaveHeaderFooter();
                    handleExportBackup();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors"
                  title="Save changes and download JSON file to device"
                >
                  <Download className="w-3.5 h-3.5 text-teal-600" />
                  <span>Save & Download File</span>
                </button>

                <button
                  onClick={handleSaveHeaderFooter}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Header & Footer</span>
                </button>
              </div>
            </div>

            {/* LIVE HEADER PREVIEW BOX */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Header Preview</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  Updates in real-time as you edit below
                </span>
              </div>

              <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm bg-white">
                {/* Simulated Top Ribbon */}
                <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {contentForm.header?.topRibbonKicker || 'ISO 13485 & CE Mark Certified'}
                    </span>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <span className="hidden sm:inline text-slate-400">
                      {contentForm.header?.topRibbonSubtitle || 'Turnkey IVF Labs & Clinical Embryology Solutions'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300 font-mono text-xs">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{contentForm.header?.topRibbonPhone || contentForm.contact?.phone1 || '+91 98754 06943'}</span>
                  </div>
                </div>

                {/* Simulated Main Header */}
                <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    {settingsForm.logoUrl ? (
                      <img
                        src={settingsForm.logoUrl}
                        alt="Logo"
                        style={{ height: `${settingsForm.logoHeight || 38}px` }}
                        className="w-auto object-contain"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: settingsForm.primaryColor }}
                      >
                        <BrandIcon
                          name={settingsForm.logoIcon || 'Activity'}
                          customIconUrl={settingsForm.customIconUrl}
                          className="w-5 h-5 stroke-[2.2]"
                        />
                      </div>
                    )}
                    {settingsForm.logoType !== 'image' && (
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">
                          {settingsForm.logoText || 'ART Medical'}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {settingsForm.logoTagline || 'Offering Full Solution'}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600">
                    <span>Home</span>
                    <span>About Us</span>
                    <span>Products</span>
                    <span>Gallery</span>
                    <span>Contact</span>
                  </div>

                  <div className="px-4 py-2 rounded-lg text-xs font-semibold shadow-xs" style={{ backgroundColor: settingsForm.ctaColor, color: settingsForm.ctaTextColor }}>
                    {contentForm.header?.ctaButtonText || 'Request Quotation'}
                  </div>
                </div>
              </div>
            </div>

            {/* PART 1: HEADER CMS EDITOR */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    1. Header & Top Ribbon Settings
                  </h4>
                  <p className="text-xs text-slate-500">
                    Customize the top ribbon announcement text, quality certifications, and phone number link.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  Header CMS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Top Ribbon Announcement / Slogan
                  </label>
                  <input
                    type="text"
                    value={contentForm.header?.topRibbonSubtitle || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        header: { ...contentForm.header, topRibbonSubtitle: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Turnkey IVF Labs & Clinical Embryology Solutions"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Displays on the dark top ribbon across the entire website.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Top Ribbon Certification Kicker
                  </label>
                  <input
                    type="text"
                    value={contentForm.header?.topRibbonKicker || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        header: { ...contentForm.header, topRibbonKicker: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="ISO 13485:2016 Certified Solutions"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-emerald-700"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Shows with a pulse green indicator on the top ribbon.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Top Ribbon Phone Number (Link Number) *
                  </label>
                  <input
                    type="text"
                    value={contentForm.header?.topRibbonPhone || contentForm.contact?.phone1 || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        header: { ...contentForm.header, topRibbonPhone: e.target.value },
                        contact: { ...(contentForm.contact || defaultWebsiteContent.contact), phone1: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="+91 98712 34567"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono font-semibold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Clickable phone number linked to WhatsApp & phone call.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Header Action Button Text
                  </label>
                  <input
                    type="text"
                    value={contentForm.header?.ctaButtonText || 'Request Quotation'}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        header: { ...contentForm.header, ctaButtonText: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Request Quotation"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    High-contrast action button on the right side of the navbar.
                  </span>
                </div>
              </div>
            </div>

            {/* PART 2: BRAND LOGO & ICON SELECTOR (Option to Change the Icon) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-teal-600" />
                    <span>2. Brand Logo & Icon Management</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Change the website brand icon, upload an image logo, or edit the business name.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Display Mode:</span>
                  <select
                    value={settingsForm.logoType}
                    onChange={(e) => {
                      setSettingsForm({
                        ...settingsForm,
                        logoType: e.target.value as 'text' | 'image' | 'both',
                      });
                      setHasUnsavedChanges(true);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                  >
                    <option value="both">Icon/Image & Brand Text</option>
                    <option value="image">Image Only</option>
                    <option value="text">Text Only</option>
                  </select>
                </div>
              </div>

              {/* Option to Change the Icon (Requested by User) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <span>Select Brand Icon</span>
                      <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                        12 Medical & Laboratory Icons
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Choose an icon for your fertility clinic brand mark, or upload a custom SVG icon.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shrink-0">
                    <span className="text-[11px] font-medium text-slate-500">Active Icon:</span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: settingsForm.primaryColor }}
                    >
                      <BrandIcon
                        name={settingsForm.logoIcon || 'Activity'}
                        customIconUrl={settingsForm.customIconUrl}
                        className="w-4 h-4 stroke-[2.2]"
                      />
                    </div>
                    <span className="font-bold text-xs text-slate-900">
                      {settingsForm.customIconUrl ? 'Custom Icon' : settingsForm.logoIcon || 'Activity'}
                    </span>
                  </div>
                </div>

                {/* 12 Medical Icons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {AVAILABLE_ICONS.map((item) => {
                    const isSelected =
                      !settingsForm.customIconUrl &&
                      (settingsForm.logoIcon || 'Activity').toLowerCase() === item.id.toLowerCase();
                    const IconComp = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSettingsForm({
                            ...settingsForm,
                            logoIcon: item.id,
                            customIconUrl: '',
                          });
                          setHasUnsavedChanges(true);
                        }}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-500 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-transform ${
                            isSelected ? 'bg-teal-700 text-white scale-105' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <IconComp className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <span className={`text-[11px] font-semibold leading-tight line-clamp-1 ${
                          isSelected ? 'text-teal-900 font-bold' : 'text-slate-700'
                        }`}>
                          {item.id}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Icon Upload Option */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">Want to use a custom SVG / icon file?</span>
                    <span className="text-slate-500 text-[11px]">Upload your clinic symbol or icon graphic directly.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 text-xs">
                      <UploadCloud className="w-3.5 h-3.5 text-teal-600" />
                      <span>Upload Custom Icon File</span>
                      <input
                        type="file"
                        accept="image/*,.svg"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) => {
                            setSettingsForm({ ...settingsForm, customIconUrl: base64 });
                            setHasUnsavedChanges(true);
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {settingsForm.customIconUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsForm({ ...settingsForm, customIconUrl: '' });
                          setHasUnsavedChanges(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100"
                      >
                        Clear Custom Icon
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Brand Name, Tagline & Image Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.logoText}
                    onChange={(e) => {
                      setSettingsForm({ ...settingsForm, logoText: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="ART Medical"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Brand Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={settingsForm.logoTagline}
                    onChange={(e) => {
                      setSettingsForm({ ...settingsForm, logoTagline: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Offering Full Solution"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-xs"
                  />
                </div>

                {/* Upload Image Logo */}
                <div className="sm:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">Optional: Custom Image Logo Graphic</span>
                      <span className="text-slate-500 text-[11px]">Upload a PNG or WebP logo file to replace the default icon badge.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 text-xs shadow-xs">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Logo Graphic</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) => {
                              setSettingsForm({ ...settingsForm, logoUrl: base64, logoType: 'image' });
                              setHasUnsavedChanges(true);
                            })
                          }
                          className="hidden"
                        />
                      </label>

                      {settingsForm.logoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setSettingsForm({ ...settingsForm, logoUrl: '' });
                            setHasUnsavedChanges(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 text-xs"
                        >
                          Remove Logo Image
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="url"
                      value={settingsForm.logoUrl || ''}
                      onChange={(e) => {
                        setSettingsForm({ ...settingsForm, logoUrl: e.target.value });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Or enter image logo URL (https://...)"
                      className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                      <span>Logo Display Height in Header</span>
                      <span className="font-mono text-teal-700">{settingsForm.logoHeight || 42}px</span>
                    </div>
                    <input
                      type="range"
                      min={24}
                      max={64}
                      value={settingsForm.logoHeight || 42}
                      onChange={(e) => {
                        setSettingsForm({ ...settingsForm, logoHeight: Number(e.target.value) });
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PART 3: FOOTER CMS EDITOR */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    3. Footer CMS & Link Numbers
                  </h4>
                  <p className="text-xs text-slate-500">
                    Customize footer mission statement, quality badges, phone numbers, addresses, and social links.
                  </p>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  Footer CMS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Footer Brand Tagline / Mission Text
                  </label>
                  <textarea
                    rows={2}
                    value={contentForm.footer?.tagline || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        footer: { ...contentForm.footer, tagline: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Precision IVF laboratory design, medical devices, and turnkey embryology solutions."
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quality Certification Badge Text
                  </label>
                  <input
                    type="text"
                    value={contentForm.footer?.certificationBadge || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        footer: { ...contentForm.footer, certificationBadge: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="ISO 13485:2016 & CE Mark Certified"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Footer Copyright Notice Text
                  </label>
                  <input
                    type="text"
                    value={contentForm.footer?.copyrightText || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        footer: { ...contentForm.footer, copyrightText: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="© 2026 ART Medical. All rights reserved."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Regulatory Medical Disclaimer
                  </label>
                  <textarea
                    rows={2}
                    value={contentForm.footer?.disclaimer || ''}
                    onChange={(e) => {
                      setContentForm({
                        ...contentForm,
                        footer: { ...contentForm.footer, disclaimer: e.target.value },
                      });
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="Products displayed are intended for certified clinical reproductive medicine facilities..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 resize-none text-[11px]"
                  />
                </div>
              </div>

              {/* Footer Phone Numbers & Contact Links */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span className="font-bold uppercase tracking-wider text-slate-800">
                    Footer Contact & Phone Numbers
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Phone Number (Clickable in Footer) *
                    </label>
                    <input
                      type="text"
                      value={contentForm.contact?.phone1 || ''}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          contact: { ...(contentForm.contact || defaultWebsiteContent.contact), phone1: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={contentForm.contact.email}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, email: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">
                      Physical Facility Address
                    </label>
                    <input
                      type="text"
                      value={contentForm.contact.address}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, address: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-slate-800 text-xs block uppercase tracking-wider">
                  Social Media Links (Optional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={contentForm.footer?.linkedinUrl || ''}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          footer: { ...contentForm.footer, linkedinUrl: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="https://linkedin.com/company/..."
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Twitter / X URL</label>
                    <input
                      type="url"
                      value={contentForm.footer?.twitterUrl || ''}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          footer: { ...contentForm.footer, twitterUrl: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="https://twitter.com/..."
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Facebook URL</label>
                    <input
                      type="url"
                      value={contentForm.footer?.facebookUrl || ''}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          footer: { ...contentForm.footer, facebookUrl: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="https://facebook.com/..."
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">YouTube URL</label>
                    <input
                      type="url"
                      value={contentForm.footer?.youtubeUrl || ''}
                      onChange={(e) => {
                        setContentForm({
                          ...contentForm,
                          footer: { ...contentForm.footer, youtubeUrl: e.target.value },
                        });
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="https://youtube.com/..."
                      className="w-full p-2 rounded-lg border border-slate-200 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {hasUnsavedChanges ? '⚠️ Changes are pending save.' : '✓ All changes are currently saved.'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleSaveHeaderFooter();
                      handleExportBackup();
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-teal-600" />
                    <span>Save & Download Backup</span>
                  </button>

                  <button
                    onClick={handleSaveHeaderFooter}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save Header & Footer Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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

                {/* Hero Showcase Image */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                  <label className="block font-bold uppercase text-slate-700 mb-2">
                    Hero Section Laboratory Showcase Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <img
                      src={contentForm.hero.heroImage || heroImg}
                      alt="Hero preview"
                      className="w-40 h-28 object-cover rounded-lg border border-slate-300 shadow-xs shrink-0 bg-slate-900"
                    />
                    <div className="flex-1 space-y-2 w-full text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 shadow-xs">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, (base64) =>
                                setContentForm({
                                  ...contentForm,
                                  hero: { ...contentForm.hero, heroImage: base64 },
                                })
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        {contentForm.hero.heroImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setContentForm({
                                ...contentForm,
                                hero: { ...contentForm.hero, heroImage: '' },
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
                          >
                            Reset to Default
                          </button>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={contentForm.hero.heroImage || ''}
                          onChange={(e) =>
                            setContentForm({
                              ...contentForm,
                              hero: { ...contentForm.hero, heroImage: e.target.value },
                            })
                          }
                          placeholder="Or paste external image URL (https://...)"
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Appears on the homepage hero section right side console visual.
                        </span>
                      </div>
                    </div>
                  </div>
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

                {/* About Page Facility Showcase Image */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100">
                  <label className="block font-bold uppercase text-slate-700 mb-2">
                    About Us Modular Cleanroom Facility Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <img
                      src={contentForm.about.aboutImage || cleanroomImg}
                      alt="About facility preview"
                      className="w-40 h-28 object-cover rounded-lg border border-slate-300 shadow-xs shrink-0 bg-slate-900"
                    />
                    <div className="flex-1 space-y-2 w-full text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 shadow-xs">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload Facility Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, (base64) =>
                                setContentForm({
                                  ...contentForm,
                                  about: { ...contentForm.about, aboutImage: base64 },
                                })
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        {contentForm.about.aboutImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setContentForm({
                                ...contentForm,
                                about: { ...contentForm.about, aboutImage: '' },
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-300"
                          >
                            Reset to Default
                          </button>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          value={contentForm.about.aboutImage || ''}
                          onChange={(e) =>
                            setContentForm({
                              ...contentForm,
                              about: { ...contentForm.about, aboutImage: e.target.value },
                            })
                          }
                          placeholder="Or paste external image URL (https://...)"
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Appears on the About Us page as the turnkey cleanroom facility showcase photo.
                        </span>
                      </div>
                    </div>
                  </div>
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

            {/* Contact Information & Phone Numbers */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <span>3. Phone Numbers, WhatsApp & Contact Channels</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update business phone numbers, direct WhatsApp chat link, email addresses, and location.
                  </p>
                </div>
                <button
                  onClick={() => {
                    updateWebsiteContent('contact', contentForm.contact);
                    showToast('Contact details, phone numbers, and WhatsApp settings saved!');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Contact Details</span>
                </button>
              </div>

              {/* Subcard: Phone Numbers Management */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-teal-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Business Phone Numbers
                  </h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                    Displayed across Header, Contact page & Footer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Primary Phone Number (Header Ribbon & Footer) *
                    </label>
                    <input
                      type="text"
                      value={contentForm.contact?.phone1 || ''}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...(contentForm.contact || defaultWebsiteContent.contact), phone1: e.target.value },
                        })
                      }
                      placeholder="+91 98712 34567"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono font-semibold text-xs focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Shown on the top header ribbon and footer contact column.
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Secondary / Emergency Technical Support Phone
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
                      placeholder="+91 11 4567 8900"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono text-xs focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Shown on Contact Page for 24/7 biomedical engineering dispatch.
                    </span>
                  </div>
                </div>
              </div>

              {/* Subcard: WhatsApp Link in WhatsApp Button */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                      WhatsApp Button Link & Integration
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => openWhatsApp()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-xs"
                    title="Test WhatsApp action in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test WhatsApp Link Now</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Custom WhatsApp Direct Chat Link (Recommended)</span>
                    </label>
                    <input
                      type="url"
                      value={contentForm.contact.whatsappLink || ''}
                      onChange={(e) =>
                        setContentForm({
                          ...contentForm,
                          contact: { ...contentForm.contact, whatsappLink: e.target.value },
                        })
                      }
                      placeholder="e.g. https://wa.me/919871234567 or https://wa.me/message/XXXX or https://chat.whatsapp.com/..."
                      className="w-full p-2.5 rounded-xl border border-emerald-300 bg-white font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[11px] text-emerald-800/80 mt-1 block">
                      If set, clicking any WhatsApp button on the site (floating button, header, contact page, product inquiry) will open this link directly.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        WhatsApp Phone Number (with Country Code)
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
                        placeholder="+91 98712 34567"
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white font-mono text-xs"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Used as fallback if no direct link is provided.
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Default Chat Greeting Message
                      </label>
                      <input
                        type="text"
                        value={contentForm.contact.whatsappMessage || ''}
                        onChange={(e) =>
                          setContentForm({
                            ...contentForm,
                            contact: { ...contentForm.contact, whatsappMessage: e.target.value },
                          })
                        }
                        placeholder="Hello, I would like to inquire about IVF equipment..."
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs"
                      />
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Pre-populated message when the chat opens.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Contact Details: Company Name, Emails, Address, Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
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

                <div>
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
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    updateWebsiteContent('contact', contentForm.contact);
                    showToast('Contact details, phone numbers, and WhatsApp settings saved!');
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Contact Details</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: IMAGES & MEDIA MANAGER (Requested by User) */}
        {/* ============================================================== */}
        {adminTab === 'images' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Header intro */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Website Images & Visual Media Manager
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    Visual Assets
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Upload custom photos from your device or paste image URLs for the homepage hero, about page, company logo, and all products.
                </p>
              </div>

              <button
                onClick={() => {
                  updateWebsiteContent('hero', contentForm.hero);
                  updateWebsiteContent('about', contentForm.about);
                  showToast('All website image changes saved successfully!');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 shadow-xs shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Save All Visuals</span>
              </button>
            </div>

            {/* 1. Primary Page Showcase Visuals (Hero & About) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hero Banner Visual */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      1. Homepage Hero Laboratory Image
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      High-impact visual shown on the right side of the main homepage header.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Homepage
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img
                    src={contentForm.hero.heroImage || heroImg}
                    alt="Hero banner"
                    className="w-full h-52 object-cover transition-transform group-hover:scale-102"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
                    Current Live Image
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 shadow-xs">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload New Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) => {
                            const updated = {
                              ...contentForm,
                              hero: { ...contentForm.hero, heroImage: base64 },
                            };
                            setContentForm(updated);
                            updateWebsiteContent('hero', updated.hero);
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {contentForm.hero.heroImage && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = {
                            ...contentForm,
                            hero: { ...contentForm.hero, heroImage: '' },
                          };
                          setContentForm(updated);
                          updateWebsiteContent('hero', updated.hero);
                          showToast('Reset hero image to default medical asset.');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Paste Image Direct URL
                    </label>
                    <input
                      type="url"
                      value={contentForm.hero.heroImage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated = {
                          ...contentForm,
                          hero: { ...contentForm.hero, heroImage: val },
                        };
                        setContentForm(updated);
                        updateWebsiteContent('hero', updated.hero);
                      }}
                      placeholder="https://images.unsplash.com/... or cloud URL"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* About Us Facility Visual */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      2. About Us Cleanroom Facility Image
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Modular cleanroom engineering photo displayed on the About Us page.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    About Us
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img
                    src={contentForm.about.aboutImage || cleanroomImg}
                    alt="Facility showcase"
                    className="w-full h-52 object-cover transition-transform group-hover:scale-102"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
                    Current Live Image
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 shadow-xs">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload New Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) => {
                            const updated = {
                              ...contentForm,
                              about: { ...contentForm.about, aboutImage: base64 },
                            };
                            setContentForm(updated);
                            updateWebsiteContent('about', updated.about);
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {contentForm.about.aboutImage && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = {
                            ...contentForm,
                            about: { ...contentForm.about, aboutImage: '' },
                          };
                          setContentForm(updated);
                          updateWebsiteContent('about', updated.about);
                          showToast('Reset facility image to default medical asset.');
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Paste Image Direct URL
                    </label>
                    <input
                      type="url"
                      value={contentForm.about.aboutImage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated = {
                          ...contentForm,
                          about: { ...contentForm.about, aboutImage: val },
                        };
                        setContentForm(updated);
                        updateWebsiteContent('about', updated.about);
                      }}
                      placeholder="https://images.unsplash.com/... or cloud URL"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Company Brand Logo Image */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    3. Brand Logo Image & Header Presentation
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Your clinic or corporate logo displayed in the top navbar and footer.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Logo Type:</span>
                  <select
                    value={themeSettings.logoType}
                    onChange={(e) => {
                      const val = e.target.value as 'text' | 'image' | 'both';
                      updateThemeSettings({ logoType: val });
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                  >
                    <option value="both">Image & Brand Text</option>
                    <option value="image">Image Only</option>
                    <option value="text">Text Only</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-28 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center p-2 shrink-0">
                  {themeSettings.logoUrl ? (
                    <img
                      src={themeSettings.logoUrl}
                      alt="Current logo"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium text-center">
                      No custom logo set
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-2.5 w-full text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 shadow-xs">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Logo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (base64) => {
                            updateThemeSettings({ logoUrl: base64, logoType: 'image' });
                          })
                        }
                        className="hidden"
                      />
                    </label>

                    {themeSettings.logoUrl && (
                      <button
                        type="button"
                        onClick={() => updateThemeSettings({ logoUrl: '' })}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300"
                      >
                        Remove Logo
                      </button>
                    )}
                  </div>

                  <div>
                    <input
                      type="url"
                      value={themeSettings.logoUrl || ''}
                      onChange={(e) => updateThemeSettings({ logoUrl: e.target.value })}
                      placeholder="Or enter logo image URL (https://...)"
                      className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Product Catalog Images Fast Manager */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    4. Product Catalog Images ({products.length} Items)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Instantly change product images for any equipment in the catalog.
                  </p>
                </div>
                <button
                  onClick={() => setAdminTab('products')}
                  className="text-xs text-teal-700 hover:text-teal-800 font-semibold underline"
                >
                  Manage Full Product Details &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs"
                  >
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-36 object-cover"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
                        {prod.modelNumber}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 line-clamp-1">{prod.name}</div>
                      <div className="text-[11px] text-slate-500">{prod.category}</div>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer flex-1 text-center py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold hover:bg-teal-100">
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileUpload(e, (base64) =>
                                updateProduct(prod.id, { image: base64 })
                              )
                            }
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={() => {
                            const newUrl = window.prompt('Enter new image URL for ' + prod.name, prod.image);
                            if (newUrl && newUrl.trim()) {
                              updateProduct(prod.id, { image: newUrl.trim() });
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold hover:bg-slate-100"
                          title="Paste image URL"
                        >
                          Paste URL
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Photo Gallery Quick Shortcut */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-400" />
                  <span>Facility & Laboratory Photo Gallery ({galleryItems.length} photos)</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Manage cleanroom setup photos, installation pictures, and clinic architecture.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={openAddGalleryModal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Gallery Photo</span>
                </button>
                <button
                  onClick={() => setAdminTab('gallery')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20"
                >
                  <span>View All &rarr;</span>
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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Equipment & Consumables Catalog</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-mono font-bold border border-teal-200">
                    {products.length} Items (₹)
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage categories, add/edit clinical products, customer supply rates in ₹, and bulk import Excel files.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Manage Categories Button (Directly requested by user) */}
                <button
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
                >
                  <Tag className="w-3.5 h-3.5 text-teal-700" />
                  <span>Manage Categories</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-mono">
                    {categories.length}
                  </span>
                </button>

                {/* Bulk Import Button */}
                <button
                  onClick={() => excelFileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold border border-sky-200 shadow-xs transition-colors"
                  title="Upload Excel (.xlsx, .xls) or CSV file"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-sky-600" />
                  <span>Import Excel / CSV</span>
                </button>
                <input
                  type="file"
                  ref={excelFileInputRef}
                  accept=".xlsx,.xls,.csv"
                  onChange={handleExcelUpload}
                  className="hidden"
                />

                {/* Export CSV Button */}
                <button
                  onClick={exportProductsCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-xs transition-colors"
                  title="Download inventory as CSV"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export CSV</span>
                </button>

                {/* Add New Equipment Button */}
                <button
                  onClick={openAddProductModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold shadow-xs transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Equipment</span>
                </button>
              </div>
            </div>

            {/* Admin Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={adminProductSearch}
                  onChange={(e) => setAdminProductSearch(e.target.value)}
                  placeholder="Quick search by name, Make, pack size, code..."
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                {adminProductSearch && (
                  <button
                    onClick={() => setAdminProductSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-slate-500 font-medium shrink-0">Filter:</span>
                <select
                  value={adminCategoryFilter}
                  onChange={(e) => setAdminCategoryFilter(e.target.value)}
                  className="p-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 w-full sm:w-auto"
                >
                  <option value="All">All Categories ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Item / Description</th>
                      <th className="py-3 px-4">Make / Importer</th>
                      <th className="py-3 px-4">Pack Size</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Supply Rate (₹)</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter((prod) => {
                        const matchesCat =
                          adminCategoryFilter === 'All' || prod.category === adminCategoryFilter;
                        const q = adminProductSearch.toLowerCase().trim();
                        const matchesSearch =
                          !q ||
                          prod.name.toLowerCase().includes(q) ||
                          prod.modelNumber.toLowerCase().includes(q) ||
                          (prod.makeImporter && prod.makeImporter.toLowerCase().includes(q)) ||
                          (prod.packSize && prod.packSize.toLowerCase().includes(q)) ||
                          prod.category.toLowerCase().includes(q);
                        return matchesCat && matchesSearch;
                      })
                      .map((prod) => (
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
                                <span className="text-[11px] text-slate-400 font-mono">
                                  {prod.modelNumber}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-sky-800">
                            {prod.makeImporter || 'ART Medical'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                            {prod.packSize || 'Single Sterile'}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700">
                            {prod.category}
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
            {/* 0. Administrator Account & Login Credentials (Requested by user) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      Administrator Account & Login Credentials
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Security & Auth
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Update the administrator login email ID and password for accessing this admin portal.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (accountNewPassword && accountNewPassword !== accountConfirmPassword) {
                      showToast('New passwords do not match.', 'error');
                      return;
                    }
                    updateAdminCredentials(accountEmail, accountNewPassword || undefined);
                    if (syncAllEmails) {
                      updateThemeSettings({
                        adminEmail: accountEmail,
                        leadNotificationEmail: accountEmail,
                      });
                      updateWebsiteContent('contact', {
                        ...websiteContent.contact,
                        email: accountEmail,
                        supportEmail: accountEmail,
                      });
                      showToast('Email address synchronized across Admin login, Contact page, and Lead notifications!');
                    } else {
                      updateThemeSettings({ adminEmail: accountEmail });
                    }
                    setAccountNewPassword('');
                    setAccountConfirmPassword('');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 text-xs font-semibold shadow-xs shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Account Details</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      Administrator Email ID *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center sm:pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                      <input
                        type="checkbox"
                        checked={syncAllEmails}
                        onChange={(e) => setSyncAllEmails(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      <span>Also update Contact page & Lead notification email to this ID</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      Change Password (Optional)
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showAccountPass ? 'text' : 'password'}
                        value={accountNewPassword}
                        onChange={(e) => setAccountNewPassword(e.target.value)}
                        placeholder="Enter new password to change..."
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAccountPass(!showAccountPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showAccountPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showAccountPass ? 'text' : 'password'}
                        value={accountConfirmPassword}
                        onChange={(e) => setAccountConfirmPassword(e.target.value)}
                        placeholder="Confirm new password..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
                        const updated = { ...settingsForm, logoUrl: base64, logoType: 'image' as const };
                        setSettingsForm(updated);
                        updateThemeSettings({ logoUrl: base64, logoType: 'image' });
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
                        placeholder="e.g. onlinewithsudip@gmail.com"
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
                        placeholder="e.g. artmedical4560@gmail.com"
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
                    {themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'}
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
                            {inq.emailSentTo || themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'}
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
                            inq.emailSentTo || themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'
                          );
                        }}
                        className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline flex items-center gap-1"
                      >
                        <SendHorizontal className="w-3 h-3" />
                        <span>Forward Lead Email</span>
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
                        href={`mailto:${inq.email}?subject=RE: Inquiry with ART Medical&body=Dear ${encodeURIComponent(inq.name)},%0D%0A%0D%0AThank you for contacting ART Medical regarding ${encodeURIComponent(inq.productName || inq.inquiryType)}.`}
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
                              `Hello ${inq.name}, this is ART Medical regarding your inquiry about ${
                                inq.productName || 'our IVF and laboratory equipment solutions'
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

        {/* ============================================================== */}
        {/* TAB 8: GEMINI AI ASSISTANT (Secure Server-Side AI Studio) */}
        {/* ============================================================== */}
        {adminTab === 'ai-studio' && (
          <div className="space-y-6 pb-20">
            {/* Header Card with Security & Status */}
            <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Google AI Studio Gemini Integration</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Gemini AI Medical Content Studio
                  </h2>
                  <p className="text-xs text-indigo-200/80 max-w-2xl leading-relaxed">
                    Generate clinically accurate product descriptions, optimize IVF equipment specifications, rewrite website copy, and create technical FAQs using Google's next-generation Gemini models.
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3.5 border border-white/10 flex flex-col gap-1.5 shrink-0 min-w-56">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-indigo-200 font-medium">Server API Status:</span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        geminiStatus.configured
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${geminiStatus.configured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                      {geminiStatus.configured ? 'Connected & Active' : 'Key Needed'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    Model: <span className="text-indigo-300 font-semibold">{geminiStatus.model}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight pt-1 border-t border-white/10">
                    {geminiStatus.configured
                      ? 'Securely authenticated via server process.env.GEMINI_API_KEY'
                      : 'Set GEMINI_API_KEY in Vercel environment variables'}
                  </div>
                </div>
              </div>

              {/* Security info banner */}
              <div className="bg-indigo-950/60 rounded-xl p-3 text-xs text-indigo-200/90 border border-indigo-800/40 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-white">Vercel Deployment Security Architecture:</span>
                  <p className="text-[11px] text-indigo-200/80 leading-relaxed">
                    All AI operations route through the secure serverless backend route <code className="bg-indigo-900/60 px-1 py-0.5 rounded font-mono text-indigo-300">/api/gemini</code>. Your Google AI Studio API key is accessed strictly on the server and is never exposed in browser bundles. After deploying to Vercel, simply supply <code className="bg-indigo-900/60 px-1 py-0.5 rounded font-mono text-indigo-300">GEMINI_API_KEY</code> in project environment variables.
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Workspace */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Studio Subtabs */}
              <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none px-4 pt-2">
                {[
                  { id: 'product-copy', label: 'Equipment Copywriter', icon: Package },
                  { id: 'cms-polisher', label: 'Website CMS Polisher', icon: FileText },
                  { id: 'faq-generator', label: 'IVF Technical FAQs', icon: Lightbulb },
                  { id: 'seo-generator', label: 'SEO Meta Generator', icon: Globe },
                  { id: 'custom-chat', label: 'Custom Prompt', icon: Wand2 },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isActive = aiStudioMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setAiStudioMode(mode.id as any);
                        setAiOutput('');
                        setAiError('');
                      }}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                        isActive
                          ? 'border-indigo-600 text-indigo-600 bg-white font-bold'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Workspace Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Configuration & Controls */}
                  <div className="space-y-4">
                    {/* Mode 1: Product Copy */}
                    {aiStudioMode === 'product-copy' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 uppercase mb-1.5">
                            Select Equipment from Inventory ({products.length} Products)
                          </label>
                          <select
                            value={aiSelectedProductId}
                            onChange={(e) => {
                              setAiSelectedProductId(e.target.value);
                              const selected = products.find((p) => p.id === e.target.value);
                              if (selected?.fullDesc) setAiOutput(selected.fullDesc);
                            }}
                            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          >
                            <option value="">-- Choose a product to generate or enhance description --</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                [{p.category}] {p.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {aiSelectedProductId && (
                          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
                            {(() => {
                              const sel = products.find((p) => p.id === aiSelectedProductId);
                              if (!sel) return null;
                              return (
                                <>
                                  <div className="font-semibold text-slate-800">{sel.name}</div>
                                  <div className="text-slate-500">
                                    Category: <span className="text-slate-700 font-medium">{sel.category}</span> | Make: <span className="text-slate-700 font-medium">{sel.makeImporter || 'ART Medical'}</span>
                                  </div>
                                  <div className="text-slate-500 truncate">
                                    Current Description: {sel.fullDesc ? sel.fullDesc.substring(0, 90) + '...' : '(None yet)'}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        )}

                        <div className="text-[11px] text-slate-500 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                          Gemini will generate a clinically sound medical equipment description including clinical indication, quality testing (MEA tested, endotoxin levels), and technical highlights for IVF laboratories.
                        </div>
                      </div>
                    )}

                    {/* Mode 2: CMS Polisher */}
                    {aiStudioMode === 'cms-polisher' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 uppercase mb-1.5">
                            Target Website CMS Section
                          </label>
                          <select
                            value={aiCmsTarget}
                            onChange={(e) => setAiCmsTarget(e.target.value as any)}
                            className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          >
                            <option value="hero-title">Home Hero Main Headline</option>
                            <option value="hero-subtitle">Home Hero Subtitle / Overview</option>
                            <option value="about-story">About Us Main Story Paragraph</option>
                            <option value="mission">Company Mission Statement</option>
                            <option value="announcement">Header Ribbon Announcement Bar</option>
                          </select>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                          <span className="font-bold text-slate-700 block">Current Live Text:</span>
                          <p className="text-slate-600 italic">
                            {aiCmsTarget === 'hero-title' && contentForm.hero.title}
                            {aiCmsTarget === 'hero-subtitle' && contentForm.hero.subtitle}
                            {aiCmsTarget === 'about-story' && contentForm.about.storyParagraph1}
                            {aiCmsTarget === 'mission' && contentForm.about.mission}
                            {aiCmsTarget === 'announcement' && contentForm.header.topRibbonSubtitle}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mode 3: FAQ Generator */}
                    {aiStudioMode === 'faq-generator' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 uppercase mb-1.5">
                            IVF Equipment / Media Clinical Topic
                          </label>
                          <input
                            type="text"
                            value={aiFaqTopic}
                            onChange={(e) => setAiFaqTopic(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="e.g. Media storage protocols, Micropipette angle selection, Vitrification recovery..."
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Culture media temperature & pH stability',
                            'Cryotech vitrification survival protocols',
                            'Wallace embryo transfer catheter handling',
                            'Senior embryologist backup support',
                            'Cleanroom air quality and VOC filtration',
                          ].map((suggested) => (
                            <button
                              key={suggested}
                              type="button"
                              onClick={() => setAiFaqTopic(suggested)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] transition-colors"
                            >
                              {suggested}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mode 4: SEO Generator */}
                    {aiStudioMode === 'seo-generator' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 uppercase mb-1.5">
                            Page or Product Subject
                          </label>
                          <input
                            type="text"
                            value={aiSeoPage}
                            onChange={(e) => setAiSeoPage(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="e.g. IVF Consumables & Labware, Cryopreservation Supplies..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Mode 5: Custom Chat / Prompt */}
                    {aiStudioMode === 'custom-chat' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 uppercase mb-1.5">
                            Custom Prompt to Gemini AI
                          </label>
                          <textarea
                            rows={4}
                            value={aiCustomPrompt}
                            onChange={(e) => setAiCustomPrompt(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
                            placeholder="Ask Gemini to draft an email to an embryologist, summarize product features, or write marketing copy..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Submit Action Button */}
                    <button
                      type="button"
                      onClick={handleRunAiStudio}
                      disabled={isCallingAi || (aiStudioMode === 'product-copy' && !aiSelectedProductId)}
                      className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                      <span>
                        {isCallingAi
                          ? 'Generating with Google AI Studio Gemini...'
                          : 'Generate with Gemini AI'}
                      </span>
                    </button>

                    {aiError && (
                      <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Error:</span> {aiError}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: AI Generation Output & Application */}
                  <div className="space-y-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-700 uppercase text-xs">
                          Gemini Generated Result
                        </label>
                        {aiOutput && (
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(aiOutput);
                              setAiCopied(true);
                              setTimeout(() => setAiCopied(false), 2000);
                            }}
                            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                          >
                            {aiCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <textarea
                          rows={12}
                          value={aiOutput}
                          onChange={(e) => setAiOutput(e.target.value)}
                          placeholder="Gemini generated output will appear here. You can freely review, edit, or copy the content before applying it to your website..."
                          className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 leading-relaxed font-sans focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
                        />
                      </div>
                    </div>

                    {/* Quick Apply Actions */}
                    {aiOutput && (
                      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-3">
                        <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          <span>Direct One-Click Application:</span>
                        </div>

                        {aiStudioMode === 'product-copy' && aiSelectedProductId && (
                          <button
                            type="button"
                            onClick={handleApplyAiOutputToProduct}
                            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Apply this Description to Selected Product & Save</span>
                          </button>
                        )}

                        {aiStudioMode === 'cms-polisher' && (
                          <button
                            type="button"
                            onClick={handleApplyAiOutputToCms}
                            className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <Save className="w-4 h-4" />
                            <span>Apply to Website {aiCmsTarget} & Update Live Site</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* FORWARD LEAD EMAIL MODAL */}
      {/* ============================================================== */}
      {forwardingInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Forward Lead Email Notification
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold uppercase text-slate-600">
                      Category *
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowInlineAddCat(!showInlineAddCat)}
                        className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline"
                      >
                        {showInlineAddCat ? 'Cancel' : '+ Add Category'}
                      </button>
                      <span className="text-slate-300">·</span>
                      <button
                        type="button"
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 underline"
                      >
                        Manage
                      </button>
                    </div>
                  </div>

                  {showInlineAddCat ? (
                    <div className="flex items-center gap-1.5 p-1 bg-teal-50 border border-teal-200 rounded-xl">
                      <input
                        type="text"
                        placeholder="New category name..."
                        value={inlineCatInput}
                        onChange={(e) => setInlineCatInput(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-teal-300 bg-white text-xs text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (inlineCatInput.trim()) {
                            const newName = inlineCatInput.trim();
                            if (addCategory(newName)) {
                              setProductForm({ ...productForm, category: newName });
                            }
                            setInlineCatInput('');
                            setShowInlineAddCat(false);
                          }
                        }}
                        className="px-2.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowInlineAddCat(false)}
                        className="p-1 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <select
                      value={productForm.category}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Make / Importer (Brand)
                  </label>
                  <input
                    type="text"
                    value={productForm.makeImporter || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, makeImporter: e.target.value })
                    }
                    placeholder="e.g. Fertipro, Origio, Wallace, Hitech"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Pack Size / Format
                  </label>
                  <input
                    type="text"
                    value={productForm.packSize || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, packSize: e.target.value })
                    }
                    placeholder="e.g. 5 ml HTF + 1 ml Upper Layer, Single Sterile"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Catalog / Model Code
                  </label>
                  <input
                    type="text"
                    value={productForm.modelNumber}
                    onChange={(e) =>
                      setProductForm({ ...productForm, modelNumber: e.target.value })
                    }
                    placeholder="e.g. ART-MED-101"
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">
                    Internal Reference Price (₹) (Not displayed publicly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={(productForm.price || '').replace(/^₹\s*/, '')}
                      onChange={(e) => {
                        const val = e.target.value.trim();
                        setProductForm({
                          ...productForm,
                          price: val ? (val.startsWith('₹') ? val : `₹${val}`) : '',
                        });
                      }}
                      placeholder="e.g. 1,000 (Optional)"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
                    />
                  </div>
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold uppercase text-slate-600">
                    Full Detailed Description (Product Detail Page)
                  </label>
                  <button
                    type="button"
                    onClick={handleAiGenerateProductDesc}
                    disabled={isGeneratingAiDesc || !productForm.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isGeneratingAiDesc ? 'Generating with Gemini...' : 'AI Generate with Gemini'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={productForm.fullDesc}
                  onChange={(e) =>
                    setProductForm({ ...productForm, fullDesc: e.target.value })
                  }
                  placeholder="Enter or auto-generate medical equipment description..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 resize-y"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold uppercase text-slate-600">
                    Key Features & Clinical Highlights
                  </label>
                  <button
                    type="button"
                    onClick={handleAiGenerateProductSpecs}
                    disabled={isGeneratingAiSpecs || !productForm.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isGeneratingAiSpecs ? 'Generating Features...' : 'AI Suggest Features'}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newFeatureText.trim()) {
                            setProductForm({
                              ...productForm,
                              features: [...productForm.features, newFeatureText.trim()],
                            });
                            setNewFeatureText('');
                          }
                        }
                      }}
                      placeholder="Add key feature (e.g. MEA batch tested, endotoxin <0.03 EU/mL)..."
                      className="flex-1 p-2 rounded-xl border border-slate-200 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureText.trim()) {
                          setProductForm({
                            ...productForm,
                            features: [...productForm.features, newFeatureText.trim()],
                          });
                          setNewFeatureText('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
                    >
                      Add
                    </button>
                  </div>

                  {productForm.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {productForm.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs border border-slate-200"
                        >
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = productForm.features.filter((_, i) => i !== idx);
                              setProductForm({ ...productForm, features: updated });
                            }}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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

      {/* ============================================================== */}
      {/* CATEGORY MANAGER MODAL (Add, Edit, Remove Equipment Categories) */}
      {/* ============================================================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Equipment Category Manager
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add new categories, rename existing categories, or remove unused ones.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCatName(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Add New Category Input */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-700">
                + Create New Equipment Category
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Laser Systems, Cleanroom Garments, Cryo Canes..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newCategoryInput.trim()) {
                        if (addCategory(newCategoryInput.trim())) {
                          setNewCategoryInput('');
                        }
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newCategoryInput.trim()) {
                      if (addCategory(newCategoryInput.trim())) {
                        setNewCategoryInput('');
                      }
                    } else {
                      showToast('Please enter a category name.', 'error');
                    }
                  }}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            {/* Existing Categories List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase px-1">
                <span>Existing Categories ({categories.length})</span>
                <span>Actions</span>
              </div>
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat).length;
                  const isEditing = editingCatName === cat;

                  return (
                    <div
                      key={cat}
                      className="pt-2 flex items-center justify-between gap-3 text-xs p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editedCatNameInput}
                            onChange={(e) => setEditedCatNameInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                if (editedCatNameInput.trim()) {
                                  if (editCategory(cat, editedCatNameInput.trim())) {
                                    setEditingCatName(null);
                                  }
                                }
                              }
                            }}
                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-teal-400 bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (editedCatNameInput.trim()) {
                                if (editCategory(cat, editedCatNameInput.trim())) {
                                  setEditingCatName(null);
                                }
                              }
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCatName(null)}
                            className="px-2 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-semibold text-slate-800 truncate">
                              {cat}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono text-[10px] shrink-0">
                              {count} {count === 1 ? 'product' : 'products'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCatName(cat);
                                setEditedCatNameInput(cat);
                              }}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                              title={`Edit / Rename "${cat}"`}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (categories.length <= 1) {
                                  showToast('At least one category must be retained.', 'error');
                                  return;
                                }
                                if (
                                  window.confirm(
                                    `Are you sure you want to remove category "${cat}"? Any products assigned to it will be safely moved to another category.`
                                  )
                                ) {
                                  removeCategory(cat);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title={`Remove "${cat}"`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCatName(null);
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
