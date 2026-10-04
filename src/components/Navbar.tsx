import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Page } from '../types';
import {
  MessageCircle,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import { BrandIcon } from './BrandIcon';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    themeSettings,
    websiteContent,
    openWhatsApp,
  } = useSite();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Our Services', page: 'services' },
    { label: 'Products & Equipment', page: 'products' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (targetPage: Page) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {websiteContent.header?.topRibbonKicker || 'ISO 13485 & CE Mark Certified'}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              {websiteContent.header?.topRibbonSubtitle || 'Comprehensive Embryology & IVF Solutions'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openWhatsApp()}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">
                {websiteContent.header?.topRibbonPhone || websiteContent.contact.phone1}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              {themeSettings.logoUrl ? (
                <img
                  src={themeSettings.logoUrl}
                  alt={themeSettings.logoText || 'ART Medical'}
                  style={{ height: `${themeSettings.logoHeight || 42}px` }}
                  className="w-auto object-contain transition-transform group-hover:scale-102"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== `${window.location.origin}/logo.svg`) {
                      target.src = '/logo.svg';
                    }
                  }}
                />
              ) : (
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105"
                  style={{ backgroundColor: themeSettings.primaryColor }}
                >
                  <BrandIcon
                    name={themeSettings.logoIcon || 'Activity'}
                    customIconUrl={themeSettings.customIconUrl}
                    className="w-6 h-6 stroke-[2.2]"
                  />
                </div>
              )}

              {themeSettings.logoType !== 'image' && (
                <div className="flex flex-col">
                  <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-slate-700 transition-colors">
                    {themeSettings.logoText || 'ART Medical'}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-1">
                    {themeSettings.logoTagline || 'Offering Full Solution'}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = page === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative py-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('embryologist-support')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-950" />
              <span>Embryologist Support</span>
            </button>

            <button
              onClick={() => openWhatsApp('Hello ART Medical, I would like to request an equipment and consumables quotation.')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() =>
                openWhatsApp(
                  'Hello ART Medical, I would like to request an official quotation for IVF consumables, culture media, and laboratory solutions.'
                )
              }
              style={{
                backgroundColor: themeSettings.ctaColor,
                color: themeSettings.ctaTextColor,
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold shadow-xs hover:brightness-110 active:scale-98 transition-all whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>{websiteContent.header?.ctaButtonText || 'Request Quotation'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    page === item.page
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat via WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsApp(
                    'Hello ART Medical, I would like to request an official quotation for IVF consumables, culture media, and laboratory solutions.'
                  );
                }}
                style={{
                  backgroundColor: themeSettings.ctaColor,
                  color: themeSettings.ctaTextColor,
                }}
                className="w-full py-2.5 rounded-lg text-sm font-semibold shadow-xs text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Request Quotation (WhatsApp)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
