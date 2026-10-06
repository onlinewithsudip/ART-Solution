import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Building,
  Award,
  ArrowRight,
  ChevronDown,
  Sparkles,
  PackageCheck,
  FlaskConical,
  Snowflake,
  FileCheck2,
} from 'lucide-react';
import { ART_MEDICAL_CONFIG } from '../config/contact';

export const ContactPage: React.FC = () => {
  const { websiteContent, themeSettings, openWhatsApp, setPage } = useSite();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
                    {websiteContent.contact?.phone1 || '+91 98754 06943'}
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
                    {websiteContent.contact?.address || 'BF 28, Ground Floor, BF Block, Sector 1, Bidhannagar, Kolkata, West Bengal 700064'}
                  </p>
                  {websiteContent.contact?.landmark && (
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
                      href={`mailto:${websiteContent.contact?.email || 'onlinewithsudip@gmail.com'}`}
                      className="text-slate-700 hover:text-slate-900 font-medium block"
                    >
                      {websiteContent.contact?.email || 'onlinewithsudip@gmail.com'}
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
                    {websiteContent.contact?.workingHours || 'Monday - Saturday: 09:30 AM – 07:30 PM (IST)'}
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

          {/* Right Column: Direct Instant WhatsApp & Rapid Clinical Response Hub (Zero Forms) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-emerald-600">
                  Instant WhatsApp Connect
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Direct Clinical & Supply Inquiry Desk
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  No lengthy forms to fill out. Choose your requirement below to start a direct WhatsApp chat with our clinical embryology coordinators, or contact our direct phone desks.
                </p>
              </div>

              {/* Dedicated Senior Embryologist Routing Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-teal-50 border border-amber-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Need Senior Embryologist Support?
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Emergency freelance backup, batch cycles, and PGT biopsy standby.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPage('embryologist-support');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Embryologist Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Fast-Track Inquiry Action Cards */}
              <div className="space-y-3">
                {/* Option 1: Consumables & Culture Media */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <FlaskConical className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          IVF Consumables & Culture Media Quotation
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Fertipro, Hitech, Origio media, Wallace & Allwin needles, Cryotech vitrification, and labware.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        'Hello ART Medical, I would like to request an official quotation for IVF consumables, culture media, and labware supplies.'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp for Media & Consumables</span>
                  </button>
                </div>

                {/* Option 2: Turnkey Cleanroom Setup */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Turnkey IVF & IUI Cleanroom Laboratory Setup
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          ISO Class 5 modular cleanroom suites, laminar airflow workstations, gas manifold, and equipment fitment.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        'Hello ART Medical, I would like to schedule a consultation for Turnkey IVF & IUI Cleanroom Laboratory Setup & Instrumentation.'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request Setup Consultation (WhatsApp)</span>
                  </button>
                </div>

                {/* Option 3: Cryo Logistics & Semen Support */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Snowflake className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Frozen Semen Sample Support & Cryo Logistics
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          Quality-certified donor semen samples, liquid nitrogen vapor shipper transport, and safety validation.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        'Hello ART Medical, I would like to inquire about Frozen Semen Sample Support and cryogenic sample logistics.'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire Cryo Logistics (WhatsApp)</span>
                  </button>
                </div>

                {/* Option 4: General Commercials & Orders */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Standing Orders, Rate Contracts & GST Invoicing
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          21-day credit terms, 1% prompt settlement discount, institutional GST invoice (GSTIN: 19ACLFA5383R1ZF).
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openWhatsApp(
                        'Hello ART Medical, please share commercial rate contracts, GST tax invoice terms, and standing order details.'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat with Commercial Desk (WhatsApp)</span>
                  </button>
                </div>
              </div>

              {/* Direct Quick Dial & Email Action Row */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">Direct Helpline:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="tel:+919875406943"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold font-mono transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>+91 98754 06943</span>
                  </a>
                  <a
                    href="tel:+917439688406"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-mono transition-colors"
                  >
                    +91 74396 88406
                  </a>
                  <a
                    href={`mailto:${websiteContent.contact.email}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
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
