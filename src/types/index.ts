export type Page = 'home' | 'about' | 'products' | 'product-details' | 'gallery' | 'contact' | 'admin';

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  modelNumber: string;
  shortDesc: string;
  fullDesc: string;
  price: string;
  priceType: 'fixed' | 'range' | 'inquire';
  inStock: boolean;
  isFeatured: boolean;
  image: string;
  additionalImages?: string[];
  features: string[];
  specs: ProductSpec[];
  brochureAvailable?: boolean;
  makeImporter?: string;
  packSize?: string;
  rate?: number | string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  date?: string;
  badge?: string;
  specs?: string[];
  highlight?: string;
  location?: string;
}

export interface StatItem {
  label: string;
  value: string;
  detail: string;
}

export interface CoreValue {
  title: string;
  desc: string;
}

export interface WebsiteContent {
  header: {
    topRibbonKicker: string;
    topRibbonSubtitle: string;
    topRibbonPhone: string;
    ctaButtonText: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    highlightBadge: string;
    stats: StatItem[];
    heroImage?: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyParagraph1: string;
    storyParagraph2: string;
    mission: string;
    vision: string;
    values: CoreValue[];
    certifications: string[];
    aboutImage?: string;
  };
  contact: {
    companyName: string;
    address: string;
    landmark?: string;
    phone1: string;
    phone2: string;
    phone3?: string;
    email: string;
    whatsapp: string;
    whatsappLink?: string;
    whatsappMessage?: string;
    workingHours: string;
    supportEmail: string;
    googleMapsUrl?: string;
  };
  footer: {
    tagline: string;
    certificationBadge: string;
    copyrightText: string;
    disclaimer: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    facebookUrl?: string;
    youtubeUrl?: string;
  };
}

export interface ThemeSettings {
  primaryColor: string;
  ctaColor: string;
  ctaTextColor: string;
  logoType: 'text' | 'image' | 'both';
  logoUrl: string;
  logoIcon: string;
  customIconUrl?: string;
  logoText: string;
  logoTagline: string;
  logoHeight: number;
  leadNotificationEmail: string;
  ccNotificationEmail?: string;
  enableEmailAlerts: boolean;
  adminEmail: string;
  adminPassword: string;
  heroBgStyle?: 'sapphire-teal' | 'ocean-cobalt' | 'midnight-emerald' | 'charcoal-cyan';
}

export interface Inquiry {
  id: string;
  date: string;
  timestamp?: string;
  name: string;
  clinicName: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: 'Turnkey Lab Setup' | 'Equipment Purchase' | 'Service & Maintenance' | 'Consumables Supply' | 'General Inquiry';
  message: string;
  productId?: string;
  productName?: string;
  status: 'new' | 'contacted' | 'closed';
  emailSentTo?: string;
  emailSentAt?: string;
  emailDeliveryStatus?: 'delivered' | 'pending' | 'failed';
}

export type AdminTab = 'content' | 'header-footer' | 'images' | 'products' | 'gallery' | 'settings' | 'inquiries';
