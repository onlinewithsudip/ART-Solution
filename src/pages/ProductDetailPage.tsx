import React from 'react';
import { useSite } from '../context/SiteContext';
import { resolveProductImage } from '../utils/productImages';
import {
  ART_MEDICAL_CONFIG,
  formatProductQuoteWhatsApp,
} from '../config/contact';
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Mail,
  Building,
  Phone,
  Clock,
  Truck,
  Receipt,
  FileCheck,
  PackageCheck,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setPage,
    themeSettings,
    openWhatsApp,
    websiteContent,
  } = useSite();

  // Find selected product or default to first
  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <button
          onClick={() => setPage('products')}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
        >
          Return to Products Catalog
        </button>
      </div>
    );
  }

  const handleWhatsAppQuote = () => {
    const text = formatProductQuoteWhatsApp(
      product.name,
      product.makeImporter,
      product.packSize
    );
    openWhatsApp(text);
  };
  const handleWhatsAppClick = handleWhatsAppQuote;

  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumb & Top Bar */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => setPage('products')}
              className="hover:text-white transition-colors"
            >
              Products
            </button>
            <span>/</span>
            <span className="text-slate-200">{product.category}</span>
            <span>/</span>
            <span className="text-emerald-400 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setPage('products')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Product Catalog</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Product Image & Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-sm">
              <div className="relative h-[360px] sm:h-[420px] bg-slate-50 rounded-xl overflow-hidden">
                <img
                  src={resolveProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/assets/art_media_vials_1790759397048.jpg';
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-xs">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-slate-200 text-center">
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
                <span className="text-[11px] font-semibold text-slate-700 block">
                  CE & ISO Certified
                </span>
              </div>
              <div className="space-y-1">
                <CheckCircle2 className="w-5 h-5 text-sky-600 mx-auto" />
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Pre-Calibrated
                </span>
              </div>
              <div className="space-y-1">
                <FileText className="w-5 h-5 text-amber-600 mx-auto" />
                <span className="text-[11px] font-semibold text-slate-700 block">
                  Full Validation IQ/OQ
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Pricing & WhatsApp Connect */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  Code: {product.modelNumber}
                </span>
                {product.makeImporter && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Make: {product.makeImporter}
                  </span>
                )}
                {product.packSize && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Pack: {product.packSize}
                  </span>
                )}
                {product.inStock ? (
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    In Stock / 24h Dispatch
                  </span>
                ) : (
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Available on Request
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {product.fullDesc || product.shortDesc}
              </p>
            </div>

            {/* Price Box Replaced with Official Quotation Status */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-800 block">
                  Commercial & Clinical Supply
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 block mt-0.5">
                  Quotation on Request
                </span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  Official distributor supply with lot certificates & batch compliance
                </span>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-600">
                <span className="font-semibold text-emerald-700 block">Prompt 24h Dispatch</span>
                <span>Priority courier & cold-chain</span>
              </div>
            </div>

            {/* WhatsApp Connect Button */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Specialist Connect</span>
              </div>
              <p className="text-xs text-emerald-700">
                Need immediate quotation, availability confirmation, or delivery timelines? Chat directly with our ART Medical technical desk.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-98 transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current stroke-none" />
                <span>Request Quotation on WhatsApp ({ART_MEDICAL_CONFIG.whatsappDisplay})</span>
              </button>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Engineering Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technical Specifications & Direct Inquiry Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Technical Specifications Table */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              <span>Technical Specifications</span>
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100 text-xs">
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-3 p-3.5 ${
                        idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-slate-700">
                        {spec.key}
                      </span>
                      <span className="col-span-2 font-mono text-slate-800 tabular-nums">
                        {spec.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-slate-500">
                    Standard laboratory specifications apply. Detailed cut-sheet available upon request.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Direct Product WhatsApp Quotation Desk (Zero Forms) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={themeSettings.logoUrl || '/logo.svg'}
                    alt={themeSettings.logoText || 'ART Medical'}
                    style={{ height: '40px' }}
                    className="w-auto object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== `${window.location.origin}/logo.svg`) {
                        target.src = '/logo.svg';
                      }
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                  Official Clinical Supply
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-emerald-600">
                  Instant WhatsApp Quotation
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Request Official Quotation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  No forms required. Click below to connect directly with ART Medical on WhatsApp for immediate institutional pricing and batch availability.
                </p>
              </div>

              {/* Product Inquired Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">
                  {product.name}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                    Ref: {product.modelNumber}
                  </span>
                  {product.makeImporter && (
                    <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {product.makeImporter}
                    </span>
                  )}
                  {product.packSize && (
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                      Pack: {product.packSize}
                    </span>
                  )}
                </div>
              </div>

              {/* Primary Direct WhatsApp CTA */}
              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Request Quotation on WhatsApp</span>
              </button>

              {/* Fast Direct Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={`tel:${ART_MEDICAL_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Call {ART_MEDICAL_CONFIG.phonePrimary}</span>
                </a>
                <a
                  href={`mailto:${ART_MEDICAL_CONFIG.primaryEmail}?subject=Quotation Request: ${encodeURIComponent(product.name)}&body=Hello ART Medical,%0D%0A%0D%0APlease share official commercial quotation and batch certification for:%0D%0AProduct: ${encodeURIComponent(product.name)}%0D%0ACode: ${encodeURIComponent(product.modelNumber)}%0D%0APack Size: ${encodeURIComponent(product.packSize || 'N/A')}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email Inquiry</span>
                </a>
              </div>

              {/* Supply Assurances */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2.5 text-[11px]">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rapid 24-hr order dispatch with cold chain logistics</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px]">
                  <FileCheck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Batch-specific MEA & Sterility Quality Certificates</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px]">
                  <Receipt className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official GST Tax Invoice (GSTIN: 19ACLFA5383R1ZF)</span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px]">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Fast WhatsApp quote response within 15–30 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
