import React, { useId } from 'react';

interface MoonGlyphProps {
  className?: string;
  stars?: boolean;
}

export function MoonGlyph({ className = '', stars = true }: MoonGlyphProps) {
  const maskId = `crescent-${useId().replace(/:/g, '')}`;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect width="200" height="200" fill="white" />
          <circle cx="130" cy="100" r="58" fill="black" />
        </mask>
      </defs>
      <circle cx="100" cy="100" r="60" fill="currentColor" mask={`url(#${maskId})`} />
      {stars &&
      <g fill="currentColor">
          <circle cx="168" cy="40" r="2" opacity="0.8" />
          <circle cx="182" cy="96" r="1.4" opacity="0.5" />
          <circle cx="150" cy="168" r="1.6" opacity="0.6" />
          <circle cx="24" cy="34" r="1.2" opacity="0.4" />
        </g>
      }
    </svg>);

}