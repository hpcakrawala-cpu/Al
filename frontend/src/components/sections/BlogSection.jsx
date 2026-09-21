import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { BLOG } from "../../mock";
import { Button } from "../ui/button";

export default function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#060d1a]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-line">Blog & Artikel</p>
            <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl max-w-lg leading-tight">
              Wawasan Terbaru Seputar Industri Karoseri
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="rounded-full h-12 px-6 border-[#4facfe]/40 bg-transparent text-white hover:bg-[#4facfe]/10 hover:text-white gap-2">
              Semua Artikel <ArrowRight size={18} className="text-[#4facfe]" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG.map((b) => (
            <Link to="/blog" key={b.id} className="card-dark rounded-2xl overflow-hidden group hover:border-[#4facfe]/50 transition-brand">
              <div className="h-52 overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-brand" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#4facfe] font-semibold">{b.category}</span>
                  <span className="text-slate-500 flex items-center gap-1"><CalendarDays size={14} /> {b.date}</span>
                </div>
                <h3 className="mt-3 text-white font-bold text-lg leading-snug group-hover:text-[#4facfe] transition-brand">{b.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{b.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
