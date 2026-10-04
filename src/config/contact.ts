/**
 * ART MEDICAL - Centralized Contact & WhatsApp Configuration
 * Single source of truth for company details, phone numbers, WhatsApp, and dispatch.
 */

export const ART_MEDICAL_CONFIG = {
  companyName: 'ART Medical',
  legalName: 'ART Medical',
  tagline: 'Comprehensive Embryology & IVF Solutions',
  subTagline: 'Offering Full Solution',
  gstin: '19ACLFA5383R1ZF',

  // PRIMARY WHATSAPP CONFIGURATION (Configurable in one single place)
  whatsappNumber: '919875406943', // Pure digits with country code for wa.me
  whatsappDisplay: '+91 98754 06943',
  whatsappUrlBase: 'https://wa.me/919875406943',

  // Primary & Alternate Phones
  phonePrimary: '+91 98754 06943',
  phoneSecondary: '+91 74396 88406',
  phoneTertiary: '+91 95930 76979',

  // Emails
  primaryEmail: 'artmedical4560@gmail.com',
  leadNotificationEmail: 'onlinewithsudip@gmail.com',

  // Physical Location
  address: '17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104',
  landmark: 'Near kalua aboitonic school',
  city: 'Kolkata',
  state: 'West Bengal',
  pincode: '700104',
  country: 'India',

  workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM (IST) | 24/7 Priority Emergency Support',

  // Banking
  bankDetails: {
    bankName: 'UCO Bank',
    accountName: 'ART Medical',
    accountNumber: '17610210001660',
    ifsc: 'UCBA0001761',
    branch: 'Purna Das Road'
  }
};

/**
 * Builds a direct wa.me link with encoded message for the configured WhatsApp number.
 */
export function buildWhatsAppUrl(message: string, overrideNumber?: string): string {
  const number = (overrideNumber || ART_MEDICAL_CONFIG.whatsappNumber).replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a general website / contact enquiry into a comprehensive WhatsApp message.
 */
export interface GeneralEnquiryPayload {
  name: string;
  clinicName?: string;
  phone: string;
  email?: string;
  country?: string;
  inquiryType: string;
  message?: string;
  productName?: string;
}

export function formatGeneralEnquiryWhatsApp(data: GeneralEnquiryPayload): string {
  const lines: string[] = [
    `🏥 *NEW ENQUIRY — ${ART_MEDICAL_CONFIG.companyName.toUpperCase()}*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name / Contact:* ${data.name || 'Not provided'}`,
  ];

  if (data.clinicName && data.clinicName.trim()) {
    lines.push(`🏢 *Clinic / Center:* ${data.clinicName.trim()}`);
  }

  lines.push(`📞 *Phone / WhatsApp:* ${data.phone || 'Not provided'}`);

  if (data.email && data.email.trim()) {
    lines.push(`✉️ *Email:* ${data.email.trim()}`);
  }

  if (data.country && data.country.trim()) {
    lines.push(`📍 *Location / City:* ${data.country.trim()}`);
  }

  lines.push(`📋 *Enquiry Type:* ${data.inquiryType || 'General Inquiry'}`);

  if (data.productName && data.productName.trim()) {
    lines.push(`🔬 *Product / Item:* ${data.productName.trim()}`);
  }

  if (data.message && data.message.trim()) {
    lines.push(`📝 *Message / Requirements:*`);
    lines.push(data.message.trim());
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Submitted via ${ART_MEDICAL_CONFIG.companyName} Online Portal_`);

  return lines.join('\n');
}

/**
 * Formats a dedicated Senior Embryologist enquiry into a comprehensive WhatsApp message.
 */
export interface EmbryologistEnquiryPayload {
  name: string;
  title?: string;
  clinicName: string;
  location: string;
  phone: string;
  email?: string;
  supportType: string;
  datesNeeded?: string;
  estimatedCases?: string;
  specificRequirements?: string;
}

export function formatEmbryologistEnquiryWhatsApp(data: EmbryologistEnquiryPayload): string {
  const fullName = data.title ? `${data.title} ${data.name}` : data.name;

  const lines: string[] = [
    `⭐ *SERVICE ENQUIRY: Senior Embryologist – Freelance & Backup Support*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Clinician / Director:* ${fullName || 'Not provided'}`,
    `🏥 *Clinic / IVF Center:* ${data.clinicName || 'Not provided'}`,
    `📍 *Location / City:* ${data.location || 'Not provided'}`,
    `📞 *Phone / WhatsApp:* ${data.phone || 'Not provided'}`,
  ];

  if (data.email && data.email.trim()) {
    lines.push(`✉️ *Email:* ${data.email.trim()}`);
  }

  lines.push(`🔬 *Support Requested:* ${data.supportType || 'Senior Embryologist – Freelance & Backup Support'}`);

  if (data.datesNeeded && data.datesNeeded.trim()) {
    lines.push(`📅 *Dates / Timeline:* ${data.datesNeeded.trim()}`);
  }

  if (data.estimatedCases && data.estimatedCases.trim()) {
    lines.push(`📊 *Estimated Cases:* ${data.estimatedCases.trim()}`);
  }

  if (data.specificRequirements && data.specificRequirements.trim()) {
    lines.push(`📝 *Specific Clinical Details:*`);
    lines.push(data.specificRequirements.trim());
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`_Official Embryologist Desk — ${ART_MEDICAL_CONFIG.companyName}_`);

  return lines.join('\n');
}

/**
 * Formats product quotation enquiry WhatsApp message (no price, request quote).
 */
export function formatProductQuoteWhatsApp(
  productName: string,
  make?: string,
  packSize?: string
): string {
  const details = [
    make ? `Make: ${make}` : null,
    packSize ? `Pack: ${packSize}` : null,
  ].filter(Boolean).join(' | ');

  const parenthetical = details ? ` (${details})` : '';

  return (
    `Hello ${ART_MEDICAL_CONFIG.companyName}, I would like to request an official clinical quotation and delivery timeline for:\n\n` +
    `• Product: "${productName}"${parenthetical}\n\n` +
    `Please share availability, batch certification details, and commercial terms.`
  );
}
