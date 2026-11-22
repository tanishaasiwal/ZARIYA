import React, {useId} from 'react';
import {SafeImage} from './SafeImage';

/**
 * Global SVG clipPath definition for the sculpted Rajasthani Palace Gate (Mehrab) silhouette.
 * Mounted once at app root so `.clip-rajasthani-gate` works reliably across all routes.
 */
export function RajasthaniGateClipDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
      <defs>
        <clipPath id="zariya-rajasthani-gate-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0.011 Q0.553,0.016 0.593,0.063 Q0.66,0.047 0.707,0.1 Q0.78,0.089 0.82,0.153 Q0.893,0.153 0.92,0.221 Q0.967,0.232 0.967,0.284 L0.967,0.937 L0.993,0.958 L0.993,0.995 L0.007,0.995 L0.007,0.958 L0.033,0.937 L0.033,0.284 Q0.033,0.232 0.08,0.221 Q0.107,0.153 0.18,0.153 Q0.22,0.089 0.293,0.1 Q0.34,0.047 0.407,0.063 Q0.447,0.016 0.5,0.011 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface RajasthaniGateCardProps {
  src: string;
  alt: string;
  fallbackTitle?: string;
  priority?: boolean;
  imageClassName?: string;
  bottomGradientHeight?: string;
  showPillarsDetail?: boolean;
  children?: React.ReactNode;
}

export function RajasthaniGateCard({
  src,
  alt,
  fallbackTitle,
  priority = false,
  imageClassName = 'object-cover object-top',
  bottomGradientHeight = 'h-[42%]',
  showPillarsDetail = true,
  children,
}: RajasthaniGateCardProps) {
  const uid = useId().replace(/:/g, '');
  const gradId = `rajasthani-gate-gold-${uid}`;

  return (
    <div className="clip-rajasthani-gate relative aspect-[300/380] w-full overflow-hidden bg-[#123F3A]">
      <SafeImage
        src={src}
        alt={alt}
        fallbackTitle={fallbackTitle}
        priority={priority}
        className={`h-full w-full ${imageClassName}`}
      />

      {children && (
        <div
          className={`pointer-events-none absolute inset-x-[8%] bottom-[5.8%] ${bottomGradientHeight} bg-gradient-to-t from-[#09211E] via-[#123F3A]/85 to-transparent`}
          aria-hidden="true"
        />
      )}

      {/* Carved Rajasthani Palace Archway Border & Gold Filigree */}
      <svg
        viewBox="0 0 300 380"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="300" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F3DFA7" />
            <stop offset="45%" stopColor="#C3A66B" />
            <stop offset="100%" stopColor="#947439" />
          </linearGradient>
        </defs>

        <path
          d="M150 4 Q166 6 178 24 Q198 18 212 38 Q234 34 246 58 Q268 58 276 84 Q290 88 290 108 V356 L298 364 V378 H2 V364 L10 356 V108 Q10 88 24 84 Q32 58 54 58 Q66 34 88 38 Q102 18 122 24 Q134 6 150 4 Z M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
          fill="#123F3A"
          fillOpacity="0.94"
        />

        <path
          d="M150 5 Q165 7 177 24.5 Q197 19 211 38.5 Q233 35 245 58.5 Q267 59 275 84.5 Q289 89 289 108 V356 L297 364 V376.5 H3 V364 L11 356 V108 Q11 89 25 84.5 Q33 59 55 58.5 Q67 35 89 38.5 Q103 19 123 24.5 Q135 7 150 5 Z"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        <path
          d="M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path d="M150 6 L154 12 L150 16.5 L146 12 Z" fill="#F3DFA7" />

        {showPillarsDetail && (
          <>
            <line x1="17" y1="112" x2="17" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
            <line x1="283" y1="112" x2="283" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
            <rect x="11" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />
            <rect x="276" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />
            <line x1="8" y1="364" x2="292" y2="364" stroke="#C3A66B" strokeOpacity="0.6" strokeWidth="1" />
          </>
        )}
      </svg>

      {children && (
        <div className="absolute inset-x-[11%] bottom-[6.8%] z-10 overflow-hidden px-1 pb-2 pt-3 text-center">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Architectural Rajasthani Palace Cornice & Filigree Corner Brackets for Hero Sections.
 */
export function RajasthaniHeroOrnament() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Top Palace Cornice Scallop Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C3A66B]/60 to-transparent" />
      <div className="absolute inset-x-0 top-2 h-px bg-gradient-to-r from-transparent via-[#C3A66B]/25 to-transparent" />

      {/* Engraved Brass Corner L-Brackets */}
      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 h-5 w-5 sm:h-7 sm:w-7 border-t border-l border-[#C3A66B]/55" />
      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 h-5 w-5 sm:h-7 sm:w-7 border-t border-r border-[#C3A66B]/55" />
      <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 h-5 w-5 sm:h-7 sm:w-7 border-b border-l border-[#C3A66B]/55" />
      <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 h-5 w-5 sm:h-7 sm:w-7 border-b border-r border-[#C3A66B]/55" />

      {/* Bottom Antique Gold Sill Trim */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C3A66B]/55 to-transparent" />
    </div>
  );
}
