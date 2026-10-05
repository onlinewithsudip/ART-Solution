import React, { useMemo, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryItem } from '../types';
import {
  Image,
  Maximize2,
  X,
  MessageCircle,
  ChevronRight,
  Filter,
  CheckCircle2,
  Building2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { galleryItems, setPage, themeSettings, openWhatsApp } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Derive categories dynamically from authentic gallery items
  const categories = useMemo(() => {
    const unique = Array.from(new Set(galleryItems.map((item) => item.category)));
    return ['All', ...unique];
  }, [galleryItems]);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-200">Infrastructure & Laboratory Gallery</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ART MEDICAL — Offering Full Solution</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Embryology Suites, Cold-Chain & Equipment Gallery
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mt-1">
                Visual documentation of our turnkey ISO Class 5 modular cleanrooms, dual-operator laminar workstations, multi-chamber tri-gas incubators, ICSI micromanipulators, 2°C–8°C media cold-chain hub, and clinical disposables inventory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shrink-0 text-left sm:text-right text-xs text-slate-300 space-y-1">
              <span className="text-[11px] text-teal-400 font-bold block uppercase tracking-wider">Kolkata Operations</span>
              <div className="font-mono text-white text-sm font-bold">+91 98754 06943</div>
              <div className="text-[11px] text-slate-400">24-Hour Pan-India Dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={
                  isSelected
                    ? {
                        backgroundColor: themeSettings.primaryColor,
                        borderColor: themeSettings.primaryColor,
                      }
                    : {}
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-semibold">Click to inspect setup</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs">
                  {item.category}
                </div>
                {item.badge && (
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-xs">
                    {item.badge}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  {item.specs && item.specs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {item.specs.slice(0, 2).map((sp, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-teal-600 font-semibold flex items-center gap-1">
                    <span>View Specifications</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  <span className="text-slate-400 font-mono">2026 Setup</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-700"
          >
            {/* Modal Image */}
            <div className="relative h-[360px] sm:h-[440px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 bg-white space-y-4 overflow-y-auto max-h-[45vh]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
                    {activeItem.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeItem.title}
                  </h3>
                  {activeItem.location && (
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeItem.location}</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    openWhatsApp(
                      `Hello ART MEDICAL, I saw the "${activeItem.title}" setup in your website gallery and would like detailed pricing, technical specifications, and delivery timelines.`
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold shrink-0 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire on WhatsApp (+91 98754 06943)</span>
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Engineering & Operational Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {activeItem.specs && activeItem.specs.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Technical Specifications & Standards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeItem.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-mono">{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom WhatsApp Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block">
              Turnkey Cleanrooms & Instrumentation
            </span>
            <h3 className="text-2xl font-extrabold text-white">
              Planning an IVF Laboratory Setup or Equipment Upgrade?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              From modular Class 1000/100 IVF cleanrooms to micromanipulator workstations and gas manifolds, connect directly on WhatsApp with our clinical setup specialists.
            </p>
          </div>
          <button
            onClick={() =>
              openWhatsApp(
                'Hello ART Medical, I would like to consult with your turnkey specialist regarding an IVF / IUI cleanroom laboratory setup and equipment installation.'
              )
            }
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp (+91 98754 06943)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
