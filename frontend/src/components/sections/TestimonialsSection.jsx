import React from "react";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../../mock";

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#04070f]">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-line">Testimoni</p>
          <h2 className="mt-4 font-display font-extrabold text-white text-3xl sm:text-4xl leading-tight">
            Kepercayaan dari Mitra Bisnis Kami
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-dark rounded-2xl p-8 relative">
              <Quote size={40} className="text-[#2f7bff]/40" />
              <div className="flex gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#4facfe]" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-slate-300 leading-relaxed">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#2f7bff] to-[#1f5fe0] grid place-items-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-slate-400 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
