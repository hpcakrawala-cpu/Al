import React from "react";

// Stylized "88" emblem inspired by the brand mark (chrome + blue glow + orbit ring)
export default function Logo({ size = 44, withText = true, textClass = "" }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size} className="drop-shadow-[0_0_10px_rgba(47,123,255,0.6)]">
          <defs>
            <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dff0ff" />
              <stop offset="45%" stopColor="#5fa8ff" />
              <stop offset="55%" stopColor="#1f5fe0" />
              <stop offset="100%" stopColor="#9fd0ff" />
            </linearGradient>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#1f5fe0" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="46" ry="20" fill="none" stroke="url(#ring)" strokeWidth="3" transform="rotate(-28 50 50)" opacity="0.9" />
          <text x="50" y="68" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="58" fill="url(#chrome)" stroke="#0a2a63" strokeWidth="1.2">88</text>
        </svg>
      </div>
      {withText && (
        <div className={`leading-none ${textClass}`}>
          <div className="font-display font-extrabold tracking-wide text-[15px] md:text-[17px] text-white">
            PT DELAPAN DELAPAN
          </div>
          <div className="tracking-[0.4em] text-[10px] md:text-[11px] text-[#4facfe] font-semibold">
            INDUSTRI
          </div>
        </div>
      )}
    </div>
  );
}
