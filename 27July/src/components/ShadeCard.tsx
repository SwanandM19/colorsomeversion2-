import { getContrastColor } from '../lib/utils';
import type { Shade } from '../lib/supabase';

interface ShadeCardProps {
  shade: Shade;
  size?: 'sm' | 'md' | 'lg';
  showInfo?: boolean;
}

export function ShadeCard({ shade, size = 'md', showInfo = true }: ShadeCardProps) {
  const textColor = getContrastColor(shade.hex_code);
  const sizeClasses = {
    sm: 'h-20',
    md: 'h-32',
    lg: 'h-44',
  };

  return (
    <div className="group cursor-pointer reveal">
      <div
        className={`${sizeClasses[size]} rounded-2xl relative overflow-hidden ring-1 ring-black/5 shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out group-hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)] group-hover:-translate-y-1`}
      >
        <div className="absolute inset-0" style={{ backgroundColor: shade.hex_code }} />
        {/* Soft glossy highlight — reads like an actual paint chip rather than a flat swatch */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-2xl" />

        {/* Hex chip, appears on hover without covering the colour */}
        <span
          className="absolute top-2.5 right-2.5 text-[9px] font-mono px-2 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(255,255,255,0.22)', color: textColor }}
        >
          {shade.hex_code}
        </span>
      </div>
      {showInfo && (
        <div className="mt-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-serif text-sm font-semibold text-charcoal truncate">{shade.name}</p>
            {shade.collection && (
              <p className="text-[10px] text-charcoal-muted mt-0.5">{shade.collection}</p>
            )}
          </div>
          <span className="text-[9px] font-mono text-charcoal-muted/60 shrink-0 pt-0.5">{shade.hex_code}</span>
        </div>
      )}
    </div>
  );
}
