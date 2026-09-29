import React, { useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  MessageCircle,
  X,
  Package,
  CheckCircle2,
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
  } = useSite();

  // Unique categories derived from product list
  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory =
        productCategoryFilter === 'All' || prod.category === productCategoryFilter;
      const q = productSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.modelNumber.toLowerCase().includes(q) ||
        prod.shortDesc.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, productCategoryFilter, productSearchQuery]);

  return (
    <div className="space-y-10 pb-24">
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
            <span className="text-slate-200">Products & Equipment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Clinical Equipment & Laboratory Systems
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Engineered for high-yield embryology. Explore our certified laminar flow workstations, multi-chamber incubators, precision micromanipulators, and consumables.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productSearchQuery}
              onChange={(e) => setProductSearchQuery(e.target.value)}
              placeholder="Search by equipment name, model (e.g. AF-2000), or category..."
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

          {/* Quick Stats */}
          <div className="text-xs text-slate-500 font-medium px-2 shrink-0">
            Showing <span className="font-bold text-slate-800 tabular-nums">{filteredProducts.length}</span> of {products.length} systems
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group"
              >
                {/* Product Image */}
                <div
                  onClick={() => viewProduct(prod.id)}
                  className="relative h-60 bg-slate-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700 shadow-xs">
                    {prod.category}
                  </div>
                  {prod.inStock ? (
                    <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      In Stock / Available
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3 bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Built to Order
                    </div>
                  )}
                </div>

                {/* Product Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-slate-400">
                      Model: {prod.modelNumber}
                    </div>
                    <h3
                      onClick={() => viewProduct(prod.id)}
                      className="text-base font-bold text-slate-900 hover:text-slate-700 cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.shortDesc}
                    </p>

                    {/* Quick Specs Snippet */}
                    {prod.specs && prod.specs.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">{prod.specs[0].key}:</span>
                          <span className="font-medium text-slate-700 truncate max-w-[170px]">
                            {prod.specs[0].value}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
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
                          openWhatsApp(
                            `Hello, I would like to inquire about pricing and delivery for ${prod.name} (Model: ${prod.modelNumber}).`
                          )
                        }
                        title="Chat on WhatsApp"
                        className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => viewProduct(prod.id)}
                        style={{
                          backgroundColor: themeSettings.ctaColor,
                          color: themeSettings.ctaTextColor,
                        }}
                        className="px-3.5 py-2.5 rounded-lg text-xs font-semibold shadow-xs hover:brightness-110 active:scale-98 transition-all"
                      >
                        View Details
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
              No equipment found matching your criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category selection or clear the search query.
            </p>
            <button
              onClick={() => {
                setProductCategoryFilter('All');
                setProductSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
