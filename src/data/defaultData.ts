import { Product, GalleryItem, WebsiteContent, ThemeSettings, Inquiry } from '../types';
import { artProducts, DEFAULT_EQUIPMENT_CATEGORIES } from './artProducts';

export const heroImg = '/images/assets/fertility_hero_lab_1790663824905.jpg';
export const workstationImg = '/images/assets/product_ivf_workstation_1790663839811.jpg';
export const incubatorImg = '/images/assets/product_benchtop_incubator_1790663852918.jpg';
export const micromanipulatorImg = '/images/assets/product_micromanipulator_1790663865258.jpg';
export const cleanroomImg = '/images/assets/gallery_cleanroom_setup_1790663877901.jpg';
export const mediaVialsImg = '/images/assets/art_media_vials_1790759397048.jpg';
export const catheterImg = '/images/assets/art_catheters_cannula_1790759417050.jpg';
export const labwareImg = '/images/assets/art_petri_labware_1790759431806.jpg';
export const cryoImg = '/images/assets/art_cryo_devices_1790759458406.jpg';
export const registerImg = '/images/assets/art_clinic_registers_1790759495328.jpg';

export { DEFAULT_EQUIPMENT_CATEGORIES };

export const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#0284c7', // Medical Azure / Cyan
  ctaColor: '#0d9488',     // High-contrast Clinical Teal
  ctaTextColor: '#ffffff',
  logoType: 'image',
  logoUrl: '/logo.svg',
  logoIcon: 'Activity',
  customIconUrl: '',
  logoText: 'ART Solution',
  logoTagline: 'Offering Full Solution',
  logoHeight: 48,
  leadNotificationEmail: 'onlinewithsudip@gmail.com',
  ccNotificationEmail: '',
  enableEmailAlerts: true,
  adminEmail: 'onlinewithsudip@gmail.com',
  adminPassword: 'admin123',
  heroBgStyle: 'sapphire-teal'
};

