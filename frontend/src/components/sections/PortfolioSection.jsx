import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PORTFOLIO } from "../../mock";
import { Button } from "../ui/button";

export default function PortfolioSection() {
  const items = PORTFOLIO.slice(0, 6);
  return (
    <section className="py-20 lg:py-28 bg-[#04070f]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-line">Portofolio</p>
            <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl max-w-lg leading-tight">
              Karya Terbaik yang Telah Kami Wujudkan
            </h2>
          </div>
          <Link to="/portofolio">
            <Button variant="outline" className="rounded-full h-12 px-6 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2">
              Lihat Semua <ArrowRight size={18} className="text-[#4facfe]" />
            </Button>
          </Link>
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
  );
}
