import React from 'react';
import { useSite } from '../context/SiteContext';
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
} from 'lucide-react';
import heroLabImg from '../assets/images/fertility_hero_lab_1790663824905.jpg';

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

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  const categories = [
    {
      name: 'IVF Workstations',
      description: 'Laminar flow hoods with integrated thermal stages & stereomicroscopy.',
      icon: Layers,
    },
    {
      name: 'Incubators & Warming',
      description: 'Multi-chamber tri-gas incubators and precision warming plates.',
      icon: Thermometer,
    },
    {
      name: 'Micromanipulation & Laser',
      description: 'Zero-drift hydraulic micro-injectors and ICSI optical rigs.',
      icon: Cpu,
    },
    {
      name: 'Turnkey Lab Setup',
      description: 'ISO Class 5 modular cleanrooms, medical gas pipelines & validation.',
      icon: Wrench,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-radial from-slate-800/60 to-slate-950 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Highlight Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{websiteContent.hero.highlightBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {websiteContent.hero.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {websiteContent.hero.subtitle}
              </p>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setPage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    backgroundColor: themeSettings.ctaColor,
                    color: themeSettings.ctaTextColor,
                  }}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
                >
                  <span>{websiteContent.hero.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openWhatsApp('Hello, I am interested in discussing a turnkey IVF laboratory setup.')}
                  className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Specialist</span>
                </button>

                <button
                  onClick={() => {
                    setPage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-xl font-medium text-sm text-slate-300 bg-slate-800/90 hover:bg-slate-700 transition-colors border border-slate-700"
                >
                  About Our Firm
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {websiteContent.hero.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-2xl lg:text-3xl font-bold font-mono text-white tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-300">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800">
                <img
                  src={websiteContent.hero.heroImage || heroLabImg}
                  alt="Modern IVF Laboratory and Embryology Cleanroom"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-xs">
                  <div className="flex items-center justify-between text-slate-300 mb-1">
                    <span className="font-semibold text-white">
                      Clinical Embryology Lab Console
                    </span>
                    <span className="text-emerald-400 font-mono">ISO Class 5</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Turnkey laminar airflow, tri-gas incubation & micro-injection systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider block mb-1"
              style={{ color: themeSettings.primaryColor }}
            >
              Comprehensive Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Essential IVF Equipment & Laboratory Solutions
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
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  setProductCategoryFilter(cat.name);
                  setPage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all space-y-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900">
                  <span>Explore items</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-wider block mb-1"
              style={{ color: themeSettings.primaryColor }}
            >
              Flagship Technology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Clinical Systems
            </h2>
          </div>
          <button
            onClick={() => {
              setPage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 group"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((prod) => (
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
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-xs">
                  {prod.category}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Certified
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400">
                    Model: {prod.modelNumber}
                  </div>
                  <h3
                    onClick={() => viewProduct(prod.id)}
                    className="text-lg font-bold text-slate-900 hover:text-slate-700 cursor-pointer line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.shortDesc}
                  </p>
                </div>

                {/* Price and Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">
                      Price / Estimate
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                      {prod.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        openWhatsApp(`Hello, I would like to inquire about pricing for ${prod.name} (${prod.modelNumber}).`)
                      }
                      title="Quick WhatsApp Inquire"
                      className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => viewProduct(prod.id)}
                      style={{
                        backgroundColor: themeSettings.ctaColor,
                        color: themeSettings.ctaTextColor,
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-semibold shadow-xs hover:brightness-110 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Turnkey Solution Roadmap */}
      <section className="bg-slate-100 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: themeSettings.primaryColor }}
            >
              Turnkey Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              End-to-End IVF Laboratory Execution
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From raw floor space to first clinical case — engineered to eliminate embryology variability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Cleanroom Design & HVAC',
                desc: 'Architectural zoning, positive pressure cascades, and VOC-scrubbing air filtration.',
              },
              {
                step: '02',
                title: 'Equipment & Workstations',
                desc: 'Delivery and ergonomic integration of laminar hoods, tri-gas incubators, and ICSI scopes.',
              },
              {
                step: '03',
                title: 'Gas Piping & Calibration',
                desc: 'Ultra-pure medical gas manifolds, temperature profiling, and particle count audits.',
              },
              {
                step: '04',
                title: 'Embryologist Onboarding',
                desc: 'Hands-on SOP validation, embryology trial runs, and continuous annual maintenance.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative"
              >
                <div className="text-2xl font-mono font-bold text-slate-300">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl"
          style={{ backgroundColor: themeSettings.primaryColor }}
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 text-white px-3 py-1 rounded-full">
              Direct Clinical Advisory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Planning a New IVF Center or Upgrading Your Lab?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Connect with our biomedical engineering directors today for turnkey architectural consultation, equipment specification lists, or custom quotations.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openWhatsApp('Hello, I would like to schedule a turnkey IVF consultation.')}
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-white text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-black/20 hover:bg-black/30 text-white transition-colors border border-white/20"
              >
                Submit Project RFP
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
