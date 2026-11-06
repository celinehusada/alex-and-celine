import React, { useId } from 'react';
import { aCounter, aOutline, toPath } from '../utils/sunShape';

interface MonogramProps {
  className?: string;
  sunColor?: string;
  moonColor?: string;
}

// The A outline and its counter in one path; evenodd cuts the counter out
const aPath = `${toPath(aOutline)} ${toPath(aCounter)}`;

/**
 * A&C monogram: the crescent moon forms the "C" (Celine),
 * and the sun, reshaped into an "A" (Alex), nestles inside it.
 */
export function Monogram({ className = '', sunColor = '#4F5A33', moonColor = '#6B1610' }: MonogramProps) {
  const maskId = `monogram-${useId().replace(/:/g, '')}`;

  return (
    <svg viewBox="36 36 144 128" className={className} aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="220" height="220" fill="white" />
          <circle cx="130" cy="100" r="58" fill="black" />
        </mask>
      </defs>
      <circle cx="100" cy="100" r="60" fill={moonColor} mask={`url(#${maskId})`} />
      <path d={aPath} fill={sunColor} fillRule="evenodd" />
    </svg>);

}