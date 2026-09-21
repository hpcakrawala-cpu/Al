import React from "react";
import { COMPANY } from "../mock";

// Letterhead (kop surat) for white printable documents
export default function Letterhead() {
  return (
    <div className="flex items-center justify-between border-b-4 border-[#0d2350] pb-4">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 130 116" width="78" height="70" className="overflow-visible shrink-0">
          <defs>
            <linearGradient id="khc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fd0ff" /><stop offset="50%" stopColor="#2f7bff" /><stop offset="100%" stopColor="#0d2350" />
            </linearGradient>
            <linearGradient id="khr" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4facfe" /><stop offset="100%" stopColor="#0a2a8f" />
            </linearGradient>
          </defs>
          <ellipse cx="65" cy="58" rx="61" ry="25" fill="none" stroke="url(#khr)" strokeWidth="3.4" transform="rotate(-24 65 58)" />
          <text x="65" y="86" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="92" letterSpacing="-4" fill="url(#khc)" stroke="#08205e" strokeWidth="1.2">88</text>
        </svg>
        <div>
          <div className="font-display font-extrabold text-2xl text-[#0d2350] leading-tight">PT DELAPAN DELAPAN INDUSTRI</div>
          <div className="text-[#2f7bff] text-xs font-semibold tracking-[0.25em]">KAROSERI UNIVERSAL INDUSTRI</div>
        </div>
      </div>
      <div className="text-right text-[11px] text-slate-600 max-w-[230px] leading-relaxed">
        <div>{COMPANY.address}</div>
        <div>{COMPANY.email}</div>
        <div>{COMPANY.phone}</div>
      </div>
    </div>
  );
}
