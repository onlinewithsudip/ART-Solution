import React from 'react';
import {
  Activity,
  HeartPulse,
  Dna,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Layers,
  Building2,
  Flame,
  Atom,
  FlaskConical,
  Zap,
} from 'lucide-react';

export const AVAILABLE_ICONS = [
  { id: 'Activity', label: 'Pulse Wave (Activity)', icon: Activity },
  { id: 'HeartPulse', label: 'Heart Pulse (Cardio/Embryo)', icon: HeartPulse },
  { id: 'Dna', label: 'DNA Helix (Genetics)', icon: Dna },
  { id: 'FlaskConical', label: 'Lab Flask (Biotech)', icon: FlaskConical },
  { id: 'ShieldCheck', label: 'Shield & Quality Check', icon: ShieldCheck },
  { id: 'Stethoscope', label: 'Stethoscope (Clinical)', icon: Stethoscope },
  { id: 'Layers', label: 'Cleanroom Layers', icon: Layers },
  { id: 'Sparkles', label: 'Innovation Sparkles', icon: Sparkles },
  { id: 'Building2', label: 'Medical Facility Center', icon: Building2 },
  { id: 'Flame', label: 'Thermal Incubation', icon: Flame },
  { id: 'Atom', label: 'Atomic / Cellular', icon: Atom },
  { id: 'Zap', label: 'Electro-Precision', icon: Zap },
];

interface BrandIconProps {
  name?: string;
  customIconUrl?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  name = 'Activity',
  customIconUrl,
  className = 'w-6 h-6',
  style,
}) => {
  if (customIconUrl) {
    return (
      <img
        src={customIconUrl}
        alt="Brand icon"
        className={`${className} object-contain`}
        style={style}
      />
    );
  }

  const found = AVAILABLE_ICONS.find((item) => item.id.toLowerCase() === (name || '').toLowerCase());
  const IconComponent = found ? found.icon : Activity;

  return <IconComponent className={className} style={style} />;
};
