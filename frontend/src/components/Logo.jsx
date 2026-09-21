import React from "react";

/**
 * Premium "88" brand emblem \u2014 metallic chrome, glowing orbital rings,
 * glass highlight, and elegant typography.
 */
export default function Logo({ size = 52, withText = true, textClass = "" }) {
  const uid = React.useId().replace(/:/g, "");
  return (
    <div className="flex items-center gap-3.5 select-none">
      <div className="relative shrink-0" style={{ width: size * 1.15, height: size }}>
        <svg viewBox="0 0 130 116" width={size * 1.15} height={size} className="overflow-visible">
          <defs>
            {/* Chrome metallic gradient for the digits */}
            <linearGradient id={`chrome-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eaf6ff" />
              <stop offset="22%" stopColor="#8fd0ff" />
              <stop offset="48%" stopColor="#2f7bff" />
              <stop offset="58%" stopColor="#0d3a9e" />
              <stop offset="78%" stopColor="#1f5fe0" />
              <stop offset="100%" stopColor="#bfe3ff" />
            </linearGradient>
            {/* Glowing orbital ring gradient */}
            <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7fd0ff" />
              <stop offset="50%" stopColor="#2f7bff" />
              <stop offset="100%" stopColor="#0a2a8f" />
            </linearGradient>
            <radialGradient id={`halo-${uid}`} cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2f7bff" stopOpacity="0" />
            </radialGradient>
            <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* soft halo */}
          <ellipse cx="65" cy="52" rx="64" ry="44" fill={`url(#halo-${uid})`} />

          {/* back orbital ring */}
          <ellipse cx="65" cy="58" rx="60" ry="24" fill="none"
            stroke={`url(#ring-${uid})`} strokeWidth="3.4"
            transform="rotate(-24 65 58)" opacity="0.35" />

          {/* The 88 */}
          <text x="65" y="86" textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800"
            fontSize="92" letterSpacing="-4"
            fill={`url(#chrome-${uid})`} stroke="#08205e" strokeWidth="1.4"
            filter={`url(#glow-${uid})`}>88</text>

          {/* glass highlight sweep across the top of the digits */}
          <path d="M22 40 Q65 20 108 40 Q65 30 22 40 Z" fill="#ffffff" opacity="0.35" />

          {/* front glowing orbital ring */}
          <ellipse cx="65" cy="58" rx="61" ry="25" fill="none"
            stroke={`url(#ring-${uid})`} strokeWidth="3.6"
            transform="rotate(-24 65 58)" opacity="0.95"
            filter={`url(#glow-${uid})`} />
        </svg>
      </div>

      {withText && (
        <div className={`leading-none ${textClass}`}>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-[#4facfe] text-[13px] md:text-[15px]">PT</span>
            <span className="font-display font-extrabold tracking-wide text-[15px] md:text-[18px] text-white">
              DELAPAN DELAPAN
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-px w-4 bg-gradient-to-r from-transparent to-[#4facfe]" />
            <span className="tracking-[0.5em] text-[9px] md:text-[10px] text-[#4facfe] font-semibold">
              INDUSTRI
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4facfe]/40" />
          </div>
        </div>
      )}
    </div>
  );
}
