import { Product, GalleryItem, WebsiteContent, ThemeSettings, Inquiry } from '../types';

import heroImg from '../assets/images/fertility_hero_lab_1790663824905.jpg';
import workstationImg from '../assets/images/product_ivf_workstation_1790663839811.jpg';
import incubatorImg from '../assets/images/product_benchtop_incubator_1790663852918.jpg';
import micromanipulatorImg from '../assets/images/product_micromanipulator_1790663865258.jpg';
import cleanroomImg from '../assets/images/gallery_cleanroom_setup_1790663877901.jpg';

export { heroImg, workstationImg, incubatorImg, micromanipulatorImg, cleanroomImg };

export const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#0d9488', // Medical Teal
  ctaColor: '#0284c7',     // High-contrast Medical Cobalt / Cyan
  ctaTextColor: '#ffffff',
  logoType: 'both',
  logoUrl: '',
  logoText: 'A to Z Fertility',
  logoTagline: 'Complete Turnkey Solutions',
  logoHeight: 42,
  leadNotificationEmail: 'leads@atozfertilitysolutions.com',
  ccNotificationEmail: 'director@atozfertilitysolutions.com',
  enableEmailAlerts: true,
};

export const defaultWebsiteContent: WebsiteContent = {
  hero: {
    kicker: 'Pioneering Assisted Reproductive Technologies',
    title: 'Precision IVF Equipment & Complete Turnkey Fertility Labs',
    subtitle: 'From world-class embryology workstations and benchtop tri-gas incubators to certified cleanroom infrastructure — empowering reproductive specialists with reliable, high-yield technology.',
    primaryCtaText: 'Explore Product Catalog',
    secondaryCtaText: 'Consult Turnkey Specialist',
    highlightBadge: 'ISO 13485:2016 & CE Mark Certified Solutions',
    stats: [
      { label: 'Turnkey Labs Built', value: '140+', detail: 'Across 18 countries' },
      { label: 'Equipment Uptime', value: '99.8%', detail: 'Clinical reliability rate' },
      { label: 'Clinical Specialists', value: '35+', detail: 'Embryologists & Bio-Engineers' },
      { label: 'Response Time', value: '< 2 hrs', detail: 'Priority service dispatch' }
    ]
  },
  about: {
    title: 'Empowering Embryologists, Advancing Life',
    subtitle: 'A to Z Fertility Solutions delivers state-of-the-art laboratory infrastructure, precision incubation systems, and consumable supply chains engineered for optimum embryo viability.',
    storyParagraph1: 'Founded by senior clinical embryologists and biomedical engineers, A to Z Fertility Solutions was built with a singular mission: to eliminate technical variability in reproductive medicine. We understand that in IVF, every fraction of a degree, every pascal of cleanroom pressure, and every micromillimeter of manipulator precision directly dictates patient outcomes.',
    storyParagraph2: 'Today, we partner with leading fertility clinics, private hospitals, and university research institutes across the globe. Our end-to-end turnkey methodology spans cleanroom architecture, gas manifold validation, micro-manipulation workstation delivery, and lifetime equipment calibration.',
    mission: 'To equip assisted reproductive medicine centers with uncompromised engineering precision, elevating clinical pregnancy success rates through consistent laboratory stability.',
    vision: 'To be the most trusted global partner in reproductive healthcare infrastructure, pioneering accessible, high-yield laboratory technologies for clinicians worldwide.',
    values: [
      {
        title: 'Zero-Tolerance Precision',
        desc: 'Sub-decimal thermal regulation, VOC-zero filtration, and vibrational dampening certified in every installed unit.'
      },
      {
        title: 'Turnkey Accountability',
        desc: 'A single point of engineering responsibility from architectural blueprints to embryology mock-trials.'
      },
      {
        title: 'Rapid Response Protocol',
        desc: 'On-call biomedical engineers and immediate loaner units to guarantee zero laboratory downtime.'
      },
      {
        title: 'Global Compliance',
        desc: 'Fully aligned with ESHRE, ASRM, ISO 14644 cleanroom classes, and international medical device directives.'
      }
    ],
    certifications: [
      'ISO 13485:2016 Medical Devices Quality Management',
      'CE Marking for Clinical Laboratory Systems',
      'ISO 14644 Class 5 (Class 100) Cleanroom Compliance',
      'Good Manufacturing Practice (GMP) Facility Validation'
    ]
  },
  contact: {
    companyName: 'A to Z Fertility Solutions Ltd.',
    address: 'Healthcare Innovation Hub, Suite 400, Medical Technology Park, New Delhi, India 110020',
    phone1: '+91 98712 34567',
    phone2: '+91 11 4567 8900',
    email: 'info@atozfertilitysolutions.com',
    whatsapp: '919871234567',
    workingHours: 'Monday – Saturday: 9:00 AM – 6:30 PM (IST) | 24/7 Emergency Support',
    supportEmail: 'service@atozfertilitysolutions.com',
    googleMapsUrl: 'https://maps.google.com'
  },
  footer: {
    tagline: 'Precision IVF laboratory design, medical devices, and turnkey embryology solutions.',
    copyrightText: '© 2026 A to Z Fertility Solutions. All rights reserved.',
    disclaimer: 'Products displayed are intended for certified clinical reproductive medicine facilities and accredited embryology professionals.'
  }
};

