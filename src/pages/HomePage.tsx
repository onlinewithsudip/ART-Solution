import React, { useState, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { Product } from '../types';
import { ServicesSection } from '../components/ServicesSection';
import { resolveProductImage } from '../utils/productImages';
import { formatProductQuoteWhatsApp, ART_MEDICAL_CONFIG } from '../config/contact';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Cpu,
  Layers,
  Sparkles,
  Gauge,
  Thermometer,
  Wrench,
  Award,
  FlaskConical,
  Syringe,
  Boxes,
  Snowflake,
  BookOpen,
  Building2,
} from 'lucide-react';

const heroLabImg = '/images/assets/fertility_hero_lab_1790663824905.jpg';

export const HomePage: React.FC = () => {
  const {
    websiteContent,
    themeSettings,
    products,
    setPage,
    viewProduct,
    setProductCategoryFilter,
    openWhatsApp,
  } = useSite();

  const [homeProductFilter, setHomeProductFilter] = useState<string>('All');

  const homeDisplayProducts: Product[] = useMemo(() => {
    // If filter is specific category, return matching products
    if (homeProductFilter !== 'All') {
      return products.filter((p) => p.category === homeProductFilter).slice(0, 9);
    }
    // Otherwise return featured products, with diverse fallbacks
    const featured = products.filter((p) => p.isFeatured);
    if (featured.length >= 6) {
      return featured.slice(0, 9);
    }
    const combined: typeof products = [...featured];
    for (const p of products) {
      if (combined.length >= 9) break;
      if (!combined.some((item) => item.id === p.id)) {
        combined.push(p);
      }
    }
    return combined.slice(0, 9);
  }, [products, homeProductFilter]);

  const homeCategories = [
    {
      name: 'IUI & IVF Media',
      description: 'Hitech, Fertipro & Origio culture media, sperm wash, flushing solutions & density gradients.',
      icon: FlaskConical,
      tag: '50+ Formulations',
    },
    {
      name: 'Needles, Catheters & Cannulas',
      description: 'Wallace single/double lumen ONS & DNS needles, Allwin OPU, and curved IUI cannulas.',
      icon: Syringe,
      tag: 'Sterile Grade',
    },
    {
      name: 'Cryopreservation & Vitrification',
      description: 'Cryotech 101/102/110/205 vitrification kits, Reproplates, Vitrifit & liquid nitrogen canes.',
      icon: Snowflake,
      tag: 'High Survival Rate',
    },
    {
      name: 'Disposables & Labware',
      description: 'Falcon 35mm/60mm/100mm dishes, ICSI dishes, 4-well plates & IVF centrifuge tubes.',
      icon: Boxes,
      tag: 'MEA & Endotoxin Tested',
    },
    {
      name: 'Oils & Density Gradients',
      description: 'Medical-grade paraffin oil, Nidacon Sil-Select, mineral oils & multilayer gradients.',
      icon: Layers,
      tag: 'Pharma Tested',
    },
    {
      name: 'Clinical Registers & Documentation',
      description: 'Dedicated 50-page record registers for IVF/ICSI, ART, ET, and vitrification compliance.',
      icon: BookOpen,
      tag: 'Regulatory Mandatory',
    },
  ];

  // Dynamic hero background style based on theme settings
  const getHeroBgClass = () => {
    switch (themeSettings.heroBgStyle) {
      case 'ocean-cobalt':
        return 'bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#1d3557]';
      case 'midnight-emerald':
        return 'bg-gradient-to-br from-[#052024] via-[#083338] to-[#0d4f54]';
      case 'charcoal-cyan':
        return 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0e3b43]';
      case 'sapphire-teal':
      default:
        // Premium vibrant medical sapphire & teal gradient
        return 'bg-gradient-to-br from-[#071d38] via-[#0e3a5d] to-[#0b4b57]';
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Vibrant Clinical Color */}
      <section className={`relative overflow-hidden ${getHeroBgClass()} text-white pt-12 pb-20 lg:pt-16 lg:pb-28 shadow-inner`}>
        {/* Luminous Ambient Glow Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-cyan-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">{websiteContent.hero.highlightBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {websiteContent.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                {websiteContent.hero.subtitle}
              </p>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to request an official quotation for IVF consumables, culture media, and laboratory solutions.'
                    )
                  }
                  style={{
                    backgroundColor: themeSettings.ctaColor,
                    color: themeSettings.ctaTextColor,
                  }}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>{websiteContent.hero.primaryCtaText || 'Request Quotation (WhatsApp)'}</span>
                </button>

                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART MEDICAL, I would like to inquire about your comprehensive IVF laboratory products and services.'
                    )
                  }
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp {ART_MEDICAL_CONFIG.whatsappDisplay}</span>
                </button>

                <button
                  onClick={() => {
                    setPage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-white/10 hover:bg-white/15 transition-colors border border-white/20 backdrop-blur-sm cursor-pointer"
                >
                  Explore 150+ Products
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {websiteContent.hero.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-2xl lg:text-3xl font-bold font-mono text-white tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-cyan-200">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 backdrop-blur-xs">
                <img
                  src={websiteContent.hero.heroImage || heroLabImg}
                  alt="Modern IVF Laboratory and Embryology Cleanroom"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="font-semibold text-white">
                      ART Medical — Offering Full Solution
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">FY 25-26</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Turnkey embryology infrastructure, culture media, catheters, vitrification & clinical disposables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Embryology & IVF Solutions Services Section */}
      <ServicesSection showHeading={true} />

      {/* Equipment Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider block mb-1"
              style={{ color: themeSettings.primaryColor }}
            >
              Comprehensive Product Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Clinical Solutions, Media & Equipment
            </h2>
          </div>
          <button
            onClick={() => {
              setProductCategoryFilter('All');
              setPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 group"
          >
            <span>View All 150+ Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  setProductCategoryFilter(cat.name);
                  setPage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-teal-600 bg-teal-50 group-hover:bg-teal-600 group-hover:text-white transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                      {cat.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-teal-700 group-hover:translate-x-1 transition-transform">
                  <span>Explore category</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider block mb-1"
              style={{ color: themeSettings.primaryColor }}
            >
              Essential Clinical Inventory & Supplies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Clinical Supplies & Equipment
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sterility certified, MEA tested, and ready for immediate dispatch across India.
            </p>
          </div>
          <button
            onClick={() => {
              setProductCategoryFilter('All');
              setPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group shrink-0"
          >
            <span>Explore All 150+ Products</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Category Pills for quick discovery */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { label: 'All Essentials', value: 'All' },
            { label: 'IUI & IVF Media', value: 'IUI & IVF Media' },
            { label: 'Catheters & Needles', value: 'Needles, Catheters & Cannulas' },
            { label: 'Cryo & Vitrification', value: 'Cryopreservation & Vitrification' },
            { label: 'Disposables & Labware', value: 'Disposables & Labware' },
            { label: 'Oils & Gradients', value: 'Oils & Density Gradients' },
          ].map((tab) => {
            const isActive = homeProductFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setHomeProductFilter(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {homeDisplayProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group"
            >
              {/* Product Image */}
              <div
                onClick={() => viewProduct(prod.id)}
                className="relative h-56 bg-slate-100 overflow-hidden cursor-pointer"
              >
                <img
                  src={resolveProductImage(prod)}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/assets/art_media_vials_1790759397048.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-700 shadow-xs">
                  {prod.category}
                </div>
                {prod.makeImporter && (
                  <div className="absolute top-3 right-3 bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {prod.makeImporter}
                  </div>
                )}
              </div>

              {/* Product Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Code: {prod.modelNumber}</span>
                    {prod.packSize && (
                      <span className="text-slate-500 font-sans truncate max-w-[140px]">
                        {prod.packSize}
                      </span>
                    )}
                  </div>
                  <h3
                    onClick={() => viewProduct(prod.id)}
                    className="text-base font-bold text-slate-900 hover:text-teal-700 cursor-pointer line-clamp-2 leading-snug"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.shortDesc}
                  </p>
                </div>

                {/* Price Status & Action */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">
                        Clinical Supply
                      </span>
                      <span className="inline-block text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                        Quotation on Request
                      </span>
                    </div>

                    <span className="text-[11px] text-emerald-600 font-medium">
                      In Stock • Rapid Dispatch
                    </span>
                  </div>

                  {/* Primary CTA: Enquire via WhatsApp */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        openWhatsApp(
                          formatProductQuoteWhatsApp(prod.name, prod.makeImporter, prod.packSize)
                        )
                      }
                      title="Request Quotation via WhatsApp"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enquire via WhatsApp</span>
                    </button>

                    <button
                      onClick={() => viewProduct(prod.id)}
                      title="View Full Specifications"
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Fast Catalog Quote Card */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-emerald-50 border border-teal-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Need Institutional Pricing or Monthly Standing Orders?
            </h4>
            <p className="text-xs text-slate-600">
              Share your laboratory consumables requirement list directly on WhatsApp for instant proforma invoice and volume discount rates.
            </p>
          </div>
          <button
            onClick={() =>
              openWhatsApp(
                'Hello ART Medical, I would like to request an institutional quotation and standing order rate contract for our IVF laboratory.'
              )
            }
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-semibold text-xs flex items-center gap-2 shrink-0 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Bulk Quotation (WhatsApp)</span>
          </button>
        </div>
      </section>

      {/* Commercial Terms & Direct Bank Guarantee Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Commercials & Dispatch Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                ART MEDICAL — Offering Full Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Office: 17 No Pal Para, Badamtala, Mg Road, Thakurpukur, Kolkata - 700104 (Landmark: Near kalua aboitonic school).
              </p>
            </div>
            <div className="shrink-0 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm text-right">
              <span className="text-[11px] text-slate-400 font-mono block">GSTIN</span>
              <span className="text-base font-bold font-mono text-emerald-400 tracking-wider">19ACLFA5383R1ZF</span>
              <span className="text-xs text-slate-300 block mt-1">UCO Bank Partner</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white block">Prices & Taxes</span>
              <p className="text-slate-300 text-[11px]">All prices exclusive of all taxes & charged extra as applicable.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white block">Rapid Delivery</span>
              <p className="text-slate-300 text-[11px]">Within 24 hours of order placement (subject to stock availability).</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white block">Payment & 1% Credit</span>
              <p className="text-slate-300 text-[11px]">Payment in 21 days; 1% discount credit note if paid within 7 days.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="font-bold text-white block">Forwarding</span>
              <p className="text-slate-300 text-[11px]">Outside Kolkata forwarding charges charged extra on actual basis.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-300 space-y-1">
              <div>
                <span className="font-semibold text-white">Direct Numbers:</span>{' '}
                <a href="tel:+919875406943" className="font-mono text-teal-300 hover:underline font-bold">+91 98754 06943</a>
                {' '}|{' '}
                <a href="tel:+917439688406" className="font-mono text-slate-300 hover:underline">7439688406</a>
                {' '}|{' '}
                <a href="tel:+919593076979" className="font-mono text-slate-300 hover:underline">9593076979</a>
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{' '}
                <a href="mailto:artmedical4560@gmail.com" className="text-slate-300 hover:text-white underline">artmedical4560@gmail.com</a>
              </div>
            </div>

            <button
              onClick={() => openWhatsApp('Hello ART MEDICAL, please send the official FY 25-26 commercials PDF and proforma invoice.')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp (+91 98754 06943)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
