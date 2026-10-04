import React, { useMemo, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { resolveProductImage } from '../utils/productImages';
import { formatProductQuoteWhatsApp, ART_MEDICAL_CONFIG } from '../config/contact';
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  MessageCircle,
  X,
  Package,
  CheckCircle2,
  Tag,
  Building2,
  Box,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const {
    products,
    productCategoryFilter,
    setProductCategoryFilter,
    productSearchQuery,
    setProductSearchQuery,
    viewProduct,
    themeSettings,
    openWhatsApp,
    setPage,
    categories: contextCategories,
  } = useSite();

  const [selectedMake, setSelectedMake] = useState<string>('All');

  // Categories list combining context and existing product categories
  const categories = useMemo(() => {
    const list = Array.from(new Set([...contextCategories, ...products.map((p) => p.category)]));
    return ['All', ...list];
  }, [contextCategories, products]);

  // Unique makes/importers derived from product list
  const makes = useMemo(() => {
    const list = Array.from(
      new Set(
        products
          .map((p) => p.makeImporter)
          .filter((m): m is string => Boolean(m && m.trim()))
      )
    ).sort();
    return ['All', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        productCategoryFilter === 'All' || prod.category === productCategoryFilter;
      const matchesMake =
        selectedMake === 'All' ||
        (prod.makeImporter && prod.makeImporter.toLowerCase() === selectedMake.toLowerCase());
      const q = productSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.modelNumber.toLowerCase().includes(q) ||
        prod.shortDesc.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        (prod.makeImporter && prod.makeImporter.toLowerCase().includes(q)) ||
        (prod.packSize && prod.packSize.toLowerCase().includes(q));
      return matchesCategory && matchesMake && matchesSearch;
    });
  }, [products, productCategoryFilter, selectedMake, productSearchQuery]);

  return (
    <div className="space-y-10 pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-200">Products & Equipment</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
                Official Clinical Products Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Clinical Equipment, Media & Disposables
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mt-1">
                Authentic embryology solutions from Hitech, Fertipro, Origio, Wallace, Falcon, Cryotech, and ART Medical. Official certified distribution with clinical quotations provided on request.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shrink-0 text-right">
              <span className="text-xs text-slate-400 block font-mono">Catalog Status</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">Active & Ready Stock</span>
              <span className="text-[11px] text-slate-300 block mt-0.5">Prompt 24-hr Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productSearchQuery}
              onChange={(e) => setProductSearchQuery(e.target.value)}
              placeholder="Search by product name, Make (e.g. Fertipro, Origio), pack size, or code..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
            {productSearchQuery && (
              <button
                onClick={() => setProductSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter: Make / Importer */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              Make:
            </span>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Makes / Importers</option>
              {makes.filter(m => m !== 'All').map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-slate-500 font-medium px-2 shrink-0">
            Showing <span className="font-bold text-slate-800 tabular-nums">{filteredProducts.length}</span> of {products.length} items
          </div>
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = productCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setProductCategoryFilter(cat)}
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

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
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
                  {prod.inStock ? (
                    <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      In Stock / Available
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      On Request
                    </div>
                  )}
                </div>

                {/* Product Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Make & Pack Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {prod.makeImporter && (
                        <span className="inline-flex items-center gap-1 font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                          <Building2 className="w-3 h-3 text-sky-600" />
                          <span>{prod.makeImporter}</span>
                        </span>
                      )}
                      {prod.packSize && (
                        <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono truncate max-w-[190px]">
                          <Box className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{prod.packSize}</span>
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => viewProduct(prod.id)}
                      className="text-base font-bold text-slate-900 hover:text-sky-700 cursor-pointer line-clamp-2 leading-snug"
                    >
                      {prod.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.shortDesc}
                    </p>

                    <div className="text-[11px] font-mono text-slate-400">
                      Catalog Code: {prod.modelNumber}
                    </div>
                  </div>

                  {/* Pricing Removed - Request Quote Action */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">
                          Clinical Supply
                        </span>
                        <span className="inline-block text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                          Price on Request
                        </span>
                      </div>

                      <span className="text-[11px] text-emerald-600 font-medium">
                        Immediate Dispatch
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          openWhatsApp(
                            formatProductQuoteWhatsApp(prod.name, prod.makeImporter, prod.packSize)
                          )
                        }
                        title="Request Quotation via WhatsApp"
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire via WhatsApp</span>
                      </button>

                      <button
                        onClick={() => viewProduct(prod.id)}
                        title="View Full Specifications"
                        className="p-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              No products found matching your search
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try selecting "All" categories, clearing the Make filter, or searching for general keywords like "IUI", "Sperm", "Wallace", "Dish".
            </p>
            <button
              onClick={() => {
                setProductCategoryFilter('All');
                setSelectedMake('All');
                setProductSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