export const defaultProducts: Product[] = [
  {
    id: 'prod-ivf-workstation-aura',
    name: 'AuraFlow Prime Laminar IVF Workstation',
    category: 'IVF Workstations',
    modelNumber: 'AF-2000-DUO',
    shortDesc: 'Dual-operator Class II laminar flow workstation with integrated heated glass stages and stereomicroscope ports.',
    fullDesc: 'The AuraFlow Prime Workstation provides an ultra-clean ISO Class 5 laminar air environment explicitly calibrated for oocyte retrieval, denudation, and embryo handling. Featuring dual independent thermal zones (PID controlled to ±0.1°C), vibration-isolated microscope platforms, and dimmable halogen-free LED illumination.',
    price: '$12,500 – $18,200',
    priceType: 'range',
    inStock: true,
    isFeatured: true,
    image: workstationImg,
    features: [
      'Dual independent temperature-regulated work zones with heated glass inserts',
      'Built-in anti-vibration table mechanism for high-magnification stereomicroscopy',
      'Ultra-quiet DC ECM motor with HEPA/ULPA filtration (>99.999% efficiency at 0.12 μm)',
      'Multi-stage VOC carbon gas filtration safeguarding sensitive gametes',
      'Stainless steel 316 grade seamless worktable with rounded antimicrobial corners'
    ],
    specs: [
      { key: 'Airflow Velocity', value: '0.35 m/s to 0.45 m/s uniform vertical flow' },
      { key: 'Temperature Stability', value: '±0.1°C across heated stage surface' },
      { key: 'Noise Level', value: '< 51 dBA at operator position' },
      { key: 'Filtration', value: 'ULPA U15 filter + Pre-filter + VOC activated carbon' },
      { key: 'Dimensions (W x D x H)', value: '1800 x 780 x 1400 mm' },
      { key: 'Electrical Input', value: '220-240V, 50/60Hz, 450W' }
    ],
    brochureAvailable: true
  },
  {
    id: 'prod-benchtop-incubator-omni',
    name: 'OmniCell Multi-Chamber Tri-Gas Incubator',
    category: 'Incubators & Warming',
    modelNumber: 'OC-6X-PRO',
    shortDesc: 'Six independent incubation chambers with individual heated lids and sub-3-minute gas recovery.',
    fullDesc: 'Designed to replicate the physiological in-vivo environment, the OmniCell 6X incorporates individual sealed incubation chambers preventing cross-chamber environmental loss. High-speed infrared CO2 and ultrasonic O2 sensors ensure optimal pH maintenance and physiological hypoxia (5% O2) culture protocols.',
    price: '$19,800',
    priceType: 'fixed',
    inStock: true,
    isFeatured: true,
    image: incubatorImg,
    features: [
      '6 completely separate chambers with individual thermal and gas supply manifolds',
      'Rapid gas recovery: CO2 < 2 minutes, O2 < 3 minutes after 15-second opening',
      'Direct contact bottom heating and heated lids preventing droplet condensation',
      'Ethernet logging with real-time temperature/gas telemetry and SMS/Email alarms',
      'Integrated medical-grade gas pre-heating and inline HEPA filtration'
    ],
    specs: [
      { key: 'Chamber Capacity', value: '6 independent culture chambers (up to 24 dishes)' },
      { key: 'CO2 Range & Control', value: '2.0% – 10.0% (±0.1% dual IR sensor)' },
      { key: 'O2 Range & Control', value: '2.0% – 20.0% (±0.2% ultrasonic sensor)' },
      { key: 'Temp Control Range', value: 'Ambient +5°C to 45°C (±0.1°C stability)' },
      { key: 'Gas Connections', value: 'Premixed or separate Pure CO2 + N2 inputs' },
      { key: 'Data Logging', value: 'Internal 90-day memory + USB/Ethernet output' }
    ],
    brochureAvailable: true
  },
  {
    id: 'prod-micromanipulator-icsi',
    name: 'PrecisionICSI Hydraulic Micromanipulator System',
    category: 'Micromanipulation & Laser',
    modelNumber: 'PXI-880',
    shortDesc: 'Smooth 3D hydraulic micromanipulator system with sub-micron drift-free movement for ICSI and biopsy.',
    fullDesc: 'The PrecisionICSI System provides embryologists with tactile, drift-free movement required for intracytoplasmic sperm injection (ICSI) and trophectoderm biopsy. Mountable on all standard inverted research microscopes (Olympus, Nikon, Leica, Zeiss), it combines hydraulic sensitivity with mechanical rigidity.',
    price: '$14,200',
    priceType: 'fixed',
    inStock: true,
    isFeatured: true,
    image: micromanipulatorImg,
    features: [
      'Zero-drift hydraulic micro-drive mechanism with sub-micron movement step',
      'Universal mounting adapters compatible with inverted microscope brands',
      'Integrated tool holders for holding pipettes and injection needles with angular adjust',
      'Ergonomic coarse-fine joystick controls positioned for low hand fatigue',
      'Integrated pneumatic micro-injectors with oil or air displacement modes'
    ],
    specs: [
      { key: 'Maximum Travel (X-Y-Z)', value: '30 mm coarse / 10 mm fine hydraulic travel' },
      { key: 'Resolution / Drift', value: '< 0.5 μm step / < 1 μm drift per hour' },
      { key: 'Tool Angle Adjustment', value: '0° to 45° continuous clamp' },
      { key: 'Operating Medium', value: 'Degassed hydraulic silicone oil' },
      { key: 'Total Weight', value: '6.4 kg (Left + Right assemblies)' }
    ],
    brochureAvailable: true
  },
  {
    id: 'prod-cleanroom-turnkey',
    name: 'Turnkey Modular IVF Cleanroom Infrastructure',
    category: 'Turnkey Lab Setup',
    modelNumber: 'TK-MODULAR-50',
    shortDesc: 'Complete modular ISO Class 5 cleanroom panels, VOC air scrubbing, positive pressure cascades, and pass-boxes.',
    fullDesc: 'Our turnkey cleanroom solutions transform clinical spaces into validated reproductive embryology laboratories. We handle architectural layout, anti-static antibacterial partition panels, ceiling HEPA/ULPA grid distribution, continuous positive pressure cascades, pass-through interlocks, and full cleanroom certification.',
    price: 'Custom Project Quote',
    priceType: 'inquire',
    inStock: true,
    isFeatured: true,
    image: cleanroomImg,
    features: [
      'Modular 50mm cleanroom panels with antibacterial PVDF finish and coved joints',
      'HVAC system engineered for VOC elimination and positive differential pressure',
      'Stainless steel 304 dynamic pass-boxes with UV sterilization and interlocks',
      'Integrated medical gas pipelines (CO2, N2, Medical Air) with auto-switchover manifolds',
      'Full validation protocols including particle count and airflow velocity testing'
    ],
    specs: [
      { key: 'Cleanliness Class', value: 'ISO 14644-1 Class 5 (Workstations) / Class 7 (Background Lab)' },
      { key: 'Air Changes / Hour', value: '35 to 55 ACH continuous circulation' },
      { key: 'Differential Pressure', value: '+15 to +25 Pa positive cascade' },
      { key: 'Filtration Efficiency', value: 'Pre-filters (90%) + Intermediate (95%) + Terminal HEPA (99.99%)' },
      { key: 'VOC Scrubbing', value: 'Chemical absorption activated charcoal & KMnO4 bed' }
    ],
    brochureAvailable: true
  },
  {
    id: 'prod-cryosafe-storage',
    name: 'CryoSafe Liquid Nitrogen Bio-Storage Tank',
    category: 'Cryopreservation',
    modelNumber: 'CS-LN2-80K',
    shortDesc: 'Vacuum-insulated cryogenic liquid nitrogen dewar with auto-fill manifold and wireless level telemetry.',
    fullDesc: 'Engineered for secure long-term cryopreservation of oocytes, sperm, and vitrified blastocysts. Super-insulated multi-layer vacuum design delivers industry-leading static evaporation rates, backed by continuous liquid nitrogen level monitoring and dual redundant temperature probes.',
    price: '$7,400 – $9,800',
    priceType: 'range',
    inStock: true,
    isFeatured: false,
    image: incubatorImg,
    features: [
      'High-efficiency super-insulation keeping static evaporation below 0.85 L/day',
      'Liquid level sensor with audible, visual, and remote cloud telemetry alarms',
      'Durable lockable lid preventing unauthorized access to bio-samples',
      'Compatible with standard goblets, visotubes, and cryo-canes',
      'Sturdy roller base with dual-wheel locking castors for effortless lab transit'
    ],
    specs: [
      { key: 'Capacity', value: '80 Liters (up to 4,800 straws or 2,400 cryovials)' },
      { key: 'Static Holding Time', value: '94 days static storage' },
      { key: 'Neck Diameter', value: '127 mm wide opening' },
      { key: 'Dimensions', value: 'Outer Ø 500 mm x Height 950 mm' },
      { key: 'Alarm Interface', value: 'Dry contact relay + RS485 + Audio Buzzer' }
    ],
    brochureAvailable: true
  },
  {
    id: 'prod-dish-consumables',
    name: 'VitriPlate Certified IVF Culture Dishes & Labware',
    category: 'Consumables & Labware',
    modelNumber: 'VP-DISH-SET',
    shortDesc: 'Sterile medical-grade polystyrene embryo culture dishes, MEA and LAL tested with lot certifications.',
    fullDesc: 'VitriPlate culture dishes and denudation pipettes undergo rigorous batch screening to guarantee gamete safety. Every batch is certified with Mouse Embryo Assay (MEA > 80% blastocyst development at 96h) and Limulus Amebocyte Lysate (LAL endotoxin < 0.05 EU/ml).',
    price: '$340 / Box (50 pcs)',
    priceType: 'fixed',
    inStock: true,
    isFeatured: false,
    image: workstationImg,
    features: [
      'Certified MEA tested > 80% blastocyst rate & LAL endotoxin < 0.05 EU/ml',
      'USP Class VI medical-grade non-embryotoxic crystal clear polystyrene',
      'Individually peel-wrapped in medical sterile blister pouches',
      'Deep wells optimized for oil overlay without micro-droplet coalescence',
      'Lot-specific certificate of analysis (CoA) downloadable for every box'
    ],
    specs: [
      { key: 'Sterilization', value: 'Gamma irradiation (SAL 10^-6)' },
      { key: 'Configurations', value: 'Center-well, 4-well, GPS micro-well, ICSI holding dish' },
      { key: 'Shelf Life', value: '3 Years from manufacture' },
      { key: 'Packaging', value: '50 units per cleanroom sealed inner pack' }
    ],
    brochureAvailable: true
  }
];

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Turnkey IVF Cleanroom Suite',
    category: 'Clinic Setup',
    image: cleanroomImg,
    description: 'Complete ISO Class 5 cleanroom installation featuring modular antibacterial wall panels and positive pressure cascades.',
    date: '2026'
  },
  {
    id: 'gal-2',
    title: 'Dual Embryology Workstation Center',
    category: 'IVF Labs',
    image: workstationImg,
    description: 'AuraFlow dual heated stage workstations configured with stereomicroscopes for oocyte pickup and denudation.',
    date: '2026'
  },
  {
    id: 'gal-3',
    title: 'Multi-Chamber Tri-Gas Incubator Bank',
    category: 'Equipment',
    image: incubatorImg,
    description: 'Bank of 6-chamber OmniCell tri-gas incubators operating under 5% O2 hypoxic culture conditions.',
    date: '2026'
  },
  {
    id: 'gal-4',
    title: 'ICSI & Trophectoderm Biopsy Station',
    category: 'Equipment',
    image: micromanipulatorImg,
    description: 'Precision hydraulic micromanipulator rig calibrated for single-sperm injection and PGT biopsy.',
    date: '2026'
  },
  {
    id: 'gal-5',
    title: 'State-of-the-Art IVF Laboratory Facility',
    category: 'IVF Labs',
    image: heroImg,
    description: 'Comprehensive embryology suite setup for high-throughput clinical reproductive operations.',
    date: '2026'
  },
  {
    id: 'gal-6',
    title: 'Hands-on Clinical Embryology Workshop',
    category: 'Trainings & Workshops',
    image: workstationImg,
    description: 'Biomedical engineers conducting calibration and protocol training for embryologists and lab directors.',
    date: '2026'
  }
];

