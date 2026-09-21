import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { BLOG } from "../mock";

export default function Blog() {
  const [featured, ...rest] = BLOG;
  return (
    <>
      <section className="pt-[120px] pb-14 hero-radial">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <p className="section-line">Blog & Artikel</p>
          <h1 className="mt-4 font-display font-extrabold text-white text-4xl sm:text-5xl max-w-3xl leading-tight">
            Wawasan & Informasi Industri Karoseri
          </h1>
        </div>
      </section>

      <section className="py-14 bg-[#060d1a]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          {/* Featured */}
          <div className="grid lg:grid-cols-2 gap-8 card-dark rounded-3xl overflow-hidden mb-12">
            <div className="h-72 lg:h-full min-h-[320px]">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#4facfe] font-semibold">{featured.category}</span>
                <span className="text-slate-500 flex items-center gap-1"><CalendarDays size={14} /> {featured.date}</span>
              </div>
              <h2 className="mt-4 font-display font-extrabold text-white text-3xl leading-tight">{featured.title}</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">{featured.excerpt}</p>
              <button className="mt-6 self-start inline-flex items-center gap-2 text-[#4facfe] font-semibold hover:gap-3 transition-brand">
                Baca Selengkapnya <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((b) => (
              <div key={b.id} className="card-dark rounded-2xl overflow-hidden group hover:border-[#4facfe]/50 transition-brand flex flex-col sm:flex-row">
                <div className="sm:w-56 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-brand" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[#4facfe] font-semibold">{b.category}</span>
                    <span className="text-slate-500 flex items-center gap-1"><CalendarDays size={14} /> {b.date}</span>
                  </div>
                  <h3 className="mt-3 text-white font-bold text-lg leading-snug">{b.title}</h3>
                  <p className="mt-2 text-slate-400 text-sm">{b.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
