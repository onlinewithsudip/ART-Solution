import React from 'react';
import { useSite } from '../context/SiteContext';
import { ServicesSection } from '../components/ServicesSection';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  FileCheck2,
  Building,
} from 'lucide-react';
import { ART_MEDICAL_CONFIG } from '../config/contact';

export const ServicesPage: React.FC = () => {
  const { setPage, openWhatsApp } = useSite();

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-teal-400 font-medium">Our Services</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Assisted Reproductive Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl">
            Comprehensive Embryology & IVF Solutions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            From certified culture media and precision IVF workstations to validated cryo-transport and freelance Senior Embryologist clinical backup, ART Medical provides end-to-end reliability for India's leading reproductive medicine facilities.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openWhatsApp('Hello ART Medical, I would like to inquire about your comprehensive IVF laboratory services.')}
              className="px-5 py-3 rounded-xl font-semibold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp ({ART_MEDICAL_CONFIG.whatsappDisplay})</span>
            </button>

            <button
              onClick={() => {
                setPage('embryologist-support');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl font-semibold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Senior Embryologist Backup</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Services Section with exact 1-6 order */}
      <ServicesSection showHeading={false} />

      {/* Key Commitments Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              The ART Medical Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Fertility Centers Rely On ART Medical
            </h3>
            <p className="text-sm text-slate-300">
              Assisted reproductive technologies demand zero tolerance for contamination, temperature deviations, or equipment failure. We back every service with institutional accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <Clock className="w-6 h-6 text-teal-400" />
              <h4 className="text-sm font-bold text-white">24-Hour Dispatch SLA</h4>
              <p className="text-xs text-slate-300">Fast shipment staging from Thakurpukur Kolkata hub with priority courier delivery.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">MEA & Endotoxin Tested</h4>
              <p className="text-xs text-slate-300">All media batches certified mouse-embryo assay validated for highest blastocyst viability.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Expert Embryologist Team</h4>
              <p className="text-xs text-slate-300">Senior clinical embryologists available on-demand for freelance and backup coverage.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <FileCheck2 className="w-6 h-6 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Statutory Tax Compliance</h4>
              <p className="text-xs text-slate-300">100% compliant GST invoicing (19ACLFA5383R1ZF) and verified UCO Bank commercial accounts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