export const defaultWebsiteContent: WebsiteContent = {
  header: {
    topRibbonKicker: 'GSTIN: 19ACLFA5383R1ZF',
    topRibbonSubtitle: 'Offering Full Solution — IVF Labs, Media & Clinical Disposables',
    topRibbonPhone: '+91 98754 06943',
    ctaButtonText: 'Request Quotation (₹)',
  },
  hero: {
    kicker: 'Complete Assisted Reproductive Technology Solutions',
    title: 'Precision IVF Equipment, Clinical Media & Disposables',
    subtitle: 'From world-class embryology workstations and multi-chamber incubators to genuine culture media, catheters, vitrification kits, and laboratory disposables — offering full end-to-end solutions for reproductive centers.',
    primaryCtaText: 'Browse Product Catalog',
    secondaryCtaText: 'Contact Specialist on WhatsApp',
    highlightBadge: 'Offering Full Solution | GST Registered & Validated',
    stats: [
      { label: 'Clinical Products', value: '147 Items', detail: 'Authentic media, kits & devices' },
      { label: 'Delivery Turnaround', value: 'Within 24h', detail: 'Rapid dispatch protocol' },
      { label: 'Direct Helpline', value: '+91 98754 06943', detail: 'Kolkata & Pan-India support' },
      { label: 'GST Certified', value: '19ACLFA5383R1ZF', detail: '100% Tax compliant billing' }
    ],
    heroImage: heroImg,
  },
  about: {
    title: 'Empowering Reproductive Medicine, Offering Full Solution',
    subtitle: 'ART MEDICAL is your premier partner for assisted reproduction technologies, high-yield culture media, disposables, precision equipment, and turnkey laboratory installations.',
    storyParagraph1: 'ART MEDICAL operates with a clear mandate: offering full, dependable solutions for IVF laboratories, clinical embryologists, and reproductive medicine centers. We supply certified culture media, sperm washing formulations, vitrification systems, micropipettes, and laboratory plasticware from globally recognized manufacturers including Fertipro, Origio, Wallace, Allwin Medical, Falcon, Cryotech, and more.',
    storyParagraph2: 'Headquartered at 17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104 (Near kalua aboitonic school), we provide end-to-end equipment supply, maintenance, clinical registers, and priority delivery within 24 hours of order placement. Every product adheres to rigorous quality control standards, ensuring zero environmental variability and optimal embryology outcomes.',
    mission: 'To provide comprehensive, reliable, and cost-effective reproductive technology solutions that empower fertility clinics and embryologists to achieve peak clinical pregnancy rates.',
    vision: 'To be the most trusted distributor and turnkey infrastructure partner in assisted reproductive technology across India, renowned for product authenticity and rapid support.',
    values: [
      {
        title: 'Authenticity & Batch Testing',
        desc: 'All media, catheters, and disposables are sourced from authorized manufacturers with sterility certificates and MEA validation.'
      },
      {
        title: 'Rapid 24-Hour Dispatch',
        desc: 'Immediate dispatch within 24 hours of order placement, with expedited courier handling for temperature-sensitive media.'
      },
      {
        title: 'Full Turnkey Commitment',
        desc: 'Complete technical backing from lab equipment specification and registers to consumable replenishment and AMC support.'
      },
      {
        title: 'Transparent Commercials',
        desc: 'Direct customer supply rates in ₹ with transparent GST billing and prompt payment credit incentives.'
      }
    ],
    certifications: [
      'GSTIN: 19ACLFA5383R1ZF Registered Commercial Entity',
      'Authorized Distributor for Leading International & Indian Brands',
      'MEA Tested & Endotoxin Screened Clinical Formulations',
      'Temperature-Controlled Cold Chain Logistics Compliance'
    ],
    aboutImage: cleanroomImg,
  },
  contact: {
    companyName: 'ART MEDICAL',
    address: '17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104',
    landmark: 'Near kalua aboitonic school',
    phone1: '+91 98754 06943',
    phone2: '+91 74396 88406',
    phone3: '+91 95930 76979',
    email: 'artmedical4560@gmail.com',
    whatsapp: '+91 98754 06943',
    whatsappLink: 'https://wa.me/919875406943',
    whatsappMessage: 'Hello ART MEDICAL, I would like to inquire about your IVF laboratory products, media, and quotation estimates.',
    workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM (IST) | 24/7 Priority Emergency Support',
    supportEmail: 'artmedical4560@gmail.com',
    googleMapsUrl: 'https://maps.google.com'
  },
  footer: {
    tagline: 'Offering Full Solution — High-Precision IVF Equipment, Culture Media, Disposables, and Turnkey Lab Infrastructure.',
    certificationBadge: 'GSTIN: 19ACLFA5383R1ZF | UCO Bank Verified Partner',
    copyrightText: '© 2026 ART MEDICAL. All rights reserved. 17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104.',
    disclaimer: 'All prices quoted are in Indian Rupees (₹), exclusive of taxes. Products displayed are intended for clinical assisted reproductive medicine facilities and accredited healthcare practitioners.',
    linkedinUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
  }
};

export const defaultCommercialTerms = {
  terms: [
    'All prices mentioned are in Indian Rupees (₹), exclusive of all taxes & will be charged extra as applicable.',
    'Outside Kolkata forwarding charges will be charged extra on actual basis.',
    'Delivery within 24 hours of order placement (subject to stock availability).',
    'Payment within 21 days after delivery. A 1% discount will be given as credit note of GST exclusive order value if payment is made within 7 days of delivery of order.',
    'Commercial validity: FY 25-26 (Valid until 31st March 2026).'
  ],
  bankDetails: {
    bankName: 'UCO Bank',
    accountName: 'ART Medical',
    accountNumber: '17610210001660',
    ifsc: 'UCBA0001761',
    branch: 'Purna Das Road'
  },
  offices: {
    registeredOffice: '17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104 (Landmark: Near kalua aboitonic school)',
    operationalOffice: '17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104 (Landmark: Near kalua aboitonic school)',
    companyName: 'ART MEDICAL',
    landmark: 'Near kalua aboitonic school',
    primaryPhone: '+91 98754 06943',
    otherPhones: ['+91 98754 06943', '+91 74396 88406', '+91 95930 76979'],
    email: 'artmedical4560@gmail.com'
  }
};