export const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    date: '2026-09-28',
    timestamp: '2026-09-28 14:32:00',
    name: 'Dr. Priya Sharma',
    clinicName: 'Bliss Fertility & Reproductive Hospital',
    email: 'drpriya@blissfertility.org',
    phone: '+91 98111 22334',
    country: 'India',
    inquiryType: 'Turnkey Lab Setup',
    message: 'We are expanding our center with a new 800 sq ft embryology cleanroom and require quotation for 2 workstations and 3 tri-gas incubators.',
    status: 'new',
    emailSentTo: 'leads@atozfertilitysolutions.com',
    emailSentAt: '2026-09-28 14:32:05',
    emailDeliveryStatus: 'delivered'
  },
  {
    id: 'inq-2',
    date: '2026-09-27',
    timestamp: '2026-09-27 10:15:00',
    name: 'Dr. Marcus Vance',
    clinicName: 'Apex Reproductive Medicine Center',
    email: 'm.vance@apexivf.com',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    inquiryType: 'Equipment Purchase',
    message: 'Interested in the PrecisionICSI Hydraulic Micromanipulator and OmniCell 6X incubator. Please send technical datasheets and delivery schedule.',
    productId: 'prod-micromanipulator-icsi',
    productName: 'PrecisionICSI Hydraulic Micromanipulator System',
    status: 'contacted',
    emailSentTo: 'leads@atozfertilitysolutions.com',
    emailSentAt: '2026-09-27 10:15:10',
    emailDeliveryStatus: 'delivered'
  }
];
