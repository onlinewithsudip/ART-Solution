import React from 'react';
import { useSite } from '../context/SiteContext';
import { Page } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { BrandIcon } from './BrandIcon';

export const Footer: React.FC = () => {
  const {
    websiteContent,
    themeSettings,
    setPage,
    setProductCategoryFilter,
    openWhatsApp,
  } = useSite();

  const handleNav = (targetPage: Page) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setProductCategoryFilter(cat);
    setPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Certification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {themeSettings.logoUrl ? (
                <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center">
                  <img
                    src={themeSettings.logoUrl}
                    alt={themeSettings.logoText || 'ART Medical'}
                    style={{ height: '38px' }}
                    className="w-auto object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== `${window.location.origin}/logo.svg`) {
                        target.src = '/logo.svg';
                      }
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  <BrandIcon
                    name={themeSettings.logoIcon || 'Activity'}
                    customIconUrl={themeSettings.customIconUrl}
                    className="w-5 h-5"
                  />
                </div>
              )}

              {themeSettings.logoType !== 'image' && (
                <div>
                  <span className="font-bold text-lg text-white tracking-tight block">
                    {themeSettings.logoText || 'ART Medical'}
                  </span>
                  <span className="text-[11px] text-teal-400 font-semibold tracking-wider uppercase">
                    {themeSettings.logoTagline || 'Offering Full Solution'}
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {websiteContent.footer.tagline}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{websiteContent.footer.certificationBadge || 'ISO 13485:2016 & CE Mark Certified'}</span>
            </div>

            {(websiteContent.footer.linkedinUrl || websiteContent.footer.twitterUrl || websiteContent.footer.facebookUrl || websiteContent.footer.youtubeUrl) && (
              <div className="pt-2 flex items-center gap-3 text-xs">
                {websiteContent.footer.linkedinUrl && (
                  <a
                    href={websiteContent.footer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {websiteContent.footer.twitterUrl && (
                  <a
                    href={websiteContent.footer.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Twitter/X
                  </a>
                )}
                {websiteContent.footer.facebookUrl && (
                  <a
                    href={websiteContent.footer.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {websiteContent.footer.youtubeUrl && (
                  <a
                    href={websiteContent.footer.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-teal-400 font-medium text-teal-300 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('embryologist-support')}
                  className="hover:text-amber-300 font-semibold text-amber-400 transition-colors"
                >
                  Senior Embryologist Support ⭐
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-white transition-colors"
                >
                  Products & Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Facility & Lab Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Equipment Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Solutions & Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleCategoryClick('IUI & IVF Media')}
                  className="hover:text-white transition-colors text-left"
                >
                  IUI & IVF Media (Fertipro, Hitech, Origio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Needles, Catheters & Cannulas')}
                  className="hover:text-white transition-colors text-left"
                >
                  Wallace & Allwin Catheters & Needles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Cryopreservation & Vitrification')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cryotech Vitrification & Cryovials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Disposables & Labware')}
                  className="hover:text-white transition-colors text-left"
                >
                  Falcon 35mm/60mm/4-Well Dishes & Tubes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Micropipettes & Stripper Tips')}
                  className="hover:text-white transition-colors text-left"
                >
                  Holding & ICSI Injection Pipettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Clinical Registers & Documentation')}
                  className="hover:text-white transition-colors text-left"
                >
                  ART Compliance Clinical Registers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Get in Touch — ART MEDICAL
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-medium block">ART MEDICAL</span>
                  <span>{websiteContent.contact.address}</span>
                  {websiteContent.contact.landmark && (
                    <span className="text-teal-400 block text-[11px] pt-0.5">
                      Landmark: {websiteContent.contact.landmark}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5 font-mono">
                  <a
                    href="tel:+919875406943"
                    className="hover:text-white transition-colors font-bold text-slate-200 block"
                  >
                    +91 98754 06943
                  </a>
                  <a
                    href="tel:+917439688406"
                    className="hover:text-white transition-colors text-slate-400 block"
                  >
                    +91 74396 88406
                  </a>
                  <a
                    href="tel:+919593076979"
                    className="hover:text-white transition-colors text-slate-400 block"
                  >
                    +91 95930 76979
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a
                  href={`mailto:${websiteContent.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {websiteContent.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{websiteContent.contact.workingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openWhatsApp('Hello, I am contacting you from the website footer regarding IVF solutions.')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer & Copyright */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>{websiteContent.footer.copyrightText}</p>
          <p className="text-center md:text-right text-[11px] text-slate-500 max-w-xl">
            {websiteContent.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