export const defaultProducts: Product[] = artProducts;

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'gal-cleanroom-modular',
    title: 'Turnkey ISO Class 5 Modular Embryology Cleanroom Suite',
    category: 'Turnkey Cleanrooms',
    image: cleanroomImg,
    description: 'Complete modular cleanroom architecture engineered to ISO Class 5 / Class 1000 standards. Featuring ceiling-mounted HEPA H14 fan-filter units, positive air pressure cascade (+15 Pa), VOC chemical scrubbers, antibacterial wall panels, and static-dissipative seamless vinyl flooring.',
    date: '2026',
    badge: 'ISO Class 5 / Turnkey Engineering',
    specs: ['HEPA H14 Terminal Filtration', 'Positive Pressure (+15 Pa)', 'Active VOC / Carbon Scrubbers', 'Zero-VOC Clean Seal System'],
    location: 'Embryology Cleanroom Suite'
  },
  {
    id: 'gal-laminar-workstation',
    title: 'Dual-Operator Laminar Airflow IVF Workstation Installation',
    category: 'Embryology Equipment',
    image: workstationImg,
    description: 'Custom-configured Class II dual-operator IVF workstations with integrated precision-heated glass stages, dual stereomicroscopes, ambient LED light attenuation, and independent digital temperature controllers calibrated for gamete manipulation.',
    date: '2026',
    badge: 'Class II / Dual Station',
    specs: ['Dual Heated Glass Inset Stages', 'Vertical Laminar Air Velocity 0.45 m/s', 'Vibration-Free Heavy Table Frame', 'Integrated Heated Pass-Through Hatch'],
    location: 'Clinical Embryology Lab'
  },
  {
    id: 'gal-multichamber-incubator',
    title: 'Multi-Chamber Tri-Gas Incubator Bank (5% O2 Hypoxic Culture)',
    category: 'Embryology Equipment',
    image: incubatorImg,
    description: 'High-capacity benchtop incubation bank utilizing multi-chamber tri-gas incubators. Designed for individual patient culture security, rapid CO2/O2 recovery within 2 minutes, and precise 5% O2 physiological hypoxic incubation to achieve optimal blastocyst development.',
    date: '2026',
    badge: 'Tri-Gas Hypoxic System',
    specs: ['6 Independent Patient Chambers', 'Tri-Gas Control: 5% O2, 6% CO2, N2', '<2 min Parameter Recovery', 'Real-Time Temperature & Gas Alarming'],
    location: 'Culture & Incubation Zone'
  },
  {
    id: 'gal-icsi-micromanipulator',
    title: 'ICSI & Laser-Assisted Trophectoderm Biopsy Station',
    category: 'Embryology Equipment',
    image: micromanipulatorImg,
    description: 'Precision intracytoplasmic sperm injection (ICSI) station mounted on a heavyweight active granite vibration-isolation platform. Equipped with 3-axis hydraulic micro-positioners, thermal heated glass stage, high-resolution inverted optics, and laser optical collimation for PGT trophectoderm biopsy.',
    date: '2026',
    badge: 'Sub-Micron Precision Rig',
    specs: ['Active Granite Anti-Vibration Base', 'Hydraulic Smooth-Action Joysticks', 'Calibrated PGT Biopsy Laser Module', 'Integrated Embryo Heating Stage'],
    location: 'Micromanipulation Suite'
  },
  {
    id: 'gal-cold-chain-media',
    title: '2°C–8°C Validated Media Cold-Chain Logistics Hub',
    category: 'Media & Cold Chain',
    image: '/images/products/media_vials_fertipro.jpg',
    description: 'Dedicated temperature-controlled cold-chain packaging facility at Thakurpukur, Kolkata. Every media shipment (Fertipro, Nidacon, Origio, Hitech) is dispatched in certified vacuum-insulated shippers with electronic data loggers ensuring continuous 2°C–8°C temperature preservation during 24-hour delivery.',
    date: '2026',
    badge: '2°C–8°C Monitored Protocol',
    specs: ['Certified Thermal Shipper Containers', 'Continuous USB Temp-Data Loggers', 'Same-Day Dispatch Guarantee', 'Strict Batch Sterility & MEA Testing'],
    location: 'Thakurpukur, Kolkata Hub'
  },
  {
    id: 'gal-media-warehouse',
    title: 'Ready Stock Culture Media, Gradients & Flushing Buffer Bank',
    category: 'Media & Cold Chain',
    image: '/images/products/media_culture_liquid.jpg',
    description: 'Extensive temperature-monitored inventory of authentic IVF culture media, sperm washing formulations, HTF with Gentamicin, density gradients (45/90, Sil-Select, PureSperm), and recombinant enzymes available with commercial rates valid for FY 25-26.',
    date: '2026',
    badge: '147+ Verified Catalog Items',
    specs: ['Hitech, Fertipro & Origio Stocks', 'Sterility & Endotoxin Certificates', 'Direct Customer Supply Rates in ₹', 'Batch Expiry Monitoring Protocol'],
    location: 'Central Consumables Inventory'
  },
  {
    id: 'gal-catheters-needles',
    title: 'Wallace & Allwin Embryo Transfer & OPU Needle Sterile Bank',
    category: 'Disposables & Catheters',
    image: '/images/products/catheter_embryo_transfer.jpg',
    description: 'Authentic sterile clinical inventory of Wallace ONS single lumen aspiration needles, DNS double lumen flushing needles, Surelife curved IUI catheters, and Allwin Medical soft-tip echogenic embryo transfer catheters trusted by senior reproductive clinicians across India.',
    date: '2026',
    badge: 'USFDA / CE Class IIa',
    specs: ['Wallace ONS 1733 / 1633 Needles', 'Allwin Echogenic Embryo Transfer Sets', 'Surelife Curved & Flexible IUI Cannulas', '100% MEA Batch Tested'],
    location: 'Surgical & Catheter Sterile Staging'
  },
  {
    id: 'gal-falcon-labware',
    title: 'Falcon & Corning Disposables & Embryo Culture Labware Hub',
    category: 'Disposables & Catheters',
    image: '/images/products/falcon_dish_culture.jpg',
    description: 'Comprehensive inventory of Falcon 3001 (35mm), Falcon 3002 (60mm), Falcon 3037 (4-well), and Falcon 3004 (organ center-well) IVF dishes, along with conical 15ml and 50ml centrifuge tubes, serological pipettes, and non-toxic cryovials.',
    date: '2026',
    badge: 'Falcon Authenticity Guaranteed',
    specs: ['Falcon 3001, 3002, 3004, 3037 Ready Stock', 'Certified Non-Embryotoxic Plasticware', 'Pack Sizes: 20s, 100s, 500s', 'Transparent FY 25-26 Supply Rates'],
    location: 'Labware Warehousing & Dispatch'
  },
  {
    id: 'gal-cryo-cryobank',
    title: 'Cryotech Vitrification Media & Cryo Straw Cryobank Setup',
    category: 'Cryopreservation',
    image: '/images/products/vitrification_kit_straw.jpg',
    description: 'High-survival vitrification kits and cryobank equipment featuring genuine Cryotech freezing/warming media (101, 102, 110, 205), Reproplates, Vitrifit carriers, and liquid nitrogen storage dewars with color-coded aluminum canes and protective visotubes.',
    date: '2026',
    badge: '>98% Post-Thaw Survival',
    specs: ['Cryotech Vitrification Kits', 'Cryovials with Silicone Gasket Sealing', 'Liquid Nitrogen Canes & Color Goblets', 'Vapor-Phase Cryo Storage Vessels'],
    location: 'Cryobiology & Vitrification Suite'
  },
  {
    id: 'gal-clinical-registers',
    title: 'Mandatory National ART Regulatory Clinical Record Registers',
    category: 'Clinical Registers',
    image: '/images/products/registers_clinical_docs.jpg',
    description: 'Official 50-page hardbound clinical logbooks and registers specifically printed and bound to satisfy National Assisted Reproductive Technology & Surrogacy Regulatory Board requirements. Includes IVF/ICSI Treatment registers, embryology culture sheets, and liquid nitrogen tank inventory logs.',
    date: '2026',
    badge: 'Regulatory Mandatory Format',
    specs: ['50 Ledger-Sized Compliance Pages', 'IVF & ICSI Cycle Record Logbook', 'Embryo Freezing & Storage Register', 'Semen Analysis & IUI Patient Book'],
    location: 'Clinical Documentation Division'
  },
  {
    id: 'gal-kolkata-dispatch',
    title: '24-Hour Rapid Dispatch & Order Staging Center',
    category: 'Operations & Dispatch',
    image: '/images/products/workstation_laminar_hood.jpg',
    description: 'Operational order packing and cold-chain staging facility located at 17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104 (Near kalua aboitonic school). Designed for rapid order processing within 24 hours of placement, complete with UCO Bank commercial invoicing, GST tax compliance (19ACLFA5383R1ZF), and transit insurance.',
    date: '2026',
    badge: '24-Hour SLA / Pan-India Logistics',
    specs: ['Thakurpukur Kolkata Hub', 'GST Invoice & Bank Payment Portal', 'Immediate Courier Staging', '21-Day Credit & 1% Discount Policy'],
    location: 'Thakurpukur, Kolkata - 700104'
  },
  {
    id: 'gal-clinic-turnkey',
    title: 'Full Turnkey Reproductive Medicine Center Infrastructure',
    category: 'Turnkey Cleanrooms',
    image: heroImg,
    description: 'Full turnkey facility engineering by ART MEDICAL — covering architectural floor planning, gas pipeline manifolds (CO2/N2/Air), positive pressure airlocks, equipment procurement, cleanroom validation, clinical register provisioning, and initial batch media stocking.',
    date: '2026',
    badge: 'End-to-End Turnkey Delivery',
    specs: ['Concept-to-Commissioning Execution', 'Cleanroom Air Balancing & HEPA Validation', 'Comprehensive AMC & Technical Support', 'Offering Full Solution Guarantee'],
    location: 'Turnkey Fertility Center Projects'
  }
];

