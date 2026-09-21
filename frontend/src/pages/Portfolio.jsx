import React, { useState } from "react";
import { PORTFOLIO } from "../mock";
import CTASection from "../components/sections/CTASection";

const CATEGORIES = ["Semua", "Karoseri Box", "Dump Truck", "Tangki", "Car Carrier"];

export default function Portfolio() {
  const [filter, setFilter] = useState("Semua");
  const items = filter === "Semua" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <>
      <section className="pt-[120px] pb-14 hero-radial">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <p className="section-line">Portofolio</p>
          <h1 className="mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl max-w-3xl leading-tight">
            Proyek yang Telah Kami Selesaikan
          </h1>
        </div>
      </section>

      <section className="py-14 bg-[#060d1a]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium border transition-brand ${
                  filter === c
                    ? "bg-gradient-to-r from-[#2f7bff] to-[#1f5fe0] text-white border-transparent"
                    : "bg-transparent text-slate-300 border-[#4facfe]/30 hover:bg-[#4facfe]/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-[#4facfe]/15">
                <img src={p.image} alt={p.title} className="w-full h-64 object-cover group-hover:scale-105 transition-brand" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070f] via-[#04070f]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block text-xs font-semibold text-[#4facfe] bg-[#4facfe]/15 border border-[#4facfe]/30 rounded-full px-3 py-1">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-white font-bold text-lg">{p.title}</h3>
                  <p className="text-slate-400 text-sm">{p.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
