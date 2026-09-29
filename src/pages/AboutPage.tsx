import React from 'react';
import { useSite } from '../context/SiteContext';
import {
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Award,
  Users,
  MessageCircle,
  Building,
  Sparkles,
} from 'lucide-react';
import cleanroomFacilityImg from '../assets/images/gallery_cleanroom_setup_1790663877901.jpg';
import labHeroImg from '../assets/images/fertility_hero_lab_1790663824905.jpg';

export const AboutPage: React.FC = () => {
  const { websiteContent, themeSettings, setPage, openWhatsApp } = useSite();

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={() => setPage('home')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-200">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {websiteContent.about.title}
          </h1>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
            {websiteContent.about.subtitle}
          </p>
        </div>
      </section>

      {/* Main Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: themeSettings.primaryColor }}
            >
              Our Engineering Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Eliminating Environmental Volatility in Clinical Embryology
            </h2>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>{websiteContent.about.storyParagraph1}</p>
              <p>{websiteContent.about.storyParagraph2}</p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openWhatsApp('Hello, I would like to learn more about your turnkey laboratory track record.')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Speak with Turnkey Lead</span>
              </button>
              <button
                onClick={() => setPage('products')}
                style={{
                  backgroundColor: themeSettings.ctaColor,
                  color: themeSettings.ctaTextColor,
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs hover:brightness-110 transition-all"
              >
                <span>Browse Lab Equipment</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={websiteContent.about.aboutImage || cleanroomFacilityImg}
                alt="IVF Cleanroom Engineering"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">
                  Cleanroom Modular Build
                </span>
                <span className="text-emerald-600 font-mono font-medium">
                  ISO 14644-1 Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: themeSettings.primaryColor }}
            >
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {websiteContent.about.mission}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: themeSettings.ctaColor }}
            >
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {websiteContent.about.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-xs font-bold uppercase tracking-wider block"
              style={{ color: themeSettings.primaryColor }}
            >
              Our Operational Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              The Principles Behind Every Laboratory Delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {websiteContent.about.values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs"
              >
                <div className="text-sm font-mono font-bold text-slate-400">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Regulatory Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: themeSettings.primaryColor }}
          >
            International Benchmarks
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Certified Quality & Compliance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {websiteContent.about.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
