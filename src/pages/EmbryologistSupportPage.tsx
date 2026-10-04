import React, { useState } from 'react';
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
  Send,
  AlertCircle,
  HelpCircle,
  MapPin,
  Mail,
  User,
  Activity,
} from 'lucide-react';
import {
  ART_MEDICAL_CONFIG,
  buildWhatsAppUrl,
  formatEmbryologistEnquiryWhatsApp,
  EmbryologistEnquiryPayload,
} from '../config/contact';

export const EmbryologistSupportPage: React.FC = () => {
  const { setPage, submitInquiry, openWhatsApp } = useSite();

  const [form, setForm] = useState<EmbryologistEnquiryPayload>({
    name: '',
    title: 'Dr.',
    clinicName: '',
    location: '',
    phone: '',
    email: '',
    supportType: 'Urgent Freelance Coverage (Emergency / Short Notice)',
    datesNeeded: '',
    estimatedCases: '',
    specificRequirements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const supportOptions = [
    'Urgent Freelance Coverage (Emergency / Short Notice)',
    'Scheduled Batch Cycle Embryologist',
    'Weekend / Holiday Backup Standby',
    'PGT Biopsy & Laser Assisted Hatching Execution',
    'Lab Protocol Audit & Pregnancy Rate Optimization',
    'New Lab Commissioning, SOP Setup & Training',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!form.name.trim()) {
      setErrorMsg('Please enter the doctor or director name.');
      return;
    }
    if (!form.clinicName.trim()) {
      setErrorMsg('Please enter your clinic or hospital name.');
      return;
    }
    if (!form.phone.trim()) {
      setErrorMsg('Please enter a valid phone or WhatsApp number.');
      return;
    }

    // 1. Build comprehensive WhatsApp message
    const waMessage = formatEmbryologistEnquiryWhatsApp(form);
    const waUrl = buildWhatsAppUrl(waMessage);

    // 2. Log in application database for records
    submitInquiry({
      name: `${form.title ? form.title + ' ' : ''}${form.name.trim()}`,
      clinicName: form.clinicName.trim(),
      phone: form.phone.trim(),
      email: form.email?.trim() || 'Not specified',
      country: form.location.trim() || 'India',
      inquiryType: 'Senior Embryologist – Freelance & Backup Support',
      message: `Support Type: ${form.supportType} | Dates: ${form.datesNeeded || 'TBD'} | Cases: ${form.estimatedCases || 'TBD'} | Notes: ${form.specificRequirements || 'None'}`,
    });

    // 3. Open WhatsApp directly (safely inside iframe or new tab)
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = waUrl;
    }

    setIsSubmitted(true);
  };

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
                  <span>Enquire via WhatsApp</span>
                </button>

                <a
                  href="#embryologist-form"
                  className="px-5 py-3.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-lg flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Fill Booking Form</span>
                </a>

                <a
                  href={`tel:${ART_MEDICAL_CONFIG.phonePrimary}`}
                  className="px-4 py-3.5 rounded-xl text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Desk: {ART_MEDICAL_CONFIG.whatsappDisplay}</span>
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

      {/* Main Dedicated Enquiry Form Section */}
      <section id="embryologist-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-amber-400/80 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Dedicated Enquiry Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Enquire About Senior Embryologist Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Please provide your clinic details, requirement type, and schedule. Submitting this form immediately transmits the full case briefing directly to the configured ART Medical WhatsApp Desk ({ART_MEDICAL_CONFIG.whatsappDisplay}) for priority confirmation.
            </p>
          </div>

          {/* Success Banner */}
          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-emerald-950">
                  Enquiry Dispatched to ART Medical WhatsApp
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Your full case briefing has been opened on WhatsApp. If WhatsApp did not open automatically, click the button below to connect with our coordinator.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const waMessage = formatEmbryologistEnquiryWhatsApp(form);
                    window.open(buildWhatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Re-Open WhatsApp Message</span>
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Edit Enquiry Details
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Row 1: Doctor / Contact Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Title
                  </label>
                  <select
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none bg-slate-50"
                  >
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>

                <div className="sm:col-span-9 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Clinician / Medical Director Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Clinic & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Clinic / IVF Center Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                    placeholder="e.g. Apex Fertility & IVF Institute"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>City & State *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Kolkata, West Bengal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98300 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Official Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="director@apexfertility.in"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Support Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span>Embryologist Support Category *</span>
                </label>
                <select
                  value={form.supportType}
                  onChange={(e) => setForm({ ...form, supportType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none bg-slate-50"
                >
                  {supportOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Dates & Estimated Cases */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dates / Schedule Required</span>
                  </label>
                  <input
                    type="text"
                    value={form.datesNeeded}
                    onChange={(e) => setForm({ ...form, datesNeeded: e.target.value })}
                    placeholder="e.g. 15th to 20th November 2026 or Immediate"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span>Estimated Number of Cases</span>
                  </label>
                  <input
                    type="text"
                    value={form.estimatedCases}
                    onChange={(e) => setForm({ ...form, estimatedCases: e.target.value })}
                    placeholder="e.g. 10 OPU / ICSI cycles"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 6: Specific Requirements & Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Specific Clinical Notes & Requirements
                </label>
                <textarea
                  rows={3}
                  value={form.specificRequirements}
                  onChange={(e) => setForm({ ...form, specificRequirements: e.target.value })}
                  placeholder="Detail any specific micromanipulator model, culture media preferences, PGT laser setup, or special clinical considerations..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-teal-400 text-slate-950 hover:brightness-105 transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Send Enquiry Directly to ART Medical WhatsApp</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  All submitted case information is strictly confidential and immediately routed to the ART Medical clinical embryology coordination desk (+91 98754 06943).
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
