import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { GalleryItem } from '../types';
import {
  Image,
  Maximize2,
  X,
  MessageCircle,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { galleryItems, setPage, themeSettings, openWhatsApp } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'IVF Labs',
    'Equipment',
    'Clinic Setup',
    'Trainings & Workshops',
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-200">Facility & Lab Gallery</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Embryology Suites & Laboratory Installations
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Take a visual tour through our turnkey cleanrooms, laminar airflow installations, incubation banks, and hands-on embryology training sessions.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
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
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="font-semibold">Click to enlarge</span>
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-700">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 text-[11px] text-teal-600 font-semibold flex items-center gap-1">
                  <span>View Project Details</span>
                  <ChevronRight className="w-3 h-3" />
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
            <div className="relative h-[400px] sm:h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Info */}
            <div className="p-6 bg-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider block">
                    {activeItem.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeItem.title}
                  </h3>
                </div>

                <button
                  onClick={() =>
                    openWhatsApp(
                      `Hello, I saw the "${activeItem.title}" setup in your website gallery and would like more details.`
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire about this Setup</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
