import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { websiteContent, openWhatsApp } = useSite();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    openWhatsApp('Hello ART MEDICAL, I would like to consult regarding your IVF equipment, media and supplies.');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Card */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200 text-xs text-slate-700 animate-in fade-in slide-in-from-right-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Chat directly with our IVF specialist</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        title="Connect on WhatsApp"
        aria-label="Connect on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-current stroke-none group-hover:rotate-12 transition-transform duration-200" />
      </button>
    </div>
  );
};
