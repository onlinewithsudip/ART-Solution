import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  FlaskConical,
  Droplet,
  Cpu,
  Snowflake,
  Building2,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Award,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { ART_MEDICAL_CONFIG } from '../config/contact';

interface ServicesSectionProps {
  showHeading?: boolean;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  showHeading = true,
  className = '',
}) => {
  const { setPage, setProductCategoryFilter, openWhatsApp } = useSite();

  return (
    <section className={`py-12 sm:py-16 ${className}`} id="our-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Comprehensive Embryology & IVF Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              End-to-end clinical infrastructure, certified culture media, precision instrumentation, cryo logistics, and senior embryologist backup trusted by reproductive centers pan-India.
            </p>
          </div>
        )}

        {/* Services List in EXACT Serial Order 1 to 6 */}
        <div className="space-y-8">
          {/* Grid for Services 1 to 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1: Comprehensive Embryology Laboratory Support */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Service 01
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    1. Comprehensive Embryology Laboratory Support
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    Scientific & Technical Laboratory Operations
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Full-spectrum scientific and technical operational support for IVF cleanrooms. Standard operating procedure (SOP) formulation, physiological tri-gas calibration, MEA batch verification, contamination troubleshooting, and laboratory workflow optimization.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Protocol Standardization & SOP Drafting</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Incubator Gas & Temperature Calibration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Quality Assurance (QA/QC) & KPI Auditing</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to enquire regarding Comprehensive Embryology Laboratory Support (SOP formulation, lab operations, batch verification).'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Lab Support (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Service 2: IVF Consumables & Culture Media */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Service 02
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    2. IVF Consumables & Culture Media
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    Authentic Media, Gradients & Sterile Labware
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Authorized distribution of genuine IVF culture media, sperm washing formulations, density gradients (Sil-Select, PureSperm), vitrification solutions (Cryotech), embryo transfer catheters, and Falcon tissue culture plasticware with 2°C–8°C cold-chain guarantee.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>2°C–8°C Cold Chain Monitored Logistics</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Batch Sterility & MEA Endotoxin Certificates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Rapid 24-Hour Dispatch Pan-India</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to request an official quotation for IVF Consumables & Culture Media.'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request Media Quotation (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Service 3: Complete Instrumentation Solutions */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Service 03
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    3. Complete Instrumentation Solutions
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    IVF Workstations, Incubators & ICSI Rigs
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Supply, commissioning, and validation of essential IVF hardware: Class II dual-operator laminar airflow workstations, benchtop tri-gas hypoxic incubators, sub-micron ICSI micromanipulators, active anti-vibration platforms, and stereomicroscopes.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>IQ / OQ / PQ Validation Protocols</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Class II Dual Heated Stage Workstations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Annual Maintenance Contracts (AMC) & Loaner Units</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to enquire regarding Complete Instrumentation Solutions & Equipment (Incubators, Workstations, Micromanipulators).'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Instrumentation (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Service 4: Frozen Semen Sample Support */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs">
                    <Snowflake className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Service 04
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    4. Frozen Semen Sample Support
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    Tested Donor Semen & LN2 Cryo Logistics
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Certified liquid nitrogen cryo-shipping of fully screened, tested, and quality-assured frozen donor semen and autologous cryo-preserved samples in validated LN2 dry vapor shippers complying with national ART regulatory board guidelines.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Infectious Disease & Genetic Screening Tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Dry Vapor LN2 Shipper Temperature Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Regulatory Compliance Registers & Documentation</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to enquire regarding Frozen Semen Sample Support & LN2 Cryo Logistics.'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Cryo Sample Support (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Service 5: IVF & IUI Laboratory Setup Support */}
            <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Service 05
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    5. IVF & IUI Laboratory Setup Support
                  </h3>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    Turnkey Cleanroom Infrastructure & Licensing
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Turnkey architectural planning and infrastructure engineering for modern IVF and IUI centers. Architectural floor plans, ISO Class 5 modular cleanrooms, medical gas pipeline manifolds (CO2/N2), positive airlock systems, and regulatory licensing compliance.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Turnkey ISO Class 5 Modular Cleanrooms</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Medical Gas Manifolds (CO2/N2) & Airlocks</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>National ART Regulatory Licensing Advisory</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to request a consultation for Turnkey IVF & IUI Laboratory Setup Support.'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 border border-emerald-200 hover:border-emerald-600 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request Setup Consultation (WhatsApp)</span>
                </button>
              </div>
            </div>

            {/* Quick Helper Card */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-200 p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Need Rapid Assistance?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our technical coordinators and clinical specialists in Kolkata provide instant phone and WhatsApp support across India.
                </p>
                <div className="pt-2 text-xs space-y-1">
                  <div className="text-slate-700 font-medium">Direct Hotline:</div>
                  <a
                    href="tel:+919875406943"
                    className="text-base font-bold text-teal-700 font-mono block hover:underline"
                  >
                    +91 98754 06943
                  </a>
                </div>
              </div>
              <div className="pt-4 border-t border-teal-200/60">
                <span className="text-[11px] text-teal-800 font-semibold block">
                  Delivery within 24 hours of order placement
                </span>
              </div>
            </div>
          </div>

          {/* SERVICE #6: Senior Embryologist – Freelance & Backup Support */}
          {/* REQUIREMENT: Visually unique, premium, and highly prominent */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-6 sm:p-10 ring-4 ring-amber-400/20">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Visual Highlight */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                  <img
                    src="/images/assets/senior_embryologist_backup.jpg"
                    alt="Senior Embryologist – Freelance & Backup Support"
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/images/assets/fertility_hero_lab_1790663824905.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-slate-950/80 backdrop-blur-md py-2 px-3 rounded-xl border border-white/10">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Seasoned Clinical Experts
                    </span>
                    <span className="text-teal-300 font-mono text-[11px]">Pan-India Mobility</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Content & CTA */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-teal-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>FLAGSHIP CLINICAL SERVICE • SERVICE 06</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    6. Senior Embryologist – Freelance & Backup Support
                  </h3>

                  <p className="text-sm sm:text-base text-teal-200 font-medium">
                    Immediate on-demand clinical expertise, emergency leave coverage, batch cycle execution & laboratory KPI optimization.
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Never compromise clinical pregnancy rates during unexpected staff absences, peak holiday cycles, or high-difficulty cases. ART Medical provides accredited Senior Embryologists on-demand for freelance cycle handling, difficult ICSI cases, PGT trophectoderm biopsies, vitrification protocols, and independent laboratory audits.
                </p>

                {/* Key Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Emergency & Batch Coverage</h5>
                      <p className="text-[11px] text-slate-300">Rapid on-site standby for cycle surges & emergency leaves.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <Cpu className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Advanced Micromanipulation</h5>
                      <p className="text-[11px] text-slate-300">High-yield ICSI, IMSI, PICSI, and Laser PGT Biopsy execution.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <Snowflake className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">Vitrification & Warming</h5>
                      <p className="text-[11px] text-slate-300">Certified &gt;98% blastocyst post-thaw survival protocols.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-white">QA/QC & Blastocyst Audits</h5>
                      <p className="text-[11px] text-slate-300">Deep lab protocol inspection to elevate blastocyst conversion rates.</p>
                    </div>
                  </div>
                </div>

                {/* Requirement CTA: “Enquire About Embryologist Support” */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() =>
                      openWhatsApp(
                        'Hello ART Medical, I would like to enquire about Senior Embryologist – Freelance & Backup Support for our clinical center.'
                      )
                    }
                    className="px-6 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-teal-400 text-slate-950 hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-950" />
                    <span>Enquire About Embryologist Support</span>
                  </button>

                  <button
                    onClick={() => {
                      setPage('embryologist-support');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Scope & Form</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-300 ml-auto">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Response within 2–4 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
