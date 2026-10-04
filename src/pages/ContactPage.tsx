import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Building,
  User,
  Globe,
  HelpCircle,
  ChevronDown,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  ART_MEDICAL_CONFIG,
  buildWhatsAppUrl,
  formatGeneralEnquiryWhatsApp,
} from '../config/contact';

export const ContactPage: React.FC = () => {
  const { websiteContent, themeSettings, openWhatsApp, submitInquiry, setPage } =
    useSite();

  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    country: 'India',
    inquiryType: 'Comprehensive Embryology Laboratory Support',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // 1. Build complete WhatsApp message with all submitted details
    const waMessage = formatGeneralEnquiryWhatsApp(formData);
    const waUrl = buildWhatsAppUrl(waMessage);

    // 2. Submit to local/production inquiry record
    submitInquiry({
      name: formData.name,
      clinicName: formData.clinicName || 'Not specified',
      email: formData.email || 'Not specified',
      phone: formData.phone || 'Not specified',
      country: formData.country || 'India',
      inquiryType: formData.inquiryType,
      message:
        formData.message ||
        `Inquiry regarding ${formData.inquiryType} for ${formData.clinicName || 'clinic'}.`,
    });

    // 3. Open WhatsApp directly to configured ART Medical number (safe inside iframe)
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = waUrl;
    }

    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What is the typical timeframe to deliver a turnkey IVF laboratory?',
      a: 'A standard modular cleanroom and equipment fitment ranges from 6 to 12 weeks from finalized CAD architectural sign-off, inclusive of HVAC ducting, particle count validation, and gas manifold commissioning.',
    },
    {
      q: 'Do you provide on-site validation (IQ/OQ/PQ) and certification?',
      a: 'Yes. Every installation includes comprehensive Installation Qualification (IQ), Operational Qualification (OQ), and Performance Qualification (PQ) protocols with calibrated particle counters, airflow anemometers, and thermal probes.',
    },
    {
      q: 'Can we customize dimensions for compact clinical spaces?',
      a: 'All our modular cleanroom panels and laminar flow workstations can be custom-engineered to fit non-standard room footprints, ceiling heights, and pass-box orientations.',
    },
    {
      q: 'What warranty and annual maintenance contracts (AMC) are offered?',
      a: 'We provide a 24-month comprehensive manufacturer warranty on all major equipment (incubators, workstations, micromanipulators), backed by optional preventive calibration and emergency loaner AMC packages.',
    },
  ];

  return (
    <div className="space-y-16 pb-24">
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
            <span className="text-slate-200">Contact Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Connect With Our Turnkey Specialists
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Have questions about equipment specifications, turnkey cleanroom budgets, or emergency biomedical service? We are ready to assist.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-wider block mb-1"
                style={{ color: themeSettings.primaryColor }}
              >
                Immediate Assistance
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Corporate & Technical Desk
              </h2>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Direct WhatsApp Channel
                  </h3>
                  <span className="text-xs text-emerald-700 font-mono">
                    {websiteContent.contact.phone1}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly with our biomedical project directors for immediate queries, floor plans, and rapid quotation drafts.
              </p>
              <button
                onClick={() => openWhatsApp('Hello, I am reaching out from your Contact Us page regarding laboratory equipment.')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                <span>Start WhatsApp Conversation</span>
              </button>
            </div>

            {/* Office & Details */}
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={themeSettings.logoUrl || '/logo.svg'}
                    alt={themeSettings.logoText || 'ART Medical'}
                    style={{ height: '44px' }}
                    className="w-auto object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== `${window.location.origin}/logo.svg`) {
                        target.src = '/logo.svg';
                      }
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                  GST Verified
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 uppercase block">
                    Office Address
                  </span>
                  <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                    ART MEDICAL
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {websiteContent.contact.address}
                  </p>
                  {websiteContent.contact.landmark && (
                    <p className="text-xs text-teal-700 font-medium pt-1">
                      Landmark: {websiteContent.contact.landmark}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Phone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-800 uppercase block">
                    Phone Numbers
                  </span>
                  <div>
                    <a
                      href="tel:+919875406943"
                      className="text-slate-900 font-bold hover:text-teal-700 font-mono block"
                    >
                      +91 98754 06943
                    </a>
                    <a
                      href="tel:+917439688406"
                      className="text-slate-600 hover:text-slate-900 font-mono block pt-0.5"
                    >
                      +91 74396 88406
                    </a>
                    <a
                      href="tel:+919593076979"
                      className="text-slate-600 hover:text-slate-900 font-mono block pt-0.5"
                    >
                      +91 95930 76979
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Mail className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-800 uppercase block">
                    Electronic Mail
                  </span>
                  <div>
                    <a
                      href={`mailto:${websiteContent.contact.email}`}
                      className="text-slate-700 hover:text-slate-900 font-medium block"
                    >
                      {websiteContent.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-slate-800 uppercase block">
                    Operating Schedule
                  </span>
                  <p className="text-slate-600">
                    {websiteContent.contact.workingHours}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">GSTIN:</span>
                  <span className="font-mono font-bold text-teal-700">19ACLFA5383R1ZF</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  <span>Official Bank:</span>
                  <span className="font-medium text-slate-700">UCO Bank (A/C: 17610210001660)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & RFP Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider block mb-1"
                  style={{ color: themeSettings.primaryColor }}
                >
                  Send an Inquiry
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Request Information or Turnkey Proposal
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details below and our team will get in touch with you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950">
                    Enquiry Dispatched to ART Medical WhatsApp
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your complete enquiry details have been prepared and dispatched directly to the official ART Medical WhatsApp number ({ART_MEDICAL_CONFIG.whatsappDisplay}).
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        const waMessage = formatGeneralEnquiryWhatsApp(formData);
                        window.open(buildWhatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
                      }}
                      className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Re-Open WhatsApp Message</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          clinicName: '',
                          email: '',
                          phone: '',
                          country: 'India',
                          inquiryType: 'Comprehensive Embryology Laboratory Support',
                          message: '',
                        });
                      }}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Embryologist Support Dedicated Routing Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-teal-50 border border-amber-300/70 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Looking for Senior Embryologist Support?
                        </div>
                        <div className="text-[11px] text-slate-600">
                          For freelance cycle leadership & emergency backup, use our dedicated desk.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPage('embryologist-support');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span>Embryologist Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Clinic / Organization Name
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.clinicName}
                          onChange={(e) =>
                            setFormData({ ...formData, clinicName: e.target.value })
                          }
                          placeholder="IVF & Fertility Hospital"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="doctor@hospital.org"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98300 00000"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        City / Country
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                          placeholder="e.g. Kolkata, West Bengal"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Primary Area of Interest *
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inquiryType: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white font-medium"
                      >
                        <option value="Comprehensive Embryology Laboratory Support">
                          1. Comprehensive Embryology Laboratory Support
                        </option>
                        <option value="IVF Consumables & Culture Media">
                          2. IVF Consumables & Culture Media
                        </option>
                        <option value="Complete Instrumentation Solutions">
                          3. Complete Instrumentation Solutions
                        </option>
                        <option value="Frozen Semen Sample Support">
                          4. Frozen Semen Sample Support
                        </option>
                        <option value="IVF & IUI Laboratory Setup Support">
                          5. IVF & IUI Laboratory Setup Support
                        </option>
                        <option value="General Inquiry">
                          General Product / Commercial Inquiry
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Project Scope & Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please specify lab requirements, product quantities, or questions..."
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: themeSettings.ctaColor,
                      color: themeSettings.ctaTextColor,
                    }}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Complete Details to ART Medical WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: themeSettings.primaryColor }}
          >
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Turnkey Planning & Engineering Support
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-800 hover:text-slate-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
