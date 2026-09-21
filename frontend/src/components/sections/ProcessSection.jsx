import React from "react";
import { PROCESS } from "../../mock";

export default function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#060d1a]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-line">Cara Kerja</p>
          <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
            Proses Kerja yang Transparan & Profesional
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="relative card-dark rounded-2xl p-7 hover:border-[#4facfe]/50 transition-brand">
              <div className="font-display font-extrabold text-5xl text-[#4facfe]/25">{p.step}</div>
              <h3 className="mt-3 text-white font-bold text-xl">{p.title}</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
