import React from 'react';
import { useSite } from '../context/SiteContext';

interface BrandLogoProps {
  height?: number;
  className?: string;
  showText?: boolean;
  lightBackground?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  height = 44,
  className = '',
  showText,
  lightBackground = true,
  onClick,
}) => {
  const { themeSettings } = useSite();

  const effectiveLogoUrl = themeSettings.logoUrl || '/logo.svg';
  const shouldShowText =
    showText !== undefined
      ? showText
      : themeSettings.logoType !== 'image';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={effectiveLogoUrl}
          alt={themeSettings.logoText || 'ART Medical'}
          style={{ height: `${height}px` }}
          className={`w-auto object-contain transition-transform duration-200 ${
            onClick ? 'group-hover:scale-105' : ''
          }`}
          onError={(e) => {
            // Graceful fallback to SVG logo if local image has issues
            const target = e.currentTarget;
            if (target.src !== `${window.location.origin}/logo.svg`) {
              target.src = '/logo.svg';
            }
          }}
        />
      </div>

      {shouldShowText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-extrabold text-lg sm:text-xl tracking-tight leading-tight transition-colors ${
              lightBackground
                ? 'text-slate-900 group-hover:text-teal-700'
                : 'text-white group-hover:text-teal-300'
            }`}
          >
            {themeSettings.logoText || 'ART Medical'}
          </span>
          <span
            className={`text-[11px] font-semibold tracking-wider uppercase mt-0.5 ${
              lightBackground ? 'text-teal-700' : 'text-teal-400'
            }`}
          >
            {themeSettings.logoTagline || 'Offering Full Solution'}
          </span>
        </div>
      )}
    </div>
  );
};