export const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    date: '2026-09-29',
    timestamp: '2026-09-29 11:20:00',
    name: 'Dr. Debabrata Roy',
    clinicName: 'Genesis Fertility & IVF Center',
    email: 'dr.droy@genesisfertility.in',
    phone: '+91 98301 44552',
    country: 'India (Kolkata)',
    inquiryType: 'Consumables Supply',
    message: 'Require 20 sets of IUI Media Set Glass Vial (Hitech) and 10 packs of Wallace ONS 1733 Single Lumen needles. Please send commercial invoice.',
    status: 'new',
    emailSentTo: 'onlinewithsudip@gmail.com',
    emailSentAt: '2026-09-29 11:20:05',
    emailDeliveryStatus: 'delivered'
  },
  {
    id: 'inq-2',
    date: '2026-09-28',
    timestamp: '2026-09-28 15:45:00',
    name: 'Dr. Ananya Sen',
    clinicName: 'Care Reproductive Healthcare',
    email: 'ananya.sen@careivf.com',
    phone: '+91 98312 99881',
    country: 'India (West Bengal)',
    inquiryType: 'Consumables Supply',
    message: 'Please send quotation for Fertipro USFDA Approved IUI Media Sets and Cryotech vitrification kits with delivery schedule.',
    productId: 'prod-iui-media-set-5-ml-htf-1-ml-upper-layer-1-ml-lower-layer-usfda-approved',
    productName: 'IUI Media Set (5 ml HTF + 1 ml Upper Layer + 1 ml Lower Layer) ( USFDA Approved )',
    status: 'contacted',
    emailSentTo: 'onlinewithsudip@gmail.com',
    emailSentAt: '2026-09-28 15:45:10',
    emailDeliveryStatus: 'delivered'
  }
];
