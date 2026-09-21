import React from "react";
import { STATS } from "../../mock";

export default function StatsSection() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-[#0a1a38] to-[#0d2350] border-y border-[#4facfe]/15">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-gradient-blue">{s.value}</div>
              <div className="mt-2 text-slate-300 text-sm sm:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
