import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  Award,
  UserCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck2,
  Cpu,
  Snowflake,
  Mail,
  Activity,
  ArrowRight,
  Shield,
  Zap,
} from 'lucide-react';
import { ART_MEDICAL_CONFIG } from '../config/contact';

export const EmbryologistSupportPage: React.FC = () => {
  const { setPage, openWhatsApp } = useSite();

  return (
    <div className="space-y-16 pb-24">
      {/* Premium Header Banner */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white py-16 sm:py-20 border-b border-amber-400/20 overflow-hidden">
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => setPage('services')}
              className="hover:text-white transition-colors"
            >
              Our Services
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">
              Senior Embryologist Support
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Dedicated Clinical Desk • High-Priority Standby</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Senior Embryologist – Freelance & Backup Support
              </h1>
              <p className="text-base sm:text-lg text-teal-200 font-medium leading-relaxed">
                Guaranteed clinical continuity, emergency cycle coverage, and master-level embryology procedures for IVF clinics across India.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                When your regular embryologist is on planned leave, facing an emergency, or your center experiences a sudden surge in ovum pick-ups (OPU) and ICSI cycles, ART Medical deploys experienced, certified Senior Embryologists on-site with zero compromise on fertilization or blastocyst conversion rates.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, I would like to urgently check Senior Embryologist freelance and backup availability for our IVF clinic.'
                    )
                  }
                  className="px-6 py-3.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Standby Desk</span>
                </button>

                <button
                  onClick={() =>
                    openWhatsApp(
                      'Hello ART Medical, our center would like to book a Senior Embryologist for an upcoming batch of ICSI / IVF cycles.'
                    )
                  }
                  className="px-5 py-3.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Book Cycle Standby (WhatsApp)</span>
                </button>

                <a
                  href={`tel:${ART_MEDICAL_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                  className="px-4 py-3.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Emergency Desk: {ART_MEDICAL_CONFIG.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl">
                <img
                  src="/images/assets/senior_embryologist_backup.jpg"
                  alt="Senior Embryologist – Freelance & Backup Support"
                  className="w-full h-72 sm:h-80 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/assets/fertility_hero_lab_1790663824905.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-semibold mb-1">
                    <span>Clinical Experience: 10+ Years</span>
                    <span className="text-teal-300">Pan-India Support</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Expertise across ICSI, IMSI, Laser PGT biopsy, and high-yield blastocyst culture systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Competencies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Clinical Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Full Clinical Embryology Coverage
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Our Senior Embryologists integrate seamlessly with your existing laboratory team, equipment, and clinical SOPs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Emergency & Short-Notice Relief
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rapid on-site mobilization within 24–48 hours when your in-house embryologist is unavailable due to medical emergencies, personal leave, or unexpected clinical absence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Batch Cycle IVF Execution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scheduled multi-day batch cycle handling for busy centers. High-throughput ovum pick-up coordination, semen preparation, fertilization assessment, and embryo transfers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Advanced ICSI & Micromanipulation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Precision intracytoplasmic sperm injection for difficult cases: severe male factor, surgically retrieved sperm (TESA/PESA/Micro-TESE), fragile zona, and mature oocyte handling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              PGT Biopsy & Laser Hatching
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certified laser-assisted trophectoderm biopsy for preimplantation genetic testing (PGT-A / PGT-M / PGT-SR) with minimal cellular trauma and optimal cell tubing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <Snowflake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Vitrification & Warming Master Protocols
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cryotech and standard vitrification execution delivering &gt;98% blastocyst survival. Critical for surplus embryo preservation and frozen embryo transfer (FET) programs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Laboratory QA/QC & KPI Auditing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigorous laboratory audits covering air quality, incubation gas concentrations, media lots, temperature consistency, and troubleshooting suboptimal blastocyst conversion rates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dedicated Standby Booking Desk (Zero Forms) */}
      <section id="embryologist-desk" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-amber-400/80 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Direct Standby Booking Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Reserve Senior Embryologist Standby on WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No tedious forms to fill. Choose your required clinical support module below to instantly initiate a direct WhatsApp briefing with the ART Medical Senior Embryology Desk ({ART_MEDICAL_CONFIG.whatsappDisplay}).
            </p>
          </div>

          {/* Standby Support Modules Grid with Direct WhatsApp Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Module 1: Emergency & Short-Notice Coverage */}
            <div className="p-5 rounded-2xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/70 to-white flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wide">
                    Priority Standby
                  </span>
                  <Zap className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Urgent Freelance Coverage & Emergency Standby
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediate emergency coverage for sudden embryologist illness, unplanned absences, or high-volume cycle surges. Rapid on-site deployment across India.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Response within 30 minutes on WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Immediate travel logistics mobilization</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    'Hello ART Medical, our center has an URGENT need for Senior Embryologist freelance backup and emergency cycle coverage. Please confirm immediate availability.'
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Urgent Coverage on WhatsApp</span>
              </button>
            </div>

            {/* Module 2: Scheduled Batch Cycle Embryologist */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4 hover:border-teal-400 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-bold text-[10px] uppercase tracking-wide">
                    Planned Batch
                  </span>
                  <Calendar className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Scheduled Batch Cycle Embryology Leadership
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  End-to-end laboratory cycle management for monthly IVF batches: OPU denudation, ICSI / IMSI, embryo culture, blastocyst grading, and embryo transfer.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Multi-day batch scheduling in advance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Comprehensive batch documentation & QC logs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    'Hello ART Medical, our center would like to schedule a Senior Embryologist for an upcoming planned IVF / ICSI cycle batch.'
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Schedule Batch Cycle on WhatsApp</span>
              </button>
            </div>

            {/* Module 3: PGT Biopsy & Laser Specialist */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4 hover:border-sky-400 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-bold text-[10px] uppercase tracking-wide">
                    Advanced Genetics
                  </span>
                  <Cpu className="w-4 h-4 text-sky-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  PGT Trophectoderm Biopsy & Laser Hatching
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialist micromanipulator execution for Day 5/6 trophectoderm biopsy, cellular tubing protocols, and ultra-rapid Cryotech vitrification.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Near 100% cell integrity & post-thaw survival</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Validated tubing protocol for genetic labs</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    'Hello ART Medical, our clinic requires Senior Embryologist support for PGT Trophectoderm Biopsy and Laser Assisted Hatching.'
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Biopsy Specialist on WhatsApp</span>
              </button>
            </div>

            {/* Module 4: Protocol Audit & Accreditation */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between space-y-4 hover:border-indigo-400 hover:shadow-md transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 font-bold text-[10px] uppercase tracking-wide">
                    QA & SOP Audit
                  </span>
                  <FileCheck2 className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Lab Protocol Audit & KPI Rate Optimization
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In-depth clinical audit to elevate fertilization and blastocyst conversion rates. Review of media lot protocols, VOC filtration, and embryologist SOP training.
                </p>
                <div className="pt-2 text-[11px] font-semibold text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>ESHRE & ART Act compliance benchmarking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Comprehensive actionable audit scorecard</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    'Hello ART Medical, our center would like to request an on-site IVF Laboratory Protocol Audit and Pregnancy Rate Optimization review.'
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request Lab Audit on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Urgent Direct Helpline Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  Direct Clinical Embryology Hotline
                </div>
                <div className="text-[11px] text-slate-300">
                  Call directly for emergency weekend standby or immediate cycle dispatch
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${ART_MEDICAL_CONFIG.phonePrimary.replace(/\s+/g, '')}`}
                className="px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call {ART_MEDICAL_CONFIG.whatsappDisplay}</span>
              </a>
              <button
                onClick={() =>
                  openWhatsApp(
                    'Hello ART Medical Senior Embryology Desk, please contact me regarding clinical cycle standby availability.'
                  )
                }
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
