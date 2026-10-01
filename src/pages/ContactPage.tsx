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
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { websiteContent, themeSettings, openWhatsApp, submitInquiry, setPage } =
    useSite();

  const [formData, setFormData] = useState({
    name: '',
    clinicName: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'Turnkey Lab Setup' as const,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    submitInquiry({
      name: formData.name,
      clinicName: formData.clinicName || 'Not specified',
      email: formData.email,
      phone: formData.phone || 'Not specified',
      country: formData.country || 'Global',
      inquiryType: formData.inquiryType,
      message:
        formData.message ||
        `General inquiry regarding ${formData.inquiryType} for ${formData.clinicName || 'clinic'}.`,
    });

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
                    alt={themeSettings.logoText || 'ART Solution'}
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
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-900">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our laboratory specialists have logged your request and will contact you via email ({formData.email}) or phone shortly.
                  </p>
                  <div className="max-w-md mx-auto text-[11px] text-emerald-800 bg-emerald-100/60 py-2 px-3.5 rounded-xl flex items-center justify-center gap-2 font-mono">
                    <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Lead notification routed to {themeSettings.leadNotificationEmail || 'onlinewithsudip@gmail.com'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        clinicName: '',
                        email: '',
                        phone: '',
                        country: '',
                        inquiryType: 'Turnkey Lab Setup',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                          placeholder="doctor@hospital.org"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Country / Territory
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                          }
                          placeholder="e.g. India, UAE, UK"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                        Primary Area of Interest
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            inquiryType: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white"
                      >
                        <option value="Turnkey Lab Setup">Turnkey Lab Setup</option>
                        <option value="Equipment Purchase">Equipment Purchase</option>
                        <option value="Service & Maintenance">Service & Maintenance</option>
                        <option value="Consumables Supply">Consumables Supply</option>
                        <option value="General Inquiry">General Inquiry</option>
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
                      placeholder="Please specify lab dimensions, equipment requirements, or questions..."
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
                    <Send className="w-4 h-4" />
                    <span>Transmit Official Inquiry</span>
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
