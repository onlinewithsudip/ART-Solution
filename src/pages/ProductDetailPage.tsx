import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  ArrowLeft,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Mail,
  Building,
  User,
  Phone,
  Globe,
  Send,
  HelpCircle,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setPage,
    themeSettings,
    openWhatsApp,
    submitInquiry,
    websiteContent,
  } = useSite();

  // Find selected product or default to first
  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  // Inquiry form local state
  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    country: '',
    message: `Hello, please provide official quotation, technical datasheet, and delivery timeline for the ${product?.name} (Model: ${product?.modelNumber}).`,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleWhatsAppClick = () => {
    const text = `Hello ${websiteContent.contact.companyName}, I would like to inquire about the ${product.name} (Model: ${product.modelNumber}). Please share pricing and technical specifications.`;
    openWhatsApp(text);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    submitInquiry({
      name: formData.name,
      clinicName: formData.clinicName || 'Not specified',
      email: formData.email,
      phone: formData.phone || 'Not specified',
      country: formData.country || 'Global',
      inquiryType: 'Equipment Purchase',
      message: formData.message,
      productId: product.id,
      productName: product.name,
    });

    setFormSubmitted(true);
  };

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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
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

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  FY 25-26 Customer Supply Rate
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
                  {product.price}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Exclusive of all taxes; forwarding extra on actuals
                </span>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-500">
                <span className="font-semibold text-emerald-700 block">1% Prompt Payment Credit</span>
                <span>if paid within 7 days of delivery</span>
              </div>
            </div>

            {/* WhatsApp Connect Button (Requested by User) */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Specialist Connect</span>
              </div>
              <p className="text-xs text-emerald-700">
                Need instant pricing, customized options, or installation lead times? Chat directly with our biomedical engineering desk.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-98 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current stroke-none" />
                <span>Inquire on WhatsApp (+91 98754 06943)</span>
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

          {/* Direct Product Inquiry Form (Requested by User) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={themeSettings.logoUrl || '/logo.svg'}
                    alt={themeSettings.logoText || 'ART Solution'}
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
                  Direct Supply (₹)
                </span>
              </div>

              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                  style={{ color: themeSettings.primaryColor }}
                >
                  Direct RFP & Quotation
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Request Equipment Proposal
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your clinic requirements. Our bio-medical engineer will respond within 2 hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">
                    Inquiry Submitted Successfully
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Thank you, {formData.name}. Our commercial team will deliver a formal quotation for the{' '}
                    <span className="font-semibold">{product.name}</span> to {formData.email}.
                  </p>
                  <div className="text-[11px] text-emerald-800 bg-emerald-100/60 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lead notification dispatched to {themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        clinicName: '',
                        email: '',
                        phone: '',
                        country: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-900"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Dr. / Specialist Name"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Clinic / Hospital Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.clinicName}
                        onChange={(e) =>
                          setFormData({ ...formData, clinicName: e.target.value })
                        }
                        placeholder="Center for Reproductive Health"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="doctor@clinic.com"
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+1 / +91 ..."
                          className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Country / City
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="e.g. United Kingdom / India / UAE"
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Project Notes / Specifics
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: themeSettings.ctaColor,
                      color: themeSettings.ctaTextColor,
                    }}
                    className="w-full py-3 rounded-xl text-xs font-semibold shadow-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Quotation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
